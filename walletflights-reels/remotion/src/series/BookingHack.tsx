import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, CoverHook, HookTitle, ReelShell, Tag } from "../parts/ReelFrame";
import { C, FONT_BODY, FONT_DISPLAY } from "../lib/theme";
import { segStart } from "../lib/format";
import type { BookingHackData, HackBeat, ReelProps } from "../lib/types";

const LABEL_COLOURS: Record<string, string> = { MYTH: C.dear, TRUTH: C.fareBright, HOW: C.sun };

const BeatCard: React.FC<{ beat: HackBeat; at: number; until: number }> = ({ beat, at, until }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < at || frame >= until) return null;
  const s = spring({ frame: frame - at, fps, config: { damping: 14, stiffness: 170 } });
  const colour = LABEL_COLOURS[beat.label] ?? C.sun;
  return (
    <div style={{ position: "absolute", left: 80, right: 140, top: 660, transform: `translateX(${interpolate(s, [0, 1], [120, 0])}px)`, opacity: s }}>
      <div
        style={{
          display: "inline-block",
          padding: "10px 22px",
          borderRadius: 14,
          backgroundColor: colour,
          color: beat.label === "HOW" ? C.ink : C.white,
          fontFamily: FONT_BODY,
          fontWeight: 800,
          fontSize: 40,
          letterSpacing: 4,
        }}
      >
        {beat.label}
      </div>
      <div style={{ marginTop: 26, fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 86, lineHeight: 1.03, color: C.white, letterSpacing: -2, textWrap: "balance" }}>
        {beat.title}
      </div>
      {beat.body ? <div style={{ marginTop: 22, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 40, lineHeight: 1.3, color: C.muted }}>{beat.body}</div> : null}
    </div>
  );
};

const DOW = ["M", "T", "W", "T", "F", "S", "S"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const parse = (iso: string) => new Date(`${iso}T12:00:00Z`);
const iso = (d: Date) => d.toISOString().slice(0, 10);

/** Week-row calendar from the Monday before `offFrom` to the Sunday after `offTo`; leave and holidays light up. */
const LeaveCalendar: React.FC<{ data: Extract<BookingHackData, { variant: "leaveCalendar" }>; at: number; allAt: number }> = ({ data, at, allAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = parse(data.offFrom);
  start.setUTCDate(start.getUTCDate() - ((start.getUTCDay() + 6) % 7));
  const end = parse(data.offTo);
  end.setUTCDate(end.getUTCDate() + ((7 - end.getUTCDay()) % 7));
  const days: Date[] = [];
  for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) days.push(new Date(d));
  const book = new Set(data.book);
  const hols = new Set(data.bankHolidays);
  const cell = 118;
  let leaveIdx = 0;
  return (
    <div style={{ position: "absolute", left: 80, top: 650, width: 7 * cell + 6 * 10 }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(7, ${cell}px)`, gap: 10 }}>
        {DOW.map((d, i) => (
          <div key={i} style={{ textAlign: "center", fontFamily: FONT_BODY, fontWeight: 800, fontSize: 30, color: i >= 5 ? C.sun : C.muted }}>
            {d}
          </div>
        ))}
        {days.map((d) => {
          const k = iso(d);
          const inRange = k >= data.offFrom && k <= data.offTo;
          const weekend = d.getUTCDay() === 0 || d.getUTCDay() === 6;
          const isLeave = book.has(k);
          const isHol = hols.has(k);
          const myAt = isLeave ? at + leaveIdx++ * 5 : at;
          const lit = isLeave ? frame >= myAt : frame >= at && (isHol || (inRange && weekend));
          const all = inRange && frame >= allAt;
          const pop = isLeave ? spring({ frame: frame - myAt, fps, config: { damping: 10 } }) : 1;
          let bg = "rgba(255,255,255,0.08)";
          let fg = "rgba(255,255,255,0.45)";
          if (lit && isLeave) [bg, fg] = [C.sun, C.ink];
          else if (lit && isHol) [bg, fg] = [C.fareBright, C.white];
          else if (lit) [bg, fg] = ["rgba(255,255,255,0.28)", C.white];
          return (
            <div
              key={k}
              style={{
                height: cell,
                borderRadius: 20,
                backgroundColor: bg,
                color: fg,
                outline: all ? `5px solid ${C.white}` : "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${lit && isLeave ? interpolate(pop, [0, 1], [0.6, 1]) : 1})`,
              }}
            >
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 48, lineHeight: 1 }}>{d.getUTCDate()}</div>
              {d.getUTCDate() === 1 || k === iso(start) ? (
                <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 22 }}>{MONTHS[d.getUTCMonth()]}</div>
              ) : null}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 28, marginTop: 26, fontFamily: FONT_BODY, fontWeight: 700, fontSize: 30, color: C.white }}>
        <span><span style={{ color: C.sun }}>■</span> leave ({data.leaveCount})</span>
        <span><span style={{ color: C.fareBright }}>■</span> bank holiday</span>
        <span><span style={{ color: "rgba(255,255,255,0.6)" }}>■</span> weekend</span>
      </div>
      {frame >= allAt ? (
        <div
          style={{
            marginTop: 34,
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 110,
            color: C.sun,
            transform: `scale(${spring({ frame: frame - allAt, fps, config: { damping: 11 } })})`,
            transformOrigin: "left center",
          }}
        >
          {data.daysOff} DAYS OFF
        </div>
      ) : null}
    </div>
  );
};

export const BookingHack: React.FC<ReelProps<BookingHackData>> = (props) => {
  const { data, segments, hook, tag, cover } = props;
  const { fps, durationInFrames } = useVideoConfig();
  if (cover)
    return (
      <ReelShell {...props}>
        <Backdrop broll={props.broll} />
        <CoverHook text={hook} tag={tag} />
      </ReelShell>
    );
  const starts = data.beats.map((b) => segStart(segments, b.segmentId, fps, 0));
  return (
    <ReelShell {...props}>
      <Backdrop broll={props.broll} dim={0.6} wanted={props.sampleNote ? props.brollWanted : undefined} />
      <AbsoluteFill style={{ backgroundColor: props.broll.length ? "transparent" : C.ink }} />
      <Tag text={tag} />
      <HookTitle text={hook} size={84} />
      {data.variant === "leaveCalendar" ? (
        <LeaveCalendar data={data} at={segStart(segments, "book", fps, 3000)} allAt={segStart(segments, "result", fps, 9000)} />
      ) : (
        data.beats.map((b, i) => <BeatCard key={b.segmentId} beat={b} at={starts[i]} until={starts[i + 1] ?? durationInFrames} />)
      )}
    </ReelShell>
  );
};
