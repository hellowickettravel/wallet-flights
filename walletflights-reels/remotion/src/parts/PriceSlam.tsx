import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT_DISPLAY, FONT_BODY } from "../lib/theme";
import { money } from "../lib/format";
import type { Currency } from "../lib/types";

/** Big price that slams in from oversized, with a shockwave ring. `at` = frame of impact. */
export const PriceSlam: React.FC<{
  at: number;
  amount: number;
  currency: Currency;
  label?: string;
  size?: number;
  color?: string;
}> = ({ at, amount, currency, label, size = 300, color = C.sun }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame - at;
  if (t < -6) return null;
  const s = spring({ frame: t + 6, fps, config: { damping: 11, mass: 0.7, stiffness: 180 } });
  const scale = interpolate(s, [0, 1], [2.6, 1]);
  const opacity = interpolate(t, [-6, -2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ring = interpolate(t, [0, 16], [0.6, 2.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringO = interpolate(t, [0, 16], [0.7, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shake = t >= 0 && t < 8 ? Math.sin(t * 2.4) * (8 - t) * 1.6 : 0;

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", transform: `translateX(${shake}px)` }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: size * 1.6,
          height: size * 1.6,
          marginLeft: -size * 0.8,
          marginTop: -size * 0.8 - (label ? 30 : 0),
          borderRadius: "50%",
          border: `10px solid ${color}`,
          transform: `scale(${ring})`,
          opacity: t >= 0 ? ringO : 0,
        }}
      />
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 800,
          fontSize: size,
          lineHeight: 1,
          color,
          letterSpacing: -size * 0.04,
          transform: `scale(${scale})`,
          opacity,
          textShadow: "0 10px 40px rgba(0,0,0,0.45)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {money(amount, currency)}
      </div>
      {label ? (
        <div
          style={{
            marginTop: 18,
            fontFamily: FONT_BODY,
            fontWeight: 800,
            fontSize: 44,
            letterSpacing: 4,
            color: C.white,
            textTransform: "uppercase",
            opacity: interpolate(t, [4, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
};
