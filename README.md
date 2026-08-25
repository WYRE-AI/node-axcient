# @wyre-ai/node-axcient

Node.js / TypeScript client library for the [Axcient x360Recover](https://developer.axcient.com/x360recover/)
BCDR public API. Zero runtime dependencies — built on native `fetch`.

## Install

```bash
npm install @wyre-ai/node-axcient
```

## Quick start

```typescript
import { AxcientClient } from '@wyre-ai/node-axcient';

const axcient = new AxcientClient({ apiKey: process.env.AXCIENT_API_KEY! });

const org = await axcient.organization.get();
const clients = await axcient.clients.list();
const devices = await axcient.devices.list({ limit: 100 });
const vaults = await axcient.vaults.list({ vaultType: 'Cloud' });
```

Generate an API key in the x360Portal: **Settings → API Keys** (see
[Axcient's key management guide](https://help.axcient.com/360001190313-Axcient-x360Portal-/generating-and-managing-api-keys)).

## API reference

| Resource | Methods |
|---|---|
| `organization` | `get()` |
| `clients` | `list()`, `get(clientId)`, `getD2CAgentToken(clientId, vaultId)` |
| `devices` | `list()`, `listByClient(clientId)`, `get(deviceId)`, `getAutoVerify(deviceId)`, `getRestorePoints(deviceId)` |
| `jobs` | `listByDevice(clientId, deviceId)`, `get(clientId, deviceId, jobId)`, `getHistory(clientId, deviceId, jobId)` |
| `vaults` | `list()`, `get(vaultId)`, `getThreshold(vaultId)`, `setThreshold(vaultId, minutes)` |
| `appliances` | `list()`, `listByClient(clientId)`, `get(applianceId)` |

All response types mirror the API's wire format (snake_case field names) verbatim — see `src/types/`.

### Pagination

`devices.list()` and `jobs.getHistory()` accept `limit`/`offset`. A helper generator walks
pages automatically:

```typescript
import { paginateOffset } from '@wyre-ai/node-axcient';

for await (const device of paginateOffset(
  (limit, offset) => axcient.devices.list({ limit, offset }),
  100
)) {
  console.log(device.name);
}
```

## Error handling

```typescript
import { NotFoundError, AuthenticationError, ValidationError } from '@wyre-ai/node-axcient';

try {
  await axcient.clients.get(999999);
} catch (err) {
  if (err instanceof NotFoundError) {
    // client doesn't exist
  } else if (err instanceof AuthenticationError) {
    // bad/revoked API key
  }
}
```

All errors extend `ServiceError` (`.statusCode`, `.response` = parsed body). Specific
subclasses: `AuthenticationError`, `ForbiddenError`, `NotFoundError`, `ValidationError`,
`RateLimitError`, `ServerError`.

## Known API quirks

The x360Recover public API is young (v0.3.1 at time of writing) and has a few documented
inconsistencies this SDK works around so you don't have to:

- **Auth header**: some Axcient docs mention `x-api-headers`; the real header (confirmed by
  the OpenAPI `securitySchemes` block and production behavior) is **`x-api-key`**.
- **Invalid endpoint / bad path parameter → HTTP 401, not 400.** Calling an unknown route or
  passing a non-numeric ID (e.g. `/client/notanumber`) returns `{"code": 401, "msg":
  "Unauthorized"}` instead of the documented 400. This SDK normalizes that case to a
  `ValidationError` (see `src/errors.ts`) rather than surfacing it as an auth failure.
- **List endpoints are documented as single objects.** The OpenAPI spec's response schema for
  `/client`, `/appliance`, and `/vault` (no ID in the path) references the singular object
  schema rather than an array, which appears to be a spec authoring bug — the live API returns
  arrays for these, and this SDK types them as arrays (`Client[]`, `Appliance[]`, `Vault[]`).
- **Job history is effectively unstable.** Community testing (see the
  [`adamburley/AxcientAPI`](https://github.com/adamburley/AxcientAPI) PowerShell module, whose
  `ApiNotes.md` documents error-response shapes reused here) found the `/job/{id}/history`
  endpoint occasionally nonfunctional. Treat `jobs.getHistory()` failures as expected in
  production until Axcient stabilizes it.

## License

Apache-2.0
