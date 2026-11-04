import React from "react";
import { Composition, type CalculateMetadataFunction } from "remotion";
import { FPS, H, W } from "./lib/theme";
import type { BaseReelProps } from "./lib/types";
import { GuessTheFare } from "./series/GuessTheFare";
import { CheaperThan } from "./series/CheaperThan";
import { MapIt } from "./series/MapIt";
import { BookingHack } from "./series/BookingHack";
import { PlaneSecret } from "./series/PlaneSecret";
import { Pov } from "./series/Pov";
import { HotTake } from "./series/HotTake";
import { WeekendReceipt } from "./series/WeekendReceipt";
import { fixtures } from "./fixtures";

/** Seconds held after the last word so the payoff/CTA can land (and loops feel clean). */
const TAIL: Record<string, number> = {
  GuessTheFare: 1.2,
  CheaperThan: 1.2,
  MapIt: 2.4,
  BookingHack: 1.4,
  PlaneSecret: 1.2,
  Pov: 0.9,
  HotTake: 2.0,
  WeekendReceipt: 1.8,
};

const meta =
  (id: string): CalculateMetadataFunction<Record<string, unknown>> =>
  ({ props }) => {
    const p = props as unknown as BaseReelProps;
    return { durationInFrames: p.cover ? 1 : Math.max(FPS * 5, Math.ceil((p.durationMs / 1000 + TAIL[id]) * FPS)) };
  };

// Components are typed per series; Remotion's Composition generic wants a loose record here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const series: [string, React.FC<any>][] = [
  ["GuessTheFare", GuessTheFare],
  ["CheaperThan", CheaperThan],
  ["MapIt", MapIt],
  ["BookingHack", BookingHack],
  ["PlaneSecret", PlaneSecret],
  ["Pov", Pov],
  ["HotTake", HotTake],
  ["WeekendReceipt", WeekendReceipt],
];

export const RemotionRoot: React.FC = () => (
  <>
    {series.map(([id, component]) => (
      <Composition
        key={id}
        id={id}
        component={component}
        width={W}
        height={H}
        fps={FPS}
        durationInFrames={300}
        defaultProps={fixtures[id] as unknown as Record<string, unknown>}
        calculateMetadata={meta(id)}
      />
    ))}
  </>
);
