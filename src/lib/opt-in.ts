// Fare-alert double opt-in without a database: the confirmation link carries
// the address and an expiry, signed with HMAC-SHA256 so it can't be forged.
import { createHmac, timingSafeEqual } from "node:crypto";

const TTL_MS = 7 * 24 * 60 * 60_000;

/**
 * FARE_ALERT_SECRET if set, otherwise the Resend key (a server secret that
 * exists whenever email can be sent). Development and dry runs get a fixed
 * value; production without either can't sign, and sign-up reports it.
 */
function secret() {
  const s = process.env.FARE_ALERT_SECRET || process.env.RESEND_API_KEY;
  if (s) return s;
  return process.env.NODE_ENV !== "production" || process.env.EMAIL_DRY_RUN === "1" ? "dev-only-opt-in-secret" : null;
}

const sign = (payload: string, key: string) => createHmac("sha256", key).update(payload).digest("base64url");

export function createOptInToken(email: string, now = Date.now()): string | null {
  const key = secret();
  if (!key) return null;
  const payload = `${Buffer.from(email).toString("base64url")}.${(now + TTL_MS).toString(36)}`;
  return `${payload}.${sign(payload, key)}`;
}

export type OptInCheck = { ok: true; email: string } | { ok: false; reason: "invalid" | "expired" };

export function readOptInToken(token: string, now = Date.now()): OptInCheck {
  const key = secret();
  const [mail, exp, sig] = token.split(".");
  if (!key || !mail || !exp || !sig) return { ok: false, reason: "invalid" };
  const expected = Buffer.from(sign(`${mail}.${exp}`, key));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return { ok: false, reason: "invalid" };
  if (now > Number.parseInt(exp, 36)) return { ok: false, reason: "expired" };
  return { ok: true, email: Buffer.from(mail, "base64url").toString() };
}
