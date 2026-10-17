"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useConsent } from "@/lib/consent";
import type { CalendarStart } from "@/app/api/fare-calendar/start/route";

// The card and its animation load only when it's time to show them.
const CalendarTeaser = dynamic(() => import("./calendar-teaser").then((m) => m.CalendarTeaser), { ssr: false });

/** Session storage: set once the card has been shown, so it appears at most once per visit. */
export const TEASER_KEY = "wf_teaser";

/** Pages where it would get in the way: the calendar itself, the search and partner hand-off, and claims. */
const SKIP = [/^\/fare-calendar/, /^\/flights/, /^\/go/, /^\/fare-alerts/, /^\/price-alerts/, /^\/flight-delay-compensation/];

const seen = () => {
  try {
    return !!sessionStorage.getItem(TEASER_KEY);
  } catch {
    return true; // Storage blocked: we can't remember it, so don't show it at all.
  }
};

/**
 * Decides when the fare calendar suggestion appears: after the cookie choice,
 * at least 8 seconds into the visit, once the visitor has read a third of the
 * page (or after 25 seconds). It fetches the visitor's popular routes first,
 * so the card arrives complete instead of filling in.
 */
export function CalendarTeaserLoader() {
  const pathname = usePathname();
  const consent = useConsent();
  const [start, setStart] = useState<CalendarStart | null | undefined>(undefined); // undefined = not time yet
  const [closed, setClosed] = useState(false);
  const skipped = SKIP.some((r) => r.test(pathname));
  const waiting = start === undefined && !closed;

  useEffect(() => {
    if (!waiting || skipped || !consent || seen()) return;
    let armed = false;
    let done = false;
    const ctrl = new AbortController();
    const show = () => {
      if (done) return;
      done = true;
      cleanup();
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
      // Give up on prices after 4 seconds: the card still works without them.
      const req = new AbortController();
      const limit = setTimeout(() => req.abort(), 4000);
      ctrl.signal.addEventListener("abort", () => req.abort());
      fetch(`/api/fare-calendar/start?tz=${encodeURIComponent(tz)}`, { signal: req.signal })
        .then((r) => (r.ok ? (r.json() as Promise<CalendarStart>) : null))
        .catch(() => null)
        .then((s) => {
          clearTimeout(limit);
          if (ctrl.signal.aborted) return;
          try {
            sessionStorage.setItem(TEASER_KEY, "shown");
          } catch {}
          setStart(s);
        });
    };
    const onScroll = () => {
      const depth = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (armed && depth > 0.33) show();
    };
    const arm = setTimeout(() => {
      armed = true;
      onScroll();
    }, 8000);
    const late = setTimeout(show, 25000);
    window.addEventListener("scroll", onScroll, { passive: true });
    function cleanup() {
      clearTimeout(arm);
      clearTimeout(late);
      window.removeEventListener("scroll", onScroll);
    }
    return () => {
      cleanup();
      ctrl.abort();
    };
  }, [waiting, skipped, consent]);

  if (start === undefined || closed || skipped) return null;
  return <CalendarTeaser start={start} onClose={() => setClosed(true)} />;
}
