import { Clock } from "@phosphor-icons/react/dist/ssr";
import { SmartImage } from "@/components/ui/smart-image";
import type { DayTrip } from "@/content/destination-depth/types";

/** Day trips (Batch 22): three photo tiles, each with its journey time as a chip. */
export function DayTrips({ trips }: { trips: DayTrip[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {trips.map((t) => (
        <li key={t.name}>
          <div className="relative aspect-[3/2] overflow-hidden rounded-(--radius-card)">
            <SmartImage photo={t.photo} sizes="(min-width: 768px) 400px, 100vw" />
          </div>
          <h3 className="mt-4 font-display-tight text-[1.375rem] leading-tight font-bold text-ink">{t.name}</h3>
          <p className="mt-2 inline-flex items-start gap-1.5 rounded-2xl bg-mist px-3 py-1.5 text-[0.875rem] font-medium text-ink">
            <Clock className="mt-0.5 size-4 shrink-0 text-action" weight="bold" aria-hidden />
            {t.time}
          </p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{t.text}</p>
        </li>
      ))}
    </ul>
  );
}
