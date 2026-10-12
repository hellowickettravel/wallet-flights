# Homepage audit — Batch 1

Run against the production build (`npm run build && npm start`).

## Automated checks

| Check | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm run lint` (incl. React Compiler rules) | Pass, 0 warnings |
| `npm run build` | Pass — `/` fully static (prerendered) |
| Playwright e2e (desktop 1440 + Pixel 7) | 29 tests, all pass; stable across 3 repeated runs |
| axe-core, WCAG 2.2 A/AA | 0 serious / critical violations (desktop + mobile) |
| Horizontal overflow at 360 / 375 / 414 / 768 / 1024 / 1280 / 1440 | None |
| Reduced motion | Fare board renders final values immediately; hero entrance disabled |

## Lighthouse (local, photo CDN blocked in sandbox)

| | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| Mobile | 88 | 100 | 100 | 100 | 3.6 s (simulated 4G) | 0 |
| Desktop | 99 | 100 | 96 | 100 | 0.9 s | 0 |

- Desktop best-practices 96: console 404s from nav links prefetching pages that ship in
  Batch 2 (`/flights`, `/deals`, …). Resolves itself when those pages exist.
- Mobile LCP was measured on text because photos could not load here; re-measure once
  photos are reachable (hero photo is `fetchPriority="high"`, sized via `sizes`).

## Bugs found and fixed during test/audit

1. **Header scroll-anchoring loop** — header shrank 8px after 8px of scroll; as an in-flow
   sticky element this let scroll anchoring push scroll back under the threshold, so the page
   jittered near the top on mobile. Header height is now fixed. Regression test added.
2. **Fare board overflow** — table wider than the viewport at 375–768px, and its `sr-only`
   labels escaped the clipping panel (no positioned ancestor), widening the page. Columns now
   collapse by breakpoint; panel is `relative`. Regression tests added.
3. **Label-in-name (WCAG 2.5.3)** — deal cards and the logo link had `aria-label`s that did
   not contain their visible text. Visible text is now the accessible name.
4. **Multi-city legs keyed by index** — removing a middle flight animated the wrong row.
   Legs now have stable ids.
5. **Hero headline hidden until hydration** — a JS entrance would SSR the H1 at opacity 0.
   Replaced with a CSS entrance that starts at first paint.
6. Copy claims not backed by data ("fares booked recently", "recent prices") removed.

## Open items (need owner input)

- Real phone, email, address, hours (`src/content/site.ts`, flagged `TODO(confirm)`).
- Photos: verify and self-host once `images.unsplash.com` is reachable (`src/content/images.ts`).
- Fare alerts endpoint validates only; connect an email provider (`src/app/api/fare-alerts/route.ts`).
- Reviews section intentionally withheld until real reviews / Trustpilot are available.

---

# Batch 2 audit — About, Contact, business-model corrections

## Automated checks

| Check | Result |
|---|---|
| typecheck · lint · build | Pass — `/about` and `/contact` prerendered static; `/api/contact` dynamic |
| Playwright (desktop + Pixel 7) | 49 tests pass (96/96 across a repeated run before the last fix) |
| axe WCAG 2.2 AA on `/about`, `/contact` | 0 serious / critical |
| Horizontal overflow 360 / 768 / 1280 | None |

## Lighthouse (photo CDN blocked in sandbox)

| Page | Mobile perf / a11y / BP / SEO | Desktop perf / a11y / BP / SEO | CLS |
|---|---|---|---|
| /about | 88 / 100 / 100 / 100 | 100 / 100 / 96 / 100 | 0 |
| /contact | 96 / 100 / 100 / 100 | 100 / 100 / 96 / 100 | 0 |

Desktop BP 96 is the same known cause as batch 1: prefetches of not-yet-built pages.

## Bugs found and fixed

1. **About (mobile): price-ladder card covered the facts list.** The card was absolutely
   positioned over a photo shorter than itself. Below `lg` it now flows under the photo.
   Regression test `tests/e2e/overlap.spec.ts` checks 360–1440px.
2. **Homepage copy contradicted the business model** (agents, booking, e-tickets, calling to
   book). Replaced with comparison/affiliate wording; affiliate disclosure added to the footer.
3. Single-word orphans in page headings and intros — `text-balance` / `text-pretty`.

## Launch blockers / open items

- **Contact form and fare alerts only validate.** Messages are not delivered until
  `/api/contact` and `/api/fare-alerts` are connected to an email provider. Do not launch
  without this.
- `/flights` (search results with affiliate redirects) is not built yet; search submits there.
- Photos still unverified (CDN blocked here).
- No street address is published on the old site; only "London, United Kingdom" is shown.

---

# Batch 3 audit — search results, all remaining pages, launch readiness

## Scope
`/flights` (demo results), `/go` hand-off, `/deals`, `/destinations`, 20 × `/destinations/[slug]`,
`/airlines`, `/travel-guides`, 3 × `/travel-guides/[slug]`, `/help`, `/privacy-policy`,
`/terms-and-conditions`, `/cookie-policy`, `/photo-credits`; OG image, icons, manifest,
sitemap, security headers, email delivery, Vercel analytics.

## Automated checks

| Check | Result |
|---|---|
| typecheck · lint · build | Pass — 50 routes, all static except `/api/*` |
| Playwright (desktop + Pixel 7) | 110 tests; 220/220 across two repeated runs |
| axe WCAG 2.2 AA, every page | 0 serious / critical |
| Overflow at 360 / 768 / 1280, every page | None |
| Internal links crawl | All resolve (<400) |
| SEO endpoints (sitemap, robots, manifest, icons, OG) | 200 |
| Security headers | nosniff, DENY framing, referrer and permissions policy, no `x-powered-by` |

## Lighthouse (photo CDN blocked in sandbox)

| Page | Mobile perf / a11y / BP / SEO | Desktop |
|---|---|---|
| /destinations/lisbon | 90 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| /deals | 89 / 100 / 100 / 100 | 99 / 100 / 100 / 100 |
| /help | 91 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |

## Photos
All 26 photo slots now use photos chosen through the Unsplash API by their descriptions
(the old guessed IDs are gone). Each has its Unsplash dominant colour as a loading tone and is
credited on `/photo-credits` with Unsplash referral links.

## Bugs found and fixed
1. **Searching animation overflowed phones**: the plane moved along a pixel-space path while
   the drawn arc scaled. The plane is now positioned in SVG coordinates each frame.
2. **Mobile filter sheet: close button covered “Reset”**, so Reset couldn't be tapped.
   The header is now in normal flow; regression test added.
3. **Airline tiles KL / U2 below 4.5:1 contrast**: colours darkened.
4. **`/deals` overflowed at 360px** (two selects side by side): now a two-column grid.
5. **Vercel Analytics scripts 404 off Vercel**: rendered only when `VERCEL` is set.
6. **`/deals` heading order**: result count is now the section's H2.
7. **Unusual city pairs returned no results** in the demo engine: hub fallback added.
8. **Fare-board CTA linked to `#search`** on pages without a search: now `/#search`.

## Before launch (owner)
- Add `RESEND_API_KEY` + `EMAIL_FROM` in Vercel (forms return a clear error without them in production).
- Results are demo data with a visible notice; connect a fare API + affiliate links to go fully live.
- Legal pages: add the registered company name/number and have them reviewed.
