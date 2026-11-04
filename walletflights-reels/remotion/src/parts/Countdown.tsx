import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT_DISPLAY } from "../lib/theme";

/** 3-2-1 countdown between `from` and `to` frames, each number with a draining ring. */
export const Countdown: React.FC<{ from: number; to: number; size?: number }> = ({ from, to, size = 360 }) => {
  const frame = useCurrentFrame();
  useVideoConfig();
  if (frame < from || frame >= to) return null;
  const per = (to - from) / 3;
  const i = Math.min(2, Math.floor((frame - from) / per));
  const local = frame - from - i * per;
  const p = local / per;
  const n = 3 - i;
  const scale = interpolate(local, [0, 5, per], [1.5, 1, 0.92], { extrapolateRight: "clamp" });
  const r = size / 2 - 14;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill={C.ink} fillOpacity={0.82} stroke="rgba(255,255,255,0.18)" strokeWidth={14} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={C.sun}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * p}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_DISPLAY,
          fontWeight: 800,
          fontSize: size * 0.58,
          color: C.white,
          transform: `scale(${scale})`,
        }}
      >
        {n}
      </div>
    </div>
  );
};
