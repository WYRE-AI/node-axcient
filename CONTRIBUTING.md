# Contributing

1. Fork and branch off `main`.
2. `npm install`
3. Make your change with tests (`npm test`).
4. `npm run lint && npm run build` must pass.
5. Commit using [Conventional Commits](https://www.conventionalcommits.org/) — the commit
   type drives the semantic-release version bump (`fix:`, `feat:`, `feat!:`/`BREAKING CHANGE:`).
6. Open a PR against `main`.

## Testing against the Axcient mock server

Axcient publishes a mock/WireMock server for the x360Recover API so you can experiment
without a real API key: `https://ax-pub-recover.wiremockapi.cloud`. Pass it as `baseUrl`
when constructing `AxcientClient` for manual smoke testing. Automated tests in this repo
use [MSW](https://mswjs.io/) fixtures instead, so no network access or API key is required
to run `npm test`.
