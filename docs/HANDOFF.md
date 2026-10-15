# Handoff: where the improvement plan stands (15 Oct 2026)

Read first: `CLAUDE.md`, `AGENTS.md`, `docs/IMPROVEMENT-PLAN.md` (the 4-phase plan),
`docs/SITE-AUDIT.md` (audit findings with evidence) and the end of `docs/AUDIT.md` (what each phase changed).

## Status
| Phase | State |
|---|---|
| 1 Indexing foundations | Done, live, verified on www.walletflights.com (commit 2c8a19f) |
| 2 Structured data, AI search, on-page SEO | Done, live, verified (commit 025b8cf) |
| 3 Performance, UX, accessibility, security | Part 1 done (3.1 to 3.8, performance; 3.17 too). **Next: 3.9 onward.** |
| 4 Content depth, E-E-A-T, claims | Not started. Needs owner input (see plan). |

## Next steps (Phase 3, part 2), in order
1. **3.9** Hero `.rise` entrance: don't start LCP text at opacity 0 (`src/app/globals.css` `.rise`, `src/components/home/reveal.tsx`). Try `experimental.inlineCss` in `next.config.ts` (check the Next 16 docs in `node_modules/next/dist/docs/` first).
2. **3.10** Header at 1024px: nav links `whitespace-nowrap`; full WhatsApp pill only from `xl`, icon-only between `lg` and `xl` (`src/components/layout/header.tsx`).
3. **3.11** Search form (`src/components/search/airport-field.tsx`, `search-panel.tsx`, `src/lib/search-query.ts`):
   - listbox `tabIndex={-1}`
   - Tab or blur picks the highlighted result
   - keep the highlighted option (by code) when worldwide results arrive
   - `aria-live` result count
   - reject past dates in `validate()` and replace past dates in `parseSearch`/`withDefaultDates`
   - focus the first invalid field on submit
   - trip-type labels `whitespace-nowrap` at 320px
4. **3.12** Focus ring visible on navy and blue sections: use the sun colour or white (`globals.css` `:focus-visible`).
5. **3.13** Mobile menu: make `main` and `footer` `inert` while open; return focus to the menu button on close.
6. **3.14** Pause/play button in `src/components/ui/marquee.tsx` (WCAG 2.2.2).
7. **3.15** Arrow-key roving tabindex for the tabs and radio groups (trip type, deals origin, region tabs, month calendar); per-leg labels in multi-city; placeholder contrast.
8. **3.16** `/api/contact` and `/api/fare-alerts`:
   - require `application/json` and a same-site `Origin`
   - rate limit (Vercel Firewall rule or Upstash; ask the owner before creating any account)
   - honeypot and minimum fill time on fare alerts
   - reject control characters in the name
   - double opt-in for fare alerts
9. **3.18** `src/lib/email.ts`: check `EMAIL_DRY_RUN` before the API key, so tests never send real email.
10. **3.19** Content-Security-Policy in Report-Only first:
    - hosts: tpwdg.com and its API hosts, images.unsplash.com, pics.avs.io, va.vercel-scripts.com
    - the inline consent-flag script in `layout.tsx` needs a hash or nonce
    - `/go`: drop the free-text `airline`/`provider` params
11. **3.20** `src/app/error.tsx` and `global-error.tsx` (branded, with a "New search" link).
12. **3.21** Fare-alert copy: don't promise weekly emails until a sender exists.
13. **3.22** Disclose Unsplash and the airline-logo CDN in the privacy and cookie policies (`src/content/legal.ts`), or self-host them.
14. **3.23** Small fixes:
    - How-it-works card clipped at 1024/1280px
    - swap button on phones
    - cabin note (premium → economy, first → business)
    - "Read our reviews on Trustpilot" → "Find us on Trustpilot" while there are no reviews

Then: lint, typecheck, build, e2e, a `docs/AUDIT.md` entry, commit, push, verify live, and on to Phase 4.
Re-measure with PageSpeed Insights or Lighthouse against https://www.walletflights.com (the
`wallet-flights.vercel.app` address now redirects there).

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
3. Phase 4 decisions: booking model vs "we don't sell tickets"; legal entity; evidence for "thousands of providers" and "as little as $18"; author names; legal review.
