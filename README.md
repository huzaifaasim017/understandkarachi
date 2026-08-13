# Understand Karachi

An interactive, bilingual mental map for someone arriving in Karachi with zero
local context. Roman Urdu is the default language, with English available from
the header. The guide explains the sea-facing compass, seven districts, major
road spines, gateways, public transport, infrastructure, safety, address
language, and example journeys through one continuous scroll.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

This starter does not use `wrangler.jsonc`.

## Included shape

- `app/StoryExperience.tsx` contains the guided narrative and explorer.
- `app/KarachiMap.tsx` renders the MapLibre district, corridor, transit, and
  drainage layers.
- `app/karachi-data.ts` contains cited orientation data reviewed on
  2026-08-13.
- `public/data/README.md` documents geometry sources and accuracy limits.
- `public/photos/` contains locally optimized, attributed Commons imagery.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the production build
- `npm test`: build and verify the rendered guide plus local map-data contracts
- `npm run lint`: run static checks

## Learn More

- [Commissioner Karachi administrative map](https://commissionerkarachi.gos.pk/area-map)
- [PBS Census 2023](https://www.pbs.gov.pk/content/7th-population-and-housing-census-2023)
- [MapLibre GL JS](https://maplibre.org/)
- [OpenStreetMap copyright and licence](https://www.openstreetmap.org/copyright)
