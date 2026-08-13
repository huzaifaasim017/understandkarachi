import type { CorridorId, DistrictId } from "./karachi-data";

/** Roman Urdu is intentionally the default: most first-time local readers can
 * understand it without switching keyboard/script. Place and official road
 * names stay unchanged so they still match signs, map search and spoken routes.
 */
export type Locale = "ur-roman" | "en";

export const DEFAULT_LOCALE: Locale = "ur-roman";

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
        title: "Safar 5 bari roads se samjhein.",
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
      title: "Airport, Star Gate aur Jinnah Terminal alag pins hain.",
      alt: "Karachi ke Jinnah International Airport ka terminal",
    },
    "karachi-port": {
      title: "Karachi Port old city ke paas; Port Qasim far south-east.",
      alt: "Karachi Port ke pani mein jahaz aur harbour cranes",
    },
    "clifton-skyline": {
      title: "Clifton coast Karachi ka southern edge hai.",
      alt: "Arabian Sea ke saath Clifton Karachi ki apartment skyline",
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
  },
  safety: {
    title: "Nikalne se pehle check karein",
    rules: [
      "Safar ki details kisi bharosay walay shakhs ko bhejein",
      "Anjaan gehrai walay jama pani mein kabhi na jayein",
      "Traffic aur bheer mein qeemti cheezen numayan na rakhein",
    ],
    emergencyTitle: "Emergency numbers",
    verifiedNote: "13 Aug 2026 ko verify hua.",
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
        question: "M-9 Karachi se kahan se nikalti hai?",
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
    reviewed: "Facts aur transport status 13 August 2026 ko review huay",
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
        title: "Understand trips through 5 major roads.",
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
      title: "Airport, Star Gate, and Jinnah Terminal are different pins.",
      alt: "The terminal at Karachi’s Jinnah International Airport",
    },
    "karachi-port": {
      title: "Karachi Port is near the old city; Port Qasim is far southeast.",
      alt: "Ships and harbour cranes on the water at Karachi Port",
    },
    "clifton-skyline": {
      title: "Clifton’s coast marks Karachi’s southern edge.",
      alt: "Clifton’s apartment skyline beside the Arabian Sea in Karachi",
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
  },
  safety: {
    title: "Check before leaving",
    rules: [
      "Share trip details with someone you trust",
      "Never enter unknown standing water",
      "Keep valuables discreet in traffic and crowds",
    ],
    emergencyTitle: "Emergency numbers",
    verifiedNote: "Verified 13 Aug 2026.",
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
        question: "The M-9 leaves Karachi from…",
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
    reviewed: "Facts and transport status reviewed 13 August 2026",
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

/** Use for road/district narrative lookup while keeping unlisted official names
 * unchanged. The narrowed parameter catches accidental non-story corridors.
 */
export function getCorridorNarrative(locale: Locale, corridorId: CorridorId): NarrativeCopy | undefined {
  if (!(corridorId in copyByLocale[locale].corridorNarrative)) return undefined;
  return copyByLocale[locale].corridorNarrative[corridorId as StoryCorridorId];
}
