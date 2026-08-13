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

test("server-renders the complete Karachi learning journey", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Understand Karachi/);
  assert.match(html, /<html lang="ur-Latn-PK">/);
  assert.match(html, /Karachi ko ratne ki zarurat nahi/);
  assert.match(html, /Samandar neeche\. Purana shehar neeche-baen/);
  assert.match(html, /<option value="ur-roman" selected="">Roman Urdu/);
  assert.match(html, /<option value="en">English/);
  assert.match(html, />7<\/b>zilay/);
  assert.match(html, /Public transport · 13 Aug 2026/);
  assert.match(html, /Emergency numbers/);
  assert.match(html, /Ek screen mein Karachi/);
  assert.match(html, /OpenStreetMap contributors/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/);
});

test("ships valid, attributed local map and media assets", async () => {
  const [districtRaw, networkRaw, dataReadme, packageRaw, pageSource] = await Promise.all([
    readFile(new URL("../public/data/karachi-districts.geojson", import.meta.url), "utf8"),
    readFile(new URL("../public/data/karachi-network.geojson", import.meta.url), "utf8"),
    readFile(new URL("../public/data/README.md", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/StoryExperience.tsx", import.meta.url), "utf8"),
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
});
