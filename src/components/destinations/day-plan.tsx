"use client";

import { useId, useState } from "react";
import { CaretDown, Moon, Sun, SunHorizon, type Icon } from "@phosphor-icons/react";
import clsx from "clsx";
import { SmartImage } from "@/components/ui/smart-image";
import { DisclosurePanel } from "@/components/ui/disclosure-panel";
import { depthCopy, type DestinationDepth } from "@/content/destination-depth";

const copy = depthCopy.plan;
const parts: { key: "morning" | "afternoon" | "evening"; icon: Icon }[] = [
  { key: "morning", icon: SunHorizon },
  { key: "afternoon", icon: Sun },
  { key: "evening", icon: Moon },
];

/**
 * The 3-day plan as photo day cards (Batch 22): the photo, the day's title and
 * its stops by name; morning, afternoon and evening open per card. The text is
 * always in the HTML (DisclosurePanel), only folded away.
 */
export function DayPlan({ days, itinerary }: { days: DestinationDepth["visual"]["days"]; itinerary: DestinationDepth["itinerary"] }) {
  const [open, setOpen] = useState<number[]>([]);
  const base = useId();
  return (
    <ol className="grid gap-5 md:grid-cols-3">
      {days.map((day, i) => {
        const plan = itinerary[i];
        const isOpen = open.includes(i);
        const btn = `${base}-d${i}`;
        const panel = `${base}-p${i}`;
        return (
          <li key={i} className="flex flex-col overflow-hidden rounded-(--radius-card) bg-white ring-1 ring-line">
            <div className="relative aspect-[3/2]">
              <SmartImage photo={day.photo} sizes="(min-width: 768px) 400px, 100vw" />
              <span className="absolute top-3 left-3 rounded-full bg-ink px-3 py-1 font-display-tight text-[0.875rem] font-bold text-sun">{copy.day(i + 1)}</span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display-tight text-[1.25rem] leading-snug font-bold text-ink">{plan?.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {day.stops.map((stop) => (
                  <li key={stop} className="rounded-full bg-mist px-3 py-1 text-[0.875rem] text-ink">
                    {stop}
                  </li>
                ))}
              </ul>
              {plan && (
                <>
                  <button
                    id={btn}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen((o) => (isOpen ? o.filter((x) => x !== i) : [...o, i]))}
                    className="mt-auto inline-flex min-h-11 cursor-pointer items-center gap-2 self-start pt-4 font-semibold text-action hover:underline"
                  >
                    {isOpen ? depthCopy.dayPlan.hide : depthCopy.dayPlan.show}
                    <CaretDown className={clsx("size-4 transition-transform duration-300 motion-reduce:transition-none", isOpen && "rotate-180")} weight="bold" aria-hidden />
                  </button>
                  <DisclosurePanel id={panel} labelledBy={btn} open={isOpen}>
                    <dl className="mt-3 space-y-3 border-t border-line pt-4">
                      {parts.map(({ key, icon: PartIcon }) => (
                        <div key={key} className="flex gap-3">
                          <PartIcon className="mt-0.5 size-5 shrink-0 text-action" weight="duotone" aria-hidden />
                          <div>
                            <dt className="text-[0.8125rem] font-semibold text-ink">{copy.parts[key]}</dt>
                            <dd className="mt-0.5 text-[0.9375rem] leading-relaxed text-ink-soft">{plan[key]}</dd>
                          </div>
                        </div>
                      ))}
                    </dl>
                  </DisclosurePanel>
                </>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
