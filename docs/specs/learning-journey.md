---
title: Learning journey specification
status: accepted
implementation: partial
owner: product and content maintainers
last-reviewed: 2026-08-13
review-cycle: every learning-flow change
---

# Learning journey specification

## Outcome

A learner starting with zero Karachi context can form a reusable city model in
one continuous pass, then demonstrate it on an unfamiliar cross-city scenario.
Completion of the scroll is not itself success; transfer of understanding is.

## Required sequence

The primary journey follows this dependency order:

1. **Compass:** Arabian Sea is south; old core/port south-west, airport east,
   M-9 north-east, Hub west.
2. **Anchors:** establish a small stable set of city-side gateways and hinges.
3. **Crossing grammar:** `MODE → GATE → SPINE → HUB → LOCAL`, with one complete
   conceptual crossing and a current-condition handoff.
4. **Movement spines:** roads are taught as ordered connections between anchors,
   including N-5/N-25 gateways and the separate M-9 vehicle constraint.
5. **Landmark language:** chowrangi/chowk/mor/pul/phatak/naka and chains used in
   spoken directions.
6. **Administrative scale and layers:** division → district → subdivision →
   familiar area, followed by all seven districts with a broad position, useful
   anchor, main movement connection, and naming caution.
7. **Gateways, transit, and systems:** distinguish arrival points, operating vs
   developing services, and responsible infrastructure owners.
8. **Conditions:** distance is not travel time; weather, traffic, closures, and
   construction can change a plan.
9. **Address and last mile:** area + block + road + landmark + exact pin.
10. **Application:** additional crossing concepts, map exploration, approximate
    nearest-anchor help, and transfer questions.

A later step may recap an earlier anchor, but it must not require a term that has
not been introduced.

## Step contract

Each scroll step has one learner question, one direct heading, at most one short
explanation, and one visual/detail payload. Avoid supporting headings, slogans,
and “remember” blocks that duplicate the main idea.

The synchronized map may highlight the current concept but cannot carry the
only explanation. Photos must reinforce a location relationship, not interrupt
the lesson as decoration.

## Memory supports

- Reuse the sea/south baseline throughout.
- Keep anchor names, feature colors, and corridor order stable.
- Display landmark chains in travel order with direction arrows.
- Label entity kind when a familiar name can mean several things.
- Use recognition checks before free recall.
- End with a compact printable summary that preserves safety limitations.

## Assessment

At minimum, the experience checks:

- compass orientation;
- entity-layer distinction;
- separation of Karachi Port and Port Qasim;
- selection of an appropriate first anchor/corridor for a new crossing;
- recognition that live conditions and the last mile require another check.

Feedback explains the model briefly; it does not merely show correct/incorrect.
Questions must work without map hover and in both languages.

## Acceptance criteria

- A first-time user can explain south, four major anchors, and seven district
  positions after one pass.
- They can interpret a new landmark chain in the correct order.
- They can apply `MODE → GATE → SPINE → HUB → LOCAL` without claiming exact
  routing.
- Essential content is complete with map tiles, WebGL, motion, and localStorage
  unavailable.
- The experience meets the localization and accessibility standards.

Formal performance targets and research sample expectations live in the
[project charter](../project-charter.md), not here.
