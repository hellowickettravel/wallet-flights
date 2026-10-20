// What the admin dashboard reads: confirmed fare-alert subscribers, a log of
// what happened to each address (signed up, alert started, alert emailed,
// alert stopped) and the daily check's last runs. Everything lives in the
// database (src/lib/redis.ts), or in memory in development and the e2e server.
//
// Writing here never gets in a traveller's way: a failed write is logged and
// the sign-up, email or stop carries on.
import { localOnly, parseJson, redis, redisReady } from "@/lib/redis";

const SUBSCRIBERS = "wf:subscribers";
const EVENTS = "wf:activity";
const CHECKS = "wf:checks";
/** The log keeps the newest events up to this many, and none older than a year (privacy policy). */
const MAX_EVENTS = 5000;
export const EVENT_RETENTION_MS = 365 * 24 * 60 * 60_000;
const MAX_CHECKS = 30;

export type Subscriber = { email: string; confirmedAt: number };

export type ActivityType = "subscribed" | "alert-started" | "alert-changed" | "alert-sent" | "alert-stopped";
export type ActivityEvent = {
  at: number;
  type: ActivityType;
  email: string;
  /** "London to Barcelona (return, 1 week)", for alert events. */
  route?: string;
  /** The alert's price (started, changed) or the fare emailed (sent), with its currency. */
  price?: number;
  currency?: string;
};

export type CheckRun = { at: number; alerts: number; routes: number; matched: number; sent: number; failed: number };

const key = (email: string) => email.trim().toLowerCase();

type Data = {
  subscriber(email: string): Promise<Subscriber | null>;
  putSubscriber(s: Subscriber): Promise<void>;
  removeSubscriber(email: string): Promise<boolean>;
  subscribers(): Promise<Subscriber[]>;
  addEvent(e: ActivityEvent): Promise<void>;
  events(): Promise<ActivityEvent[]>;
  /** Keeps the newest `count` events. */
  keepNewest(count: number): Promise<void>;
  /** Removes every event for the address; returns how many. */
  removeEvents(email: string): Promise<number>;
  addCheck(c: CheckRun): Promise<void>;
  checks(): Promise<CheckRun[]>;
};

const redisData: Data = {
  subscriber: async (email) => parseJson<Subscriber>(await redis<string | null>(["HGET", SUBSCRIBERS, key(email)])),
  putSubscriber: async (s) => void (await redis(["HSET", SUBSCRIBERS, key(s.email), JSON.stringify(s)])),
  removeSubscriber: async (email) => (await redis<number>(["HDEL", SUBSCRIBERS, key(email)])) > 0,
  subscribers: async () => {
    const flat = await redis<string[]>(["HGETALL", SUBSCRIBERS]);
    return flat.flatMap((v, i) => (i % 2 ? [parseJson<Subscriber>(v)] : [])).filter((s): s is Subscriber => !!s);
  },
  addEvent: async (e) => {
    await redis(["LPUSH", EVENTS, JSON.stringify(e)]);
    await redis(["LTRIM", EVENTS, 0, MAX_EVENTS - 1]);
  },
  events: async () => (await redis<string[]>(["LRANGE", EVENTS, 0, -1])).map((v) => parseJson<ActivityEvent>(v)).filter((e): e is ActivityEvent => !!e),
  // Trims and removals touch only the events concerned, so an event logged at
  // the same moment is never lost (LPUSH adds at the head; old ones are at the tail).
  keepNewest: async (count) => void (count > 0 ? await redis(["LTRIM", EVENTS, 0, count - 1]) : await redis(["DEL", EVENTS])),
  removeEvents: async (email) => {
    const raw = await redis<string[]>(["LRANGE", EVENTS, 0, -1]);
    const theirs = [...new Set(raw.filter((v) => parseJson<ActivityEvent>(v)?.email === key(email)))];
    let removed = 0;
    for (const v of theirs) removed += await redis<number>(["LREM", EVENTS, 0, v]);
    return removed;
  },
  addCheck: async (c) => {
    await redis(["LPUSH", CHECKS, JSON.stringify(c)]);
    await redis(["LTRIM", CHECKS, 0, MAX_CHECKS - 1]);
  },
  checks: async () => (await redis<string[]>(["LRANGE", CHECKS, 0, -1])).map((v) => parseJson<CheckRun>(v)).filter((c): c is CheckRun => !!c),
};

const g = globalThis as { __wfActivity?: { subscribers: Map<string, Subscriber>; events: ActivityEvent[]; checks: CheckRun[] } };
const mem = (g.__wfActivity ??= { subscribers: new Map(), events: [], checks: [] });
const memoryData: Data = {
  subscriber: async (email) => mem.subscribers.get(key(email)) ?? null,
  putSubscriber: async (s) => void mem.subscribers.set(key(s.email), s),
  removeSubscriber: async (email) => mem.subscribers.delete(key(email)),
  subscribers: async () => [...mem.subscribers.values()],
  addEvent: async (e) => void (mem.events = [e, ...mem.events].slice(0, MAX_EVENTS)),
  events: async () => [...mem.events],
  keepNewest: async (count) => void (mem.events = mem.events.slice(0, count)),
  removeEvents: async (email) => {
    const before = mem.events.length;
    mem.events = mem.events.filter((e) => e.email !== key(email));
    return before - mem.events.length;
  },
  addCheck: async (c) => void (mem.checks = [c, ...mem.checks].slice(0, MAX_CHECKS)),
  checks: async () => [...mem.checks],
};

function data(): Data | null {
  if (redisReady()) return redisData;
  return localOnly() ? memoryData : null;
}

/** Whether the dashboard has somewhere to read from. */
export const activityReady = () => !!data();

/** Runs a write that must never break the traveller's request. */
async function quietly(label: string, write: (d: Data) => Promise<void>) {
  const d = data();
  if (!d) return;
  try {
    await write(d);
  } catch (e) {
    console.error(`${label}: not recorded`, (e as Error).message);
  }
}

export const logEvent = (e: Omit<ActivityEvent, "at"> & { at?: number }) =>
  quietly("Activity", (d) => d.addEvent({ ...e, email: key(e.email), at: e.at ?? Date.now() }));

/** A confirmed homepage fare-alert sign-up. Confirming again keeps the first date. */
export const addSubscriber = (email: string, now = Date.now()) =>
  quietly("Subscriber", async (d) => {
    const existing = await d.subscriber(email);
    if (!existing) await d.putSubscriber({ email: key(email), confirmedAt: now });
    await d.addEvent({ at: now, type: "subscribed", email: key(email) });
  });

export const logCheck = (c: CheckRun) => quietly("Check run", (d) => d.addCheck(c));

/** Drops events past the retention period. Run by the daily check. */
export const pruneEvents = (now = Date.now()) =>
  quietly("Activity prune", async (d) => {
    const events = await d.events();
    const fresh = events.findIndex((e) => now - e.at >= EVENT_RETENTION_MS);
    if (fresh !== -1) await d.keepNewest(fresh);
  });

export type ActivitySnapshot = { subscribers: Subscriber[]; events: ActivityEvent[]; checks: CheckRun[] };

/** Everything the dashboard shows, newest first. Throws if the database fails. */
export async function readActivity(now = Date.now()): Promise<ActivitySnapshot | null> {
  const d = data();
  if (!d) return null;
  const [subscribers, events, checks] = await Promise.all([d.subscribers(), d.events(), d.checks()]);
  return {
    subscribers: subscribers.sort((a, b) => b.confirmedAt - a.confirmedAt),
    events: events.filter((e) => now - e.at < EVENT_RETENTION_MS),
    checks,
  };
}

/** Erasure request: the address leaves the subscriber list and the log. */
export async function forgetEmail(email: string): Promise<{ subscriber: boolean; events: number }> {
  const d = data();
  if (!d) return { subscriber: false, events: 0 };
  const subscriber = await d.removeSubscriber(email);
  return { subscriber, events: await d.removeEvents(email) };
}
