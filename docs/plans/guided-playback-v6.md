---
title: Guided page playback v6 plan
status: active
owner: project maintainers
started: 2026-08-14
last-updated: 2026-08-14
last-reviewed: 2026-08-14
review-cycle: update at release
workstream: guided-page-playback-v6
---

# Guided page playback v6 plan

## Objective

Let a learner explicitly play the complete homepage lesson from the sea/south
compass rule to the document end while preserving the normal manual scroll
experience.

## Constraints

- Playback is page movement, not map-route playback or navigation.
- Roman Urdu remains the default and English has equivalent controls.
- Playback never starts automatically and remains pausable at all times.
- Manual input pauses playback without blocking the intended interaction.
- Reduced motion keeps the manual lesson and disables continuous movement.
- The fixed controller reflows at narrow widths and is hidden in print.

## Work packages

| ID | Work package | Status |
| --- | --- | --- |
| V6.1 | Add the bilingual hero Play action and fixed playback controller | In progress |
| V6.2 | Run the page from the compass step to an end sentinel | In progress |
| V6.3 | Pause on manual input, hidden tabs, and reduced motion | In progress |
| V6.4 | Add stable contracts and complete desktop/mobile browser QA | Pending |
| V6.5 | Release privately with immutable verification and rollback evidence | Pending |

## Completion gate

Lint and the full test suite pass; Play starts at `#step-compass`; Pause freezes
the page; Resume continues; manual input pauses; completion reaches
`#journey-end`; Roman Urdu and English labels are equivalent; the control fits
mobile and desktop viewports; reduced-motion users retain the complete manual
path; and the private deployed build passes production smoke checks.
