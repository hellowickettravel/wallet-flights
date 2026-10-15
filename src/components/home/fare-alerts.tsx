"use client";

import { useId, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { BellRinging, CheckCircle } from "@phosphor-icons/react";
import clsx from "clsx";

type State = { status: "idle" | "sending" | "done" } | { status: "error"; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function FareAlerts() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setState({ status: "error", message: "Enter an email address like name@example.com" });
      return;
    }
    setState({ status: "sending" });
    try {
      const res = await fetch("/api/fare-alerts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) throw new Error();
      setState({ status: "done" });
    } catch {
      setState({ status: "error", message: "We couldn’t sign you up just now. Please try again in a moment." });
    }
  }

  const error = state.status === "error" ? state.message : undefined;

  return (
    <section aria-labelledby="alerts-title" className="container-page pb-18 md:pb-28">
      <div className="relative overflow-hidden rounded-(--radius-frame) bg-action px-6 py-12 text-white sm:px-10 md:px-14 md:py-16">
        {/* route arc: a dotted flight path behind the copy */}
        <svg aria-hidden viewBox="0 0 600 200" className="pointer-events-none absolute -right-10 -bottom-6 w-[38rem] max-w-none opacity-25" fill="none">
          <path d="M10 190 C 160 20, 420 0, 590 120" stroke="white" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
          <circle cx="10" cy="190" r="6" fill="white" />
          <circle cx="590" cy="120" r="6" fill="white" />
        </svg>
        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <span className="grid size-12 place-items-center rounded-full bg-sun text-ink">
              <BellRinging className="size-6" weight="fill" aria-hidden />
            </span>
            <h2 id="alerts-title" className="mt-5 font-display-tight text-[2rem] leading-[1.08] font-bold md:text-[2.5rem]">
              Get fare alerts in your inbox
            </h2>
            <p className="mt-3 max-w-md text-[1.0625rem] leading-relaxed text-white/85">
              One email a week with fares worth knowing about. Unsubscribe any time.
            </p>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {state.status === "done" ? (
              <m.div
                key="done"
                role="status"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 rounded-2xl bg-white/12 p-5 ring-1 ring-white/25"
              >
                <CheckCircle className="size-8 shrink-0 text-sun" weight="fill" aria-hidden />
                <p className="text-[1.0625rem]">
                  <span className="font-semibold">You’re signed up.</span> Your first fare alert arrives next week.
                </p>
              </m.div>
            ) : (
              <m.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0, y: -8 }} className="w-full">
                <label htmlFor={id} className="mb-2 block text-[0.9375rem] font-medium text-white/90">
                  Email address
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id={id}
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
                      "h-14 min-w-0 flex-1 rounded-full bg-white px-6 text-[1.0625rem] text-ink outline-none placeholder:text-ink-soft/80 focus-visible:ring-4 focus-visible:ring-sun",
                      error && "ring-4 ring-red-300",
                    )}
                  />
                  <button
                    type="submit"
                    disabled={state.status === "sending"}
                    className="h-14 cursor-pointer rounded-full bg-sun px-8 text-[1.0625rem] font-semibold text-ink transition-colors hover:bg-[#ffd666] disabled:opacity-70"
                  >
                    {state.status === "sending" ? "Signing up…" : "Sign up"}
                  </button>
                </div>
                <p id={`${id}-err`} role="alert" className="mt-2 min-h-5 px-2 text-[0.875rem] font-medium text-white">
                  {error}
                </p>
              </m.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
