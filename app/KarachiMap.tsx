"use client";

import { useEffect, useRef, useState } from "react";
import type { FilterSpecification, Map as MapLibreMap } from "maplibre-gl";
import type { Locale } from "./karachi-i18n";

export type MapChapter = {
  id: string;
  mode: "context" | "districts" | "corridors" | "transit" | "gateways" | "water" | "explore";
  district?: string;
  corridor?: string;
  center?: [number, number];
  zoom?: number;
  pitch?: number;
};

type KarachiMapProps = {
  chapter: MapChapter;
  reducedMotion: boolean;
  locale: Locale;
  selectedPlace?: { name: string; coordinates: [number, number] } | null;
  interactive?: boolean;
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
  },
} as const;

export default function KarachiMap({ chapter, reducedMotion, locale, selectedPlace, interactive = false }: KarachiMapProps) {
  const copy = mapCopy[locale];
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markerRef = useRef<import("maplibre-gl").Marker | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

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
          pitch: 34,
          bearing: 0,
          interactive,
          attributionControl: false,
          cooperativeGestures: interactive,
          canvasContextAttributes: { antialias: interactive },
          fadeDuration: 0,
          maxPitch: 55,
          minZoom: 8,
          maxZoom: 15,
          locale: {
            "NavigationControl.ZoomIn": mapCopy.en.zoomIn,
            "NavigationControl.ZoomOut": mapCopy.en.zoomOut,
            "AttributionControl.ToggleAttribution": mapCopy.en.toggleAttribution,
          },
        });
        mapRef.current = map;

        map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");
        if (interactive) {
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
      .catch(() => setFailed(true));

    return () => {
      cancelled = true;
      markerRef.current?.remove();
      markerRef.current = null;
      map?.remove();
      mapRef.current = null;
    };
  }, [interactive, shouldLoad]);

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
  }, [copy.toggleAttribution, copy.zoomIn, copy.zoomOut, ready]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    const showDistricts = ["districts", "corridors", "transit", "gateways", "explore"].includes(chapter.mode);
    const showCorridors = ["corridors", "transit", "gateways", "explore"].includes(chapter.mode);
    const showTransit = ["transit", "explore"].includes(chapter.mode);
    const showAnchors = ["context", "corridors", "transit", "gateways", "explore"].includes(chapter.mode);
    const showDrainage = chapter.mode === "water" || chapter.mode === "explore";
    const duration = reducedMotion ? 0 : 1100;

    map.stop();
    map.setPaintProperty("district-fill", "fill-opacity", showDistricts ? (chapter.district ? ["case", ["==", ["get", "id"], chapter.district], 0.48, 0.05] : 0.2) : 0.04);
    map.setPaintProperty("district-line", "line-opacity", showDistricts ? 0.72 : 0.22);
    map.setPaintProperty("district-line", "line-width", chapter.district ? ["case", ["==", ["get", "id"], chapter.district], 3, 0.9] : 1.2);
    map.setPaintProperty("district-labels", "text-opacity", showDistricts ? 1 : 0);
    map.setFilter("district-labels", chapter.district ? ["==", ["get", "id"], chapter.district] : null);
    map.setPaintProperty("corridor-casing", "line-opacity", showCorridors ? 0.52 : 0);
    map.setPaintProperty("corridors", "line-opacity", showCorridors ? (chapter.corridor ? ["case", ["==", ["get", "id"], chapter.corridor], 1, 0.16] : 0.92) : 0);
    map.setPaintProperty("corridors", "line-width", chapter.corridor ? ["case", ["==", ["get", "id"], chapter.corridor], 7, 3] : 4.2);
    map.setPaintProperty("transit-operating", "line-opacity", showTransit ? 0.96 : 0);
    map.setPaintProperty("transit-planned", "line-opacity", showTransit ? 0.82 : 0);
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
    map.setPaintProperty("anchors", "circle-opacity", showAnchors ? 1 : 0);
    map.setPaintProperty("anchor-labels", "text-opacity", showAnchors ? 1 : 0);

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
    markerRef.current?.remove();
    markerRef.current = null;
    if (!map || !ready || !selectedPlace) return;
    let cancelled = false;
    void import("maplibre-gl").then((maplibregl) => {
      if (cancelled) return;
      markerRef.current = new maplibregl.Marker({ color: "#F06F55" })
        .setLngLat(selectedPlace.coordinates)
        .setPopup(new maplibregl.Popup({ offset: 24 }).setText(selectedPlace.name))
        .addTo(map);
      markerRef.current.togglePopup();
      map.easeTo({ center: selectedPlace.coordinates, zoom: 12, pitch: reducedMotion ? 0 : 28, duration: reducedMotion ? 0 : 900 });
    });
    return () => {
      cancelled = true;
    };
  }, [ready, reducedMotion, selectedPlace]);

  return (
    <div className="map-shell" aria-hidden={!interactive}>
      <div ref={containerRef} className={`map-canvas ${ready ? "is-ready" : ""}`} role={interactive ? "region" : undefined} aria-label={interactive ? copy.region : undefined} />
      {(!ready || failed) && (
        <div className="map-fallback">
          <div className="fallback-coast" />
          <div className="fallback-grid" />
          <p>{failed ? copy.failed : shouldLoad ? copy.drawing : copy.prepares}</p>
        </div>
      )}
      <div className="map-compass"><span>N</span><i /></div>
      <div className="map-sea-label">{copy.sea}</div>
      <div className="map-verified">{copy.verified}</div>
    </div>
  );
}
