import { NextResponse, type NextRequest } from "next/server";
import { lookupPlaces } from "@/lib/places";
import { sharedCache, noStore } from "@/lib/cache-headers";

/** City and airport suggestions for the search form: GET /api/places?q=lisb */
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim().toLowerCase().slice(0, 40);
  if (q.length < 2) return NextResponse.json([]);
  const { ok, places } = await lookupPlaces(q);
  // Good answers are cached at the edge for a day; failures never are.
  return NextResponse.json(places, {
    headers: ok ? sharedCache(86400, 604800) : noStore,
  });
}
