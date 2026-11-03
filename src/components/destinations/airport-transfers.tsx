import { ArrowUpRight, Bus, Subway, Taxi, Train } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { depthCopy, modeLabel, type AirportGuide, type TransferMode } from "@/content/destination-depth";
import { longDate } from "@/components/guides/format";

const icons: Record<TransferMode, typeof Train> = { train: Train, metro: Subway, bus: Bus, taxi: Taxi };

/**
 * One card per airport: where it is, then each way into town with its
 * journey time and, only when an official page gives one, its fare and source.
 * The main airport takes the full width when there are several.
 */
export function AirportTransfers({ airports, checked }: { airports: AirportGuide[]; checked: string }) {
  const sources = airports.flatMap((a) => (a.officialPage ? [a.officialPage] : []));
  return (
    <div>
      <ul className="grid gap-5 lg:grid-cols-2">
        {airports.map((a, i) => (
          <li key={a.code} className={clsx("flex flex-col rounded-(--radius-panel) bg-white p-6 ring-1 ring-line md:p-7", i === 0 && airports.length > 1 && "lg:col-span-2")}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-display-tight text-[1.375rem] font-bold text-ink">{a.name}</h3>
              <span className="rounded-full bg-ink px-2.5 py-0.5 font-display-tight text-[0.875rem] font-bold text-sun">{a.code}</span>
            </div>
            <p className="mt-2 leading-relaxed text-ink-soft">{a.summary}</p>
            <ul className={clsx("mt-5 grid gap-3", i === 0 && airports.length > 1 && "md:grid-cols-3")}>
              {a.transfers.map((t) => {
                const Icon = icons[t.mode];
                return (
                  <li key={t.name} className="flex gap-3 rounded-(--radius-card) bg-mist p-4">
                    <Icon className="mt-0.5 size-6 shrink-0 text-action" aria-hidden />
                    <div className="min-w-0">
                      <p className="font-semibold text-ink">
                        <span className="sr-only">{modeLabel[t.mode]}: </span>
                        {t.name}
                      </p>
                      <p className="mt-0.5 text-[0.9375rem] leading-relaxed text-ink-soft">To {t.to}</p>
                      {t.time && <p className="mt-2 text-[0.9375rem] font-medium text-ink">{t.time[0].toUpperCase() + t.time.slice(1)}</p>}
                      {t.fare && (
                        <p className="mt-1 text-[0.9375rem]">
                          <span className="tabular font-semibold text-fare">{t.fare.text}</span>{" "}
                          <a href={t.fare.source.url} target="_blank" rel="noopener" className="text-[0.8125rem] text-ink-soft underline decoration-line underline-offset-2 hover:text-action">
                            Source<span className="sr-only">: {t.fare.source.label} (opens in a new tab)</span>
                          </a>
                        </p>
                      )}
                      {t.note && <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">{t.note}</p>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
      {sources.length > 0 && (
        <p className="mt-6 max-w-3xl text-[0.9375rem] leading-relaxed text-ink-soft">
          {depthCopy.airports.check}{" "}
          {sources.map((s, i) => (
            <span key={s.url}>
              {i > 0 && ", "}
              <a href={s.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-semibold text-action hover:underline">
                {s.label}
                <ArrowUpRight className="size-3.5" weight="bold" aria-hidden />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </span>
          ))}
          . {depthCopy.airports.checked(longDate(checked))}
        </p>
      )}
    </div>
  );
}
