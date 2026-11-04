import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, CoverHook, HookTitle, ReelShell, Tag } from "../parts/ReelFrame";
import { C, FONT_BODY, FONT_DISPLAY } from "../lib/theme";
import { segStart } from "../lib/format";
import type { HotTakeData, ReelProps } from "../lib/types";

const Side: React.FC<{ letter: string; text: string; at: number; from: number; bg: string; fg: string }> = ({ letter, text, at, from, bg, fg }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 13, stiffness: 160 } });
  const breathe = 1 + Math.sin((frame - at) / 9) * 0.012;
  return (
    <div
      style={{
        flex: 1,
        height: 560,
        borderRadius: 36,
        backgroundColor: bg,
        color: fg,
        transform: `translateX(${interpolate(s, [0, 1], [from, 0])}px) scale(${breathe})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: 20,
        boxShadow: "0 18px 40px rgba(0,0,0,0.4)",
      }}
    >
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 220, lineHeight: 0.9 }}>{letter}</div>
      <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: text.length > 10 ? 40 : 56, letterSpacing: 2, textAlign: "center", lineHeight: 1.1 }}>{text}</div>
    </div>
  );
};

export const HotTake: React.FC<ReelProps<HotTakeData>> = (props) => {
  const { data, segments, hook, tag, cover, cta } = props;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (cover)
    return (
      <ReelShell {...props}>
        <Backdrop broll={props.broll} />
        <CoverHook text={hook} tag={tag} />
      </ReelShell>
    );
  const sidesAt = segStart(segments, "sides", fps, 1500);
  const ctaAt = segStart(segments, "cta", fps, 4500);
  return (
    <ReelShell {...props} hideCaptions={[[sidesAt, 99999]]}>
      <Backdrop broll={props.broll} dim={0.5} wanted={props.sampleNote ? props.brollWanted : undefined} />
      <Tag text={tag} color={C.dear} textColor={C.white} />
      <HookTitle text={hook} size={90} />
      <div style={{ position: "absolute", left: 80, right: 140, top: 760, display: "flex", gap: 24 }}>
        <Side letter="A" text={data.a} at={sidesAt} from={-700} bg={C.sun} fg={C.ink} />
        <Side letter="B" text={data.b} at={sidesAt + 6} from={700} bg={C.white} fg={C.ink} />
      </div>
      {frame >= ctaAt ? (
        <div style={{ position: "absolute", left: 0, right: 60, top: 1380, textAlign: "center", transform: `scale(${spring({ frame: frame - ctaAt, fps, config: { damping: 12 } })})` }}>
          <span style={{ backgroundColor: C.ink, color: C.white, border: `4px solid ${C.sun}`, fontFamily: FONT_BODY, fontWeight: 800, fontSize: 48, padding: "16px 36px", borderRadius: 999 }}>
            {cta}
          </span>
        </div>
      ) : null}
    </ReelShell>
  );
};
