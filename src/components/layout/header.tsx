"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { List, Phone, X } from "@phosphor-icons/react";
import clsx from "clsx";
import { mainNav, site } from "@/content/site";
import { Logo } from "./logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer when the route changes (adjusting state during render,
  // per https://react.dev/learn/you-might-not-need-an-effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock page scroll while the drawer is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-shadow duration-300",
        scrolled ? "shadow-[0_1px_0_var(--color-line),0_8px_24px_-16px_rgb(15_31_61/0.25)]" : "shadow-[0_1px_0_transparent]",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      {/* Fixed height on purpose: resizing an in-flow sticky header on scroll
          makes scroll anchoring oscillate around the threshold. */}
      <div className="container-page flex h-[4.5rem] items-center gap-6">
        <Link href="/" className="shrink-0 rounded-lg">
          <Logo />
          <span className="sr-only"> home</span>
        </Link>

        <nav aria-label="Main" className="ml-4 hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "relative rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors",
                      active ? "text-action" : "text-ink/80 hover:bg-mist hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={site.phone.href}
            className="group hidden items-center gap-3 rounded-full py-1.5 pr-4 pl-1.5 ring-1 ring-line transition-colors hover:bg-mist md:flex"
          >
            <span className="grid size-8 place-items-center rounded-full bg-fare text-white">
              <Phone weight="fill" className="size-4" aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block text-[0.75rem] text-ink-soft">Talk to a travel expert</span>
              <span className="tabular block text-[0.9375rem] font-semibold text-ink">{site.phone.display}</span>
            </span>
          </a>
          <a
            href={site.phone.href}
            aria-label={`Call ${site.phone.display}`}
            className="grid size-11 place-items-center rounded-full bg-fare text-white md:hidden"
          >
            <Phone weight="fill" className="size-5" aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            className="grid size-11 cursor-pointer place-items-center rounded-full text-ink ring-1 ring-line hover:bg-mist lg:hidden"
          >
            <List className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="drawer"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 right-0 z-50 flex w-[min(24rem,100%)] flex-col bg-white shadow-(--shadow-pop) lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
            >
              <div className="flex h-[4.5rem] items-center justify-between px-5">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  autoFocus
                  className="grid size-11 cursor-pointer place-items-center rounded-full ring-1 ring-line hover:bg-mist"
                >
                  <X className="size-5" aria-hidden />
                </button>
              </div>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-2">
                <ul>
                  {mainNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center rounded-xl px-3 py-3.5 font-display-tight text-[1.375rem] font-semibold text-ink hover:bg-mist"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="border-t border-line p-5">
                <p className="text-sm text-ink-soft">Talk to a travel expert · {site.hours}</p>
                <a
                  href={site.phone.href}
                  className="mt-3 flex h-14 items-center justify-center gap-2 rounded-full bg-fare text-base font-semibold text-white"
                >
                  <Phone weight="fill" className="size-5" aria-hidden />
                  <span className="tabular">{site.phone.display}</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
