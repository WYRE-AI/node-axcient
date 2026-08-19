import { http, HttpResponse } from 'msw';
import * as fixtures from '../fixtures/index.js';

export const BASE_URL = 'https://axapi.axcient.com/x360recover';

export const handlers = [
  http.get(`${BASE_URL}/organization`, () => HttpResponse.json(fixtures.organization)),

  http.get(`${BASE_URL}/client`, () => HttpResponse.json(fixtures.clients)),
  http.get(`${BASE_URL}/client/:clientId`, ({ params }) => {
    if (params.clientId === '999999') {
      return HttpResponse.json(
        { detail: 'Client with such id = 999999 is not found', status: 404, title: 'Client not found', type: 'NotFoundException' },
        { status: 404, headers: { 'Content-Type': 'application/problem+json' } }
      );
    }
    return HttpResponse.json(fixtures.client);
  }),
  http.post(`${BASE_URL}/client/:clientId/vault/:vaultId/d2c_agent`, () =>
    HttpResponse.json(fixtures.d2cAgentToken, { status: 201 })
  ),

  http.get(`${BASE_URL}/device`, () => HttpResponse.json(fixtures.devices)),
  http.get(`${BASE_URL}/client/:clientId/device`, () => HttpResponse.json(fixtures.devices)),
  http.get(`${BASE_URL}/device/:deviceId`, () => HttpResponse.json(fixtures.device)),
  http.get(`${BASE_URL}/device/:deviceId/autoverify`, () => HttpResponse.json(fixtures.machineAutoverifyDetails)),
  http.get(`${BASE_URL}/device/:deviceId/restore_point`, () => HttpResponse.json(fixtures.machineRestorePoints)),

  http.get(`${BASE_URL}/client/:clientId/device/:deviceId/job`, () => HttpResponse.json(fixtures.jobs)),
  http.get(`${BASE_URL}/client/:clientId/device/:deviceId/job/:jobId`, () => HttpResponse.json(fixtures.brcJob)),
  http.get(`${BASE_URL}/client/:clientId/device/:deviceId/job/:jobId/history`, () =>
    HttpResponse.json(fixtures.jobHistory)
  ),

  http.get(`${BASE_URL}/vault`, () => HttpResponse.json(fixtures.vaults)),
  http.get(`${BASE_URL}/vault/:vaultId`, () => HttpResponse.json(fixtures.vault)),
  http.get(`${BASE_URL}/vault/:vaultId/threshold/connectivity`, () => HttpResponse.json(fixtures.vaultThreshold)),
  http.post(`${BASE_URL}/vault/:vaultId/threshold/connectivity`, () => HttpResponse.json(fixtures.vaultThreshold)),

  http.get(`${BASE_URL}/appliance`, () => HttpResponse.json(fixtures.appliances)),
  http.get(`${BASE_URL}/client/:clientId/appliance`, () => HttpResponse.json(fixtures.appliances)),
  http.get(`${BASE_URL}/appliance/:applianceId`, () => HttpResponse.json(fixtures.appliance)),

  // Error-shape fixtures, hit via a dedicated fake ID convention in the error tests.
  http.get(`${BASE_URL}/error-shapes/bad-key`, () =>
    HttpResponse.json({ message: 'Unauthorized' }, { status: 401, headers: { 'Content-Type': 'application/json' } })
  ),
  http.get(`${BASE_URL}/error-shapes/bad-endpoint`, () =>
    HttpResponse.text(JSON.stringify({ code: 401, msg: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  ),
  http.get(`${BASE_URL}/error-shapes/bad-request`, () =>
    HttpResponse.json(
      { detail: "Missing path parameter 'org_id'", status: 400, title: 'Bad Request', type: 'about:blank' },
      { status: 400, headers: { 'Content-Type': 'application/problem+json' } }
    )
  ),
  http.post(`${BASE_URL}/error-shapes/forbidden`, () =>
    HttpResponse.json(
      { detail: "User doesn't have enough permissions to process this request", status: 403, title: 'Not enough permissions', type: 'ForbiddenException' },
      { status: 403, headers: { 'Content-Type': 'application/problem+json' } }
    )
  ),
  http.get(`${BASE_URL}/error-shapes/server-error`, () => HttpResponse.text('Internal Server Error', { status: 500 })),
];
