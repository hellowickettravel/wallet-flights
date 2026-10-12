"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { SmartImage } from "@/components/ui/smart-image";
import type { Photo } from "@/content/images";

/** Full-bleed photo header whose image drifts slower than the page (one motion moment). */
export function ParallaxHero({ photo, children }: { photo: Photo; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.04, 1.12]);

  return (
    <div ref={ref} className="relative isolate overflow-hidden bg-ink">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <SmartImage photo={photo} sizes="100vw" priority />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(0deg,rgb(15_31_61/0.9)_0%,rgb(15_31_61/0.45)_45%,rgb(15_31_61/0.15)_100%)]"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
