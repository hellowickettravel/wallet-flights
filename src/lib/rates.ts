// Exchange rates for showing fares in the visitor's currency. Source: the free,
// public-domain (CC0) daily currency files by fawazahmed0, served from jsDelivr
// with a Cloudflare Pages mirror. No key, no terms to accept.
// https://github.com/fawazahmed0/exchange-api
import { cacheLife, cacheTag } from "next/cache";
import { isDisplayCurrency, type Rates } from "@/lib/currency";

const SOURCES = [
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json",
  "https://latest.currency-api.pages.dev/v1/currencies/usd.min.json",
];

/** ISO codes for gold, silver, platinum, palladium and IMF accounting units: not money anyone pays in. */
const NOT_MONEY = new Set(["XAU", "XAG", "XPT", "XPD", "XDR", "XSU", "XUA", "XBA", "XBB", "XBC", "XBD", "XTS", "XXX"]);

/** Units per US dollar. Throws when no source answers, so a failure is never cached. */
async function fetchRates(): Promise<Rates> {
  "use cache";
  cacheLife("days");
  cacheTag("rates");
  for (const url of SOURCES) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) continue;
      const usd = ((await res.json()) as { usd?: Record<string, unknown> }).usd ?? {};
      // Every currency in use today that the feed prices: these are the
      // currencies the header offers. The feed also lists crypto and metals,
      // which Intl's list of currencies in use leaves out, apart from the
      // precious metals and IMF units below.
      const rates: Rates = {};
      for (const [code, value] of Object.entries(usd)) {
        const c = code.toUpperCase();
        const v = Number(value);
        if (isDisplayCurrency(c) && !NOT_MONEY.has(c) && Number.isFinite(v) && v > 0) rates[c] = v;
      }
      // Pounds are the other currency fares are found in: without them, nothing converts.
      if (rates.GBP) return rates;
    } catch {
      // try the mirror
    }
  }
  throw new Error("exchange rates unavailable");
}

/** Null when the rates can't be loaded: prices then stay in the currency they were found in. */
export async function getRates(): Promise<Rates | null> {
  try {
    return await fetchRates();
  } catch {
    return null;
  }
}
