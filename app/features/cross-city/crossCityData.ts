import type { Locale } from "../../karachi-i18n";
import { dataVerifiedOn, sourcesById, type SourceId } from "../../karachi-data";
import type {
  CrossCityMode,
  CrossCityFeatureId,
  CrossCityScenario,
  CrossCityScenarioId,
  LocalizedText,
  RouteDirection,
  RouteStage,
} from "./types";

const text = (romanUrdu: string, english: string): LocalizedText => ({
  "ur-roman": romanUrdu,
  en: english,
});

const same = (value: string): LocalizedText => text(value, value);

const nationalRoadSources: readonly SourceId[] = [
  "nha-national-highway-code",
  "nha-motorway-motorcycle-policy",
  "nhmp-highway-ordinance",
  "nhmp-contact-130",
  "karachi-traffic-1915",
  "ndma-infra-advisory-2026",
];

export const modeOrder: readonly CrossCityMode[] = ["bike", "car", "transit"];

export const stageOrder = ["mode", "gate", "spine", "hub", "local"] as const;

export type MentalModelStage = (typeof stageOrder)[number];

export const crossCityCopy = {
  "ur-roman": {
    regionLabel: "Karachi crossing samajhne ki guide",
    title: "Karachi crossing samjhein",
    orientation: "Samandar south · Hub / N-25 west · M-9 north-east · N-5 / Thatta south-east · Airport east",
    intro: "Sawari choose karein, phir crossing ko 5 hisson mein dekhein.",
    modelLabel: "Har crossing ka formula",
    stages: {
      mode: { label: "MODE", title: "Sawari", body: "Pehle legal aur practical option choose karein." },
      gate: { label: "GATE", title: "Darwaza / start", body: "Jahan se city mein aate, nikalte, ya internal crossing shuru ya khatam karte hain." },
      spine: { label: "SPINE", title: "Bari road", body: "Woh lambi road jo overall direction sambhalti hai." },
      hub: { label: "HUB", title: "Pehchana junction", body: "Yahan direction dobara confirm ya main spine change hoti hai." },
      local: { label: "LOCAL", title: "Aakhri streets", body: "Ilaqa, block, landmark aur exact pin." },
    },
    modeLabel: "Sawari",
    modes: { bike: "Bike", car: "Car", transit: "Transit" },
    modeNotes: {
      bike: "M-9 select nahi hoga. N-25/N-5 sirf regional orientation hain—legal access aur current haal rawangi se pehle verify karein.",
      car: "Motorway ya expressway par entry se pehle vehicle eligibility aur current access check karein.",
      transit: "Ek direct service assume na karein; har hub par route board aur agla stop dobara check karein.",
    },
    bikeBan: "Motorcycles motorways par prohibited hain. Bike par M-9 use na karein.",
    bikeChecklist: "Hyderabad side se bike par N-5 · Thatta · Gharo context dekhein, M-9 nahi. Phone use se pehle safe jagah rukain. Rider aur sirf ek pillion helmet pehne; rawangi par signs aur NHMP 130 se current haal check karein.",
    routeLabel: "Misali crossing",
    routesAvailable: (count: number) => `${count} misal${count === 1 ? "" : "ein"}`,
    checkpointLabel: "Pehchan points",
    checkpointHint: "Point select karke uska kaam samjhein.",
    selectedCheckpoint: "Ab yeh dekhein",
    focusMap: "Map par dikhayein",
    transitSource: "SMTA official route directory",
    directions: {
      entry: "ENTRY",
      through: "THROUGH",
      exit: "EXIT",
      finish: "FINISH",
    } satisfies Record<RouteDirection, string>,
    stageLabels: {
      gate: "GATE",
      spine: "SPINE",
      hub: "HUB",
      local: "LOCAL",
    } satisfies Record<RouteStage, string>,
    currentChecksTitle: "Nikalne se pehle current haal poochein",
    currentChecks: {
      city: "Karachi Traffic Police",
      highway: "Motorway / National Highway Police",
    },
    callHint: "Call",
    disclaimer:
      "Page use karne se pehle safe jagah rukain. Yeh zehni orientation hai—live traffic, turn-by-turn navigation ya safety guarantee nahi. Road closure, weather, construction, access aur transit service rawangi ke waqt verify karein.",
    reviewed: "Conceptual road chain · 14 Aug 2026 review",
  },
  en: {
    regionLabel: "Guide to understanding a Karachi crossing",
    title: "Understand a Karachi crossing",
    orientation: "Sea south · Hub / N-25 west · M-9 northeast · N-5 / Thatta southeast · Airport east",
    intro: "Choose your mode, then read the crossing in five parts.",
    modelLabel: "The formula for every crossing",
    stages: {
      mode: { label: "MODE", title: "Vehicle", body: "First choose an option that is legal and practical." },
      gate: { label: "GATE", title: "Entry, exit, or start", body: "Where you enter or leave Karachi, or start or finish an internal crossing." },
      spine: { label: "SPINE", title: "Major road", body: "The long road that holds your overall direction." },
      hub: { label: "HUB", title: "Known junction", body: "Reconfirm direction or change the main spine here." },
      local: { label: "LOCAL", title: "Final streets", body: "Area, block, landmark, and exact pin." },
    },
    modeLabel: "Mode",
    modes: { bike: "Bike", car: "Car", transit: "Transit" },
    modeNotes: {
      bike: "M-9 is not offered. N-25/N-5 are regional orientation only—verify legal access and current conditions before leaving.",
      car: "Check vehicle eligibility and current access before entering any motorway or expressway.",
      transit: "Do not assume one direct service; recheck the route board and next stop at every hub.",
    },
    bikeBan: "Motorcycles are prohibited on motorways. Do not use M-9 on a bike.",
    bikeChecklist: "From the Hyderabad side by bike, use the N-5 · Thatta · Gharo orientation, never M-9. Stop safely before touching the phone. Rider and maximum one pillion wear helmets; check signs and NHMP 130 when leaving.",
    routeLabel: "Example crossing",
    routesAvailable: (count: number) => `${count} example${count === 1 ? "" : "s"}`,
    checkpointLabel: "Recognition points",
    checkpointHint: "Select a point to understand its job.",
    selectedCheckpoint: "Read this now",
    focusMap: "Show on map",
    transitSource: "SMTA official route directory",
    directions: {
      entry: "ENTRY",
      through: "THROUGH",
      exit: "EXIT",
      finish: "FINISH",
    } satisfies Record<RouteDirection, string>,
    stageLabels: {
      gate: "GATE",
      spine: "SPINE",
      hub: "HUB",
      local: "LOCAL",
    } satisfies Record<RouteStage, string>,
    currentChecksTitle: "Check current conditions before leaving",
    currentChecks: {
      city: "Karachi Traffic Police",
      highway: "Motorway / National Highway Police",
    },
    callHint: "Call",
    disclaimer:
      "Stop safely before using this page. This is mental orientation—not live traffic, turn-by-turn navigation, or a safety guarantee. Verify closures, weather, works, access, and transit service when you leave.",
    reviewed: "Conceptual road chain · reviewed 14 Aug 2026",
  },
} as const satisfies Record<Locale, unknown>;

const scenarioRecords = [
  {
    id: "hub-to-thatta",
    title: text("Hub / N-25 → Thatta / N-5", "Hub / N-25 → Thatta / N-5"),
    shortRoute: "N-25 · Hub River · Tower · Shahrah-e-Faisal · N-5",
    modes: ["bike", "car"],
    focus: { coordinates: [67.08, 24.9], zoom: 8.75 },
    checkpoints: [
      {
        id: "hub-n25-entry",
        stage: "gate",
        direction: "entry",
        label: same("N-25 / Hub side"),
        coordinates: [66.8983, 24.9957],
        zoom: 11,
        meaning: text(
          "Yeh Balochistan se Karachi ka western entry context hai. Exact city-road connection live navigation choose karegi.",
          "This is Karachi's western entry context from Balochistan. Live navigation chooses the exact city-road connection.",
        ),
      },
      {
        id: "hub-river-spine",
        stage: "spine",
        direction: "through",
        label: same("N-25 / Hub River approach"),
        coordinates: [66.94, 24.92],
        zoom: 11.1,
        meaning: text(
          "Western freight belt Hub side ko old core se jorta hai; port traffic ki wajah se chhota faasla slow ho sakta hai.",
          "The western freight belt connects the Hub side to the old core; port traffic can make a short distance slow.",
        ),
      },
      {
        id: "gulbai-tower-hub",
        stage: "hub",
        direction: "through",
        label: same("Western approach → Tower"),
        coordinates: [66.9978, 24.849],
        zoom: 12.2,
        meaning: text(
          "Yeh western approach ko old city se milane wali pehchan chain hai. Tower par eastbound centre confirm karein.",
          "This landmark chain joins the western approach to the old city. At Tower, confirm the eastbound centre direction.",
        ),
      },
      {
        id: "centre-east-spine",
        stage: "spine",
        direction: "through",
        label: same("Saddar → Shahrah-e-Faisal"),
        coordinates: [67.09, 24.875],
        zoom: 10.7,
        meaning: text(
          "Shahrah-e-Faisal centre ko airport side se jorti hai; Karsaz, Natha Khan aur Malir eastbound pehchan points hain.",
          "Shahrah-e-Faisal connects the centre with the airport side; Karsaz, Natha Khan, and Malir are eastbound recognition points.",
        ),
      },
      {
        id: "malir-quaidabad-hub",
        stage: "hub",
        direction: "through",
        label: same("Malir 15 → Quaidabad"),
        coordinates: [67.236, 24.851],
        zoom: 11,
        meaning: text(
          "Malir 15 built-up Malir ka pehchana hub hai; Quaidabad N-5 / Thatta side ka agla direction check hai.",
          "Malir 15 is a recognizable built-up Malir hub; Quaidabad is the next direction check toward N-5 / Thatta.",
        ),
      },
      {
        id: "thatta-n5-exit",
        stage: "gate",
        direction: "exit",
        label: same("N-5 / Thatta Road"),
        coordinates: [67.3993, 24.8594],
        zoom: 10.2,
        meaning: text(
          "Yeh Karachi ka south-eastern exit hai. Ab city names kam aur Gharo / Thatta signs zyada important hain.",
          "This is Karachi's southeastern exit. City names now matter less than Gharo / Thatta signs.",
        ),
      },
      {
        id: "thatta-final-local",
        stage: "local",
        direction: "finish",
        label: text("Agla exact stop / pin", "Exact next stop / pin"),
        coordinates: [67.43, 24.86],
        zoom: 10,
        meaning: text(
          "N-5 par nikalne ke baad apna exact fuel, rest ya Thatta-side stop live map se set karein.",
          "After joining N-5, set the exact fuel, rest, or Thatta-side stop in a live map.",
        ),
      },
    ],
    note: text(
      "Yeh bike crossing misal M-9 aur doosri motorways ko avoid karke city roads par west-to-east zehni chain dikhati hai.",
      "This bike crossing example avoids M-9 and other motorways and shows a west-to-east mental chain on city roads.",
    ),
  },
  {
    id: "thatta-to-hub",
    title: text("Hyderabad side via Thatta / N-5 → Hub / N-25", "Hyderabad side via Thatta / N-5 → Hub / N-25"),
    shortRoute: "N-5 · Shahrah-e-Faisal · Tower · Hub River · N-25",
    modes: ["bike", "car"],
    focus: { coordinates: [67.08, 24.9], zoom: 8.75 },
    checkpoints: [
      {
        id: "n5-karachi-entry",
        stage: "gate",
        direction: "entry",
        label: same("N-5: Hyderabad → Thatta → Gharo → Karachi edge"),
        coordinates: [67.3993, 24.8594],
        zoom: 10.2,
        meaning: text(
          "Yeh regional approach Hyderabad se Thatta aur Gharo ke zariye Karachi tak aati hai. Map point Karachi ka south-eastern entry context dikhata hai; exact road aur current haal rawangi par check karein.",
          "This regional approach reaches Karachi from Hyderabad via Thatta and Gharo. The map point marks Karachi's southeastern entry context; check the exact road and current conditions when leaving.",
        ),
      },
      {
        id: "n5-malir-spine",
        stage: "spine",
        direction: "through",
        label: same("N-5 → Quaidabad → Malir 15"),
        coordinates: [67.236, 24.851],
        zoom: 11,
        meaning: text(
          "N-5 built-up Malir tak regional spine hai; airport aur centre signs yahan se zyada useful context dete hain.",
          "N-5 is the regional spine into built-up Malir; airport and centre signs become more useful context here.",
        ),
      },
      {
        id: "airport-centre-hub-reverse",
        stage: "hub",
        direction: "through",
        label: same("Natha Khan → Shahrah-e-Faisal"),
        coordinates: [67.09, 24.875],
        zoom: 10.7,
        meaning: text(
          "Natha Khan se Shahrah-e-Faisal centre ki taraf pehchan chain hai. Saddar / Tower broad direction hai; exact turn live navigation batayegi.",
          "Natha Khan to Shahrah-e-Faisal is a recognition chain toward the centre. Saddar / Tower is the broad direction; live navigation supplies the exact turn.",
        ),
      },
      {
        id: "tower-west-spine",
        stage: "spine",
        direction: "through",
        label: same("Tower → N-25 / Hub River approach"),
        coordinates: [66.96, 24.9],
        zoom: 10.5,
        meaning: text(
          "Tower se western freight approach shuru hoti hai. Port aur heavy traffic ke liye extra waqt rakhein.",
          "The western freight approach begins at Tower. Allow extra time for port and heavy traffic.",
        ),
      },
      {
        id: "hub-side-check-hub",
        stage: "hub",
        direction: "through",
        label: same("N-25 / Hub River side"),
        coordinates: [66.92, 24.96],
        zoom: 10.8,
        meaning: text(
          "Yahan N-25 / Hub side ki broad direction dobara check hoti hai; exact legal turns current navigation se milte hain.",
          "This is where the broad N-25 / Hub-side direction is rechecked; current navigation supplies exact legal turns.",
        ),
      },
      {
        id: "hub-n25-exit",
        stage: "gate",
        direction: "exit",
        label: same("N-25 / Hub side"),
        coordinates: [66.8983, 24.9957],
        zoom: 11,
        meaning: text(
          "Yeh Karachi ka western exit context hai. Iske baad Hub / Bela / Quetta-side N-25 signs aur current navigation important hain.",
          "This is Karachi's western-exit context. Beyond it, N-25 signs toward Hub / Bela / Quetta and current navigation matter.",
        ),
      },
      {
        id: "hub-final-local",
        stage: "local",
        direction: "finish",
        label: text("Hub side ka exact stop / pin", "Exact Hub-side stop / pin"),
        coordinates: [66.88, 25.0],
        zoom: 10,
        meaning: text(
          "City edge ke baad fuel, rest aur agla N-25 stop live map aur road signs se set karein.",
          "Beyond the city edge, set fuel, rest, and the next N-25 stop using a live map and road signs.",
        ),
      },
    ],
    note: text(
      "Yeh reverse bike crossing misal bhi motorways avoid karti hai; Tower western changeover hub hai.",
      "This reverse bike crossing example also avoids motorways; Tower is the western changeover hub.",
    ),
  },
  {
    id: "m9-to-centre",
    title: text("M-9 side (bike nahi) → centre", "M-9 side (motorcycles excluded) → centre"),
    shortRoute: "M-9 · Sohrab Goth · Shahrah-e-Pakistan · Numaish · Saddar",
    modes: ["car"],
    focus: { coordinates: [67.055, 24.91], zoom: 10 },
    checkpoints: [
      {
        id: "m9-entry",
        stage: "gate",
        direction: "entry",
        label: same("M-9 → Sohrab Goth"),
        coordinates: [67.085, 24.947],
        zoom: 11.4,
        meaning: text(
          "Sohrab Goth M-9 side ka familiar city gateway hai; toll plaza aur controlled motorway farther out hain. Centre direction yahan dobara samjhein.",
          "Sohrab Goth is the familiar city-side M-9 gateway; the toll plaza and controlled motorway lie farther out. Reconfirm the centre direction here.",
        ),
      },
      {
        id: "north-centre-spine",
        stage: "spine",
        direction: "through",
        label: same("Shahrah-e-Pakistan"),
        coordinates: [67.055, 24.925],
        zoom: 11,
        meaning: text(
          "Yeh north-east gate ko inner city se jorne wali main north–centre spine hai.",
          "This is the main north–centre spine joining the northeastern gate to the inner city.",
        ),
      },
      {
        id: "north-centre-hubs",
        stage: "hub",
        direction: "through",
        label: same("Ayesha Manzil → Liaquatabad → Teen Hatti → Numaish"),
        coordinates: [67.047, 24.896],
        zoom: 11.2,
        meaning: text(
          "In milestones ki isi order se aap jaan sakte hain ke centre qareeb aa raha hai.",
          "This order of milestones tells you that the centre is getting closer.",
        ),
      },
      {
        id: "centre-local",
        stage: "local",
        direction: "finish",
        label: text("Saddar / Tower ka exact stop", "Exact Saddar / Tower stop"),
        coordinates: [67.02, 24.855],
        zoom: 12,
        meaning: text(
          "Numaish ke baad exact endpoint choose karein: Saddar market, Cantt, Tower ya koi specific pin.",
          "After Numaish, choose the exact endpoint: Saddar market, Cantt, Tower, or a specific pin.",
        ),
      },
    ],
    note: text(
      "Motorcycles excluded hain; doosray vehicles bhi current access aur eligibility rawangi par verify karein.",
      "Motorcycles are excluded; other vehicles must still verify current access and eligibility when leaving.",
    ),
  },
  {
    id: "airport-to-centre",
    title: text("Airport → centre", "Airport → centre"),
    shortRoute: "Jinnah Terminal · Star Gate · Shahrah-e-Faisal · Metropole · Saddar",
    modes: ["bike", "car"],
    focus: { coordinates: [67.1, 24.875], zoom: 10.1 },
    checkpoints: [
      {
        id: "airport-gate",
        stage: "gate",
        direction: "entry",
        label: same("Jinnah Airport → Shahrah-e-Faisal"),
        coordinates: [67.1559, 24.8869],
        zoom: 12,
        meaning: text(
          "Airport ek bari facility hai; terminal, pickup gate aur exact pin poochein. Star Gate / Shahrah-e-Faisal centre-side context deta hai.",
          "The airport is a large facility; ask for the terminal, pickup gate, and exact pin. Star Gate / Shahrah-e-Faisal provides centre-side context.",
        ),
      },
      {
        id: "shahrah-faisal-spine",
        stage: "spine",
        direction: "through",
        label: same("Shahrah-e-Faisal"),
        coordinates: [67.105, 24.879],
        zoom: 11,
        meaning: text(
          "Airport se central Karachi tak sabse seedhi mental spine; westbound centre ki taraf hai.",
          "The clearest mental spine from the airport to central Karachi; westbound is toward the centre.",
        ),
      },
      {
        id: "airport-centre-hubs",
        stage: "hub",
        direction: "through",
        label: same("Shahrah-e-Faisal → centre"),
        coordinates: [67.057, 24.857],
        zoom: 11.5,
        meaning: text(
          "Shahrah-e-Faisal chain centre ki taraf movement confirm karti hai; exact local turns current navigation se lein.",
          "The Shahrah-e-Faisal chain confirms movement toward the centre; use current navigation for exact local turns.",
        ),
      },
      {
        id: "saddar-local",
        stage: "local",
        direction: "finish",
        label: text("Saddar / Cantt / hotel ka exact pin", "Exact Saddar / Cantt / hotel pin"),
        coordinates: [67.03, 24.861],
        zoom: 13,
        meaning: text(
          "Metropole centre-side handoff context hai. Aakhri hissa exact Saddar stop, Cantt station ya hotel pin se samjhein.",
          "Metropole is centre-side handoff context. Use the exact Saddar stop, Cantt station, or hotel pin for the final leg.",
        ),
      },
    ],
    note: text(
      "Terminal pickup rules aur access points badal sakte hain; rawangi se pehle current option check karein.",
      "Terminal pickup rules and access points can change; check the current option before leaving.",
    ),
  },
  {
    id: "port-qasim-to-tower",
    title: text("Port Qasim → Tower", "Port Qasim → Tower"),
    shortRoute: "Port Qasim · N-5 · Malir · Shahrah-e-Faisal · Tower",
    modes: ["bike", "car"],
    focus: { coordinates: [67.18, 24.855], zoom: 9.3 },
    checkpoints: [
      {
        id: "port-qasim-gate",
        stage: "gate",
        direction: "entry",
        label: same("Port Qasim side → N-5"),
        coordinates: [67.333, 24.776],
        zoom: 10.5,
        meaning: text(
          "Port Qasim far south-east industrial gateway hai—Karachi Port / Keamari se bilkul alag. Exact industrial gate aur current access confirm karein.",
          "Port Qasim is the far-southeastern industrial gateway—completely separate from Karachi Port / Keamari. Confirm the exact industrial gate and current access.",
        ),
      },
      {
        id: "port-qasim-n5-spine",
        stage: "spine",
        direction: "through",
        label: same("N-5 / National Highway"),
        coordinates: [67.32, 24.86],
        zoom: 10.2,
        meaning: text(
          "Port approach ko built-up Malir se jorne wali spine; Steel Town / Gulshan-e-Hadeed outer markers hain.",
          "The spine joining the port approach to built-up Malir; Steel Town / Gulshan-e-Hadeed are outer markers.",
        ),
      },
      {
        id: "malir-hubs-inbound",
        stage: "hub",
        direction: "through",
        label: same("Quaidabad → Malir 15 → Natha Khan"),
        coordinates: [67.195, 24.883],
        zoom: 11,
        meaning: text(
          "Inbound order mein yeh continuous city aur airport-side spine ke qareeb aane ka signal hai.",
          "In this inbound order, they signal the continuous city and airport-side spine getting closer.",
        ),
      },
      {
        id: "port-centre-spine",
        stage: "spine",
        direction: "through",
        label: same("Shahrah-e-Faisal → Saddar"),
        coordinates: [67.08, 24.875],
        zoom: 10.7,
        meaning: text(
          "Airport-side spine centre tak jorti hai; Metropole old core ka changeover context hai.",
          "The airport-side spine connects toward the centre; Metropole is the old-core changeover context.",
        ),
      },
      {
        id: "tower-local",
        stage: "local",
        direction: "finish",
        label: text("Saddar → Tower ka exact pin", "Saddar → Tower exact pin"),
        coordinates: [66.9978, 24.849],
        zoom: 13,
        meaning: text(
          "Tower port-side old-city hub hai. Exact market, hotel ya onward Keamari road pin alag set karein.",
          "Tower is the port-side old-city hub. Set the exact market, hotel, or onward Keamari-road pin separately.",
        ),
      },
    ],
    note: text(
      "Freight traffic aur industrial gate controls travel time ko bohat badal sakte hain.",
      "Freight traffic and industrial gate controls can change travel time substantially.",
    ),
  },
  {
    id: "north-to-keamari",
    title: text("North Karachi → Keamari", "North Karachi → Keamari"),
    shortRoute: "Power House · Nagan · Numaish · Tower · Keamari",
    modes: ["bike", "car", "transit"],
    focus: { coordinates: [67.02, 24.91], zoom: 9.8 },
    checkpoints: [
      {
        id: "north-start-gate",
        stage: "gate",
        direction: "entry",
        label: same("Power House / North Karachi"),
        coordinates: [67.066, 24.993],
        zoom: 11.3,
        meaning: text(
          "Yeh North Karachi crossing misal ka internal start hai. GATE city edge ya kisi crossing ka start / finish ho sakta hai.",
          "This is the internal start of the North Karachi crossing example. GATE can mean a city edge or the start or finish of a crossing.",
        ),
      },
      {
        id: "north-spine",
        stage: "spine",
        direction: "through",
        label: same("North–centre axis"),
        coordinates: [67.06, 24.96],
        zoom: 10.8,
        meaning: text(
          "Nagan Shahrah-e-Pakistan chain ka north-side anchor hai; destination Keamari hai, District West nahi.",
          "Nagan is the north-side anchor of the Shahrah-e-Pakistan chain; the destination is Keamari, not District West.",
        ),
      },
      {
        id: "north-hub-chain",
        stage: "hub",
        direction: "through",
        label: same("Nagan → Ayesha Manzil → Liaquatabad → Teen Hatti → Numaish"),
        coordinates: [67.047, 24.896],
        zoom: 10.7,
        meaning: text(
          "Milestones ka yeh order north se inner city tak broad direction check hai.",
          "This milestone order is a broad direction check from the north to the inner city.",
        ),
      },
      {
        id: "old-core-west-spine",
        stage: "spine",
        direction: "through",
        label: same("M.A. Jinnah Road → Tower → Keamari"),
        coordinates: [67.01, 24.855],
        zoom: 11.5,
        meaning: text(
          "M.A. Jinnah Road Numaish ko Tower se jorti hai; Keamari uske baad harbour-side destination context hai. Exact service ya road turns current information se check karein.",
          "M.A. Jinnah Road links Numaish with Tower; Keamari is the harbour-side destination context beyond it. Check current information for the exact service or road turns.",
        ),
      },
      {
        id: "keamari-local",
        stage: "local",
        direction: "finish",
        label: text("Keamari gate / jetty / neighbourhood ka exact pin", "Exact Keamari gate / jetty / neighbourhood"),
        coordinates: [66.975, 24.82],
        zoom: 12.5,
        meaning: text(
          "Keamari district, neighbourhood, port gate aur jetty alag endpoints hain—exact pin zaroor lein.",
          "Keamari district, neighbourhood, port gate, and jetty are different endpoints—get the exact pin.",
        ),
      },
    ],
    note: text(
      "SMTA R04 ne review date par North Karachi / Power House ko Tower aur Jackson Market ke zariye Keamari se jora tha; active status aur stop chain aaj dobara check karein.",
      "At the review date, SMTA R04 linked North Karachi / Power House with Keamari via Tower and Jackson Market; recheck active status and the stop chain today.",
    ),
  },
  {
    id: "nipa-to-tower",
    title: text("NIPA / East → Tower", "NIPA / East → Tower"),
    shortRoute: "NIPA · University Road · Numaish · M.A. Jinnah Road · Tower",
    modes: ["bike", "car"],
    focus: { coordinates: [67.055, 24.89], zoom: 10.5 },
    checkpoints: [
      {
        id: "nipa-east-gate",
        stage: "gate",
        direction: "entry",
        label: same("NIPA Chowrangi"),
        coordinates: [67.105, 24.917],
        zoom: 12.4,
        meaning: text(
          "NIPA East Karachi ka strong internal hub hai; Tower side ke liye University Road westbound mental spine hai.",
          "NIPA is a strong internal East Karachi hub; University Road is the westbound mental spine toward Tower.",
        ),
      },
      {
        id: "university-road-spine",
        stage: "spine",
        direction: "through",
        label: same("University Road"),
        coordinates: [67.086, 24.906],
        zoom: 11.6,
        meaning: text(
          "NIPA ko inner city ke Numaish hub se jorne wali east–centre spine.",
          "The east–centre spine joining NIPA to the inner-city Numaish hub.",
        ),
      },
      {
        id: "nipa-tower-hubs",
        stage: "hub",
        direction: "through",
        label: same("Hasan Square → Jail Chowrangi → Numaish"),
        coordinates: [67.063, 24.889],
        zoom: 11.5,
        meaning: text(
          "Is order mein aane se Tower qareeb ho raha hai. Numaish M.A. Jinnah Road side ka handoff context hai; exact turn current navigation se lein.",
          "In this order, Tower is getting closer. Numaish is the handoff context toward M.A. Jinnah Road; use current navigation for the exact turn.",
        ),
      },
      {
        id: "ma-jinnah-tower-spine",
        stage: "spine",
        direction: "through",
        label: same("M.A. Jinnah Road"),
        coordinates: [67.02, 24.863],
        zoom: 11.7,
        meaning: text(
          "Numaish se old city aur Tower tak direct mental line; exact turns live navigation se milte hain.",
          "The direct mental line from Numaish through the old city to Tower; live navigation supplies the exact turns.",
        ),
      },
      {
        id: "tower-final-local",
        stage: "local",
        direction: "finish",
        label: text("Tower / old city ka exact pin", "Tower / exact old-city pin"),
        coordinates: [66.9978, 24.849],
        zoom: 13,
        meaning: text(
          "Tower ek crossing hub hai, single door nahi. Exact building, market ya onward port-road pin set karein.",
          "Tower is a crossing hub, not one doorway. Set the exact building, market, or onward port-road pin.",
        ),
      },
    ],
    note: text(
      "NIPA aur Numaish milte-julte sun sakte hain, lekin East aur inner city ke do alag hubs hain.",
      "NIPA and Numaish can sound similar, but they are separate hubs in East Karachi and the inner city.",
    ),
  },
  {
    id: "korangi-landhi-to-saddar",
    title: text("Korangi / Landhi → Saddar", "Korangi / Landhi → Saddar"),
    shortRoute: "Landhi · Korangi Road · Qayyumabad · Kala Pul · FTC · Saddar",
    modes: ["bike", "car", "transit"],
    focus: { coordinates: [67.09, 24.84], zoom: 10.2 },
    checkpoints: [
      {
        id: "landhi-route-gate",
        stage: "gate",
        direction: "entry",
        label: same("Landhi / Korangi side"),
        coordinates: [67.195, 24.837],
        zoom: 11.3,
        meaning: text(
          "Yeh Korangi–Landhi crossing misal ka internal start hai. Exact number ya chowrangi pehle confirm karein.",
          "This is the internal start of the Korangi–Landhi crossing example. Confirm the exact number or chowrangi first.",
        ),
      },
      {
        id: "korangi-road-spine",
        stage: "spine",
        direction: "through",
        label: same("Korangi / 8000 Road spine"),
        coordinates: [67.15, 24.83],
        zoom: 11,
        meaning: text(
          "Industrial-residential belt ko centre se jorne wali long movement line; local road names vary kar sakte hain.",
          "The long movement line joining the industrial-residential belt to the centre; local road names can vary.",
        ),
      },
      {
        id: "korangi-hubs",
        stage: "hub",
        direction: "through",
        label: same("Landhi → Korangi Crossing → Qayyumabad"),
        coordinates: [67.089, 24.831],
        zoom: 11.3,
        meaning: text(
          "Yeh chowrangi/bridge chain batati hai ke aap centre ki taraf nikal rahe hain.",
          "This chowrangi-and-bridge chain shows that you are moving out toward the centre.",
        ),
      },
      {
        id: "ftc-metropole-hub",
        stage: "hub",
        direction: "through",
        label: same("Shahrah-e-Faisal side → Saddar"),
        coordinates: [67.057, 24.857],
        zoom: 11.6,
        meaning: text(
          "Yahan Korangi approach centre-side network se milti hai. Saddar broad destination hai; exact stop aur turn current information se check karein.",
          "Here the Korangi approach meets the centre-side network. Saddar is the broad destination; check current information for the exact stop and turn.",
        ),
      },
      {
        id: "saddar-final-local",
        stage: "local",
        direction: "finish",
        label: text("Saddar ka exact stop", "Exact Saddar stop"),
        coordinates: [67.03, 24.861],
        zoom: 13,
        meaning: text(
          "Saddar ek bara area hai—Regal, Empress Market, Lucky Star, Cantt ya exact pin mein se endpoint naam dein.",
          "Saddar is a broad area—name Regal, Empress Market, Lucky Star, Cantt, or an exact pin as the endpoint.",
        ),
      },
    ],
    note: text(
      "SMTA R12 ne review date par Dawood / Landhi ko Korangi Crossing, Qayyumabad, Kala Pul aur FTC ke zariye Saddar / Lucky Star se jora tha; active status aur stops aaj dobara check karein.",
      "At the review date, SMTA R12 linked Dawood / Landhi with Saddar / Lucky Star via Korangi Crossing, Qayyumabad, Kala Pul, and FTC; recheck active status and stops today.",
    ),
  },
] as const;

type CrossCityCheckpointId = (typeof scenarioRecords)[number]["checkpoints"][number]["id"];

const checkpointFeatureIds = {
  "hub-n25-entry": ["mauripur-hub-river"], "hub-river-spine": ["mauripur-hub-river"],
  "gulbai-tower-hub": ["mauripur-hub-river", "tower"], "centre-east-spine": ["saddar", "shahrah-e-faisal"],
  "malir-quaidabad-hub": ["national-highway", "malir-15", "quaidabad"], "thatta-n5-exit": ["national-highway"],
  "thatta-final-local": ["national-highway"], "n5-karachi-entry": ["national-highway"],
  "n5-malir-spine": ["national-highway", "quaidabad", "malir-15"],
  "airport-centre-hub-reverse": ["shahrah-e-faisal", "natha-khan"],
  "tower-west-spine": ["tower", "mauripur-hub-river"],
  "hub-side-check-hub": ["mauripur-hub-river"], "hub-n25-exit": ["mauripur-hub-river"],
  "hub-final-local": ["mauripur-hub-river"], "m9-entry": ["m9-motorway", "sohrab-goth"],
  "north-centre-spine": ["shahrah-e-pakistan"],
  "north-centre-hubs": ["shahrah-e-pakistan", "ayesha-manzil", "liaquatabad-10", "teen-hatti", "numaish"],
  "centre-local": ["saddar", "tower"], "airport-gate": ["jinnah-airport", "shahrah-e-faisal"],
  "shahrah-faisal-spine": ["shahrah-e-faisal"],
  "airport-centre-hubs": ["shahrah-e-faisal"],
  "saddar-local": ["saddar", "karachi-cantt-station"], "port-qasim-gate": ["port-qasim", "national-highway"],
  "port-qasim-n5-spine": ["national-highway"],
  "malir-hubs-inbound": ["national-highway", "quaidabad", "malir-15", "natha-khan"],
  "port-centre-spine": ["shahrah-e-faisal", "saddar"], "tower-local": ["saddar", "tower"],
  "north-start-gate": ["power-house"], "north-spine": ["shahrah-e-pakistan", "nagan-chowrangi"],
  "north-hub-chain": ["shahrah-e-pakistan", "nagan-chowrangi", "ayesha-manzil", "liaquatabad-10", "teen-hatti", "numaish"],
  "old-core-west-spine": ["ma-jinnah-road", "tower", "keamari-harbour"], "keamari-local": ["keamari-harbour"],
  "nipa-east-gate": ["nipa"], "university-road-spine": ["university-road"],
  "nipa-tower-hubs": ["university-road", "hasan-square", "jail-chowrangi", "numaish"],
  "ma-jinnah-tower-spine": ["ma-jinnah-road"], "tower-final-local": ["tower"],
  "landhi-route-gate": ["landhi", "korangi-spine"], "korangi-road-spine": ["korangi-spine"],
  "korangi-hubs": ["korangi-spine", "landhi", "korangi-crossing", "qayyumabad"],
  "ftc-metropole-hub": ["shahrah-e-faisal", "saddar"], "saddar-final-local": ["saddar"],
} as const satisfies Readonly<Record<CrossCityCheckpointId, readonly CrossCityFeatureId[]>>;

const scenarioSourceIds: Readonly<Record<CrossCityScenarioId, readonly SourceId[]>> = {
  "hub-to-thatta": nationalRoadSources,
  "thatta-to-hub": nationalRoadSources,
  "m9-to-centre": [
    "nha-national-highway-code",
    "nha-motorway-motorcycle-policy",
    "nhmp-contact-130",
    "karachi-traffic-1915",
    "ndma-infra-advisory-2026",
  ],
  "airport-to-centre": ["karachi-traffic-1915", "ndma-infra-advisory-2026"],
  "port-qasim-to-tower": [
    "nha-national-highway-code",
    "karachi-traffic-1915",
    "ndma-infra-advisory-2026",
  ],
  "north-to-keamari": [
    "karachi-traffic-1915",
    "ndma-infra-advisory-2026",
    "smta-current-route-map",
  ],
  "nipa-to-tower": ["karachi-traffic-1915", "ndma-infra-advisory-2026"],
  "korangi-landhi-to-saddar": [
    "karachi-traffic-1915",
    "ndma-infra-advisory-2026",
    "smta-current-route-map",
  ],
};

/** Approved view records reference canonical feature/source IDs; coordinates are
 * retained only as a schematic camera path until all compound checkpoint chains
 * become first-class canonical entities. */
export const crossCityScenarios: readonly CrossCityScenario[] = scenarioRecords.map((scenario) => ({
  ...scenario,
  verifiedOn: dataVerifiedOn,
  sourceIds: scenarioSourceIds[scenario.id],
  checkpoints: scenario.checkpoints.map((checkpoint) => ({
    ...checkpoint,
    featureIds: checkpointFeatureIds[checkpoint.id] ?? [],
  })),
}));

/** Primary official references behind stable road names and current-check numbers. */
export const crossCitySources = [
  sourcesById["nha-national-highway-code"],
  sourcesById["nha-motorway-motorcycle-policy"],
  sourcesById["nhmp-highway-ordinance"],
  sourcesById["nhmp-contact-130"],
  sourcesById["karachi-traffic-1915"],
  sourcesById["ndma-infra-advisory-2026"],
  sourcesById["smta-current-route-map"],
] as const;
