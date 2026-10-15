import { NextResponse, type NextRequest } from "next/server";
import { lookupPlaces } from "@/lib/places";

/** City and airport suggestions for the search form: GET /api/places?q=lisb */
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim().toLowerCase().slice(0, 40);
  if (q.length < 2) return NextResponse.json([]);
  const { ok, places } = await lookupPlaces(q);
  // Good answers are cached at the edge for a day; failures never are.
  return NextResponse.json(places, {
    headers: { "Cache-Control": ok ? "public, s-maxage=86400, stale-while-revalidate=604800" : "no-store" },
  });
}
