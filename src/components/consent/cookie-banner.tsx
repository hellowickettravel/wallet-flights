"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Cookie } from "@phosphor-icons/react";
import clsx from "clsx";
import { consentCopy as c } from "@/content/consent";
import { onConsentOpen, saveConsent, useConsent, type ConsentCategory } from "@/lib/consent";

/**
 * UK/EU consent banner. Accept and Reject carry equal weight (ICO guidance);
 * nothing optional loads until the visitor opts in. Reopened from the footer's
 * "Cookie settings" or the /flights search notice.
 *
 * It is in the server HTML, so it paints with the page instead of popping in
 * after hydration (it used to become the mobile LCP element). For visitors who
 * already chose, an inline script in the layout sets html[data-consent] before
 * first paint and CSS hides it until React removes it.
 */
export function CookieBanner() {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);
  const [manage, setManage] = useState(false);
  // null = show what's stored; set once the visitor flips a switch.
  const [edited, setEdited] = useState<Record<ConsentCategory, boolean> | null>(null);
  const titleId = useId();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      onConsentOpen(() => {
        setReopened(true);
        setManage(true);
      }),
    [],
  );

  // undefined = server render / hydration: render it, CSS decides visibility.
  // `renew`: an older analytics choice that didn't cover Google Analytics.
  const open = consent == null || consent.renew || reopened;

  useEffect(() => {
    if (!reopened) return;
    panel.current?.focus();
  }, [reopened]);

  if (!open) return null;
  const choice = edited ?? { search: consent?.search ?? false, analytics: consent?.analytics ?? false };

  function done(next: Record<ConsentCategory, boolean>) {
    saveConsent(next);
    setReopened(false);
    setManage(false);
    setEdited(null);
  }

  return (
    <div
      ref={panel}
      role="region"
      aria-labelledby={titleId}
      tabIndex={-1}
      data-testid="cookie-banner"
      data-reopened={reopened || undefined}
      // Never taller than the screen: the content scrolls, the buttons stay in view.
      className="cookie-banner fixed inset-x-3 bottom-3 z-[60] mx-auto max-h-[calc(100dvh-1.5rem)] max-w-3xl overflow-y-auto overscroll-contain rounded-(--radius-panel) bg-white p-5 shadow-(--shadow-pop) ring-1 ring-line outline-none sm:inset-x-5 sm:bottom-5 sm:max-h-[calc(100dvh-2.5rem)] sm:p-6"
    >
      <div className="flex items-start gap-3">
        <Cookie className="mt-0.5 size-6 shrink-0 text-action" weight="duotone" aria-hidden />
        <div className="min-w-0">
          <h2 id={titleId} className="font-display-tight text-[1.25rem] font-bold text-ink">
            {c.title}
          </h2>
          <p className="mt-1.5 text-pretty text-[0.9375rem] leading-relaxed text-ink-soft">
            {c.body}{" "}
            <Link href="/cookie-policy" className="font-semibold text-action underline underline-offset-2 hover:text-action-deep">
              {c.policyLabel}
            </Link>
          </p>
        </div>
      </div>

      {manage && (
        <ul className="mt-5 divide-y divide-line rounded-(--radius-card) ring-1 ring-line">
          {c.categories.map((cat) => {
            const id = `consent-${cat.id}`;
            const checked = cat.locked ? true : choice[cat.id as ConsentCategory];
            return (
              <li key={cat.id} className="flex items-start justify-between gap-4 p-4">
                <div className="min-w-0">
                  <label htmlFor={id} className="font-semibold text-ink">
                    {cat.label}
                  </label>
                  <p id={`${id}-desc`} className="mt-0.5 text-[0.875rem] leading-relaxed text-ink-soft">
                    {cat.description}
                  </p>
                </div>
                <button
                  id={id}
                  type="button"
                  role="switch"
                  aria-checked={checked}
                  aria-describedby={`${id}-desc`}
                  disabled={cat.locked}
                  onClick={() => setEdited({ ...choice, [cat.id]: !choice[cat.id as ConsentCategory] })}
                  className={clsx(
                    "relative mt-0.5 h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60",
                    checked ? "bg-action" : "bg-line",
                  )}
                >
                  <span className={clsx("absolute top-1 left-1 size-5 rounded-full bg-white shadow transition-transform", checked && "translate-x-5")} />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="sticky -bottom-5 -mx-5 -mb-5 mt-2 grid gap-2.5 bg-white px-5 pt-3 pb-5 sm:-bottom-6 sm:-mx-6 sm:-mb-6 sm:flex sm:flex-wrap sm:justify-end sm:px-6 sm:pb-6">
        {manage ? (
          <button type="button" onClick={() => done(choice)} className={btn("ghost")}>
            {c.save}
          </button>
        ) : (
          <button type="button" onClick={() => setManage(true)} className={btn("ghost")}>
            {c.manage}
          </button>
        )}
        <button type="button" onClick={() => done({ search: false, analytics: false })} className={btn("solid")}>
          {c.reject}
        </button>
        <button type="button" onClick={() => done({ search: true, analytics: true })} className={btn("solid")}>
          {c.accept}
        </button>
      </div>
    </div>
  );
}

// Accept and Reject share one style so neither is nudged.
const btn = (kind: "solid" | "ghost") =>
  clsx(
    "inline-flex h-11 cursor-pointer items-center justify-center rounded-full px-5 text-[0.9375rem] font-semibold transition-colors",
    kind === "solid" ? "bg-ink text-white hover:bg-ink/90" : "text-ink ring-1 ring-line hover:bg-mist",
  );
