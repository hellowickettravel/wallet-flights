# Progress log

Read this first in a new session, then `CLAUDE.md` (rules) and `PLAN.md` (plan).

## Status: STOP 1 — samples waiting for owner approval (4 Nov 2026)

Next action: wait for the owner's verdict on the day 1 and day 5 samples. Do not start batch 1
until they approve (and ideally until the blockers below are cleared).

## Done

- **Setup (step 1)**
  - Remotion 4.0.540 blank TS project (`npx create-video@latest --blank`), restructured to the
    plan's layout: `remotion/src/{series,parts,lib}`, `pipeline/`, `scripts/`, `audio/`,
    `captions/`, `assets/`, `out/`.
  - Remotion agent skills installed (`npx skills add remotion-dev/skills` → `.agents/skills`,
    linked into `.claude/skills`).
  - maplibre-gl + @turf/turf, @remotion/captions, @remotion/install-whisper-cpp, fonts via
    @fontsource (Bricolage Grotesque 800, Inter 600/700/800), MapLibre worker served locally.
  - Kokoro-82M (kokoro-onnx, local, free) in `tools/.venv` + `tools/kokoro/` (not committed;
    `npm run setup:kokoro`). Voices: `bf_emma` (UK), `af_heart` (US).
  - whisper.cpp 1.7.6 built in `tools/whisper.cpp` (not committed). **No model**: Hugging Face is
    blocked from the cloud sandbox. Captions currently use script alignment on Kokoro's exact
    segment timings (see `pipeline/captions.ts`); whisper is used automatically once a model exists.
  - `CLAUDE.md`, `PLAN.md` (transcribed from the PDF), `.env.example`, `content-calendar.json`
    (all 30 rows; fares are the 4 Nov plan figures, each claim needing a source listed per row).
- **Templates (step 2)**: all 8 series + shared parts (`FlightArc`, `PriceSlam`, `Countdown`,
  `KineticCaptions`, `FareFootnote`, plus `ReelFrame` shell). Hook is fully visible on frame 0.
  Every price carries "found <date>, prices change". All 8 checked with fixture stills
  (incl. the leave-calendar variant).
- **Pipeline scripts (written early, needed for the samples)**: `fetch-fares`, `write-script`,
  `tts`, `captions`, `fetch-broll`, `render` (Remotion → ffmpeg master, cover, caption.txt,
  report.json), `reel` (all steps). `publish.ts` deliberately refuses to post.
- **Samples rendered** (`--sample`, not deliverables):
  - `out/01.mp4` Guess the Fare, London–Rome, 11.4 s, −14.0 LUFS, −1.5 dBTP.
  - `out/05.mp4` Map It, £50 from London, 15.4 s, −14.0 LUFS, −1.5 dBTP.
  - Both 1080×1920, 30 fps, H.264 + AAC 48 kHz stereo, faststart. No music (added in Business Suite).

## Blockers (cloud sandbox network policy)

| Needed for | Host | Effect now |
|---|---|---|
| Live fares (ground rule) | www.walletflights.com | fetch-fares can't re-check; samples use the 4 Nov figures, labelled |
| B-roll | api.pexels.com (+ key) | Branded plate stands in, labelled "B-ROLL PENDING" |
| Map tiles | tiles.openfreemap.org | Offline Natural Earth plate used instead (same look, no labels) |
| Whisper model | huggingface.co | Script-aligned captions instead |
| Legal/date checks | gov.uk, caa.co.uk, transportation.gov | Not yet verified; listed as uncertain per row |

Keys still needed from the owner: `PEXELS_API_KEY` (required), `ELEVENLABS_API_KEY` and
`IG_ACCESS_TOKEN` (optional; IG not used since we don't post).

## Decisions

- Reels live in `walletflights-reels/` inside the site repo, excluded from the site's lint/tsc.
- Rendering uses `--gl=swangle` (SwiftShader) because the sandbox has no GPU; `angle` on a GPU box.
- Offline map basemap is an SVG projected through MapLibre's camera (no tiles → no seams);
  MapLibre draws the arcs. `MAP_STYLE=openfreemap` switches to OpenFreeMap tiles.
- Copy-led series (hacks, secrets, POV, hot takes, receipts) get a `copy` field in their calendar
  row (segments + data + caption), written by Claude per batch; `{fare0}` tokens pull live fares.
- Guess the Fare decoys: plan-given for day 1; generated (×2.7, ×5, ending in 9) for days 8/16/22/30
  and flagged at review.
- Media files (`out/`, `audio/`, `assets/`) are not committed; scripts, captions JSON and
  reports are.

## Next (after approval)

1. Owner adds network access + Pexels key → re-run `npm run reel -- 1 5` for real versions.
2. Batch 1 (days 1–10): write `copy` for days 2, 3, 4, 6, 7, 9, 10; verify claims; render; STOP
   with review list.
3. Batches 2 (11–20) and 3 (21–30), same loop.
