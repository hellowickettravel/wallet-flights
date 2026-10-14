"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowUpRight, ShieldCheck, WarningCircle } from "@phosphor-icons/react";
import { programs } from "@/content/affiliates";
import { formatPrice, type Currency } from "@/content/deals";
import { affiliateUrl, isProgramId, isProgramUrl } from "@/lib/affiliate";
import { airportByCode } from "@/lib/search-query";
import { demoResults } from "@/lib/flags";

const DELAY_MS = 1400;

/**
 * /go?program=aviasales&url=<partner page>&sub=<placement>
 * Builds the Travelpayouts affiliate link (marker + sub_id) and forwards the
 * visitor to it. Only URLs on the program's own hosts are accepted, so /go
 * can't be used as an open redirect.
 */
export function Handoff() {
  const params = useSearchParams();
  const router = useRouter();
  const reduce = useReducedMotion();
  const programParam = params.get("program") ?? "aviasales";
  const url = params.get("url") ?? "";
  const valid = isProgramId(programParam) && isProgramUrl(programParam, url);
  const program = isProgramId(programParam) ? programs[programParam] : null;
  const href = valid && program ? affiliateUrl(program.id, url, params.get("sub") ?? "go") : null;

  const provider = params.get("provider") ?? program?.name ?? "the provider";
  const airline = params.get("airline") ?? "";
  const currency: Currency = params.get("currency") === "GBP" ? "GBP" : "USD";
  const price = Number(params.get("price"));
  const from = airportByCode(params.get("from"));
  const to = airportByCode(params.get("to"));

  useEffect(() => {
    if (!href) return;
    const id = window.setTimeout(() => window.location.assign(href), reduce ? 0 : DELAY_MS);
    return () => window.clearTimeout(id);
  }, [href, reduce]);

  if (!href || !program) {
    return (
      <div className="mx-auto max-w-lg rounded-(--radius-frame) bg-white p-8 text-center shadow-(--shadow-float) ring-1 ring-line sm:p-12">
        <WarningCircle className="mx-auto size-10 text-ink-soft" aria-hidden />
        <h1 className="mt-4 font-display-tight text-[1.75rem] font-extrabold text-ink">This link doesn’t go anywhere</h1>
        <p className="mt-3 text-ink-soft">It may be incomplete or out of date. Start a new search to compare prices.</p>
        <Link href="/" className="mt-8 inline-flex h-12 items-center rounded-full bg-action px-6 font-semibold text-white hover:bg-action-deep">
          New search
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg rounded-(--radius-frame) bg-white p-8 text-center shadow-(--shadow-float) ring-1 ring-line sm:p-12">
      <p className="text-[0.9375rem] text-ink-soft">Taking you to</p>
      <h1 className="mt-1 font-display-tight text-[2.25rem] leading-tight font-extrabold text-ink">{program.name}</h1>
      {from && to && (
        <p className="mt-3 text-ink">
          {airline && <>{airline} · </>}
          {from.city} → {to.city}
          {demoResults && Number.isFinite(price) && price > 0 && (
            <>
              {" · "}
              <span className="tabular font-bold text-fare">{formatPrice(price, currency)}</span> on {provider} (demo)
            </>
          )}
        </p>
      )}

      <div className="mt-8 h-2 overflow-hidden rounded-full bg-mist" aria-hidden>
        <motion.div
          className="h-full rounded-full bg-action"
          initial={{ width: reduce ? "100%" : "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: DELAY_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <a
        href={href}
        rel="sponsored noopener"
        className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-action px-6 font-semibold text-white hover:bg-action-deep"
      >
        Continue to {program.name}
        <ArrowUpRight className="size-4" weight="bold" aria-hidden />
      </a>

      <p className="mt-6 flex items-center justify-center gap-2 text-[0.875rem] text-ink-soft">
        <ShieldCheck className="size-5 shrink-0 text-fare" aria-hidden />
        You’ll check the final price and book directly with {program.name}.
      </p>
      <p className="mt-2 text-[0.8125rem] text-ink-soft">We may earn a commission if you book. It doesn’t change your price.</p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-ink px-6 font-semibold text-white hover:bg-ink/90"
        >
          <ArrowLeft className="size-4" weight="bold" aria-hidden />
          Go back
        </button>
      </div>
    </div>
  );
}
