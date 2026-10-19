"use client";

import { useId, useMemo, useSyncExternalStore } from "react";
import { CaretDown, Coins } from "@phosphor-icons/react";
import clsx from "clsx";
import { currencyName, isDisplayCurrency, moneySymbol } from "@/lib/currency";
import { setDisplayCurrency, useDisplayCurrency, useRates } from "./currency-provider";

const noop = () => () => {};

/**
 * The currency every price is shown in. A native select over a compact pill:
 * the phone's own picker on touch, type-to-find and full keyboard and screen
 * reader support everywhere. The options are every currency today's exchange
 * rates cover, by name; the current one first. "bar" sits in the header;
 * "row" is a full-width row in the phone menu.
 */
export function CurrencyPicker({ variant = "bar", className }: { variant?: "bar" | "row"; className?: string }) {
  const id = useId();
  const current = useDisplayCurrency();
  const rates = useRates();
  // Names and symbols come from the browser's Intl data, which can differ
  // slightly from the server's: build the list after hydration only.
  const hydrated = useSyncExternalStore(noop, () => true, () => false);

  const options = useMemo(() => {
    if (!hydrated || !rates) return [];
    return [...new Set(["USD", ...Object.keys(rates)])]
      .map((code) => ({ code, name: currencyName(code), symbol: moneySymbol(code) }))
      .sort((a, b) => a.name.localeCompare(b.name, "en-GB"));
  }, [hydrated, rates]);

  // Without exchange rates prices can't change currency: nothing to pick.
  if (!rates) return null;

  const label = (o: (typeof options)[number]) => `${o.name} (${o.code}${o.symbol !== o.code ? `, ${o.symbol}` : ""})`;
  const mine = options.find((o) => o.code === current);

  return (
    <div
      className={clsx(
        "relative flex shrink-0 items-center gap-1.5 rounded-full text-ink ring-1 ring-line transition-colors hover:bg-mist has-focus-visible:ring-2 has-focus-visible:ring-action",
        variant === "bar" ? "h-11 px-2.5 sm:px-3" : "h-14 px-4",
        className,
      )}
    >
      <Coins className={clsx("shrink-0 text-ink-soft", variant === "bar" ? "hidden size-[1.125rem] sm:block" : "size-5")} aria-hidden />
      {variant === "row" && <span className="flex-1 text-[0.9375rem] text-ink-soft">Prices in</span>}
      {/* Fixed width, so the header doesn't move when the code appears after loading. */}
      <span aria-hidden className="tabular w-[2.4rem] text-[0.9375rem] font-semibold">
        {current}
      </span>
      <CaretDown className="size-3.5 shrink-0 text-ink-soft" weight="bold" aria-hidden />
      <label htmlFor={id} className="sr-only">
        Currency for prices
      </label>
      <select
        id={id}
        value={current ?? ""}
        onChange={(e) => isDisplayCurrency(e.target.value) && setDisplayCurrency(e.target.value)}
        className="absolute inset-0 size-full cursor-pointer appearance-none rounded-full opacity-0"
      >
        {!mine && (
          <option value={current ?? ""} disabled={!current}>
            {current ?? "Choose a currency"}
          </option>
        )}
        {mine && (
          <optgroup label="Your currency">
            <option value={mine.code}>{label(mine)}</option>
          </optgroup>
        )}
        {options.length > 0 && (
          <optgroup label="All currencies">
            {options
              .filter((o) => o !== mine)
              .map((o) => (
                <option key={o.code} value={o.code}>
                  {label(o)}
                </option>
              ))}
          </optgroup>
        )}
      </select>
    </div>
  );
}
