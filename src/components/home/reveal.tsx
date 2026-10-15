import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";

/**
 * The hero's page-load entrance. Pure CSS (see `.rise` in globals.css) so it
 * starts at first paint without waiting for hydration, works without JS and
 * is switched off under prefers-reduced-motion. `text` slides without fading,
 * for headings and copy that can be the page's LCP element.
 */
export function Reveal({ children, className, delay = 0, text = false }: { children: ReactNode; className?: string; delay?: number; text?: boolean }) {
  return (
    <div className={clsx("rise", className)} data-text={text || undefined} style={{ "--rise-delay": `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}
