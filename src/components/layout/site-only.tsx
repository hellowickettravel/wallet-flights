"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** The public site's chrome (header, footer, cookie banner…): left out of the admin dashboard. */
export function SiteOnly({ children }: { children: ReactNode }) {
  const path = usePathname();
  return path === "/admin" || path?.startsWith("/admin/") ? null : children;
}
