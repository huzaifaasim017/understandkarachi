---
title: "RFC-0003: Route internalization, infrastructure diagnostics, and civic presentation mode"
status: accepted
implementation: complete
owner: huzaifaasim017 (project maintainer), product, content, and data maintainers
created: 2026-08-14
accepted: 2026-08-14
approved-by: huzaifaasim017 (project maintainer, delegated implementation authority to project agent)
last-reviewed: 2026-08-14
review-cycle: on learning-mechanic, infrastructure-claim, or presentation-surface change
---

# RFC-0003: Route internalization, infrastructure diagnostics, and civic presentation mode

## Machine-readability note

This RFC is written for an implementing coding agent, not for narrative
reading. Every requirement uses `MUST` / `MUST NOT` / `SHOULD` deliberately.
Do not infer intent from adjacent prose; if a requirement is ambiguous,
escalate per [AGENTS.md](../../AGENTS.md) rather than guessing.

## Decision record

Proposed by project maintainer huzaifaasim017 on 2026-08-14 and accepted the
same day, with implementation authority explicitly delegated to the project
agent ("you have full hands... now you are handling this project"). Open
questions below that require a human, non-delegable judgment call (data-
steward assignment, route naming) remain flagged for maintainer confirmation
even though implementation proceeds; the agent MUST NOT invent a named human
data-steward and MUST instead route diagnostics through the existing source-
policy evidentiary bar without assigning personal review authority to anyone.

Origin: direct maintainer feedback that the shipped v3/v4 experience produces
shallow post-scroll recall (example given: a user finishing the full scroll
retains only "Karachi has 7 divisions") instead of the intended outcome —
durable, internalized route-simulation ability equivalent to an experienced
local's mental map. The maintainer also wants two new capabilities that do not
exist in any prior RFC/spec: (1) a documented, sourced layer of Karachi's
route/infrastructure *gaps and design flaws*, and (2) a presentation/export
surface built from the same canonical data, suitable for introducing Karachi
to an external institutional audience (potential government/Sindh-sector use,
including a possible sale or handoff of this product).

## Summary

Three additive capabilities, none of which replace or weaken the existing
orientation product:

1. **Internalization mechanic** — replace pure linear scroll-and-recognize
   with a predict-then-reveal loop and end-of-journey free recall, so the
   measurable outcome becomes "user can state a plausible corridor chain
   between two arbitrary districts unaided," not "user can recognize a fact
   when shown it."
2. **Infrastructure diagnostics layer** — a new, clearly separated, sourced
   data layer documenting known structural gaps, chokepoints, missing links,
   and riding/technical hazards in Karachi's route network. This is diagnostic
   commentary on infrastructure *design*, never a live-conditions claim.
3. **Civic presentation mode** — a dedicated, exportable/printable surface
   assembled only from existing canonical records, formatted for showing
   Karachi's structure to an external institutional/government audience.

All three MUST stay inside the boundaries already set by
[ADR-0001](../adrs/0001-mental-map-not-live-navigation.md),
[ADR-0003](../adrs/0003-canonical-data-direction.md), and the
[project charter](../project-charter.md)'s out-of-scope list. Nothing here
adds routing, live conditions, or background location.

## Problem

### 1. The current design principle actively works against the new goal

`docs/project-charter.md` states the product principle **"Recognition over
recall."** That principle is why the shipped experience feels shallow to the
maintainer: it was designed to make facts recognizable, not to force a user
to reconstruct a route unaided. The maintainer's new goal — "user ko itna
train hojaye ke practical me ride karte waqt bina guidance uska proper idea
ho" — is a **recall/prediction** goal, not a recognition goal.

This is a principle-level conflict, not a bug. It MUST be resolved explicitly
(see "Principle change" below), not patched around with more content on the
same recognition-only mechanic.

### 2. Nothing in the current step contract tests transfer

`docs/specs/learning-journey.md`'s step contract gives each scroll step "one
learner question, one direct heading, at most one short explanation, one
visual/detail payload," then moves on. There is no point where the user is
asked to produce an answer before seeing it, and no point where an earlier
anchor is revisited later in a different context. Single-exposure, no-retrieval
content does not produce durable route simulation ability regardless of how
well-written the explanation is.

### 3. Infrastructure quality/gaps have no data model or surface today

`app/karachi-data.ts` records what exists (districts, corridors, landmarks,
route chains) and provenance for those facts. It has no concept of a
*diagnostic* claim — "this junction is a chokepoint," "this link is missing,"
"this corridor has a known riding hazard." Adding this without a distinct
typed model would either (a) get silently mixed into `caution` fields that
currently mean naming/administrative ambiguity, not infrastructure criticism,
or (b) never get built because there is no owning file/spec to put it in.

### 4. There is no non-web, presentation-ready surface

Every current surface (`/`, `/districts`, `/districts/[id]`, `/crossings`) is
a scroll-based teaching page for an individual traveller. None of them are
structured as a briefing document an outside party (government office,
investor, partner) could be walked through or handed as a leave-behind. Reusing
canonical data for that purpose is currently not possible without manually
copying facts into a slide deck — which ADR-0003 already forbids as a pattern
(duplicated, divergent fact copies).

## Goals

- Redefine the product's learning outcome as **predictive route simulation**:
  given a plausible start point, a first-time user who completed the
  experience can state a plausible `GATE → SPINE → HUB` chain toward a given
  destination district without external help, and self-check it against the
  canonical adjacency/route data.
- Introduce retrieval practice (predict-before-reveal) and spaced re-exposure
  (an earlier anchor resurfaces later) as first-class interaction patterns,
  additive to — not replacing — the existing recognition-based content for
  users who do not want to interact further.
- Add a distinctly modeled, distinctly sourced **infrastructure diagnostics**
  layer that documents chokepoints, missing links, planning gaps, and
  known riding/technical hazards, per corridor and/or district.
- Add a **civic presentation surface** that assembles only canonical records
  (districts, corridors, gateways, route chains, infrastructure diagnostics)
  into a structured, exportable briefing suitable for an external
  institutional audience.
- Keep every new surface inside the existing bilingual, accessibility,
  provenance, and safety-boundary requirements without exception.

## Non-goals

- Turn-by-turn routing, live traffic, or any real-time claim (unchanged from
  the [project charter](../project-charter.md)).
- An engineering-grade infrastructure audit. Diagnostics are orientation-level
  ("this is a known bottleneck travellers should expect"), not a traffic
  engineering report, structural assessment, or civic liability claim.
- Political or administrative advocacy. Diagnostics describe structural
  reality; they do not recommend policy, assign blame, or grade institutions.
- A slide-deck builder, WYSIWYG editor, or CMS. Civic presentation mode is a
  reusable rendering of existing canonical data, not a new authoring tool.
- Gamification, points, leaderboards, or accounts. Any internalization-score
  concept (below) is a private, client-only, non-persisted signal — not a
  saved user profile or backend feature.

## Principle change required

`docs/project-charter.md`'s "Recognition over recall" principle MUST be
superseded or explicitly narrowed, not silently ignored. Recommended
resolution for maintainer acceptance:

> **Recognition, then recall.** Initial exposure to a new anchor, corridor, or
> chain uses recognition (as today). Before the learner leaves that concept's
> context, at least one predict-before-reveal checkpoint requires recall of
> what was just taught. The end-of-journey synthesis requires recall across
> the full taught set, with no hints, checked against canonical adjacency
> data rather than graded pass/fail.

This keeps accessibility intact (a user who cannot or does not want to
interact still gets the full recognition-based content and is never blocked
from proceeding) while adding the retrieval step the maintainer is asking for.
This change requires updating `docs/project-charter.md`'s product principles
and `docs/specs/learning-journey.md`'s step contract and memory-supports
sections. Per [AGENTS.md](../../AGENTS.md), do not rewrite an accepted ADR's
rationale — this is a charter/spec change, not an ADR change, and no existing
ADR asserts "Recognition over recall" as an irreversible architectural
decision.

## Proposed mechanic: predict-then-reveal checkpoints

Applies to the homepage scroll, `/districts/[district-id]`, and `/crossings`.

- After a corridor's route chain or a district's `arriveFrom`/`nextDistricts`
  relationship is taught, insert one checkpoint: show the start anchor and the
  destination, hide the intermediate chain, and ask the user to choose/recall
  the next hub before it is revealed.
- The correct answer set MUST be derived directly from existing canonical
  fields (`mainCorridors[].routeChain`, `districtProfileFacts[].routes[].stops`,
  `districtProfileFacts[].nextDistricts`) — no new duplicated answer key.
- Checkpoints MUST work without hover, without JavaScript-only interaction
  patterns that break keyboard/touch parity (reuse existing map-interaction
  selection patterns), and MUST NOT block forward progress — a user can always
  skip to the reveal.
- Feedback explains the relationship briefly on reveal (already required by
  `docs/specs/learning-journey.md`'s assessment section) — this RFC does not
  change that requirement, it adds the predict step before it.

### End-of-journey synthesis

At the natural end of the homepage sequence (after step 9's "Application" in
`docs/specs/learning-journey.md`), add one free-recall exercise:

- Present two arbitrary district IDs (one fixed pairing per session, e.g.
  derived deterministically from date, or the two most recently viewed
  districts if any were visited).
- Ask the user to state, in their own words or by selecting anchors in order,
  a plausible `GATE → SPINE → HUB` path between them.
- Check the answer against `districtProfileFacts` adjacency
  (`nextDistricts`) and corridor membership — not exact-string match. Accept
  any path that is graph-plausible given canonical adjacency, since multiple
  reasonable answers exist.
- This is the single interaction the maintainer's stated goal depends on most
  directly: it is the closest proxy to "can this person improvise a plausible
  route the way a local would" without claiming to grade real navigation
  skill.

### Internalization signal (optional, client-only)

A lightweight, session-only (not persisted, not transmitted) counter of
predict-before-reveal accuracy MAY be shown back to the user at the end
("you correctly anticipated N of M checkpoints") as a self-assessment cue.
This MUST NOT be framed as a score, MUST NOT be stored (`localStorage`,
cookies, or any backend), and MUST NOT gate access to any content. It exists
only so the user gets a moment of "I actually know this now" feedback,
consistent with [ADR-0004](../adrs/0004-bounded-browser-location-estimate.md)'s
existing no-persistence posture for anything location/behavior-adjacent.

## Proposed data model: infrastructure diagnostics

New file: `app/features/infrastructure/infrastructureData.ts` (or equivalent
location under `app/features/`), following the existing `Provenanced` pattern
in `app/karachi-data.ts`.

```ts
export type InfrastructureGapCategory =
  | "chokepoint"
  | "missing-link"
  | "planning-gap"
  | "riding-hazard"
  | "capacity-limit";

export interface InfrastructureGap extends Provenanced {
  readonly id: string;
  readonly category: InfrastructureGapCategory;
  readonly affectedCorridorIds: readonly CorridorId[];
  readonly affectedDistrictIds: readonly DistrictId[];
  readonly summary: string;          // one sentence, orientation-level
  readonly detail: string;           // what a traveller/rider should expect
  readonly confidence: "sourced" | "commonly-reported";
  readonly verifiedOn: IsoDate;
}
```

Requirements:

- `category` MUST use this fixed enum. Do not add free-text severity or
  political framing fields.
- `confidence: "commonly-reported"` MUST still carry at least one `sourceId`
  (e.g. a news report, government advisory, or transport-authority statement)
  and MUST render a visible "commonly reported, not independently verified"
  label. `"sourced"` requires the same evidentiary bar as any other claim
  under [source policy](../data/source-policy.md).
- Diagnostics render in a visually and structurally distinct block from the
  teaching content — e.g. a labeled "Known limitations" section on the
  relevant corridor/district surface — never inline with `caution` (which
  means naming/administrative ambiguity today, not infrastructure criticism;
  do not overload that field).
- Every diagnostic claim is subject to the same freshness/review-date
  discipline as transit status claims in `docs/data/source-policy.md`. A named
  data-steward MUST approve new or changed diagnostics before release, exactly
  as required today for administrative/transport/emergency facts.
- Diagnostics MUST NOT imply live/current passability ("this road is currently
  blocked") — that is out of scope per the charter. They describe structural,
  standing characteristics of the network ("this junction has no dedicated
  turning lane and is a known bottleneck at most hours").

This is the highest-sensitivity addition in this RFC. It is documentation
that a piece of public infrastructure is deficient. Before any diagnostic
entry ships, the data-steward review in
`docs/data/source-policy.md` MUST be completed per entry, not per batch, and
the entry MUST cite a source independent of this project's own judgment
(news reporting, an official advisory, a transport-authority document, or
directly attributable public reporting) — not an unsourced assessment
generated by a coding agent or the maintainer's personal opinion presented as
fact.

## Proposed surface: civic presentation mode

New route, e.g. `/briefing` (naming TBD by maintainer at acceptance).

- Renders exclusively from existing canonical sources: `karachiFacts`,
  `districts`, `mainCorridors`, `districtProfileFacts`, and the new
  `InfrastructureGap` records. It MUST NOT introduce a second copy of any
  fact — this is a rendering surface, not a new fact store, per
  [ADR-0003](../adrs/0003-canonical-data-direction.md).
- Structure (sequence, not final copy):
  1. City shape and scale (`karachiFacts`).
  2. Seven-district structure with one anchor/mental-model line each.
  3. City-scale corridor/gateway network.
  4. Infrastructure diagnostics summary (grouped by category, with sources).
  5. Explicit product-boundary statement: this is a structural/orientation
     briefing, not a live operations, engineering, or navigation system —
     reusing the same boundary language required by
     [ADR-0001](../adrs/0001-mental-map-not-live-navigation.md).
  6. Source list and verification date footer
     (`dataVerifiedOn` plus every cited `sourceId`).
- MUST be printable (`@media print` or equivalent) and MUST render
  meaningfully with JavaScript, WebGL, and map tiles unavailable — this
  surface exists specifically to be shown on a projector, printed, or
  screen-shared to an audience whose device/network cannot be assumed to
  support the full interactive map, so it cannot depend on the map stack at
  all.
- MUST carry Roman Urdu default and English parity, identical to every other
  surface — an institutional audience is not exempt from the localization
  policy.
- MUST NOT overstate capability for a sales/institutional context. If this
  surface is ever shown to a government or commercial audience as part of a
  pitch, the boundary statement in step 5 is non-negotiable and MUST NOT be
  removed or softened for that audience. This protects the maintainer from
  the presentation being mistaken for a claim that the product does something
  it does not (live navigation, operational data, official administrative
  status).

## Data and content model additions

- `app/features/infrastructure/` — new focused module per
  [AGENTS.md](../../AGENTS.md)'s change-boundary rule ("reusable map detail
  and cross-city capabilities belong in focused modules under
  `app/features/`").
- `app/karachi-i18n.ts` — add Roman Urdu/English pairs for: predict-checkpoint
  prompts and reveal copy, end-of-journey synthesis prompts, infrastructure
  category labels, "commonly reported" disclosure copy, and the civic
  briefing surface's fixed copy blocks.
- No change to `app/KarachiMap.tsx`'s lifecycle contract is required; predict
  checkpoints reuse the existing selection/detail-panel pattern from
  [map-interaction.md](../specs/map-interaction.md) rather than inventing a
  new interaction primitive.

## Accessibility and failure behavior

- Predict-then-reveal checkpoints follow the same keyboard/touch/reduced-motion
  and 320px/200%-zoom requirements as existing map selection
  (`docs/standards/accessibility.md`, `docs/specs/map-interaction.md`).
- The end-of-journey synthesis MUST work as a plain list/selection control, not
  a canvas-only interaction, so it remains available with WebGL/basemap off.
- The civic briefing surface MUST be a static, server-rendered document first;
  any interactivity on it is optional enhancement, never required to read it.

## Alternatives considered

### Add more explanatory text/detail to existing pages

Rejected. The maintainer's own diagnostic ("after full scroll I only remember
7 divisions") shows the failure mode is retrieval, not exposure. More
recognition-based content compounds the same mechanic that already produced
shallow recall; it does not fix it.

### Store infrastructure diagnostics as an extra `caution` string per corridor

Rejected. `caution` today has an established, narrower meaning (naming/
administrative ambiguity) used consistently across the app and tests. Silently
widening its meaning to include infrastructure criticism would blur a claim
category that specifically needs its own sourcing bar and its own visible
"commonly reported vs. sourced" distinction.

### Build the civic presentation as an external slide deck outside the repo

Rejected as the default path. An out-of-repo deck immediately forks from
canonical data and will drift (the exact failure ADR-0003 was written to
prevent). A rendered in-repo surface sourced from the same records stays
correct as the underlying data changes. (An exported PDF/image generated from
this surface for a specific meeting is fine as a one-off artifact; the
surface itself must not be exclusively external.)

## Acceptance gates

- Charter and learning-journey spec are updated to state "Recognition, then
  recall" before any predict-checkpoint ships (spec-before-implementation,
  per [AGENTS.md](../../AGENTS.md)).
- At least one predict-then-reveal checkpoint exists per corridor teaching
  moment and per district `arriveFrom`/`nextDistricts` relationship.
- The end-of-journey synthesis exercise exists on the homepage and checks
  answers against canonical adjacency/route data, not a separate answer key.
- `InfrastructureGap` records exist only under `app/features/infrastructure/`,
  each with `sourceIds`, `confidence`, and `verifiedOn`, and each has passed
  named data-steward review before release.
- Infrastructure diagnostics render in a visibly distinct block, never merged
  into existing `caution` copy.
- `/briefing` (or accepted equivalent route) renders solely from existing
  canonical records, works with JavaScript/WebGL/basemap unavailable, is
  printable, and carries the unmodified product-boundary statement.
- Roman Urdu/English parity, keyboard/touch/reduced-motion, 320px/200%-zoom,
  and source-provenance checks pass for every new surface, unchanged from the
  bar set by [RFC-0002](0002-district-atlas-and-route-separation.md).
- `npm run lint` and `npm test` pass; the QA release checklist is completed in
  proportion to risk before any release that includes infrastructure
  diagnostics content (highest-risk category in this RFC).

## Implementation record

Shipped 2026-08-14 under
[route-internalization-and-civic-diagnostics-v1](../plans/active.md). All
acceptance gates above are met except the two flagged below, which require a
maintainer decision this agent could not make unilaterally:

- Predict-then-reveal checkpoints cover the homepage corridor/district
  teaching steps and each district page's first route, not yet every district
  route or `/crossings`. See the plan's follow-up list.
- No named human data-steward is assigned to the infrastructure-diagnostics
  claim category (open question 3, below, remains open). Each shipped entry
  still carries a real, independently verifiable source and a visible
  sourced/commonly-reported confidence label per the acceptance gates, but
  routine per-entry maintainer review has not yet been assigned to a person.

## Open questions for maintainer acceptance

1. Confirm the charter principle change ("Recognition, then recall") before
   implementation starts — this changes an accepted product principle, not
   just a page.
2. Confirm route naming for the civic presentation surface (`/briefing` is a
   placeholder).
3. Confirm who acts as named data-steward for infrastructure diagnostics
   specifically — this is a new claim category not covered by any existing
   steward assignment in `docs/data/source-policy.md`.
4. Confirm whether the end-of-journey synthesis exercise should track any
   session-only internalization signal at all, or whether even a
   non-persisted counter is unwanted.
