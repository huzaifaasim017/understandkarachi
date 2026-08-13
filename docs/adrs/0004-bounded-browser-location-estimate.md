---
title: "ADR-0004: Bounded browser location estimate"
status: accepted
owner: product and engineering maintainers
accepted: 2026-08-13
last-reviewed: 2026-08-13
review-cycle: every location-behavior change
---

# ADR-0004: Bounded browser location estimate

## Context

A first-time traveller may know neither the district nor the nearest named
junction. Manually searching is then difficult. Precise tracking, saved trips,
and external routing are outside the product boundary and introduce avoidable
privacy and safety risk.

## Decision

Allow one optional, explicit browser Geolocation API request after the user
presses “estimate my location.” Process the coordinate only in client memory,
compare it with the curated landmark list, and explain the nearest anchor as an
approximation. Show the user's point on the already loaded explorer map for the
current page session only.

The application does not start the request automatically, use `watchPosition`,
store the coordinate, send it to an application API/database, infer a street or
safe route, or claim the nearest anchor is the user's exact position. Permission
denial, timeout, an unsupported browser, or an out-of-area result keeps manual
search available.

The remote basemap provider may receive ordinary tile requests once the map is
used; this behavior and its external boundary remain disclosed in the security
policy.

## Consequences

This gives a lost visitor a useful city-scale anchor without creating location
history. Any future continuous tracking, server processing, analytics link,
external reverse geocoding, routing, or persistence requires a new privacy and
threat-model review and a superseding ADR.
