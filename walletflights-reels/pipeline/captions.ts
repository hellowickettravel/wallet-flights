// Step 4 — word timings → captions/<day>.json (Remotion `Caption[]` + segment times).
//
// The script is known, so captions always show the script's words. Timing comes from:
//   1. whisper.cpp (tools/whisper.cpp + a ggml model) when a model file is present: word-level
//      timestamps, matched to the script segment by segment; or
//   2. script alignment: Kokoro's exact per-segment start/end, words spread inside each segment
//      by spoken length (numbers count as the words Kokoro says).
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import type { Caption } from "@remotion/captions";
import { args, log, p, pad, readJson, sayMoney, writeJson } from "./lib";
import type { Script } from "./write-script";

type Timings = { durationMs: number; segments: { id: string; startMs: number; endMs: number }[] };

const spokenWeight = (w: string) => {
  const money = w.match(/^([£$])([\d,]+)/);
  if (money) return sayMoney(Number(money[2].replace(/,/g, "")), money[1] === "£" ? "GBP" : "USD").length * 0.85;
  if (/^\d+$/.test(w)) return 6;
  return w.replace(/[^\p{L}\p{N}]/gu, "").length + 2.2;
};

const spread = (text: string, startMs: number, endMs: number): Caption[] => {
  const ws = text.split(/\s+/).filter(Boolean);
  const weights = ws.map(spokenWeight);
  const total = weights.reduce((a, b) => a + b, 0);
  let t = startMs;
  return ws.map((w, i) => {
    const d = ((endMs - startMs) * weights[i]) / total;
    const c: Caption = { text: (i === 0 ? "" : " ") + w, startMs: Math.round(t), endMs: Math.round(t + d), timestampMs: Math.round(t + d / 2), confidence: null };
    t += d;
    return c;
  });
};

const whisperModel = () => {
  const dir = p("tools", "whisper.cpp");
  if (!fs.existsSync(dir)) return null;
  // Ignore empty/partial downloads (a real ggml model is tens of MB).
  const m = fs.readdirSync(dir).find((f) => /^ggml-.*\.bin$/.test(f) && fs.statSync(path.join(dir, f)).size > 10_000_000);
  return m ? { dir, model: m.replace(/^ggml-|\.bin$/g, "") } : null;
};

const whisperWords = async (day: number) => {
  const w = whisperModel();
  if (!w) return null;
  const { transcribe, toCaptions } = await import("@remotion/install-whisper-cpp");
  const wav16 = p("audio", `${pad(day)}.16k.wav`);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", p("audio", `${pad(day)}.wav`), "-ar", "16000", "-ac", "1", wav16]);
  const out = await transcribe({
    inputPath: wav16,
    whisperPath: w.dir,
    whisperCppVersion: "1.7.6",
    model: w.model as "base.en",
    tokenLevelTimestamps: true,
    printOutput: false,
  });
  fs.rmSync(wav16);
  return toCaptions({ whisperCppOutput: out }).captions;
};

export const captions = async (day: number) => {
  const s = readJson<Script>(p("scripts", `${pad(day)}.json`));
  const t = readJson<Timings>(p("audio", `${pad(day)}.timings.json`));
  const heard = await whisperWords(day).catch((e) => {
    log(day, "captions", `whisper failed (${(e as Error).message}); using script alignment`);
    return null;
  });
  const out: Caption[] = [];
  for (const seg of s.segments) {
    const tm = t.segments.find((x) => x.id === seg.id);
    if (!tm) throw new Error(`No timing for segment ${seg.id}; re-run tts`);
    const script = seg.text.split(/\s+/).filter(Boolean);
    const inSeg = heard?.filter((c) => c.startMs >= tm.startMs - 120 && c.endMs <= tm.endMs + 120 && c.text.trim()) ?? [];
    if (heard && inSeg.length === script.length) {
      inSeg.forEach((c, i) => out.push({ ...c, text: (out.length ? " " : "") + script[i] }));
    } else {
      const words = spread(seg.text, tm.startMs, tm.endMs);
      if (out.length && words[0]) words[0].text = " " + words[0].text;
      out.push(...words);
    }
  }
  writeJson(p("captions", `${pad(day)}.json`), {
    source: heard ? "whisper.cpp + script" : "script-aligned (Kokoro segment timings)",
    durationMs: t.durationMs,
    segments: s.segments.map((seg) => ({ ...t.segments.find((x) => x.id === seg.id)!, text: seg.text })),
    captions: out,
  });
  log(day, "captions", `${out.length} words (${heard ? "whisper" : "script-aligned"})`);
};

if (import.meta.url === `file://${process.argv[1]}`) for (const d of args().days) await captions(d);
