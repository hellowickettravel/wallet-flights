// Step 3 — voiceover. Kokoro-82M runs locally (tools/tts.py); writes audio/<day>.wav and
// audio/<day>.timings.json (exact start/end of each spoken segment).
// ElevenLabs is the paid upgrade (ELEVENLABS_API_KEY); not wired until the owner opts in.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { args, loadEnv, log, p, pad, readJson, writeJson } from "./lib";
import type { Script } from "./write-script";

export const tts = (day: number) => {
  loadEnv();
  const s = readJson<Script>(p("scripts", `${pad(day)}.json`));
  fs.mkdirSync(p("audio"), { recursive: true });
  const req = p("audio", `${pad(day)}.request.json`);
  writeJson(req, {
    voice: s.voice,
    lang: s.voice.startsWith("b") ? "en-gb" : "en-us",
    speed: 1.05,
    leadMs: 120,
    segments: s.segments.map(({ id, say, pauseAfterMs }) => ({ id, say, pauseAfterMs })),
  });
  const py = process.env.KOKORO_PYTHON ?? p("tools", ".venv", "bin", "python");
  execFileSync(py, ["-I", p("tools", "tts.py"), req, p("audio", `${pad(day)}.wav`), p("audio", `${pad(day)}.timings.json`)], { stdio: "inherit" });
  fs.rmSync(req);
  const t = readJson<{ durationMs: number }>(p("audio", `${pad(day)}.timings.json`));
  log(day, "tts", `${s.voice}, ${(t.durationMs / 1000).toFixed(1)}s`);
};

if (import.meta.url === `file://${process.argv[1]}`) for (const d of args().days) tts(d);
