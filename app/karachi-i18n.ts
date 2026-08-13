import type {
  CorridorId,
  DistrictId,
  LandmarkId,
  TransitService,
} from "./karachi-data";

/** Roman Urdu is intentionally the default: most first-time local readers can
 * understand it without switching keyboard/script. Place and official road
 * names stay unchanged so they still match signs, map search and spoken routes.
 */
export type Locale = "ur-roman" | "en";

export const DEFAULT_LOCALE: Locale = "ur-roman";

export type LocalizedText = Readonly<Record<Locale, string>>;

const localized = (romanUrdu: string, english: string): LocalizedText => ({
  "ur-roman": romanUrdu,
  en: english,
});

export type DistrictProfilePresentation = {
  readonly districtId: DistrictId;
  readonly position: LocalizedText;
  readonly firstRule: LocalizedText;
  readonly caution: LocalizedText;
  readonly zones: readonly { readonly id: string; readonly explanation: LocalizedText }[];
  readonly routes: readonly { readonly id: string; readonly title: LocalizedText; readonly purpose: LocalizedText }[];
};

export const districtAtlasCopy = {
  "ur-roman": {
    atlas: "District atlas",
    title: "Har district ko alag samjhein",
    intro: "Position, zones, bari roads aur pehchan points. Exact turn aur current traffic ke liye live map alag check karein.",
    open: "District kholein",
    back: "Karachi overview",
    crossing: "Karachi crossing guide",
    crossingOpen: "Guide kholein",
    position: "Karachi mein position",
    firstRule: "Pehla rule",
    arrivals: "Aam entry names",
    zones: "Is district ke route worlds",
    routes: "Road chains",
    routeHint: "Yeh selected learning chains hain, har road/area ki complete list nahi. Names isi order mein parhein; line schematic hai, turn-by-turn route nahi.",
    routeSources: "Is chain ke references",
    areas: "Areas aur anchors",
    adjacent: "Agla district samjhein",
    neighbours: "Agay samajhne wale connected districts",
    boundaryNote: "Yeh learning connections hain; legal boundary ya direct road claim nahi.",
    map: "District map",
    mapHint: "Map par district, road ya landmark select karke detail parhein.",
    subdivisions: "Official subdivisions",
    subdivisionNote: "Commissioner pages kuch spellings/names par mukhtalif hain: North/New Nazimabad aur Keamari/Harbour, Mauripur/Maripur. Neeche current familiar form dikhayi gayi hai.",
    scale: "District scale",
    population: "Census 2023 population",
    populationConflict: "PBS Table 1 ko primary mana gaya hai. Commissioner page East aur Malir ke liye mukhtalif 2023 totals dikhata hai.",
    anchor: "Primary anchor",
    corridor: "Primary corridor",
    caution: "Naam ka confusion",
    sources: "References",
    reviewed: "Source snapshot 14 August 2026",
    developing: "Developing—not current passenger service",
    orientation: "Orientation chain",
    previous: "Pichla district",
    next: "Agla district",
    sourceOpen: "Source nayi tab mein khulta hai",
    beforeYouRide: "Nikalne se pehle",
    rideRules: [
      "Yeh orientation guide hai; exact turn ke liye live map use karein.",
      "Traffic, road closure, mausam aur service status safar ke din check karein.",
      "Bike ko motorway par na le jayein. Agar confusion ho to roshni wali safe jagah ruk kar anchor + road + last-mile confirm karein.",
    ],
  },
  en: {
    atlas: "District atlas",
    title: "Understand every district separately",
    intro: "Position, zones, major roads, and recognition points. Check a live map separately for exact turns and current traffic.",
    open: "Open district",
    back: "Karachi overview",
    crossing: "Karachi crossing guide",
    crossingOpen: "Open guide",
    position: "Position in Karachi",
    firstRule: "First rule",
    arrivals: "Common entry names",
    zones: "Route worlds inside this district",
    routes: "Road chains",
    routeHint: "These are selected learning chains, not a complete list of every road or area. Read the names in this order; the line is schematic, not turn-by-turn navigation.",
    routeSources: "References for this chain",
    areas: "Areas and anchors",
    adjacent: "Understand the next district",
    neighbours: "Connected districts to learn next",
    boundaryNote: "These are learning connections, not a legal boundary or direct-road claim.",
    map: "District map",
    mapHint: "Select a district, road, or landmark on the map to read its detail.",
    subdivisions: "Official subdivisions",
    subdivisionNote: "Commissioner pages differ on some spellings/names: North/New Nazimabad and Keamari/Harbour, Mauripur/Maripur. The current familiar form is shown below.",
    scale: "District scale",
    population: "Census 2023 population",
    populationConflict: "PBS Table 1 is treated as primary. The Commissioner page shows different 2023 totals for East and Malir.",
    anchor: "Primary anchor",
    corridor: "Primary corridor",
    caution: "Name confusion",
    sources: "References",
    reviewed: "Source snapshot 14 August 2026",
    developing: "Developing—not current passenger service",
    orientation: "Orientation chain",
    previous: "Previous district",
    next: "Next district",
    sourceOpen: "Source opens in a new tab",
    beforeYouRide: "Before you ride",
    rideRules: [
      "This is an orientation guide; use a live map for exact turns.",
      "Check traffic, closures, weather, and service status on the day of travel.",
      "Do not take a motorcycle onto a motorway. If confused, stop in a safe, well-lit place and confirm anchor + road + last mile.",
    ],
  },
} as const satisfies Record<Locale, object>;

export const districtProfilePresentation = [
  {
    districtId: "south",
    position: localized("Samandar ke saath inner south: old city, Saddar aur Clifton.", "The inner south beside the sea: old city, Saddar, and Clifton."),
    firstRule: localized("Saddar, Tower aur Clifton teen alag route worlds hain; sirf ‘South’ destination nahi.", "Saddar, Tower, and Clifton are three different route worlds; ‘South’ alone is not a destination."),
    caution: localized("Clifton aur DHA aam location names hain, lekin cantonment aur district administration alag systems hain.", "Clifton and DHA are familiar location names, but cantonment and district administration overlap as separate systems."),
    zones: [
      { id: "old-city-tower", explanation: localized("M.A. Jinnah Road, I.I. Chundrigar Road, markets aur Karachi Port approach.", "M.A. Jinnah Road, I.I. Chundrigar Road, markets, and the Karachi Port approach.") },
      { id: "saddar-civil-lines", explanation: localized("Empress Market, Cantt Station, Metropole aur major hospitals.", "Empress Market, Cantt Station, Metropole, and major hospitals.") },
      { id: "clifton-dha", explanation: localized("Teen Talwar, Do Talwar, Sea View aur phase/khayaban address system.", "Teen Talwar, Do Talwar, Sea View, and the phase/khayaban address system.") },
    ],
    routes: [
      { id: "south-old-core", title: localized("Old city east–west", "Old-city east–west"), purpose: localized("Numaish ko Tower se jorta hai.", "Connects Numaish with Tower.") },
      { id: "south-centre", title: localized("Airport spine ka centre end", "Centre end of the airport spine"), purpose: localized("Airport side se Saddar aur old core ka handoff.", "The handoff from the airport side into Saddar and the old core.") },
      { id: "south-coast", title: localized("Clifton coastal chain", "Clifton coastal chain"), purpose: localized("Central south se seafront aur DHA side.", "From the inner south toward the seafront and DHA.") },
    ],
  },
  {
    districtId: "keamari",
    position: localized("South-west harbour se Hub River aur western beaches tak.", "From the southwest harbour to Hub River and the western beaches."),
    firstRule: localized("Keamari locality, Keamari district aur Karachi Port ek scale nahi.", "Keamari locality, Keamari district, and Karachi Port are not the same scale."),
    caution: localized("Keamari se district, harbour-side locality ya port area murad ho sakta hai; exact jagah poochein.", "Keamari can mean the district, the harbour-side neighbourhood, or the port area; ask which one is meant."),
    zones: [
      { id: "harbour-keamari", explanation: localized("Port, docks, Jackson aur old-city ka western end.", "The port, docks, Jackson, and the western end of the old city.") },
      { id: "site-baldia", explanation: localized("Industrial aur dense residential belt, Gulbai aur Hub River approaches ke darmiyan.", "An industrial and dense residential belt between Gulbai and the Hub River approaches.") },
      { id: "mauripur-coast", explanation: localized("Truck route, Hawks Bay, Sandspit aur Manora side.", "The truck route and the Hawks Bay, Sandspit, and Manora side.") },
    ],
    routes: [
      { id: "keamari-hub", title: localized("Hub River se old core", "Hub River to the old core"), purpose: localized("Balochistan-side entry ko Tower se jorne wali western chain.", "The western chain connecting the Balochistan-side entry to Tower.") },
      { id: "keamari-coast", title: localized("Western coast se Tower", "Western coast to Tower"), purpose: localized("Hawks Bay aur Mauripur ko old core se jorta hai.", "Connects Hawks Bay and Mauripur with the old core.") },
      { id: "keamari-port", title: localized("Tower se harbour", "Tower to the harbour"), purpose: localized("Old city se Keamari locality ka short western handoff.", "The short western handoff from the old city to Keamari locality.") },
    ],
  },
  {
    districtId: "west",
    position: localized("Hilly north-west: Orangi, Mominabad aur Manghopir.", "The hilly northwest: Orangi, Mominabad, and Manghopir."),
    firstRule: localized("Orangi, North Karachi aur North Nazimabad alag jagahen hain; exact sector/chowk poochein.", "Orangi, North Karachi, and North Nazimabad are different places; ask for the exact sector or chowk."),
    caution: localized("Keamari alag district banne ke baad West ki boundaries badli thin; purane addresses mein former Karachi West mil sakta hai.", "West and Keamari were redrawn when Keamari became a separate district; older addresses may use the former Karachi West."),
    zones: [
      { id: "orangi-mominabad", explanation: localized("Dense sectors jo Banaras aur Board Office-side passes use karte hain.", "Dense sectors using the Banaras and Board Office-side passes.") },
      { id: "manghopir", explanation: localized("Hills, shrine/industrial landscape aur Northern Bypass side.", "Hills, the shrine/industrial landscape, and the Northern Bypass side.") },
      { id: "maymar-surjani-edge", explanation: localized("Northern edge jahan M-9-side approaches aur Central ki grid milti hai.", "The northern edge where M-9-side approaches meet Central's grid.") },
    ],
    routes: [
      { id: "west-orangi", title: localized("Orangi feeder chain", "Orangi feeder chain"), purpose: localized("Orangi ko Board Office/Green Line handoff se jorta hai.", "Connects Orangi to the Board Office/Green Line handoff.") },
      { id: "west-maymar", title: localized("Maymar se inner city", "Maymar to the inner city"), purpose: localized("Northern edge ko Sohrab Goth aur centre se jorne wali pehchan chain.", "The recognition chain connecting the northern edge with Sohrab Goth and the centre.") },
      { id: "west-banara", title: localized("Banaras–SITE approach", "Banaras–SITE approach"), purpose: localized("Orangi ke south side se industrial west aur old core ka mental connection.", "The mental connection from south Orangi into the industrial west and old core.") },
    ],
  },
  {
    districtId: "central",
    position: localized("Compact middle-north: Liaquatabad se New Karachi tak.", "The compact middle-north: from Liaquatabad to New Karachi."),
    firstRule: localized("Yeh north–south ladder hai; chowrangi order distance se zyada useful hai.", "This is a north–south ladder; junction order is more useful than straight-line distance."),
    caution: localized("North Karachi, New Karachi aur North Nazimabad milte-julte names hain lekin alag areas hain.", "North Karachi, New Karachi, and North Nazimabad sound similar but are distinct areas."),
    zones: [
      { id: "liaquatabad-nazimabad", explanation: localized("Inner-city ke qareeb dense grid aur Shahrah-e-Pakistan rungs.", "A dense grid near the inner city and the rungs of Shahrah-e-Pakistan.") },
      { id: "north-nazimabad-gulberg", explanation: localized("Board Office, Five Star, Ayesha Manzil aur Water Pump anchors.", "Board Office, Five Star, Ayesha Manzil, and Water Pump anchors.") },
      { id: "new-karachi", explanation: localized("Nagan, Power House aur Surjani/Green Line side ka northern grid.", "The northern grid around Nagan, Power House, and the Surjani/Green Line side.") },
    ],
    routes: [
      { id: "central-main", title: localized("North–centre spine", "North–centre spine"), purpose: localized("Northern Karachi ko Numaish aur old centre ki direction deta hai.", "Gives northern Karachi its direction toward Numaish and the old centre.") },
      { id: "central-cross", title: localized("Central cross-chain", "Central cross-chain"), purpose: localized("North Karachi se Nazimabad aur East-side connection samjhata hai.", "Explains the connection from North Karachi through Nazimabad toward the east side.") },
      { id: "central-green", title: localized("Green Line axis", "Green Line axis"), purpose: localized("Surjani se Numaish tak current high-capacity north–centre structure.", "The current high-capacity north–centre structure from Surjani to Numaish.") },
    ],
  },
  {
    districtId: "east",
    position: localized("Inner centre ke east: Gulshan, Johar, universities aur M-9 gateway.", "East of the inner centre: Gulshan, Johar, universities, and the M-9 gateway."),
    firstRule: localized("Gulshan/Johar bohat broad hain; block, road ya landmark lazmi add karein.", "Gulshan and Johar are very broad; always add a block, road, or landmark."),
    caution: localized("Gulshan, Johar aur Scheme 33 broad labels hain; address ke saath block, road ya qareebi landmark chahiye.", "Gulshan, Johar, and Scheme 33 are broad labels; an address still needs its block, road, or nearby landmark."),
    zones: [
      { id: "jamshed-ferozabad", explanation: localized("Mazar, Numaish, Bahadurabad aur Shahrah-e-Faisal ke qareeb inner east.", "The inner east near Mazar, Numaish, Bahadurabad, and Shahrah-e-Faisal.") },
      { id: "gulshan-e-iqbal", explanation: localized("Hasan Square, Civic Centre, NIPA aur universities.", "Hasan Square, Civic Centre, NIPA, and the universities.") },
      { id: "johar-gulzar-e-hijri", explanation: localized("Johar, Safoora, Scheme 33 aur Sohrab Goth-side expansion.", "Johar, Safoora, Scheme 33, and expansion toward Sohrab Goth.") },
    ],
    routes: [
      { id: "east-university", title: localized("University Road", "University Road"), purpose: localized("Inner city ko NIPA, universities aur Safoora se jorti hai.", "Connects the inner city with NIPA, the universities, and Safoora.") },
      { id: "east-diagonal", title: localized("Rashid Minhas diagonal", "Rashid Minhas diagonal"), purpose: localized("Airport/Drigh side ko NIPA aur north-central Karachi se milata hai.", "Links the airport/Drigh side with NIPA and north-central Karachi.") },
      { id: "east-safoora", title: localized("Safoora se Numaish", "Safoora to Numaish"), purpose: localized("Johar ke hospital/university belt ko inner centre se jorta hai.", "Connects Johar's hospital/university belt with the inner centre.") },
    ],
  },
  {
    districtId: "korangi",
    position: localized("South-east residential/industrial belt, Malir River ke south aur airport approach ke paas.", "The southeast residential/industrial belt, south of the Malir River and near the airport approach."),
    firstRule: localized("Korangi Crossing, Korangi 5, Singer aur Dawood alag milestones hain.", "Korangi Crossing, Korangi 5, Singer, and Dawood are different milestones."),
    caution: localized("Korangi district, Korangi area se bara hai; Landhi, Shah Faisal aur Model Colony bhi isi district mein hain.", "Korangi District is wider than Korangi neighbourhood; Landhi, Shah Faisal, and Model Colony are in the same district."),
    zones: [
      { id: "shah-faisal-model-colony", explanation: localized("Airport-side northern edge; administration Korangi district ki hai.", "The airport-side northern edge; administratively it belongs to Korangi District.") },
      { id: "korangi", explanation: localized("Crossing, Korangi sectors aur industrial area ka central belt.", "The central belt around the Crossing, Korangi sectors, and the industrial area.") },
      { id: "landhi", explanation: localized("Singer, Dawood, 89 Chowrangi aur Quaidabad-side connection.", "Singer, Dawood, 89 Chowrangi, and the Quaidabad-side connection.") },
    ],
    routes: [
      { id: "korangi-centre", title: localized("Korangi se centre", "Korangi to the centre"), purpose: localized("Industrial/residential belt ko Shahrah-e-Faisal aur Numaish side se jorta hai.", "Connects the industrial/residential belt with Shahrah-e-Faisal and the Numaish side.") },
      { id: "korangi-north", title: localized("North Karachi se Korangi", "North Karachi to Korangi"), purpose: localized("NIPA/Johar ke zariye northern grid aur Korangi ko milata hai.", "Links the northern grid and Korangi through NIPA/Johar.") },
      { id: "korangi-yellow", title: localized("Yellow Line future corridor", "Future Yellow Line corridor"), purpose: localized("Dawood se Numaish planned high-capacity connection; abhi rideable nahi.", "The planned high-capacity connection from Dawood to Numaish; it is not rideable yet.") },
    ],
  },
  {
    districtId: "malir",
    position: localized("Bohat bara east/north-east envelope: airport se Port Qasim aur M-9 edge tak.", "The vast east/northeast envelope: from the airport to Port Qasim and the M-9 edge."),
    firstRule: localized("‘Malir’ sun kar poochein: Malir 15/Halt, Cantt, district ya rural edge? Faaslay bohat mukhtalif hain.", "When you hear ‘Malir,’ ask: Malir 15/Halt, Cantt, the district, or the rural edge? The distances are radically different."),
    caution: localized("Route ki baat mein ‘Malir’ aksar Malir 15/Halt side hota hai, poora bohat bara district nahi.", "In route conversations, ‘Malir’ usually means the built-up Malir 15/Halt side, not the whole much larger district."),
    zones: [
      { id: "airport-built-up-malir", explanation: localized("Terminal, Malir Halt, Malir 15 aur Cantt-side gates.", "The terminal, Malir Halt, Malir 15, and the Cantt-side gates.") },
      { id: "gadap-m9-edge", explanation: localized("Safoora ke bahar villages, new housing, Toll Plaza aur Bahria/DHA City side.", "Villages and new housing beyond Safoora, plus Toll Plaza and the Bahria/DHA City side.") },
      { id: "bin-qasim-eastern-coast", explanation: localized("Quaidabad se Steel Town, Port Qasim aur Ibrahim Hydri coast tak.", "From Quaidabad to Steel Town, Port Qasim, and the Ibrahim Hydri coast.") },
    ],
    routes: [
      { id: "malir-n5", title: localized("N-5 built-up Malir", "N-5 through built-up Malir"), purpose: localized("Airport approach se Thatta/Port Qasim direction ka south-eastern spine.", "The southeastern spine from the airport approach toward Thatta and Port Qasim.") },
      { id: "malir-m9", title: localized("M-9 north-east gateway", "M-9 northeast gateway"), purpose: localized("Sohrab Goth ke baad Toll Plaza aur outer developments ka intercity-scale chain.", "The intercity-scale chain beyond Sohrab Goth through Toll Plaza and the outer developments.") },
      { id: "malir-cantt", title: localized("Malir Cantt se inner east", "Malir Cantt to the inner east"), purpose: localized("Controlled Cantt gates ko Safoora, Johar aur Numaish se jorta hai.", "Links controlled Cantt gates with Safoora, Johar, and Numaish.") },
    ],
  },
] as const satisfies readonly DistrictProfilePresentation[];

export type ActKey = "orient" | "districts" | "movement" | "systems" | "apply";

export type FixedLessonId =
  | "compass"
  | "scale"
  | "anchors"
  | "layers"
  | "names"
  | "movement-intro"
  | "landmark-language"
  | "transit"
  | "gateways"
  | "systems"
  | "weather"
  | "address";

export type StoryCorridorId =
  | "shahrah-e-pakistan"
  | "shahrah-e-faisal"
  | "university-road"
  | "korangi-spine"
  | "mauripur-hub-river";

export type JourneyId =
  | "airport-to-saddar"
  | "surjani-to-numaish"
  | "nipa-to-tower"
  | "korangi-to-numaish"
  | "orangi-to-tower"
  | "port-to-port";

export type PhotoStoryId =
  | "empress-market"
  | "mazar-e-quaid"
  | "jinnah-airport"
  | "karachi-port"
  | "clifton-skyline";

export type QuizOptionId =
  | "district"
  | "landmark"
  | "port"
  | "sohrab-goth"
  | "clifton"
  | "port-qasim"
  | "beside"
  | "same-port"
  | "separate-ports";

export interface LessonCopy {
  readonly title: string;
  readonly body: string;
}

export interface NarrativeCopy {
  readonly body: string;
}

export interface JourneyCopy {
  readonly steps: readonly string[];
}

export interface QuizQuestionCopy {
  readonly id: "q1" | "q2" | "q3";
  readonly question: string;
  readonly options: readonly { readonly id: QuizOptionId; readonly label: string }[];
  readonly answerId: QuizOptionId;
}

export interface SiteCopy {
  readonly htmlLang: "ur-Latn" | "en";
  readonly localeName: string;
  readonly language: {
    readonly label: string;
    readonly ariaLabel: string;
    readonly romanUrdu: string;
    readonly english: string;
    readonly currentLanguage: string;
  };
  readonly common: {
    readonly skipToGuide: string;
    readonly homeAria: string;
    readonly guideChaptersAria: string;
    readonly mobileGuideChaptersAria: string;
    readonly openMenuAria: string;
    readonly closeMenuAria: string;
    readonly toggleMotionTitle: string;
    readonly motion: string;
    readonly still: string;
    readonly selected: string;
    readonly clearSelectedAria: string;
    readonly photoCreditAria: string;
    readonly externalLinkHint: string;
  };
  readonly acts: Record<ActKey, string>;
  readonly hero: {
    readonly title: string;
    readonly start: string;
  };
  readonly story: {
    readonly fixed: Record<FixedLessonId, LessonCopy>;
    readonly people: (formattedPopulation: string) => string;
    readonly districtsStat: string;
    readonly subdivisionsStat: string;
    readonly divisionStat: string;
    readonly dataNote: string;
    readonly hierarchy: readonly string[];
    readonly operating: string;
    readonly developing: string;
    readonly gatewayCards: readonly string[];
    readonly addressParts: readonly string[];
  };
  readonly districtNarrative: Record<DistrictId, NarrativeCopy>;
  readonly corridorNarrative: Record<StoryCorridorId, NarrativeCopy>;
  readonly glossaryMeanings: Record<"Chowrangi" | "Chowk" | "Mor" | "Pul" | "Phatak" | "Naka", string>;
  readonly photos: Record<PhotoStoryId, { readonly title: string; readonly alt: string }>;
  readonly journeys: {
    readonly title: string;
    readonly items: Record<JourneyId, JourneyCopy>;
  };
  readonly explorer: {
    readonly title: string;
    readonly searchLabel: string;
    readonly placeholder: string;
    readonly noResults: string;
    readonly kindLabels: Record<"district" | "corridor" | "place", string>;
    readonly transitLabel: string;
    readonly locate: string;
    readonly locating: string;
    readonly locationNote: string;
    readonly locationApproximate: string;
    readonly locationUnavailable: string;
    readonly locationDenied: string;
    readonly locationOutside: string;
    readonly nearest: (place: string) => string;
  };
  readonly safety: {
    readonly title: string;
    readonly rules: readonly string[];
    readonly emergencyTitle: string;
    readonly verifiedNote: string;
    readonly serviceLabels: Record<string, string>;
  };
  readonly quiz: {
    readonly title: string;
    readonly questions: readonly QuizQuestionCopy[];
    readonly correct: string;
    readonly wrongFeedback: string;
  };
  readonly cheatSheet: {
    readonly title: string;
    readonly print: string;
    readonly cards: readonly { readonly label: string; readonly body: string }[];
  };
  readonly footer: {
    readonly primarySources: string;
    readonly moreVerification: string;
    readonly reviewed: string;
    readonly mapAttribution: string;
    readonly backToTop: string;
  };
}

const romanUrdu = {
  htmlLang: "ur-Latn",
  localeName: "Roman Urdu",
  language: {
    label: "Zabaan",
    ariaLabel: "Guide ki zabaan chunein",
    romanUrdu: "Roman Urdu",
    english: "English",
    currentLanguage: "Abhi ki zabaan",
  },
  common: {
    skipToGuide: "Seedha guide par jayein",
    homeAria: "Understand Karachi, home",
    guideChaptersAria: "Guide ke chapters",
    mobileGuideChaptersAria: "Mobile guide ke chapters",
    openMenuAria: "Guide menu kholein",
    closeMenuAria: "Guide menu band karein",
    toggleMotionTitle: "Animation on ya off karein",
    motion: "Animation",
    still: "Band",
    selected: "Select hua",
    clearSelectedAria: "Selected jagah hata dein",
    photoCreditAria: "Tasveer ka source aur credit",
    externalLinkHint: "Naye tab mein khulega",
  },
  acts: {
    orient: "Simt samjhein",
    districts: "Zilay",
    movement: "Safar",
    systems: "Nizaam",
    apply: "Amal",
  },
  hero: {
    title: "Karachi ko zero se samjhein.",
    start: "Shuru karein",
  },
  story: {
    fixed: {
      compass: {
        title: "Samandar south mein hai.",
        body: "Old city south-west, airport east, M-9 north-east aur Hub west.",
      },
      scale: {
        title: "Karachi Division 3,527 km² hai.",
        body: "Is mein ghana shehar aur bara rural/peri-urban hissa dono shamil hain.",
      },
      anchors: {
        title: "4 anchors: Saddar/Tower, Karachi Port, Airport aur Sohrab Goth.",
        body: "Har nayi jagah ko qareebi anchor se jorein.",
      },
      layers: {
        title: "District, town aur neighbourhood alag layers hain.",
        body: "Ek jagah har layer mein alag hudood rakh sakti hai.",
      },
      names: {
        title: "Malir ya Korangi kehne par context poochein.",
        body: "District, town, neighbourhood, junction ya station? Guru Mandir district nahi.",
      },
      "movement-intro": {
        title: "Safar 7 bari roads se samjhein.",
        body: "Nearest spine → anchor → last mile.",
      },
      "landmark-language": {
        title: "Directions landmarks ki chain hoti hain.",
        body: "Tower, Numaish, Nursery, Karsaz aur NIPA ki tarteeb sunein.",
      },
      transit: {
        title: "Chal rahi aur ban rahi lines.",
        body: "Green/Orange aur People’s/Pink/EV services chal rahi hain; Red/Yellow development mein aur KCR proposed hai.",
      },
      gateways: {
        title: "Airport east; Karachi Port south-west; Port Qasim far south-east.",
        body: "Karachi Cantt main intercity rail station hai.",
      },
      systems: {
        title: "Har service ka alag zimmedar idara hai.",
        body: "Complaint se pehle asset owner check karein.",
      },
      weather: {
        title: "Faasla travel time nahi batata.",
        body: "Traffic, construction aur barish route badal sakte hain.",
      },
      address: {
        title: "Address = ilaqa + block + road + landmark + pin.",
        body: "Sirf ilaqay ka naam kaafi nahi.",
      },
    },
    people: (formattedPopulation: string) => `${formattedPopulation} log`,
    districtsStat: "zilay",
    subdivisionsStat: "subdivisions",
    divisionStat: "Karachi Division",
    dataNote: "Areas Census 2023 ke figures hain; OSM overlay sirf orientation ke liye hai.",
    hierarchy: ["Sindh", "Karachi Division", "7 zilay", "31 subdivisions", "area / block / sector"],
    operating: "Chal rahi hai",
    developing: "Ban rahi hai",
    gatewayCards: ["Airport · east", "Cantt · inner south", "Karachi Port · south-west", "Port Qasim · bohat door south-east"],
    addressParts: ["Gulshan-e-Iqbal", "Block 13-D", "University Road", "NIPA ke paas", "live pin"],
  },
  districtNarrative: {
    central: {
      body: "Liaquatabad, Nazimabad, New Karachi aur North Karachi ka ghana middle-north; miltay-jultay naam alag ilaqay hain.",
    },
    east: {
      body: "Gulshan, Johar, universities, hospitals aur M-9 gateway; address ke saath block ya road zaroor lein.",
    },
    south: {
      body: "Old city, Saddar, Lyari, Clifton aur seafront ka historic-commercial south.",
    },
    west: {
      body: "Orangi aur Manghopir ka hilly north-west; routes chand passes aur junctions se guzarte hain.",
    },
    keamari: {
      body: "Harbour, SITE, Baldia aur western beaches; ‘Keamari’ district, neighbourhood ya port area ho sakta hai.",
    },
    korangi: {
      body: "Shah Faisal/Model Colony se Korangi/Landhi industry tak south-east belt; district neighbourhood se bara hai.",
    },
    malir: {
      body: "Airport se gaon, Steel Town aur Port Qasim tak bara east; route mein ‘Malir’ aksar Malir 15/Halt hota hai.",
    },
  },
  corridorNarrative: {
    "shahrah-e-pakistan": {
      body: "Inner city se Central aur M-9 gateway tak janay wali main northbound line.",
    },
    "shahrah-e-faisal": {
      body: "Airport ko centre se jornay wali Karachi ki sab se mashhoor spine; railway ke saath offices, hotels aur bari cross-roads ko milati hai.",
    },
    "university-road": {
      body: "East Karachi ki universities, hospitals aur civic jagahon ki spine, jo inner city se Safoora ki taraf jati hai.",
    },
    "korangi-spine": {
      body: "Central Karachi se Korangi hotay huay Landhi tak lambi industrial aur residential approach.",
    },
    "mauripur-hub-river": {
      body: "Western freight aur neighbourhood approach jo old core ko Keamari district, Baldia aur Balochistan side se jorti hai.",
    },
  },
  glossaryMeanings: {
    Chowrangi: "Bara road junction, jo pehle aksar roundabout hota tha.",
    Chowk: "Junction, chhota square ya market ka jama hua hissa.",
    Mor: "Woh turn ya junction jahan route doosri simt nikalta hai.",
    Pul: "Bridge ya flyover.",
    Phatak: "Railway ki level crossing ya gate.",
    Naka: "Checkpost, controlled entrance ya pehchana hua stop.",
  },
  photos: {
    "empress-market": {
      title: "Empress Market, Saddar ka historic commercial core.",
      alt: "Saddar Karachi mein Empress Market ki tareekhi imarat",
    },
    "mazar-e-quaid": {
      title: "Mazar-e-Quaid: old core aur northbound spine ke darmiyan.",
      alt: "Bagh se nazar aata Mazar-e-Quaid ka safed sang-e-marmar maqbara",
    },
    "jinnah-airport": {
      title: "Jinnah Terminal airport approach se — source image 2005 ki hai.",
      alt: "Karachi ke Jinnah International Airport ka terminal",
    },
    "karachi-port": {
      title: "Karachi seaport par container cranes — tasveer 2022 ki hai.",
      alt: "Karachi seaport par container cranes aur pani",
    },
    "clifton-skyline": {
      title: "Clifton skyline — tasveer 2015 ki hai.",
      alt: "Clifton Karachi ki apartment skyline",
    },
  },
  journeys: {
    title: "6 asal safar",
    items: {
      "airport-to-saddar": {
        steps: ["Airport → Shahrah-e-Faisal → Karsaz → Nursery/FTC → Metropole → exact Saddar stop"],
      },
      "surjani-to-numaish": {
        steps: ["Surjani → Nagan → Ayesha Manzil → Liaquatabad → Teen Hatti → Numaish"],
      },
      "nipa-to-tower": {
        steps: ["NIPA → Hasan Square → Jail Chowrangi → Numaish → M.A. Jinnah Road → Tower"],
      },
      "korangi-to-numaish": {
        steps: ["Korangi Crossing → Qayyumabad → Kala Pul → FTC/Nursery → Numaish"],
      },
      "orangi-to-tower": {
        steps: ["Orangi No. 5 → Banaras → SITE/Gulbai → ICI → Tower"],
      },
      "port-to-port": {
        steps: ["Port Qasim → N-5 → Steel Town → Quaidabad → Malir 15/Halt → Shahrah-e-Faisal → Saddar → Tower/Keamari"],
      },
    },
  },
  explorer: {
    title: "Jagah search karein",
    searchLabel: "Karachi ki jagah, district ya road search karein",
    placeholder: "Guru Mandir, NIPA, Malir 15 try karein…",
    noResults: "Match nahi mila. Doosra naam try karein.",
    kindLabels: { district: "district", corridor: "road spine", place: "jagah" },
    transitLabel: "public transport",
    locate: "Meri location ka andaza",
    locating: "Location ka andaza lag raha hai…",
    locationNote: "Ruk kar use karein. Location save nahi hoti; result approximate hai.",
    locationApproximate: "Approximate position:",
    locationUnavailable: "Is device par location available nahi.",
    locationDenied: "Location nahi mili. Permission check karein ya search use karein.",
    locationOutside: "Aap Karachi guide area se bahar lag rahe hain—live navigation use karein.",
    nearest: (place: string) => `${place} ke qareeb`,
  },
  safety: {
    title: "Nikalne se pehle check karein",
    rules: [
      "Safar ki details kisi bharosay walay shakhs ko bhejein",
      "Anjaan gehrai walay jama pani mein kabhi na jayein",
      "Traffic aur bheer mein qeemti cheezen numayan na rakhein",
    ],
    emergencyTitle: "Emergency numbers",
    verifiedNote: "14 Aug 2026 ko verify hua.",
    serviceLabels: {
      "rescue-1122": "Sindh Emergency Rescue Service",
      "police-15": "Madadgar Police",
      "fire-16": "Fire Brigade",
      "edhi-115": "Edhi Ambulance",
      "chhipa-1020": "Chhipa Ambulance",
      "ssgc-1199": "SSGC gas emergency",
      "women-1094": "Women Development Department helpline",
      "child-1121": "Sindh Child Protection Authority",
      "cplc-1102": "Citizens-Police Liaison Committee",
    },
  },
  quiz: {
    title: "3 sawal",
    questions: [
      {
        id: "q1",
        question: "Malir 15 kya hai?",
        options: [
          { id: "district", label: "Ek district" },
          { id: "landmark", label: "Ek landmark / junction" },
          { id: "port", label: "Ek port" },
        ],
        answerId: "landmark",
      },
      {
        id: "q2",
        question: "M-9 side ka familiar city gateway kya hai?",
        options: [
          { id: "sohrab-goth", label: "Sohrab Goth" },
          { id: "clifton", label: "Clifton" },
          { id: "port-qasim", label: "Port Qasim" },
        ],
        answerId: "sohrab-goth",
      },
      {
        id: "q3",
        question: "Karachi Port aur Port Qasim kya hain?",
        options: [
          { id: "beside", label: "Ek doosray ke paas" },
          { id: "same-port", label: "Ek port ke do naam" },
          { id: "separate-ports", label: "Do alag port landscapes" },
        ],
        answerId: "separate-ports",
      },
    ],
    correct: "Bilkul sahi.",
    wrongFeedback: "Abhi nahi—doosra jawab try karein.",
  },
  cheatSheet: {
    title: "Karachi: 4 cheezen yaad rakhein",
    print: "Cheat sheet print karein",
    cards: [
      { label: "01 · COMPASS", body: "Samandar south · old core south-west · airport east · M-9 north-east · Hub west." },
      { label: "02 · ZILAY", body: "South · Keamari · West · Central · East · Korangi · Malir." },
      { label: "03 · SPINES", body: "North/M-9 · airport/N-5 · University Road · Korangi/Landhi · port/Hub." },
      { label: "04 · SAFAR KA QAIDA", body: "Simt samjhein → spine join karein → anchor par transfer karein → last mile poori karein." },
    ],
  },
  footer: {
    primarySources: "Bunyadi sources",
    moreVerification: "Mazeed tasdeeq",
    reviewed: "Facts aur transport status 14 August 2026 ko review huay",
    mapAttribution: "District geometry © OpenStreetMap contributors · ODbL",
    backToTop: "Wapas upar",
  },
} satisfies SiteCopy;

const english = {
  htmlLang: "en",
  localeName: "English",
  language: {
    label: "Language",
    ariaLabel: "Choose the guide language",
    romanUrdu: "Roman Urdu",
    english: "English",
    currentLanguage: "Current language",
  },
  common: {
    skipToGuide: "Skip to the guide",
    homeAria: "Understand Karachi, home",
    guideChaptersAria: "Guide chapters",
    mobileGuideChaptersAria: "Mobile guide chapters",
    openMenuAria: "Open guide menu",
    closeMenuAria: "Close guide menu",
    toggleMotionTitle: "Toggle motion",
    motion: "Motion",
    still: "Still",
    selected: "Selected",
    clearSelectedAria: "Clear selected place",
    photoCreditAria: "Photo source and credit",
    externalLinkHint: "Opens in a new tab",
  },
  acts: {
    orient: "Orient",
    districts: "Districts",
    movement: "Movement",
    systems: "Systems",
    apply: "Apply",
  },
  hero: {
    title: "Understand Karachi from zero.",
    start: "Start",
  },
  story: {
    fixed: {
      compass: {
        title: "The sea is south.",
        body: "Old city southwest, airport east, M-9 northeast, and Hub west.",
      },
      scale: {
        title: "Karachi Division covers 3,527 km².",
        body: "It includes the dense city and a large rural/peri-urban fringe.",
      },
      anchors: {
        title: "4 anchors: Saddar/Tower, Karachi Port, Airport, and Sohrab Goth.",
        body: "Attach each new place to its nearest anchor.",
      },
      layers: {
        title: "District, town, and neighbourhood are different layers.",
        body: "One place can have different boundaries in each layer.",
      },
      names: {
        title: "Ask what names like Malir or Korangi mean in context.",
        body: "District, town, neighbourhood, junction, or station? Guru Mandir is not a district.",
      },
      "movement-intro": {
        title: "Understand trips through 7 major roads.",
        body: "Nearest spine → anchor → last mile.",
      },
      "landmark-language": {
        title: "Directions are chains of landmarks.",
        body: "Listen for the order of Tower, Numaish, Nursery, Karsaz, and NIPA.",
      },
      transit: {
        title: "Operating and developing lines.",
        body: "Green/Orange and People’s/Pink/EV services operate; Red/Yellow are developing and KCR is proposed.",
      },
      gateways: {
        title: "Airport east; Karachi Port southwest; Port Qasim far southeast.",
        body: "Karachi Cantt is the main intercity rail station.",
      },
      systems: {
        title: "Different authorities manage different services.",
        body: "Check the asset owner before reporting a problem.",
      },
      weather: {
        title: "Distance does not predict travel time.",
        body: "Traffic, construction, and rain can change a route.",
      },
      address: {
        title: "Address = area + block + road + landmark + pin.",
        body: "An area name alone is not enough.",
      },
    },
    people: (formattedPopulation: string) => `${formattedPopulation} people`,
    districtsStat: "districts",
    subdivisionsStat: "subdivisions",
    divisionStat: "division",
    dataNote: "Areas are Census 2023 figures; the OSM overlay is for orientation only.",
    hierarchy: ["Sindh", "Karachi Division", "7 districts", "31 subdivisions", "area / block / sector"],
    operating: "Operating",
    developing: "Developing",
    gatewayCards: ["Airport · east", "Cantt · inner south", "Karachi Port · southwest", "Port Qasim · far southeast"],
    addressParts: ["Gulshan-e-Iqbal", "Block 13-D", "University Road", "near NIPA", "live pin"],
  },
  districtNarrative: {
    central: {
      body: "Dense middle-north around Liaquatabad, Nazimabad, New Karachi, and North Karachi; similar names are separate places.",
    },
    east: {
      body: "Gulshan, Johar, universities, hospitals, and the M-9 gateway; always add a block or road to an address.",
    },
    south: {
      body: "The historic-commercial south: old city, Saddar, Lyari, Clifton, and the seafront.",
    },
    west: {
      body: "The hilly northwest around Orangi and Manghopir; routes funnel through a few passes and junctions.",
    },
    keamari: {
      body: "Harbour, SITE, Baldia, and western beaches; ‘Keamari’ may mean the district, neighbourhood, or port area.",
    },
    korangi: {
      body: "The southeast belt from Shah Faisal/Model Colony to Korangi/Landhi industry; the district is larger than the neighbourhood.",
    },
    malir: {
      body: "The vast east from the airport to villages, Steel Town, and Port Qasim; in directions, ‘Malir’ often means Malir 15/Halt.",
    },
  },
  corridorNarrative: {
    "shahrah-e-pakistan": {
      body: "The main northbound axis from the inner city into Central and the M-9 gateway.",
    },
    "shahrah-e-faisal": {
      body: "Karachi’s best-known airport-to-centre spine, running along the railway and linking offices, hotels and major cross-roads.",
    },
    "university-road": {
      body: "East Karachi’s education, hospital and civic spine, continuing from the inner city toward Safoora.",
    },
    "korangi-spine": {
      body: "The long industrial-residential approach from central Karachi through Korangi to Landhi.",
    },
    "mauripur-hub-river": {
      body: "The western freight-and-neighbourhood approach connecting the old core to Keamari district, Baldia and the Balochistan side.",
    },
  },
  glossaryMeanings: {
    Chowrangi: "A major road junction, historically often a roundabout.",
    Chowk: "A junction, small square or concentrated market area.",
    Mor: "A turn or branching junction.",
    Pul: "A bridge or flyover.",
    Phatak: "A level railway crossing or gate.",
    Naka: "A checkpoint, controlled entrance or established stop.",
  },
  photos: {
    "empress-market": {
      title: "Empress Market, Saddar’s historic commercial core.",
      alt: "The historic Empress Market building in Saddar, Karachi",
    },
    "mazar-e-quaid": {
      title: "Mazar-e-Quaid: between the old core and northbound spine.",
      alt: "Mazar-e-Quaid’s white marble mausoleum seen from its garden",
    },
    "jinnah-airport": {
      title: "Jinnah Terminal from the airport approach — source image from 2005.",
      alt: "The terminal at Karachi’s Jinnah International Airport",
    },
    "karachi-port": {
      title: "Container cranes at Karachi seaport — photographed in 2022.",
      alt: "Container cranes and water at Karachi seaport",
    },
    "clifton-skyline": {
      title: "Clifton skyline — photographed in 2015.",
      alt: "Clifton's apartment skyline in Karachi",
    },
  },
  journeys: {
    title: "6 example trips",
    items: {
      "airport-to-saddar": {
        steps: ["Airport → Shahrah-e-Faisal → Karsaz → Nursery/FTC → Metropole → exact Saddar stop"],
      },
      "surjani-to-numaish": {
        steps: ["Surjani → Nagan → Ayesha Manzil → Liaquatabad → Teen Hatti → Numaish"],
      },
      "nipa-to-tower": {
        steps: ["NIPA → Hasan Square → Jail Chowrangi → Numaish → M.A. Jinnah Road → Tower"],
      },
      "korangi-to-numaish": {
        steps: ["Korangi Crossing → Qayyumabad → Kala Pul → FTC/Nursery → Numaish"],
      },
      "orangi-to-tower": {
        steps: ["Orangi No. 5 → Banaras → SITE/Gulbai → ICI → Tower"],
      },
      "port-to-port": {
        steps: ["Port Qasim → N-5 → Steel Town → Quaidabad → Malir 15/Halt → Shahrah-e-Faisal → Saddar → Tower/Keamari"],
      },
    },
  },
  explorer: {
    title: "Search a place",
    searchLabel: "Search Karachi places, districts and roads",
    placeholder: "Try Guru Mandir, NIPA, Malir 15…",
    noResults: "No match. Try another name.",
    kindLabels: { district: "district", corridor: "road spine", place: "place" },
    transitLabel: "public transport",
    locate: "Estimate my location",
    locating: "Estimating location…",
    locationNote: "Stop before using this. Location is not saved; the result is approximate.",
    locationApproximate: "Approximate position:",
    locationUnavailable: "Location is unavailable on this device.",
    locationDenied: "Location unavailable. Check permission or use search.",
    locationOutside: "You appear outside the Karachi guide area—use live navigation.",
    nearest: (place: string) => `near ${place}`,
  },
  safety: {
    title: "Check before leaving",
    rules: [
      "Share trip details with someone you trust",
      "Never enter unknown standing water",
      "Keep valuables discreet in traffic and crowds",
    ],
    emergencyTitle: "Emergency numbers",
    verifiedNote: "Verified 14 Aug 2026.",
    serviceLabels: {
      "rescue-1122": "Sindh Emergency Rescue Service",
      "police-15": "Madadgar Police",
      "fire-16": "Fire Brigade",
      "edhi-115": "Edhi Ambulance",
      "chhipa-1020": "Chhipa Ambulance",
      "ssgc-1199": "SSGC gas emergency",
      "women-1094": "Women Development Department helpline",
      "child-1121": "Sindh Child Protection Authority",
      "cplc-1102": "Citizens-Police Liaison Committee",
    },
  },
  quiz: {
    title: "3 questions",
    questions: [
      {
        id: "q1",
        question: "Malir 15 is…",
        options: [
          { id: "district", label: "A district" },
          { id: "landmark", label: "A landmark / junction" },
          { id: "port", label: "A port" },
        ],
        answerId: "landmark",
      },
      {
        id: "q2",
        question: "The familiar city-side gateway toward M-9 is…",
        options: [
          { id: "sohrab-goth", label: "Sohrab Goth" },
          { id: "clifton", label: "Clifton" },
          { id: "port-qasim", label: "Port Qasim" },
        ],
        answerId: "sohrab-goth",
      },
      {
        id: "q3",
        question: "Karachi Port and Port Qasim are…",
        options: [
          { id: "beside", label: "Beside each other" },
          { id: "same-port", label: "Two names for one port" },
          { id: "separate-ports", label: "Separate port landscapes" },
        ],
        answerId: "separate-ports",
      },
    ],
    correct: "Correct.",
    wrongFeedback: "Not quite—try another answer.",
  },
  cheatSheet: {
    title: "Karachi: 4 things to remember",
    print: "Print cheat sheet",
    cards: [
      { label: "01 · COMPASS", body: "Sea south · old core southwest · airport east · M-9 northeast · Hub west." },
      { label: "02 · DISTRICTS", body: "South · Keamari · West · Central · East · Korangi · Malir." },
      { label: "03 · SPINES", body: "North/M-9 · airport/N-5 · University Road · Korangi/Landhi · port/Hub." },
      { label: "04 · TRIP RULE", body: "Orient → join a spine → transfer at an anchor → finish the last mile." },
    ],
  },
  footer: {
    primarySources: "Primary sources",
    moreVerification: "More verification",
    reviewed: "Facts and transport status reviewed 14 August 2026",
    mapAttribution: "District geometry © OpenStreetMap contributors · ODbL",
    backToTop: "Back to top",
  },
} satisfies SiteCopy;

export const copyByLocale: Readonly<Record<Locale, SiteCopy>> = {
  "ur-roman": romanUrdu,
  en: english,
};

export const localeOptions = [
  { value: "ur-roman", label: "Roman Urdu", htmlLang: "ur-Latn" },
  { value: "en", label: "English", htmlLang: "en" },
] as const satisfies readonly { value: Locale; label: string; htmlLang: SiteCopy["htmlLang"] }[];

export function getCopy(locale: Locale): SiteCopy {
  return copyByLocale[locale];
}

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "ur-roman" || value === "en";
}

type TransitPresentation = {
  readonly summary: string;
  readonly status: string;
  readonly caveat: string;
};

/** Roman Urdu presentation for canonical transit facts. Official names, route
 * IDs and endpoints stay unchanged so they still match signs and search. */
export const romanTransitPresentation = {
  green: {
    summary: "Surjani Town ↔ Numaish, North Karachi aur Nazimabad ke zariye.",
    status: "Operational BRT; current official directory mein listed hai.",
    caveat: "Station access, timing, fare aur last service safar ke din official route map se check karein.",
  },
  orange: {
    summary: "Orangi Town Office ↔ Board Office; Green Line tak chhota feeder.",
    status: "Operational short BRT feeder; current official directory mein listed hai.",
    caveat: "Official pages ki status wording mukhtalif hai, is liye same-day service confirm karein.",
  },
  peoples: {
    summary: "Ek line nahi, routes ka network hai; har route ka active status alag hota hai.",
    status: "Mukhtalif residential, commercial aur industrial routes par chalti hai.",
    caveat: "Sirf route number dekh kar service assume na karein; active flag aur current stop chain check karein.",
  },
  pink: {
    summary: "Women-focused bus routes; route number ke mutabiq Karachi ke mukhtalif hisson ko jorti hain.",
    status: "Official directory mein named routes ke sath operating service.",
    caveat: "Pink Bus future colour-coded BRT nahi; route number, eligibility aur timing check karein.",
  },
  ev: {
    summary: "EV-01 se EV-05 named routes; ek continuous line nahi.",
    status: "Official directory mein named electric-bus routes operating hain.",
    caveat: "Wohi EV route choose karein jo trip ke dono required points serve karta ho.",
  },
  red: {
    summary: "Planned Malir Halt ↔ Tower corridor, Safoora, University Road aur Numaish ke zariye.",
    status: "Infrastructure project hai; abhi passenger line operational nahi.",
    caveat: "Construction ko bus service na samjhein; official passenger launch tak operating mode use karein.",
  },
  yellow: {
    summary: "Planned Dawood Chowrangi ↔ Numaish corridor, Korangi aur Shahrah-e-Faisal ke zariye.",
    status: "Implementation mein hai; abhi passenger operation nahi.",
    caveat: "Aaj ka safar is future line par plan na karein; official launch ka intezar karein.",
  },
  kcr: {
    summary: "Karachi ke historic circular/suburban rail system ki proposed restoration.",
    status: "Restoration agreement operating timetable nahi hai.",
    caveat: "Purane KCR station par regular service assume na karein; live railway timetable check karein.",
  },
} as const satisfies Record<TransitService["id"], TransitPresentation>;

/** Use for road/district narrative lookup while keeping unlisted official names
 * unchanged. The narrowed parameter catches accidental non-story corridors.
 */
export function getCorridorNarrative(locale: Locale, corridorId: CorridorId): NarrativeCopy | undefined {
  if (!(corridorId in copyByLocale[locale].corridorNarrative)) return undefined;
  return copyByLocale[locale].corridorNarrative[corridorId as StoryCorridorId];
}

/** Short, place-specific Roman Urdu orientation meanings. Proper nouns stay
 * unchanged so the same result remains searchable on signs and maps. The
 * complete LandmarkId record makes a new canonical landmark fail typecheck
 * until its Roman Urdu meaning is added here. */
export const romanLandmarkMeaning = {
  saddar: "Purana central shopping aur transport area; exact stop Regal, Empress Market ya Lucky Star ho sakta hai.",
  "empress-market": "Historic market aur Saddar ka bohat clear visual anchor.",
  tower: "Merewether Clock Tower ke qareeb old-city/port-side route anchor; bus mein ‘Tower’ isi area ko kehte hain.",
  "ii-chundrigar": "Tower aur Shaheen Complex ke darmiyan Karachi ki purani banking aur corporate street.",
  "karachi-city-station": "Purana downtown railway station; Karachi Cantt Station se alag hai.",
  "karachi-cantt-station": "Karachi ka main intercity railway station, Metropole/Shahrah-e-Faisal side ke south mein.",
  "frere-hall": "Saddar, Civil Lines aur Clifton ke darmiyan colonial-era civic landmark.",
  "teen-talwar": "Three Swords monument aur Clifton ka major junction; common meeting aur direction point.",
  "do-talwar": "Clifton ka alag Two Swords junction; yeh Teen Talwar nahi hai.",
  "boat-basin": "Mai Kolachi se Clifton aate hue waterfront food aur park area.",
  "sea-view": "Mashhoor public seafront; Sea View lamba stretch hai is liye named landmark bhi poochein.",
  "dolmen-clifton": "Seafront ka bara mall aur asani se pehchana jane wala pickup/drop-off anchor.",
  "civil-hospital": "Ghanay old-city medical aur market zone mein bara public hospital.",
  jpmc: "Cantt Station aur Saddar/FTC side ke qareeb bara public teaching hospital.",
  lyari: "Old city ke bilkul north-west mein historic neighbourhoods ka bara area; ek pin poore Lyari ko represent nahi karta.",
  "mazar-e-quaid": "Muhammad Ali Jinnah ka mausoleum aur Karachi ka strong central visual landmark.",
  numaish: "Mazar ke qareeb junction jahan M.A. Jinnah Road, Shahrah-e-Pakistan aur major bus corridors milte hain.",
  "guru-mandir": "Numaish ke north-east mein busy route area; directions mein junction/neighbourhood hai, district nahi.",
  "jail-chowrangi": "University Road mental line ka inner-city start aur Shaheed-e-Millat cross-connection ka west end.",
  "hasan-square": "Stadium, Expo Centre aur Civic Centre ke qareeb East Karachi ka central junction.",
  "civic-centre": "Hasan Square aur University Road ke qareeb public offices ka cluster.",
  "expo-centre": "Civic Centre aur National Stadium side ke qareeb Karachi ka main exhibition complex.",
  nipa: "University Road aur Rashid Minhas Road ka major crossing; East Karachi ka bohat useful route anchor.",
  "karachi-university": "Bara public university campus jo University Road ko uski everyday pehchan deta hai.",
  "ned-university": "University belt ke samne major engineering university aur bus-route landmark.",
  "aga-khan-hospital": "Stadium Road aur University Road networks ke darmiyan bara teaching hospital.",
  safoora: "University Road chain ka eastern end aur Scheme 33/Malir Cantt approaches ka gateway.",
  "sohrab-goth": "M-9 ki taraf familiar north-east city gateway; controlled motorway aur Toll Plaza is se agay hain.",
  "teen-hatti": "Lyari River par bridge aur junction, inner city aur Liaquatabad ke darmiyan.",
  "liaquatabad-10": "Liaquatabad ka ghana commercial aur transport anchor; Lalookhet iska purana everyday naam hai.",
  "ayesha-manzil": "Federal B Area aur Shahrah-e-Pakistan spine ko serve karne wala major north-central junction.",
  "water-pump": "Federal B Area ka mashhoor junction; yeh jagah ka naam hai, pump dhoondhne ki instruction nahi.",
  "board-office": "Nazimabad/Orangi handoff aur Green/Orange Line connection ke qareeb major junction.",
  "five-star": "North Nazimabad ka roundabout jo route milestone ke taur par use hota hai.",
  "nagan-chowrangi": "North Karachi ka major junction jahan routes New Karachi, North Karachi aur Buffer Zone ki taraf bantte hain.",
  "power-house": "Nagan se agay North Karachi ka route terminus/anchor; yeh shehar ka electricity headquarters nahi.",
  "banaras-chowk": "SITE, Qasba, Orangi aur Manghopir approaches ke darmiyan key western junction.",
  "orangi-five": "Orangi ka mashhoor commercial aur transport anchor; poora Orangi is se bohat bara hai.",
  "kati-pahari": "North Nazimabad aur Orangi/Qasba sides ke darmiyan pahari cut ka route landmark.",
  manghopir: "Bara north-western area aur district subdivision; colony, road ya shrine/industrial landmark bhi batayein.",
  "surjani-town": "Door north ka residential area aur Green Line BRT corridor ka outer end.",
  "karachi-port": "Old city aur Keamari se mila historic western seaport; far-east Port Qasim se alag hai.",
  "keamari-harbour": "Harbour-side neighbourhood aur jetty area jiska naam bohat baray Keamari district ke liye bhi use hota hai.",
  "site-area": "Inner city, Orangi aur Baldia approaches ke darmiyan bara western industrial estate.",
  "baldia-town": "Bara western residential/industrial area; exact safar ke liye sector ya named stop chahiye.",
  "hawks-bay": "Mauripur se pohanchne wala western beach; road se Clifton Sea View se bohat door hai.",
  sandspit: "Mauripur/Hawks Bay network se pohanchne wala western beach aur wetland side.",
  manora: "Harbour mouth par peninsula/island; aam tor par Keamari se boat ya western road connection se pohanchte hain.",
  "natha-khan": "Airport approach ka key junction jahan Shahrah-e-Faisal se Shah Faisal Colony aur Korangi routes nikalte hain.",
  "model-colony": "Airport/Malir approach ke qareeb area jo aam bol-chal mein Malir ke sath aata hai, lekin district Korangi hai.",
  "shah-faisal-colony": "Malir River ke north mein ghana area, airport approach ke saath aur Korangi routes ke samne.",
  qayyumabad: "Korangi Road, DHA/Khayaban-e-Ittehad aur KPT/Shaheed-e-Millat approaches ka hinge.",
  "korangi-crossing": "Korangi Road side ka major junction; Korangi 5, Singer aur Dawood se alag milestone.",
  "indus-hospital": "Korangi Crossing ke qareeb bara hospital aur bus-route anchor.",
  "singer-chowrangi": "Korangi/Landhi industry ka major route milestone; nearby industrial chowrangiyon ke names badal sakte hain.",
  landhi: "Bara south-eastern residential aur industrial area; exact destination ke liye number, chowrangi ya station batayein.",
  "jinnah-airport": "Karachi ka main passenger airport; terminal, Star Gate aur airport road alag points hain.",
  "malir-halt": "Airport/N-5 approach par railway aur road recognition point; Malir 15 se alag hai.",
  "malir-15": "‘15’ stop/area ka naam hai, District 15 ya poora Malir nahi.",
  "malir-cantt": "Controlled cantonment area; gate/checkpost aur exact destination confirm karein.",
  "memon-goth": "Malir ke eastern interior ka purana settlement aur route anchor, main Airport–Malir 15 strip se alag.",
  "ibrahim-hyderi": "Eastern creek coast ki historic fishing settlement; Korangi-side approach ke bawajood district Malir hai.",
  quaidabad: "Steel Town aur Port Qasim approaches se pehle National Highway ka outer built-up junction.",
  "gulshan-e-hadeed": "Steel Town ke qareeb Karachi ke far south-eastern industrial edge par planned residential area.",
  "port-qasim": "Eastern industrial port system; Karachi Port/Keamari se alag aur bohat door hai.",
  "bahria-town-karachi": "Inner city se bohat bahar M-9 par large gated development; intercity-scale travel time rakhein.",
} as const satisfies Readonly<Record<LandmarkId, string>>;
