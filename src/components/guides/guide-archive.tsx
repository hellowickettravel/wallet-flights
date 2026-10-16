import { archivePage, guidesHub, pageCount } from "@/content/guides";
import { GuideCard } from "./guide-card";
import { Pagination } from "./pagination";

/** One page of the guide grid with its page links. Page 1 sits under the features on /travel-guides. */
export function GuideArchive({ page, standalone = false }: { page: number; standalone?: boolean }) {
  const list = archivePage(page);
  return (
    <section aria-labelledby="archive-title">
      {/* On /travel-guides/page/N the page's own H1 names it, so the grid needs no visible heading. */}
      <h2 id="archive-title" className={standalone ? "sr-only" : "font-display-tight text-[1.75rem] font-bold text-ink md:text-[2.25rem]"}>
        {guidesHub.archiveTitle}
      </h2>
      <ul className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {list.map((g, i) => (
          <li key={g.slug}>
            <GuideCard guide={g} priority={standalone && i < 3} />
          </li>
        ))}
      </ul>
      <Pagination page={page} count={pageCount} />
    </section>
  );
}
