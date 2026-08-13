import {
  districtProfileFacts,
  type DistrictId,
} from "../../karachi-data";
import {
  districtAtlasCopy,
  districtProfilePresentation,
  type DistrictProfilePresentation,
} from "../../karachi-i18n";

/* Presentation copy lives in `karachi-i18n.ts`; this feature module only joins
 * it to canonical, source-backed facts from `karachi-data.ts`. */
export { districtAtlasCopy };

const presentationByDistrictId = Object.fromEntries(
  districtProfilePresentation.map((profile) => [profile.districtId, profile]),
) as unknown as Readonly<Record<DistrictId, DistrictProfilePresentation>>;

export const districtProfiles = districtProfileFacts.map((facts) => {
  const presentation = presentationByDistrictId[facts.districtId];
  const zonePresentation = Object.fromEntries(
    presentation.zones.map((zone) => [zone.id, zone]),
  );
  const routePresentation = Object.fromEntries(
    presentation.routes.map((route) => [route.id, route]),
  );

  return {
    ...facts,
    ...presentation,
    zones: facts.zones.map((zone) => ({
      ...zone,
      explanation: zonePresentation[zone.id].explanation,
    })),
    routes: facts.routes.map((route) => ({
      ...route,
      ...routePresentation[route.id],
    })),
  };
});

export const districtProfilesById = Object.fromEntries(
  districtProfiles.map((profile) => [profile.districtId, profile]),
) as unknown as Readonly<Record<DistrictId, (typeof districtProfiles)[number]>>;
