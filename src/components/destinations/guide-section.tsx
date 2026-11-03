import clsx from "clsx";
import type { ReactNode } from "react";

/**
 * One section of a destination guide. Every section shares the same rhythm:
 * full-width band, left-aligned heading and intro in the page container, and
 * a scroll margin that clears the sticky header and the section menu.
 */
export function GuideSection({ id, title, intro, tone = "white", children }: { id: string; title: string; intro?: ReactNode; tone?: "white" | "mist"; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={clsx("scroll-mt-32 border-t border-line py-14 md:py-20", tone === "mist" && "bg-mist")}>
      <div className="container-page">
        <div className="max-w-3xl">
          <h2 id={`${id}-title`} className="font-display-tight text-[1.875rem] leading-[1.1] font-bold text-ink md:text-[2.5rem]">
            {title}
          </h2>
          {intro && <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">{intro}</p>}
        </div>
        <div className="mt-8 md:mt-10">{children}</div>
      </div>
    </section>
  );
}

/** "On this page": a sticky row of links to each section, scrollable sideways on phones. */
export function SectionMenu({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="On this page" className="sticky top-[4.5rem] z-30 border-y border-line bg-white/95 backdrop-blur-md">
      <ul className="container-page flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
        {items.map((it) => (
          <li key={it.id} className="shrink-0">
            <a href={`#${it.id}`} className="inline-flex h-10 items-center rounded-full px-4 text-[0.9375rem] font-semibold whitespace-nowrap text-ink-soft hover:bg-mist hover:text-ink">
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
