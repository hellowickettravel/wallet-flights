/**
 * Headers for a GET answer the CDN may share between visitors.
 *
 * Netlify's cache keys a response on the path plus a few Next.js params only,
 * so without `Netlify-Vary: query` every `?q=` / `?code=` would get the first
 * answer stored (typing "London" showed Goa). Vercel already keys on the full URL.
 */
export function sharedCache(sMaxAge: number, swr: number): HeadersInit {
  return {
    "Cache-Control": `public, s-maxage=${sMaxAge}, stale-while-revalidate=${swr}`,
    "Netlify-Vary": "query",
  };
}

export const noStore: HeadersInit = { "Cache-Control": "no-store" };
