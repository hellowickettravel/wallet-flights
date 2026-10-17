"use client";

import { useEffect, useState } from "react";
import { AirplaneTilt } from "@phosphor-icons/react";
import clsx from "clsx";
import { useConsent } from "@/lib/consent";

/**
 * Bottom-right "back to top" button: a plane climbing to the top of the page.
 * Appears after the first screen; the page's CSS scroll-behavior makes the
 * trip smooth, or instant with reduced motion.
 */
export function BackToTop() {
  const [scrolled, setScrolled] = useState(false);
  const consent = useConsent();
  // Hidden while the cookie banner is up: they share the bottom of the screen.
  const shown = scrolled && !!consent;

  useEffect(() => {
    let frame = 0;
    const check = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > window.innerHeight * 0.8));
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", check);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      onClick={(e) => {
        window.scrollTo({ top: 0 });
        // Keyboard users carry on from the top too (a keyboard-activated click
        // has detail 0). After a mouse click focus stays put, so the skip link
        // that heads the page doesn't flash up.
        if (e.detail === 0) document.querySelector<HTMLElement>("header a")?.focus({ preventScroll: true });
      }}
      className={clsx(
        "back-to-top group fixed right-4 bottom-4 z-40 grid size-12 cursor-pointer place-items-center rounded-full bg-ink text-sun shadow-(--shadow-pop) ring-2 ring-white transition-[opacity,translate,visibility,background-color] duration-200 hover:bg-action sm:right-6 sm:bottom-6 sm:size-14",
        shown ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0",
      )}
    >
      <AirplaneTilt weight="fill" className="size-6 -rotate-45 transition-transform group-hover:-translate-y-0.5 sm:size-7" aria-hidden />
    </button>
  );
}
