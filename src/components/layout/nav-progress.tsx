"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Phase = "idle" | "loading" | "done";

/**
 * A thin sun-coloured bar along the top of the screen while the next page
 * loads. It starts when a link to another page on this site is clicked (and
 * shows only if the page takes longer than a blink), creeps towards the end,
 * then finishes when the new page arrives. Decoration for sighted users: the
 * page change itself is announced by the browser.
 */
export function NavProgress() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);
  const last = useRef(pathname);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      clear();
      // Pages that are already prefetched arrive almost at once: no bar for those.
      timers.current.push(window.setTimeout(() => setPhase("loading"), 120));
      // Never leave it hanging (a failed load shows the error page instead).
      timers.current.push(window.setTimeout(() => setPhase("idle"), 10000));
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clear();
    };
  }, []);

  // The new page is here: finish the bar, then hide it.
  useEffect(() => {
    if (last.current === pathname) return;
    last.current = pathname;
    clear();
    setPhase((p) => (p === "loading" ? "done" : "idle"));
    timers.current.push(window.setTimeout(() => setPhase("idle"), 450));
  }, [pathname]);

  return <div aria-hidden className="nav-progress" data-phase={phase} />;
}
