import Link from "next/link";
import { guides, topics } from "@/content/guides";

/**
 * Every topic with its guides, set like the departures board on the
 * homepage: navy ground, the guide count in a sun flap. Each row is an
 * anchor target for the topic links at the top of the page and on guides.
 */
export function TopicBoard() {
  const rows = topics.map((t) => ({ ...t, list: guides.filter((g) => g.topic === t.id) })).filter((t) => t.list.length > 0);
  return (
    <section aria-labelledby="topics-title" className="rounded-(--radius-frame) bg-board p-6 text-white sm:p-8 md:p-10">
      <h2 id="topics-title" className="font-display-tight text-[1.75rem] font-bold md:text-[2.25rem]">
        Browse by topic
      </h2>
      <ul className="mt-6 divide-y divide-board-tile">
        {rows.map((t) => (
          <li key={t.id} id={`topic-${t.id}`} className="grid scroll-mt-28 gap-4 py-6 md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1.3fr)] md:gap-8">
            <div>
              <h3 className="font-display-tight text-[1.375rem] font-bold">{t.label}</h3>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-white/70">{t.blurb}</p>
            </div>
            <p className="tabular grid size-12 place-items-center rounded-lg bg-board-tile font-display-tight text-[1.5rem] font-bold text-sun max-md:hidden" aria-hidden>
              {t.list.length}
            </p>
            <ul className="space-y-2.5 md:pt-1">
              {t.list.map((g) => (
                <li key={g.slug}>
                  <Link href={`/travel-guides/${g.slug}`} className="font-medium text-white underline decoration-white/25 underline-offset-4 hover:decoration-sun">
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
