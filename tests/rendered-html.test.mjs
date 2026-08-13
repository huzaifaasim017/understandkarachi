import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the direct Roman Urdu Karachi guide by default", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Understand Karachi/);
  assert.match(html, /<html lang="ur-Latn-PK">/);
  assert.match(html, />Karachi ko zero se samjhein\.<\/h1>/);
  assert.match(html, /Samandar south mein hai\./);
  assert.match(html, /<option value="ur-roman" selected="">Roman Urdu/);
  assert.match(html, /<option value="en">English/);
  assert.match(html, /aria-label="Guide ki zabaan chunein"/);
  assert.match(html, />7<\/b>zilay/);
  assert.match(html, /6 asal safar/);
  assert.match(html, /Jagah search karein/);
  assert.match(html, /Nikalne se pehle check karein/);
  assert.match(html, /Karachi crossing samjhein/);
  assert.match(html, /MODE/);
  assert.match(html, /Hyderabad side via Thatta \/ N-5 → Hub \/ N-25/);
  assert.match(html, /Motorcycles motorways par prohibited hain/);
  assert.match(html, /1915/);
  assert.match(html, /130/);
  assert.match(html, /Meri location ka andaza/);
  assert.match(html, /logo-mark\.svg/);
  assert.match(html, /site\.webmanifest/);
  assert.match(html, /Emergency numbers/);
  assert.match(html, /3 sawal/);
  assert.match(html, /Karachi: 4 cheezen yaad rakhein/);
  assert.match(html, /aria-keyshortcuts="\/"/);
  assert.match(html, /role="group" aria-labelledby="q1-label"/);
  for (const photo of ["empress-market", "mazar-e-quaid", "jinnah-airport", "karachi-port", "clifton-skyline"]) {
    assert.ok(html.includes(`src="/photos/${photo}.jpg"`), `missing rendered photo: ${photo}`);
  }
  assert.match(html, /aria-label="Tasveer ka source aur credit:/);
  assert.match(html, /OpenStreetMap contributors/);

  assert.doesNotMatch(html, /Scroll se banta zehni naqsha/);
  assert.doesNotMatch(html, /Karachi ko ratne ki zarurat nahi/);
  assert.doesNotMatch(html, /SAB SE ZAROORI QAIDA/);
  assert.doesNotMatch(html, /Yeh yaad rakhein/);
  assert.doesNotMatch(html, /class="(?:kicker|hero-coordinate|hero-promise|opening-statement|step-eyebrow|remember|journey-note|section-eyebrow|city-pause)"/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/);
});

test("ships bilingual direct copy and valid, attributed map and media assets", async () => {
  const [districtRaw, networkRaw, dataReadme, packageRaw, pageSource, mapSource, i18nSource, mapEntitiesSource, crossingSource, agentsSource, faviconSource, manifestSource] = await Promise.all([
    readFile(new URL("../public/data/karachi-districts.geojson", import.meta.url), "utf8"),
    readFile(new URL("../public/data/karachi-network.geojson", import.meta.url), "utf8"),
    readFile(new URL("../public/data/README.md", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/StoryExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/KarachiMap.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/karachi-i18n.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/features/map/map-entities.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/features/cross-city/crossCityData.ts", import.meta.url), "utf8"),
    readFile(new URL("../AGENTS.md", import.meta.url), "utf8"),
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
    new Set(["south", "keamari", "west", "central", "east", "korangi", "malir"]),
  );

  assert.equal(network.type, "FeatureCollection");
  assert.match(network.metadata.precision, /not routable/i);
  assert.ok(network.features.some((feature) => feature.properties.id === "green-line"));
  assert.ok(network.features.some((feature) => feature.properties.id === "malir-river"));
  assert.match(dataReadme, /Open Database License/);
  assert.match(dataReadme, /not an OpenStreetMap road extract/);
  assert.doesNotMatch(packageRaw, /react-loading-skeleton/);
  assert.match(pageSource, /prefers-reduced-motion/);
  assert.match(pageSource, /aria-keyshortcuts|searchInputRef/);
  for (const interactionContract of [
    /active-route-hit/,
    /anchor-hit/,
    /transit-hit/,
    /dragRotate\.disable\(\)/,
    /touchZoomRotate\.disableRotation\(\)/,
    /CHECKPOINT ORDER · NOT ROAD GEOMETRY/,
  ]) assert.match(mapSource, interactionContract);
  assert.match(i18nSource, /title: "Karachi ko zero se samjhein\."/);
  assert.match(i18nSource, /title: "Understand Karachi from zero\."/);
  assert.match(i18nSource, /DEFAULT_LOCALE: Locale = "ur-roman"/);
  assert.match(i18nSource, /title: "6 asal safar"/);
  assert.match(i18nSource, /title: "6 example trips"/);
  assert.match(i18nSource, /title: "Jagah search karein"/);
  assert.match(i18nSource, /title: "Search a place"/);
  assert.match(i18nSource, /title: "Nikalne se pehle check karein"/);
  assert.match(i18nSource, /title: "Check before leaving"/);
  for (const mappedId of ["north-spine", "airport-spine", "university-spine", "korangi-spine", "west-spine", "lyari-expressway"]) {
    assert.match(mapEntitiesSource, new RegExp(`"${mappedId}"`));
  }
  assert.match(crossingSource, /nha-motorway-motorcycle-policy/);
  assert.match(crossingSource, /featureIds: checkpointFeatureIds/);
  assert.match(crossingSource, /satisfies Readonly<Record<CrossCityCheckpointId/);
  assert.doesNotMatch(crossingSource, /closestPointFeatureId|closestCorridorId/);
  assert.match(agentsSource, /canonical operating guide/);
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
    "../docs/rfcs/0001-traveller-crossing-model.md",
    "../docs/specs/cross-city-guidance.md",
    "../docs/specs/map-interaction.md",
  ];
  await Promise.all(required.map((path) => readFile(new URL(path, import.meta.url), "utf8")));

  const packageRaw = await readFile(new URL("../package.json", import.meta.url), "utf8");
  assert.doesNotMatch(packageRaw, /drizzle|db:generate/);
  assert.match(packageRaw, /"typecheck"/);
});
