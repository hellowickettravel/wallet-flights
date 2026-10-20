import { NextResponse } from "next/server";
import { ADMIN_COOKIE, sessionCookie } from "@/lib/admin-auth";
import { guardFormRequest } from "@/lib/api-guard";

/** Signs out: the cookie is cleared. */
export async function POST(req: Request) {
  const refused = guardFormRequest(req, "admin-logout", 20);
  if (refused) return refused;
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { ...sessionCookie(new URL(req.url).protocol === "https:"), maxAge: 0 });
  return res;
}
