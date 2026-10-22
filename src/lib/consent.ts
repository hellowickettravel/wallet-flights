"use client";

import { useSyncExternalStore } from "react";
import { ANALYTICS_RENEW_BEFORE } from "./consent-flag";
import { CONSENT_REGION_COOKIE } from "./consent-region";

/**
 * Cookie consent (UK GDPR / PECR, EU ePrivacy). Optional categories stay off
 * until the visitor opts in. The choice itself is kept in a first-party,
 * strictly-necessary cookie `wf_consent` for 6 months.
 */
/** `renew`: analytics was allowed before Google Analytics was added, so we ask again (and keep it off until then). */
export type Consent = { search: boolean; analytics: boolean; at: number; renew?: boolean };
export type ConsentCategory = "search" | "analytics";

export const CONSENT_COOKIE = "wf_consent";

const MAX_AGE = 60 * 60 * 24 * 182;
const CHANGE = "wf:consent";
const OPEN = "wf:consent-open";

let cachedRaw: string | undefined;
let cached: Consent | null = null;

function readCookie(): string | undefined {
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);
}

/** Parses "s1.a0.<unix ms>"; anything else counts as "not asked yet". */
export function parseConsent(raw: string | undefined): Consent | null {
  const m = raw?.match(/^s([01])\.a([01])\.(\d+)$/);
  if (!m) return null;
  const at = Number(m[3]);
  const renew = m[2] === "1" && at < ANALYTICS_RENEW_BEFORE;
  return { search: m[1] === "1", analytics: m[2] === "1" && !renew, at, renew };
}

function snapshot(): Consent | null {
  const raw = readCookie();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cached = parseConsent(raw);
  }
  return cached;
}

function subscribe(cb: () => void) {
  window.addEventListener(CHANGE, cb);
  return () => window.removeEventListener(CHANGE, cb);
}

/** `undefined` while server-rendering, `null` when the visitor hasn't chosen yet. */
export function useConsent(): Consent | null | undefined {
  return useSyncExternalStore(subscribe, snapshot, () => undefined);
}

/**
 * Live search before the visitor has chosen: on outside the UK, EU/EEA and
 * Switzerland (the proxy's wf_geo cookie is "0"), off everywhere else.
 */
export const searchByDefault = () => new RegExp(`(?:^|; )${CONSENT_REGION_COOKIE}=0(?:;|$)`).test(document.cookie);

/** Whether live search may load: the visitor's choice, else the region default. `undefined` while server-rendering. */
export function useSearchAllowed(): boolean | undefined {
  const consent = useConsent();
  const byDefault = useSyncExternalStore(subscribe, searchByDefault, () => false);
  if (consent === undefined) return undefined;
  return consent?.search ?? byDefault;
}

// Cookies the White Label (tpwdg.com) and its Snowplow tracker set on our domain.
const SEARCH_COOKIES = [/^tpwl_/, /^hide_hotels$/, /^_sp_/];
// Google Analytics: _ga and _ga_<measurement id>, set on the apex (.walletflights.com).
const ANALYTICS_COOKIES = [/^_ga$/, /^_ga_/];

function clearCookies(patterns: RegExp[]) {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const c of document.cookie.split("; ")) {
    const name = c.split("=")[0];
    if (!patterns.some((r) => r.test(name))) continue;
    for (const d of domains) document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
  }
}

export function saveConsent(choice: Omit<Consent, "at">) {
  const before = snapshot();
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=s${choice.search ? 1 : 0}.a${choice.analytics ? 1 : 0}.${Date.now()}; Max-Age=${MAX_AGE}; path=/; SameSite=Lax${secure}`;
  if (!choice.search) clearCookies(SEARCH_COOKIES);
  if (!choice.analytics) clearCookies(ANALYTICS_COOKIES);
  document.documentElement.dataset.consent = "1";
  window.dispatchEvent(new Event(CHANGE));
  // A loaded third-party script can't be unloaded: start a clean page.
  const searchLoaded = (before?.search ?? searchByDefault()) && !choice.search && document.querySelector("script[data-tpwl]");
  const analyticsLoaded = before?.analytics && !choice.analytics && document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
  if (searchLoaded || analyticsLoaded) location.reload();
}

export const openConsentSettings = () => window.dispatchEvent(new Event(OPEN));

export function onConsentOpen(cb: () => void) {
  window.addEventListener(OPEN, cb);
  return () => window.removeEventListener(OPEN, cb);
}
