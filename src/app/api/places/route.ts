import { NextResponse, type NextRequest } from "next/server";
import { findPlaces } from "@/lib/places";

/** City and airport suggestions for the search form: GET /api/places?q=lisb */
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim().toLowerCase().slice(0, 40);
  if (q.length < 2) return NextResponse.json([]);
  const places = await findPlaces(q);
  return NextResponse.json(places, {
    headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" },
  });
}
