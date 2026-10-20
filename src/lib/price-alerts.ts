// Route price alerts: "email me when London to Barcelona drops below £90".
//
// Sign-up is double opt-in: the alert travels inside the signed confirmation
// link (src/lib/opt-in.ts) and is only saved once its owner confirms. Saved
// alerts live in the site's Redis database (src/lib/redis.ts). Once a day the cron in vercel.json
// calls /api/price-alerts/check, which finds each route's cheapest fare the
// same way the fare calendar does and emails the alerts it's now below.
// Development and the e2e server keep alerts in memory instead. Starts,
// emails and stops are also written to the admin activity log (src/lib/activity.ts).
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { groupByDate, monthSummaries, noFilters } from "@/components/fare-calendar/model";
import type { Currency } from "@/content/deals";
import { tripText } from "@/content/fare-calendar";
import { logEvent } from "@/lib/activity";
import { convert, isDisplayCurrency, type DisplayCurrency } from "@/lib/currency";
import { emailReady } from "@/lib/email";
import { fareCalendar } from "@/lib/fare-calendar";
import { getRates } from "@/lib/rates";
import { localOnly, parseJson, redis, redisReady } from "@/lib/redis";
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
  /** The visitor's currency. Fares are found in GBP or USD and converted for the check. */
  currency: DisplayCurrency;
};

export type Alert = AlertSpec & {
  id: string;
  /**
   * The secret half of the alert's stop link. Random and stored with the
   * alert rather than signed, so stop links in old emails keep working even if
   * the site's signing secret changes.
   */
  stopKey: string;
  created: number;
  /** The last alert email: when, and at what price. */
  sentAt?: number;
  sentPrice?: number;
  /** How many alert emails this alert has sent (alerts saved before 20 Oct 2026 start at 0). */
  sends?: number;
};

const KEY = "wf:price-alerts";
/** A safety cap on the whole list; past it, new sign-ups are refused. */
const MAX_ALERTS = 5000;
/** The same price again is only re-sent after a week; a lower one goes out the next day. */
const REPEAT_AFTER_MS = 7 * 24 * 60 * 60_000;

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
  // Room for currencies with large numbers (rupees, yen).
  if (!(max >= 1 && max <= 100_000_000)) return "Enter the most you’d pay, as a whole number";
  const c = body?.currency;
  const currency: DisplayCurrency = isDisplayCurrency(c) ? c : "GBP";
  return { email, from, to, trip, nights, max, currency };
}

/** One alert per address, route, trip and currency: signing up again just changes the price. */
export const alertId = (s: AlertSpec) =>
  createHash("sha256").update(`${s.email.toLowerCase()}|${s.from.code}|${s.to.code}|${s.trip}|${s.nights}|${s.currency}`).digest("base64url").slice(0, 24);

/** "London to Barcelona (return, 1 week)": how the admin log names an alert. */
export const alertRoute = (a: Pick<AlertSpec, "from" | "to" | "trip" | "nights">) => `${a.from.city} to ${a.to.city} (${tripText(a.trip, a.nights)})`;

// --- Storage ---------------------------------------------------------------

type Store = {
  get(id: string): Promise<Alert | null>;
  put(a: Alert): Promise<void>;
  remove(id: string): Promise<boolean>;
  all(): Promise<Alert[]>;
  count(): Promise<number>;
};

const parse = (json: string | null) => parseJson<Alert>(json);

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
  if (redisReady()) return redisStore;
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
    // A new price starts fresh, so the next check can email straight away;
    // the stop key stays, so links in earlier emails still work, and so does
    // the count of emails sent.
    const alert: Alert = { ...spec, id, stopKey: existing?.stopKey ?? randomBytes(18).toString("base64url"), created: existing?.created ?? now, sends: existing?.sends };
    await s.put(alert);
    await logEvent({ type: existing ? "alert-changed" : "alert-started", email: spec.email, route: alertRoute(spec), price: spec.max, currency: spec.currency, at: now });
    return { ok: true, alert };
  } catch (e) {
    console.error(e);
    return { ok: false, reason: "store-error" };
  }
}

/**
 * Stops the alert a stop link names ("<id>.<stopKey>"). "invalid" for a
 * malformed or wrong key; an alert that's already gone counts as stopped.
 */
export async function removeAlertByToken(token: string): Promise<{ ok: true; alert: Alert | null } | { ok: false; reason: "invalid" | "unavailable" }> {
  const [id, key] = token.split(".");
  if (!id || !key) return { ok: false, reason: "invalid" };
  const s = store();
  if (!s) return { ok: false, reason: "unavailable" };
  try {
    const alert = await s.get(id);
    if (!alert) return { ok: true, alert: null };
    const want = Buffer.from(alert.stopKey ?? "");
    const given = Buffer.from(key);
    if (want.length !== given.length || !timingSafeEqual(want, given)) return { ok: false, reason: "invalid" };
    await s.remove(id);
    await logEvent({ type: "alert-stopped", email: alert.email, route: alertRoute(alert) });
    return { ok: true, alert };
  } catch (e) {
    console.error(e);
    return { ok: false, reason: "unavailable" };
  }
}

/** Every saved alert, for the admin dashboard. Null when there's no store; throws if it fails. */
export async function listAlerts(): Promise<Alert[] | null> {
  const s = store();
  return s ? s.all() : null;
}

/** Erasure request: stops every alert for the address; returns how many. */
export async function removeAlertsForEmail(email: string): Promise<number> {
  const s = store();
  if (!s) return 0;
  const theirs = (await s.all()).filter((a) => a.email.toLowerCase() === email.trim().toLowerCase());
  for (const a of theirs) await s.remove(a.id);
  return theirs.length;
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
  // Fares are found in pounds or dollars; any other currency is converted at today's rate.
  const base: Currency = a.currency === "GBP" ? "GBP" : "USD";
  const rates = base === a.currency ? null : await getRates();
  if (base !== a.currency && !rates) return null;
  const data = await fareCalendar(a.from.code, a.to.code, base, isReturn);
  if (!data.out.length || (isReturn && !data.back?.length)) return null;
  const model = { out: groupByDate(data.out), back: isReturn ? groupByDate(data.back) : undefined, nights: a.nights, filters: noFilters };
  let best: Cheapest | null = null;
  for (const m of monthSummaries(model, data.months)) {
    if (m.min !== null && m.minDate && (!best || m.min < best.price)) best = { price: m.min, date: m.minDate };
  }
  if (!best || base === a.currency) return best;
  const price = convert(best.price, base, a.currency, rates);
  return price === null ? null : { ...best, price: Math.round(price) };
}

/** Whether this fare is worth an email: under the alert, and new news. */
export function shouldSend(a: Alert, fare: Cheapest, now = Date.now()) {
  if (fare.price > a.max) return false;
  if (a.sentPrice === undefined || a.sentAt === undefined) return true;
  return fare.price < a.sentPrice || now - a.sentAt >= REPEAT_AFTER_MS;
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
        await s.put({ ...a, sentAt: now, sentPrice: fare.price, sends: (a.sends ?? 0) + 1 });
        await logEvent({ type: "alert-sent", email: a.email, route: alertRoute(a), price: fare.price, currency: a.currency, at: now });
      } else summary.failed++;
    }
  }
  return summary;
}

// --- Links -----------------------------------------------------------------

const CONFIRM_TTL_MS = 7 * 24 * 60 * 60_000;
export const CONFIRM_PURPOSE = "price-alert-confirm";

/** Production links always use the canonical host; previews and local runs use their own. */
export const linkOrigin = (req: Request, canonical: string) => (process.env.VERCEL_ENV === "production" ? canonical : new URL(req.url).origin);

export function calendarLink(origin: string, a: Pick<AlertSpec, "from" | "to" | "trip" | "nights">) {
  const p = new URLSearchParams({ from: a.from.code, to: a.to.code, trip: a.trip });
  if (a.trip === "return") p.set("nights", String(a.nights));
  return `${origin}/fare-calendar?${p}`;
}

export const confirmToken = (spec: AlertSpec) => createSignedToken(CONFIRM_PURPOSE, spec, CONFIRM_TTL_MS);

/** The page link (a button to press) and the one-click link mail apps post to. */
export function stopLinks(origin: string, a: Pick<Alert, "id" | "stopKey">) {
  const t = `${a.id}.${a.stopKey}`;
  return { stop: `${origin}/price-alerts/stop?t=${t}`, oneClick: `${origin}/api/price-alerts/stop?t=${t}` };
}
