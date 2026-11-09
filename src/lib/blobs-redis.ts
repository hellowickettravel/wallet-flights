// The Redis commands the site uses (src/lib/redis.ts), kept in Netlify Blobs
// when the site runs on Netlify without an Upstash database. Same results as
// Redis for the calls in activity.ts and price-alerts.ts:
// - a hash keeps one blob per field ("<key>/<field>"), so two writes to
//   different fields (two sign-ups at once) never overwrite each other;
// - a list (the activity log, the price-check runs) is one JSON array,
//   rewritten only if nobody changed it in between (etag), retried otherwise.
// Previews get their own store, so they never touch production data.
import { getStore } from "@netlify/blobs";
import { isProductionDeploy } from "@/lib/deploy-env";

type Cmd = (string | number)[];

const store = () =>
  getStore({ name: isProductionDeploy() ? "wf-data" : "wf-data-preview", consistency: "strong" });

const fieldKey = (key: string, field: string) => `h/${key}/${encodeURIComponent(field)}`;
const hashPrefix = (key: string) => `h/${key}/`;
const listKey = (key: string) => `l/${key}`;

async function hashFields(key: string) {
  const s = store();
  const { blobs } = await s.list({ prefix: hashPrefix(key) });
  return blobs.map((b) => b.key);
}

async function readList(key: string) {
  const entry = await store().getWithMetadata(listKey(key), { type: "json" });
  return { items: (entry?.data as string[] | null) ?? [], etag: entry?.etag };
}

/** Read, change and write a list, retrying if another write got there first. */
async function updateList<R>(key: string, change: (items: string[]) => { items: string[]; result: R }): Promise<R> {
  const s = store();
  for (let attempt = 0; attempt < 20; attempt++) {
    // Spread retries out so writes that collided don't collide again.
    if (attempt) await new Promise((r) => setTimeout(r, 10 + Math.random() * 40 * attempt));
    const { items, etag } = await readList(key);
    const next = change(items);
    const { modified } = etag
      ? await s.setJSON(listKey(key), next.items, { onlyIfMatch: etag })
      : await s.setJSON(listKey(key), next.items, { onlyIfNew: true });
    if (modified) return next.result;
  }
  throw new Error(`Database busy: ${key}`);
}

/** Redis-style slice: inclusive stop, negative indexes count from the end. */
function range(items: string[], start: number, stop: number) {
  const n = items.length;
  const from = start < 0 ? Math.max(n + start, 0) : start;
  const to = stop < 0 ? n + stop : Math.min(stop, n - 1);
  return from > to ? [] : items.slice(from, to + 1);
}

export async function blobsCommand<T>(command: Cmd): Promise<T> {
  const [op, rawKey, ...args] = command;
  const key = String(rawKey);
  const s = store();
  switch (op) {
    case "HGET":
      return (await s.get(fieldKey(key, String(args[0])), { type: "text" })) as T;
    case "HSET": {
      let added = 0;
      for (let i = 0; i < args.length; i += 2) {
        const k = fieldKey(key, String(args[i]));
        const isNew = (await s.getMetadata(k)) === null;
        await s.set(k, String(args[i + 1]));
        if (isNew) added++;
      }
      return added as T;
    }
    case "HDEL": {
      let removed = 0;
      for (const field of args) {
        const k = fieldKey(key, String(field));
        if ((await s.getMetadata(k)) !== null) {
          await s.delete(k);
          removed++;
        }
      }
      return removed as T;
    }
    case "HGETALL": {
      const keys = await hashFields(key);
      const values = await Promise.all(keys.map((k) => s.get(k, { type: "text" })));
      return keys.flatMap((k, i) =>
        values[i] === null ? [] : [decodeURIComponent(k.slice(hashPrefix(key).length)), values[i] as string],
      ) as T;
    }
    case "HLEN":
      return (await hashFields(key)).length as T;
    case "LPUSH":
      return updateList(key, (items) => {
        const next = [...args.map(String).reverse(), ...items];
        return { items: next, result: next.length };
      }) as Promise<T>;
    case "LTRIM":
      return updateList(key, (items) => ({ items: range(items, Number(args[0]), Number(args[1])), result: "OK" })) as Promise<T>;
    case "LRANGE":
      return range((await readList(key)).items, Number(args[0]), Number(args[1])) as T;
    case "LREM": {
      const value = String(args[1]);
      return updateList(key, (items) => {
        const next = items.filter((v) => v !== value);
        return { items: next, result: items.length - next.length };
      }) as Promise<T>;
    }
    case "DEL": {
      let removed = 0;
      if ((await s.getMetadata(listKey(key))) !== null) {
        await s.delete(listKey(key));
        removed++;
      }
      const fields = await hashFields(key);
      await Promise.all(fields.map((k) => s.delete(k)));
      if (fields.length) removed++;
      return removed as T;
    }
    default:
      throw new Error(`Unsupported database command: ${String(op)}`);
  }
}
