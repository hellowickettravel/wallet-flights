# SEO content plan: the next 8 weeks (from 16 Oct 2026)

Built from the keyword research in `docs/SEO-KEYWORD-RESEARCH.md` (autocomplete demand tiers, sampled
competitors; no invented search volumes). This file is the working plan: what's live, what's next, and
how to measure it.

## Goal and honest expectation

- **Owner goal:** from under 50 impressions a fortnight to 1,000+ in about 2 weeks.
- **What we can control:** every important URL indexable, in the sitemap, linked internally, and
  answering a real search question better than the current results.
- **What we can't:** how fast Google crawls and indexes a low-authority domain with a spun-content past.
  1,000+ in 14 days is possible only if the route pages and the new guides are indexed quickly. The
  research puts 1,000+ a fortnight more realistically in weeks 4 to 8. Treat day 14 as "all priority
  URLs indexed, impressions rising week on week".

## The biggest lever: 63 indexable pages that answer questions

| Page group | Count | Status (16 Oct 2026) | Main query pattern |
|---|---|---|---|
| Route pages `/routes/*` | 37 | **Now indexable** (were `noindex` in production) | "{A} to {B} flight time", "how long is the flight from {A} to {B}", "how far", "time difference" |
| Destination pages `/destinations/*` | 20 | Retitled, question-led | "best time to visit {city}", "how long is the flight to {city}", "do I need a visa for {country}" |
| Travel guides `/travel-guides/*` | 9 | 6 new today | See wave 1 below |

## How many posts, and why

**Wave 1: 6 posts, all published 16 Oct 2026.** Each is 1,000 to 1,600 words, sourced only from
regulators, governments and airports read on the day, with a short answer, tables, an FAQ and FAQPage /
BlogPosting markup. Six is the number that could be written to that standard; more, thinner posts would
hurt a domain that Google is re-evaluating after 200+ spun listicles.

**Wave 2: 9 posts over weeks 3 to 8** (about 1.5 a week), plus 27 more route pairs if at least half of
the first 37 route pages are indexed by week 3.

## Wave 1: live now

| # | Guide | Primary keyword | Secondary keywords | Market | Replaces legacy URLs |
|---|---|---|---|---|---|
| 1 | [Power bank rules on planes](/travel-guides/power-bank-rules-on-planes) | power bank on plane | can you take a power bank on a plane; power bank on plane uk; power bank limit; tsa power bank rules | UK + US | |
| 2 | [The 24-hour flight cancellation rule](/travel-guides/24-hour-flight-cancellation-rule) | 24 hour cancellation rule flights | 24 hour cancellation policy international flights; can I cancel a flight within 24 hours uk; flight refund within 24 hours | US first, UK | `/refundable-flights`, `/how-to-avoid-flight-cancellation-fees` |
| 3 | [Cancelled or delayed flight? Your rights](/travel-guides/flight-cancelled-or-delayed-rights) | cancelled flight rights; delayed flight rights | flight delay compensation uk; uk261 compensation; dot refund rules; extraordinary circumstances | UK + US | `/air-refunds`, `/flight-ticket-refunds` |
| 4 | [Liquids rules at UK airports](/travel-guides/uk-airport-liquids-rules) | liquids rules uk airports; 100ml liquids rule | liquids on plane uk; 100ml liquids heathrow / manchester; hand luggage rules for liquids | UK | |
| 5 | [Self-transfer flights and separate tickets](/travel-guides/self-transfer-separate-tickets) | self transfer flight | separate tickets booked together meaning; missed connecting flight separate tickets | UK + US | |
| 6 | [EES and ETIAS for UK and US travellers](/travel-guides/ees-etias-uk-us-travellers) | etias; entry exit system | etias start date; etias uk; etias for us citizens; do americans need a visa for europe | UK + US | |

Existing guides were retitled to their top searches: "Best time to book international flights",
"Carry-on packing list for 2 weeks", "Shoulder season in Europe: cheaper flights".

## Wave 2: weeks 3 to 8

| Week | Guide (slug) | Primary keyword | Notes |
|---|---|---|---|
| 3 | `hand-luggage-sizes-bag-fees` | airline baggage fees comparison | Then point `/airline-baggage-fees` here. Read each airline's own page; leave out Spirit (reported to have stopped flying, verify first). |
| 3 | `esta-and-uk-eta` | uk eta for us citizens / esta for usa from uk | ESTA fee is $40.62 from 16 Oct 2026 (official ESTA site); UK ETA £20 (GOV.UK). |
| 4 | `half-term-flights` | cheap half term flights | **Publish by mid-November** for February half-term planning. |
| 4 | `how-long-a-layover` | how long is a good layover for international flights | |
| 5 | `how-to-find-cheap-flights` | how to find cheap flights | Then point `/how-to-find-the-cheapest-flights` and `/flight-booking-tips` here. |
| 6 | `are-last-minute-flights-cheaper` | are last minute flights cheaper | Link from `/deals`; keep `/last-minute-flight-deals` → `/deals`. |
| 6 | `first-long-haul-flight-tips` | long haul flight tips | |
| 7 | `how-early-to-get-to-the-airport` | how early should I get to the airport for an international flight | Quote airline check-in deadlines from airline pages. |
| 8 | `jet-lag-tips` | jet lag tips | Health-adjacent: cite the NHS, no medical advice. |

## Route pages: next steps

1. **Week 1 (done in code):** all 37 indexable, in the sitemap, titled "{A} to {B} flight time, distance
   and fares", with a quick-answers block and "Before you fly" guide links.
2. **Week 3:** if at least half are indexed, add the next 12 pairs, ranked by search demand:
   london-to-tokyo, london-to-singapore, london-to-paris, new-york-to-paris, london-to-bangkok,
   london-to-sydney, london-to-barcelona, manchester-to-rome, london-to-istanbul, manchester-to-paris,
   london-to-cairo, new-york-to-sydney. Add the other 15 in weeks 4 to 6 (list in the research, 8.2).
3. **When checked against airline timetables:** add scheduled nonstop times and "Are there direct
   flights?" answers, with a check date. Never estimate a schedule. `TODO(confirm)` in
   `src/content/route-facts.ts`.

## Rules for every new guide

- Answer first; a "short answer" box; tables where the topic compares things; an FAQ of real questions.
- Every rule or figure from an official page read on the day, listed under Sources. No statistics we
  can't cite, no promised outcomes, no "Travelpayouts" or "Aviasales" in visible text.
- Link to at least two related guides and the relevant route or destination pages.
- Title (`seoTitle`) of 60 characters or less; excerpt (meta description) 110 to 160 characters.
- Time-sensitive pages (EES/ETIAS, liquids, power banks): re-check monthly and update `updated`.

## Measurement (Search Console)

- **Daily, days 1 to 14:** URL Inspection on new URLs until "URL is on Google"; Pages report for
  "Discovered/Crawled – currently not indexed" (the second is a thin-content signal for route pages).
- **Weekly:** impressions and average position by page group (filters `/routes/`, `/travel-guides/`,
  `/destinations/`); queries in positions 8 to 30 are the ones to improve first (title, answer, links).
- **Week 3 decision:** route expansion (above) and which wave 2 posts to bring forward.
