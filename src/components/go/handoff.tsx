"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ShieldCheck } from "@phosphor-icons/react";
import { formatPrice, type Currency } from "@/content/deals";
import { airportByCode } from "@/lib/search-query";

/**
 * Hand-off screen between a result and the provider's site. In production the
 * provider's affiliate link replaces the demo notice and redirects after the
 * progress bar fills.
 */
export function Handoff() {
  const params = useSearchParams();
  const router = useRouter();
  const reduce = useReducedMotion();
  const provider = params.get("provider") ?? "the provider";
  const airline = params.get("airline") ?? "";
  const currency: Currency = params.get("currency") === "GBP" ? "GBP" : "USD";
  const price = Number(params.get("price"));
  const from = airportByCode(params.get("from"));
  const to = airportByCode(params.get("to"));

  return (
    <div className="mx-auto max-w-lg rounded-(--radius-frame) bg-white p-8 text-center shadow-(--shadow-float) ring-1 ring-line sm:p-12">
      <p className="text-[0.9375rem] text-ink-soft">Taking you to</p>
      <h1 className="mt-1 font-display-tight text-[2.25rem] leading-tight font-extrabold text-ink">{provider}</h1>
      {from && to && (
        <p className="mt-3 text-ink">
          {airline && <>{airline} · </>}
          {from.city} → {to.city}
          {Number.isFinite(price) && price > 0 && (
            <>
              {" · "}
              <span className="tabular font-bold text-fare">{formatPrice(price, currency)}</span>
            </>
          )}
        </p>
      )}

      <div className="mt-8 h-2 overflow-hidden rounded-full bg-mist" aria-hidden>
        <motion.div
          className="h-full rounded-full bg-action"
          initial={{ width: reduce ? "100%" : "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <p role="status" className="mt-6 rounded-xl bg-sun/25 px-4 py-3 text-[0.875rem] text-ink ring-1 ring-sun/60">
        <strong className="font-semibold">Demo:</strong> on the live site you’d now continue to {provider} to check the final price and book.
      </p>

      <p className="mt-6 flex items-center justify-center gap-2 text-[0.875rem] text-ink-soft">
        <ShieldCheck className="size-5 text-fare" aria-hidden />
        You’ll book and pay directly with {provider}.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-ink px-6 font-semibold text-white hover:bg-ink/90"
        >
          <ArrowLeft className="size-4" weight="bold" aria-hidden />
          Back to results
        </button>
        <Link href="/" className="inline-flex h-12 items-center rounded-full px-6 font-semibold text-ink ring-1 ring-line hover:bg-mist">
          New search
        </Link>
      </div>
    </div>
  );
}
