---
title: QA and release checklist
status: active
owner: release maintainer
last-reviewed: 2026-08-13
review-cycle: every release
---

# QA and release checklist

Use this checklist for a production candidate. “Not applicable” requires a short
reason; a command passing does not replace the manual learning and interaction
checks.

## 1. Scope and evidence

- [ ] The release links to its plan/spec and states the traveller outcome.
- [ ] Unrelated working-tree changes are identified and preserved.
- [ ] New architecture follows accepted ADRs or includes an approved decision.
- [ ] New facts follow the [data and source policy](../data/source-policy.md).
- [ ] Roman Urdu and English express the same numbers, directions, status, and
      cautions.
- [ ] Source, media, and map attribution remain visible and accurate.

## 2. Automated verification

```bash
npm run lint
npm test
```

- [ ] Lint passes without suppressing a new relevant rule.
- [ ] The production build completes.
- [ ] Rendered-HTML and GeoJSON/data-contract tests pass.
- [ ] New critical behavior has a stable contract test where practical.
- [ ] No credential, private location, raw restricted data, or unexpected large
      artifact is included in the diff.

## 3. Learning journey

Complete one uninterrupted pass in each language:

- [ ] The sea/south rule is clear before corridor or district detail.
- [ ] District, neighbourhood, junction, station, and gateway are not conflated.
- [ ] All seven districts appear in a coherent order with a useful anchor.
- [ ] Major corridors show ordered connections, not isolated road names.
- [ ] A new crossing scenario can be described as
      `MODE → GATE → SPINE → HUB → LOCAL`, followed by a current-condition
      check.
- [ ] The page plainly states that it is not live navigation.
- [ ] There is no redundant heading/subheading or unsupported factual promise.

## 4. Interaction and responsive behavior

Check current Chrome, Firefox, and a WebKit-based browser where available:

- [ ] Scroll activates the expected lesson and map camera without oscillation.
- [ ] Every explorable feature works by tap/click; hover is only an enhancement.
- [ ] Keyboard users can reach, select, dismiss, and revisit map/search details.
- [ ] Language selection updates content, metadata, map controls, and document
      language and survives reload when storage is available.
- [ ] Search supports common approved aliases, labels result kind/district, and
      has a useful empty state.
- [ ] Mobile at 320–430 CSS px has no hidden controls or accidental page-wide
      horizontal scroll.
- [ ] Desktop sticky content does not cover reading or focus targets.
- [ ] Print output for the cheat sheet is legible.

## 5. Accessibility and resilience

Complete the matrix in the
[accessibility standard](../standards/accessibility.md), then confirm:

- [ ] Reduced motion disables nonessential Three.js and map camera motion.
- [ ] Focus indicators, skip link, headings, landmarks, and live feedback work.
- [ ] Color is supplemented by labels, line treatment, or text.
- [ ] Basemap unavailable: lesson, compass, limitation, and search result list
      remain understandable.
- [ ] WebGL unavailable: title and start action remain complete.
- [ ] localStorage unavailable: language switching still works for the visit.
- [ ] Slow connection/loading states do not look like empty broken panels.

## 6. Travel and data safety

- [ ] Emergency numbers and “current/operating” claims are within their maximum
      review interval.
- [ ] Proposed, developing, operating, and historical states are visually and
      textually distinct.
- [ ] Schematic geometry is not described as exact or routable.
- [ ] Weather, construction, closure, and travel-time uncertainty is visible
      where a user might act on an example journey.
- [ ] No feature implies continuous GPS or location storage without approval.

## 7. Release and post-release

- [ ] Create the production artifact from a clean, reviewed commit.
- [ ] Record commit, artifact/version ID, release time, owner, and visibility.
- [ ] Deploy using the linked Sites project in `.openai/hosting.json`.
- [ ] Smoke-test the public/private URL from a fresh session at `/` and verify
      static map data, photographs, favicon, and social image return successfully.
- [ ] Verify Roman Urdu default, English switch, map fallback, and source links.
- [ ] If checks fail, stop promotion or follow the rollback runbook.
- [ ] Update [the active plan](../plans/active.md) and relevant `last-reviewed`
      metadata.

Release record template:

```text
Commit:
Artifact/version:
Environment and visibility:
Released at (PKT/UTC):
Released by:
Checks/exceptions:
Rollback target:
```
