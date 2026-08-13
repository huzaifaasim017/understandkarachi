"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  DEFAULT_LOCALE,
  isLocale,
  type Locale,
} from "../karachi-i18n";

const languageStorageKey = "understand-karachi-language";
const languageEvent = "understand-karachi-language-change";
const motionStorageKey = "understand-karachi-reduced-motion";
const motionEvent = "understand-karachi-motion-change";
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

let inMemoryLocale: Locale = DEFAULT_LOCALE;
let inMemoryMotionOverride: boolean | null = null;

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

function subscribeToMotion(callback: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", callback);
  window.addEventListener(motionEvent, callback);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener(motionEvent, callback);
  };
}

function getMotionSnapshot() {
  try {
    const stored = window.sessionStorage.getItem(motionStorageKey);
    if (stored === "reduce") return true;
    if (stored === "full") return false;
  } catch {
    // Use the in-memory preference when session storage is unavailable.
  }
  return inMemoryMotionOverride ?? window.matchMedia(reducedMotionQuery).matches;
}

export function setLocalePreference(locale: Locale) {
  inMemoryLocale = locale;
  try {
    window.localStorage.setItem(languageStorageKey, locale);
  } catch {
    // The selector still works for this visit when storage is unavailable.
  }
  window.dispatchEvent(new Event(languageEvent));
}

export function setReducedMotionPreference(reduced: boolean) {
  inMemoryMotionOverride = reduced;
  try {
    window.sessionStorage.setItem(motionStorageKey, reduced ? "reduce" : "full");
  } catch {
    // The contextual pause control still works for this visit.
  }
  window.dispatchEvent(new Event(motionEvent));
}

export function useLocalePreference() {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocaleSnapshot,
    () => DEFAULT_LOCALE,
  );

  useEffect(() => {
    document.documentElement.lang = locale === "ur-roman" ? "ur-Latn-PK" : "en";
  }, [locale]);

  return locale;
}

export function useReducedMotionPreference() {
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    getMotionSnapshot,
    () => false,
  );

  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? "reduce" : "full";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [reducedMotion]);

  return reducedMotion;
}

export function useDocumentMetadata(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute("content", description);
  }, [description, title]);
}
