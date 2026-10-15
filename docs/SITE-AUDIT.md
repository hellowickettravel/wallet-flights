# Wallet Flights: full site audit (15 Oct 2026)

Four specialist audits of www.walletflights.com and the codebase: **technical SEO**, **content and AI
search**, **performance**, and **UX, accessibility and backend**. Every finding below was observed or
measured (curl, a crawl of 166 URLs, Lighthouse, Playwright, axe, code review). Fixes are planned in
`docs/IMPROVEMENT-PLAN.md`. The **Phase** column says where each one is handled, and ✅ means fixed and
verified live.

## Scorecard

| Area | Score / state |
|---|---|
| Lighthouse desktop (8 pages) | Performance **94–100**, Accessibility **100**, Best Practices **100**, SEO **100** |
| Lighthouse mobile (8 pages) | Performance **74–91** (home 74–84, /deals 77), Accessibility **100**, Best Practices **100**, SEO **100** (/flights 66 = intended noindex) |
| Mobile LCP (lab) | 3.2–5.7 s (target under 2.5 s). TBT 108–197 ms. CLS 0–0.03 (/flights 0.08 at 360px). |
| Desktop vitals (lab) | All pass: LCP ≤ 1.6 s, TBT ≤ 99 ms, CLS 0 |
| Field data (CrUX) | None yet (new domain, low traffic) |
| PageSpeed Insights API | Over quota during the audit; local Lighthouse 13.5 used (same engine) |
| axe (WCAG 2.2 AA + best practice) | **0 violations** on 13 pages at 390px and 1440px |
| Crawl | 166 URLs, **0 broken links**, one H1 per page, alt text on every image, unique titles and descriptions on all 73 indexable pages |
| Security | HSTS preload, XFO, nosniff, Referrer and Permissions policies; `npm audit` 0 vulnerabilities; no secrets in client bundles; `/go` allow-list solid |
| Structured data | Organization, WebSite, FAQPage (home, help), BreadcrumbList, Article, TouristDestination; all parse; no fake ratings or offers |

## 1. Indexing and technical SEO

| Sev | Finding | Phase |
|---|---|---|
| Critical | Canonicals, sitemap, robots and OG URLs used the apex `walletflights.com`, which 308-redirects to `www`. Every canonical pointed at a redirect. | 1 ✅ |
| Critical | About 286 old WordPress URLs (Wayback) return 404 with no redirects, losing any rankings and backlinks. | 1 ✅ (35 mapped; the rest are tags, shop pages and listicles, intentionally 404) |
| High | Search Console and Bing not verified. | 1 ✅ file live; **owner** verifies |
| High | Every page without its own `openGraph` reported `og:url` = homepage. `/go` and the 404 page inherited the homepage canonical. Destination and guide pages lost `og:site_name` and `og:url`, and their Twitter image didn't match. | 1 ✅ |
| High | Fares missing on all 57 destination and route pages and on /deals ("No recent fare"), because the Data API token isn't set in Vercel Production. | **Owner** (Vercel env), then 2.7 |
| High | 37 route pages are thin and near-duplicate (up to 94% overlap) and almost orphaned (one inbound link each). | 2.6, 2.7, 4.5 |
| Medium | `wallet-flights.vercel.app` served a full indexable duplicate. | 1 ✅ |
| Medium | robots.txt blocked `/flights?`, so Google couldn't see its `noindex`. `Disallow: /go` also matched every path starting with "go". | 1 ✅ |
| Medium | Sitemap: `lastmod` on only 3 of 72 URLs. | 1 ✅ |
| Medium | Weak keyword targeting: hub titles ("Destinations", "Flight deals"), destination H1 is the bare city name. | 2.5 |
| Low | Home description 181 characters; legal descriptions 33–40 characters; `/favicon.ico` 404; manifest lacked 192/512 icons; duplicated twitter-image code. | 1 ✅ |
| Low | No hreflang. Not needed for one English site serving the UK and US. | n/a |

## 2. Structured data and AI search (GEO)

| Sev | Finding | Phase |
|---|---|---|
| High | FAQ answers render only when opened: 0 of 15 on /help and 1 of 5 on home in the HTML. Non-JS crawlers (GPTBot, ClaudeBot, PerplexityBot) can't read them, and the FAQPage markup describes invisible content. | 2.1 |
| High | No `/llms.txt` or `/llms-full.txt`. | 2.4 |
| Medium | Organization lacks `@id`, logo, `contactPoint`, `areaServed`; Trustpilot not in `sameAs`. WebSite lacks `publisher`. Article lacks `author` and `dateModified`. No BreadcrumbList on destination pages. | 2.2, 2.3 |
| Medium | robots.txt had no explicit AI-crawler policy (all were allowed by default). | 1 ✅ named explicitly |
| Medium | Few freshness signals or quotable facts. Flight times are estimates shown as facts. Split-flap letters add noise to the page text. | 2.8 |
| Done well | Server-rendered static HTML, a plain-language entity statement, consistent brand name, "How we make money" disclosure. | |

## 3. Content, E-E-A-T and claims

| Sev | Finding | Phase |
|---|---|---|
| Critical | The business model contradicts itself: "our team can book flights and hotels for you" vs "we don't sell tickets / not a travel agent" (Terms). It could also have consumer-protection implications (ATOL, package travel). | 4.1 (owner and legal) |
| High | No legal entity, people or address identified. The relationship to Wicket Travel Holidays isn't disclosed where it's linked. | 4.2 |
| High | "Thousands of flight providers" (H1) vs "hundreds more" (logo strip); "as little as $18" is unqualified (CAP 3.7, 3.18, 3.22). | 4.3 |
| Medium | Guides: no author, sources or editorial policy. Read times overstated (about 165–250 words for "4–6 min"). Only 3 guides. | 4.4, 4.5, 2.8 |
| Medium | Delhi filed under "Middle East & Africa" with a Taj Mahal (Agra) photo, so its "nearby" links go to Dubai, Istanbul and Cairo. | 2.8 |
| Medium | Privacy policy hides the identity of an independent controller ("contact us and we'll tell you"). | 4.6 (legal) |
| Medium | Fare alerts promise "one email a week", but nothing sends them. | 3.21 |
| Low | "Questions? we reply…", mixed apostrophes, "car hire" vs "car rental", "USA" vs "US", copy hard-coded in components, a photo credited but unused. | 2.8 |
| Done well | Honest Trustpilot empty state, affiliate disclosure on every page, dated legal pages with UK GDPR rights, descriptive alt text on all 27 photos, no partner names visible. | |

## 4. Performance

| Sev | Finding | Measured | Phase |
|---|---|---|---|
| High | The cookie banner renders after hydration and becomes the mobile LCP element on /, /routes and /contact. | LCP −0.9 to −1.2 s when it's absent | 3.1 |
| High | Fare-board split-flap re-renders React 46 times. | 2.3 s main-thread busy, 5 long tasks | 3.2 |
| High | The full motion library (38.5 KB brotli) ships on every page via the root provider and header. | 170–199 KB brotli JS per route | 3.3 |
| Medium | Fonts: 131 KB display font (opsz + wdth axes) and a mono font preloaded on every page. | −85 to −140 KB available | 3.4 |
| Medium | Home first render is layout-heavy (1,279 elements, 9,800 px tall). | `content-visibility` A/B: layout −38% | 3.5 |
| Medium | /deals LCP is a lazy-loaded image; 36 layout-animated items. | LCP 5.25 s mobile | 3.6 |
| Medium | Desktop heroes download the 1920px image (505 KB) for about 1440px screens. | −200 to −250 KB per hero | 3.7 |
| Medium | /flights layout shift (skeleton vs consent gate) and about 29 KB brotli of demo-only code. | CLS 0.082 at 360px | 3.8 |
| Medium | The hero text starts at opacity 0, which delays LCP; 86 KB render-blocking CSS. | 480–540 ms render delay | 3.9 |
| Done well | Every route prerendered and edge-cached (70–90 ms edge TTFB), brotli, immutable assets, compositor-only marquees, tree-shaken icons, nothing third-party before consent. | | |

## 5. UX and accessibility

| Sev | Finding | Phase |
|---|---|---|
| High | Cookie banner can't scroll: at 320px "Manage choices" is off-screen (WCAG 1.4.10). It's also the last tab stop (93 presses). | 3.1 |
| Medium | Header breaks at 1024px: "Travel guides" wraps and the WhatsApp pill is clipped. | 3.10 |
| Medium | Airport field: Tab drops focus to the page and discards typed text. Past dates are accepted. Search errors aren't announced. | 3.11 |
| Medium | Focus ring is 2.76:1 on navy and invisible on the blue fare-alert band (WCAG 2.4.7, 1.4.11). | 3.12 |
| Medium | Mobile menu is `aria-modal` but doesn't trap focus or return it. | 3.13 |
| Medium | Logo marquee has no pause control for keyboard and touch users (WCAG 2.2.2, Level A). | 3.14 |
| Low | Tabs and radio groups lack arrow keys. Multi-city labels repeat. A few targets under 24px. Placeholder contrast 3.99:1. Trip-type labels wrap at 320px. Card clipped at 1024px. Back-to-top overlaps the banner. | 3.15, 3.23 |
| Done well | No horizontal scroll at any of 8 widths or at 200%/400% zoom, working skip link, correct landmarks, a WAI-ARIA 1.2 combobox, contact form focuses the first error, reduced motion respected. | |

## 6. Backend and security

| Sev | Finding | Phase |
|---|---|---|
| High | `/api/contact` and `/api/fare-alerts` have no rate limit and accept cross-site `text/plain` POSTs (CSRF). Fare alerts have no honeypot or double opt-in. | 3.16 |
| Medium | `/api/places` caches upstream failures for days. | 3.17 |
| Medium | `EMAIL_DRY_RUN` is ignored when an API key is set, so tests could send real email. | 3.18 |
| Medium | No Content-Security-Policy. | 3.19 |
| Medium | Unsplash and the airline-logo CDN receive visitors' IPs before consent and aren't in the privacy policy. | 3.22 |
| Medium | No `error.tsx` or `global-error.tsx`. | 3.20 |
| Low | `/go` shows free-text `airline` and `provider` params (phishing copy). No control-character check on the contact name. | 3.19, 3.16 |
| Done well | `/go` open-redirect protection, server-only secrets, honeypot on contact, escaped email HTML, consent cookie flags, 0 npm vulnerabilities. | |

## Local SEO, Search Console and analytics

- **NAP** (name, phone, London, email) is consistent across the footer, contact, about, legal pages and schema, all from `src/content/site.ts`.
- **Google Business Profile:** eligibility is doubtful without face-to-face service or a published address. Owner decision (4.7).
- **Search Console:** the verification file is live. Use a **Domain property** (DNS TXT at Hostinger) or a URL-prefix property for **https://www.walletflights.com/**. The apex property `https://walletflights.com/` 308s to www, and Google may not accept a redirected verification file. Then submit `/sitemap.xml` and import into Bing Webmaster Tools.
- **Analytics:** Vercel Analytics and Speed Insights load after consent. GA4 isn't installed; if wanted, add it with Consent Mode v2 (4.7).
