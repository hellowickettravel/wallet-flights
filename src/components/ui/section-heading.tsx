import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
  id?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
  children?: ReactNode; // right-aligned slot (links, filters)
};

export function SectionHeading({ id, title, intro, tone = "dark", className, children }: Props) {
  return (
    <div className={clsx("flex flex-col gap-5 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        <h2
          id={id}
          className={clsx(
            "font-display-tight text-[2rem] leading-[1.08] font-bold md:text-[2.75rem]",
            tone === "dark" ? "text-ink" : "text-white",
          )}
        >
          {title}
        </h2>
        {intro && (
          <p className={clsx("mt-3 text-[1.0625rem] leading-relaxed", tone === "dark" ? "text-ink-soft" : "text-white/75")}>
            {intro}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
