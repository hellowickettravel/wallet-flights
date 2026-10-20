import { NextResponse } from "next/server";
import { currentAdmin } from "@/lib/admin-auth";
import { csv, exportLists, exportRows, loadDashboard, type ExportList } from "@/lib/admin-data";

/** CSV download for the signed-in admin: /api/admin/export?list=contacts|subscribers|alerts|activity. */
export async function GET(req: Request) {
  if (!(await currentAdmin())) return NextResponse.json({ error: "Sign in at /admin" }, { status: 401 });
  const list = new URL(req.url).searchParams.get("list") as ExportList;
  if (!exportLists.includes(list)) return NextResponse.json({ error: "Unknown list" }, { status: 400 });
  const data = await loadDashboard().catch((e) => {
    console.error(e);
    return null;
  });
  if (!data) return NextResponse.json({ error: "The database is unavailable" }, { status: 503 });
  const day = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv(exportRows(list, data)), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="wallet-flights-${list}-${day}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
