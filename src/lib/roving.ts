import type { KeyboardEvent } from "react";

const NEXT = new Set(["ArrowRight", "ArrowDown"]);
const PREV = new Set(["ArrowLeft", "ArrowUp"]);

/**
 * Arrow keys, Home and End for a tablist or radiogroup (WAI-ARIA APG). Put it
 * on the group's onKeyDown and give only the selected item tabIndex 0, so the
 * group is one Tab stop. Moving selects as well (automatic activation).
 */
export function onRovingKeyDown(e: KeyboardEvent<HTMLElement>, select: (index: number) => void) {
  const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="tab"], [role="radio"]'));
  const i = items.indexOf(e.target as HTMLElement);
  if (i < 0) return;
  const n = items.length;
  const next =
    e.key === "Home" ? 0 : e.key === "End" ? n - 1 : NEXT.has(e.key) ? (i + 1) % n : PREV.has(e.key) ? (i - 1 + n) % n : -1;
  if (next < 0) return;
  e.preventDefault();
  items[next].focus();
  select(next);
}
