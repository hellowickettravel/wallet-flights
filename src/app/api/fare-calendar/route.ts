import { NextResponse, type NextRequest } from "next/server";
import { fareCalendar } from "@/lib/fare-calendar";

const CODE = /^[A-Z]{3}$/;

/**
 * Fares for the fare calendar: GET /api/fare-calendar?origin=LON&destination=BCN&currency=GBP&trip=return
 * Each month is cached on the server for an hour (see src/lib/fare-calendar.ts),
 * and the answer at the edge for an hour too.
 */
export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;
  const origin = (p.get("origin") ?? "").toUpperCase();
  const destination = (p.get("destination") ?? "").toUpperCase();
  const currency = p.get("currency") === "USD" ? "USD" : "GBP";
  if (!CODE.test(origin) || !CODE.test(destination) || origin === destination) {
    return NextResponse.json({ error: "Choose two different airports or cities" }, { status: 400 });
  }
  const data = await fareCalendar(origin, destination, currency, p.get("trip") === "return");
  const found = data.out.length > 0;
  return NextResponse.json(data, {
    headers: { "Cache-Control": found ? "public, s-maxage=3600, stale-while-revalidate=86400" : "no-store" },
  });
}
