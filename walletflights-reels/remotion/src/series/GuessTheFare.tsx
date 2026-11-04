import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, CoverHook, HookTitle, ReelShell, Tag } from "../parts/ReelFrame";
import { Countdown } from "../parts/Countdown";
import { PriceSlam } from "../parts/PriceSlam";
import { FareFootnote } from "../parts/FareFootnote";
import { C, FONT_BODY, FONT_DISPLAY } from "../lib/theme";
import { money, segEnd, segStart } from "../lib/format";
import type { GuessTheFareData, ReelProps } from "../lib/types";

const LETTERS = ["A", "B", "C"];

export const GuessTheFare: React.FC<ReelProps<GuessTheFareData>> = (props) => {
  const { data, segments, hook, tag, audience, cover } = props;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const optAt = segStart(segments, "options", fps, 2200);
  const cdFrom = segStart(segments, "countdown", fps, 4500);
  const revealAt = segStart(segments, "reveal", fps, 6500);
  const ctaAt = segStart(segments, "cta", fps, 8200);
  const optEnd = segEnd(segments, "options", fps, 4400);
  const { fare } = data;
  const per = Math.max(5, Math.floor((optEnd - optAt) / data.options.length));

  if (cover) {
    return (
      <ReelShell {...props}>
        <Backdrop broll={props.broll} plateWord={data.city.toUpperCase()} />
        <CoverHook text={hook} tag={tag} />
      </ReelShell>
    );
  }

  return (
    <ReelShell {...props} hideCaptions={[[optAt, 1e9]]}>
      <Backdrop broll={props.broll} plateWord={data.city.toUpperCase()} wanted={props.sampleNote ? props.brollWanted : undefined} />
      <Tag text={tag} />
      <HookTitle text={hook} until={revealAt - 4} />

      {/* Countdown, then the price slam in the same spot */}
      <AbsoluteFill style={{ alignItems: "center", top: 640, height: 320 }}>
        <Countdown from={cdFrom} to={revealAt} size={300} />
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", top: 470 }}>
        <PriceSlam at={revealAt} amount={fare.price} currency={fare.currency} label={fare.trip === "return" ? (audience === "US" ? "round trip" : "return") : "one way"} />
        {frame >= revealAt + 8 ? (
          <FareFootnote
            foundOn={fare.foundOn}
            audience={audience}
            extra={`${fare.from} to ${fare.to}`}
            style={{ marginTop: 22, opacity: interpolate(frame, [revealAt + 8, revealAt + 14], [0, 1], { extrapolateRight: "clamp" }) }}
          />
        ) : null}
      </AbsoluteFill>

      {/* Three options */}
      <div style={{ position: "absolute", left: 120, right: 200, top: 1000, display: "flex", flexDirection: "column", gap: 22 }}>
        {data.options.map((o, i) => {
          const at = optAt + i * per;
          if (frame < at) return <div key={o} style={{ height: 112 }} />;
          const s = spring({ frame: frame - at, fps, config: { damping: 14, stiffness: 160 } });
          const correct = o === fare.price;
          const revealed = frame >= revealAt;
          const bg = revealed ? (correct ? C.fareBright : "rgba(255,255,255,0.18)") : C.white;
          const fg = revealed ? (correct ? C.white : "rgba(255,255,255,0.55)") : C.ink;
          return (
            <div
              key={o}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 26,
                height: 112,
                padding: "0 30px",
                borderRadius: 26,
                backgroundColor: bg,
                transform: `translateX(${interpolate(s, [0, 1], [-700, 0])}px) scale(${revealed && correct ? interpolate(frame - revealAt, [0, 5, 10], [1, 1.07, 1.03], { extrapolateRight: "clamp" }) : 1})`,
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              }}
            >
              <div
                style={{
                  width: 66,
                  height: 66,
                  borderRadius: 18,
                  backgroundColor: revealed ? "rgba(255,255,255,0.22)" : C.ink,
                  color: revealed ? fg : C.sun,
                  fontFamily: FONT_BODY,
                  fontWeight: 800,
                  fontSize: 38,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {LETTERS[i]}
              </div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 800,
                  fontSize: 68,
                  color: fg,
                  textDecoration: revealed && !correct ? "line-through" : "none",
                  textDecorationThickness: 6,
                }}
              >
                {money(o, fare.currency)}
              </div>
              {revealed && correct ? (
                <div style={{ marginLeft: "auto", fontFamily: FONT_BODY, fontWeight: 800, fontSize: 34, color: C.white, letterSpacing: 2 }}>REAL FARE</div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* CTA */}
      {frame >= ctaAt ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 1400,
            display: "flex",
            justifyContent: "center",
            transform: `scale(${spring({ frame: frame - ctaAt, fps, config: { damping: 12 } })})`,
          }}
        >
          <div style={{ backgroundColor: C.sun, color: C.ink, borderRadius: 999, padding: "18px 40px", fontFamily: FONT_BODY, fontWeight: 800, fontSize: 44 }}>
            {props.cta}
          </div>
        </div>
      ) : null}
    </ReelShell>
  );
};
