// Checks shared by the form endpoints (/api/contact, /api/fare-alerts).
import { NextResponse } from "next/server";
import { site } from "@/content/site";

const siteHost = new URL(site.url).host;

/**
 * Cross-site request check. A browser always sends Origin on a POST, so a
 * form on another site can't post here (CSRF), and a JSON content type can't
 * be sent cross-site without a CORS preflight, which we never answer. Requests
 * without Origin and Sec-Fetch-Site don't come from a browser page, so there's
 * no visitor to forge them for.
 */
function crossSite(req: Request) {
  const origin = req.headers.get("origin");
  if (origin) {
    let host: string;
    try {
      host = new URL(origin).host;
    } catch {
      return true;
    }
    return host !== new URL(req.url).host && host !== siteHost;
  }
  const fetchSite = req.headers.get("sec-fetch-site");
  return !!fetchSite && fetchSite !== "same-origin" && fetchSite !== "none";
}

// Best-effort throttle, per server instance (instances are reused between
// requests, but a busy site runs several). A durable, site-wide limit needs a
// Vercel Firewall rate-limit rule on these paths (owner's dashboard).
const WINDOW_MS = 10 * 60_000;
const hits = new Map<string, number[]>();

function limited(key: string, max: number) {
  if (process.env.RATE_LIMIT === "off") return false; // e2e server: every request comes from localhost
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (now - v[v.length - 1] > WINDOW_MS) hits.delete(k);
  }
  return recent.length > max;
}

const clientIp = (req: Request) =>
  req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";

/**
 * Returns an error response when the request should be refused, or null.
 * `name` scopes the rate limit; `max` is requests per IP per 10 minutes.
 */
export function guardFormRequest(req: Request, name: string, max = 5): NextResponse | null {
  if (!req.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: "Send JSON" }, { status: 415 });
  }
  if (crossSite(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (limited(`${name}:${clientIp(req)}`, max)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429, headers: { "Retry-After": "600" } });
  }
  return null;
}
