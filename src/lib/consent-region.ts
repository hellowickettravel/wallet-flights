// Where cookie consent is asked before the live search loads. Not a "use
// client" module: the proxy (server) writes the cookie, consent.ts reads it.
//
// UK GDPR / PECR and the EU ePrivacy rules need opt-in before the search
// partner's cookies are set, so visitors in the UK (and Crown dependencies),
// the EU/EEA and Switzerland keep the "Allow live search" step. Elsewhere live
// search loads by default (owner, 22 Oct 2026) and can still be switched off
// under "Cookie settings". An unknown country (no geo header, local
// development) counts as needing consent.

/** "1" = ask before live search loads, "0" = load it by default. */
export const CONSENT_REGION_COOKIE = "wf_geo";
export const CONSENT_REGION_MAX_AGE = 60 * 60 * 24 * 30;

const OPT_IN = new Set([
  // United Kingdom and Crown dependencies, Gibraltar
  "GB", "GG", "JE", "IM", "GI",
  // EU
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV",
  "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  // EEA outside the EU, and Switzerland
  "IS", "LI", "NO", "CH",
]);

export function needsOptIn(country: string | null | undefined) {
  return !country || !/^[A-Z]{2}$/.test(country) || OPT_IN.has(country);
}
