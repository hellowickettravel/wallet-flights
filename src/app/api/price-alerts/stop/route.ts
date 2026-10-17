import { NextResponse } from "next/server";
import { guardFormRequest } from "@/lib/api-guard";
import { readSignedToken } from "@/lib/opt-in";
import { STOP_PURPOSE, removeAlert } from "@/lib/price-alerts";

/**
 * Stops one alert. Two callers:
 * - the stop page's button: JSON `{ t }`, same-origin, like our other forms;
 * - a mail app's one-click unsubscribe (RFC 8058): a form POST to the
 *   List-Unsubscribe URL (`?t=` in the address) from the mail provider's
 *   servers, so there's no Origin to check. The signed token is the check.
 */
export async function POST(req: Request) {
  const url = new URL(req.url);
  const json = !!req.headers.get("content-type")?.toLowerCase().startsWith("application/json");
  let token = "";
  if (!json && url.searchParams.get("t")) token = url.searchParams.get("t") ?? "";
  else {
    const refused = guardFormRequest(req, "price-alerts-stop", 10);
    if (refused) return refused;
    const body = (await req.json().catch(() => null)) as { t?: unknown } | null;
    token = typeof body?.t === "string" ? body.t : "";
  }
  const check = readSignedToken<{ id?: unknown }>(STOP_PURPOSE, token);
  if (!check.ok || typeof check.data.id !== "string") return NextResponse.json({ error: "invalid" }, { status: 400 });
  const result = await removeAlert(check.data.id);
  if (!result.ok) return NextResponse.json({ error: "Price alerts are unavailable" }, { status: 503 });
  // Stopping twice is fine: the alert is gone either way.
  return NextResponse.json({ ok: true, route: result.alert ? `${result.alert.from.city} to ${result.alert.to.city}` : null });
}
