---
title: "ADR-0003: Canonical data flows into localized views"
status: accepted
owner: engineering and data maintainers
accepted: 2026-08-13
last-reviewed: 2026-08-13
review-cycle: on data-architecture change
---

# ADR-0003: Canonical data flows into localized views

## Context

District names, coordinates, corridor chains, source links, emergency numbers,
and review dates can appear in the story, map, explorer, quiz, footer, and tests.
Copying those facts into each component or language creates silent drift and
makes administrative review unreliable.

## Decision

A sourced fact or geographic entity is stored once in the canonical data layer
under a stable, language-neutral ID. Local overlays carry matching IDs and
dataset metadata. Roman Urdu and English provide explanations keyed by those
IDs. Components derive narrative, map, search, and assessment views from those
records.

The permitted direction is:

```text
source -> canonical fact/geometry -> stable ID -> localized copy -> UI/test
```

Presentation copy is never treated as the source for canonical facts. Research
artifacts are not runtime dependencies.

## Consequences

- Data model changes can be more deliberate because all consumers are visible.
- Translation remains free to optimize phrasing while numbers and statuses stay
  aligned.
- Some generated validation is desirable for ID parity and source coverage.
- A purely decorative, language-specific phrase may stay in localization; it
  must not introduce an independent factual claim.

## Compliance checks

- No duplicate emergency number, coordinate, population, or source URL in JSX.
- GeoJSON feature IDs match canonical IDs or have an explicit mapping.
- Locale dictionaries have parity for all required IDs.
- Tests check data shape and key public contracts rather than duplicating whole
  datasets.
