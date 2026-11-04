import React from "react";
import {
  AbsoluteFill,
  Html5Audio,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT_BODY, FONT_DISPLAY } from "../lib/theme";
import { loadFonts } from "../lib/fonts";
import type { BaseReelProps, Broll } from "../lib/types";
import { KineticCaptions } from "./KineticCaptions";

loadFonts();

const src = (s: string) => (s.startsWith("http") ? s : staticFile(s));

/** B-roll clips back to back, or a branded plate when none has been fetched yet. */
export const Backdrop: React.FC<{ broll: Broll[]; plateWord?: string; dim?: number; wanted?: string[] }> = ({
  broll,
  plateWord,
  dim = 0.35,
  wanted,
}) => {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  if (!broll.length) return <Plate word={plateWord} wanted={wanted} />;
  const per = Math.ceil(durationInFrames / broll.length);
  return (
    <AbsoluteFill style={{ backgroundColor: C.inkDeep }}>
      {broll.map((b, i) => (
        <Sequence key={b.src} from={i * per} durationInFrames={per}>
          {b.kind === "video" ? (
            <OffthreadVideo src={src(b.src)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <Img
              src={src(b.src)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${interpolate(frame - i * per, [0, per], [1.04, 1.14])})`,
              }}
            />
          )}
        </Sequence>
      ))}
      <AbsoluteFill style={{ backgroundColor: `rgba(9,21,48,${dim})` }} />
      {/* Legibility scrims behind the hook and the captions */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(9,21,48,0.85) 0%, rgba(9,21,48,0) 34%, rgba(9,21,48,0) 60%, rgba(9,21,48,0.8) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

/** Branded stand-in used only until b-roll exists: ink ground, slow-drifting outlined word, grid. */
export const Plate: React.FC<{ word?: string; wanted?: string[] }> = ({ word, wanted }) => {
  const frame = useCurrentFrame();
  const drift = frame * 0.9;
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, overflow: "hidden" }}>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: 0.16 }}>
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 90} y1={0} x2={i * 90} y2={1920} stroke={C.white} strokeWidth={1} />
        ))}
        {Array.from({ length: 22 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 90 + (drift % 90)} x2={1080} y2={i * 90 + (drift % 90)} stroke={C.white} strokeWidth={1} />
        ))}
      </svg>
      {word ? (
        <div
          style={{
            position: "absolute",
            top: 820,
            left: -drift,
            whiteSpace: "nowrap",
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 420,
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: `4px rgba(255,200,61,0.38)`,
            letterSpacing: -12,
          }}
        >
          {`${word} ${word} ${word}`}
        </div>
      ) : null}
      {wanted?.length ? (
        <div
          style={{
            position: "absolute",
            right: 40,
            top: 150,
            padding: "8px 14px",
            borderRadius: 10,
            border: "2px dashed rgba(255,255,255,0.5)",
            fontFamily: FONT_BODY,
            fontWeight: 600,
            fontSize: 22,
            color: "rgba(255,255,255,0.75)",
          }}
        >
          B-ROLL PENDING: {wanted.join(" · ")}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

/** Series tag chip, top-left. Same place on every reel so the series reads in one frame. */
export const Tag: React.FC<{ text: string; color?: string; textColor?: string }> = ({ text, color = C.sun, textColor = C.ink }) => (
  <div
    style={{
      position: "absolute",
      left: 80,
      top: 220,
      padding: "12px 22px",
      borderRadius: 999,
      backgroundColor: color,
      color: textColor,
      fontFamily: FONT_BODY,
      fontWeight: 800,
      fontSize: 32,
      letterSpacing: 3,
    }}
  >
    {text}
  </div>
);

/**
 * Hook text: fully visible on frame 0 (no fade). A sun bar under it starts growing on frame 0 so
 * there is motion in the first half-second. Leaves at `until` (frame) if given.
 */
export const HookTitle: React.FC<{
  text: string;
  until?: number;
  top?: number;
  size?: number;
  cover?: boolean;
  below?: React.ReactNode;
}> = ({ text, until, top = 310, size = 92, cover, below }) => {
  const frame = useCurrentFrame();
  const out = until === undefined ? 0 : interpolate(frame, [until, until + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (out >= 1) return null;
  const bar = cover ? 1 : interpolate(frame, [0, 14], [0.15, 1], { extrapolateRight: "clamp" });
  const nudge = cover ? 0 : interpolate(frame, [0, 14], [10, 0], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 140,
        top,
        transform: `translateY(${nudge - out * 40}px)`,
        opacity: 1 - out,
      }}
    >
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 800,
          fontSize: size,
          lineHeight: 1.02,
          letterSpacing: -size * 0.025,
          color: C.white,
          textShadow: "0 6px 30px rgba(0,0,0,0.55)",
          textWrap: "balance",
        }}
      >
        {text}
      </div>
      <div style={{ marginTop: 26, height: 14, width: 260 * bar, backgroundColor: C.sun, borderRadius: 7 }} />
      {below}
    </div>
  );
};

/** Big centred hook for the cover still: the grid reads as a menu of questions. */
export const CoverHook: React.FC<{ text: string; tag: string }> = ({ text, tag }) => (
  <AbsoluteFill style={{ justifyContent: "center", padding: "0 90px", backgroundColor: "rgba(9,21,48,0.45)" }}>
    <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 40, letterSpacing: 4, color: C.sun, marginBottom: 30 }}>{tag}</div>
    <div
      style={{
        fontFamily: FONT_DISPLAY,
        fontWeight: 800,
        fontSize: 124,
        lineHeight: 1,
        letterSpacing: -3,
        color: C.white,
        textShadow: "0 8px 40px rgba(0,0,0,0.6)",
        textWrap: "balance",
      }}
    >
      {text}
    </div>
  </AbsoluteFill>
);

/** Shared shell: voice track, kinetic captions, sample label. Series put their layers in `children`. */
export const ReelShell: React.FC<
  BaseReelProps & { children: React.ReactNode; captionsBottom?: number; hideCaptions?: [number, number][] }
> = ({ audioSrc, captions, children, cover, sampleNote, captionsBottom, hideCaptions }) => (
  <AbsoluteFill style={{ backgroundColor: C.ink }}>
    {children}
    {audioSrc && !cover ? <Html5Audio src={src(audioSrc)} /> : null}
    {!cover ? <KineticCaptions captions={captions} bottom={captionsBottom} hideBetween={hideCaptions} /> : null}
    {sampleNote ? (
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 24,
          textAlign: "center",
          fontFamily: FONT_BODY,
          fontWeight: 700,
          fontSize: 22,
          color: C.ink,
        }}
      >
        <span style={{ backgroundColor: C.sun, padding: "6px 14px", borderRadius: 8 }}>{sampleNote}</span>
      </div>
    ) : null}
  </AbsoluteFill>
);
