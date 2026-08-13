---
title: District atlas v4 implementation plan
status: complete
owner: project maintainers
started: 2026-08-14
last-updated: 2026-08-14
last-reviewed: 2026-08-14
review-cycle: update with every material merge or release
workstream: district-atlas-and-route-separation-v4
---

# District atlas v4 implementation plan

## Objective

Turn Understand Karachi into a focused multi-page atlas: a Karachi-specific
overview at `/`, a comparison index at `/districts`, seven comparable district
deep dives at `/districts/[district-id]`, and traveller crossing guidance at
`/crossings`.
Replace the decorative world introduction with a useful progressive 3D Karachi
model and correct photo readability and provenance throughout.

This plan implements [RFC-0002](../rfcs/0002-district-atlas-and-route-separation.md),
[ADR-0005](../adrs/0005-static-multi-page-learning-surfaces.md), and the
[district deep-dives specification](../specs/district-deep-dives.md).

## Release constraints

- The product remains an orientation guide, not live or turn-by-turn
  navigation.
- Roman Urdu remains the default; English remains complete on every route.
- The seven pages reuse one schema/template and canonical stable IDs.
- No essential relationship depends on 3D, hover, color, motion, map tiles, or
  JavaScript enhancement.
- New facts and media require direct sources, applicable licence/provenance,
  review dates, and documented limits.
- The existing one-shot location estimate is not expanded.
- No new account, database, routing, tracking, analytics, traffic, or weather
  dependency enters this release.

## Work packages

| ID | Work package | Status | Governing document |
| --- | --- | --- | --- |
| V4.1 | Audit current homepage, globe, crossing placement, photos, data reuse, and route boundaries | Complete | [RFC-0002](../rfcs/0002-district-atlas-and-route-separation.md) |
| V4.2 | Add canonical district-profile relationships, source coverage, review dates, and bilingual copy | Complete | [Data policy](../data/source-policy.md) |
| V4.3 | Build shared site shell, locale behavior, route navigation, and valid not-found behavior | Complete | [ADR-0005](../adrs/0005-static-multi-page-learning-surfaces.md) |
| V4.4 | Refocus `/` on Karachi overview, remove the animation/still UI, and add district/crossing entry points | Complete | [Learning journey](../specs/learning-journey.md) |
| V4.5 | Replace the world with a Karachi-specific 3D progressive enhancement and complete fallback | Complete | [Accessibility standard](../standards/accessibility.md) |
| V4.6 | Move the crossing module to `/crossings` and preserve all accepted crossing/safety behavior | Complete | [Cross-city guidance](../specs/cross-city-guidance.md) |
| V4.7 | Implement seven static `/districts/[district-id]` pages from one template | Complete | [District deep dives](../specs/district-deep-dives.md) |
| V4.8 | Repair photo crop/caption/alt/source/creator/licence behavior and verify every external source link | Complete | [District deep dives](../specs/district-deep-dives.md) |
| V4.9 | Add schema, route, locale, source, fallback, and critical interaction tests | Complete | [QA checklist](../quality/qa-release-checklist.md) |
| V4.10 | Complete bilingual browser/accessibility/performance QA, release privately, and record rollback | Complete | [Operations runbook](../operations/runbook.md) |

The route split, canonical district model, shared shell, Karachi 3D
introduction, photo treatment, safety handoff, and automated contracts shipped
in [private production release v4](../releases/2026-08-14-v4.md). The release
record captures the tested browser scope, production smoke evidence, immutable
artifact, known limits, and rollback target.

## Sequencing

1. Confirm the current canonical district, corridor, landmark, media, source,
   geometry, and translation inventory.
2. Produce a seven-by-required-field coverage matrix. Mark missing/disputed
   claims rather than inventing content.
3. Extend shared typed records and both locale dictionaries; validate every ID
   and source link before rendering.
4. Establish shared route shell and language behavior, then create `/crossings`
   without changing the accepted crossing grammar.
5. Build the district template and static route generation; populate all seven
   pages from canonical records.
6. Refocus the homepage and replace the globe with the Karachi 3D/fallback pair.
7. Correct photo presentation and exact attribution across existing and new
   surfaces.
8. Add automated contracts, run full QA, correct findings, and repeat until the
   release gate is met.
9. Commit an immutable source revision, publish the private release, smoke all
   route classes and assets, and create a v4 release record.

## Content and source review matrix

Before release, each district row must have an explicit result for every
column. `Limited` is acceptable only with a visible explanation; an empty cell
is not.

| District profile | Position/edges | Spines | Hubs | Areas | Gateways/systems | Media | Sources/dates | Locale parity |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Central | Implemented | Implemented | Implemented | Implemented | Implemented | Not used | Implemented | Implemented |
| East | Implemented | Implemented | Implemented | Implemented | Implemented | Not used | Implemented | Implemented |
| South | Implemented | Implemented | Implemented | Implemented | Implemented | Not used | Implemented | Implemented |
| West | Implemented | Implemented | Implemented | Implemented | Implemented | Not used | Implemented | Implemented |
| Keamari | Implemented | Implemented | Implemented | Implemented | Implemented | Not used | Implemented | Implemented |
| Korangi | Implemented | Implemented | Implemented | Implemented | Implemented | Not used | Implemented | Implemented |
| Malir | Implemented | Implemented | Implemented | Implemented | Implemented | Not used | Implemented | Implemented |

Connected-district links are explicitly labelled as learning connections, not
legal adjacency claims. Every page includes selected-chain coverage limits,
source conflicts, same-day verification, safe-stop, motorway-bike, and exact
last-mile handoffs. District pages currently use no photo; this is valid
because media is optional.

## Required validation scenarios

1. A new visitor sees Karachi—not a globe—understands sea/south and can open
   any of the seven district pages without completing a crossing lesson.
2. Animation/still controls are absent; system reduced motion and the product's
   persistent motion setting still remove nonessential movement.
3. Direct loads of `/`, `/crossings`, every district route, and one invalid
   district route produce the intended content or not-found state.
4. A mobile user and keyboard user select the same district corridor and hub
   and receive equivalent readable detail outside the map.
5. Roman Urdu and English preserve navigation, entity kind, direction,
   relationship, status, date, caution, photo meaning, and source action.
6. Every district remains understandable when WebGL, map tiles, and images are
   blocked; retry/error states do not erase text or onward navigation.
7. Every image caption remains readable at 320 px and 200% zoom, and every
   attribution opens the exact reviewed source record.
8. A learner reaches `/crossings`, applies the accepted grammar, and sees the
   current-condition/last-mile safety handoff before acting.
9. Schematic geometry is consistently labelled and no page implies complete,
   fastest, safest, current, or turn-by-turn coverage.

## Automated checks

- Route generation covers all and only supported canonical district IDs.
- Every district profile resolves its corridor, hub, locality, gateway, source,
  media, and localization references.
- Roman Urdu and English required keys have structural parity.
- All source and media links use approved direct HTTPS records.
- Map/3D modules do not become a server-rendered-content dependency.
- Critical controls have accessible names, states, and non-hover activation.
- `npm run lint` and `npm test` pass from a clean install-compatible workspace.

## Manual QA matrix

- Current Chrome and Firefox: keyboard-only overview, district, map, photo,
  language, source, crossing, and return navigation.
- Narrow touch viewport: all seven district pages, caption wrapping, map detail,
  navigation, and crossing selection.
- Screen reader smoke test: landmarks, headings, district switcher, selection
  state, source links, safety limits, and language announcement.
- 200% zoom and 320 CSS px reflow.
- Forced reduced motion and forced-colors/high-contrast modes.
- WebGL blocked, basemap blocked, local overlay failure, image failure,
  localStorage unavailable, and unsupported geolocation.
- Direct-source link and licence verification for every shipped photo.
- Representative performance check for homepage and the heaviest district page
  on a mobile-sized connection/device profile.

## Completion gate

All V4 work packages are `Complete`; the seven-row source/content matrix names
the canonical districts and has no unexplained gap; lint and tests pass; manual
QA has no critical blocker; both languages and all failure paths preserve the
learning outcome; deployed route, asset, privacy, and source-link smoke checks
pass; and the v4 release record includes commit, visibility, rollback target,
known limitations, and review dates.

This gate was met by [private production release
v4](../releases/2026-08-14-v4.md). Broader participant research, additional
browser/screen-reader coverage, and a larger reviewed road inventory remain
post-release validation work; they do not change the shipped orientation-only
boundary.
