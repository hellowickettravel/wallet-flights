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

export const config = {
  matcher: [
    {
      // Pages only: not API routes, Next's files or anything with a file extension.
      source: "/((?!api/|_next/|_vercel/|.*\\.[a-z0-9]+$).*)",
      missing: [{ type: "cookie", key: "wf_cur" }],
    },
    {
      source: "/((?!api/|_next/|_vercel/|.*\\.[a-z0-9]+$).*)",
      missing: [{ type: "cookie", key: "wf_geo" }],
    },
  ],
};
