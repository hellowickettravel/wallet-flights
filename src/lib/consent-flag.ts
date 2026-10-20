// Not a "use client" module, so the server layout can inline the string.
// Runs in <head> before first paint: marks visitors who already made a cookie
// choice (cookie "wf_consent", see consent.ts) so CSS hides the server-rendered
// banner and it never flashes.
//
// Analytics consent given before ANALYTICS_RENEW_BEFORE only covered Vercel
// Analytics. Google Analytics was added then, so those visitors see the banner again.
export const ANALYTICS_RENEW_BEFORE = Date.UTC(2026, 9, 20, 6, 15); // 20 Oct 2026, 06:15 UTC

export const CONSENT_FLAG_SCRIPT = `var m=/(?:^|; )wf_consent=s[01]\\.a([01])\\.(\\d+)/.exec(document.cookie);if(m&&(m[1]==="0"||+m[2]>=${ANALYTICS_RENEW_BEFORE}))document.documentElement.dataset.consent="1"`;

// Same moment: copies the visitor's currency (cookie "wf_cur", src/lib/currency.ts)
// onto <html data-cur>, so CSS can hide prices that are about to be converted.
export const CURRENCY_FLAG_SCRIPT =
  'var c=/(?:^|; )wf_cur=([A-Z]{3})/.exec(document.cookie);if(c)document.documentElement.dataset.cur=c[1]';
