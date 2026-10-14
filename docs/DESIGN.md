# Wallet Flights — Design System

## Concept: "Clear skies, clear prices"

Big-brand OTA confidence (search first, photo-led discovery, dense orderly footer)
with one signature element that belongs to flying: a **split-flap departure board**
that shows today's fares. Everything around it stays quiet and disciplined.

## Colour

Functional colour coding, like the big OTAs: one brand navy, one action blue,
one price green, one highlight that only appears on the fare board and deal badges.

| Token | Hex | Role | Contrast on white |
|---|---|---|---|
| `ink` | `#0F1F3D` | Headings, body text, footer & fare-board ground | 16.2:1 |
| `ink-soft` | `#51607A` | Secondary text | 6.3:1 |
| `action` | `#1F5BD8` | Primary buttons, links, focus ring | 5.6:1 |
| `action-deep` | `#1746AC` | Hover/pressed | 8.1:1 |
| `fare` | `#0A7F4F` | Prices and savings only | 5.0:1 |
| `sun` | `#FFC83D` | Fare-board glyphs, deal badges (always on ink or with ink text) | ink on sun 10.6:1 |
| `canvas` | `#FFFFFF` | Page | — |
| `mist` | `#F3F6FB` | Alternate section ground, input fills | — |
| `line` | `#DFE6F0` | Borders, dividers | — |

Rules: blue means "act" — buttons, links, focus, and a whole panel only when that panel is
itself a single call to action (fare alerts); green only means money; sun only lives on ink
or as a badge fill with ink text. No gradients as decoration (photo scrims only).

## Type

- **Display:** Bricolage Grotesque (variable, 600–800, tight optical size) — has the
  confident, slightly quirky voice of travel posters without being retro.
- **UI / body:** Onest (400–700) — neutral, highly legible, tabular-friendly numerals for fares.
- **Fare board only:** JetBrains Mono — justified by the subject (airport split-flap
  displays); not used anywhere else.

Scale (rem): 0.8125 · 0.875 · 1 · 1.125 · 1.25 · 1.5 · 2 · 2.75 · 3.75 · 4.5
Headlines: `tracking-tight`, leading 1.05–1.1. Body: 16–18px, leading 1.6, ≤ 68ch.
Sentence case everywhere; no all-caps eyebrow labels.

## Shape, space, elevation

- Radius by hierarchy: hero media 28px · panels 20px · cards 16px · inputs 12px · chips/pills full.
- Spacing: 4px base; section padding 72px mobile / 112px desktop; container 1280px + 20/32px gutters.
- Elevation: navy-tinted shadows only on things that float (search panel, popovers, sticky header):
  `0 24px 48px -20px rgb(15 31 61 / .30)`. Cards in grids are flat with a 1px `line` border.

## Components (homepage batch)

Header · MobileMenu · SearchPanel (TripTabs, AirportField + swap, DateField,
TravellersPopover) · AssuranceStrip · OriginChips + DealCard rail · FareBoard (SplitFlap) ·
RegionTabs + DestinationMosaic · AgentBand · GuideCard · FaqAccordion · AlertSignup · Footer ·
SmartImage (photo with tinted fallback ground) · Button · Container.

## Motion (see `.claude/skills/framer-motion`)

- One orchestrated load: hero headline + search panel settle in (≤ 900ms).
- One signature: fare board flips its characters once when it enters view.
- Everything else is response to action: tab pill slides (`layoutId`), popovers and
  menu use presence, accordion expands, chips filter the rail with layout animation.
- No fade-up on every section; no infinite loops. `MotionConfig reducedMotion="user"`.

## Plan review — what changed and why

| First instinct | Why it was a default | Revised to |
|---|---|---|
| Centered hero headline over full-bleed photo | Every travel template does this | Left-aligned headline inside a rounded photo frame; the search panel overlaps the frame's bottom edge, as the big OTAs anchor the search |
| Three equal "why us" cards with icons | SaaS-card kit | A single assurance strip (icon + short line) directly under search |
| Deal cards everywhere | Repetitive grid | Deals as a filterable rail, plus the fare board as a distinct format |
| Testimonials carousel with stock names | Fabricated trust | Withheld until real reviews exist |
| Numbered 01/02/03 markers on features | Decoration | Numbers used only on the agent booking steps, which are a real sequence |
| Purple/teal gradient accents | AI tell | Functional OTA colour coding, photography carries the colour |

---

## Batch 2 — About & Contact

**Shared:** `PageHeader` — breadcrumb (Home / Page, with BreadcrumbList JSON-LD), H1 and one
line of intro, left aligned on white, no hero frame: inner pages lead with content rather than
repeating the homepage's photo frame.

**About**
```
[breadcrumb]
H1 + story (left, 6 cols)      | photo frame (right) with an overlaid "price ladder" card:
key facts row (4 items, line)  | example results sorted cheapest → priciest, cheapest in fare green
------------------------------------------------------------------------------------------
mist band: "How Wallet Flights works"
 (1)----dotted route----(2)----dotted route----(3)      ← real sequence, so numbered
 board-navy panel: "How we make money" (plain text) + Search / Contact buttons
```
The price ladder is the page's one memorable element: it shows the product's core idea
(every provider, sorted by price) instead of describing it. Labelled as an example.
Motion: ladder rows settle into price order once on view (layout animation); nothing else moves.

**Contact**
```
[breadcrumb] H1 "Get in touch" · "We reply within 24 hours"
form panel (white, float shadow, 7 cols)     | direct channels (email, phone, London UK)
 name · email                                | socials
 topic (segmented choices)                   | callout: "Booked through a provider?"
 message (counter)                           |
 [Send message]                              |
```
Topic uses large selectable chips (radio group) rather than a select — faster to scan, and the
"Problem with a booking" choice reveals a hint that changes/refunds are handled by the provider.
Mobile: single column, form first, channels after.

Review against defaults: no centered hero-on-photo for inner pages; no three-identical-card
"values" grid; the only numbering is the real 3-step flow; no invented stats or team photos.

---

## Batch 3 — Results page & content pages

**Results page signature:** while searching, a plane glides along a dotted arc between the two
airport codes and the provider count ticks up ("Checking 12 providers"). Then results stagger in
once. Everything after that is a response to user action (filters animate the list with layout,
the details panel expands, the sort pill slides).

```
[modify search bar — compact, white on mist]
[airline strip: ‹ EK £412  QR £428  TK £431 … ›]
[Cheapest | Fastest | Best]                   [Filters (mobile)] [Cards | Table]
filters (left, 280px, sticky) | 48 results · LHR → JFK · 12 Mar
                              | ┌ card: mark · 08:10 ──✈── 16:45 · 8h 35m · Nonstop · £412  [View deal]
                              | └ tags: cabin bag · checked bag · refundable   [Details ▾]
```
Airline marks are monogram tiles (IATA code on a brand-tinted tile), not trademarked logos.
Price stays fare green, the cheapest card gets a "Cheapest" badge, and the CTA is action blue.

**Destination guide:** full-bleed photo hero with ink scrim and the city name set large, a
facts rail (airport, best time, flight time from NYC and LON), example fares from US and UK
cities, a prefilled search panel, and related destinations.

**Articles:** narrow measure (68ch), photo header, reading time, sticky table of contents on
wide screens.

---

## Batch 4 — Skyscanner-style hero, consent, live search

**Owner direction:** homepage hero and search widget "like Skyscanner, because users find it easy".
We follow its *layout pattern* in our own tokens, type and brand (no Skyscanner assets or colours).

```
[header — unchanged]
████████████████████████ ink #0F1F3D, full bleed ████████████████████████
 H1 (Bricolage 800, left)  We compare thousands of flight providers to find your cheapest fare.
 one-line intro (white/80)
 (Round trip)(One way)(Multi-city)          ← white pill on ink for the active trip
 ┌Leaving from─┐⇄┌Going to──┬Departing┬Returning┬Travellers & cabin┬────────────┐
 │New York NYC │ │City/airp.│mm/dd    │mm/dd    │1 traveller, Econ.│Search fl. │ ← action blue
 └─────────────┘ └──────────┴─────────┴─────────┴──────────────────┴────────────┘
 [Flight deals] [Destinations] [Hotels ↗] [Car hire ↗]   ← white/10 pills, sun icons
██████████████████████████████████████████████████████████████████████████████
```
- Desktop: one joined bar — segments 2px apart (the ink shows through as dividers), outer corners
  rounded 12px, inner corners square; travellers moves *into* the bar; Search is the last segment.
- Mobile: the same fields stacked as white 12px blocks, full-width Search.
- Multi-city keeps stacked rows (as Skyscanner does). Errors switch to `#FFB4AB` on ink (9:1).
- Motion: the existing CSS `rise` entrance only (headline → intro → bar). Nothing else moves.

Review against defaults: the old rounded photo frame + floating panel is replaced, per the brief; the
one memorable element is the joined bar. No stats row, no gradient, no eyebrow labels.

**White Label** (Travelpayouts widget on `/flights`): styled in the dashboard with our tokens —
Manrope (closest available to Onest), radius 12, `action` buttons/icons/links, `fare` prices,
`ink` text, `line` strokes. Its CSS reset ships inside `@layer isolation`; `globals.css` declares
that layer *first* so it ranks below Tailwind's layers and can't restyle our page.

**Consent banner:** bottom card (radius 20, pop shadow), Accept and Reject in the same ink style so
neither is nudged; "Manage choices" reveals switches (Necessary locked, Live flight search,
Analytics). `/flights` shows a "Live prices need one cookie choice" panel until search is allowed.

**Prices:** green `fare` only for real Data API prices. No fare → no price (cards say "Search
dates", the board shows blank flaps). Cheapest-month calendar: one cell per month with a fare,
bar height relative to that city's range, cheapest month in `fare` green.
