# Repository instructions for humans and AI agents

> Status: canonical · Owner: maintainers · Last reviewed: 2026-08-13

This file is the canonical operating guide for any contributor or coding agent
working in this repository. Tool-specific instruction files must point here and
must not restate or override it silently.

## Mission

Help a person with zero Karachi context build a useful, safe mental map of the
city. Optimize for comprehension, not visual spectacle or the number of facts
shown. The product is an orientation guide, not live navigation.

Read these before changing behavior or content:

1. [Project charter](docs/project-charter.md)
2. [System and repository boundaries](docs/architecture/system-and-repository-boundaries.md)
3. The relevant file under [specs](docs/specs/)
4. [Data and source policy](docs/data/source-policy.md) for any factual change
5. [Localization style](docs/content/localization-style.md) for visible copy
6. [Accessibility standard](docs/standards/accessibility.md) for interaction or visual changes

## Non-negotiable product constraints

- Roman Urdu remains the default; English remains a complete, user-selectable
  alternative.
- Proper nouns used on signs or in map search stay recognizable in both
  languages.
- Never describe schematic geometry as a route, exact boundary, flood-depth
  model, or travel-time estimate.
- Do not present stale transit, emergency, administrative, or operational data
  as current. Every such claim needs a source and review date.
- No essential information may depend only on hover, color, motion, 3D, or a
  basemap loading successfully.
- Keep visible copy direct. A heading should not be followed by a decorative
  subheading that repeats it.
- Prefer a reusable data model or small focused component over duplicated facts
  or per-section exceptions.

## Change boundaries

- Canonical shared facts belong in `app/karachi-data.ts`.
- Translated presentation copy belongs in `app/karachi-i18n.ts`.
- Local overlay geometry belongs in `public/data/`; its provenance belongs in
  `public/data/README.md` and the source registry.
- Map lifecycle/layers belong in `app/KarachiMap.tsx`; reusable map detail and
  cross-city capabilities belong in focused modules under `app/features/`;
  narrative orchestration belongs in `app/StoryExperience.tsx`; identity and 3D
  introduction behavior belong in `app/BrandMark.tsx` and `app/IntroWorld.tsx`.
- Do not add the same fact independently to JSX, GeoJSON, and locale copy. Add a
  stable ID and derive views from the canonical record.
- Research artifacts may live under `work/`, but production code must not read
  from that directory.
- Do not add secrets, personal trip histories, precise user locations, generated
  build artifacts, or unlicensed media to the repository.

## Required workflow

1. Inspect the current tree and uncommitted changes. Preserve unrelated work.
2. Identify the owning spec, ADR, and canonical data location.
3. For a new or disputed product direction, update an RFC before implementation.
4. For a durable architectural choice, add or supersede an ADR; never rewrite
   the rationale of an accepted ADR.
5. Implement the smallest coherent change and update the same-language pair of
   user-facing copy.
6. Update provenance and `last-reviewed` metadata when facts change.
7. Run `npm run lint` and `npm test`.
8. Complete the [QA and release checklist](docs/quality/qa-release-checklist.md)
   in proportion to risk.
9. Update [the active plan](docs/plans/active.md) or roadmap if scope/status
   materially changed.

## Definition of done

A change is done when its behavior is usable by keyboard, touch, and reduced
motion; Roman Urdu and English have equivalent meaning; factual claims are
traceable; loading and failure states remain understandable; tests cover the
important contract; and the documentation source of truth matches the shipped
behavior.

## Document precedence

When documents conflict, use this order:

1. Accepted ADRs for architecture and irreversible decisions
2. Accepted RFCs for approved product direction
3. Approved specs for observable behavior
4. Data/source and accessibility policies
5. Proposed RFCs for changes still under review
6. Active plan for sequencing
7. Roadmap for intent only

Escalate unresolved safety, legal, privacy, licensing, or administrative
accuracy questions to a maintainer. Do not guess.
