# Wax & Wane Records — demo

An independent record-label demo site. Built as the **Challenge 03** target for the [Lookout Snowflake Challenge](https://rudder-office.fly.dev/docs/snowflake-challenge.html) — you point Lookout at this repo and ask it to **instrument analytics from scratch**.

## What's in here

Five pages, five records, one cart, one checkout. No analytics whatsoever — that's the challenge.

- `/` — Home
- `/records` — Catalogue
- `/records/[slug]` — Detail (cover, blurb, tracklist with audio previews, add-to-cart or notify-when-restocked)
- `/cart` — Cart
- `/checkout` — Single-page checkout

Two of the five records are sold out (`Cold Static`, `Last Pair`) — those detail pages render a "Notify me when restocked" email-capture form instead of an add-to-cart button.

The "audio preview" on the tracklist is purely visual — a 10-second animated progress bar with no actual audio. Wired up for the analytics event regardless.

## Quick start

```bash
nvm install 22
corepack enable
pnpm install
pnpm dev
```

Open <http://localhost:3000/demo-lookout-vinyl>.

## What's deliberately missing

- No `@rudderstack/analytics-js`
- No `useRudderAnalytics` hook
- No tracking calls
- No `NEXT_PUBLIC_RUDDERSTACK_*` env-var references in code
- No measurement plan / source documentation

That's the point. Hand the repo to Lookout and ask:

> *Add RudderStack analytics to this site.*

…and watch it propose a schema, wire up the SDK, and open a PR.

## Stack

- Next.js 16 (App Router, `output: 'export'`)
- React 19
- Tailwind v4
- TypeScript strict
- Deployed to GitHub Pages from `main`

## License

Source code: internal / not licensed.
Content (record artwork, label names, tracklists, artist names): invented for this demo. Any resemblance to real records is coincidental.
