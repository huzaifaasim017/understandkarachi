---
title: "ADR-0001: Mental map, not live navigation"
status: accepted
owner: product and engineering maintainers
accepted: 2026-08-13
last-reviewed: 2026-08-13
review-cycle: on navigation-scope change
---

# ADR-0001: Mental map, not live navigation

## Context

A first-time traveller needs to understand Karachi's scale, directions,
district layers, gateways, and major movement spines. Exact routing requires
current road topology, restrictions, traffic, closures, weather, vehicle
constraints, and operational support that this project does not currently own.
The shipped overlay lines are deliberately simplified.

## Decision

Understand Karachi is a teaching and orientation product. It may show schematic
corridors and example journeys, but it must not claim turn-by-turn accuracy,
optimality, travel time, road legality, or current passability. Every actionable
crossing model ends with an explicit current-condition and last-mile check.

The application will not request or store precise location as a requirement for
the core experience. Any future live-routing or geolocation feature requires a
new RFC, ADR, privacy/threat model, provider reliability plan, and distinct UI
that cannot be confused with the mental-map layer.

## Consequences

Positive:

- The lesson remains useful before, during, and after a single trip.
- Failure of a live provider cannot erase the core product.
- Data, privacy, and safety responsibilities stay proportionate to current
  capability.

Trade-offs:

- Users must switch to signs, an operator, or a current navigation source for
  the final route.
- Example journeys require careful wording and visible uncertainty.
- The map cannot market itself as a replacement for a navigation app.

## Compliance checks

- Geometry metadata says schematic/not routable.
- Copy uses “corridor”, “spine”, or “example journey” unless referring to a
  sourced transport route.
- Travel-time and passability promises are absent.
- The crossing spec includes a verification handoff.
