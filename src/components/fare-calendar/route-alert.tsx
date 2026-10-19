"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { BellRinging, CheckCircle, EnvelopeSimple, TrendDown } from "@phosphor-icons/react";
import clsx from "clsx";
import { currencySymbol, formatPrice, type Currency } from "@/content/deals";
import { roundConverted } from "@/lib/currency";
import { useToDisplay } from "@/components/currency/currency-provider";
import { priceAlertCopy as copy, tripText } from "@/content/fare-calendar";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type State = { status: "idle" | "sending" | "done" } | { status: "error"; field: "email" | "price" | "form"; message: string };

type Props = {
  from: { code: string; city: string };
  to: { code: string; city: string };
  trip: "return" | "oneway";
  nights: number;
  /** The cheapest fare the calendar has for this route and trip, before filters. */
  cheapest: number | null;
  currency: Currency;
};

/**
 * "Email me when this route drops below £X." Double opt-in through
 * /api/price-alerts; the daily check emails when the cheapest fare, counted
 * the same way as the calendar, is at or below the visitor's price. Only
 * rendered when alerts can really be sent (see priceAlertsReady).
 */
export function RouteAlert({ from, to, trip, nights, cheapest, currency }: Props) {
  const id = useId();
  const [email, setEmail] = useState("");
  // The alert is in the visitor's currency: today's cheapest fare converted,
  // and the price they type is in that currency too.
  const toDisplay = useToDisplay();
  const now = cheapest === null ? null : toDisplay(cheapest, currency);
  const alertCurrency = now?.currency ?? toDisplay(1, currency).currency;
  // A little under today's cheapest fare: a price worth hearing about.
  const suggest = () => (now ? String(Math.max(1, roundConverted(Math.floor(now.amount * 0.95)))) : "");
  const [price, setPrice] = useState(suggest);
  // Switching currency in the header starts the suggestion again in the new one.
  const [priceCurrency, setPriceCurrency] = useState(alertCurrency);
  if (priceCurrency !== alertCurrency) {
    setPriceCurrency(alertCurrency);
    setPrice(suggest());
  }
  const [state, setState] = useState<State>({ status: "idle" });
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const trip_ = tripText(trip, nights);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const max = Number(price);
    if (!EMAIL.test(email.trim())) return setState({ status: "error", field: "email", message: copy.invalid });
    if (!(max >= 1 && max <= 100_000)) return setState({ status: "error", field: "price", message: copy.invalidPrice });
    setState({ status: "sending" });
    try {
      const res = await fetch("/api/price-alerts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          from,
          to,
          trip,
          nights,
          max: Math.round(max),
          currency: alertCurrency,
          company: (formRef.current?.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "",
          startedAt: startedAt.current,
        }),
      });
      if (!res.ok) throw new Error();
      setState({ status: "done" });
    } catch {
      setState({ status: "error", field: "form", message: copy.failed });
    }
  }

  const error = state.status === "error" ? state : null;
  const clear = () => state.status === "error" && setState({ status: "idle" });
  const field = "h-12 w-full rounded-xl bg-white text-base text-ink ring-1 ring-line outline-none transition-shadow placeholder:text-ink-soft focus-within:ring-2 focus-within:ring-action focus-visible:ring-2 focus-visible:ring-action";

  return (
    <section aria-labelledby={`${id}-title`} data-testid="route-alert" className="rounded-(--radius-panel) bg-white p-5 ring-1 ring-line md:p-7">
      <div className="grid gap-5">
        <div className="flex gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mist text-action">
            <BellRinging weight="fill" className="size-6" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[0.75rem] font-semibold tracking-[0.08em] text-action uppercase">{copy.badge}</p>
            <h2 id={`${id}-title`} className="mt-1 font-display-tight text-[1.375rem] leading-tight font-bold text-balance text-ink md:text-[1.5rem]">
              {copy.title(from.city, to.city)}
            </h2>
            <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">{copy.intro(trip_)}</p>
            {cheapest !== null && (
              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-mist px-3 py-1 text-[0.8125rem] text-ink">
                <TrendDown weight="bold" className="size-4 text-fare" aria-hidden />
                {copy.now}
                <span className="tabular font-bold text-fare">{now && formatPrice(now.amount, now.currency)}</span>
              </p>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {state.status === "done" ? (
            <m.div key="done" role="status" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 rounded-2xl bg-mist p-5">
              <CheckCircle className="size-8 shrink-0 text-fare" weight="fill" aria-hidden />
              <p className="text-ink">
                <span className="font-semibold">{copy.doneTitle}</span> {copy.doneText}
              </p>
            </m.div>
          ) : (
            <m.form key="form" ref={formRef} onSubmit={submit} noValidate exit={{ opacity: 0, y: -8 }}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-[minmax(0,1fr)_9rem_auto]">
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor={`${id}-email`} className="mb-1.5 block text-[0.8125rem] font-semibold text-ink">
                    {copy.email}
                  </label>
                  <div className={clsx(field, "flex items-center gap-2 px-3.5", error?.field === "email" && "ring-2 ring-dear")}>
                    <EnvelopeSimple className="size-5 shrink-0 text-ink-soft" aria-hidden />
                    <input
                      id={`${id}-email`}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clear();
                      }}
                      aria-invalid={error?.field === "email"}
                      aria-describedby={`${id}-msg`}
                      className="h-full w-full min-w-0 bg-transparent outline-none placeholder:text-ink-soft"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor={`${id}-price`} className="mb-1.5 block text-[0.8125rem] font-semibold text-ink">
                    {copy.below}
                  </label>
                  <div className={clsx(field, "flex items-center px-3.5", error?.field === "price" && "ring-2 ring-dear")}>
                    <span aria-hidden className="font-semibold text-ink-soft">
                      {currencySymbol(alertCurrency)}
                    </span>
                    <input
                      id={`${id}-price`}
                      type="number"
                      inputMode="numeric"
                      min={1}
                      step={1}
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                        clear();
                      }}
                      aria-invalid={error?.field === "price"}
                      aria-describedby={`${id}-msg`}
                      className="tabular h-full w-full min-w-0 bg-transparent pl-1 font-semibold outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={state.status === "sending"}
                  className="h-12 cursor-pointer self-end rounded-xl bg-action px-6 font-semibold whitespace-nowrap text-white transition-[background-color,scale] hover:bg-action-deep active:scale-[0.98] disabled:opacity-70"
                >
                  {state.status === "sending" ? copy.sending : copy.submit}
                </button>
              </div>
              {/* Honeypot for bots: hidden from people and assistive tech. */}
              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label>
                  Company
                  <input name="company" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <p id={`${id}-msg`} role="alert" className="mt-2 min-h-5 text-[0.8125rem] font-medium text-dear empty:min-h-0 empty:mt-0">
                {error?.message}
              </p>
              <p className="mt-2 text-[0.8125rem] text-ink-soft">{copy.small}</p>
            </m.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
