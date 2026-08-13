---
title: System and repository boundaries
status: accepted
owner: engineering maintainers
last-reviewed: 2026-08-14
review-cycle: every architectural change
---

# System and repository boundaries

## Runtime shape

Understand Karachi is a server-rendered Next.js App Router experience with
client-side progressive enhancement. It has addressable surfaces for the city
overview, district atlas, seven district profiles, and crossing preparation.
MapLibre loads a remote basemap and local GeoJSON overlays near the viewport.
Three.js enhances the overview and atlas introduction with the same reviewed
Karachi district geometry. Every route must remain understandable when either
enhancement fails.

```text
Request
  -> shared layout and route metadata
  -> /                         -> StoryExperience
  -> /districts                -> DistrictIndexExperience
  -> /districts/[district-id]  -> DistrictExperience
  -> /crossings                -> CrossingExperience
       -> shared SiteHeader + preference stores
       -> canonical data + localized copy
       -> IntroWorld (optional Karachi WebGL model)
       -> KarachiMap (optional basemap + local overlays)
       -> PhotoCard (local media + exact attribution)
  -> accessible HTML/list fallback and static media
```

`generateStaticParams` limits district routes to the seven canonical district
IDs. One shared district experience renders those profiles; an unsupported ID
uses the framework not-found path. This route boundary is governed by
[ADR-0005](../adrs/0005-static-multi-page-learning-surfaces.md).

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
| `app/StoryExperience.tsx` | Homepage lesson order, selection state, exploration, quiz, and links into focused learning surfaces | Full crossing scenarios, district-page exceptions, duplicate geographic records, or map rendering internals |
| `app/districts/page.tsx`, `app/districts/[districtId]/page.tsx`, `app/crossings/page.tsx` | Route metadata, valid static parameters, not-found handling, and composition of the owning experience | Independent facts, translations, or interaction implementations |
| `app/KarachiMap.tsx` | Map lifecycle, sources/layers, camera transitions, feature selection and map fallbacks | Product lesson order or uncited geographic facts |
| `app/features/map/` | Reusable entity resolution and selected-feature detail UI | A second store of independent geographic facts |
| `app/features/cross-city/` | Dedicated `/crossings` interaction, typed scenario view models, checkpoint presentation, and map orchestration | Claims that bypass canonical sources or live-routing promises |
| `app/features/districts/` | Shared atlas index and seven-page district presentation assembled from stable IDs | Independent unsourced facts, route-specific copies, or a replacement for canonical data/locales |
| `app/features/preferences.ts` | Shared locale and reduced-motion external stores, safe storage fallbacks, and document-language synchronization | Page-specific copy, analytics, precise location, or trip state |
| `app/SiteHeader.tsx` | Reusable identity, route navigation, responsive menu, and language selector | A page-specific motion control, facts, or copied locale state |
| `app/PhotoCard.tsx` | Reusable local image rendering plus visible caption, year, creator, exact source, and licence actions | Independent media provenance or text embedded over a critical crop |
| `app/BrandMark.tsx` | Reusable product identity presentation | Geographic or localized content |
| `app/IntroWorld.tsx` | Optional 3D Karachi district/corridor rendering, pointer selection, contextual pause/play, WebGL fallback, and resource cleanup | A world globe, exact elevation/traffic encoding, essential content, or navigation-only access |
| `public/data/*.geojson` | Versioned client-readable overlays and dataset metadata | Unreviewed research artifacts or prose translation |
| `public/data/README.md` | Extraction, transformation, licensing, and precision notes for shipped geometry | General product policy |
| `public/photos/` | Optimized local copies of approved editorial media | Source records or unlicensed originals |
| `tests/` | User-visible and data-boundary contracts | A second product specification |
| `work/` | Non-production research and transformation inputs | Runtime dependencies or distributable claims |
| `docs/` | Intent, governance, specs, decisions, plans, and operations | Canonical runtime facts duplicated from code/data |

### Known implementation transitions

`app/features/cross-city/crossCityData.ts` currently assembles typed scenario
relationships and some localized presentation text inside the feature module.
That is transitional implementation debt, not a second ownership rule. P0.5
remains incomplete until stable scenario facts and source relationships flow
from `app/karachi-data.ts`, while Roman Urdu and English presentation copy flows
from `app/karachi-i18n.ts`, without changing the stable scenario or feature IDs.

`app/features/districts/districtAtlasData.ts` currently assembles the new
district profiles and their localized explanations in one feature record. The
shared template prevents per-route duplication, but this is still transitional
debt: stable profile relationships and source IDs must move to
`app/karachi-data.ts`, and bilingual presentation strings must move to
`app/karachi-i18n.ts`, before V4.2 can be marked complete. The feature module
may continue to expose derived view models after that split.

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
- WebGL failure: retain the labelled Karachi/district list and onward links;
  never replace the introduction with an empty canvas or block entry.
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
