import Link from "next/link";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { pagePath } from "@/content/guides";

/**
 * Numbered pages as real links (crawlable, and they work without JavaScript),
 * with previous and next at either end.
 */
export function Pagination({ page, count }: { page: number; count: number }) {
  if (count <= 1) return null;
  const pages = Array.from({ length: count }, (_, i) => i + 1);
  const step = "inline-flex h-11 items-center gap-1.5 rounded-full px-4 font-semibold";
  return (
    <nav aria-label="Guide pages" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={pagePath(page - 1)} rel="prev" className={clsx(step, "text-ink ring-1 ring-line hover:bg-mist")}>
          <CaretLeft className="size-4" weight="bold" aria-hidden />
          Newer
        </Link>
      ) : null}
      <ol className="flex items-center gap-1">
        {pages.map((n) => (
          <li key={n}>
            <Link
              href={pagePath(n)}
              aria-current={n === page ? "page" : undefined}
              aria-label={`Page ${n}`}
              className={clsx("tabular grid size-11 place-items-center rounded-full font-semibold", n === page ? "bg-ink text-white" : "text-ink hover:bg-mist")}
            >
              {n}
            </Link>
          </li>
        ))}
      </ol>
      {page < count ? (
        <Link href={pagePath(page + 1)} rel="next" className={clsx(step, "text-ink ring-1 ring-line hover:bg-mist")}>
          Older
          <CaretRight className="size-4" weight="bold" aria-hidden />
        </Link>
      ) : null}
    </nav>
  );
}
