"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import {
  CURRENCY_COOKIE,
  CURRENCY_COOKIE_MAX_AGE,
  canShow,
  convert,
  formatMoney,
  isDisplayCurrency,
  roundConverted,
  type DisplayCurrency,
  type Rates,
} from "@/lib/currency";

// The visitor's currency lives in the wf_cur cookie (set from the country on
// the first visit by src/proxy.ts, or by the picker). Pages are prerendered in
// the currency each fare was found in; these hooks convert after hydration.
// Until then, CSS hides prices that are about to change (globals.css,
// "data-base"), so nobody sees £ turn into Rs.

const listeners = new Set<() => void>();
const noop = () => () => {};
const COOKIE = new RegExp(`(?:^|; )${CURRENCY_COOKIE}=([A-Z]{3})`);

/** The visitor's currency from the cookie (browser only). */
export function readDisplayCurrency(): DisplayCurrency | null {
  const v = COOKIE.exec(document.cookie)?.[1];
  // A code that isn't a currency in use (an old or edited cookie) shows dollars.
  return v ? (isDisplayCurrency(v) ? v : "USD") : null;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** Saves the visitor's choice and updates every price on the page. */
export function setDisplayCurrency(c: DisplayCurrency) {
  const secure = location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${CURRENCY_COOKIE}=${c}; path=/; max-age=${CURRENCY_COOKIE_MAX_AGE}; samesite=lax${secure}`;
  document.documentElement.dataset.cur = c;
  listeners.forEach((l) => l());
}

const RatesContext = createContext<Rates | null>(null);

/**
 * The currency prices are shown in: the visitor's, or US dollars if today's
 * rates don't cover it. Null on the server, during hydration, when none is
 * set, and when there are no rates (prices then stay as found).
 */
export function useDisplayCurrency(): DisplayCurrency | null {
  const chosen = useSyncExternalStore(subscribe, readDisplayCurrency, () => null);
  const rates = useContext(RatesContext);
  if (!chosen || !rates) return null;
  return canShow(chosen, rates) ? chosen : "USD";
}

export function CurrencyProvider({ rates, children }: { rates: Rates | null; children: React.ReactNode }) {
  return <RatesContext.Provider value={rates}>{children}</RatesContext.Provider>;
}

/**
 * `toDisplay(amount, from)`: the amount in the visitor's currency, rounded as
 * an estimate, or unchanged when no currency is set or no rate is known.
 */
export function useToDisplay() {
  const to = useDisplayCurrency();
  const rates = useContext(RatesContext);
  return useCallback(
    (amount: number, from: DisplayCurrency): { amount: number; currency: DisplayCurrency } => {
      if (!to || to === from) return { amount, currency: from };
      const v = convert(amount, from, to, rates);
      return v === null ? { amount, currency: from } : { amount: roundConverted(v), currency: to };
    },
    [to, rates],
  );
}

/** `money(amount, from)`: formatted in the visitor's currency ("Rs 68,600"). */
export function useMoney() {
  const toDisplay = useToDisplay();
  return useCallback(
    (amount: number, from: DisplayCurrency) => {
      const v = toDisplay(amount, from);
      return formatMoney(v.amount, v.currency);
    },
    [toDisplay],
  );
}

/** Today's exchange rates (units per US dollar), or null when unavailable. */
export function useRates() {
  return useContext(RatesContext);
}

/** A fare in the visitor's currency. Use it for every price rendered on the server. */
export function Price({ amount, currency, className }: { amount: number; currency: DisplayCurrency; className?: string }) {
  const money = useMoney();
  // Set on the first browser render whatever the outcome, so CSS never keeps a
  // price hidden (when no rates load, it shows in the currency it was found in).
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  return (
    <span className={className} data-base={currency} data-shown={hydrated ? "" : undefined}>
      {money(amount, currency)}
    </span>
  );
}
