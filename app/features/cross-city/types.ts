import type { ReactNode } from "react";
import type { Locale } from "../../karachi-i18n";
import type { CorridorId, IsoDate, LandmarkId, SourceId } from "../../karachi-data";

export type CrossCityMode = "bike" | "car" | "transit";

export type RouteStage = "gate" | "spine" | "hub" | "local";

export type RouteDirection = "entry" | "through" | "exit" | "finish";

export type CrossCityScenarioId =
  | "hub-to-thatta"
  | "thatta-to-hub"
  | "m9-to-centre"
  | "airport-to-centre"
  | "port-qasim-to-tower"
  | "north-to-keamari"
  | "nipa-to-tower"
  | "korangi-landhi-to-saddar";

export type LocalizedText = Readonly<Record<Locale, string>>;

export type CrossCityCoordinates = readonly [longitude: number, latitude: number];

export type CrossCityFeatureId = CorridorId | LandmarkId;

export interface CrossCityCheckpoint {
  readonly id: string;
  readonly featureIds: readonly CrossCityFeatureId[];
  readonly stage: RouteStage;
  readonly direction: RouteDirection;
  readonly label: LocalizedText;
  readonly coordinates: CrossCityCoordinates;
  readonly zoom: number;
  readonly meaning: LocalizedText;
}

export interface CrossCityScenario {
  readonly id: CrossCityScenarioId;
  readonly title: LocalizedText;
  readonly shortRoute: string;
  readonly modes: readonly CrossCityMode[];
  readonly verifiedOn: IsoDate;
  readonly sourceIds: readonly SourceId[];
  readonly focus: {
    readonly coordinates: CrossCityCoordinates;
    readonly zoom: number;
  };
  readonly checkpoints: readonly CrossCityCheckpoint[];
  readonly note: LocalizedText;
}

export interface CrossCityMapFocus {
  readonly scenarioId: CrossCityScenarioId;
  readonly checkpointId?: string;
  readonly coordinates: CrossCityCoordinates;
  readonly zoom: number;
}

export interface CrossCityGuideProps {
  /** Roman Urdu is the product default; pass `en` for English parity. */
  readonly locale?: Locale;
  readonly reducedMotion?: boolean;
  /** Lets the parent map fly to a whole route or a selected checkpoint. */
  readonly onFocusMap?: (focus: CrossCityMapFocus) => void;
  /** Optional map owned by the parent, kept beside the active route explanation. */
  readonly mapSlot?: ReactNode;
  /** Lets a parent-owned map select the same locked checkpoint as the text UI. */
  readonly externalCheckpointId?: string;
}
