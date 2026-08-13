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
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly remember: string;
}

export interface NarrativeCopy {
  readonly body: string;
  readonly remember: string;
}

export interface JourneyCopy {
  readonly title: string;
  readonly steps: readonly string[];
  readonly note: string;
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
    readonly keepThis: string;
    readonly cityPause: string;
    readonly selected: string;
    readonly clearSelectedAria: string;
    readonly photoCreditAria: string;
    readonly externalLinkHint: string;
  };
  readonly acts: Record<ActKey, string>;
  readonly hero: {
    readonly kicker: string;
    readonly titleBeforeEmphasis: string;
    readonly titleEmphasis: string;
    readonly body: string;
    readonly start: string;
    readonly promiseNumber: string;
    readonly promise: string;
  };
  readonly opening: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
  };
  readonly story: {
    readonly fixed: Record<FixedLessonId, LessonCopy>;
    readonly districtProgress: (current: number, total?: number) => string;
    readonly spineProgress: (current: number, total?: number) => string;
    readonly people: (formattedPopulation: string) => string;
    readonly districtsStat: string;
    readonly subdivisionsStat: string;
    readonly divisionStat: string;
    readonly attachTo: string;
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
  readonly photos: Record<PhotoStoryId, { readonly title: string; readonly body: string; readonly alt: string }>;
  readonly journeys: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly items: Record<JourneyId, JourneyCopy>;
  };
  readonly explorer: {
    readonly eyebrow: string;
    readonly title: string;
    readonly searchLabel: string;
    readonly placeholder: string;
    readonly noResults: string;
    readonly kindLabels: Record<"district" | "corridor" | "place", string>;
  };
  readonly safety: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly rules: readonly string[];
    readonly saveOffline: string;
    readonly emergencyTitle: string;
    readonly verifiedNote: string;
    readonly serviceLabels: Record<string, string>;
  };
  readonly quiz: {
    readonly eyebrow: string;
    readonly title: string;
    readonly questions: readonly QuizQuestionCopy[];
    readonly correct: string;
    readonly wrongSuffix: string;
    readonly wrongFeedback: string;
  };
  readonly cheatSheet: {
    readonly eyebrow: string;
    readonly title: string;
    readonly print: string;
    readonly cards: readonly { readonly label: string; readonly body: string }[];
  };
  readonly footer: {
    readonly description: string;
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
    keepThis: "Yeh yaad rakhein",
    cityPause: "Shehar ka ek manzar",
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
    kicker: "Scroll se banta zehni naqsha · کراچی",
    titleBeforeEmphasis: "Karachi ko ratne ki zarurat nahi.",
    titleEmphasis: "Bas samajhne ki hai.",
    body: "Aap ko sirf samandar, saat zilay, paanch bari road spines aur chand mashhoor landmarks chahiye. Ek dafa scroll karein aur dekhein ke poora shehar kaise jurta hai.",
    start: "Bilkul zero se shuru karein",
    promiseNumber: "01",
    promise: "Aakhir tak har anjaan ilaqay ka naam aap ke zehni naqshay mein kahin na kahin fit ho jayega.",
  },
  opening: {
    eyebrow: "SAB SE ZAROORI QAIDA",
    title: "Samandar neeche. Purana shehar neeche-baen. Airport daen. M-9 upar-daen.",
    body: "Yeh compass zehan mein rakhein, phir Karachi ilaqon ke uljhay huay naam nahi lagega.",
  },
  story: {
    fixed: {
      compass: {
        eyebrow: "Sabaq 01 · Compass",
        title: "Sab se pehle samandar ko neeche rakhein.",
        body: "Karachi ka rukh Arabian Sea ki taraf hai. Purana markaz aur pehla port south-west mein hain. Wahan se shehar andar ki taraf phailta hai—north mein M-9, east mein airport aur N-5, aur west mein Hub aur Balochistan.",
        remember: "Samandar neeche · purana shehar neeche-baen · airport daen · M-9 upar-daen.",
      },
      scale: {
        eyebrow: "Sabaq 02 · Phelao",
        title: "Karachi ki sarhad, bane huay shehar se kaafi bari hai.",
        body: "Karachi Division mein lagataar bana hua shehar bhi aata hai aur us ke gird bohat bara dehati aur peri-urban hissa bhi. Isi liye official Karachi ka outline un ghani sarkon se kaafi bara dikhta hai jinhein aksar log Karachi samajhte hain.",
        remember: "3,527 km² · 20,382,881 log · 92.57% shehri abadi",
      },
      anchors: {
        eyebrow: "Sabaq 03 · Chaar anchors",
        title: "Naam yaad karne se pehle ek triangle banayein.",
        body: "Tower/Saddar ko puranay markaz mein rakhein, us ke paas Karachi Port, east mein Jinnah Airport, aur Sohrab Goth ko us jagah rakhein jahan se M-9 shehar se bahar nikalti hai. Har naya naam in tarafon mein se kisi ek se jor sakte hain.",
        remember: "Purana markaz · airport · M-9 gateway · port ka kinara.",
      },
      layers: {
        eyebrow: "Zilon se pehle",
        title: "Shehar ek hai, magar us ke naqshay kai hain.",
        body: "Revenue district, municipal town, cantonment, police jurisdiction aur neighbourhood ek hi jagah ko alag tareeqay se cover kar sakte hain. Yeh mukhtalif jawab nahi—har layer ek alag sawal ka jawab deti hai.",
        remember: "District ≠ town ≠ neighbourhood ≠ cantonment.",
      },
      names: {
        eyebrow: "Naam ka dhoka",
        title: "Ek mashhoor naam chaar alag cheezen ho sakta hai.",
        body: "Malir, Korangi, Saddar aur Keamari ka matlab context ke mutabiq alag administrative ya rozmarra jagah ho sakta hai. Guru Mandir directions mein junction/locality hai—saat zilon mein se koi district nahi.",
        remember: "Hamesha poochein: district, town, neighbourhood, junction ya station?",
      },
      "movement-intro": {
        eyebrow: "Ab bari sarkein",
        title: "District tarteeb batate hain. Corridors safar samjhate hain.",
        body: "Sainkron ilaqay ratne ke bajaye paanch radial spines seekhein to Karachi bohat asaan ho jata hai. Aksar local safar pehle kisi spine par aata hai, phir mashhoor landmark se guzarta hai, aur aakhir mein last mile hoti hai.",
        remember: "Sab se qareeb spine → mashhoor anchor → last mile.",
      },
      "landmark-language": {
        eyebrow: "Directions kaise sunai deti hain",
        title: "Karachi junctions ki zubaan bolta hai.",
        body: "Log aksar route ko street numbers se nahi, pehchani hui jagahon ki kadi se samjhate hain. Tower, Numaish, Nursery, Karsaz, NIPA, Malir 15 aur Korangi Crossing navigation ki grammar hain.",
        remember: "Anchors kis tarteeb mein aa rahe hain, us par dhyan dein.",
      },
      transit: {
        eyebrow: "Public transport · 13 Aug 2026 ko verify hua",
        title: "Chalti lines solid hain. Aanay wali lines dashed hain.",
        body: "Green aur Orange BRT abhi chalti hain; in ke saath People’s, Pink, EV aur doosri bus services bhi hain. Red aur Yellow BRT abhi development mein hain. Proposed modern KCR abhi chalti hui citywide metro loop nahi.",
        remember: "Route map waqt ke saath badalta hai—safar se pehle dobara check karein.",
      },
      gateways: {
        eyebrow: "Shehar ke darwazay",
        title: "Ek airport, do ports aur rail ke kai darwazay.",
        body: "Jinnah Airport markaz se east mein hai. Karachi Cantt intercity rail ka main arrival point hai. Karachi Port puranay shehar ke paas hai; Port Qasim south-east mein bohat door ek alag industrial port hai.",
        remember: "Dono ports ek doosray ke paas nahi hain.",
      },
      systems: {
        eyebrow: "Nazar na anay wala infrastructure",
        title: "Karachi ek shehar hai—magar ek service authority nahi.",
        body: "Pani, bijli, gas, drainage, roads, kachra aur transit alag public bodies sambhalti hain. Neeche jo district ho, us se alag road NHA, Sindh, KMC, KDA ya cantonment ki ho sakti hai.",
        remember: "Complaint ke liye sirf district nahi, asset ka zimmedar idara maloom karein.",
      },
      weather: {
        eyebrow: "Mausam network badal deta hai",
        title: "Faasla aur travel time ek cheez nahi.",
        body: "Traffic, construction aur tez monsoon barish chhota safar bhi badal sakti hai. Lyari aur Malir drainage systems bhi hain; underpasses, causeways aur neechay crossings doosri jagah ke pani se bhi bottleneck ban sakte hain.",
        remember: "Jama pani ki gehrai ya rawani maloom na ho to us mein kabhi na jayein.",
      },
      address: {
        eyebrow: "Address parhna seekhein",
        title: "Sirf ilaqay ka naam nahi, paanch cheezen poochein.",
        body: "Kaam ka Karachi address ilaqa ya society, block/sector/phase, road ya junction, qareebi mashhoor landmark aur map pin ko jorta hai. Administrative district likha hona zaroori nahi.",
        remember: "Ilaqa + block + road + landmark + pin.",
      },
    },
    districtProgress: (current: number, total = 7) => `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")} zilay`,
    spineProgress: (current: number, total = 5) => `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")} spines`,
    people: (formattedPopulation: string) => `${formattedPopulation} log`,
    districtsStat: "zilay",
    subdivisionsStat: "subdivisions",
    divisionStat: "Karachi Division",
    attachTo: "Is se jor kar yaad rakhein:",
    dataNote: "Diye gaye area Census 2023 ke statistical figures hain. Orientation overlay OSM administrative geometry follow karta hai, jismein samandari ya door ke ilaqay bhi shamil ho sakte hain; drawing dekh kar area na napain.",
    hierarchy: ["Sindh", "Karachi Division", "7 zilay", "31 subdivisions", "area / block / sector"],
    operating: "Chal rahi hai",
    developing: "Ban rahi hai",
    gatewayCards: ["Airport · east", "Cantt · inner south", "Karachi Port · south-west", "Port Qasim · bohat door south-east"],
    addressParts: ["Gulshan-e-Iqbal", "Block 13-D", "University Road", "NIPA ke paas", "live pin"],
  },
  districtNarrative: {
    central: {
      body: "Beech se north ki taraf chhota magar bohat ghana district: purane grid walay ilaqay jo old centre aur northern edge ke darmiyan hain.",
      remember: "North Karachi, New Karachi aur North Nazimabad miltay-jultay naam hain, magar teen alag ilaqay hain.",
    },
    east: {
      body: "Inner city ke east mein taleem aur services ka belt: Gulshan, Johar, universities, hospitals aur M-9 gateway yahan milte hain.",
      remember: "Gulshan, Johar aur Scheme 33 bohat baray rozmarra labels hain; address ke saath block, road ya landmark bhi chahiye.",
    },
    south: {
      body: "Tareekhi aur commercial south: old city markets, Saddar, financial core, Lyari, Clifton aur seafront.",
      remember: "Clifton aur DHA location ke mashhoor naam hain, lekin cantonment aur district administration alag layers hain.",
    },
    west: {
      body: "Pahari aur tezi se barhta north-west: Orangi aur Manghopir dense centre se aagay hain, jahan safar chand passes aur junctions se guzarta hai.",
      remember: "Keamari alag district bana to West ki hudood badlein; purane addresses mein ab bhi pehle wala Karachi West mil sakta hai.",
    },
    keamari: {
      body: "West ka port aur industry district: harbour, SITE, Baldia aur western beaches ek lambi hud mein aate hain.",
      remember: "Keamari district bhi ho sakta hai, harbour ka neighbourhood bhi, ya port area bhi—poochein kis jagah ki baat ho rahi hai.",
    },
    korangi: {
      body: "South-east ka residential aur industrial belt: Shah Faisal aur Model Colony airport approach ke paas, jabke Korangi aur Landhi heavy industry ki taraf phailte hain.",
      remember: "Korangi district, Korangi neighbourhood se bara hai; Landhi, Shah Faisal aur Model Colony bhi isi district mein hain.",
    },
    malir: {
      body: "Karachi ka bohat bara eastern aur north-eastern envelope: airport, purani Malir abadion, gaon, nayi housing, Steel Town aur Port Qasim tak.",
      remember: "Area mein Malir sab se bara district hai; route mein ‘Malir’ aksar Malir 15/Halt wali built-up side hota hai, poora district nahi.",
    },
  },
  corridorNarrative: {
    "shahrah-e-pakistan": {
      body: "Inner city se Central aur M-9 gateway tak janay wali main northbound line.",
      remember: "South ki taraf naam Numaish ke qareeb aate jate hain; north ki taraf aakhir Sohrab Goth aur Super Highway milte hain.",
    },
    "shahrah-e-faisal": {
      body: "Airport ko centre se jornay wali Karachi ki sab se mashhoor spine; railway ke saath offices, hotels aur bari cross-roads ko milati hai.",
      remember: "Sirf ek east–west road yaad rakhni ho to Shahrah-e-Faisal rakhein: ek taraf airport, doosri taraf Saddar/Metropole.",
    },
    "university-road": {
      body: "East Karachi ki universities, hospitals aur civic jagahon ki spine, jo inner city se Safoora ki taraf jati hai.",
      remember: "Hasan Square aur NIPA is ke do mazboot anchors hain; east-side ke bohat se routes in mein se kisi ek ko chhoote hain.",
    },
    "korangi-spine": {
      body: "Central Karachi se Korangi hotay huay Landhi tak lambi industrial aur residential approach.",
      remember: "Chowrangi milestones hain: Crossing, Singer aur Dawood batate hain ke aap Korangi/Landhi mein kitna andar aa gaye.",
    },
    "mauripur-hub-river": {
      body: "Western freight aur neighbourhood approach jo old core ko Keamari district, Baldia aur Balochistan side se jorti hai.",
      remember: "Yahan port traffic heavy hota hai; naqshay par qareeb jagah bhi pohanchne mein der laga sakti hai.",
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
      title: "Saddar ek ilaqa bhi hai, subdivision bhi—aur shehar ka ek khaas ehsaas bhi.",
      body: "Purana commercial core naye musafir ko ghani, ek doosray se judi landmarks ki pehli kadi deta hai.",
      alt: "Saddar Karachi mein Empress Market ki tareekhi imarat",
    },
    "mazar-e-quaid": {
      title: "Ek landmark shehar ki poori taraf samjha sakta hai.",
      body: "Mazar-e-Quaid old core, Jamshed side aur northbound spine ke darmiyani mor ke paas hai.",
      alt: "Bagh se nazar aata Mazar-e-Quaid ka safed sang-e-marmar maqbara",
    },
    "jinnah-airport": {
      title: "East ka gateway",
      body: "Bilkul sahi terminal pin chunein: Airport, Star Gate aur Jinnah Terminal ek hi destination nahi.",
      alt: "Karachi ke Jinnah International Airport ka terminal",
    },
    "karachi-port": {
      title: "Shehar ki shuruat harbour ke paas hui",
      body: "Karachi Port old city ke paas barha; Port Qasim bohat door south-east ka alag industrial landscape hai.",
      alt: "Karachi Port ke pani mein jahaz aur harbour cranes",
    },
    "clifton-skyline": {
      title: "Coast sirf destination nahi—compass bhi hai",
      body: "Clifton skyline Arabian Sea ki taraf dekhti hai; yahi fixed southern edge baqi shehar ko samajhna asaan banata hai.",
      alt: "Arabian Sea ke saath Clifton Karachi ki apartment skyline",
    },
  },
  journeys: {
    eyebrow: "Model ko istemal karein",
    title: "Chhay safar. Ek hi tareeqa.",
    intro: "Samandar se simt samjhein. Spine join karein. Anchor par transfer karein. Aakhri last mile poori karein.",
    items: {
      "airport-to-saddar": {
        title: "Jinnah International Airport → Saddar",
        steps: [
          "Airport se main city spine par niklein — Malir Halt/Natha Khan bahar wali side ke markers hain; Karsaz, Nursery aur FTC ka matlab centre qareeb aa raha hai.",
          "Metropole ke aas paas exact Saddar stop ke liye utarein — Saddar ek pin nahi; Empress, Regal, Lucky Star ya exact hotel/office ka naam dein.",
        ],
        note: "Shahrah-e-Faisal ek hi road mein samjha deti hai ke airport central Karachi se kaise jurta hai.",
      },
      "surjani-to-numaish": {
        title: "Surjani Town → Numaish / Mazar-e-Quaid",
        steps: [
          "North–centre axis par andar ki taraf chalein — Nagan, Ayesha Manzil, Liaquatabad aur Teen Hatti inner city tak aane wale milestones hain.",
          "Numaish hub par safar mukammal karein — Numaish Mazar ke paas hai; yahan se Tower ya east mein University Road ja sakte hain.",
        ],
        note: "Central Karachi north–south seedhi ki tarah hai, jis ke kaam ke paidan mashhoor junctions hain.",
      },
      "nipa-to-tower": {
        title: "NIPA Chowrangi → Tower",
        steps: [
          "University Road par andar ki taraf chalein — Hasan Square aur Jail Chowrangi East Karachi se inner city tak progress dikhate hain.",
          "Numaish se M.A. Jinnah Road par Tower tak jayein — Tibet Centre aur Jama Cloth old-city milestones hain; Tower port-side ka aakhri anchor hai.",
        ],
        note: "NIPA → Numaish → Tower east se old city ka sab se asaan chain hai.",
      },
      "korangi-to-numaish": {
        title: "Korangi Crossing → Numaish",
        steps: [
          "Korangi spine par centre ki taraf aayein — Qayyumabad aur Kala Pul industrial Korangi aur central Karachi ke bridge points hain.",
          "Centre-side cross connection lein — FTC/Nursery par Korangi approach main airport–centre spine se milti hai.",
        ],
        note: "Korangi chand river/road crossings se centre se jurta hai, is liye in crossings ke naam poora safar samjhate hain.",
      },
      "orangi-to-tower": {
        title: "Orangi No. 5 → Tower",
        steps: [
          "North-west se kisi named pass ke zariye niklein — Banaras main hinge hai; Board Office aur SITE aagay ki alag directions hain.",
          "West se old core ki taraf aayein — Gulbai/ICI aur Tower central Karachi ki freight-heavy western side samjhate hain.",
        ],
        note: "West samajhne ke liye pehle yeh maloom karein ke safar Banaras, Board Office, Manghopir ya Hub River mein se kaunsa pass use karta hai.",
      },
      "port-to-port": {
        title: "Port Qasim → Karachi Port / Keamari",
        steps: [
          "National Highway se far-eastern port chhorein — Steel Town, Quaidabad, Malir 15 aur Malir Halt continuous city ki taraf wapsi ginte hain.",
          "Metropolitan centre cross karein — airport–centre spine Saddar ki taraf lati hai, phir old-city/harbour approach aati hai.",
          "Western harbour side par pohanchein — Tower aur Keamari western port system hain, Port Qasim se kai kilometre door.",
        ],
        note: "Karachi ke do baray port worlds built-up metropolis ke bilkul mukhtalif siron par hain.",
      },
    },
  },
  explorer: {
    eyebrow: "Yeh jagah kahan hai…?",
    title: "Naam ko shehar ke naqshay se jorein.",
    searchLabel: "Karachi ki jagah, district ya road search karein",
    placeholder: "Guru Mandir, NIPA, Malir 15 try karein…",
    noResults: "Curated list mein abhi match nahi mila. Kisi ilaqay, junction ya gateway ka naam try karein.",
    kindLabels: { district: "district", corridor: "road spine", place: "jagah" },
  },
  safety: {
    eyebrow: "Local ki tarah safar karein",
    title: "Safar plan karein. Phir live haal check karein.",
    body: "Yeh guide aap ko zehni naqsha deti hai—live traffic ya emergency routing nahi. Nikalne se pehle exact pin, terminal ya stop, current route status, traffic, barish aur closures confirm karein.",
    rules: [
      "Ilaqa + block + landmark + live pin",
      "Safar ki details kisi bharosay walay shakhs ko bhejein",
      "Anjaan gehrai walay jama pani mein kabhi na jayein",
      "Traffic aur bheer mein qeemti cheezen numayan na rakhein",
    ],
    saveOffline: "Inhein offline save kar lein",
    emergencyTitle: "Emergency numbers",
    verifiedNote: "Numbers 13 Aug 2026 ko verify kiye gaye. Emergency mein apni surat-e-haal ke mutabiq sahi service ko call karein.",
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
    eyebrow: "30-second check",
    title: "Ab Karachi samajh aaya?",
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
    wrongSuffix: "— dobara koshish karein",
    wrongFeedback: "Abhi nahi—doosra jawab try karein.",
  },
  cheatSheet: {
    eyebrow: "Ek screen mein Karachi",
    title: "Anchors yaad rakhein. Uljhan bhool jayein.",
    print: "Cheat sheet print karein",
    cards: [
      { label: "01 · COMPASS", body: "Samandar south · old core south-west · airport east · M-9 north-east · Hub west." },
      { label: "02 · ZILAY", body: "South · Keamari · West · Central · East · Korangi · Malir." },
      { label: "03 · SPINES", body: "North/M-9 · airport/N-5 · University Road · Korangi/Landhi · port/Hub." },
      { label: "04 · SAFAR KA QAIDA", body: "Simt samjhein → spine join karein → anchor par transfer karein → last mile poori karein." },
    ],
  },
  footer: {
    description: "Ek azad educational orientation guide. Yeh official navigation, emergency ya live-service product nahi.",
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
    keepThis: "Keep this",
    cityPause: "City pause",
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
    kicker: "A scroll-built mental map · کراچی",
    titleBeforeEmphasis: "You don’t need to memorize Karachi.",
    titleEmphasis: "You need to understand it.",
    body: "You need the sea, seven districts, five road spines, and a few landmarks. Scroll once. See how the whole city connects.",
    start: "Start from zero",
    promiseNumber: "01",
    promise: "By the end, every unfamiliar area name will have somewhere to attach.",
  },
  opening: {
    eyebrow: "THE ONE RULE",
    title: "Sea below. Old city lower-left. Airport right. M-9 upper-right.",
    body: "Keep that compass alive and Karachi stops feeling like a pile of names.",
  },
  story: {
    fixed: {
      compass: {
        eyebrow: "Lesson 01 · The compass",
        title: "First, put the sea below you.",
        body: "Karachi faces the Arabian Sea. Its old heart and first port sit toward the southwest. The city then spreads inland—north toward M-9, east toward the airport and N-5, and west toward Hub and Balochistan.",
        remember: "Sea below. Old city lower-left. Airport right. M-9 upper-right.",
      },
      scale: {
        eyebrow: "Lesson 02 · Scale",
        title: "The boundary is bigger than the built city.",
        body: "Karachi Division includes the continuous urban city plus a large rural and peri-urban fringe. This is why an official Karachi outline looks much larger than the dense streets most visitors imagine.",
        remember: "3,527 km² · 20,382,881 people · 92.57% urban",
      },
      anchors: {
        eyebrow: "Lesson 03 · Four anchors",
        title: "Build one triangle before learning names.",
        body: "Start with Tower/Saddar in the old core, Karachi Port beside it, Jinnah Airport to the east, and Sohrab Goth where the M-9 leaves the city. Every unfamiliar name can attach to one of these sides.",
        remember: "Old core · airport · M-9 gateway · port edge.",
      },
      layers: {
        eyebrow: "Before the districts",
        title: "One city. Several maps.",
        body: "A revenue district, municipal town, cantonment, police jurisdiction and neighbourhood can cover the same ground differently. They are not competing answers—they answer different questions.",
        remember: "District ≠ town ≠ neighbourhood ≠ cantonment.",
      },
      names: {
        eyebrow: "The naming trap",
        title: "A familiar name may be four different things.",
        body: "Malir, Korangi, Saddar and Keamari can each mean different administrative or everyday geographies. Guru Mandir is a junction/locality used in directions—not one of the seven districts.",
        remember: "Always ask: district, town, neighbourhood, junction—or station?",
      },
      "movement-intro": {
        eyebrow: "Now the roads",
        title: "Districts organize. Corridors explain movement.",
        body: "Karachi becomes much simpler when you stop memorizing hundreds of areas and instead learn five radial spines. Local journeys usually join one of these, pass a known landmark, then leave for the last mile.",
        remember: "Nearest spine → known anchor → last mile.",
      },
      "landmark-language": {
        eyebrow: "How directions sound",
        title: "Karachi speaks in junctions.",
        body: "People often describe a route as a chain of recognized points—not only street numbers. Tower, Numaish, Nursery, Karsaz, NIPA, Malir 15 and Korangi Crossing are navigation grammar.",
        remember: "Listen for the sequence of anchors.",
      },
      transit: {
        eyebrow: "Public transport · verified 13 Aug 2026",
        title: "Operating lines are solid. Future lines are dashed.",
        body: "Green and Orange BRT operate today, alongside People’s, Pink, EV and other bus services. Red and Yellow BRT remain under development. The proposed modern KCR is not an operating citywide metro loop.",
        remember: "A route map is a dated layer—check before travel.",
      },
      gateways: {
        eyebrow: "Gateways",
        title: "One airport, two ports, several rail doors.",
        body: "Jinnah Airport sits east of the core. Karachi Cantt is the main intercity rail arrival. Karachi Port is beside the historic city; Port Qasim is a separate industrial port far to the southeast.",
        remember: "The two ports are not beside each other.",
      },
      systems: {
        eyebrow: "Invisible infrastructure",
        title: "Karachi is one city—not one service authority.",
        body: "Water, power, gas, drainage, roads, waste and transit are handled by different public bodies. A road may belong to NHA, Sindh, KMC, KDA or a cantonment regardless of the district beneath it.",
        remember: "For a complaint, identify the asset owner—not only the district.",
      },
      weather: {
        eyebrow: "Weather changes the network",
        title: "Distance is not the same as travel time.",
        body: "Traffic, construction and intense monsoon rain can transform a short trip. Lyari and Malir are drainage systems; underpasses, causeways and low crossings can become bottlenecks far beyond the flooded street.",
        remember: "Never enter standing water when depth or current is unknown.",
      },
      address: {
        eyebrow: "Read an address",
        title: "Ask for five pieces, not one area name.",
        body: "A usable Karachi address combines area or society, block/sector/phase, road or junction, nearest known landmark, and a map pin. The administrative district may not appear at all.",
        remember: "Area + block + road + landmark + pin.",
      },
    },
    districtProgress: (current: number, total = 7) => `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")} districts`,
    spineProgress: (current: number, total = 5) => `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")} spines`,
    people: (formattedPopulation: string) => `${formattedPopulation} people`,
    districtsStat: "districts",
    subdivisionsStat: "subdivisions",
    divisionStat: "division",
    attachTo: "Attach it to:",
    dataNote: "Printed areas are Census 2023 statistical figures. The orientation overlay follows OSM administrative geometry, which can include broad maritime or peripheral extents; do not measure area from the drawing.",
    hierarchy: ["Sindh", "Karachi Division", "7 districts", "31 subdivisions", "area / block / sector"],
    operating: "Operating",
    developing: "Developing",
    gatewayCards: ["Airport · east", "Cantt · inner south", "Karachi Port · southwest", "Port Qasim · far southeast"],
    addressParts: ["Gulshan-e-Iqbal", "Block 13-D", "University Road", "near NIPA", "live pin"],
  },
  districtNarrative: {
    central: {
      body: "The compact, very dense middle-north: established grid neighbourhoods between the old centre and the northern edge.",
      remember: "North Karachi, New Karachi and North Nazimabad sound interchangeable to a newcomer, but they are distinct areas.",
    },
    east: {
      body: "The education-and-services belt east of the inner city: Gulshan, Johar, universities, hospitals and the M-9 gateway meet here.",
      remember: "Gulshan, Johar and Scheme 33 are broad everyday labels; an address still needs its block, road or nearby landmark.",
    },
    south: {
      body: "The historic and commercial south: old city markets, Saddar, the financial core, Lyari, Clifton and the seafront.",
      remember: "Clifton and DHA are familiar location names, but cantonment administration and district administration overlap as separate systems.",
    },
    west: {
      body: "The hilly, fast-grown north-west: Orangi and Manghopir sit beyond the dense centre, with routes funnelling through a few passes and junctions.",
      remember: "West and Keamari were redrawn when Keamari became a separate district; older addresses may use the former Karachi West.",
    },
    keamari: {
      body: "The port-and-industry west: harbour land, SITE, Baldia and the western beaches share one long district.",
      remember: "Keamari can mean the district, the harbour-side neighbourhood or the port area; ask which one the speaker means.",
    },
    korangi: {
      body: "The south-eastern residential-and-industrial belt: Shah Faisal and Model Colony sit near the airport approach; Korangi and Landhi stretch toward heavy industry.",
      remember: "Korangi district is wider than Korangi neighbourhood; Landhi, Shah Faisal and Model Colony are part of the same district.",
    },
    malir: {
      body: "Karachi’s huge eastern and north-eastern envelope: airport, older Malir settlements, villages, new housing, Steel Town and Port Qasim.",
      remember: "Malir is by far the largest district by area; in a route, ‘Malir’ usually means the built-up Malir 15/Halt side, not the whole district.",
    },
  },
  corridorNarrative: {
    "shahrah-e-pakistan": {
      body: "The main northbound axis from the inner city into Central and the M-9 gateway.",
      remember: "Southbound names count down toward Numaish; northbound movement eventually meets Sohrab Goth and the Super Highway.",
    },
    "shahrah-e-faisal": {
      body: "Karachi’s best-known airport-to-centre spine, running along the railway and linking offices, hotels and major cross-roads.",
      remember: "If a newcomer remembers one east–west road first, make it Shahrah-e-Faisal: airport on one end, Saddar/Metropole on the other.",
    },
    "university-road": {
      body: "East Karachi’s education, hospital and civic spine, continuing from the inner city toward Safoora.",
      remember: "Hasan Square and NIPA are its two strongest orientation anchors; many east-side routes touch one of them.",
    },
    "korangi-spine": {
      body: "The long industrial-residential approach from central Karachi through Korangi to Landhi.",
      remember: "Chowrangi names are the milestones: Crossing, Singer and Dawood mark movement deeper into Korangi/Landhi.",
    },
    "mauripur-hub-river": {
      body: "The western freight-and-neighbourhood approach connecting the old core to Keamari district, Baldia and the Balochistan side.",
      remember: "Port traffic is heavy here; a nearby point can be slow to reach even when it looks close on the map.",
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
      title: "Saddar is an area, a subdivision—and a feeling.",
      body: "The historic commercial core gives newcomers their first dense chain of landmarks.",
      alt: "The historic Empress Market building in Saddar, Karachi",
    },
    "mazar-e-quaid": {
      title: "A landmark can orient a whole side of town.",
      body: "Mazar-e-Quaid sits near the central hinge between the old core, Jamshed side and the northbound spine.",
      alt: "Mazar-e-Quaid’s white marble mausoleum seen from its garden",
    },
    "jinnah-airport": {
      title: "The eastern gateway",
      body: "Choose the exact terminal pin: Airport, Star Gate and Jinnah Terminal are not interchangeable destinations.",
      alt: "The terminal at Karachi’s Jinnah International Airport",
    },
    "karachi-port": {
      title: "The city began by the harbour",
      body: "Karachi Port grew beside the old city; Port Qasim belongs to a different, far-southeastern industrial landscape.",
      alt: "Ships and harbour cranes on the water at Karachi Port",
    },
    "clifton-skyline": {
      title: "The coast is a compass—not just a destination",
      body: "Clifton’s skyline faces the Arabian Sea, the fixed southern edge that makes the rest of the city easier to read.",
      alt: "Clifton’s apartment skyline beside the Arabian Sea in Karachi",
    },
  },
  journeys: {
    eyebrow: "Apply the model",
    title: "Six trips. One algorithm.",
    intro: "Orient by the sea. Join a spine. Transfer at an anchor. Finish the last mile.",
    items: {
      "airport-to-saddar": {
        title: "Jinnah International Airport → Saddar",
        steps: [
          "Leave the airport onto the main city spine — Malir Halt/Natha Khan are outward-side markers; Karsaz, Nursery and FTC mean the centre is getting closer.",
          "Turn off around Metropole for the exact Saddar stop — Saddar is not a single pin; name Empress, Regal, Lucky Star or the exact hotel/office.",
        ],
        note: "Shahrah-e-Faisal is the one-road explanation of how the airport connects to central Karachi.",
      },
      "surjani-to-numaish": {
        title: "Surjani Town → Numaish / Mazar-e-Quaid",
        steps: [
          "Follow the north–centre axis inward — Nagan, Ayesha Manzil, Liaquatabad and Teen Hatti are the descending milestones toward the inner city.",
          "Finish at the Numaish hub — Numaish sits beside the Mazar and connects onward toward Tower or east toward University Road.",
        ],
        note: "Central Karachi is a north–south ladder whose useful rungs are named junctions.",
      },
      "nipa-to-tower": {
        title: "NIPA Chowrangi → Tower",
        steps: [
          "Travel inward on University Road — Hasan Square and Jail Chowrangi show progress from East Karachi into the inner city.",
          "Cross the old-city axis from Numaish to Tower — Tibet Centre and Jama Cloth are old-city milestones; Tower is the port-side end.",
        ],
        note: "NIPA → Numaish → Tower is the simplest east-to-old-city chain to memorise.",
      },
      "korangi-to-numaish": {
        title: "Korangi Crossing → Numaish",
        steps: [
          "Move inward along the Korangi spine — Qayyumabad and Kala Pul are the bridge points between industrial Korangi and central Karachi.",
          "Use the centre-side cross connection — FTC/Nursery marks where the Korangi approach meets the main airport–centre spine.",
        ],
        note: "Korangi connects to the centre through a small set of river/road crossings, so those names control the trip.",
      },
      "orangi-to-tower": {
        title: "Orangi No. 5 → Tower",
        steps: [
          "Exit the north-west through a named pass — Banaras is the key hinge; Board Office and SITE are different onward directions.",
          "Approach the old core from the west — Gulbai/ICI and Tower explain the freight-heavy western side of central Karachi.",
        ],
        note: "To understand West, first identify which pass—Banaras, Board Office, Manghopir or Hub River—the trip uses.",
      },
      "port-to-port": {
        title: "Port Qasim → Karachi Port / Keamari",
        steps: [
          "Leave the far eastern port on the National Highway — Steel Town, Quaidabad, Malir 15 and Malir Halt count back toward the continuous city.",
          "Cross the metropolitan centre — the airport–centre spine carries you toward Saddar before the old-city/harbour approach.",
          "Finish on the western harbour side — Tower and Keamari belong to the western port system, many kilometres from Port Qasim.",
        ],
        note: "Karachi has two major port worlds at opposite ends of the built-up metropolis.",
      },
    },
  },
  explorer: {
    eyebrow: "Where is…?",
    title: "Attach a name to the city.",
    searchLabel: "Search Karachi places, districts and roads",
    placeholder: "Try Guru Mandir, NIPA, Malir 15…",
    noResults: "No curated match yet. Try an area, junction or gateway.",
    kindLabels: { district: "district", corridor: "road spine", place: "place" },
  },
  safety: {
    eyebrow: "Move like a local",
    title: "Plan the trip. Then check live.",
    body: "This guide gives you the mental map—not live traffic or emergency routing. Before leaving, confirm the exact pin, terminal or stop, current route status, traffic, rain and closures.",
    rules: [
      "Area + block + landmark + live pin",
      "Share trip details with someone you trust",
      "Never enter unknown standing water",
      "Keep valuables discreet in traffic and crowds",
    ],
    saveOffline: "Save these offline",
    emergencyTitle: "Emergency numbers",
    verifiedNote: "Numbers verified 13 Aug 2026. In an emergency, use the service appropriate to your situation.",
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
    eyebrow: "30-second check",
    title: "Do you understand Karachi now?",
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
    wrongSuffix: "— try again",
    wrongFeedback: "Not quite—try another answer.",
  },
  cheatSheet: {
    eyebrow: "Karachi in one screen",
    title: "Keep the anchors. Forget the overwhelm.",
    print: "Print cheat sheet",
    cards: [
      { label: "01 · COMPASS", body: "Sea south · old core southwest · airport east · M-9 northeast · Hub west." },
      { label: "02 · DISTRICTS", body: "South · Keamari · West · Central · East · Korangi · Malir." },
      { label: "03 · SPINES", body: "North/M-9 · airport/N-5 · University Road · Korangi/Landhi · port/Hub." },
      { label: "04 · TRIP RULE", body: "Orient → join a spine → transfer at an anchor → finish the last mile." },
    ],
  },
  footer: {
    description: "An independent educational orientation guide. Not an official navigation, emergency, or live-service product.",
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
