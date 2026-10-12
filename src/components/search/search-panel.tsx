"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { AirplaneLanding, AirplaneTakeoff, ArrowsLeftRight, MagnifyingGlass, Plus, X } from "@phosphor-icons/react";
import clsx from "clsx";
import { airports, type Airport } from "@/content/airports";
import { AirportField } from "./airport-field";
import { DateField } from "./date-field";
import { TravellersPopover, type Cabin, type Travellers } from "./travellers-popover";

type TripType = "round" | "oneway" | "multi";
type Leg = { id: number; from: Airport | null; to: Airport | null; date: string };
type Errors = Record<string, string>;

const tripTypes: { id: TripType; label: string }[] = [
  { id: "round", label: "Round trip" },
  { id: "oneway", label: "One way" },
  { id: "multi", label: "Multi-city" },
];

const MAX_LEGS = 5;
const byCode = (c: string) => airports.find((a) => a.code === c) ?? null;

function isoDate(d: Date) {
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60_000).toISOString().slice(0, 10);
}

const noopSubscribe = () => () => {};
const todayIso = () => isoDate(new Date());

export function SearchPanel({ defaultFrom = "NYC" }: { defaultFrom?: string }) {
  const router = useRouter();
  const [trip, setTrip] = useState<TripType>("round");
  const [legs, setLegs] = useState<Leg[]>([
    { id: 0, from: byCode(defaultFrom), to: null, date: "" },
    { id: 1, from: null, to: null, date: "" },
  ]);
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState<Travellers>({ adults: 1, children: 0, infants: 0 });
  const [cabin, setCabin] = useState<Cabin>("economy");
  const [errors, setErrors] = useState<Errors>({});
  const [swapTurns, setSwapTurns] = useState(0);
  // Client-only value: the prerendered HTML never bakes in a date.
  const today = useSyncExternalStore(noopSubscribe, todayIso, () => undefined);

  const visibleLegs = trip === "multi" ? legs : legs.slice(0, 1);

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
    if (Object.keys(e).length) return;
    const params = new URLSearchParams({ trip, cabin, adults: String(travellers.adults) });
    if (travellers.children) params.set("children", String(travellers.children));
    if (travellers.infants) params.set("infants", String(travellers.infants));
    visibleLegs.forEach((l, i) => {
      params.set(`from${i}`, l.from!.code);
      params.set(`to${i}`, l.to!.code);
      params.set(`date${i}`, l.date);
    });
    if (trip === "round") params.set("return", returnDate);
    router.push(`/flights?${params.toString()}`);
  }

  return (
    <form onSubmit={submit} noValidate aria-label="Search flights" className="rounded-(--radius-panel) bg-white p-4 shadow-(--shadow-float) ring-1 ring-line/70 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <LayoutGroup id="trip-type">
          <div role="radiogroup" aria-label="Trip type" className="flex rounded-full bg-mist p-1">
            {tripTypes.map((t) => {
              const active = trip === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => {
                    setTrip(t.id);
                    setErrors({});
                  }}
                  className={clsx(
                    "relative h-9 cursor-pointer rounded-full px-3.5 text-[0.875rem] font-semibold transition-colors sm:px-4 sm:text-[0.9375rem]",
                    active ? "text-white" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="trip-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{t.label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
        <TravellersPopover
          travellers={travellers}
          cabin={cabin}
          onChange={(t, c) => {
            setTravellers(t);
            setCabin(c);
          }}
        />
      </div>

      <div className="mt-4 space-y-3">
        <AnimatePresence initial={false} mode="popLayout">
          {visibleLegs.map((leg, i) => (
            <motion.div
              key={leg.id}
              layout
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={clsx(
                "grid gap-3",
                trip === "round" && "lg:grid-cols-[1fr_1fr_0.72fr_0.72fr_auto]",
                trip === "oneway" && "lg:grid-cols-[1fr_1fr_0.9fr_auto]",
                trip === "multi" && "lg:grid-cols-[1fr_1fr_0.9fr_auto]",
              )}
            >
              <div className="relative grid gap-3 sm:grid-cols-2 lg:col-span-2">
                <AirportField
                  label={trip === "multi" ? `Flight ${i + 1} · from` : "Leaving from"}
                  icon={<AirplaneTakeoff className="size-5" aria-hidden />}
                  placeholder="City or airport"
                  value={leg.from}
                  error={errors[`from${i}`]}
                  onChange={(a) => updateLeg(i, { from: a })}
                  shellClassName={i === 0 && trip !== "multi" ? "sm:pr-8" : undefined}
                />
                <AirportField
                  label="Going to"
                  icon={<AirplaneLanding className="size-5" aria-hidden />}
                  placeholder="City or airport"
                  value={leg.to}
                  error={errors[`to${i}`]}
                  onChange={(a) => updateLeg(i, { to: a })}
                  shellClassName={i === 0 && trip !== "multi" ? "sm:pl-8" : undefined}
                />
                {i === 0 && trip !== "multi" && (
                  <motion.button
                    type="button"
                    onClick={swap}
                    aria-label="Swap origin and destination"
                    animate={{ rotate: swapTurns * 180 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="absolute top-8 left-1/2 z-10 hidden size-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-action shadow-[0_2px_8px_rgb(15_31_61/0.12)] ring-1 ring-line transition-colors hover:bg-mist sm:grid"
                  >
                    <ArrowsLeftRight className="size-[1.125rem]" weight="bold" aria-hidden />
                  </motion.button>
                )}
              </div>

              <div className={clsx("grid gap-3", trip === "round" ? "grid-cols-2 lg:col-span-2" : "")}>
                <DateField
                  label={trip === "multi" ? "Date" : "Departing"}
                  value={leg.date}
                  min={i > 0 ? visibleLegs[i - 1].date || today : today}
                  error={errors[`date${i}`]}
                  onChange={(v) => updateLeg(i, { date: v })}
                />
                {trip === "round" && (
                  <DateField
                    label="Returning"
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

              {trip !== "multi" ? (
                <SearchButton />
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
                      className="grid size-16 cursor-pointer place-items-center rounded-xl text-ink-soft ring-1 ring-line hover:bg-mist hover:text-ink max-lg:h-11 max-lg:w-full"
                    >
                      <X className="size-5" aria-hidden />
                    </button>
                  ) : (
                    <span className="hidden size-16 lg:block" aria-hidden />
                  )}
                </div>
              )}
            </motion.div>
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
            className="inline-flex h-11 cursor-pointer items-center gap-2 self-start rounded-full px-4 font-semibold text-action ring-1 ring-line hover:bg-mist disabled:cursor-not-allowed disabled:opacity-50"
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
        "inline-flex h-16 cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-action px-7 text-[1.0625rem] font-semibold text-white transition-colors hover:bg-action-deep active:scale-[0.99]",
        className,
      )}
    >
      <MagnifyingGlass className="size-5" weight="bold" aria-hidden />
      Search flights
    </button>
  );
}
