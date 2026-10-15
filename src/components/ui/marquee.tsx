"use client";

import { useState, type ReactNode } from "react";
import { Pause, Play } from "@phosphor-icons/react";
import clsx from "clsx";

/**
 * Seamless left-to-right loop. Children are rendered twice; the copy is
 * hidden from assistive tech and can't be focused, so each item is read once.
 * Hover and focus pause it; the button pauses it for keyboard and touch users
 * too (WCAG 2.2.2). Under reduced motion it doesn't move, so there's no button.
 */
export function Marquee({ children, duration = 40, label, className }: { children: ReactNode; duration?: number; label: string; className?: string }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className={clsx("relative", className)}>
      <div
        className="marquee"
        role="region"
        aria-label={label}
        data-paused={paused || undefined}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="marquee-track">
          <div className="flex shrink-0">{children}</div>
          <div className="flex shrink-0" aria-hidden="true" inert>
            {children}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={`${paused ? "Play" : "Pause"} ${label.toLowerCase()}`}
        className="absolute top-1/2 right-0 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-ink shadow-[0_2px_8px_rgb(15_31_61/0.14)] ring-1 ring-line transition-colors hover:bg-mist motion-reduce:hidden"
      >
        {paused ? <Play weight="fill" className="size-4" aria-hidden /> : <Pause weight="fill" className="size-4" aria-hidden />}
      </button>
    </div>
  );
}
