---
title: Cross-city guidance specification
status: accepted
implementation: complete
owner: product and data maintainers
last-reviewed: 2026-08-14
review-cycle: every corridor or crossing change
---

# Cross-city guidance specification

## Purpose

Teach a traveller how to reason about crossing Karachi at city scale without
claiming a current turn-by-turn route. This specification defines the user
contract; the accepted reusable data structure is in
[RFC-0001](../rfcs/0001-traveller-crossing-model.md).

The complete module lives at `/crossings`. The homepage and district atlas link
to it but do not duplicate the scenario interaction or place it before general
city exploration.

## Crossing grammar

Every crossing explanation uses the same five-part grammar:

```text
MODE → GATE → SPINE → HUB → LOCAL
```

`MODE` is selected before the map checkpoints. Each checkpoint then uses one of
`GATE`, `SPINE`, `HUB`, or `LOCAL`. Entry/through/exit/finish is a checkpoint
direction attribute; broad approach side is scenario context. Neither creates
another stage. A current-condition check follows as the required safety
handoff.

The explanation answers “why this checkpoint matters” and “what confirms I am
still moving through the intended part of the city.” It does not enumerate
every turn.

## Required information

For an approved crossing example, provide:

- broad direction and sea-relative orientation;
- eligible or relevant modes, without inferring access;
- named gates used for city entry/departure or internal start/finish context;
- ordered spine/hub chain;
- districts or major belts crossed, used as context rather than instructions;
- hub when the city-scale spine or direction changes;
- local checkpoint where city-scale teaching ends and exact guidance begins;
- road class/vehicle caveat when supported by a responsible source;
- weather, construction, congestion, service, and closure uncertainty;
- source IDs and verification date.

Do not publish estimated duration, fastest/safest language, access permission,
or passability unless supported by an approved current provider and separately
specified product capability.

## Interaction

- Scroll introduces one complete example and the grammar.
- A user can choose an entry and destination side to inspect additional approved
  examples.
- The map highlights one checkpoint at a time and the full chain remains
  readable in text.
- Selecting a checkpoint exposes connected features and its limitation
  according to the [map interaction spec](map-interaction.md).
- A compact summary can be printed or captured, but it includes the verification
  handoff and review date.

## Motorcycle and long-distance travellers

The interface may offer traveller-specific preparation reminders—fuel, rest,
daylight, weather, emergency contact, exact destination pin—but must not infer
that a road or controlled corridor permits motorcycles. Vehicle-access advice
requires an authoritative, current source and explicit effective date.

The guide should help a traveller identify their side of entry and avoid a
wrong city-scale direction; it must not encourage looking at a phone while
riding or driving. Copy should instruct users to stop safely before interacting.

## Safety handoff

Before a traveller acts, the experience states:

- stop safely before using the guide;
- confirm live road/weather/closure conditions;
- share the exact destination pin or full address;
- use signs or a current navigation/transport source for the last mile;
- avoid floodwater and do not infer depth from a schematic drainage layer;
- use verified emergency contacts when needed.

## Acceptance criteria

- A novice can apply `MODE → GATE → SPINE → HUB → LOCAL` and identify the local
  handoff for an unfamiliar example.
- The same model works in Roman Urdu and English without different facts.
- Map, chain, details, and printable summary use the same stable feature IDs.
- No essential stage depends on hover, animation, or live tiles.
- A user cannot reasonably mistake the output for live turn-by-turn navigation.
- All changing claims are within the data-policy review interval.

The current prototype inventory carries source IDs and a 2026-08-14 evidence
check. That supports conceptual teaching only. Material relationship changes,
new scenarios, or claims of access and operation remain subject to named
data-steward review; this spec does not approve a particular road as passable or
recommended.
