"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "motion/react";
import { ArrowUpRight, CaretDown, List, WhatsappLogo, X } from "@phosphor-icons/react";
import clsx from "clsx";
import { mainNav, site, type NavLink } from "@/content/site";
import { Logo } from "./logo";
import { CurrencyPicker } from "@/components/currency/currency-picker";

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(href + "/");

/**
 * A top-level item with a dropdown (disclosure pattern: a button that shows a
 * list of links). Opens on hover with a mouse, and on click or Enter with
 * anything; Escape, a click outside or tabbing away closes it.
 */
function NavMenu({ label, items, pathname }: { label: string; items: readonly NavLink[]; pathname: string }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLLIElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  // A click on a menu the mouse has just opened keeps it open instead of closing it.
  const byHover = useRef(false);
  const active = items.some((l) => isActive(pathname, l.href));

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <li
      ref={root}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        clearTimeout(closeTimer.current);
        if (!open) byHover.current = true;
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        closeTimer.current = setTimeout(() => setOpen(false), 160);
      }}
      onBlur={(e) => {
        if (!root.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          if (open && byHover.current) byHover.current = false;
          else {
            byHover.current = false;
            setOpen(!open);
          }
        }}
        className={clsx(
          "inline-flex cursor-pointer items-center gap-1 rounded-full px-3.5 py-2 text-[0.9375rem] font-medium whitespace-nowrap transition-colors",
          active ? "text-action" : "text-ink/80 hover:bg-mist hover:text-ink",
          open && !active && "bg-mist text-ink",
        )}
      >
        {label}
        <CaretDown className={clsx("size-3.5 transition-transform duration-200 motion-reduce:transition-none", open && "rotate-180")} weight="bold" aria-hidden />
      </button>
      {/* pt-2 bridges the gap, so the pointer can travel from the button to the panel. */}
      <div id={id} hidden={!open} className="absolute top-full left-0 z-50 pt-2">
        <ul className="w-80 rounded-2xl bg-white p-2 shadow-(--shadow-pop) ring-1 ring-line">
          {items.map((l) => {
            const here = isActive(pathname, l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={here ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={clsx("block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-mist", here && "bg-mist")}
                >
                  <span className={clsx("block text-[0.9375rem] font-semibold", here ? "text-action" : "text-ink")}>{l.label}</span>
                  <span className="mt-0.5 block text-[0.8125rem] text-ink-soft">{l.description}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  // The drawer is portalled to <body>: the header's backdrop-filter makes it
  // the containing block for position:fixed children, which squeezed the
  // full-height drawer into the 72px header bar on phones. True only in the
  // browser (the server has no document to portal into).
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // Closing with the X, the scrim or Escape gives focus back to the menu
  // button; following a link doesn't (the new page takes over). The focus
  // waits for the effect below, because the bar is inert until React re-renders.
  const returnFocus = useRef(false);
  function close() {
    returnFocus.current = true;
    setOpen(false);
  }
  useEffect(() => {
    if (open || !returnFocus.current) return;
    returnFocus.current = false;
    menuButton.current?.focus();
  }, [open]);

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

  // While the drawer is open: lock page scroll, and make everything outside
  // the header inert so Tab can't wander behind the scrim (aria-modal alone
  // doesn't stop it). The header's own bar is made inert in the JSX below.
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const outside = Array.from(document.body.children).filter(
      (el) =>
        !el.contains(headerRef.current) &&
        !el.hasAttribute("data-menu-layer") &&
        el.localName !== "script" &&
        el.localName !== "next-route-announcer",
    );
    outside.forEach((el) => el.setAttribute("inert", ""));
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      returnFocus.current = true;
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      outside.forEach((el) => el.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={clsx(
        "sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-shadow duration-300",
        scrolled ? "shadow-[0_1px_0_var(--color-line),0_8px_24px_-16px_rgb(15_31_61/0.25)]" : "shadow-[0_1px_0_transparent]",
      )}
    >
      <a
        href="#main"
        // :focus-visible, not :focus: keyboard users still get it on Tab, but the
        // back-to-top button's focus hand-off after a mouse click doesn't show it.
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-3 focus-visible:left-3 focus-visible:z-50 focus-visible:rounded-full focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2 focus-visible:text-white"
      >
        Skip to content
      </a>
      {/* Fixed height on purpose: resizing an in-flow sticky header on scroll
          makes scroll anchoring oscillate around the threshold. */}
      <div className="container-page flex h-[4.5rem] items-center gap-6" inert={open}>
        <Link href="/" className="shrink-0 rounded-lg">
          <Logo />
          <span className="sr-only"> home</span>
        </Link>

        <nav aria-label="Main" className="ml-4 hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              if (item.items)
                // Keyed by path, so a dropdown closes after one of its links is followed.
                return <NavMenu key={`${item.label}-${pathname}`} label={item.label} items={item.items} pathname={pathname} />;
              if (item.external)
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener"
                      title={item.external}
                      className="relative inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.9375rem] font-medium whitespace-nowrap text-ink/80 transition-colors hover:bg-mist hover:text-ink"
                    >
                      {item.label}
                      <ArrowUpRight className="size-3 text-ink-soft" weight="bold" aria-hidden />
                      <span className="sr-only"> ({item.external.toLowerCase()}, opens in a new tab)</span>
                    </a>
                  </li>
                );
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "relative rounded-full px-3.5 py-2 text-[0.9375rem] font-medium whitespace-nowrap transition-colors",
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
          {/* Under 400px the bar has no room: the picker is in the menu instead. */}
          <div className="hidden min-[400px]:block">
            <CurrencyPicker />
          </div>
          <a
            href={site.phone.whatsapp}
            target="_blank"
            rel="noopener"
            className="group hidden shrink-0 items-center gap-3 rounded-full py-1.5 pr-4 pl-1.5 whitespace-nowrap ring-1 ring-line transition-colors hover:bg-mist md:flex lg:hidden xl:flex"
          >
            <span className="grid size-8 place-items-center rounded-full bg-fare text-white">
              <WhatsappLogo weight="fill" className="size-4.5" aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block text-[0.75rem] text-ink-soft">{site.phone.label}</span>
              <span className="tabular block text-[0.9375rem] font-semibold text-ink">{site.phone.display}</span>
            </span>
            <span className="sr-only"> (opens WhatsApp)</span>
          </a>
          <a
            href={site.phone.whatsapp}
            target="_blank"
            rel="noopener"
            aria-label={`WhatsApp ${site.phone.display} (opens WhatsApp)`}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-fare text-white md:hidden lg:grid xl:hidden"
          >
            <WhatsappLogo weight="fill" className="size-6" aria-hidden />
          </a>
          <button
            type="button"
            ref={menuButton}
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

      {mounted &&
        createPortal(
          <div data-menu-layer="">
            <AnimatePresence>
              {open && (
                <>
                  <m.div
                    key="scrim"
                    className="fixed inset-0 z-[65] bg-ink/40 lg:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={close}
                  />
                  <m.div
                    key="drawer"
                    id="mobile-menu"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Menu"
                    // Above the cookie banner (z-60), which is inert while the menu is open.
                    className="fixed inset-y-0 right-0 z-[70] flex w-[min(24rem,100%)] flex-col bg-white shadow-(--shadow-pop) lg:hidden"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 380, damping: 38 }}
                  >
                    <div className="flex h-[4.5rem] items-center justify-between px-5">
                      <Logo />
                      <button
                        type="button"
                        onClick={close}
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
                          <li key={item.label}>
                            {item.items ? (
                              <div className="my-2 border-y border-line py-2">
                                <p className="px-3 pt-1 pb-1 text-[0.8125rem] font-semibold tracking-wide text-ink-soft uppercase">{item.label}</p>
                                <ul>
                                  {item.items.map((l) => (
                                    <li key={l.href}>
                                      <Link
                                        href={l.href}
                                        onClick={() => setOpen(false)}
                                        aria-current={isActive(pathname, l.href) ? "page" : undefined}
                                        className="flex flex-col rounded-xl px-3 py-2.5 hover:bg-mist aria-[current=page]:bg-mist"
                                      >
                                        <span className="font-display-tight text-[1.25rem] font-semibold text-ink">{l.label}</span>
                                        <span className="text-[0.875rem] text-ink-soft">{l.description}</span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : item.external ? (
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noopener"
                                onClick={() => setOpen(false)}
                                className="flex flex-col rounded-xl px-3 py-3 hover:bg-mist"
                              >
                                <span className="flex items-center gap-1.5 font-display-tight text-[1.375rem] font-semibold text-ink">
                                  {item.label}
                                  <ArrowUpRight className="size-4 text-ink-soft" weight="bold" aria-hidden />
                                </span>
                                <span className="text-[0.875rem] text-ink-soft">{item.external}</span>
                                <span className="sr-only"> (opens in a new tab)</span>
                              </a>
                            ) : (
                              <Link
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="flex items-center rounded-xl px-3 py-3.5 font-display-tight text-[1.375rem] font-semibold text-ink hover:bg-mist"
                              >
                                {item.label}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </nav>
                    <div className="border-t border-line p-5">
                      <CurrencyPicker variant="row" className="mb-4" />
                      <p className="text-sm text-ink-soft">Questions? {site.responseTime}.</p>
                      <a
                        href={site.phone.whatsapp}
                        target="_blank"
                        rel="noopener"
                        className="mt-3 flex h-14 items-center justify-center gap-2 rounded-full bg-fare text-base font-semibold text-white"
                      >
                        <WhatsappLogo weight="fill" className="size-5.5" aria-hidden />
                        <span className="tabular">{site.phone.display}</span>
                        <span className="sr-only"> (opens WhatsApp)</span>
                      </a>
                    </div>
                  </m.div>
                </>
              )}
            </AnimatePresence>
          </div>,
          document.body,
        )}
    </header>
  );
}
