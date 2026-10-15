# Handoff: where the improvement plan stands (16 Oct 2026, Phase 4 part 1)

Read first: `CLAUDE.md`, `AGENTS.md`, `docs/IMPROVEMENT-PLAN.md` (the 4-phase plan),
`docs/SITE-AUDIT.md` (audit findings with evidence) and the end of `docs/AUDIT.md` (what each phase changed).

## Status
| Phase | State |
|---|---|
| 1 Indexing foundations | Done, live, verified on www.walletflights.com (commit 2c8a19f) |
| 2 Structured data, AI search, on-page SEO | Done, live, verified (commit 025b8cf) |
| 3 Performance, UX, accessibility, security | Done: part 1 (3.1 to 3.8, 3.17) and part 2 (3.9 to 3.23). See `docs/AUDIT.md`. |
| 4 Content depth, E-E-A-T, claims | Part 1 done (4.1 to 4.4: booking model, Wicket Travel Limited details, "hundreds", live from-price, editorial policy). Left: 4.5 content depth, 4.6 legal review, 4.7. |

## Next steps
1. Push (from the user's terminal), let Vercel deploy, then verify on www:
   - `curl -sI https://www.walletflights.com/ | grep -i content-security` shows the enforced
     `Content-Security-Policy` header, and a live search on /flights still shows fares
   - the header at 1024px, the swap button on a phone, the marquee pause button
   - fare-alert sign-up (needs `RESEND_API_KEY`; without it the form says the service is unavailable)
2. PageSpeed Insights (mobile): home measured 16 Oct (99, LCP 2.0 s). Still to measure: `/deals`, `/routes/new-york-to-london`.
3. **CSP (enforced 16 Oct 2026, without the report-only period, at the owner's request):** for the
   first days after deploy, read the `CSP violation` lines in the Vercel logs. These are now real
   blocks. Add any legitimate host to `cspHosts` in `src/lib/csp.ts` (ignore browser-extension
   noise such as `chrome-extension:`). Locally, `http://avsplow.com` errors are expected (plain-http
   page); see `docs/AUDIT.md`, "CSP enforced".
4. Phase 4: 4.5 content depth (guides to ~1,000 words with sources, richer route and destination pages, new guides for the best legacy topics), then 4.6 and 4.7.

## Owner actions added by Phase 3
- **Rate limit:** the built-in limit is per server instance. For a site-wide limit, add a Vercel
  Firewall rate-limit rule on `/api/contact`, `/api/fare-alerts` and `/api/fare-alerts/confirm`
  (owner's dashboard; ask before changing account settings).
- **Fare alerts:** sign-ups now need `RESEND_API_KEY` and a verified `EMAIL_FROM` to send the
  confirmation email. Optional `FARE_ALERT_SECRET` signs the links (falls back to the Resend key);
  `RESEND_AUDIENCE_ID` collects confirmed addresses. Nothing sends alerts yet: the copy says
  "coming soon" until the owner decides on a schedule.

## Working rules (from the owner and user)
- Ask before joining any program, accepting terms, or changing payout or account settings.
- Never read, copy or print `TRAVELPAYOUTS_TOKEN` or any secret. Never commit `.env.local`.
- Never mention "Travelpayouts" or "Aviasales" in visible site text.
- Never invent reviews, ratings, accreditations, authors or business facts. Mark unknowns `TODO(confirm)`.
- Reference screenshots show ideas only: design in the site's own style (ink/sun palette, departure board, flight path, boarding pass).
- Push to `main` from the user's terminal (`git push origin main`); Claude's own shell has no GitHub credentials. Vercel auto-deploys `main` to www.walletflights.com.
- Before pushing: `npm run lint && npm run typecheck && npm run build && npm run test:e2e`. Playwright runs `npm run start` on port 3100, so **rebuild before running e2e**.
- Motion: components use `m.*` from `motion/react` inside `LazyMotion strict` (`src/components/motion-provider.tsx`). A full `motion.*` import throws.
- Page metadata goes through `pageMetadata()` (`src/lib/seo.ts`); JSON-LD through `src/lib/schema.ts`.

## Owner actions still open
1. Add `TRAVELPAYOUTS_TOKEN` in Vercel → Production, then redeploy. The deal, destination and route pages show no fares without it. Route pages come back into the sitemap and index automatically once they have fares.
2. Search Console:
   - the verification file is live at `/google4df2a790d730b8df.html`
   - verify a URL-prefix property for **https://www.walletflights.com/**, or a Domain property (DNS TXT at Hostinger)
   - submit `/sitemap.xml`
   - import into Bing Webmaster Tools
   - export the Pages and Links reports to extend `src/content/legacy-redirects.ts`
3. Legal review of the terms and privacy policy, above all: does the team need an **ATOL** for flights it books
   (UK flight sales usually need one unless the airline issues the ticket immediately), which payment methods
   it takes, and whether to name the flight-search partner as an independent controller. Also confirm the
   new terms wording "we confirm the total price and fare rules with you before we book".
4. The registered office (15 Lampton Avenue, Hounslow) now shows in every footer, as UK trading-disclosure
   rules require of a company website. If the owner prefers another address for notices, change `company` in
   `src/content/site.ts`.
