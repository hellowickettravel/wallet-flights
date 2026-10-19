// Display currencies: fares are found in pounds or dollars (src/lib/travelpayouts.ts)
// and shown in the visitor's currency. The first visit picks it from the
// country (src/proxy.ts); the header's picker changes it. Nothing here is a
// hand-picked list: the countries come from Unicode CLDR
// (src/content/country-currencies.ts, generated), the currencies on offer
// from the day's exchange rates (src/lib/rates.ts), and symbols from Intl.
// Shared by the server and the browser: no React, no server-only imports.
import { countryCurrencies } from "@/content/country-currencies";

/** An ISO 4217 currency code in use today ("PKR"). */
export type DisplayCurrency = string;

export const CURRENCY_COOKIE = "wf_cur";
/** A year: it's a preference, renewed whenever the visitor changes it. */
export const CURRENCY_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** The currencies in use today, as the runtime's own Intl data lists them. */
let inUse: Set<string> | null = null;
function currenciesInUse() {
  inUse ??= new Set(typeof Intl.supportedValuesOf === "function" ? Intl.supportedValuesOf("currency") : []);
  return inUse;
}

export const isDisplayCurrency = (v: unknown): v is DisplayCurrency =>
  typeof v === "string" && /^[A-Z]{3}$/.test(v) && (currenciesInUse().size === 0 || currenciesInUse().has(v));

/**
 * The currency of a visitor's country. Null when the country isn't known
 * (local development, no geo header): prices then stay in the currency they
 * were found in.
 */
export function currencyForCountry(country: string | null | undefined): DisplayCurrency | null {
  if (!country || !/^[A-Z]{2}$/.test(country)) return null;
  return countryCurrencies[country] ?? "USD";
}

/** Units of each currency per US dollar. */
export type Rates = Record<DisplayCurrency, number>;

/** Whether prices can be shown in this currency today. */
export const canShow = (c: DisplayCurrency, rates: Rates | null) => c === "USD" || !!rates?.[c];

/** `amount` in `from`, in `to`; null when a rate is missing. */
export function convert(amount: number, from: DisplayCurrency, to: DisplayCurrency, rates: Rates | null): number | null {
  if (from === to) return amount;
  const a = from === "USD" ? 1 : rates?.[from];
  const b = to === "USD" ? 1 : rates?.[to];
  return a && b ? (amount / a) * b : null;
}

/**
 * A converted fare is an estimate, so it's shown to three significant figures
 * ("PKR 68,600", not "PKR 68,573"); smaller amounts to the unit.
 */
export function roundConverted(n: number) {
  if (n < 1000) return Math.round(n);
  const step = 10 ** (Math.floor(Math.log10(n)) - 2);
  return Math.round(n / step) * step;
}

// Symbols. The short local one ("₹", "৳", "RM") when no other currency uses
// it; "$", "£", "€" and "¥" belong to the currencies the world reads them as.
// Otherwise the marked form ("CA$", "HK$") or the code ("PKR": Rs is also the
// Sri Lankan and Nepalese rupee).
const WORLD_SYMBOL: Record<string, DisplayCurrency> = { $: "USD", "£": "GBP", "€": "EUR", "¥": "JPY" };
const symbolOf = (c: DisplayCurrency, display: "narrowSymbol" | "symbol") =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: c, currencyDisplay: display }).formatToParts(0).find((p) => p.type === "currency")!.value;

let narrowCounts: Map<string, number> | null = null;
function narrowIsUnique(symbol: string) {
  if (!narrowCounts) {
    narrowCounts = new Map();
    for (const c of currenciesInUse()) {
      const s = symbolOf(c, "narrowSymbol");
      narrowCounts.set(s, (narrowCounts.get(s) ?? 0) + 1);
    }
  }
  return narrowCounts.get(symbol) === 1;
}

const formatters = new Map<DisplayCurrency, Intl.NumberFormat>();
function formatter(c: DisplayCurrency) {
  let f = formatters.get(c);
  if (!f) {
    const narrow = symbolOf(c, "narrowSymbol");
    const useNarrow = narrow !== c && (WORLD_SYMBOL[narrow] === c || (!WORLD_SYMBOL[narrow] && narrowIsUnique(narrow)));
    f = new Intl.NumberFormat(c === "USD" ? "en-US" : "en-GB", {
      style: "currency",
      currency: c,
      maximumFractionDigits: 0,
      currencyDisplay: useNarrow ? "narrowSymbol" : "symbol",
    });
    formatters.set(c, f);
  }
  return f;
}

export const formatMoney = (amount: number, c: DisplayCurrency) => formatter(c).format(amount);

/** The symbol alone ("£", "CA$", "PKR"), e.g. before a price input. */
export const moneySymbol = (c: DisplayCurrency) =>
  formatter(c)
    .formatToParts(0)
    .find((p) => p.type === "currency")!.value;

/** A short number for tight spaces (board tiles, grid cells): "247", "1240", "113K", "3.5M". */
export function compactNumber(n: number) {
  if (n < 10_000) return String(Math.round(n));
  if (n < 999_500) return `${Math.round(n / 1000)}K`;
  const m = n / 1_000_000;
  return `${m < 9.95 ? m.toFixed(1).replace(/\.0$/, "") : Math.round(m)}M`;
}

/** The symbol when it's one character ("£", "₹"), else "" (name the currency once nearby: "PKR"). */
export const shortSymbol = (c: DisplayCurrency) => {
  const sym = moneySymbol(c);
  return [...sym].length === 1 ? sym : "";
};

/** "£45", "₹21K", or "118K" when the currency's symbol is longer than one character. */
export const compactMoney = (amount: number, c: DisplayCurrency) => `${shortSymbol(c)}${compactNumber(amount)}`;

/** "Pakistani Rupee" */
export const currencyName = (c: DisplayCurrency) => {
  try {
    return new Intl.DisplayNames(["en-GB"], { type: "currency" }).of(c) ?? c;
  } catch {
    return c;
  }
};
