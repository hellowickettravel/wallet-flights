import { NextResponse, type NextRequest } from "next/server";
import { placeByCode } from "@/lib/travel-data";

/** One airport or city with its country and coordinates: GET /api/airport?code=FAO */
export async function GET(req: NextRequest) {
  const code = (req.nextUrl.searchParams.get("code") ?? "").toUpperCase();
  if (!/^[A-Z]{3}$/.test(code)) return NextResponse.json({ error: "Use a 3-letter airport or city code" }, { status: 400 });
  const place = await placeByCode(code);
  if (!place) return NextResponse.json({ error: "Not found" }, { status: 404, headers: { "Cache-Control": "no-store" } });
  return NextResponse.json(place, { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" } });
}
