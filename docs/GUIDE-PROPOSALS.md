# New guide proposals (plan item 4.5)

**Update 16 Oct 2026:** the owner asked for posts to be written. Proposal 1 is live as
`/travel-guides/flight-cancelled-or-delayed-rights`, and its legacy URLs now redirect there (with
`/refundable-flights` and `/how-to-avoid-flight-cancellation-fees` going to the new 24-hour rule guide).
Proposals 2 to 5 are scheduled in wave 2 of `docs/SEO-CONTENT-PLAN.md`.

Nothing here is published. Each proposal replaces old WordPress topics that are now redirected to a
general page (see `src/content/legacy-redirects.ts`). Once a guide is approved, written and live, point
its legacy URLs at it in that file and update the redirect test.

All sources below were opened and read on 16 Oct 2026. Every guide would be credited to "The Wallet
Flights team", list its sources, and carry no prices, statistics or claims we can't back up.

| # | Working title | Replaces (legacy URL → current target) | Main official sources |
|---|---|---|---|
| 1 | **Flight cancelled or delayed? Your refund and compensation rights in the UK and US** | `/air-refunds`, `/flight-ticket-refunds`, `/refundable-flights`, `/how-to-avoid-flight-cancellation-fees` (all → `/help`) | CAA cancellations and delays pages; US DOT refunds page (refund on cancellation or significant change, 7 business / 20 calendar days, 24-hour rule, vouchers valid 5 years) |
| 2 | **How to find cheap flights: a step-by-step search routine** | `/how-to-find-the-cheapest-flights`, `/flight-booking-tips` (→ `/travel-guides`) | Mostly method, few figures; DOT 24-hour rule; links to our own route and month views |
| 3 | **Airline bag fees: how to stop extras costing more than the fare** | `/airline-baggage-fees` (→ carry-on guide) | CAA "Checking your baggage allowance"; DOT refunds page (bag-fee refunds when a bag is significantly delayed: 12 h domestic, 15 h / 30 h international) |
| 4 | **Last-minute flights: when late booking pays and when it doesn’t** | `/last-minute-flight-deals` (→ `/deals`), `/early-bird-discounts-on-flights` (→ when-to-book guide) | Method; links to `/deals`. Keep `/flight-deal-tracker` and `/round-trip-flight-specials` on `/deals` |
| 5 | *(optional)* **Your first long-haul flight: a practical guide** | No direct legacy URL; supports the long-haul destination pages | FAA PackSafe and CAA what-to-pack pages for batteries; GOV.UK hand luggage |

## Outlines

**1. Refund and compensation rights.** When you're owed a refund (cancellation, significant change, US
and UK definitions); refund or reroute under UK rules; when UK compensation applies (less than 14 days'
notice, extraordinary circumstances excluded) and which flights are covered; US automatic refunds and
time limits; vouchers vs refunds; booked through a travel site vs the airline; booked with our team on
WhatsApp (what we do, with the owner's wording, `TODO(confirm)`); how to claim; a checklist of what to keep.

**2. Cheap-flight routine.** Start broad (month view, nearby airports), then narrow; one-stop vs nonstop;
two one-ways; separate tickets and their risks; checking the full price with bags; when to book (links to
the when-to-book guide); watching prices; the 24-hour rule for US bookings.

**3. Bag fees.** Fare families (basic, standard, flexible) and what each includes; personal item vs cabin
bag vs checked bag; gate fees; measuring and weighing; families and shared allowances; sports and special
items; refunds for delayed bags (US); links to the carry-on checklist.

**4. Last-minute flights.** Why late fares can fall or rise; which routes are most likely to have late
deals; flexible destinations; how our deals page works (recent fares, refreshed about hourly, never
estimated); what to check before booking a late fare (passport, ETA/ESTA lead times).

## Redirect changes once each guide is live

```ts
// src/content/legacy-redirects.ts, "Refunds and changes" block
{ source: "/air-refunds", destination: "/travel-guides/<guide-1-slug>" },
{ source: "/flight-ticket-refunds", destination: "/travel-guides/<guide-1-slug>" },
{ source: "/refundable-flights", destination: "/travel-guides/<guide-1-slug>" },
{ source: "/how-to-avoid-flight-cancellation-fees", destination: "/travel-guides/<guide-1-slug>" },
// "Booking advice" block
{ source: "/how-to-find-the-cheapest-flights", destination: "/travel-guides/<guide-2-slug>" },
{ source: "/flight-booking-tips", destination: "/travel-guides/<guide-2-slug>" },
{ source: "/airline-baggage-fees", destination: "/travel-guides/<guide-3-slug>" },
{ source: "/last-minute-flight-deals", destination: "/travel-guides/<guide-4-slug>" },
```

Each new guide also needs a photo in `src/content/images.ts` (Unsplash, credited like the others).
