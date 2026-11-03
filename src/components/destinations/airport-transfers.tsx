import { ArrowUpRight, Bus, Subway, Taxi, Train } from "@phosphor-icons/react/dist/ssr";
import { depthCopy, modeLabel, type AirportGuide, type TransferMode } from "@/content/destination-depth";
import { longDate } from "@/components/guides/format";

const icons: Record<TransferMode, typeof Train> = { train: Train, metro: Subway, bus: Bus, taxi: Taxi };

function SourceLink({ label, url }: { label: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-semibold text-action hover:underline">
      {label}
      <ArrowUpRight className="size-3.5" weight="bold" aria-hidden />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/** Each airport with the ways into town: service, destination, time and (checked) fare. */
export function AirportTransfers({ city, airports, checked }: { city: string; airports: AirportGuide[]; checked: string }) {
  const sources = airports.flatMap((a) => (a.officialPage ? [a.officialPage] : []));
  return (
    <section aria-labelledby="airports-title" className="mt-12">
      <h2 id="airports-title" className="font-display-tight text-[1.75rem] font-bold text-ink md:text-[2.25rem]">
        {depthCopy.airports.title(city)}
      </h2>
      <div className="mt-6 space-y-8">
        {airports.map((a) => (
          <div key={a.code}>
            <h3 className="text-[1.125rem] font-semibold text-ink">
              {a.name} <span className="font-normal text-ink-soft">({a.code})</span>
            </h3>
            <p className="mt-1 leading-relaxed text-ink-soft">{a.summary}</p>
            <ul className="mt-4 divide-y divide-line rounded-(--radius-card) ring-1 ring-line">
              {a.transfers.map((t) => {
                const Icon = icons[t.mode];
                return (
                  <li key={t.name} className="grid gap-x-4 gap-y-1 p-4 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
                    <Icon className="hidden size-6 text-action sm:block" aria-hidden />
                    <div className="min-w-0">
                      <p className="font-semibold text-ink">
                        <span className="sr-only">{modeLabel[t.mode]}: </span>
                        {t.name}
                      </p>
                      <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
                        To {t.to}
                        {t.time ? `, ${t.time}` : ""}.{t.note ? ` ${t.note}` : ""}
                      </p>
                    </div>
                    {t.fare && (
                      <p className="text-[0.9375rem] sm:max-w-[14rem] sm:text-right">
                        <span className="tabular block font-semibold text-fare">{t.fare.text}</span>
                        <a href={t.fare.source.url} target="_blank" rel="noopener" className="text-[0.8125rem] text-ink-soft underline decoration-line underline-offset-2 hover:text-action">
                          Source<span className="sr-only">: {t.fare.source.label} (opens in a new tab)</span>
                        </a>
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      {sources.length > 0 && (
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-soft">
          {depthCopy.airports.check}{" "}
          {sources.map((s, i) => (
            <span key={s.url}>
              {i > 0 && ", "}
              <SourceLink {...s} />
            </span>
          ))}
          . {depthCopy.airports.checked(longDate(checked))}
        </p>
      )}
    </section>
  );
}
