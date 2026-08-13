# Contributing to Understand Karachi

> Status: active · Owner: maintainers · Last reviewed: 2026-08-13

Thank you for helping make Karachi easier to understand. Contributions are
welcome when they improve comprehension, factual reliability, accessibility,
or maintainability.

## Before starting

- Read [AGENTS.md](AGENTS.md) and the [documentation index](docs/README.md).
- Search existing issues, RFCs, ADRs, and specs before introducing a parallel
  concept.
- For a substantial product change, open or update an RFC. For a durable
  architectural decision, add an ADR.
- Discuss changes involving official boundaries, emergency information, user
  location, analytics, or licensing with a maintainer before implementation.

## Make a focused change

- Separate factual data from translated presentation copy.
- Update Roman Urdu and English together; do not ship placeholder translations.
- Add the source URL, owner, review date, and precision limits for a new claim
  or dataset.
- Preserve source attribution and media credits.
- Prefer clear language and progressive disclosure over additional labels.
- Do not include credentials, private location data, build output, or raw
  third-party data that cannot be redistributed.

## Local checks

```bash
npm install
npm run lint
npm test
```

For interaction changes, also complete the browser, touch, keyboard, and
reduced-motion checks in the
[QA and release checklist](docs/quality/qa-release-checklist.md).

## Pull request description

State:

1. The traveller problem being solved.
2. The observable change in Roman Urdu and English.
3. Sources and review dates for changed facts.
4. Accessibility and failure-state behavior.
5. Commands and manual scenarios tested.
6. The spec, RFC, ADR, or plan item affected.

Small corrections may be submitted without a new RFC when they do not alter a
published contract. Reviewers may request subject-matter verification before a
geographic or operational claim is accepted.
