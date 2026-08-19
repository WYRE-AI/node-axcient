import { describe, expect, it } from 'vitest';
import { HttpClient } from '../src/http.js';
import {
  AuthenticationError,
  ForbiddenError,
  ServerError,
  ValidationError,
} from '../src/errors.js';

// Direct HttpClient use (bypassing resource classes) so we can hit the synthetic
// /error-shapes/* routes registered in tests/mocks/handlers.ts, which reproduce the
// real-world Axcient error bodies documented in the community AxcientAPI module's
// ApiNotes.md (see README "Known API quirks").
const http = new HttpClient({ apiKey: 'test-key', maxRetries: 0 });

describe('error shape handling', () => {
  it('maps {"message":"Unauthorized"} (bad API key) to AuthenticationError', async () => {
    const err = await http.request('/error-shapes/bad-key').catch((e) => e);
    expect(err).toBeInstanceOf(AuthenticationError);
    expect(err.statusCode).toBe(401);
  });

  it('maps {"code":401,"msg":"Unauthorized"} (bad endpoint/param) to ValidationError, not AuthenticationError', async () => {
    const err = await http.request('/error-shapes/bad-endpoint').catch((e) => e);
    expect(err).toBeInstanceOf(ValidationError);
    expect(err).not.toBeInstanceOf(AuthenticationError);
    expect(err.statusCode).toBe(401);
  });

  it('maps problem+json 400 to ValidationError with the detail message', async () => {
    const err = await http.request('/error-shapes/bad-request').catch((e) => e);
    expect(err).toBeInstanceOf(ValidationError);
    expect(err.message).toBe("Missing path parameter 'org_id'");
    expect(err.statusCode).toBe(400);
  });

  it('maps problem+json 403 to ForbiddenError', async () => {
    const err = await http
      .request('/error-shapes/forbidden', { method: 'POST' })
      .catch((e) => e);
    expect(err).toBeInstanceOf(ForbiddenError);
    expect(err.statusCode).toBe(403);
  });

  it('maps 500 to ServerError', async () => {
    const err = await http.request('/error-shapes/server-error').catch((e) => e);
    expect(err).toBeInstanceOf(ServerError);
    expect(err.statusCode).toBe(500);
  });
});
