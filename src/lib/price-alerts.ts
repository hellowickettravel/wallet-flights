// Route price alerts: "email me when London to Barcelona drops below £90".
//
// Sign-up is double opt-in: the alert travels inside the signed confirmation
// link (src/lib/opt-in.ts) and is only saved once its owner confirms. Saved
// alerts live in a Redis database over its REST API: in Vercel, Storage →
// Upstash for Redis sets KV_REST_API_URL and KV_REST_API_TOKEN (the
// UPSTASH_REDIS_REST_* names work too). Once a day the cron in vercel.json
// calls /api/price-alerts/check, which finds each route's cheapest fare the
// same way the fare calendar does and emails the alerts it's now below.
// Development and the e2e server keep alerts in memory instead.
import { createHash } from "node:crypto";
import { groupByDate, monthSummaries, noFilters } from "@/components/fare-calendar/model";
import type { Currency } from "@/content/deals";
import { emailReady } from "@/lib/email";
import { fareCalendar } from "@/lib/fare-calendar";
import { createSignedToken } from "@/lib/opt-in";

export type AlertPlace = { code: string; city: string };
export type AlertTrip = "return" | "oneway";

/** What the visitor asked for. */
export type AlertSpec = {
  email: string;
  from: AlertPlace;
  to: AlertPlace;
  trip: AlertTrip;
  /** Nights away; 0 for one way. */
  nights: number;
  /** Email when the cheapest fare is at or below this, per person. */
  max: number;
  currency: Currency;
};

export type Alert = AlertSpec & {
  id: string;
  created: number;
  /** The last alert email: when, and at what price. */
  sentAt?: number;
  sentPrice?: number;
};

const KEY = "wf:price-alerts";
/** A safety cap on the whole list; past it, new sign-ups are refused. */
const MAX_ALERTS = 5000;
/** The same price again is only re-sent after a week; a lower one goes out the next day. */
const RESEND_AFTER_MS = 7 * 24 * 60 * 60_000;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CODE = /^[A-Z]{3}$/;

/** Checks and tidies a sign-up from the fare calendar; returns an error message or the alert. */
export function parseAlertSpec(body: Record<string, unknown> | null): AlertSpec | string {
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  if (!EMAIL.test(email) || email.length > 254) return "Enter a valid email address";
  const place = (v: unknown): AlertPlace | null => {
    const p = v as { code?: unknown; city?: unknown } | null;
    const code = typeof p?.code === "string" ? p.code.toUpperCase() : "";
    // The city is only shown in our own emails; keep it short and printable.
    const city = typeof p?.city === "string" ? p.city.replace(/[\u0000-\u001f\u007f<>]/g, "").trim().slice(0, 60) : "";
    return CODE.test(code) ? { code, city: city || code } : null;
  };
  const from = place(body?.from);
  const to = place(body?.to);
  if (!from || !to || from.code === to.code) return "Choose two different airports or cities";
  const trip: AlertTrip = body?.trip === "oneway" ? "oneway" : "return";
  const nights = trip === "oneway" ? 0 : Math.trunc(Number(body?.nights));
  if (trip === "return" && !(nights >= 1 && nights <= 30)) return "Choose a trip length";
  const max = Math.round(Number(body?.max));
  if (!(max >= 1 && max <= 100_000)) return "Enter the most you’d pay, in whole pounds or dollars";
  const currency: Currency = body?.currency === "USD" ? "USD" : "GBP";
  return { email, from, to, trip, nights, max, currency };
}

/** One alert per address, route, trip and currency: signing up again just changes the price. */
export const alertId = (s: AlertSpec) =>
  createHash("sha256").update(`${s.email.toLowerCase()}|${s.from.code}|${s.to.code}|${s.trip}|${s.nights}|${s.currency}`).digest("base64url").slice(0, 24);

// --- Storage ---------------------------------------------------------------

type Store = {
  get(id: string): Promise<Alert | null>;
  put(a: Alert): Promise<void>;
  remove(id: string): Promise<boolean>;
  all(): Promise<Alert[]>;
  count(): Promise<number>;
};

const restUrl = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const restToken = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
/** Development and dry runs (the e2e server) may keep alerts in memory. */
const localOnly = () => process.env.EMAIL_DRY_RUN === "1" || process.env.NODE_ENV !== "production";

async function redis<T>(command: (string | number)[]): Promise<T> {
  const res = await fetch(restUrl()!, {
    method: "POST",
    headers: { Authorization: `Bearer ${restToken()}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Alert store error ${res.status}`);
  return ((await res.json()) as { result: T }).result;
}

const parse = (json: string | null): Alert | null => {
  if (!json) return null;
  try {
    return JSON.parse(json) as Alert;
  } catch {
    return null;
  }
};

const redisStore: Store = {
  get: async (id) => parse(await redis<string | null>(["HGET", KEY, id])),
  put: async (a) => void (await redis(["HSET", KEY, a.id, JSON.stringify(a)])),
  remove: async (id) => (await redis<number>(["HDEL", KEY, id])) > 0,
  all: async () => {
    // HGETALL answers [field, value, field, value, …].
    const flat = await redis<string[]>(["HGETALL", KEY]);
    return flat.flatMap((v, i) => (i % 2 ? [parse(v)] : [])).filter((a): a is Alert => !!a);
  },
  count: () => redis<number>(["HLEN", KEY]),
};

const g = globalThis as { __wfPriceAlerts?: Map<string, Alert> };
const memory = (g.__wfPriceAlerts ??= new Map());
const memoryStore: Store = {
  get: async (id) => memory.get(id) ?? null,
  put: async (a) => void memory.set(a.id, a),
  remove: async (id) => memory.delete(id),
  all: async () => [...memory.values()],
  count: async () => memory.size,
};

function store(): Store | null {
  if (restUrl() && restToken()) return redisStore;
  return localOnly() ? memoryStore : null;
}

/**
 * Whether alerts can work end to end: somewhere to keep them, a way to email
 * them and a secret for the daily check. The fare calendar only offers alerts
 * when this is true, so nobody signs up for emails that would never come.
 */
export function priceAlertsReady() {
  return !!store() && emailReady() && (!!process.env.CRON_SECRET || localOnly());
}

export type SaveResult = { ok: true; alert: Alert } | { ok: false; reason: "not-configured" | "full" | "store-error" };

export async function saveAlert(spec: AlertSpec, now = Date.now()): Promise<SaveResult> {
  const s = store();
  if (!s) return { ok: false, reason: "not-configured" };
  const id = alertId(spec);
  try {
    const existing = await s.get(id);
    if (!existing && (await s.count()) >= MAX_ALERTS) return { ok: false, reason: "full" };
    // A new price starts fresh, so the next check can email straight away.
    const alert: Alert = { ...spec, id, created: existing?.created ?? now };
    await s.put(alert);
    return { ok: true, alert };
  } catch (e) {
    console.error(e);
    return { ok: false, reason: "store-error" };
  }
}

export async function removeAlert(id: string): Promise<{ ok: boolean; alert: Alert | null }> {
  const s = store();
  if (!s) return { ok: false, alert: null };
  try {
    const alert = await s.get(id);
    await s.remove(id);
    return { ok: true, alert };
  } catch (e) {
    console.error(e);
    return { ok: false, alert: null };
  }
}

// --- The daily check -------------------------------------------------------

export type Cheapest = { price: number; date: string };

/**
 * The cheapest fare on the route in the next 12 months, exactly as the fare
 * calendar would show it: the cheapest one-way fare, or for a return trip the
 * cheapest outbound plus return `nights` later. Null when there's no data.
 */
export async function cheapestFare(a: Pick<AlertSpec, "from" | "to" | "trip" | "nights" | "currency">): Promise<Cheapest | null> {
  const isReturn = a.trip === "return";
  const data = await fareCalendar(a.from.code, a.to.code, a.currency, isReturn);
  if (!data.out.length || (isReturn && !data.back?.length)) return null;
  const model = { out: groupByDate(data.out), back: isReturn ? groupByDate(data.back) : undefined, nights: a.nights, filters: noFilters };
  let best: Cheapest | null = null;
  for (const m of monthSummaries(model, data.months)) {
    if (m.min !== null && m.minDate && (!best || m.min < best.price)) best = { price: m.min, date: m.minDate };
  }
  return best;
}

/** Whether this fare is worth an email: under the alert, and new news. */
export function shouldSend(a: Alert, fare: Cheapest, now = Date.now()) {
  if (fare.price > a.max) return false;
  if (a.sentPrice === undefined || a.sentAt === undefined) return true;
  return fare.price < a.sentPrice || now - a.sentAt >= RESEND_AFTER_MS;
}

export type CheckSummary = { alerts: number; routes: number; matched: number; sent: number; failed: number };

/**
 * Checks every alert, one fare lookup per route (fares are cached for an hour,
 * so this is cheap), and calls `send` for each alert that should hear news.
 * Records what was sent so the same price isn't emailed every day.
 */
export async function checkAlerts(send: (a: Alert, fare: Cheapest) => Promise<boolean>, now = Date.now()): Promise<CheckSummary | null> {
  const s = store();
  if (!s) return null;
  const alerts = await s.all();
  const byRoute = new Map<string, Alert[]>();
  for (const a of alerts) {
    const key = `${a.from.code}|${a.to.code}|${a.trip}|${a.nights}|${a.currency}`;
    byRoute.set(key, [...(byRoute.get(key) ?? []), a]);
  }
  const summary: CheckSummary = { alerts: alerts.length, routes: byRoute.size, matched: 0, sent: 0, failed: 0 };
  for (const group of byRoute.values()) {
    const fare = await cheapestFare(group[0]).catch(() => null);
    if (!fare) continue;
    for (const a of group) {
      if (!shouldSend(a, fare, now)) continue;
      summary.matched++;
      if (await send(a, fare)) {
        summary.sent++;
        await s.put({ ...a, sentAt: now, sentPrice: fare.price });
      } else summary.failed++;
    }
  }
  return summary;
}

// --- Links -----------------------------------------------------------------

const CONFIRM_TTL_MS = 7 * 24 * 60 * 60_000;
/** Stop links never really expire: an old alert email must still stop the alert. */
const STOP_TTL_MS = 10 * 365 * 24 * 60 * 60_000;
export const CONFIRM_PURPOSE = "price-alert-confirm";
export const STOP_PURPOSE = "price-alert-stop";

/** Production links always use the canonical host; previews and local runs use their own. */
export const linkOrigin = (req: Request, canonical: string) => (process.env.VERCEL_ENV === "production" ? canonical : new URL(req.url).origin);

export function calendarLink(origin: string, a: Pick<AlertSpec, "from" | "to" | "trip" | "nights">) {
  const p = new URLSearchParams({ from: a.from.code, to: a.to.code, trip: a.trip });
  if (a.trip === "return") p.set("nights", String(a.nights));
  return `${origin}/fare-calendar?${p}`;
}

export const confirmToken = (spec: AlertSpec) => createSignedToken(CONFIRM_PURPOSE, spec, CONFIRM_TTL_MS);

export function stopLinks(origin: string, id: string) {
  const t = createSignedToken(STOP_PURPOSE, { id }, STOP_TTL_MS);
  if (!t) return null;
  return { stop: `${origin}/price-alerts/stop?t=${t}`, oneClick: `${origin}/api/price-alerts/stop?t=${t}` };
}
