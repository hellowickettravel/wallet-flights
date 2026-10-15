import { NextResponse } from "next/server";
import { site } from "@/content/site";
import { guardFormRequest } from "@/lib/api-guard";
import { sendFareAlertConfirmation } from "@/lib/email";
import { createOptInToken } from "@/lib/opt-in";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// People take longer than this to scroll to the form and type an address; bots don't.
const MIN_FILL_MS = 1500;

/** Step 1 of the double opt-in: email a confirmation link. Nothing is stored yet. */
export async function POST(req: Request) {
  const refused = guardFormRequest(req, "fare-alerts");
  if (refused) return refused;

  const body = (await req.json().catch(() => null)) as { email?: unknown; company?: unknown; startedAt?: unknown } | null;
  // Honeypot filled in, or submitted faster than a person could: look
  // successful so the bot learns nothing, but send nothing.
  const startedAt = Number(body?.startedAt);
  if ((typeof body?.company === "string" && body.company) || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const email = typeof body?.email === "string" ? body.email.trim() : "";
  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  const token = createOptInToken(email);
  if (!token) return NextResponse.json({ error: "Sign-up service unavailable" }, { status: 503 });
  // Production links always use the canonical host; previews and local runs use their own.
  const origin = process.env.VERCEL_ENV === "production" ? site.url : new URL(req.url).origin;
  const link = `${origin}/fare-alerts/confirm?t=${token}`;
  const result = await sendFareAlertConfirmation(email, link);
  if (!result.ok) return NextResponse.json({ error: "Sign-up service unavailable" }, { status: 503 });
  // The e2e server sends no email, so it hands the link back for the test to follow.
  return NextResponse.json(process.env.EMAIL_DRY_RUN === "1" ? { ok: true, link } : { ok: true }, { status: 202 });
}
