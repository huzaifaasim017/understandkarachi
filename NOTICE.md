# Third-party notices

> Status: active · Owner: maintainers · Last reviewed: 2026-08-13

This project combines original application code with third-party open data,
basemap tiles, software, fonts, icons, and photographs. This notice is a
navigation aid, not a replacement for the license text supplied by each source.

## Map data and basemap

- District boundaries are derived from OpenStreetMap contributors and are
  subject to the Open Data Commons Open Database License 1.0. Extraction IDs,
  transformation notes, and limitations are documented in
  [public/data/README.md](public/data/README.md).
- The live basemap is provided by OpenFreeMap and carries attribution in the map
  control. OpenStreetMap attribution must remain visible where required.
- `karachi-network.geojson` is a project-authored schematic teaching layer. It
  is not a routable road extract.

## Photographs

The local files under `public/photos/` come from Wikimedia Commons source pages.
Creator, source-page, license, dimensions, and local filename are recorded in
`photoManifest` in `app/karachi-data.ts` and displayed with the photograph.
Preserve those records and on-page credits when replacing or re-encoding media.

## Software and fonts

Runtime and development packages retain their upstream licenses. Notable
projects include React, vinext, MapLibre GL JS, Three.js, Lucide, Tailwind CSS,
Cloudflare tooling, and the Geist fonts. Consult `package-lock.json` and each
package's distributed license for the complete dependency inventory.

No project-level license is asserted by this notice. Redistribution rights for
the repository itself require an explicit license decision by the owner.
