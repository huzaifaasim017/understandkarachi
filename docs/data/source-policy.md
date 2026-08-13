---
title: Data governance and source policy
status: active
owner: data steward
last-reviewed: 2026-08-13
review-cycle: monthly for operational data; quarterly otherwise
---

# Data governance and source policy

## Policy

Every factual claim that can affect orientation, safety, administration, or a
travel decision must be traceable to a reviewed source. Being visible on a
popular map or repeated in local speech is useful context, not sufficient proof
of official status.

## Source hierarchy

Prefer, in order:

1. Applicable government or statutory authority responsible for the fact.
2. Official project/operator documentation or a primary financing institution.
3. A maintained open dataset with explicit provenance and license.
4. Reputable secondary reporting used only to explain context or identify a
   primary source.

When sources conflict, keep both dates and definitions, prefer the responsible
authority for official status, and flag the disagreement for steward review.
Do not silently average, merge, or choose the more convenient value.

## Current runtime minimum

The prototype source registry in `app/karachi-data.ts` currently records these
fields for every runtime source:

- stable `id` and human-readable `title`;
- `publisher` and direct `url`;
- source `kind`;
- `usedFor`, which identifies the supported facts or presentation;
- `accessedOn`, which records the prototype's latest evidence-access check.

`accessedOn` is not a source publication date or effective date. It is the
current runtime minimum for review traceability. Source-backed records refer to
the registry through stable `sourceIds`; rapidly changing records use a
claim-level `verifiedOn` date where the current model provides one. Until every
critical claim has a dedicated verification field, its source `accessedOn`
date is also the audit date and must meet the freshness table below.

Geometry extraction and transformation details belong in
`public/data/README.md`; policy belongs here.

## Institutional provenance extension

Before public-sector or broad civic adoption, extend the registry or an
associated machine-readable manifest to record:

- publication and effective dates when available;
- named reviewer, accountable owner, and `last-reviewed` date;
- geographic and temporal scope;
- precision, uncertainty, and known conflicts;
- license and attribution requirements;
- transformation steps and inputs for derived files;
- lifecycle status, supersession, and correction history.

These are required institutional fields, not fields the current runtime
registry already implements. New high-risk datasets should capture them during
ingestion even while the shared schema is being extended.

## Claim classes and freshness

| Class | Examples | Recheck before release if older than |
| --- | --- | --- |
| Critical operational | Emergency numbers, active closures, service availability | 30 days; same-day check if described as “current” |
| Changing infrastructure | Transit status, route operation, construction stage | 90 days |
| Administrative | District/subdivision names, governance, boundaries | 180 days or immediately after a notified change |
| Census/statistical | Population, land area | On new official release; always show reference year |
| Orientation | Schematic anchors and corridor relationships | 12 months, and after a major network change |
| Editorial media | Photograph source, creator, license | At ingestion and before replacement/republication |

These are maximum review intervals, not guarantees that a claim remains true.
Display the effective date where a reasonable user could mistake dated data for
live data.

## Geographic precision

- Coordinates use `[longitude, latitude]` order.
- Rounded label points, anchors, and corridor paths are orientation-only.
- District polygons are dated overlays and may contain maritime or peripheral
  extents that do not equal cited land-area figures.
- Schematic lines may cross or simplify roads and must never be supplied to a
  routing engine as a road network.
- A legal, cadastral, engineering, flood-depth, dispatch, or survey use case is
  outside the dataset's fitness for purpose.

## Administrative naming

Store official name, familiar name, aliases, level, and source date separately.
Do not overwrite an official entity with a familiar label. Search may index all
approved aliases, but results must reveal the entity kind and district context.

## Change procedure

1. Capture the primary source and classify the claim.
2. Compare it with the current canonical record and dependent IDs.
3. Document conflicts, transformation, license, and precision.
4. Update canonical data once; update both localized explanations by stable ID.
5. Validate GeoJSON/schema invariants and rendered attribution.
6. Ask the data steward to review material boundary, emergency, or transit
   changes.
7. Update source and document review dates without rewriting historical release
   evidence.

If a critical claim cannot be reverified, remove “current” language, show the
last verified date, and direct the traveller to the responsible authority.
