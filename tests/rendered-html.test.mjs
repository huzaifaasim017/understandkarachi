import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const districtCases = [
  { id: "south", name: "South", marker: "Samandar ke saath inner south", routeAnchor: "Jama Cloth" },
  { id: "keamari", name: "Keamari", marker: "South-west harbour se Hub River", routeAnchor: "Yousuf Goth" },
  { id: "west", name: "West", marker: "Hilly north-west: Orangi", routeAnchor: "TMA Orangi" },
  { id: "central", name: "Central", marker: "Compact middle-north: Liaquatabad", routeAnchor: "Ayesha Manzil" },
  { id: "east", name: "East", marker: "Inner centre ke east: Gulshan", routeAnchor: "Karachi University" },
  { id: "korangi", name: "Korangi", marker: "South-east residential/industrial belt", routeAnchor: "Korangi Crossing" },
  { id: "malir", name: "Malir", marker: "Bohat bara east/north-east envelope", routeAnchor: "Port Qasim turn" },
];

let workerPromise;

function getWorker() {
  if (!workerPromise) {
    const workerUrl = new URL("../dist/server/index.js", import.meta.url);
    workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
    workerPromise = import(workerUrl.href).then(({ default: worker }) => worker);
  }
  return workerPromise;
}

async function render(pathname = "/") {
  assert.ok(pathname.startsWith("/"), `expected an absolute pathname, received ${pathname}`);
  const worker = await getWorker();

  return worker.fetch(
    new Request(new URL(pathname, "http://localhost"), { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

function assertDefaultLocaleControls(html) {
  assert.match(html, /<html lang="ur-Latn-PK">/);
  assert.match(html, /<option value="ur-roman" selected="">Roman Urdu/);
  assert.match(html, /<option value="en">English/);
  assert.match(html, /aria-label="Guide ki zabaan chunein"/);
}

test("server-renders the Roman Urdu overview with the informative Karachi 3D fallback", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Understand Karachi/);
  assertDefaultLocaleControls(html);
  assert.match(html, />Karachi ko zero se samjhein\.<\/h1>/);
  assert.match(html, /aria-label="Karachi ke saat zilon aur bari roads ka 3D naqsha"/);
  assert.match(html, /class="intro-world-canvas"/);
  assert.match(html, /Karachi geometry load ho rahi hai/);
  assert.match(html, /class="intro-district-buttons"/);
  assert.match(html, /class="intro-map-detail" aria-live="polite"/);

  for (const { id, name } of districtCases) {
    assert.ok(html.includes(`>${name}</button>`), `missing DOM district control: ${name}`);
    assert.ok(html.includes(`href="/districts/${id}"`), `missing deep-dive link: ${id}`);
  }

  assert.match(html, />7<\/b>zilay/);
  assert.match(html, /Samandar south mein hai\./);
  assert.match(html, /6 asal safar/);
  assert.match(html, /Jagah search karein/);
  assert.match(html, /Nikalne se pehle check karein/);
  assert.match(html, /Meri location ka andaza/);
  assert.match(html, /aria-keyshortcuts="\/"/);
  assert.match(html, /role="group" aria-labelledby="q1-label"/);
  assert.match(html, /logo-mark\.svg/);
  assert.match(html, /site\.webmanifest/);
  assert.match(html, /Emergency numbers/);
  assert.match(html, /3 sawal/);
  assert.match(html, /Karachi: 4 cheezen yaad rakhein/);
  assert.match(html, /OpenStreetMap contributors/);

  // The crossing exercise is now an explicit secondary route, not part of the overview lesson.
  assert.match(html, /href="\/crossings"/);
  assert.match(html, />Karachi crossing guide</);
  assert.doesNotMatch(html, /id="cross-city"/);
  assert.doesNotMatch(html, /Karachi crossing samjhein/);
  assert.doesNotMatch(html, />MODE</);
  assert.doesNotMatch(html, /Hyderabad side via Thatta \/ N-5 → Hub \/ N-25/);

  // The removed Animation/Still control must not return in the header or hero.
  assert.doesNotMatch(html, /class="motion-toggle"/);
  assert.doesNotMatch(html, /class="intro-motion-control"/);
  assert.doesNotMatch(html, /Animation on ya off karein/);
  assert.doesNotMatch(html, /3D harkat rokain|3D harkat chalayein/);
  assert.doesNotMatch(html, />Still</);
  assert.doesNotMatch(html, />Animation</);

  assert.doesNotMatch(html, /Scroll se banta zehni naqsha/);
  assert.doesNotMatch(html, /Karachi ko ratne ki zarurat nahi/);
  assert.doesNotMatch(html, /SAB SE ZAROORI QAIDA/);
  assert.doesNotMatch(html, /Yeh yaad rakhein/);
  assert.doesNotMatch(html, /class="(?:kicker|hero-coordinate|hero-promise|opening-statement|step-eyebrow|remember|journey-note|section-eyebrow|city-pause)"/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/);
});

test("serves the complete crossing lesson only on its dedicated page", async () => {
  const response = await render("/crossings");
  assert.equal(response.status, 200);
  const html = await response.text();
  assertDefaultLocaleControls(html);

  assert.match(html, /id="cross-city"/);
  assert.match(html, /aria-label="Karachi crossing samajhne ki guide"/);
  assert.match(html, />Karachi crossing samjhein<\/h2>/);
  assert.match(html, /Har crossing ka formula/);
  for (const stage of ["MODE", "GATE", "SPINE", "HUB", "LOCAL"]) {
    assert.match(html, new RegExp(`>${stage}<`));
  }
  assert.match(html, /Hub \/ N-25 → Thatta \/ N-5/);
  assert.match(html, /Motorcycles motorways par prohibited hain/);
  assert.match(html, /NHMP 130/);
  assert.match(html, /1915/);
  assert.match(html, /href="\/districts"/);
  assert.match(html, /href="\/"/);
});

test("serves a seven-district index with a no-WebGL DOM path", async () => {
  const response = await render("/districts");
  assert.equal(response.status, 200);
  const html = await response.text();
  assertDefaultLocaleControls(html);

  assert.match(html, /<title>Karachi District Atlas/);
  assert.match(html, />Har district ko alag samjhein<\/h1>/);
  assert.match(html, /Position, zones, bari roads aur pehchan points\./);
  assert.match(html, /aria-label="Karachi ke saat zilon aur bari roads ka 3D naqsha"/);
  assert.match(html, /class="intro-district-buttons"/);

  for (const { id, name, marker } of districtCases) {
    assert.ok(html.includes(`href="/districts/${id}"`), `district index is missing ${id}`);
    assert.match(html, new RegExp(`>${name}<\\/h2>`));
    assert.match(html, new RegExp(marker));
  }
  assert.equal((html.match(/>District kholein</g) ?? []).length, 7);
  assert.doesNotMatch(html, /id="cross-city"/);
});

test("serves source-backed deep pages for every Karachi district", async () => {
  for (const { id, name, marker, routeAnchor } of districtCases) {
    const response = await render(`/districts/${id}`);
    assert.equal(response.status, 200, `failed route: /districts/${id}`);
    const html = await response.text();
    assertDefaultLocaleControls(html);

    assert.match(html, new RegExp(`<title>${name} District`));
    assert.match(html, new RegExp(`<h1>${name}<\\/h1>`));
    assert.match(html, new RegExp(marker));
    assert.match(html, new RegExp(routeAnchor));
    assert.match(html, />Pehla rule<\/h2>/);
    assert.match(html, />Road chains<\/h2>/);
    assert.match(html, /Names isi order mein parhein; line schematic hai, turn-by-turn route nahi\./);
    assert.match(html, />Areas aur anchors<\/h2>/);
    assert.match(html, />Official subdivisions<\/h2>/);
    assert.match(html, />Naam ka confusion<\/h2>/);
    assert.match(html, />References<\/h2>/);
    assert.match(html, /Source snapshot 14 August 2026/);
    assert.match(html, /Map par district, road ya landmark select karke detail parhein\./);
    assert.match(html, /href="https:\/\//);
    assert.match(html, /aria-label="District map"/);
  }
});

test("renders corrected, readable photo captions with complete attribution metadata", async () => {
  const response = await render();
  const html = await response.text();

  const photos = [
    {
      file: "empress-market.jpg",
      year: "2016",
      creator: "Furqanlw",
      source: "https://commons.wikimedia.org/wiki/File:Empress_Market,_Karachi.jpg",
      caption: "Empress Market, Saddar ka historic commercial core.",
    },
    {
      file: "mazar-e-quaid.jpg",
      year: "2015",
      creator: "Farrah Zakir (Farrah0001)",
      source: "https://commons.wikimedia.org/wiki/File:Mausoleum_of_the_quaid_e_azam_muhammad_ali_jinnah_farrah_1.jpg",
      caption: "Mazar-e-Quaid: old core aur northbound spine ke darmiyan.",
    },
    {
      file: "jinnah-airport.jpg",
      year: "2005",
      creator: "Swerveut",
      source: "https://commons.wikimedia.org/wiki/File:Karachi_Jinnah_Airport.jpg",
      caption: "Jinnah Terminal airport approach se — source image 2005 ki hai.",
    },
    {
      file: "karachi-port.jpg",
      year: "2022",
      creator: "King Eliot",
      source: "https://commons.wikimedia.org/wiki/File:Karachi_Seaport.jpg",
      caption: "Karachi seaport par container cranes — tasveer 2022 ki hai.",
    },
    {
      file: "clifton-skyline.jpg",
      year: "2015",
      creator: "Ahmad Haq (Ahmadtamiz)",
      source: "https://commons.wikimedia.org/wiki/File:Karachi_Clifton_Skyline.JPG",
      caption: "Clifton skyline — tasveer 2015 ki hai.",
    },
  ];

  for (const photo of photos) {
    assert.ok(html.includes(photo.file), `missing rendered image: ${photo.file}`);
    assert.ok(html.includes(photo.source), `missing source link: ${photo.file}`);
    assert.ok(html.includes(photo.creator), `missing creator: ${photo.file}`);
    assert.ok(html.includes(photo.caption), `missing corrected caption: ${photo.file}`);
    assert.ok(
      html.includes(`Tasveer ka saal<!-- -->: <!-- -->${photo.year}`),
      `missing capture year: ${photo.file}`,
    );
  }
  assert.equal((html.match(/Asal tasveer se resize ki gayi/g) ?? []).length, 5);
  assert.equal((html.match(/Wikimedia Commons/g) ?? []).length >= 5, true);
  assert.match(html, /CC BY-SA 4\.0/);
  assert.match(html, /Public domain/);
  assert.doesNotMatch(html, /Star Gate, and Jinnah Terminal are different points/);
});

test("keeps Roman Urdu as the default and ships English parity for every v4 surface", async () => {
  const [i18nSource, preferencesSource, atlasSource, crossingSource, introSource] = await Promise.all([
    readFile(new URL("../app/karachi-i18n.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/features/preferences.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/features/districts/districtAtlasData.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/features/cross-city/crossCityData.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/IntroWorld.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(i18nSource, /DEFAULT_LOCALE: Locale = "ur-roman"/);
  assert.match(i18nSource, /title: "Karachi ko zero se samjhein\."/);
  assert.match(i18nSource, /title: "Understand Karachi from zero\."/);
  assert.match(i18nSource, /title: "6 asal safar"/);
  assert.match(i18nSource, /title: "6 example trips"/);
  assert.match(i18nSource, /title: "Jagah search karein"/);
  assert.match(i18nSource, /title: "Search a place"/);
  assert.match(i18nSource, /title: "Nikalne se pehle check karein"/);
  assert.match(i18nSource, /title: "Check before leaving"/);
  assert.match(preferencesSource, /\(\) => DEFAULT_LOCALE/);
  assert.match(preferencesSource, /document\.documentElement\.lang = locale === "ur-roman" \? "ur-Latn-PK" : "en"/);

  assert.match(atlasSource, /title: "Har district ko alag samjhein"/);
  assert.match(atlasSource, /title: "Understand every district separately"/);
  assert.match(atlasSource, /line schematic hai, turn-by-turn route nahi/);
  assert.match(atlasSource, /line is schematic, not turn-by-turn navigation/);
  assert.equal((atlasSource.match(/districtId: "/g) ?? []).length, 7);
  for (const { id } of districtCases) assert.match(atlasSource, new RegExp(`districtId: "${id}"`));

  assert.match(crossingSource, /title: "Karachi crossing samjhein"/);
  assert.match(crossingSource, /title: "Understand a Karachi crossing"/);
  assert.match(crossingSource, /Choose your mode, then read the crossing in five parts\./);
  assert.match(crossingSource, /M-9 is not offered/);

  assert.match(introSource, /3D naqsha/);
  assert.match(introSource, /3D map of Karachi's seven districts and major roads/);
  assert.match(introSource, /fetch\("\/data\/karachi-districts\.geojson"\)/);
  assert.match(introSource, /new THREE\.ExtrudeGeometry/);
  assert.match(introSource, /districts\.map\(\(district\) =>/);
  assert.doesNotMatch(introSource, /GlobeGeometry|earthTexture|worldTexture|Earth map/i);
});

test("ships valid, attributed map assets and current source metadata", async () => {
  const [districtRaw, networkRaw, dataReadme, packageRaw, pageSource, mapSource, mapEntitiesSource, crossingSource, dataSource, faviconSource, manifestSource] = await Promise.all([
    readFile(new URL("../public/data/karachi-districts.geojson", import.meta.url), "utf8"),
    readFile(new URL("../public/data/karachi-network.geojson", import.meta.url), "utf8"),
    readFile(new URL("../public/data/README.md", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/StoryExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/KarachiMap.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/features/map/map-entities.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/features/cross-city/crossCityData.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/karachi-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../public/favicon.svg", import.meta.url), "utf8"),
    readFile(new URL("../public/site.webmanifest", import.meta.url), "utf8"),
  ]);

  const districts = JSON.parse(districtRaw);
  const network = JSON.parse(networkRaw);
  assert.equal(districts.type, "FeatureCollection");
  assert.equal(districts.features.length, 7);
  assert.equal(districts.metadata.license, "ODbL 1.0");
  assert.deepEqual(
    new Set(districts.features.map((feature) => feature.properties.id)),
    new Set(districtCases.map(({ id }) => id)),
  );

  assert.equal(network.type, "FeatureCollection");
  assert.match(network.metadata.precision, /not routable/i);
  assert.ok(network.features.some((feature) => feature.properties.id === "green-line"));
  assert.ok(network.features.some((feature) => feature.properties.id === "malir-river"));
  assert.match(dataReadme, /Open Database License/);
  assert.match(dataReadme, /not an OpenStreetMap road extract/);
  assert.doesNotMatch(packageRaw, /react-loading-skeleton/);
  assert.match(pageSource, /aria-keyshortcuts|searchInputRef/);
  assert.doesNotMatch(pageSource, /<CrossCityGuide/);
  for (const interactionContract of [
    /active-route-hit/,
    /anchor-hit/,
    /transit-hit/,
    /dragRotate\.disable\(\)/,
    /touchZoomRotate\.disableRotation\(\)/,
    /CHECKPOINT ORDER · NOT ROAD GEOMETRY/,
  ]) assert.match(mapSource, interactionContract);
  for (const mappedId of ["north-spine", "airport-spine", "university-spine", "korangi-spine", "west-spine", "lyari-expressway"]) {
    assert.match(mapEntitiesSource, new RegExp(`"${mappedId}"`));
  }
  assert.match(crossingSource, /nha-motorway-motorcycle-policy/);
  assert.match(crossingSource, /featureIds: checkpointFeatureIds/);
  assert.match(crossingSource, /satisfies Readonly<Record<CrossCityCheckpointId/);
  assert.doesNotMatch(crossingSource, /closestPointFeatureId|closestCorridorId/);

  assert.match(dataSource, /dataVerifiedOn: IsoDate = "2026-08-14"/);
  assert.match(dataSource, /pbs\.gov\.pk\/wp-content\/uploads\/census_tables\/tables\/table_1_sindh_province\.pdf/);
  assert.doesNotMatch(dataSource, /sites\/default\/files\/population\/2023\/(?:Sindh|sindh\/pcr\/table_1)\.pdf/);
  assert.equal((dataSource.match(/capturedOn: "20/g) ?? []).length, 5);
  assert.match(dataSource, /capturedOn: "2005-10-25"/);
  assert.match(dataSource, /sourceUrl: "https:\/\/commons\.wikimedia\.org\/wiki\/File:Karachi_Jinnah_Airport\.jpg"/);

  assert.match(faviconSource, /Understand Karachi/);
  const manifest = JSON.parse(manifestSource);
  assert.equal(manifest.name, "Understand Karachi");
  assert.deepEqual(manifest.icons.map((icon) => icon.sizes), ["192x192", "512x512"]);
});

test("keeps the civic documentation and clean runtime boundary reproducible", async () => {
  const required = [
    "../CLAUDE.md",
    "../CONTRIBUTING.md",
    "../SECURITY.md",
    "../docs/README.md",
    "../docs/project-charter.md",
    "../docs/architecture/system-and-repository-boundaries.md",
    "../docs/adrs/0004-bounded-browser-location-estimate.md",
    "../docs/adrs/0005-static-multi-page-learning-surfaces.md",
    "../docs/rfcs/0001-traveller-crossing-model.md",
    "../docs/rfcs/0002-district-atlas-and-route-separation.md",
    "../docs/specs/cross-city-guidance.md",
    "../docs/specs/district-deep-dives.md",
    "../docs/specs/map-interaction.md",
    "../docs/plans/district-atlas-v4.md",
  ];
  await Promise.all(required.map((path) => readFile(new URL(path, import.meta.url), "utf8")));

  const packageRaw = await readFile(new URL("../package.json", import.meta.url), "utf8");
  assert.doesNotMatch(packageRaw, /drizzle|db:generate/);
  assert.match(packageRaw, /"typecheck"/);
});
