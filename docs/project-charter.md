---
title: Project charter
status: active
owner: product maintainers
last-reviewed: 2026-08-14
review-cycle: quarterly
---

# Project charter

## Purpose

Understand Karachi gives a first-time visitor enough structure to reason about
where they are, which direction they are moving, and which city-scale corridor
or gateway matters next. The experience should reduce dependence on memorizing
hundreds of place names.

## Primary audience

The primary user is a domestic or international traveller with little or no
Karachi context, using a phone before or during a long journey. They may know a
destination name but not whether it is a district, neighbourhood, junction,
station, or gateway. Their connection, language fluency, attention, and ability
to manipulate a map may be limited.

Secondary users include new residents, students, civic educators, tour
operators, and public-sector teams reviewing how the city is explained.

## User promise

After the city overview and the focused guide relevant to their intent, a
learner should be able to:

1. Keep the Arabian Sea to the south and place the old core, airport, M-9, and
   Hub exits in the correct broad directions.
2. Distinguish a district from a town, neighbourhood, cantonment, road,
   junction, landmark, and station.
3. Place all seven districts approximately and name their most useful anchor.
4. Recognize the major city spines and interpret a landmark chain in order.
5. Apply `MODE → GATE → SPINE → HUB → LOCAL` to a plausible city-scale
   crossing, then confirm its final leg with a current navigation or transport
   source.
6. Know that traffic, weather, construction, and service status can invalidate
   an old plan.

The product does not promise that a user can drive without live navigation,
local signs, or current operational checks.

## Product principles

- **Orient, then name.** Direction and anchors precede administrative detail.
- **Teach relationships.** “A connects B to C” is more useful than a detached
  place description.
- **One screen, one decision.** Each step should answer one learner question.
- **Progressive disclosure.** The scroll gives the main lesson; interaction
  reveals precise supporting detail.
- **Recognition, then recall.** Reuse stable colors, anchors, corridor chains,
  and wording so a concept is easy to recognize on first exposure. Before a
  learner leaves that concept's context, at least one checkpoint requires
  recalling it unaided, and the journey ends with a no-hint synthesis check.
  Recognition earns the first exposure; recall earns the claim that the
  learner now holds the model. See
  [RFC-0003](rfcs/0003-route-internalization-infrastructure-diagnostics-and-civic-presentation.md).
- **Safe uncertainty.** Label schematic, dated, disputed, proposed, or changing
  information plainly.
- **No input-mode privilege.** Touch, click, keyboard, and reduced-motion users
  receive the same essential content.

## Scope

In scope now:

- Karachi Division orientation and seven-district mental model
- A comparable index and shared deep-dive page for each reviewed district
- Selected major corridors, gateways, landmark language, and transit status
- Curated place search and interactive explanatory map details
- Roman Urdu and English content parity
- Dedicated traveller-focused cross-city examples, safety reminders, and
  source dates
- Accessible, responsive, progressively enhanced presentation

Out of scope until separately approved:

- Turn-by-turn routing or automatic route optimization
- Real-time traffic, closures, flood depth, crime, or transport arrival claims
- Background geolocation, trip tracking, or precise-location storage
- Surveying, cadastral, legal-boundary, or emergency-dispatch use
- Crowd-sourced incident reports or unmoderated place edits
- Commercial bookings, fares, ticketing, or vehicle dispatch

## Success measures

Before broad public or administrative adoption, establish a baseline and then
measure:

- At least 80% of moderated first-time users correctly answer the compass,
  gateway, and district-layer checks after one pass.
- At least 75% can apply `MODE → GATE → SPINE → HUB → LOCAL` to a new crossing
  scenario.
- At least 90% notice that the guide is not live navigation and identify where
  current conditions must be checked.
- No critical keyboard, touch, contrast, reduced-motion, or screen-reader
  blocker in the supported test matrix.
- 100% of operational, administrative, and emergency claims have a source owner
  and review date.

These targets are product acceptance criteria, not evidence that the current
prototype has already achieved them.

## Governance

Maintainers approve releases and architecture decisions. A named data steward
must approve administrative, transport, emergency, or boundary changes.
Institutional partnership or public-sector branding does not override the
[data and source policy](data/source-policy.md) or the distinction between
orientation and navigation.
