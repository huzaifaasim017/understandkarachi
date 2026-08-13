---
title: District deep-dives specification
status: accepted
implementation: in-progress
owner: product, content, data, design, and engineering maintainers
last-reviewed: 2026-08-14
review-cycle: every district-profile, route, or template change
---

# District deep-dives specification

## Outcome

A learner with no prior Karachi context can open any supported district page,
place it within the city, recognize its selected movement structure and major
anchors, distinguish familiar locality names from administrative levels, and
know what must be verified before travel.

The page is a curated orientation layer. It is not a complete street directory,
legal boundary viewer, or current navigation service.

## Supported pages

One shared experience renders a page for each of the seven canonical district
IDs. The district switcher exposes all seven names and their broad city
positions. A direct page load, internal link, keyboard selection, and touch
selection produce the same district profile.

The visible route uses a stable district ID. Proper names remain recognizable
in Roman Urdu and English, even when an administrative name differs from a
familiar locality name.

## Required sequence

Every district page follows this order:

1. **Position:** north/south/east/west relationship, Arabian Sea cue when
   relevant, and city-scale anchors.
2. **Edges:** neighbouring districts or memorable broad edges, with an explicit
   statement that displayed geometry is not a legal survey.
3. **Movement spines:** selected major corridors in connection order, including
   what each broadly connects and where the schematic stops.
4. **Hubs and hinges:** junctions, terminals, stations, bridges, gates, or other
   reviewed anchors that help confirm location or a change of direction.
5. **Familiar areas:** a curated locality set grouped by relationship rather
   than a flat exhaustive list.
6. **Connections:** how the district connects to adjacent districts, regional
   gateways, airport/port/transit systems where supported, and the separate
   crossing guide when relevant.
7. **Use and verify:** a compact mental-map recap, coverage disclosure, source
   dates, live-condition handoff, and links to another district or the overall
   map.

A page may omit a fact that cannot be sourced, but it may not omit the section
contract silently. The section instead states the current coverage limit.

## Required profile data

Each district profile has one stable canonical record or derives from stable
canonical entity IDs. At minimum it provides:

- district ID and official/familiar name handling;
- broad position and orientation statement;
- reviewed source IDs and administrative review date;
- neighbour or edge relationships with a precision caveat;
- ordered selected corridor IDs;
- selected hub/anchor IDs;
- selected familiar locality IDs or sourced names;
- gateway/transit/infrastructure relationships only where reviewed;
- district-specific naming, vehicle, status, or geometry cautions;
- content coverage statement and next verification action; and
- approved media IDs, if media is used.

All seven profiles must satisfy the same required shape before release. A field
being present is not enough: its referenced ID must resolve to a canonical
record and its locale explanation must exist in Roman Urdu and English.

## Map contract

The district map begins with the selected district in city context rather than
zooming so tightly that the learner loses orientation. The Arabian Sea/south
cue and at least one neighbouring relationship remain discoverable.

The map supports these states:

- district context;
- one selected corridor;
- one selected hub/anchor/locality; and
- return to the full district context.

On desktop, hover or focus may preview. Click or Enter/Space locks selection.
On touch, a tap selects. The selected item opens a readable detail outside or
alongside the map and exposes its name, kind, district relationship, connection
chain, limitation, and source/review information when applicable.

The same ordered corridors, hubs, and areas are available as ordinary controls
and text. Map drawing, color, hover, and animation never carry the only
explanation. The basemap is context, not evidence and not a completeness claim.

## 3D and motion

The Karachi 3D introduction may establish city shape and district position on
the homepage. A district page may reuse a restrained district-focus transition
but must not replay a long decorative introduction before content.

Extrusion height and animation are presentational unless a future approved
encoding says otherwise. North-up and sea-south stay stable. Reduced motion
removes rotation, particles, pulsing, smooth camera travel, parallax, and
scroll-bound movement; selection feedback remains immediate and perceivable.

No essential relationship requires WebGL. If 3D fails, a labelled 2D schematic
or ordinary district/connection list occupies the same learning role.

## Corridors and travel language

A corridor entry answers three questions in one compact unit:

1. Which reviewed anchors or broad sides does it connect?
2. Why does it matter to this district's mental map?
3. Where must the learner switch to current, exact guidance?

Use “corridor”, “movement spine”, “connects”, or “toward” for schematic data.
Use “route” only for a specifically sourced named road or transport route, with
scope and review date. Do not state fastest, safest, open, permitted, running,
or a travel-time estimate unless an approved current source supports the exact
claim.

## Localities and administrative meaning

The page must identify the kind of entity being named. A locality, scheme,
cantonment, subdivision, road, junction, district, and landmark are not
interchangeable. Familiar names may help recognition, but they do not overwrite
the official district record.

Locality selection is curated for orientation and does not imply that omitted
areas are unimportant or outside the district. When a name spans, overlaps, or
is commonly associated with more than one administrative area, show a short
naming caution instead of forcing a false one-to-one relationship.

## Photos and attribution

A photo is included only when it helps identify an anchor, gateway, corridor
context, coast/port relationship, or another stated learning goal. It must have:

- a locally served, appropriately sized approved asset;
- concise localized alt text that describes the orientation value;
- a readable caption in its own high-contrast layout, not clipped or hidden
  inside the image crop;
- creator, source publisher, and licence attribution where required;
- a direct link to the exact source/file record rather than a search page,
  homepage, or unrelated article;
- an editorial media source record and review date; and
- an empty alt value only when genuinely decorative.

External source links state that they open the source and remain keyboard and
touch operable. An image failure leaves its orientation fact available in text.

## Copy and localization

Roman Urdu is the first-visit default; English is complete and selectable from
the shared navigation. Both locales include the same sections, relationships,
numbers, cautions, dates, actions, alt meanings, labels, source introductions,
loading/error states, and next-page links.

Each section has one direct heading and at most one short explanation before
the visual or compact relationship list. Do not add an eyebrow, slogan,
supporting heading, or repeated summary. Prefer visible chains such as:

```text
district side → movement spine → hub → neighbouring side
```

Proper nouns use their recognizable sign/search form. Alternative spellings
belong in search aliases rather than repeated prose.

## Sources, dates, and corrections

- Administrative, orientation, transport, and media claims follow the
  [source policy](../data/source-policy.md) and its freshness windows.
- The page identifies the profile's last review date and provides direct source
  links grouped by what they support.
- Operational or changing facts show a claim-level verification/effective date
  where a user could mistake them for live information.
- Derived or simplified geometry exposes provenance, transformation, precision,
  and fitness-for-purpose notes.
- A missing, stale, or disputed claim is labelled, narrowed, or removed. It is
  not silently inferred from map tiles, memory, or an image.
- Corrections enter through the canonical source/fact record and then flow to
  both languages and every page.

## Safety handoff

Every page makes these boundaries discoverable before a travel-oriented action:

- stop safely before using the map or phone;
- schematic lines and boundaries are for orientation only;
- check signs, access restrictions, closures, weather, traffic, and current
  transport information before travel;
- use an exact pin, full address, or current navigation/transport source for
  the last mile; and
- never infer floodwater depth, road passability, or vehicle permission from
  the district map.

The one-shot location estimate, if linked, keeps the limits in
[ADR-0004](../adrs/0004-bounded-browser-location-estimate.md). District pages do
not start geolocation, save a trip, or follow a user's movement.

## Accessibility

- Use one page-level heading, logical section order, landmarks, and a skip link.
- All selection and navigation work by keyboard and touch without hover.
- Controls expose selected/expanded state and retain visible focus.
- Pointer targets are 44 by 44 CSS pixels where practical.
- Relationships use labels/shapes/text as well as color.
- At 320 CSS pixels and 200% zoom, essential text and controls reflow without
  horizontal page scrolling.
- Selection, language, loading, error, and source-state changes are announced
  when needed without forcing focus unexpectedly.
- The complete orientation model remains available when motion, WebGL, map
  tiles, localStorage, or an image fails.

## Acceptance scenarios

For every district and both languages:

1. A first-time learner identifies the district's broad city position and at
   least one neighbouring relationship without using map hover.
2. The learner follows one selected corridor chain in the intended order and
   explains that it is not turn-by-turn guidance.
3. The learner selects a hub by touch and keyboard and receives the same name,
   kind, relationship, caution, and source context.
4. The learner distinguishes a familiar area from the administrative district.
5. The learner reaches another district, the overall guide, and `/crossings`
   through clear links without losing the language choice.
6. With WebGL and basemap blocked, the learner can still complete scenarios
   1–5 from the text/list surface.
7. With reduced motion, no decorative continuous or scroll-tied motion remains.
8. Each displayed image has an unclipped caption and exact source record.
9. The source panel resolves every profile claim category and exposes review
   dates and limitations.

## Release gate

- All seven canonical district IDs generate a valid page from one template.
- Required profile fields, entity references, locale keys, source IDs, media
  records, and route slugs pass automated validation.
- Lint and tests pass.
- The repository QA checklist covers representative desktop/mobile plus parity
  checks across all seven pages.
- No critical accessibility, localization, provenance, safety, broken-link,
  image-caption, WebGL-fallback, or basemap-fallback blocker remains.
