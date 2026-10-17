"use client";

import { useId, type ReactNode } from "react";
import clsx from "clsx";
import { onRovingKeyDown } from "@/lib/roving";

type Option<T extends string> = { v: T; label: string; hint?: string; icon?: ReactNode };

type Props<T extends string> = {
  label: string;
  hint?: string;
  options: readonly Option<T>[];
  /** Null until the visitor answers: nothing is pre-selected. */
  value: T | null;
  onChange: (v: T) => void;
  /** "large" for the main question (icons + hints), "chip" for the rest. */
  size?: "large" | "chip";
  columns?: string;
};

/** Single-choice question as a radio group of chips: one Tab stop, arrow keys move. */
export function ChoiceGroup<T extends string>({ label, hint, options, value, onChange, size = "chip", columns }: Props<T>) {
  const id = useId();
  return (
    <div>
      <p id={`${id}-label`} className="text-[0.9375rem] font-semibold text-ink">
        {label}
      </p>
      {hint && (
        <p id={`${id}-hint`} className="mt-0.5 text-[0.8125rem] text-ink-soft">
          {hint}
        </p>
      )}
      <div
        role="radiogroup"
        aria-labelledby={`${id}-label`}
        aria-describedby={hint ? `${id}-hint` : undefined}
        onKeyDown={(e) => onRovingKeyDown(e, (i) => onChange(options[i].v))}
        className={clsx("mt-3 grid gap-2", columns ?? (size === "large" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 sm:grid-cols-4"))}
      >
        {options.map((o, i) => {
          const on = o.v === value;
          return (
            <button
              key={o.v}
              type="button"
              role="radio"
              aria-checked={on}
              // With no answer yet, the first option takes the group's one Tab stop.
              tabIndex={on || (value === null && i === 0) ? 0 : -1}
              onClick={() => onChange(o.v)}
              className={clsx(
                "cursor-pointer rounded-xl text-left transition-[background-color,box-shadow,color] duration-150",
                size === "large" ? "flex flex-col gap-2 p-4" : "flex min-h-12 items-center px-3.5 py-2.5 text-[0.9375rem] leading-snug",
                on ? "bg-ink text-white ring-2 ring-ink" : "bg-white text-ink ring-1 ring-line hover:ring-ink/30",
              )}
            >
              {o.icon && <span className={clsx("grid size-9 place-items-center rounded-lg", on ? "bg-white/12 text-sun" : "bg-mist text-action")}>{o.icon}</span>}
              <span className={clsx(size === "large" && "font-semibold")}>{o.label}</span>
              {o.hint && <span className={clsx("text-[0.8125rem]", on ? "text-white/75" : "text-ink-soft")}>{o.hint}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
