// Step 5 — b-roll from the Pexels API (portrait, HD). Writes assets/<day>/<n>.mp4 + credits.json.
// Map and calendar reels need none. Clips with airline logos or clear faces must be swapped at
// review (the API can't tell), so every pick is listed in credits.json for the owner to check.
import fs from "node:fs";
import { args, loadEnv, log, p, pad, readJson, writeJson } from "./lib";
import type { Script } from "./write-script";

type PexelsVideo = {
  id: number;
  url: string;
  duration: number;
  width: number;
  height: number;
  user: { name: string; url: string };
  video_files: { link: string; width: number; height: number; quality: string; file_type: string }[];
};

export const fetchBroll = async (day: number, { force = false } = {}) => {
  loadEnv();
  const s = readJson<Script>(p("scripts", `${pad(day)}.json`));
  const dir = p("assets", pad(day));
  if (!s.brollQueries.length) return log(day, "fetch-broll", "none needed");
  if (!force && fs.existsSync(p("assets", pad(day), "credits.json"))) return log(day, "fetch-broll", "already fetched (use --force to replace)");
  const key = process.env.PEXELS_API_KEY;
  if (!key) {
    log(day, "fetch-broll", "PEXELS_API_KEY missing: skipped (template shows a branded plate)");
    return;
  }
  fs.mkdirSync(dir, { recursive: true });
  const credits: { file: string; query: string; pexelsUrl: string; author: string; authorUrl: string }[] = [];
  for (const [i, q] of s.brollQueries.entries()) {
    const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(q)}&orientation=portrait&size=medium&per_page=15`;
    const res = await fetch(url, { headers: { Authorization: key } });
    if (!res.ok) throw new Error(`Pexels ${res.status} for "${q}"`);
    const { videos } = (await res.json()) as { videos: PexelsVideo[] };
    const pick = videos
      .filter((v) => v.height > v.width && v.duration >= 4)
      .map((v) => ({ v, f: v.video_files.filter((f) => f.file_type === "video/mp4" && f.height >= 1280 && f.height <= 2160).sort((a, b) => Math.abs(a.height - 1920) - Math.abs(b.height - 1920))[0] }))
      .find((x) => x.f);
    if (!pick) {
      log(day, "fetch-broll", `no portrait HD clip for "${q}"`);
      continue;
    }
    const file = `${i}.mp4`;
    const buf = Buffer.from(await (await fetch(pick.f.link)).arrayBuffer());
    fs.writeFileSync(p("assets", pad(day), file), buf);
    credits.push({ file, query: q, pexelsUrl: pick.v.url, author: pick.v.user.name, authorUrl: pick.v.user.url });
    log(day, "fetch-broll", `"${q}" → ${pick.v.url} (${pick.f.width}x${pick.f.height})`);
  }
  writeJson(p("assets", pad(day), "credits.json"), credits);
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const { days, flags } = args();
  for (const d of days) await fetchBroll(d, { force: flags.has("--force") });
}
