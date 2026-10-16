import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import { readingMinutes, topicById, type Guide } from "@/content/guides";
import { longDate } from "./format";

/** The newest guide large on ink, the next two stacked beside it. */
export function FeaturedGuides({ guides }: { guides: Guide[] }) {
  const [lead, ...side] = guides;
  if (!lead) return null;
  return (
    <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr] lg:gap-8">
      <Link href={`/travel-guides/${lead.slug}`} className="group flex flex-col overflow-hidden rounded-(--radius-frame) bg-ink text-white">
        <div className="relative aspect-[16/10] overflow-hidden">
          <SmartImage
            photo={lead.photo}
            priority
            sizes="(min-width: 1280px) 740px, (min-width: 1024px) 58vw, 100vw"
            imgClassName="transition-transform duration-700 ease-(--ease-out-quint) group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <p className="text-[0.875rem] font-medium text-sun">{topicById[lead.topic].label}</p>
          <h2 className="mt-2 font-display-tight text-[1.75rem] leading-[1.12] font-bold text-balance md:text-[2.25rem]">{lead.title}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-white/75">{lead.excerpt}</p>
          <p className="mt-auto pt-5 text-[0.875rem] text-white/60">
            <time dateTime={lead.updated ?? lead.published}>{longDate(lead.updated ?? lead.published)}</time>{`, ${readingMinutes(lead)} min read`}
          </p>
        </div>
      </Link>
      <ul className="grid content-start gap-6 lg:gap-8">
        {side.map((g) => (
          <li key={g.slug}>
            <Link href={`/travel-guides/${g.slug}`} className="group grid grid-cols-[7.5rem_1fr] gap-4 rounded-(--radius-card) focus-visible:outline-offset-4 sm:grid-cols-[12rem_1fr] sm:gap-5 lg:grid-cols-1">
              <div className="relative aspect-square overflow-hidden rounded-(--radius-card) sm:aspect-[4/3] lg:aspect-[16/8]">
                <SmartImage
                  photo={g.photo}
                  sizes="(min-width: 1024px) 480px, 192px"
                  imgClassName="transition-transform duration-700 ease-(--ease-out-quint) group-hover:scale-[1.04]"
                />
              </div>
              <div className="self-center lg:self-start">
                <p className="text-[0.8125rem] font-medium text-action">{topicById[g.topic].label}</p>
                <h2 className="mt-1 font-display-tight text-[1.125rem] leading-snug font-bold text-ink group-hover:text-action sm:text-[1.3125rem]">{g.title}</h2>
                <p className="mt-1.5 text-[0.8125rem] text-ink-soft">{`${readingMinutes(g)} min read`}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
