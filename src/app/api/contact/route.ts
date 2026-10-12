import { NextResponse } from "next/server";
import { validateContact, type ContactInput } from "@/lib/validate-contact";

// TODO(integrate): deliver messages to info@walletflights.com (e.g. Resend,
// Postmark or a helpdesk). Until then this validates only — do not launch the
// contact form before this is connected.
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Partial<ContactInput & { company: string }> | null;
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  // Honeypot: real visitors never see or fill this field.
  if (typeof body.company === "string" && body.company.length > 0) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const input: ContactInput = {
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    topic: (String(body.topic ?? "") as ContactInput["topic"]),
    message: String(body.message ?? ""),
  };
  const errors = validateContact(input);
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 400 });

  return NextResponse.json({ ok: true }, { status: 202 });
}
