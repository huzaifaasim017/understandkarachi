"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import KarachiMap, { type MapChapter, type MapRouteOverlay } from "../../KarachiMap";
import SiteHeader from "../../SiteHeader";
import { briefingCopy, getCopy } from "../../karachi-i18n";
import { districtAtlasCopy } from "../districts/districtAtlasData";
import {
  useDocumentMetadata,
  useLocalePreference,
  useReducedMotionPreference,
} from "../preferences";
import CrossCityGuide from "./CrossCityGuide";
import { crossCityScenarios } from "./crossCityData";
import type { CrossCityMapFocus } from "./types";

export default function CrossingExperience() {
  const locale = useLocalePreference();
  const reducedMotion = useReducedMotionPreference();
  const siteCopy = getCopy(locale);
  const atlasCopy = districtAtlasCopy[locale];
  const [mapFocus, setMapFocus] = useState<CrossCityMapFocus>({
    scenarioId: "hub-to-thatta",
    checkpointId: "hub-n25-entry",
    coordinates: [67.08, 24.9],
    zoom: 8.75,
  });
  const scenario = useMemo(
    () => crossCityScenarios.find((item) => item.id === mapFocus.scenarioId) ?? crossCityScenarios[0],
    [mapFocus.scenarioId],
  );
  const routeOverlay = useMemo<MapRouteOverlay>(() => ({
    id: scenario.id,
    name: scenario.title[locale],
    checkpoints: scenario.checkpoints.map((checkpoint) => ({
      id: checkpoint.id,
      label: checkpoint.label[locale],
      stage: checkpoint.stage,
      coordinates: checkpoint.coordinates,
    })),
    selectedCheckpointId: mapFocus.checkpointId,
  }), [locale, mapFocus.checkpointId, scenario]);
  const chapter = useMemo<MapChapter>(() => ({
    id: `cross-${scenario.id}-${mapFocus.checkpointId ?? "all"}`,
    mode: "corridors",
    center: [mapFocus.coordinates[0], mapFocus.coordinates[1]],
    zoom: mapFocus.zoom,
    pitch: reducedMotion ? 0 : 24,
  }), [mapFocus.checkpointId, mapFocus.coordinates, mapFocus.zoom, reducedMotion, scenario.id]);
  useDocumentMetadata(
    locale === "ur-roman" ? "Karachi Crossing Guide — Understand Karachi" : "Karachi Crossing Guide — Understand Karachi",
    locale === "ur-roman"
      ? "Sawari, entry gate, bari road, junction aur last mile ke zariye Karachi crossing samjhein."
      : "Understand a Karachi crossing through mode, entry gate, major road, junction, and last mile.",
  );

  const selectCheckpoint = (checkpointId: string) => {
    const checkpoint = scenario.checkpoints.find((item) => item.id === checkpointId);
    if (!checkpoint) return;
    setMapFocus({
      scenarioId: scenario.id,
      checkpointId,
      coordinates: checkpoint.coordinates,
      zoom: checkpoint.zoom,
    });
  };

  return (
    <main className="crossing-page" data-locale={locale}>
      <a href="#cross-city" className="skip-link">{siteCopy.common.skipToGuide}</a>
      <SiteHeader
        locale={locale}
        items={[
          { href: "/", label: atlasCopy.back },
          { href: "/districts", label: atlasCopy.atlas },
          { href: "/crossings", label: atlasCopy.crossing },
        ]}
        languageLabel={siteCopy.language.label}
        languageAriaLabel={siteCopy.language.ariaLabel}
        currentLanguageLabel={siteCopy.language.currentLanguage}
        homeAriaLabel={siteCopy.common.homeAria}
        navigationAriaLabel={siteCopy.common.guideChaptersAria}
        mobileNavigationAriaLabel={siteCopy.common.mobileGuideChaptersAria}
        openMenuAriaLabel={siteCopy.common.openMenuAria}
        closeMenuAriaLabel={siteCopy.common.closeMenuAria}
      />
      <div className="crossing-page-back">
        <Link href="/"><ArrowLeft size={16} aria-hidden="true" />{atlasCopy.back}</Link>
        <Link href="/briefing">{briefingCopy[locale].navLabel}</Link>
      </div>
      <div id="cross-city">
        <CrossCityGuide
          locale={locale}
          reducedMotion={reducedMotion}
          onFocusMap={setMapFocus}
          externalCheckpointId={mapFocus.checkpointId}
          mapSlot={(
            <KarachiMap
              chapter={chapter}
              reducedMotion={reducedMotion}
              locale={locale}
              routeOverlay={routeOverlay}
              onRouteCheckpointSelect={selectCheckpoint}
              interactive
              inspectable
            />
          )}
        />
      </div>
    </main>
  );
}
