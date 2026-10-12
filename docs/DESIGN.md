# Wallet Flights — Design System

## Concept: "Clear skies, clear prices"

Big-brand OTA confidence (search first, photo-led discovery, dense orderly footer)
with one signature element that belongs to flying: a **split-flap departure board**
that shows today's fares. Everything around it stays quiet and disciplined.

## Colour

Functional colour coding, like the big OTAs: one brand navy, one action blue,
one price green, one highlight that only appears on the fare board and deal badges.

| Token | Hex | Role | Contrast on white |
|---|---|---|---|
| `ink` | `#0F1F3D` | Headings, body text, footer & fare-board ground | 16.2:1 |
| `ink-soft` | `#51607A` | Secondary text | 6.3:1 |
| `action` | `#1F5BD8` | Primary buttons, links, focus ring | 5.6:1 |
| `action-deep` | `#1746AC` | Hover/pressed | 8.1:1 |
| `fare` | `#0A7F4F` | Prices and savings only | 5.0:1 |
| `sun` | `#FFC83D` | Fare-board glyphs, deal badges (always on ink or with ink text) | ink on sun 10.6:1 |
| `canvas` | `#FFFFFF` | Page | — |
| `mist` | `#F3F6FB` | Alternate section ground, input fills | — |
| `line` | `#DFE6F0` | Borders, dividers | — |

Rules: blue means "act" — buttons, links, focus, and a whole panel only when that panel is
itself a single call to action (fare alerts); green only means money; sun only lives on ink
or as a badge fill with ink text. No gradients as decoration (photo scrims only).

## Type

- **Display:** Bricolage Grotesque (variable, 600–800, tight optical size) — has the
  confident, slightly quirky voice of travel posters without being retro.
- **UI / body:** Onest (400–700) — neutral, highly legible, tabular-friendly numerals for fares.
- **Fare board only:** JetBrains Mono — justified by the subject (airport split-flap
  displays); not used anywhere else.

Scale (rem): 0.8125 · 0.875 · 1 · 1.125 · 1.25 · 1.5 · 2 · 2.75 · 3.75 · 4.5
Headlines: `tracking-tight`, leading 1.05–1.1. Body: 16–18px, leading 1.6, ≤ 68ch.
Sentence case everywhere; no all-caps eyebrow labels.

## Shape, space, elevation

- Radius by hierarchy: hero media 28px · panels 20px · cards 16px · inputs 12px · chips/pills full.
- Spacing: 4px base; section padding 72px mobile / 112px desktop; container 1280px + 20/32px gutters.
- Elevation: navy-tinted shadows only on things that float (search panel, popovers, sticky header):
  `0 24px 48px -20px rgb(15 31 61 / .30)`. Cards in grids are flat with a 1px `line` border.

## Components (homepage batch)

Header · MobileMenu · SearchPanel (TripTabs, AirportField + swap, DateField,
TravellersPopover) · AssuranceStrip · OriginChips + DealCard rail · FareBoard (SplitFlap) ·
RegionTabs + DestinationMosaic · AgentBand · GuideCard · FaqAccordion · AlertSignup · Footer ·
SmartImage (photo with tinted fallback ground) · Button · Container.

## Motion (see `.claude/skills/framer-motion`)

- One orchestrated load: hero headline + search panel settle in (≤ 900ms).
- One signature: fare board flips its characters once when it enters view.
- Everything else is response to action: tab pill slides (`layoutId`), popovers and
  menu use presence, accordion expands, chips filter the rail with layout animation.
- No fade-up on every section; no infinite loops. `MotionConfig reducedMotion="user"`.

## Plan review — what changed and why

| First instinct | Why it was a default | Revised to |
|---|---|---|
| Centered hero headline over full-bleed photo | Every travel template does this | Left-aligned headline inside a rounded photo frame; the search panel overlaps the frame's bottom edge, as the big OTAs anchor the search |
| Three equal "why us" cards with icons | SaaS-card kit | A single assurance strip (icon + short line) directly under search |
| Deal cards everywhere | Repetitive grid | Deals as a filterable rail, plus the fare board as a distinct format |
| Testimonials carousel with stock names | Fabricated trust | Withheld until real reviews exist |
| Numbered 01/02/03 markers on features | Decoration | Numbers used only on the agent booking steps, which are a real sequence |
| Purple/teal gradient accents | AI tell | Functional OTA colour coding, photography carries the colour |
