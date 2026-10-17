// Email delivery through Resend's REST API (https://resend.com/docs/api-reference).
// Configure on Vercel: RESEND_API_KEY, EMAIL_FROM (a verified sender such as
// "Wallet Flights <hello@walletflights.com>") and optionally CONTACT_TO and
// RESEND_AUDIENCE_ID. Without a key, development logs the message and
// production reports the form as unavailable rather than pretending to send.
import { formatPrice } from "@/content/deals";
import { tripText } from "@/content/fare-calendar";
import { site } from "@/content/site";
import type { Alert, AlertSpec, Cheapest } from "@/lib/price-alerts";

type Result = { ok: true; delivered: boolean } | { ok: false; reason: "not-configured" | "provider-error" };

const key = () => process.env.RESEND_API_KEY;
// EMAIL_DRY_RUN=1 (used by the e2e test server) logs instead of sending, even
// when a key is set, so tests never send real email.
const dryRun = () => process.env.EMAIL_DRY_RUN === "1";
const isProd = () => process.env.NODE_ENV === "production" && process.env.VERCEL_ENV !== "preview";
const from = () => process.env.EMAIL_FROM ?? `${site.name} <onboarding@resend.dev>`;

/** Whether email can go out: a provider key, or a dry run that only logs. */
export const emailReady = () => dryRun() || !!key() || !isProd();

async function resend(path: string, body: unknown): Promise<boolean> {
  const res = await fetch(`https://api.resend.com${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key()}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) console.error("Resend error", res.status, await res.text().catch(() => ""));
  return res.ok;
}

/** Not sending: a dry run, or no key. Development logs; production reports it. */
function notSent(label: string, payload: unknown): Result {
  if (dryRun()) {
    console.info(`[dry run] ${label} (not sent):`, payload);
    return { ok: true, delivered: false };
  }
  if (isProd()) {
    console.error(`${label}: RESEND_API_KEY is not set; message not delivered.`);
    return { ok: false, reason: "not-configured" };
  }
  console.info(`[dev] ${label} (not sent, RESEND_API_KEY missing):`, payload);
  return { ok: true, delivered: false };
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendContactMessage(m: { name: string; email: string; topic: string; message: string }): Promise<Result> {
  if (dryRun() || !key()) return notSent("Contact message", m);
  const ok = await resend("/emails", {
    from: from(),
    to: [process.env.CONTACT_TO ?? site.email],
    reply_to: m.email,
    subject: `[Contact] ${m.topic} — ${m.name}`,
    text: `From: ${m.name} <${m.email}>\nTopic: ${m.topic}\n\n${m.message}`,
    html: `<p><strong>From:</strong> ${escape(m.name)} &lt;${escape(m.email)}&gt;<br><strong>Topic:</strong> ${escape(m.topic)}</p><p>${escape(m.message).replace(/\n/g, "<br>")}</p>`,
  });
  return ok ? { ok: true, delivered: true } : { ok: false, reason: "provider-error" };
}

/** Double opt-in, step 1: the confirmation link goes to the address itself. */
export async function sendFareAlertConfirmation(email: string, link: string): Promise<Result> {
  if (dryRun() || !key()) return notSent("Fare alert confirmation", { email, link });
  const ok = await resend("/emails", {
    from: from(),
    to: [email],
    subject: `Confirm your ${site.name} fare alerts`,
    text: `Someone (we hope you) asked for ${site.name} fare alerts at this address.

Confirm here: ${link}

The link lasts 7 days. If it wasn't you, ignore this email and you won't hear from us again.`,
    html: `<p>Someone (we hope you) asked for ${escape(site.name)} fare alerts at this address.</p><p><a href="${escape(link)}">Confirm my email address</a></p><p>The link lasts 7 days. If it wasn't you, ignore this email and you won't hear from us again.</p>`,
  });
  return ok ? { ok: true, delivered: true } : { ok: false, reason: "provider-error" };
}

/** Double opt-in, step 2: only a confirmed address is added to the list. */
export async function addFareAlertSubscriber(email: string): Promise<Result> {
  if (dryRun() || !key()) return notSent("Fare alert signup", { email });
  const audience = process.env.RESEND_AUDIENCE_ID;
  const ok = audience
    ? await resend(`/audiences/${audience}/contacts`, { email, unsubscribed: false })
    : await resend("/emails", {
        from: from(),
        to: [process.env.CONTACT_TO ?? site.email],
        subject: "[Fare alerts] New subscriber",
        text: `New fare-alert signup (confirmed): ${email}`,
      });
  return ok ? { ok: true, delivered: true } : { ok: false, reason: "provider-error" };
}

const routeName = (a: AlertSpec) => `${a.from.city} to ${a.to.city}`;
const dayText = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });

/** Route price alert, step 1: the confirmation link goes to the address itself. */
export async function sendPriceAlertConfirmation(a: AlertSpec, link: string): Promise<Result> {
  if (dryRun() || !key()) return notSent("Price alert confirmation", { email: a.email, link });
  const what = `${routeName(a)} (${tripText(a.trip, a.nights)}) below ${formatPrice(a.max, a.currency)}`;
  const ok = await resend("/emails", {
    from: from(),
    to: [a.email],
    subject: `Confirm your price alert: ${routeName(a)}`,
    text: `Someone (we hope you) asked ${site.name} to email this address when ${what}.

Start the alert here: ${link}

The link lasts 7 days. If it wasn't you, ignore this email and nothing happens.`,
    html: `<p>Someone (we hope you) asked ${escape(site.name)} to email this address when <strong>${escape(what)}</strong>.</p><p><a href="${escape(link)}">Start my price alert</a></p><p>The link lasts 7 days. If it wasn't you, ignore this email and nothing happens.</p>`,
  });
  return ok ? { ok: true, delivered: true } : { ok: false, reason: "provider-error" };
}

/**
 * The alert itself. Carries one-click unsubscribe headers (RFC 8058), so mail
 * apps can offer their own "Unsubscribe" button.
 */
export async function sendPriceAlert(a: Alert, fare: Cheapest, links: { calendar: string; stop: string; oneClick: string }): Promise<Result> {
  const price = formatPrice(fare.price, a.currency);
  if (dryRun() || !key()) return notSent("Price alert", { email: a.email, route: routeName(a), price, links });
  const trip = tripText(a.trip, a.nights);
  const line = `The cheapest ${trip} fare found recently is ${price} per person, leaving ${dayText(fare.date)}. Your alert was ${formatPrice(a.max, a.currency)}.`;
  const note = "Fares were found by travellers in the last few days and can change or sell out; the provider confirms the final price when you book.";
  const ok = await resend("/emails", {
    from: from(),
    to: [a.email],
    subject: `${routeName(a)} from ${price}: below your price alert`,
    headers: { "List-Unsubscribe": `<${links.oneClick}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
    text: `${routeName(a)}: ${line}

See every day's fare: ${links.calendar}

${note}

Stop this alert: ${links.stop}`,
    html: `<p><strong>${escape(routeName(a))}</strong>: ${escape(line)}</p><p><a href="${escape(links.calendar)}">See every day's fare in the fare calendar</a></p><p style="color:#555">${escape(note)}</p><p style="color:#555"><a href="${escape(links.stop)}">Stop this alert</a></p>`,
  });
  return ok ? { ok: true, delivered: true } : { ok: false, reason: "provider-error" };
}
