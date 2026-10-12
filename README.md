# Wallet Flights

Custom Next.js site for walletflights.com — a flight booking travel agency.

- **Stack:** Next.js 16 (App Router, Cache Components) · React 19 · Tailwind CSS v4 · Motion · Phosphor icons
- **Docs:** [`docs/PLAN.md`](docs/PLAN.md) (sitemap, phases) · [`docs/DESIGN.md`](docs/DESIGN.md) (tokens, type, motion) · [`docs/AUDIT.md`](docs/AUDIT.md) (test + audit results)
- **Content:** all copy, fares, destinations, airlines, guides, legal text and contact details live in `src/content/`.
- **Photos:** chosen via Unsplash, listed with credits in `src/content/images.ts` and shown on `/photo-credits`.

## Scripts

```bash
npm run dev         # local dev server
npm run build       # production build
npm run start       # serve the build
npm run lint        # ESLint (incl. React Compiler rules)
npm run typecheck   # tsc --noEmit
npm run test:e2e    # Playwright + axe (builds must exist; starts `next start` on :3100)
```

First-time Playwright setup locally: `npx playwright install chromium`.

## Deploy to Vercel

1. In Vercel, **Add New → Project** and import `hellowickettravel/wallet-flights`.
   The framework preset (Next.js), build command and output are detected automatically.
2. Add environment variables (Settings → Environment Variables), see `.env.example`:
   - `RESEND_API_KEY` and `EMAIL_FROM`: required for the contact form and fare alerts.
     Without them, production returns a friendly "unavailable" message instead of losing messages.
   - `CONTACT_TO` (defaults to info@walletflights.com), `RESEND_AUDIENCE_ID` (optional).
3. Deploy. Every push to a branch gets a preview URL; `main` deploys to production.
4. Domains: add `walletflights.com` and `www.walletflights.com`, then point DNS as Vercel shows.
5. Optional: enable **Web Analytics** and **Speed Insights** in the project (already wired in code;
   both are cookieless).

### Before switching DNS from WordPress
- Connect a live fare API in `src/lib/demo-flights.ts` (results are demo data until then), or keep
  the "Demo results" notice visible.
- Replace provider hand-off in `src/components/go/handoff.tsx` with real affiliate links.
- Have the legal pages (`src/content/legal.ts`) reviewed and add the registered company details.

## Design skills

Project-level Claude Code skills live in `.claude/skills/`: `ui-ux-pro-max`,
`frontend-design` (Anthropic), `design-taste` (taste-skill) and `framer-motion`.
