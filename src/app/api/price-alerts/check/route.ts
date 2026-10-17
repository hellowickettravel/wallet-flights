import { NextResponse } from "next/server";
import { site } from "@/content/site";
import { sendPriceAlert } from "@/lib/email";
import { calendarLink, checkAlerts, linkOrigin, stopLinks } from "@/lib/price-alerts";

// Room for a long list on a slow day; most runs take seconds.
export const maxDuration = 300;

/**
 * The daily price check, called by the cron in vercel.json. Vercel sends
 * `Authorization: Bearer $CRON_SECRET`; without the secret set, only
 * development and the e2e server may run it.
 */
export async function GET(req: Request) {
  // Reading the request first also keeps this out of the build's prerender.
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  const local = process.env.EMAIL_DRY_RUN === "1" || process.env.NODE_ENV !== "production";
  if (secret ? auth !== `Bearer ${secret}` : !local) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const origin = linkOrigin(req, site.url);
  const summary = await checkAlerts(async (a, fare) => {
    const links = stopLinks(origin, a);
    const sent = await sendPriceAlert(a, fare, { calendar: calendarLink(origin, a), ...links });
    return sent.ok;
  });
  if (!summary) return NextResponse.json({ error: "Price alerts are unavailable" }, { status: 503 });
  console.info("Price alert check", summary);
  return NextResponse.json(summary, { headers: { "Cache-Control": "no-store" } });
}
