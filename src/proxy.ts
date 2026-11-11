import { NextResponse, type NextRequest } from "next/server";
import { CURRENCY_COOKIE, CURRENCY_COOKIE_MAX_AGE, currencyForCountry } from "@/lib/currency";
import { CONSENT_REGION_COOKIE, CONSENT_REGION_MAX_AGE, needsOptIn } from "@/lib/consent-region";

/**
 * First visit only: picks the visitor's currency from their country (Vercel's
 * x-vercel-ip-country header) and remembers it in the wf_cur cookie, and
 * whether live search waits for cookie consent there (wf_geo, see
 * consent-region.ts). The matcher skips requests that already have both
 * cookies, so this runs once per visitor (and again monthly for wf_geo), not
 * on every page. Without a country (local development) no currency is set and
 * prices stay in the currency they were found in; live search waits for consent.
 *
 * Crawlers never keep cookies, so without the user-agent rule below this ran
 * on every page a bot fetched, each run a billed function call on Vercel. Bots
 * need neither cookie: the pages they read are the same either way.
 */
export function proxy(req: NextRequest) {
  const res = NextResponse.next();
  const country = req.headers.get("x-vercel-ip-country");
  const secure = req.nextUrl.protocol === "https:";
  if (!req.cookies.has(CONSENT_REGION_COOKIE)) {
    res.cookies.set(CONSENT_REGION_COOKIE, needsOptIn(country) ? "1" : "0", {
      path: "/",
      maxAge: CONSENT_REGION_MAX_AGE,
      sameSite: "lax",
      secure,
    });
  }
  const currency = req.cookies.has(CURRENCY_COOKIE) ? null : currencyForCountry(country);
  if (currency) {
    res.cookies.set(CURRENCY_COOKIE, currency, {
      path: "/",
      maxAge: CURRENCY_COOKIE_MAX_AGE,
      sameSite: "lax",
      secure,
    });
  }
  return res;
}

// Crawlers and scripted clients by user agent ("Googlebot/2.1", "compatible;
// bingbot/2.0", "facebookexternalhit/1.1", "curl/8"…). Next anchors the value
// (^…$), hence the .* on both sides. "bot/" rather than "bot" so phones whose
// model contains the letters (e.g. CUBOT) still get their cookies. Written out
// in each entry because the matcher must be a literal Next can read at build.
// Headless Chrome is left alone: the e2e tests run in it and need the cookies.

export const config = {
  matcher: [
    {
      // Pages only: not API routes, Next's files or anything with a file extension.
      source: "/((?!api/|_next/|_vercel/|.*\\.[a-z0-9]+$).*)",
      missing: [
        { type: "cookie", key: "wf_cur" },
        { type: "header", key: "user-agent", value: ".*(?:[Bb]ot/|[Bb]ot;|[Cc]rawler|[Ss]pider|[Ss]lurp|-User/|facebookexternalhit|meta-external|curl/|[Ww]get/|python-|Go-http-client|node-fetch|axios/|Scrapy).*" },
      ],
    },
    {
      source: "/((?!api/|_next/|_vercel/|.*\\.[a-z0-9]+$).*)",
      missing: [
        { type: "cookie", key: "wf_geo" },
        { type: "header", key: "user-agent", value: ".*(?:[Bb]ot/|[Bb]ot;|[Cc]rawler|[Ss]pider|[Ss]lurp|-User/|facebookexternalhit|meta-external|curl/|[Ww]get/|python-|Go-http-client|node-fetch|axios/|Scrapy).*" },
      ],
    },
  ],
};
