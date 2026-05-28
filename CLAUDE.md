# Wax & Wane Records — demo site

**Purpose**: this is the Challenge 03 target for the [Lookout Snowflake Challenge](https://rudder-office.fly.dev/docs/snowflake-challenge.html). The repo ships with zero analytics. The challenge is to instrument it from scratch — propose an event schema, wire up `@rudderstack/analytics-js`, and open a PR.

## Stack

Same shape as `rudderlabs/demo-lookout-tea-shop`:

- Next.js 16 (App Router, `output: 'export'`)
- React 19, TypeScript strict (`noUncheckedIndexedAccess`)
- Tailwind v4 (dark mode by default)
- Deploys to GitHub Pages via `.github/workflows/pages.yml`, served at `/demo-lookout-vinyl` (see `next.config.ts` `basePath`)

## Conventions

- `pnpm` only — no npm or yarn
- Single quotes, semicolons, trailing commas (`.prettierrc`)
- Component files: one component per file, named export
- Path alias: `@/*` → `src/*`
- Server Components by default; `'use client'` only when needed (cart context, audio preview, forms)
- No `any` types

## Where things live

- `src/data/records.ts` — the 5 records + tracklists + cover palette
- `src/lib/cart/context.tsx` — useReducer-backed cart state
- `src/components/RecordCover.tsx` — typography-only cover art (no images)
- `src/components/TrackPreview.tsx` — 10-second animated progress bar; no actual audio
- `src/components/NotifyRestockForm.tsx` — email capture for sold-out records
- `src/app/records/[slug]/AddToCartButton.tsx` — client island on the detail page

## Notes for the agent instrumenting this

When asked to add analytics:

1. Add `@rudderstack/analytics-js` to `package.json`
2. Decide an event schema. Some obvious candidates from the pages above:
   - `Page Viewed` (every page)
   - `Record Viewed` (detail page)
   - `Track Previewed` (when the play button on `TrackPreview` is clicked — properties: `track_number`, `track_title`, `record_id`, `play_duration_ms`, `completed`)
   - `Record Added to Cart`
   - `Restock Notify Requested` (sold-out form submit — properties: `record_id`, `email`)
   - `Cart Viewed`, `Checkout Started`, `Order Completed`
3. Create a provider/hook pattern under `src/lib/analytics/`
4. Inject `NEXT_PUBLIC_RUDDERSTACK_WRITE_KEY` and `NEXT_PUBLIC_RUDDERSTACK_DATAPLANE_URL` at build time (already wired in `pages.yml`; the secrets just need to exist on the repo)
5. Open a PR with the changes

There is no "right" schema — the best PRs will pick names that make sense for *this* domain (records, tracklists, restock intent) rather than copy-pasting Tea Leafs' ecommerce names verbatim.
