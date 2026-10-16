# SEO keyword research and content plan: www.walletflights.com

**Date:** 16 Oct 2026
**Scope:** blog/guide topics, route and destination pages, on-page fixes, legacy WordPress topics and measurement, for UK and US travellers.
**Status:** research only. Nothing in the site has been changed. All source checks were made on 16 Oct 2026.

---

## 1. Summary

- **The biggest quick win isn't a blog post.** It's the 37 route pages that already exist but are `noindex`. For nearly every route pair we checked, the top Google suggestion is "{origin} to {destination} **flight time**", ahead of "flights". The sample results pages for those queries are full of thin calculators and spun pages. Make the route pages indexable with their Q&A, retitle them around flight time and distance, and submit them. That's the most likely route to real impression growth within two weeks.
- **Wave 1: 6 posts in 2 weeks** (about 3 a week), each 1,200 to 2,000 words with official sources. In priority order:
  1. Power bank rules on planes (2026)
  2. The 24-hour flight cancellation rule
  3. Cancelled or delayed flight rights in the UK and US (reclaims 4 legacy URLs)
  4. Liquids rules at UK airports in 2026
  5. Self-transfer flights and separate tickets
  6. EES and ETIAS for UK and US travellers

  Each one was picked because demand is visible in autocomplete, the current results include weak, outdated, conflicting or spammy pages, and a clear, dated answer that cites the regulator has a fair chance.
- **Of the owner's five proposed guides, one is in Wave 1** (refund and compensation rights, re-angled as "which rules cover my flight" for UK–US travellers). Bag fees, the cheap-flight routine, last-minute flights and first long-haul flight are in Wave 2. Their head terms are dominated by high-authority sites, so they're unlikely to bring impressions in the first fortnight.
- **What 2 weeks can realistically do:** 1,000+ impressions in 14 days is a stretch for this domain (see section 3). The realistic two-week goal is that every priority URL is indexed and that impressions rise week on week, with first rankings for route and guide long-tail queries. 1,000+ a fortnight is more plausible in weeks 4 to 8, if indexing goes well.
- **Two time-sensitive facts to respect in all content.** Several news outlets report that Spirit Airlines stopped flying on 2 May 2026, so don't write Spirit bag-fee content. The ETIAS start date is still not confirmed by the EU. Both need re-checking before publishing (details in section 6).

---

## 2. Method (and its limits)

| What | How | Limit |
|---|---|---|
| Keyword discovery | Google autocomplete via `suggestqueries.google.com` (`client=firefox`, `hl=en-GB&gl=gb` and `hl=en-US&gl=us`) for about 230 seed queries across every family in the brief; DuckDuckGo autocomplete for spot checks | Autocomplete shows that people search a phrase and roughly ranks completions. It **does not give volumes**. The GB and US responses were often near-identical, which suggests the endpoint is partly IP-located (requests came from one location). |
| Demand | **Tiered (High / Medium / Low)**, based on: whether the phrase is the #1 completion for its prefix, how many long-tail variants exist (airline, airport, year, "reddit", "uk", "us"), and whether "status/tracker/today" variants exist for route pairs (a sign of people actually flying the route) | **No search volumes are quoted anywhere in this document.** No public page with a volume figure was relied on. Google Trends was not used. |
| Who ranks | The WebSearch tool (a US-based, non-Google index) for about 40 queries, plus DuckDuckGo's HTML results (Bing-backed, UK region) for 3 queries before it started returning a block page. I stopped there and did not try to get round it. | **I couldn't see Google's own results, People Also Ask, AI Overviews or featured snippets**, because Google blocks automated requests (it returned a JavaScript gate). Competitor notes are directional. Before writing each post, the owner or writer should check page 1 in a private browser window on google.co.uk and google.com. |
| Sources | Each official URL was requested with a browser user agent (HTTP status), and the key ones were read in full | Some US government sites (transportation.gov, the eCFR, travel.state.gov) and some airline sites block automated fetches (HTTP 403 or timeout). These are marked **"verify in a browser"** in the source log (section 12). |
| Site state | Live `sitemap.xml`, `robots.txt`, page titles, descriptions, H1s and `robots` meta fetched from www.walletflights.com; Wayback Machine URL list for the old WordPress site | No Search Console access. The impression figure comes from the brief. |

---

## 3. Honest expectations for the next 2 weeks

**Target in the brief:** 1,000+ impressions within about 2 weeks (from fewer than 50 a week now).

**Why that's a stretch:**

1. **Indexing comes first, and it isn't instant.** New URLs on a low-authority domain can take days to weeks to be crawled and indexed, even after a sitemap submission and "Request indexing". Some may sit in "Discovered – currently not indexed" for a while.
2. **The domain's history works against it.** The Wayback Machine shows the old WordPress site published 200+ URLs between 2024 and 2025, most of them spun listicles (for example `/airfare-savings-5-forbidden-secrets-airlines/` and `/flight-savings-blast-8-irresistibly-amazing-hacks-...`). Google has to recrawl and re-evaluate the domain, and that takes time.
3. **Impressions need visibility.** Search Console counts an impression only when the result appears on a results page the searcher actually loads. Pages ranking beyond roughly position 10 to 20 earn few impressions, so new pages that start deep in the rankings show little at first.
4. **Many "flight time" and "time difference" queries are answered on the results page** (Google's own flight box or AI answer). Impressions are still possible, but clicks will be low, so judge route pages on impressions and position first, not clicks.

**What would make 1,000 in 2 weeks possible (all needed):**
- The 37 route pages are made indexable in the first 2 to 3 days, with the Q&A block, a retitle (section 8) and an updated sitemap.
- The sitemap is submitted in Search Console and "Request indexing" is used for the about 15 highest-priority URLs (it has a daily quota, so spread the requests over days).
- The site is also submitted to Bing Webmaster Tools (it can import from Search Console), and IndexNow is considered. Bing doesn't count in Google impressions, but it's cheap and also feeds other search and AI products.
- The 6 Wave 1 posts go live on schedule, are linked from the home page and the guides index, and cross-link to route and destination pages.

**A realistic success signal at day 14:** all Wave 1 posts and most route pages show "URL is on Google" in URL Inspection; impressions are rising week on week; and route and guide pages have their first queries in positions 10 to 40 that we can improve. Treat 1,000+ impressions a fortnight as the weeks 4 to 8 goal. This is a judgment based on the factors above, not a forecast from data.

---

## 4. Current indexing snapshot (16 Oct 2026)

| Check | Finding |
|---|---|
| `site:walletflights.com` | Google can't be queried automatically. In the WebSearch tool's (non-Google) index, the site: query returned **no walletflights.com pages**, only Trustpilot listings (profile exists, 0 reviews). A domain-restricted brand query in the same index returned **old WordPress URLs** (`/`, `/flights/`, `/our-story/`, `/about-us/`, `/blog/`, `/hotels/`, `/fare-slash-flights-top-7-airfare-price-drops/`) and the **white-label search subdomains** `booking.walletflights.com` and `flights.walletflights.com`, including a search URL with a tracking marker in it. That index is stale: those old URLs now return 308 or 404. **Owner action:** run `site:walletflights.com` in a browser and check the Search Console Pages report. |
| Live sitemap | 36 URLs: home, deals, destinations, airlines, travel-guides, 20 destinations, 3 guides, about, contact, help, editorial policy, privacy, terms, cookie policy, photo credits. **No route pages.** |
| robots.txt | Allows all named search and AI crawlers. Disallows `/api/` and `/go`. Sitemap declared. |
| Route pages | `/routes/london-to-dubai` and `/routes/new-york-to-london` return `noindex, follow` (checked). |
| Apex and http | `walletflights.com` and `http://www.` both 308 to `https://www.walletflights.com/`. |
| Legacy URLs | The 8 slugs in the brief: `/air-refunds`, `/flight-ticket-refunds`, `/refundable-flights` and `/how-to-avoid-flight-cancellation-fees` go to `/help`; `/airline-baggage-fees` goes to the carry-on guide; `/last-minute-flight-deals` goes to `/deals`; `/how-to-find-the-cheapest-flights` and `/flight-booking-tips` go to `/travel-guides` (all 308). Other old slugs return **404**: `/understanding-flight-compensation`, `/layover-flights`, `/direct-vs-connecting-flights`, `/non-stop-flights`, `/one-way-vs-round-trip-flights`, `/multi-city-flights-save-money`, `/red-eye-flights`, `/travel-visa`, `/travel-insurance`, `/cheapest-airports-to-fly-from`, `/online-flight-booking-mistakes`. |
| White-label subdomains | `flights.walletflights.com` and `booking.walletflights.com` both return 200 with the title "Search Flights", and their `robots.txt` allows `/` and `/?*` (search URLs). Thin, near-duplicate search pages could be indexed under the brand. See section 9. |

**Live titles today** (suffix " | Wallet Flights"):
- Destination pages: "Cheap flights to {City}". H1: "Flights to {City}".
- Route pages: "Cheap flights from {A} to {B}" (noindex).
- Guides: "When to book an international flight", "Europe in shoulder season: cheaper flights" and "Carry-on only checklist for two weeks".

---

## 5. Keyword landscape (demand tiers and evidence)

Tiers are relative judgments from autocomplete signals, **not volumes**. Winnability is our judgment for a new, low-authority domain.

| Family | Autocomplete-confirmed examples (GB/US) | Demand | Winnability | Notes |
|---|---|---|---|---|
| Route flight time | "london to dubai flight time" (#1 for "london to dubai flight"); same pattern for london–new york, london–tokyo, manchester–dubai, manchester–new york, new york–london, new york–tokyo, la–tokyo, atlanta–cape town; "how long is the flight from london to new york / singapore / dubai / paris / tokyo" | **High** (summed across pairs) | **Medium–High** on long tail | Sample results (UK region) for "how long is the flight from london to dubai": directflights.com, flightdurationcalculator.com, airadvisor.com, flightroutes.com, a small travel agent, howlong.is, flightconnections, Skyscanner. Mostly calculators. Expect Google's flight box to take many clicks. |
| Country-level flight time | "flight time from uk to japan / thailand / australia / turkey / egypt / new york / dubai"; "how long is a flight to japan / italy / thailand / portugal / egypt"; "how long is a flight to portugal from uk / new york" | High | Medium | Our destination pages are city-based. Add country wording to the Q&A (section 8). |
| Time difference | "time difference between london and new york / dubai / tokyo / singapore / sydney / los angeles" | High | Low (zero-click) | Route pages already compute it. Worth having for impressions, not clicks. |
| Distance | "london to new york flight distance", "how far is dubai from uk / london", "how far is tokyo from london / new york" | Medium | Medium | Already on route pages. |
| When to book / cheapest day | "when to book flights" (+ "for best price", "cheapest day", "to europe", "for christmas", "for december 2026"); "cheapest day to fly" (+ "internationally", "to europe"); "how far in advance to book flights" (+ "international", "to europe"); "do flights get cheaper closer to date / last minute"; "is it cheaper to book flights on tuesday" | **High** | **Low** (head) / Medium (long tail) | Dominated by Google Flights, Expedia, Skyscanner, Hopper, Going, NerdWallet and Thrifty Traveler. Use to refresh the existing guide, not for a new post. |
| Delay and cancellation rights | "flight delay compensation uk / us / eu / calculator / ryanair / easyjet"; "uk261 compensation / claim / rules / british airways / united airlines"; "eu261 compensation table"; "delayed flight rights uk / usa"; "cancelled flight rights uk"; "what happens if my flight is cancelled"; "extraordinary circumstances flight delay"; "missed connecting flight due to delay compensation" | **High** | **Low** (head) / Medium (cross-border long tail) | CAA, Which?, MSE, ABTA, AirHelp, AirAdvisor and Flightright dominate the head terms. UK–US "which rules apply" long tails are thinner. |
| US DOT refunds / 24-hour rule | "dot refund rules", "dot automatic refund rule", "department of transportation refund rule", "24 hour cancellation rule flights / airlines", "24 hour cancellation policy international flights", "flight refund within 24 hours" | **High** (US) | **Medium–High** | Sample UK results for "24 hour cancellation rule flights uk" are mostly small blogs (two pages from one Q&A site, a concierge blog, travelgoeat, flyozo, travelshifu) plus CAA and GOV.UK. Another index shows spam PDFs and help-desk pages for "24 hour rule british airways". |
| Power banks | "power bank on plane" (+ "uk", "limit", "rules", "ryanair", "jet2", "easyjet", "british airways", "emirates", "delta", "american airlines", "japan"); "can you take a power bank on a plane" (+ airline variants) | **High** | **Medium–High** | Rules changed on 27 Mar 2026 (CAA). Results are full of battery-retailer blogs and conflicting airline details. |
| Liquids | "liquids on plane uk", "liquids on planes 2026", "100ml liquids rule", "100ml liquids stansted / manchester / gatwick / birmingham / heathrow", "hand luggage rules for liquids", "lisbon airport liquid rules" | **High** (UK) | Medium | Which? (2026), regional newspapers (syndicated copies), duplicated travel-agent blogs and airports. The lists disagree with each other. |
| Bag sizes and fees | "ryanair cabin bag size (2026)", "easyjet cabin bag size vs ryanair", "ba hand luggage size", "jet2 baggage allowance", "airline baggage fees comparison (chart, 2026)", "united basic economy carry on", "frontier bag fees", "personal item size (united / delta / american / frontier)", "under seat bag ryanair / easyjet" | **High** | Low–Medium | Airlines' own pages, Which?, TravelSupermarket and PIRG. Lots of airline-specific tails. |
| Entry permissions | "uk eta for us citizens", "how long does uk eta take", "esta for usa from uk", "do i need an esta to travel to usa from uk", "how long does esta take to approve uk", "etias for us citizens / uk citizens", "etias start date / launch date / 2026", "entry exit system uk / app / schengen"; "do i need a visa for japan / thailand / turkey / bali / singapore (from uk / us)", "do americans need a visa for europe / uk / brazil / italy" | **High** | Medium (EES/ETIAS) / Low (ESTA, ETA head) | GOV.UK and CBP dominate. Lookalike paid-application sites appear (one suggestion was an ad-like "uk eta application … etourist.com"). ETIAS status pages are mostly outdated. |
| Self-transfer | "self transfer flight", "self transfer flights meaning", "separate tickets booked together (meaning)", "separate tickets google flights", "what does separate tickets mean when booking a flight" | Medium | **High** | Results are dominated by spun pages (several from one scraped domain) plus going.com. Fits a comparison brand closely. |
| Layover and connections | "layover vs stopover", "how long is a good layover for international flights", "how long is a safe layover", "minimum connection time heathrow / jfk", "stopover programs" | Medium | Medium | AwardWallet, Afar and small blogs. |
| Airport guides | "heathrow terminal for virgin atlantic / british airways / united / emirates / delta", "jfk terminal for delta / american / jetblue / virgin atlantic", "heathrow terminal 5", "newark airport to manhattan", "lisbon airport to city centre", "tokyo airport to shinjuku", "cancun airport to playa del carmen / tulum / hotel zone", "dubai airport to burj khalifa" | High | Low–Medium | Airport sites rank well. Airport-to-city queries suit destination-page Q&A (transport details need checking). |
| Seasonal (UK) | "half term flights", "cheap half term flights", "february half term 2027", "easter holiday flights", "term time holiday fines" | Medium–High (seasonal) | Medium | Which? and alternativeairlines (machine-translated copies). |
| Best time to visit | "best time to visit lisbon / tokyo / bali / cancun / dubai / cape town / cusco" with tails such as "to avoid seaweed" (Cancún), "for penguins / whale watching" (Cape Town), "and machu picchu" (Cusco), "weather wise" (Bali), "to avoid crowds" (Tokyo) | High | Low–Medium | Travel blogs and publishers. The sample for "best time to visit lisbon month by month" also showed spam on hijacked domains. |
| Long-haul comfort | "long haul flight tips (reddit, with kids)", "first long haul flight tips", "what to wear on a long haul flight", "how to sleep on a plane", "jet lag tips flying east / us to uk / uk to australia" | Medium | Medium | Reddit and lifestyle sites. Jet lag is health-adjacent, so cite the NHS. |
| Tricks | "skiplagging (illegal, reddit)", "hidden city ticketing consequences", "error fares (uk, today)", "google flights vs skyscanner (reddit)", "incognito flights (cheaper)" | Medium | Medium | Brand risk on some (see Wave 2 notes). |
| Travel insurance | "travel insurance uk / compare / for over 70s / pre existing conditions", "is travel insurance worth it" | High | **Very low** | YMYL and regulated, with comparison giants dominating. **Not recommended now.** |

---

## 6. Wave 1: the next 2 weeks (6 posts)

**Why 6:** at 1,200 to 2,000 words with official sources, each post needs about 1.5 to 2 days of research, writing, fact-checking against 4 to 8 official or airline pages, a photo, internal links and QA through the five-phase process (plan, design, develop, test, audit). Three a week is the most that can be done to that standard alongside the route-page work, which has the bigger impression upside. Fewer, better pages also suit a domain recovering from a spun-content history.

**Proposed schedule:**
- Days 1–2: route pages indexable (section 8) and Search Console actions.
- Days 2–4: posts 1 and 2.
- Days 5–8: posts 3 and 4.
- Days 9–12: posts 5 and 6.
- Days 13–14: titles and internal links reviewed using the first Search Console data.

**Rules for every post:**
- Answer-first opening paragraph (40 to 60 words), a "Checked on {date}" line, and tables where the topic is comparative.
- List sources at the end. Never promise legal outcomes. For rights topics, direct readers to the regulator.
- No statistics we can't cite. Owner-specific statements (for example what the WhatsApp booking team does) are flagged `TODO(confirm)`.
- SEO titles below are written to fit with " | Wallet Flights" in 60 characters or less. The H1 can be longer.

---

### W1-1. Power banks on planes (priority 1)

| Field | Detail |
|---|---|
| SEO title (seoTitle) | Power bank rules on planes in 2026 (34 + suffix = 51) |
| H1 | Can you take a power bank on a plane? The 2026 rules for UK and US flights |
| Slug | `/travel-guides/power-bank-rules-on-planes` |
| Primary keyword | power bank on plane |
| Secondary / long tail | can you take a power bank on a plane; power bank on plane uk; power bank on plane limit; power bank rules ryanair; easyjet power bank rules; jet2 power bank; british airways power bank; tsa power bank rules |
| Intent / market | Informational, pre-trip. Both markets. |
| Demand | **High.** "power bank on plane" is the #1 completion for its prefix, with variants for uk, limit, rules, Ryanair, Jet2, easyJet, BA, Emirates, Delta, American and Japan, plus a full set of "can you take a power bank on a plane {airline}" tails. |
| Page-1 competitors (sampled) | Battery retailers' blogs (Anker UK, three pages; Ugreen; Clutch; Brick), a uk.trip.com guide, small blogs (mickeyfromthe.uk, mrplaneguy), a mirrored spam copy, and airline pages for airline queries |
| Their weaknesses | Product-selling bias; airline details that conflict (sources disagree on whether easyJet and Ryanair allow use on board); few cite the CAA's 27 Mar 2026 change page; tables with no check dates |
| Our angle | A dated, airline-by-airline table where every row links to that airline's own page. A mAh-to-Wh worked table (Wh = mAh × V ÷ 1000; for example 20,000 mAh at 3.7 V ≈ 74 Wh). UK (CAA) and US (FAA/TSA) rules side by side. A "use on board?" column that says "check with airline" wherever the airline's page isn't clear. Practical gate-check advice. |
| H2 outline | 1. The short answer (carry-on only, up to 2, 100 Wh without approval, no recharging on board). 2. What changed on 27 March 2026 (CAA). 3. How to work out watt-hours from mAh. 4. UK and US rules side by side (CAA vs FAA/TSA). 5. Airline by airline (BA, Virgin Atlantic, easyJet, Ryanair, Jet2, Emirates, United, Delta, American), each with a link and check date. 6. Can you use or charge a power bank during the flight? 7. Packing it safely (terminals protected, where to stow it, removing it if your bag is gate-checked). 8. Other batteries: laptops, cameras, e-cigarettes. 9. FAQ |
| FAQ | Can I take a 20,000 mAh power bank on a plane? Can a power bank go in checked luggage? How many power banks can I take? Can I use my power bank on the plane? What if my cabin bag is taken at the gate? |
| Official sources | **Read:** [CAA: changes to rules on lithium batteries and power banks](https://www.caa.co.uk/commercial-industry/airlines/dangerous-goods/changes-to-rules-on-the-carriage-of-lithium-cellsbatteries-and-power-banks/) (2 per person, carry-on only, 100 Wh without approval, 100–160 Wh with approval, "must not be recharged on board", "should not be used to charge other portable electronic devices on board"); [GOV.UK: electronic devices in hand luggage](https://www.gov.uk/hand-luggage-restrictions/electronic-devices-and-electrical-items). **Loads (HTTP 200), content not read by the tool:** [CAA: Pack right, safe flight](https://www.caa.co.uk/air-passengers/about-your-trip/baggage/pack-right-safe-flight/); [TSA: power banks](https://www.tsa.gov/travel/security-screening/whatcanibring/items/power-banks); [FAA PackSafe: lithium batteries](https://www.faa.gov/hazmat/packsafe/lithium-batteries) (the reader tool got a 403, so verify in a browser); [FAA: airline passengers and batteries](https://www.faa.gov/hazmat/packsafe/airline-passengers-and-batteries); [BA baggage essentials](https://www.britishairways.com/content/information/baggage-essentials); [Ryanair baggage FAQ](https://www.ryanair.com/gb/en/useful-info/help-centre/faq-overview/baggage). **Verify manually:** easyJet help (403), Jet2 FAQs (timed out), Virgin Atlantic, Emirates, United, Delta and American (not checked). |
| Note | A CAA press statement (seen in search results) says you "may be able to" charge other devices from a power bank if the airline allows it. That differs from the CAA rules page's "should not". Say so plainly and defer to the airline. |
| Internal links | `/travel-guides/carry-on-only-checklist`, `/airlines`, `/help`, long-haul destinations (`/destinations/tokyo`, `/destinations/sydney`, `/destinations/singapore`), W1-4 liquids post |

---

### W1-2. The 24-hour cancellation rule (priority 2)

| Field | Detail |
|---|---|
| SEO title | The 24-hour flight cancellation rule (36 + 17 = 53) |
| H1 | The 24-hour cancellation rule: who it covers, and whether it applies to UK flights |
| Slug | `/travel-guides/24-hour-flight-cancellation-rule` |
| Primary keyword | 24 hour cancellation rule flights |
| Secondary / long tail | 24 hour cancellation rule airlines; 24 hour cancellation policy international flights; can I cancel a flight within 24 hours uk; flight refund within 24 hours; 24 hour rule british airways; does the 24 hour rule apply to international flights; 24 hour refund rule |
| Intent / market | Informational, just after booking. US primary; UK secondary (a lot of UK confusion). |
| Demand | **High** (US). "24 hour cancellation rule flights" and "…airlines" are the top completions; "flight refund within 24 hours" appears under "flight refund"; airline-specific tails exist (Southwest, Delta, United). UK variants have their own ranking pages in the UK-region sample. |
| Page-1 competitors (sampled) | UK region: majtravelconcierge.com, travelgoeat.com, CAA cancellations, two pages from citizendailypost.com, Flightright, flyozo.com, BA "Book with confidence", GOV.UK passenger rights summary, travelshifu.com. General: going.com glossary, dailypassport.com and several new 2026 blogs. Another index returned spam PDFs on university domains and help-desk pages for "24 hour rule british airways". |
| Their weaknesses | Thin and unsourced; contradictory on whether the rule covers non-US airlines and third-party bookings; UK readers aren't told plainly that there's no UK equivalent |
| Our angle | The precise rule from DOT, with what it covers and what it doesn't: bookings 7+ days before departure; the airline chooses between a free 24-hour hold and a full refund within 24 hours; DOT guidance says it doesn't apply to bookings made through travel agents or online travel sites. A clear UK answer: no general statutory right, so check the airline's own policy. What to do if you booked through a comparison result (you booked with the provider). |
| H2 outline | 1. Short answer. 2. What the US rule says (hold or refund, the 7-day condition, refund timing). 3. Which bookings it covers: direct vs travel site; flights to and from the US, including UK–US routes (**writer: confirm which carriers it covers in 14 CFR 259.5 / DOT guidance**). 4. Is there a 24-hour rule in the UK? (No general right. Check whether the 14-day distance-selling cancellation right excludes passenger transport, and cite legislation.gov.uk. Airline policies such as BA's must be checked on the airline's site.) 5. Booked through a travel site or our team (`TODO(confirm)` the team's process). 6. How to cancel inside 24 hours, step by step. 7. After 24 hours: fare rules, refundable vs non-refundable, changes vs cancellations. 8. FAQ |
| FAQ | Does the 24-hour rule apply to international flights? Can I cancel a British Airways flight within 24 hours? Does it apply if I booked through a travel site? Will I get cash or a credit? Does it cover basic economy? |
| Official sources | **Verify in a browser (403 to automated fetch):** [DOT refunds page](https://www.transportation.gov/individuals/aviation-consumer-protection/refunds), [DOT guidance on the 24-hour reservation requirement](https://www.transportation.gov/airconsumer/notice-24hour-reservation), [DOT: buying a ticket](https://www.transportation.gov/individuals/aviation-consumer-protection/buying-ticket). Search snippets of these pages support the 7-day condition, the hold-or-refund choice and the exclusion of third-party agents. The [eCFR 14 CFR 259.5](https://www.ecfr.gov/current/title-14/chapter-II/subchapter-A/part-259/section-259.5) redirected to a bot gate. **Loads:** [CAA cancellations](https://www.caa.co.uk/air-passengers/travel-problems-and-rights/flight-delays-and-cancellations/cancellations/); [BA Book with confidence](https://www.britishairways.com/travel/book-with-confidence/public/en_gb) (returned a "high demand" holding page, so verify the terms manually). **Read:** [GOV.UK air passenger rights summary](https://www.gov.uk/government/publications/air-passenger-travel-guide/air-passenger-travel-guide-summary-of-passenger-rights). |
| Legacy | Point `/how-to-avoid-flight-cancellation-fees` here (the 24-hour window is the main fee-free way out). |
| Internal links | `/travel-guides/when-to-book-international-flights` (it already mentions US refund rules), `/help`, `/routes/new-york-to-london`, `/routes/london-to-new-york`, W1-3 rights post |

---

### W1-3. Cancelled or delayed flight rights in the UK and US (priority 3; owner proposal 1)

| Field | Detail |
|---|---|
| SEO title | Cancelled or delayed flight? Your rights (40 + 17 = 57) |
| H1 | Flight cancelled or delayed? Your refund and compensation rights in the UK and US |
| Slug | `/travel-guides/flight-cancelled-or-delayed-rights` |
| Primary keyword | cancelled flight rights (with "delayed flight rights" as co-primary) |
| Secondary / long tail | delayed flight rights uk; delayed flight rights usa; flight delay compensation uk; uk261 compensation rules; dot refund rules; uk261 american airlines; what happens if my flight is cancelled; extraordinary circumstances flight delay |
| Intent / market | Informational and urgent (often mid-disruption). Both markets. |
| Demand | **High.** "delayed flight rights" completes with uk, usa, eu and canada; "cancelled flight rights uk"; "flight delay compensation uk / us / calculator / {airline}"; "uk261 compensation / claim / british airways / united airlines"; "dot refund rules" and "dot automatic refund rule". |
| Page-1 competitors (sampled) | CAA delays and cancellations pages, Which?, ABTA, council trading-standards pages, newspapers (Scotsman, syndicated nationals), claims firms (AirHelp UK, AirAdvisor, Flightright, JustClaim); US: checkbook.org, One Mile at a Time and local TV sites |
| Their weaknesses | Claims firms steer readers to their paid service. Most pages cover one country only. Few explain **which rules apply in each direction on transatlantic routes, by airline**, which is exactly what our UK–US audience needs. Some secondary pages misstate the CAA thresholds. |
| Our angle | A "which rules cover my flight?" table: from the UK on any airline means UK rules; into the UK on a UK or EU airline means UK rules; from the US on a US airline means US DOT rules only, and so on. Side-by-side remedies (UK: refund within 7 days or rerouting, care, fixed compensation; US: refund on cancellation or significant change, no general federal cash compensation for delays). A claim path through the regulator. No outcome promises. |
| H2 outline | 1. Short answer. 2. Which rules cover your flight (direction × airline table). 3. Cancelled flight: UK rules (refund within 7 days or rerouting; compensation if cancelled within 14 days of departure, unless the cause was outside the airline's control). 4. Delayed flight: UK care and compensation (CAA amounts and thresholds). 5. Missed connections and self-transfer (one ticket vs separate tickets). 6. US rules: refunds for cancellations and significant changes (3 h domestic / 6 h international), refund timing, vouchers. 7. Denied boarding (overbooking). 8. How to claim: airline first, then ADR or the CAA's PACT team (UK); a DOT complaint (US). 9. What to keep (receipts, booking reference, messages). 10. If you booked through a travel site or our team (`TODO(confirm)`). 11. FAQ |
| FAQ | Is my flight delay of 3 hours eligible for compensation? Does UK261 apply to American Airlines? Do US airlines have to pay compensation for delays? What counts as extraordinary circumstances? How long does an airline have to refund me? |
| Official sources | **Read:** [CAA: delays](https://www.caa.co.uk/air-passengers/resolving-travel-problems/delays-and-cancellations/delays/). It gives care from 2/3/4 hours by distance band, compensation for arrival more than 3 hours late, £220 / £350 / £520 by distance, with £260 for a 3–4 hour arrival delay on flights over 3,500 km, a refund option after 5 hours, the PACT/ADR route after 8 weeks, and no statutory rights on self-transfer bookings. [GOV.UK air passenger rights summary](https://www.gov.uk/government/publications/air-passenger-travel-guide/air-passenger-travel-guide-summary-of-passenger-rights) covers scope, the 14-day cancellation window, refunds within 7 days and denied boarding. **Loads:** [CAA cancellations](https://www.caa.co.uk/air-passengers/travel-problems-and-rights/flight-delays-and-cancellations/cancellations/), [CAA denied boarding](https://www.caa.co.uk/air-passengers/travel-problems-and-rights/flight-delays-and-cancellations/denied-boarding/), [CAA travel complaints](https://www.caa.co.uk/air-passengers/travel-problems-and-rights/travel-complaints/), [CAA delays and cancellations hub](https://www.caa.co.uk/air-passengers/travel-problems-and-rights/flight-delays-and-cancellations/). **Verify in a browser:** [DOT refunds](https://www.transportation.gov/individuals/aviation-consumer-protection/refunds) and [DOT Fly Rights](https://www.transportation.gov/airconsumer/fly-rights) (403). |
| Caution | One 2026 secondary source says parts of the DOT refund rule are under administrative reconsideration and that a separate compensation rulemaking was withdrawn in Nov 2025. **Unverified.** Read the DOT page on the day of publishing and quote its wording. |
| Legacy | `/air-refunds`, `/flight-ticket-refunds`, `/understanding-flight-compensation` (currently 404) → here. |
| Internal links | `/help`, route pages (the cancellation-rights section on each), `/routes/london-to-new-york`, `/routes/manchester-to-new-york`, W1-2, W1-5 |

---

### W1-4. Liquids rules at UK airports (priority 4)

| Field | Detail |
|---|---|
| SEO title | Liquids rules at UK airports in 2026 (36 + 17 = 53) |
| H1 | Liquids in hand luggage: which UK airports allow 2 litres, and which still say 100ml |
| Slug | `/travel-guides/uk-airport-liquids-rules` |
| Primary keyword | liquids rules uk airports (with "100ml liquids rule") |
| Secondary / long tail | liquids on plane uk; liquids on planes 2026; 100ml liquids heathrow; 100ml liquids gatwick; 100ml liquids manchester airport; 100ml liquids stansted airport; hand luggage rules for liquids; tsa liquids rule |
| Intent / market | Informational, pre-trip. UK primary, plus US travellers flying home from the UK. |
| Demand | **High** (UK). "100ml liquids" completes with eight airport names; "liquids on plane" completes with uk, Gatwick, Stansted, Heathrow and 2026; "hand luggage rules" completes with uk, Gatwick, Ryanair, Jet2, Bristol, easyJet, Birmingham, Heathrow and "for liquids". |
| Page-1 competitors (sampled) | Which? ("The UK's airport liquid rules for 2026"), the Yorkshire Post, the Shropshire Star / Express & Star (syndicated), four copies of one travel-agent blog, deeparrival.com and airport pages |
| Their weaknesses | Lists disagree on which airports have relaxed the rule (one review found 9 allowing 2 litres and 19 still at 100ml; Which? lists fewer); syndicated duplicates; rarely a link to each airport's own page or a check date; little on the return leg |
| Our angle | A maintained airport-by-airport table (Heathrow, Gatwick, Manchester, Stansted, Luton, London City, Birmingham, Edinburgh, Glasgow, Bristol, Newcastle, Leeds Bradford, Liverpool, East Midlands, Belfast), each with a link to the airport's own security page and a "checked on" date. A return-leg section (TSA 3-1-1 for US airports; check EU and Gulf airports). GOV.UK exemptions (medicines, baby food and milk up to 2 litres at all UK airports). |
| H2 outline | 1. Short answer (it depends on the departure airport; GOV.UK says so). 2. Why the rules differ by airport. 3. UK airport table (2 litres vs 100ml; bag out or in; clear bag needed). 4. Flying back: US airports (TSA 3-1-1), EU airports and Dubai (check the airport). 5. Exemptions: medicines, special diets, baby food. 6. Duty free, connections, and powders on US-bound flights (Heathrow). 7. Packing tips. 8. FAQ |
| FAQ | Is the 100ml rule still in force at UK airports? Which UK airports allow 2 litres? Do I still need a clear plastic bag? Can I bring liquids over 100ml on the way back from the US? Can I take a full water bottle through security? |
| Official sources | **Read:** [GOV.UK: liquids in hand luggage](https://www.gov.uk/hand-luggage-restrictions/liquids) ("depend on the airport"; some allow up to 2 litres; 2-litre exemptions at all UK airports); [GOV.UK hand luggage overview](https://www.gov.uk/hand-luggage-restrictions); [TSA liquids rule](https://www.tsa.gov/travel/security-screening/liquids-aerosols-gels-rule). **Loads:** [Heathrow hand baggage and liquids](https://www.heathrow.com/at-the-airport/security-and-baggage/hand-baggage-and-liquids) (search summary: up to 2 litres at T2–T5, liquids stay in the bag, empty metal bottles first), [Heathrow security FAQs](https://www.heathrow.com/customer-support/faq/faq-security), [Gatwick security](https://www.gatwickairport.com/passenger-guides/security.html), [Manchester Airport home](https://www.manchesterairport.co.uk/) (the specific liquids page wasn't found, so the writer must locate it). **Not checked:** the other UK airports (writer to open each). |
| Maintenance | Re-check monthly and update the "checked on" date. This is the page's competitive edge. |
| Internal links | `/travel-guides/carry-on-only-checklist`, W1-1 power banks, `/destinations/london`, route pages from London and Manchester |

---

### W1-5. Self-transfer flights and separate tickets (priority 5)

| Field | Detail |
|---|---|
| SEO title | Self-transfer flights and separate tickets (42 + 17 = 59) |
| H1 | Self-transfer flights: what "separate tickets" means and when the saving is worth it |
| Slug | `/travel-guides/self-transfer-separate-tickets` |
| Primary keyword | self transfer flight |
| Secondary / long tail | self transfer flights meaning; separate tickets booked together; separate tickets booked together meaning; separate tickets google flights; what does separate tickets mean when booking a flight; missed connecting flight separate tickets; how long layover for self transfer |
| Intent / market | Informational, during comparison. Both markets. |
| Demand | **Medium.** "self transfer flight" is the #1 completion for "self transfer" (other completions are about payments, which is noise). "separate tickets booked together meaning" is the #1 completion for "separate tickets", with several "meaning" variants. |
| Page-1 competitors (sampled) | going.com guide; several spun pages on one scraped domain (static.intrafocus.com) and other hijacked domains; happyfares.in; a German FAQ |
| Their weaknesses | Mostly spun content, with little or no citation of the regulator |
| Our angle | We're a comparison site whose cheapest-first results can include self-transfer combinations, so we can explain how to spot one and what you give up. CAA position: separate bookings are separate journeys with no end-to-end care or compensation. Transit permissions: GOV.UK says an ETA is needed if you pass through UK border control; in the US every arriving international passenger goes through CBP, so an ESTA or visa is needed even to connect (**verify the wording on CBP**). Buffer advice clearly labelled as our guidance, not a rule. |
| H2 outline | 1. Short answer. 2. One ticket vs separate tickets: what changes. 3. How to spot a self-transfer when comparing fares. 4. If the first flight is late: what the CAA says. 5. Bags, security and immigration at the transfer airport. 6. Transit permissions: UK ETA and US ESTA. 7. How much time to leave (our rule of thumb, with reasons). 8. When the saving is worth it, and when to pay for one ticket. 9. FAQ |
| FAQ | What does "separate tickets booked together" mean? Is a self-transfer risky? Do I have to collect my bags? Do I need an ETA or ESTA for a self-transfer? Am I covered if my first flight is delayed? |
| Official sources | **Read:** [CAA delays](https://www.caa.co.uk/air-passengers/resolving-travel-problems/delays-and-cancellations/delays/) (connecting flights and the self-transfer statement); [GOV.UK ETA](https://www.gov.uk/eta) (£20; needed if you pass through UK border control; every traveller needs their own). **Loads:** [CBP ESTA](https://www.cbp.gov/travel/international-visitors/esta), [official ESTA site](https://esta.cbp.dhs.gov/). |
| Internal links | W1-3 rights, Wave 2 layover post, long-haul routes that often connect (`/routes/manchester-to-bangkok`, `/routes/los-angeles-to-bali`, `/routes/atlanta-to-singapore`), `/help` |

---

### W1-6. EES and ETIAS for UK and US travellers (priority 6)

| Field | Detail |
|---|---|
| SEO title | EES and ETIAS for UK and US travellers (38 + 17 = 55) |
| H1 | EES and ETIAS: what UK and US travellers need for Europe now (status checked {date}) |
| Slug | `/travel-guides/ees-etias-uk-us-travellers` |
| Primary keyword | etias (as "etias uk" / "etias for us citizens"), with "entry exit system" as co-primary |
| Secondary / long tail | etias start date; etias launch date; etias 2026; etias official website; entry exit system uk; entry exit system app; ees europe; do americans need a visa for europe; do uk citizens need a visa for europe |
| Intent / market | Informational, pre-trip and time-sensitive. Both markets. |
| Demand | **High.** "etias" has many completions (application, start date, 2026, launch date, uk, for us citizens, official website); "entry exit system" completes with eu, europe, uk, Portugal, Italy, app and Schengen; "do americans need a visa for europe" is the #1 completion for its prefix. |
| Page-1 competitors (sampled) | The EU's travel-europe portal (renders by JavaScript), EC Home Affairs news, GOV.UK travel advice, TPG, Afar, insurers (InsureAndGo, AllClear, AXA, HolidaySafe), Wise, Airalo, law firms and lookalike visa-service sites |
| Their weaknesses | Many still give old launch dates (2022 to 2025) or the old €7 fee; the status conflicts between sources; insurer pages are sales-led |
| Our angle | A dated status box using only official sources: EES fully operational since 10 Apr 2026 (EC); ETIAS not yet operating, with the start date to be announced by the EU and a €20 fee when it starts (EC). A clear "what you need today" checklist for UK and US passports, and a warning about unofficial application sites. Update monthly. |
| H2 outline | 1. Short answer and status box. 2. EES: what happens at the border (fingerprints, photo, replaces stamps; record kept for 3 years per GOV.UK). 3. Who EES covers and who is exempt. 4. ETIAS: what's confirmed (who, cost, validity) and what isn't (start date). 5. The 90-days-in-180 rule. 6. UK passport validity rules for Schengen. 7. Don't pay lookalike sites. 8. Checklist before you fly to Lisbon, Rome, Paris or Barcelona. 9. FAQ |
| FAQ | Do I need ETIAS to travel to Europe now? How much will ETIAS cost? What is EES, and do I have to register? Does EES apply to UK citizens? Do US citizens need ETIAS for Italy or Spain? |
| Official sources | **Read:** [EC Home Affairs: EES fully operational from 10 April 2026](https://home-affairs.ec.europa.eu/news/entryexit-system-will-become-fully-operational-10-april-2026-2026-03-30_en); [GOV.UK Spain entry requirements](https://www.gov.uk/foreign-travel-advice/spain/entry-requirements) (EES details, 90/180, passport issue and expiry rules). **Loads:** [EC Entry/Exit System policy page](https://home-affairs.ec.europa.eu/policies/schengen/smart-borders/entry-exit-system_en), [EC: ETIAS will cost EUR 20](https://home-affairs.ec.europa.eu/news/european-travel-authorisation-etias-will-cost-eur-20-2025-07-17_en), [travel-europe.europa.eu ETIAS](https://travel-europe.europa.eu/en/etias) and [EES](https://travel-europe.europa.eu/en/ees) pages (JavaScript-rendered, so the tool couldn't read them; verify in a browser), [EU revised timeline news](https://travel-europe.europa.eu/en/etias/about-etias/news-corner/revised-timeline-ees-and-etias). |
| Caution | A secondary source (a Navan blog, 2 Oct 2026) says the EU removed its "last quarter of 2026" target from the ETIAS portal in July 2026. **Unverified.** Read the official portal in a browser on publish day and quote it. |
| Internal links | `/destinations/lisbon`, `/destinations/rome`, `/destinations/paris`, `/destinations/barcelona`, `/travel-guides/europe-shoulder-season`, `/routes/new-york-to-lisbon`, `/routes/new-york-to-rome`, `/routes/chicago-to-paris` |

---

## 7. Wave 2 backlog (weeks 3 to 8)

Ordered by expected value (demand × winnability × brand fit). Positions 7 to 15 continue the top-15 list after Wave 1.

| # | SEO title (with suffix ≤ 60) | Slug | Primary keyword | Key long tail | Demand / win | Sources to cite | Legacy URL to point here |
|---|---|---|---|---|---|---|---|
| 7 | Hand luggage sizes and bag fees by airline | `hand-luggage-sizes-bag-fees` | airline baggage fees comparison | ryanair cabin bag size 2026; easyjet cabin bag size vs ryanair; ba hand luggage size; jet2 baggage allowance; united basic economy carry on; personal item size | High / Low–Med | CAA [checking your baggage allowance](https://www.caa.co.uk/air-passengers/about-your-trip/baggage/checking-your-baggage-allowance/) (200); airline pages ([BA](https://www.britishairways.com/content/information/baggage-essentials) 200, [Ryanair](https://www.ryanair.com/gb/en/useful-info/help-centre/faq-overview/baggage) 200, [Frontier](https://www.flyfrontier.com/travel/travel-info/bag-options/) 200; easyJet, Jet2 and United to verify manually). **Spirit:** news reports (for example OPB, 6 May 2026) say it stopped flying on 2 May 2026, so exclude it after verifying. A secondary source says the DOT bag-fee transparency rule was vacated in Feb 2026; **unverified**. | `/airline-baggage-fees` (owner proposal 3) |
| 8 | ESTA and UK ETA: who needs which | `esta-and-uk-eta` | uk eta for us citizens / esta for usa from uk | how long does uk eta take; how long does esta take to approve uk; do i need an esta to transit through usa; uk eta cost | High / Med (official sites dominate; scam sites are a risk to warn about) | [GOV.UK ETA](https://www.gov.uk/eta) (read: £20), [CBP ESTA](https://www.cbp.gov/travel/international-visitors/esta) (200), [official ESTA site](https://esta.cbp.dhs.gov/) (200), [GOV.UK USA entry requirements](https://www.gov.uk/foreign-travel-advice/usa/entry-requirements) (200). ESTA fee reported as $40.27 by a secondary source; **verify on the ESTA site**. | `/travel-visa` (404 now) |
| 9 | How long a layover do you need? | `how-long-a-layover` | how long is a good layover for international flights | layover vs stopover; minimum connection time heathrow / jfk; how long is a safe layover; stopover programs | Med / Med | [CAA delays](https://www.caa.co.uk/air-passengers/resolving-travel-problems/delays-and-cancellations/delays/) (connections); airport connection pages (verify) | `/layover-flights`, `/direct-vs-connecting-flights`, `/non-stop-flights` (all 404) |
| 10 | Cheap half-term flights: when to book | `half-term-flights` | cheap half term flights | february half term 2027 flights; easter holiday flights; term time holiday fines; school holiday flight prices | Med–High seasonal / Med. **Publish by mid-November** for February half-term planning. | [GOV.UK school term dates](https://www.gov.uk/school-term-holiday-dates) (200), [GOV.UK school attendance / legal action](https://www.gov.uk/school-attendance-absence/legal-action-to-enforce-school-attendance) (200) | – |
| 11 | How to find cheap flights, step by step | `how-to-find-cheap-flights` | how to find cheap flights | how to find cheap flights with flexible dates; is it cheaper to book flights separately; are flights cheaper on tuesdays; incognito flights | High / Low (head), Med (tails) | DOT 24-hour rule (verify); our own month view and route pages; any day-of-week study must be cited from its publisher | `/how-to-find-the-cheapest-flights`, `/flight-booking-tips`, `/one-way-vs-round-trip-flights`, `/multi-city-flights-save-money`, `/cheapest-airports-to-fly-from`, `/online-flight-booking-mistakes` (owner proposal 2) |
| 12 | Are last-minute flights cheaper? | `are-last-minute-flights-cheaper` | are last minute flights cheaper | do flights get cheaper closer to the date; do flights get cheaper the day before; last minute flights from london | Med–High / Med | Method plus our `/deals` (how fares are refreshed, `TODO(confirm)`); ETA and ESTA lead times | Keep `/last-minute-flight-deals` → `/deals` (transactional intent); link this guide from `/deals` (owner proposal 4) |
| 13 | First long-haul flight: practical tips | `first-long-haul-flight-tips` | long haul flight tips | first long haul flight tips; what to wear on a long haul flight; how to sleep on a plane in economy; long haul flight tips with kids | Med / Med (Reddit-heavy results) | CAA [pack right](https://www.caa.co.uk/air-passengers/about-your-trip/baggage/pack-right-safe-flight/), [NHS jet lag](https://www.nhs.uk/conditions/jet-lag/) (200) | `/red-eye-flights`, `/red-eye-vs-daytime-flights` (404) (owner proposal 5) |
| 14 | How early to get to the airport (UK and US) | `how-early-to-get-to-the-airport` | how early should i get to the airport for an international flight | how early should i get to the airport uk; … gatwick; … for a domestic flight | High / Med (Which?, Kayak, airports) | Airport pages (Heathrow, Gatwick, Manchester; JFK) and [TSA FAQ](https://www.tsa.gov/travel/frequently-asked-questions) (200). Quote airline check-in deadlines from airline pages. | – |
| 15 | Jet lag: how to adjust after a long flight | `jet-lag-tips` | jet lag tips | jet lag tips flying east; jet lag tips us to uk; jet lag tips uk to australia; jet lag recovery | Med / Med. Health-adjacent: cite the NHS and avoid medical advice. | [NHS jet lag](https://www.nhs.uk/conditions/jet-lag/) (200); the CDC Yellow Book returned 403 (verify) | – |

**Further backlog, lower priority:**
- **Heathrow terminals by airline** and **JFK terminals by airline.** Demand is high, but airport sites rank well and the data changes, so it must be sourced from the airport pages: [Heathrow terminal guides](https://www.heathrow.com/at-the-airport/terminal-guides) (200) and [JFK](https://www.jfkairport.com/) (200).
- **Denied boarding and overbooking compensation, UK vs US.** Could be a section of W1-3 first.
- **Hidden-city ticketing (skiplagging): the risks.** An informational warning piece only. Never present it as a tactic, and cite airline conditions of carriage.
- **Error fares: what they are and whether airlines honour them.** Medium demand. Must not overpromise.
- **Google Flights vs Skyscanner.** Not recommended. It's awkward for a comparison brand, and Reddit and big publishers dominate.
- **Travel insurance.** Not recommended now (YMYL, regulated, giant competitors).

---

## 8. Programmatic pages

### 8.1 Route pages: make them indexable (the top non-blog action)

**Evidence.** For 50+ pairs tested, autocomplete for "{origin} to {destination} flight" puts **"flight time"** first or second ("flights" is the other). Many pairs also show "flight duration", "flight distance", "flight path" and "direct" variants, and "status / tracker / today" variants that show people flying the route. Prefix lists show the heaviest pairs:
- "how long is the flight from london to …" (GB): new york, singapore, dubai, paris, tokyo, japan, miami, amsterdam, rome, toronto.
- "flight time london to …" (GB): new york, singapore, tokyo, dubai, …, bangkok, barcelona.
- "how long is the flight from new york to …": london, japan, paris, italy, hawaii, …, rome, australia.
- "flight time manchester to …": malta, new york, corfu, rome, rhodes, barcelona, dubai, …

**What to do (in order):**
1. **Turn `noindex` off** on the 37 route pages and add them to `sitemap.xml` with accurate `lastmod`. If you'd rather lower the risk, index the strongest 15 first (marked ★ in the table below) and the rest a week later. Watch for "Crawled – currently not indexed", which is the sign of pages judged thin.
2. **Retitle around the dominant intent**:
   - Title: `{A} to {B} flight time, distance and fares | Wallet Flights`. For long names, drop "and fares".
   - H1: `{A} to {B} flights`, with an answer-first lead: "Flights from London to Dubai take about … ; the cities are about … km apart, and Dubai is … hours ahead."
   - Meta description built from the computed facts (time, distance, time difference, airports) instead of "Recent cheapest round trips…", which promises fares the page may not show.
3. **Keep the Q&A block** (`src/content/quick-answers.ts` already holds flight time, distance, time difference, origin airports, arrival airport, best time, rights and entry). Add these questions:
   - "Are there direct flights from {A} to {B}?" Autocomplete has "are there direct flights from chicago to paris" and "… chicago to rome". Answer only from airline timetables, with a check date; otherwise say "check the results above".
   - "How long is the flight back from {B} to {A}?" Direction matters because of winds, and the reverse query is often the bigger one (for example "new york to london flight time").
   - "Which {A} airport is best for {B}?" For London and New York: list the airports and point to the results instead of claiming which is cheaper.
   - "What's the cheapest month to fly {A} to {B}?" **Only when fare data exists**; otherwise leave it out.
   - Country-level wording where it's natural: "How long is the flight from the UK to Japan?" on `london-to-tokyo` and `manchester-…` pages.
4. **Strengthen the flight-time answer.** Today it's a distance-based estimate ("about X in the air"). Competitors show scheduled nonstop durations. Consider a `scheduledNonstop` field per direction, filled from airline timetables with a "checked on" date, and keep the estimate as a fallback. **Never invent schedule times.**
5. **Link to route pages** from each destination page ("Popular routes to Dubai"), from the home page and from the relevant guides, so they're discoverable without the sitemap.

**Existing pairs: strongest to weakest** (by autocomplete signals: "flight time" position and status/tracker variants, which show the route is flown):

| Tier | Pairs |
|---|---|
| ★ Strong | london-to-new-york, new-york-to-london, london-to-dubai, new-york-to-tokyo, los-angeles-to-tokyo, manchester-to-new-york, manchester-to-dubai, new-york-to-rome, london-to-rome, new-york-to-dubai, los-angeles-to-london, los-angeles-to-sydney, chicago-to-paris, atlanta-to-paris, new-york-to-cancun |
| Good | london-to-delhi, new-york-to-delhi, london-to-lisbon, london-to-cape-town, los-angeles-to-bangkok, los-angeles-to-mexico-city, chicago-to-tokyo, chicago-to-delhi, chicago-to-cancun, chicago-to-barcelona, manchester-to-barcelona, manchester-to-bangkok, manchester-to-istanbul, manchester-to-cancun, atlanta-to-rome, atlanta-to-cancun, atlanta-to-cape-town, new-york-to-lisbon |
| Weakest | **atlanta-to-cairo** (completions pad out with "google flights…" and "cheap flights from…", with few status variants), **atlanta-to-singapore** (same pattern), **los-angeles-to-bali** (same pattern), **chicago-to-istanbul** (only 8 completions). Keep them, but index them last. |

### 8.2 Additional route pairs (6 origins × 20 destinations), ranked

These candidates are not yet built. "P" means the destination appears in an origin-prefix completion list, which is the strongest signal. "R" means the pair has a full set of route-level completions (10 variants, with flight time first or second).

| Rank | Pair | Signal |
|---|---|---|
| 1 | london-to-tokyo | P (GB "flight time london to" #3; "how long … london to" #5) |
| 2 | london-to-singapore | P (#2 in both GB prefix lists) |
| 3 | london-to-paris | P (GB #4, US #2; "cheap flights from london to paris" #1). Note that Eurostar competes. |
| 4 | new-york-to-paris | P (#3 "how long … new york to"; US "flight time new york to" #2) |
| 5 | london-to-bangkok | P ("flight time london to bangkok"; "flight time from uk to thailand") |
| 6 | london-to-sydney | P ("flight time from uk to australia"; "time difference between london and sydney") |
| 7 | london-to-barcelona | P (GB "flight time london to" #10) |
| 8 | manchester-to-rome | P ("flight time manchester to rome" #4) |
| 9 | london-to-istanbul | P ("cheap flights from london to istanbul" #4; "flight time from uk to turkey") |
| 10 | manchester-to-paris | P ("how long … manchester to paris"; "cheap flights from manchester to paris" #3) |
| 11 | london-to-cairo | P ("flight time from uk to egypt"; "how long … manchester to egypt") |
| 12 | new-york-to-sydney | P ("how long … new york to australia"; "flight time from usa to australia" #1) |
| 13 | new-york-to-barcelona | R (flight time #1) |
| 14 | london-to-bali | R ("london to bali flights" #1, flight time #2) |
| 15 | new-york-to-singapore | R |
| 16 | new-york-to-istanbul | R |
| 17 | los-angeles-to-paris | R |
| 18 | london-to-cancun | R |
| 19 | manchester-to-delhi | R (status and tracker variants, showing regular traffic) |
| 20 | manchester-to-lisbon | R |
| 21 | manchester-to-tokyo | R |
| 22 | chicago-to-rome | R ("are there direct flights from chicago to rome") |
| 23 | los-angeles-to-dubai | R |
| 24 | chicago-to-dubai | R |
| 25 | new-york-to-cape-town | R |
| 26 | london-to-mexico-city | R |
| 27 | london-to-rio-de-janeiro | R ("london to rio flight time" #1) |

**Rollout:** add the first 12 in week 3, but only if at least half of the first 37 are indexed by then. Add the rest in weeks 4 to 6.

**Two notes on the wider opportunity:**
- **US-city queries from London.** "how long is the flight from london to chicago / atlanta / lax" shows demand for London to US-city pages. Our US origins aren't destinations today. Consider reverse pages (`london-to-chicago`, `london-to-atlanta`, `london-to-los-angeles`) if the template can take a US origin city as a destination.
- **Manchester's top completions are mostly outside our 20 destinations** (Malta, Tenerife, Corfu, Rhodes, Malaga, Crete, Amsterdam). That's a destination-list decision for the owner, not an SEO fix.

### 8.3 Destination pages: Q&A to add per page

These pages already answer the best time to visit, airports, approximate flight time and an entry link. Research shows people often search **at country level** and **from a specific origin** ("flights to lisbon from uk / manchester / nyc", "how long is a flight to portugal from uk / new york"). Add these questions only where we can source the answer (visa answers must link to GOV.UK, or to travel.state.gov for US travellers, and say "check before you travel"):

| Page | Questions with autocomplete evidence |
|---|---|
| Lisbon | How long is a flight to Portugal from the UK / New York? Best time to visit Lisbon and Porto? How do I get from Lisbon airport to the city centre? (Sources disagree on whether Aerobus still runs, so check the metro and Carris operators' own pages.) |
| Tokyo | Do I need a visa for Japan from the UK / US? How long is the flight from the UK to Japan? Best time to visit Tokyo to avoid crowds? Narita or Haneda: which is closer to Shinjuku and Shibuya? |
| Bali | Do I need a visa for Bali? Best time to visit Bali for weather? What's Bali's airport called? (Denpasar, DPS.) |
| Bangkok | Do I need a visa for Thailand from the UK / US? How long is the flight from the UK to Thailand? |
| Singapore | Do I need a visa for Singapore? How long is the flight from London to Singapore? |
| Sydney | How long is the flight from the UK / USA to Australia? |
| Dubai | How long is the flight from the UK to Dubai? Best time to visit Dubai for weather? How far is Dubai airport from the Burj Khalifa / Dubai Mall? |
| Istanbul | Do I need a visa for Turkey? How long is the flight from the UK to Turkey? |
| Cairo | How long is the flight from the UK to Egypt? Do I need a visa for Egypt? |
| Cape Town | Best time to visit Cape Town for whale watching or penguins? |
| Delhi | How long is the flight from the USA to India? Do I need a visa for India? |
| Cancún | Best time to visit Cancún to avoid seaweed? (Needs a scientific or official source, so leave it out if there isn't one.) Cancún airport to Tulum / Playa del Carmen / Hotel Zone? |
| Mexico City | Do UK citizens need a visa for Mexico? |
| Rio de Janeiro | Do Americans need a visa for Brazil? (Check travel.state.gov; it blocked automated fetches.) |
| Cusco | Best time to visit Cusco and Machu Picchu? Can you fly direct from London to Cusco? (Answer from schedules, or say flights connect.) How many days do you need in Cusco? |
| Rome | How long is a flight to Italy? Do Americans need a visa for Italy? (Link W1-6.) |
| Paris / Barcelona | Do Americans need a visa for France / Spain? (Link W1-6.) |
| New York | Do I need an ESTA to travel to the USA from the UK? JFK or Newark: which is easier for Manhattan? |
| London | UK ETA for US citizens: cost and timing (GOV.UK says £20). Which Heathrow terminal does my airline use? (Link the Heathrow page.) |

---

## 9. On-page fixes for existing pages

| Page | Today | Recommended | Evidence |
|---|---|---|---|
| Route pages (37) | "Cheap flights from {A} to {B}" + noindex | "{A} to {B} flight time, distance and fares", indexable, with a fact-based description | "flight time" is the top route completion (section 8.1) |
| Destination pages (20) | "Cheap flights to {City}" / H1 "Flights to {City}" | seoTitle "{City} flights: best time to visit & fares" (Lisbon: 42 + 17 = 59). Keep the H1. Description: "How long the flight is from the UK and US, the best months to visit {City}, which airport to use, and entry rules for British and American travellers." | "cheap flights to {city}" is dominated by big comparison sites; "best time to visit {city}", "flights to {city} from uk" and "how long is a flight to {country}" are strong completions the page already answers |
| `/travel-guides/when-to-book-international-flights` | seoTitle "When to book an international flight" | "Best time to book international flights" (39 + 17 = 56). Add an H2 "Is Tuesday the cheapest day to book?" that cites the publishers' own data pages | "best time to book international flights" and "how far in advance should you book international flights" are top completions; "is it cheaper to book flights on tuesday" is #1 for its prefix |
| `/travel-guides/carry-on-only-checklist` | "Carry-on only checklist for two weeks" | "Carry-on packing list for 2 weeks" (33 + 17 = 50) | "carry on packing list for 2 weeks" and "carry on only packing list" are both completions |
| `/travel-guides/europe-shoulder-season` | "Europe in shoulder season: cheaper flights" | "Shoulder season in Europe: cheaper flights" (start with the exact phrase) | "shoulder season europe" is the #1 completion; "…2026" and "…destinations" are variants |
| `/travel-guides` index | Description: "Practical advice on booking flights, when to travel and what to pack." | "Flight guides for UK and US travellers: when to book, your rights if a flight is cancelled, hand luggage, liquids and power bank rules, and entry requirements." Add a "Latest guides" list with dates | Thin description; the hub needs to link the new guides |
| Home | Fine as is | Add a "Popular routes" and a "New guides" module linking to the route pages and the Wave 1 posts (crawl paths) | New URLs need internal links, not just the sitemap |
| White-label subdomains | `flights.` and `booking.walletflights.com` are indexable (robots allows `/?*`), and one search URL with a tracking marker was seen in a search index | If the white-label settings allow it, add `noindex` (or a canonical to the main site's search page). Add a **Domain property** in Search Console so subdomain impressions are visible. | Thin duplicate pages under the brand; tracking parameters showing in results |
| Old spun WordPress URLs | 404 | Keep them 404 (or serve 410 to speed removal). Don't redirect them to new guides unless Search Console shows they have links or impressions. | 200+ spun listicles in the Wayback list |

**Structured data:** keep Article and BreadcrumbList on guides. FAQPage markup can stay (it helps machines read the Q&A), but Google limits FAQ rich results to authoritative government and health sites, so don't expect a visual gain from it.

---

## 10. Legacy WordPress topics worth reclaiming

| Legacy slug | Status today | Recommended target | Why |
|---|---|---|---|
| `/air-refunds` | 308 → `/help` | W1-3 rights | Same intent (refund after cancellation) |
| `/flight-ticket-refunds` | 308 → `/help` | W1-3 rights | Same intent |
| `/refundable-flights` | 308 → `/help` | W1-2 24-hour rule, with a "refundable vs non-refundable fares" section | "refundable flights" completions are about buying refundable fares (for example "refundable flights for schengen visa"), not cancellation rights |
| `/how-to-avoid-flight-cancellation-fees` | 308 → `/help` | W1-2 24-hour rule | The 24-hour window is the main fee-free cancellation route |
| `/how-to-find-the-cheapest-flights` | 308 → `/travel-guides` | Wave 2 #11 cheap-flight routine | Same topic |
| `/flight-booking-tips` | 308 → `/travel-guides` | Wave 2 #11 | Same topic |
| `/airline-baggage-fees` | 308 → carry-on checklist | Wave 2 #7 bag fees, once it's live | Exact match |
| `/last-minute-flight-deals` | 308 → `/deals` | **Keep → `/deals`** and link the Wave 2 #12 guide from `/deals` | "last minute flights deals" is transactional, and `/deals` matches it better than an advice article |
| `/understanding-flight-compensation` | 404 | W1-3 rights | Exact topic |
| `/layover-flights`, `/direct-vs-connecting-flights`, `/non-stop-flights` | 404 | Wave 2 #9 layover | Same topic |
| `/travel-visa` | 404 | Wave 2 #8 ESTA/ETA (or W1-6) | Same topic |
| `/one-way-vs-round-trip-flights`, `/multi-city-flights-save-money`, `/cheapest-airports-to-fly-from`, `/online-flight-booking-mistakes` | 404 | Wave 2 #11 | Sub-topics of the routine |
| `/red-eye-flights`, `/red-eye-vs-daytime-flights` | 404 | Wave 2 #13 long-haul | Closest match |
| `/travel-insurance` | 404 | Leave as 404 | We aren't covering insurance |

Only add the new redirects (the 404 rows) if Search Console's Links or Pages reports show those old URLs have links or impressions. Otherwise a 404 is the honest signal.

---

## 11. Measurement plan (Search Console)

**Set-up (day 1):**
1. Add a **Domain property** (DNS) if only a URL-prefix property exists, so `www`, the apex and the white-label subdomains are all visible.
2. Submit `https://www.walletflights.com/sitemap.xml` again after the route pages are added.
3. Use URL Inspection, then "Request indexing", for the home page, `/travel-guides`, the 6 Wave 1 posts and the 15 ★ route pages. Spread the requests over a few days (there's a daily quota).
4. Add the site to Bing Webmaster Tools by importing from Search Console.

**Daily (days 1 to 14):**
- URL Inspection on each new URL until it shows "URL is on Google".
- Pages report: count of indexed URLs, plus anything in "Discovered – currently not indexed" or "Crawled – currently not indexed" (the second is a thin-content warning for route pages).
- Performance in the 24-hour view: first impressions by page.

**Weekly:**
- **Impressions and position by page group,** using page filters `/routes/`, `/travel-guides/` and `/destinations/`.
- **Query groups** (Performance, query filter, custom regex):
  - Flight time: `(flight time|how long|how far|distance|time difference)`
  - Rights: `(refund|compensation|cancel|delay|rights|24 hour|uk261|dot)`
  - Bags and security: `(power bank|liquid|100ml|hand luggage|cabin bag|baggage)`
  - Entry: `(etias|ees|entry exit|esta|eta|visa)`
- **Quick wins:** queries in positions 8 to 20 with impressions. Strengthen the matching section, add the exact question as an H2 or FAQ, and add internal links.
- **Title tests:** pages in positions 1 to 10 with a low CTR. Rewrite the title or description, then compare after 2 to 3 weeks (don't change titles more often than that).
- **Country split** (UK vs US): if US impressions lag, add US-specific examples and sources.
- **Crawl stats** (Settings): crawl requests should rise after the sitemap update.
- Log each week's numbers and the changes made, following the project's audit process.

**Checkpoints:**

| When | Check |
|---|---|
| Day 3 | The sitemap has been read again and the route URLs have been discovered |
| Day 7 | Wave 1 posts 1 and 2, plus most ★ routes, are indexed. First queries appear. |
| Day 14 | All 6 posts are indexed. Impressions are up week on week. A list of position 8–20 queries to work on. |
| Week 4 | Decide on the 12 additional route pairs, based on how well the first 37 were indexed |

---

## 12. Source check log (16 Oct 2026)

"Read" means the page content was fetched and read. "200" means the page loaded with a browser user agent, but its content wasn't read in full. "Verify" means the page blocked automated access, timed out, or rendered by JavaScript, so it must be checked in a browser before citing it.

| Source | Result |
|---|---|
| [CAA: Delays](https://www.caa.co.uk/air-passengers/resolving-travel-problems/delays-and-cancellations/delays/) | Read |
| [CAA: lithium batteries and power banks changes](https://www.caa.co.uk/commercial-industry/airlines/dangerous-goods/changes-to-rules-on-the-carriage-of-lithium-cellsbatteries-and-power-banks/) | Read |
| [CAA: Cancellations](https://www.caa.co.uk/air-passengers/travel-problems-and-rights/flight-delays-and-cancellations/cancellations/) | 200 |
| [CAA: Delays and cancellations hub](https://www.caa.co.uk/air-passengers/travel-problems-and-rights/flight-delays-and-cancellations/) | 200 |
| [CAA: Denied boarding](https://www.caa.co.uk/air-passengers/travel-problems-and-rights/flight-delays-and-cancellations/denied-boarding/) | 200 |
| [CAA: Travel complaints](https://www.caa.co.uk/air-passengers/travel-problems-and-rights/travel-complaints/) | 200 |
| [CAA: Pack right, safe flight](https://www.caa.co.uk/air-passengers/about-your-trip/baggage/pack-right-safe-flight/) | 200 |
| [CAA: Checking your baggage allowance](https://www.caa.co.uk/air-passengers/about-your-trip/baggage/checking-your-baggage-allowance/) | 200 |
| Old CAA missed-connection URLs | Redirect to the CAA passenger home page. Use the Delays page's connecting-flights section instead. |
| [GOV.UK: Hand luggage restrictions](https://www.gov.uk/hand-luggage-restrictions) | Read |
| [GOV.UK: Liquids](https://www.gov.uk/hand-luggage-restrictions/liquids) | Read |
| [GOV.UK: Electronic devices](https://www.gov.uk/hand-luggage-restrictions/electronic-devices-and-electrical-items) | Read |
| [GOV.UK: ETA](https://www.gov.uk/eta) | Read (£20) |
| [GOV.UK: Air passenger rights summary](https://www.gov.uk/government/publications/air-passenger-travel-guide/air-passenger-travel-guide-summary-of-passenger-rights) | Read |
| [GOV.UK: Spain entry requirements](https://www.gov.uk/foreign-travel-advice/spain/entry-requirements) | Read |
| [GOV.UK: USA entry requirements](https://www.gov.uk/foreign-travel-advice/usa/entry-requirements) | 200 |
| [GOV.UK: Check if you need a UK visa](https://www.gov.uk/check-uk-visa) | 200 |
| [GOV.UK: School term dates](https://www.gov.uk/school-term-holiday-dates) | 200 |
| [GOV.UK: School attendance legal action](https://www.gov.uk/school-attendance-absence/legal-action-to-enforce-school-attendance) | 200 |
| [GOV.UK: Foreign travel advice](https://www.gov.uk/foreign-travel-advice) | 200 |
| [TSA: Liquids rule](https://www.tsa.gov/travel/security-screening/liquids-aerosols-gels-rule) | Read |
| [TSA: Power banks](https://www.tsa.gov/travel/security-screening/whatcanibring/items/power-banks) | 200 |
| [TSA: FAQ](https://www.tsa.gov/travel/frequently-asked-questions) | 200 |
| [FAA PackSafe: lithium batteries](https://www.faa.gov/hazmat/packsafe/lithium-batteries) | 200 by status check; the reader tool got 403, so verify |
| [FAA: Airline passengers and batteries](https://www.faa.gov/hazmat/packsafe/airline-passengers-and-batteries) | 200 |
| [CBP: ESTA](https://www.cbp.gov/travel/international-visitors/esta) | 200 |
| [Official ESTA site](https://esta.cbp.dhs.gov/) | 200 |
| DOT: [refunds](https://www.transportation.gov/individuals/aviation-consumer-protection/refunds), [Fly Rights](https://www.transportation.gov/airconsumer/fly-rights), [delays and cancellations](https://www.transportation.gov/individuals/aviation-consumer-protection/flight-delays-cancellations), [24-hour notice](https://www.transportation.gov/airconsumer/notice-24hour-reservation), [buying a ticket](https://www.transportation.gov/individuals/aviation-consumer-protection/buying-ticket) | **403, verify** (facts above come from search snippets of these pages) |
| [eCFR 14 CFR 259.5](https://www.ecfr.gov/current/title-14/chapter-II/subchapter-A/part-259/section-259.5), Parts 260 and 250 | Bot gate, **verify** |
| travel.state.gov | 403, **verify** |
| [EC: EES fully operational 10 April 2026](https://home-affairs.ec.europa.eu/news/entryexit-system-will-become-fully-operational-10-april-2026-2026-03-30_en) | Read |
| [EC: EES policy page](https://home-affairs.ec.europa.eu/policies/schengen/smart-borders/entry-exit-system_en) | 200 |
| [EC: ETIAS will cost EUR 20](https://home-affairs.ec.europa.eu/news/european-travel-authorisation-etias-will-cost-eur-20-2025-07-17_en) | 200 |
| [travel-europe.europa.eu ETIAS](https://travel-europe.europa.eu/en/etias), [EES](https://travel-europe.europa.eu/en/ees), [revised timeline](https://travel-europe.europa.eu/en/etias/about-etias/news-corner/revised-timeline-ees-and-etias) | 200 but JavaScript-rendered, **verify content** |
| [NHS: Jet lag](https://www.nhs.uk/conditions/jet-lag/) | 200 |
| CDC Yellow Book (jet lag) | 403, verify |
| [Heathrow: Hand baggage and liquids](https://www.heathrow.com/at-the-airport/security-and-baggage/hand-baggage-and-liquids) | 200 (content seen via search summary) |
| [Heathrow: Security FAQs](https://www.heathrow.com/customer-support/faq/faq-security) | 200 |
| [Heathrow: Terminal guides](https://www.heathrow.com/at-the-airport/terminal-guides) | 200 |
| [Gatwick: Security](https://www.gatwickairport.com/passenger-guides/security.html) | 200 |
| [Manchester Airport](https://www.manchesterairport.co.uk/) | 200 (home page only; liquids page not located) |
| [JFK Airport](https://www.jfkairport.com/) | 200 |
| [BA: Baggage essentials](https://www.britishairways.com/content/information/baggage-essentials) | 200 |
| [BA: Book with confidence](https://www.britishairways.com/travel/book-with-confidence/public/en_gb) | 200, but showed a "high demand" holding page, so verify |
| [Ryanair: Baggage FAQ](https://www.ryanair.com/gb/en/useful-info/help-centre/faq-overview/baggage) | 200 |
| [Frontier: Bag options](https://www.flyfrontier.com/travel/travel-info/bag-options/) | 200 |
| easyJet help | 403, verify |
| Jet2, United and Spirit sites | Timed out, verify (Spirit reportedly no longer operating) |

---

## Appendix: autocomplete evidence (selected, Google, `hl=en-GB&gl=gb` unless noted)

Shown to make the demand tiers auditable. The order is as returned.

- **24 hour cancellation rule** → "24 hour cancellation rule flights", "…airlines", "24 hour cancellation rule", "24 hour refund rule", "24 hour cancellation policy", "…flights", "…international flights"
- **power bank on plane** → "power bank on plane", "…uk", "…limit", "…ryanair", "…rules", "…jet2", "…easyjet", "…air canada", "…british airways", "…emirates"
- **100ml liquids** → "100ml liquids", "…airport", "…stansted airport", "…cork airport", "…rule", "…manchester airport", "…gatwick", "…in hand luggage", "…birmingham airport", "…heathrow"
- **delayed flight rights** → "delayed flight rights", "…uk", "…eu", "…usa", "…canada", "…europe", "…australia", "cancelled flight rights", "…uk", "…eu"
- **etias** → "etias", "etias application", "etias europe", "etias visa", "etias travel authorization", "etias start date", "etias 2026", "etias launch date", "etias uk", "etias official website"
- **separate tickets** → "separate tickets booked together meaning", "separate tickets booked together", "separate tickets", "separate tickets google flights", "separate tickets meaning", …
- **london to dubai flight** → "london to dubai flight time", "london to dubai flights", "…flight ticket price", "…flight status today", "…flight time emirates", …
- **how long is the flight from london to** → "…new york", "…singapore", "…dubai", "…paris", "…tokyo", "…japan", "…miami", "…amsterdam", "…rome", "…toronto"
- **flight time from uk to** → "…japan", "…greece", "…thailand", "…australia", "…turkey", "…egypt", "…new york", "…dubai", "…dominican republic", "…malta"
- **do i need a visa for** → "…japan", "…thailand", "…turkey", "…vietnam", "…china", "…bali", "…singapore", "…spain", "…thailand from uk", "…italy"
- **is it cheaper to book flights** → "…on tuesday", "…at the airport", "…last minute", "…at the library", "…through a travel agent", "…in advance", …
- **half term flights** → "half term flights", "…cancelled", "…at risk", "half term flight deals", "cheap half term flights", "may half term flights", "october half term flights", …
- **uk eta** (hl=en-US) → the first suggestion was an ad-like third-party ("uk eta application … etourist.com"), then "uk eta", "uk eta application", "uk eta for us citizens". This is evidence of lookalike sites, so warn readers.
