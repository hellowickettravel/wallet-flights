import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, CoverHook, HookTitle, ReelShell, Tag } from "../parts/ReelFrame";
import { FareFootnote } from "../parts/FareFootnote";
import { C, FONT_BODY, FONT_DISPLAY } from "../lib/theme";
import { money, segStart } from "../lib/format";
import type { CheaperThanData, ReelProps } from "../lib/types";

const Card: React.FC<{ label: string; value: string; at: number; color: string; note?: string; win?: boolean }> = ({ label, value, at, color, note, win }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 13, stiffness: 150 } });
  return (
    <div
      style={{
        flex: 1,
        borderRadius: 32,
        padding: "36px 28px",
        backgroundColor: win ? C.white : "rgba(255,255,255,0.12)",
        border: win ? `6px solid ${C.sun}` : "6px solid transparent",
        transform: `translateY(${interpolate(s, [0, 1], [500, 0])}px)`,
        opacity: s,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        minHeight: 420,
      }}
    >
      <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 34, color: win ? C.ink : C.white, lineHeight: 1.15 }}>{label}</div>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 120, lineHeight: 1, color }}>{value}</div>
      {note ? <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 26, color: win ? "rgba(15,31,61,0.7)" : C.muted }}>{note}</div> : null}
    </div>
  );
};

export const CheaperThan: React.FC<ReelProps<CheaperThanData>> = (props) => {
  const { data, segments, hook, tag, audience, cover, cta } = props;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const leftAt = segStart(segments, "left", fps, 1800);
  const rightAt = segStart(segments, "right", fps, 3600);
  const verdictAt = segStart(segments, "verdict", fps, 6000);
  const ctaAt = segStart(segments, "cta", fps, 8500);

  if (cover)
    return (
      <ReelShell {...props}>
        <Backdrop broll={props.broll} />
        <CoverHook text={hook} tag={tag} />
      </ReelShell>
    );

  const leftWins = data.right.price === null || data.left.price <= data.right.price;
  return (
    <ReelShell {...props}>
      <Backdrop broll={props.broll} dim={0.55} wanted={props.sampleNote ? props.brollWanted : undefined} />
      <Tag text={tag} />
      <HookTitle text={hook} size={84} />
      <div style={{ position: "absolute", left: 80, right: 140, top: 760, display: "flex", gap: 26 }}>
        <Card label={data.left.label} value={money(data.left.price, data.left.currency)} at={leftAt} color={leftWins ? C.fare : C.white} win={leftWins} />
        <Card
          label={data.right.label}
          value={data.right.price === null ? `${data.right.currency === "GBP" ? "£" : "$"}__` : money(data.right.price, data.right.currency)}
          at={rightAt}
          color={leftWins ? C.white : C.fare}
          note={data.right.note}
          win={!leftWins}
        />
      </div>
      {frame >= leftAt + 10 && data.left.foundOn ? (
        <FareFootnote foundOn={data.left.foundOn} audience={audience} style={{ position: "absolute", left: 80, top: 1215 }} />
      ) : null}
      {frame >= verdictAt ? (
        <AbsoluteFill style={{ alignItems: "center", top: 1260, height: 200, left: 80, right: 140, width: "auto" }}>
          <div
            style={{
              transform: `scale(${spring({ frame: frame - verdictAt, fps, config: { damping: 11 } })}) rotate(-2deg)`,
              backgroundColor: C.sun,
              color: C.ink,
              padding: "16px 36px",
              borderRadius: 20,
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: (frame >= ctaAt ? cta : data.verdict).length > 22 ? 46 : 62,
              textAlign: "center",
              maxWidth: 820,
            }}
          >
            {frame >= ctaAt ? cta : data.verdict}
          </div>
        </AbsoluteFill>
      ) : null}
    </ReelShell>
  );
};
