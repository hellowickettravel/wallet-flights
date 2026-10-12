import Link from "next/link";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost-light" | "sun";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-200 ease-(--ease-out-quint) active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-action text-white hover:bg-action-deep",
  secondary: "bg-white text-ink ring-1 ring-line hover:ring-ink/30 hover:bg-mist",
  "ghost-light": "bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/20",
  sun: "bg-sun text-ink hover:bg-[#ffd666]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return clsx(base, variants[variant], sizes[size], className);
}

type LinkProps = { href: string; variant?: Variant; size?: Size; className?: string; children: ReactNode } & Omit<
  ComponentProps<typeof Link>,
  "href" | "className"
>;

export function ButtonLink({ href, variant, size, className, children, ...rest }: LinkProps) {
  const external = href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http");
  if (external) {
    return (
      <a href={href} className={buttonClass(variant, size, className)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}
