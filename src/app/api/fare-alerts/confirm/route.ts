import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/activity";
import { guardFormRequest } from "@/lib/api-guard";
import { addFareAlertSubscriber } from "@/lib/email";
import { readOptInToken } from "@/lib/opt-in";

/**
 * Step 2 of the double opt-in. A POST from the confirmation page's button,
 * not a GET on the emailed link, so mail scanners that open links can't
 * confirm an address on their own.
 */
export async function POST(req: Request) {
  const refused = guardFormRequest(req, "fare-alerts-confirm", 10);
  if (refused) return refused;
  const body = (await req.json().catch(() => null)) as { t?: unknown } | null;
  const check = readOptInToken(typeof body?.t === "string" ? body.t : "");
  if (!check.ok) return NextResponse.json({ error: check.reason }, { status: check.reason === "expired" ? 410 : 400 });
  // Saved for the admin dashboard, and still emailed to the inbox as before.
  await addSubscriber(check.email);
  const result = await addFareAlertSubscriber(check.email);
  if (!result.ok) return NextResponse.json({ error: "Sign-up service unavailable" }, { status: 503 });
  return NextResponse.json({ ok: true });
}
