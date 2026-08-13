---
title: Active implementation plan
status: complete
owner: project maintainers
started: 2026-08-13
last-updated: 2026-08-14
last-reviewed: 2026-08-14
review-cycle: update with every material merge or release
workstream: next-level-traveller-orientation
---

# Active implementation plan

## Objective

Move Understand Karachi from a strong district overview to an interactive
traveller mental model: a memorable identity, purposeful introduction, map
details available by touch/click/keyboard, and a clear method for crossing the
city at corridor level.

## Constraints

- Keep the product an orientation guide, not live navigation.
- Preserve Roman Urdu default and complete English parity.
- Keep canonical facts separate from localized explanation.
- Do not add background or stored location tracking, unverified access advice,
  or a new runtime data service. The bounded one-shot estimate in ADR-0004 is
  the only approved location behavior.
- Meet the accessibility and data-governance standards before release.

## Work packages

| ID | Work package | Status | Governing document |
| --- | --- | --- | --- |
| P0.1 | Establish Understand Karachi logo, favicon, and consistent identity | Complete | Project charter |
| P0.2 | Make the opening world purposeful, interactive, attractive, and resilient | Complete | [Learning journey](../specs/learning-journey.md) |
| P0.3 | Add map feature preview/selection and concise explanatory details | Complete | [Map interaction](../specs/map-interaction.md) |
| P0.4 | Teach the `MODE → GATE → SPINE → HUB → LOCAL` crossing grammar | Complete | [Cross-city guidance](../specs/cross-city-guidance.md) |
| P0.5 | Consolidate duplicate facts/components behind stable IDs | Complete | [ADR-0003](../adrs/0003-canonical-data-direction.md) |
| P0.6 | Establish canonical project, data, quality, operations, decision, and agent documentation | Complete | [Documentation index](../README.md) |
| P0.7 | Add/adjust automated contracts and complete bilingual interaction QA | Complete | [QA checklist](../quality/qa-release-checklist.md) |
| P0.8 | Release an immutable private version and record smoke/rollback details | Complete | [Release v3](../releases/2026-08-14-v3.md) |

## Required validation scenarios

1. A new visitor completes the guide and explains Karachi's south/east/west
   orientation without reopening the first lesson.
2. A phone user taps a district, its connected corridor, and an anchor, then
   reads why each matters.
3. A keyboard user performs the same selection through search/list controls.
4. A traveller entering from one regional side can identify a plausible
   city-scale crossing model and explicitly hands off the last mile.
5. Roman Urdu and English preserve all feature kinds, directions, status, and
   cautions.
6. Map tiles and WebGL are blocked; the core learning outcome remains available.
7. Reduced motion removes decorative/large camera movement.

## Completion gate

All P0 work packages are complete; `npm run lint` and `npm test` pass; manual
checks have no critical blocker; data review dates and attributions are current;
and the deployed version, commit, visibility, smoke results, and rollback target
are recorded.

## Follow-up, not part of this release

- Moderated comprehension research and baseline measurement
- Broader crossing inventory after data-steward approval
- Automated provenance/freshness reports
- Offline-first core lesson
- Public-sector partnership and correction governance

These move to a new active plan when accepted; they should not expand this
workstream silently.

## Completion

This workstream completed with private release v3 on 2026-08-14 PKT. The
immutable source, checks, live smoke results, and rollback target are recorded
in the [release record](../releases/2026-08-14-v3.md). Any follow-up starts a
new plan rather than reopening these P0 statuses silently.
