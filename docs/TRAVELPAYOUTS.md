# Travelpayouts — dashboard audit

Audited 14 October 2026 in app.travelpayouts.com (account ID / marker **567389**, project
**Walletflights**, `trs`/source **344771**, domain `https://www.walletflights.com`).
Every screen in the left navigation was opened; nothing was joined, accepted or changed except
the items listed under "Changes made".

## Changes made in the dashboard

| What | Why |
|---|---|
| Created **White Label widget #23361** (project Walletflights, English, USD + GBP, hotels on) | Live search + results on walletflights.com/flights (see "White Label" below). **Gone by 22 Oct 2026** (the White Label list was empty; tpwdg.com answered 404) |
| 22 Oct 2026, by the owner: created **White Label #23761** (domain `walletflights.com`, project Walletflights, English, USD, default design) | Replaces #23361; `/flights` uses it (`src/content/affiliates.ts`). Our page config still hides hotels and the referral link and widens the currency menu. The custom colours above were on #23361 and need setting again on #23761 |
| Styled it with our tokens: Manrope font (closest to Onest), radius 12, buttons/icons/links `#1F5BD8`, prices `#0A7F4F`, text `#0F1F3D`, strokes `#DFE6F0`, cards `#FFFFFF` | Matches `src/app/globals.css` |
| Generated 6 sample links in the link generator (Sub IDs `deals_rail`, `sample`) | To copy the exact `tp.media` format and campaign IDs instead of guessing |

Not changed: programs, payout, account settings, existing White Labels.

## Tools — what each does and whether we use it

| Tool | What it does | Use? |
|---|---|---|
| **White Label → WL Web: Widget** | A script + two containers (`#tpwl-search`, `#tpwl-tickets`) that run the Aviasales metasearch (live prices from airlines/OTAs) inside our own page | **Yes — `/flights`.** Required for live search: the Flight Search API needs 50k+ monthly users |
| White Label → WL Web: Webpage | Same engine on a separate (sub)domain via CNAME | No new one. Four already exist (`flights.`/`hotels.`/`booking.walletflights.com`, plus `flights.motivationdailyhub.com` on another project). They can stay as fallbacks or be deleted once the widget is live — **owner's call** |
| White Label App | Branded iOS/Android app | Not now |
| **Links (link generator)** | Turns any brand URL into an affiliate link (`tp.media/r?…` full form, or `*.tpo.lv` short form) with a Sub ID | **Yes — format copied into `src/lib/affiliate.ts`** |
| Links API | Bulk short-link creation over HTTP (needs the API token) | Not needed: full `tp.media` links are deterministic, so we build them locally |
| **Data API** (Aviasales) | Cached prices users found in the last 48 h – 7 days (`prices_for_dates`, `grouped_prices`, …). Needs the API token | **Yes — deals, destination guides, route pages, cheapest-month calendar** (server-side, cached hourly) |
| Widgets | Embeddable search forms/calendars per brand (Aviasales, Trip.com, Kiwitaxi, Tiqets, Airalo, Economybookings, intui, WeGoTrip, Compensair) | No. They inject third-party scripts and styling on every page; plain affiliate links in our own design are lighter and consent-free. Revisit Kiwitaxi/Airalo forms only if links under-perform |
| Promo codes | Brand coupon codes to publish | Optional, content only. Nothing to integrate |
| **Drive** | Loader script (`mn-tz.com`) from the dashboard's "Manual installation" screen | **Yes — in `<head>` on every page** (`src/app/layout.tsx`; URL in `src/content/affiliates.ts`; host allowed in `src/lib/csp.ts`). Added 22 Oct 2026 at the owner's request so the dashboard can verify it; it loads before any cookie choice |
| Data Files | Downloadable directories (airports, airlines, cities) | Optional later (we keep a curated airport list) |
| WordPress plugin / Chrome extension | No-code helpers for WP sites / generating links while browsing | No (we are on Next.js) — the extension is handy for the owner when writing guides |
| **Reports** (Performance, Bookings, Content analytics) | Impressions, clicks, bookings, earnings; group by **Sub ID**, program, day, country, device | **Yes — every link carries a `sub_id` naming its placement**, so "Group by SubID" shows which button earns. Last 30 days (all projects): 320 impressions, 17 clicks, 0 bookings |
| Finance / Referral program | Balance ($419.53), payouts, referral bonus | No change (payout settings are the owner's) |

## Link format (from the dashboard generator)

```
https://tp.media/r?campaign_id={C}&marker=567389&p={P}&sub_id={placement}&trs=344771&u={encodeURIComponent(destination)}
```

| Program | campaign_id | p | Sample destination |
|---|---|---|---|
| Aviasales | 100 | 4114 | `https://www.aviasales.com/search/LON1503NYC20031` |
| Trip.com (hotels) | 121 | 8980 | `https://www.trip.com/hotels/` |
| Kiwitaxi (transfers) | 1 | 647 | `https://kiwitaxi.com/` |
| Economybookings.com (cars) | 10 | 2018 | `https://www.economybookings.com/` |
| Airalo (eSIM) | 541 | 8310 | `https://www.airalo.com/` |
| Tiqets (tickets) | 89 | 2074 | `https://www.tiqets.com/` |
| Compensair (delay claims) | 86 | 4129 | `https://www.compensair.com/` |

The White Label forwards Sub IDs too: `?marker=567389.<sub_id>` on `/flights` is passed with
every search, so bookings made inside the widget are attributed per placement.

## Programs

**Already joined (12):** Aviasales (flights, 1.1–1.3% / 50% of Aviasales revenue), Trip.com
(flights + hotels), Economybookings.com (cars), Kiwitaxi + intui.travel (transfers), Airalo +
Drimsim (eSIM), EKTA (insurance — **the dashboard says this program is closing**), Compensair
(flight compensation), Tiqets + WeGoTrip (tickets/tours), Radical Storage (luggage).

Used in destination guides now: Trip.com hotels, Kiwitaxi, Economybookings, Airalo, Tiqets.

### Recommended to join (not joined — needs your OK)

| Vertical | Program | Why | Note |
|---|---|---|---|
| Hotels | **Booking.com** | Best-known brand for UK/US travellers, 3–5% | Cookie lasts one session only |
| Hotels | **Expedia** or **Hotels.com** | 1.35–3.6%, 7-day cookie, strong US recognition | Pick one to start |
| Cars | **DiscoverCars** | 23–54% of their margin, 365-day cookie — the strongest car terms in the catalog | Could replace Economybookings in guides |
| Insurance | **VisitorsCoverage** (US) | Replaces EKTA, which is closing; $1–160 per policy | US travellers; UK-specific insurance isn't in the catalog |
| Transfers | **Welcome Pickups** | 8–9%, 45-day cookie, meet-and-greet in the cities we cover | Kiwitaxi already covers this |
| Tours | **GetYourGuide** or **Viator** | 8%, 30-day cookie, deep inventory in every guide city | Tiqets already covers attractions |
| eSIM | **Yesim** or **Saily** | 18% / 15% | Airalo already joined — optional |

## Notes and risks

- Live search depends on the White Label script (`tpwdg.com`), which also loads a Snowplow
  analytics tracker and sets `tpwl_currency`, `tpwl_locale`, `hide_hotels` cookies. In the UK,
  EU/EEA and Switzerland it loads only after the visitor allows **search cookies**; elsewhere it
  loads by default (`wf_geo` cookie, `src/lib/consent-region.ts`). Visitors who decline get a
  tracked Aviasales deep link for the same search instead (Sub ID `<placement>_partner`).
- Sub IDs: letters, digits and `_` only (Travelpayouts rule); `cleanSubId` enforces it.
- Drive (22 Oct): the dashboard's Drive screen is registered to `flights.walletflights.com`, not
  `walletflights.com`; the owner needs to add the apex as the project site.
- Data API prices are cached search results, not live quotes; the UI labels them
  "found recently" and hides any route with no cached price.
- The API token lives only in `TRAVELPAYOUTS_TOKEN` (Vercel env + `.env.local`), never in git.
