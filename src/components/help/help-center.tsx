"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MagnifyingGlass, Plus } from "@phosphor-icons/react";
import clsx from "clsx";
import { helpTopics } from "@/content/help";

export function HelpCenter() {
  const id = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return helpTopics;
    return helpTopics
      .map((t) => ({ ...t, items: t.items.filter((i) => `${i.q} ${i.a}`.toLowerCase().includes(q)) }))
      .filter((t) => t.items.length);
  }, [query]);
  const count = results.reduce((n, t) => n + t.items.length, 0);

  return (
    <div>
      <div className="relative max-w-2xl">
        <label htmlFor={id} className="sr-only">
          Search help articles
        </label>
        <MagnifyingGlass className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-ink-soft" aria-hidden />
        <input
          id={id}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for refunds, baggage, currency…"
          className="h-14 w-full rounded-full bg-white pr-5 pl-13 text-[1.0625rem] text-ink shadow-[0_8px_24px_-18px_rgb(15_31_61/0.35)] ring-1 ring-line outline-none placeholder:text-ink-soft/70 focus-visible:ring-2 focus-visible:ring-action"
        />
      </div>
      <p className="mt-3 text-[0.875rem] text-ink-soft" aria-live="polite">
        {query ? `${count} answer${count === 1 ? "" : "s"} found` : "Browse by topic or search above."}
      </p>

      {!query && (
        <nav aria-label="Help topics" className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {helpTopics.map((t) => (
            <a key={t.id} href={`#${t.id}`} className="rounded-(--radius-card) bg-mist p-5 transition-colors hover:bg-line/60">
              <span className="block font-semibold text-ink">{t.title}</span>
              <span className="mt-1 block text-[0.875rem] text-ink-soft">{t.items.length} answers</span>
            </a>
          ))}
        </nav>
      )}

      {results.length === 0 ? (
        <div className="mt-10 rounded-(--radius-panel) bg-mist p-8 text-center">
          <p className="font-display-tight text-[1.375rem] font-bold text-ink">No answers match “{query}”</p>
          <p className="mt-2 text-ink-soft">
            Try another word, or{" "}
            <Link href="/contact" className="font-semibold text-action underline underline-offset-4">
              contact us
            </Link>
            .
          </p>
        </div>
      ) : (
        results.map((t) => (
          <section key={t.id} id={t.id} aria-labelledby={`${t.id}-h`} className="mt-12 scroll-mt-24">
            <h2 id={`${t.id}-h`} className="font-display-tight text-[1.5rem] font-bold text-ink md:text-[1.875rem]">
              {t.title}
            </h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {t.items.map((item) => {
                const key = `${t.id}-${item.q}`;
                const isOpen = open === key || !!query;
                return (
                  <li key={key}>
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(open === key ? null : key)}
                        className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-[1.0625rem] font-semibold text-ink hover:text-action"
                      >
                        {item.q}
                        <span className={clsx("grid size-9 shrink-0 place-items-center rounded-full ring-1 transition-transform duration-300", isOpen ? "rotate-45 bg-ink text-white ring-ink" : "ring-line")}>
                          <Plus className="size-4" weight="bold" aria-hidden />
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-3xl pr-12 pb-6 leading-relaxed text-ink-soft">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
