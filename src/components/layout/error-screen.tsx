"use client";

import { useEffect } from "react";
import { errorCopy as copy } from "@/content/errors";
import { site } from "@/content/site";

/**
 * Shared by error.tsx (inside the site layout) and global-error.tsx (its own
 * document). Plain <a> for "New search": a full page load is the surest way
 * out of a broken client state.
 */
export function ErrorScreen({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-page grid min-h-[60dvh] place-items-center py-24 text-center">
      <div className="max-w-xl">
        <p className="font-mono text-sm tracking-[0.14em] text-action">{copy.eyebrow}</p>
        <h1 className="mt-4 font-display-tight text-[2.25rem] leading-[1.08] font-extrabold text-ink md:text-[3rem]">{copy.title}</h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">{copy.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex h-14 cursor-pointer items-center rounded-full bg-action px-7 font-semibold text-white transition-colors hover:bg-action-deep"
          >
            {copy.retry}
          </button>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- a full load on purpose (see above) */}
          <a href="/" className="inline-flex h-14 items-center rounded-full bg-white px-7 font-semibold text-ink ring-1 ring-line transition-colors hover:bg-mist">
            {copy.newSearch}
          </a>
        </div>
        <p className="mt-10 text-sm text-ink-soft">
          {copy.contactLead}{" "}
          <a href={site.phone.whatsapp} target="_blank" rel="noopener" className="tabular font-semibold text-action">
            {site.phone.display}
          </a>
          .
        </p>
        {error.digest && (
          <p className="mt-3 text-[0.8125rem] text-ink-soft">
            {copy.reference}: <span className="font-mono">{error.digest}</span>
          </p>
        )}
      </div>
    </section>
  );
}
