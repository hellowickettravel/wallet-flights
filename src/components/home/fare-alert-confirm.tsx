"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { BellRinging, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { buttonClass } from "@/components/ui/button";
import { fareAlertsCopy } from "@/content/home";

const copy = fareAlertsCopy.confirm;
type State = "idle" | "sending" | "done" | "expired" | "error";

/**
 * Step 2 of the fare-alert double opt-in. The visitor presses a button rather
 * than the link confirming on load, so mail scanners that open links can't
 * sign anyone up.
 */
export function FareAlertConfirm() {
  const token = useSearchParams().get("t") ?? "";
  const [state, setState] = useState<State>(token ? "idle" : "expired");

  async function confirm() {
    setState("sending");
    try {
      const res = await fetch("/api/fare-alerts/confirm", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ t: token }),
      });
      setState(res.ok ? "done" : res.status === 410 || res.status === 400 ? "expired" : "error");
    } catch {
      setState("error");
    }
  }

  const card = "mx-auto max-w-lg rounded-(--radius-frame) bg-white p-8 text-center shadow-(--shadow-float) ring-1 ring-line sm:p-12";
  const heading = "mt-4 font-display-tight text-[1.75rem] leading-tight font-extrabold text-ink";

  if (state === "done") {
    return (
      <div className={card} role="status">
        <CheckCircle className="mx-auto size-11 text-fare" weight="fill" aria-hidden />
        <h1 className={heading}>{copy.doneTitle}</h1>
        <p className="mt-3 text-ink-soft">{copy.doneText}</p>
        <Link href="/" className={buttonClass("primary", "md", "mt-8")}>
          Search flights
        </Link>
      </div>
    );
  }

  if (state === "expired") {
    return (
      <div className={card}>
        <WarningCircle className="mx-auto size-11 text-ink-soft" aria-hidden />
        <h1 className={heading}>{copy.expiredTitle}</h1>
        <p className="mt-3 text-ink-soft">{copy.expiredText}</p>
        <Link href="/#alerts-title" className={buttonClass("primary", "md", "mt-8")}>
          Sign up again
        </Link>
      </div>
    );
  }

  return (
    <div className={card}>
      <span className="mx-auto grid size-12 place-items-center rounded-full bg-sun text-ink">
        <BellRinging className="size-6" weight="fill" aria-hidden />
      </span>
      <h1 className={heading}>{copy.title}</h1>
      <p className="mt-3 text-ink-soft">{copy.text}</p>
      <button type="button" onClick={confirm} disabled={state === "sending"} className={buttonClass("primary", "lg", "mt-8")}>
        {state === "sending" ? copy.sending : copy.button}
      </button>
      <p role="alert" className="mt-4 min-h-5 text-[0.875rem] font-medium text-red-700">
        {state === "error" ? copy.failed : ""}
      </p>
    </div>
  );
}
