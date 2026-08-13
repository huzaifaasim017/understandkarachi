# Understand Karachi

> Status: active prototype · Last reviewed: 2026-08-13

Understand Karachi is a bilingual, interactive mental map for a first-time
visitor. Roman Urdu is the default and English is available in the header. The
guide teaches the city from the Arabian Sea outward: compass and gateways, a
reusable crossing model, major road spines, landmark language, administrative
geography, public transport, safety, and example cross-city journeys.

It is an orientation and learning tool, **not** live turn-by-turn navigation.
Road conditions, closures, weather, and service status must be checked before
travel.

## Run locally

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verify a change

```bash
npm run lint
npm test
```

`npm test` type-checks the project, creates a production build, and then checks
the rendered guide and local map-data contracts. Use `npm run build` when only
a production compile is needed.

## Repository map

| Path | Responsibility |
| --- | --- |
| `app/StoryExperience.tsx` | Scroll narrative, language state, explorer, quiz, and page interactions |
| `app/KarachiMap.tsx` | MapLibre lifecycle, teaching layers, entity selection, schematic crossing overlays, camera states, and fallbacks |
| `app/IntroWorld.tsx` | Progressive-enhancement Three.js introduction |
| `app/BrandMark.tsx` | Reusable Understand Karachi identity |
| `app/features/` | Focused map-detail and cross-city feature modules |
| `app/karachi-data.ts` | Canonical shared facts, places, corridors, sources, and media metadata |
| `app/karachi-i18n.ts` | Roman Urdu and English presentation copy |
| `public/data/` | Versioned district and schematic network GeoJSON plus provenance notes |
| `public/photos/` | Local, attributed editorial photographs |
| `tests/` | Production-render and data-contract checks |
| `docs/` | Product, architecture, governance, specifications, decisions, and operations |

The complete boundary map is in
[System and repository boundaries](docs/architecture/system-and-repository-boundaries.md).

## Product rules

- Teach a reusable mental model before showing detail.
- Keep a clear distinction between administrative geography, familiar place
  names, and travel landmarks.
- Use one canonical fact or geometry source and translate only its explanation.
- Treat every map overlay as orientation-only unless a future source is
  explicitly approved for routing.
- Make every essential learning outcome available without animation, hover, or
  pointer precision.

These rules are governed by [AGENTS.md](AGENTS.md), the
[project charter](docs/project-charter.md), and the accepted
[architecture decisions](docs/adrs/).

## Documentation

Start at [docs/README.md](docs/README.md). It identifies the canonical document
for each topic and prevents plans, specs, and implementation notes from
silently becoming conflicting sources of truth.

## Contributing and security

Read [CONTRIBUTING.md](CONTRIBUTING.md) before proposing a change. Report a
security or privacy issue using [SECURITY.md](SECURITY.md), not a public issue.
Third-party data and media notices are recorded in [NOTICE.md](NOTICE.md) and
[public/data/README.md](public/data/README.md).
