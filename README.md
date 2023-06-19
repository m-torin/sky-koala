View this in React when running `yarn dev:demo` at: [localhost:3000](http://localhost:3000).

## Assumptions

Reviewing the `mock_application.json` file revealed a complex API schema which shows signs of stress from rapid feature set growth. With a limited understanding of the _why_ things are in specific places, I made the following assumptions:

- `Objects` should be deduplicated on `Key`.
- It's the `Views` within each `Scene` that should be deduplicated on `Key`, which represents recursive actions.
- Other fields likely could also serve as deduplication identifiers. The code solutions put forth here easily accommodate additional points.

## Codebase

This repository is a Yarn 3 Workspace + Turborepo monorepo. It contains support for things like centralized eslint, prettier configs, and types. This structure can quickly be extended to balance microservice architecture with monorepo convenience.

### File Structure

- `/__tests__` - Business logic and API handler unit tests.
- `/app` - Next.js App Router for React 18
  - `/api` - Three endpoints which process/transform data and an endpoint for unit testing via `Jest CI`.
  - `/*` - Code used for this apps UI.
- `/public` - Serve `mock_application.json` via the web server.
- `/types` - Project-specific shared types.
- `/ui` - React 18 Client components.
- `/utils` - Business logic functions.

## Solution Verification

1. Verify [mock data endpoint](http://localhost:3000/api/mock) returns under `data: {}`.
   - You can also filter just [Objects](http://localhost:3000/api/mock?filter=objects) or [Scenes](http://localhost:3000/api/mock?filter=scenes).
2. Verify [deduplicate endpoint](/api/deduplicate) returns objects and scenes with the subresponse of: `**: {dedupCount: 1, source: {}, appData: {}, removed: {}}`.
3. Verify [appData endpoint](http://localhost:3000/api/appData) returns a mock data feed with deduplicated objects removed. You can also filter just [Objects](http://localhost:3000/api/appData?filter=objects) or [Scenes](http://localhost:3000/api/appData?filter=scenes). For Scenes the deduplicated id is `id: 61e86a5d1137bc002545ff11`.
4. Verify [Jest CI endpoint](http://localhost:3000/api/jest) passes all unit tests.
5. Verify the raw output via [clean_application.json](http://localhost:3000/clean_application.json).

## Future Work

- Extend deduplication to consider other identifiers
- Add Typescript Type checks to the Object and Scene endpoints.
