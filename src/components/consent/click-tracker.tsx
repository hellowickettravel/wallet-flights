"use client";

import { useEffect } from "react";
import { classifyClick, trackEvent } from "@/lib/track";

/** One delegated listener for every link on the site; rendered only with analytics consent. */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      const event = classifyClick(a, location.origin);
      if (event) trackEvent(event.name, event.params);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
