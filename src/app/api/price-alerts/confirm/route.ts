import { NextResponse } from "next/server";
import { formatPrice } from "@/content/deals";
import { site } from "@/content/site";
import { guardFormRequest } from "@/lib/api-guard";
import { readSignedToken } from "@/lib/opt-in";
import { CONFIRM_PURPOSE, calendarLink, linkOrigin, parseAlertSpec, saveAlert, stopLinks } from "@/lib/price-alerts";

/**
 * Step 2: save the alert. A POST from the confirmation page's button, not a
 * GET on the emailed link, so mail scanners that open links can't start one.
 */
export async function POST(req: Request) {
  const refused = guardFormRequest(req, "price-alerts-confirm", 10);
  if (refused) return refused;
  const body = (await req.json().catch(() => null)) as { t?: unknown } | null;
  const check = readSignedToken<Record<string, unknown>>(CONFIRM_PURPOSE, typeof body?.t === "string" ? body.t : "");
  if (!check.ok) return NextResponse.json({ error: check.reason }, { status: check.reason === "expired" ? 410 : 400 });
  // Signed by us, but checked again like any input.
  const spec = parseAlertSpec(check.data);
  if (typeof spec === "string") return NextResponse.json({ error: "invalid" }, { status: 400 });

  const saved = await saveAlert(spec);
  if (!saved.ok) return NextResponse.json({ error: "Price alerts are unavailable" }, { status: 503 });
  return NextResponse.json({
    ok: true,
    route: `${spec.from.city} to ${spec.to.city}`,
    price: formatPrice(spec.max, spec.currency),
    calendar: calendarLink("", spec),
    // The e2e server sends no email, so it hands back the stop link an alert email would carry.
    ...(process.env.EMAIL_DRY_RUN === "1" ? { stop: stopLinks(linkOrigin(req, site.url), saved.alert).stop } : {}),
  });
}
