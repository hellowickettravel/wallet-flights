import { NextResponse } from "next/server";
import { addFareAlertSubscriber } from "@/lib/email";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { email?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }
  const result = await addFareAlertSubscriber(email);
  if (!result.ok) return NextResponse.json({ error: "Sign-up service unavailable" }, { status: 503 });
  return NextResponse.json({ ok: true }, { status: 202 });
}
