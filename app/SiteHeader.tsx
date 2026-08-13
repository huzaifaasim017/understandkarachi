"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import BrandMark from "./BrandMark";
import {
  localeOptions,
  type Locale,
} from "./karachi-i18n";
import { setLocalePreference } from "./features/preferences";

export type HeaderNavItem = {
  readonly href: string;
  readonly label: string;
};

type SiteHeaderProps = {
  readonly locale: Locale;
  readonly items: readonly HeaderNavItem[];
  readonly languageLabel: string;
  readonly languageAriaLabel: string;
  readonly currentLanguageLabel: string;
  readonly homeAriaLabel: string;
  readonly navigationAriaLabel: string;
  readonly mobileNavigationAriaLabel: string;
  readonly openMenuAriaLabel: string;
  readonly closeMenuAriaLabel: string;
};

export default function SiteHeader({
  locale,
  items,
  languageLabel,
  languageAriaLabel,
  currentLanguageLabel,
  homeAriaLabel,
  navigationAriaLabel,
  mobileNavigationAriaLabel,
  openMenuAriaLabel,
  closeMenuAriaLabel,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label={homeAriaLabel}>
          <BrandMark />
        </Link>
        <nav aria-label={navigationAriaLabel}>
          {items.map((item) => (
            <Link key={`${item.href}-${item.label}`} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <label className="language-control">
            <span>{languageLabel}</span>
            <select
              value={locale}
              onChange={(event) => setLocalePreference(event.target.value as Locale)}
              aria-label={languageAriaLabel}
            >
              {localeOptions.map((option) => (
                <option value={option.value} key={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <span className="sr-only" aria-live="polite">
            {currentLanguageLabel}: {localeOptions.find((option) => option.value === locale)?.label}
          </span>
          <button
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? closeMenuAriaLabel : openMenuAriaLabel}
            aria-controls="mobile-guide-menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="mobile-menu" id="mobile-guide-menu" aria-label={mobileNavigationAriaLabel}>
          {items.map((item) => (
            <Link key={`${item.href}-${item.label}`} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}<ArrowRight size={16} />
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
