import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";

/**
 * The hero's page-load entrance. Pure CSS (see `.rise` in globals.css) so it
 * starts at first paint without waiting for hydration, works without JS and
 * is switched off under prefers-reduced-motion.
 */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <div className={clsx("rise", className)} style={{ "--rise-delay": `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}
