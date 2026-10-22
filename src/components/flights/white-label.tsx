"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, CloudWarning, ShieldCheck } from "@phosphor-icons/react";
import { searchCurrencies, travelpayouts } from "@/content/affiliates";
import { searchDownCopy, searchGateCopy } from "@/content/consent";
import { openConsentSettings, saveConsent, useConsent, useSearchAllowed } from "@/lib/consent";
import { parseSearch, withDefaultDates, type SearchQuery } from "@/lib/search-query";
import { fallbackSearchUrl, partnerSearchUrl, whiteLabelParams } from "@/lib/white-label";
import { cleanSubId, sponsoredLink } from "@/lib/affiliate";
import { readDisplayCurrency, setDisplayCurrency, useDisplayCurrency } from "@/components/currency/currency-provider";
import { isDisplayCurrency } from "@/lib/currency";
import { SearchPanel } from "@/components/search/search-panel";

const SCRIPT_SRC = `https://tpwdg.com/wl_web/main.js?wl_id=${travelpayouts.whiteLabelId}`;
const noop = () => () => {};
const todayIso = () => new Date().toISOString().slice(0, 10);

/**
 * Our search params (from the homepage / destination forms) → the White
 * Label's own params. Has to happen before its script runs, because the widget
 * reads the URL once when it loads.
 */
function prepareUrl(params: URLSearchParams) {
  if (params.has("flightSearch")) return;
  const sub = cleanSubId(params.get("sub") ?? "flights_page");
  const parsed = parseSearch(params);
  // Prices open in the visitor's currency (the widget's own menu can still change it).
  const currency = readDisplayCurrency();
  const next = parsed.ok
    ? whiteLabelParams(withDefaultDates(parsed.query, todayIso()), sub, currency)
    : new URLSearchParams({ marker: `${travelpayouts.marker}.${sub}`, ...(currency && { currency }) });
  window.history.replaceState(null, "", `/flights?${next.toString()}`);
}

// The widget remembers its currency in its own cookie, which can outvote the
// URL: keep it in step with ours (only while live search is allowed, the
// cookie's category).
const WIDGET_CURRENCY = /(?:^|; )tpwl_currency=([A-Za-z]{3})/;
const widgetCurrency = () => WIDGET_CURRENCY.exec(document.cookie)?.[1]?.toUpperCase() ?? null;
function setWidgetCurrency(c: string) {
  document.cookie = `tpwl_currency=${c}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}
/** Points the current page's search at `currency` (the widget reads it on load). */
function urlCurrency(currency: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("currency", currency);
  window.history.replaceState(null, "", url);
  setWidgetCurrency(currency);
}

function loadScript(visitorCurrency: string | null, onError: () => void) {
  if (document.querySelector("script[data-tpwl]")) {
    // The widget mounts once per page load; coming back via client-side
    // navigation needs a fresh document.
    window.location.reload();
    return;
  }
  // Merged over the dashboard config by the widget. resultsURL keeps searches
  // on this page (by default it sends them to the site root); no "Powered by"
  // link; no hotels checkbox, since hotels go to the owner's own site; a
  // currency menu wider than the dashboard's USD and GBP.
  (window as Window & { TPWL_CONFIGURATION?: object }).TPWL_CONFIGURATION = {
    resultsURL: `${window.location.origin}/flights`,
    showReferralLink: false,
    showHotels: false,
    // The visitor's own currency first, then the owner's list; the widget keeps the ones it can price.
    availableCurrencies: [...new Set([...(visitorCurrency ? [visitorCurrency] : []), ...searchCurrencies])],
  };
  const s = document.createElement("script");
  s.type = "module";
  s.async = true;
  s.src = SCRIPT_SRC;
  s.dataset.tpwl = "";
  // A 404 from tpwdg.com (widget switched off or deleted in the dashboard: it
  // then answers without CORS headers) or a blocker lands here.
  s.onerror = onError;
  document.head.appendChild(s);
}

/** Travelpayouts White Label #23761: live search and results on our own page. */
export function WhiteLabel() {
  const consent = useConsent();
  const params = useSearchParams();
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  // The visitor's choice, or on by default outside the UK / EU (see consent-region.ts).
  const searchAllowed = useSearchAllowed();
  const allowed = !!searchAllowed;
  const shown = useDisplayCurrency();
  // The currency the widget was loaded with (undefined until it is).
  const loadedWith = useRef<string | null | undefined>(undefined);
  // Set when the widget script fails to load: the page then offers the same
  // search on the partner's site instead of an empty box.
  const [down, setDown] = useState<{ href: string; query: SearchQuery | null } | null>(null);

  useEffect(() => {
    if (!allowed) return;
    const given = parseSearch(new URLSearchParams(window.location.search));
    prepareUrl(new URLSearchParams(window.location.search));
    const currency = readDisplayCurrency();
    if (currency) urlCurrency(currency);
    loadedWith.current = currency;
    loadScript(currency, () =>
      setDown({
        href: fallbackSearchUrl(new URLSearchParams(window.location.search)),
        query: given.ok ? withDefaultDates(given.query, todayIso()) : null,
      }),
    );
    // Once, on permission: the widget manages the URL after that.
  }, [allowed]);

  // Header picker → results: the widget only reads its currency on load, so
  // run the same search again in the new one.
  useEffect(() => {
    if (!allowed || !shown || loadedWith.current === undefined || shown === loadedWith.current) return;
    loadedWith.current = shown;
    urlCurrency(shown);
    window.location.reload();
  }, [allowed, shown]);

  // Widget's own currency menu → the rest of the site. Only a change the
  // visitor makes there counts, not the widget settling on a currency it
  // supports when it loads.
  useEffect(() => {
    if (!allowed) return;
    // The widget renders into a shadow root, so "loaded" can't be read from
    // the page: whatever its cookie says in the first few seconds is its own
    // settling, and only later changes are the visitor's.
    const settledAt = Date.now() + 4000;
    let seen = widgetCurrency();
    const t = window.setInterval(() => {
      const w = widgetCurrency();
      if (Date.now() < settledAt) {
        seen = w;
        return;
      }
      if (w === seen) return;
      seen = w;
      if (w && isDisplayCurrency(w) && w !== loadedWith.current) {
        loadedWith.current = w;
        setDisplayCurrency(w);
      }
    }, 1000);
    return () => window.clearInterval(t);
  }, [allowed]);

  // Until the stored choice is known, hold the space of the consent notice (what
  // a first visit shows), so the page doesn't shift when it appears.
  if (!hydrated || searchAllowed === undefined) return <GateSpace />;
  if (!allowed) {
    const parsed = parseSearch(new URLSearchParams(params.toString()));
    const query = parsed.ok ? withDefaultDates(parsed.query, todayIso()) : null;
    const partnerHref = partnerSearchUrl(query, `${params.get("sub") ?? "flights_page"}_partner`);
    return <SearchGate hasQuery={parsed.ok} analytics={!!consent?.analytics} partnerHref={partnerHref} />;
  }

  if (down) return <SearchDown {...down} />;

  return (
    <div className="space-y-6" data-testid="white-label">
      <div id="tpwl-search" className="min-h-28" />
      <div id="tpwl-tickets" className="min-h-96" />
    </div>
  );
}

function SearchGate({ hasQuery, analytics, partnerHref }: { hasQuery: boolean; analytics: boolean; partnerHref?: string }) {
  return (
    <div role="region" aria-labelledby="search-gate-title" className="mx-auto max-w-2xl rounded-(--radius-panel) bg-white p-7 text-center shadow-(--shadow-float) ring-1 ring-line sm:p-10">
      <ShieldCheck className="mx-auto size-10 text-action" weight="duotone" aria-hidden />
      <h2 id="search-gate-title" className="mt-4 font-display-tight text-[1.625rem] font-bold text-ink">
        {searchGateCopy.title}
      </h2>
      <p className="mx-auto mt-3 max-w-prose text-pretty leading-relaxed text-ink-soft">{searchGateCopy.body}</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => saveConsent({ search: true, analytics })}
          className="inline-flex h-12 cursor-pointer items-center rounded-full bg-action px-6 font-semibold text-white hover:bg-action-deep"
        >
          {searchGateCopy.allow}
          {hasQuery && <span className="sr-only"> and show results for your search</span>}
        </button>
        <button type="button" onClick={openConsentSettings} className="inline-flex h-12 cursor-pointer items-center rounded-full px-6 font-semibold text-ink ring-1 ring-line hover:bg-mist">
          {searchGateCopy.settings}
        </button>
      </div>
      {partnerHref && (
        <div className="mt-6 border-t border-line pt-6">
          <a href={partnerHref} {...sponsoredLink} data-testid="partner-search" className="inline-flex items-center gap-1.5 font-semibold text-action underline underline-offset-2 hover:text-action-deep">
            {searchGateCopy.partner}
            <ArrowUpRight className="size-4" weight="bold" aria-hidden />
          </a>
          <p className="mx-auto mt-2 max-w-prose text-[0.8125rem] text-ink-soft">{searchGateCopy.partnerNote}</p>
        </div>
      )}
    </div>
  );
}

function SearchDown({ href, query }: { href: string; query: SearchQuery | null }) {
  const hasSearch = href.includes("%2Fsearch%2F");
  return (
    <div className="space-y-6">
      <div role="region" aria-labelledby="search-down-title" data-testid="search-down" className="mx-auto max-w-2xl rounded-(--radius-panel) bg-white p-7 text-center shadow-(--shadow-float) ring-1 ring-line sm:p-10">
        <CloudWarning className="mx-auto size-10 text-action" weight="duotone" aria-hidden />
        <h2 id="search-down-title" className="mt-4 font-display-tight text-[1.625rem] font-bold text-ink">
          {searchDownCopy.title}
        </h2>
        <p className="mx-auto mt-3 max-w-prose text-pretty leading-relaxed text-ink-soft">{searchDownCopy.body}</p>
        <a
          href={href}
          {...sponsoredLink}
          data-testid="fallback-search"
          className="mt-7 inline-flex h-12 items-center gap-1.5 rounded-full bg-action px-6 font-semibold text-white hover:bg-action-deep"
        >
          {hasSearch ? searchDownCopy.partner : searchDownCopy.partnerNoSearch}
          <ArrowUpRight className="size-4" weight="bold" aria-hidden />
        </a>
        <p className="mx-auto mt-3 max-w-prose text-[0.8125rem] text-ink-soft">{searchDownCopy.partnerNote}</p>
      </div>
      <SearchPanel variant="bar" initial={query ?? undefined} subId="flights_fallback" />
    </div>
  );
}

function GateSpace() {
  return (
    <div className="invisible" aria-hidden inert>
      <SearchGate hasQuery={false} analytics={false} />
    </div>
  );
}
