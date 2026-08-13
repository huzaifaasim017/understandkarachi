---
title: "ADR-0005: Static multi-page learning surfaces"
status: accepted
owner: product and engineering maintainers
accepted: 2026-08-14
last-reviewed: 2026-08-14
review-cycle: on route, rendering, or content-ownership change
---

# ADR-0005: Static multi-page learning surfaces

## Context

The original application concentrates city orientation, district discovery,
and traveller crossing guidance in one long client experience. These intents
now have enough depth that a single scroll weakens hierarchy, forces unrelated
content into the initial journey, and makes district expansion prone to copied
facts and UI exceptions.

The product has seven reviewed district IDs, shared geometry, localized copy,
and a server-rendered React/Next.js foundation. District content changes less
often than live operational data and does not require a runtime database. The
core lesson must remain linkable, indexable, resilient without WebGL, and
complete in initial HTML.

## Decision

Use static, addressable learning surfaces built from canonical records:

- `/` is the overall Karachi orientation and route-explorer entry point;
- `/districts` is the seven-district comparison and atlas index;
- `/districts/[district-id]` is a statically generated page for each supported
  district ID; and
- `/crossings` owns the separate traveller crossing experience.

One shared district template renders all seven pages. Route parameters resolve
only against canonical district IDs; unsupported IDs return the framework's
not-found state. Page metadata, navigation, map selection, fallback lists, and
source panels derive from the same district record rather than parallel page
objects.

Interactive maps, Three.js, and scroll effects remain client-side progressive
enhancements. The page's heading, compass relationship, district model,
corridor/hub/area lists, limitations, source links, and onward navigation are
server-renderable content. Enhancement failure does not collapse the page into
an empty hero or map shell.

Roman Urdu remains the default and the shared language control persists the
user's selection where storage is available. English remains complete across
all routes. Shared shell and locale modules prevent each route from inventing a
different navigation or language contract.

## Rationale

Static route generation provides durable URLs and complete initial content
without introducing a database, content API, or user state. A shared template
keeps seven district pages comparable and makes missing data visible through
schema/tests. Separating `/crossings` lets the homepage serve general
exploration while retaining the accepted crossing model for explicit trip
intent.

The decision preserves the one-way data direction in
[ADR-0003](0003-canonical-data-direction.md):

```text
reviewed source
  -> canonical district/corridor/media record
  -> localized explanation
  -> shared page template
  -> static route plus optional client enhancement
```

## Boundaries

- A URL does not imply a separately maintained fact store.
- Static generation does not certify that changing transport or road conditions
  remain current; freshness policy and visible dates still apply.
- Client-side locale persistence does not justify omitting one language from
  rendered content contracts or tests.
- 3D district extrusion is illustrative and must not encode unsourced height,
  traffic, population, danger, or legal boundary precision.
- Schematic corridor geometry is never passed to a routing engine.
- Adding live routing, accounts, persistent location, or a runtime content
  database still requires a new architectural decision and applicable privacy
  review.

## Consequences

Positive:

- Visitors can enter the overall guide, district index, a specific district, or
  crossing help directly and share that context with a stable URL.
- District depth can increase without making the homepage unbounded.
- Static HTML improves resilience, discoverability, and non-map accessibility.
- Shared IDs and templates reduce translation, source, and UI drift.
- Route completeness can be validated at build/test time.

Trade-offs:

- Shared navigation and locale state must work consistently across full route
  transitions and direct page loads.
- Seven pages expose missing canonical relationships that a broad overview may
  previously have hidden.
- A change to the district template affects every district and requires
  representative plus parity testing.
- Page-specific metadata and source lists add build-time validation work.

## Rejected alternatives

### One client-only page with hidden panels

This keeps unrelated intents in the same document, produces weak deep links,
and makes initial content depend more heavily on JavaScript state.

### Seven handwritten page components

This permits richer exceptions but duplicates layout, facts, cautions,
translations, and source behavior. Drift risk outweighs the benefit.

### Runtime CMS or database

Current reviewed content is repository-governed and release-based. A mutable
runtime dependency adds operational and provenance complexity without solving
the accepted use case.

## Compliance checks

- Build output contains `/`, `/districts`, `/crossings`, and exactly one
  district route for each supported canonical district ID.
- Invalid district IDs use the not-found path and never fall back to an
  unrelated profile.
- One district template and shared shell are used across the routes.
- Essential district content appears without the map/3D client modules.
- Locale parity tests cover route navigation, headings, labels, states,
  cautions, captions, and source introductions.
- Canonical fact, translation, and geometry ownership remains within repository
  boundaries.
- No route introduces live-navigation or persistent-location behavior.
