# Wallet Flights — Project Plan

A ground-up rebuild of walletflights.com as a custom Next.js travel agency site.
The current WordPress site is a reference for business facts only; none of its
layout, styling or copy is reused.

## 0. Working method (five phases, repeated per page batch)

| Phase | Role | Output | Exit criteria |
|---|---|---|---|
| 1. Plan | Planner | This file: brand read, sitemap, page specs | Every page has a purpose, primary action and section list |
| 2. Design | Designer | `docs/DESIGN.md`: tokens, type, components, motion | Plan reviewed against OTA references and anti-template rules |
| 3. Develop | Developer | Next.js 16 + Tailwind v4 + Motion code | Builds clean, content in data files not hard-coded in JSX |
| 4. Test | Tester | Lint, types, build, Playwright screenshots and interaction checks at 375 / 768 / 1280 / 1440 | No console errors, no horizontal scroll, all interactions work |
| 5. Audit | Auditor | axe a11y scan, contrast, keyboard, reduced motion, SEO metadata, perf notes | Zero serious/critical axe issues; findings fixed or logged |

Order of delivery: **Homepage → user approval → all remaining pages** (same five phases per batch).

## 1. Brand read

> Reading this as: a consumer flight-booking agency for budget-aware travellers,
> with a big-brand OTA language (Expedia / Tripadvisor class: search-first,
> confident, photo-rich, information-dense but calm), leaning toward Tailwind v4
> utilities + a custom display grotesque + restrained, purposeful Motion.

- **What the business is:** a flight booking agency. Travellers search or call;
  human agents find and book fares across airlines. "Wallet" = saving money.
- **Audience:** leisure travellers, families visiting relatives abroad, last-minute
  flyers; many prefer to finish a booking by phone with a person.
- **Primary actions (in order):** 1) search a route, 2) call an agent, 3) get fare alerts.
- **Trust needs:** clear phone number, real people, transparent pricing language,
  secure-booking reassurance, policies within one click.
- **What we borrow from the big brands (patterns, not visuals):**
  - Expedia: search panel as the hero's centre of gravity; trip-type tabs; deal rails
    you can filter by origin; dense but orderly footer.
  - Tripadvisor: destination discovery with editorial feel; "travel guides" content;
    strong trust signals and reviews layout (to be filled with *real* reviews only).
- **Dials:** DESIGN_VARIANCE 6 · MOTION_INTENSITY 5 · VISUAL_DENSITY 5
  (big-brand commerce: orderly grid, moderate density, motion only where it explains).

## 2. Sitemap

```
/                         Home (search-first)
/flights                  Flight search landing + results-request flow
/deals                    All fare deals, filterable by origin / region / month
/destinations             Destination index (by region)
/destinations/[slug]      Destination guide: best time, airports, sample fares, tips
/airlines                 Airlines we book, with baggage/fare-class notes
/travel-guides            Articles index (Tripadvisor-style editorial)
/travel-guides/[slug]     Article
/about                    Who we are, how we work, why book with an agent
/contact                  Phone, email, hours, contact form
/help                     FAQ / help centre (booking, changes, baggage, refunds)
/privacy-policy           Legal
/terms-and-conditions     Legal
/cookie-policy            Legal
/not-found                Custom 404 with search
```

Global: header with primary nav + always-visible phone; footer with link columns,
legal, disclaimer; mobile drawer menu; sitemap.xml, robots.txt, OG images.

## 3. Homepage spec (Batch 1)

| # | Section | Job | Primary interaction |
|---|---|---|---|
| 1 | Header | Navigation + phone, sticky, condenses on scroll | Mobile drawer |
| 2 | Hero + search | Start a search immediately | Trip-type tabs (Round trip / One way / Multi-city), From/To with swap, dates, travellers & cabin popover |
| 3 | Assurance strip | Answer "why book here" in one line each | — |
| 4 | Deals rail | Show real-looking fares from the visitor's city | Origin chips filter the rail; horizontal scroll with buttons |
| 5 | Departure board | Signature moment: split-flap fare board of today's picks | One orchestrated flip animation on view |
| 6 | Trending destinations | Inspire; Tripadvisor-style mosaic by region | Region tabs |
| 7 | Talk to an agent | Convert phone-preferring travellers | Click-to-call; 3-step real sequence |
| 8 | Travel guides | Editorial depth, SEO | Links to articles |
| 9 | FAQ preview | Remove booking doubts | Accordion |
| 10 | Fare alerts | Capture email | Inline form with validation + success state |
| 11 | Footer | Wayfinding, legal, disclaimer | — |

Content rules:
- All copy, fares, destinations and contact details live in `src/content/*.ts`.
- Fares are labelled as examples ("from", "round trip", "seen recently") with a
  disclaimer that the final price is confirmed at booking.
- **No invented testimonials.** A reviews section is designed but stays off until
  real reviews (or a Trustpilot widget) are supplied.
- Business facts not yet confirmed (phone, email, address, legal entity) are
  placeholders in `src/content/site.ts`, flagged `TODO(confirm)`.

## 4. Open inputs needed from the owner

1. Real phone number(s), support email, office address, business hours.
2. Logo (or approval of the wordmark built here).
3. Accreditations you actually hold (e.g. ARC / IATA / ASTA / BBB) — none are claimed until confirmed.
4. Real customer reviews or Trustpilot account.
5. Network access for image hosts (images.unsplash.com, images.pexels.com) so photos
   can be downloaded, checked and self-hosted.

---

# Batch 2 — About, Contact, and business-model corrections

## Confirmed business facts (from the existing WordPress site + owner)

| Fact | Value | Source |
|---|---|---|
| Model | Travel **comparison** (meta-search): results from many providers in one place, sorted cheapest → most expensive; "Book" redirects to the chosen provider via an affiliate link. Wallet Flights does not sell tickets. | Owner, old About page |
| Market | US **and** UK travellers; prices in each departure city's currency | Owner |
| Location | London, UK (no street address published) | Old Contact/About pages |
| Email | info@walletflights.com | Old Contact page |
| Phone | +44 7417 564704 | Old Contact page |
| Response time | "We will respond within 24 hours" | Old Contact page |
| Social | Instagram, X: @walletflights · Facebook page | Search results |

## Homepage copy corrections (design unchanged)

Anything implying we book, issue e-tickets, take payment, or staff "travel experts" is removed:
hero subtitle, assurance strip, agent band → "How Wallet Flights works", fare-board CTA,
FAQ answers, header/footer phone labels, metadata title, JSON-LD type. Add an affiliate
disclosure to the footer. Deals rail gains UK departure cities priced in GBP.

## About (`/about`) — two sections + footer

1. **Intro**: what Wallet Flights is, in one headline and short story; photo; key facts
   (based in London, serving US and UK travellers, results sorted by price).
2. **How it works & how we're paid**: the real 3-step sequence (search → compare cheapest
   first → book with the provider you choose), plus a plain-language affiliate explanation.
   Ends with a search CTA.

## Contact (`/contact`)

- Page header with the 24-hour reply promise.
- Contact form: name, email, topic (deal question / problem with a booking / partnerships /
  feedback / other), message; inline validation; success state. `/api/contact` validates
  (email provider hookup is a TODO, like fare alerts).
- Direct channels: email, phone, location, socials.
- A note that bookings are made with the provider, who handles changes/refunds — so travellers
  know who to contact first.

---

# Batch 3 — Search results, remaining pages, launch readiness

## `/flights` — search results (demo data until a live fare API is connected)
Reference supplied by the owner (results list with airline strip, sort, filters, details, book).
Adapted to the comparison model: no agent fare/commission; each result shows the cheapest
provider and the other providers' prices, and "View deal" hands off to the provider.

- Modify-search bar (prefilled from the URL), collapsible on mobile.
- Airline price strip: cheapest price per airline; clicking filters to that airline.
- Sort tabs: Cheapest · Fastest · Best (price/duration blend), with counts.
- Filters: stops, airlines, departure time bands, max price; mobile bottom sheet; reset.
- View toggle: cards / compact table.
- Result card: airline mark, times, duration, stops arc, baggage + fare tags, price,
  "View deal"; expandable details (segments, layover, baggage, provider prices).
- States: searching (animated route, ~1s), results, no results after filters, invalid search.
- `/go` hand-off page: "Taking you to {provider}" (demo: no external redirect).
- Clear "Demo results" notice until live prices are connected.

## Remaining pages
/deals · /destinations · /destinations/[slug] (20 guides) · /airlines · /travel-guides ·
/travel-guides/[slug] (3 articles) · /help · /privacy-policy · /terms-and-conditions · /cookie-policy

## Launch readiness (Vercel)
Email delivery for contact + alerts via Resend (env vars; graceful fallback), `.env.example`,
generated OG image + icons + manifest, security headers, Vercel Analytics (cookieless),
sitemap for every page, README deploy steps. Legal pages are templates flagged for review.

---

# Batch 4 — Travelpayouts integration (live search, real prices, affiliate links)

Owner brief (14 Oct 2026): Wallet Flights compares thousands of providers so travellers see the
cheapest, best fares without comparing manually. **Flights are the core product**; hotels and car
rental get two owner-supplied redirect links later (interim: Trip.com / Economybookings).
Dashboard audit and IDs: [`docs/TRAVELPAYOUTS.md`](TRAVELPAYOUTS.md).

| Area | Job | Source of truth |
|---|---|---|
| `/flights` | Live search + results on our domain | Travelpayouts White Label widget #23761 (script + `#tpwl-search`/`#tpwl-tickets`), consent-gated |
| Homepage search | Feeds the White Label (`flightSearch`, `origin/destination_airports`, `currency`, `marker=567389.<sub_id>`) | `src/lib/white-label.ts` |
| Deals, fare board, destination tiles, guides | Real cheapest fares, hidden when none | Aviasales Data API `prices_for_dates`, cached hourly (`src/lib/travelpayouts.ts`) |
| `/routes/[slug]` (new, 37 pages) | Route page: cheapest fare, cheapest-month calendar, search, extras | `grouped_prices?group_by=month` |
| Deal / destination buttons, `/go` | Real affiliate links with marker + `sub_id` per placement | `tp.media/r?…` format copied from the dashboard generator (`src/lib/affiliate.ts`) |
| Cross-sell | Hotels, cars, transfers, eSIM, attractions per destination | `src/content/cross-sell.ts` (owner links slot, `TODO(confirm)`) |
| Compliance | Affiliate disclosure, UK/EU consent banner gating White Label + analytics, updated policies | `src/lib/consent.ts`, `src/content/legal.ts` |
| Homepage hero | Skyscanner-style search-first hero (owner request) | see DESIGN.md Batch 4 |

Demo results UI + engine stay behind `NEXT_PUBLIC_DEMO_RESULTS=true`.

---

# Batch 5 — Travel tools: fare calendar and delay compensation (17 Oct 2026)

Owner brief: two working pages, layout and UI first. Feature reference only (not design):
`marketing/feature-mockups/wallet-flights-tools-mockup.html`.

## `/fare-calendar` — "Find the cheapest time to fly"

| # | Section | Job | Interaction |
|---|---|---|---|
| 1 | PhotoHeader | Say what the tool does | Full-bleed photo (wing at sunset) under a navy wash; three facts; the search card overlaps its bottom edge |
| 2 | Search bar | Pick the route and trip | From ⇄ To (same airport combobox as the hero), One way / Return, trip length (return only, each length priced from the loaded fares). Starts from a city near the visitor and its most popular destination; "Popular from {city}" chips with prices. No fixed default route: with no location or data, the visitor picks |
| 3 | Filters rail | Narrow the fares already loaded | Direct only, departure airport, airline, day of week, max price; reset; mobile disclosure |
| 4 | Lowest fare by month | See the cheap months at a glance | 12 bars, cheapest in fare green; click a bar to open that month; 3 insights computed from the data |
| 5 | Day calendar | Pick a day | Month nav; cheap days green, dear days red; legend |
| 6 | Day fares | Act on a day | Fare cards; Select → `/flights?…&sub=calendar` (White Label, earns the flight commission) |
| 7 | Flexible dates (return) | ±3 days around the chosen pair | 7×7 grid; picking a cell selects that pair |

Data: Data API `prices_for_dates`, one call per month and direction (12, or 24 for returns),
through `GET /api/fare-calendar`, cached hourly with `use cache`. The token is read from
`TRAVELPAYOUTS_TOKEN` on the server only. Filters run in the browser on the fares returned.
Return totals = cheapest outbound on day D + cheapest return on D + trip length (two one-way
fares, labelled as such). There is no sample data anywhere: with no token or no fares, the page shows
an empty state and a link to live search.
Starting point: `GET /api/fare-calendar/start` picks a city from Vercel's geo headers (a major city
within 150 km, else the nearest city with flights in the same country) or, without them, the city the
browser's time zone is named after; popular destinations come from the Data API (`v1/city-directions`,
falling back to the cheapest destinations from `prices_for_dates`). Place names come from the partner's
public data files (`src/lib/travel-data.ts`, cached daily). The route alert was removed: route alerts don't
send yet, so it promised something the site can't do.

## `/flight-delay-compensation` — "Check what you're owed"

| # | Section | Job | Interaction |
|---|---|---|---|
| 1 | PhotoHeader | Promise: a minute, free, UK and EU rules | Full-bleed photo (departures board) under a navy wash; the form overlaps its bottom edge |
| 2 | Checker form | Collect the facts | Nothing pre-filled. From/to search every airport and city worldwide (`/api/places`, then `/api/airport` for country and position); airline searches every airline (`/api/airlines`); "Where is {airline} licensed?" only when an unknown airline flies into the UK/EU from outside; what happened (chips), arrival delay or notice, reason, passengers, date |
| 3 | Live result | Answer as inputs change | Until complete: a checklist of what's still needed. Then: amount per passenger + total, distance band bar, checklist of why |
| 4 | Ways to claim | Turn the answer into action | Claim yourself (free letter generator), Compensair (tracked affiliate link), share link. AirHelp later, once the network opens it to us |
| 5 | Notes | Honesty | "A guide, not legal advice"; link to the rights guide |

Rules (client-side, `src/lib/compensation.ts`): UK261 / EU261 coverage; £220/£350/£520 and
€250/€400/€600 by distance (1,500 km, 3,500 km); 3-hour arrival rule; extraordinary circumstances;
50% cut for 3–4 hour delays on flights over 3,500 km; 6-year limit (5 in Scotland).
Compensair: campaign_id 86, p 4129, Sub ID `compensation_compensair`; fee copy from its programme
terms ("No win, no fee", 25–35% only if paid). AirHelp is unavailable to the project until it has three
months of steady traffic (then "Submit for review", owner's call), so its card is hidden.
Open items, `TODO(confirm)`: legal wording review.
