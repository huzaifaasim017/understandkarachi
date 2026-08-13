/**
 * Curated orientation data for Understand Karachi.
 *
 * Coordinate order is always [longitude, latitude]. District label points,
 * corridor paths and most place points are deliberately rounded: they are for
 * building a mental map, not for turn-by-turn navigation or boundary disputes.
 */

export type IsoDate = `${number}-${number}-${number}`;
export type LngLat = readonly [longitude: number, latitude: number];

export type DistrictId =
  | "central"
  | "east"
  | "south"
  | "west"
  | "keamari"
  | "korangi"
  | "malir";

export type CorridorId =
  | "shahrah-e-faisal"
  | "ma-jinnah-road"
  | "shahrah-e-pakistan"
  | "university-road"
  | "rashid-minhas-road"
  | "shaheed-e-millat"
  | "national-highway"
  | "m9-motorway"
  | "korangi-spine"
  | "ii-chundrigar-road"
  | "mauripur-hub-river"
  | "lyari-expressway"
  | "coastal-dha-spine"
  | "orangi-manghopir";

export type SourceId =
  | "pbs-census-2023-table-1"
  | "commissioner-karachi-area-map"
  | "commissioner-karachi-population"
  | "openstreetmap-district-boundaries"
  | "smta-current-route-map"
  | "smta-yellow-line"
  | "transkarachi-red-line"
  | "adb-red-line-project"
  | "world-bank-yellow-line"
  | "sindh-assembly-transit-status"
  | "radio-pakistan-kcr-2026"
  | "sindh-emergency-contacts"
  | "karachi-police-emergency-directory"
  | "ke-customer-care"
  | "kwsc-contact"
  | "ssgc-contact"
  | "sswmb-contact"
  | "sbca-official"
  | "commons-clifton-skyline"
  | "commons-empress-market"
  | "commons-mazar-e-quaid"
  | "commons-karachi-seaport"
  | "commons-jinnah-airport";

export interface Provenanced {
  readonly sourceIds: readonly SourceId[];
}

export interface KarachiDistrict extends Provenanced {
  readonly id: DistrictId;
  readonly name: string;
  readonly officialName: string;
  readonly familiarName: string;
  /** Current OSM relation name; it may differ from everyday official wording. */
  readonly osmAlias: string;
  readonly areaKm2: number;
  readonly population2023: number;
  readonly subdivisions: readonly string[];
  readonly mentalModel: string;
  readonly keyAreas: readonly string[];
  readonly anchor: string;
  readonly anchorCoordinates: LngLat;
  readonly mainCorridor: string;
  readonly mainCorridorId: CorridorId;
  readonly caution: string;
  readonly color: `#${string}`;
  /** Stable label point used by the local district GeoJSON. */
  readonly coordinates: LngLat;
}

export interface MainCorridor {
  readonly id: CorridorId;
  readonly name: string;
  readonly aliases: readonly string[];
  readonly color: `#${string}`;
  /** Simplified orientation line, not a routable road geometry. */
  readonly path: readonly LngLat[];
  readonly routeChain: readonly string[];
  readonly explanation: string;
  readonly remember: string;
}

export const dataVerifiedOn: IsoDate = "2026-08-13";

export const karachiFacts = {
  officialFrame: "Karachi Division, Sindh, Pakistan",
  districts: 7,
  subdivisions: 31,
  areaKm2: 3527,
  population2023: 20_382_881,
  urbanSharePercent: 92.57,
  coast: "Arabian Sea",
  populationSourceYear: 2023,
  mapSnapshot: dataVerifiedOn,
  coordinateOrder: "longitude-latitude",
  mapPrecision: "orientation-only",
  beginnerRule:
    "A district is a large administrative container; a town, neighbourhood, chowrangi or cantonment is a different layer.",
  cityShape:
    "The old core and port sit in the south-west; dense inner neighbourhoods spread north and east; industry follows the port, SITE, Korangi and Port Qasim; Malir opens into the much larger eastern and north-eastern edge.",
} as const;

export const districts = [
  {
    id: "central",
    name: "Central",
    officialName: "Karachi Central District",
    familiarName: "Central",
    osmAlias: "Nazimabad District",
    areaKm2: 69,
    population2023: 3_822_325,
    subdivisions: [
      "Gulberg",
      "Liaquatabad",
      "Nazimabad",
      "New Karachi",
      "North Nazimabad",
    ],
    mentalModel:
      "The compact, very dense middle-north: established grid neighbourhoods between the old centre and the northern edge.",
    keyAreas: [
      "Liaquatabad",
      "Nazimabad",
      "North Nazimabad",
      "Federal B Area",
      "Gulberg",
      "New Karachi",
      "Buffer Zone",
    ],
    anchor: "Liaquatabad",
    anchorCoordinates: [67.044, 24.91],
    mainCorridor: "Shahrah-e-Pakistan",
    mainCorridorId: "shahrah-e-pakistan",
    caution:
      "North Karachi, New Karachi and North Nazimabad sound interchangeable to a newcomer, but they are distinct areas.",
    color: "#F3C76B",
    coordinates: [67.044, 24.952],
    sourceIds: [
      "pbs-census-2023-table-1",
      "commissioner-karachi-area-map",
      "openstreetmap-district-boundaries",
    ],
  },
  {
    id: "east",
    name: "East",
    officialName: "Karachi East District",
    familiarName: "East",
    osmAlias: "Gulshan District",
    areaKm2: 139,
    population2023: 3_921_742,
    subdivisions: [
      "Ferozabad",
      "Gulshan-e-Iqbal",
      "Gulzar-e-Hijri",
      "Jamshed Quarters",
    ],
    mentalModel:
      "The education-and-services belt east of the inner city: Gulshan, Johar, universities, hospitals and the M-9 gateway meet here.",
    keyAreas: [
      "Gulshan-e-Iqbal",
      "Gulistan-e-Johar",
      "PECHS",
      "Bahadurabad",
      "Jamshed Quarters",
      "Scheme 33",
      "Safoora",
      "Sohrab Goth",
    ],
    anchor: "NIPA Chowrangi",
    anchorCoordinates: [67.105, 24.917],
    mainCorridor: "University Road",
    mainCorridorId: "university-road",
    caution:
      "Gulshan, Johar and Scheme 33 are broad everyday labels; an address still needs its block, road or nearby landmark.",
    color: "#6FC5B5",
    coordinates: [67.105, 24.933],
    sourceIds: [
      "pbs-census-2023-table-1",
      "commissioner-karachi-area-map",
      "openstreetmap-district-boundaries",
    ],
  },
  {
    id: "south",
    name: "South",
    officialName: "Karachi South District",
    familiarName: "South",
    osmAlias: "Karachi District",
    areaKm2: 122,
    population2023: 2_329_764,
    subdivisions: ["Aram Bagh", "Civil Lines", "Garden", "Lyari", "Saddar"],
    mentalModel:
      "The historic and commercial south: old city markets, Saddar, the financial core, Lyari, Clifton and the seafront.",
    keyAreas: [
      "Saddar",
      "Old City",
      "Lyari",
      "Garden",
      "Civil Lines",
      "Clifton",
      "DHA",
      "I.I. Chundrigar Road",
    ],
    anchor: "Saddar",
    anchorCoordinates: [67.03, 24.861],
    mainCorridor: "M.A. Jinnah Road",
    mainCorridorId: "ma-jinnah-road",
    caution:
      "Clifton and DHA are familiar location names, but cantonment administration and district administration overlap as separate systems.",
    color: "#F06F55",
    coordinates: [67.032, 24.862],
    sourceIds: [
      "pbs-census-2023-table-1",
      "commissioner-karachi-area-map",
      "openstreetmap-district-boundaries",
    ],
  },
  {
    id: "west",
    name: "West",
    officialName: "Karachi West District",
    familiarName: "West",
    osmAlias: "Orangi District",
    areaKm2: 370,
    population2023: 2_679_380,
    subdivisions: ["Manghopir", "Mominabad", "Orangi Town"],
    mentalModel:
      "The hilly, fast-grown north-west: Orangi and Manghopir sit beyond the dense centre, with routes funnelling through a few passes and junctions.",
    keyAreas: [
      "Orangi Town",
      "Mominabad",
      "Manghopir",
      "Qasba Colony",
      "Banaras",
      "Surjani Town",
    ],
    anchor: "Banaras Chowk",
    anchorCoordinates: [66.987, 24.944],
    mainCorridor: "Orangi / Manghopir approach",
    mainCorridorId: "orangi-manghopir",
    caution:
      "West and Keamari were redrawn when Keamari became a separate district; older addresses and memories may use the former Karachi West.",
    color: "#E98F72",
    coordinates: [66.994, 24.994],
    sourceIds: [
      "pbs-census-2023-table-1",
      "commissioner-karachi-area-map",
      "openstreetmap-district-boundaries",
    ],
  },
  {
    id: "keamari",
    name: "Keamari",
    officialName: "Keamari District",
    familiarName: "Keamari",
    osmAlias: "Keamari District",
    areaKm2: 559,
    population2023: 2_068_451,
    subdivisions: ["Baldia", "Harbour", "Maripur", "SITE"],
    mentalModel:
      "The port-and-industry west: harbour land, SITE, Baldia and the western beaches share one long district.",
    keyAreas: [
      "Keamari",
      "Karachi Harbour",
      "SITE",
      "Baldia Town",
      "Maripur",
      "Hawks Bay",
      "Sandspit",
      "Manora",
    ],
    anchor: "Keamari harbour",
    anchorCoordinates: [66.975, 24.82],
    mainCorridor: "Mauripur / Hub River approach",
    mainCorridorId: "mauripur-hub-river",
    caution:
      "Keamari can mean the district, the harbour-side neighbourhood or the port area; ask which one the speaker means.",
    color: "#4AA5B3",
    coordinates: [66.91, 24.888],
    sourceIds: [
      "pbs-census-2023-table-1",
      "commissioner-karachi-area-map",
      "openstreetmap-district-boundaries",
    ],
  },
  {
    id: "korangi",
    name: "Korangi",
    officialName: "Korangi District",
    familiarName: "Korangi",
    osmAlias: "Korangi District",
    areaKm2: 108,
    population2023: 3_128_971,
    subdivisions: ["Korangi", "Landhi", "Model Colony", "Shah Faisal"],
    mentalModel:
      "The south-eastern residential-and-industrial belt: Shah Faisal and Model Colony sit near the airport approach; Korangi and Landhi stretch toward heavy industry.",
    keyAreas: [
      "Korangi",
      "Korangi Industrial Area",
      "Landhi",
      "Shah Faisal Colony",
      "Model Colony",
      "Qayyumabad",
      "Zaman Town",
    ],
    anchor: "Korangi Crossing",
    anchorCoordinates: [67.126, 24.824],
    mainCorridor: "Korangi Road / 8000 Road",
    mainCorridorId: "korangi-spine",
    caution:
      "Korangi district is wider than Korangi neighbourhood; Landhi, Shah Faisal and Model Colony are part of the same district.",
    color: "#A88CC8",
    coordinates: [67.135, 24.847],
    sourceIds: [
      "pbs-census-2023-table-1",
      "commissioner-karachi-area-map",
      "openstreetmap-district-boundaries",
    ],
  },
  {
    id: "malir",
    name: "Malir",
    officialName: "Malir District",
    familiarName: "Malir",
    osmAlias: "Malir District",
    areaKm2: 2160,
    population2023: 2_432_248,
    subdivisions: [
      "Airport",
      "Bin Qasim",
      "Gadap",
      "Ibrahim Hyderi",
      "Murad Memon",
      "Shah Mureed",
    ],
    mentalModel:
      "Karachi's huge eastern and north-eastern envelope: airport, older Malir settlements, villages, new housing, Steel Town and Port Qasim.",
    keyAreas: [
      "Malir",
      "Jinnah International Airport",
      "Malir Cantt",
      "Gadap",
      "Memon Goth",
      "Bahria Town Karachi",
      "Gulshan-e-Hadeed",
      "Steel Town",
      "Port Qasim",
    ],
    anchor: "Malir 15",
    anchorCoordinates: [67.195, 24.883],
    mainCorridor: "National Highway N-5",
    mainCorridorId: "national-highway",
    caution:
      "Malir district is by far the largest in area; 'Malir' in a route conversation usually means the built-up Malir 15/Halt side, not the whole district.",
    color: "#94B76A",
    coordinates: [67.325, 25.042],
    sourceIds: [
      "pbs-census-2023-table-1",
      "commissioner-karachi-area-map",
      "openstreetmap-district-boundaries",
    ],
  },
] as const satisfies readonly KarachiDistrict[];

const mainCorridorRecords = [
  {
    id: "shahrah-e-faisal",
    name: "Shahrah-e-Faisal",
    aliases: ["Shara-e-Faisal", "Shahrah Faisal", "Faisal road"],
    color: "#EF7D57",
    path: [
      [67.0325, 24.852],
      [67.052, 24.856],
      [67.066, 24.862],
      [67.103, 24.881],
      [67.139, 24.887],
      [67.168, 24.899],
    ],
    routeChain: [
      "Metropole",
      "FTC",
      "Nursery",
      "Karsaz",
      "Natha Khan",
      "Airport",
    ],
    explanation:
      "Karachi's best-known airport-to-centre spine, running along the railway and linking offices, hotels and major cross-roads.",
    remember:
      "If a newcomer remembers one east–west road first, make it Shahrah-e-Faisal: airport on one end, Saddar/Metropole on the other.",
  },
  {
    id: "ma-jinnah-road",
    name: "M.A. Jinnah Road",
    aliases: ["Muhammad Ali Jinnah Road", "Bunder Road", "Bandar Road"],
    color: "#E85545",
    path: [
      [66.998, 24.849],
      [67.008, 24.856],
      [67.019, 24.863],
      [67.028, 24.868],
      [67.036, 24.873],
    ],
    routeChain: ["Tower", "Jama Cloth", "Tibet Centre", "Numaish"],
    explanation:
      "The old-city commercial axis from the port-side Tower area through dense markets to Numaish.",
    remember:
      "Tower is west; Numaish is east. The road between them is the simplest backbone for reading old central Karachi.",
  },
  {
    id: "shahrah-e-pakistan",
    name: "Shahrah-e-Pakistan",
    aliases: ["Shara-e-Pakistan", "Shahrah Pakistan"],
    color: "#D9A62E",
    path: [
      [67.036, 24.873],
      [67.047, 24.896],
      [67.044, 24.91],
      [67.063, 24.93],
      [67.071, 24.943],
      [67.085, 24.947],
    ],
    routeChain: [
      "Numaish",
      "Teen Hatti",
      "Liaquatabad",
      "Ayesha Manzil",
      "Water Pump",
      "Sohrab Goth",
    ],
    explanation:
      "The main northbound axis from the inner city into Central and the M-9 gateway.",
    remember:
      "Southbound names count down toward Numaish; northbound movement eventually meets Sohrab Goth and the Super Highway.",
  },
  {
    id: "university-road",
    name: "University Road",
    aliases: ["Main University Road", "University Rd"],
    color: "#2EA88F",
    path: [
      [67.063, 24.889],
      [67.087, 24.906],
      [67.105, 24.917],
      [67.121, 24.929],
      [67.145, 24.935],
    ],
    routeChain: [
      "Jail Chowrangi",
      "Hasan Square",
      "NIPA",
      "Karachi University / NED",
      "Safoora",
    ],
    explanation:
      "East Karachi's education, hospital and civic spine, continuing from the inner city toward Safoora.",
    remember:
      "Hasan Square and NIPA are its two strongest orientation anchors; many east-side routes touch one of them.",
  },
  {
    id: "rashid-minhas-road",
    name: "Rashid Minhas Road",
    aliases: ["Rashid Minhas Rd"],
    color: "#4798D3",
    path: [
      [67.128, 24.891],
      [67.116, 24.906],
      [67.105, 24.917],
      [67.091, 24.944],
      [67.075, 24.97],
    ],
    routeChain: [
      "Drigh Road",
      "Millennium Mall",
      "NIPA",
      "Sakhi Hassan side",
      "Shafiq Mor",
    ],
    explanation:
      "A diagonal connector tying the airport/Drigh side to Gulshan, NIPA and north-central Karachi.",
    remember:
      "At NIPA it crosses University Road: that crossing joins two of East Karachi's most useful mental lines.",
  },
  {
    id: "shaheed-e-millat",
    name: "Shaheed-e-Millat corridor",
    aliases: ["Shaheed-e-Millat Road", "Shaheed-e-Millat Expressway"],
    color: "#8C77C5",
    path: [
      [67.063, 24.889],
      [67.07, 24.88],
      [67.077, 24.866],
      [67.086, 24.85],
      [67.095, 24.835],
    ],
    routeChain: [
      "Jail Chowrangi",
      "Bahadurabad",
      "Baloch Colony",
      "KPT Interchange",
      "Qayyumabad side",
    ],
    explanation:
      "A cross-city diagonal from the inner east toward Korangi Road, DHA and the south-eastern industrial belt.",
    remember:
      "It is the useful bridge between University Road's world and Korangi/DHA's world.",
  },
  {
    id: "national-highway",
    name: "National Highway N-5",
    aliases: ["N-5", "National Highway", "Thatta Road"],
    color: "#6FA24B",
    path: [
      [67.143, 24.887],
      [67.177, 24.893],
      [67.195, 24.883],
      [67.236, 24.851],
      [67.327, 24.859],
      [67.347, 24.796],
    ],
    routeChain: [
      "Natha Khan",
      "Malir Halt",
      "Malir 15",
      "Quaidabad",
      "Steel Town",
      "Port Qasim turn",
    ],
    explanation:
      "The south-eastern gateway through built-up Malir toward Steel Town, Port Qasim and Thatta.",
    remember:
      "Airport/Malir names appear early; Quaidabad and Steel Town mean you are moving farther out toward the industrial edge.",
  },
  {
    id: "m9-motorway",
    name: "M-9 Motorway",
    aliases: ["M-9", "Karachi–Hyderabad Motorway", "Super Highway"],
    color: "#467B62",
    path: [
      [67.085, 24.947],
      [67.096, 24.958],
      [67.174, 24.986],
      [67.307, 25.014],
      [67.508, 25.147],
    ],
    routeChain: [
      "Sohrab Goth",
      "Al-Asif Square",
      "Karachi Toll Plaza",
      "Bahria Town Karachi",
      "Hyderabad direction",
    ],
    explanation:
      "Karachi's north-eastern intercity gateway; it begins at Sohrab Goth and leaves the continuous inner city quickly.",
    remember:
      "Super Highway is the older everyday name; M-9 is the formal motorway name.",
  },
  {
    id: "korangi-spine",
    name: "Korangi Road / 8000 Road spine",
    aliases: ["Korangi Road", "Korangi 8000 Road", "Korangi Industrial Road"],
    color: "#9071B5",
    path: [
      [67.052, 24.854],
      [67.071, 24.842],
      [67.089, 24.831],
      [67.126, 24.824],
      [67.159, 24.829],
      [67.195, 24.837],
    ],
    routeChain: [
      "FTC",
      "Kala Pul",
      "Qayyumabad",
      "Korangi Crossing",
      "Singer Chowrangi",
      "Dawood Chowrangi",
    ],
    explanation:
      "The long industrial-residential approach from central Karachi through Korangi to Landhi.",
    remember:
      "Chowrangi names are the milestones: Crossing, Singer and Dawood mark movement deeper into Korangi/Landhi.",
  },
  {
    id: "ii-chundrigar-road",
    name: "I.I. Chundrigar Road",
    aliases: ["Chundrigar Road", "McLeod Road", "Pakistan Wall Street"],
    color: "#345B7E",
    path: [
      [66.9978, 24.849],
      [67.003, 24.85],
      [67.01, 24.849],
      [67.018, 24.849],
    ],
    routeChain: ["Tower", "City Station", "financial district", "Shaheen Complex"],
    explanation:
      "A short but nationally important banking-and-office axis beside the old city and railway.",
    remember:
      "Do not confuse it with a cross-city highway: it is a compact CBD street whose western anchor is Tower.",
  },
  {
    id: "mauripur-hub-river",
    name: "Mauripur / Hub River approach",
    aliases: ["Mauripur Road", "Maripur Road", "Hub River Road"],
    color: "#2F8796",
    path: [
      [66.997, 24.849],
      [66.978, 24.869],
      [66.959, 24.899],
      [66.942, 24.914],
      [66.92, 24.924],
      [66.89, 24.932],
    ],
    routeChain: ["Tower", "ICI", "Gulbai", "Baldia turn", "Hub River Road"],
    explanation:
      "The western freight-and-neighbourhood approach connecting the old core to Keamari district, Baldia and the Balochistan side.",
    remember:
      "Port traffic is heavy here; a nearby point can be slow to reach even when it looks close on the map.",
  },
  {
    id: "lyari-expressway",
    name: "Lyari Expressway",
    aliases: ["Lyari E-way", "Lyari River Expressway"],
    color: "#607C8A",
    path: [
      [66.973, 24.883],
      [67.004, 24.894],
      [67.033, 24.905],
      [67.063, 24.925],
      [67.085, 24.947],
    ],
    routeChain: [
      "Mauripur side",
      "along Lyari River",
      "Liaquatabad side",
      "Sohrab Goth",
    ],
    explanation:
      "A controlled-access bypass following the Lyari River between the western port side and Sohrab Goth.",
    remember:
      "It bypasses neighbourhood streets; its ramps, direction and vehicle rules matter more than the nearest landmark.",
  },
  {
    id: "coastal-dha-spine",
    name: "Clifton / DHA coastal spine",
    aliases: ["Mai Kolachi", "Sea View Road", "Khayaban-e-Ittehad"],
    color: "#278CA7",
    path: [
      [67.002, 24.828],
      [67.027, 24.823],
      [67.033, 24.817],
      [67.025, 24.802],
      [67.043, 24.787],
      [67.084, 24.802],
      [67.111, 24.823],
    ],
    routeChain: [
      "Mai Kolachi",
      "Boat Basin",
      "Teen Talwar",
      "Dolmen / Sea View",
      "DHA",
      "Khayaban-e-Ittehad",
      "Korangi Creek side",
    ],
    explanation:
      "A mental chain, not one road name: it joins the waterfront, Clifton, DHA and the Korangi-side exits.",
    remember:
      "In DHA, the phase, khayaban and street number are essential; 'Defence' alone is not a usable destination.",
  },
  {
    id: "orangi-manghopir",
    name: "Orangi / Manghopir approach",
    aliases: ["Orangi Road", "Manghopir Road", "Banaras route"],
    color: "#C9785D",
    path: [
      [67.034, 24.925],
      [67.005, 24.933],
      [66.987, 24.944],
      [66.996, 24.975],
      [66.995, 25.006],
      [66.972, 25.053],
    ],
    routeChain: [
      "Board Office side",
      "SITE edge",
      "Banaras Chowk",
      "Orangi",
      "Manghopir",
      "Northern Bypass side",
    ],
    explanation:
      "A simplified set of approaches into the north-western hills and dense Orangi/Manghopir settlements.",
    remember:
      "The hills and limited crossings funnel traffic; ask for the exact chowk, sector or colony, not just 'Orangi'.",
  },
] as const satisfies readonly MainCorridor[];

export const mainCorridors = mainCorridorRecords.map((corridor, index) => {
  const middle = corridor.path[Math.floor(corridor.path.length / 2)];
  return {
    ...corridor,
    cameraCenter: [middle[0], middle[1]] as [number, number],
    cameraZoom: index < 6 ? 9.8 : 9.25,
  };
});

export type PlaceType =
  | "gateway"
  | "junction"
  | "neighbourhood"
  | "heritage"
  | "transport"
  | "coast"
  | "civic"
  | "hospital"
  | "education"
  | "market"
  | "business"
  | "industrial"
  | "port"
  | "park";

export interface KarachiLandmark {
  readonly id: string;
  readonly name: string;
  readonly aliases: readonly string[];
  readonly type: PlaceType;
  readonly districtId: DistrictId;
  readonly coordinates: LngLat;
  readonly nearbyCorridorId: CorridorId;
  readonly plainMeaning: string;
}

/**
 * Searchable anchors are intentionally a mix of monuments, junctions and
 * neighbourhood names. In Karachi, a chowrangi or bus-stop name is often more
 * useful for orientation than a formal street address.
 */
const landmarkRecords = [
  {
    id: "saddar",
    name: "Saddar",
    aliases: ["Sadar", "Saddar Town", "Regal", "Lucky Star"],
    type: "neighbourhood",
    districtId: "south",
    coordinates: [67.03, 24.861],
    nearbyCorridorId: "ma-jinnah-road",
    plainMeaning:
      "The old central shopping and transport district; many routes use Saddar even when their exact stop is Regal, Empress Market or Lucky Star.",
  },
  {
    id: "empress-market",
    name: "Empress Market",
    aliases: ["Empress", "Empress Market Saddar"],
    type: "market",
    districtId: "south",
    coordinates: [67.03, 24.8613],
    nearbyCorridorId: "ma-jinnah-road",
    plainMeaning:
      "A historic market and one of Saddar's clearest visual anchors.",
  },
  {
    id: "tower",
    name: "Tower",
    aliases: ["Merewether Tower", "Merewether Clock Tower"],
    type: "junction",
    districtId: "south",
    coordinates: [66.9978, 24.849],
    nearbyCorridorId: "ma-jinnah-road",
    plainMeaning:
      "The old-city/port-side route anchor around Merewether Clock Tower; bus routes saying 'Tower' mean this area.",
  },
  {
    id: "ii-chundrigar",
    name: "I.I. Chundrigar Road",
    aliases: ["Chundrigar", "McLeod Road", "financial district"],
    type: "business",
    districtId: "south",
    coordinates: [67.007, 24.8495],
    nearbyCorridorId: "ii-chundrigar-road",
    plainMeaning:
      "Karachi's historic banking and corporate street between Tower and Shaheen Complex.",
  },
  {
    id: "karachi-city-station",
    name: "Karachi City Station",
    aliases: ["City Station", "Karachi City railway station"],
    type: "transport",
    districtId: "south",
    coordinates: [66.9975, 24.8509],
    nearbyCorridorId: "ii-chundrigar-road",
    plainMeaning:
      "The older downtown railway station; do not confuse it with Karachi Cantt station.",
  },
  {
    id: "karachi-cantt-station",
    name: "Karachi Cantt Station",
    aliases: ["Cantt Station", "Karachi Cantonment railway station"],
    type: "transport",
    districtId: "south",
    coordinates: [67.0415, 24.8436],
    nearbyCorridorId: "shahrah-e-faisal",
    plainMeaning:
      "Karachi's principal intercity railway station, south of the Shahrah-e-Faisal/Metropole side.",
  },
  {
    id: "frere-hall",
    name: "Frere Hall",
    aliases: ["Frere Hall Gardens", "Bagh-e-Jinnah"],
    type: "heritage",
    districtId: "south",
    coordinates: [67.033, 24.8475],
    nearbyCorridorId: "shahrah-e-faisal",
    plainMeaning:
      "A colonial-era civic landmark between Saddar, Civil Lines and Clifton.",
  },
  {
    id: "teen-talwar",
    name: "Teen Talwar",
    aliases: ["Three Swords", "Clifton Three Swords"],
    type: "junction",
    districtId: "south",
    coordinates: [67.034, 24.8171],
    nearbyCorridorId: "coastal-dha-spine",
    plainMeaning:
      "The Three Swords monument and major Clifton junction; a standard meeting and direction point.",
  },
  {
    id: "do-talwar",
    name: "Do Talwar",
    aliases: ["Two Swords", "Clifton Two Swords"],
    type: "junction",
    districtId: "south",
    coordinates: [67.0272, 24.8134],
    nearbyCorridorId: "coastal-dha-spine",
    plainMeaning:
      "A separate Two Swords roundabout in Clifton; it is not Teen Talwar.",
  },
  {
    id: "boat-basin",
    name: "Boat Basin",
    aliases: ["Boat Basin Clifton", "Benazir Bhutto Park"],
    type: "neighbourhood",
    districtId: "south",
    coordinates: [67.0265, 24.823],
    nearbyCorridorId: "coastal-dha-spine",
    plainMeaning:
      "A waterfront food-and-park area on the approach from Mai Kolachi into Clifton.",
  },
  {
    id: "sea-view",
    name: "Sea View",
    aliases: ["Clifton Beach", "Sea View Beach", "Abdul Sattar Edhi Avenue"],
    type: "coast",
    districtId: "south",
    coordinates: [67.026, 24.789],
    nearbyCorridorId: "coastal-dha-spine",
    plainMeaning:
      "The most familiar public seafront; 'Sea View' may refer to a long stretch, so ask for a named landmark.",
  },
  {
    id: "dolmen-clifton",
    name: "Dolmen Mall Clifton",
    aliases: ["Dolmen Clifton", "Dolmen Mall Sea View"],
    type: "market",
    districtId: "south",
    coordinates: [67.0252, 24.8022],
    nearbyCorridorId: "coastal-dha-spine",
    plainMeaning:
      "A major mall and highly recognisable seafront pickup/drop-off anchor.",
  },
  {
    id: "civil-hospital",
    name: "Dr. Ruth K. M. Pfau Civil Hospital",
    aliases: ["Civil Hospital Karachi", "CHK", "Civil Hospital"],
    type: "hospital",
    districtId: "south",
    coordinates: [67.01, 24.8598],
    nearbyCorridorId: "ma-jinnah-road",
    plainMeaning:
      "A major public hospital in the dense old-city medical and market zone.",
  },
  {
    id: "jpmc",
    name: "Jinnah Postgraduate Medical Centre",
    aliases: ["JPMC", "Jinnah Hospital"],
    type: "hospital",
    districtId: "south",
    coordinates: [67.045, 24.8518],
    nearbyCorridorId: "shahrah-e-faisal",
    plainMeaning:
      "A major public teaching hospital near Cantt Station and the Saddar/FTC side.",
  },
  {
    id: "lyari",
    name: "Lyari",
    aliases: ["Lyari Town", "Kalri", "Baghdadi", "Chakiwara"],
    type: "neighbourhood",
    districtId: "south",
    coordinates: [66.997, 24.871],
    nearbyCorridorId: "mauripur-hub-river",
    plainMeaning:
      "A large historic district of neighbourhoods immediately north-west of the old city; one point cannot represent all of it.",
  },
  {
    id: "mazar-e-quaid",
    name: "Mazar-e-Quaid",
    aliases: ["Quaid's Mausoleum", "Jinnah Mausoleum", "Mazar Quaid"],
    type: "heritage",
    districtId: "east",
    coordinates: [67.041, 24.8753],
    nearbyCorridorId: "ma-jinnah-road",
    plainMeaning:
      "Muhammad Ali Jinnah's mausoleum and the city's strongest central visual landmark.",
  },
  {
    id: "numaish",
    name: "Numaish Chowrangi",
    aliases: ["Numaish", "Numaish bus station", "Exhibition"],
    type: "junction",
    districtId: "east",
    coordinates: [67.036, 24.873],
    nearbyCorridorId: "ma-jinnah-road",
    plainMeaning:
      "The junction beside the Mazar area where M.A. Jinnah Road, Shahrah-e-Pakistan and major bus corridors meet.",
  },
  {
    id: "guru-mandir",
    name: "Guru Mandir",
    aliases: ["Gurumandir", "Guru Mandir Chowrangi"],
    type: "junction",
    districtId: "east",
    coordinates: [67.043, 24.881],
    nearbyCorridorId: "shahrah-e-pakistan",
    plainMeaning:
      "A busy route area just north-east of Numaish; in directions it means the junction/neighbourhood, not a district.",
  },
  {
    id: "jail-chowrangi",
    name: "Jail Chowrangi",
    aliases: ["Central Jail Chowrangi", "Jail Road"],
    type: "junction",
    districtId: "east",
    coordinates: [67.063, 24.889],
    nearbyCorridorId: "university-road",
    plainMeaning:
      "The inner-city start of the University Road mental line and the west end of Shaheed-e-Millat's cross-connection.",
  },
  {
    id: "hasan-square",
    name: "Hasan Square",
    aliases: ["Hassan Square", "Hasan Sq"],
    type: "junction",
    districtId: "east",
    coordinates: [67.086, 24.906],
    nearbyCorridorId: "university-road",
    plainMeaning:
      "A central East Karachi junction near the stadium, Expo Centre and Civic Centre.",
  },
  {
    id: "civic-centre",
    name: "Civic Centre",
    aliases: ["Karachi Civic Center", "Civic Centre Gulshan"],
    type: "civic",
    districtId: "east",
    coordinates: [67.071, 24.901],
    nearbyCorridorId: "university-road",
    plainMeaning:
      "A cluster of public offices near Hasan Square and University Road.",
  },
  {
    id: "expo-centre",
    name: "Karachi Expo Centre",
    aliases: ["Expo Center", "Expo Centre Karachi"],
    type: "civic",
    districtId: "east",
    coordinates: [67.075, 24.901],
    nearbyCorridorId: "university-road",
    plainMeaning:
      "The main exhibition complex, close to Civic Centre and the National Stadium side.",
  },
  {
    id: "nipa",
    name: "NIPA Chowrangi",
    aliases: ["NIPA", "Nipa bridge", "NIPA intersection"],
    type: "junction",
    districtId: "east",
    coordinates: [67.105, 24.917],
    nearbyCorridorId: "university-road",
    plainMeaning:
      "The major crossing of University Road and Rashid Minhas Road; one of East Karachi's best route anchors.",
  },
  {
    id: "karachi-university",
    name: "University of Karachi",
    aliases: ["Karachi University", "KU", "University gate"],
    type: "education",
    districtId: "east",
    coordinates: [67.12, 24.94],
    nearbyCorridorId: "university-road",
    plainMeaning:
      "The large public university campus that gives University Road its everyday identity.",
  },
  {
    id: "ned-university",
    name: "NED University",
    aliases: ["NED", "NED University main campus"],
    type: "education",
    districtId: "east",
    coordinates: [67.112, 24.932],
    nearbyCorridorId: "university-road",
    plainMeaning:
      "A major engineering university and bus-route landmark opposite the university belt.",
  },
  {
    id: "aga-khan-hospital",
    name: "Aga Khan University Hospital",
    aliases: ["AKUH", "Aga Khan Hospital", "AKU"],
    type: "hospital",
    districtId: "east",
    coordinates: [67.074, 24.892],
    nearbyCorridorId: "university-road",
    plainMeaning:
      "A major teaching hospital between the Stadium Road and University Road networks.",
  },
  {
    id: "safoora",
    name: "Safoora Chowrangi",
    aliases: ["Safoora Goth", "Safoora"],
    type: "junction",
    districtId: "east",
    coordinates: [67.145, 24.935],
    nearbyCorridorId: "university-road",
    plainMeaning:
      "The eastern end of the familiar University Road chain and a gateway into Scheme 33 and Malir Cantt approaches.",
  },
  {
    id: "sohrab-goth",
    name: "Sohrab Goth",
    aliases: ["Sohrab Goth interchange", "Al-Asif", "Super Highway start"],
    type: "gateway",
    districtId: "east",
    coordinates: [67.085, 24.947],
    nearbyCorridorId: "m9-motorway",
    plainMeaning:
      "The north-eastern city gateway where Shahrah-e-Pakistan meets the M-9/Super Highway and intercity bus activity.",
  },
  {
    id: "teen-hatti",
    name: "Teen Hatti",
    aliases: ["Teen Hatti bridge", "3 Hatti"],
    type: "junction",
    districtId: "central",
    coordinates: [67.047, 24.896],
    nearbyCorridorId: "shahrah-e-pakistan",
    plainMeaning:
      "A bridge-and-junction marker over the Lyari River between the inner city and Liaquatabad.",
  },
  {
    id: "liaquatabad-10",
    name: "Liaquatabad No. 10",
    aliases: ["Lalookhet 10", "Liaquatabad 10", "Lalu Khet"],
    type: "junction",
    districtId: "central",
    coordinates: [67.044, 24.91],
    nearbyCorridorId: "shahrah-e-pakistan",
    plainMeaning:
      "A dense commercial and transport anchor in Liaquatabad; Lalookhet is the older everyday name.",
  },
  {
    id: "ayesha-manzil",
    name: "Ayesha Manzil",
    aliases: ["Aisha Manzil", "Ayesha Manzil Chowrangi"],
    type: "junction",
    districtId: "central",
    coordinates: [67.063, 24.93],
    nearbyCorridorId: "shahrah-e-pakistan",
    plainMeaning:
      "A major north-central junction serving Federal B Area and the Shahrah-e-Pakistan spine.",
  },
  {
    id: "water-pump",
    name: "Water Pump",
    aliases: ["Water Pump Chowrangi", "Federal B Area Water Pump"],
    type: "junction",
    districtId: "central",
    coordinates: [67.071, 24.943],
    nearbyCorridorId: "shahrah-e-pakistan",
    plainMeaning:
      "A well-known Federal B Area junction; it is a place name, not an instruction to find a pump.",
  },
  {
    id: "board-office",
    name: "Board Office",
    aliases: ["Board Office Chowrangi", "Matric Board Office"],
    type: "junction",
    districtId: "central",
    coordinates: [67.034, 24.927],
    nearbyCorridorId: "orangi-manghopir",
    plainMeaning:
      "The Nazimabad education-board junction and transfer point toward Orangi; also the Green/Orange BRT connection area.",
  },
  {
    id: "five-star",
    name: "Five Star Chowrangi",
    aliases: ["5 Star Chowrangi", "Five Star"],
    type: "junction",
    districtId: "central",
    coordinates: [67.043, 24.953],
    nearbyCorridorId: "shahrah-e-pakistan",
    plainMeaning:
      "A North Nazimabad roundabout used as a route milestone.",
  },
  {
    id: "nagan-chowrangi",
    name: "Nagan Chowrangi",
    aliases: ["Nagan", "Nagan Flyover"],
    type: "junction",
    districtId: "central",
    coordinates: [67.067, 24.979],
    nearbyCorridorId: "rashid-minhas-road",
    plainMeaning:
      "A major north Karachi junction where several bus routes split toward New Karachi, North Karachi and Buffer Zone.",
  },
  {
    id: "power-house",
    name: "Power House Chowrangi",
    aliases: ["Power House", "Powerhouse North Karachi"],
    type: "junction",
    districtId: "central",
    coordinates: [67.066, 24.993],
    nearbyCorridorId: "rashid-minhas-road",
    plainMeaning:
      "A North Karachi route terminus/anchor beyond Nagan; not the city's electricity headquarters.",
  },
  {
    id: "banaras-chowk",
    name: "Banaras Chowk",
    aliases: ["Banaras", "Banaras Colony"],
    type: "junction",
    districtId: "west",
    coordinates: [66.987, 24.944],
    nearbyCorridorId: "orangi-manghopir",
    plainMeaning:
      "The key western junction between SITE, Qasba, Orangi and the Manghopir approaches.",
  },
  {
    id: "orangi-five",
    name: "Orangi No. 5",
    aliases: ["Orangi 5", "Orangi Town No 5"],
    type: "junction",
    districtId: "west",
    coordinates: [66.998, 24.963],
    nearbyCorridorId: "orangi-manghopir",
    plainMeaning:
      "One of Orangi's most familiar commercial and transport anchors; Orangi itself is much larger.",
  },
  {
    id: "kati-pahari",
    name: "Kati Pahari",
    aliases: ["Kati Pahari bridge", "Cut Hill"],
    type: "junction",
    districtId: "west",
    coordinates: [67.03, 24.961],
    nearbyCorridorId: "orangi-manghopir",
    plainMeaning:
      "A hill-cut route landmark between North Nazimabad and Orangi/Qasba sides.",
  },
  {
    id: "manghopir",
    name: "Manghopir",
    aliases: ["Mangho Pir", "Manghopir Road"],
    type: "neighbourhood",
    districtId: "west",
    coordinates: [66.995, 25.006],
    nearbyCorridorId: "orangi-manghopir",
    plainMeaning:
      "A broad north-western area and district subdivision; always pair it with a colony, road or shrine/industrial landmark.",
  },
  {
    id: "surjani-town",
    name: "Surjani Town",
    aliases: ["Surjani", "Surjani 4K", "4K Chowrangi"],
    type: "neighbourhood",
    districtId: "west",
    coordinates: [67.051, 25.033],
    nearbyCorridorId: "orangi-manghopir",
    plainMeaning:
      "A far-northern residential area and the outer end of the Green Line BRT corridor.",
  },
  {
    id: "karachi-port",
    name: "Port of Karachi",
    aliases: ["Karachi Port", "Karachi Harbour", "KPT"],
    type: "port",
    districtId: "keamari",
    coordinates: [66.985, 24.833],
    nearbyCorridorId: "mauripur-hub-river",
    plainMeaning:
      "The historic western seaport adjoining the old city and Keamari; distinct from Port Qasim in the far east.",
  },
  {
    id: "keamari-harbour",
    name: "Keamari",
    aliases: ["Kemari", "Keamari harbour", "Keamari jetty"],
    type: "port",
    districtId: "keamari",
    coordinates: [66.975, 24.82],
    nearbyCorridorId: "mauripur-hub-river",
    plainMeaning:
      "The harbour-side neighbourhood and jetty area that also lends its name to the much larger district.",
  },
  {
    id: "site-area",
    name: "SITE Industrial Area",
    aliases: ["SITE", "Sindh Industrial Trading Estate", "SITE Karachi"],
    type: "industrial",
    districtId: "keamari",
    coordinates: [66.998, 24.905],
    nearbyCorridorId: "mauripur-hub-river",
    plainMeaning:
      "A large western industrial estate between the inner city, Orangi and Baldia approaches.",
  },
  {
    id: "baldia-town",
    name: "Baldia Town",
    aliases: ["Baldia", "Saeedabad"],
    type: "neighbourhood",
    districtId: "keamari",
    coordinates: [66.934, 24.918],
    nearbyCorridorId: "mauripur-hub-river",
    plainMeaning:
      "A large western residential/industrial area; a sector or named stop is needed for precise travel.",
  },
  {
    id: "hawks-bay",
    name: "Hawks Bay",
    aliases: ["Hawke's Bay", "Hawksbay Beach", "Hawkes Bay"],
    type: "coast",
    districtId: "keamari",
    coordinates: [66.827, 24.86],
    nearbyCorridorId: "mauripur-hub-river",
    plainMeaning:
      "A western beach reached through Mauripur; it is far from Clifton Sea View by road.",
  },
  {
    id: "sandspit",
    name: "Sandspit Beach",
    aliases: ["Sandspit", "Sandspit Road"],
    type: "coast",
    districtId: "keamari",
    coordinates: [66.91, 24.839],
    nearbyCorridorId: "mauripur-hub-river",
    plainMeaning:
      "A western coastal beach and wetland side, reached from the Mauripur/Hawks Bay network.",
  },
  {
    id: "manora",
    name: "Manora",
    aliases: ["Manora Island", "Manora Beach"],
    type: "coast",
    districtId: "keamari",
    coordinates: [66.97, 24.799],
    nearbyCorridorId: "mauripur-hub-river",
    plainMeaning:
      "The peninsula/island at the harbour mouth, commonly approached from Keamari by boat or via the western road connection.",
  },
  {
    id: "natha-khan",
    name: "Natha Khan",
    aliases: ["Natha Khan Goth", "Nata Khan", "Natha Khan bridge"],
    type: "junction",
    districtId: "korangi",
    coordinates: [67.143, 24.887],
    nearbyCorridorId: "shahrah-e-faisal",
    plainMeaning:
      "A key airport-approach junction where Shahrah-e-Faisal meets routes toward Shah Faisal Colony and Korangi.",
  },
  {
    id: "model-colony",
    name: "Model Colony",
    aliases: ["Model Colony Malir", "Model Colony Gate"],
    type: "neighbourhood",
    districtId: "korangi",
    coordinates: [67.187, 24.906],
    nearbyCorridorId: "national-highway",
    plainMeaning:
      "A neighbourhood near the airport/Malir approach that is administratively in Korangi district despite often being described with Malir.",
  },
  {
    id: "shah-faisal-colony",
    name: "Shah Faisal Colony",
    aliases: ["Shah Faisal", "Shah Faisal Town"],
    type: "neighbourhood",
    districtId: "korangi",
    coordinates: [67.157, 24.878],
    nearbyCorridorId: "shahrah-e-faisal",
    plainMeaning:
      "A dense district north of the Malir River, beside the airport approach and across from Korangi routes.",
  },
  {
    id: "qayyumabad",
    name: "Qayyumabad",
    aliases: ["Qayumabad", "Qayyumabad Chowrangi"],
    type: "junction",
    districtId: "korangi",
    coordinates: [67.089, 24.831],
    nearbyCorridorId: "korangi-spine",
    plainMeaning:
      "The hinge between Korangi Road, DHA/Khayaban-e-Ittehad and the KPT/Shaheed-e-Millat approaches.",
  },
  {
    id: "korangi-crossing",
    name: "Korangi Crossing",
    aliases: ["Korangi Crossing Chowrangi", "Korangi Crossing stop"],
    type: "junction",
    districtId: "korangi",
    coordinates: [67.126, 24.824],
    nearbyCorridorId: "korangi-spine",
    plainMeaning:
      "The main branching point for Korangi neighbourhoods, Creek Road and the Landhi industrial direction.",
  },
  {
    id: "indus-hospital",
    name: "The Indus Hospital, Korangi",
    aliases: ["Indus Hospital", "Indus Hospital Korangi"],
    type: "hospital",
    districtId: "korangi",
    coordinates: [67.119, 24.823],
    nearbyCorridorId: "korangi-spine",
    plainMeaning:
      "A major hospital and bus-route anchor near Korangi Crossing.",
  },
  {
    id: "singer-chowrangi",
    name: "Singer Chowrangi",
    aliases: ["Indus Chowrangi", "Singer", "Murtaza Chowrangi side"],
    type: "junction",
    districtId: "korangi",
    coordinates: [67.159, 24.829],
    nearbyCorridorId: "korangi-spine",
    plainMeaning:
      "A major industrial Korangi/Landhi route milestone; route names vary between nearby industrial chowrangis.",
  },
  {
    id: "landhi",
    name: "Landhi",
    aliases: ["Landhi Town", "Landhi 89", "Landhi railway station"],
    type: "neighbourhood",
    districtId: "korangi",
    coordinates: [67.209, 24.84],
    nearbyCorridorId: "korangi-spine",
    plainMeaning:
      "A large south-eastern residential and industrial area; use its number, chowrangi or station for an exact destination.",
  },
  {
    id: "jinnah-airport",
    name: "Jinnah International Airport",
    aliases: ["Karachi Airport", "KHI", "Jinnah Terminal", "Airport"],
    type: "gateway",
    districtId: "malir",
    coordinates: [67.1686, 24.8992],
    nearbyCorridorId: "shahrah-e-faisal",
    plainMeaning:
      "Karachi's commercial airport and the eastern end of the Shahrah-e-Faisal mental spine.",
  },
  {
    id: "malir-halt",
    name: "Malir Halt",
    aliases: ["Malir Halt station", "Malir Halt stop"],
    type: "junction",
    districtId: "malir",
    coordinates: [67.177, 24.893],
    nearbyCorridorId: "national-highway",
    plainMeaning:
      "An airport-side railway/bus landmark before Malir 15 when travelling outward from central Karachi.",
  },
  {
    id: "malir-15",
    name: "Malir 15",
    aliases: ["Malir 15 stop", "Malir Fifteen", "Malir Kala Board side"],
    type: "junction",
    districtId: "malir",
    coordinates: [67.195, 24.883],
    nearbyCorridorId: "national-highway",
    plainMeaning:
      "The best-known built-up Malir market and transport junction; '15' is the stop/area name, not a district number.",
  },
  {
    id: "malir-cantt",
    name: "Malir Cantonment",
    aliases: ["Malir Cantt", "Cantt Bazar Malir", "CMH Malir"],
    type: "neighbourhood",
    districtId: "malir",
    coordinates: [67.205, 24.939],
    nearbyCorridorId: "university-road",
    plainMeaning:
      "A separately administered cantonment north of the airport; entry points and exact phases/checkposts matter.",
  },
  {
    id: "memon-goth",
    name: "Memon Goth",
    aliases: ["Memon Goth Malir", "Murad Memon side"],
    type: "neighbourhood",
    districtId: "malir",
    coordinates: [67.224, 24.922],
    nearbyCorridorId: "national-highway",
    plainMeaning:
      "An older settlement and route anchor in Malir's eastern interior, away from the main Airport–Malir 15 strip.",
  },
  {
    id: "ibrahim-hyderi",
    name: "Ibrahim Hyderi",
    aliases: ["Ibrahim Hydri", "Ibrahim Hyderi fishing village"],
    type: "coast",
    districtId: "malir",
    coordinates: [67.138, 24.792],
    nearbyCorridorId: "korangi-spine",
    plainMeaning:
      "A historic fishing settlement on the eastern creek coast; administratively in Malir district despite its Korangi-side approach.",
  },
  {
    id: "quaidabad",
    name: "Quaidabad",
    aliases: ["Quaidabad Chowk", "Manzil Pump side"],
    type: "junction",
    districtId: "malir",
    coordinates: [67.236, 24.851],
    nearbyCorridorId: "national-highway",
    plainMeaning:
      "The outer built-up National Highway junction before Steel Town and Port Qasim approaches.",
  },
  {
    id: "gulshan-e-hadeed",
    name: "Gulshan-e-Hadeed",
    aliases: ["Gulshan Hadeed", "Hadeed", "Steel Town side"],
    type: "neighbourhood",
    districtId: "malir",
    coordinates: [67.35, 24.867],
    nearbyCorridorId: "national-highway",
    plainMeaning:
      "A planned residential area on Karachi's far south-eastern industrial edge near Steel Town.",
  },
  {
    id: "port-qasim",
    name: "Port Qasim",
    aliases: ["Bin Qasim Port", "Port Muhammad Bin Qasim", "PQA"],
    type: "port",
    districtId: "malir",
    coordinates: [67.333, 24.776],
    nearbyCorridorId: "national-highway",
    plainMeaning:
      "Karachi's large eastern industrial port; it is separate from Karachi Port/Keamari in the west.",
  },
  {
    id: "bahria-town-karachi",
    name: "Bahria Town Karachi",
    aliases: ["Bahria Town", "BTK", "Bahria Karachi"],
    type: "neighbourhood",
    districtId: "malir",
    coordinates: [67.307, 25.014],
    nearbyCorridorId: "m9-motorway",
    plainMeaning:
      "A large gated development well outside the inner city on the M-9; allow intercity-scale travel time.",
  },
] as const satisfies readonly KarachiLandmark[];

export const landmarks = landmarkRecords.map((place) => ({
  ...place,
  coordinates: [place.coordinates[0], place.coordinates[1]] as [number, number],
  district:
    districts.find((district) => district.id === place.districtId)?.name ??
    place.districtId,
  nearbyCorridor:
    mainCorridors.find((corridor) => corridor.id === place.nearbyCorridorId)
      ?.name ?? place.nearbyCorridorId,
}));

export type SearchKind = "district" | "corridor" | "place";

export interface SearchIndexEntry {
  readonly id: string;
  readonly kind: SearchKind;
  readonly targetId: string;
  readonly label: string;
  readonly aliases: readonly string[];
  readonly districtId?: DistrictId;
  readonly coordinates: LngLat;
  readonly hint: string;
  /** Pre-normalised content for a tiny client-side includes/fuzzy matcher. */
  readonly searchText: string;
}

export function normaliseSearchTerm(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export const searchIndex: readonly SearchIndexEntry[] = [
  ...districts.map((district) => {
    const aliases = [
      district.familiarName,
      district.osmAlias,
      ...district.subdivisions,
      ...district.keyAreas,
    ];
    return {
      id: `district:${district.id}`,
      kind: "district" as const,
      targetId: district.id,
      label: district.officialName,
      aliases,
      districtId: district.id,
      coordinates: district.coordinates,
      hint: district.mentalModel,
      searchText: normaliseSearchTerm(
        [district.officialName, ...aliases].join(" "),
      ),
    };
  }),
  ...mainCorridors.map((corridor) => {
    const middle = corridor.path[Math.floor(corridor.path.length / 2)];
    return {
      id: `corridor:${corridor.id}`,
      kind: "corridor" as const,
      targetId: corridor.id,
      label: corridor.name,
      aliases: corridor.aliases,
      coordinates: middle,
      hint: corridor.explanation,
      searchText: normaliseSearchTerm(
        [corridor.name, ...corridor.aliases, ...corridor.routeChain].join(" "),
      ),
    };
  }),
  ...landmarks.map((place) => ({
    id: `place:${place.id}`,
    kind: "place" as const,
    targetId: place.id,
    label: place.name,
    aliases: place.aliases,
    districtId: place.districtId,
    coordinates: place.coordinates,
    hint: place.plainMeaning,
    searchText: normaliseSearchTerm(
      [place.name, ...place.aliases, place.plainMeaning].join(" "),
    ),
  })),
];

export type TransitCategory = "operating" | "developing";
export type TransitMode =
  | "brt"
  | "city-bus"
  | "women-focused-bus"
  | "electric-bus"
  | "urban-rail";

export interface TransitService extends Provenanced {
  readonly id:
    | "green"
    | "orange"
    | "peoples"
    | "pink"
    | "ev"
    | "red"
    | "yellow"
    | "kcr";
  readonly name: string;
  readonly aliases: readonly string[];
  readonly category: TransitCategory;
  readonly mode: TransitMode;
  readonly rideableNow: boolean;
  readonly color: `#${string}`;
  readonly routeSummary: string;
  readonly status: string;
  readonly caveat: string;
  readonly verifiedOn: IsoDate;
}

/**
 * "Operating" means an official current source lists a passenger service; it
 * is not a promise that every bus, station or trip is running at this moment.
 */
export const transitCategories = [
  {
    id: "green",
    name: "Green Line BRT",
    aliases: ["Green Bus", "Karachi Breeze Green Line"],
    category: "operating",
    mode: "brt",
    rideableNow: true,
    color: "#1D9A68",
    routeSummary: "Surjani Town ↔ Numaish, via North Karachi and Nazimabad",
    status:
      "Operational; Sindh's current route directory lists the BRT Green Line, and an official Sindh Assembly answer records the 21.5 km Green Line as operational.",
    caveat:
      "Station access, operating hours, fares and the exact last service can change—check the official route map before a time-critical trip.",
    verifiedOn: dataVerifiedOn,
    sourceIds: ["smta-current-route-map", "sindh-assembly-transit-status"],
  },
  {
    id: "orange",
    name: "Orange Line BRT",
    aliases: ["Orange Bus", "Abdul Sattar Edhi Line"],
    category: "operating",
    mode: "brt",
    rideableNow: true,
    color: "#F28B39",
    routeSummary: "Orangi Town Office ↔ Board Office; short feeder to Green Line",
    status:
      "Operational; the official current route map lists BRT Orange and an official Sindh Assembly answer records the 3.9 km line as operational.",
    caveat:
      "A separate newer SMTA project-description page calls Orange a planned addition, so confirm same-day service rather than relying on the description page alone.",
    verifiedOn: dataVerifiedOn,
    sourceIds: ["smta-current-route-map", "sindh-assembly-transit-status"],
  },
  {
    id: "peoples",
    name: "People's Bus Service",
    aliases: ["People's Bus", "Peoples Bus", "Red Bus", "PBS bus"],
    category: "operating",
    mode: "city-bus",
    rideableNow: true,
    color: "#D94C4C",
    routeSummary:
      "A route network rather than one line; the official directory currently marks R04, R08 and R11–R14 active, while R05–R07 are inactive.",
    status:
      "Operating route-by-route across residential, commercial and industrial Karachi.",
    caveat:
      "Never infer service from a route number alone. Use the official directory's active/inactive flag and current stop chain.",
    verifiedOn: dataVerifiedOn,
    sourceIds: ["smta-current-route-map"],
  },
  {
    id: "pink",
    name: "Pink Bus Service",
    aliases: ["Pink Bus", "Women Bus", "women's bus"],
    category: "operating",
    mode: "women-focused-bus",
    rideableNow: true,
    color: "#D95C9F",
    routeSummary:
      "Official directory lists active routes 01, 02, 03, 09 and 10, including Khokhrapar–Dockyard, North Karachi–Korangi and Gulshan-e-Hadeed–Tower links.",
    status: "Operating as a dedicated women-focused public bus service.",
    caveat:
      "Pink Bus is not the same thing as a future colour-coded BRT corridor. Check route number, eligibility and timings on the official map.",
    verifiedOn: dataVerifiedOn,
    sourceIds: ["smta-current-route-map"],
  },
  {
    id: "ev",
    name: "EV Bus Service",
    aliases: ["EV Bus", "Electric Bus", "People's EV Bus"],
    category: "operating",
    mode: "electric-bus",
    rideableNow: true,
    color: "#37A6A0",
    routeSummary:
      "Official directory lists EV-01 through EV-05 active, linking Malir Cantt, Bahria Town and DHA City with Clifton, Numaish, Ayesha Manzil and Sohrab Goth.",
    status: "Operating on named EV routes in the official provincial directory.",
    caveat:
      "EV is a vehicle/service category, not one continuous line. Choose an EV route number that serves both ends of the trip.",
    verifiedOn: dataVerifiedOn,
    sourceIds: ["smta-current-route-map"],
  },
  {
    id: "red",
    name: "Red Line BRT",
    aliases: ["Karachi BRT Red Line", "KBRT Red Line", "TransKarachi"],
    category: "developing",
    mode: "brt",
    rideableNow: false,
    color: "#D64545",
    routeSummary:
      "Planned 26.6 km Malir Halt ↔ Tower corridor via Malir Cantt, Safoora, University Road and Numaish.",
    status:
      "Active infrastructure project; ADB records the main civil-works lots under implementation, not an operating passenger line.",
    caveat:
      "Road construction along the alignment is not proof of bus service. No opening date is promised here; use another operating mode until an official passenger launch.",
    verifiedOn: dataVerifiedOn,
    sourceIds: ["transkarachi-red-line", "adb-red-line-project"],
  },
  {
    id: "yellow",
    name: "Yellow Line BRT",
    aliases: ["Karachi Mobility Project", "KMP Yellow Line", "Yellow Corridor"],
    category: "developing",
    mode: "brt",
    rideableNow: false,
    color: "#E5B933",
    routeSummary:
      "Planned 21 km Dawood Chowrangi ↔ Numaish corridor via Korangi 8000 Road, Jam Sadiq Bridge, Korangi Road, Shahrah-e-Faisal and Shahrah-e-Quaideen.",
    status:
      "Under implementation with World Bank financing; current procurement and works do not constitute passenger operation.",
    caveat:
      "Treat the line and its proposed stops as future infrastructure. Do not build today's journey around it until SMTA announces service.",
    verifiedOn: dataVerifiedOn,
    sourceIds: ["smta-yellow-line", "world-bank-yellow-line"],
  },
  {
    id: "kcr",
    name: "Karachi Circular Railway",
    aliases: ["KCR", "Circular Railway", "Karachi local train"],
    category: "developing",
    mode: "urban-rail",
    rideableNow: false,
    color: "#586B8C",
    routeSummary:
      "A proposed restoration of Karachi's historic circular/suburban rail system; the exact future operating pattern is not treated as settled here.",
    status:
      "Pakistan Railways and the Sindh government agreed in April 2026 to restore KCR and suburban services, but that agreement is not an operating timetable.",
    caveat:
      "Do not wait at an old KCR station expecting a regular urban service. Use Pakistan Railways only for a train that appears in its live timetable.",
    verifiedOn: dataVerifiedOn,
    sourceIds: ["radio-pakistan-kcr-2026"],
  },
] as const satisfies readonly TransitService[];

export interface StreetGlossaryEntry {
  readonly term: string;
  readonly alsoSeenAs: readonly string[];
  readonly meaning: string;
  readonly navigationUse: string;
  readonly caution?: string;
}

export const streetGlossary = [
  {
    term: "Chowrangi",
    alsoSeenAs: ["chorangi", "roundabout", "chowk"],
    meaning: "A major road junction, historically often a roundabout.",
    navigationUse:
      "Treat it as a transfer or milestone: NIPA, Nagan, Singer and Dawood Chowrangi are different route worlds.",
    caution:
      "The roundabout may have become a flyover or signal, but the old chowrangi name survives.",
  },
  {
    term: "Chowk",
    alsoSeenAs: ["square", "intersection"],
    meaning: "A junction, small square or concentrated market area.",
    navigationUse: "Useful as a local meeting point, for example Banaras Chowk.",
  },
  {
    term: "Mor",
    alsoSeenAs: ["more", "turn"],
    meaning: "A turn or branching junction.",
    navigationUse: "A route saying 'mor' usually changes direction there.",
  },
  {
    term: "Pul",
    alsoSeenAs: ["pull", "bridge"],
    meaning: "A bridge or flyover.",
    navigationUse: "Kala Pul and Jam Sadiq bridge are structural route anchors.",
  },
  {
    term: "Phatak",
    alsoSeenAs: ["railway crossing", "pathak"],
    meaning: "A level railway crossing/gate.",
    navigationUse:
      "It tells you a road crosses the railway; queues can make two nearby points feel far apart.",
  },
  {
    term: "Naka",
    alsoSeenAs: ["checkpost", "entry point"],
    meaning: "A checkpoint, controlled entrance or established stop.",
    navigationUse: "Ask which naka/checkpost number when entering a cantonment.",
  },
  {
    term: "Goth",
    alsoSeenAs: ["village", "settlement"],
    meaning: "A village or older settlement, often absorbed by the expanding city.",
    navigationUse:
      "Sohrab Goth, Safoora Goth and Memon Goth are unrelated places despite sharing the word.",
  },
  {
    term: "Nallah",
    alsoSeenAs: ["nullah", "nala", "drain"],
    meaning: "A natural or engineered storm-water/drainage channel.",
    navigationUse: "It can form a hard neighbourhood edge with only a few crossings.",
    caution: "Do not enter or cross a flooded nallah during rain.",
  },
  {
    term: "Shahrah",
    alsoSeenAs: ["shara", "avenue", "arterial"],
    meaning: "A major road or avenue.",
    navigationUse:
      "The second word matters: Shahrah-e-Faisal, Shahrah-e-Pakistan and Shahrah-e-Quaideen are separate roads.",
  },
  {
    term: "Khayaban",
    alsoSeenAs: ["avenue"],
    meaning: "An avenue; especially common in DHA street names.",
    navigationUse:
      "Pair it with the full name and DHA phase, such as Khayaban-e-Ittehad, Phase VI.",
  },
  {
    term: "Adda",
    alsoSeenAs: ["bus stand", "truck stand", "terminal"],
    meaning: "A transport stand, terminal or operating base.",
    navigationUse:
      "An adda may be informal and spread across several roadside pickup points.",
  },
  {
    term: "Cantt",
    alsoSeenAs: ["cantonment", "cantonment board"],
    meaning: "A federally governed military cantonment area.",
    navigationUse:
      "Karachi Cantt station and Malir Cantt are far apart; always use the complete name.",
    caution:
      "Cantonments can have controlled entries and their own civic administration.",
  },
  {
    term: "Block",
    alsoSeenAs: ["block number"],
    meaning: "A numbered or lettered sub-area, common in Gulshan, PECHS and North Nazimabad.",
    navigationUse: "A neighbourhood without its block is often too broad for pickup.",
  },
  {
    term: "Sector",
    alsoSeenAs: ["sector number"],
    meaning: "A planned sub-area, common in North Karachi, Orangi and industrial estates.",
    navigationUse: "Say the complete sector, including letters and hyphens.",
  },
  {
    term: "Phase",
    alsoSeenAs: ["DHA phase"],
    meaning: "A large development stage/zone, most famously in DHA.",
    navigationUse:
      "Phase + khayaban/street + landmark is a usable DHA address; 'Defence' alone is not.",
  },
  {
    term: "Scheme",
    alsoSeenAs: ["scheme number"],
    meaning: "A planning/development scheme number rather than one neighbourhood.",
    navigationUse:
      "Scheme 33 contains many societies and goths; ask for the society and gate too.",
  },
  {
    term: "Town",
    alsoSeenAs: ["town name"],
    meaning:
      "A familiar locality or a present/past local-government layer; it is not automatically a current district.",
    navigationUse:
      "Use it for broad orientation, then narrow to a sector, block, chowrangi or landmark.",
  },
  {
    term: "District",
    alsoSeenAs: ["zila", "administrative district"],
    meaning: "One of Karachi Division's seven large administrative units.",
    navigationUse:
      "Useful for understanding the city, but usually too large to give a driver as a destination.",
  },
  {
    term: "Tower",
    alsoSeenAs: ["Merewether Tower"],
    meaning: "In route speech, the old-city area around Merewether Clock Tower.",
    navigationUse: "It is the western anchor for M.A. Jinnah and Chundrigar roads.",
  },
  {
    term: "Numaish",
    alsoSeenAs: ["Exhibition", "Numaish Chowrangi"],
    meaning: "The Mazar-side junction and BRT/bus hub area.",
    navigationUse:
      "It is the meeting point of the old-city, northbound and University Road worlds.",
  },
  {
    term: "Guru Mandir",
    alsoSeenAs: ["Gurumandir"],
    meaning: "A junction/neighbourhood just north-east of Numaish.",
    navigationUse: "A common bus-route milestone on the way to Teen Hatti.",
  },
  {
    term: "Malir 15",
    alsoSeenAs: ["Malir Fifteen"],
    meaning: "A named market/bus-stop junction in built-up Malir.",
    navigationUse: "Use it as an N-5 milestone after Malir Halt.",
    caution: "The number does not mean District 15 or all of Malir.",
  },
  {
    term: "Do / Teen Talwar",
    alsoSeenAs: ["Two Swords", "Three Swords"],
    meaning: "Two separate Clifton monuments and junctions.",
    navigationUse: "Say Do Talwar or Teen Talwar clearly; they are close, not identical.",
  },
] as const satisfies readonly StreetGlossaryEntry[];

export interface JourneyStep {
  readonly label: string;
  readonly corridorId: CorridorId;
  readonly lesson: string;
}

export interface ExampleJourney {
  readonly id: string;
  readonly from: string;
  readonly to: string;
  readonly mentalRoute: string;
  readonly steps: readonly JourneyStep[];
  readonly transitHint: string;
  readonly watchFor: string;
  readonly takeaway: string;
}

/** Conceptual route lessons, not live navigation or a promise of a direct bus. */
const exampleJourneyRecords = [
  {
    id: "airport-to-saddar",
    from: "Jinnah International Airport",
    to: "Saddar",
    mentalRoute: "Airport → Shahrah-e-Faisal → Metropole → Saddar",
    steps: [
      {
        label: "Leave the airport onto the main city spine",
        corridorId: "shahrah-e-faisal",
        lesson:
          "Malir Halt/Natha Khan are outward-side markers; Karsaz, Nursery and FTC mean the centre is getting closer.",
      },
      {
        label: "Turn off around Metropole for the exact Saddar stop",
        corridorId: "ma-jinnah-road",
        lesson:
          "Saddar is a district of streets and markets, not a single pin—name Empress, Regal, Lucky Star or the hotel/office.",
      },
    ],
    transitHint:
      "Official Pink, EV and other bus routes use parts of the airport–centre spine, but eligibility and endpoints differ; match today's route chain before boarding.",
    watchFor:
      "Peak traffic, terminal pickup rules and the difference between Karachi Cantt station and the airport.",
    takeaway:
      "Shahrah-e-Faisal is the one-road explanation of how the airport connects to central Karachi.",
  },
  {
    id: "surjani-to-numaish",
    from: "Surjani Town",
    to: "Numaish / Mazar-e-Quaid",
    mentalRoute: "Surjani → north-central Karachi → Nazimabad → Numaish",
    steps: [
      {
        label: "Follow the north–centre axis inward",
        corridorId: "shahrah-e-pakistan",
        lesson:
          "Nagan, Ayesha Manzil, Liaquatabad and Teen Hatti are the descending milestones toward the inner city.",
      },
      {
        label: "Finish at the Numaish hub",
        corridorId: "ma-jinnah-road",
        lesson:
          "Numaish sits beside the Mazar and connects onward toward Tower or east toward University Road.",
      },
    ],
    transitHint:
      "The operating Green Line BRT is the clearest high-capacity version of this north–centre journey; confirm current station hours.",
    watchFor:
      "Green Line Numaish is the centre-side terminus; it does not itself continue to every Saddar or Tower destination.",
    takeaway:
      "Central Karachi is a north–south ladder whose useful rungs are named junctions.",
  },
  {
    id: "nipa-to-tower",
    from: "NIPA Chowrangi",
    to: "Tower",
    mentalRoute: "NIPA → University Road → Jail/Numaish → M.A. Jinnah Road → Tower",
    steps: [
      {
        label: "Travel inward on University Road",
        corridorId: "university-road",
        lesson:
          "Hasan Square and Jail Chowrangi show progress from East Karachi into the inner city.",
      },
      {
        label: "Cross the old-city axis from Numaish to Tower",
        corridorId: "ma-jinnah-road",
        lesson:
          "Tibet Centre and Jama Cloth are old-city milestones; Tower is the port-side end.",
      },
    ],
    transitHint:
      "Red Line is designed for this broad axis but is still developing. Use an operating bus route shown in the current directory or another live navigation option.",
    watchFor:
      "Construction diversions on University Road/M.A. Jinnah Road and confusion between a proposed BRT map and current service.",
    takeaway:
      "NIPA → Numaish → Tower is the simplest east-to-old-city chain to memorise.",
  },
  {
    id: "korangi-to-numaish",
    from: "Korangi Crossing",
    to: "Numaish",
    mentalRoute:
      "Korangi Crossing → Qayyumabad/Kala Pul → Shahrah-e-Faisal → Shahrah-e-Quaideen → Numaish",
    steps: [
      {
        label: "Move inward along the Korangi spine",
        corridorId: "korangi-spine",
        lesson:
          "Qayyumabad and Kala Pul are the bridge points between industrial Korangi and central Karachi.",
      },
      {
        label: "Use the centre-side cross connection",
        corridorId: "shahrah-e-faisal",
        lesson:
          "FTC/Nursery marks the point where the Korangi approach meets the main airport–centre spine.",
      },
    ],
    transitHint:
      "Several operating People's/Pink routes serve pieces of this movement. Yellow Line describes the future high-capacity version and is not rideable yet.",
    watchFor:
      "Korangi Crossing, Singer and Dawood are different points; verify which one a route actually reaches.",
    takeaway:
      "Korangi connects to the centre through a small set of river/road crossings, so those names control the trip.",
  },
  {
    id: "orangi-to-tower",
    from: "Orangi No. 5",
    to: "Tower",
    mentalRoute: "Orangi → Banaras/SITE edge → old-city western approach → Tower",
    steps: [
      {
        label: "Exit the north-west through a named pass",
        corridorId: "orangi-manghopir",
        lesson:
          "Banaras is the key hinge; Board Office and SITE are different onward directions.",
      },
      {
        label: "Approach the old core from the west",
        corridorId: "mauripur-hub-river",
        lesson:
          "Gulbai/ICI and Tower explain the freight-heavy western side of central Karachi.",
      },
    ],
    transitHint:
      "Orange Line is a short Orangi–Board Office feeder, not a direct train to Tower. The current bus directory must supply the onward route.",
    watchFor:
      "Hills, bridge bottlenecks and port traffic make straight-line distance misleading.",
    takeaway:
      "To understand West, first identify which pass—Banaras, Board Office, Manghopir or Hub River—the trip uses.",
  },
  {
    id: "port-to-port",
    from: "Port Qasim",
    to: "Karachi Port / Keamari",
    mentalRoute:
      "Port Qasim → N-5 through Malir → Shahrah-e-Faisal → old city → Keamari",
    steps: [
      {
        label: "Leave the far eastern port on the National Highway",
        corridorId: "national-highway",
        lesson:
          "Steel Town, Quaidabad, Malir 15 and Malir Halt count back toward the continuous city.",
      },
      {
        label: "Cross the metropolitan centre",
        corridorId: "shahrah-e-faisal",
        lesson:
          "The airport–centre spine carries you toward Saddar before the final old-city/harbour approach.",
      },
      {
        label: "Finish on the western harbour side",
        corridorId: "mauripur-hub-river",
        lesson:
          "Tower and Keamari belong to the western port system, many kilometres from Port Qasim.",
      },
    ],
    transitHint:
      "This is an urban-scale lesson, not a recommended single public-transport itinerary; freight corridors and transfers dominate.",
    watchFor:
      "'The port' is ambiguous. Say Karachi Port/Keamari or Port Qasim/Bin Qasim explicitly.",
    takeaway:
      "Karachi has two major port worlds at opposite ends of the built-up metropolis.",
  },
] as const satisfies readonly ExampleJourney[];

export const exampleJourneys = exampleJourneyRecords.map((journey) => ({
  ...journey,
  title: `${journey.from} → ${journey.to}`,
  detailedSteps: journey.steps,
  steps: journey.steps.map((step) => `${step.label} — ${step.lesson}`),
  note: journey.takeaway,
}));

export type EmergencyKind =
  | "all-hazards"
  | "police"
  | "fire"
  | "ambulance"
  | "gas-leak"
  | "women-support"
  | "child-protection"
  | "crime-support";

export interface EmergencyContact extends Provenanced {
  readonly id: string;
  readonly kind: EmergencyKind;
  readonly service: string;
  readonly number: string;
  readonly useFor: string;
  readonly operator: string;
  readonly note: string;
}

export const emergencies = [
  {
    id: "rescue-1122",
    kind: "all-hazards",
    service: "Sindh Emergency Rescue Service",
    number: "1122",
    useFor: "Medical emergency, road crash, rescue or an immediate life-safety incident.",
    operator: "Government of Sindh",
    note:
      "Lead with the emergency, then give the nearest named landmark, road, travel direction and a callback number.",
    sourceIds: ["sindh-emergency-contacts", "karachi-police-emergency-directory"],
  },
  {
    id: "police-15",
    kind: "police",
    service: "Madadgar Police",
    number: "15",
    useFor: "Crime in progress, threat, missing person or urgent police help.",
    operator: "Karachi Police / Sindh Police",
    note: "Available 24/7; preserve evidence and move to safety when possible.",
    sourceIds: ["sindh-emergency-contacts", "karachi-police-emergency-directory"],
  },
  {
    id: "fire-16",
    kind: "fire",
    service: "Fire Brigade",
    number: "16",
    useFor: "Fire, smoke, explosion risk or trapped people.",
    operator: "KMC Fire Department / city emergency system",
    note:
      "Call 1122 as well for rescue/medical needs; do not use lifts or re-enter a burning building.",
    sourceIds: ["sindh-emergency-contacts", "karachi-police-emergency-directory"],
  },
  {
    id: "edhi-115",
    kind: "ambulance",
    service: "Edhi Ambulance",
    number: "115",
    useFor: "Ambulance and welfare emergency support.",
    operator: "Edhi Foundation",
    note: "If the call does not connect, try 1122 or another ambulance service immediately.",
    sourceIds: ["sindh-emergency-contacts"],
  },
  {
    id: "chhipa-1020",
    kind: "ambulance",
    service: "Chhipa Ambulance",
    number: "1020",
    useFor: "Ambulance and emergency welfare response.",
    operator: "Chhipa Welfare Association",
    note: "If the call does not connect, try 1122 or Edhi 115 immediately.",
    sourceIds: ["sindh-emergency-contacts"],
  },
  {
    id: "ssgc-1199",
    kind: "gas-leak",
    service: "SSGC gas emergency",
    number: "1199",
    useFor: "Suspected natural-gas leak, damaged gas line or gas-supply emergency.",
    operator: "Sui Southern Gas Company",
    note:
      "Do not operate switches, light a flame or test with a match; leave the area, ventilate only if safe, and call from outside.",
    sourceIds: ["ssgc-contact"],
  },
  {
    id: "women-1094",
    kind: "women-support",
    service: "Women Development Department helpline",
    number: "1094",
    useFor: "Support and referral for women facing violence, harassment or crisis.",
    operator: "Government of Sindh",
    note: "For immediate physical danger, call Police 15 first.",
    sourceIds: ["sindh-emergency-contacts"],
  },
  {
    id: "child-1121",
    kind: "child-protection",
    service: "Sindh Child Protection Authority",
    number: "1121",
    useFor: "Child protection, abuse, neglect or a child at risk.",
    operator: "Government of Sindh",
    note: "For an abduction or immediate danger, also call Police 15.",
    sourceIds: ["sindh-emergency-contacts"],
  },
  {
    id: "cplc-1102",
    kind: "crime-support",
    service: "Citizens-Police Liaison Committee",
    number: "1102",
    useFor: "Crime support, stolen vehicle/mobile guidance and public-safety liaison.",
    operator: "CPLC",
    note: "It supplements, not replaces, an urgent Police 15 call.",
    sourceIds: ["karachi-police-emergency-directory"],
  },
] as const satisfies readonly EmergencyContact[];

export type UtilityKind =
  | "electricity"
  | "water-sewerage"
  | "gas"
  | "solid-waste"
  | "municipal"
  | "building-control";

export interface UtilitySystem extends Provenanced {
  readonly id: string;
  readonly kind: UtilityKind;
  readonly operator: string;
  readonly scope: string;
  readonly contact: string;
  readonly firstAction: string;
  readonly boundaryCaveat: string;
}

const utilitySystemRecords = [
  {
    id: "ke-electricity",
    kind: "electricity",
    operator: "K-Electric",
    scope: "Electricity distribution, supply faults, billing and new connections in its Karachi service territory.",
    contact: "118 or 021-99000; KE Live and official web channels",
    firstAction:
      "For a local outage or billing issue, keep the account number and exact premises address ready. Treat fallen wires as live and call from a safe distance.",
    boundaryCaveat:
      "Streetlights and municipal wiring may belong to a local body even when household supply belongs to K-Electric.",
    sourceIds: ["ke-customer-care"],
  },
  {
    id: "kwsc-water",
    kind: "water-sewerage",
    operator: "Karachi Water & Sewerage Corporation (KW&SC)",
    scope: "Bulk water, piped distribution, sewerage, billing, connections, complaints and official tanker booking.",
    contact: "021-111-597-200; official e-complaint and tanker portals",
    firstAction:
      "Record the consumer number, street, nearest landmark and whether the problem is supply, leakage, overflow or billing.",
    boundaryCaveat:
      "Apartment plumbing, private society lines and cantonment/local distribution can sit downstream of KW&SC's bulk system.",
    sourceIds: ["kwsc-contact"],
  },
  {
    id: "ssgc-gas",
    kind: "gas",
    operator: "Sui Southern Gas Company (SSGC)",
    scope: "Piped natural-gas distribution, supply, meter/billing and gas-line emergencies.",
    contact: "1199; 021-99021000",
    firstAction:
      "For a suspected leak, leave the area without making sparks and call 1199. For billing/supply, keep the customer number ready.",
    boundaryCaveat:
      "Internal building pipes and appliances remain a premises safety issue even when the network belongs to SSGC.",
    sourceIds: ["ssgc-contact"],
  },
  {
    id: "sswmb-waste",
    kind: "solid-waste",
    operator: "Sindh Solid Waste Management Board (SSWMB)",
    scope: "Municipal garbage collection and disposal through district operations and contractors.",
    contact: "021-99333702 or 0318-1030851; SSWMB complaint channels",
    firstAction:
      "Photograph the location safely and report the district, street, nearest landmark and type of waste.",
    boundaryCaveat:
      "Private societies, institutions, industrial waste and cantonments may use separate collection arrangements.",
    sourceIds: ["sswmb-contact"],
  },
  {
    id: "local-municipal",
    kind: "municipal",
    operator: "KMC, town municipal corporations and cantonment boards",
    scope: "Roads, parks, drains, streetlights, local encroachments and other civic services, divided by asset and jurisdiction.",
    contact: "Identify the governing local body from the exact address before filing.",
    firstAction:
      "Pin the issue, photograph it safely, note the road direction and ask whether the asset is KMC, town, provincial, cantonment or a private society responsibility.",
    boundaryCaveat:
      "Karachi does not have one agency for every road or drain; district boundaries do not automatically reveal asset ownership.",
    sourceIds: ["commissioner-karachi-area-map"],
  },
  {
    id: "sbca-buildings",
    kind: "building-control",
    operator: "Sindh Building Control Authority (SBCA)",
    scope: "Building-plan approvals, NOCs, public-sale projects, town-planning regulation and action on unauthorised construction.",
    contact: "021-99230329, 021-99231890 or 021-99231834; sbca.gos.pk",
    firstAction:
      "Verify a project's approval/NOC and licensed professionals before buying or building; retain the project address and approval identifiers.",
    boundaryCaveat:
      "Cantonments and some special jurisdictions may have their own approval authority; verify jurisdiction first.",
    sourceIds: ["sbca-official"],
  },
] as const satisfies readonly UtilitySystem[];

export const utilitySystems = utilitySystemRecords.map((system) => ({
  ...system,
  name: system.operator,
}));

export type SourceKind =
  | "official-data"
  | "official-map"
  | "official-service"
  | "project"
  | "news"
  | "open-map"
  | "image";

export interface CitationSource {
  readonly id: SourceId;
  readonly title: string;
  readonly publisher: string;
  readonly kind: SourceKind;
  readonly url: `https://${string}`;
  readonly usedFor: string;
  readonly accessedOn: IsoDate;
}

const sourceRecords = [
  {
    id: "pbs-census-2023-table-1",
    title:
      "Table 1: Area, population by sex, density, urban population and household size — Census 2023, Sindh",
    publisher: "Pakistan Bureau of Statistics",
    kind: "official-data",
    url: "https://www.pbs.gov.pk/sites/default/files/population/2023/tables/sindh/pcr/table_1.pdf",
    usedFor:
      "Karachi Division and seven-district area/population totals. These figures take precedence over conflicting secondary summaries.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "commissioner-karachi-area-map",
    title: "Karachi Division administrative area map and subdivisions",
    publisher: "Commissioner Karachi",
    kind: "official-data",
    url: "https://commissionerkarachi.gos.pk/area-map",
    usedFor:
      "Seven-district frame, 31 subdivisions and the beginner explanation of Karachi Division's administrative shape.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "commissioner-karachi-population",
    title: "Karachi population by district and subdivision",
    publisher: "Commissioner Karachi",
    kind: "official-data",
    url: "https://commissionerkarachi.gos.pk/population",
    usedFor:
      "Official familiar names and historical context. PBS Table 1 is used where this page's East/Malir totals conflict.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "openstreetmap-district-boundaries",
    title: "OpenStreetMap district boundary relations",
    publisher: "OpenStreetMap contributors",
    kind: "open-map",
    url: "https://www.openstreetmap.org/copyright",
    usedFor:
      "The local 2026-08-13 district GeoJSON geometry and revised OSM aliases: Nazimabad, Gulshan, Karachi and Orangi District.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "smta-current-route-map",
    title: "Karachi Bus Route Map and provincial route directory",
    publisher: "Sindh Mass Transit Authority",
    kind: "official-map",
    url: "https://smta.gos.pk/route-map",
    usedFor:
      "Current Green/Orange listings and active/inactive People's, Pink, EV and Double Decker route chains.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "smta-yellow-line",
    title: "Karachi Mobility Project (BRT Yellow Line)",
    publisher: "Sindh Mass Transit Authority",
    kind: "project",
    url: "https://smta.sindh.gov.pk/karachi-mobility-project-brt-yellow-line",
    usedFor:
      "Yellow Line's 21 km Dawood Chowrangi–Numaish alignment and developing-project status.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "transkarachi-red-line",
    title: "Karachi BRT Red Line route",
    publisher: "TransKarachi",
    kind: "project",
    url: "https://transkarachi.pk/routes/",
    usedFor:
      "The planned 26.6 km Malir Halt–Tower route, major stops and separation of main/common corridors.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "adb-red-line-project",
    title: "Pakistan: Karachi Bus Rapid Transit Red Line Project (47279-002)",
    publisher: "Asian Development Bank",
    kind: "project",
    url: "https://www.adb.org/projects/47279-002/main",
    usedFor:
      "Confirmation that Red Line is an active project whose main civil works remain under implementation, not a passenger service.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "world-bank-yellow-line",
    title: "Karachi infrastructure and institutions modernization underway",
    publisher: "World Bank",
    kind: "project",
    url: "https://www.worldbank.org/en/news/press-release/2019/06/27/karachi-infrastructure-and-institutions-modernization-gets-underway",
    usedFor:
      "The Yellow Corridor's Dawood Chowrangi–Korangi industrial area–Numaish purpose and 21 km length.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "sindh-assembly-transit-status",
    title: "Provincial Assembly answer on Karachi mass-transit projects",
    publisher: "Provincial Assembly of Sindh",
    kind: "official-data",
    url: "https://www.pas.gov.pk/business/questios-details/33/1830",
    usedFor:
      "Official statement that the 21.5 km Green and 3.9 km Orange lines are operational, while Red and Yellow are in execution/construction phases.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "radio-pakistan-kcr-2026",
    title: "Pakistan Railways, Sindh government agree to restore Karachi Circular Railway",
    publisher: "Radio Pakistan",
    kind: "news",
    url: "https://radio.gov.pk/22-04-2026/pakistan-railways-sindh-govt-agree-to-restore-karachi-circular-railway",
    usedFor:
      "The 22 April 2026 restoration agreement and the caution that an agreement is not a live timetable.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "sindh-emergency-contacts",
    title: "Emergency contacts",
    publisher: "Government of Sindh",
    kind: "official-service",
    url: "https://www.sindh.gov.pk/emergency-contacts",
    usedFor:
      "Police, Edhi, Chhipa, women and child-protection helplines; cross-checked with current service pages.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "karachi-police-emergency-directory",
    title: "Emergency contact directory",
    publisher: "Karachi Police",
    kind: "official-service",
    url: "https://karachipolice.gov.pk/services/emergency-contact-directory/",
    usedFor:
      "Madadgar 15, Rescue 1122, Fire 16, K-Electric 118 and CPLC 1102.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "ke-customer-care",
    title: "K-Electric customer contact information",
    publisher: "K-Electric",
    kind: "official-service",
    url: "https://ke.com.pk/wp-content/uploads/2025/07/NC-Application-Form.pdf",
    usedFor: "Customer-care numbers 118 and 99000 and official support guidance.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "kwsc-contact",
    title: "Contact Karachi Water & Sewerage Corporation",
    publisher: "Karachi Water & Sewerage Corporation",
    kind: "official-service",
    url: "https://www.kwsc.gos.pk/contact",
    usedFor:
      "KW&SC's scope, 021-111-597-200 helpline and official complaint/tanker channels.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "ssgc-contact",
    title: "SSGC contact and emergency information",
    publisher: "Sui Southern Gas Company",
    kind: "official-service",
    url: "https://www.ssgc.com.pk/web/?page_id=98",
    usedFor: "Gas network contacts and 1199 emergency/leak helpline.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "sswmb-contact",
    title: "Contact Sindh Solid Waste Management Board",
    publisher: "Sindh Solid Waste Management Board",
    kind: "official-service",
    url: "https://sswmb.gos.pk/contact-us/",
    usedFor: "Solid-waste mandate and current Karachi complaint numbers.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "sbca-official",
    title: "Sindh Building Control Authority",
    publisher: "Sindh Building Control Authority",
    kind: "official-service",
    url: "https://www.sbca.gos.pk/",
    usedFor: "Building-control scope, approval/NOC guidance and public contact numbers.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "commons-clifton-skyline",
    title: "File: Karachi Clifton Skyline.JPG",
    publisher: "Wikimedia Commons",
    kind: "image",
    url: "https://commons.wikimedia.org/wiki/File:Karachi_Clifton_Skyline.JPG",
    usedFor: "Clifton skyline photo attribution and CC BY-SA 4.0 licence.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "commons-empress-market",
    title: "File: Empress Market, Karachi.jpg",
    publisher: "Wikimedia Commons",
    kind: "image",
    url: "https://commons.wikimedia.org/wiki/File:Empress_Market,_Karachi.jpg",
    usedFor: "Empress Market photo attribution and CC BY-SA 4.0 licence.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "commons-mazar-e-quaid",
    title: "File: Mausoleum of the quaid e azam muhammad ali jinnah farrah 1.jpg",
    publisher: "Wikimedia Commons",
    kind: "image",
    url: "https://commons.wikimedia.org/wiki/File:Mausoleum_of_the_quaid_e_azam_muhammad_ali_jinnah_farrah_1.jpg",
    usedFor: "Mazar-e-Quaid photo attribution and CC BY-SA 4.0 licence.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "commons-karachi-seaport",
    title: "File: Karachi Seaport.jpg",
    publisher: "Wikimedia Commons",
    kind: "image",
    url: "https://commons.wikimedia.org/wiki/File:Karachi_Seaport.jpg",
    usedFor: "Karachi Port photo attribution and CC BY-SA 4.0 licence.",
    accessedOn: dataVerifiedOn,
  },
  {
    id: "commons-jinnah-airport",
    title: "File: Karachi Jinnah Airport.jpg",
    publisher: "Wikimedia Commons",
    kind: "image",
    url: "https://commons.wikimedia.org/wiki/File:Karachi_Jinnah_Airport.jpg",
    usedFor: "Jinnah airport photo attribution and author-released public-domain status.",
    accessedOn: dataVerifiedOn,
  },
] as const satisfies readonly CitationSource[];

export const sources = sourceRecords.map((source) => ({
  ...source,
  label: source.title,
}));

export type PhotoLicence = "CC BY-SA 4.0" | "Public domain";

export interface PhotoManifestEntry {
  readonly id: string;
  readonly src: `/photos/${string}`;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly caption: string;
  readonly districtId: DistrictId;
  readonly placeId: string;
  readonly creator: string;
  readonly creatorUrl: `https://${string}`;
  readonly licence: PhotoLicence;
  readonly licenceUrl: `https://${string}`;
  readonly sourceId: SourceId;
  readonly sourceUrl: `https://${string}`;
  readonly derivativeNote: string;
  readonly objectPosition: `${number}% ${number}%`;
}

const photoRecords = [
  {
    id: "clifton-skyline",
    src: "/photos/clifton-skyline.jpg",
    width: 1280,
    height: 567,
    alt: "Clifton's apartment skyline beside the Arabian Sea in Karachi",
    caption: "Clifton: Karachi's dense coastal face, looking toward the Arabian Sea.",
    districtId: "south",
    placeId: "sea-view",
    creator: "Ahmad Haq (Ahmadtamiz)",
    creatorUrl: "https://commons.wikimedia.org/wiki/User:Ahmadtamiz",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceId: "commons-clifton-skyline",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Karachi_Clifton_Skyline.JPG",
    derivativeNote: "Resized from the Wikimedia Commons original; no new endorsement implied.",
    objectPosition: "50% 52%",
  },
  {
    id: "empress-market",
    src: "/photos/empress-market.jpg",
    width: 1280,
    height: 838,
    alt: "The historic Empress Market building in Saddar, Karachi",
    caption: "Empress Market: a visual key to Saddar and the old commercial centre.",
    districtId: "south",
    placeId: "empress-market",
    creator: "Furqanlw",
    creatorUrl: "https://commons.wikimedia.org/wiki/User:Furqanlw",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceId: "commons-empress-market",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Empress_Market,_Karachi.jpg",
    derivativeNote: "Resized from the Wikimedia Commons original; no new endorsement implied.",
    objectPosition: "50% 48%",
  },
  {
    id: "mazar-e-quaid",
    src: "/photos/mazar-e-quaid.jpg",
    width: 1280,
    height: 960,
    alt: "Mazar-e-Quaid, Muhammad Ali Jinnah's white marble mausoleum, seen from its garden",
    caption: "Mazar-e-Quaid: the central landmark beside Numaish and Jamshed Quarters.",
    districtId: "east",
    placeId: "mazar-e-quaid",
    creator: "Farrah Zakir (Farrah0001)",
    creatorUrl: "https://commons.wikimedia.org/wiki/User:Farrah0001",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceId: "commons-mazar-e-quaid",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mausoleum_of_the_quaid_e_azam_muhammad_ali_jinnah_farrah_1.jpg",
    derivativeNote: "Resized from the Wikimedia Commons original; no new endorsement implied.",
    objectPosition: "50% 50%",
  },
  {
    id: "karachi-port",
    src: "/photos/karachi-port.jpg",
    width: 1280,
    height: 961,
    alt: "Ships, cranes and harbour water at the Port of Karachi",
    caption: "Karachi Port: the western harbour that shaped the old city and Keamari.",
    districtId: "keamari",
    placeId: "karachi-port",
    creator: "King Eliot",
    creatorUrl: "https://commons.wikimedia.org/wiki/User:King_Eliot",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceId: "commons-karachi-seaport",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Karachi_Seaport.jpg",
    derivativeNote: "Resized from the Wikimedia Commons original; no new endorsement implied.",
    objectPosition: "50% 50%",
  },
  {
    id: "jinnah-airport",
    src: "/photos/jinnah-airport.jpg",
    width: 1280,
    height: 793,
    alt: "The Jinnah Terminal building at Karachi's international airport",
    caption: "Jinnah International Airport: the eastern gateway and start of the Shahrah-e-Faisal spine.",
    districtId: "malir",
    placeId: "jinnah-airport",
    creator: "Swerveut",
    creatorUrl: "https://en.wikipedia.org/wiki/User:Swerveut",
    licence: "Public domain",
    licenceUrl: "https://commons.wikimedia.org/wiki/File:Karachi_Jinnah_Airport.jpg#Licensing",
    sourceId: "commons-jinnah-airport",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Karachi_Jinnah_Airport.jpg",
    derivativeNote: "Resized from the author-released public-domain original.",
    objectPosition: "50% 54%",
  },
] as const satisfies readonly PhotoManifestEntry[];

export const photoManifest = photoRecords.map((photo) => ({
  ...photo,
  localFile: photo.src.replace("/photos/", ""),
  sourcePage: photo.sourceUrl,
  license: photo.licence,
}));

export const sourcesById: Readonly<Record<SourceId, CitationSource>> =
  Object.fromEntries(
    sources.map((source) => [source.id, source]),
  ) as unknown as Record<SourceId, CitationSource>;

export const districtsById: Readonly<Record<DistrictId, KarachiDistrict>> =
  Object.fromEntries(
    districts.map((district) => [district.id, district]),
  ) as unknown as Record<DistrictId, KarachiDistrict>;

export const corridorsById: Readonly<Record<CorridorId, MainCorridor>> =
  Object.fromEntries(
    mainCorridors.map((corridor) => [corridor.id, corridor]),
  ) as unknown as Record<CorridorId, MainCorridor>;
