import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[60dvh] place-items-center py-24 text-center">
      <div className="max-w-xl">
        <p className="font-mono text-sm tracking-[0.14em] text-action">GATE 404</p>
        <h1 className="mt-4 font-display-tight text-[2.5rem] leading-[1.05] font-extrabold text-ink md:text-[3.5rem]">
          This page has already departed
        </h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
          The page you’re looking for has moved or is still being built. Start a new search, or message us on WhatsApp at{" "}
          <a href={site.phone.whatsapp} target="_blank" rel="noopener" className="tabular font-semibold text-action">
            {site.phone.display}
          </a>
          .
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg">
            Search flights
          </ButtonLink>
          <ButtonLink href="/deals" variant="secondary" size="lg">
            See flight deals
          </ButtonLink>
        </div>
        <p className="mt-10 text-sm text-ink-soft">
          Or browse <Link href="/destinations" className="font-semibold text-action underline underline-offset-4">destinations</Link>.
        </p>
      </div>
    </section>
  );
}
