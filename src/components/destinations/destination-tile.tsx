import Link from "next/link";
import clsx from "clsx";
import { SmartImage } from "@/components/ui/smart-image";
import type { Destination } from "@/content/destinations";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function DestinationTile({ d, size = "md", priority }: { d: Destination; size?: "md" | "lg"; priority?: boolean }) {
  return (
    <Link
      href={`/destinations/${d.slug}`}
      className={clsx(
        "group relative block overflow-hidden rounded-(--radius-card) focus-visible:outline-offset-4",
        size === "lg" ? "aspect-[4/3] sm:aspect-[16/10]" : "aspect-[4/3]",
      )}
    >
      <SmartImage
        photo={d.photo}
        priority={priority}
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
        imgClassName="transition-transform duration-700 ease-(--ease-out-quint) group-hover:scale-[1.05]"
      />
      <span aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(15_31_61/0.82)_0%,rgb(15_31_61/0.2)_50%,transparent_75%)]" />
      <span className="absolute top-3 right-3 rounded-full bg-white px-3 py-1 text-[0.8125rem] font-semibold text-ink">
        from <span className="tabular text-fare">{usd.format(d.fromPrice)}</span>
      </span>
      <span className="absolute inset-x-0 bottom-0 p-5">
        <span className="block font-display-tight text-[1.5rem] font-bold text-white">{d.city}</span>
        <span className="block text-[0.875rem] text-white/80">{d.country}</span>
      </span>
    </Link>
  );
}
