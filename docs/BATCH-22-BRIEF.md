# Batch 22 brief: destination pages v2, four new destinations, 20 new guides (5 Nov 2026)

Owner brief (5 Nov 2026, paid client work): every destination page should give **twice the visible
value** of today's page — more useful, SEO-led, keyword-friendly content, delivered as **widgets,
cards, photos and short lines, not paragraphs**. The client judges by the UI, so desktop and mobile
must look finished. Bring every region to six destinations, and publish 20 new SEO travel guides.

Read before working: `CLAUDE.md`, `AGENTS.md`, `docs/HANDOFF.md` (working rules), `docs/DESIGN.md`
(tokens, type, the Batch 7 destination spec), the end of `docs/AUDIT.md`.

## Non-negotiable rules (from the owner, for every agent)

- **No invented facts.** No invented prices, statistics, reviews, ratings, opening hours, schedules or
  timetables. If you can't confirm it on an official/authoritative page with WebSearch, leave it out.
  Journey times may be given as "about X" when an operator, airport or tourist board page says so.
- **Never mention "Travelpayouts" or "Aviasales"** in visible text.
- Content lives in `src/content/*`, never hard-coded in components.
- Copy style: British English, plain, short, answer-first. Proper nouns correct (Türkiye, Cancún).
  No "nestled", "vibrant tapestry", "hidden gem", "bustling", "whether you're…", em-dash chains.
- Photos: Unsplash only, via the `mcp__Unsplash__search_photos` tool. Use the `urls.raw` path part
  (`photo-…`, before the `?`) as the id, `color` as tone, `user.name` as `by`, `user.username` as
  `user`. Choose only photos whose `description`/`alt_description` confirms the subject. Write your
  own clear alt text. Add photos **only to your own file** in `src/content/photos/` (see below), using
  `photo(id, alt, tone, by, user)`. Don't reuse a photo id already in `src/content/images.ts` or
  `src/content/photos/*` for a different subject.
- Only edit the files your task names. If a shared file needs a change, put the exact snippet in
  your final report and the admin merges it.
- Don't run `next build`, `npm run dev` or Playwright (the admin runs the build and tests once
  everything is merged; parallel builds collide). `npx tsc --noEmit` is fine; errors about
  `PageProps`/`LayoutProps` are expected before a build and can be ignored.
- Don't commit or push. The admin commits.

## File ownership

| Agent | Owns |
|---|---|
| UI | `src/app/destinations/[slug]/page.tsx`, `src/components/destinations/*` (new widgets), `src/content/destination-depth/index.ts` (copy), London entry in `destination-depth/europe.ts`, `src/content/photos/europe.ts` (London keys only, prefixed `london`) |
| Content: Europe | `destination-depth/europe.ts` (all cities except London), `photos/europe.ts` (non-London keys), `new-destinations/europe.ts` (Amsterdam) |
| Content: Asia & Pacific | `destination-depth/asia-pacific.ts`, `photos/asia-pacific.ts` |
| Content: Middle East & Africa | `destination-depth/middle-east-africa.ts`, `photos/middle-east-africa.ts`, `new-destinations/middle-east-africa.ts` (Marrakech, Abu Dhabi) |
| Content: Americas | `destination-depth/americas.ts`, `photos/americas.ts`, `new-destinations/americas.ts` (Miami) |
| Guides A–D | Their five `src/content/guides/<slug>.ts` files and `src/content/photos/guides-<x>.ts` |
| Admin | Shared files (`images.ts`, `guides/index.ts`, `destinations.ts`, `deals.ts`, `llms`, tests, docs), build, tests, commit |

The UI agent and the Europe agent both touch `destination-depth/europe.ts` and `photos/europe.ts`:
**UI edits only the `london` entry / `london*` keys; Europe edits only the others.** Re-read the file
right before each edit.

## Destination data: what every city needs (schema in `src/content/destination-depth/types.ts`)

Each city in `destination-depth/<region>.ts` must have every field of `DestinationDepth`:

| Field | What | Notes |
|---|---|---|
| `visual.days` | 3 items: a photo + 3–4 stops by name, matching `itinerary` order | One photo per day, of a stop on that day |
| `visual.stay` | 3 neighbourhood tiles (name matches `neighbourhoods`), `bestFor`, photo | Photo of that neighbourhood |
| `timeZone` | IANA zone, e.g. `Europe/Paris` | |
| `airports` | As today; keep sourced fares only | New cities: main airport + others that matter, transfers with official-page sources |
| `weather` | 12 letters B/G/M | |
| `climate` | Optional. Only with a full 12-month table from the national met service/WMO, with `source` | Leave out if you can't get all 12 months |
| `neighbourhoods` | 4–5 | 2–3 sentences each |
| `itinerary` | 3 days, morning/afternoon/evening | One sentence each |
| `daysNeeded`, `gettingAround` | One–three sentences, answer first | |
| `essentials` | currency, plugs, language, **emergency, tipping, water** | Emergency from an official source; tipping a common-practice line ("Not expected; round up for good service") |
| `localTips` | 4–6 `{ icon, title, text }` | Title ≤ 5 words; text ≤ 2 short sentences. Mix: money/tipping, transport ticket/app, safety or scams, etiquette/dress, SIM/eSIM, water/health, weather. Concrete and city-specific |
| `foods` | 4–6 `{ name, text }` | Real local dishes/drinks; text = what it is + where to try it, one sentence, no prices |
| `dayTrips` | exactly 3 `{ name, time, text, photo }` | `time` like "About 1 hour by train from Termini"; only well-established trips |
| `faqs` | 4–6 city-specific `{ q, a }` | Real search questions ("Is Cancún safe?", "Do I need cash in Tokyo?", "Is Dubai expensive?"). Answer first, ≤ 3 sentences, cite official pages for rules |
| `guides` | 3 slugs from `src/content/guides` | Existing guides, or the new ones listed below once they exist |

New cities also need, in `new-destinations/<region>.ts`:
- a `Destination` (slug, city, country, airport, cityCode, region, photo, blurb ≤ 70 chars), with
  the hero photo in your photos file;
- a `DestinationGuide` (bestTime, intro, highlights ×3, tip, whenToGo, flying, entry: GOV.UK
  `https://www.gov.uk/foreign-travel-advice/<country-slug>/entry-requirements` or CBP ESTA for the US).

New destinations: **Amsterdam** (AMS, city code AMS, Netherlands), **Marrakech** (RAK, RAK, Morocco),
**Abu Dhabi** (AUH, AUH, United Arab Emirates), **Miami** (MIA, MIA, United States; US entry like New
York: CBP ESTA). Airports and coordinates are already added by the admin.

## The page (UI agent)

Order, every section in the shared `GuideSection` wrapper with the sticky `SectionMenu`:

1. Hero + search (unchanged)
2. **Overview**: 3 facts + "Recent fares" board (unchanged) and, in the aside under it, a new
   **Trip essentials** widget: live local time and the difference from London and New York
   (client component, `Intl` with `timeZone`), currency with a live "1 GBP / 1 USD ≈ …" line from the
   site's own rates (`useRates`), plugs, language, emergency number, tipping, tap water.
3. **Flight times widget**: a departure-board style list from all 8 route departure cities: flight
   time (`approxFlightTime`), distance, time difference, and a link to the route page when live or a
   tracked search otherwise.
4. Airports: `AirportTabs`
5. 3-day plan: photo day cards; morning/afternoon/evening revealed per card (no long text walls)
6. Where to stay: photo tiles with the "best for" line and one sentence
7. When to go: `MonthStrip` + cheapest-month calendar
8. **Know before you go**: icon grid of `localTips`
9. **What to eat**: compact food cards
10. **Day trips**: 3 photo tiles with the time chip
11. Questions: accordion (`QuestionList`) with the 6 built answers + the city `faqs`; FAQPage matches
12. Before you go: 3 guide cards; Trip extras; More in the region

Design: site tokens only (ink/sun/board/mist/action/fare), photography and icons carry the blocks,
solid colours (no new gradients), one signature element (the fare board), no motion beyond what
exists. Phones first: no horizontal page scroll at 360 px, tap targets ≥ 24 px, sideways rails
contained. Load `frontend-design`, `design-taste`, `ui-ux-pro-max` skills.

## The 20 new guides

| Agent | Slug | Topic | Primary keyword |
|---|---|---|---|
| A | `are-last-minute-flights-cheaper` | booking | are last minute flights cheaper |
| A | `cheapest-day-to-fly` | booking | cheapest day to fly |
| A | `direct-vs-connecting-flights` | booking | direct vs connecting flights |
| A | `basic-economy-explained` | booking | basic economy / hand-luggage-only fares explained |
| A | `flight-price-alerts` | booking | flight price alerts / how to track flight prices |
| B | `first-long-haul-flight-tips` | flying | long haul flight tips |
| B | `jet-lag-tips` | flying | jet lag tips (NHS/CDC sources, no medical advice) |
| B | `best-seat-on-a-plane` | flying | best seat on a plane |
| B | `flying-with-children` | flying | flying with children / a baby |
| B | `airport-lounge-access` | flying | airport lounge access without business class |
| C | `new-york-airports-guide` | flying | JFK vs Newark vs LaGuardia |
| C | `checked-baggage-allowances` | baggage | checked baggage allowance |
| C | `lost-or-delayed-luggage` | rights | lost luggage compensation / delayed baggage |
| C | `denied-boarding-overbooked-flights` | rights | overbooked flight compensation |
| C | `passport-validity-rules` | documents | passport validity rules / 6-month rule |
| D | `cheapest-time-to-fly-to-europe` | seasons | cheapest time to fly to Europe |
| D | `winter-sun-destinations` | seasons | winter sun from the UK |
| D | `best-time-to-visit-southeast-asia` | seasons | best time to visit Southeast Asia |
| D | `stopover-vs-layover` | flying | stopover vs layover / free stopover programmes |
| D | `dubai-travel-rules` | documents | Dubai entry and customs rules for UK and US travellers |

Each guide: the `Guide` type in `src/content/guides/types.ts`; follow the existing guides (read two,
e.g. `how-long-a-layover.ts` and `hand-luggage-sizes-bag-fees.ts`). 1,100–1,600 words; `seoTitle` ≤ 60
characters; `excerpt` 120–160 characters; `summary` 3–5 points; 5–7 sections, at least one `table`
and two `tip`s; 4–6 `faqs`; `sources` (official pages you actually found with WebSearch); `keywords`
6–10; `published: "2026-11-05"`; links to at least two existing guides and the relevant
`/destinations/<slug>` or `/routes/<slug>` pages written as `[label](/path)`; one photo in your
photos file. Every rule or figure must come from a source in `sources`; advice that's ours is
labelled as such. Export name: camelCase of the slug.
