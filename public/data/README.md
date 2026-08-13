# Map data provenance

Last reviewed: 2026-08-13.

## `karachi-districts.geojson`

The seven district shapes are a dated OpenStreetMap snapshot built from relations `16347667`, `16349281`, `16350242`, `16350632`, `16350836`, `16351022`, and `16351916` with this Overpass query:

```overpass
[out:json][timeout:90];
relation(id:16347667,16349281,16350242,16350632,16350836,16351022,16351916);
out geom;
```

Source: © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), licensed under the [Open Data Commons Open Database License](https://opendatacommons.org/licenses/odbl/1-0/). The relation members were stitched into local polygons and given familiar names, colours, and label points. Current relations contained no inner rings at extraction time.

The polygons are for orientation. They may include broad maritime or peripheral administrative extents, so their apparent map area is not directly comparable with the Census 2023 land-area figures printed in the guide.

## `karachi-network.geojson`

This is a project-authored schematic layer, not an OpenStreetMap road extract. Corridor lines, anchor points, and drainage lines were manually simplified to teach city-scale direction. Transit status and route descriptions were checked against Sindh Mass Transit Authority, TransKarachi, Asian Development Bank, World Bank, and Sindh Assembly sources listed in the page footer.

The layer is not suitable for routing, surveying, flood-depth interpretation, stop-level navigation, or estimating travel time. Operating transport means it appeared in an official current directory on the review date; same-day service must still be checked.

The live OpenFreeMap basemap has its own attribution displayed by MapLibre and is not frozen to the overlay review date.
