import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, CoverHook, HookTitle, ReelShell, Tag } from "../parts/ReelFrame";
import { FareFootnote } from "../parts/FareFootnote";
import { C, FONT_BODY, FONT_DISPLAY } from "../lib/theme";
import { money, segStart } from "../lib/format";
import type { ReelProps, WeekendReceiptData } from "../lib/types";

/** Till-roll receipt: each line prints when the voice reaches it, then TOTAL stamps. */
export const WeekendReceipt: React.FC<ReelProps<WeekendReceiptData>> = (props) => {
  const { data, segments, hook, tag, audience, cover } = props;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (cover)
    return (
      <ReelShell {...props}>
        <Backdrop broll={props.broll} />
        <CoverHook text={hook} tag={tag} />
      </ReelShell>
    );
  const starts = data.lines.map((l) => segStart(segments, l.segmentId, fps, 0));
  const totalAt = segStart(segments, "total", fps, 20000);
  const printed = starts.filter((s) => frame >= s).length;
  const known = data.lines.every((l) => l.amount !== null);
  const total = data.lines.reduce((t, l) => t + (l.amount ?? 0), 0);
  const ROW = 92;
  const paperH = 150 + printed * ROW + (frame >= totalAt ? 190 : 0);
  const feed = interpolate(frame - (starts[printed - 1] ?? 0), [0, 8], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <ReelShell {...props} captionsBottom={430}>
      <Backdrop broll={props.broll} dim={0.6} wanted={props.sampleNote ? props.brollWanted : undefined} />
      <Tag text={tag} />
      <HookTitle text={hook} size={78} />
      <div
        style={{
          position: "absolute",
          left: 150,
          right: 210,
          top: 640,
          height: paperH,
          overflow: "hidden",
          backgroundColor: C.paper,
          borderRadius: "6px 6px 0 0",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
          padding: "34px 40px",
          transformOrigin: "top center",
          transform: `scaleY(${printed ? 1 : 0.98})`,
          WebkitMaskImage:
            "linear-gradient(135deg, transparent 10px, #000 0) bottom left / 20px 20px repeat-x, linear-gradient(#000, #000) top / 100% calc(100% - 10px) no-repeat",
        }}
      >
        <div style={{ textAlign: "center", fontFamily: FONT_BODY, fontWeight: 800, fontSize: 34, letterSpacing: 4, color: C.ink }}>{data.title}</div>
        <div style={{ borderTop: `3px dashed rgba(15,31,61,0.4)`, margin: "20px 0 10px" }} />
        {data.lines.slice(0, printed).map((l, i) => (
          <div
            key={l.segmentId}
            style={{
              height: ROW,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: FONT_BODY,
              fontWeight: 700,
              fontSize: 36,
              color: C.ink,
              opacity: i === printed - 1 ? feed : 1,
            }}
          >
            <span style={{ maxWidth: 440, lineHeight: 1.1 }}>
              {l.label}
              {l.note ? <span style={{ display: "block", fontSize: 22, fontWeight: 600, opacity: 0.6 }}>{l.note}</span> : null}
            </span>
            <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 800 }}>{l.amount === null ? "TBC" : money(l.amount, data.currency)}</span>
          </div>
        ))}
        {frame >= totalAt ? (
          <>
            <div style={{ borderTop: `3px dashed rgba(15,31,61,0.4)`, margin: "10px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 72, color: C.ink }}>
              <span>TOTAL</span>
              <span>{known ? money(total, data.currency) : "TBC"}</span>
            </div>
            <FareFootnote foundOn={data.foundOn} audience={audience} dark style={{ fontSize: 22 }} extra="per person" />
          </>
        ) : null}
      </div>
      {frame >= totalAt + 6 ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 60,
            margin: "0 auto",
            width: "fit-content",
            top: 640 + paperH + 34,
            transform: `rotate(-6deg) scale(${interpolate(spring({ frame: frame - totalAt - 6, fps, config: { damping: 9 } }), [0, 1], [2.2, 1])})`,
            border: `8px solid ${C.dear}`,
            color: C.dear,
            borderRadius: 18,
            padding: "6px 22px",
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 64,
            letterSpacing: 2,
            opacity: 0.9,
          }}
        >
          REAL TOTAL
        </div>
      ) : null}
    </ReelShell>
  );
};
