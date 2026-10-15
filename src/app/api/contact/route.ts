import { NextResponse } from "next/server";
import { contactTopics } from "@/content/contact";
import { guardFormRequest } from "@/lib/api-guard";
import { sendContactMessage } from "@/lib/email";
import { validateContact, type ContactInput } from "@/lib/validate-contact";

export async function POST(req: Request) {
  const refused = guardFormRequest(req, "contact");
  if (refused) return refused;
  const body = (await req.json().catch(() => null)) as Partial<ContactInput & { company: string }> | null;
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  // Honeypot: real visitors never see or fill this field.
  if (typeof body.company === "string" && body.company.length > 0) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const input: ContactInput = {
    name: String(body.name ?? "").trim(),
    email: String(body.email ?? "").trim(),
    topic: String(body.topic ?? "") as ContactInput["topic"],
    message: String(body.message ?? "").trim(),
  };
  const errors = validateContact(input);
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 400 });

  const topic = contactTopics.find((t) => t.id === input.topic)!.label;
  const result = await sendContactMessage({ ...input, topic });
  if (!result.ok) return NextResponse.json({ error: "Message service unavailable" }, { status: 503 });
  return NextResponse.json({ ok: true }, { status: 202 });
}
