"use client";

import { useId, useState } from "react";
import { ArrowUpRight, Plus } from "@phosphor-icons/react";
import clsx from "clsx";
import { DisclosurePanel } from "@/components/ui/disclosure-panel";

export type Question = { q: string; a: string; link?: { label: string; href: string } };

/**
 * Questions as an accordion, all closed: visitors scan the questions and open
 * only the one they care about. Answers stay in the HTML (DisclosurePanel), so
 * the FAQPage markup matches the page.
 */
export function QuestionList({ items }: { items: Question[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((f, i) => {
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
                className="flex w-full cursor-pointer items-center justify-between gap-6 py-4 text-left font-semibold text-ink hover:text-action"
              >
                {f.q}
                <span className={clsx("grid size-8 shrink-0 place-items-center rounded-full ring-1 transition-[transform,background-color,color] duration-300", isOpen ? "rotate-45 bg-ink text-white ring-ink" : "text-ink ring-line")}>
                  <Plus className="size-4" weight="bold" aria-hidden />
                </span>
              </button>
            </h3>
            <DisclosurePanel id={panel} labelledBy={btn} open={isOpen}>
              <p className="pr-12 pb-5 leading-relaxed text-ink-soft">
                {f.a}
                {f.link && (
                  <>
                    {" "}
                    <a href={f.link.href} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-semibold text-action hover:underline">
                      {f.link.label}
                      <ArrowUpRight className="size-3.5" weight="bold" aria-hidden />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </>
                )}
              </p>
            </DisclosurePanel>
          </li>
        );
      })}
    </ul>
  );
}
