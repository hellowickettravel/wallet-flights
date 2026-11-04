# walletflights-reels

Faceless Instagram reels for @walletflights, rendered with Remotion. `PLAN.md` is the plan,
`CLAUDE.md` the rules, `PROGRESS.md` where we are.

## Setup (once per machine)

```bash
cd walletflights-reels
npm install
npm run setup:kokoro     # local TTS: Python venv + Kokoro-82M ONNX model (from GitHub releases)
npm run setup:whisper    # optional: whisper.cpp + base.en model (from Hugging Face)
cp .env.example .env     # add PEXELS_API_KEY
```

Needs Node 20+, Python 3.10+, ffmpeg. Rendering uses Chrome headless; set
`REMOTION_BROWSER_EXECUTABLE` to use a local Chrome. On a machine with a GPU set `REMOTION_GL=angle`
(default is `swangle`, the CPU path, which works everywhere).

## Make a reel

```bash
npm run reel -- 1            # fetch-fares → write-script → tts → captions → fetch-broll → render
npm run reel -- 1-10         # a batch
npm run render -- 5          # re-run just one step
npm run studio               # preview templates with fixture props
```

Outputs per day in `out/`: `<dd>.mp4`, `<dd>.cover.png`, `<dd>.caption.txt`, `<dd>.report.json`.
`render` refuses to make a deliverable unless every fare was re-read live on walletflights.com
(`--sample` makes a labelled internal sample instead).

Map style: `MAP_STYLE=openfreemap` uses OpenFreeMap vector tiles (needs network at render);
the default `offline` plate draws Natural Earth country shapes (public domain) bundled in
`remotion/public/geo`.

Remotion is free for individuals and companies of up to 3 people; check the headcount before
commercial use (otherwise a company licence is needed).
