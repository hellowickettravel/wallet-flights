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
   - `SMTP_PASS`: the info@walletflights.com mailbox password (Microsoft 365 from GoDaddy, with
     "SMTP Authentication" on). Required for the contact form and all alerts. Without it, production
     returns a friendly "unavailable" message instead of losing messages.
   - `KV_REST_API_URL` and `KV_REST_API_TOKEN` (set by Vercel → Storage → Upstash for Redis) and
     `CRON_SECRET` (any long random string): needed for fare calendar price alerts.
   - `TRAVELPAYOUTS_TOKEN`: Travelpayouts API token for real cached fares (Production + Preview).
     Without it the site works but shows no prices.
3. Deploy. Every push to a branch gets a preview URL; `main` deploys to production.
4. Domains: add `walletflights.com` and `www.walletflights.com`, then point DNS as Vercel shows.
5. Optional: enable **Web Analytics** and **Speed Insights** in the project (already wired in code;
   both are cookieless).

### Travelpayouts
See [`docs/TRAVELPAYOUTS.md`](docs/TRAVELPAYOUTS.md): `/flights` runs White Label widget #23361
(configured for `https://www.walletflights.com`), prices come from the Aviasales Data API, and every
partner link is a `tp.media` affiliate link with marker 567389 and a placement `sub_id`.

### Before switching DNS from WordPress
- Serve the site on `www.walletflights.com` (the White Label's configured domain), or change the
  widget's domain in the dashboard to match.
- Have the legal pages (`src/content/legal.ts`) reviewed and add the registered company details.

## Design skills

Project-level Claude Code skills live in `.claude/skills/`: `ui-ux-pro-max`,
`frontend-design` (Anthropic), `design-taste` (taste-skill) and `framer-motion`.
