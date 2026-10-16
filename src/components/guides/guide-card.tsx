import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import { readingMinutes, topicById, type Guide } from "@/content/guides";
import { longDate } from "./format";

type Props = { guide: Guide; headingLevel?: "h2" | "h3"; priority?: boolean };

/** Grid card: photo, topic, title, two lines of excerpt, date and reading time. */
export function GuideCard({ guide: g, headingLevel: H = "h3", priority }: Props) {
  return (
    <Link href={`/travel-guides/${g.slug}`} className="group flex h-full flex-col rounded-(--radius-card) focus-visible:outline-offset-4">
      <div className="relative aspect-[3/2] overflow-hidden rounded-(--radius-card)">
        <SmartImage
          photo={g.photo}
          priority={priority}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          imgClassName="transition-transform duration-700 ease-(--ease-out-quint) group-hover:scale-[1.04]"
        />
      </div>
      <p className="mt-4 text-[0.875rem] font-medium text-action">{topicById[g.topic].label}</p>
      <H className="mt-1.5 font-display-tight text-[1.3125rem] leading-snug font-bold text-ink group-hover:text-action">{g.title}</H>
      <p className="mt-2 line-clamp-2 text-[0.9375rem] leading-relaxed text-ink-soft">{g.excerpt}</p>
      <p className="mt-auto pt-3 text-[0.8125rem] text-ink-soft">
        <time dateTime={g.updated ?? g.published}>{longDate(g.updated ?? g.published)}</time>{`, ${readingMinutes(g)} min read`}
      </p>
    </Link>
  );
}
