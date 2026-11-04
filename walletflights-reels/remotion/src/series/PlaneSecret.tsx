import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, CoverHook, HookTitle, ReelShell, Tag } from "../parts/ReelFrame";
import { C, FONT_BODY, FONT_DISPLAY } from "../lib/theme";
import { segStart } from "../lib/format";
import type { PlaneSecretData, ReelProps } from "../lib/types";

export const PlaneSecret: React.FC<ReelProps<PlaneSecretData>> = (props) => {
  const { data, segments, hook, tag, cover } = props;
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  if (cover)
    return (
      <ReelShell {...props}>
        <Backdrop broll={props.broll} />
        <CoverHook text={hook} tag={tag} />
      </ReelShell>
    );
  const starts = data.facts.map((f) => segStart(segments, f.segmentId, fps, 0));
  const firstFact = starts[0] ?? durationInFrames;
  return (
    <ReelShell {...props}>
      <Backdrop broll={props.broll} dim={0.4} wanted={props.sampleNote ? props.brollWanted : undefined} />
      <Tag text={tag} color={C.white} />
      <HookTitle text={hook} until={firstFact - 2} />
      {data.facts.map((f, i) => {
        const at = starts[i];
        const until = starts[i + 1] ?? durationInFrames;
        if (frame < at || frame >= until) return null;
        const s = spring({ frame: frame - at, fps, config: { damping: 14 } });
        return (
          <div
            key={f.segmentId}
            style={{
              position: "absolute",
              left: 80,
              right: 140,
              top: 330,
              transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px)`,
              opacity: s,
            }}
          >
            <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 36, color: C.sun, letterSpacing: 3 }}>
              {i + 1}/{data.facts.length}
            </div>
            <div
              style={{
                marginTop: 14,
                fontFamily: FONT_DISPLAY,
                fontWeight: 800,
                fontSize: 84,
                lineHeight: 1.04,
                letterSpacing: -2,
                color: C.white,
                textShadow: "0 6px 30px rgba(0,0,0,0.6)",
                textWrap: "balance",
              }}
            >
              {f.title}
            </div>
            {f.body ? (
              <div style={{ marginTop: 20, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 40, lineHeight: 1.3, color: C.white, textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}>
                {f.body}
              </div>
            ) : null}
          </div>
        );
      })}
    </ReelShell>
  );
};
