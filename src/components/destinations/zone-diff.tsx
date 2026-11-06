"use client";

import { useSyncExternalStore } from "react";
import { diffText, zoneDifference, type DiffCopy } from "./zone-time";

const noop = () => () => {};
// Read once in the browser: the difference only changes when clocks change.
const hourNow = () => Math.floor(Date.now() / 3_600_000);
const serverNow = () => null;

/**
 * "5 hours ahead of New York" for one row of the flight-times board, worked
 * out in the browser from today's date (daylight saving included). Empty in
 * the prerendered HTML, which can't know the date it's read on.
 */
export function ZoneDiff({ to, from, fromCity, copy }: { to: string; from: string; fromCity: string; copy: DiffCopy }) {
  const hour = useSyncExternalStore(noop, hourNow, serverNow);
  if (hour === null) return null;
  return <>{diffText(zoneDifference(to, from, new Date(hour * 3_600_000)), fromCity, copy)}</>;
}
