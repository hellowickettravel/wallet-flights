// Time-zone helpers for the destination widgets (Batch 22). Pure functions on
// the runtime's own Intl time-zone data: no React, safe on server and client.
// The current time is only read in the browser (client components), because
// prerendered pages would otherwise freeze the time they were built at.

/** Minutes ahead of UTC in `timeZone` at `date`. */
export function offsetMinutes(timeZone: string, date: Date) {
  const name = new Intl.DateTimeFormat("en-GB", { timeZone, timeZoneName: "longOffset" }).formatToParts(date).find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const m = name.match(/GMT([+-])(\d{2}):(\d{2})/);
  return m ? (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3])) : 0;
}

/** "5 hours", "1 hour", "5½ hours", "30 minutes". */
export function hoursLabel(min: number) {
  const abs = Math.abs(min);
  if (abs < 60) return `${abs} minutes`;
  const whole = Math.floor(abs / 60);
  const rest = abs % 60;
  const text = rest === 30 ? `${whole}½` : rest === 45 ? `${whole}¾` : rest === 15 ? `${whole}¼` : String(whole);
  return `${text} hour${abs === 60 ? "" : "s"}`;
}

/** Minutes `to` is ahead of `from` right now (negative when behind). */
export const zoneDifference = (to: string, from: string, now: Date) => offsetMinutes(to, now) - offsetMinutes(from, now);

/** "Same time as {city}" / "{hours} ahead of {city}" / "{hours} behind {city}", filled in on the server. */
export type DiffCopy = { same: string; ahead: string; behind: string };

/** The time-difference line from templates, so client components needn't import the content index. */
export function diffText(diff: number, city: string, t: DiffCopy) {
  const tpl = diff === 0 ? t.same : diff > 0 ? t.ahead : t.behind;
  return tpl.replace("{hours}", hoursLabel(diff)).replace("{city}", city);
}

/** Templates built from the page copy (call on the server). */
export const diffTemplates = (c: { sameTime: (city: string) => string; ahead: (h: string, city: string) => string; behind: (h: string, city: string) => string }): DiffCopy => ({
  same: c.sameTime("{city}"),
  ahead: c.ahead("{hours}", "{city}"),
  behind: c.behind("{hours}", "{city}"),
});
