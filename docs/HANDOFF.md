# Handoff: where the work stands (19 Oct 2026)

**Live check 19 Oct 2026:** canonical host is the apex `https://walletflights.com` (www and
`.vercel.app` 308 to it); real fares show on home and /deals (`TRAVELPAYOUTS_TOKEN` is set in
Production); price alerts report ready (`SMTP_PASS`, Upstash Redis and `CRON_SECRET` are set); CSP is
enforced. Latest work after the plan: Batches 5 to 7b (fare calendar, delay compensation, menu
dropdowns, hero fare ticker, route price alerts, email through the Microsoft 365 mailbox); see the end of
`docs/AUDIT.md`. Batch 8 (19 Oct): prices in the visitor's currency (country on first visit via
`src/proxy.ts`, picker in the header, CLDR country table, daily rates in `src/lib/rates.ts`); see `docs/AUDIT.md`.

Read first: `CLAUDE.md`, `AGENTS.md`, `docs/IMPROVEMENT-PLAN.md` (the 4-phase plan),
`docs/SITE-AUDIT.md` (audit findings with evidence) and the end of `docs/AUDIT.md` (what each phase changed).

## Status
| Phase | State |
|---|---|
| 1 Indexing foundations | Done, live, verified on www.walletflights.com (commit 2c8a19f); canonical later moved to the apex (11d181e) |
| 2 Structured data, AI search, on-page SEO | Done, live, verified (commit 025b8cf) |
| 3 Performance, UX, accessibility, security | Done: part 1 (3.1 to 3.8, 3.17) and part 2 (3.9 to 3.23). See `docs/AUDIT.md`. |
| 4 Content depth, E-E-A-T, claims | Part 1 done (4.1 to 4.4). Part 2 (4.5): guides expanded with sources, destination pages expanded; route pages get calculated facts (part 3; nonstop airlines still TODO(confirm)); new guides proposed in `docs/GUIDE-PROPOSALS.md` awaiting sign-off. Also: skip-link fix, 20 search currencies, Hotels ↗ in the menu. Left: 4.6 legal review, 4.7. |

## Next steps
1. After each push, let Vercel deploy, then verify on the live site:
   - `curl -sI https://walletflights.com/ | grep -i content-security` shows the enforced
     `Content-Security-Policy` header, and a live search on /flights still shows fares
   - the header at 1024px, the swap button on a phone, the marquee pause button
   - fare-alert sign-up (`RESEND_API_KEY` set; confirm a real sign-up arrives in the inbox)
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
- **Email (batch 11, 20 Oct 2026):** everything sends through Resend from noreply@walletflights.com
  (`RESEND_API_KEY` on Vercel, a "Sending access" key the owner adds; domain verified in Resend, DNS on
  Hostinger), with replies to info@walletflights.com. The Microsoft 365 mailbox (`SMTP_PASS`,
  `smtp.office365.com:587`, "SMTP Authentication" on) stays as the backup if Resend fails; Microsoft is
  retiring that sign-in (see `docs/AUDIT.md`). Confirmed homepage fare-alert sign-ups are
  emailed to the inbox. Fare calendar price alerts also need Upstash for Redis (done 17 Oct 2026)
  and `CRON_SECRET`; see `docs/AUDIT.md`, Batch 7.

## Working rules (from the owner and user)
- Ask before joining any program, accepting terms, or changing payout or account settings.
- Never read, copy or print `TRAVELPAYOUTS_TOKEN` or any secret. Never commit `.env.local`.
- Never mention "Travelpayouts" or "Aviasales" in visible site text.
- Never invent reviews, ratings, accreditations, authors or business facts. Mark unknowns `TODO(confirm)`.
- Reference screenshots show ideas only: design in the site's own style (ink/sun palette, departure board, flight path, boarding pass).
- Push to `main` with `git push origin main` when the user asks (Claude's shell can push since 16 Oct 2026). Vercel auto-deploys `main` to walletflights.com.
- Before pushing: `npm run lint && npm run typecheck && npm run build && npm run test:e2e`. Playwright runs `npm run start` on port 3100, so **rebuild before running e2e**.
- Motion: components use `m.*` from `motion/react` inside `LazyMotion strict` (`src/components/motion-provider.tsx`). A full `motion.*` import throws.
- Page metadata goes through `pageMetadata()` (`src/lib/seo.ts`); JSON-LD through `src/lib/schema.ts`.

## Owner actions still open
0. **Admin dashboard (batch 12, 20 Oct 2026):** add `ADMIN_USERNAME` and `ADMIN_PASSWORD` (a long one) in Vercel →
   Settings → Environment Variables (Production), redeploy, and sign in at https://walletflights.com/admin.
   It shows subscribers and price alerts recorded from 20 Oct 2026; earlier homepage sign-ups are in the info@ inbox.
1. Done: `TRAVELPAYOUTS_TOKEN` is set in Production (fares live, checked 19 Oct 2026). Owner still to update the White Label domain (#23361) to the apex.
2. Search Console:
   - the verification file is live at `/google4df2a790d730b8df.html`
   - verify a URL-prefix property for **https://walletflights.com/** (the apex is now canonical), or a Domain property (DNS TXT at Hostinger)
   - submit `/sitemap.xml`
   - import into Bing Webmaster Tools
   - export the Pages and Links reports to extend `src/content/legacy-redirects.ts`
3. Legal review of the terms and privacy policy, above all: does the team need an **ATOL** for flights it books
   (UK flight sales usually need one unless the airline issues the ticket immediately), which payment methods
   it takes, and whether to name the flight-search partner as an independent controller. Also confirm the
   new terms wording "we confirm the total price and fare rules with you before we book".
4. The registered office now shows in every footer, as UK trading-disclosure rules require of a company
   website. At the owner's request (17 Oct 2026) it reads "Lampton Avenue, Hounslow" without the house
   number; confirm that still meets the disclosure rules, which ask for the address as registered. If the owner prefers another address for notices, change `company` in
   `src/content/site.ts`.
