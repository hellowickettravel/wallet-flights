import React, { useMemo } from "react";
import { createTikTokStyleCaptions, type Caption } from "@remotion/captions";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT_BODY } from "../lib/theme";

/**
 * Word-by-word captions: short pages (≈3 words), the spoken word lit in sun yellow.
 * Sits above Instagram's caption area (bottom edge at y≈1500).
 */
export const KineticCaptions: React.FC<{
  captions: Caption[];
  bottom?: number;
  hideBetween?: [number, number][];
  combineMs?: number;
}> = ({ captions, bottom = 440, hideBetween = [], combineMs = 900 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  // Never let a page straddle two spoken segments: split wherever the voice pauses.
  const pages = useMemo(() => {
    const groups: Caption[][] = [];
    captions.forEach((c, i) => {
      if (i === 0 || c.startMs - captions[i - 1].endMs > 80) groups.push([]);
      groups[groups.length - 1].push(i === 0 || c.startMs - captions[i - 1].endMs > 80 ? { ...c, text: c.text.trimStart() } : c);
    });
    return groups.flatMap((g) => createTikTokStyleCaptions({ captions: g, combineTokensWithinMilliseconds: combineMs }).pages);
  }, [captions, combineMs]);
  if (hideBetween.some(([a, b]) => frame >= a && frame < b)) return null;
  const page = pages.find((p, i) => ms >= p.startMs && ms < (pages[i + 1]?.startMs ?? p.startMs + p.durationMs + 400));
  if (!page) return null;
  const pop = interpolate(ms - page.startMs, [0, 90], [0.88, 1], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 160,
        bottom,
        display: "flex",
        justifyContent: "center",
        transform: `scale(${pop})`,
      }}
    >
      <div
        style={{
          fontFamily: FONT_BODY,
          fontWeight: 800,
          fontSize: 66,
          lineHeight: 1.12,
          textAlign: "center",
          color: C.white,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          WebkitTextStroke: "14px rgba(9,21,48,0.95)",
          paintOrder: "stroke fill",
          whiteSpace: "pre-wrap",
        }}
      >
        {page.tokens.map((t) => {
          const active = ms >= t.fromMs && ms < t.toMs;
          return (
            <span key={t.fromMs} style={{ color: active ? C.sun : C.white }}>
              {t.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
