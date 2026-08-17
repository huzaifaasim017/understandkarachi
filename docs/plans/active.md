---
title: Active implementation plan
status: complete
owner: project maintainers
started: 2026-08-14
last-updated: 2026-08-14
last-reviewed: 2026-08-14
review-cycle: update with every material merge or release
workstream: route-internalization-and-civic-diagnostics-v1
---

# Active implementation plan

## Objective

Move Understand Karachi from teaching recognizable facts to producing
internalized, predictive route understanding; add a sourced infrastructure-
diagnostics layer distinct from teaching content; and add a static,
canonical-data-only civic presentation surface for institutional audiences.
Origin: maintainer feedback that the shipped v3/v4 experience produced shallow
post-scroll recall, formalized in
[RFC-0003](../rfcs/0003-route-internalization-infrastructure-diagnostics-and-civic-presentation.md).

## Constraints

- Keep the product an orientation guide, not live navigation or a routing
  engine; infrastructure diagnostics describe standing structural
  characteristics, never a live-conditions claim.
- Preserve Roman Urdu default and complete English parity on every new surface.
- Predict-then-reveal checkpoints never block progress and never depend on
  hover alone.
- Infrastructure-diagnostics claims require the same source-policy evidentiary
  bar as any administrative/transport claim, with a visible
  sourced/commonly-reported distinction; never merged into existing
  `caution`/`remember` copy.
- The civic briefing surface renders only from existing canonical records (no
  new duplicated fact store) and its product-boundary statement is fixed,
  never softened for a sales/government audience.
- Do not add background or stored location tracking, or a new runtime data
  service.

## Work packages

| ID | Work package | Status | Governing document |
| --- | --- | --- | --- |
| P1.1 | Supersede "Recognition over recall" with "Recognition, then recall" | Complete | [Project charter](../project-charter.md) |
| P1.2 | Add predict-then-reveal checkpoint mechanic and integrate into homepage corridor/district steps and the first district-page route | Complete | [Learning journey](../specs/learning-journey.md) |
| P1.3 | Add closing no-hint synthesis exercise checked against canonical adjacency | Complete | [Learning journey](../specs/learning-journey.md) |
| P1.4 | Add `InfrastructureGap` data model with 5 sourced entries and render as a distinct "Known limitations" block on district pages | Complete | [Infrastructure diagnostics](../specs/infrastructure-diagnostics.md) |
| P1.5 | Add the `/briefing` civic presentation route | Complete | [Civic presentation](../specs/civic-presentation.md) |
| P1.6 | Bilingual copy for all new surfaces | Complete | [Localization style](../content/localization-style.md) |
| P1.7 | Automated contracts pass with the new surfaces present | Complete | `npm run lint`, `npm test` |

Note: the optional page-playback control (Play/Pause/Resume/Replay) referenced
in the learning-journey spec's "Optional page playback" section shipped
concurrently with this workstream and is covered by its own rendered-HTML test
("ships opt-in, pausable page playback…"); it is not a P1 deliverable of
RFC-0003 but is compatible with it.

## Required validation scenarios

1. A homepage visitor reaches a corridor or district predict-then-reveal
   checkpoint, can guess before the reveal, and is never blocked from
   continuing if they skip the guess.
2. A homepage visitor completes the closing synthesis exercise by selecting a
   graph-plausible district chain between two districts, verified against
   `districtProfileFacts` adjacency rather than an exact-string key.
3. A district page with infrastructure-diagnostics entries renders a visually
   distinct "Known limitations" block with category, confidence label, source
   link, and verification date; a district with none renders no such block.
4. `/briefing` renders city shape, all seven districts, all corridors, the
   infrastructure diagnostics summary, the unmodified product-boundary
   statement, and a source list, with JavaScript/WebGL/basemap unavailable and
   in print layout.
5. Roman Urdu and English preserve all new copy (checkpoint prompts, synthesis
   copy, infrastructure category labels, briefing copy).
6. Keyboard and touch users can complete a checkpoint and the synthesis
   exercise without hover.

## Completion gate

All P1 work packages are complete; `npm run lint` and `npm run test` (typecheck
+ production build + rendered-HTML contracts) pass with zero failures; every
new factual claim (infrastructure diagnostics) carries a real, independently
verifiable source per [RFC-0003](../rfcs/0003-route-internalization-infrastructure-diagnostics-and-civic-presentation.md)'s
acceptance gates.

## Follow-up, not part of this workstream

- Named data-steward assignment specifically for the infrastructure-
  diagnostics claim category (RFC-0003 open question 3 — requires maintainer
  decision, not an agent decision).
- Expanding predict-then-reveal checkpoints to `/crossings` and to every
  district-page route (current scope covers the homepage corridor/district
  steps and each district page's first route only).
- Moderated comprehension research measuring whether the predict/synthesis
  mechanic actually improves unaided route recall versus the prior
  recognition-only design.
- `/briefing` route naming and content sequencing confirmation for an actual
  government/institutional meeting (RFC-0003 open question 2).

These move to a new active plan when accepted; they should not expand this
workstream silently.

## Completion

This workstream completed 2026-08-14. `npm run lint` and `npm test` pass
(9/9 rendered-HTML contracts, production build, and typecheck). Any follow-up
starts a new plan rather than reopening these P1 statuses silently.
