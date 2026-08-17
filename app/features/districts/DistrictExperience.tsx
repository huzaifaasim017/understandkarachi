"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, MapPin, Route, TriangleAlert } from "lucide-react";
import { useMemo, useState } from "react";
import BrandMark from "../../BrandMark";
import KarachiMap, { type MapChapter } from "../../KarachiMap";
import SiteHeader from "../../SiteHeader";
import {
  districtsById,
  landmarks,
  mainCorridors,
  sourcesById,
  type DistrictId,
} from "../../karachi-data";
import { briefingCopy, getCopy } from "../../karachi-i18n";
import { gapsForDistrict } from "../infrastructure/infrastructureData";
import InfrastructureGapList from "../infrastructure/InfrastructureGapList";
import PredictReveal from "../learning/PredictReveal";
import MapDetailsCard from "../map/MapDetailsCard";
import { resolveMapEntity, type MapEntityRef } from "../map/map-entities";
import {
  useDocumentMetadata,
  useLocalePreference,
  useReducedMotionPreference,
} from "../preferences";
import { districtAtlasCopy, districtProfilesById } from "./districtAtlasData";

const cameraByDistrict: Readonly<Record<DistrictId, { center: [number, number]; zoom: number }>> = {
  south: { center: [67.026, 24.833], zoom: 10.7 },
  keamari: { center: [66.91, 24.89], zoom: 9.25 },
  west: { center: [67.0, 24.99], zoom: 9.75 },
  central: { center: [67.045, 24.95], zoom: 10.55 },
  east: { center: [67.105, 24.93], zoom: 10.3 },
  korangi: { center: [67.14, 24.84], zoom: 10.3 },
  malir: { center: [67.3, 25.0], zoom: 8.7 },
};

const districtOrder: readonly DistrictId[] = ["south", "keamari", "west", "central", "east", "korangi", "malir"];

export default function DistrictExperience({ districtId }: { readonly districtId: DistrictId }) {
  const locale = useLocalePreference();
  const reducedMotion = useReducedMotionPreference();
  const siteCopy = getCopy(locale);
  const copy = districtAtlasCopy[locale];
  const district = districtsById[districtId];
  const profile = districtProfilesById[districtId];
  const [selectedEntity, setSelectedEntity] = useState<MapEntityRef>({ kind: "district", id: districtId });
  const selectedDetails = useMemo(() => resolveMapEntity(selectedEntity, locale), [locale, selectedEntity]);
  const camera = cameraByDistrict[districtId];
  const chapter: MapChapter = {
    id: `atlas-${districtId}`,
    mode: "explore",
    district: districtId,
    center: camera.center,
    zoom: camera.zoom,
    pitch: reducedMotion ? 0 : 30,
  };
  const districtLandmarks = landmarks.filter((landmark) => landmark.districtId === districtId);
  const districtCorridorIds = new Set<string>(profile.routes.flatMap((route) => route.corridorIds));
  const districtCorridors = mainCorridors.filter((corridor) => districtCorridorIds.has(corridor.id));
  const currentIndex = districtOrder.indexOf(districtId);
  const previousDistrict = districtsById[districtOrder[(currentIndex - 1 + districtOrder.length) % districtOrder.length]];
  const nextDistrict = districtsById[districtOrder[(currentIndex + 1) % districtOrder.length]];
  useDocumentMetadata(`${district.name} District — Understand Karachi`, profile.position[locale]);

  const statusLabel = (status: "orientation" | "developing" | undefined) => {
    if (status === "developing") return copy.developing;
    return copy.orientation;
  };

  return (
    <main className="district-page" data-locale={locale} style={{ "--district": district.color } as React.CSSProperties}>
      <a href="#district-content" className="skip-link">{siteCopy.common.skipToGuide}</a>
      <SiteHeader
        locale={locale}
        items={[
          { href: "/", label: copy.back },
          { href: "/districts", label: copy.atlas },
          { href: "/crossings", label: copy.crossing },
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

      <section className="district-hero" id="district-content">
        <div className="district-hero-copy">
          <Link href="/districts" className="district-back"><ArrowLeft size={16} aria-hidden="true" />{copy.atlas}</Link>
          <h1>{district.name}</h1>
          <p>{profile.position[locale]}</p>
          <div className="district-hero-facts">
            <span><b>{district.areaKm2.toLocaleString("en-US")} km²</b>{copy.scale}</span>
            <span><b>{district.population2023.toLocaleString("en-US")}</b>{copy.population}</span>
            <span><b>{district.anchor}</b>{copy.anchor}</span>
          </div>
        </div>
        <div className="district-hero-map" aria-label={copy.map}>
          <KarachiMap
            chapter={chapter}
            reducedMotion={reducedMotion}
            locale={locale}
            focusedEntity={selectedEntity}
            onEntitySelect={(entity) => entity && setSelectedEntity(entity)}
            interactive
            inspectable
            showDetailsCard={false}
          />
        </div>
      </section>

      <section className="district-direct-rule">
        <h2>{copy.firstRule}</h2>
        <div className="district-rule-content">
          <p>{profile.firstRule[locale]}</p>
          <div className="district-arrivals" aria-label={copy.arrivals}>
            <b>{copy.arrivals}</b>
            {profile.arriveFrom.map((arrival) => <span key={arrival}>{arrival}</span>)}
          </div>
        </div>
      </section>

      <section className="district-zones">
        <h2>{copy.zones}</h2>
        <div>
          {profile.zones.map((zone, index) => (
            <article key={zone.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{zone.name}</h3>
              <p>{zone.explanation[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="district-routes">
        <div className="district-section-heading">
          <h2>{copy.routes}</h2>
          <p>{copy.routeHint}</p>
        </div>
        <div className="district-route-list">
          {profile.routes.map((route, routeIndex) => {
            const isFirstRoute = routeIndex === 0;
            const finalStop = route.stops[route.stops.length - 1];
            const visibleStops = isFirstRoute ? route.stops.slice(0, -1) : route.stops;
            const distractorStops = isFirstRoute
              ? profile.routes
                .filter((other) => other.id !== route.id)
                .map((other) => other.stops[other.stops.length - 1])
                .filter((stop, index, all) => stop !== finalStop && all.indexOf(stop) === index)
                .slice(0, 2)
              : [];
            return (
            <article key={route.id}>
              <div className="district-route-top">
                <h3>{route.title[locale]}</h3>
                <span data-status={route.status}>{statusLabel(route.status)}</span>
              </div>
              <p>{route.purpose[locale]}</p>
              <ol aria-label={route.title[locale]}>
                {visibleStops.map((stop, index) => {
                  const landmark = districtLandmarks.find(
                    (item) => item.name === stop || (item.aliases as readonly string[]).includes(stop),
                  );
                  return (
                    <li key={stop}>
                      {landmark ? (
                        <button
                          type="button"
                          aria-pressed={selectedEntity.kind === "place" && selectedEntity.id === landmark.id}
                          onClick={() => setSelectedEntity({ kind: "place", id: landmark.id })}
                        >
                          <i aria-hidden="true">{index + 1}</i><span>{stop}</span>
                        </button>
                      ) : (
                        <span className="district-route-stop">
                          <i aria-hidden="true">{index + 1}</i><span>{stop}</span>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
              {isFirstRoute && distractorStops.length > 0 && (
                <PredictReveal
                  prompt={siteCopy.checkpoint.corridorPrompt(route.title[locale])}
                  options={[finalStop, ...distractorStops].map((stop) => ({ id: stop, label: stop }))}
                  correctId={finalStop}
                  guessPrompt={siteCopy.checkpoint.guessPrompt}
                  revealLabel={siteCopy.checkpoint.revealButton}
                  correctFeedback={siteCopy.checkpoint.correctFeedback}
                  incorrectFeedback={siteCopy.checkpoint.incorrectFeedback}
                />
              )}
              <div className="district-route-corridors">
                {route.corridorIds.map((corridorId) => {
                  const corridor = mainCorridors.find((item) => item.id === corridorId);
                  return corridor ? (
                    <button key={corridor.id} type="button" aria-pressed={selectedEntity.kind === "corridor" && selectedEntity.id === corridor.id} onClick={() => setSelectedEntity({ kind: "corridor", id: corridor.id })}>
                      <Route size={14} aria-hidden="true" />{corridor.name}
                    </button>
                  ) : null;
                })}
              </div>
              <div className="district-route-sources" aria-label={copy.routeSources}>
                <b>{copy.routeSources}</b>
                {route.sourceIds.map((sourceId) => {
                  const source = sourcesById[sourceId];
                  return (
                    <a key={sourceId} href={source.url} target="_blank" rel="noopener noreferrer" aria-label={`${source.title}. ${copy.sourceOpen}`}>
                      {source.title}<ExternalLink size={12} aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </article>
            );
          })}
        </div>
      </section>

      <section className="district-explorer">
        <div className="district-explorer-map">
          <KarachiMap
            chapter={chapter}
            reducedMotion={reducedMotion}
            locale={locale}
            focusedEntity={selectedEntity}
            onEntitySelect={(entity) => entity && setSelectedEntity(entity)}
            interactive
            inspectable
            showDetailsCard={false}
          />
        </div>
        <div className="district-explorer-panel">
          <h2>{copy.areas}</h2>
          <p>{copy.mapHint}</p>
          <div className="district-entity-buttons">
            {districtLandmarks.map((landmark) => (
              <button key={landmark.id} type="button" aria-pressed={selectedEntity.kind === "place" && selectedEntity.id === landmark.id} onClick={() => setSelectedEntity({ kind: "place", id: landmark.id })}>
                <MapPin size={15} aria-hidden="true" />{landmark.name}
              </button>
            ))}
            {districtCorridors.map((corridor) => (
              <button key={corridor.id} type="button" aria-pressed={selectedEntity.kind === "corridor" && selectedEntity.id === corridor.id} onClick={() => setSelectedEntity({ kind: "corridor", id: corridor.id })}>
                <Route size={15} aria-hidden="true" />{corridor.name}
              </button>
            ))}
          </div>
          {selectedDetails && <MapDetailsCard inline details={selectedDetails} locale={locale} onClose={() => setSelectedEntity({ kind: "district", id: districtId })} />}
        </div>
      </section>

      <section className="district-admin">
        <div>
          <h2>{copy.subdivisions}</h2>
          <p className="district-admin-note">{copy.subdivisionNote}</p>
          <div className="district-subdivision-grid">
            {district.subdivisions.map((subdivision) => <span key={subdivision}>{subdivision}</span>)}
          </div>
        </div>
        <div className="district-caution">
          <TriangleAlert size={22} aria-hidden="true" />
          <div><h2>{copy.caution}</h2><p>{profile.caution[locale]}</p></div>
        </div>
      </section>

      <InfrastructureGapList gaps={gapsForDistrict(districtId)} locale={locale} copy={copy.infrastructure} />

      <section className="district-handoff">
        <div>
          <h2>{copy.neighbours}</h2>
          <p className="district-boundary-note">{copy.boundaryNote}</p>
          <div className="district-neighbours">
            {profile.nextDistricts.map((neighbourId) => {
              const neighbour = districtsById[neighbourId];
              return (
                <Link key={neighbourId} href={`/districts/${neighbourId}`} style={{ "--neighbour": neighbour.color } as React.CSSProperties}>
                  {neighbour.name}<ArrowRight size={16} aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <h2>{copy.beforeYouRide}</h2>
          <ol>
            {copy.rideRules.map((rule) => <li key={rule}>{rule}</li>)}
          </ol>
        </div>
      </section>

      <section className="district-sources">
        <h2>{copy.sources}</h2>
        {(districtId === "east" || districtId === "malir") && <p className="district-source-conflict">{copy.populationConflict}</p>}
        <div>
          {profile.sourceIds.map((sourceId) => {
            const source = sourcesById[sourceId];
            return (
              <a key={sourceId} href={source.url} target="_blank" rel="noopener noreferrer" aria-label={`${source.title}. ${copy.sourceOpen}`}>
                <span><b>{source.publisher}</b>{source.title}</span><ExternalLink size={16} aria-hidden="true" />
              </a>
            );
          })}
        </div>
        <p>{copy.reviewed}</p>
      </section>

      <nav className="district-pagination" aria-label={copy.adjacent}>
        <Link href={`/districts/${previousDistrict.id}`}><ArrowLeft size={18} aria-hidden="true" /><span>{copy.previous}<b>{previousDistrict.name}</b></span></Link>
        <Link href={`/districts/${nextDistrict.id}`}><span>{copy.next}<b>{nextDistrict.name}</b></span><ArrowRight size={18} aria-hidden="true" /></Link>
      </nav>

      <footer>
        <div className="footer-main"><div className="footer-brand"><BrandMark showName={false} size={52} /><h2>Understand<br />Karachi</h2></div></div>
        <div className="footer-bottom"><span>{copy.reviewed}</span><Link href="/districts">{copy.atlas}</Link><Link href="/briefing">{briefingCopy[locale].navLabel}</Link></div>
      </footer>
    </main>
  );
}
