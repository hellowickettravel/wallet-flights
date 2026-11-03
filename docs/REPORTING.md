# Monthly performance report (Growth proposal phase 2)

The proposal promises a report each month with clear next steps, built from tools the owner already
uses. This file is the template and the setup behind it. Copy the "Report" section into a new dated
file (`docs/reports/2026-12.md`, …) each month.

## Setup (done in code, 3 Nov 2026)

| Metric (from the proposal) | Where it comes from | How to read it |
|---|---|---|
| Impressions | Search Console → Performance → Search results | Total, and by page group (filters below) |
| Clicks and click-through rate | Same report | CTR by page group; titles to test are pages with impressions but CTR under 1% |
| Indexed pages | Search Console → Pages | "Indexed" count; route and destination URLs in "Crawled / Discovered – currently not indexed" |
| Average position | Performance report | By page group; queries in positions 8–30 are the first to improve |
| Non-brand queries | Performance → Queries, filter "Query doesn't contain" `wallet` | Count and clicks |
| Click-outs to providers | Google Analytics 4 → Reports → Engagement → Events | `fare_search` (into our fare search) and `click_out` (to a partner), each with a `placement` parameter |

**Page group filters (Search Console, "Page" → "URLs containing"):** `/routes/`, `/destinations/`,
`/travel-guides/`, and everything else.

**GA4 events (added 3 Nov 2026, `src/lib/track.ts`):** sent only after a visitor allows analytics
cookies. `fare_search` fires when someone follows a link into `/flights` or `/go`, or submits a search
form; `click_out` fires on any link to another site (partners, the sister company, WhatsApp). Both
carry `placement` (the Sub ID, e.g. `destination_london_from_manchester`), `page_path`, and for
`click_out`, `link_domain`. **Owner, once:** in GA4 → Admin → Custom definitions, add event-scoped
custom dimensions for `placement` and `link_domain` so they show in reports (changes a GA setting, so
it's the owner's call). Without them the events still count, just without the breakdown.

Travelpayouts reports bookings and commission by Sub ID, which share the same placement names.

## Report (template)

**Month:** · **Prepared:** · **Compared with:** previous 28 days

| Metric | This month | Last month | Change |
|---|---|---|---|
| Impressions | | | |
| Clicks | | | |
| CTR | | | |
| Average position | | | |
| Indexed pages (of submitted) | | | |
| Non-brand clicks | | | |
| `fare_search` events | | | |
| `click_out` events | | | |

**By page group:** routes · destinations · guides · other (impressions, clicks, position).

**What worked:** the three pages or queries that grew most, and why we think so.

**What didn't:** pages not indexed, queries that fell.

**Next steps (three at most):** e.g. publish route wave 2; rewrite titles on pages with high
impressions and low CTR; next month's four guides.

## Calendar

| Month | Work (proposal roadmap) | Report |
|---|---|---|
| 1 (Nov 2026) | Audit; destination template and all 20 guides upgraded; route wave 1 (40); 4 guides; technical SEO | First report early December |
| 2 (Dec 2026) | Route wave 2 (40) once half of wave 1 is indexed; 4 guides; climate tables and trip costs once sourced | Early January |
| 3 (Jan 2027) | 4 guides; title and description tests from Search Console data; more departure cities if the owner wants more than 117 routes | Early February |
