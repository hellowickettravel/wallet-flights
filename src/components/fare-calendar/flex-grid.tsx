"use client";

import clsx from "clsx";
import type { Currency } from "@/content/deals";
import { fareCalendarCopy, weekdays } from "@/content/fare-calendar";
import { weekday } from "./model";
import { fmtShort } from "./day-fares";
import { useMoney } from "@/components/currency/currency-provider";

const copy = fareCalendarCopy.flex;

type Props = {
  leave: string[];
  back: string[];
  cells: (number | null)[][];
  min: number | null;
  /** The chosen pair sits in the middle (row 3, column 3). */
  onPick: (leave: string, back: string) => void;
  currency: Currency;
};

function Head({ date }: { date: string }) {
  return (
    <>
      <span className="block text-[0.75rem] font-medium text-ink-soft">{weekdays[weekday(date)]}</span>
      <span className="block text-[0.8125rem] font-semibold text-ink">{fmtShort(date).replace(/^\w+ /, "")}</span>
    </>
  );
}

/** ±3 days around the chosen outbound and return dates; picking a cell selects that pair. */
export function FlexGrid({ leave, back, cells, min, onPick, currency }: Props) {
  const money = useMoney();
  return (
    <section aria-labelledby="flex-title" className="rounded-(--radius-panel) bg-white p-5 ring-1 ring-line md:p-7">
      <h2 id="flex-title" className="font-display-tight text-[1.375rem] font-bold text-ink md:text-[1.5rem]">
        {copy.title}
      </h2>
      <p className="mt-1 text-[0.9375rem] text-ink-soft">{copy.intro}</p>
      <div className="-mx-5 mt-5 overflow-x-auto px-5 md:mx-0 md:px-0" tabIndex={0} role="region" aria-label="Flexible dates table, scrolls sideways">
        <table className="w-full min-w-[36rem] border-separate border-spacing-1 text-center">
          <caption className="sr-only">Return trip totals: rows are leaving dates, columns are return dates</caption>
          <thead>
            <tr>
              <th scope="col" className="w-24 p-1 text-left text-[0.75rem] font-medium text-ink-soft">
                {copy.corner}
              </th>
              {back.map((d, j) => (
                <th key={d} scope="col" className={clsx("rounded-lg p-1.5", j === 3 && "bg-mist")}>
                  <Head date={d} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leave.map((l, i) => (
              <tr key={l}>
                <th scope="row" className={clsx("rounded-lg p-1.5 text-left", i === 3 && "bg-mist")}>
                  <Head date={l} />
                </th>
                {cells[i].map((v, j) => {
                  const chosen = i === 3 && j === 3;
                  const cheapest = v !== null && v === min;
                  return (
                    <td key={back[j]} className="p-0">
                      {v === null ? (
                        <span className="grid h-12 place-items-center rounded-lg text-ink-soft/60" aria-label="No fare">
                          –
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onPick(l, back[j])}
                          aria-pressed={chosen}
                          aria-label={`Leave ${fmtShort(l)}, return ${fmtShort(back[j])}: ${money(v, currency)}${cheapest ? ", cheapest" : ""}`}
                          className={clsx(
                            "tabular h-12 w-full cursor-pointer rounded-lg text-[0.875rem] font-bold transition-[background-color,box-shadow]",
                            cheapest ? "bg-fare text-white hover:bg-fare-deep" : "bg-mist text-ink hover:ring-2 hover:ring-ink/20",
                            chosen && "ring-[3px] ring-ink",
                          )}
                        >
                          {money(v, currency)}
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
