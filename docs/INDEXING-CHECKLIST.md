# Search Console indexing checklist (16 Oct 2026)

All 82 URLs below are in `https://www.walletflights.com/sitemap.xml` once the commits on `main`
are pushed and deployed. Do the steps in order.

## Step 0: push and deploy (owner's terminal)

```bash
git push origin main
```

Vercel deploys `main` automatically. Wait for the deploy to finish, then open
`https://www.walletflights.com/travel-guides/power-bank-rules-on-planes` to check it's live.

## Step 1: Search Console set-up (once)

1. **Add a Domain property** for `walletflights.com` (DNS TXT record at Hostinger) if you only have a
   URL-prefix property. It shows www, the apex and the `flights.` / `booking.` subdomains together.
2. **Sitemaps** → submit `https://www.walletflights.com/sitemap.xml` (resubmit even if it's already there:
   it now has 82 URLs instead of 36).
3. **Bing Webmaster Tools** → "Import from Google Search Console". Bing also feeds ChatGPT search,
   DuckDuckGo and Copilot answers.

## Step 2: Request indexing (URL Inspection → "Request indexing")

Google limits manual requests to roughly 10 to 12 a day per property, so spread them out. The sitemap
covers everything else; these are the pages most likely to earn impressions first.

**Day 1 (hubs and new guides)**
1. https://www.walletflights.com
2. https://www.walletflights.com/travel-guides
3. https://www.walletflights.com/travel-guides/power-bank-rules-on-planes
4. https://www.walletflights.com/travel-guides/24-hour-flight-cancellation-rule
5. https://www.walletflights.com/travel-guides/flight-cancelled-or-delayed-rights
6. https://www.walletflights.com/travel-guides/uk-airport-liquids-rules
7. https://www.walletflights.com/travel-guides/self-transfer-separate-tickets
8. https://www.walletflights.com/travel-guides/ees-etias-uk-us-travellers
9. https://www.walletflights.com/deals
10. https://www.walletflights.com/destinations

**Day 2 (strongest route pages)**
1. https://www.walletflights.com/routes/london-to-new-york
2. https://www.walletflights.com/routes/new-york-to-london
3. https://www.walletflights.com/routes/london-to-dubai
4. https://www.walletflights.com/routes/new-york-to-tokyo
5. https://www.walletflights.com/routes/los-angeles-to-tokyo
6. https://www.walletflights.com/routes/manchester-to-new-york
7. https://www.walletflights.com/routes/manchester-to-dubai
8. https://www.walletflights.com/routes/new-york-to-rome
9. https://www.walletflights.com/routes/london-to-rome
10. https://www.walletflights.com/routes/new-york-to-dubai

**Day 3 (more routes)**
1. https://www.walletflights.com/routes/los-angeles-to-london
2. https://www.walletflights.com/routes/los-angeles-to-sydney
3. https://www.walletflights.com/routes/chicago-to-paris
4. https://www.walletflights.com/routes/atlanta-to-paris
5. https://www.walletflights.com/routes/new-york-to-cancun
6. https://www.walletflights.com/routes/london-to-lisbon
7. https://www.walletflights.com/routes/london-to-delhi
8. https://www.walletflights.com/routes/new-york-to-delhi
9. https://www.walletflights.com/routes/london-to-cape-town
10. https://www.walletflights.com/routes/new-york-to-lisbon

**Day 4 (destinations with the most searched questions)**
1. https://www.walletflights.com/destinations/tokyo
2. https://www.walletflights.com/destinations/dubai
3. https://www.walletflights.com/destinations/lisbon
4. https://www.walletflights.com/destinations/bali
5. https://www.walletflights.com/destinations/cancun
6. https://www.walletflights.com/destinations/new-york
7. https://www.walletflights.com/destinations/london
8. https://www.walletflights.com/destinations/bangkok
9. https://www.walletflights.com/travel-guides/esta-and-uk-eta
10. https://www.walletflights.com/travel-guides/half-term-flights

**Day 5**
1. https://www.walletflights.com/travel-guides/hand-luggage-sizes-bag-fees
2. https://www.walletflights.com/travel-guides/when-to-book-international-flights
3. https://www.walletflights.com/travel-guides/carry-on-only-checklist

**Day 6 onward:** the rest only if URL Inspection shows "URL is not on Google" after a week.

## All 82 URLs in the sitemap

**Main pages (13)**
- https://www.walletflights.com
- https://www.walletflights.com/deals
- https://www.walletflights.com/destinations
- https://www.walletflights.com/airlines
- https://www.walletflights.com/travel-guides
- https://www.walletflights.com/about
- https://www.walletflights.com/contact
- https://www.walletflights.com/help
- https://www.walletflights.com/editorial-policy
- https://www.walletflights.com/privacy-policy
- https://www.walletflights.com/terms-and-conditions
- https://www.walletflights.com/cookie-policy
- https://www.walletflights.com/photo-credits

**Travel guides (12)**
- https://www.walletflights.com/travel-guides/hand-luggage-sizes-bag-fees
- https://www.walletflights.com/travel-guides/esta-and-uk-eta
- https://www.walletflights.com/travel-guides/half-term-flights
- https://www.walletflights.com/travel-guides/power-bank-rules-on-planes
- https://www.walletflights.com/travel-guides/24-hour-flight-cancellation-rule
- https://www.walletflights.com/travel-guides/flight-cancelled-or-delayed-rights
- https://www.walletflights.com/travel-guides/uk-airport-liquids-rules
- https://www.walletflights.com/travel-guides/self-transfer-separate-tickets
- https://www.walletflights.com/travel-guides/ees-etias-uk-us-travellers
- https://www.walletflights.com/travel-guides/when-to-book-international-flights
- https://www.walletflights.com/travel-guides/europe-shoulder-season
- https://www.walletflights.com/travel-guides/carry-on-only-checklist

**Destinations (20)**
- https://www.walletflights.com/destinations/london
- https://www.walletflights.com/destinations/paris
- https://www.walletflights.com/destinations/rome
- https://www.walletflights.com/destinations/barcelona
- https://www.walletflights.com/destinations/lisbon
- https://www.walletflights.com/destinations/tokyo
- https://www.walletflights.com/destinations/bali
- https://www.walletflights.com/destinations/singapore
- https://www.walletflights.com/destinations/bangkok
- https://www.walletflights.com/destinations/sydney
- https://www.walletflights.com/destinations/dubai
- https://www.walletflights.com/destinations/istanbul
- https://www.walletflights.com/destinations/cairo
- https://www.walletflights.com/destinations/cape-town
- https://www.walletflights.com/destinations/delhi
- https://www.walletflights.com/destinations/cancun
- https://www.walletflights.com/destinations/rio-de-janeiro
- https://www.walletflights.com/destinations/mexico-city
- https://www.walletflights.com/destinations/cusco
- https://www.walletflights.com/destinations/new-york

**Routes (37)**
- https://www.walletflights.com/routes/new-york-to-london
- https://www.walletflights.com/routes/new-york-to-lisbon
- https://www.walletflights.com/routes/new-york-to-cancun
- https://www.walletflights.com/routes/new-york-to-rome
- https://www.walletflights.com/routes/new-york-to-tokyo
- https://www.walletflights.com/routes/new-york-to-dubai
- https://www.walletflights.com/routes/new-york-to-delhi
- https://www.walletflights.com/routes/los-angeles-to-tokyo
- https://www.walletflights.com/routes/los-angeles-to-mexico-city
- https://www.walletflights.com/routes/los-angeles-to-sydney
- https://www.walletflights.com/routes/los-angeles-to-bangkok
- https://www.walletflights.com/routes/los-angeles-to-london
- https://www.walletflights.com/routes/los-angeles-to-bali
- https://www.walletflights.com/routes/chicago-to-paris
- https://www.walletflights.com/routes/chicago-to-cancun
- https://www.walletflights.com/routes/chicago-to-istanbul
- https://www.walletflights.com/routes/chicago-to-barcelona
- https://www.walletflights.com/routes/chicago-to-delhi
- https://www.walletflights.com/routes/chicago-to-tokyo
- https://www.walletflights.com/routes/london-to-new-york
- https://www.walletflights.com/routes/london-to-dubai
- https://www.walletflights.com/routes/london-to-lisbon
- https://www.walletflights.com/routes/london-to-rome
- https://www.walletflights.com/routes/london-to-delhi
- https://www.walletflights.com/routes/london-to-cape-town
- https://www.walletflights.com/routes/manchester-to-barcelona
- https://www.walletflights.com/routes/manchester-to-dubai
- https://www.walletflights.com/routes/manchester-to-new-york
- https://www.walletflights.com/routes/manchester-to-istanbul
- https://www.walletflights.com/routes/manchester-to-bangkok
- https://www.walletflights.com/routes/manchester-to-cancun
- https://www.walletflights.com/routes/atlanta-to-paris
- https://www.walletflights.com/routes/atlanta-to-rome
- https://www.walletflights.com/routes/atlanta-to-cape-town
- https://www.walletflights.com/routes/atlanta-to-cancun
- https://www.walletflights.com/routes/atlanta-to-cairo
- https://www.walletflights.com/routes/atlanta-to-singapore

Also useful for AI engines (not in the sitemap, no need to submit): `/llms.txt` and `/llms-full.txt`.

## Other owner actions that affect search

| Action | Why |
|---|---|
| Add `TRAVELPAYOUTS_TOKEN` in Vercel → Production, then redeploy | Fares, cheapest-month calendars and the hero price stay hidden without it. Pages are indexable either way now, but real fares make them far more useful. |
| Noindex or canonicalise `flights.walletflights.com` and `booking.walletflights.com` (search widget subdomains, in the widget's dashboard settings) | They return thin "Search Flights" pages that can be indexed under the brand, some with tracking parameters. Ask before changing account settings. |
| Weekly in Search Console: Pages report and Performance by `/routes/`, `/travel-guides/`, `/destinations/` | Shows what's indexed and which queries sit in positions 8 to 30, the quickest to improve. |
| Get a few genuine links: your Instagram, X and Facebook bios and posts linking to the new guides; the sister site linking to `/travel-guides` | New domains are found and trusted faster with real links. Never buy links. |
| Week 3: tell us how many route pages are indexed | Decides whether to add the next 12 route pages (list in `docs/SEO-CONTENT-PLAN.md`). |
