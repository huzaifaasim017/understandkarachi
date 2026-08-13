---
title: Product roadmap
status: directional
owner: product maintainers
last-reviewed: 2026-08-14
review-cycle: monthly
---

# Product roadmap

The roadmap communicates sequence, not a delivery promise. Detailed current
work belongs in [the district atlas v4 plan](plans/district-atlas-v4.md);
behavior belongs in specs.

## Shipped — district atlas v4

- Kept `/` focused on Karachi-wide orientation, with a 3D Karachi geometry
  introduction instead of the former world scene.
- Made `/districts` and seven stable district URLs the deeper local learning
  path, rendered from one comparable template.
- Kept the full `MODE → GATE → SPINE → HUB → LOCAL` module at `/crossings` so a
  general explorer does not have to complete trip preparation first.
- Split district facts and bilingual presentation into their
  canonical owners, then validate the shared page model.
- Completed route, locale, source, keyboard, touch, reduced-motion, failure,
  photo, and narrow-layout QA for the private v4 release.

Exit signal met: the v4 plan's source/content matrix and release gates passed,
all route classes smoked successfully, and the immutable private release has a
recorded rollback target in [release v4](releases/2026-08-14-v4.md).

## Now — validate and deepen

- Conduct task-based testing with visitors, new residents, motorcyclists,
  public-transport users, and accessibility participants.
- Measure whether users can move from the city overview into an unfamiliar
  district and explain one selected corridor chain without treating it as exact
  navigation.
- Expand curated junctions, exits, transfer anchors, fuel/rest considerations,
  and alternate corridor concepts only where sources support them.
- Build automated schema validation for source IDs, localization parity,
  coordinates, GeoJSON metadata, and review dates.
- Add a lightweight content-review dashboard or generated report without making
  the runtime depend on a database.
- Prepare an offline-friendly core lesson and printable crossing summary.

Exit signal: success measures in the charter are measured with documented
evidence, not inferred from page completion.

## Later — institutional readiness

- Formalize review roles with relevant civic, transport, emergency, tourism,
  mapping, and accessibility stakeholders.
- Publish dataset version history, correction workflow, service-level ownership,
  and machine-readable provenance.
- Evaluate Sindh expansion through a separate information architecture rather
  than stretching Karachi-specific mental models.
- Consider current-condition or routing integrations only after privacy, safety,
  reliability, procurement, licensing, and failure-mode reviews.
- Develop public feedback and correction channels with moderation, audit trail,
  and abuse prevention.

## Explicitly not scheduled

Automatic rerouting, real-time traffic/flood/crime scoring, silent background
location tracking, and unreviewed crowd reports are not assumed roadmap items.
Each requires a new RFC, ADR, threat/privacy review, data owner, and operational
commitment.
