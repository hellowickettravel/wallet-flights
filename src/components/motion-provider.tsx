"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

const loadFeatures = () => import("./motion-features").then((m) => m.default);

/**
 * Components use the lightweight `m.*` elements; the features they need load
 * asynchronously. `strict` makes any full `motion.*` import an error, so the
 * whole library can't creep back into the shared bundle.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
