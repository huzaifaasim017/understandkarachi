---
title: Map interaction specification
status: accepted
implementation: partial
owner: product, design, and engineering maintainers
last-reviewed: 2026-08-14
review-cycle: every map-interaction change
---

# Map interaction specification

## Purpose

The map has two modes with different responsibilities:

- **Story map:** a synchronized teaching illustration controlled primarily by
  scroll, with optional feature inspection.
- **Explorer map:** a user-controlled surface for searching and selecting
  curated districts, corridors, gateways, junctions, and places.

Both use the same canonical feature IDs and explanations. Neither is a routing
map.

The homepage and district index also use a separate, optional Three.js
introduction. It depicts reviewed Karachi district geometry and selected
movement spines, not a third routing mode. Its district buttons and readable
detail panel provide the non-canvas interaction path, and its motion control is
contextual to that surface rather than a global header setting.

## Feature selection

On desktop, hover/focus may preview a feature. Click or Enter/Space locks the
selection. On touch, the first tap selects; a clearly labelled close action or
another selection dismisses/replaces it. Hover must never reveal unique content
that cannot be opened another way.

A selected feature detail contains, when relevant:

- primary name and familiar alias;
- entity kind and district context;
- one-sentence mental model (“connects A through B toward C”);
- connected-before and connected-after anchors for a corridor;
- current chapter relevance;
- status and verification date for transport/infrastructure;
- a precise caution or schematic limitation;
- source link when the detail includes a changing fact.

Do not expose coordinates as the main explanation or present a dense raw
property dump.

## Layer behavior

- Default story states show only the layers needed for the current lesson.
- Selection raises contrast of the selected feature and dims unrelated features
  without making them disappear from context.
- District, corridor, operating transit, developing transit, gateway, anchor,
  and drainage concepts use a label or line treatment in addition to color.
- A visible legend explains only currently available layer types.
- Camera movement never changes bearing away from the taught north-up model
  unless a future spec explicitly explains the change.
- The sea/south cue remains discoverable at city scale.

## Search and discovery

Search matches canonical names and approved aliases after normalization. Each
result states its kind and district where applicable. Selecting a result moves
the map, opens the same detail model, and leaves the result accessible outside
the map canvas. Empty queries may show a small curated starter set; no-result
copy suggests trying another name.

Search is not geocoding and must not imply exhaustive coverage.

The optional location estimate is user-triggered only. It requests one browser
position, processes it in memory, and reports the nearest curated anchor as an
approximation—not an address, road position, or navigation fix. It must not run
in the background, watch movement, persist a coordinate, or transmit a
coordinate to application storage. Permission denial and unavailable devices
fall back to search without losing functionality. This boundary is accepted in
[ADR-0004](../adrs/0004-bounded-browser-location-estimate.md).

## Input and accessibility

- Interactive map controls are keyboard reachable and have localized names.
- A non-map result/list path exposes equivalent selected-feature information.
- Focus is not moved into a popup automatically and is restored predictably on
  dismiss when needed.
- Touch targets meet the project accessibility standard.
- Selection remains usable at 200% zoom and a 320 CSS px viewport.
- Reduced motion uses immediate or minimal camera changes.

## Loading and errors

The map lazy-loads near the viewport. While loading, show meaningful localized
status rather than an empty rectangle. If basemap or local overlay loading
fails, retain the current lesson, a schematic/fallback cue, search results where
available, and a short explanation. Never hide the source limitation.

## Performance budget

- Do not load MapLibre or Three.js into initial server-rendered content when
  progressive loading is available.
- Reuse a map instance during its component lifetime; clean listeners, markers,
  popups, observers, animation frames, and WebGL resources on unmount.
- Avoid re-adding sources/layers on every story step; update filters, paint, and
  camera state.
- Cap rendering cost and animation for mobile/reduced-motion conditions.

## Acceptance scenarios

1. A touch user selects a district, reads its anchor/caution, then selects its
   main corridor without hover.
2. A keyboard user searches “Malir”, distinguishes district from landmark, and
   dismisses the detail.
3. A desktop user previews several corridors without losing a locked selection.
4. A reduced-motion user changes lessons without a long camera flight.
5. With tiles blocked, a learner can still state the lesson and use the curated
   results/details.
