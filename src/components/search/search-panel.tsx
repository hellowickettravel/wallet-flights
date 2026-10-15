"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, LayoutGroup, m } from "motion/react";
import { AirplaneLanding, AirplaneTakeoff, ArrowsDownUp, ArrowsLeftRight, MagnifyingGlass, Plus, X } from "@phosphor-icons/react";
import clsx from "clsx";
import type { Airport } from "@/content/airports";
import { airportByCode, serializeSearch, type SearchQuery, type TripType } from "@/lib/search-query";
import { AirportField } from "./airport-field";
import { DateField } from "./date-field";
import { TravellersPopover, type Cabin, type Travellers } from "./travellers-popover";
import { onRovingKeyDown } from "@/lib/roving";

type Leg = { id: number; from: Airport | null; to: Airport | null; date: string };
type Errors = Record<string, string>;

const tripTypes: { id: TripType; label: string }[] = [
  { id: "round", label: "Round trip" },
  { id: "oneway", label: "One way" },
  { id: "multi", label: "Multi-city" },
];

const MAX_LEGS = 5;

function isoDate(d: Date) {
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60_000).toISOString().slice(0, 10);
}

const noopSubscribe = () => () => {};
const todayIso = () => isoDate(new Date());

type Props = {
  /** Prefill from an existing search (results page "modify search"). */
  initial?: Partial<SearchQuery>;
  defaultFrom?: string;
  defaultTo?: string;
  /** "hero" floats over the homepage photo; "bar" sits flat at the top of a page. */
  variant?: "hero" | "bar";
  /** Placement name passed on as the affiliate sub_id (e.g. "home_hero"). */
  subId?: string;
};

function initialLegs(initial: Props["initial"], defaultFrom: string, defaultTo?: string): Leg[] {
  const given = initial?.legs ?? [];
  const legs: Leg[] = given.map((l, i) => ({ id: i, from: l.from, to: l.to, date: l.date }));
  if (!legs.length) legs.push({ id: 0, from: airportByCode(defaultFrom), to: airportByCode(defaultTo), date: "" });
  if (legs.length < 2) legs.push({ id: legs.length, from: legs[0].to, to: null, date: "" });
  return legs;
}

export function SearchPanel({ initial, defaultFrom = "NYC", defaultTo, variant = "hero", subId = "search_form" }: Props) {
  const router = useRouter();
  const [trip, setTrip] = useState<TripType>(initial?.trip ?? "round");
  const [legs, setLegs] = useState<Leg[]>(() => initialLegs(initial, defaultFrom, defaultTo));
  const [returnDate, setReturnDate] = useState(initial?.returnDate ?? "");
  const [travellers, setTravellers] = useState<Travellers>({
    adults: initial?.adults ?? 1,
    children: initial?.children ?? 0,
    infants: initial?.infants ?? 0,
  });
  const [cabin, setCabin] = useState<Cabin>(initial?.cabin ?? "economy");
  const [errors, setErrors] = useState<Errors>({});
  const [swapTurns, setSwapTurns] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  // Set on a failed submit: once the errors render, focus the first invalid field.
  const focusError = useRef(false);
  useEffect(() => {
    if (!focusError.current) return;
    focusError.current = false;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [errors]);
  // Client-only value: the prerendered HTML never bakes in a date.
  const today = useSyncExternalStore(noopSubscribe, todayIso, () => undefined);

  const visibleLegs = trip === "multi" ? legs : legs.slice(0, 1);
  const hero = variant === "hero";
  // Hero, single leg: one joined bar (From | To | Dates | Travellers | Search) on desktop.
  const seg = hero && trip !== "multi";

  function updateLeg(i: number, patch: Partial<Omit<Leg, "id">>) {
    setLegs((ls) => ls.map((l, j) => (j === i ? { ...l, ...patch } : l)));
    setErrors((e) => {
      const next = { ...e };
      Object.keys(patch).forEach((k) => delete next[`${k}${i}`]);
      return next;
    });
  }

  function swap() {
    setLegs((ls) => ls.map((l, j) => (j === 0 ? { ...l, from: l.to, to: l.from } : l)));
    setSwapTurns((t) => t + 1);
  }

  function validate(): Errors {
    const e: Errors = {};
    visibleLegs.forEach((l, i) => {
      if (!l.from) e[`from${i}`] = "Choose where you're flying from";
      if (!l.to) e[`to${i}`] = "Choose where you're going";
      if (l.from && l.to && l.from.code === l.to.code) e[`to${i}`] = "Pick a different destination";
      if (!l.date) e[`date${i}`] = "Add a departure date";
      else if (today && l.date < today) e[`date${i}`] = "Choose a date from today onwards";
      const prev = visibleLegs[i - 1]?.date;
      if (l.date && prev && l.date < prev) e[`date${i}`] = "This flight is before the previous one";
    });
    if (trip === "round") {
      if (!returnDate) e.return = "Add a return date";
      else if (legs[0].date && returnDate < legs[0].date) e.return = "Return is before departure";
    }
    return e;
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      focusError.current = true;
      return;
    }
    const query: SearchQuery = {
      trip,
      cabin,
      ...travellers,
      legs: visibleLegs.map((l) => ({ from: l.from!, to: l.to!, date: l.date })),
      returnDate: trip === "round" ? returnDate : undefined,
    };
    router.push(`/flights?${serializeSearch(query)}&sub=${encodeURIComponent(subId)}`);
  }

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      noValidate
      aria-label="Search flights"
      className={clsx(
        hero
          ? "text-white [&_p[id$='-err']]:text-[#ffb4ab]"
          : "rounded-(--radius-panel) bg-white p-3 shadow-[0_8px_24px_-18px_rgb(15_31_61/0.35)] ring-1 ring-line sm:p-4",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <LayoutGroup id="trip-type">
          <div
            role="radiogroup"
            aria-label="Trip type"
            onKeyDown={(e) =>
              onRovingKeyDown(e, (i) => {
                setTrip(tripTypes[i].id);
                setErrors({});
              })
            }
            className={clsx("flex rounded-full p-1", hero ? "bg-white/10" : "bg-mist")}
          >
            {tripTypes.map((t) => {
              const active = trip === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  tabIndex={active ? 0 : -1}
                  onClick={() => {
                    setTrip(t.id);
                    setErrors({});
                  }}
                  className={clsx(
                    "relative h-9 cursor-pointer rounded-full px-3 text-[0.875rem] font-semibold whitespace-nowrap transition-colors min-[360px]:px-3.5 sm:px-4 sm:text-[0.9375rem]",
                    hero ? (active ? "text-ink" : "text-white/80 hover:text-white") : active ? "text-white" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {active && (
                    <m.span
                      layoutId="trip-pill"
                      className={clsx("absolute inset-0 rounded-full", hero ? "bg-white" : "bg-ink")}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{t.label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
        {!seg && (
          <TravellersPopover
            travellers={travellers}
            cabin={cabin}
            onChange={(t, c) => {
              setTravellers(t);
              setCabin(c);
            }}
          />
        )}
      </div>

      <div className="mt-4 space-y-3">
        <AnimatePresence initial={false} mode="popLayout">
          {visibleLegs.map((leg, i) => (
            <m.div
              key={leg.id}
              layout
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={clsx(
                "grid",
                seg ? "gap-2 lg:gap-0.5" : "gap-3",
                seg && trip === "round" && "lg:grid-cols-[1.2fr_1.2fr_0.9fr_0.9fr_1fr_auto]",
                seg && trip === "oneway" && "lg:grid-cols-[1.2fr_1.2fr_0.9fr_1.1fr_auto]",
                !seg && trip === "round" && "lg:grid-cols-[1fr_1fr_0.72fr_0.72fr_auto]",
                !seg && trip === "oneway" && "lg:grid-cols-[1fr_1fr_0.9fr_auto]",
                trip === "multi" && "lg:grid-cols-[1fr_1fr_0.9fr_auto]",
              )}
            >
              <div className={clsx("relative grid sm:grid-cols-2 lg:col-span-2", seg ? "gap-2 lg:gap-0.5" : "gap-3")}>
                <AirportField
                  label={trip === "multi" ? `Flight ${i + 1} · from` : "Leaving from"}
                  icon={<AirplaneTakeoff className="size-5" aria-hidden />}
                  placeholder="City or airport"
                  value={leg.from}
                  error={errors[`from${i}`]}
                  onChange={(a) => updateLeg(i, { from: a })}
                  shellClassName={clsx(i === 0 && trip !== "multi" && "max-sm:pr-16 sm:pr-8", seg && "lg:rounded-r-none")}
                />
                <AirportField
                  label="Going to"
                  labelPrefix={trip === "multi" ? `Flight ${i + 1},` : undefined}
                  icon={<AirplaneLanding className="size-5" aria-hidden />}
                  placeholder="City or airport"
                  value={leg.to}
                  error={errors[`to${i}`]}
                  onChange={(a) => updateLeg(i, { to: a })}
                  shellClassName={clsx(i === 0 && trip !== "multi" && "max-sm:pr-16 sm:pl-8", seg && "lg:rounded-none")}
                />
                {i === 0 && trip !== "multi" && (
                  <m.button
                    type="button"
                    onClick={swap}
                    aria-label="Swap origin and destination"
                    animate={{ rotate: swapTurns * 180 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className={clsx(
                      // Phones: the fields stack, so it sits on their shared edge at the right.
                      "absolute right-4 z-10 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-action shadow-[0_2px_8px_rgb(15_31_61/0.12)] ring-1 ring-line transition-colors hover:bg-mist",
                      seg ? "top-[4.25rem]" : "top-[4.375rem]",
                      "sm:top-8 sm:right-auto sm:left-1/2 sm:-translate-x-1/2",
                    )}
                  >
                    <ArrowsDownUp className="size-[1.125rem] sm:hidden" weight="bold" aria-hidden />
                    <ArrowsLeftRight className="hidden size-[1.125rem] sm:block" weight="bold" aria-hidden />
                  </m.button>
                )}
              </div>

              <div className={clsx("grid", seg ? "gap-2 lg:gap-0.5" : "gap-3", trip === "round" ? "grid-cols-2 lg:col-span-2" : "")}>
                <DateField
                  label={trip === "multi" ? "Date" : "Departing"}
                  labelPrefix={trip === "multi" ? `Flight ${i + 1},` : undefined}
                  shellClassName={seg ? "lg:rounded-none lg:[&>svg]:hidden!" : undefined}
                  value={leg.date}
                  min={i > 0 ? visibleLegs[i - 1].date || today : today}
                  error={errors[`date${i}`]}
                  onChange={(v) => updateLeg(i, { date: v })}
                />
                {trip === "round" && (
                  <DateField
                    label="Returning"
                    shellClassName={seg ? "lg:rounded-none lg:[&>svg]:hidden!" : undefined}
                    value={returnDate}
                    min={leg.date || today}
                    error={errors.return}
                    onChange={(v) => {
                      setReturnDate(v);
                      setErrors((e) => ({ ...e, return: "" }));
                    }}
                  />
                )}
              </div>

              {seg && (
                <TravellersPopover
                  variant="field"
                  travellers={travellers}
                  cabin={cabin}
                  onChange={(t, c) => {
                    setTravellers(t);
                    setCabin(c);
                  }}
                />
              )}

              {trip !== "multi" ? (
                <SearchButton className={seg ? "lg:rounded-l-none lg:px-6" : undefined} />
              ) : (
                <div className="flex items-start">
                  {i > 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setLegs((ls) => ls.filter((_, j) => j !== i));
                        setErrors({});
                      }}
                      aria-label={`Remove flight ${i + 1}`}
                      className={clsx(
                        "grid size-16 cursor-pointer place-items-center rounded-xl ring-1 max-lg:h-11 max-lg:w-full",
                        hero ? "text-white ring-white/30 hover:bg-white/10" : "text-ink-soft ring-line hover:bg-mist hover:text-ink",
                      )}
                    >
                      <X className="size-5" aria-hidden />
                    </button>
                  ) : (
                    <span className="hidden size-16 lg:block" aria-hidden />
                  )}
                </div>
              )}
            </m.div>
          ))}
        </AnimatePresence>
      </div>

      {trip === "multi" && (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            disabled={legs.length >= MAX_LEGS}
            onClick={() =>
              setLegs((ls) => [...ls, { id: Math.max(...ls.map((l) => l.id)) + 1, from: ls[ls.length - 1].to, to: null, date: "" }])
            }
            className={clsx(
              "inline-flex h-11 cursor-pointer items-center gap-2 self-start rounded-full px-4 font-semibold ring-1 disabled:cursor-not-allowed disabled:opacity-50",
              hero ? "text-white ring-white/30 hover:bg-white/10" : "text-action ring-line hover:bg-mist",
            )}
          >
            <Plus className="size-4" weight="bold" aria-hidden />
            Add another flight
          </button>
          <SearchButton className="sm:w-56" />
        </div>
      )}
    </form>
  );
}

function SearchButton({ className }: { className?: string }) {
  return (
    <button
      type="submit"
      className={clsx(
        // Same 1px ring as the fields so the button lines up with them exactly.
        "inline-flex h-16 cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-action px-7 ring-1 ring-action hover:ring-action-deep text-[1.0625rem] font-semibold text-white transition-colors hover:bg-action-deep active:scale-[0.99]",
        className,
      )}
    >
      <MagnifyingGlass className="size-5" weight="bold" aria-hidden />
      Search flights
    </button>
  );
}
