// Not a "use client" module, so the server layout can inline the string.
// Runs in <head> before first paint: marks visitors who already made a cookie
// choice (cookie "wf_consent", see consent.ts) so CSS hides the server-rendered
// banner and it never flashes.
export const CONSENT_FLAG_SCRIPT =
  'if(/(?:^|; )wf_consent=s[01]\.a[01]\./.test(document.cookie))document.documentElement.dataset.consent="1"';
