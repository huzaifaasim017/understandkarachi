---
title: "ADR-0002: Roman Urdu default with complete English"
status: accepted
owner: product and content maintainers
accepted: 2026-08-13
last-reviewed: 2026-08-13
review-cycle: on language-scope change
---

# ADR-0002: Roman Urdu default with complete English

## Context

The core audience includes local and domestic travellers who commonly read
Roman Urdu, plus international visitors who need plain English. Making English
the only default would create friction for many local learners; embedding both
languages in every screen would double reading load and weaken the simplicity
goal.

## Decision

Roman Urdu (`ur-roman`) is the first-visit default. English (`en`) is a complete
user-selectable alternative available from persistent navigation. The choice is
stored locally when possible. The page language, metadata, accessible names,
controls, failure states, captions, safety text, quiz, and map interface update
with the selection.

Both languages share canonical facts and stable entity IDs. Proper nouns remain
recognizable for signs, spoken directions, and map search. Translation parity
means equivalent meaning and risk, not identical syntax.

## Consequences

- Every visible-copy change is a two-language change and review.
- UI must tolerate different line lengths without reducing readability.
- Search aliases can support spelling variation without cluttering the display.
- Adding another language requires a separate proposal for audience need,
  review capacity, script/font behavior, metadata, and parity testing.

## Compliance checks

- Initial HTML declares `ur-Latn-PK` and exposes the English option.
- Language switching works without server data or an account.
- Missing storage does not disable the selector.
- Tests assert critical copy and controls in both language dictionaries.
