# Canada Demographics

`canada-demographics` is a Next.js 15 MVP for exploring Canadian population and residency-status data. It presents a public-facing dashboard with a homepage, metric pages, province profiles, CSV export, and a JSON dataset endpoint backed by curated seed snapshots.

## What it includes

- A narrative homepage centered on the national population signal
- Metric detail pages with trend views, methodology context, and CSV export
- Province profile pages with population trend and latest official metric snapshots
- A generated dataset bundle exposed at `/api/dataset`
- A simple nowcast layer that extends selected quarterly series between official releases

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Vitest

## Getting started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Scripts

- `npm run dev` starts the local Next.js app
- `npm run build` creates a production build
- `npm run start` serves the production build
- `npm run lint` runs the Next.js linter
- `npm run test` runs the Vitest suite
- `npm run test:watch` runs Vitest in watch mode
- `npm run refresh:dataset` rebuilds `data/derived/dataset.json` from the seed data and registry metadata

## Data flow

The app uses checked-in seed files in `data/seed/raw/` and combines them with registry metadata in `lib/registry/` to build a unified dataset bundle in `lib/data/build-dataset.ts`.

Current seeded sources:

- Statistics Canada quarterly population estimates
- IRCC temporary resident data

The build pipeline produces:

- Official observations from raw source snapshots
- Estimated observations for metrics with `estimateEnabled: true`
- Highlight cards, province profiles, and supporting metadata

`scripts/refresh-dataset.ts` writes the generated snapshot to `data/derived/dataset.json`. The app itself reads from the in-repo dataset builder at runtime, while the derived JSON gives you an exportable artifact.

## Project structure

```text
app/                       Next.js app routes, pages, and API handlers
components/                UI components for home, metric, province, layout, and shared pieces
content/                   Homepage narrative content
data/seed/raw/             Checked-in source snapshots
data/derived/              Generated dataset artifact
lib/data/                  Dataset assembly, queries, formatting, and export helpers
lib/payloads/              Page-level payload builders
lib/registry/              Metric, source, geography, taxonomy, and methodology definitions
lib/types/                 Shared dataset types
scripts/                   Maintenance scripts
tests/                     Vitest coverage for data and rendering
public/illustrations/      Static artwork used by the app
```

## Key routes

- `/` homepage
- `/metrics/[metricSlug]` metric detail pages
- `/provinces/[provinceSlug]` province profile pages
- `/api/dataset` JSON dataset response

## Testing

The test suite currently covers:

- Dataset assembly and nowcast behavior
- CSV export output
- Basic rendering for the homepage, metric pages, and province pages

Run everything with:

```bash
npm run test
```

## Notes for contributors

- Dynamic page content is assembled through payload helpers in `lib/payloads/`
- Registry files define the available metrics, sources, and methodology labels
- If you update raw source snapshots, run `npm run refresh:dataset`
- If you add new metrics or pages, update or extend the Vitest coverage alongside them
