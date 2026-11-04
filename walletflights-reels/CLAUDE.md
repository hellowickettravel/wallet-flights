# Wallet Flights reels — working rules

Faceless Instagram reels for @walletflights. `PLAN.md` is the full plan (strategy, series, 30-day
calendar, pipeline, captions, review); this file is the short version Claude must follow on every reel.
Progress lives in `PROGRESS.md`; read it first in any new session.

## Ground rules (never break)

- **Real fares only.** Every price on screen is a fare walletflights.com found. Re-check it on render day
  (`pipeline/fetch-fares.ts`) and use the live figure. If the site can't be read, the reel is **blocked**,
  not rendered with a guess (the 4 Nov snapshot may only be used for internal samples, labelled as such).
- Every price shows the FareFootnote: **"found <D Mon>, prices change"** in small text.
- No fake reviews, customer stories or invented "I flew for £9" claims. No invented stats.
- Legal/date claims (UK261, US DOT 24-hour rule, bank holidays) are verified on an official source
  (caa.co.uk / gov.uk / transportation.gov) and the URL + date checked are written into
  `scripts/<day>.json → sources`. Anything unverified is marked `TODO(confirm)` and listed at review.
- Hacks must be legal and current; risky ones (hidden-city) say the risk out loud.
- Separate from paid ads: no logo intro, no "book now", no site URL as a CTA. The site appears only in
  reels 14 and 19, as a tool inside a tip.
- Do **not** post to Instagram. Output goes to `out/`; the owner schedules in Business Suite and adds
  Sound Collection music there. No music is baked into the files.
- Never commit `.env`. Keys: `PEXELS_API_KEY` (required for b-roll), `ELEVENLABS_API_KEY`,
  `IG_ACCESS_TOKEN` (optional, unused while we don't post).

## Brand

- Voice: "Fly further for less, without the faff." A clued-up mate, not an ad. UK spelling for UK
  reels, US spelling and $ for US reels. Short sentences; one idea per line.
- Colour (from the site's tokens): ink `#0F1F3D` (ground), sun `#FFC83D` (highlight, prices, countdown),
  fare green `#0A7F4F` (correct answer / savings), white text, dear red `#A63A28` sparingly. Solid
  colours, no gradients except a dark scrim for legibility over footage.
- Type: Bricolage Grotesque 800 for hooks and prices, Inter 600/700 for body and captions
  (bundled via `@fontsource`, no network at render).
- Safe area: keep text within x 80–1000, y 220–1500 (Instagram UI covers the bottom ~420 px and the
  top ~200 px).
- Voice (TTS): Kokoro `bf_emma` for UK reels, `af_heart` for US reels, speed 1.05.

## Every reel

- Hook text is fully visible on **frame 0** (no fade-in, no logo). Motion starts within 0.5 s.
- Ends on a "send this to…" / comment / follow moment from the calendar CTA.
- Length within the series range; the VO sets the duration (≤ 70 words for 30 s).
- Captions: `out/<day>.caption.txt` = keyword line (main keyword in the first 125 characters) + one
  value line + one prompt + **max 5 hashtags** (1 broad, 2 departure city, 1 destination, 1 audience).
- Cover: `out/<day>.cover.png`, hook in large type over the best frame.

## Series specs

| Series (component) | Look | Length |
|---|---|---|
| Guess the Fare (`GuessTheFare`) | Destination b-roll + hook, 3 option chips, 3-2-1 `Countdown`, `PriceSlam` reveal, FareFootnote, "comment your guess" | 9–12 s |
| Cheaper Than (`CheaperThan`) | Split screen, two price cards, verdict line | 10–15 s |
| Map It (`MapIt`) | Dark map, origin pulses, `FlightArc`s with price labels, question end card | 15–20 s |
| Booking Hacks (`BookingHack`) | 3 beats MYTH / TRUTH / HOW with kinetic captions; `leaveCalendar` variant lights up a month grid | 20–30 s |
| Plane Secrets (`PlaneSecret`) | Footage + numbered fact cards, one-line explainer, follow CTA | 15–25 s |
| POV (`Pov`) | Big meme text over stock cuts, freeze-frame end | 6–10 s |
| Hot Take (`HotTake`) | Question + A / B split, holds on the question | 8–12 s |
| Weekend for £X (`WeekendReceipt`) | Till-roll receipt prints line by line, total stamps | 25–35 s |

Shared parts in `remotion/src/parts/`: `FlightArc`, `PriceSlam`, `Countdown`, `KineticCaptions`,
`FareFootnote`.

## Render spec

1080×1920, 30 fps, H.264 (yuv420p, CRF 18), AAC 48 kHz stereo, loudness −14 LUFS integrated
(ffmpeg `loudnorm I=-14:TP=-1.5:LRA=11`), `-movflags +faststart`. Map reels render with
`--gl=angle --concurrency=1`.

## Pipeline (one file per step; re-run only the broken step)

```
npm run fetch-fares -- <day>   # live fare + found date  → scripts/<day>.fares.json
npm run write-script -- <day>  # hook, beats, VO, on-screen text → scripts/<day>.json
npm run tts -- <day>           # Kokoro → audio/<day>.wav (+ phrase timings)
npm run captions -- <day>      # word timings → captions/<day>.json
npm run fetch-broll -- <day>   # Pexels portrait clips → assets/<day>/
npm run render -- <day>        # Remotion + ffmpeg master → out/<day>.mp4, cover, caption.txt
npm run reel -- <day>          # all of the above in order
```

Batches of 10. After each batch, STOP and give the owner a review list: file path, hook, length,
anything uncertain.
