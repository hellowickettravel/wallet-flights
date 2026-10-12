"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimationFrame, useReducedMotion } from "motion/react";
import { AirplaneTilt } from "@phosphor-icons/react";

// The arc, as a cubic Bézier in the SVG's own coordinates, so the plane and the
// dotted line scale together at every screen width.
const P0 = [20, 95], P1 = [120, 5], P2 = [280, 5], P3 = [380, 95];
const ARC = `M${P0} C ${P1}, ${P2}, ${P3}`;

function point(t: number) {
  const u = 1 - t;
  const x = u ** 3 * P0[0] + 3 * u * u * t * P1[0] + 3 * u * t * t * P2[0] + t ** 3 * P3[0];
  const y = u ** 3 * P0[1] + 3 * u * u * t * P1[1] + 3 * u * t * t * P2[1] + t ** 3 * P3[1];
  const dx = 3 * u * u * (P1[0] - P0[0]) + 6 * u * t * (P2[0] - P1[0]) + 3 * t * t * (P3[0] - P2[0]);
  const dy = 3 * u * u * (P1[1] - P0[1]) + 6 * u * t * (P2[1] - P1[1]) + 3 * t * t * (P3[1] - P2[1]);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

const ease = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * The results page's one signature moment: a plane crosses a dotted arc between
 * the two airports while the provider count ticks up.
 */
export function Searching({ from, to, providers }: { from: string; to: string; providers: number }) {
  const reduce = useReducedMotion();
  const plane = useRef<SVGGElement>(null);
  const [checked, setChecked] = useState(1);

  useEffect(() => {
    const id = window.setInterval(() => setChecked((c) => Math.min(providers, c + 1)), 1000 / providers);
    return () => window.clearInterval(id);
  }, [providers]);

  // Position is written straight to the DOM each frame, never through React state.
  useAnimationFrame((time) => {
    if (!plane.current) return;
    const cycle = 1250;
    const { x, y, angle } = point(reduce ? 0.5 : ease((time % cycle) / cycle));
    plane.current.setAttribute("transform", `translate(${x} ${y}) rotate(${angle + 45})`);
  });

  return (
    <div role="status" aria-live="polite" className="overflow-hidden rounded-(--radius-panel) bg-white px-6 py-12 text-center ring-1 ring-line sm:py-16">
      <div className="relative mx-auto max-w-md">
        <svg viewBox="0 0 400 110" className="block h-auto w-full" aria-hidden>
          <path d={ARC} fill="none" stroke="var(--color-line)" strokeWidth="2.5" strokeDasharray="3 9" strokeLinecap="round" />
          <circle cx={P0[0]} cy={P0[1]} r="6" fill="var(--color-ink)" />
          <circle cx={P3[0]} cy={P3[1]} r="6" fill="var(--color-ink)" />
          <g ref={plane} transform="translate(200 27)" className="text-action">
            <AirplaneTilt weight="fill" x={-15} y={-15} width={30} height={30} />
          </g>
        </svg>
        <div className="mt-1 flex justify-between font-display-tight text-[1.25rem] font-bold text-ink">
          <span>{from}</span>
          <span>{to}</span>
        </div>
      </div>
      <p className="mt-6 font-display-tight text-[1.5rem] font-bold text-ink">Comparing prices</p>
      <p className="tabular mt-1 text-ink-soft">
        Checked {checked} of {providers} airlines and travel sites
      </p>
    </div>
  );
}
