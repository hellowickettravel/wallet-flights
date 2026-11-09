import type { Config, Context } from "@netlify/functions";

// Netlify's stand-in for the cron in vercel.json: once a day it calls the
// Next.js route that checks every price alert, with the same bearer secret.
// Scheduled functions only run on the published production deploy.
const priceAlertsCron = async (_req: Request, context: Context) => {
  const secret = Netlify.env.get("CRON_SECRET");
  if (!secret) {
    console.error("price-alerts-cron: CRON_SECRET is not set");
    return;
  }
  const origin = Netlify.env.get("URL") || context.site.url;
  const res = await fetch(`${origin}/api/price-alerts/check`, { headers: { Authorization: `Bearer ${secret}` } });
  console.info("price-alerts-cron", res.status, await res.text());
};

export default priceAlertsCron;

export const config: Config = {
  schedule: "0 7 * * *", // 07:00 UTC daily, as on Vercel
};
