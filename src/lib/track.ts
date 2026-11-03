// Click-out measurement for the monthly report (Growth proposal phase 2,
// "Click-outs to providers"). Events go to Google Analytics only: gtag exists
// on the page only after the visitor allows analytics cookies, so without
// consent these calls do nothing. No personal data: just the placement Sub ID
// and the link's host.

type Gtag = (command: "event", name: string, params: Record<string, string>) => void;

export function trackEvent(name: "fare_search" | "click_out", params: Record<string, string>) {
  const gtag = (globalThis as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}

/** The placement Sub ID a link carries: data-sub, then ?sub=, the marker's suffix or tp.media's sub_id. */
export function placementOf(a: HTMLAnchorElement, url: URL) {
  const marker = url.searchParams.get("marker");
  return a.dataset.sub || url.searchParams.get("sub") || url.searchParams.get("sub_id") || (marker?.includes(".") ? marker.split(".").slice(1).join(".") : "") || "unknown";
}

/**
 * Classifies a click: a link into our fare search (/flights with a search, or
 * the /go hand-off) is a "fare_search"; any link to another site (partners,
 * the sister company, WhatsApp) is a "click_out".
 */
export function classifyClick(a: HTMLAnchorElement, origin: string): { name: "fare_search" | "click_out"; params: Record<string, string> } | null {
  let url: URL;
  try {
    url = new URL(a.href, origin);
  } catch {
    return null;
  }
  if (!/^https?:$/.test(url.protocol)) return null;
  const placement = placementOf(a, url);
  if (url.origin === origin) {
    if ((url.pathname === "/flights" && url.search) || url.pathname === "/go") return { name: "fare_search", params: { placement, page_path: location.pathname } };
    return null;
  }
  return { name: "click_out", params: { placement, link_domain: url.hostname, page_path: location.pathname } };
}
