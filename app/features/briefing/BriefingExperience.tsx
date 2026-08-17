"use client";

import { ExternalLink, Printer } from "lucide-react";
import Link from "next/link";
import BrandMark from "../../BrandMark";
import {
  districts,
  karachiFacts,
  mainCorridors,
  sourcesById,
  type SourceId,
} from "../../karachi-data";
import { briefingCopy, getCopy } from "../../karachi-i18n";
import { districtAtlasCopy } from "../districts/districtAtlasData";
import InfrastructureGapList from "../infrastructure/InfrastructureGapList";
import { infrastructureGaps } from "../infrastructure/infrastructureData";
import { useDocumentMetadata, useLocalePreference } from "../preferences";
import SiteHeader from "../../SiteHeader";

/**
 * Static civic-presentation surface assembled only from canonical records.
 * See `docs/specs/civic-presentation.md`. Never depends on the map/WebGL
 * stack — this page is meant to be projected, printed, or screen-shared to
 * an audience whose device/network cannot be assumed to support it.
 */
export default function BriefingExperience() {
  const locale = useLocalePreference();
  const siteCopy = getCopy(locale);
  const atlasCopy = districtAtlasCopy[locale];
  const copy = briefingCopy[locale];
  useDocumentMetadata(copy.metaTitle, copy.metaDescription);

  const citedSourceIds = Array.from(
    new Set<SourceId>([
      ...districts.flatMap((district) => district.sourceIds),
      ...mainCorridors.flatMap((corridor) => corridor.sourceIds),
      ...infrastructureGaps.flatMap((gap) => gap.sourceIds),
    ]),
  );

  return (
    <main className="briefing-page" data-locale={locale}>
      <a href="#briefing-content" className="skip-link">{siteCopy.common.skipToGuide}</a>
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

      <section className="briefing-hero" id="briefing-content">
        <h1>{copy.heroTitle}</h1>
        <p>{copy.heroSubtitle}</p>
        <button type="button" className="briefing-print" onClick={() => window.print()}>
          <Printer size={16} aria-hidden="true" />
          {copy.printLabel}
        </button>
      </section>

      <section className="briefing-section">
        <h2>{copy.cityShapeTitle}</h2>
        <div className="briefing-stats">
          <span><b>{karachiFacts.districts}</b>{siteCopy.story.districtsStat}</span>
          <span><b>{karachiFacts.subdivisions}</b>{siteCopy.story.subdivisionsStat}</span>
          <span><b>{karachiFacts.areaKm2.toLocaleString("en-US")} km²</b></span>
          <span><b>{karachiFacts.population2023.toLocaleString("en-US")}</b></span>
        </div>
        <p>{karachiFacts.cityShape}</p>
      </section>

      <section className="briefing-section">
        <h2>{copy.districtsTitle}</h2>
        <div className="briefing-district-grid">
          {districts.map((district) => (
            <article key={district.id} style={{ "--district": district.color } as React.CSSProperties}>
              <h3>{district.name}</h3>
              <p>{district.mentalModel}</p>
              <span>{district.anchor} · {district.mainCorridor}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="briefing-section">
        <h2>{copy.corridorsTitle}</h2>
        <ul className="briefing-corridor-list">
          {mainCorridors.map((corridor) => (
            <li key={corridor.id}>
              <b>{corridor.name}</b>
              <span>{corridor.routeChain.join(" → ")}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="briefing-section">
        <h2>{copy.diagnosticsTitle}</h2>
        <p>{copy.diagnosticsIntro}</p>
        <InfrastructureGapList
          gaps={infrastructureGaps}
          locale={locale}
          copy={atlasCopy.infrastructure}
          headingLevel="h3"
        />
      </section>

      <section className="briefing-boundary">
        <h2>{copy.boundaryTitle}</h2>
        <p>{copy.boundaryBody}</p>
      </section>

      <section className="briefing-sources">
        <h2>{copy.sourcesTitle}</h2>
        <p>{siteCopy.footer.reviewed}</p>
        <ul>
          {citedSourceIds.map((sourceId) => {
            const source = sourcesById[sourceId];
            return (
              <li key={sourceId}>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  <span><b>{source.publisher}</b>{source.title}</span>
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <footer>
        <div className="footer-main">
          <div className="footer-brand"><BrandMark showName={false} size={44} /><Link href="/">{copy.backLabel}</Link></div>
        </div>
      </footer>
    </main>
  );
}
