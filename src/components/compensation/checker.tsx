"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { AirplaneLanding, AirplaneTakeoff, ArrowsDownUp, CalendarBlank, CheckCircle, Circle, Clock, Minus, Plus, Prohibit, UsersThree, XCircle, AirplaneTilt, Shuffle } from "@phosphor-icons/react";
import { AirportField } from "@/components/search/airport-field";
import type { Airport } from "@/content/airports";
import {
  compensationCopy,
  questions,
  regionForCountry,
  rightsAirlineByCode,
  rightsAirportByCode,
  type AirlineBase,
  type DelayBand,
  type Notice,
  type Reason,
  type Region,
  type RightsAirport,
  type What,
} from "@/content/compensation";
import { site } from "@/content/site";
import { assess, formatMoney } from "@/lib/compensation";
import type { Place } from "@/lib/travel-data";
import { ChoiceGroup } from "./choice-group";
import { ResultTicket } from "./result-ticket";
import { ClaimOptions, labelOf } from "./claim-options";
import { AirlineField, type AirlinePick } from "./airline-field";

const copy = compensationCopy.form;
const pcopy = compensationCopy.progress;
const ecopy = compensationCopy.example;

/** Every answer starts empty: nothing is filled in until the visitor (or a share link) says so. */
type State = { from: string; to: string; air: string; base: AirlineBase | ""; what: What | ""; delay: DelayBand | ""; notice: Notice | ""; why: Reason | ""; pax: number; date: string };

const whatIcons: Record<What, React.ReactNode> = {
  delayed: <Clock className="size-5" weight="bold" aria-hidden />,
  cancelled: <XCircle className="size-5" weight="bold" aria-hidden />,
  denied: <Prohibit className="size-5" weight="bold" aria-hidden />,
  missed: <Shuffle className="size-5" weight="bold" aria-hidden />,
};

const pick = <T extends string>(v: string | null, list: readonly { v: T }[]): T | "" => list.find((o) => o.v === v)?.v ?? "";
const codeParam = (v: string | null, re: RegExp) => {
  const c = (v ?? "").toUpperCase();
  return re.test(c) ? c : "";
};

function fromParams(p: URLSearchParams): State {
  const date = p.get("date") ?? "";
  return {
    from: codeParam(p.get("from"), /^[A-Z]{3}$/),
    to: codeParam(p.get("to"), /^[A-Z]{3}$/),
    air: codeParam(p.get("air"), /^[A-Z0-9]{2}$/),
    base: pick(p.get("base"), questions.airlineBase.options),
    what: pick(p.get("what"), questions.what.options),
    delay: pick(p.get("delay"), questions.delay.options),
    notice: pick(p.get("notice"), questions.notice.options),
    why: pick(p.get("why"), questions.reason.options),
    pax: Math.min(9, Math.max(1, Number.parseInt(p.get("pax") ?? "", 10) || 1)),
    date: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : "",
  };
}

const emptyState: State = { from: "", to: "", air: "", base: "", what: "", delay: "", notice: "", why: "", pax: 1, date: "" };

/** The labelled worked example (src/content/compensation.ts), dated relative to today. */
function exampleState(today: string): State {
  const { daysAgo, ...f } = compensationCopy.example.flight;
  const d = new Date(`${today}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - daysAgo);
  return { ...emptyState, ...(f as Partial<State>), date: d.toISOString().slice(0, 10) };
}

/** Only the answers given so far go in the URL. */
function toQuery(s: State) {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(s)) if (v !== "" && !(k === "pax" && v === 1)) q.set(k, String(v));
  return q;
}

const toRights = (p: Place): RightsAirport => ({ code: p.code, city: p.city, name: p.name, region: regionForCountry(p.countryCode), lat: p.lat, lon: p.lon });

type PlaceLookup = { place: RightsAirport | null; label: Airport | null; loading: boolean; failed: boolean };

/**
 * The rules need each airport's country and position. Airports on our own
 * list are known at once; any other airport or city is looked up.
 */
function usePlace(placeCode: string): PlaceLookup {
  const known = placeCode ? rightsAirportByCode[placeCode] : undefined;
  const [got, setGot] = useState<{ code: string; place: RightsAirport | null; label: Airport | null } | null>(null);
  useEffect(() => {
    if (!placeCode || known) return;
    const ctrl = new AbortController();
    fetch(`/api/airport?code=${placeCode}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? (r.json() as Promise<Place>) : null))
      .then((p) => setGot({ code: placeCode, place: p && toRights(p), label: p && { code: p.code, city: p.city, name: p.name, country: p.country } }))
      .catch((e: Error) => {
        if (e.name !== "AbortError") setGot({ code: placeCode, place: null, label: null });
      });
    return () => ctrl.abort();
  }, [placeCode, known]);
  if (!placeCode) return { place: null, label: null, loading: false, failed: false };
  if (known) return { place: known, label: { code: known.code, city: known.city, name: known.name, country: "" }, loading: false, failed: false };
  if (got?.code === placeCode) return { place: got.place, label: got.label, loading: false, failed: !got.place };
  return { place: null, label: null, loading: true, failed: false };
}

/** The chosen airline, with its licence country when we hold it (null: we don't, so the visitor is asked if it matters). */
type AirlineLookup = { code: string; name: string; region: Region | null };

function useAirline(airCode: string): AirlineLookup | null {
  const known = airCode ? rightsAirlineByCode[airCode] : undefined;
  const [got, setGot] = useState<{ code: string; name: string | null } | null>(null);
  useEffect(() => {
    if (!airCode || known) return;
    const ctrl = new AbortController();
    fetch(`/api/airlines?code=${airCode}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? (r.json() as Promise<AirlinePick>) : null))
      .then((a) => setGot({ code: airCode, name: a?.name ?? null }))
      .catch((e: Error) => {
        if (e.name !== "AbortError") setGot({ code: airCode, name: null });
      });
    return () => ctrl.abort();
  }, [airCode, known]);
  if (!airCode) return null;
  if (known) return known;
  if (got?.code === airCode) return { code: airCode, name: got.name ?? airCode, region: null };
  return null;
}

export function Checker() {
  const params = useSearchParams();
  // A first visit (no answers in the link) opens on the labelled example, so the
  // page shows what it works out straight away; a share link opens as given.
  const [isExample, setIsExample] = useState(() => params.toString() === "");
  const [s, setS] = useState<State>(() =>
    params.toString() === "" ? exampleState(new Date().toISOString().slice(0, 10)) : fromParams(new URLSearchParams(params.toString())),
  );
  // Labels for what the visitor picked, shown while a lookup is still running.
  const [picked, setPicked] = useState<{ places: Record<string, Airport>; airlines: Record<string, AirlinePick> }>({ places: {}, airlines: {} });
  const today = new Date().toISOString().slice(0, 10);
  const update = (patch: Partial<State>) => {
    const next = { ...s, ...patch };
    // The first change makes the answers the visitor's own.
    setIsExample(false);
    setS(next);
    const qs = toQuery(next).toString();
    window.history.replaceState(null, "", `/flight-delay-compensation${qs ? `?${qs}` : ""}`);
  };

  const fromP = usePlace(s.from);
  const toP = usePlace(s.to);
  const airline = useAirline(s.air);
  const from = fromP.place;
  const to = toP.place;
  const same = !!s.from && s.from === s.to;

  // The airline's base only matters when flying into the UK or EU from elsewhere.
  const needBase = !!airline && airline.region === null && from?.region === "X" && !!to && to.region !== "X";
  const steps: { key: keyof typeof pcopy.items; done: boolean }[] = [
    { key: "from", done: !!from },
    { key: "to", done: !!to && !same },
    { key: "airline", done: !!airline },
    ...(needBase ? [{ key: "airlineBase" as const, done: !!s.base }] : []),
    { key: "date", done: !!s.date },
    { key: "what", done: !!s.what },
    ...(s.what === "delayed" || s.what === "missed" ? [{ key: "delay" as const, done: !!s.delay }] : []),
    ...(s.what === "cancelled" ? [{ key: "notice" as const, done: !!s.notice }] : []),
    ...(s.what && s.what !== "denied" ? [{ key: "reason" as const, done: !!s.why }] : []),
  ];
  const left = steps.filter((x) => !x.done).length;

  const result = useMemo(() => {
    if (left > 0 || !from || !to || !airline || !s.what) return null;
    // An airline we don't hold a licence country for only gets here when it doesn't matter, or the visitor said.
    const region: Region = airline.region ?? (s.base || "X");
    return assess(
      { from, to, airline: { ...airline, region }, what: s.what, delay: s.delay || "lt2", notice: s.notice || "gt14", reason: s.why || "none", passengers: s.pax, date: s.date },
      today,
    );
  }, [left, from, to, airline, s, today]);

  // Phones: a slim bar keeps the live amount in view while the form is filled in.
  const resultRef = useRef<HTMLDivElement>(null);
  const [resultVisible, setResultVisible] = useState(false);
  useEffect(() => {
    const el = resultRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setResultVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Rendered in the browser only (it reads the URL), so window is always there.
  const origin = typeof window === "undefined" ? site.url : window.location.origin;
  const shareUrl = `${origin}/flight-delay-compensation?${toQuery(s)}`;

  const fieldValue = (c: string, p: PlaceLookup): Airport | null => (c ? (picked.places[c] ?? p.label ?? { code: c, city: c, name: "", country: "" }) : null);
  const airlineValue: AirlinePick | null = s.air ? (picked.airlines[s.air] ?? (airline ? { code: airline.code, name: airline.name } : { code: s.air, name: s.air })) : null;
  const placeError = (p: PlaceLookup) => (p.failed ? "We couldn’t look up that airport. Try another, or check the spelling." : undefined);
  const choosePlace = (field: "from" | "to") => (a: Airport | null) => {
    if (a) setPicked((p) => ({ ...p, places: { ...p.places, [a.code]: a } }));
    update({ [field]: a?.code ?? "" });
  };

  return (
    <>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start xl:gap-10">
        <form
          onSubmit={(e) => e.preventDefault()}
          aria-labelledby="form-title"
          className="rounded-(--radius-panel) bg-white p-5 shadow-(--shadow-float) ring-1 ring-line md:p-8"
        >
          <h2 id="form-title" className="font-display-tight text-[1.5rem] font-bold text-ink md:text-[1.75rem]">
            {copy.title}
          </h2>
          {isExample && (
            <div data-testid="compensation-example" className="mt-4 flex flex-col gap-3 rounded-xl bg-sun/15 p-4 ring-1 ring-sun/50 sm:flex-row sm:items-center">
              <p className="flex-1 text-[0.9375rem] leading-snug text-ink">
                <span className="mr-2 inline-block rounded-full bg-sun px-2 py-0.5 text-[0.75rem] font-bold text-ink">{ecopy.label}</span>
                {ecopy.text}
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsExample(false);
                  setS(emptyState);
                  window.history.replaceState(null, "", "/flight-delay-compensation");
                }}
                className="h-11 shrink-0 cursor-pointer rounded-full bg-white px-5 text-[0.9375rem] font-semibold text-ink ring-1 ring-line transition-colors hover:bg-mist"
              >
                {ecopy.clear}
              </button>
            </div>
          )}

          <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-start">
            <AirportField
              label={copy.from}
              icon={<AirplaneTakeoff className="size-5" aria-hidden />}
              value={fieldValue(s.from, fromP)}
              onChange={choosePlace("from")}
              placeholder={copy.placeFrom}
              error={placeError(fromP)}
            />
            <button
              type="button"
              aria-label={copy.swap}
              onClick={() => update({ from: s.to, to: s.from })}
              className="mx-auto -my-4 grid size-10 cursor-pointer place-items-center rounded-full bg-white text-action ring-1 ring-line transition-colors hover:bg-mist md:my-3 md:-rotate-90"
            >
              <ArrowsDownUp className="size-5" weight="bold" aria-hidden />
            </button>
            <div>
              <AirportField
                label={copy.to}
                icon={<AirplaneLanding className="size-5" aria-hidden />}
                value={fieldValue(s.to, toP)}
                onChange={choosePlace("to")}
                placeholder={copy.placeFrom}
                error={placeError(toP)}
              />
              {!toP.failed && <p className="mt-1.5 px-1 text-[0.8125rem] text-ink-soft">{copy.toHint}</p>}
            </div>
          </div>
          {same && (
            <p role="alert" className="mt-2 px-1 text-[0.875rem] font-medium text-red-700">
              Choose two different airports.
            </p>
          )}

          <div className="mt-3 grid gap-3 md:grid-cols-2 md:items-start">
            <AirlineField
              label={copy.airline}
              hint={copy.airlineHint}
              icon={<AirplaneTilt className="size-5" aria-hidden />}
              value={airlineValue}
              onChange={(a) => {
                if (a) setPicked((p) => ({ ...p, airlines: { ...p.airlines, [a.code]: a } }));
                update({ air: a?.code ?? "", base: "" });
              }}
              placeholder={copy.placeAirline}
            />
            <DateField value={s.date} max={today} onChange={(date) => update({ date })} />
          </div>

          {needBase && airline && (
            <div className="mt-6">
              <ChoiceGroup
                label={questions.airlineBase.label(airline.name)}
                hint={questions.airlineBase.hint}
                options={questions.airlineBase.options}
                value={s.base || null}
                onChange={(base) => update({ base })}
                columns="grid-cols-1 sm:grid-cols-3"
              />
            </div>
          )}

          <div className="mt-8 space-y-7 border-t border-line pt-7">
            <ChoiceGroup
              label={questions.what.label}
              size="large"
              options={questions.what.options.map((o) => ({ ...o, icon: whatIcons[o.v] }))}
              value={s.what || null}
              onChange={(what) => update({ what })}
            />
            {(s.what === "delayed" || s.what === "missed") && (
              <ChoiceGroup label={questions.delay.label} hint={questions.delay.hint} options={questions.delay.options} value={s.delay || null} onChange={(delay) => update({ delay })} />
            )}
            {s.what === "cancelled" && (
              <ChoiceGroup
                label={questions.notice.label}
                hint={questions.notice.hint}
                options={questions.notice.options}
                value={s.notice || null}
                onChange={(notice) => update({ notice })}
                columns="grid-cols-1 sm:grid-cols-3"
              />
            )}
            {s.what && s.what !== "denied" && (
              <ChoiceGroup label={questions.reason.label} options={questions.reason.options} value={s.why || null} onChange={(why) => update({ why })} />
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-7">
              <p id="pax-label" className="flex items-center gap-3 text-[0.9375rem] font-semibold text-ink">
                <UsersThree className="size-5 text-ink-soft" aria-hidden />
                {copy.passengers}
              </p>
              <div role="group" aria-labelledby="pax-label" className="flex items-center gap-1 rounded-full bg-mist p-1">
                <button
                  type="button"
                  onClick={() => update({ pax: Math.max(1, s.pax - 1) })}
                  disabled={s.pax <= 1}
                  aria-label="One fewer passenger"
                  className="grid size-10 cursor-pointer place-items-center rounded-full bg-white text-ink ring-1 ring-line hover:ring-ink/30 disabled:cursor-default disabled:opacity-40"
                >
                  <Minus className="size-4" weight="bold" aria-hidden />
                </button>
                <output aria-live="polite" className="tabular w-10 text-center text-[1.125rem] font-bold text-ink">
                  {s.pax}
                </output>
                <button
                  type="button"
                  onClick={() => update({ pax: Math.min(9, s.pax + 1) })}
                  disabled={s.pax >= 9}
                  aria-label="One more passenger"
                  className="grid size-10 cursor-pointer place-items-center rounded-full bg-white text-ink ring-1 ring-line hover:ring-ink/30 disabled:cursor-default disabled:opacity-40"
                >
                  <Plus className="size-4" weight="bold" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </form>

        <div ref={resultRef} className="lg:sticky lg:top-24">
          {result ? (
            <ResultTicket result={result} passengers={s.pax} example={isExample} />
          ) : (
            <section id="result" aria-labelledby="result-title" className="rounded-(--radius-panel) bg-board p-6 text-white shadow-(--shadow-float) md:p-7">
              <h2 id="result-title" className="font-display-tight text-[1.375rem] font-bold">
                {pcopy.title}
              </h2>
              <p aria-live="polite" className="mt-1 text-white/75">
                {fromP.loading || toP.loading ? pcopy.lookup : pcopy.left(left)}
              </p>
              <ul className="mt-5 space-y-2.5">
                {steps.map((x) => (
                  <li key={x.key} className="flex items-center gap-3 text-[0.9375rem]">
                    {x.done ? <CheckCircle className="size-5 shrink-0 text-[#6fdca6]" weight="fill" aria-hidden /> : <Circle className="size-5 shrink-0 text-white/40" aria-hidden />}
                    <span className={x.done ? "text-white/60" : "font-semibold text-white"}>
                      {pcopy.items[x.key]}
                      <span className="sr-only">{x.done ? ": answered" : ": still needed"}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-white/15 pt-4 text-[0.875rem] leading-relaxed text-white/70">{pcopy.amounts}</p>
            </section>
          )}
          <p className="mt-3 px-1 text-[0.8125rem] leading-relaxed text-ink-soft">{compensationCopy.result.disclaimer}</p>
        </div>
      </div>

      {/* The claim letter and share link are for the visitor's own flight, not the example. */}
      {result && !isExample && from && to && airline && s.what && (
        <ClaimOptions
          result={result}
          shareUrl={shareUrl}
          facts={{
            from: `${from.city} (${from.code})`,
            to: `${to.city} (${to.code})`,
            airline: airline.name.replace(/ \((UK)\)$/, ""),
            date: s.date,
            what: s.what,
            delayLabel: s.delay ? labelOf.delay(s.delay) : "",
            noticeLabel: s.notice ? labelOf.notice(s.notice) : "",
            reasonLabel: s.why ? labelOf.reason(s.why) : "",
            passengers: s.pax,
          }}
        />
      )}

      {result && (
        <a
          href="#result"
          aria-hidden={resultVisible}
          tabIndex={resultVisible ? -1 : 0}
          className={clsx(
            "fixed inset-x-3 bottom-3 z-30 flex items-center justify-between gap-3 rounded-2xl bg-board px-5 py-3 text-white shadow-(--shadow-pop) transition-[transform,opacity] duration-300 lg:hidden",
            resultVisible ? "pointer-events-none translate-y-4 opacity-0" : "translate-y-0 opacity-100",
          )}
        >
          <span className="text-[0.875rem] text-white/80">
            {isExample && `${ecopy.label}: `}
            {result.verdict === "not" ? compensationCopy.result.not : result.verdict === "maybe" ? compensationCopy.result.maybe : compensationCopy.result.owed}
          </span>
          <span className="tabular font-display-tight text-[1.375rem] font-extrabold text-sun">
            {formatMoney(result.total, result.currency)}
            <span className="sr-only"> in total. See how we worked it out</span>
          </span>
        </a>
      )}
    </>
  );
}

function DateField({ value, max, onChange }: { value: string; max: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <div>
      <div className="flex h-16 items-center gap-3 rounded-xl bg-white px-4 ring-1 ring-line transition-shadow focus-within:ring-2 focus-within:ring-action hover:ring-ink/30">
        <CalendarBlank className="size-5 shrink-0 text-ink-soft" aria-hidden />
        <div className="min-w-0 flex-1">
          <label htmlFor={id} className="block text-[0.75rem] font-medium text-ink-soft">
            {copy.date}
          </label>
          <input
            id={id}
            type="date"
            value={value}
            max={max}
            onChange={(e) => onChange(e.target.value)}
            aria-describedby={`${id}-hint`}
            className={clsx("w-full bg-transparent text-[1.0625rem] font-semibold outline-none", value ? "text-ink" : "text-ink-soft")}
          />
        </div>
      </div>
      <p id={`${id}-hint`} className="mt-1.5 px-1 text-[0.8125rem] text-ink-soft">
        {copy.dateHint}
      </p>
    </div>
  );
}
