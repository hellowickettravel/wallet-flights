// Sign-in for the admin dashboard (/admin). One account, set in Vercel →
// Settings → Environment Variables: ADMIN_USERNAME and ADMIN_PASSWORD (a long
// one; the owner sets it, it is never committed). Without both, the dashboard
// says sign-in isn't set up and nobody can sign in.
//
// A successful sign-in sets an httpOnly cookie holding a signed, expiring
// token (src/lib/opt-in.ts). A fingerprint of the account is part of what is
// signed (never stored in the cookie), so changing the password signs everyone out.
import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { createSignedToken, readSignedToken } from "@/lib/opt-in";

export const ADMIN_COOKIE = "wf_admin";
export const SESSION_MS = 12 * 60 * 60_000;

const account = () => {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;
  return username && password ? { username, password } : null;
};

export const adminConfigured = () => !!account();

const digest = (s: string) => createHash("sha256").update(s).digest();
const purpose = (a: { username: string; password: string }) =>
  `admin-session|${createHash("sha256").update(`${a.username}\n${a.password}`).digest("base64url")}`;

/** Compares both fields in constant time (hashing first evens out the lengths). */
export function checkCredentials(username: string, password: string): boolean {
  const a = account();
  if (!a) return false;
  const userOk = timingSafeEqual(digest(username.trim().toLowerCase()), digest(a.username.toLowerCase()));
  const passOk = timingSafeEqual(digest(password), digest(a.password));
  return userOk && passOk;
}

/** The cookie value for a signed-in admin, or null when signing isn't possible. */
export function createSession(): string | null {
  const a = account();
  return a ? createSignedToken(purpose(a), { u: a.username }, SESSION_MS) : null;
}

export type Admin = { username: string };

export function readSession(token: string | undefined): Admin | null {
  const a = account();
  if (!a || !token) return null;
  if (!readSignedToken(purpose(a), token).ok) return null;
  return { username: a.username };
}

/** The signed-in admin for this request, or null. Reads the request's cookies. */
export async function currentAdmin(): Promise<Admin | null> {
  return readSession((await cookies()).get(ADMIN_COOKIE)?.value);
}

/** Cookie settings: never readable by page scripts, only sent to this site. */
export const sessionCookie = (secure: boolean) => ({
  httpOnly: true,
  secure,
  sameSite: "strict" as const,
  path: "/",
  maxAge: SESSION_MS / 1000,
});
