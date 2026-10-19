"use client";

import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, m } from "motion/react";
import { CaretDown, Check, Coins, MagnifyingGlass } from "@phosphor-icons/react";
import clsx from "clsx";
import { countryCurrencies } from "@/content/country-currencies";
import { currencyCopy as copy } from "@/content/currency";
import { currencyName, moneySymbol } from "@/lib/currency";
import { setDisplayCurrency, useDisplayCurrency, useRates } from "./currency-provider";

const noop = () => () => {};
type Option = { code: string; name: string; symbol: string; countries: string[] };

/** Every currency today's rates cover, with the countries that use it (for search), by name. */
function buildOptions(codes: string[]): Option[] {
  const regions = new Intl.DisplayNames(["en-GB"], { type: "region" });
  const byCurrency = new Map<string, string[]>();
  for (const [country, currency] of Object.entries(countryCurrencies)) {
    let name: string | undefined;
    try {
      name = regions.of(country);
    } catch {}
    if (name && name !== country) byCurrency.set(currency, [...(byCurrency.get(currency) ?? []), name]);
  }
  return codes
    .map((code) => ({ code, name: currencyName(code), symbol: moneySymbol(code), countries: byCurrency.get(code) ?? [] }))
    .sort((a, b) => a.name.localeCompare(b.name, "en-GB"));
}

const fold = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

/**
 * The currency every price is shown in. A pill opens a panel with a search
 * box (code, currency or country: "PKR", "rupee", "Pakistan") over the list of
 * every currency today's exchange rates cover, the visitor's own first.
 * Combobox pattern: arrows move, Enter picks, Escape closes. "bar" floats
 * under the header pill; "row" opens in place inside the phone menu.
 */
export function CurrencyPicker({ variant = "bar", className }: { variant?: "bar" | "row"; className?: string }) {
  const id = useId();
  const current = useDisplayCurrency();
  const rates = useRates();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  // Names come from the browser's Intl data, which can differ slightly from
  // the server's: build the list in the browser only.
  const hydrated = useSyncExternalStore(noop, () => true, () => false);

  const options = useMemo(() => (hydrated && rates ? buildOptions([...new Set(["USD", ...Object.keys(rates)])]) : []), [hydrated, rates]);

  // With no search: the visitor's currency first. With one: every match, codes first.
  const shown = useMemo(() => {
    const q = fold(query.trim());
    if (!q) {
      const mine = options.find((o) => o.code === current);
      return mine ? [mine, ...options.filter((o) => o !== mine)] : options;
    }
    const rank = (o: Option) =>
      fold(o.code).startsWith(q) ? 0 : fold(o.name).includes(q) ? 1 : o.countries.some((c) => fold(c).includes(q)) ? 2 : -1;
    return options
      .map((o) => ({ o, r: rank(o) }))
      .filter((x) => x.r >= 0)
      .sort((a, b) => a.r - b.r)
      .map((x) => x.o);
  }, [options, query, current]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Keep the keyboard's row in view.
  useEffect(() => {
    if (open) list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  // Without exchange rates prices can't change currency: nothing to pick.
  if (!rates) return null;

  function show() {
    setQuery("");
    setActive(0);
    setOpen(true);
  }
  function close(focusTrigger = true) {
    setOpen(false);
    if (focusTrigger) trigger.current?.focus();
  }
  function pick(code: string) {
    setDisplayCurrency(code);
    close();
  }
  function onKeyDown(e: React.KeyboardEvent) {
    const n = shown.length;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (n) setActive((a) => (e.key === "ArrowDown" ? (a + 1) % n : (a - 1 + n) % n));
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      setActive(e.key === "Home" ? 0 : Math.max(0, n - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (shown[active]) pick(shown[active].code);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") close(false);
  }

  const optionId = (code: string) => `${id}-opt-${code}`;
  const q = fold(query.trim());
  const row = variant === "row";

  return (
    <div ref={wrap} className={clsx("relative", className)}>
      <button
        ref={trigger}
        type="button"
        aria-haspopup="dialog"
        aria-label={current ? copy.label(current) : copy.choose}
        aria-expanded={open}
        aria-controls={open ? `${id}-panel` : undefined}
        onClick={() => (open ? close(false) : show())}
        className={clsx(
          "flex w-full shrink-0 cursor-pointer items-center gap-1.5 rounded-full text-ink ring-1 transition-colors hover:bg-mist focus-visible:ring-2 focus-visible:ring-action",
          open ? "bg-mist ring-ink/20" : "ring-line",
          row ? "h-14 px-4" : "h-11 px-2.5 sm:px-3",
        )}
      >
        <Coins className={clsx("shrink-0 text-ink-soft", row ? "size-5" : "hidden size-[1.125rem] sm:block")} aria-hidden />
        {row && <span className="flex-1 text-left text-[0.9375rem] text-ink-soft">{copy.rowLabel}</span>}
        {/* Fixed width, so the header doesn't move when the code appears after loading. */}
        <span aria-hidden className="tabular w-[2.4rem] text-left text-[0.9375rem] font-semibold">
          {current}
        </span>
        <CaretDown className={clsx("size-3.5 shrink-0 text-ink-soft transition-transform duration-200 motion-reduce:transition-none", open && "rotate-180")} weight="bold" aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id={`${id}-panel`}
            role="dialog"
            aria-label={copy.title}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={clsx(
              "z-50 overflow-hidden rounded-2xl bg-white text-ink ring-1 ring-line",
              row
                ? "mt-2"
                : // Under the pill on wide screens; across the screen on phones (the header spans the width).
                  "shadow-(--shadow-pop) max-sm:fixed max-sm:inset-x-4 max-sm:top-[4.75rem] sm:absolute sm:top-[calc(100%+8px)] sm:right-0 sm:w-[22rem] sm:origin-top-right",
            )}
          >
            <div className="border-b border-line p-3">
              <p className="px-1 font-semibold">{copy.title}</p>
              <p className="mt-0.5 px-1 text-[0.8125rem] leading-snug text-ink-soft">{copy.note}</p>
              <div className="mt-3 flex h-11 items-center gap-2 rounded-xl bg-mist px-3 ring-1 ring-transparent focus-within:bg-white focus-within:ring-2 focus-within:ring-action">
                <MagnifyingGlass className="size-[1.125rem] shrink-0 text-ink-soft" aria-hidden />
                <input
                  type="text"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls={`${id}-list`}
                  aria-autocomplete="list"
                  aria-activedescendant={shown[active] ? optionId(shown[active].code) : undefined}
                  aria-label={copy.search}
                  placeholder={copy.search}
                  autoComplete="off"
                  spellCheck={false}
                  autoFocus
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={onKeyDown}
                  className="h-full w-full min-w-0 bg-transparent text-base outline-none placeholder:text-ink-soft"
                />
              </div>
            </div>

            <ul ref={list} id={`${id}-list`} role="listbox" aria-label={copy.title} className={clsx("overflow-y-auto overscroll-contain p-1.5", row ? "max-h-64" : "max-h-[min(20rem,calc(100dvh-14rem))]")}>
              {shown.map((o, i) => {
                const selected = o.code === current;
                const viaCountry = q && !fold(o.code).startsWith(q) && !fold(o.name).includes(q) ? o.countries.find((c) => fold(c).includes(q)) : undefined;
                return (
                  <li key={o.code} role="presentation">
                    {/* With no search, the visitor's own currency comes first under its own label. */}
                    {!q && i === 0 && current && <p aria-hidden className="mx-2.5 mt-1 mb-1 text-[0.75rem] font-semibold text-ink-soft">{copy.mine}</p>}
                    {!q && i === 1 && current && <p aria-hidden className="mx-2.5 mt-1.5 mb-1 border-t border-line pt-2.5 text-[0.75rem] font-semibold text-ink-soft">{copy.all}</p>}
                    <div
                      id={optionId(o.code)}
                      role="option"
                      aria-selected={selected}
                      data-index={i}
                      onPointerMove={() => setActive(i)}
                      onClick={() => pick(o.code)}
                      className={clsx("flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2", i === active && "bg-mist")}
                    >
                      <span className={clsx("tabular w-10 shrink-0 text-[0.875rem] font-semibold", selected ? "text-action" : "text-ink")}>{o.code}</span>
                      <span className="min-w-0 flex-1">
                        <span className={clsx("block truncate text-[0.9375rem]", selected && "font-semibold")}>{o.name}</span>
                        {viaCountry && <span className="block truncate text-[0.8125rem] text-ink-soft">{copy.usedIn(viaCountry)}</span>}
                      </span>
                      {o.symbol !== o.code && <span className="shrink-0 text-[0.875rem] text-ink-soft">{o.symbol}</span>}
                      <Check weight="bold" className={clsx("size-4 shrink-0 text-action", !selected && "invisible")} aria-hidden />
                    </div>
                  </li>
                );
              })}
              {shown.length === 0 && <li className="px-3 py-6 text-center text-[0.9375rem] text-ink-soft">{copy.none(query.trim())}</li>}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
