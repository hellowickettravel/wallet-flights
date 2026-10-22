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

## Phase 4, part 2: content depth (plan item 4.5, 16 Oct 2026)
| Area | Change |
|---|---|
| Guides | All three rewritten and expanded in `src/content/guides.ts`, `updated: 2026-10-16`. Word counts (as `readingMinutes` counts them, before the excerpts were shortened by a few words): when-to-book **about 1,230** (6 min, was ~250), shoulder season **about 1,110** (5 min), carry-on **about 1,040** (5 min). New sections: booking windows by trip type, peak dates for UK and US travellers, when waiting pays, US 24-hour rule and refunds, UK cancellation rights; shoulder-season fares, weather, getting around, Schengen 90/180, UK passport dates, EES, ETIAS; choosing a bag, what to leave behind, UK and US liquids, batteries and power banks, gate-checked bags. |
| Sources | Every rule or figure maps to an official page in the guide's `sources`, each opened and read on 16 Oct 2026: US DOT refunds (24-hour rule, 6-hour international significant change), CAA cancellations (refund or reroute, compensation with under 14 days' notice), GOV.UK school term dates, GOV.UK Spain and Türkiye entry requirements (passport issue/expiry, 90 in 180, EES fingerprints and photo, under-12s photo only), EC short-stay calculator, EU ETIAS site (not in operation, EUR 20), GOV.UK hand luggage and liquids (100ml at most airports, some allow 2 litres, 1-litre bag where asked, 2-litre medical/dietary/baby exemption), TSA 3.4 oz / quart bag, CAA what-to-pack (two power banks, no recharging on board), FAA PackSafe (100 Wh, 101–160 Wh with approval, max two). DOT and FAA block scripted fetches, so they were read in the browser. Not used: airline cabin-bag sizes (pages render client-side; the guide says to check the airline), travel.state.gov (Cloudflare bot check; named in text, not linked). Corrected from memory while checking: the UK ETA now costs £20 (not used in copy). |
| Destinations | `src/content/destination-guides.ts` gains `whenToGo`, `flying` (which airports serve the city, how people usually fly from the UK and US) and `entry` (GOV.UK entry requirements per country, all 18 URLs checked; the UK ETA page for London and CBP's ESTA page for New York). Rendered as "Visiting {city}" on each destination page, with a US-passport pointer outside the UK and US; also in llms-full.txt. No prices, schedules or journey times. Airport-to-city transport is left out: airport sites mostly block automated checks, and only Rome's Leonardo Express was confirmed (adr.it), so it's the only one named. |
| New guides | Proposed, not published: `docs/GUIDE-PROPOSALS.md` (refund and compensation rights, cheap-flight routine, bag fees, last-minute flights, optional first long-haul). Each lists the legacy URLs it replaces and the redirect change to make once it's live. Redirects unchanged until the owner signs off. |
| llms-full.txt | Guides show their updated date and a Sources list. |

**Not done:** route pages enriched with per-route facts (needs per-route checking, a follow-up); the new
guides (waiting for topic sign-off); airport transfer details per destination (check each on the airport's
own site in a real browser).

**Test:** lint, typecheck, build: pass. e2e: **261 passed**, 29 skipped. New in `tests/e2e/trust.spec.ts`:
each guide reads 4+ minutes, shows the 16 Oct 2026 update and has 3+ sources, all on official domains;
the Lisbon page has "Visiting Lisbon" with When to go / Flying to Lisbon / Before you go, the GOV.UK
Portugal link and the US-passport pointer; New York links CBP's ESTA page without that pointer. The first
run caught the when-to-book excerpt (the page's meta description) at 190 characters; all three excerpts
are now 128–155. Checked by hand in the browser: the new destination section on /destinations/lisbon.

## Phase 4, part 3: route pages (plan item 4.5, 16 Oct 2026)
Each `/routes/[slug]` page gets an "About this route" section. Only facts that are certain or calculated:
| Fact | Where it comes from |
|---|---|
| Distance | Great-circle km and miles between the main airports (`src/lib/geo.ts`), rounded to 10, labelled "in a straight line". |
| Time difference | IANA time zones per city (`src/content/route-facts.ts`) read through `Intl`, so clock changes come from the runtime's tz data. Shows the difference now plus the other values in the year ("because of daylight saving time"). Cached for hours in `routeTimeDifference()` (`"use cache"`: with Cache Components the current time can only be read in a cache scope). Checked for all 37 routes, e.g. Mexico City and Cancún have no DST; LA to Sydney is 17, 18 or 19 hours. |
| Airports | Which airports serve each departure city (content), plus the destination's main airport and a link to its guide. |
| Rights | UK departures: CAA rules (refund or reroute, compensation with under 14 days' notice) and the CAA distance band, **omitted within 5% of a band edge** (London–Lisbon 1,570 km, London–Rome 1,440 km), because our coordinates are approximate and other London airports differ. US departures: DOT refund rule (6-hour international significant change). |
| Entry | UK departures: the destination's GOV.UK page (or CBP ESTA for New York). US departures: the UK ETA for London, otherwise a pointer to travel.state.gov. |

**Not done:** nonstop airlines per route. Airport sites (Manchester's A–Z list, others) don't say whether a
route is nonstop, airline timetables need a real browser per route, and search results were second-hand
booking sites. Left as `TODO(confirm)` in `src/content/route-facts.ts`. Route pages stay `noindex` without a
fare (unchanged); with this section they are less thin, so the owner may want to index them anyway.

## Owner requests (16 Oct 2026): skip link, currencies, Hotels in the menu
| Request | Change |
|---|---|
| "Skip to content" showed after pressing back to top | Cause: the back-to-top button moved focus to the first header link, the skip link, which showed on any `:focus`. Now the button moves focus only when pressed from the keyboard (`detail === 0`), and the skip link shows on `:focus-visible` only. Kept for keyboard and screen-reader users (WCAG 2.4.1 Bypass Blocks); mouse users never see it. |
| More currencies in live search | The widget reads `availableCurrencies` from `TPWL_CONFIGURATION` (found in its `main-*.js`: it filters the list against its price service and always adds the dashboard default). We pass `searchCurrencies` (`src/content/affiliates.ts`): USD, GBP, EUR, INR, CAD, AUD, AED, SAR, PKR, NGN, ZAR, SGD, JPY, CNY, MXN, BRL, TRY, CHF, NZD, THB. No extra requests or script weight. |
| Hotels in the menu | A `/hotels` page was drafted, then dropped at the owner's instruction ("the hotels page itself will be redirected to Wicket Travel Holidays"). The main menu (desktop and mobile) now has **Hotels ↗**, linking straight to the sister company's site in a new tab (no redirect hop), disclosed as "With our sister company, Wicket Travel Holidays" (tooltip and screen readers on desktop, visible in the mobile menu). `/hotels` keeps its existing temporary redirect to the same site. Nothing added to the sitemap. |

**Test:** lint, typecheck, build: pass. e2e: **266 passed**, 30 skipped. New: route facts (distance, time
difference, CAA band and its omission near an edge, DOT link, entry links by direction), back-to-top by
mouse leaves the skip link hidden and by keyboard focuses it, widget config carries the currencies, Hotels
in the desktop and mobile menus. Checked by hand on a local production build: header at 1024px (one line,
nothing clipped) and the live widget's currency menu listing all 20 currencies.

---

## SEO and AI-search pass, travel guides hub and template (16 Oct 2026)

**Plan.** Owner brief: optimise every page for search, structured data and AI engines; build a
"Travel guides" hub with a paginated grid and a better single-guide template; then plan and write new
posts from keyword research. Keyword research by a specialist agent: `docs/SEO-KEYWORD-RESEARCH.md`
(demand from autocomplete tiers, no invented volumes).

**Fixed first (owner report): the mobile menu.** The header's `backdrop-filter` made it the containing
block for `position: fixed` children, so the "full-height" drawer was squeezed into the 72px header bar
(it looked like nothing happened) and sat under the cookie banner. The drawer and scrim are now
portalled to `<body>` (z 65/70, above the banner, which is inert while the menu is open). The e2e test
now checks the drawer's height and that each link can be tapped.

**Built.**
| Area | Change |
|---|---|
| Route pages (37) | Indexable with or without fares and all in the sitemap (they were `noindex` in production, so none could earn impressions). Title "{A} to {B} flight time, distance and fares"; answer-first lead; "quick answers" block (flight time, return flight, distance, time difference, airports, best time, cancellation rights, entry) with FAQPage + WebPage markup. |
| Destination pages (20) | Title "{City} flights: best time to visit and fares"; the "Visiting" section is now question-led (best time, airport, flight time from the UK and US, visa) with FAQPage markup. |
| Hubs | CollectionPage + ItemList on /destinations, /deals, /airlines, /travel-guides; AboutPage and ContactPage; clearer About and Contact titles. |
| llms.txt / llms-full.txt | Route list, and each route's Q&A; guides include the short answer, tables, tips and FAQs. |
| Travel guides hub | Topic links, three featured guides, a paginated grid (real links to /travel-guides/page/N, 9 per page), a "Browse by topic" board in the fare-board style, and a destination band. Blog + CollectionPage markup. |
| Guide template | Topic in the breadcrumb, byline with dates and reading time, "The short answer" box, contents (sticky on desktop, folding on phones), tables, tips, numbered steps, FAQ with FAQPage markup, sources, share links (no third-party scripts) with copy link, related guides, and a CSS-only reading-progress bar. BlogPosting markup with wordCount, articleSection, keywords and isPartOf the Blog. |
| Content model | `src/content/guides/` (one file per guide, topics, `[label](href)` links in text); existing guides gained a short answer, FAQs and research-based SEO titles. |

**Test.** lint, typecheck, build: pass. e2e: 278 passed, 30 skipped, after fixing two new tests (reading
time is now one text node; list pages that don't exist are checked for noindex). New `tests/e2e/content.spec.ts`.

**Follow-up (not changed):** unknown dynamic URLs (`/routes/x`, `/destinations/x`, `/travel-guides/x`)
return status 200 with the not-found page and `noindex` because the response starts streaming before
`notFound()` runs. Noindex keeps them out of the index, but a true 404 status would be cleaner.

### Wave 1 guides (16 Oct 2026)

Six new guides from the research plan (`docs/SEO-CONTENT-PLAN.md`), each with a short answer, tables,
an FAQ and official sources read the same day (DOT pages and the ETIAS site read in a browser because
they block automated fetches):
power banks on planes, the 24-hour cancellation rule, cancelled or delayed flight rights (owner proposal 1),
UK airport liquids rules (six airports checked on their own pages), self-transfer flights, EES and ETIAS.

- Facts that differed from secondary sources: the ESTA fee is **$40.62** from 16 Oct 2026 (official
  ESTA site; the research's secondary source said $40.27). ETIAS: the official site gives no start date.
- UK "no 24-hour rule": the Consumer Contracts Regulations 2013, reg. 27(2)(c), exclude passenger transport.
- Legacy redirects: `/air-refunds` and `/flight-ticket-refunds` → the rights guide; `/refundable-flights`
  and `/how-to-avoid-flight-cancellation-fees` → the 24-hour rule guide.
- Route pages link three or four of the guides under "Before you fly" (UK or US departures; EES/ETIAS
  for Schengen destinations). The homepage shows the four newest guides.
- Photos: six new Unsplash photos, each viewed to confirm the subject, credited on /photo-credits.

**Test.** lint, typecheck, build: pass. e2e: **284 passed**, 30 skipped (new tests check every wave 1
guide's sources, FAQ, sitemap entry and internal links, and the route "Before you fly" links).

**Re-check monthly:** liquids table, power bank rules, EES/ETIAS status (update each guide's `updated`).

### Wave 2, first three guides (16 Oct 2026)

Brought forward from weeks 3 and 4 of `docs/SEO-CONTENT-PLAN.md`:
- **Hand luggage sizes and bag fees** (`/airline-baggage-fees` now redirects here). Carry-on and personal
  item sizes for United, American (read in a browser), Delta and Frontier from their own pages. BA's sizes
  sit behind a calculator, and easyJet, Ryanair and Jet2 pages blocked reading or returned errors, so the
  guide sends readers to those airlines instead of quoting unchecked figures. No fee amounts are quoted.
- **ESTA and the UK ETA.** ETA: £20, 2 years or passport expiry, decision usually within a day (up to 3
  working days), needed for transit through UK border control. ESTA: $40.62 from 16 Oct 2026, 2 years or
  passport expiry, needed for US transit (official ESTA FAQ).
- **Cheap half-term flights.** Term dates by postcode (GOV.UK), and the term-time absence fines (£80 rising
  to £160 after 21 days; court after three absences in three years). Timing advice is labelled as ours.

Three new Unsplash photos, each viewed to confirm the subject. Tests extend the guide checks to these
three (official or airline sources, FAQ, sitemap, internal links).

### Canonical host moved to the apex (16 Oct 2026)

The owner made `https://walletflights.com` the production domain in Vercel, with www 308-redirecting
to it. The site still declared www everywhere, so every canonical, og:url, sitemap `<loc>`, the
robots.txt sitemap line, llms.txt and schema URL pointed at a redirecting host. `site.url` is now
`https://walletflights.com` (one change covers all of those); the `.vercel.app` redirect goes straight to
the apex (one hop); tests now assert no www URLs. The search widget's airport lookup works on the apex.
TODO(confirm): owner to update the White Label domain (#23361) to the apex in its dashboard.
**Test:** lint, typecheck, build pass; e2e 284 passed, 30 skipped.

### Batch 5: fare calendar and delay compensation, layout and UI (17 Oct 2026)

Two new pages, built layout-first per the owner's brief (plan and design in `docs/PLAN.md` and
`docs/DESIGN.md`, Batch 5). Feature reference only: `marketing/feature-mockups/wallet-flights-tools-mockup.html`.
- **`/fare-calendar`**: route search (same airport combobox as the hero), month skyline, day calendar
  (cheap/dear days), day fare cards with Select → `/flights?…&sub=calendar`, ±3-day grid for returns,
  filters (direct, weekday, max price, departure airport, airline), route alert posting to the existing
  `/api/fare-alerts`. Data: `GET /api/fare-calendar` → `prices_for_dates` per month and direction, `use cache`
  hourly; token from `TRAVELPAYOUTS_TOKEN` only. Local `.env.local` has an empty token, so **development**
  serves labelled sample fares; production with no data shows an empty state (tested).
- **`/flight-delay-compensation`**: form + live result ticket (per passenger, total, distance band bar,
  checklist, claim time limit), rules in `src/lib/compensation.ts`, claim letter generator, share link,
  Compensair and AirHelp cards, rules table, mobile sticky amount bar.
- Footer, sitemap, `updated.ts` and llms.txt list both pages. New tokens: `fare-deep`/`fare-tint` (5.4:1),
  `dear`/`dear-tint` (5.5:1).

**Update 17 Oct 2026:** Compensair wired as a tracked link (campaign_id 86, p 4129, Sub ID
`compensation_compensair`) with its own fee wording; AirHelp card hidden (network says the project needs three
months of steady traffic before "Submit for review").
**Open, `TODO(confirm)`:** legal review of the rules wording
and the UK261 within-UK distance rule; `/api/fare-alerts` stores only the email (route + target price are
sent but not kept), so alert copy says route alerts are "launching soon".
**Test:** lint, typecheck, build pass; new `tests/e2e/tools.spec.ts` (16 tests: axe WCAG 2.2 AA, no
overflow at 360/768/1280, partner never named, calendar flows with mocked data, rules cases, letter
dialog); full e2e 300 passed, 30 skipped.

### Batch 5b: tools production pass, menu, footer (17 Oct 2026)

Owner's brief: both tools final and useful, no dummy data, nothing outside our partners, photography
in the headers, no static or hard-coded field defaults; reorganise the main menu with dropdowns; drop
"15" from the footer address.
- **Menu**: five top-level items. Flights ▾ (Search flights, Fare calendar, Flight deals, Airlines),
  Destinations, Hotels ↗, Travel help ▾ (Delay compensation, Travel guides, Help centre), About ▾ (About us,
  Contact). Desktop dropdowns are disclosure buttons (hover with a mouse, click, Enter; Escape, a click
  outside or tabbing away closes; current page marked). The phone menu shows the groups as sections.
- **Headers**: new `PhotoHeader` (photo + navy washes, white breadcrumb, H1, intro, three facts), with
  each tool's card overlapping its bottom edge. Photos: `fareCalendar` (Jack Cohen) and `compensation`
  (Preston A Larimer), subjects checked by viewing; both on the photo credits page via `photos`.
- **Fare calendar**: the development sample-fare generator is gone, so prices only ever come from the
  Data API. No fixed London–Barcelona start: it begins at a city near the visitor (Vercel geo headers,
  else time zone) and its most popular destination, with "Popular from {city}" chips and prices. Trip
  length options show the cheapest return for each length. The route alert box ("launching soon") was
  removed. Privacy policy now says the approximate location is used for that page only and not stored.
- **Compensation**: no pre-filled answers (it used to open as Gatwick–Faro, easyJet, 9 days ago, 3–4 hours,
  technical, so it showed "£350" before anyone typed). Airports and cities worldwide, every airline, a
  licence question only when it changes the answer, and a "what's still needed" checklist until complete.
  Share links carry only the answers given.
- **Footer**: registered office without the house number (owner). `TODO(confirm)` against the
  trading-disclosure rules.
- Not verifiable locally: popular destinations and real fares need `TRAVELPAYOUTS_TOKEN` (empty here); the
  first call on a cold server downloads the partner's airport and city files (~5 MB) before caching them.
**Test:** lint, typecheck, build pass; `tools.spec.ts` now 12 tests per device (24), including a fixed-route
check, the no-location state, priced trip lengths, an empty checker and the licence question; full e2e
passed after the Contact menu wording fix.

### Batch 6: ticker, fare calendar suggestion, loading, 404, phone checks (17 Oct 2026)

- Hero "found recently" prices → a ticker of up to 12 real round trips (6 per currency, cheapest
  first), each linking to its route page (`tickerFares`, `FareTicker`). Conditions in the note.
- Fare calendar suggestion card with the plane animation; real popular routes from
  `/api/fare-calendar/start`, no prices without data. Lazy-loaded (not in the first JS). Uses
  session storage `wf_teaser`, disclosed in the cookie policy.
- Calendar and checker skeletons, results skeleton restyled; page-change bar. A root
  `app/loading.tsx` was tried and dropped: streamed not-found pages then lost their
  "Page not found" title.
- 404 redesigned. Known limit: unknown `/routes/*`, `/destinations/*` and guide slugs show the
  not-found page with status 200 + noindex (Cache Components streams them; `dynamicParams` isn't
  allowed). A proxy could return a real 404 but would run on every visit to those pages, so it
  was left out for speed.
- Global pointer cursor and touch press feedback; small tap targets fixed (breadcrumbs, footer email
  and cookie settings, route links, section links, About register link, trip-length select).
- Bug: the homepage fare-alerts email field collapsed to 21 px tall on phones (`flex-1` in a column)
  → fixed. Deals filters now 16 px on phones (no iOS zoom).
- Photo header overlay is now solid (owner: no gradients).
- New `tests/e2e/experience.spec.ts`: suggestion (routes, no-data, once per visit, Escape, waits
  for consent, skipped pages), 404, and phone layout on 14 pages (no overflow at 320–414 px, ≥24 px
  targets, ≥16 px fields).


## Batch 7: route price alerts, SEO and performance recheck (17 Oct 2026)

**Price alerts (owner: the old site had them).** "Watch London to Barcelona: email me below £85" sits under the
fare calendar's results. Double opt-in: the alert travels in an HMAC-signed confirmation link and is only saved
once confirmed (`/price-alerts/confirm`, a button, so mail scanners can't confirm). Saved alerts live in Redis over
its REST API (Upstash through Vercel; memory in development and e2e). A daily cron (`vercel.json`, 07:00 UTC)
calls `/api/price-alerts/check`, which prices each route exactly as the calendar does (cheapest one-way, or
cheapest outbound + return N nights later, no filters) and emails alerts at or below the visitor's price: a lower
price the next day, the same price at most weekly. Every alert email has a stop link (`/price-alerts/stop`) and
RFC 8058 one-click unsubscribe headers. Tokens are purpose-bound, so a homepage fare-alert link can't confirm a
price alert and a confirm link can't stop one. Privacy policy updated.

**Not live until the owner adds settings.** The box only renders when email, the database and `CRON_SECRET`
are all configured (`priceAlertsReady()`, reported with the fare data), so nobody signs up for emails that
never come. TODO(confirm): owner connects Upstash for Redis in Vercel and sets `CRON_SECRET`; email moves to
the GoDaddy mailbox next batch.

**SEO recheck (production build, all 84 sitemap URLs):** status 200, self-canonical, one h1, valid JSON-LD,
og and Twitter tags on every page; confirm, stop, hand-off and unknown pages noindex; 404 for unknown paths.
Fixed: 24 titles over 60 characters now drop the " | Wallet Flights" suffix (`pageMetadata`); destination
descriptions under 160; photo-credits description lengthened.

**Lighthouse 13.4.1, local simulated mobile, 1 run each:** home 75 / 100 / 100 / 100 (LCP 4.6 s, TBT 250 ms,
CLS 0); fare calendar 80 / 100 / 100 / 100 (LCP 4.5 s, CLS 0); London to New York 77 / 100 / 100 / 100 (LCP
4.7 s, CLS 0). Photos loaded this time. Remaining cost is the shared framework chunks and the two stylesheets,
not this batch's code. PageSpeed Insights was over its daily quota; re-measure the live site there.

**Test:** lint, typecheck, build pass. e2e: **342 passed**, 44 skipped (desktop-only or phone-only), 0 failed.

### Batch 7b: email through the company mailbox (17 Oct 2026)

Owner asked to drop Resend. `walletflights.com` mail is Microsoft 365 from GoDaddy (MX
`*.mail.protection.outlook.com`), and its SPF (`include:secureserver.net` → `spf.protection.outlook.com`)
already authorises Microsoft's servers. `src/lib/email.ts` now signs in to `smtp.office365.com:587` (STARTTLS
required) with Nodemailer 10.0.14 (7.x had open SMTP-injection advisories); only `SMTP_PASS` is required.
Sign-in errors are logged with the server's reply code, never the password. Price alert stop links now carry a
random per-alert key stored with the alert instead of a signature, so they survive a secret change; an old link
can't stop a newer alert for the same route. Confirmation links are signed with `FARE_ALERT_SECRET`, else
`CRON_SECRET`, else the mailbox password. Privacy policy names Microsoft 365 as the email provider.
Microsoft's timeline for password sign-in to SMTP (Exchange Online "SMTP AUTH Basic", checked 17 Oct 2026):
unchanged until December 2026; at the end of December 2026 it is turned off by default for existing tenants
(an admin can turn it back on); final removal to be announced in the second half of 2027. A blocked sign-in
replies 550 5.7.30 (or 535 5.7.139 when SMTP AUTH is off for the mailbox). The fallback is Microsoft Graph
with an app registration. TODO(confirm): whether GoDaddy's Microsoft 365 dashboard lets the owner turn it
back on after December 2026; check in early January 2027 that the contact form still delivers.
Sources: https://techcommunity.microsoft.com/blog/exchange/updated-exchange-online-smtp-auth-basic-authentication-deprecation-timeline/4489835

## Batch 8: client feedback, prices in the visitor's currency (19 Oct 2026)

**1. Travellers counts invisible on the hero.** The popover panel is white but inherited the hero
form's `text-white`, so the adult/child/infant counts were white on white (they only showed when
selected). The panel and the count now set `text-ink`. Test: the count's colour isn't white, and + updates it.

**2. Fare calendar trip switch.** The selected option was white on a near-white track. It's now filled
with the action blue, and the fill slides between options (the homepage switch's behaviour).

**3. Currency by country, with a picker (owner: "no hard-coded drop-downs").**
- **First visit:** `src/proxy.ts` reads Vercel's `x-vercel-ip-country` and sets `wf_cur` (12 months). Its
  matcher has `missing: [{ type: "cookie", key: "wf_cur" }]`, so it runs once per visitor, never on API
  routes or files. Country → currency comes from Unicode CLDR (`src/content/country-currencies.ts`,
  generated by `npm run currencies`, 255 countries), not a hand-written map. No country (local
  development) → no cookie, and prices stay in the currency they were found in.
- **Rates:** `src/lib/rates.ts`, the public-domain daily feed by fawazahmed0 (jsDelivr, Pages mirror),
  `use cache` for a day, never caching a failure. Kept: every currency Intl lists as in use today, minus
  metals and IMF units (160 on 19 Oct). Static pages now revalidate daily so the rates stay fresh.
- **Picker** (`src/components/currency/currency-picker.tsx`): header pill (from 400px wide; under that,
  in the phone menu, opening in place). It opens a panel in the site's style (owner: the first, native
  select "looked bad"): a search box (code, currency or country, "Used in Germany"), the visitor's currency
  first with a check, then every currency the rates cover by name, with its symbol. Combobox pattern:
  arrows, Home/End, Enter, Escape returns focus. Built after hydration from the browser's Intl names. A
  code without a rate shows dollars.
- **Live search follows the picker** (owner: "not changing search result page currencies"): the widget
  reads its currency once on load and keeps its own `tpwl_currency` cookie, so /flights writes both the
  `currency` param and that cookie and re-runs the same search. A change in the widget's own currency
  menu flows back to the header (cookie watched after the widget settles).
- **Display:** pages are still prerendered in GBP/USD (structured data and Google see one price).
  `<Price>` converts server-rendered prices after hydration; `useMoney()` does the fare calendar. An
  inline head script copies the cookie to `html[data-cur]` and CSS hides prices about to change until
  converted, so £ never flashes before PKR. Converted prices are rounded to 3 significant figures (they're
  a guide); notes on /deals say so. Symbols: the short one when no other currency uses it, otherwise the
  marked form or the code (PKR, because Rs is also LKR and NPR; CA$, HK$).
- **Covered:** home ticker, deals rail, fare board (compact "PKR69K" tiles), destinations, route and
  destination pages, /deals (sorted by converted price), fare calendar, calendar suggestion, price
  alerts (stored in the visitor's currency; the daily check converts before comparing), live search
  (`currency` param and the visitor's currency added to its menu). Not converted: delay compensation
  amounts (fixed in EUR/GBP by law) and the demo-only results.
- Cookie and privacy policies list `wf_cur` and the rate source.

**Live check (19 Oct, first deploy 49550b2):** real fares converted (36 on the homepage, £32 → PKR 11,800),
none left hidden. Found and fixed: the ticker's new screen-reader words (`sr-only` is absolute) escaped the
marquee's clip and widened the phone page to 2,203px (links and `.marquee` are now `relative`); the fare
board was 58px too wide at 320px (one-character symbols on tiles, longer codes in the header "Fare (PKR)",
K/M amounts, at most 5 tiles, smaller tiles under 360px).

**Test:** lint, typecheck, build pass. New `tests/e2e/currency.spec.ts` (country → cookie once; picker
lists 100+ currencies with the visitor's first; calendar and alert in PKR; switching to USD and GBP;
invalid code → dollars; travellers count; blue trip switch). Full e2e: **358 passed**, 44 skipped, 0 failed.
Not checkable locally (no fare data): server-rendered prices on home, deals, routes; verify on the live site.

## Batch 9: client feedback, links stay on site, one date grid, compensation example (19 Oct 2026)

**Deal links stay on Wallet Flights.** The fare board arrows, destination "Recent fares", deal cards, month
bars and the route page's cheapest fare all opened the flight-search partner's own site (an affiliate link
to its search) whenever a fare had a link. `dealHref()` (`src/lib/deal-links.ts`) now always goes to our
/flights live search with the route, the fare's own dates, and the placement's `sub` (attribution rides on
the search's marker). Past dates are replaced on /flights. "Opens in a new tab" branches removed.

**Fare calendar, return trips: one grid, not two calendars** (owner's annotated mockup). `TripGrid`
(`src/components/fare-calendar/trip-grid.tsx`) replaces the month day-calendar and the ±3-day grid: leaving
dates down the side, return dates across the top, 7 × 7 return totals in the month calendar's colours. The
picked cell is ringed and its two dates turn blue; the fares for that pair show beside the grid (from 1280px;
below it on smaller screens), headed "Sun 1 Nov to Sun 8 Nov". Arrows move the window a week; picking keeps
it in place; the month bars and trip length re-centre it. It never starts before today or the first day with
fares. Cells use short prices ("£55", "20K" with "Prices in PKR" named once); full prices are in each cell's
name. One-way trips keep the month calendar, also with fares beside it. The fares panel lays out by its own
width (container queries).

**Delay compensation: worked example** (owner's choice: the big amount gets interest). A first visit opens
on a labelled example (easyJet, London Gatwick to Faro, 3 to 4 hours late, crew shortage: £350): an "Example"
strip with "Clear the example", an "Example" badge and caption on the result. The first answer changed makes
the form the visitor's; the claim letter and share link only appear then. Share links open as given.

**Also:** /deals and destination grids get `grid-cols-1` on phones (a long converted price grew the single
implicit column to 422px), deal cards are `relative` (their sr-only text escaped the rail's scroll), and the
homepage rail's note no longer says "in the departure city's currency".

**Test:** lint, typecheck, build pass. Tests rewritten for the grid (pick, highlight, fares beside it, arrows,
URL nights), one way, the example, and the internal deal links. Full e2e **358 passed**, 44 skipped, 0 failed.

**Live check (41c3f7b):** destination, route and deals pages have no links to the partner's site (10 to 41 into
our search each); the grid works on real fares (28 priced cells, dates highlighted, fares follow); compensation
opens on the £350 example. Found: the fare calendar's "Popular from" chips (real location data only) widened
phones by 705px; their sr-only "from" escaped the chip row's scroll. Every sideways-scrolling row is now
`relative`, and a new test checks that structure on every page (it can't wait for live data to show the
overflow). Full e2e **360 passed**, 44 skipped, 0 failed.

## Batch 10 — Direct flights popup (20 Oct 2026)

**Client report:** on /flights, clicking a price in the widget's "Direct flights" box did nothing useful,
while "Select ticket" on a result worked. **Found:** the popup opened but stayed on "Loading prices…": it
fetches the ticket from `tickets-api.<datacenter>.aviasales.ru`, which `connect-src` didn't allow, so the
browser blocked it (console: "violates the following Content Security Policy directive"). Results use
`*.apistp.com` (allowed), which is why the rest of the page worked. The datacenter comes from the search, so
the fix allows `https://*.aviasales.ru` in `connect-src` only (src/lib/csp.ts); it's a header, not text on
the site. The other hosts the widget's code can call were checked against the policy: all covered.

**Test:** real widget on a local production build: the Direct flights price opens the popup with every
provider's price and Buy buttons, no CSP violations over https. The security-headers test now checks the
live search's `connect-src` hosts. Lint, typecheck, build pass; full e2e **360 passed**, 44 skipped, 0 failed.

## Batch 11 — Email through Resend (20 Oct 2026)

**Owner:** Resend account made, walletflights.com added (DNS on Hostinger); emails come from
noreply@walletflights.com, replies to info@walletflights.com. **Why now:** Microsoft is retiring the mailbox
password sign-in the site used (Batch 7 note).

**Build:** `src/lib/email.ts` sends through Resend's REST API (`POST /emails`, no SDK) when
`RESEND_API_KEY` is set, from "Wallet Flights <noreply@walletflights.com>" (`site.sendingEmail`, or
`EMAIL_FROM`), reply-to the inbox (the visitor, for contact messages); custom headers pass through, so price
alerts keep one-click unsubscribe. The Microsoft 365 mailbox (`SMTP_PASS`) sends until the key is set and
stands in if Resend fails. Failures log Resend's reason (never the key). Privacy policy names Resend for
sending email (legal date 20 Oct 2026); `.env.example` and HANDOFF updated. No subscriber list in Resend
yet: a "Sending access" key can't manage contacts.

**DNS seen 20 Oct:** `resend._domainkey` DKIM is published; nothing under `send.walletflights.com` yet
(Resend's dashboard is the source of truth for which records it wants). Root SPF, DMARC (`p=none`) and the
Microsoft MX are unchanged.

**Test:** production build against a local stand-in for Resend's API: the contact form sends from noreply@
to the inbox with reply-to the visitor; a fare-alert confirmation goes to the traveller with reply-to info@;
a 403 "domain is not verified" makes the form report the service unavailable (503) and logs the reason.
Lint, typecheck, build pass; full e2e **360 passed**, 44 skipped, 0 failed.

## Batch 12 — Admin dashboard (20 Oct 2026)

**Owner:** a basic admin dashboard behind a sign-in: how many people subscribed, when the fare calendar's
price alerts run, each subscriber's record, and exports for marketing.

**Found first:** homepage fare-alert sign-ups were never stored (only emailed to info@), and price alerts kept
only their last email. So the dashboard starts recording from this batch; earlier homepage sign-ups stay in
the inbox (the page says so).

**Build:**
- `src/lib/redis.ts`: the shared Redis REST helper (price alerts moved onto it).
- `src/lib/activity.ts`: confirmed subscribers (`wf:subscribers`), an activity log (`wf:activity`: confirmed
  fare alerts, alert started/changed/sent/stopped; newest 5,000, none older than 12 months, pruned by the
  daily check) and the last 30 check runs (`wf:checks`). Writes never fail a traveller's request. Alerts now
  count their emails (`sends`).
- `src/lib/admin-auth.ts`: one account from `ADMIN_USERNAME` / `ADMIN_PASSWORD` (Vercel env, set by the
  owner); constant-time compare; 5 tries per IP per 10 minutes (same guard as the forms); the session is an
  httpOnly, SameSite=Strict, 12-hour signed cookie. The account's fingerprint is part of what's signed, so
  changing the password signs everyone out. Without both variables nobody can sign in.
- `/admin` (`src/app/admin/page.tsx`, `src/components/admin/*`, copy in `src/content/admin.ts`):
  - four counts, the daily check (next run in UK time, last 7 runs), and CSV exports (everyone, subscribers,
    price alerts, activity) with a consent note
  - find a person by email: what they signed up for, their alerts and a dated history, plus "Delete this
    person's data" for erasure requests
  - tables of alerts, subscribers and recent activity
  - the public header, footer and cookie banner are left out (`SiteOnly`)
- Kept out of search: `noindex` meta, an `X-Robots-Tag` header on `/admin` and `/api/admin/*`, and
  `Disallow: /admin` in robots.txt.
- CSV export (`/api/admin/export`): signed-in only, with a byte-order mark for Excel. Cells starting with
  = + - @ get an apostrophe, so a sign-up's city can't run as a spreadsheet formula.
- Privacy policy: the alert record and its 12-month retention, and Upstash keeps sign-ups (legal date 20 Oct 2026).

**Design read:** an internal admin page for the owner. It uses the site's tokens (ink bar, mist ground, white
panels, action blue for links and buttons, dear red only for delete). There is no motion. Tables scroll sideways
inside focusable regions on phones. (The design-taste skill marks admin panels as out of its scope; only
its contrast and empty-state rules were applied.)

**Test:** new `tests/e2e/admin.spec.ts` (desktop and mobile), covering:
- signed out: a sign-in form with no site chrome, and noindex
- a wrong password, a cross-site post, a non-JSON post and a forged cookie are all refused
- export and delete need a session
- signed in: counts, the check, a person's record, the CSV contents and formula escaping, deleting a
  person, and signing out
- no overflow at 360/768/1280 and no serious axe issues

Checked by hand on a local production build with sample data. Lint, typecheck and build pass; full e2e
**366 passed**, 44 skipped, 0 failed.

**Owner to do:** add `ADMIN_USERNAME` and `ADMIN_PASSWORD` in Vercel (Production), redeploy, then sign in at
https://walletflights.com/admin.

## Batch 13 — Google Analytics (20 Oct 2026)

**Owner:** add the Google tag for property `G-R2NBBGX7CM` to walletflights.com.

**Build:**
- `site.googleAnalyticsId` (`src/content/site.ts`). `ConsentedAnalytics` loads gtag.js through `next/script`
  (`afterInteractive`) only when the visitor has allowed the Analytics cookie category, next to Vercel
  Analytics. GA runs on production builds but not on Vercel previews or `next dev`. Google signals and ad
  personalisation are off in the `config` call, so the policies can say GA isn't used for advertising.
  Client-side page changes are counted by GA4's enhanced measurement (browser history events, on by default).
- Consent: an analytics "yes" given before 20 Oct 2026 06:15 UTC (`ANALYTICS_RENEW_BEFORE`) covered Vercel
  Analytics only, so it counts as "ask again". The banner reopens, and GA stays off until a new choice. The
  cookie policy promises "ask again where consent is needed". The head flag script applies the same rule,
  so the banner doesn't flash. Withdrawing analytics deletes `_ga` / `_ga_*` from our domain and reloads the
  page if gtag.js had loaded (the same as live search).
- CSP: GA4 hosts from Google's CSP guide (script `*.googletagmanager.com`; img `*.google-analytics.com`,
  `*.googletagmanager.com`; connect adds `*.analytics.google.com`).
- Copy: the banner's Analytics category, privacy policy (what GA records, IP not stored, Google as a
  provider, retention no more than 14 months) and cookie policy (`_ga`, `_ga_R2NBBGX7CM`, 2 years each).

**Test:** e2e fixtures stub googletagmanager.com / google-analytics.com, so tests never send real hits.
`consent.spec.ts` (desktop and mobile) covers:
- nothing from Google before a choice
- "Accept all" loads gtag.js with the ID, and the `config` call carries signals and ad personalisation off
- an old analytics choice reopens the banner with no GA
- withdrawing deletes the GA cookies and reloads without GA

**Owner to do (GA admin):**
- In the walletflights.com web stream, check that Enhanced measurement → Page views → "Page changes based on
  browser history events" is on (it is by default).
- Optionally set Data retention to 14 months.
- Check Realtime after accepting cookies on the live site.

## Batch 14 — Travelpayouts Drive (22 Oct 2026)

**Change:** the dashboard's "Manual installation" snippet for Drive in `<head>` on every page
(`src/app/layout.tsx`; loader URL in `src/content/affiliates.ts`), so Travelpayouts can verify the install.
- CSP: `mn-tz.com` and `*.mn-tz.com` added to script, connect and img. Any further host the loader pulls in
  shows up as a "CSP violation" in the Vercel logs and needs adding to `cspHosts.drive`.
- Consent: at the owner's request it loads on every page before a cookie choice (the dashboard's checker
  visits as a new visitor).

**Test:** lint and typecheck pass; the rendered `<head>` carries the script with the dashboard's attributes;
e2e fixtures stub `mn-tz.com`. Vercel preview of the change built. The first production deploy of the merge
failed fetching Google Fonts at build time (same files had built as a preview 27 s earlier), so it was
redeployed.

**Owner to do:** click "Check installation" on the Drive screen in the Travelpayouts dashboard.
