"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Route } from "lucide-react";
import BrandMark from "../../BrandMark";
import IntroWorld from "../../IntroWorld";
import SiteHeader from "../../SiteHeader";
import { districts, sourcesById } from "../../karachi-data";
import { briefingCopy, getCopy } from "../../karachi-i18n";
import {
  useDocumentMetadata,
  useLocalePreference,
  useReducedMotionPreference,
} from "../preferences";
import { districtAtlasCopy, districtProfilesById } from "./districtAtlasData";

export default function DistrictIndexExperience() {
  const locale = useLocalePreference();
  const reducedMotion = useReducedMotionPreference();
  const siteCopy = getCopy(locale);
  const copy = districtAtlasCopy[locale];
  useDocumentMetadata(
    locale === "ur-roman" ? "Karachi District Atlas — Understand Karachi" : "Karachi District Atlas — Understand Karachi",
    copy.intro,
  );

  return (
    <main className="atlas-page" data-locale={locale}>
      <a href="#district-list" className="skip-link">{siteCopy.common.skipToGuide}</a>
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

      <section className="atlas-hero">
        <div className="atlas-hero-copy">
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
        </div>
        <IntroWorld locale={locale} reducedMotion={reducedMotion} />
      </section>

      <section className="district-index-grid" id="district-list" aria-label={copy.title}>
        {districts.map((district, index) => {
          const profile = districtProfilesById[district.id];
          return (
            <article key={district.id} style={{ "--district": district.color } as React.CSSProperties}>
              <span className="district-index-number">{String(index + 1).padStart(2, "0")}</span>
              <h2>{district.name}</h2>
              <p>{profile.position[locale]}</p>
              <div className="district-index-facts">
                <span><MapPin size={15} aria-hidden="true" />{district.anchor}</span>
                <span><Route size={15} aria-hidden="true" />{district.mainCorridor}</span>
              </div>
              <div className="district-index-chain">
                {profile.routes[0].stops.map((stop) => <span key={stop}>{stop}</span>)}
              </div>
              <Link href={`/districts/${district.id}`}>
                {copy.open}<ArrowRight size={17} aria-hidden="true" />
              </Link>
            </article>
          );
        })}
      </section>

      <footer>
        <div className="footer-main">
          <div className="footer-brand"><BrandMark showName={false} size={52} /><h2>Understand<br />Karachi</h2></div>
          <nav className="source-list" aria-label={copy.sources}>
            {(["pbs-census-2023-table-1", "commissioner-karachi-area-map", "smta-current-route-map"] as const).map((sourceId) => {
              const source = sourcesById[sourceId];
              return <a key={sourceId} href={source.url} target="_blank" rel="noopener noreferrer" lang="en">{source.title}</a>;
            })}
          </nav>
        </div>
        <div className="footer-bottom"><span>{copy.reviewed}</span><Link href="/">{copy.back}</Link><Link href="/briefing">{briefingCopy[locale].navLabel}</Link></div>
      </footer>
    </main>
  );
}
