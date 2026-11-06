import clsx from "clsx";
import { monthNames, weatherLegend, type ClimateMonth } from "@/content/destination-depth";

type Rating = keyof typeof weatherLegend;

/**
 * Twelve months in a row, like a departures board: best-weather months in
 * ink with a sun mark, good months in mist, mixed months plain. The cheapest
 * month to fly (from recent fares) gets its own marker. Climate figures show
 * only when the guide has them with a source.
 */
export function MonthStrip({ weather, cheapestMonth, cheapestFrom, climate }: { weather: string; cheapestMonth?: number; cheapestFrom?: string; climate?: ClimateMonth[] }) {
  const ratings = [...weather] as Rating[];
  return (
    <div>
      <ol className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-12">
        {monthNames.map((name, i) => {
          const r = ratings[i] ?? "M";
          const cheapest = cheapestMonth === i;
          return (
            <li
              key={name}
              className={clsx(
                "relative flex min-h-28 min-w-0 flex-col justify-between gap-2 rounded-xl p-3",
                r === "B" && "bg-board text-white",
                r === "G" && "bg-mist text-ink",
                r === "M" && "bg-white text-ink ring-1 ring-line",
              )}
            >
              <span className="font-display-tight text-[1.125rem] font-bold">
                <abbr title={name} className="no-underline">
                  {name.slice(0, 3)}
                </abbr>
              </span>
              <span className={clsx("text-[0.8125rem]", r === "B" ? "text-sun" : "text-ink-soft")}>
                <span className="sr-only">{name}: </span>
                {weatherLegend[r].short}
                {climate?.[i] && (
                  <span className="mt-0.5 block tabular">
                    {climate[i].highC}° / {climate[i].lowC}°
                  </span>
                )}
              </span>
              {cheapest && (
                <span className="mt-2 inline-flex w-fit max-w-full items-center whitespace-nowrap rounded-full bg-fare px-1.5 py-0.5 text-[0.6875rem] font-semibold leading-tight text-white sm:px-2 sm:text-[0.75rem]">
                  Cheapest
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.875rem] text-ink-soft" aria-label="Key">
        <li className="flex items-center gap-2">
          <span className="size-3.5 rounded-sm bg-board" aria-hidden />
          {weatherLegend.B.label}
        </li>
        <li className="flex items-center gap-2">
          <span className="size-3.5 rounded-sm bg-mist ring-1 ring-line" aria-hidden />
          {weatherLegend.G.label}
        </li>
        <li className="flex items-center gap-2">
          <span className="size-3.5 rounded-sm bg-white ring-1 ring-line" aria-hidden />
          {weatherLegend.M.label}
        </li>
        {cheapestMonth !== undefined && (
          <li className="flex items-center gap-2">
            <span className="size-3.5 rounded-full bg-fare" aria-hidden />
            {cheapestFrom ? `Cheapest month to fly from ${cheapestFrom}, in recent fares` : "Cheapest month to fly in recent fares"}
          </li>
        )}
      </ul>
    </div>
  );
}
