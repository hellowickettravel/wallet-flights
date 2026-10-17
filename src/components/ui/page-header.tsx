import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import { breadcrumbList, jsonLdHtml } from "@/lib/schema";

type Props = {
  title: ReactNode;
  intro?: ReactNode;
  crumbs: { label: string; href: string }[]; // excluding Home
  id?: string;
};

/** Inner-page header: breadcrumb, H1, one-line intro. Emits BreadcrumbList JSON-LD. */
export function PageHeader({ title, intro, crumbs, id = "page-title" }: Props) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];
  const jsonLd = breadcrumbList(trail);
  return (
    <div className="container-page pt-8 md:pt-12">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-[0.875rem] text-ink-soft">
          {trail.map((c, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="font-medium text-ink">
                    {c.label}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="inline-flex min-h-6 items-center hover:text-action hover:underline">
                      {c.label}
                    </Link>
                    <CaretRight className="size-3.5" aria-hidden />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <h1 id={id} className="mt-5 max-w-3xl text-balance font-display-tight text-[2.5rem] leading-[1.05] font-extrabold text-ink md:text-[3.5rem] lg:text-[4rem]">
        {title}
      </h1>
      {intro && <p className="mt-4 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-ink-soft md:text-[1.1875rem]">{intro}</p>}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
    </div>
  );
}
