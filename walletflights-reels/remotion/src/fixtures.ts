// Studio preview props only (no audio). Real renders get props from pipeline/render.ts.
// Prices here are the plan's 4 Nov snapshot, labelled as such — never a deliverable.
import type { BaseReelProps, Fare, Segment } from "./lib/types";

const seg = (list: [string, number, number, string?][]): Segment[] =>
  list.map(([id, s, e, text]) => ({ id, startMs: s, endMs: e, text: text ?? id }));

const base = (over: Partial<BaseReelProps>): BaseReelProps => ({
  day: 0,
  audience: "UK",
  hook: "",
  tag: "",
  cta: "",
  audioSrc: null,
  durationMs: 9000,
  segments: [],
  captions: [],
  broll: [],
  sampleNote: "STUDIO FIXTURE · snapshot fares",
  ...over,
});

const fare = (from: string, to: string, price: number, currency: "GBP" | "USD" = "GBP"): Fare => ({
  from,
  to,
  price,
  currency,
  trip: "return",
  foundOn: "2026-11-04",
  status: "snapshot",
});

export const fixtures: Record<string, BaseReelProps & { data: unknown }> = {
  GuessTheFare: {
    ...base({
      hook: "Guess what London to Rome cost this week",
      tag: "GUESS THE FARE",
      cta: "Comment your guess",
      segments: seg([["hook", 0, 2200], ["options", 2300, 4600], ["countdown", 4700, 6400], ["reveal", 6500, 7800], ["cta", 8000, 9000]]),
    }),
    data: { fare: fare("London", "Rome", 39), options: [39, 129, 249], city: "Rome" },
  },
  CheaperThan: {
    ...base({
      hook: "Flying to Lisbon vs taking the train to Manchester",
      tag: "CHEAPER THAN",
      cta: "Send to someone who still takes the train",
      segments: seg([["left", 1800, 3500], ["right", 3600, 5800], ["verdict", 6000, 8000], ["cta", 8200, 9500]]),
    }),
    data: {
      left: { label: "London to Lisbon flight, return", price: 49, currency: "GBP", foundOn: "2026-11-04" },
      right: { label: "Peak London to Manchester train", price: null, currency: "GBP", note: "live fare on render day" },
      verdict: "Make it make sense",
    },
  },
  MapIt: {
    ...base({
      hook: "How far £50 gets you from London this winter",
      tag: "MAP IT",
      cta: "Where would you go?",
      durationMs: 14000,
      segments: seg([["hook", 0, 2800], ["stop-0", 3000, 5500], ["stop-1", 5800, 8200], ["end", 9000, 12000]]),
    }),
    data: {
      origin: { name: "London", lngLat: [-0.1276, 51.5072] },
      budgetLabel: "£50",
      stops: [
        { name: "Rome", lngLat: [12.4964, 41.9028], fare: fare("London", "Rome", 39) },
        { name: "Lisbon", lngLat: [-9.1393, 38.7223], fare: fare("London", "Lisbon", 49) },
      ],
      endLine: "Where would you go?",
      mapStyle: "offline",
    },
  },
  BookingHack: {
    ...base({
      hook: "Stop booking return tickets by default",
      tag: "BOOKING HACK",
      durationMs: 22000,
      segments: seg([["myth", 2500, 7000], ["truth", 7200, 13000], ["how", 13200, 21000]]),
    }),
    data: {
      variant: "beats",
      beats: [
        { label: "MYTH", title: "A return is always cheaper", segmentId: "myth" },
        { label: "TRUTH", title: "Two one-ways on different airlines can beat it", segmentId: "truth" },
        { label: "HOW", title: "Search one-way both directions, then compare the total", segmentId: "how" },
      ],
    },
  },
  PlaneSecret: {
    ...base({
      hook: "That tiny hole in the plane window has a job",
      tag: "PLANE SECRETS",
      durationMs: 16000,
      segments: seg([["f1", 2500, 7000], ["f2", 7200, 12000], ["f3", 12200, 16000]]),
    }),
    data: { facts: [{ segmentId: "f1", title: "Fact one" }, { segmentId: "f2", title: "Fact two" }, { segmentId: "f3", title: "Fact three" }] },
  },
  Pov: {
    ...base({ hook: "POV: you checked the flight price again and it went up", tag: "POV", cta: "Send to the friend who's waiting for it to drop", durationMs: 6000 }),
    data: { line: "POV: you checked the flight price again and it went up" },
  },
  HotTake: {
    ...base({
      hook: "Reclining on a 2-hour flight: fine or rude?",
      tag: "HOT TAKE",
      cta: "Comment A or B",
      durationMs: 6500,
      segments: seg([["hook", 0, 2500], ["sides", 2600, 4800], ["cta", 5000, 6500]]),
    }),
    data: { question: "Reclining on a 2-hour flight: fine or rude?", a: "FINE", b: "RUDE" },
  },
  WeekendReceipt: {
    ...base({
      hook: "A Lisbon weekend from London: the real total",
      tag: "WEEKEND FOR £X",
      durationMs: 26000,
      segments: seg([["l0", 3000, 7000], ["l1", 7500, 12000], ["l2", 12500, 16000], ["l3", 16500, 20000], ["total", 21000, 26000]]),
    }),
    data: {
      title: "LISBON · 2 NIGHTS",
      currency: "GBP",
      foundOn: "2026-11-04",
      lines: [
        { label: "Return flight", amount: 49, segmentId: "l0" },
        { label: "2 nights", amount: null, note: "live price on render day", segmentId: "l1" },
        { label: "Tram day pass", amount: null, segmentId: "l2" },
        { label: "Food", amount: null, segmentId: "l3" },
      ],
    },
  },
};
