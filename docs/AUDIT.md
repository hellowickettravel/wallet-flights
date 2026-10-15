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

# Batch 7: client feedback, 15 Oct 2026 (search, WhatsApp, hero, back to top, social images)

| Request | Change |
|---|---|
| "Only USA airports appearing… can't we search all destinations?" | The form only knew 50 built-in airports, listed US first. It now looks up every city and airport worldwide through our own `/api/places` route (the affiliate network's public lookup, cached for a day, called server-side so visitors' IPs aren't shared). Before typing it suggests a spread of regions (London, New York, Dubai, Paris, Istanbul, Delhi, Barcelona, Bangkok). Places outside the built-in list travel in the URL with a `from0label`/`to0label`, so /flights and the White Label get them. |
| Phone line: "Want us to book manually a flight or hotel for you?" | "Want us to book a flight or hotel for you manually?" (same meaning, reordered for grammar). |
| Clicking the number should open WhatsApp | Header, mobile menu, hero, footer and 404 links go to `wa.me/447417564704` (new tab). The contact page lists WhatsApp and a plain "Call us" (`tel:`) line. |
| Trustpilot badge in the hero (arrow in the screenshot) | "Review us on Trustpilot" pill to the right of the intro on desktop, under it on phones. |
| Search text boxes and button not equal | The fields carry a 1px ring the button didn't, so the button looked 2px shorter. The button now has the same ring. |
| Headline "…and show cheapest fare", single line, smaller | "We compare thousands of flight providers and show the cheapest fare." One line from 1024px up, sized to the viewport (28 to 36px). It wraps on phones and tablets. |
| Top pills: white rounded border | Pills now have a solid white 1px border (a real border, not a ring, so the scrolling row can't clip it). |
| Back to top button, bottom right | `BackToTop`: a sun-coloured plane on an ink circle that shows after the first screen. It uses the page's smooth scrolling (instant with reduced motion) and then moves focus to the top of the page. |
| Social media profile pictures and banners | `brand/social/social.html`, rendered by `npm run social` into `brand/social/png/`: profile picture (blue and dark versions, circle-safe), X header 1500×500, Facebook cover 1640×624 (mobile-safe centre), Instagram post 1080×1350, story 1080×1920, and a square "book it for you" WhatsApp post. No prices, ratings or reviews, since images get reshared after fares change. |

## Test
lint, typecheck, build: pass. e2e: **167 passed**, 25 skipped (demo-only and phone-only skips). New tests:
regional suggestions plus a worldwide place (stubbed lookup) going into the URL and on to the White Label;
the live `/api/places` answer for "karachi"; the WhatsApp link and Trustpilot badge in the hero; the
headline on one line on desktop; back to top appears and returns to the top. The contact test checks both
the WhatsApp and the call link.

# Site audit, 15 Oct 2026, and improvement plan
Four audits ran: technical SEO, content and AI search, performance, and UX, accessibility and backend.
The plan is in `docs/IMPROVEMENT-PLAN.md` (4 phases).

## Phase 1: indexing foundations (done)
| Item | Change |
|---|---|
| Search Console | `public/google4df2a790d730b8df.html` is served at the root. |
| Canonical host | `site.url` = `https://www.walletflights.com` (Vercel serves www; the apex 308s to it). Canonicals, sitemap, robots, OG and JSON-LD all point at www. |
| Metadata | `pageMetadata()` in `src/lib/seo.ts` gives every page its own canonical, matching `og:url`, `og:title`/`og:description`, site name, locale and Twitter tags. The layout no longer sets `canonical`/`og:url` = "/" (pages used to inherit the homepage's). A page-level `openGraph` drops the file-based share image, so the helper names it explicitly. Destination and guide pages use their photo for both OG and Twitter. |
| 404 and /go | `not-found.tsx` has its own title and `noindex`. Neither page has a canonical. |
| Duplicate host | `wallet-flights.vercel.app/*` 308s to `www.walletflights.com/*` (host-matched redirect; previews untouched). |
| robots.txt | www sitemap; `/go$` and `/go?` (exact); `/flights` crawlable so its `noindex` is seen; search, answer and training crawlers named explicitly. |
| Legacy URLs | `src/content/legacy-redirects.ts`: 35 permanent redirects from the old WordPress site (policies, blog and categories, booking tips, refunds, country pages), plus hotels and car rentals (temporary, to the owner's travel site). Tag, shop and listicle URLs stay 404. |
| Sitemap | `lastmod` on every URL from `src/content/updated.ts`. Priority and changefreq dropped (Google ignores them). |
| Small fixes | Home description is 150 characters (was 181). Real descriptions on legal pages. Destination descriptions don't say "flight times from London" on the London page. `/favicon.ico`, 192, 512 and maskable icons in the manifest. `twitter-image` re-exports the OG image. |

**Test:** lint, typecheck, build: pass. e2e: **211 passed**, 25 skipped. The new `tests/e2e/seo.spec.ts`
checks canonical = `og:url` = www on 14 page types, the full share tags, description lengths, the
404/`/go` metadata, robots rules, sitemap `lastmod`, every legacy redirect, the vercel.app host redirect
and the icons.

**Owner actions:** add `TRAVELPAYOUTS_TOKEN` in Vercel → Production (the pages show no fares without it).
Verify Search Console (Domain property, or URL-prefix for https://www.walletflights.com/). Submit the
sitemap. Import into Bing.

## Phase 2: structured data, AI search and on-page SEO (done)
| Item | Change |
|---|---|
| FAQ answers in the HTML | `DisclosurePanel` (`src/components/ui/disclosure-panel.tsx`): answers are always rendered, collapsed with a CSS grid-rows transition and `inert` when closed. Home (5) and Help (15) answers are now readable without JavaScript, and FAQPage markup matches visible text. motion/react removed from both accordions. |
| One entity | `src/lib/schema.ts`: Organization (`/#organization`, logo, E.164 `contactPoint`, `areaServed` GB/US, Trustpilot in `sameAs`) and WebSite (`/#website`, publisher). Articles reference it as author and publisher, with ISO `datePublished`/`dateModified`. Destination pages add a BreadcrumbList. One `jsonLdHtml()` escaper. |
| AI search | `/llms.txt` and `/llms-full.txt` generated from `src/content` (facts, how we make money, destinations, guides, help answers, policies). |
| Keywords | Hub titles carry intent ("Cheap flight deals from the US and UK", "Flight destinations: guides and fares", "Flight booking tips and travel guides", "Airlines we compare for cheap flights"). Destination H1 is "Flights to London" (the city stays the big display line). "Things to do in X". Shorter guide `seoTitle`s. |
| Internal links | Every deal card links its route page ("New York to London flights"). /deals lists all 37 routes by departure city. Guides link the destinations they mention (first mention). The footer group is renamed "Popular destinations". |
| Thin pages | The fare board is hidden when there are no fares (no rows of "No recent price"). Route pages without a fare are `noindex, follow` and left out of the sitemap. Both come back by themselves once fares flow (Data API token). |
| Data and copy | Delhi moved to Asia & Pacific with a Delhi photo (Humayun’s Tomb); "More in {region}" replaces "More places nearby". "Approx. flying time". Fare-board letters `data-nosnippet`. "Questions? We reply…" fixed. Curly apostrophes in FAQs. "Car hire" everywhere. "US" not "USA". Reading time computed from word count. Guides intro claim removed and moved into content. Cookie policy says hotel and car-hire links go to the owner's travel site. |
| Also fixed (from Phase 3.17) | `/api/places` never caches a failed or empty lookup (`no-store`); a brief upstream outage had blanked a search term. |

**Test:** lint, typecheck, build: pass. e2e: **219 passed**, 29 skipped (demo-only, plus fare-board checks
that need fares). New checks: every FAQ/help answer in the server HTML, the entity graph, llms.txt
files, destination H1, region links, route links from /deals, route noindex = not in sitemap, guide
links. The search-bar alignment test now measures field boxes after the entrance animation (it was
flaky) and is stricter: same top and height within 1px.

## Phase 3, part 1: performance (done)
| Plan item | Change |
|---|---|
| 3.1 Cookie banner | Server-rendered, so it paints with the page instead of after hydration (it was the mobile LCP element). An inline `<head>` script (`src/lib/consent-flag.ts`) sets `html[data-consent]` for visitors who already chose, and CSS hides it before first paint, with no flash. `max-h` plus internal scroll with sticky buttons (usable at 320px and 400% zoom). First in the DOM, so keyboard users reach it first. Back-to-top hidden while it's up. |
| 3.2 Fare board | The split-flap writes glyphs into the tiles on animation frames and flips them with the Web Animations API, so React no longer re-renders the board 46 times. Tiles use `contain: layout paint`. IntersectionObserver plus matchMedia replace motion hooks. |
| 3.3 Motion | `LazyMotion` (strict) with `domMax` loaded asynchronously (`src/components/motion-features.ts`). Every `motion.*` became `m.*` in 13 components, so the animation engine left the first-load bundle. |
| 3.4 Fonts | Bricolage without the `wdth` axis (131 KB → about 77 KB). JetBrains Mono not preloaded. "→" replaced by "to" in visible copy, so the extra symbols subset isn't fetched. |
| 3.5 | `cv-auto` (`content-visibility:auto`) on below-the-fold home sections. |
| 3.6 /deals | First two card images eager with high fetch priority. No per-card `layout` animation. The "N routes" count is a `<p>`, not an H2. |
| 3.7 Images | `deviceSizes` adds 1280/1440/1600. |
| 3.8 /flights | The placeholder is an invisible copy of the consent notice (same size, no layout shift). Demo results UI loaded with `next/dynamic`, only in demo mode. |

**Test:** lint, typecheck, build: pass. e2e: **219 passed**, 29 skipped. Re-measure PageSpeed/Lighthouse
against https://www.walletflights.com after deploy.

## Phase 3, part 2: UX, accessibility and security (done)
| Plan item | Change |
|---|---|
| 3.9 Hero entrance | The headline and intro slide in without fading (`<Reveal text>`, `.rise[data-text]`), so the LCP text paints on the first frame instead of starting at opacity 0. The search panel keeps its fade. **`experimental.inlineCss` was tried and rejected:** home HTML went from 31 KB to 85 KB gzipped (the CSS is inlined twice: once in `<style>`, once escaped in the RSC payload), and local Lighthouse got slightly worse (median LCP 4.40 s vs 4.17 s, score 80 vs 82). |
| 3.10 Header | Nav links `whitespace-nowrap`. Full WhatsApp pill from `md` to `lg` and from `xl`; icon-only between `lg` and `xl`. Checked at 1024 and 1280: one line, nothing clipped. |
| 3.11 Search form | Listbox `tabIndex=-1`. Tab or blur keeps the highlighted airport (typed text no longer lost). The highlight is tracked by airport code, so it stays put when worldwide results arrive. A polite live region announces "N airports found". Past departure dates are refused ("Choose a date from today onwards") and `withDefaultDates` replaces past dates from old links. On a failed submit, focus moves to the first invalid field. Trip-type labels don't wrap at 320px. |
| 3.12 Focus ring | Sun-coloured ring inside `.bg-ink`, `.bg-board` and `.bg-action` sections (was 2.8:1 on navy, invisible on the blue band); white cards inside them keep the blue ring. |
| 3.13 Mobile menu | Everything outside the header, plus the header bar, is `inert` while the drawer is open. Closing with X, scrim or Escape returns focus to the menu button (after the re-render, because the bar is inert until then). |
| 3.14 Marquee | Pause/play button on the logo and review marquees (`data-paused`); hidden under reduced motion, where nothing moves. |
| 3.15 Keyboard | `onRovingKeyDown` (`src/lib/roving.ts`): arrow keys, Home and End, one Tab stop per group, on trip type, the deals-rail origins, region tabs, the month calendar and the demo sort tabs. Multi-city "Going to" and "Date" fields carry a screen-reader prefix ("Flight 2, Going to"). Placeholders use full `ink-soft` (was 3.99:1). |
| 3.16 Form APIs | `src/lib/api-guard.ts`: JSON content type required (415), foreign `Origin` or cross-site `Sec-Fetch-Site` refused (403), per-IP limit of 5 per 10 minutes (429; per server instance; a site-wide limit needs a Vercel Firewall rule). Fare alerts: honeypot, a 1.5 s minimum fill time, and **double opt-in**: the sign-up emails an HMAC-signed link (`src/lib/opt-in.ts`, 7 days, no database), and `/fare-alerts/confirm` adds the address only after the visitor presses Confirm, so mail scanners that open links can't subscribe anyone. The contact name rejects control characters (it goes into the email subject). |
| 3.18 Email | `EMAIL_DRY_RUN=1` is checked before the API key, so the test server never sends real email. |
| 3.19 CSP and /go | `Content-Security-Policy-Report-Only` (`src/lib/csp.ts`) with violations logged by `/api/csp-report`. The live-search hosts were recorded from a real search (`*.apistp.com`, `avsplow.com`, `img.avs.io`, Google Fonts); the first draft would have blocked them, which is why it starts report-only. Scripts keep `'unsafe-inline'` (prerendered pages can't use nonces, and Next's inline page data can't be hashed). `/go` no longer displays the free-text `provider` and `airline` params, and demo links stop sending them. |
| 3.20 Errors | `error.tsx` and `global-error.tsx` share `ErrorScreen`: "Try again" (`retry()`), a full-reload "New search", WhatsApp and the error reference. Copy in `src/content/errors.ts`. |
| 3.21 Fare-alert copy | "Fare alerts are coming soon. Leave your email and we’ll tell you when they launch." No weekly-email promise. Copy moved to `src/content/home.ts`; the Help answer and privacy policy match. |
| 3.22 Image hosts | Privacy policy ("Who we share data with") and a new cookie-policy section disclose that photos load from Unsplash and logos from the affiliate network's logo service, which receive IP address and browser details. |
| 3.23 Small fixes | How-it-works email card no longer clipped at 1024/1280 (its offset was wider than the page gutter). Swap button on phones, on the shared edge of the stacked fields. Cabin note for premium economy and first (the live search only has economy and business). "Find us on Trustpilot" while there are no reviews. |

**Measured (local Lighthouse 13.4, simulated mobile, home, 3 runs each, median):** previous commit
score 83, LCP 3.94 s (LCP element: cookie-banner text); this batch score 82, LCP 4.17 s (LCP element: hero
intro, which is now painted). Runs vary by about 300 ms, and every version shows the same ~2.2 s render
delay in this headless harness, so it can't show a gain for 3.9. Re-measure with PageSpeed Insights on
www after deploy.

**Test:** lint, typecheck, build: pass. e2e: **237 passed**, 29 skipped (demo-only, plus fare-board checks
that need fares). New checks: Tab keeps the highlighted airport, listbox not a Tab stop, live result
count, past dates refused with focus on the first error, old links with past dates get future ones,
arrow keys on trip type and region tabs, per-leg multi-city names, cabin note, mobile menu inert and
focus return, marquee pause, fare-alert copy and the full double opt-in (forged link refused, honeypot
and too-fast sign-ups get no link), 415/403 on non-JSON and cross-site posts, control characters in the
contact name, CSP header and report endpoint, /go ignoring free-text params, "Find us on Trustpilot".
Also checked by hand in the browser: header at 1024/1280, 320px form, sun focus ring on the hero, the
rate limit (429 after 5), and the widget's real hosts on /flights.

## CSP enforced (16 Oct 2026)
The owner chose to skip the planned few days of report-only collection on www and enforce straight
away, using the hosts recorded from the 15 Oct live search. `next.config.ts` now sends
`Content-Security-Policy` (production builds only); `report-uri`/`report-to` stay, and
`/api/csp-report` now logs `CSP violation {directive, blocked, page}`. `cspHosts` is unchanged.

**Checked in the browser** (local production build on :3200, `wf_consent=s1.a0.<timestamp>`, LHR→JFK
round trip): the live search ran and showed fares. Hosts loaded: `tpwdg.com`, `api.`, `www.`,
`autocomplete.`, `tickets-api.` and `tickets-api.eu-north-1.apistp.com`, `img.avs.io`,
`fonts.googleapis.com`; no broken images. The only console CSP errors were the widget's Snowplow
calls to `http://avsplow.com/a/j`: the widget picks `http` or `https` from the page's own protocol
(`document.location.protocol === "https:" ? "https" : "http"` in `main-*.js`), so this happens only on
the plain-http local server; on www it calls `https://avsplow.com`, which is allowed. Not added.
Not checked: browser-sent reports reaching `/api/csp-report` locally (Chrome sends Reporting-API
reports later, outside the page; none arrived in the local log). The endpoint itself is covered by the
e2e test.

**Risk:** without real-visitor reports, a host the widget uses only on some screens (other routes,
filters, booking steps, mobile) or that Vercel Analytics uses would now be blocked, not just reported.
After deploy, check the Vercel logs for `CSP violation` lines and add any legitimate host to `cspHosts`.

**Test:** lint, typecheck, build: pass. e2e: **237 passed**, 29 skipped. "security headers are set" now
reads `content-security-policy` and checks the report-only header is gone.

## Phase 4, part 1: booking model, legal entity, claims, editorial policy (16 Oct 2026)
Owner's answers (16 Oct 2026): the team books **flights** by hand on WhatsApp; **hotels** go through the
sister company Wicket Travel Holidays; Wallet Flights is the trading brand of **Wicket Travel Limited**
(England and Wales, company 17001759); use "hundreds" of providers; replace "$18" with a live from-price;
no named authors or separate policy, so write base-level policies from how the site works. The company
was checked on the Companies House register the same day (active, incorporated 30 January 2026,
registered office 15 Lampton Avenue, Hounslow, TW3 4EW).

| Plan item | Change |
|---|---|
| 4.1 Booking model | One story everywhere: comparison on the site ("does not sell tickets **on this website**"), plus "our team can book a flight for you on WhatsApp", plus hotels via the sister company. Updated: footer notice (new `manual` paragraph), hero line, WhatsApp note, About, home FAQ, Help ("Can your team book a flight for me?", "Who do I pay?"), contact booking note, llms.txt. Terms: "Who we are", "Bookings made by our team" (price and fare rules confirmed before booking, airline conditions apply, changes follow fare rules), "Hotels and car hire". The old "we are not a travel agent / not a party to any booking" line is gone. Privacy: data for team bookings (passport names, date of birth, contact, travel details), contract and legal-obligation bases, sharing with airlines and WhatsApp (Meta), retention, no payment on the website. |
| 4.2 Entity and people | `company` in `src/content/site.ts`. The footer shows the trading disclosure on every page (name, number, place of registration, registered office). About has a new "Who runs Wallet Flights" section with the owner's company description, a details card and a link to the Companies House register. The sister company is named wherever it's linked (hero note, "with our sister company, Wicket Travel Holidays" on destination and route extras, terms, editorial policy). Organization schema: `legalName`, Companies House `identifier`, registered-office `address`, the register in `sameAs`, `publishingPrinciples`. |
| 4.3 Claims | H1 "We compare **hundreds** of flight providers…" (matches the logo strip). The "$18" sentence is replaced by `lowestFares()` (`src/lib/fares.ts`): the cheapest real round trip in pounds and in dollars from the featured routes, with route and trip type ("Round trips found recently: London to Lisbon from £…"). It's hidden without fare data, so it's absent until `TRAVELPAYOUTS_TOKEN` is set. |
| 4.4 Editorial policy | New `/editorial-policy` (`src/content/editorial.ts`): who writes, facts and sources, where prices come from, ordering, how we make money, dates, corrections. In the footer, sitemap and llms.txt. Guides get a byline "By The Wallet Flights team" (linked to the policy), published and updated `<time>`s, `modifiedTime` in Open Graph, and an optional `sources` list (rendered plus Article `citation`). The carry-on guide cites GOV.UK and TSA liquids rules (both checked 16 Oct 2026). |
| Also fixed | The sitemap used a guide's `published` date even when it had `updated`. |

**Not done (needs owner or legal):** ATOL / financial protection for team bookings and accepted payment
methods (`TODO(confirm)` in `src/content/legal.ts`; the terms promise no protection either way); naming the
flight-search partner as an independent controller (4.6); 4.5 content depth; 4.7 GBP / GA4.

**Test:** lint, typecheck, build: pass. e2e: **257 passed**, 29 skipped. New `tests/e2e/trust.spec.ts`
(footer company line on 4 pages, About company section and register link, terms and privacy sections,
sister-company label, help and FAQ, editorial policy, guide byline, dates and sources, llms.txt, sitemap).
Updated: H1 text, hero (no "as little as", from-price format when present, sister note), About, footer
notice, contact note, Organization schema, `/editorial-policy` in the a11y and canonical sweeps. Checked
by hand at 1280px: About company section and guide byline.

**Live check (16 Oct 2026, after pushing 42ce750):** www serves the new H1 ("hundreds"), no "as little
as", the company line in the footer, `legalName` and `publishingPrinciples` in the Organization schema,
the sister-company note, `/editorial-policy` (200, in the sitemap), the llms.txt company line and the guide
byline. The hero from-price is absent, as expected without `TRAVELPAYOUTS_TOKEN`. **PageSpeed Insights,
mobile, home:** Performance 99, Accessibility 100, Best Practices 100, SEO 100; FCP 1.2 s, LCP 2.0 s,
TBT 20 ms, CLS 0, SI 2.0 s (Phase 3 baseline: 74–84, LCP 3.2–5.7 s). The PSI API was over its daily quota
and the web tool stalled on further runs, so /deals and the route pages are still to measure.
