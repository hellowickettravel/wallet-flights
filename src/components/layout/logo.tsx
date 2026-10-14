import clsx from "clsx";
import { LogoMarkSvg } from "./logo-mark";

/** Wordmark: the wallet-and-plane tile, then the name. */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <LogoMarkSvg className="size-9 shrink-0" />
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
