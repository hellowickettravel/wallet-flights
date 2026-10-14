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

---

# Batch 4 audit — Travelpayouts integration + Skyscanner-style hero (14 Oct 2026)

Branch `travelpayouts-integration`. Dashboard audit: [`docs/TRAVELPAYOUTS.md`](TRAVELPAYOUTS.md).

## Housekeeping
- `npm audit --omit=dev`: **0 vulnerabilities**. The 5 high findings from `npm audit` are all in
  dev dependencies; no production upgrade needed (and no `audit fix --force`).

## Automated checks

| Check | Result |
|---|---|
| `npm run lint` | Pass, 0 warnings |
| `npm run typecheck` | Pass |
| `npm run build` | Pass — 88 routes (+37 `/routes/*`); priced pages revalidate hourly (`cacheLife("hours")`) |
| `npm run test:e2e` (desktop 1440 + Pixel 7) | **146 passed**, 24 skipped (demo-only + one-platform tests) |
| Demo build (`NEXT_PUBLIC_DEMO_RESULTS=true`) + `flights-demo.spec.ts` | 21 passed |
| axe WCAG 2.2 AA on every page incl. `/routes/*`, `/flights` gate and widget, `/go` | 0 serious / critical |
| Overflow 360 / 768 / 1280 on every page | None |
| Link format vs dashboard generator (6 programs) | Byte-for-byte identical (`tests/e2e/links.spec.ts`) |
| Real redirect | `tp.media/r?campaign_id=100&marker=567389&p=4114&sub_id=deals_rail…` → `aviasales.com/search/LON1503NYC20031` with live results (checked in Chrome) |
| White Label on localhost | Live LON⇄NYC results in GBP, `marker=567389.home_hero` passed through |

Tests stub `tpwdg.com` and `tp.media` (`tests/e2e/fixtures.ts`) so CI never depends on, or clicks
through, third-party services. Price tests assert both branches (priced → affiliate link; unpriced →
no price + White Label search), so they pass with or without `TRAVELPAYOUTS_TOKEN`.

## Bugs found and fixed
1. **White Label restyled the whole page.** Its CSS reset lives in `@layer isolation`, declared after
   Tailwind's layers, so it out-ranked every utility (serif text, lost layout). `globals.css` now
   declares `@layer isolation;` first, ranking it lowest.
2. **The widget mounts once per document.** Coming back to `/flights` by client navigation left
   empty containers; the page now reloads itself in that case.
3. **Trip.com city deep link** (`hotels/list?city=-1&cityName=…`) returns "0 properties" — dropped;
   the interim hotels link goes to Trip.com hotels. Airalo country pages and Tiqets `search?q=` were
   each checked (HTTP 200, correct city).
4. **Hero date fields clipped `mm/dd/yyyy`** in the joined bar at 1440px — columns rebalanced, date
   icon hidden inside the bar.
5. Price ladder (About) used invented prices → relative bars, no amounts.
6. Policy text: Snowplow cookie lifetimes measured in the browser (`_sp_id` ≈ 13 months), not assumed.

## Known / open items
- **`TRAVELPAYOUTS_TOKEN` isn't set yet**, so builds show no prices (by design). Add it in Vercel
  and `.env.local`; prices appear on the next build/revalidation.
- **Headless desktop Chromium gets 403** from the widget's search API (bot protection); real
  browsers and the mobile profile work. We don't work around it. The desktop `/flights`
  screenshot was taken in real Chrome.
- White Label domain is `https://www.walletflights.com`; `site.url` is the apex. Serve on `www` or
  change the widget domain so they match.
- The widget's "Powered by Travelpayouts" referral line renders white on our light background
  (invisible). Turn it off in the widget's Content settings, or keep it for referral income.
- Programs to join (needs owner OK): see TRAVELPAYOUTS.md. EKTA (insurance) is closing.
- Owner hotel / car-rental links: drop into `ownerLinks` in `src/content/cross-sell.ts`.
- Pre-existing dev-only "instant navigation" insight on `/destinations/[slug]` (now also
  `/routes/[slug]`): `params` read outside Suspense. Both are fully prerendered via
  `generateStaticParams`; production navigation isn't affected.
- Legal pages still need adviser review and the registered company details.

---

# Batch 5 — Client feedback (15 Oct 2026)

Feedback came from the owner as WhatsApp screenshots of wallet-flights.vercel.app.

## Plan → what changed
| # | Feedback | Change |
|---|---|---|
| 1 | "Remove this" (boxed area under the search form on `/flights`) | It was the widget's "Powered by Travelpayouts" referral link (white on light, so nearly invisible). Turned off with `window.TPWL_CONFIGURATION.showReferralLink = false`; the "Show hotels" box is off too (hotels now go to the owner's site). |
| 2 | Searching again on `/flights` sends you to the homepage and the values disappear | The widget's Search button pointed at the site root (`resultsURL` empty → `location.origin`). `TPWL_CONFIGURATION.resultsURL = origin + "/flights"` keeps searches on the page (it updates the URL in place). As a backstop, `/?flightSearch=…` now redirects to `/flights` with the query (`next.config.ts`). |
| 3 | Put a flight icon on the wallet logo, going up | New mark: white wallet with a yellow plane climbing out of it (`src/components/layout/logo-mark.tsx`, Phosphor AirplaneTilt). Shared by the header, favicon, Apple icon and OG/Twitter images. |
| 4 | Footer wording | The owner's two paragraphs verbatim (`footerNotice` in `src/content/site.ts`); the affiliate disclosure stays, without partner names. |
| 5 | Never mention Travelpayouts or Aviasales | Removed from every page, screen-reader text, the cookie banner, help and legal pages. Legal pages name the *category* ("our flight search partner", "our affiliate network"), which UK GDPR allows (Art. 13(1)(e)), and offer the name on request. The `/go` hand-off says "Flight results" for that program. |
| 6 | Trustpilot icon | "Review us on Trustpilot" in the footer, linking to the claimed profile. No stars or score: the profile has 0 reviews (checked 15 Oct 2026). |
| 7 | "Europe and USA trips from $18" | Hero intro: "Trips within Europe and the USA can cost as little as $18." Owner-supplied claim, flagged in `src/content/home.ts`. |
| 8 | Manual flight / hotel bookings by phone | Hero line "Want us to book a flight or hotel for you? Call +44 7417 564704"; header label "Book or ask by phone"; footer and Contact show "Our team can book flights and hotels for you". |
| 9 | Hotels and cars → wickettravelholidays.com | `ownerLinks` set; hero pills and "Plan the rest of your trip" cards open it in a new tab (`rel="noopener"`, not sponsored). Its Hotels/Cars tabs have no URLs, so both open the homepage. |

## Test
- `npm run lint`, `typecheck`, `build`: pass.
- `npm run test:e2e`: **154 passed**, 24 skipped (demo-only), desktop + mobile.
- New tests: widget config (results URL, no referral, no hotels box); `/?flightSearch=` redirect;
  hero phone + $18 line; owner links for hotels/cars; footer notice, Trustpilot link, and no
  "Travelpayouts"/"Aviasales" in the visible text of `/`, `/flights`, privacy, cookies and help.
- Real widget on localhost: changing the route and pressing Search stayed on `/flights`, kept the
  values, updated the URL (marker kept) and loaded live results. No partner names in the
  widget's own text.

## Open items from this batch
- **$18 claim:** UK advertising rules (CAP Code 3.22) expect "from" prices to be available in
  reasonable numbers. Keep it only while searches really return fares around that level.
- **Phone bookings vs "does not sell tickets directly":** the footer says we don't sell tickets,
  and the site now offers bookings by phone. If the phone team books through Wicket Travel
  Holidays, say so on the Terms page.
- Links to partners still pass through the affiliate network's redirect domain, and the booking
  sites the widget opens are the partners' own. Both are outside our pages.

---

# Batch 6 — Hero order, airline logos, reviews (15 Oct 2026)

## Changes
| Request | Change |
|---|---|
| Move the four shortcut pills (Flight deals, Destinations, Hotels, Car hire) to the top of the hero | Pills first, then the headline, then search. On phones they stay on one line and scroll sideways. |
| New headline about comparing thousands of providers | "We compare thousands of flight providers to find your cheapest fare." (the owner's positioning), with a shorter intro under it. |
| Moving airline-logo strip | `AirlineStrip`: 18 airline logos ride as stops along a dashed flight path, left to right. Logos come from the affiliate network's public airline-logo service (`pics.avs.io`). |
| Moving Trustpilot review carousel | `ReviewsSection`: reviews as boarding passes (quote on the main part, rating and link on a perforated stub), left to right, on the dark band. |
| "Style them our own way", not like the samples | Both were redesigned in the site's own travel language (flight path, boarding pass) instead of the bordered cards in the reference. |

Marquees (`src/components/ui/marquee.tsx`, CSS in `globals.css`): the items are rendered twice and the
track slides half its width, so the loop is seamless. The copy is `aria-hidden` and `inert`, so each item
is read and focused once. The marquee pauses on hover and focus. With reduced motion it stops and can be
scrolled by hand.

## Not done: mock reviews
The owner asked for mock reviews. We didn't add any. The Trustpilot profile has **0 reviews**, and
invented reviews presented as Trustpilot reviews are banned in the UK (DMCC Act 2024, Sch. 20, in force
6 Apr 2025, fines up to 10% of global turnover). They also break the US FTC rule (16 CFR 465) and
Trustpilot's terms. `src/content/reviews.ts` takes real reviews only, copied word for word with a link.
The carousel appears once there are 3. Until then the section shows one pass inviting a review.

## Bugs found and fixed
1. The pills' hidden screen-reader labels are absolutely positioned, so they escaped the
   scrolling row and widened the page at 360px. The pills are now `relative`.
2. On mobile, the moving logo track painted over the travellers popover and blocked taps on it,
   because transformed elements stack above earlier content. The hero is now `relative z-10`.

## Test
lint, typecheck, build: pass. e2e: **158 passed**, 24 skipped (demo-only). New tests check that the
logos are named once and move left to right, and that the reviews section shows no stars or score
while there are no reviews.
