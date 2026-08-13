---
title: "RFC-0001: Traveller crossing model"
status: accepted
implementation: partial
owner: huzaifaasim017 (project maintainer) and data maintainers
created: 2026-08-13
accepted: 2026-08-13
last-reviewed: 2026-08-13
review-cycle: on crossing-model or scenario-governance change
---

# RFC-0001: Traveller crossing model

## Summary

Teach every city-scale crossing with one reusable grammar:

```text
MODE → GATE → SPINE → HUB → LOCAL
```

The model replaces disconnected road-name lists with a sequence a traveller can
reuse. It feeds the scroll lesson, map selection, example crossings, search,
and comprehension checks from stable records. Entry/through/exit/finish is
checkpoint context, not a second sequence. A current-condition check follows
the model as a safety handoff, not as a sixth part.

## Problem

Knowing the seven districts does not tell a visitor how to cross the city. A
traveller approaching from Hyderabad, Balochistan, the airport, Port Qasim, or a
northern motorway must understand:

- which travel mode is relevant and eligible;
- which side of Karachi they entered;
- which broad spine carries movement across that part of the city;
- which hub confirms progress or a change of direction;
- where city-scale teaching ends and exact local guidance begins;
- what can change on the day of travel.

Adding more road labels alone increases memory load and still does not provide
a reusable decision model.

## Goals

- Teach a navigation-independent crossing grammar a visitor can apply to a new
  trip.
- Make every displayed checkpoint selectable and explainable on touch and
  desktop.
- Reuse stable IDs across story, map, search, quiz, and printable view.
- Preserve the boundary established by
  [ADR-0001](../adrs/0001-mental-map-not-live-navigation.md).

Non-goals: turn-by-turn directions, fastest-crossing claims, live passability, an
exhaustive vehicle-restriction database, automatic GPS tracking, or modelling
every Karachi road. A specific restriction may be taught only when a
responsible source directly supports it and the UI records its review date.

## Accepted grammar

- **MODE:** choose bike, car, or transit before showing eligible examples.
- **GATE:** identify the city entry/departure gateway or the recognizable start
  or finish of an internal crossing.
- **SPINE:** follow the broad city-scale movement axis.
- **HUB:** use a recognizable junction or transfer point to reconfirm or change
  direction.
- **LOCAL:** leave the city-scale model and use an exact area, block, landmark,
  address, or pin.

The checkpoint direction attribute is `entry`, `through`, `exit`, or `finish`.
It explains what a checkpoint does within a particular example; it does not
replace or extend the five-part grammar. Broad approach side and compass
direction are scenario context. Live weather, closures, access, traffic, and
service checks are the mandatory handoff after the model.

## Accepted concept model

The accepted logical model matches the typed records currently rendered by the
cross-city feature. Concrete ID unions are shortened here for readability.

```ts
type CrossCityMode = "bike" | "car" | "transit";
type RouteStage = "gate" | "spine" | "hub" | "local";
type RouteDirection = "entry" | "through" | "exit" | "finish";
type LocalizedText = Readonly<Record<Locale, string>>;

type CrossCityCheckpoint = {
  id: string;
  featureIds: readonly CrossCityFeatureId[];
  stage: RouteStage;
  direction: RouteDirection;
  label: LocalizedText;
  coordinates: readonly [longitude: number, latitude: number];
  zoom: number;
  meaning: LocalizedText;
};

type CrossCityScenario = {
  id: CrossCityScenarioId;
  title: LocalizedText;
  shortRoute: string;
  modes: readonly CrossCityMode[];
  verifiedOn: IsoDate;
  sourceIds: readonly SourceId[];
  focus: {
    coordinates: readonly [longitude: number, latitude: number];
    zoom: number;
  };
  checkpoints: readonly CrossCityCheckpoint[];
  note: LocalizedText;
};
```

`MODE` is selected before the checkpoint sequence, so it is intentionally not a
`RouteStage`. `featureIds` reference canonical corridors or landmarks. Focus
coordinates and zoom are schematic camera cues, never an exact path or routing
instruction.

The implementation is still in transition under P0.5. The feature module
currently assembles the typed view records and some bilingual copy. This RFC
does not create a permanent exception to [ADR-0003](../adrs/0003-canonical-data-direction.md):
stable relationships, coordinates, source IDs, and review dates must converge
on `app/karachi-data.ts`; localized presentation must converge on
`app/karachi-i18n.ts`.

## User experience

1. The learner selects a mode and an example crossing.
2. The map highlights the relevant gates, spines, hubs, and local handoff.
3. A short chain states what each checkpoint does, not merely its name.
4. Selecting a checkpoint reveals its stage, direction, connected feature,
   district context, meaning, and limitation/current-condition note.
5. The final local checkpoint explicitly hands off to an exact pin, road sign,
   operator, or current navigation source.
6. A transfer question presents a new start/end pair to test whether the learner
   can reuse the grammar.

## Current prototype inventory

The typed feature currently includes these conceptual examples:

- Hub / N-25 → Thatta / N-5
- Hyderabad side via Thatta / N-5 → Hub / N-25
- M-9 side (motorcycles excluded) → centre
- Airport → centre
- Port Qasim → Tower
- North Karachi → Keamari
- NIPA / East → Tower
- Korangi / Landhi → Saddar

Each record carries stable source IDs and a `verifiedOn` date. The initial
source set was checked on 2026-08-13 for prototype teaching use. That check does
not make an example a recommended, currently passable, or exact crossing and is
not a substitute for a named data steward's approval of material factual
changes. New examples or changed relationships follow the source policy and
require data-steward review in proportion to risk.

## Alternatives considered

**Add every road to one map.** Rejected because density does not teach
hierarchy and performs poorly on a phone.

**Embed a third-party directions widget.** Deferred because it changes the
product into live navigation and introduces privacy, reliability, licensing,
and operational obligations.

**Teach districts only.** Rejected because administrative containers do not
explain movement between gateways.

## Risks and mitigations

- **False confidence:** label the model schematic and end with a current check
  and local handoff.
- **Stale infrastructure:** record source IDs and verification dates per
  scenario; do not infer operation from a drawn line.
- **Information overload:** highlight one crossing at a time and reveal
  checkpoint details on demand.
- **Motorcycle-specific assumptions:** avoid access or safety claims unless a
  responsible source explicitly supports the vehicle class.
- **Translation drift:** key localized explanations to stable scenario and
  checkpoint IDs and validate parity.
- **Ownership drift:** complete P0.5 so feature presentation no longer owns
  canonical facts or inline locale records.

## Open governance work

- Name the data steward who approves future scenario relationships and material
  source changes.
- Define which visible confirmation cues are stable enough to teach without
  becoming turn-by-turn instructions.
- Decide whether conceptual alternatives are separate records so they cannot be
  mistaken for live rerouting.
- Select a provider-neutral current-condition handoff.
- Set the moderated user-research sample required before production readiness.

These items gate scenario expansion and production readiness; they do not
reopen the accepted five-part product grammar.

## Decision record

Accepted on 2026-08-13 by huzaifaasim017 (project maintainer), following the
explicit direction to prioritize long-distance tourist and motorcycle
comprehension. The initial evidence check used the NHA statutory route schedule,
NHA motorway motorcycle policy, NHMP highway ordinance/contact, Karachi Traffic
Police contact, SMTA directory, and NDMA monsoon advisory registered in the
source catalog. Shipped records retain stable feature/source IDs, a review date,
schematic language, and the current-condition handoff. Broader scenario approval
and moderated comprehension research remain follow-up work.
