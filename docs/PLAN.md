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
