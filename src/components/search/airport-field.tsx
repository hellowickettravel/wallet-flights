"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { airports, type Airport } from "@/content/airports";

type Props = {
  label: string;
  icon: React.ReactNode;
  value: Airport | null;
  onChange: (a: Airport | null) => void;
  placeholder: string;
  error?: string;
  className?: string;
  shellClassName?: string;
};

const format = (a: Airport) => `${a.city} (${a.code})`;

// Shown before typing: a spread of regions, not just one country.
const popular = ["LON", "NYC", "DXB", "CDG", "IST", "DEL", "BCN", "BKK"].map((c) => airports.find((a) => a.code === c)!);

/** Instant matches from our own short list, while the worldwide lookup loads (or if it fails). */
function search(q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return popular;
  return airports
    .map((a) => {
      const code = a.code.toLowerCase();
      const score =
        code === s ? 0 : a.city.toLowerCase().startsWith(s) ? 1 : code.startsWith(s) ? 2 :
        `${a.city} ${a.name} ${a.country}`.toLowerCase().includes(s) ? 3 : -1;
      return { a, score };
    })
    .filter((r) => r.score >= 0)
    .sort((x, y) => x.score - y.score)
    .slice(0, 8)
    .map((r) => r.a);
}

/** Accessible airport combobox (WAI-ARIA 1.2 combobox with listbox popup). */
export function AirportField({ label, icon, value, onChange, placeholder, error, className, shellClassName }: Props) {
  const id = useId();
  const listId = `${id}-list`;
  const errId = `${id}-err`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string | null>(null); // null = not editing
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const term = (query ?? "").trim().toLowerCase();
  const [remote, setRemote] = useState<{ term: string; list: Airport[] } | null>(null);
  const local = useMemo(() => search(term), [term]);
  const fresh = remote?.term === term ? remote.list : null;
  const results = fresh?.length ? fresh : local;
  const loading = term.length >= 2 && !fresh;

  // Every airport in the world: ask our own API (debounced) once 2+ letters are typed.
  useEffect(() => {
    if (term.length < 2) return;
    const ctrl = new AbortController();
    const t = setTimeout(() => {
      fetch(`/api/places?q=${encodeURIComponent(term)}`, { signal: ctrl.signal })
        .then((r) => (r.ok ? (r.json() as Promise<Airport[]>) : []))
        .then((list) => {
          setRemote({ term, list });
          setActive(0);
        })
        .catch(() => {});
    }, 180);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [term]);
  const text = query ?? (value ? format(value) : "");

  function choose(a: Airport) {
    onChange(a);
    setQuery(null);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && open && results[active]) {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery(null);
    }
  }

  return (
    <div className={clsx("relative", className)}>
      <div
        onClick={() => inputRef.current?.focus()}
        className={clsx(
          "flex h-16 cursor-text items-center gap-3 rounded-xl bg-white px-4 ring-1 transition-shadow focus-within:ring-2 focus-within:ring-action",
          error ? "ring-2 ring-red-600" : "ring-line hover:ring-ink/30",
          shellClassName,
        )}
      >
        <span className="text-ink-soft">{icon}</span>
        <div className="min-w-0 flex-1">
          <label htmlFor={id} className="block text-[0.75rem] font-medium text-ink-soft">
            {label}
          </label>
          <input
            ref={inputRef}
            id={id}
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls={listId}
            aria-activedescendant={open && results[active] ? `${listId}-${results[active].code}` : undefined}
            aria-invalid={!!error}
            aria-describedby={error ? errId : undefined}
            autoComplete="off"
            spellCheck={false}
            placeholder={placeholder}
            value={text}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setActive(0);
              if (value) onChange(null);
            }}
            onFocus={(e) => {
              e.target.select();
              setOpen(true);
            }}
            onBlur={() => {
              // Let a click on an option land before closing.
              setTimeout(() => {
                setOpen(false);
                setQuery(null);
              }, 120);
            }}
            onKeyDown={onKeyDown}
            className="w-full truncate bg-transparent text-[1.0625rem] font-semibold text-ink outline-none placeholder:font-normal placeholder:text-ink-soft/80"
          />
        </div>
      </div>
      {error && (
        <p id={errId} className="mt-1.5 px-1 text-[0.8125rem] font-medium text-red-700">
          {error}
        </p>
      )}
      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={`${label} airports`}
          className="absolute top-[calc(100%+6px)] left-0 z-30 max-h-80 w-full min-w-72 overflow-y-auto rounded-xl bg-white p-1.5 shadow-(--shadow-pop) ring-1 ring-line"
        >
          {results.length === 0 && (
            <li className="px-3 py-3 text-sm text-ink-soft">
              {loading ? "Searching airports…" : `No airports match “${query}”. Try a city name or 3-letter code.`}
            </li>
          )}
          {results.map((a, i) => (
            <li
              key={a.code}
              id={`${listId}-${a.code}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(a)}
              onMouseEnter={() => setActive(i)}
              className={clsx(
                "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5",
                i === active ? "bg-mist" : "",
              )}
            >
              <span className="grid h-8 w-12 shrink-0 place-items-center rounded-md bg-ink text-[0.8125rem] font-bold tracking-wide text-white">
                {a.code}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[0.9375rem] font-semibold text-ink">{a.city}</span>
                <span className="block truncate text-[0.8125rem] text-ink-soft">
                  {a.name}, {a.country}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
