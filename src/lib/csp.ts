// Content-Security-Policy, enforced (next.config.ts). Browsers still report
// what it blocks to /api/csp-report (Vercel logs): a host missing here shows
// up there as a "CSP violation" line, and is broken for visitors until added.
//
// Scripts keep 'unsafe-inline': pages are prerendered (cacheComponents), so
// per-request nonces aren't possible, and Next writes its page data as inline
// scripts that differ per page, so hashes can't cover them. A hash for the
// consent-flag script alone would switch 'unsafe-inline' off and break those.
// The policy still pins every other source, blocks plugins, <base> hijacking,
// framing and form posts to other sites.

/**
 * Hosts in use, by purpose. Keep in step with the privacy and cookie policies.
 * The live-search list was recorded from a real search on /flights (15 Oct 2026).
 */
export const cspHosts = {
  // Live search on /flights: the White Label script, its APIs, airline images,
  // measurement (Snowplow) and the Google Font it loads.
  search: ["https://tpwdg.com", "https://*.tpwdg.com"],
  // The Direct flights popup loads its ticket from tickets-api.<datacenter>.aviasales.ru
  // (recorded 20 Oct 2026; the datacenter varies by search, hence the wildcard).
  searchApi: ["https://*.apistp.com", "https://*.aviasales.ru", "https://avsplow.com"],
  searchImages: ["https://img.avs.io"],
  searchFonts: { style: ["https://fonts.googleapis.com"], font: ["https://fonts.gstatic.com"] },
  // Destination and guide photos.
  photos: ["https://images.unsplash.com"],
  // Airline logos.
  logos: ["https://pics.avs.io"],
  // Vercel Analytics debug script (production serves it from /_vercel/ on our own host).
  analytics: ["https://va.vercel-scripts.com"],
};

export function contentSecurityPolicy() {
  const { search, searchApi, searchImages, searchFonts, photos, logos, analytics } = cspHosts;
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'unsafe-inline'", ...search, ...analytics],
    "style-src": ["'self'", "'unsafe-inline'", ...search, ...searchFonts.style],
    "img-src": ["'self'", "data:", "blob:", ...photos, ...logos, ...search, ...searchImages],
    "font-src": ["'self'", "data:", ...search, ...searchFonts.font],
    "connect-src": ["'self'", ...search, ...searchApi, ...analytics],
    "frame-src": ["'self'", ...search],
    "worker-src": ["'self'", "blob:"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    "report-uri": ["/api/csp-report"],
    "report-to": ["csp"],
  };
  return Object.entries(directives)
    .map(([k, v]) => `${k} ${v.join(" ")}`)
    .join("; ");
}
