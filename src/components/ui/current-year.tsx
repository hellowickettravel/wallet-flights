"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const clientYear = () => new Date().getFullYear();
// Year the site was built; used for the prerendered HTML.
const buildYear = () => Number(process.env.NEXT_PUBLIC_BUILD_YEAR);

export function CurrentYear() {
  return <>{useSyncExternalStore(subscribe, clientYear, buildYear)}</>;
}
