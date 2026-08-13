---
title: Documentation index
status: active
owner: maintainers
last-reviewed: 2026-08-14
review-cycle: every release
---

# Documentation index

This directory records why Understand Karachi exists, what it promises, how its
data is governed, and how a release is verified. Each topic has one canonical
document; other documents link to it instead of copying it.

## Start here

| Question | Canonical document | Status |
| --- | --- | --- |
| What problem and audience do we serve? | [Project charter](project-charter.md) | Active |
| What does a Karachi term mean here? | [Glossary](glossary.md) | Active |
| Which module owns what? | [System and repository boundaries](architecture/system-and-repository-boundaries.md) | Accepted |
| What data may we publish? | [Data and source policy](data/source-policy.md) | Active |
| How do Roman Urdu and English work? | [Localization style](content/localization-style.md) | Active |
| What accessibility bar must a change meet? | [Accessibility standard](standards/accessibility.md) | Active |
| What must pass before release? | [QA and release checklist](quality/qa-release-checklist.md) | Active |
| How is the service run or recovered? | [Operations runbook](operations/runbook.md) | Active |
| What shipped in the district-atlas workstream? | [District atlas v4 plan](plans/district-atlas-v4.md) | Complete |
| What shipped in the completed P0 workstream? | [P0 plan](plans/active.md) | Complete |
| What is currently deployed? | [Release v4](releases/2026-08-14-v4.md) | Released |
| What could happen later? | [Roadmap](roadmap.md) | Directional |

## Product specifications

- [Learning journey](specs/learning-journey.md): the required mental-model
  sequence and comprehension outcomes.
- [Map interaction](specs/map-interaction.md): pointer, touch, keyboard, and
  failure-state behavior.
- [Cross-city guidance](specs/cross-city-guidance.md): safe corridor-level
  guidance for a traveller crossing Karachi.
- [District deep dives](specs/district-deep-dives.md): the shared content,
  interaction, sourcing, and safety contract for all seven district pages.

## Decisions

Accepted ADRs describe decisions already in force:

- [ADR-0001: Mental map, not live navigation](adrs/0001-mental-map-not-live-navigation.md)
- [ADR-0002: Roman Urdu default with complete English](adrs/0002-bilingual-policy.md)
- [ADR-0003: Canonical data flows into localized views](adrs/0003-canonical-data-direction.md)
- [ADR-0004: Bounded browser location estimate](adrs/0004-bounded-browser-location-estimate.md)
- [ADR-0005: Static multi-page learning surfaces](adrs/0005-static-multi-page-learning-surfaces.md)

Accepted product direction:

- [RFC-0001: Traveller crossing model](rfcs/0001-traveller-crossing-model.md)
- [RFC-0002: District atlas and route separation](rfcs/0002-district-atlas-and-route-separation.md)

## Status vocabulary

- **Proposed:** open for review; not a shipping commitment.
- **Accepted:** approved direction or decision.
- **Active:** current operating policy, plan, or maintained reference.
- **Complete:** the scoped plan met its completion gate.
- **Released:** an immutable version was deployed and smoke-checked.
- **Directional:** useful sequencing without a delivery promise.
- **Superseded:** retained for history and linked to its replacement.
- **Deprecated:** still present temporarily but should not receive new use.

Every controlled document declares an owner, status, review date, and review
cycle. Update those fields when making a substantive change. Never mark an RFC
accepted without naming the approving maintainer in its decision record.
