import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// TODO(integrate): forward sign-ups to the email provider (e.g. Mailchimp,
// Brevo or Resend audience). Until then this only validates the address.
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { email?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }
  return NextResponse.json({ ok: true }, { status: 202 });
}
