import { test as base, expect } from "@playwright/test";

/**
 * Shared test setup:
 * - `consent`: what the visitor chose before the test. Default "rejected" keeps
 *   the cookie banner out of the way; "unset" shows it; "search" allows live search.
 * - The Travelpayouts White Label script (tpwdg.com) is replaced by a stub that
 *   writes the search it received into #tpwl-search, so tests don't depend on a
 *   third-party service. tp.media affiliate redirects are stubbed the same way.
 * - Photos are blocked (CDN may be unreachable in CI).
 * - `teaser`: the fare calendar suggestion stays out of the way unless a test
 *   asks for it (it's marked as already shown for this visit).
 * - The worldwide airport lookup (/api/places) answers from PLACES_STUB, so the
 *   form falls back to its built-in list for anything else.
 */
export const PLACES_STUB: Record<string, object[]> = {
  karachi: [{ code: "KHI", city: "Karachi", name: "All airports", country: "Pakistan" }],
};

export const WIDGET_STUB = `
  const p = new URL(location.href).searchParams;
  const el = document.getElementById("tpwl-search");
  if (el) el.textContent = "White Label stub: " + (p.get("flightSearch") ?? "no search") + " · marker " + p.get("marker");
`;

export const test = base.extend<{ consent: "unset" | "rejected" | "search"; teaser: boolean }>({
  consent: ["rejected", { option: true }],
  teaser: [false, { option: true }],
  // (Playwright calls the second argument `use`; renamed so the React hooks lint rule leaves it alone.)
  context: async ({ context, consent, teaser, baseURL }, provide) => {
    if (!teaser)
      await context.addInitScript(() => {
        try {
          sessionStorage.setItem("wf_teaser", "test");
        } catch {}
      });
    if (consent !== "unset") {
      const value = consent === "search" ? `s1.a0.${Date.now()}` : `s0.a0.${Date.now()}`;
      await context.addCookies([{ name: "wf_consent", value, url: baseURL! }]);
    }
    await context.route("https://tpwdg.com/**", (r) => r.fulfill({ contentType: "application/javascript", body: WIDGET_STUB }));
    await context.route("https://tp.media/**", (r) => r.fulfill({ contentType: "text/html", body: "<!doctype html><title>tp.media stub</title><h1>Partner</h1>" }));
    await context.route("https://images.unsplash.com/**", (r) => r.abort());
    await context.route("**/api/places?**", (r) => r.fulfill({ json: PLACES_STUB[new URL(r.request().url()).searchParams.get("q") ?? ""] ?? [] }));
    await provide(context);
  },
});

export { expect };
