"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Plus } from "@phosphor-icons/react";
import clsx from "clsx";
import { homeFaqs } from "@/content/faqs";
import { site } from "@/content/site";
import { DisclosurePanel } from "@/components/ui/disclosure-panel";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <section aria-labelledby="faq-title" className="border-t border-line py-18 md:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <h2 id="faq-title" className="font-display-tight text-[2rem] leading-[1.08] font-bold text-ink md:text-[2.75rem]">
            Questions before you book
          </h2>
          <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-ink-soft">
            Can’t find your answer?{" "}
            <Link href="/contact" className="font-semibold text-action underline underline-offset-4">
              Contact us
            </Link>{" "}
            — {site.responseTime.toLowerCase()}.
          </p>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {homeFaqs.map((f, i) => {
            const isOpen = open === i;
            const btn = `${base}-q${i}`;
            const panel = `${base}-a${i}`;
            return (
              <li key={f.q}>
                <h3>
                  <button
                    id={btn}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-[1.0625rem] font-semibold text-ink hover:text-action md:text-[1.125rem]"
                  >
                    {f.q}
                    <span
                      className={clsx(
                        "grid size-9 shrink-0 place-items-center rounded-full ring-1 transition-[transform,background-color,color] duration-300",
                        isOpen ? "rotate-45 bg-ink text-white ring-ink" : "text-ink ring-line",
                      )}
                    >
                      <Plus className="size-4" weight="bold" aria-hidden />
                    </span>
                  </button>
                </h3>
                <DisclosurePanel id={panel} labelledBy={btn} open={isOpen}>
                  <p className="max-w-2xl pr-12 pb-6 leading-relaxed text-ink-soft">{f.a}</p>
                </DisclosurePanel>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
