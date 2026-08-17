---
title: Infrastructure diagnostics specification
status: accepted
implementation: in-progress
owner: product and data maintainers
last-reviewed: 2026-08-14
review-cycle: every diagnostic entry addition or category change
---

# Infrastructure diagnostics specification

## Purpose

Document Karachi's known, standing route-network gaps — chokepoints, missing
links, planning gaps, riding/technical hazards, and capacity limits — as a
distinct, honestly-sourced layer separate from orientation teaching and
separate from live-condition claims. Origin: [RFC-0003](../rfcs/0003-route-internalization-infrastructure-diagnostics-and-civic-presentation.md).

This layer answers "what structural limitation should a traveller expect at
this corridor/district, independent of today's weather or traffic" — never
"is this passable right now."

## Data model

Canonical type lives beside other feature-scoped canonical data under
`app/features/infrastructure/`, following the `Provenanced` pattern in
`app/karachi-data.ts`:

```ts
type InfrastructureGapCategory =
  | "chokepoint"
  | "missing-link"
  | "planning-gap"
  | "riding-hazard"
  | "capacity-limit";

interface InfrastructureGap extends Provenanced {
  id: string;
  category: InfrastructureGapCategory;
  affectedCorridorIds: readonly CorridorId[];
  affectedDistrictIds: readonly DistrictId[];
  summary: string;
  detail: string;
  confidence: "sourced" | "commonly-reported";
  verifiedOn: IsoDate;
}
```

- `category` uses only the fixed enum above. No free-text severity, no
  political framing, no blame attribution.
- `confidence: "commonly-reported"` requires at least one `sourceId` (news
  reporting, an official advisory, or directly attributable public reporting)
  and renders a visible "commonly reported, not independently verified" label.
- `confidence: "sourced"` requires the same evidentiary bar as any other claim
  under the [data and source policy](../data/source-policy.md).
- `summary` is one orientation-level sentence. `detail` explains what a
  traveller/rider should expect, in plain language, without implying current
  passability.

## Separation from existing fields

`KarachiDistrict.caution` and `MainCorridor.remember` mean naming ambiguity or
memory aid, established meanings used consistently elsewhere in the app and
covered by existing tests. Infrastructure diagnostics MUST NOT be written into
those fields. They render in their own labeled block ("Known limitations").

## Presentation

- Rendered per corridor (on district pages where that corridor is the main or
  a listed corridor) and per district, grouped by `category`, each with its
  `confidence` label and `verifiedOn` date visible.
- Never rendered inline with, or visually indistinguishable from, the
  district/corridor teaching content.
- Never implies duration, current blockage, or a live status.
- Roman Urdu and English carry identical meaning; category labels and the
  "commonly reported" disclosure are translated in `app/karachi-i18n.ts`, not
  hardcoded per entry.
- Empty state: a district/corridor with no diagnostic entries shows no
  "Known limitations" block at all — absence of a block, not an empty one.

## Review requirement

Every `InfrastructureGap` entry is reviewed against the
[data and source policy](../data/source-policy.md) before release, same as
any administrative, transport, or emergency claim. This is the highest-
sensitivity claim category in the product — it documents that public
infrastructure has a deficiency — and an entry MUST NOT ship from an
unsourced assessment, personal opinion, or a coding agent's own judgment
presented as fact.

## Accessibility and failure behavior

- Diagnostics are server-rendered text; no canvas/map dependency to be
  readable.
- Meets the same [accessibility standard](../standards/accessibility.md) as
  every other content block: readable at 320 CSS px, usable at 200% zoom, no
  hover-only content.

## Acceptance criteria

- `InfrastructureGap` records exist only under `app/features/infrastructure/`.
- Every entry has `sourceIds`, `confidence`, and `verifiedOn`.
- Diagnostics never merge into `caution` or `remember` copy.
- A district/corridor with zero entries renders no diagnostics block.
- Roman Urdu and English parity holds for all category labels and disclosure
  copy.
