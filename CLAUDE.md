@AGENTS.md

# Wallet Flights — working notes

- Read `docs/PLAN.md` and `docs/DESIGN.md` before building a page; follow the five phases
  (plan → design → develop → test → audit) per batch and record results in `docs/AUDIT.md`.
- Load the `frontend-design`, `design-taste`, `ui-ux-pro-max` and `framer-motion` skills for UI work.
- Content belongs in `src/content/*`, never hard-coded in components. Never invent reviews,
  accreditations or business facts; placeholders are flagged `TODO(confirm)`.
- Motion: `motion/react` in `"use client"` leaves only; one orchestrated moment per page.
- Before pushing: `npm run lint && npm run typecheck && npm run build && npm run test:e2e`
  (in the cloud sandbox set `PW_CHROMIUM_PATH=/opt/pw-browsers/chromium`).
