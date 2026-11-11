import type { NextConfig } from "next";
import { legacyOwnerRedirects, legacyRedirects } from "./src/content/legacy-redirects";
import { contentSecurityPolicy } from "./src/lib/csp";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    // Fares from the Data API are searches people made in the last 2–7 days,
    // so refreshing them hourly bought little and rebuilt every priced page
    // (routes, deals, destinations) 24 times a day, the main cost on
    // Vercel's Fluid Active CPU allowance. Six hours keeps them current.
    fares: { stale: 300, revalidate: 6 * 60 * 60, expire: 3 * 24 * 60 * 60 },
  },
  env: {
    NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()),
    // Vercel's VERCEL_ENV or Netlify's CONTEXT, normalised (see src/lib/deploy-env.ts).
    DEPLOY_CONTEXT:
      process.env.VERCEL_ENV ??
      (process.env.CONTEXT ? (process.env.CONTEXT === "production" ? "production" : "preview") : ""),
    // On Netlify the database falls back to Netlify Blobs (src/lib/redis.ts).
    NETLIFY_BLOBS: process.env.NETLIFY ? "1" : "",
  },
  partialPrefetching: true,
  poweredByHeader: false,
  async redirects() {
    // Live searches belong on /flights. The widget is told so (see
    // white-label.tsx), but older links and its dashboard default point at "/".
    // Query values pass through to the destination.
    return [
      // The production .vercel.app address duplicates the site: send it to the real domain.
      { source: "/:path*", has: [{ type: "host", value: "wallet-flights.vercel.app" }], destination: "https://walletflights.com/:path*", permanent: true },
      // Same for the Netlify address, once the custom domain is attached there.
      ...(process.env.NETLIFY && process.env.CUSTOM_DOMAIN_LIVE === "1"
        ? [{ source: "/:path*", has: [{ type: "host" as const, value: "walletflights.netlify.app" }], destination: "https://walletflights.com/:path*", permanent: true }]
        : []),
      { source: "/", has: [{ type: "query", key: "flightSearch" }], destination: "/flights", permanent: false },
      ...legacyRedirects.map((r) => ({ ...r, permanent: true })),
      ...legacyOwnerRedirects.map((r) => ({ ...r, permanent: false })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
          // Enforced; violations are still reported (see src/lib/csp.ts). Not in
          // development, where React's dev tooling needs eval.
          ...(process.env.NODE_ENV === "production"
            ? [
                { key: "Content-Security-Policy", value: contentSecurityPolicy() },
                { key: "Reporting-Endpoints", value: 'csp="/api/csp-report"' },
              ]
            : []),
        ],
      },
      // The admin dashboard and its API: never indexed, even if a link leaks.
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/api/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
  images: {
    // Photos are served straight from Unsplash's CDN through a custom loader
    // (see src/components/ui/smart-image.tsx); this pattern is the allow-list.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    // Steps between 1200 and 1920 so a ~1440px screen doesn't download the
    // 1920 version of a full-width hero (about 500 KB instead of 285 KB).
    deviceSizes: [640, 750, 828, 1080, 1200, 1280, 1440, 1600, 1920, 2048, 3840],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
