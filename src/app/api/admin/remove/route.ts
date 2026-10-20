import { NextResponse } from "next/server";
import { forgetEmail } from "@/lib/activity";
import { currentAdmin } from "@/lib/admin-auth";
import { guardFormRequest } from "@/lib/api-guard";
import { removeAlertsForEmail } from "@/lib/price-alerts";

/**
 * Deletes everything held for one email address (an erasure request): the
 * fare-alert sign-up, every price alert and its activity log. JSON `{ email }`.
 */
export async function POST(req: Request) {
  const refused = guardFormRequest(req, "admin-remove", 30);
  if (refused) return refused;
  if (!(await currentAdmin())) return NextResponse.json({ error: "Sign in at /admin" }, { status: 401 });
  const body = (await req.json().catch(() => null)) as { email?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || email.length > 254) return NextResponse.json({ error: "Enter an email address" }, { status: 400 });
  try {
    const alerts = await removeAlertsForEmail(email);
    const { subscriber, events } = await forgetEmail(email);
    return NextResponse.json({ ok: true, alerts, subscriber, events });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "The database is unavailable" }, { status: 503 });
  }
}
