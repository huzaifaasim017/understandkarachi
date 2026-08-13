---
title: Learning journey specification
status: accepted
implementation: in-progress
owner: product and content maintainers
last-reviewed: 2026-08-14
review-cycle: every learning-flow change
---

# Learning journey specification

## Outcome

A learner starting with zero Karachi context can form a reusable city-scale
model on the homepage, then choose either a district deep dive or the dedicated
crossing guide without first completing an unrelated module. Completion of a
scroll is not itself success; transfer of understanding is.

## Required sequence

The homepage follows this dependency order:

1. **Compass:** Arabian Sea is south; old core/port south-west, airport east,
   M-9 north-east, Hub west.
2. **Anchors:** establish a small stable set of city-side gateways and hinges.
3. **Movement spines:** roads are taught as ordered connections between anchors,
   including N-5/N-25 gateways and the separate M-9 vehicle constraint.
4. **Landmark language and transit:** chowrangi/chowk/mor/pul/phatak/naka,
   ordered chains, and the distinction between operating and developing systems.
5. **Administrative scale and layers:** division → district → subdivision →
   familiar area, followed by all seven districts with a broad position, useful
   anchor, main movement connection, and naming caution.
6. **Gateways and systems:** distinguish arrival points and responsible
   infrastructure owners.
7. **Conditions:** distance is not travel time; weather, traffic, closures, and
   construction can change a plan.
8. **Address and last mile:** area + block + road + landmark + exact pin.
9. **Application:** map exploration, approximate nearest-anchor help,
   recognition checks, printable summary, and clear onward links.

The linked learning surfaces then apply or deepen that model:

1. **District atlas:** `/districts` compares the seven districts and links one
   shared deep-dive template for each stable district ID. The local sequence is
   governed by the [district specification](district-deep-dives.md).
2. **Crossing guide:** `/crossings` teaches
   `MODE → GATE → SPINE → HUB → LOCAL`, a complete conceptual crossing, and the
   current-condition handoff. The homepage links to it but does not render the
   full scenario module inline.

A later step may recap an earlier anchor, but it must not require a term that has
not been introduced on that surface or made clear at its direct entry point.

## Step contract

Each scroll step has one learner question, one direct heading, at most one short
explanation, and one visual/detail payload. Avoid supporting headings, slogans,
and “remember” blocks that duplicate the main idea.

The synchronized map may highlight the current concept but cannot carry the
only explanation. The opening 3D surface must depict reviewed Karachi geometry,
not a decorative globe. Photos must reinforce a location relationship, use
their natural aspect ratio, and keep caption and attribution outside the image
crop.

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
  positions after one homepage pass.
- They can interpret a new landmark chain in the correct order.
- They can open any district profile or the crossing guide directly and retain
  a clear route back to the overall model.
- After the crossing guide, they can apply
  `MODE → GATE → SPINE → HUB → LOCAL` without claiming exact routing.
- Essential content is complete with map tiles, WebGL, motion, and localStorage
  unavailable.
- The experience meets the localization and accessibility standards.

Formal performance targets and research sample expectations live in the
[project charter](../project-charter.md), not here.
