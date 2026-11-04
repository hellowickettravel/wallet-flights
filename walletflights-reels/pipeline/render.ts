// Step 6 — Remotion render + ffmpeg master + cover + caption.
// out/<day>.mp4          1080×1920, 30 fps, H.264 yuv420p CRF 18, AAC 48 kHz stereo, −14 LUFS, faststart
// out/<day>.cover.png    hook in large type over the best frame
// out/<day>.caption.txt  keyword line / value line / prompt / ≤5 hashtags
// out/<day>.report.json  duration, measured loudness, fare status, uncertain items (for review)
//
// Refuses to render a deliverable if any fare wasn't re-checked live, unless --sample.
import fs from "node:fs";
import { execFileSync, spawnSync } from "node:child_process";
import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition, type ChromiumOptions } from "@remotion/renderer";
import { args, exists, log, p, pad, readJson, writeJson } from "./lib";
import type { Script } from "./write-script";

const BROWSER =
  process.env.REMOTION_BROWSER_EXECUTABLE ??
  ["/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell"].find((f) => fs.existsSync(f)) ??
  null;
// "angle" needs a GPU; "swangle" (SwiftShader) works on CPU-only machines like the cloud sandbox.
const GL = (process.env.REMOTION_GL ?? "swangle") as ChromiumOptions["gl"];

let bundled: string | null = null;
const getBundle = async () =>
  (bundled ??= await bundle({ entryPoint: p("remotion", "src", "index.ts"), publicDir: p("remotion", "public"), rspack: true }));

const ffErr = (a: string[]) => {
  try {
    execFileSync("ffmpeg", ["-hide_banner", "-y", ...a], { stdio: ["ignore", "pipe", "pipe"] });
    return "";
  } catch (e) {
    return String((e as { stderr?: Buffer }).stderr ?? e);
  }
};
const ffStderr = (a: string[]) => spawnSync("ffmpeg", ["-hide_banner", "-y", ...a], { encoding: "utf8" }).stderr;

/** Two-pass EBU R128 loudnorm to −14 LUFS / −1.5 dBTP, H.264 + AAC 48 kHz, faststart. */
const master = (raw: string, outFile: string) => {
  const target = "I=-14:TP=-1.5:LRA=11";
  const m = ffStderr(["-i", raw, "-af", `loudnorm=${target}:print_format=json`, "-f", "null", "-"]);
  const j = JSON.parse(m.slice(m.lastIndexOf("{"), m.lastIndexOf("}") + 1));
  const af = `loudnorm=${target}:measured_I=${j.input_i}:measured_TP=${j.input_tp}:measured_LRA=${j.input_lra}:measured_thresh=${j.input_thresh}:offset=${j.target_offset}:linear=true,aresample=48000`;
  const err = ffErr([
    "-i", raw,
    "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-r", "30", "-profile:v", "high",
    "-af", af, "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2",
    "-movflags", "+faststart", outFile,
  ]);
  if (err) throw new Error(err);
};

const measure = (file: string) => {
  const e = ffStderr(["-nostats", "-i", file, "-af", "ebur128=peak=true", "-f", "null", "-"]);
  const I = e.match(/I:\s+(-?[\d.]+) LUFS/g)?.pop()?.match(/-?[\d.]+/)?.[0];
  const TP = e.match(/Peak:\s+(-?[\d.]+) dBFS/g)?.pop()?.match(/-?[\d.]+/)?.[0];
  const probe = execFileSync("ffprobe", ["-v", "error", "-show_entries", "stream=codec_name,width,height,r_frame_rate,sample_rate,channels:format=duration", "-of", "json", file]).toString();
  return { lufs: I ? Number(I) : null, truePeakDb: TP ? Number(TP) : null, probe: JSON.parse(probe) };
};

export const render = async (day: number, { sample = false } = {}) => {
  const d = pad(day);
  const s = readJson<Script>(p("scripts", `${d}.json`));
  const cap = readJson<{ durationMs: number; segments: unknown[]; captions: unknown[] }>(p("captions", `${d}.json`));
  const unverified = s.fares.filter((f) => f.status !== "live");
  if (unverified.length && !sample) {
    throw new Error(`Day ${day}: ${unverified.length} fare(s) not re-checked live on walletflights.com. Fix network/site access and re-run fetch-fares (or pass --sample for an internal sample).`);
  }

  // Stage audio and b-roll where the bundle can serve them.
  const gen = p("remotion", "public", "generated", d);
  fs.rmSync(gen, { recursive: true, force: true });
  fs.mkdirSync(gen, { recursive: true });
  fs.copyFileSync(p("audio", `${d}.wav`), `${gen}/vo.wav`);
  const credits = exists(p("assets", d, "credits.json")) ? readJson<{ file: string }[]>(p("assets", d, "credits.json")) : [];
  for (const c of credits) fs.copyFileSync(p("assets", d, c.file), `${gen}/${c.file}`);

  const sampleNote = sample
    ? [unverified.length ? `SAMPLE · fares from ${unverified[0].foundOn} plan, not re-checked` : "SAMPLE", credits.length || !s.brollQueries.length ? "" : "b-roll pending"]
        .filter(Boolean)
        .join(" · ")
    : null;
  const inputProps = {
    day,
    audience: s.audience,
    hook: s.hook,
    tag: s.tag,
    cta: s.cta,
    audioSrc: `generated/${d}/vo.wav`,
    durationMs: cap.durationMs,
    segments: cap.segments,
    captions: cap.captions,
    broll: credits.map((c) => ({ src: `generated/${d}/${c.file}`, kind: "video" })),
    brollWanted: s.brollQueries,
    sampleNote,
    data: s.data,
  };

  const serveUrl = await getBundle();
  const chromiumOptions: ChromiumOptions = { gl: GL };
  const comp = await selectComposition({ serveUrl, id: s.series, inputProps, browserExecutable: BROWSER, chromiumOptions });
  fs.mkdirSync(p("out"), { recursive: true });
  const raw = p("out", `${d}.raw.mp4`);
  const isMap = s.series === "MapIt";
  let last = -1;
  await renderMedia({
    serveUrl,
    composition: comp,
    inputProps,
    codec: "h264",
    crf: 16,
    audioCodec: "aac",
    outputLocation: raw,
    browserExecutable: BROWSER,
    chromiumOptions,
    concurrency: isMap ? 1 : Number(process.env.REMOTION_CONCURRENCY ?? 2),
    timeoutInMilliseconds: 120000,
    onProgress: ({ progress }) => {
      const pct = Math.floor(progress * 10) * 10;
      if (pct !== last) log(day, "render", `${(last = pct)}%`);
    },
  });
  const outFile = p("out", `${d}.mp4`);
  master(raw, outFile);
  fs.rmSync(raw);

  // Cover: the hook in large type over the composition's backdrop.
  const coverProps = { ...inputProps, cover: true };
  const coverComp = await selectComposition({ serveUrl, id: s.series, inputProps: coverProps, browserExecutable: BROWSER, chromiumOptions });
  await renderStill({ serveUrl, composition: coverComp, inputProps: coverProps, output: p("out", `${d}.cover.png`), frame: 0, browserExecutable: BROWSER, chromiumOptions });

  const c = s.caption;
  const tags = c.hashtags.slice(0, 5);
  fs.writeFileSync(p("out", `${d}.caption.txt`), `${c.keywordLine}\n${c.valueLine}\n${c.prompt}\n${tags.join(" ")}\n`);

  const m = measure(outFile);
  const report = {
    day,
    date: s.date,
    series: s.series,
    file: `out/${d}.mp4`,
    hook: s.hook,
    durationSec: Number(m.probe.format.duration),
    lufs: m.lufs,
    truePeakDb: m.truePeakDb,
    streams: m.probe.streams,
    fares: s.fares.map((f) => ({ route: `${f.from}→${f.to}`, price: f.price, currency: f.currency, status: f.status, foundOn: f.foundOn, error: f.error })),
    broll: credits,
    keywordLineChars: c.keywordLine.length,
    hashtags: tags.length,
    sample,
    uncertain: [...s.uncertain, ...(s.brollQueries.length && !credits.length ? [`No b-roll yet (${s.brollQueries.join(", ")}): branded plate shown`] : [])],
  };
  writeJson(p("out", `${d}.report.json`), report);
  log(day, "render", `→ out/${d}.mp4 (${report.durationSec.toFixed(1)}s, ${m.lufs} LUFS)`);
  return report;
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const { days, flags } = args();
  for (const d of days) await render(d, { sample: flags.has("--sample") });
}
