"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { ShieldCheck } from "@phosphor-icons/react";
import { travelpayouts } from "@/content/affiliates";
import { searchGateCopy } from "@/content/consent";
import { openConsentSettings, saveConsent, useConsent } from "@/lib/consent";
import { parseSearch, withDefaultDates } from "@/lib/search-query";
import { whiteLabelParams } from "@/lib/white-label";

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
  const sub = (params.get("sub") ?? "flights_page").replace(/[^a-z0-9_]/gi, "_");
  const parsed = parseSearch(params);
  const next = parsed.ok
    ? whiteLabelParams(withDefaultDates(parsed.query, todayIso()), sub)
    : new URLSearchParams({ marker: `${travelpayouts.marker}.${sub}` });
  window.history.replaceState(null, "", `/flights?${next.toString()}`);
}

function loadScript() {
  if (document.querySelector("script[data-tpwl]")) {
    // The widget mounts once per page load; coming back via client-side
    // navigation needs a fresh document.
    window.location.reload();
    return;
  }
  const s = document.createElement("script");
  s.type = "module";
  s.async = true;
  s.src = SCRIPT_SRC;
  s.dataset.tpwl = "";
  document.head.appendChild(s);
}

/** Travelpayouts White Label #23361: live search and results on our own page. */
export function WhiteLabel() {
  const consent = useConsent();
  const params = useSearchParams();
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const allowed = !!consent?.search;

  useEffect(() => {
    if (!allowed) return;
    prepareUrl(new URLSearchParams(window.location.search));
    loadScript();
    // Once, on permission: the widget manages the URL after that.
  }, [allowed]);

  if (!hydrated || consent === undefined) return <WidgetSkeleton />;
  if (!allowed) return <SearchGate hasQuery={parseSearch(new URLSearchParams(params.toString())).ok} analytics={!!consent?.analytics} />;

  return (
    <div className="space-y-6" data-testid="white-label">
      <div id="tpwl-search" className="min-h-28" />
      <div id="tpwl-tickets" className="min-h-96" />
    </div>
  );
}

function SearchGate({ hasQuery, analytics }: { hasQuery: boolean; analytics: boolean }) {
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
    </div>
  );
}

function WidgetSkeleton() {
  return (
    <div className="space-y-6" aria-hidden>
      <div className="h-28 animate-pulse rounded-(--radius-panel) bg-white" />
      <div className="h-96 animate-pulse rounded-(--radius-panel) bg-white" />
    </div>
  );
}
