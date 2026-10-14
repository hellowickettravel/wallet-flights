// Feature flags, read at build time.

/**
 * `NEXT_PUBLIC_DEMO_RESULTS=true` brings back the custom results UI driven by
 * the demo engine (src/lib/demo-flights.ts) on /flights instead of the
 * Travelpayouts White Label. Kept for when we qualify for the Flight Search API.
 */
export const demoResults = process.env.NEXT_PUBLIC_DEMO_RESULTS === "true";
