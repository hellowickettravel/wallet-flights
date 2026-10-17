"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { BellRinging, CheckCircle } from "@phosphor-icons/react";
import clsx from "clsx";
import { currencySymbol, type Currency } from "@/content/deals";
import { fareCalendarCopy } from "@/content/fare-calendar";

const copy = fareCalendarCopy.alert;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type State = { status: "idle" | "sending" | "done" } | { status: "error"; message: string };

type Props = {
  from: { code: string; city: string };
  to: { code: string; city: string };
  /** Suggested target: a little under the cheapest fare on screen. */
  suggested: number | null;
  currency: Currency;
};

/**
 * Route alert sign-up. Uses the existing fare-alerts double opt-in
 * (/api/fare-alerts): the route and target travel with the request.
 * TODO(confirm): /api/fare-alerts stores only the email today; keep the route
 * and price once route alerts send emails.
 */
export function RouteAlert({ from, to, suggested, currency }: Props) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState<string | null>(null); // null = use the suggestion
  const [state, setState] = useState<State>({ status: "idle" });
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const target = price ?? (suggested ? String(suggested) : "");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) return setState({ status: "error", message: copy.invalid });
    setState({ status: "sending" });
    try {
      const res = await fetch("/api/fare-alerts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          company: (formRef.current?.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "",
          startedAt: startedAt.current,
          route: { from: from.code, to: to.code },
          below: Number(target) || undefined,
          currency,
          source: "fare_calendar",
        }),
      });
      if (!res.ok) throw new Error();
      setState({ status: "done" });
    } catch {
      setState({ status: "error", message: copy.failed });
    }
  }

  const error = state.status === "error" ? state.message : undefined;

  return (
    <section aria-labelledby="alert-title" className="relative overflow-hidden rounded-(--radius-panel) bg-action p-6 text-white md:p-8">
      <svg aria-hidden viewBox="0 0 600 200" className="pointer-events-none absolute -right-16 -bottom-10 w-[30rem] max-w-none opacity-20" fill="none">
        <path d="M10 190 C 160 20, 420 0, 590 120" stroke="white" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
        <circle cx="10" cy="190" r="6" fill="white" />
        <circle cx="590" cy="120" r="6" fill="white" />
      </svg>
      <div className="relative grid gap-6 2xl:grid-cols-[1fr_1.3fr] 2xl:items-center">
        <div>
          <span className="grid size-11 place-items-center rounded-full bg-sun text-ink">
            <BellRinging className="size-5" weight="fill" aria-hidden />
          </span>
          <h2 id="alert-title" className="mt-4 font-display-tight text-[1.5rem] leading-tight font-bold md:text-[1.75rem]">
            {copy.title(from.city, to.city)}
          </h2>
          <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-white/85">{copy.intro}</p>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {state.status === "done" ? (
            <m.div key="done" role="status" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 rounded-2xl bg-white/12 p-5 ring-1 ring-white/25">
              <CheckCircle className="size-8 shrink-0 text-sun" weight="fill" aria-hidden />
              <p>
                <span className="font-semibold">{copy.doneTitle}</span> {copy.doneText}
              </p>
            </m.div>
          ) : (
            <m.form key="form" ref={formRef} onSubmit={submit} noValidate exit={{ opacity: 0, y: -8 }}>
              <div className="grid gap-3 sm:grid-cols-[1fr_9.5rem_auto]">
                <div>
                  <label htmlFor={`${id}-email`} className="mb-1.5 block text-[0.8125rem] font-medium text-white/90">
                    {copy.email}
                  </label>
                  <input
                    id={`${id}-email`}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (state.status === "error") setState({ status: "idle" });
                    }}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-err` : undefined}
                    className={clsx(
                      "h-13 w-full rounded-xl bg-white px-4 text-ink outline-none placeholder:text-ink-soft focus-visible:ring-4 focus-visible:ring-sun",
                      error && "ring-4 ring-red-300",
                    )}
                  />
                </div>
                <div>
                  <label htmlFor={`${id}-price`} className="mb-1.5 block text-[0.8125rem] font-medium text-white/90">
                    {copy.below}
                  </label>
                  <div className="flex h-13 items-center rounded-xl bg-white px-4 text-ink focus-within:ring-4 focus-within:ring-sun">
                    <span aria-hidden className="font-semibold text-ink-soft">
                      {currencySymbol(currency)}
                    </span>
                    <input
                      id={`${id}-price`}
                      type="number"
                      inputMode="numeric"
                      min={1}
                      value={target}
                      onChange={(e) => setPrice(e.target.value)}
                      className="tabular w-full min-w-0 bg-transparent pl-1 font-semibold outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={state.status === "sending"}
                  className="h-13 cursor-pointer self-end rounded-xl bg-sun px-6 font-semibold whitespace-nowrap text-ink transition-colors hover:bg-[#ffd666] disabled:opacity-70"
                >
                  {state.status === "sending" ? copy.sending : copy.submit}
                </button>
              </div>
              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label>
                  Company
                  <input name="company" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <p id={`${id}-err`} role="alert" className="mt-2 min-h-5 text-[0.875rem] font-medium text-white">
                {error}
              </p>
            </m.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
