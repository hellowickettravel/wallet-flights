// Email goes out through Resend (RESEND_API_KEY on Vercel), from
// noreply@walletflights.com, with replies going to the company inbox,
// info@walletflights.com. The domain is verified in Resend (DNS on Hostinger).
// Until the key is set, the Microsoft 365 mailbox still sends (SMTP_PASS: the
// mailbox signs in to smtp.office365.com, and needs "SMTP Authentication" on),
// and it stands in if Resend fails. EMAIL_FROM, CONTACT_TO, SMTP_USER,
// SMTP_HOST and SMTP_PORT have defaults below. With neither, development logs
// the message and production reports the form as unavailable rather than
// pretending to send.
import nodemailer, { type Transporter } from "nodemailer";
import { formatPrice } from "@/content/deals";
import { tripText } from "@/content/fare-calendar";
import { site } from "@/content/site";
import type { Alert, AlertSpec, Cheapest } from "@/lib/price-alerts";

type Result = { ok: true; delivered: boolean } | { ok: false; reason: "not-configured" | "provider-error" };

const resendKey = () => process.env.RESEND_API_KEY;
const password = () => process.env.SMTP_PASS;
const user = () => process.env.SMTP_USER || site.email;
// EMAIL_DRY_RUN=1 (used by the e2e test server) logs instead of sending, even
// when a key is set, so tests never send real email.
const dryRun = () => process.env.EMAIL_DRY_RUN === "1";
const isProd = () => process.env.NODE_ENV === "production" && process.env.VERCEL_ENV !== "preview";
const inbox = () => process.env.CONTACT_TO || site.email;

/** Whether email can go out: Resend, the mailbox, or a dry run that only logs. */
export const emailReady = () => dryRun() || !!resendKey() || !!password() || !isProd();

type Message = { to: string; subject: string; text: string; html?: string; replyTo?: string; headers?: Record<string, string> };

/** Resend's REST API (no SDK: one request). RESEND_API_URL points it elsewhere for local checks. */
async function sendWithResend(message: Message) {
  const res = await fetch(`${process.env.RESEND_API_URL || "https://api.resend.com"}/emails`, {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey()}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `${site.name} <${process.env.EMAIL_FROM || site.sendingEmail}>`,
      to: [message.to],
      // Nobody reads noreply@: replies reach the inbox, or the visitor for contact messages.
      reply_to: message.replyTo ?? inbox(),
      subject: message.subject,
      text: message.text,
      ...(message.html && { html: message.html }),
      ...(message.headers && { headers: message.headers }),
    }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) {
    // Resend's message says what's wrong (never the key): 403 "domain is not
    // verified", 401 a bad key, 422 a bad field.
    const body = (await res.json().catch(() => null)) as { name?: string; message?: string } | null;
    throw new Error(`Resend ${res.status} ${body?.name ?? ""}: ${body?.message ?? res.statusText}`);
  }
}

let transport: Transporter | null = null;
function mailer() {
  const port = Number(process.env.SMTP_PORT) || 587;
  transport ??= nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.office365.com",
    port,
    // 587 starts plain and upgrades to TLS (required); 465 is TLS from the start.
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user: user(), pass: password() },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  return transport;
}

async function sendWithMailbox(message: Message) {
  try {
    // Microsoft 365 only sends as the mailbox that signed in.
    await mailer().sendMail({ from: { name: site.name, address: user() }, ...message });
  } catch (e) {
    // The server's reply says what's wrong (never the password); 535 means the
    // sign-in was refused: wrong password, or SMTP Authentication is off.
    const err = e as { code?: string; responseCode?: number; response?: string; message?: string };
    transport = null;
    throw new Error(`SMTP ${err.code ?? ""} ${err.responseCode ?? ""}: ${err.response ?? err.message}`);
  }
}

/** Sends one message, or logs it when there's nothing to send with. */
async function send(label: string, message: Message, logged: unknown = message): Promise<Result> {
  const senders = dryRun() ? [] : [...(resendKey() ? [sendWithResend] : []), ...(password() ? [sendWithMailbox] : [])];
  if (!senders.length) {
    if (dryRun()) {
      console.info(`[dry run] ${label} (not sent):`, logged);
      return { ok: true, delivered: false };
    }
    if (isProd()) {
      console.error(`${label}: neither RESEND_API_KEY nor SMTP_PASS is set; message not delivered.`);
      return { ok: false, reason: "not-configured" };
    }
    console.info(`[dev] ${label} (not sent, no RESEND_API_KEY or SMTP_PASS):`, logged);
    return { ok: true, delivered: false };
  }
  // Resend first; the mailbox stands in if Resend fails.
  for (const sendWith of senders) {
    try {
      await sendWith(message);
      return { ok: true, delivered: true };
    } catch (e) {
      console.error(`${label}: not sent`, (e as Error).message);
    }
  }
  return { ok: false, reason: "provider-error" };
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function sendContactMessage(m: { name: string; email: string; topic: string; message: string }): Promise<Result> {
  return send("Contact message", {
    to: inbox(),
    replyTo: m.email,
    subject: `[Contact] ${m.topic} — ${m.name}`,
    text: `From: ${m.name} <${m.email}>\nTopic: ${m.topic}\n\n${m.message}`,
    html: `<p><strong>From:</strong> ${escape(m.name)} &lt;${escape(m.email)}&gt;<br><strong>Topic:</strong> ${escape(m.topic)}</p><p>${escape(m.message).replace(/\n/g, "<br>")}</p>`,
  });
}

/** Double opt-in, step 1: the confirmation link goes to the address itself. */
export function sendFareAlertConfirmation(email: string, link: string): Promise<Result> {
  return send(
    "Fare alert confirmation",
    {
      to: email,
      subject: `Confirm your ${site.name} fare alerts`,
      text: `Someone (we hope you) asked for ${site.name} fare alerts at this address.

Confirm here: ${link}

The link lasts 7 days. If it wasn't you, ignore this email and you won't hear from us again.`,
      html: `<p>Someone (we hope you) asked for ${escape(site.name)} fare alerts at this address.</p><p><a href="${escape(link)}">Confirm my email address</a></p><p>The link lasts 7 days. If it wasn't you, ignore this email and you won't hear from us again.</p>`,
    },
    { email, link },
  );
}

/** Double opt-in, step 2: a confirmed address is sent to our inbox for the launch list. */
export function addFareAlertSubscriber(email: string): Promise<Result> {
  return send("Fare alert signup", { to: inbox(), subject: "[Fare alerts] New subscriber", text: `New fare-alert signup (confirmed): ${email}` }, { email });
}

const routeName = (a: AlertSpec) => `${a.from.city} to ${a.to.city}`;
const dayText = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });

/** Route price alert, step 1: the confirmation link goes to the address itself. */
export function sendPriceAlertConfirmation(a: AlertSpec, link: string): Promise<Result> {
  const what = `${routeName(a)} (${tripText(a.trip, a.nights)}) below ${formatPrice(a.max, a.currency)}`;
  return send(
    "Price alert confirmation",
    {
      to: a.email,
      subject: `Confirm your price alert: ${routeName(a)}`,
      text: `Someone (we hope you) asked ${site.name} to email this address when ${what}.

Start the alert here: ${link}

The link lasts 7 days. If it wasn't you, ignore this email and nothing happens.`,
      html: `<p>Someone (we hope you) asked ${escape(site.name)} to email this address when <strong>${escape(what)}</strong>.</p><p><a href="${escape(link)}">Start my price alert</a></p><p>The link lasts 7 days. If it wasn't you, ignore this email and nothing happens.</p>`,
    },
    { email: a.email, link },
  );
}

/**
 * The alert itself. Carries one-click unsubscribe headers (RFC 8058), so mail
 * apps can offer their own "Unsubscribe" button.
 */
export function sendPriceAlert(a: Alert, fare: Cheapest, links: { calendar: string; stop: string; oneClick: string }): Promise<Result> {
  const price = formatPrice(fare.price, a.currency);
  const trip = tripText(a.trip, a.nights);
  const line = `The cheapest ${trip} fare found recently is ${price} per person, leaving ${dayText(fare.date)}. Your alert was ${formatPrice(a.max, a.currency)}.`;
  const note = "Fares were found by travellers in the last few days and can change or sell out; the provider confirms the final price when you book.";
  return send(
    "Price alert",
    {
      to: a.email,
      subject: `${routeName(a)} from ${price}: below your price alert`,
      headers: { "List-Unsubscribe": `<${links.oneClick}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
      text: `${routeName(a)}: ${line}

See every day's fare: ${links.calendar}

${note}

Stop this alert: ${links.stop}`,
      html: `<p><strong>${escape(routeName(a))}</strong>: ${escape(line)}</p><p><a href="${escape(links.calendar)}">See every day's fare in the fare calendar</a></p><p style="color:#555">${escape(note)}</p><p style="color:#555"><a href="${escape(links.stop)}">Stop this alert</a></p>`,
    },
    { email: a.email, route: routeName(a), price, links },
  );
}
