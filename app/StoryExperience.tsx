"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  ExternalLink,
  LocateFixed,
  MapPin,
  Pause,
  Plane,
  Play,
  Printer,
  Search,
  Ship,
  TrainFront,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import BrandMark from "./BrandMark";
import IntroWorld from "./IntroWorld";
import KarachiMap, { type MapChapter } from "./KarachiMap";
import MapDetailsCard from "./features/map/MapDetailsCard";
import { resolveMapEntity, type MapEntityRef } from "./features/map/map-entities";
import { districtAtlasCopy } from "./features/districts/districtAtlasData";
import JourneySynthesis from "./features/learning/JourneySynthesis";
import PredictReveal from "./features/learning/PredictReveal";
import {
  useDocumentMetadata,
  useLocalePreference,
  useReducedMotionPreference,
} from "./features/preferences";
import PhotoCard from "./PhotoCard";
import SiteHeader from "./SiteHeader";
import {
  districtProfileFacts,
  districts,
  emergencies,
  landmarks,
  mainCorridors,
  normaliseSearchTerm,
  searchIndex,
  sources,
  streetGlossary,
  transitCategories,
  utilitySystems,
  type DistrictId,
} from "./karachi-data";
import {
  briefingCopy,
  getCorridorNarrative,
  getCopy,
  type ActKey,
} from "./karachi-i18n";

type StoryStep = {
  id: string;
  act: ActKey;
  title: string;
  body?: string;
  map: MapChapter;
  detail?: React.ReactNode;
};

type JourneyPlaybackState = "idle" | "playing" | "paused" | "complete";

const JOURNEY_SCROLL_SPEED_PX_PER_SECOND = 60;

const districtCameras: Record<string, { center: [number, number]; zoom: number }> = {
  south: { center: [67.02, 24.858], zoom: 10.45 },
  keamari: { center: [66.92, 24.9], zoom: 9.4 },
  west: { center: [67.005, 24.995], zoom: 9.9 },
  central: { center: [67.045, 24.955], zoom: 10.7 },
  east: { center: [67.105, 24.94], zoom: 10.4 },
  korangi: { center: [67.135, 24.845], zoom: 10.4 },
  malir: { center: [67.31, 25.03], zoom: 8.75 },
};

const ACT_KEYS: readonly ActKey[] = ["orient", "movement", "districts", "systems", "apply"];
const districtStoryOrder = ["south", "keamari", "west", "central", "east", "korangi", "malir"] as const;
const EXPLORE_CHAPTER: MapChapter = { id: "explore", mode: "explore", center: [67.08, 24.93], zoom: 9.2, pitch: 25 };
const pageMetadata = {
  "ur-roman": {
    title: "Understand Karachi — Shehar ko zero se samjhein",
    description: "Karachi ke districts, bari roads, junctions, landmarks aur city systems ko zero se samjhein.",
  },
  en: {
    title: "Understand Karachi — Learn the city from zero",
    description: "Learn Karachi's districts, major roads, junctions, landmarks, and city systems from zero.",
  },
} as const;

const corridorStoryConfig = [
  { dataId: "shahrah-e-pakistan", mapId: "north-spine", center: [67.055, 24.925] as [number, number], zoom: 9.55 },
  { dataId: "shahrah-e-faisal", mapId: "airport-spine", center: [67.1, 24.875] as [number, number], zoom: 9.55 },
  { dataId: "university-road", mapId: "university-spine", center: [67.105, 24.918] as [number, number], zoom: 9.8 },
  { dataId: "korangi-spine", mapId: "korangi-spine", center: [67.13, 24.835] as [number, number], zoom: 9.75 },
  { dataId: "mauripur-hub-river", mapId: "west-spine", center: [66.95, 24.9] as [number, number], zoom: 9.45 },
  { dataId: "national-highway", mapId: "airport-spine", center: [67.24, 24.86] as [number, number], zoom: 9.15 },
  { dataId: "m9-motorway", mapId: "north-spine", center: [67.2, 25.01] as [number, number], zoom: 8.75 },
] as const;

function IconForType({ type }: { type: string }) {
  if (type.toLowerCase().includes("airport")) return <Plane size={17} />;
  if (type.toLowerCase().includes("port")) return <Ship size={17} />;
  if (type.toLowerCase().includes("rail") || type.toLowerCase().includes("transit")) return <TrainFront size={17} />;
  return <MapPin size={17} />;
}

function distanceKm(a: [number, number], b: readonly [number, number]) {
  const radiusKm = 6371;
  const toRadians = (value: number) => value * Math.PI / 180;
  const latitudeDelta = toRadians(b[1] - a[1]);
  const longitudeDelta = toRadians(b[0] - a[0]);
  const latitudeA = toRadians(a[1]);
  const latitudeB = toRadians(b[1]);
  const haversine = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(latitudeA) * Math.cos(latitudeB) * Math.sin(longitudeDelta / 2) ** 2;
  return radiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

export default function StoryExperience() {
  const locale = useLocalePreference();
  const copy = getCopy(locale);
  const [activeId, setActiveId] = useState("compass");
  const reducedMotion = useReducedMotionPreference();
  const [search, setSearch] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<{ name: string; coordinates: [number, number] } | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<MapEntityRef | null>(null);
  const [locationStatus, setLocationStatus] = useState("");
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [checkpointResults, setCheckpointResults] = useState<Record<string, boolean>>({});
  const recordCheckpoint = (id: string, correct: boolean) =>
    setCheckpointResults((current) => ({ ...current, [id]: correct }));
  const [journeyPlayback, setJourneyPlayback] = useState<JourneyPlaybackState>("idle");
  const storyRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const journeyControlRef = useRef<HTMLButtonElement>(null);
  const journeyPositionRef = useRef(0);
  const focusJourneyControlRef = useRef(false);

  const storySteps = useMemo<StoryStep[]>(() => {
    const fixed = copy.story.fixed;
    const makeFixedStep = (
      id: keyof typeof fixed,
      act: ActKey,
      map: MapChapter,
      detail?: React.ReactNode,
    ): StoryStep => ({ id, act, title: fixed[id].title, body: fixed[id].body, map, detail });

    const districtSteps: StoryStep[] = districtStoryOrder.flatMap((districtId) => {
      const district = districts.find((item) => item.id === districtId);
      if (!district) return [];
      const narrative = copy.districtNarrative[district.id];
      const profile = districtProfileFacts.find((item) => item.districtId === district.id);
      const nextDistricts = (profile?.nextDistricts ?? []) as DistrictId[];
      const correctNextId = nextDistricts[0];
      const distractorIds = districtStoryOrder
        .filter((id) => id !== district.id && !nextDistricts.includes(id))
        .slice(0, 2);
      const checkpointId = `district-${district.id}`;
      return [{
        id: `district-${district.id}`,
        act: "districts",
        title: district.name,
        body: narrative.body,
        map: {
          id: `district-${district.id}`,
          mode: "districts",
          district: district.id,
          center: districtCameras[district.id]?.center,
          zoom: districtCameras[district.id]?.zoom,
          pitch: 42,
        },
        detail: (
          <div className="district-detail" style={{ "--district": district.color } as React.CSSProperties}>
            <div className="stat-pair">
              <span>{district.areaKm2.toLocaleString("en-US")} km²</span>
              <span>{copy.story.people(district.population2023.toLocaleString("en-US"))}</span>
            </div>
            <div className="subdivision-list">{district.subdivisions.map((item) => <span key={item}>{item}</span>)}</div>
            <p>{district.anchor} · {district.mainCorridor}</p>
            {correctNextId && distractorIds.length === 2 && (
              <PredictReveal
                prompt={copy.checkpoint.districtPrompt(district.name)}
                options={[correctNextId, ...distractorIds].map((id) => ({
                  id,
                  label: districts.find((item) => item.id === id)?.name ?? id,
                }))}
                correctId={correctNextId}
                guessPrompt={copy.checkpoint.guessPrompt}
                revealLabel={copy.checkpoint.revealButton}
                correctFeedback={copy.checkpoint.correctFeedback}
                incorrectFeedback={copy.checkpoint.incorrectFeedback}
                onAnswered={(correct) => recordCheckpoint(checkpointId, correct)}
              />
            )}
          </div>
        ),
      }];
    });

    const corridorSteps: StoryStep[] = corridorStoryConfig.flatMap((config, corridorIndex) => {
      const corridor = mainCorridors.find((item) => item.id === config.dataId);
      if (!corridor) return [];
      const correctStop = corridor.routeChain[corridor.routeChain.length - 1];
      const distractorStops = [1, 2]
        .map((offset) => corridorStoryConfig[(corridorIndex + offset) % corridorStoryConfig.length])
        .map((otherConfig) => mainCorridors.find((item) => item.id === otherConfig.dataId)?.routeChain.at(-1) as string | undefined)
        .filter((stop): stop is string => Boolean(stop) && stop !== correctStop);
      const narrative = getCorridorNarrative(locale, corridor.id);
      const checkpointId = `corridor-${corridor.id}`;
      return [{
        id: `corridor-${corridor.id}`,
        act: "movement",
        title: corridor.name,
        map: {
          id: `corridor-${corridor.id}`,
          mode: "corridors",
          corridor: config.mapId,
          detailCorridor: corridor.id,
          center: config.center,
          zoom: config.zoom,
          pitch: 30,
        },
        detail: (
          <>
            <div className="route-chain">{corridor.routeChain.map((place, placeIndex) => <span key={place}>{place}<i>{placeIndex < corridor.routeChain.length - 1 ? "→" : ""}</i></span>)}</div>
            {distractorStops.length === 2 && (
              <PredictReveal
                prompt={copy.checkpoint.corridorPrompt(corridor.name)}
                options={[correctStop, ...distractorStops].map((stop) => ({ id: stop, label: stop }))}
                correctId={correctStop}
                explanation={narrative?.body}
                guessPrompt={copy.checkpoint.guessPrompt}
                revealLabel={copy.checkpoint.revealButton}
                correctFeedback={copy.checkpoint.correctFeedback}
                incorrectFeedback={copy.checkpoint.incorrectFeedback}
                onAnswered={(correct) => recordCheckpoint(checkpointId, correct)}
              />
            )}
          </>
        ),
      }];
    });

    const glossaryDetail = (
      <div className="glossary-strip">
        {streetGlossary.slice(0, 6).map((item) => {
          const term = item.term as keyof typeof copy.glossaryMeanings;
          return <span key={item.term}><b>{item.term}</b>{copy.glossaryMeanings[term] ?? item.meaning}</span>;
        })}
      </div>
    );

    const transitDetail = (
      <div className="transit-legend">
        <span><i className="solid-green" />{copy.story.operating}</span>
        <span><i className="dash-red" />{copy.story.developing}</span>
      </div>
    );

    const gatewayIcons = [Plane, TrainFront, Ship, Ship] as const;
    const gatewayDetail = (
      <div className="gateway-grid">
        {copy.story.gatewayCards.map((label, index) => {
          const GatewayIcon = gatewayIcons[index];
          return <span key={label}><GatewayIcon /> {label}</span>;
        })}
      </div>
    );

    return [
      makeFixedStep("compass", "orient", { id: "compass", mode: "context", center: [67.08, 24.96], zoom: 8.55, pitch: 28 }),
      makeFixedStep("anchors", "orient", { id: "anchors", mode: "gateways", center: [67.07, 24.92], zoom: 9.4, pitch: 30 }),
      makeFixedStep("movement-intro", "movement", { id: "movement-intro", mode: "corridors", center: [67.08, 24.93], zoom: 8.85, pitch: 32 }),
      ...corridorSteps,
      makeFixedStep("landmark-language", "movement", { id: "landmark-language", mode: "gateways", center: [67.09, 24.9], zoom: 9.6, pitch: 24 }, glossaryDetail),
      makeFixedStep("transit", "movement", { id: "transit", mode: "transit", center: [67.095, 24.91], zoom: 9.25, pitch: 26 }, transitDetail),
      makeFixedStep(
        "scale",
        "orient",
        { id: "scale", mode: "districts", center: [67.15, 25.02], zoom: 8.35, pitch: 40 },
        <>
          <div className="mega-stats">
            <span><b>7</b>{copy.story.districtsStat}</span>
            <span><b>31</b>{copy.story.subdivisionsStat}</span>
            <span><b>20.38m</b>{copy.story.divisionStat}</span>
          </div>
          <p className="data-note">{copy.story.dataNote}</p>
        </>,
      ),
      makeFixedStep(
        "layers",
        "districts",
        { id: "layers", mode: "districts", center: [67.08, 24.95], zoom: 8.9, pitch: 38 },
        <div className="hierarchy">{copy.story.hierarchy.map((item, index) => <span key={item}>{item}{index < copy.story.hierarchy.length - 1 && <i aria-hidden="true">›</i>}</span>)}</div>,
      ),
      ...districtSteps,
      makeFixedStep("names", "districts", { id: "names", mode: "gateways", center: [67.08, 24.91], zoom: 10, pitch: 22 }),
      makeFixedStep("gateways", "systems", { id: "gateways", mode: "gateways", center: [67.14, 24.87], zoom: 8.75, pitch: 30 }, gatewayDetail),
      makeFixedStep(
        "systems",
        "systems",
        { id: "systems", mode: "districts", center: [67.08, 24.95], zoom: 8.8, pitch: 38 },
        <div className="system-chips">{utilitySystems.map((system) => <span key={system.name}><Zap size={14} />{system.name}</span>)}</div>,
      ),
      makeFixedStep("weather", "systems", { id: "weather", mode: "water", center: [67.1, 24.92], zoom: 9, pitch: 18 }),
      makeFixedStep(
        "address",
        "apply",
        { id: "address", mode: "gateways", center: [67.08, 24.91], zoom: 9.7, pitch: 24 },
        <div className="address-parts">{copy.story.addressParts.map((item, index) => <span key={item}>{item}{index < copy.story.addressParts.length - 1 && <i aria-hidden="true">+</i>}</span>)}</div>,
      ),
    ];
  }, [copy, locale]);

  const activeStep = storySteps.find((step) => step.id === activeId) ?? storySteps[0];

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-story-step]"));
    const visibleSections = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSections.add(entry.target);
          else visibleSections.delete(entry.target);
        });
        const closest = Array.from(visibleSections)
          .map((element) => ({ element, distance: Math.abs(element.getBoundingClientRect().top + element.getBoundingClientRect().height / 2 - window.innerHeight / 2) }))
          .sort((a, b) => a.distance - b.distance)[0]?.element as HTMLElement | undefined;
        if (closest?.id) setActiveId(closest.id.replace("step-", ""));
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [storySteps]);

  useDocumentMetadata(pageMetadata[locale].title, pageMetadata[locale].description);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (journeyPlayback !== "playing" || !focusJourneyControlRef.current) return;
    const frame = window.requestAnimationFrame(() => {
      journeyControlRef.current?.focus({ preventScroll: true });
      focusJourneyControlRef.current = false;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [journeyPlayback]);

  useEffect(() => {
    if (!reducedMotion || journeyPlayback !== "playing") return;
    const frame = window.requestAnimationFrame(() => setJourneyPlayback("paused"));
    return () => window.cancelAnimationFrame(frame);
  }, [journeyPlayback, reducedMotion]);

  useEffect(() => {
    const root = document.documentElement;
    if (journeyPlayback !== "playing" || reducedMotion) {
      delete root.dataset.journeyPlayback;
      return;
    }

    root.dataset.journeyPlayback = "playing";
    journeyPositionRef.current = window.scrollY;
    let previousTime = window.performance.now();
    let stableBottomFrames = 0;
    let animationFrame = 0;

    const advanceJourney = (time: number) => {
      const elapsed = Math.min(50, Math.max(0, time - previousTime));
      previousTime = time;
      const maximumScroll = Math.max(0, root.scrollHeight - window.innerHeight);
      journeyPositionRef.current = Math.min(
        maximumScroll,
        journeyPositionRef.current + (JOURNEY_SCROLL_SPEED_PX_PER_SECOND * elapsed) / 1000,
      );
      window.scrollTo({ top: journeyPositionRef.current, behavior: "auto" });

      const journeyEnd = document.getElementById("journey-end");
      const endIsVisible = journeyEnd
        ? journeyEnd.getBoundingClientRect().top <= window.innerHeight + 1
        : maximumScroll - journeyPositionRef.current <= 1;
      stableBottomFrames = endIsVisible ? stableBottomFrames + 1 : 0;

      if (stableBottomFrames >= 3) {
        setJourneyPlayback("complete");
        return;
      }
      animationFrame = window.requestAnimationFrame(advanceJourney);
    };

    animationFrame = window.requestAnimationFrame(advanceJourney);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      delete root.dataset.journeyPlayback;
    };
  }, [journeyPlayback, reducedMotion]);

  useEffect(() => {
    if (journeyPlayback !== "playing") return;

    const pauseForInteraction = (event: Event) => {
      if (event instanceof KeyboardEvent && event.key === "Escape") {
        setJourneyPlayback("paused");
        return;
      }
      const target = event.target;
      if (target instanceof Element && target.closest("[data-journey-playback-control]")) return;
      if (event instanceof KeyboardEvent && ["Alt", "Control", "Meta", "Shift"].includes(event.key)) return;
      setJourneyPlayback("paused");
    };
    const pauseWhenHidden = () => {
      if (document.hidden) setJourneyPlayback("paused");
    };

    window.addEventListener("wheel", pauseForInteraction, { passive: true });
    window.addEventListener("touchstart", pauseForInteraction, { passive: true });
    window.addEventListener("pointerdown", pauseForInteraction, true);
    window.addEventListener("keydown", pauseForInteraction);
    window.addEventListener("blur", pauseForInteraction);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      window.removeEventListener("wheel", pauseForInteraction);
      window.removeEventListener("touchstart", pauseForInteraction);
      window.removeEventListener("pointerdown", pauseForInteraction, true);
      window.removeEventListener("keydown", pauseForInteraction);
      window.removeEventListener("blur", pauseForInteraction);
      document.removeEventListener("visibilitychange", pauseWhenHidden);
    };
  }, [journeyPlayback]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const results = useMemo(() => {
    const query = normaliseSearchTerm(search);
    if (!query) return searchIndex.filter((entry) => entry.kind === "place").slice(0, 6);
    const tokens = query.split(" ");
    return searchIndex.filter((entry) => tokens.every((token) => entry.searchText.includes(token))).slice(0, 8);
  }, [search]);
  const transitResults = useMemo(() => {
    const query = normaliseSearchTerm(search);
    if (!query) return [];
    const tokens = query.split(" ");
    return transitCategories.filter((service) => {
      const text = normaliseSearchTerm([service.name, ...service.aliases].join(" "));
      return tokens.every((token) => text.includes(token));
    }).slice(0, 4);
  }, [search]);
  const selectedEntityDetails = useMemo(
    () => selectedEntity ? resolveMapEntity(selectedEntity, locale) : null,
    [locale, selectedEntity],
  );

  const locateUser = () => {
    if (!("geolocation" in navigator)) {
      setLocationStatus(copy.explorer.locationUnavailable);
      return;
    }
    setLocationStatus(copy.explorer.locating);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates: [number, number] = [position.coords.longitude, position.coords.latitude];
        let nearest = landmarks[0];
        let nearestDistance = Number.POSITIVE_INFINITY;
        for (const landmark of landmarks) {
          const currentDistance = distanceKm(coordinates, landmark.coordinates);
          if (currentDistance < nearestDistance) {
            nearest = landmark;
            nearestDistance = currentDistance;
          }
        }
        const isInGuideArea = nearestDistance <= 75;
        setSelectedPlace({
          name: isInGuideArea ? copy.explorer.nearest(nearest.name) : copy.explorer.locationOutside,
          coordinates,
        });
        setSelectedEntity(isInGuideArea ? { kind: "place", id: nearest.id } : null);
        setLocationStatus(isInGuideArea
          ? `${copy.explorer.locationApproximate} ${copy.explorer.nearest(nearest.name)}`
          : copy.explorer.locationOutside);
      },
      () => setLocationStatus(copy.explorer.locationDenied),
      { enableHighAccuracy: false, timeout: 9000, maximumAge: 60_000 },
    );
  };

  const startJourney = () => {
    if (reducedMotion) return;
    const firstLesson = document.getElementById("step-compass");
    if (!firstLesson) return;
    document.documentElement.dataset.journeyPlayback = "playing";
    firstLesson.scrollIntoView({ block: "start", behavior: "auto" });
    journeyPositionRef.current = window.scrollY;
    focusJourneyControlRef.current = true;
    setJourneyPlayback("playing");
  };

  const toggleJourneyPlayback = () => {
    if (journeyPlayback === "playing") {
      setJourneyPlayback("paused");
      return;
    }
    if (journeyPlayback === "idle" || journeyPlayback === "complete") {
      startJourney();
      return;
    }
    if (!reducedMotion) setJourneyPlayback("playing");
  };

  const journeyStatus = journeyPlayback === "playing"
    ? copy.journeyPlayer.playing
    : journeyPlayback === "complete"
      ? copy.journeyPlayer.complete
      : copy.journeyPlayer.paused;
  const journeyAction = journeyPlayback === "playing"
    ? copy.journeyPlayer.pause
    : journeyPlayback === "complete"
      ? copy.journeyPlayer.replay
      : copy.journeyPlayer.resume;

  return (
    <main className={reducedMotion ? "reduced-motion" : ""} data-locale={locale} data-journey-playback={journeyPlayback}>
      <a href="#story" className="skip-link">{copy.common.skipToGuide}</a>
      <div className="progress-rail" aria-hidden="true"><span ref={progressRef} /></div>

      {journeyPlayback !== "idle" && (
        <div className="journey-player" role="region" aria-label={copy.journeyPlayer.controls} data-journey-playback-control>
          <div className="journey-player-state" aria-hidden="true">
            <span>{journeyStatus}</span>
            <b>{journeyPlayback === "complete" ? "100%" : copy.journeyPlayer.toEnd}</b>
          </div>
          <button
            ref={journeyControlRef}
            type="button"
            onClick={toggleJourneyPlayback}
            disabled={reducedMotion}
            aria-describedby="journey-playback-status"
            data-journey-playback-control
          >
            {journeyPlayback === "playing" ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
            {reducedMotion ? copy.journeyPlayer.motionOff : journeyAction}
          </button>
          <p id="journey-playback-status" className="sr-only" aria-live="polite" aria-atomic="true">{reducedMotion ? copy.journeyPlayer.motionOff : journeyStatus}</p>
        </div>
      )}

      <SiteHeader
        locale={locale}
        items={[
          ...ACT_KEYS.map((act) => ({ href: `/#step-${storySteps.find((step) => step.act === act)?.id ?? "compass"}`, label: copy.acts[act] })),
          { href: "/districts", label: districtAtlasCopy[locale].atlas },
          { href: "/crossings", label: districtAtlasCopy[locale].crossing },
        ]}
        languageLabel={copy.language.label}
        languageAriaLabel={copy.language.ariaLabel}
        currentLanguageLabel={copy.language.currentLanguage}
        homeAriaLabel={copy.common.homeAria}
        navigationAriaLabel={copy.common.guideChaptersAria}
        mobileNavigationAriaLabel={copy.common.mobileGuideChaptersAria}
        openMenuAriaLabel={copy.common.openMenuAria}
        closeMenuAriaLabel={copy.common.closeMenuAria}
      />

      <section className="hero" id="top">
        <div className="hero-noise" />
        <IntroWorld locale={locale} reducedMotion={reducedMotion} />
        <div className="hero-copy">
          <h1>{copy.hero.title}</h1>
          <div className="hero-actions">
            <a href="#story" className="start-button"><span>{copy.hero.start}</span><ArrowDown size={18} aria-hidden="true" /></a>
            <button
              type="button"
              className="journey-play-button"
              onClick={startJourney}
              disabled={reducedMotion}
              aria-controls="story"
              data-journey-play
              data-journey-playback-control
            >
              <Play size={17} aria-hidden="true" />
              {reducedMotion ? copy.journeyPlayer.motionOff : copy.journeyPlayer.play}
            </button>
          </div>
        </div>
      </section>

      <section className="story" id="story" ref={storyRef}>
        <aside className="story-stage">
          <KarachiMap chapter={activeStep.map} reducedMotion={reducedMotion} locale={locale} inspectable />
          <div className="stage-status"><span>{copy.acts[activeStep.act]}</span><b>{String(storySteps.indexOf(activeStep) + 1).padStart(2, "0")} / {storySteps.length}</b></div>
        </aside>
        <div className="story-copy-column">
          {storySteps.map((step) => (
            <article className={`story-step ${activeId === step.id ? "is-active" : ""}`} data-story-step id={`step-${step.id}`} key={step.id}>
              <div className="step-card">
                <h2>{step.title}</h2>
                {step.body && <p>{step.body}</p>}
                {step.detail}
              </div>
              {step.id === "landmark-language" && <PhotoCard photoId="empress-market" copy={copy} locale={locale} />}
              {step.id === "district-east" && <PhotoCard photoId="mazar-e-quaid" copy={copy} locale={locale} />}
              {step.id === "corridor-shahrah-e-faisal" && <PhotoCard photoId="jinnah-airport" copy={copy} locale={locale} />}
              {step.id === "gateways" && <PhotoCard photoId="karachi-port" copy={copy} locale={locale} />}
              {step.id === "weather" && <PhotoCard photoId="clifton-skyline" copy={copy} locale={locale} />}
            </article>
          ))}
        </div>
      </section>

      <section className="district-atlas-cta" aria-labelledby="district-atlas-title">
        <div>
          <h2 id="district-atlas-title">{districtAtlasCopy[locale].title}</h2>
          <p>{districtAtlasCopy[locale].intro}</p>
        </div>
        <div className="district-atlas-links">
          {districts.map((district) => (
            <Link key={district.id} href={`/districts/${district.id}`} style={{ "--district": district.color } as React.CSSProperties}>
              <span>{district.name}</span><ArrowRight size={17} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="crossing-cta">
        <h2>{districtAtlasCopy[locale].crossing}</h2>
        <Link href="/crossings">{districtAtlasCopy[locale].crossingOpen}<ArrowRight size={17} aria-hidden="true" /></Link>
      </section>

      <section className="explorer-section" id="explore">
        <div className="explorer-map"><KarachiMap chapter={EXPLORE_CHAPTER} reducedMotion={reducedMotion} selectedPlace={selectedPlace} focusedEntity={selectedEntity} onEntitySelect={(entity) => { setSelectedEntity(entity); if (entity) setSelectedPlace(null); }} interactive inspectable showDetailsCard={false} locale={locale} /></div>
        <div className="explorer-panel">
          <h2>{copy.explorer.title}</h2>
          <label className="search-box"><span className="sr-only">{copy.explorer.searchLabel}</span><Search size={19} aria-hidden="true" /><input ref={searchInputRef} aria-label={copy.explorer.searchLabel} aria-keyshortcuts="/" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={copy.explorer.placeholder} /><kbd>/</kbd></label>
          <div className="explorer-tools">
            <button type="button" className="locate-button" onClick={locateUser}><LocateFixed size={17} aria-hidden="true" />{copy.explorer.locate}</button>
            <p>{copy.explorer.locationNote}</p>
          </div>
          {locationStatus && <p className="location-status" role="status">{locationStatus}</p>}
          <div className="result-list">
            {results.map((result) => {
              const district = result.districtId ? districts.find((item) => item.id === result.districtId)?.name : undefined;
              return <button key={result.id} onClick={() => { setSelectedPlace({ name: result.label, coordinates: [result.coordinates[0], result.coordinates[1]] }); setSelectedEntity({ kind: result.kind, id: result.targetId }); setLocationStatus(""); }}><IconForType type={result.kind} /><span><b>{result.label}</b><small>{copy.explorer.kindLabels[result.kind]}{district ? ` · ${district}` : ""}</small></span><ArrowRight size={16} /></button>;
            })}
            {transitResults.map((service) => <button key={`transit:${service.id}`} onClick={() => { setSelectedPlace(null); setSelectedEntity({ kind: "transit", id: service.id }); setLocationStatus(""); }}><IconForType type="transit" /><span><b>{service.name}</b><small>{copy.explorer.transitLabel}</small></span><ArrowRight size={16} /></button>)}
            {results.length === 0 && transitResults.length === 0 && <p className="no-results">{copy.explorer.noResults}</p>}
          </div>
          {selectedPlace && <div className="selected-place"><MapPin /><div><span>{copy.common.selected}</span><b>{selectedPlace.name}</b></div><button onClick={() => { setSelectedPlace(null); setSelectedEntity(null); setLocationStatus(""); }} aria-label={copy.common.clearSelectedAria}><X size={15} /></button></div>}
          {selectedEntityDetails && <MapDetailsCard inline details={selectedEntityDetails} locale={locale} onClose={() => { setSelectedPlace(null); setSelectedEntity(null); setLocationStatus(""); window.requestAnimationFrame(() => searchInputRef.current?.focus()); }} />}
        </div>
      </section>

      <section className="safety-section">
        <div className="safety-copy"><h2>{copy.safety.title}</h2><div className="safety-rules">{copy.safety.rules.map((rule) => <p key={rule}>{rule}</p>)}</div></div>
        <div className="emergency-card"><h3>{copy.safety.emergencyTitle}</h3>{emergencies.map((item) => <a key={item.id} href={`tel:${item.number}`}><span>{copy.safety.serviceLabels[item.id] ?? item.service}</span><b>{item.number}</b></a>)}<small>{copy.safety.verifiedNote}</small></div>
      </section>

      <section className="quiz-section">
        <div className="section-heading light"><h2>{copy.quiz.title}</h2></div>
        <div className="quiz-grid">
          {copy.quiz.questions.map((quiz) => {
            const selectedAnswer = quizAnswers[quiz.id];
            return <article key={quiz.id} role="group" aria-labelledby={`${quiz.id}-label`}><h3 id={`${quiz.id}-label`}>{quiz.question}</h3>{quiz.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = option.id === quiz.answerId;
              return <button key={option.id} aria-pressed={isSelected} className={isSelected ? (isCorrect ? "correct" : "wrong") : ""} onClick={() => setQuizAnswers((value) => ({ ...value, [quiz.id]: option.id }))}>{option.label}{isSelected && isCorrect ? " ✓" : ""}</button>;
            })}<p className="quiz-feedback" role="status">{selectedAnswer ? (selectedAnswer === quiz.answerId ? copy.quiz.correct : copy.quiz.wrongFeedback) : ""}</p></article>;
          })}
        </div>
      </section>

      <section className="cheat-sheet">
        <div className="cheat-top"><div><h2>{copy.cheatSheet.title}</h2></div><button onClick={() => window.print()}><Printer size={17} />{copy.cheatSheet.print}</button></div>
        <div className="cheat-grid">{copy.cheatSheet.cards.map((card) => <div key={card.label}><span>{card.label}</span><p>{card.body}</p></div>)}</div>
      </section>

      <JourneySynthesis locale={locale} copy={copy.synthesis} />
      {Object.keys(checkpointResults).length > 0 && (
        <p className="checkpoint-summary" role="status">
          {copy.checkpoint.answeredSummary(
            Object.values(checkpointResults).filter(Boolean).length,
            Object.keys(checkpointResults).length,
          )}
        </p>
      )}

      <footer>
        <div className="footer-main"><div className="footer-brand"><BrandMark showName={false} size={52} /><h2>Understand<br />Karachi</h2></div><nav className="source-list" aria-label={`${copy.footer.primarySources} / ${copy.footer.moreVerification}`}>{sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" lang="en">{source.label}<ExternalLink size={12} /></a>)}</nav></div>
        <div className="footer-bottom"><span>{copy.footer.reviewed}</span><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" lang="en">{copy.footer.mapAttribution}</a><Link href="/briefing">{briefingCopy[locale].navLabel}</Link><a href="#top">{copy.footer.backToTop} <ChevronDown size={14} /></a></div>
      </footer>
      <div id="journey-end" className="journey-end" aria-hidden="true" />
    </main>
  );
}
