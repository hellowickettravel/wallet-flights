// Step 1 — re-read each fare on walletflights.com on render day.
// Reads /routes/<slug> → the "Cheapest recent fare" panel (price span with data-base="GBP|USD",
// then "Round trip · <dates> · <stops>"). Writes scripts/<day>.fares.json.
// If the site can't be read, the plan's 4 Nov figure is kept with status "snapshot" and render.ts
// will refuse to make a deliverable from it (samples only, with --sample).
import { args, loadCalendar, log, p, pad, row, writeJson, type CalFare } from "./lib";

const SITE = process.env.WF_SITE ?? "https://www.walletflights.com";

export type FareRecord = CalFare & {
  foundOn: string;
  status: "live" | "snapshot";
  snapshotPrice: number;
  url: string;
  detail?: string;
  error?: string;
};

const today = () => new Date().toISOString().slice(0, 10);

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&pound;/g, "£")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

export const readRoute = async (route: string) => {
  const url = `${SITE}/routes/${route}`;
  const res = await fetch(url, { headers: { "user-agent": "walletflights-reels/1.0 (fare check)" }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const html = await res.text();
  const at = html.indexOf('id="cheapest-title"');
  if (at < 0) throw new Error("No 'Cheapest recent fare' panel on the page");
  const panel = html.slice(at, at + 6000);
  if (/No recent fare found/i.test(panel.slice(0, 1500))) throw new Error("Site shows no recent fare for this route");
  const m = panel.match(/data-base="(GBP|USD)"[^>]*>([^<]+)</);
  if (!m) throw new Error("Price span not found in the panel");
  const price = Number(decode(m[2]).replace(/[^\d.]/g, ""));
  if (!Number.isFinite(price) || price <= 0) throw new Error(`Unreadable price "${m[2]}"`);
  const detail = panel.match(/Round trip[^<]*(?:<[^>]+>[^<]*){0,6}/)?.[0];
  return { url, price: Math.round(price), currency: m[1] as "GBP" | "USD", detail: detail ? decode(detail) : undefined };
};

export const fetchFares = async (day: number) => {
  const r = row(day);
  const out: FareRecord[] = [];
  const snapDate = loadCalendar().faresSnapshotDate;
  for (const f of r.fares) {
    try {
      const live = await readRoute(f.route);
      if (live.currency !== f.currency) throw new Error(`Site shows ${live.currency}, expected ${f.currency}`);
      out.push({ ...f, price: live.price, snapshotPrice: f.price, foundOn: today(), status: "live", url: live.url, detail: live.detail });
      log(day, "fetch-fares", `${f.from}→${f.to} live ${live.currency} ${live.price} (plan ${f.price})`);
    } catch (e) {
      const error = (e as Error).cause ? `${(e as Error).message}: ${String((e as Error).cause)}` : (e as Error).message;
      out.push({ ...f, snapshotPrice: f.price, foundOn: snapDate, status: "snapshot", url: `${SITE}/routes/${f.route}`, error });
      log(day, "fetch-fares", `${f.from}→${f.to} NOT VERIFIED (${error}); keeping ${snapDate} snapshot ${f.price}`);
    }
  }
  writeJson(p("scripts", `${pad(day)}.fares.json`), { day, checkedAt: new Date().toISOString(), fares: out });
  return out;
};

if (import.meta.url === `file://${process.argv[1]}`) {
  for (const d of args().days) await fetchFares(d);
}
