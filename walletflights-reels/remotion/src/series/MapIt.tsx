import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CoverHook, HookTitle, ReelShell, Tag } from "../parts/ReelFrame";
import { FlightArc } from "../parts/FlightArc";
import { FareFootnote } from "../parts/FareFootnote";
import { C, FONT_DISPLAY } from "../lib/theme";
import { money, segStart } from "../lib/format";
import type { MapItData, ReelProps } from "../lib/types";

export const MapIt: React.FC<ReelProps<MapItData>> = (props) => {
  const { data, segments, hook, tag, audience, cover } = props;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stops = data.stops.map((s, i) => ({
    name: s.name,
    lngLat: s.lngLat,
    at: cover ? -100 : segStart(segments, `stop-${i}`, fps, 2500 + i * 2500),
    label: money(s.fare.price, s.fare.currency),
    chip: s.chip ?? (s.fare.trip === "return" ? (audience === "US" ? "round trip" : "return") : "one way"),
  }));
  const endAt = segStart(segments, "end", fps, 12000);
  const firstChip = stops[0]?.at ?? 0;
  const foundOn = data.stops.map((s) => s.fare.foundOn).sort()[0];

  return (
    <ReelShell {...props} captionsBottom={430}>
      <FlightArc origin={data.origin} stops={stops} mapStyle={data.mapStyle} />
      {cover ? (
        <CoverHook text={hook} tag={tag} />
      ) : (
        <>
          <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(9,21,48,0.92) 0%, rgba(9,21,48,0) 36%)" }} />
          <Tag text={tag} />
          <HookTitle
            text={hook}
            size={88}
            until={endAt - 6}
            below={
              frame >= firstChip + 20 ? <FareFootnote foundOn={foundOn} audience={audience} extra="Cheapest fares" style={{ marginTop: 20, fontSize: 28 }} /> : null
            }
          />
          {frame >= endAt ? (
            <AbsoluteFill style={{ alignItems: "flex-start", padding: "330px 140px 0 80px" }}>
              <div
                style={{
                  transform: `scale(${spring({ frame: frame - endAt, fps, config: { damping: 12 } })})`,
                  transformOrigin: "left center",
                  backgroundColor: C.sun,
                  color: C.ink,
                  padding: "22px 44px",
                  borderRadius: 28,
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 800,
                  fontSize: 72,
                  boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
                }}
              >
                {data.endLine}
              </div>
            </AbsoluteFill>
          ) : null}
        </>
      )}
    </ReelShell>
  );
};
