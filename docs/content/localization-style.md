---
title: Content and localization style
status: active
owner: content maintainers
last-reviewed: 2026-08-14
review-cycle: every content release
---

# Content and localization style

## Language contract

Roman Urdu is the default because it is accessible to many local readers
without an Urdu keyboard or script requirement. English is a complete option
for international travellers. Both versions must communicate the same factual
meaning, caution, status, and action; they do not need to be word-for-word
translations.

Locale IDs are `ur-roman` and `en`. The document language should update to
`ur-Latn-PK` or `en`, and the selected preference may be stored locally. Stable
place, source, and feature IDs are language-neutral.

One shared selector and locale store serve `/`, `/districts`, every district
profile, and `/crossings`. A direct load still starts safely in Roman Urdu when
no valid preference exists; a valid selection carries across route changes.
Navigation labels, page-specific metadata meaning, map/detail controls, photo
captions, source actions, cautions, and failure states are part of parity—not
optional chrome around the main lesson.

## Writing rules

- Lead with the fact or decision: “Samandar south mein hai.”
- One heading should express one idea. Do not add an eyebrow, slogan, or
  subheading that repeats it.
- Use the shortest sentence that preserves the relationship and safety limit.
- Prefer concrete chains: `Airport → Shahrah-e-Faisal → centre`.
- Introduce a term only when the user can immediately see or use it.
- Use numerals for route numbers, districts, distances, and counts.
- Keep warnings specific; avoid generic reassurance or fear-inducing language.
- Never say a changing service “is running” without a current source and date.
- Do not translate attribution, license names, official organisation names, or
  exact source titles unless an official localized form exists.

## Roman Urdu conventions

- Use common Pakistani speech and straightforward Latin spelling; optimize for
  recognition rather than academic transliteration.
- Keep sentences short and avoid mixing English when an equally familiar Roman
  Urdu word is clearer. Retain established travel words such as `block`, `road`,
  `pin`, `airport`, and `district` when they match signs and everyday speech.
- Use `aap` rather than gendered instructions. Avoid slang tied to one locality.
- Proper nouns remain as recognizable on signs: `Shahrah-e-Faisal`, `NIPA`,
  `Saddar`, `Malir 15`.
- Where spelling varies, choose one display form and add common variants to
  search aliases rather than showing every spelling in prose.

## English conventions

- Use plain international English and explain local terms on first use.
- Prefer “south”, “east”, “junction”, and “district” over idioms that assume
  local knowledge.
- Preserve local proper nouns and diacritics already established in the
  canonical record; do not invent Anglicized replacements.

## Information hierarchy

Each learning step should normally contain:

1. one direct heading;
2. at most one short explanatory sentence;
3. a compact visual, chain, fact, or optional interactive detail.

If a sentence repeats the heading, remove it. If a paragraph contains multiple
decisions, split the model or move secondary detail behind interaction. Source
and safety information may be longer when accuracy requires it.

## Translation workflow

1. Confirm the canonical fact and glossary meaning.
2. Write the clearest version for each audience independently.
3. Compare numbers, directions, entity kinds, service status, and caution.
4. Test truncation, mobile wrapping, accessible names, empty states, and dynamic
   document metadata in both languages.
5. Have a fluent reviewer inspect high-risk safety or administrative copy.

Do not use machine translation output as approved content without human review.
