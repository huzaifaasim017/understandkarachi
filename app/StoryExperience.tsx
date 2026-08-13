"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  ExternalLink,
  Eye,
  MapPin,
  Menu,
  Moon,
  Plane,
  Printer,
  Search,
  Ship,
  Sparkles,
  TrainFront,
  X,
  Zap,
} from "lucide-react";
import IntroWorld from "./IntroWorld";
import KarachiMap, { type MapChapter } from "./KarachiMap";
import {
  districts,
  emergencies,
  exampleJourneys,
  mainCorridors,
  normaliseSearchTerm,
  photoManifest,
  searchIndex,
  sources,
  streetGlossary,
  utilitySystems,
} from "./karachi-data";
import {
  DEFAULT_LOCALE,
  getCopy,
  isLocale,
  localeOptions,
  type ActKey,
  type JourneyId,
  type Locale,
  type PhotoStoryId,
  type SiteCopy,
} from "./karachi-i18n";

type StoryStep = {
  id: string;
  act: ActKey;
  eyebrow: string;
  title: string;
  body: string;
  remember: string;
  map: MapChapter;
  detail?: React.ReactNode;
};

const districtCameras: Record<string, { center: [number, number]; zoom: number }> = {
  south: { center: [67.02, 24.858], zoom: 10.45 },
  keamari: { center: [66.92, 24.9], zoom: 9.4 },
  west: { center: [67.005, 24.995], zoom: 9.9 },
  central: { center: [67.045, 24.955], zoom: 10.7 },
  east: { center: [67.105, 24.94], zoom: 10.4 },
  korangi: { center: [67.135, 24.845], zoom: 10.4 },
  malir: { center: [67.31, 25.03], zoom: 8.75 },
};

const ACT_KEYS: readonly ActKey[] = ["orient", "districts", "movement", "systems", "apply"];
const districtStoryOrder = ["south", "keamari", "west", "central", "east", "korangi", "malir"] as const;
const EXPLORE_CHAPTER: MapChapter = { id: "explore", mode: "explore", center: [67.08, 24.93], zoom: 9.2, pitch: 25 };
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const languageStorageKey = "understand-karachi-language";
const languageEvent = "understand-karachi-language-change";
let inMemoryLocale: Locale = DEFAULT_LOCALE;

const corridorStoryConfig = [
  { dataId: "shahrah-e-pakistan", mapId: "north-spine", center: [67.055, 24.925] as [number, number], zoom: 9.55 },
  { dataId: "shahrah-e-faisal", mapId: "airport-spine", center: [67.1, 24.875] as [number, number], zoom: 9.55 },
  { dataId: "university-road", mapId: "university-spine", center: [67.105, 24.918] as [number, number], zoom: 9.8 },
  { dataId: "korangi-spine", mapId: "korangi-spine", center: [67.13, 24.835] as [number, number], zoom: 9.75 },
  { dataId: "mauripur-hub-river", mapId: "west-spine", center: [66.95, 24.9] as [number, number], zoom: 9.45 },
] as const;

const photoFiles: Readonly<Record<PhotoStoryId, string>> = {
  "empress-market": "empress-market.jpg",
  "mazar-e-quaid": "mazar-e-quaid.jpg",
  "jinnah-airport": "jinnah-airport.jpg",
  "karachi-port": "karachi-port.jpg",
  "clifton-skyline": "clifton-skyline.jpg",
};

function subscribeToReducedMotion(callback: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function subscribeToLocale(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(languageEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(languageEvent, callback);
  };
}

function getLocaleSnapshot(): Locale {
  try {
    const stored = window.localStorage.getItem(languageStorageKey);
    return isLocale(stored) ? stored : inMemoryLocale;
  } catch {
    return inMemoryLocale;
  }
}

function setLocalePreference(locale: Locale) {
  inMemoryLocale = locale;
  try {
    window.localStorage.setItem(languageStorageKey, locale);
  } catch {
    // The selector still works for this visit when storage is unavailable.
  }
  window.dispatchEvent(new Event(languageEvent));
}

function PhotoPause({ photoId, copy }: { photoId: PhotoStoryId; copy: SiteCopy }) {
  const file = photoFiles[photoId];
  const photo = photoManifest.find((item) => item.localFile.endsWith(file));
  const content = copy.photos[photoId];

  return (
    <figure className="photo-pause">
      {/* The licensed, local photographs keep their recorded intrinsic dimensions and lazy loading. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/photos/${file}`}
        alt={content.alt}
        loading="lazy"
        width={photo?.width ?? 1280}
        height={photo?.height ?? 840}
        style={{ objectPosition: photo?.objectPosition }}
      />
      <figcaption>
        <div><span>{copy.common.cityPause}</span><h3>{content.title}</h3><p>{content.body}</p></div>
        {photo && (
          <a href={photo.sourcePage} target="_blank" rel="noreferrer" aria-label={`${copy.common.photoCreditAria}: ${photo.creator}, ${photo.license}. ${copy.common.externalLinkHint}`} lang="en">
            {photo.creator} · {photo.license} <ExternalLink size={13} aria-hidden="true" />
          </a>
        )}
      </figcaption>
    </figure>
  );
}

function IconForType({ type }: { type: string }) {
  if (type.toLowerCase().includes("airport")) return <Plane size={17} />;
  if (type.toLowerCase().includes("port")) return <Ship size={17} />;
  if (type.toLowerCase().includes("rail")) return <TrainFront size={17} />;
  return <MapPin size={17} />;
}

export default function StoryExperience() {
  const locale = useSyncExternalStore(subscribeToLocale, getLocaleSnapshot, () => DEFAULT_LOCALE);
  const copy = getCopy(locale);
  const [activeId, setActiveId] = useState("compass");
  const [menuOpen, setMenuOpen] = useState(false);
  const systemReducedMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotionSnapshot, () => false);
  const [motionOverride, setMotionOverride] = useState<boolean | null>(null);
  const reducedMotion = motionOverride ?? systemReducedMotion;
  const [search, setSearch] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<{ name: string; coordinates: [number, number] } | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const storyRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const storySteps = useMemo<StoryStep[]>(() => {
    const fixed = copy.story.fixed;
    const makeFixedStep = (
      id: keyof typeof fixed,
      act: ActKey,
      map: MapChapter,
      detail?: React.ReactNode,
    ): StoryStep => ({ id, act, ...fixed[id], map, detail });

    const districtSteps: StoryStep[] = districtStoryOrder.flatMap((districtId, index) => {
      const district = districts.find((item) => item.id === districtId);
      if (!district) return [];
      const narrative = copy.districtNarrative[district.id];
      return [{
        id: `district-${district.id}`,
        act: "districts",
        eyebrow: copy.story.districtProgress(index + 1),
        title: district.name,
        body: narrative.body,
        remember: narrative.remember,
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
            <p><strong>{copy.story.attachTo}</strong> {district.anchor} · {district.mainCorridor}</p>
          </div>
        ),
      }];
    });

    const corridorSteps: StoryStep[] = corridorStoryConfig.flatMap((config, index) => {
      const corridor = mainCorridors.find((item) => item.id === config.dataId);
      if (!corridor) return [];
      const narrative = copy.corridorNarrative[config.dataId];
      return [{
        id: `corridor-${corridor.id}`,
        act: "movement",
        eyebrow: copy.story.spineProgress(index + 1),
        title: corridor.name,
        body: narrative.body,
        remember: narrative.remember,
        map: {
          id: `corridor-${corridor.id}`,
          mode: "corridors",
          corridor: config.mapId,
          center: config.center,
          zoom: config.zoom,
          pitch: 30,
        },
        detail: <div className="route-chain">{corridor.routeChain.map((place, placeIndex) => <span key={place}>{place}<i>{placeIndex < corridor.routeChain.length - 1 ? "→" : ""}</i></span>)}</div>,
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
      makeFixedStep("anchors", "orient", { id: "anchors", mode: "gateways", center: [67.07, 24.92], zoom: 9.4, pitch: 30 }),
      makeFixedStep(
        "layers",
        "districts",
        { id: "layers", mode: "districts", center: [67.08, 24.95], zoom: 8.9, pitch: 38 },
        <div className="hierarchy">{copy.story.hierarchy.map((item, index) => <span key={item}>{item}{index < copy.story.hierarchy.length - 1 && <i aria-hidden="true">›</i>}</span>)}</div>,
      ),
      ...districtSteps,
      makeFixedStep("names", "districts", { id: "names", mode: "gateways", center: [67.08, 24.91], zoom: 10, pitch: 22 }),
      makeFixedStep("movement-intro", "movement", { id: "movement-intro", mode: "corridors", center: [67.08, 24.93], zoom: 9, pitch: 32 }),
      ...corridorSteps,
      makeFixedStep("landmark-language", "movement", { id: "landmark-language", mode: "gateways", center: [67.09, 24.9], zoom: 9.6, pitch: 24 }, glossaryDetail),
      makeFixedStep("transit", "movement", { id: "transit", mode: "transit", center: [67.095, 24.91], zoom: 9.25, pitch: 26 }, transitDetail),
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
  }, [copy]);

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

  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? "reduce" : "full";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [reducedMotion]);

  useEffect(() => {
    document.documentElement.lang = locale === "ur-roman" ? "ur-Latn-PK" : "en";
  }, [locale]);

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
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      if (event.key === "Escape") setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1051px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  const results = useMemo(() => {
    const query = normaliseSearchTerm(search);
    if (!query) return searchIndex.filter((entry) => entry.kind === "place").slice(0, 6);
    const tokens = query.split(" ");
    return searchIndex.filter((entry) => tokens.every((token) => entry.searchText.includes(token))).slice(0, 8);
  }, [search]);

  const scrollToAct = (act: ActKey) => {
    const step = storySteps.find((item) => item.act === act);
    if (step) document.getElementById(`step-${step.id}`)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className={reducedMotion ? "reduced-motion" : ""} data-locale={locale}>
      <a href="#story" className="skip-link">{copy.common.skipToGuide}</a>
      <div className="progress-rail" aria-hidden="true"><span ref={progressRef} /></div>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label={copy.common.homeAria}><span>UK</span><b>UNDERSTAND<br />KARACHI</b></a>
        <nav aria-label={copy.common.guideChaptersAria}>
          {ACT_KEYS.map((act) => <button key={act} onClick={() => scrollToAct(act)}>{copy.acts[act]}</button>)}
        </nav>
        <div className="header-actions">
          <label className="language-control">
            <span>{copy.language.label}</span>
            <select value={locale} onChange={(event) => setLocalePreference(event.target.value as Locale)} aria-label={copy.language.ariaLabel}>
              {localeOptions.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
            </select>
          </label>
          <span className="sr-only" aria-live="polite">{copy.language.currentLanguage}: {copy.localeName}</span>
          <button className="motion-toggle" onClick={() => setMotionOverride(!reducedMotion)} aria-pressed={reducedMotion} title={copy.common.toggleMotionTitle}>
            {reducedMotion ? <Moon size={16} /> : <Sparkles size={16} />}<span>{reducedMotion ? copy.common.still : copy.common.motion}</span>
          </button>
          <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? copy.common.closeMenuAria : copy.common.openMenuAria} aria-controls="mobile-guide-menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      {menuOpen && <nav className="mobile-menu" id="mobile-guide-menu" aria-label={copy.common.mobileGuideChaptersAria}>{ACT_KEYS.map((act) => <button key={act} onClick={() => scrollToAct(act)}>{copy.acts[act]}<ArrowRight size={16} /></button>)}</nav>}

      <section className="hero" id="top">
        <div className="hero-noise" />
        <IntroWorld reducedMotion={reducedMotion} />
        <div className="hero-copy">
          <span className="kicker">{copy.hero.kicker}</span>
          <h1>{copy.hero.titleBeforeEmphasis}<br /><em>{copy.hero.titleEmphasis}</em></h1>
          <p>{copy.hero.body}</p>
          <a href="#story" className="start-button"><span>{copy.hero.start}</span><ArrowDown size={18} /></a>
        </div>
        <div className="hero-coordinate">24.8607° N<br />67.0011° E</div>
        <div className="hero-promise"><span>{copy.hero.promiseNumber}</span><p>{copy.hero.promise}</p></div>
      </section>

      <section className="opening-statement">
        <span>{copy.opening.eyebrow}</span>
        <h2>{copy.opening.title}</h2>
        <p>{copy.opening.body}</p>
      </section>

      <section className="story" id="story" ref={storyRef}>
        <aside className="story-stage">
          <KarachiMap chapter={activeStep.map} reducedMotion={reducedMotion} locale={locale} />
          <div className="stage-status"><span>{copy.acts[activeStep.act]}</span><b>{String(storySteps.indexOf(activeStep) + 1).padStart(2, "0")} / {storySteps.length}</b></div>
        </aside>
        <div className="story-copy-column">
          {storySteps.map((step, index) => (
            <article className={`story-step ${activeId === step.id ? "is-active" : ""}`} data-story-step id={`step-${step.id}`} key={step.id}>
              <div className="step-card">
                <span className="step-eyebrow">{step.eyebrow}</span>
                <h2>{step.title}</h2>
                <p>{step.body}</p>
                {step.detail}
                <div className="remember"><Eye size={17} /><div><span>{copy.common.keepThis}</span><b>{step.remember}</b></div></div>
              </div>
              {index === 2 && <PhotoPause photoId="empress-market" copy={copy} />}
              {step.id === "district-south" && <PhotoPause photoId="mazar-e-quaid" copy={copy} />}
              {step.id === "corridor-shahrah-e-faisal" && <PhotoPause photoId="jinnah-airport" copy={copy} />}
              {step.id === "gateways" && <PhotoPause photoId="karachi-port" copy={copy} />}
              {step.id === "weather" && <PhotoPause photoId="clifton-skyline" copy={copy} />}
            </article>
          ))}
        </div>
      </section>

      <section className="journeys-section">
        <div className="section-heading"><span>{copy.journeys.eyebrow}</span><h2>{copy.journeys.title}</h2><p>{copy.journeys.intro}</p></div>
        <div className="journey-grid">
          {exampleJourneys.map((journey, index) => {
            const item = copy.journeys.items[journey.id as JourneyId];
            return <article key={journey.id}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><div>{item.steps.map((step) => <p key={step}><ArrowRight size={14} />{step}</p>)}</div><b>{item.note}</b></article>;
          })}
        </div>
      </section>

      <section className="explorer-section" id="explore">
        <div className="explorer-map"><KarachiMap chapter={EXPLORE_CHAPTER} reducedMotion={reducedMotion} selectedPlace={selectedPlace} interactive locale={locale} /></div>
        <div className="explorer-panel">
          <span className="section-label">{copy.explorer.eyebrow}</span>
          <h2>{copy.explorer.title}</h2>
          <label className="search-box"><span className="sr-only">{copy.explorer.searchLabel}</span><Search size={19} aria-hidden="true" /><input ref={searchInputRef} aria-label={copy.explorer.searchLabel} aria-keyshortcuts="/" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={copy.explorer.placeholder} /><kbd>/</kbd></label>
          <div className="result-list">
            {results.map((result) => {
              const district = result.districtId ? districts.find((item) => item.id === result.districtId)?.name : undefined;
              return <button key={result.id} onClick={() => setSelectedPlace({ name: result.label, coordinates: [result.coordinates[0], result.coordinates[1]] })}><IconForType type={result.kind} /><span><b>{result.label}</b><small>{copy.explorer.kindLabels[result.kind]}{district ? ` · ${district}` : ""}</small></span><ArrowRight size={16} /></button>;
            })}
            {results.length === 0 && <p className="no-results">{copy.explorer.noResults}</p>}
          </div>
          {selectedPlace && <div className="selected-place"><MapPin /><div><span>{copy.common.selected}</span><b>{selectedPlace.name}</b></div><button onClick={() => setSelectedPlace(null)} aria-label={copy.common.clearSelectedAria}><X size={15} /></button></div>}
        </div>
      </section>

      <section className="safety-section">
        <div className="safety-copy"><span>{copy.safety.eyebrow}</span><h2>{copy.safety.title}</h2><p>{copy.safety.body}</p><div className="safety-rules">{copy.safety.rules.map((rule) => <p key={rule}>{rule}</p>)}</div></div>
        <div className="emergency-card"><span>{copy.safety.saveOffline}</span><h3>{copy.safety.emergencyTitle}</h3>{emergencies.map((item) => <a key={item.id} href={`tel:${item.number}`}><span>{copy.safety.serviceLabels[item.id] ?? item.service}</span><b>{item.number}</b></a>)}<small>{copy.safety.verifiedNote}</small></div>
      </section>

      <section className="quiz-section">
        <div className="section-heading light"><span>{copy.quiz.eyebrow}</span><h2>{copy.quiz.title}</h2></div>
        <div className="quiz-grid">
          {copy.quiz.questions.map((quiz, index) => {
            const selectedAnswer = quizAnswers[quiz.id];
            return <article key={quiz.id} role="group" aria-labelledby={`${quiz.id}-label`}><span>{String(index + 1).padStart(2, "0")}</span><h3 id={`${quiz.id}-label`}>{quiz.question}</h3>{quiz.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = option.id === quiz.answerId;
              return <button key={option.id} aria-pressed={isSelected} className={isSelected ? (isCorrect ? "correct" : "wrong") : ""} onClick={() => setQuizAnswers((value) => ({ ...value, [quiz.id]: option.id }))}>{option.label}{isSelected && (isCorrect ? " ✓" : ` ${copy.quiz.wrongSuffix}`)}</button>;
            })}<p className="quiz-feedback" role="status">{selectedAnswer ? (selectedAnswer === quiz.answerId ? copy.quiz.correct : copy.quiz.wrongFeedback) : ""}</p></article>;
          })}
        </div>
      </section>

      <section className="cheat-sheet">
        <div className="cheat-top"><div><span>{copy.cheatSheet.eyebrow}</span><h2>{copy.cheatSheet.title}</h2></div><button onClick={() => window.print()}><Printer size={17} />{copy.cheatSheet.print}</button></div>
        <div className="cheat-grid">{copy.cheatSheet.cards.map((card) => <div key={card.label}><span>{card.label}</span><p>{card.body}</p></div>)}</div>
      </section>

      <footer>
        <div className="footer-main"><div className="footer-brand"><span>UK</span><h2>Understand<br />Karachi</h2><p>{copy.footer.description}</p></div><div className="source-columns"><div><span>{copy.footer.primarySources}</span>{sources.slice(0, Math.ceil(sources.length / 2)).map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" lang="en">{source.label}<ExternalLink size={12} /></a>)}</div><div><span>{copy.footer.moreVerification}</span>{sources.slice(Math.ceil(sources.length / 2)).map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" lang="en">{source.label}<ExternalLink size={12} /></a>)}</div></div></div>
        <div className="footer-bottom"><span>{copy.footer.reviewed}</span><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" lang="en">{copy.footer.mapAttribution}</a><a href="#top">{copy.footer.backToTop} <ChevronDown size={14} /></a></div>
      </footer>
    </main>
  );
}
