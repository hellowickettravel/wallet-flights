import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import { ParallaxHero } from "@/components/destinations/parallax-hero";
import type { Photo } from "@/content/images";
import { breadcrumbList, jsonLdHtml } from "@/lib/schema";

type Props = {
  photo: Photo;
  title: ReactNode;
  intro?: ReactNode;
  crumbs: { label: string; href: string }[]; // excluding Home
  /** Short facts under the intro, each with an icon. */
  points?: { icon: ReactNode; label: string }[];
};

/**
 * Inner-page header on a full-bleed photo: breadcrumb, H1, intro and a few
 * facts in white over a navy wash. The bottom stays deep, so the tool's card
 * can overlap it (pull the next block up with a negative top margin).
 * Emits BreadcrumbList JSON-LD like PageHeader.
 */
export function PhotoHeader({ photo, title, intro, crumbs, points }: Props) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];
  return (
    <ParallaxHero photo={photo}>
      {/* A second wash from the left keeps white text readable over bright skies. */}
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_31_61/0.82)_0%,rgb(15_31_61/0.5)_55%,rgb(15_31_61/0.2)_100%)]" />
      <div className="relative container-page pt-8 pb-28 md:pt-12 md:pb-36">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-[0.875rem] text-white/80">
            {trail.map((c, i) =>
              i === trail.length - 1 ? (
                <li key={c.href} aria-current="page" className="font-medium text-white">
                  {c.label}
                </li>
              ) : (
                <li key={c.href} className="flex items-center gap-1.5">
                  <Link href={c.href} className="hover:text-white hover:underline">
                    {c.label}
                  </Link>
                  <CaretRight className="size-3.5" aria-hidden />
                </li>
              ),
            )}
          </ol>
        </nav>
        <h1 className="mt-6 max-w-3xl font-display-tight text-[2.5rem] leading-[1.05] font-extrabold text-balance text-white md:mt-10 md:text-[3.5rem] lg:text-[4rem]">
          {title}
        </h1>
        {intro && <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-pretty text-white/85 md:text-[1.1875rem]">{intro}</p>}
        {points && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {points.map((p) => (
              <li key={p.label} className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-2 text-[0.875rem] font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm">
                <span className="text-sun">{p.icon}</span>
                {p.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(breadcrumbList(trail))} />
    </ParallaxHero>
  );
}
