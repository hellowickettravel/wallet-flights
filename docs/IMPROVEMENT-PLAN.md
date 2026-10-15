# Wallet Flights: improvement plan (from the 15 Oct 2026 site audit)

The plan comes from four audits: technical SEO, content and AI search, performance, and UX, accessibility
and backend. Each phase runs **plan → build → test → verify on the live site** before the next one
starts. Results are logged in `docs/AUDIT.md`. Items marked **Owner** need a decision or access only the
owner has. They're listed so nothing gets lost, but code never invents the answer.

**Status (15 Oct 2026):** Phases 1 and 2 done and live. Phase 3 part 1 (3.1–3.8, plus 3.17) done.
Next is 3.9. See `docs/HANDOFF.md`.

| Phase | Theme | Why first |
|---|---|---|
| 1 | Indexing foundations | Google can't rank what it can't verify, crawl and canonicalise correctly. Everything else builds on this. |
| 2 | Structured data, AI search and on-page SEO | Once indexing is right, make every page clear to Google and to AI engines. |
| 3 | Performance, UX, accessibility and security | Core Web Vitals, PageSpeed scores, WCAG 2.2 AA and hardening (from the performance and UX/backend audits). |
| 4 | Content depth, E-E-A-T and claims | Needs the owner's facts and decisions: legal entity, booking model, authors, evidence for claims. |

---

## Phase 1: Indexing foundations

| # | Task | Detail | Done when |
|---|---|---|---|
| 1.1 | Search Console verification file | `public/google4df2a790d730b8df.html`, served at the site root on every host. | `GET /google4df2a790d730b8df.html` returns 200 with the token on www. |
| 1.2 | One canonical host: **www** | `site.url` becomes `https://www.walletflights.com`. Vercel already serves www and redirects the apex to it, and the search widget is registered to www. This fixes canonicals, sitemap, robots, OG and JSON-LD URLs in one place. | No canonical, sitemap `<loc>`, `og:url` or JSON-LD URL points at the apex. |
| 1.3 | Stop pages inheriting the homepage's canonical and `og:url` | Remove `alternates` and `openGraph.url` from the root layout. A shared `pageMetadata()` helper (`src/lib/seo.ts`) gives every page its own canonical, `og:url`, `og:title`, `og:description`, site name, locale and type, plus matching Twitter tags. Destination and guide pages keep their photo, and the Twitter image now matches it. | Every indexable page's `og:url` equals its canonical. Destination and guide pages have `og:site_name` and `og:url`. |
| 1.4 | 404 and hand-off pages | `not-found.tsx` gets its own title and `noindex`. `/go` has no canonical. | `/nope` title is "Page not found". `/go` has no canonical tag. |
| 1.5 | Redirect the `.vercel.app` duplicate | A host-matched 308 from `wallet-flights.vercel.app/*` to `www.walletflights.com/*`. Preview deployments are untouched. | `curl -I https://wallet-flights.vercel.app/about` gives 308 → www. |
| 1.6 | robots.txt | Sitemap on www. Stop blocking `/flights?` so Google can see its `noindex`. Block only `/go` exactly (not every path starting with "go"). Keep `/api/` blocked. Name the AI search and assistant crawlers explicitly so they stay allowed. | Live robots.txt matches. `/flights?…` is crawlable and noindex. |
| 1.7 | Legacy WordPress redirects | About 286 old URLs (Wayback list) now 404. Pages with a clear new equivalent get permanent 301/308 redirects: about, contact, policies, blog and categories, booking tips, `flights-to-*` country pages, `*-vacation-travel-guide` posts for cities with a destination page. The rest (tags, WooCommerce, thin listicles) can 404. | The redirect test covers every mapped URL. Spot checks pass on the live site. |
| 1.8 | Sitemap freshness | Real `lastModified` dates from content (`updated` dates on destinations, routes, legal, guides). Never "now" on every build. | Every `<url>` has a stable `lastmod`. |
| 1.9 | Small metadata fixes | Home description at most 155 characters. Legal pages get real descriptions. `/favicon.ico`. Manifest icons at 192 and 512. `twitter-image` re-uses the OG image code instead of copying it. | Tests check lengths and icon URLs. |
| 1.10 | **Owner:** search data and accounts | (a) Add `TRAVELPAYOUTS_TOKEN` in Vercel → Production, so fares and month calendars render on the deal, destination and route pages; this is the audit's top content issue. (b) Verify Search Console: use a **Domain property** (DNS TXT at Hostinger) or a URL-prefix property for **https://www.walletflights.com/**; the apex property may not verify through a redirect. (c) Submit `https://www.walletflights.com/sitemap.xml`. (d) Import the property into Bing Webmaster Tools. (e) Export the Search Console "Pages" and "Links" reports so the legacy redirect map can be extended with real data. | Owner confirms. |

## Phase 2: Structured data, AI search and on-page SEO

| # | Task | Detail |
|---|---|---|
| 2.1 | FAQ answers in the HTML | Home FAQ and Help centre render every answer in the DOM (collapsed with CSS/`hidden="until-found"`) so crawlers and AI engines read them and the FAQPage markup matches visible content. |
| 2.2 | Organization and WebSite entity | Stable `@id` (`/#organization`, `/#website`), logo, `contactPoint` (E.164 phone, email, GB and US, English), `areaServed`, Trustpilot in `sameAs`, WebSite `publisher` and `alternateName`. No SearchAction (retired). |
| 2.3 | Breadcrumbs and articles | BreadcrumbList on destination pages. Article gets `author` (the organisation until a real person is confirmed), `dateModified`, ISO dates and an image array. |
| 2.4 | `/llms.txt` and `/llms-full.txt` | Generated from `src/content/*`: who we are, how it works, how we make money, destinations, guides, policies. |
| 2.5 | Titles, H1s and keywords | Hub titles with search intent ("Cheap flight deals from the US and UK", …). Destination H1 "Flights to London". "Best time to visit X" and "Which X airport" H2s with answer-first sentences. Shorter guide SEO titles. |
| 2.6 | Internal links to routes | Deal cards, the home rail and a "Popular routes" block link to `/routes/*`. The footer group "Popular routes" is renamed or relinked. Guides link to destination pages they mention. |
| 2.7 | Thin pages while fares are missing | Hide empty fare modules. Route pages without data get `noindex, follow` and leave the sitemap until enriched. |
| 2.8 | Data and copy fixes | Delhi moves out of "Middle East & Africa", gets a Delhi photo and becomes "Similar destinations". "Approx. flying time" wording. Fare-board letters `aria-hidden`. Fix "Questions? we reply". Consistent apostrophes, "car hire" and "US". Move hard-coded copy into `src/content`. Read times computed from word count. |

## Phase 3: Performance, UX, accessibility and security

Baseline (local Lighthouse 13.5, simulated mobile; PageSpeed API was over quota): mobile Performance
74–91 (home 74–84, /deals 77), desktop 94–100. Accessibility, Best Practices and SEO 100 everywhere
(SEO 66 on /flights is the intended noindex). axe found 0 violations on 13 pages. Mobile LCP ranges
from 3.2 to 5.7 s, so the target is under 2.5 s.

| # | Task | Evidence | Expected |
|---|---|---|---|
| 3.1 | Cookie banner painted in the static HTML (hidden by a tiny inline script once a choice exists), max height plus scrolling inside, buttons always visible, before the header in DOM order, back-to-top hidden while it's open | Banner is the mobile LCP element on /, /routes and /contact. At 320px "Manage choices" is off-screen. 93 Tab presses to reach it. | −0.9 to −1.2 s mobile LCP; WCAG 1.4.10 |
| 3.2 | Fare-board split-flap driven without React re-renders (refs + rAF, fewer ticks, `contain`) | 46 re-renders and 2.3 s of main-thread time on / and /deals | INP and TBT on home and deals |
| 3.3 | Motion out of the root: no root `MotionConfig`, CSS drawer in the header, `LazyMotion` + `m` in leaves | 38.5 KB brotli motion chunk on every page | −20 to −30 KB brotli per page |
| 3.4 | Fonts: JetBrains Mono not preloaded; Bricolage without the `wdth` axis; text arrows become icons | 131 KB display font plus 31 KB mono preloaded everywhere | −85 to −140 KB high-priority bytes |
| 3.5 | `content-visibility:auto` on below-the-fold sections (home, /deals) | Initial layout −38% in an A/B test | −110 ms layout |
| 3.6 | /deals: first card images eager with high priority; `layout` animation only on the list | LCP 5.25 s is a lazy image | About −1 s mobile LCP |
| 3.7 | Images: `deviceSizes` 1280/1440/1600; hero quality about 60 | Desktop heroes download the 1920 version (505 KB) | −200 to −250 KB per hero |
| 3.8 | /flights: skeleton the same height as the consent gate; demo results loaded only in demo mode | CLS 0.082 at 360px; about 29 KB brotli of dead code | CLS about 0 |
| 3.9 | Hero entrance doesn't start LCP text at opacity 0; try `experimental.inlineCss` | 480–540 ms render delay on hero text; 86 KB blocking CSS | −300 to −500 ms LCP |
| 3.10 | Header at 1024px: nav and WhatsApp pill don't fit (nowrap; icon-only pill until xl) | "Travel guides" wraps, pill clipped | Fixed tablet/laptop header |
| 3.11 | Search form: listbox not a Tab stop, Tab picks the highlighted airport, past dates rejected, errors announced and focus moved to the first error, highlight kept when worldwide results arrive, live region for result count, trip-type labels no-wrap at 320px | Keyboard users lose their place and typed text; 2020 dates accepted | WCAG 2.4.3, 4.1.3 |
| 3.12 | Focus ring visible on navy and blue sections (sun or white ring) | 2.76:1 on navy; invisible on the blue fare-alert band | WCAG 2.4.7, 1.4.11 |
| 3.13 | Mobile menu: focus trapped (rest of page `inert`), focus returned to the menu button | Tab escapes behind the scrim | WCAG 2.4.3 |
| 3.14 | Marquee pause/play button | Logo strip moves with no pause for keyboard and touch users | WCAG 2.2.2 (Level A) |
| 3.15 | Arrow-key tabs and radio groups (trip type, deals origin, regions, month calendar); multi-city labels per leg; small targets enlarged; placeholder contrast | Every tab is its own Tab stop | WCAG best practice |
| 3.16 | API hardening: JSON content type and same-site Origin required; rate limits; honeypot and minimum fill time on fare alerts; double opt-in; control characters rejected in the contact name | Cross-site text/plain POSTs accepted; no throttling | Spam and CSRF closed |
| 3.17 | `/api/places`: failures not cached, `no-store` on empty answers, input limited to letters | One upstream blip blanks a term for days | Reliable lookup |
| 3.18 | `EMAIL_DRY_RUN` checked before the API key (tests never send real email) | e2e may send real email when a key is set locally | Safe tests |
| 3.19 | Content-Security-Policy (Report-Only first) allowing only the hosts in use; `/go` drops free-text `airline`/`provider` params | No CSP; text injection possible on /go | Hardening |
| 3.20 | `error.tsx` and `global-error.tsx` with a branded recovery path | Unbranded framework error screen | Resilience |
| 3.21 | Fare-alert copy matches reality ("we'll email you when alerts launch") until a sender exists | Promises weekly emails nothing sends | Honest UI |
| 3.22 | Third-party image hosts (Unsplash, airline logos) disclosed in privacy and cookie policies, or self-hosted | IP addresses reach them before consent | UK GDPR transparency |
| 3.23 | Smaller fixes: How-it-works card clipped at 1024/1280, swap button on phones, cabin note (premium → economy, first → business), "Read our reviews" → "Find us on Trustpilot" while there are none | | |

## Phase 4: Content depth, E-E-A-T and claims (owner input)

| # | Task | Owner input needed |
|---|---|---|
| 4.1 | Booking model made consistent: "we don't sell tickets" vs "our team can book for you". Who is the booking party for manual bookings, what payment and protection apply (ATOL/package travel)? Align header, footer, FAQ, About and Terms. | Yes, plus legal review |
| 4.2 | Legal entity and people: company name and number, address for notices, who runs the site, relationship to Wicket Travel Holidays disclosed wherever it's linked. | Yes |
| 4.3 | Claims: substantiate or reword "thousands of flight providers" (vs "hundreds more" in the logo strip) and "as little as $18" (CAP 3.7/3.18/3.22). | Yes |
| 4.4 | Editorial policy page, guide authors with bios, sources in guides. | Author names and bios |
| 4.5 | Content depth: guides expanded to about 1,000+ words with sources, route pages enriched with verified per-route facts, destination guides expanded, new guides replacing the best legacy WordPress topics (then redirects updated). | Topic sign-off |
| 4.6 | Privacy policy recipients vs the "no partner names" rule; legal review of all policies; the weekly-email promise. | Yes, plus legal review |
| 4.7 | Google Business Profile only if the business serves customers face to face; GA4 (with Consent Mode v2) only if wanted. | Yes |
