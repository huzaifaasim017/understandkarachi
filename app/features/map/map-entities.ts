import {
  districts,
  landmarks,
  mainCorridors,
  transitCategories,
  type DistrictId,
} from "../../karachi-data";
import { getCopy, romanLandmarkMeaning, romanTransitPresentation, type Locale } from "../../karachi-i18n";

export type MapEntityKind = "district" | "corridor" | "place" | "transit";

export type MapEntityRef = {
  kind: MapEntityKind;
  id: string;
};

export type MapEntityDetails = {
  ref: MapEntityRef;
  name: string;
  kindLabel: string;
  summary: string;
  facts: readonly { label: string; value: string }[];
  chain?: readonly string[];
  aliases?: readonly string[];
  caution?: string;
  color?: string;
};

export const NETWORK_CORRIDOR_TO_DOMAIN: Readonly<Record<string, string>> = {
  "north-spine": "shahrah-e-pakistan",
  "airport-spine": "shahrah-e-faisal",
  "university-spine": "university-road",
  "korangi-spine": "korangi-spine",
  "west-spine": "mauripur-hub-river",
  "lyari-expressway": "lyari-expressway",
};

export const NETWORK_POINT_TO_PLACE: Readonly<Record<string, string>> = {
  tower: "tower",
  numaish: "numaish",
  gurumandir: "guru-mandir",
  "sohrab-goth": "sohrab-goth",
  airport: "jinnah-airport",
  "karachi-port": "karachi-port",
  "port-qasim": "port-qasim",
  "cantt-station": "karachi-cantt-station",
  nipa: "nipa",
  "malir-15": "malir-15",
  "korangi-crossing": "korangi-crossing",
};

export const NETWORK_FALLBACK_POINTS: Readonly<Record<string, { name: string; summary: Record<Locale, string> }>> = {
  "hub-exit": {
    name: "Hub / N-25",
    summary: {
      "ur-roman": "Karachi ka west gate: Hub, Bela, Khuzdar aur Quetta side. City ki taraf Hub River Road → Baldia → Gulbai/ICI → Tower yaad karein.",
      en: "Karachi's west gate toward Hub, Bela, Khuzdar, and Quetta. Toward the city, remember Hub River Road → Baldia → Gulbai/ICI → Tower.",
    },
  },
};

export const NETWORK_TRANSIT_TO_DOMAIN: Readonly<Record<string, string>> = {
  "green-line": "green",
  "orange-line": "orange",
  "red-line": "red",
  "yellow-line": "yellow",
};

const labels = {
  "ur-roman": {
    district: "District",
    corridor: "Bari road",
    place: "Jagah",
    transit: "Public transport",
    area: "Area",
    population: "Abadi",
    anchor: "Main anchor",
    road: "Main road",
    districtLabel: "District",
    near: "Qareebi road",
    direction: "Dono siray",
    status: "Status",
    current: "Abhi sawari ke liye",
    yes: "Haan — phir bhi same-day check karein",
    no: "Nahi — development/proposal",
    operatingStatus: "Chal rahi hai",
    developingStatus: "Ban rahi / proposed",
    aliases: "Doosray naam",
    chain: "Is tarteeb mein yaad karein",
    corridorSummary: (from: string, to: string) => `${from} se ${to} tak Karachi ki zehni road-chain.`,
    placeSummary: (type: string, district: string, road: string) => `${district} mein ${type}; ${road} ke qareeb.`,
    motorwayBike: "Motorcycles motorways par prohibited hain. Bike ke liye N-5/N-25 aur current legal route verify karein.",
    orientationOnly: "Orientation only — live turns, traffic, closures aur passability current navigation se check karein.",
  },
  en: {
    district: "District",
    corridor: "Major road",
    place: "Place",
    transit: "Public transport",
    area: "Area",
    population: "Population",
    anchor: "Main anchor",
    road: "Main road",
    districtLabel: "District",
    near: "Nearby road",
    direction: "Endpoints",
    status: "Status",
    current: "Rideable now",
    yes: "Yes — still check same-day service",
    no: "No — developing/proposed",
    operatingStatus: "Operating",
    developingStatus: "Developing",
    aliases: "Other names",
    chain: "Remember this order",
    corridorSummary: (from: string, to: string) => `A mental road chain across Karachi from ${from} to ${to}.`,
    placeSummary: (type: string, district: string, road: string) => `${type} in ${district}, near ${road}.`,
    motorwayBike: "Motorcycles are prohibited on motorways. For a bike, verify a current legal N-5/N-25 route.",
    orientationOnly: "Orientation only — verify live turns, traffic, closures, and passability in current navigation.",
  },
} as const;

const placeType = (value: string, locale: Locale) => {
  if (locale === "en") return value.replaceAll("-", " ");
  const roman: Record<string, string> = {
    gateway: "shehar ka darwaza",
    junction: "junction",
    neighbourhood: "ilaqa",
    heritage: "landmark",
    transport: "transport point",
    coast: "samandari kinara",
    civic: "civic jagah",
    hospital: "hospital",
    education: "taleemi jagah",
    market: "market",
    business: "business area",
    industrial: "industrial area",
    port: "port",
    park: "park",
  };
  return roman[value] ?? value;
};

export function resolveMapEntity(ref: MapEntityRef, locale: Locale): MapEntityDetails | null {
  const ui = labels[locale];
  const copy = getCopy(locale);

  if (ref.kind === "district") {
    const district = districts.find((item) => item.id === ref.id);
    if (!district) return null;
    return {
      ref,
      name: district.officialName,
      kindLabel: ui.district,
      summary: copy.districtNarrative[district.id as DistrictId].body,
      facts: [
        { label: ui.area, value: `${district.areaKm2.toLocaleString("en-US")} km²` },
        { label: ui.population, value: district.population2023.toLocaleString("en-US") },
        { label: ui.anchor, value: district.anchor },
        { label: ui.road, value: district.mainCorridor },
      ],
      chain: district.keyAreas.slice(0, 7),
      aliases: [district.familiarName, district.osmAlias],
      color: district.color,
    };
  }

  if (ref.kind === "corridor") {
    const corridor = mainCorridors.find((item) => item.id === ref.id);
    if (!corridor) return null;
    const first = corridor.routeChain[0];
    const last = corridor.routeChain[corridor.routeChain.length - 1];
    return {
      ref,
      name: corridor.name,
      kindLabel: ui.corridor,
      summary: ui.corridorSummary(first, last),
      facts: [{ label: ui.direction, value: `${first} ↔ ${last}` }],
      chain: corridor.routeChain,
      aliases: corridor.aliases,
      caution: corridor.id === "m9-motorway" ? ui.motorwayBike : ui.orientationOnly,
      color: corridor.color,
    };
  }

  if (ref.kind === "place") {
    const place = landmarks.find((item) => item.id === ref.id);
    if (!place) {
      const fallback = NETWORK_FALLBACK_POINTS[ref.id];
      if (!fallback) return null;
      return {
        ref,
        name: fallback.name,
        kindLabel: ui.place,
        summary: fallback.summary[locale],
        facts: [{ label: ui.near, value: "N-25 / Hub River Road" }],
        caution: ui.orientationOnly,
        color: "#4AA5B3",
      };
    }
    const district = districts.find((item) => item.id === place.districtId);
    const corridor = mainCorridors.find((item) => item.id === place.nearbyCorridorId);
    const districtName = district?.name ?? place.districtId;
    const corridorName = corridor?.name ?? place.nearbyCorridorId;
    return {
      ref,
      name: place.name,
      kindLabel: ui.place,
      summary: ui.placeSummary(placeType(place.type, locale), districtName, corridorName),
      facts: [
        { label: ui.districtLabel, value: districtName },
        { label: ui.near, value: corridorName },
      ],
      aliases: place.aliases,
      caution: locale === "en" ? place.plainMeaning : romanLandmarkMeaning[place.id],
      color: district?.color,
    };
  }

  const transit = transitCategories.find((item) => item.id === ref.id);
  if (!transit) return null;
  const transitPresentation = locale === "ur-roman" ? romanTransitPresentation[transit.id] : transit;
  return {
    ref,
    name: transit.name,
    kindLabel: ui.transit,
    summary: "summary" in transitPresentation ? transitPresentation.summary : transit.routeSummary,
    facts: [
      { label: ui.current, value: transit.rideableNow ? ui.yes : ui.no },
      { label: ui.status, value: transit.category === "operating" ? ui.operatingStatus : ui.developingStatus },
    ],
    aliases: transit.aliases,
    caution: "caveat" in transitPresentation ? transitPresentation.caveat : transit.caveat,
    color: transit.color,
  };
}

export function toEntityRef(properties: Record<string, unknown> | null | undefined): MapEntityRef | null {
  if (!properties) return null;
  const entityKind = properties.entityKind;
  const entityId = properties.entityId;
  if (typeof entityKind === "string" && typeof entityId === "string") {
    if (["district", "corridor", "place", "transit"].includes(entityKind)) {
      return { kind: entityKind as MapEntityKind, id: entityId };
    }
  }
  const id = properties.id;
  const kind = properties.kind;
  if (typeof id !== "string") return null;
  if (NETWORK_CORRIDOR_TO_DOMAIN[id]) return { kind: "corridor", id: NETWORK_CORRIDOR_TO_DOMAIN[id] };
  if (NETWORK_TRANSIT_TO_DOMAIN[id]) return { kind: "transit", id: NETWORK_TRANSIT_TO_DOMAIN[id] };
  if (NETWORK_POINT_TO_PLACE[id]) return { kind: "place", id: NETWORK_POINT_TO_PLACE[id] };
  if (NETWORK_FALLBACK_POINTS[id]) return { kind: "place", id };
  if (districts.some((district) => district.id === id) || kind === "district" || properties.areaKm2) return { kind: "district", id };
  return null;
}

export const detailedCorridorsGeoJson = {
  type: "FeatureCollection" as const,
  features: mainCorridors.map((corridor) => ({
    type: "Feature" as const,
    properties: {
      id: corridor.id,
      entityKind: "corridor",
      entityId: corridor.id,
      name: corridor.name,
      color: corridor.color,
    },
    geometry: { type: "LineString" as const, coordinates: corridor.path.map(([longitude, latitude]) => [longitude, latitude]) },
  })),
};

export const placesGeoJson = {
  type: "FeatureCollection" as const,
  features: landmarks.map((place) => ({
    type: "Feature" as const,
    properties: {
      id: place.id,
      entityKind: "place",
      entityId: place.id,
      name: place.name,
      type: place.type,
      districtId: place.districtId,
    },
    geometry: { type: "Point" as const, coordinates: [place.coordinates[0], place.coordinates[1]] },
  })),
};
