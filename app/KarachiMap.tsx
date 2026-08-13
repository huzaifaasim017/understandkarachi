"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FilterSpecification, Map as MapLibreMap } from "maplibre-gl";
import type { Locale } from "./karachi-i18n";
import MapDetailsCard from "./features/map/MapDetailsCard";
import {
  NETWORK_POINT_TO_PLACE,
  detailedCorridorsGeoJson,
  placesGeoJson,
  resolveMapEntity,
  toEntityRef,
  type MapEntityRef,
} from "./features/map/map-entities";

export type MapChapter = {
  id: string;
  mode: "context" | "districts" | "corridors" | "transit" | "gateways" | "water" | "explore";
  district?: string;
  corridor?: string;
  detailCorridor?: string;
  center?: [number, number];
  zoom?: number;
  pitch?: number;
};

export type MapRouteOverlay = {
  id: string;
  name: string;
  checkpoints: readonly {
    id: string;
    label: string;
    stage: string;
    coordinates: readonly [number, number];
  }[];
  selectedCheckpointId?: string;
};

type KarachiMapProps = {
  chapter: MapChapter;
  reducedMotion: boolean;
  locale: Locale;
  selectedPlace?: { name: string; coordinates: [number, number] } | null;
  interactive?: boolean;
  inspectable?: boolean;
  focusedEntity?: MapEntityRef | null;
  onEntitySelect?: (entity: MapEntityRef | null) => void;
  routeOverlay?: MapRouteOverlay | null;
  onRouteCheckpointSelect?: (checkpointId: string) => void;
  showDetailsCard?: boolean;
};

const corridorIds = ["north-spine", "airport-spine", "university-spine", "korangi-spine", "west-spine", "lyari-expressway"];

const mapCopy = {
  "ur-roman": {
    region: "Karachi ka interactive naqsha",
    failed: "Map ki tafseel abhi load nahi hui — mukammal guide neeche mojood hai.",
    drawing: "Karachi ka naqsha ban raha hai…",
    prepares: "Aap qareeb aayenge to naqsha tayyar hoga…",
    sea: "ARABIAN SEA · SOUTH / NEECHE",
    verified: "Boundary overlay 13 Aug 2026 ko review hua · live basemap ka credit alag diya gaya hai",
    zoomIn: "Nazdeek karein",
    zoomOut: "Door karein",
    toggleAttribution: "Map credits kholein ya band karein",
    inspect: "District, road ya landmark ko tap karein",
    visibleItems: "Map par dikhne wali jagahen",
    conceptualRoute: "NUQTON KI TARTIB · ROAD GEOMETRY NAHI",
  },
  en: {
    region: "Interactive map of Karachi",
    failed: "Map detail unavailable — the complete guide remains below.",
    drawing: "Drawing Karachi…",
    prepares: "Map prepares as you approach…",
    sea: "ARABIAN SEA · SOUTH",
    verified: "Boundary overlay reviewed 13 Aug 2026 · live basemap separately attributed",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    toggleAttribution: "Toggle map attribution",
    inspect: "Tap a district, road, or landmark",
    visibleItems: "Visible map places",
    conceptualRoute: "CHECKPOINT ORDER · NOT ROAD GEOMETRY",
  },
} as const;

export default function KarachiMap({
  chapter,
  reducedMotion,
  locale,
  selectedPlace,
  interactive = false,
  inspectable = interactive,
  focusedEntity,
  onEntitySelect,
  routeOverlay = null,
  onRouteCheckpointSelect,
  showDetailsCard = true,
}: KarachiMapProps) {
  const copy = mapCopy[locale];
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  // These capabilities are fixed for each mounted map instance. Keeping them
  // stable avoids destroying the WebGL map when the motion preference changes;
  // the chapter effect below applies the current motion setting to the camera.
  const initialInteractiveRef = useRef(interactive);
  const initialInspectableRef = useRef(inspectable);
  const initialReducedMotionRef = useRef(reducedMotion);
  const onEntitySelectRef = useRef(onEntitySelect);
  const onRouteCheckpointSelectRef = useRef(onRouteCheckpointSelect);
  const markerRef = useRef<import("maplibre-gl").Marker | null>(null);
  const popupRef = useRef<import("maplibre-gl").Popup | null>(null);
  const selectionScope = `${chapter.id}|${routeOverlay?.id ?? ""}`;
  const selectionScopeRef = useRef(selectionScope);
  const copyRef = useRef(copy);
  const [internalSelection, setInternalSelection] = useState<{ entity: MapEntityRef; scope: string } | null>(null);
  const internalEntity = internalSelection?.scope === selectionScope ? internalSelection.entity : null;
  const selectedEntity = focusedEntity === undefined ? internalEntity : focusedEntity;
  const selectedDetails = useMemo(() => selectedEntity ? resolveMapEntity(selectedEntity, locale) : null, [locale, selectedEntity]);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    onEntitySelectRef.current = onEntitySelect;
  }, [onEntitySelect]);

  useEffect(() => {
    onRouteCheckpointSelectRef.current = onRouteCheckpointSelect;
  }, [onRouteCheckpointSelect]);

  useEffect(() => {
    selectionScopeRef.current = selectionScope;
    copyRef.current = copy;
    popupRef.current?.remove();
    popupRef.current = null;
  }, [copy, selectionScope]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!("IntersectionObserver" in window)) {
      const timer = globalThis.setTimeout(() => setShouldLoad(true), 0);
      return () => globalThis.clearTimeout(timer);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "350px 0px" },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || !containerRef.current || mapRef.current) return;
    let cancelled = false;
    let map: MapLibreMap | null = null;

    void import("maplibre-gl")
      .then(async (maplibregl) => {
        if (cancelled || !containerRef.current) return;
        map = new maplibregl.Map({
          container: containerRef.current,
          style: "https://tiles.openfreemap.org/styles/positron",
          center: [67.08, 24.95],
          zoom: 8.75,
          pitch: initialReducedMotionRef.current ? 0 : 34,
          bearing: 0,
          interactive: initialInteractiveRef.current,
          attributionControl: false,
          cooperativeGestures: initialInteractiveRef.current,
          canvasContextAttributes: { antialias: initialInteractiveRef.current },
          fadeDuration: 0,
          maxPitch: 55,
          minZoom: 8,
          maxZoom: 15,
          locale: {
            "Map.Title": mapCopy.en.region,
            "NavigationControl.ZoomIn": mapCopy.en.zoomIn,
            "NavigationControl.ZoomOut": mapCopy.en.zoomOut,
            "AttributionControl.ToggleAttribution": mapCopy.en.toggleAttribution,
          },
        });
        mapRef.current = map;

        // North-up is a core teaching invariant. Disable every user gesture
        // that could make the fixed compass lie about bearing or pitch.
        map.dragRotate.disable();
        map.touchZoomRotate.disableRotation();
        map.touchPitch.disable();
        map.keyboard.disableRotation();

        map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");
        if (initialInteractiveRef.current) {
          map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
        }

        const onLoad = async () => {
          if (!map || cancelled) return;
          try {
            const loadJson = async (url: string) => {
              const response = await fetch(url);
              if (!response.ok) throw new Error(`Could not load ${url}: ${response.status}`);
              return response.json();
            };
            const [districts, network] = await Promise.all([
              loadJson("/data/karachi-districts.geojson"),
              loadJson("/data/karachi-network.geojson"),
            ]);
            if (cancelled || !map) return;

            const firstSymbolLayer = map.getStyle().layers.find((layer) => layer.type === "symbol")?.id;
            for (const feature of districts.features as Array<{ properties: Record<string, unknown> }>) {
              feature.properties.entityKind = "district";
              feature.properties.entityId = feature.properties.id;
            }
            map.addSource("districts", {
              type: "geojson",
              data: districts,
              generateId: true,
              attribution: '<a href="https://www.openstreetmap.org/copyright" target="_blank">District boundaries © OpenStreetMap contributors, ODbL</a>',
            });
            map.addLayer({
              id: "district-fill",
              type: "fill",
              source: "districts",
              paint: {
                "fill-color": ["get", "color"],
                "fill-opacity": 0.13,
              },
            }, firstSymbolLayer);
            map.addLayer({
              id: "district-line",
              type: "line",
              source: "districts",
              paint: {
                "line-color": "#fff3db",
                "line-width": 1.2,
                "line-opacity": 0.5,
              },
            }, firstSymbolLayer);

            map.addSource("district-label-points", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: districts.features.map((feature: { properties: { id: string; name: string; label: [number, number] } }) => ({
                  type: "Feature",
                  properties: { id: feature.properties.id, name: feature.properties.name },
                  geometry: { type: "Point", coordinates: feature.properties.label },
                })),
              },
            });
            map.addLayer({
              id: "district-labels",
              type: "symbol",
              source: "district-label-points",
              layout: {
                "text-field": ["get", "name"],
                "text-font": ["Noto Sans Regular"],
                "text-size": 13,
                "text-letter-spacing": 0.08,
                "text-allow-overlap": true,
                "text-ignore-placement": true,
              },
              paint: {
                "text-color": "#071c24",
                "text-halo-color": "#fff7e8",
                "text-halo-width": 2,
                "text-opacity": 0,
              },
            });

            map.addSource("network", {
              type: "geojson",
              data: network,
              attribution: "Schematic orientation lines · mental map / zehni rehnumai only · not turn-by-turn navigation",
            });
            map.addLayer({
              id: "corridor-casing",
              type: "line",
              source: "network",
              filter: ["in", ["get", "kind"], ["literal", ["corridor", "expressway"]]],
              layout: { "line-cap": "round", "line-join": "round" },
              paint: { "line-color": "#071c24", "line-width": 8, "line-opacity": 0 },
            });
            map.addLayer({
              id: "corridors",
              type: "line",
              source: "network",
              filter: ["in", ["get", "id"], ["literal", corridorIds]],
              layout: { "line-cap": "round", "line-join": "round" },
              paint: { "line-color": ["get", "color"], "line-width": 4.2, "line-opacity": 0 },
            });
            map.addLayer({
              id: "transit-operating",
              type: "line",
              source: "network",
              filter: ["==", ["get", "kind"], "operating-transit"],
              layout: { "line-cap": "round", "line-join": "round" },
              paint: { "line-color": ["get", "color"], "line-width": 5.4, "line-opacity": 0 },
            });
            map.addLayer({
              id: "transit-planned",
              type: "line",
              source: "network",
              filter: ["==", ["get", "kind"], "planned-transit"],
              layout: { "line-cap": "round", "line-join": "round" },
              paint: { "line-color": ["get", "color"], "line-width": 3.4, "line-opacity": 0, "line-dasharray": [2, 2] },
            });
            map.addLayer({
              id: "drainage",
              type: "line",
              source: "network",
              filter: ["==", ["get", "kind"], "drainage"],
              layout: { "line-cap": "round", "line-join": "round" },
              paint: {
                "line-color": "#168FA3",
                "line-width": 5,
                "line-opacity": 0,
                "line-dasharray": [1.2, 1.4],
              },
            });
            map.addLayer({
              id: "anchors",
              type: "circle",
              source: "network",
              filter: ["in", ["get", "kind"], ["literal", ["anchor", "gateway"]]],
              paint: {
                "circle-radius": ["match", ["get", "kind"], "gateway", 6.5, 4.5],
                "circle-color": ["match", ["get", "kind"], "gateway", "#F06F55", "#FFF7E8"],
                "circle-stroke-color": "#071c24",
                "circle-stroke-width": 2,
                "circle-opacity": 0,
              },
            });
            map.addLayer({
              id: "anchor-hit",
              type: "circle",
              source: "network",
              filter: ["in", ["get", "kind"], ["literal", ["anchor", "gateway"]]],
              paint: { "circle-radius": 22, "circle-color": "#000000", "circle-opacity": 0.001 },
            });
            map.addLayer({
              id: "anchor-labels",
              type: "symbol",
              source: "network",
              filter: ["in", ["get", "kind"], ["literal", ["anchor", "gateway"]]],
              layout: {
                "text-field": ["get", "name"],
                "text-font": ["Noto Sans Regular"],
                "text-size": 12,
                "text-offset": [0, 1.15],
                "text-anchor": "top",
                "text-allow-overlap": false,
              },
              paint: { "text-color": "#071c24", "text-halo-color": "#fff7e8", "text-halo-width": 1.6, "text-opacity": 0 },
            });

            map.addSource("detailed-corridors", { type: "geojson", data: detailedCorridorsGeoJson });
            map.addLayer({
              id: "detailed-corridor-lines",
              type: "line",
              source: "detailed-corridors",
              minzoom: 8.15,
              layout: { "line-cap": "round", "line-join": "round" },
              paint: {
                "line-color": ["get", "color"],
                "line-width": 3,
                "line-opacity": 0,
              },
            }, firstSymbolLayer);
            map.addLayer({
              id: "detailed-corridor-hit",
              type: "line",
              source: "detailed-corridors",
              minzoom: 8.15,
              layout: { "line-cap": "round", "line-join": "round" },
              paint: { "line-color": "#000000", "line-width": 44, "line-opacity": 0.001 },
            }, firstSymbolLayer);

            map.addLayer({
              id: "transit-hit",
              type: "line",
              source: "network",
              filter: ["in", ["get", "kind"], ["literal", ["operating-transit", "planned-transit"]]],
              layout: { "line-cap": "round", "line-join": "round" },
              paint: { "line-color": "#000000", "line-width": 44, "line-opacity": 0.001 },
            });

            map.addSource("places", { type: "geojson", data: placesGeoJson });
            map.addLayer({
              id: "place-points",
              type: "circle",
              source: "places",
              minzoom: 8.8,
              paint: {
                "circle-radius": 4.5,
                "circle-color": "#FFF7E8",
                "circle-stroke-color": "#071C24",
                "circle-stroke-width": 1.5,
                "circle-opacity": 0,
              },
            });
            map.addLayer({
              id: "place-labels",
              type: "symbol",
              source: "places",
              minzoom: 10.2,
              layout: {
                "text-field": ["get", "name"],
                "text-font": ["Noto Sans Regular"],
                "text-size": 11,
                "text-offset": [0, 1],
                "text-anchor": "top",
              },
              paint: { "text-color": "#071c24", "text-halo-color": "#fff7e8", "text-halo-width": 1.4, "text-opacity": 0 },
            });
            map.addLayer({
              id: "place-hit",
              type: "circle",
              source: "places",
              minzoom: 8.8,
              paint: { "circle-radius": 22, "circle-color": "#000000", "circle-opacity": 0.001 },
            });

            map.addSource("active-route", {
              type: "geojson",
              data: { type: "FeatureCollection", features: [] },
            });
            map.addLayer({
              id: "active-route-casing",
              type: "line",
              source: "active-route",
              filter: ["==", ["geometry-type"], "LineString"],
              layout: { "line-cap": "round", "line-join": "round" },
              paint: {
                "line-color": "#071C24",
                "line-width": 7,
                "line-opacity": 0,
                "line-dasharray": [1.2, 1.5],
              },
            });
            map.addLayer({
              id: "active-route-line",
              type: "line",
              source: "active-route",
              filter: ["==", ["geometry-type"], "LineString"],
              layout: { "line-cap": "round", "line-join": "round" },
              paint: { "line-color": "#F06F55", "line-width": 4, "line-opacity": 0, "line-dasharray": [1.2, 1.5] },
            });
            map.addLayer({
              id: "active-route-points",
              type: "circle",
              source: "active-route",
              filter: ["==", ["geometry-type"], "Point"],
              paint: {
                "circle-radius": ["case", ["==", ["get", "selected"], true], 8, 5.5],
                "circle-color": ["case", ["==", ["get", "selected"], true], "#F06F55", "#FFF7E8"],
                "circle-stroke-color": "#071C24",
                "circle-stroke-width": 2.5,
                "circle-opacity": 0,
              },
            });
            map.addLayer({
              id: "active-route-labels",
              type: "symbol",
              source: "active-route",
              filter: ["==", ["geometry-type"], "Point"],
              layout: {
                "text-field": ["get", "name"],
                "text-font": ["Noto Sans Regular"],
                "text-size": 11,
                "text-offset": [0, 1.25],
                "text-anchor": "top",
                "text-optional": true,
              },
              paint: {
                "text-color": "#071C24",
                "text-halo-color": "#FFF7E8",
                "text-halo-width": 2,
                "text-opacity": 0,
              },
            });
            map.addLayer({
              id: "active-route-hit",
              type: "circle",
              source: "active-route",
              filter: ["==", ["geometry-type"], "Point"],
              paint: { "circle-radius": 22, "circle-color": "#000000", "circle-opacity": 0.001 },
            });

            if (initialInspectableRef.current) {
              const clickLayers = ["active-route-hit", "place-hit", "place-points", "place-labels", "anchor-hit", "anchors", "detailed-corridor-hit", "corridors", "transit-hit", "transit-operating", "transit-planned", "district-fill"];
              const selectFeature = (event: import("maplibre-gl").MapMouseEvent) => {
                if (!map) return;
                const features = map.queryRenderedFeatures(event.point, { layers: clickLayers.filter((layer) => Boolean(map?.getLayer(layer))) });
                const routeFeature = features.find((feature) => feature.layer.id === "active-route-hit");
                const routeCheckpointId = routeFeature?.properties?.id;
                if (typeof routeCheckpointId === "string") {
                  setInternalSelection(null);
                  onEntitySelectRef.current?.(null);
                  popupRef.current?.remove();
                  popupRef.current = null;
                  onRouteCheckpointSelectRef.current?.(routeCheckpointId);
                  return;
                }
                const matches = features
                  .map((feature) => ({ feature, entity: toEntityRef(feature.properties) }))
                  .filter((match): match is typeof match & { entity: MapEntityRef } => Boolean(match.entity))
                  .sort((a, b) => {
                    const priority: Record<MapEntityRef["kind"], number> = { place: 0, transit: 1, corridor: 2, district: 3 };
                    return priority[a.entity.kind] - priority[b.entity.kind];
                  });
                const entity = matches[0]?.entity ?? null;
                setInternalSelection(entity ? { entity, scope: selectionScopeRef.current } : null);
                onEntitySelectRef.current?.(entity);
              };
              map.on("click", selectFeature);

              const hoverLayers = ["active-route-hit", "place-hit", "place-points", "detailed-corridor-hit", "anchor-hit", "anchors", "transit-hit", "district-fill"];
              const onMove = (event: import("maplibre-gl").MapMouseEvent) => {
                if (!map) return;
                const features = map.queryRenderedFeatures(event.point, { layers: hoverLayers.filter((layer) => Boolean(map?.getLayer(layer))) });
                const routeFeature = features.find((feature) => feature.layer.id === "active-route-hit");
                const match = features
                  .map((feature) => ({ feature, entity: toEntityRef(feature.properties) }))
                  .find((item) => item.entity);
                const entity = match?.entity ?? null;
                map.getCanvas().style.cursor = routeFeature || entity ? "pointer" : "";
                popupRef.current?.remove();
                popupRef.current = null;
                if ((!routeFeature && !entity) || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
                const name = routeFeature?.properties?.name ?? match?.feature.properties?.name;
                const type = routeFeature ? copyRef.current.conceptualRoute : match?.feature.properties?.type ?? match?.feature.properties?.kind;
                if (typeof name !== "string") return;
                popupRef.current = new maplibregl.Popup({ closeButton: false, closeOnClick: false, offset: 12, className: "map-hover-popup" })
                  .setLngLat(event.lngLat)
                  .setText(`${typeof type === "string" ? `${type} · ` : ""}${name}`)
                  .addTo(map);
              };
              map.on("mousemove", onMove);
              map.on("mouseleave", () => {
                if (!map) return;
                map.getCanvas().style.cursor = "";
                popupRef.current?.remove();
                popupRef.current = null;
              });
            }
            setFailed(false);
            setReady(true);
          } catch {
            setFailed(true);
          }
        };
        map.once("load", onLoad);
        map.once("error", (event) => {
          if (!map?.isStyleLoaded() && event.error) setFailed(true);
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      markerRef.current?.remove();
      markerRef.current = null;
      popupRef.current?.remove();
      popupRef.current = null;
      map?.remove();
      mapRef.current = null;
    };
  }, [shouldLoad]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const updateControl = (selector: string, label: string) => {
      const control = container.querySelector<HTMLButtonElement>(selector);
      if (!control) return;
      control.title = label;
      control.setAttribute("aria-label", label);
    };
    updateControl(".maplibregl-ctrl-zoom-in", copy.zoomIn);
    updateControl(".maplibregl-ctrl-zoom-out", copy.zoomOut);
    updateControl(".maplibregl-ctrl-attrib-button", copy.toggleAttribution);
    const canvas = container.querySelector<HTMLElement>(".maplibregl-canvas");
    canvas?.setAttribute("aria-label", copy.region);
    if (canvas) {
      if (initialInteractiveRef.current) {
        canvas.removeAttribute("aria-hidden");
        canvas.tabIndex = 0;
      } else {
        canvas.setAttribute("aria-hidden", "true");
        canvas.tabIndex = -1;
      }
    }
  }, [copy.region, copy.toggleAttribution, copy.zoomIn, copy.zoomOut, ready]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    const showDistricts = ["districts", "corridors", "transit", "gateways", "explore"].includes(chapter.mode);
    const showCorridors = ["corridors", "transit", "gateways", "explore"].includes(chapter.mode);
    const showTransit = ["transit", "explore"].includes(chapter.mode);
    const showAnchors = ["context", "corridors", "transit", "gateways", "explore"].includes(chapter.mode);
    const showDrainage = chapter.mode === "water" || chapter.mode === "explore";
    const showDetailedCorridors = chapter.mode === "explore" || Boolean(chapter.detailCorridor);
    const duration = reducedMotion ? 0 : 1100;

    map.stop();
    map.setPaintProperty("district-fill", "fill-opacity", showDistricts ? (chapter.district ? ["case", ["==", ["get", "id"], chapter.district], 0.48, 0.05] : 0.2) : 0.04);
    map.setLayoutProperty("district-fill", "visibility", showDistricts ? "visible" : "none");
    map.setLayoutProperty("district-line", "visibility", showDistricts ? "visible" : "none");
    map.setPaintProperty("district-line", "line-opacity", showDistricts ? 0.72 : 0.22);
    map.setPaintProperty("district-line", "line-width", chapter.district ? ["case", ["==", ["get", "id"], chapter.district], 3, 0.9] : 1.2);
    map.setPaintProperty("district-labels", "text-opacity", showDistricts ? 1 : 0);
    map.setFilter("district-labels", chapter.district ? ["==", ["get", "id"], chapter.district] : null);
    map.setPaintProperty("corridor-casing", "line-opacity", showCorridors ? 0.52 : 0);
    map.setPaintProperty("corridors", "line-opacity", showCorridors ? (chapter.corridor ? ["case", ["==", ["get", "id"], chapter.corridor], 1, 0.16] : 0.92) : 0);
    map.setPaintProperty("corridors", "line-width", chapter.corridor ? ["case", ["==", ["get", "id"], chapter.corridor], 7, 3] : 4.2);
    map.setLayoutProperty("corridor-casing", "visibility", showCorridors ? "visible" : "none");
    map.setLayoutProperty("corridors", "visibility", showCorridors ? "visible" : "none");
    map.setPaintProperty("transit-operating", "line-opacity", showTransit ? 0.96 : 0);
    map.setPaintProperty("transit-planned", "line-opacity", showTransit ? 0.82 : 0);
    map.setLayoutProperty("transit-operating", "visibility", showTransit ? "visible" : "none");
    map.setLayoutProperty("transit-planned", "visibility", showTransit ? "visible" : "none");
    map.setLayoutProperty("transit-hit", "visibility", showTransit ? "visible" : "none");
    map.setPaintProperty("drainage", "line-opacity", showDrainage ? (chapter.mode === "water" ? 0.96 : 0.34) : 0);
    const focusedAnchorIds = chapter.id === "compass"
      ? ["tower", "airport", "sohrab-goth", "hub-exit"]
      : chapter.id === "anchors"
        ? ["tower", "karachi-port", "airport", "sohrab-goth"]
        : chapter.id === "names"
          ? ["gurumandir", "malir-15", "korangi-crossing"]
          : chapter.id === "gateways"
            ? ["airport", "karachi-port", "port-qasim", "cantt-station", "sohrab-goth", "hub-exit"]
            : null;
    const anchorFilter: FilterSpecification = focusedAnchorIds
      ? ["in", ["get", "id"], ["literal", focusedAnchorIds]]
      : ["in", ["get", "kind"], ["literal", ["anchor", "gateway"]]];
    map.setFilter("anchors", anchorFilter);
    map.setFilter("anchor-labels", anchorFilter);
    map.setFilter("anchor-hit", anchorFilter);
    map.setPaintProperty("anchors", "circle-opacity", showAnchors ? 1 : 0);
    map.setPaintProperty("anchor-labels", "text-opacity", showAnchors ? 1 : 0);
    map.setLayoutProperty("anchors", "visibility", showAnchors ? "visible" : "none");
    map.setLayoutProperty("anchor-labels", "visibility", showAnchors ? "visible" : "none");
    map.setLayoutProperty("anchor-hit", "visibility", showAnchors ? "visible" : "none");
    if (map.getLayer("detailed-corridor-lines")) {
      const detailFilter = chapter.detailCorridor ? ["==", ["get", "entityId"], chapter.detailCorridor] : null;
      map.setFilter("detailed-corridor-lines", detailFilter as FilterSpecification | null);
      map.setFilter("detailed-corridor-hit", detailFilter as FilterSpecification | null);
      map.setPaintProperty("detailed-corridor-lines", "line-opacity", showDetailedCorridors ? 0.8 : 0);
      map.setPaintProperty("detailed-corridor-lines", "line-width", chapter.detailCorridor ? 7 : 3);
      map.setLayoutProperty("detailed-corridor-lines", "visibility", showDetailedCorridors ? "visible" : "none");
      map.setLayoutProperty("detailed-corridor-hit", "visibility", showDetailedCorridors ? "visible" : "none");
    }
    if (map.getLayer("place-points")) {
      map.setPaintProperty("place-points", "circle-opacity", chapter.mode === "explore" ? 0.95 : 0);
      map.setLayoutProperty("place-points", "visibility", chapter.mode === "explore" ? "visible" : "none");
    }
    if (map.getLayer("place-labels")) {
      map.setPaintProperty("place-labels", "text-opacity", chapter.mode === "explore" ? 1 : 0);
      map.setLayoutProperty("place-labels", "visibility", chapter.mode === "explore" ? "visible" : "none");
    }
    if (map.getLayer("place-hit")) {
      map.setLayoutProperty("place-hit", "visibility", chapter.mode === "explore" ? "visible" : "none");
    }

    map.easeTo({
      center: chapter.center ?? [67.08, 24.95],
      zoom: chapter.zoom ?? 8.8,
      pitch: reducedMotion ? 0 : chapter.pitch ?? (chapter.mode === "districts" ? 38 : 26),
      bearing: 0,
      duration,
      essential: false,
    });
  }, [chapter, ready, reducedMotion]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready || !map.getSource("active-route")) return;
    const source = map.getSource("active-route") as import("maplibre-gl").GeoJSONSource;
    const checkpoints = routeOverlay?.checkpoints ?? [];
    const features: Array<GeoJSON.Feature<GeoJSON.LineString | GeoJSON.Point>> = [];
    if (checkpoints.length > 1) {
      features.push({
        type: "Feature",
        properties: { id: routeOverlay?.id, name: routeOverlay?.name },
        geometry: { type: "LineString", coordinates: checkpoints.map((checkpoint) => [checkpoint.coordinates[0], checkpoint.coordinates[1]]) },
      });
    }
    for (const checkpoint of checkpoints) {
      features.push({
        type: "Feature",
        properties: {
          id: checkpoint.id,
          name: checkpoint.label,
          stage: checkpoint.stage,
          selected: checkpoint.id === routeOverlay?.selectedCheckpointId,
        },
        geometry: { type: "Point", coordinates: [checkpoint.coordinates[0], checkpoint.coordinates[1]] },
      });
    }
    source.setData({ type: "FeatureCollection", features });
    const visible = checkpoints.length > 0;
    map.setPaintProperty("active-route-casing", "line-opacity", visible ? 0.82 : 0);
    map.setPaintProperty("active-route-line", "line-opacity", visible ? 1 : 0);
    map.setPaintProperty("active-route-points", "circle-opacity", visible ? 1 : 0);
    map.setPaintProperty("active-route-labels", "text-opacity", visible ? 1 : 0);
  }, [ready, routeOverlay]);

  useEffect(() => {
    if (!ready || !mapRef.current) return;
    const map = mapRef.current;
    const ref = selectedEntity;
    const showDistricts = ["districts", "corridors", "transit", "gateways", "explore"].includes(chapter.mode);
    const selectedDistrictId = ref?.kind === "district" ? ref.id : "";
    map.setPaintProperty("district-fill", "fill-opacity", showDistricts
      ? (selectedDistrictId
        ? ["case", ["==", ["get", "id"], selectedDistrictId], 0.58, 0.08]
        : (chapter.district ? ["case", ["==", ["get", "id"], chapter.district], 0.48, 0.05] : 0.2))
      : 0.04);
    map.setPaintProperty("district-line", "line-width", selectedDistrictId
      ? ["case", ["==", ["get", "id"], selectedDistrictId], 3.5, 1]
      : (chapter.district ? ["case", ["==", ["get", "id"], chapter.district], 3, 0.9] : 1.2));
    const selectedCorridor = ref?.kind === "corridor" ? ref.id : "";
    if (map.getLayer("detailed-corridor-lines")) {
      map.setPaintProperty("detailed-corridor-lines", "line-width", selectedCorridor
        ? ["case", ["==", ["get", "entityId"], selectedCorridor], 7, 2.4]
        : (chapter.detailCorridor ? 7 : 3));
      const baseVisible = chapter.mode === "explore" || Boolean(chapter.detailCorridor);
      map.setPaintProperty("detailed-corridor-lines", "line-opacity", baseVisible
        ? (selectedCorridor ? ["case", ["==", ["get", "entityId"], selectedCorridor], 1, 0.16] : 0.8)
        : 0);
    }
    if (map.getLayer("place-points")) {
      const selectedPlaceId = ref?.kind === "place" ? ref.id : "";
      map.setPaintProperty("place-points", "circle-radius", selectedPlaceId ? ["case", ["==", ["get", "entityId"], selectedPlaceId], 8, 4.5] : 4.5);
      map.setPaintProperty("place-points", "circle-color", selectedPlaceId ? ["case", ["==", ["get", "entityId"], selectedPlaceId], "#F06F55", "#FFF7E8"] : "#FFF7E8");
    }
    const selectedNetworkPoint = ref?.kind === "place"
      ? Object.entries(NETWORK_POINT_TO_PLACE).find(([, placeId]) => placeId === ref.id)?.[0] ?? (ref.id === "hub-exit" ? "hub-exit" : "")
      : "";
    map.setPaintProperty("anchors", "circle-radius", selectedNetworkPoint
      ? ["case", ["==", ["get", "id"], selectedNetworkPoint], 9, ["match", ["get", "kind"], "gateway", 6.5, 4.5]]
      : ["match", ["get", "kind"], "gateway", 6.5, 4.5]);
    map.setPaintProperty("anchors", "circle-stroke-width", selectedNetworkPoint
      ? ["case", ["==", ["get", "id"], selectedNetworkPoint], 4, 2]
      : 2);
    const transitFeatureId = ref?.kind === "transit"
      ? ({ green: "green-line", orange: "orange-line", red: "red-line", yellow: "yellow-line" } as Record<string, string>)[ref.id] ?? ""
      : "";
    map.setPaintProperty("transit-operating", "line-width", transitFeatureId
      ? ["case", ["==", ["get", "id"], transitFeatureId], 8, 2.4]
      : 5.4);
    map.setPaintProperty("transit-planned", "line-width", transitFeatureId
      ? ["case", ["==", ["get", "id"], transitFeatureId], 7, 2]
      : 3.4);
  }, [chapter, ready, reducedMotion, selectedEntity]);

  useEffect(() => {
    const map = mapRef.current;
    markerRef.current?.remove();
    markerRef.current = null;
    if (!map || !ready || !selectedPlace) return;
    let cancelled = false;
    void import("maplibre-gl").then((maplibregl) => {
      if (cancelled) return;
      markerRef.current = new maplibregl.Marker({ color: "#F06F55" })
        .setLngLat(selectedPlace.coordinates)
        .setPopup(new maplibregl.Popup({ offset: 24, focusAfterOpen: false }).setText(selectedPlace.name))
        .addTo(map);
      markerRef.current.getElement().setAttribute("aria-label", selectedPlace.name);
      markerRef.current.togglePopup();
      map.easeTo({ center: selectedPlace.coordinates, zoom: 12, pitch: reducedMotion ? 0 : 28, duration: reducedMotion ? 0 : 900 });
    });
    return () => {
      cancelled = true;
    };
  }, [ready, reducedMotion, selectedPlace]);

  return (
    <div className="map-shell" aria-hidden={!interactive && !inspectable}>
      <div
        ref={containerRef}
        className={`map-canvas ${ready ? "is-ready" : ""}`}
        role={!interactive && inspectable ? "img" : undefined}
        aria-label={!interactive && inspectable ? copy.region : undefined}
      />
      {(!ready || failed) && (
        <div className="map-fallback" role="status" aria-live="polite">
          <div className="fallback-coast" aria-hidden="true" />
          <div className="fallback-grid" aria-hidden="true" />
          <p>{failed ? copy.failed : shouldLoad ? copy.drawing : copy.prepares}</p>
        </div>
      )}
      <div className="map-compass"><span>N</span><i /></div>
      <div className="map-sea-label">{copy.sea}</div>
      <div className="map-verified">{copy.verified}</div>
      {inspectable && ready && !selectedDetails && <div className="map-inspect-hint">{copy.inspect}</div>}
      {routeOverlay && <div className="map-route-caveat">{copy.conceptualRoute}</div>}
      {showDetailsCard && selectedDetails && <MapDetailsCard details={selectedDetails} locale={locale} onClose={() => {
        setInternalSelection(null);
        onEntitySelectRef.current?.(null);
        if (interactive) window.requestAnimationFrame(() => mapRef.current?.getCanvas().focus());
      }} />}
    </div>
  );
}
