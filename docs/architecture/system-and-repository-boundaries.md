---
title: System and repository boundaries
status: accepted
owner: engineering maintainers
last-reviewed: 2026-08-13
review-cycle: every architectural change
---

# System and repository boundaries

## Runtime shape

Understand Karachi is a server-rendered React experience with client-side
progressive enhancement. The initial HTML contains the core bilingual learning
journey. MapLibre loads a remote basemap and local GeoJSON overlays near the
viewport. Three.js enhances the introduction when WebGL is available. The guide
must remain understandable when either enhancement fails.

```text
Request
  -> layout/page metadata
  -> StoryExperience (narrative + UI state)
       -> canonical data + localized copy
       -> IntroWorld (optional WebGL)
       -> KarachiMap (optional basemap + local overlays)
  -> accessible HTML fallback and static media
```

There is no application requirement today for an account, saved trip, stored
precise location, or mutable database record. A user-triggered, one-shot browser
location estimate is allowed by ADR-0004; it is processed in memory, reduced to
a nearest-anchor explanation, and never stored by the application. The
repository intentionally retains no application database or account
scaffolding. Neither may become a dependency without an approved architecture
and privacy proposal.

## Canonical ownership

| Boundary | Owns | Must not own |
| --- | --- | --- |
| `app/karachi-data.ts` | Stable IDs; shared facts; coordinates; corridors; places; sources; emergency and media metadata | Translated prose or component state |
| `app/karachi-i18n.ts` | Roman Urdu/English UI and explanatory copy keyed by stable IDs | Independent facts, geometry, or source URLs |
| `app/StoryExperience.tsx` | Story order, selection state, language preference, exploration and quiz interactions | Duplicate geographic records or map rendering internals |
| `app/KarachiMap.tsx` | Map lifecycle, sources/layers, camera transitions, feature selection and map fallbacks | Product lesson order or uncited geographic facts |
| `app/features/map/` | Reusable entity resolution and selected-feature detail UI | A second store of independent geographic facts |
| `app/features/cross-city/` | Crossing interaction, typed scenario view models, and checkpoint presentation | Claims that bypass canonical sources or live-routing promises |
| `app/BrandMark.tsx` | Reusable product identity presentation | Geographic or localized content |
| `app/IntroWorld.tsx` | Optional introduction rendering and resource cleanup | Essential content or navigation |
| `public/data/*.geojson` | Versioned client-readable overlays and dataset metadata | Unreviewed research artifacts or prose translation |
| `public/data/README.md` | Extraction, transformation, licensing, and precision notes for shipped geometry | General product policy |
| `public/photos/` | Optimized local copies of approved editorial media | Source records or unlicensed originals |
| `tests/` | User-visible and data-boundary contracts | A second product specification |
| `work/` | Non-production research and transformation inputs | Runtime dependencies or distributable claims |
| `docs/` | Intent, governance, specs, decisions, plans, and operations | Canonical runtime facts duplicated from code/data |

### Known implementation transition

`app/features/cross-city/crossCityData.ts` currently assembles typed scenario
relationships and some localized presentation text inside the feature module.
That is transitional implementation debt, not a second ownership rule. P0.5
remains incomplete until stable scenario facts and source relationships flow
from `app/karachi-data.ts`, while Roman Urdu and English presentation copy flows
from `app/karachi-i18n.ts`, without changing the stable scenario or feature IDs.

## Data direction

Canonical facts flow one way:

```text
reviewed source
  -> canonical record / versioned geometry
  -> stable ID
  -> localized explanation
  -> narrative, map, search, quiz, and tests
```

Do not reverse this flow by scraping rendered copy into data or by treating a
translation as an independent source. See
[ADR-0003](../adrs/0003-canonical-data-direction.md).

## External boundaries

- **OpenFreeMap / OpenStreetMap ecosystem:** basemap tiles and attribution;
  network availability and tile freshness are outside application control.
- **Official and institutional sources:** evidence for administrative,
  population, transport, infrastructure, and emergency claims; publication
  quality and update frequency vary.
- **Wikimedia Commons:** source for local editorial photographs under their
  individual licenses.
- **Hosting platform:** serves the built application and ordinary request logs;
  production access and rollback are operational responsibilities.

No external routing, traffic, weather, geocoding, analytics, or geolocation
provider is part of the accepted runtime architecture. The optional browser
Geolocation API is not an application location service and is only called after
an explicit button press.

## Failure boundaries

- Basemap failure: retain lesson copy, map fallback, compass, and retry on next
  load; do not imply data disappeared.
- WebGL failure: show a visually complete non-3D hero; never block entry.
- localStorage failure: language switching works for the current visit even if
  preference cannot persist.
- JavaScript delay/failure: server-rendered lesson content and source links
  remain available as far as the framework output permits.
- stale or disputed data: label the review date, stop promoting the disputed
  claim, and follow the operations runbook.

## Change triggers

An ADR and threat/privacy review are required before adding persistent user
data, geolocation, third-party routing, real-time operational feeds, community
edits, or a database dependency. A spec update is required when a learner
outcome, interaction contract, or supported language changes.
