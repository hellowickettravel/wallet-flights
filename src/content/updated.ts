// When each page's content last changed (ISO dates), for sitemap <lastmod>.
// Update the date when you change that content; never use "today" on every
// build, or Google learns to ignore the dates. Guides carry their own dates.
export const updated = {
  home: "2026-10-16",
  deals: "2026-10-16",
  destinations: "2026-10-16",
  /** The route template (related routes, domestic rules) changed on 3 Nov 2026. */
  routes: "2026-11-03",
  routesHub: "2026-11-03",
  /** When each wave of route pages was published (src/content/deals.ts). Set wave 2's date when it goes live. */
  routeWaves: { 1: "2026-11-03", 2: "2026-11-03" } as Record<number, string>,
  airlines: "2026-10-16",
  travelGuides: "2026-10-16",
  about: "2026-10-16",
  contact: "2026-10-16",
  help: "2026-10-15",
  legal: "2026-11-03",
  editorial: "2026-10-16",
  photoCredits: "2026-10-12",
  fareCalendar: "2026-10-19",
  compensation: "2026-10-17",
} as const;
