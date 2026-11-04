// Shared helpers for the pipeline steps. Every step reads/writes files under the project root.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const p = (...parts: string[]) => path.join(ROOT, ...parts);
export const pad = (day: number) => String(day).padStart(2, "0");

export type Series = "GuessTheFare" | "CheaperThan" | "MapIt" | "BookingHack" | "PlaneSecret" | "Pov" | "HotTake" | "WeekendReceipt";
export type CalFare = { from: string; to: string; price: number; currency: "GBP" | "USD"; trip: "return" | "one-way"; route: string; role?: string };
export type CalRow = {
  day: number;
  date: string;
  weekday: string;
  series: Series;
  audience: "UK" | "US";
  hook: string;
  scenes: string;
  cta: string;
  lengthSec: number;
  fares: CalFare[];
  options?: number[] | null;
  broll: string[];
  keyword: string | null;
  claims: string[];
  [k: string]: unknown;
};

export const loadCalendar = (): { faresSnapshotDate: string; days: CalRow[] } =>
  JSON.parse(fs.readFileSync(p("content-calendar.json"), "utf8"));

export const row = (day: number) => {
  const r = loadCalendar().days.find((d) => d.day === day);
  if (!r) throw new Error(`Day ${day} is not in content-calendar.json`);
  return r;
};

export const readJson = <T>(file: string): T => JSON.parse(fs.readFileSync(file, "utf8"));
export const writeJson = (file: string, data: unknown) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
};
export const exists = (file: string) => fs.existsSync(file);

/** Parse `<day>` and flags from argv: `tsx pipeline/x.ts 5 --sample`. */
export const args = () => {
  const a = process.argv.slice(2);
  const days = a.filter((x) => /^\d+(-\d+)?$/.test(x)).flatMap((x) => {
    const [s, e] = x.split("-").map(Number);
    return e ? Array.from({ length: e - s + 1 }, (_, i) => s + i) : [s];
  });
  if (!days.length) throw new Error("Pass a day number (or range), e.g. `npm run render -- 5` or `-- 1-10`");
  return { days, flags: new Set(a.filter((x) => x.startsWith("--"))) };
};

export const loadEnv = () => {
  const f = p(".env");
  if (!exists(f)) return;
  for (const line of fs.readFileSync(f, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
};

export const log = (day: number, step: string, msg: string) => console.log(`[day ${pad(day)}] ${step}: ${msg}`);

// ---- Numbers for the voiceover (Kokoro reads words more reliably than symbols) ----
const ONES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
export const words = (n: number, us = false): string => {
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : "");
  if (n < 1000) {
    const rest = n % 100;
    return `${ONES[Math.floor(n / 100)]} hundred${rest ? `${us ? " " : " and "}${words(rest, us)}` : ""}`;
  }
  const rest = n % 1000;
  return `${words(Math.floor(n / 1000), us)} thousand${rest ? `${rest < 100 && !us ? " and " : " "}${words(rest, us)}` : ""}`;
};
/** "£39" → "thirty-nine pounds"; "$229" → "two twenty-nine dollars" (how Americans say fares). */
export const sayMoney = (amount: number, currency: "GBP" | "USD") => {
  if (currency === "USD" && amount >= 101 && amount < 1000 && amount % 100 !== 0) {
    const h = Math.floor(amount / 100);
    const r = amount % 100;
    return `${ONES[h]} ${r < 10 ? `oh ${ONES[r]}` : words(r)} dollars`;
  }
  return `${words(amount, currency === "USD")} ${currency === "GBP" ? "pounds" : "dollars"}`;
};
export const showMoney = (amount: number, currency: "GBP" | "USD") => `${currency === "GBP" ? "£" : "$"}${amount.toLocaleString("en-GB")}`;

/** Price as people say it in a list: 39 → "thirty-nine", 129 → "one twenty-nine", 674 → "six seventy-four". */
export const sayPriceShort = (n: number) => {
  if (n < 100 || n >= 1000 || n % 100 === 0) return words(n, true);
  const r = n % 100;
  return `${ONES[Math.floor(n / 100)]} ${r < 10 ? `oh ${ONES[r]}` : words(r)}`;
};

// ---- Places (lng, lat) for map reels ----
export const PLACES: Record<string, [number, number]> = {
  London: [-0.1276, 51.5072],
  Manchester: [-2.2426, 53.4808],
  "New York": [-74.006, 40.7128],
  Chicago: [-87.6298, 41.8781],
  "Los Angeles": [-118.2437, 34.0522],
  Atlanta: [-84.388, 33.749],
  Rome: [12.4964, 41.9028],
  Lisbon: [-9.1393, 38.7223],
  Barcelona: [2.1734, 41.3851],
  Dubai: [55.2708, 25.2048],
  "Cancún": [-86.8515, 21.1619],
  "Mexico City": [-99.1332, 19.4326],
  Tokyo: [139.6503, 35.6762],
};
