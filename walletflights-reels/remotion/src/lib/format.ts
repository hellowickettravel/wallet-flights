import type { Currency, Segment } from "./types";

export const money = (amount: number, currency: Currency) =>
  `${currency === "GBP" ? "£" : "$"}${amount.toLocaleString("en-GB")}`;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-11-09" → "9 Nov" (UK) or "Nov 9" (US). */
export const shortDate = (iso: string, audience: "UK" | "US" = "UK") => {
  const [, m, d] = iso.split("-").map(Number);
  return audience === "US" ? `${MONTHS[m - 1]} ${d}` : `${d} ${MONTHS[m - 1]}`;
};

export const msToFrame = (ms: number, fps: number) => Math.round((ms / 1000) * fps);

/** Frame at which a spoken segment starts (falls back to `fallbackMs`). */
export const segStart = (segments: Segment[], id: string, fps: number, fallbackMs = 0) => {
  const s = segments.find((x) => x.id === id);
  return msToFrame(s ? s.startMs : fallbackMs, fps);
};
export const segEnd = (segments: Segment[], id: string, fps: number, fallbackMs = 0) => {
  const s = segments.find((x) => x.id === id);
  return msToFrame(s ? s.endMs : fallbackMs, fps);
};
