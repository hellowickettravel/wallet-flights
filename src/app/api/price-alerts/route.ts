import { NextResponse } from "next/server";
import { site } from "@/content/site";
import { guardFormRequest } from "@/lib/api-guard";
import { sendPriceAlertConfirmation } from "@/lib/email";
import { confirmToken, linkOrigin, parseAlertSpec, priceAlertsReady } from "@/lib/price-alerts";

// People take longer than this to read the box and type an address; bots don't.
const MIN_FILL_MS = 1500;

/**
 * Route price alert, step 1 of the double opt-in: email a confirmation link
 * that carries the alert. Nothing is stored until it's confirmed.
 */
export async function POST(req: Request) {
  const refused = guardFormRequest(req, "price-alerts");
  if (refused) return refused;

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  // Honeypot filled in, or submitted faster than a person could: look
  // successful so the bot learns nothing, but send nothing.
  const startedAt = Number(body?.startedAt);
  if ((typeof body?.company === "string" && body.company) || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const spec = parseAlertSpec(body);
  if (typeof spec === "string") return NextResponse.json({ error: spec }, { status: 400 });
  if (!priceAlertsReady()) return NextResponse.json({ error: "Price alerts are unavailable" }, { status: 503 });

  const token = confirmToken(spec);
  if (!token) return NextResponse.json({ error: "Price alerts are unavailable" }, { status: 503 });
  const link = `${linkOrigin(req, site.url)}/price-alerts/confirm?t=${token}`;
  const result = await sendPriceAlertConfirmation(spec, link);
  if (!result.ok) return NextResponse.json({ error: "Price alerts are unavailable" }, { status: 503 });
  // The e2e server sends no email, so it hands the link back for the test to follow.
  return NextResponse.json(process.env.EMAIL_DRY_RUN === "1" ? { ok: true, link } : { ok: true }, { status: 202 });
}
