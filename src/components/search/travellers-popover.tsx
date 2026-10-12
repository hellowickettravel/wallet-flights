"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretDown, Minus, Plus, User } from "@phosphor-icons/react";
import clsx from "clsx";

export type Cabin = "economy" | "premium" | "business" | "first";
export type Travellers = { adults: number; children: number; infants: number };

export const cabins: { id: Cabin; label: string }[] = [
  { id: "economy", label: "Economy" },
  { id: "premium", label: "Premium economy" },
  { id: "business", label: "Business" },
  { id: "first", label: "First" },
];

const MAX = 9;

type Props = {
  travellers: Travellers;
  cabin: Cabin;
  onChange: (t: Travellers, c: Cabin) => void;
};

export function summary(t: Travellers, c: Cabin) {
  const n = t.adults + t.children + t.infants;
  return `${n} traveller${n === 1 ? "" : "s"}, ${cabins.find((x) => x.id === c)!.label}`;
}

export function TravellersPopover({ travellers, cabin, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const total = travellers.adults + travellers.children + travellers.infants;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const rows: { key: keyof Travellers; label: string; one: string; hint: string; min: number; max: number }[] = [
    { key: "adults", label: "Adults", one: "adult", hint: "12 years and over", min: 1, max: MAX - travellers.children - travellers.infants },
    { key: "children", label: "Children", one: "child", hint: "2 to 11 years", min: 0, max: MAX - travellers.adults - travellers.infants },
    {
      key: "infants",
      label: "Infants",
      one: "infant",
      hint: "Under 2, on a lap",
      min: 0,
      max: Math.min(travellers.adults, MAX - travellers.adults - travellers.children),
    },
  ];

  function set(key: keyof Travellers, v: number) {
    const next = { ...travellers, [key]: v };
    if (key === "adults" && next.infants > v) next.infants = v; // one lap infant per adult
    onChange(next, cabin);
  }

  return (
    <div ref={wrap} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-3.5 text-[0.9375rem] font-medium text-ink ring-1 ring-line transition-colors hover:bg-mist"
      >
        <User className="size-[1.125rem] text-ink-soft" aria-hidden />
        {summary(travellers, cabin)}
        <CaretDown className={clsx("size-4 text-ink-soft transition-transform", open && "rotate-180")} aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label="Travellers and cabin class"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[calc(100%+8px)] right-0 z-30 w-[min(22rem,calc(100vw-2.5rem))] origin-top-right rounded-2xl bg-white p-5 shadow-(--shadow-pop) ring-1 ring-line max-sm:left-0 max-sm:origin-top-left"
          >
            <ul className="space-y-4">
              {rows.map((r) => (
                <li key={r.key} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-ink" id={`${panelId}-${r.key}`}>
                      {r.label}
                    </p>
                    <p className="text-[0.8125rem] text-ink-soft">{r.hint}</p>
                  </div>
                  <div className="flex items-center gap-3" role="group" aria-labelledby={`${panelId}-${r.key}`}>
                    <Stepper
                      label={`Remove one ${r.one}`}
                      disabled={travellers[r.key] <= r.min}
                      onClick={() => set(r.key, travellers[r.key] - 1)}
                    >
                      <Minus className="size-4" weight="bold" aria-hidden />
                    </Stepper>
                    <output aria-live="polite" className="tabular w-5 text-center text-[1.0625rem] font-semibold">
                      {travellers[r.key]}
                    </output>
                    <Stepper
                      label={`Add one ${r.one}`}
                      disabled={travellers[r.key] >= r.max}
                      onClick={() => set(r.key, travellers[r.key] + 1)}
                    >
                      <Plus className="size-4" weight="bold" aria-hidden />
                    </Stepper>
                  </div>
                </li>
              ))}
            </ul>
            {total >= MAX && <p className="mt-3 text-[0.8125rem] text-ink-soft">For groups of more than 9, call us and we’ll book a group fare.</p>}

            <fieldset className="mt-5 border-t border-line pt-4">
              <legend className="sr-only">Cabin class</legend>
              <p aria-hidden className="mb-2.5 font-semibold text-ink">
                Cabin class
              </p>
              <div className="grid grid-cols-2 gap-2">
                {cabins.map((c) => (
                  <label
                    key={c.id}
                    className={clsx(
                      "flex cursor-pointer items-center justify-center rounded-lg px-2 py-2.5 text-center text-[0.875rem] font-medium ring-1 transition-colors has-focus-visible:ring-2 has-focus-visible:ring-action",
                      cabin === c.id ? "bg-ink text-white ring-ink" : "text-ink ring-line hover:bg-mist",
                    )}
                  >
                    <input
                      type="radio"
                      name={`${panelId}-cabin`}
                      value={c.id}
                      checked={cabin === c.id}
                      onChange={() => onChange(travellers, c.id)}
                      className="sr-only"
                    />
                    {c.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              className="mt-5 h-11 w-full cursor-pointer rounded-full bg-action font-semibold text-white hover:bg-action-deep"
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Stepper({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-10 cursor-pointer place-items-center rounded-full text-action ring-1 ring-line transition-colors hover:bg-mist disabled:cursor-not-allowed disabled:text-ink/25"
    >
      {children}
    </button>
  );
}
