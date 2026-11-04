import React from "react";
import { AbsoluteFill, Freeze, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, ReelShell } from "../parts/ReelFrame";
import { C, FONT_BODY, FONT_DISPLAY } from "../lib/theme";
import type { PovData, ReelProps } from "../lib/types";

/** Meme format: the POV line is the hook and stays up the whole reel; last ~0.7 s freezes. */
export const Pov: React.FC<ReelProps<PovData>> = (props) => {
  const { data, cover, cta } = props;
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const freezeAt = durationInFrames - 22;
  const frozen = !cover && frame >= freezeAt;
  const line = data.line.replace(/^POV:\s*/i, "");
  const bg = <Backdrop broll={props.broll} dim={0.2} wanted={props.sampleNote ? props.brollWanted : undefined} />;
  return (
    <ReelShell {...props} captions={[]}>
      {frozen ? <Freeze frame={freezeAt}>{bg}</Freeze> : bg}
      {frozen ? <AbsoluteFill style={{ backgroundColor: C.white, opacity: interpolate(frame, [freezeAt, freezeAt + 4], [0.7, 0], { extrapolateRight: "clamp" }) }} /> : null}
      <div style={{ position: "absolute", left: 80, right: 140, top: 300, transform: `rotate(${cover ? 0 : interpolate(frame, [0, 12], [-1.5, 0], { extrapolateRight: "clamp" })}deg)` }}>
        <span style={{ backgroundColor: C.white, color: C.ink, fontFamily: FONT_BODY, fontWeight: 800, fontSize: 52, padding: "6px 16px", borderRadius: 10 }}>POV:</span>
        <div
          style={{
            marginTop: 22,
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: cover ? 110 : 88,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: C.white,
            WebkitTextStroke: "12px rgba(9,21,48,0.9)",
            paintOrder: "stroke fill",
            textWrap: "balance",
          }}
        >
          {line}
        </div>
      </div>
      {frozen ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 1360, textAlign: "center" }}>
          <span style={{ backgroundColor: C.sun, color: C.ink, fontFamily: FONT_BODY, fontWeight: 800, fontSize: 44, padding: "16px 34px", borderRadius: 999 }}>{cta}</span>
        </div>
      ) : null}
    </ReelShell>
  );
};
