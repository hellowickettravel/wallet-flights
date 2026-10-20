// The site's one database: Redis over its REST API. In Vercel, Storage →
// Upstash for Redis sets KV_REST_API_URL and KV_REST_API_TOKEN (the
// UPSTASH_REDIS_REST_* names work too). Price alerts, fare-alert subscribers
// and the admin activity log live here. Development and the e2e server keep
// them in memory instead.

const restUrl = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const restToken = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

/** Whether the database is configured. */
export const redisReady = () => !!(restUrl() && restToken());

/** Development and dry runs (the e2e server) may keep data in memory. */
export const localOnly = () => process.env.EMAIL_DRY_RUN === "1" || process.env.NODE_ENV !== "production";

/** Runs one Redis command, e.g. `["HGET", key, field]`. */
export async function redis<T>(command: (string | number)[]): Promise<T> {
  const res = await fetch(restUrl()!, {
    method: "POST",
    headers: { Authorization: `Bearer ${restToken()}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Database error ${res.status}`);
  return ((await res.json()) as { result: T }).result;
}

export function parseJson<T>(json: string | null): T | null {
  if (!json) return null;
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}
