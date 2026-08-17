---
title: Civic presentation specification
status: accepted
implementation: in-progress
owner: product and content maintainers
last-reviewed: 2026-08-14
review-cycle: every briefing-surface content or structure change
---

# Civic presentation specification

## Purpose

Provide one static, sourced, printable surface that assembles Understand
Karachi's canonical data into a structured briefing for an external
institutional audience (government office, civic partner, investor,
handoff/sale conversation). Origin: [RFC-0003](../rfcs/0003-route-internalization-infrastructure-diagnostics-and-civic-presentation.md).

This surface is a rendering of existing facts, not a new fact store, and not
an authoring tool.

## Route

`/briefing`. Linked from the site footer/navigation as a secondary, clearly
labeled surface — never inserted into the primary traveller learning
sequence defined by the [learning journey spec](learning-journey.md).

## Content model

Renders exclusively from existing canonical sources: `karachiFacts`,
`districts`, `mainCorridors`, `districtProfileFacts`, and
`InfrastructureGap` records (see
[infrastructure diagnostics spec](infrastructure-diagnostics.md)). No new
fact is authored on this page; every figure traces to
`app/karachi-data.ts` or `app/features/infrastructure/`.

Fixed section order:

1. City shape and scale (`karachiFacts`).
2. Seven-district structure: one anchor and mental-model line per district.
3. City-scale corridor and gateway network.
4. Infrastructure diagnostics summary, grouped by category, each with its
   source and confidence label.
5. Product-boundary statement (see below) — fixed wording, not editable per
   audience.
6. Source list and verification date footer, listing `dataVerifiedOn` and
   every cited `sourceId` referenced on the page.

## Product-boundary statement

Section 5's wording states plainly that this is a structural/orientation
briefing, not a live-operations, engineering, or navigation system, matching
the boundary already established by
[ADR-0001](../adrs/0001-mental-map-not-live-navigation.md). This statement
MUST NOT be removed, shortened, or softened for any audience, including a
sales, partnership, or government pitch context — it is the safeguard against
the briefing being mistaken for a claim the product does not make.

## Rendering requirements

- Static, server-rendered HTML first. Any interactive enhancement is optional
  and never required to read the page.
- Must render meaningfully with JavaScript, WebGL, and map tiles unavailable
  — this page is the one surface explicitly meant to be projected, printed,
  or screen-shared to an audience whose device/network cannot be assumed to
  support the interactive map stack.
- Print styles (`@media print`) produce a clean, paginated document: no nav
  chrome, no interactive affordances, source list intact.
- Roman Urdu default and English parity, identical to every other surface. An
  institutional audience is not exempt from the localization policy.

## Accessibility

Same bar as every other page under the
[accessibility standard](../standards/accessibility.md): logical reading
order, 320 CSS px reflow, 200% zoom, no hover-only content, no color-only
distinction between diagnostic categories.

## Non-goals

- Not a slide-deck builder, WYSIWYG editor, or CMS.
- Not a second copy of district/corridor facts — a change to canonical data
  must be reflected here automatically, not re-entered.
- Not a claim of completeness beyond what `docs/data/source-policy.md`
  already supports for the underlying records.

## Acceptance criteria

- Every figure on `/briefing` traces to an existing canonical record; no
  duplicated or newly-authored fact appears only on this page.
- The product-boundary statement renders unmodified.
- The page is fully readable with JavaScript/WebGL/basemap unavailable and in
  print layout.
- Roman Urdu and English parity holds for all fixed copy.
- Source list includes every `sourceId` referenced on the page and the
  `dataVerifiedOn` date.
