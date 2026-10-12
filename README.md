# Wallet Flights

Custom Next.js site for walletflights.com — a flight booking travel agency.

- **Stack:** Next.js 16 (App Router, Cache Components) · React 19 · Tailwind CSS v4 · Motion · Phosphor icons
- **Docs:** [`docs/PLAN.md`](docs/PLAN.md) (sitemap, phases) · [`docs/DESIGN.md`](docs/DESIGN.md) (tokens, type, motion) · [`docs/AUDIT.md`](docs/AUDIT.md) (test + audit results)
- **Content:** all copy, fares, destinations and contact details live in `src/content/`.

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

## Design skills

Project-level Claude Code skills live in `.claude/skills/`: `ui-ux-pro-max`,
`frontend-design` (Anthropic), `design-taste` (taste-skill) and `framer-motion`.
