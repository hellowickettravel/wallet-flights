import clsx from "clsx";

/** Wordmark: a folded-wallet tile whose flap doubles as a wing. */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 40 40" className="size-9 shrink-0" aria-hidden="true">
        <rect width="40" height="40" rx="11" className="fill-action" />
        <path d="M8 15.5c0-2.2 1.8-4 4-4h17.5L23 18H12a4 4 0 0 1-4-2.5Z" className="fill-sun" />
        <path
          d="M8 17.5c.9 1.5 2.4 2.5 4.2 2.5H32v8a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V17.5Z"
          className="fill-white"
        />
        <circle cx="27" cy="26" r="2.2" className="fill-action" />
      </svg>
      <span
        className={clsx(
          "font-display-tight text-[1.3rem] leading-none font-extrabold",
          tone === "dark" ? "text-ink" : "text-white",
        )}
      >
        Wallet<span className={tone === "dark" ? "text-action" : "text-sun"}>Flights</span>
      </span>
    </span>
  );
}
