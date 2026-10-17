"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { rightsAirlineByCode, rightsAirlines } from "@/content/compensation";

export type AirlinePick = { code: string; name: string };

type Props = {
  label: string;
  hint?: string;
  icon: React.ReactNode;
  value: AirlinePick | null;
  onChange: (a: AirlinePick | null) => void;
  placeholder: string;
};

const format = (a: AirlinePick) => `${a.name} (${a.code})`;
/** Our own names win: they say which company of a group (easyJet UK or Europe) it is. */
const named = (a: AirlinePick): AirlinePick => ({ code: a.code, name: rightsAirlineByCode[a.code]?.name ?? a.name });

/** Instant matches from the airlines we know the rules for, while the full list loads (or if it fails). */
function search(q: string): AirlinePick[] {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return rightsAirlines
    .map((a) => {
      const n = a.name.toLowerCase();
      const score = a.code.toLowerCase() === s ? 0 : n.startsWith(s) ? 1 : n.includes(s) ? 2 : -1;
      return { a, score };
    })
    .filter((r) => r.score >= 0)
    .sort((x, y) => x.score - y.score)
    .slice(0, 8)
    .map(({ a }) => ({ code: a.code, name: a.name }));
}

/** Accessible airline combobox (WAI-ARIA 1.2 combobox with listbox popup), searching every airline. */
export function AirlineField({ label, hint, icon, value, onChange, placeholder }: Props) {
  const id = useId();
  const listId = `${id}-list`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string | null>(null); // null = not editing
  const [open, setOpen] = useState(false);
  const [activeCode, setActiveCode] = useState<string | null>(null);

  const term = (query ?? "").trim().toLowerCase();
  const [remote, setRemote] = useState<{ term: string; list: AirlinePick[] } | null>(null);
  const local = useMemo(() => search(term), [term]);
  const fresh = remote?.term === term ? remote.list : null;
  // Known airlines first (we hold their licence country), then the rest of the full list.
  const results = useMemo(() => {
    if (!fresh?.length) return local;
    const seen = new Set(local.map((a) => a.code));
    return [...local, ...fresh.filter((a) => !seen.has(a.code)).map(named)].slice(0, 8);
  }, [fresh, local]);
  const loading = term.length >= 2 && !fresh;
  const active = Math.max(0, results.findIndex((a) => a.code === activeCode));
  const setActive = (i: number) => setActiveCode(results[i]?.code ?? null);

  useEffect(() => {
    if (term.length < 2) return;
    const ctrl = new AbortController();
    const t = setTimeout(() => {
      fetch(`/api/airlines?q=${encodeURIComponent(term)}`, { signal: ctrl.signal })
        .then((r) => (r.ok ? (r.json() as Promise<AirlinePick[]>) : []))
        .then((list) => setRemote({ term, list }))
        .catch(() => {});
    }, 180);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [term]);
  const text = query ?? (value ? format(value) : "");

  function choose(a: AirlinePick) {
    onChange(a);
    setQuery(null);
    setOpen(false);
  }

  function commit() {
    if (query?.trim() && results[active]) choose(results[active]);
    else {
      setOpen(false);
      setQuery(null);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      else setActive(Math.min(active + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(Math.max(active - 1, 0));
    } else if (e.key === "Enter" && open && results[active]) {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === "Tab" && open) {
      commit();
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery(null);
    }
  }

  const showList = open && term.length > 0;
  return (
    <div className="relative">
      <div
        onClick={() => inputRef.current?.focus()}
        className="flex h-16 cursor-text items-center gap-3 rounded-xl bg-white px-4 ring-1 ring-line transition-shadow focus-within:ring-2 focus-within:ring-action hover:ring-ink/30"
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
            aria-expanded={showList}
            aria-controls={listId}
            aria-activedescendant={showList && results[active] ? `${listId}-${results[active].code}` : undefined}
            aria-describedby={hint ? `${id}-hint` : undefined}
            autoComplete="off"
            spellCheck={false}
            placeholder={placeholder}
            value={text}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setActiveCode(null);
              if (value) onChange(null);
            }}
            onFocus={(e) => {
              e.target.select();
              setOpen(true);
            }}
            onBlur={() => setTimeout(commit, 120)}
            onKeyDown={onKeyDown}
            className="w-full truncate bg-transparent text-[1.0625rem] font-semibold text-ink outline-none placeholder:font-normal placeholder:text-ink-soft"
          />
        </div>
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 px-1 text-[0.8125rem] text-ink-soft">
          {hint}
        </p>
      )}
      <p aria-live="polite" className="sr-only">
        {showList && !loading && results.length > 0 ? `${results.length} airline${results.length === 1 ? "" : "s"} found` : ""}
      </p>
      {showList && (
        <ul
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-label={`${label} suggestions`}
          className="absolute top-[4.375rem] left-0 z-30 max-h-80 w-full min-w-72 overflow-y-auto rounded-xl bg-white p-1.5 shadow-(--shadow-pop) ring-1 ring-line"
        >
          {results.length === 0 && (
            <li className="px-3 py-3 text-sm text-ink-soft">{loading ? "Searching airlines…" : `No airlines match “${query}”. Try the name or the 2-character code.`}</li>
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
              className={clsx("flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5", i === active && "bg-mist")}
            >
              <span className="grid h-8 w-12 shrink-0 place-items-center rounded-md bg-ink text-[0.8125rem] font-bold tracking-wide text-white">{a.code}</span>
              <span className="min-w-0 truncate text-[0.9375rem] font-semibold text-ink">{a.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
