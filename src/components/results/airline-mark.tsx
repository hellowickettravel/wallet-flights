import clsx from "clsx";
import type { Airline } from "@/content/airlines";

/** Monogram tile standing in for an airline logo (no trademarked artwork). */
export function AirlineMark({ airline, size = "md" }: { airline: Airline; size?: "sm" | "md" }) {
  return (
    <span
      aria-hidden
      style={{ backgroundColor: airline.color }}
      className={clsx(
        "grid shrink-0 place-items-center rounded-lg font-display-tight font-bold tracking-wide text-white shadow-[inset_0_-2px_0_rgb(0_0_0/0.18)]",
        size === "md" ? "size-11 text-[0.9375rem]" : "size-8 text-[0.75rem]",
      )}
    >
      {airline.code}
    </span>
  );
}
