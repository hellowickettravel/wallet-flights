"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { AirplaneLanding, AirplaneTakeoff, ArrowsDownUp, CalendarBlank, Clock, Minus, Plus, Prohibit, UsersThree, XCircle, AirplaneTilt, Shuffle } from "@phosphor-icons/react";
import {
  airlineGroups,
  compensationCopy,
  questions,
  regionGroups,
  rightsAirlineByCode,
  rightsAirlines,
  rightsAirportByCode,
  rightsAirports,
  type DelayBand,
  type Notice,
  type Reason,
  type What,
} from "@/content/compensation";
import { site } from "@/content/site";
import { assess, formatMoney } from "@/lib/compensation";
import { ChoiceGroup } from "./choice-group";
import { ResultTicket } from "./result-ticket";
import { ClaimOptions, labelOf } from "./claim-options";

const copy = compensationCopy.form;

type State = { from: string; to: string; air: string; what: What; delay: DelayBand; notice: Notice; why: Reason; pax: number; date: string };

const whatIcons: Record<What, React.ReactNode> = {
  delayed: <Clock className="size-5" weight="bold" aria-hidden />,
  cancelled: <XCircle className="size-5" weight="bold" aria-hidden />,
  denied: <Prohibit className="size-5" weight="bold" aria-hidden />,
  missed: <Shuffle className="size-5" weight="bold" aria-hidden />,
};

const pick = <T extends string>(v: string | null, list: readonly { v: T }[], fallback: T): T => list.find((o) => o.v === v)?.v ?? fallback;
const isoDaysAgo = (n: number) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);

function fromParams(p: URLSearchParams): State {
  const code = (k: string, list: Record<string, unknown>, fallback: string) => {
    const v = (p.get(k) ?? "").toUpperCase();
    return v in list ? v : fallback;
  };
  const date = p.get("date") ?? "";
  return {
    from: code("from", rightsAirportByCode, "LGW"),
    to: code("to", rightsAirportByCode, "FAO"),
    air: code("air", rightsAirlineByCode, "U2"),
    what: pick(p.get("what"), questions.what.options, "delayed"),
    delay: pick(p.get("delay"), questions.delay.options, "3to4"),
    notice: pick(p.get("notice"), questions.notice.options, "lt7"),
    why: pick(p.get("why"), questions.reason.options, "tech"),
    pax: Math.min(9, Math.max(1, Number.parseInt(p.get("pax") ?? "", 10) || 1)),
    date: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : isoDaysAgo(9),
  };
}

const toQuery = (s: State) => new URLSearchParams({ from: s.from, to: s.to, air: s.air, what: s.what, delay: s.delay, notice: s.notice, why: s.why, pax: String(s.pax), date: s.date });

/** Labelled select styled like the search fields (label inside the box). */
function SelectField({ label, hint, icon, value, onChange, children }: { label: string; hint?: string; icon: React.ReactNode; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  const id = useId();
  return (
    <div>
      <div className="relative flex h-16 items-center gap-3 rounded-xl bg-white px-4 ring-1 ring-line transition-shadow focus-within:ring-2 focus-within:ring-action hover:ring-ink/30">
        <span className="text-ink-soft">{icon}</span>
        <div className="min-w-0 flex-1">
          <label htmlFor={id} className="block text-[0.75rem] font-medium text-ink-soft">
            {label}
          </label>
          <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-describedby={hint ? `${id}-hint` : undefined}
            className="-ml-1 w-full cursor-pointer truncate bg-transparent text-[1.0625rem] font-semibold text-ink outline-none"
          >
            {children}
          </select>
        </div>
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 px-1 text-[0.8125rem] text-ink-soft">
          {hint}
        </p>
      )}
    </div>
  );
}

export function Checker() {
  const params = useSearchParams();
  const [s, setS] = useState<State>(() => fromParams(new URLSearchParams(params.toString())));
  const today = new Date().toISOString().slice(0, 10);
  const update = (patch: Partial<State>) => {
    const next = { ...s, ...patch };
    setS(next);
    window.history.replaceState(null, "", `/flight-delay-compensation?${toQuery(next)}`);
  };

  const from = rightsAirportByCode[s.from];
  const to = rightsAirportByCode[s.to];
  const airline = rightsAirlineByCode[s.air];
  const result = useMemo(
    () => assess({ from, to, airline, what: s.what, delay: s.delay, notice: s.notice, reason: s.why, passengers: s.pax, date: s.date }, today),
    [from, to, airline, s, today],
  );
  const same = s.from === s.to;

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

  const airportOptions = regionGroups.map((g) => (
    <optgroup key={g.region} label={g.label}>
      {rightsAirports
        .filter((a) => a.region === g.region)
        .map((a) => (
          <option key={a.code} value={a.code}>
            {a.name.includes(a.city) ? a.name : `${a.city} ${a.name}`} ({a.code})
          </option>
        ))}
    </optgroup>
  ));

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

          <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-start">
            <SelectField label={copy.from} icon={<AirplaneTakeoff className="size-5" aria-hidden />} value={s.from} onChange={(v) => update({ from: v })}>
              {airportOptions}
            </SelectField>
            <button
              type="button"
              aria-label={copy.swap}
              onClick={() => update({ from: s.to, to: s.from })}
              className="mx-auto -my-4 grid size-10 cursor-pointer place-items-center rounded-full bg-white text-action ring-1 ring-line transition-colors hover:bg-mist md:my-3 md:-rotate-90"
            >
              <ArrowsDownUp className="size-5" weight="bold" aria-hidden />
            </button>
            <SelectField label={copy.to} hint={copy.toHint} icon={<AirplaneLanding className="size-5" aria-hidden />} value={s.to} onChange={(v) => update({ to: v })}>
              {airportOptions}
            </SelectField>
          </div>
          {same && (
            <p role="alert" className="mt-2 px-1 text-[0.875rem] font-medium text-red-700">
              Choose two different airports.
            </p>
          )}

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <SelectField label={copy.airline} hint={copy.airlineHint} icon={<AirplaneTilt className="size-5" aria-hidden />} value={s.air} onChange={(v) => update({ air: v })}>
              {airlineGroups.map((g) => (
                <optgroup key={g.region} label={g.label}>
                  {rightsAirlines
                    .filter((a) => a.region === g.region)
                    .map((a) => (
                      <option key={a.code} value={a.code}>
                        {a.name}
                      </option>
                    ))}
                </optgroup>
              ))}
            </SelectField>
            <DateField value={s.date} max={today} onChange={(date) => update({ date })} />
          </div>

          <div className="mt-8 space-y-7 border-t border-line pt-7">
            <ChoiceGroup
              label={questions.what.label}
              size="large"
              options={questions.what.options.map((o) => ({ ...o, icon: whatIcons[o.v] }))}
              value={s.what}
              onChange={(what) => update({ what })}
            />
            {(s.what === "delayed" || s.what === "missed") && (
              <ChoiceGroup label={questions.delay.label} hint={questions.delay.hint} options={questions.delay.options} value={s.delay} onChange={(delay) => update({ delay })} />
            )}
            {s.what === "cancelled" && (
              <ChoiceGroup
                label={questions.notice.label}
                hint={questions.notice.hint}
                options={questions.notice.options}
                value={s.notice}
                onChange={(notice) => update({ notice })}
                columns="grid-cols-1 sm:grid-cols-3"
              />
            )}
            {s.what !== "denied" && <ChoiceGroup label={questions.reason.label} options={questions.reason.options} value={s.why} onChange={(why) => update({ why })} />}

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
          <ResultTicket result={result} passengers={s.pax} />
          <p className="mt-3 px-1 text-[0.8125rem] leading-relaxed text-ink-soft">{compensationCopy.result.disclaimer}</p>
        </div>
      </div>

      <ClaimOptions
        result={result}
        shareUrl={shareUrl}
        facts={{
          from: `${from.city} (${from.code})`,
          to: `${to.city} (${to.code})`,
          airline: airline.name.replace(/ \((UK)\)$/, ""),
          date: s.date,
          what: s.what,
          delayLabel: labelOf.delay(s.delay),
          noticeLabel: labelOf.notice(s.notice),
          reasonLabel: labelOf.reason(s.why),
          passengers: s.pax,
        }}
      />

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
          {result.verdict === "not" ? compensationCopy.result.not : result.verdict === "maybe" ? compensationCopy.result.maybe : compensationCopy.result.owed}
        </span>
        <span className="tabular font-display-tight text-[1.375rem] font-extrabold text-sun">
          {formatMoney(result.total, result.currency)}
          <span className="sr-only"> in total. See how we worked it out</span>
        </span>
      </a>
    </>
  );
}

function DateField({ value, max, onChange }: { value: string; max: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
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
          onChange={(e) => e.target.value && onChange(e.target.value)}
          className="w-full bg-transparent text-[1.0625rem] font-semibold text-ink outline-none"
        />
      </div>
    </div>
  );
}
