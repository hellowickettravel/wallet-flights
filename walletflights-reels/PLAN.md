# Wallet Flights — 30-Day Viral Reels Plan

Nov 4, 2026 · @Touseef Zahid
(Transcribed from `Wallet Flights _ 30-Day Viral Reels Plan.pdf`; the PDF is the source of truth.)

## Strategy

The account becomes the cheap-travel friend UK and US followers send reels to, not a booking ad: 30
faceless reels in 30 days, about 80% pure value or entertainment and 20% soft pointers to
walletflights.com.

**Who we make it for.** Budget-minded travellers aged roughly 20–40 in the UK (London, Manchester) and
the US (New York, Chicago, LA, Atlanta), the same departure cities the site already ranks for. They want a
cheap escape, fear getting ripped off, and love feeling like insiders.

**What the account stands for.** "Fly further for less, without the faff." Every reel answers one of four urges:
*I can't believe that's the price*, *I didn't know that*, *that's so me*, or *I need to go there*. The site is never the
subject; it is quietly the source of the prices.

**The soft funnel.** Reels earn follows and shares; the profile does the selling.

1. Reel gives the value in full on screen (no "link in bio to find out").
2. Caption ends with a keyword prompt, e.g. "Comment ROME and I'll send you the cheapest
   dates" (answered by DM, by hand or an auto-DM tool).
3. Bio link goes to walletflights.com/deals, pinned reels explain what the account is.
4. At most one reel in five shows the site screen, and only as a tool inside a tip ("how I check 100
   sites at once").

**Ground rules.**

- Prices on screen are real fares the site found, with "found on <date>, prices change" in small
  text. The site itself labels fares as recently found, so we do too.
- No fake reviews, fake customer stories or invented "I flew for £9" claims. Hacks must be legal and
  current; risky ones (hidden-city tickets) come with the risk said out loud.
- Separate from the paid ads: different look, no logo intro, no "book now".

## How Instagram rewards reels now

Sends decide reach to non-followers, so every reel is built around one question: who would someone
forward this to?

| Rule | What it means for us | Source |
|---|---|---|
| Ranking signals are watch time, likes per reach and sends per reach; Mosseri says sends weigh slightly more for people who don't follow you | End every reel on a "send this to…" moment; keep reels short enough to finish | Social Media Today, SocialPilot |
| Only reels under 3 minutes are recommended to non-followers; completion matters more than length | Our reels run 7–35 s | Hootsuite |
| Viewers decide in about 3 s; text or motion should appear in the first half-second | Hook text is on frame 1, never a logo or slow fade | SocialPilot |
| Reposted or lightly edited content is cut from recommendations (extended to photos and carousels on 30 Apr 2026); voiceover, commentary and own text count as original | Stock clips are fine only with our own text, graphics and voice; no TikTok watermarks | Tubefilter |
| Max 5 hashtags per post since Dec 2025; caption keywords and on-screen text carry more weight | 3–5 tags, main keyword in the first 125 characters of the caption | Business Today, Digital Applied |
| Trial Reels (shown to non-followers first) need a public account with 1,000+ followers | Use them from the day the account crosses 1k to test hooks | Hootsuite |
| Business accounts can only use Meta's Sound Collection or music they licensed; trending tracks are off-limits | Add music in-app from the Sound Collection, or bake in licensed tracks | Foxi Music |

**When to post.** Around 12:00–13:00 UK time catches UK lunch and 07:00–08:00 US Eastern in one slot;
move it after two weeks of Insights data (SocialPilot).

**How often.** Guides suggest 3–4 strong reels a week beat daily average ones. The plan below is daily
because the templates keep quality steady; if any week's reels slip, drop to 4 a week rather than ship
weak ones.

## Content series

Eight repeatable series carry the 30 reels; each has a fixed look so followers recognise it in one frame and
Claude Code can render it from one template.

| Series | What it looks like | Length | Main signal | Reels in 30 days |
|---|---|---|---|---|
| Guess the Fare | Destination b-roll, "Guess the round trip from London", 3-2-1 countdown, price slams in | 9–12 s | Comments, rewatches | 5 |
| Cheaper Than… | Two prices side by side: "London to Rome £39 vs London to Manchester by train £__" | 10–15 s | Sends | 2 |
| Map It | Animated flight arcs on a dark map: "How far £50 gets you from Manchester" | 15–20 s | Saves, sends | 3 |
| Booking Hacks | One hack per reel, 3 beats: myth, truth, how to do it | 20–30 s | Saves | 7 (incl. 2 leave-calendar hacks) |
| Airport and Plane Secrets | "Why plane windows have a tiny hole" style facts over cabin and airport footage | 15–25 s | Sends, follows | 4 |
| POV / Relatable | Text-on-screen meme over stock clips: "POV: you checked the price twice and it went up" | 6–10 s | Sends | 4 |
| Hot Take Debate | One question, two sides, "Comment A or B": reclining seats, middle armrest | 8–12 s | Comments | 3 |
| Weekend for £X | Itinerary receipt: flight + 2 nights + food, total on a till-roll graphic | 25–35 s | Saves | 2 |

Short formats (under 12 s) are built for loops and sends; longer ones (20 s +) are built for saves. The mix
keeps both signals feeding the account every week.

## 30-day calendar

One reel a day for 30 days, Mon 9 Nov to Tue 8 Dec 2026, alternating UK and US angles so both
audiences see something for them every two days. Fares are the ones walletflights.com showed on 4
Nov; re-check each on render day and swap in the live figure.

The full table is data in [`content-calendar.json`](content-calendar.json).

Only two reels (14 and 19) show the site at all, and both do it as a tool inside a tip. Bank-holiday dates
and the UK261 and US 24-hour rules are checked against gov.uk and transportation.gov before
rendering.

## Claude Code production pipeline

Claude Code turns one row of the calendar into a finished 1080×1920 MP4 plus its caption, using
Remotion templates per series; at the free stack a reel costs about $0–0.05, or about $1 with premium
voice and one AI hero shot.

Each reel passes eight steps; only a reviewed one is published:
Calendar row (day, series, fare) → Script (Claude drafts VO) → Voiceover (Kokoro or ElevenLabs) →
Captions (whisper.cpp timings) → B-roll and map (Pexels, MapLibre arcs) → Remotion render (series
template) → Phone review (you check every MP4; fails check: fix that step, re-render) → Publish
(Business Suite or API).

Every step writes a file, so a reel that fails phone review goes back only to the step that broke.

**The stack.**

| Job | Free pick | Paid upgrade | Notes |
|---|---|---|---|
| Video engine | Remotion (React → MP4) | Remotion company licence | Free for individuals and companies of 3 people or fewer; check the client's headcount |
| Flight-path maps | Remotion maps: MapLibre + Turf `greatCircle` arcs, OpenFreeMap tiles | MapTiler / Mapbox styles | Render maps with `--gl=angle --concurrency=1` |
| Voiceover | Kokoro-82M or Piper, local | ElevenLabs Starter $6/mo, OpenAI `gpt-4o-mini-tts` under 1¢ a reel | ElevenLabs free tier has no commercial licence |
| Captions | whisper.cpp via `@remotion/install-whisper-cpp` → `@remotion/captions` word-by-word | — | Script is known, so captions can align to it |
| B-roll | Pexels API portrait search, Pixabay | Shutterstock (already connected here) | Skip clips with airline logos or clear faces |
| AI hero shot | Wan 2.2 on a rented GPU | Veo 3.1 Lite ~$0.40–0.64 per 8 s clip | Only when stock is weak (e.g. a specific cabin moment) |
| Music | Meta Sound Collection, added in-app | Epidemic / Artlist licence | Business accounts can't use trending tracks |
| Publishing | Meta Business Suite planner, one by one | Instagram Graph API `media_type=REELS` + a daily scheduled task | API posts can't add in-app music, so mix licensed audio into the file |

**Folder structure.**

```
walletflights-reels/
  CLAUDE.md                 # brand rules, ground rules, voice, series specs
  content-calendar.json     # the 30 rows below as data
  scripts/<day>.json        # hook, beats, VO text, on-screen text, caption
  audio/<day>.wav           # TTS
  captions/<day>.json       # word timings
  assets/<day>/             # b-roll, map tiles, AI clip
  remotion/src/
    series/GuessTheFare.tsx  CheaperThan.tsx  MapIt.tsx  BookingHack.tsx
           PlaneSecret.tsx   Pov.tsx          HotTake.tsx WeekendReceipt.tsx
    parts/FlightArc.tsx  PriceSlam.tsx  Countdown.tsx  KineticCaptions.tsx  FareFootnote.tsx
  out/<day>.mp4 + <day>.caption.txt + <day>.cover.png
  pipeline/ fetch-fares.ts  write-script.ts  tts.ts  captions.ts  fetch-broll.ts  render.ts  publish.ts
```

**Build order.**

1. Week 0 (before day 1): ask Claude Code to scaffold the repo, write `CLAUDE.md` from this doc, and
   build the 8 series templates with one sample render each. Review them on the phone, not the laptop.
2. Load the 30 rows into `content-calendar.json` (Claude Code can copy them from this doc).
3. Batch-produce in 3 sessions of 10 reels: scripts → voice → captions → b-roll → render. Review
   each MP4 before it is scheduled.
4. On render day, `fetch-fares.ts` re-reads the walletflights.com route page so the on-screen fare
   and its "found on" date are current.
5. Final pass: ffmpeg to H.264, 30 fps, AAC 48 kHz, `-movflags +faststart`, loudness about −14
   LUFS; export a cover frame with the hook text.
6. Schedule in Business Suite (adds Sound Collection music) or publish via the Graph API.

Per reel, the session runs: `write-script` (Claude drafts VO under 70 words for 30 s), `tts`,
`captions`, `fetch-broll`, `render`. Each step writes a file, so a bad step is re-run without redoing the
others.

## Captions, hashtags and engagement

Each caption is a search result first and a conversation starter second: keyword line, one line of value,
one prompt.

**Caption template.**

```
[Keyword line, under 125 chars] Cheap flights London to Rome: £39 return this week
[Value line] Found 9 Nov on a cheapest-first search. Prices move, so check your dates.
[Prompt] Comment ROME and I'll send you the cheapest dates.
#cheapflights #londontravel #romeitaly #budgettravel #travelhacks
```

**Hashtags.** Five at most: one broad (#cheapflights, #travelhacks), two for the departure city
(#londontravel, #nyctravel), one for the destination, one for the series' audience (#budgettravel,
#flyinghacks). Claude Code writes them into `<day>.caption.txt` from the calendar row.

**Cover frame.** The hook text in large type over the best frame, so the profile grid reads as a menu of
questions.

**Pinned reels.** Pin three once they exist: the best-performing Guess the Fare, the Christmas leave hack
(day 23) and one Map It. A new visitor then sees what the account is in one glance.

**Daily 20-minute routine.**

- [ ] Reply to every comment in the first hour; ask a question back to keep threads going
- [ ] Send the promised dates to everyone who commented the keyword (by hand, or an auto-DM tool)
- [ ] Share the day's reel to Stories with a poll or quiz sticker
- [ ] Leave 5 useful comments on bigger UK/US travel accounts' new reels
- [ ] Note the top question people asked; it becomes a future reel

## Weekly review

Every Sunday, rank the week's 7 reels by sends per reach and make next week's open slots copies of the
winner's series.

| Metric (Insights) | Why it matters | Act when |
|---|---|---|
| Sends per reach | Main lever for reaching non-followers | Top series of the week gets 2 extra slots next week |
| Average watch time vs length | Shows whether the hook and pacing hold | Under 50% → shorten, move the payoff earlier |
| Saves per reach | Signal for Hacks, Map It, Weekend for £X | Strong saves → turn the reel into a carousel too |
| Comments | Guess the Fare and Hot Take health | Low comments → make the options closer or the question sharper |
| Profile visits and link taps | Whether the soft funnel works | Link taps but no follows → fix the bio and pinned reels |
| Follows per reel | The real goal | A reel with high reach but no follows → it was too generic for this account |

Two checkpoints. After week 2, drop the weakest series and give its slots to the best one. After day 30,
keep the 3 best series as the permanent weekly rhythm and write the next 30 days from the comment
questions collected.

## Sources

- Site fares and routes: walletflights.com, read 4 Nov 2026
- UK261 compensation bands: Civil Aviation Authority
- 2027 UK bank holidays (Good Fri 26 Mar, Easter Mon 29 Mar): Tyla; confirm on gov.uk before posting
- Annual-leave hacks 2027: LeaveDates
- US 24-hour rule: One Mile at a Time; confirm on transportation.gov before posting
- Black Friday and Travel Tuesday context: Euronews, 28 Oct 2026, Hopper
- "Cheaper to fly than take the train" precedent: AOL
