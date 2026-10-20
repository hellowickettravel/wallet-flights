import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminConfigured, checkCredentials, createSession, sessionCookie } from "@/lib/admin-auth";
import { guardFormRequest } from "@/lib/api-guard";

/** Admin sign-in: JSON `{ username, password }` from the /admin form. 5 tries per IP per 10 minutes. */
export async function POST(req: Request) {
  const refused = guardFormRequest(req, "admin-login");
  if (refused) return refused;
  if (!adminConfigured()) return NextResponse.json({ error: "not-configured" }, { status: 503 });
  const body = (await req.json().catch(() => null)) as { username?: unknown; password?: unknown } | null;
  const username = typeof body?.username === "string" ? body.username : "";
  const password = typeof body?.password === "string" ? body.password : "";
  if (!checkCredentials(username, password)) {
    // Never says which of the two was wrong.
    console.warn("Admin sign-in refused");
    return NextResponse.json({ error: "invalid" }, { status: 401 });
  }
  const session = createSession();
  if (!session) return NextResponse.json({ error: "not-configured" }, { status: 503 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, session, sessionCookie(new URL(req.url).protocol === "https:"));
  return res;
}
