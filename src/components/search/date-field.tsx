"use client";

import { useId, useRef } from "react";
import clsx from "clsx";
import { CalendarBlank } from "@phosphor-icons/react";

type Props = {
  label: string;
  /** Read before the label by screen readers only, e.g. "Flight 2," in multi-city. */
  labelPrefix?: string;
  value: string;
  onChange: (v: string) => void;
  min?: string;
  error?: string;
  className?: string;
  shellClassName?: string;
};

/** Native date input inside the shared field shell: reliable keyboard + mobile pickers. */
export function DateField({ label, labelPrefix, value, onChange, min, error, className, shellClassName }: Props) {
  const id = useId();
  const errId = `${id}-err`;
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={clsx(
          "flex h-16 cursor-pointer items-center gap-3 rounded-xl bg-white px-3.5 ring-1 sm:px-4 transition-shadow focus-within:ring-2 focus-within:ring-action",
          error ? "ring-2 ring-red-600" : "ring-line hover:ring-ink/30",
          shellClassName,
        )}
      >
        <CalendarBlank className="hidden size-5 shrink-0 text-ink-soft min-[420px]:block" aria-hidden />
        <span className="min-w-0 flex-1">
          <span className="block text-[0.75rem] font-medium text-ink-soft">
            {labelPrefix && <span className="sr-only">{labelPrefix} </span>}
            {label}
          </span>
          <input
            ref={ref}
            id={id}
            type="date"
            value={value}
            min={min}
            onChange={(e) => onChange(e.target.value)}
            onClick={() => {
              try {
                ref.current?.showPicker();
              } catch {
                /* showPicker is unavailable in some browsers; the native control still works */
              }
            }}
            aria-invalid={!!error}
            aria-describedby={error ? errId : undefined}
            className="w-full min-w-0 cursor-pointer bg-transparent text-base font-semibold sm:text-[1.0625rem] text-ink outline-none [&::-webkit-calendar-picker-indicator]:hidden"
          />
        </span>
      </label>
      {error && (
        <p id={errId} className="mt-1.5 px-1 text-[0.8125rem] font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
