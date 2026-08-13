---
title: Accessibility standard
status: active
owner: engineering and design maintainers
last-reviewed: 2026-08-14
review-cycle: every interaction release
target: WCAG 2.2 AA
---

# Accessibility standard

Understand Karachi targets WCAG 2.2 Level AA for supported content and
interactions. This document defines product-specific acceptance criteria; it
does not replace testing with disabled users.

## Core requirements

- Server-render the essential lesson in a logical heading and reading order.
- Provide a skip link and landmarks with accurate accessible names.
- Every action works by keyboard and touch without requiring hover.
- Pointer targets are at least 44 by 44 CSS pixels where practical and are not
  crowded against another destructive or navigation action.
- Focus remains visible, is not obscured by sticky UI, and moves only after a
  user action.
- Text and interactive controls meet WCAG AA contrast; district or corridor
  meaning is never encoded by color alone.
- Page zoom to 200% and narrow reflow must not hide essential content or require
  two-dimensional scrolling, except for the map surface itself.
- Changes in selection, quiz feedback, language, loading, or failure state are
  perceivable without relying on animation.

## Motion and 3D

Respect `prefers-reduced-motion` on first render and provide a contextual
control on an auto-moving 3D surface; its session-level preference persists
across the shared learning routes. Do not put a decorative animation/still
switch in the global header. Reduced motion disables decorative rotation,
pulsing, route particles, smooth camera travel, and nonessential transitions.
Motion must not be needed to understand geography. Avoid flashing and
auto-moving content that a user cannot pause.

The WebGL canvas itself is presentational and hidden from assistive technology.
The surrounding Karachi introduction is informational: ordinary district
buttons, selected-detail text, compass labels, and onward links expose its
meaning. WebGL failure must leave those elements intact rather than an empty
critical panel.

## Interactive map

- A map used only as a synchronized illustration may be hidden from assistive
  technology because the adjacent lesson is canonical.
- An exploratory map is an explicitly labelled region with keyboard-operable
  controls and a non-map search/result path to the same curated places.
- Hover may preview a feature, but click/tap or keyboard selection locks it and
  exposes the same name, kind, relationship, and caution in readable text.
- Popup content must not trap focus or disappear before it can be read.
- Basemap/network failure has a textual fallback and does not remove the lesson.
- Attribution remains available and operable.

## Language and media

- Set the page language to `ur-Latn-PK` or `en` when the locale changes.
- Announce the selected language without forcing focus to the page start.
- Informative images have concise localized alt text; decorative imagery uses
  empty alt text or is hidden appropriately.
- Photo credits and external-link behavior have understandable accessible names.
- Icons supplement text or have a label; they are not the only carrier of a
  safety or corridor meaning.

## Test matrix

Before release, verify at minimum:

- keyboard only in current Chrome and Firefox;
- touch at a narrow mobile viewport;
- a screen-reader smoke test (VoiceOver/Safari or NVDA/Firefox);
- browser zoom at 200%;
- forced reduced motion;
- high contrast/forced colors where supported;
- map and WebGL failure fallbacks;
- both Roman Urdu and English.

Record exceptions in the release notes with severity, owner, workaround, and a
target resolution. A critical blocker in the primary learning journey prevents
release.
