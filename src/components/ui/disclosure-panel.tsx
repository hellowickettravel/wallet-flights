import type { ReactNode } from "react";
import clsx from "clsx";

/**
 * The answer half of an accordion. It is always in the HTML, so search engines
 * and AI crawlers that don't run JavaScript read every answer, and the FAQPage
 * markup matches visible content. Closed panels collapse with a CSS grid-rows
 * transition and are `inert`, so they're skipped by Tab and screen readers.
 */
export function DisclosurePanel({ id, labelledBy, open, children }: { id: string; labelledBy: string; open: boolean; children: ReactNode }) {
  return (
    <div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      inert={!open}
      className={clsx(
        "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
