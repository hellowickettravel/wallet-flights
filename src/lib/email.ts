// Email delivery through Resend's REST API (https://resend.com/docs/api-reference).
// Configure on Vercel: RESEND_API_KEY, EMAIL_FROM (a verified sender such as
// "Wallet Flights <hello@walletflights.com>") and optionally CONTACT_TO and
// RESEND_AUDIENCE_ID. Without a key, development logs the message and
// production reports the form as unavailable rather than pretending to send.
import { site } from "@/content/site";

type Result = { ok: true; delivered: boolean } | { ok: false; reason: "not-configured" | "provider-error" };

const key = () => process.env.RESEND_API_KEY;
// EMAIL_DRY_RUN=1 (used by the e2e test server) logs instead of sending.
const isProd = () =>
  process.env.NODE_ENV === "production" && process.env.VERCEL_ENV !== "preview" && process.env.EMAIL_DRY_RUN !== "1";

async function resend(path: string, body: unknown): Promise<boolean> {
  const res = await fetch(`https://api.resend.com${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key()}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) console.error("Resend error", res.status, await res.text().catch(() => ""));
  return res.ok;
}

function unconfigured(label: string, payload: unknown): Result {
  if (isProd()) {
    console.error(`${label}: RESEND_API_KEY is not set; message not delivered.`);
    return { ok: false, reason: "not-configured" };
  }
  console.info(`[dev] ${label} (not sent, RESEND_API_KEY missing):`, payload);
  return { ok: true, delivered: false };
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendContactMessage(m: { name: string; email: string; topic: string; message: string }): Promise<Result> {
  if (!key()) return unconfigured("Contact message", m);
  const ok = await resend("/emails", {
    from: process.env.EMAIL_FROM ?? `${site.name} <onboarding@resend.dev>`,
    to: [process.env.CONTACT_TO ?? site.email],
    reply_to: m.email,
    subject: `[Contact] ${m.topic} — ${m.name}`,
    text: `From: ${m.name} <${m.email}>\nTopic: ${m.topic}\n\n${m.message}`,
    html: `<p><strong>From:</strong> ${escape(m.name)} &lt;${escape(m.email)}&gt;<br><strong>Topic:</strong> ${escape(m.topic)}</p><p>${escape(m.message).replace(/\n/g, "<br>")}</p>`,
  });
  return ok ? { ok: true, delivered: true } : { ok: false, reason: "provider-error" };
}

export async function addFareAlertSubscriber(email: string): Promise<Result> {
  if (!key()) return unconfigured("Fare alert signup", { email });
  const audience = process.env.RESEND_AUDIENCE_ID;
  const ok = audience
    ? await resend(`/audiences/${audience}/contacts`, { email, unsubscribed: false })
    : await resend("/emails", {
        from: process.env.EMAIL_FROM ?? `${site.name} <onboarding@resend.dev>`,
        to: [process.env.CONTACT_TO ?? site.email],
        subject: "[Fare alerts] New subscriber",
        text: `New fare-alert signup: ${email}`,
      });
  return ok ? { ok: true, delivered: true } : { ok: false, reason: "provider-error" };
}
