import { NextResponse, type NextRequest } from "next/server";
import { CURRENCY_COOKIE, CURRENCY_COOKIE_MAX_AGE, currencyForCountry } from "@/lib/currency";

/**
 * First visit only: picks the visitor's currency from their country (Vercel's
 * x-vercel-ip-country header) and remembers it in the wf_cur cookie. The
 * matcher skips every request that already has the cookie, so this runs once
 * per visitor, not on every page. Without a country (local development) no
 * cookie is set and prices stay in the currency they were found in.
 */
export function proxy(req: NextRequest) {
  const res = NextResponse.next();
  const currency = currencyForCountry(req.headers.get("x-vercel-ip-country"));
  if (currency) {
    res.cookies.set(CURRENCY_COOKIE, currency, {
      path: "/",
      maxAge: CURRENCY_COOKIE_MAX_AGE,
      sameSite: "lax",
      secure: req.nextUrl.protocol === "https:",
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
  ],
};
