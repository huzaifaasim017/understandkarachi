---
title: Product roadmap
status: directional
owner: product maintainers
last-reviewed: 2026-08-13
review-cycle: monthly
---

# Product roadmap

The roadmap communicates sequence, not a delivery promise. Detailed current
work belongs in [the active plan](plans/active.md); behavior belongs in specs.

## Now — make the mental model usable

- Establish the Understand Karachi identity, responsive logo, favicon, and a
  purposeful, interactive entry into the city.
- Turn the map from a scroll-only illustration into an explanatory surface for
  touch, click, keyboard, and hover preview.
- Teach cross-city movement as `MODE → GATE → SPINE → HUB → LOCAL`.
- Add comprehension checks based on transfer to a new crossing, not fact
  recall.
- Keep architecture, data governance, localization, accessibility, and release
  documentation aligned with implementation.

Exit signal: moderated first-time users can orient south, distinguish layers,
and explain a plausible crossing plan without mistaking the guide for live
navigation.

## Next — validate and deepen

- Conduct task-based testing with visitors, new residents, motorcyclists,
  public-transport users, and accessibility participants.
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
