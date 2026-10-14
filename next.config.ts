import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  env: { NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()) },
  partialPrefetching: true,
  poweredByHeader: false,
  async redirects() {
    // Live searches belong on /flights. The widget is told so (see
    // white-label.tsx), but older links and its dashboard default point at "/".
    // Query values pass through to the destination.
    return [{ source: "/", has: [{ type: "query", key: "flightSearch" }], destination: "/flights", permanent: false }];
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
        ],
      },
    ];
  },
  images: {
    // Photos are served straight from Unsplash's CDN through a custom loader
    // (see src/components/ui/smart-image.tsx); this pattern is the allow-list.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
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
