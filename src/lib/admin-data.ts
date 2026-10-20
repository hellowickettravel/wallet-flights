// The admin dashboard's view of the data: saved price alerts
// (src/lib/price-alerts.ts) joined with fare-alert subscribers and the
// activity log (src/lib/activity.ts), per email address, plus the CSV exports.
import { formatPrice } from "@/content/deals";
import { tripText } from "@/content/fare-calendar";
import { readActivity, type ActivityEvent, type CheckRun, type Subscriber } from "@/lib/activity";
import type { DisplayCurrency } from "@/lib/currency";
import { listAlerts, type Alert } from "@/lib/price-alerts";

/** The daily check's time, from the cron in vercel.json ("0 7 * * *"): keep the two in step. */
export const CHECK_HOUR_UTC = 7;

/** One person: everything we hold for an email address. */
export type Contact = {
  email: string;
  /** When they confirmed homepage fare alerts, if they did. */
  fareAlertsSince?: number;
  alerts: Alert[];
  firstSeen: number;
  /** The last alert email we sent them. */
  lastEmailed?: number;
  emailsSent: number;
};

export type Dashboard = {
  /** When this was read. */
  now: number;
  subscribers: Subscriber[];
  alerts: Alert[];
  events: ActivityEvent[];
  checks: CheckRun[];
  contacts: Contact[];
  sentLast30Days: number;
};

const DAY = 24 * 60 * 60_000;

/** Null when there's no database; throws if it fails. */
export async function loadDashboard(now = Date.now()): Promise<Dashboard | null> {
  const [activity, saved] = await Promise.all([readActivity(now), listAlerts()]);
  if (!activity || !saved) return null;
  const alerts = saved.sort((a, b) => b.created - a.created);
  const byEmail = new Map<string, Contact>();
  const contact = (email: string, seen: number) => {
    const k = email.toLowerCase();
    const c = byEmail.get(k) ?? { email: k, alerts: [], firstSeen: seen, emailsSent: 0 };
    c.firstSeen = Math.min(c.firstSeen, seen);
    byEmail.set(k, c);
    return c;
  };
  for (const s of activity.subscribers) contact(s.email, s.confirmedAt).fareAlertsSince = s.confirmedAt;
  for (const a of alerts) {
    const c = contact(a.email, a.created);
    c.alerts.push(a);
    c.emailsSent += a.sends ?? 0;
    if (a.sentAt && (!c.lastEmailed || a.sentAt > c.lastEmailed)) c.lastEmailed = a.sentAt;
  }
  return {
    now,
    ...activity,
    alerts,
    contacts: [...byEmail.values()].sort((a, b) => b.firstSeen - a.firstSeen),
    sentLast30Days: activity.events.filter((e) => e.type === "alert-sent" && now - e.at < 30 * DAY).length,
  };
}

/** The next daily check after `now`. Vercel may start it a little after the hour. */
export function nextCheck(now = Date.now()): number {
  const d = new Date(now);
  const today = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), CHECK_HOUR_UTC);
  return today > now ? today : today + DAY;
}

// --- Display ---------------------------------------------------------------

const LONDON = "Europe/London";

/** "20 Oct 2026, 08:00" in UK time. */
export const dateTime = (ms: number) =>
  new Date(ms).toLocaleString("en-GB", { timeZone: LONDON, day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

/** "20 Oct 2026" in UK time. */
export const date = (ms: number) => new Date(ms).toLocaleDateString("en-GB", { timeZone: LONDON, day: "numeric", month: "short", year: "numeric" });

/** "2026-10-20 08:00" in UK time: sorts correctly in a spreadsheet. */
const isoLocal = (ms: number | undefined) => {
  if (!ms) return "";
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: LONDON, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(new Date(ms))
      .map((x) => [x.type, x.value]),
  );
  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}`;
};

export const alertRouteName = (a: Pick<Alert, "from" | "to">) => `${a.from.city} (${a.from.code}) to ${a.to.city} (${a.to.code})`;
export const alertTrip = (a: Pick<Alert, "trip" | "nights">) => tripText(a.trip, a.nights);
export const money = (amount: number, currency: string) => formatPrice(amount, currency as DisplayCurrency);

export const eventText: Record<ActivityEvent["type"], string> = {
  subscribed: "Confirmed fare alerts",
  "alert-started": "Started a price alert",
  "alert-changed": "Changed a price alert",
  "alert-sent": "Sent a price alert email",
  "alert-stopped": "Stopped a price alert",
};

/** What each person agreed to receive, for the export. */
export const agreedTo = (c: Contact) =>
  [c.fareAlertsSince ? "Fare alerts" : "", c.alerts.length ? "Price alerts for the routes listed" : ""].filter(Boolean).join("; ");

// --- CSV -------------------------------------------------------------------

/**
 * One CSV cell. Quoted when needed; a leading = + - @ (or tab, return) gets
 * an apostrophe so a spreadsheet shows it as text instead of running it as a
 * formula (CSV injection: a sign-up's city or email could carry one).
 */
export function cell(v: string | number | undefined): string {
  let s = v === undefined ? "" : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** With a byte-order mark so Excel reads £ and accented cities correctly. */
export const csv = (rows: (string | number | undefined)[][]) => `﻿${rows.map((r) => r.map(cell).join(",")).join("\r\n")}\r\n`;

export const exportLists = ["contacts", "subscribers", "alerts", "activity"] as const;
export type ExportList = (typeof exportLists)[number];

export function exportRows(list: ExportList, d: Dashboard): (string | number | undefined)[][] {
  switch (list) {
    case "contacts":
      return [
        ["Email", "Agreed to", "Fare alerts since", "Active price alerts", "Routes", "First seen", "Alert emails sent", "Last alert email"],
        ...d.contacts.map((c) => [
          c.email,
          agreedTo(c),
          isoLocal(c.fareAlertsSince),
          c.alerts.length,
          c.alerts.map((a) => `${a.from.city} to ${a.to.city}`).join("; "),
          isoLocal(c.firstSeen),
          c.emailsSent,
          isoLocal(c.lastEmailed),
        ]),
      ];
    case "subscribers":
      return [["Email", "Confirmed"], ...d.subscribers.map((s) => [s.email, isoLocal(s.confirmedAt)])];
    case "alerts":
      return [
        ["Email", "From", "From code", "To", "To code", "Trip", "Alert below", "Currency", "Started", "Alert emails sent", "Last alert email", "Last price sent"],
        ...d.alerts.map((a) => [
          a.email,
          a.from.city,
          a.from.code,
          a.to.city,
          a.to.code,
          alertTrip(a),
          a.max,
          a.currency,
          isoLocal(a.created),
          a.sends ?? 0,
          isoLocal(a.sentAt),
          a.sentPrice,
        ]),
      ];
    case "activity":
      return [
        ["When", "Email", "What happened", "Route", "Price", "Currency"],
        ...d.events.map((e) => [isoLocal(e.at), e.email, eventText[e.type], e.route, e.price, e.currency]),
      ];
  }
}
