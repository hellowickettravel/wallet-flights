import { NextResponse, type NextRequest } from "next/server";
import { airlineByCode, findAirlines } from "@/lib/travel-data";

/**
 * Airline lookup for the compensation checker:
 * GET /api/airlines?q=easy (up to 8 matches) or /api/airlines?code=U2 (one).
 */
export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;
  const code = (p.get("code") ?? "").toUpperCase();
  if (code) {
    const airline = /^[A-Z0-9]{2}$/.test(code) ? await airlineByCode(code) : null;
    return airline
      ? NextResponse.json(airline, { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" } })
      : NextResponse.json({ error: "Not found" }, { status: 404, headers: { "Cache-Control": "no-store" } });
  }
  const q = (p.get("q") ?? "").trim().slice(0, 40);
  if (q.length < 2) return NextResponse.json([]);
  const { ok, airlines } = await findAirlines(q);
  return NextResponse.json(airlines, {
    headers: { "Cache-Control": ok ? "public, s-maxage=86400, stale-while-revalidate=604800" : "no-store" },
  });
}
