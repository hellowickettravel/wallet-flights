"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { BellRinging, BellSlash, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { buttonClass } from "@/components/ui/button";
import { priceAlertCopy } from "@/content/fare-calendar";

type State = { status: "idle" | "sending" | "invalid" | "error" } | { status: "done"; route?: string; price?: string; calendar?: string };

/**
 * The emailed links for route price alerts land here: "confirm" starts the
 * alert, "stop" ends it. Either way the visitor presses a button, so mail
 * scanners that open links can't change anything.
 */
export function PriceAlertAction({ mode }: { mode: "confirm" | "stop" }) {
  const token = useSearchParams().get("t") ?? "";
  const copy = mode === "confirm" ? priceAlertCopy.confirm : priceAlertCopy.stop;
  const [state, setState] = useState<State>({ status: token ? "idle" : "invalid" });

  async function act() {
    setState({ status: "sending" });
    try {
      const res = await fetch(`/api/price-alerts/${mode}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ t: token }),
      });
      if (res.ok) setState({ status: "done", ...((await res.json()) as { route?: string; price?: string; calendar?: string }) });
      else setState({ status: res.status === 400 || res.status === 410 ? "invalid" : "error" });
    } catch {
      setState({ status: "error" });
    }
  }

  const card = "mx-auto max-w-lg rounded-(--radius-frame) bg-white p-8 text-center shadow-(--shadow-float) ring-1 ring-line sm:p-12";
  const heading = "mt-4 font-display-tight text-[1.75rem] leading-tight font-extrabold text-balance text-ink";

  if (state.status === "done") {
    const text =
      mode === "confirm" && state.route && state.price ? priceAlertCopy.confirm.doneText(state.route, state.price) : priceAlertCopy.stop.doneText;
    return (
      <div className={card} role="status">
        <CheckCircle className="mx-auto size-11 text-fare" weight="fill" aria-hidden />
        <h1 className={heading}>{copy.doneTitle}</h1>
        <p className="mt-3 text-ink-soft">{text}</p>
        <Link href={state.calendar ?? "/fare-calendar"} className={buttonClass("primary", "md", "mt-8")}>
          {copy.back}
        </Link>
      </div>
    );
  }

  if (state.status === "invalid") {
    return (
      <div className={card}>
        <WarningCircle className="mx-auto size-11 text-ink-soft" aria-hidden />
        <h1 className={heading}>{mode === "confirm" ? priceAlertCopy.confirm.expiredTitle : priceAlertCopy.stop.invalidTitle}</h1>
        <p className="mt-3 text-ink-soft">{mode === "confirm" ? priceAlertCopy.confirm.expiredText : priceAlertCopy.stop.invalidText}</p>
        <Link href={mode === "confirm" ? "/fare-calendar" : "/contact"} className={buttonClass("primary", "md", "mt-8")}>
          {mode === "confirm" ? copy.back : "Contact us"}
        </Link>
      </div>
    );
  }

  const Icon = mode === "confirm" ? BellRinging : BellSlash;
  return (
    <div className={card}>
      <span className="mx-auto grid size-12 place-items-center rounded-full bg-mist text-action">
        <Icon className="size-6" weight="fill" aria-hidden />
      </span>
      <h1 className={heading}>{copy.title}</h1>
      <p className="mt-3 text-ink-soft">{copy.text}</p>
      <button type="button" onClick={act} disabled={state.status === "sending"} className={buttonClass("primary", "lg", "mt-8")}>
        {state.status === "sending" ? copy.sending : copy.button}
      </button>
      <p role="alert" className="mt-4 min-h-5 text-[0.875rem] font-medium text-dear">
        {state.status === "error" ? copy.failed : ""}
      </p>
    </div>
  );
}
