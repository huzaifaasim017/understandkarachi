import fs from "node:fs";
import path from "node:path";

const input = path.resolve("work/karachi-districts-overpass.json");
const output = path.resolve("public/data/karachi-districts.geojson");

const metadata = {
  16347667: { id: "west", name: "West", osmName: "Orangi District", familiar: "Karachi West", color: "#E98F72", label: [66.994, 24.994] },
  16349281: { id: "central", name: "Central", osmName: "Nazimabad District", familiar: "Karachi Central", color: "#F3C76B", label: [67.044, 24.952] },
  16350242: { id: "east", name: "East", osmName: "Gulshan District", familiar: "Karachi East", color: "#6FC5B5", label: [67.105, 24.933] },
  16350632: { id: "korangi", name: "Korangi", osmName: "Korangi District", familiar: "Korangi", color: "#A88CC8", label: [67.135, 24.847] },
  16350836: { id: "south", name: "South", osmName: "Karachi District", familiar: "Karachi South", color: "#F06F55", label: [67.032, 24.862] },
  16351022: { id: "keamari", name: "Keamari", osmName: "Keamari District", familiar: "Keamari", color: "#4AA5B3", label: [66.91, 24.888] },
  16351916: { id: "malir", name: "Malir", osmName: "Malir District", familiar: "Malir", color: "#94B76A", label: [67.325, 25.042] },
};

const same = (a, b) => a[0] === b[0] && a[1] === b[1];

function signedArea(ring) {
  return ring.slice(0, -1).reduce((area, point, index) => {
    const next = ring[index + 1];
    return area + point[0] * next[1] - next[0] * point[1];
  }, 0) / 2;
}

function counterClockwise(ring) {
  return signedArea(ring) < 0 ? [...ring].reverse() : ring;
}

function stitch(segments) {
  const remaining = segments.map((segment) => [...segment]);
  const rings = [];

  while (remaining.length) {
    const ring = remaining.shift();
    let guard = 0;

    while (!same(ring[0], ring.at(-1)) && remaining.length && guard < 10_000) {
      const end = ring.at(-1);
      const index = remaining.findIndex((segment) => same(segment[0], end) || same(segment.at(-1), end));
      if (index === -1) break;
      const [next] = remaining.splice(index, 1);
      if (same(next.at(-1), end)) next.reverse();
      ring.push(...next.slice(1));
      guard += 1;
    }

    if (!same(ring[0], ring.at(-1))) {
      throw new Error(`Could not close district ring. Started ${ring[0]}, ended ${ring.at(-1)}`);
    }
    rings.push(ring);
  }

  return rings;
}

const overpass = JSON.parse(fs.readFileSync(input, "utf8"));
const features = overpass.elements.map((relation) => {
  const info = metadata[relation.id];
  if (!info) throw new Error(`Missing metadata for relation ${relation.id}`);

  const innerMembers = relation.members.filter((member) => member.type === "way" && member.role === "inner");
  if (innerMembers.length) {
    throw new Error(`Relation ${relation.id} contains inner rings; assign them to their outer polygon before rebuilding.`);
  }

  const segments = relation.members
    .filter((member) => member.type === "way" && member.role === "outer" && member.geometry)
    .map((member) => member.geometry.map(({ lon, lat }) => [lon, lat]));
  const rings = stitch(segments).map(counterClockwise);

  return {
    type: "Feature",
    id: info.id,
    properties: {
      ...info,
      osmRelation: relation.id,
      source: "OpenStreetMap contributors",
      snapshot: "2026-08-13",
    },
    geometry: rings.length === 1
      ? { type: "Polygon", coordinates: rings }
      : { type: "MultiPolygon", coordinates: rings.map((ring) => [ring]) },
  };
});

fs.mkdirSync(path.dirname(output), { recursive: true });
const collection = {
  type: "FeatureCollection",
  metadata: {
    title: "Karachi district orientation boundaries",
    source: "OpenStreetMap contributors",
    license: "ODbL 1.0",
    licenseUrl: "https://www.openstreetmap.org/copyright",
    snapshot: "2026-08-13",
    precision: "Administrative orientation only; not a cadastral or statistical-area measurement layer",
  },
  features,
};

fs.writeFileSync(output, `${JSON.stringify(collection)}\n`);
console.log(`Wrote ${features.length} district features to ${output}`);
