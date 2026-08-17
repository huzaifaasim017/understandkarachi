import {
  type CorridorId,
  type DistrictId,
  type IsoDate,
  type Provenanced,
} from "../../karachi-data";
import {
  infrastructureGapPresentation,
  type InfrastructureGapPresentation,
} from "../../karachi-i18n";

/**
 * Canonical infrastructure-diagnostics facts. See
 * `docs/specs/infrastructure-diagnostics.md` and
 * `docs/rfcs/0003-route-internalization-infrastructure-diagnostics-and-civic-presentation.md`.
 * This layer documents standing, structural route-network gaps — never a
 * live-conditions claim. Bilingual summary/detail copy lives in
 * `karachi-i18n.ts`, joined below by `id`, matching the pattern used for
 * district profiles in `app/features/districts/districtAtlasData.ts`.
 */
export type InfrastructureGapCategory =
  | "chokepoint"
  | "missing-link"
  | "planning-gap"
  | "riding-hazard"
  | "capacity-limit";

export interface InfrastructureGapFacts extends Provenanced {
  readonly id: string;
  readonly category: InfrastructureGapCategory;
  readonly affectedCorridorIds: readonly CorridorId[];
  readonly affectedDistrictIds: readonly DistrictId[];
  readonly confidence: "sourced" | "commonly-reported";
  readonly verifiedOn: IsoDate;
}

const infrastructureGapFactRecords = [
  {
    id: "sohrab-goth-interchange-merge",
    category: "chokepoint",
    affectedCorridorIds: ["m9-motorway", "shahrah-e-pakistan"] as CorridorId[],
    affectedDistrictIds: ["east"] as DistrictId[],
    confidence: "commonly-reported",
    verifiedOn: "2026-08-14",
    sourceIds: ["eaworld-sohrab-goth-interchange"],
  },
  {
    id: "karachi-ring-road-incomplete",
    category: "missing-link",
    affectedCorridorIds: ["mauripur-hub-river", "national-highway", "m9-motorway"] as CorridorId[],
    affectedDistrictIds: [] as DistrictId[],
    confidence: "commonly-reported",
    verifiedOn: "2026-08-14",
    sourceIds: ["dawn-karachi-ring-road-master-plan"],
  },
  {
    id: "lyari-expressway-service-roads",
    category: "riding-hazard",
    affectedCorridorIds: ["lyari-expressway"] as CorridorId[],
    affectedDistrictIds: ["keamari", "west", "central"] as DistrictId[],
    confidence: "commonly-reported",
    verifiedOn: "2026-08-14",
    sourceIds: ["tribune-lyari-expressway-upkeep"],
  },
  {
    id: "monsoon-underpass-waterlogging",
    category: "capacity-limit",
    affectedCorridorIds: ["shahrah-e-faisal", "university-road", "shahrah-e-pakistan", "coastal-dha-spine"] as CorridorId[],
    affectedDistrictIds: ["south", "east", "central"] as DistrictId[],
    confidence: "commonly-reported",
    verifiedOn: "2026-08-14",
    sourceIds: ["tribune-karachi-monsoon-underpasses", "ndma-infra-advisory-2026"],
  },
  {
    id: "malir-expressway-riverbed-corridor",
    category: "planning-gap",
    affectedCorridorIds: [] as CorridorId[],
    affectedDistrictIds: ["malir", "korangi"] as DistrictId[],
    confidence: "commonly-reported",
    verifiedOn: "2026-08-14",
    sourceIds: ["aajenglish-malir-riverbed-extraction"],
  },
] as const satisfies readonly InfrastructureGapFacts[];

export type InfrastructureGapId = (typeof infrastructureGapFactRecords)[number]["id"];

const presentationById = Object.fromEntries(
  infrastructureGapPresentation.map((entry) => [entry.id, entry]),
) as unknown as Readonly<Record<InfrastructureGapId, InfrastructureGapPresentation>>;

export const infrastructureGaps: readonly InfrastructureGap[] = infrastructureGapFactRecords.map((facts) => ({
  ...facts,
  ...presentationById[facts.id],
}));

export type InfrastructureGap = InfrastructureGapFacts & InfrastructureGapPresentation;

export function gapsForDistrict(districtId: DistrictId): readonly InfrastructureGap[] {
  return infrastructureGaps.filter((gap) => gap.affectedDistrictIds.includes(districtId));
}

export function gapsForCorridor(corridorId: CorridorId): readonly InfrastructureGap[] {
  return infrastructureGaps.filter((gap) => gap.affectedCorridorIds.includes(corridorId));
}
