// Not a "use client" module, so the server layout can inline the string.
// Runs in <head> before first paint: marks visitors who already made a cookie
// choice (cookie "wf_consent", see consent.ts) so CSS hides the server-rendered
// banner and it never flashes.
export const CONSENT_FLAG_SCRIPT =
  'if(/(?:^|; )wf_consent=s[01]\.a[01]\./.test(document.cookie))document.documentElement.dataset.consent="1"';

// Same moment: copies the visitor's currency (cookie "wf_cur", src/lib/currency.ts)
// onto <html data-cur>, so CSS can hide prices that are about to be converted.
export const CURRENCY_FLAG_SCRIPT =
  'var c=/(?:^|; )wf_cur=([A-Z]{3})/.exec(document.cookie);if(c)document.documentElement.dataset.cur=c[1]';
