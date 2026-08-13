---
title: "RFC-0002: District atlas and route separation"
status: accepted
implementation: complete
owner: huzaifaasim017 (project maintainer), product, content, and data maintainers
created: 2026-08-14
accepted: 2026-08-14
approved-by: huzaifaasim017 (project maintainer)
last-reviewed: 2026-08-14
review-cycle: on learning-surface, district-scope, or route-model change
---

# RFC-0002: District atlas and route separation

## Decision record

Accepted by project maintainer huzaifaasim017 on 2026-08-14 in response to the
explicit product direction to remove the globe and global animation/still UI,
separate crossing preparation, and add a comparable deep guide for each
district.

## Summary

Separate three learning intents across four focused route classes:

```text
/                         Karachi overview and city-scale route explorer
/districts                Seven-district comparison and atlas index
/districts/[district-id]  One deep, scroll-led district guide
/crossings                Traveller crossing models and preparation
```

The homepage teaches Karachi's shape, compass, seven districts, gateways, and
major movement spines. Each district page then explains that district through a
repeatable local grammar. The crossing module remains available as a dedicated
tool, but no longer interrupts a visitor who only wants to understand the city.

The opening globe is replaced by an optional 3D representation of Karachi's
reviewed geometry and curated city-scale corridors. It introduces real product
information; it is not a decorative world scene or an exact navigation model.

## Problem

The single long page currently mixes three different intents:

- build an overall mental map of Karachi;
- inspect one district in depth;
- prepare for a particular cross-city journey.

Placing the full crossing lesson before general exploration creates an
unnecessary decision for visitors who have no trip scenario. A decorative
globe also consumes the strongest visual position without teaching Karachi's
shape or movement network. The overview cannot responsibly hold every district
detail without becoming dense, repetitive, and difficult to maintain.

Adding more facts to the existing scroll would increase reading without
creating a clearer hierarchy. A multi-page atlas gives each intent a direct
entry point while preserving shared facts, language, map interaction, and
safety limits.

## Goals

- Make the homepage the shortest complete introduction to Karachi's city-scale
  orientation and movement structure.
- Provide an equivalent deep-learning page for each of Karachi's seven reviewed
  district records.
- Give every district page the same predictable sequence, map controls, source
  treatment, and bilingual meaning.
- Move traveller crossing scenarios to `/crossings` without weakening their
  safety handoff or making them harder to find.
- Replace the world introduction with Karachi-specific 3D information that
  remains useful when animation or WebGL is unavailable.
- Keep factual claims traceable and avoid implying exhaustive road coverage,
  live conditions, or turn-by-turn accuracy.

## Non-goals

- A live routing engine, GPS tracker, traffic feed, or automatic itinerary.
- An exhaustive street, lane, service, business, or neighbourhood directory.
- Legal, cadastral, engineering, dispatch, or survey-grade boundaries.
- Claims that completing one page makes current signs, restrictions, weather,
  closures, or last-mile verification unnecessary.
- A separate copy of district facts or translations for every page.

The word “deep” means that each page explains the selected, sourced hierarchy
needed for orientation. It does not mean “every road” or “100% current.”

## Accepted information architecture

### Homepage: overall Karachi

The homepage answers, in dependency order:

1. What shape am I looking at, and where are north and the Arabian Sea?
2. Where are the seven districts relative to one another?
3. Which gateways and city-scale corridors organize movement?
4. Which anchor or district should I inspect next?

The first screen may show district geometry, selected major corridors, and a
short text equivalent. It must not show an animation/still control whose only
purpose is decorative. System motion preference and the persistent product
motion setting govern enhancement behavior.

The homepage links directly to all seven district pages and to the crossing
guide. It does not render the full crossing scenario module inline.

### District pages: local mental model

`/districts` compares all seven reviewed districts through the same broad
position, anchor, main corridor, and first-chain fields, then links to their
stable deep-dive routes. It is an index, not an eighth district profile and not
a second source of district facts.

`/districts/[district-id]` uses a stable district ID and one shared template.
Each page teaches:

```text
POSITION → EDGES → SPINES → HUBS → AREAS → GATEWAYS → VERIFY
```

- **POSITION:** where the district sits relative to the sea, centre, airport,
  port, and neighbouring districts;
- **EDGES:** memorable neighbouring districts or broad physical edges, never a
  legal-boundary claim from a schematic;
- **SPINES:** selected city-scale and district-scale movement corridors;
- **HUBS:** junctions, terminals, stations, bridges, or anchors that help a
  learner confirm location;
- **AREAS:** a curated set of familiar localities and their relationship to the
  district, with naming cautions where required;
- **GATEWAYS:** how the district connects to the rest of Karachi and regional
  approaches;
- **VERIFY:** source dates, schematic limits, live-condition check, and exact
  last-mile handoff.

Pages may include photos only when they clarify a geographic relationship.
Every photo has a readable caption outside the image's critical crop, a direct
source page, creator and licence where required, localized alt text, and an
editorial review date.

### Crossing page: trip intent

`/crossings` owns the full accepted crossing grammar from
[RFC-0001](0001-traveller-crossing-model.md). It supports visitors who are
entering, leaving, or passing through Karachi. The global navigation and
relevant district/corridor details can link to it, but the district pages do
not duplicate its scenarios.

## Accepted 3D introduction

The hero depicts Karachi rather than the world. Its visual inputs come from the
same reviewed local district geometry and stable corridor IDs used elsewhere.
The enhancement may extrude districts, highlight a selected district, and show
schematic movement spines. It must:

- begin in a consistent north-up, sea-south orientation;
- expose the district name and relationship in ordinary HTML after hover,
  focus, click, or tap;
- provide click/tap and keyboard alternatives to every hover preview;
- stop decorative motion when reduced motion is active;
- avoid continuous rotation, misleading terrain/elevation, or route playback;
- load after useful title, orientation, and district links are available; and
- fail to a complete 2D/text introduction without blocking navigation.

Height, glow, animated particles, and line motion are visual emphasis only.
They must never represent population, traffic, danger, road width, travel time,
or administrative importance unless a future sourced specification explicitly
defines that encoding.

## Data and content model

District deep dives derive from shared stable IDs. Canonical records belong in
`app/karachi-data.ts`; bilingual explanations belong in
`app/karachi-i18n.ts`; geometry belongs under `public/data/` with provenance.
The shared district template may compose records under `app/features/`, but it
must not become a second unsourced fact store.

Every district profile records or derives:

- district ID, official/familiar name, and source IDs;
- reviewed orientation and adjacency context;
- selected corridor, hub, gateway, and locality IDs;
- uncertainty or naming caution;
- last-reviewed or claim-level verification date where required; and
- media IDs with direct provenance.

The same record drives homepage links, district navigation, page sections, map
selection, text fallback, source list, tests, and metadata where applicable.

## Source and completeness policy

“Complete” means that all required sections have reviewed content and every
displayed claim has an appropriate evidence path. It does not mean all streets
or changing operations are represented.

The source hierarchy and freshness windows in the
[data policy](../data/source-policy.md) apply. Administrative relationships,
transit status, infrastructure, and corridor claims show the applicable review
or effective date. Missing or disputed evidence produces a visible limitation;
it is not filled with an inference from a basemap or photograph.

Every district page includes a concise “coverage and limits” disclosure and a
direct source list. A correction must update the canonical record first so all
surfaces remain aligned.

## Localization and copy

Roman Urdu remains the first-visit default and English remains a complete
alternative. Page navigation, route labels, controls, source introductions,
captions, image alt text, empty/error states, cautions, and metadata meaning
have locale parity. Proper nouns stay recognizable for signs and map search.

Copy follows one-heading/one-idea structure. A heading is not followed by a
decorative slogan or a sentence that merely repeats it. Optional detail may be
revealed through interaction, but the core district model remains readable in
the page sequence.

## Accessibility and failure behavior

- All essential relationships are server-rendered in logical reading order.
- District and corridor meaning is available without hover, color, motion,
  3D, a basemap, or JavaScript enhancement.
- Map and 3D selection work by touch and keyboard, with visible focus and
  44-by-44 CSS pixel targets where practical.
- The experience reflows at 320 CSS pixels and remains usable at 200% zoom.
- Reduced motion removes decorative rotation, particle travel, pulsing, smooth
  camera transitions, and scroll-tied transforms.
- Failure states identify what did not load and preserve district navigation,
  text relationships, source links, and safety limits.

## Safety boundary

The atlas teaches orientation, not action-ready directions. Schematic lines are
called corridors or movement spines, never exact routes. Pages do not promise
travel time, road access, vehicle eligibility, service availability, current
passability, or a safest/fastest path without a separately approved and current
source. A traveller must stop safely before interacting and check signs,
restrictions, weather, closures, current transport information, and the exact
last mile before acting.

## Alternatives considered

### Keep one increasingly long homepage

Rejected because crossing preparation, overall orientation, and district study
have different user intents. It also encourages duplicated sections and makes
progress and source scope harder to understand.

### Create seven custom district experiences

Rejected because per-page layouts would drift in coverage, localization,
accessibility, and source presentation. One template with stable records keeps
the experience comparable while allowing district-specific facts.

### Embed a general 3D globe or third-party route planner

Rejected. The globe does not teach Karachi; a third-party planner would expand
privacy, licensing, reliability, and safety responsibilities beyond this RFC.

## Acceptance gates

- `/` presents a Karachi-specific overview and links all learning surfaces.
- `/districts` compares and links all seven supported district profiles.
- Seven stable `/districts/[district-id]` pages render from one shared model.
- `/crossings` contains the full crossing module and the homepage does not.
- The 3D introduction and interactive maps have equivalent text/list paths.
- Roman Urdu and English pass content-parity review.
- All new claims and media pass provenance and freshness checks.
- Keyboard, touch, reduced-motion, 320 px reflow, 200% zoom, WebGL-off, and
  basemap-off checks have no critical blocker.
- Automated data, route, locale, lint, and test contracts pass before release.
