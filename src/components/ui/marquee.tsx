import type { ReactNode } from "react";

/**
 * Seamless left-to-right loop. Children are rendered twice; the copy is
 * hidden from assistive tech and can't be focused, so each item is read once.
 */
export function Marquee({ children, duration = 40, label, className }: { children: ReactNode; duration?: number; label: string; className?: string }) {
  return (
    <div className={`marquee ${className ?? ""}`} role="region" aria-label={label} style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}>
      <div className="marquee-track">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}
