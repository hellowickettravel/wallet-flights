# Batch 22: progress notes (read this first to continue)

Live log for the destination v2 / new destinations / 20 guides project. Updated after every step and
pushed to branch `claude/destinations-v2-blog-batch`, so any new Claude session (or account) can pick up
from here. The full brief and rules: `docs/BATCH-22-BRIEF.md`.

## The owner's request (5 Nov 2026, in their words, summarised)

- Client has paid to **extend the 20 destination pages**: SEO-optimised, keyword-researched content,
  **double the visible value**, not paragraphs. Add relevant widgets/sections/sidebars/banners per city
  (2–4+ widgets), UI must look perfect on mobile and desktop (client judges UI, not tech).
- **Add new destination pages** so each region has 6: Europe +1, Middle East & Africa +2, Americas +1
  (Asia & Pacific already has 6). Chosen: Amsterdam, Marrakech, Abu Dhabi, Miami (keyword research in
  `docs/SEO-KEYWORD-RESEARCH.md` lists Amsterdam and Miami among top "how long is the flight from London
  to…" completions; Marrakech and Abu Dhabi are top UK winter-sun/leisure routes). The owner said "6 new
  pages"; their region counts add up to 4, so 4 were built — confirm with the owner if they want 2 more.
- **20 new SEO blog posts** (travel guides), researched, published.
- Work as admin: plan → assign specialist agents → verify → publish. At the end give the owner a **list
  of links** for Search Console "Request indexing".
- Owner (5 Nov): keep these memory notes after every step, pushed, so work can continue from another account.

## Decisions taken

| Decision | Why |
|---|---|
| One v2 template for every city (`src/app/destinations/[slug]/page.tsx`), data in `src/content/destination-depth/*` | Batch 20/21 history: depth must sit in a photo-led, organised layout, not stacked text |
| New widgets: Trip essentials (live local time, time difference, currency via site rates, plugs, emergency, tipping, water), Flight-times board from 8 cities, Know-before-you-go icon grid, What to eat cards, Day-trip photo tiles, 3-day photo plan, Where to stay tiles, FAQ accordion, Before-you-go guide cards | "Widgets relevant to the location/trip", visible value |
| No climate numbers / daily cost figures | en.wikipedia.org and numbeo.com are blocked in this sandbox (even via WebFetch); house rule: no invented figures. Climate shows automatically if a sourced `climate` is added later |
| New route pairs for the 4 new cities go into staged wave 2 | Keeps live route count and indexing plan unchanged (`docs/HANDOFF.md`) |
| Photos: Unsplash via MCP, one file per agent in `src/content/photos/` | Avoids parallel edit conflicts; all merged into `photos` in `src/content/images.ts` |

## Steps

| # | Step | State |
|---|---|---|
| 1 | Read site, docs, history; plan; brief (`docs/BATCH-22-BRIEF.md`) | Done |
| 2 | Schema: `DestinationDepth` gains `visual` (required), `timeZone`, `localTips`, `foods`, `dayTrips`, essentials `emergency/tipping/water` (`types.ts`) | Done |
| 3 | Scaffolding: `src/content/photos/*.ts`, `src/content/new-destinations/*.ts` wired into destinations + destination-guides; RAK/AUH airports + coordinates; /destinations grid fixed for 6 per region | Done |
| 4 | Agents launched (5 Nov): UI (template + widgets + London), Content ×4 (Europe+Amsterdam, Asia-Pacific, ME&A+Marrakech+Abu Dhabi, Americas+Miami), Guides A–D (5 each, slugs in the brief) | Running |
| 5 | Admin merge: register 20 guides in `src/content/guides/index.ts`, update `deals.ts` comment, tests (`growth.spec.ts` counts: pairs 156 → 188, wave 2 79 → 111; `content.spec.ts` destinations 20 → 24; paris "Things to do" check), llms | To do |
| 6 | Build, lint, typecheck, e2e (`PW_CHROMIUM_PATH=/opt/pw-browsers/chromium`), screenshots 1440 + phone, fix | To do |
| 7 | `docs/AUDIT.md` Batch 22 + `docs/HANDOFF.md`, commit, push, PR, merge to main (Vercel deploys) | To do |
| 8 | Give owner the link list for indexing | To do |

## If you are a new session picking this up

1. `git fetch origin claude/destinations-v2-blog-batch && git checkout claude/destinations-v2-blog-batch`
2. Read this file, then `docs/BATCH-22-BRIEF.md`.
3. Check which agent outputs exist: `git status`, `ls src/content/guides`, and the content files for
   empty `localTips`/`dayTrips`. Re-run only the missing parts, following the brief.
4. Continue from the first step not marked Done.
