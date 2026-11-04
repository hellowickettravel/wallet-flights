import type { Caption } from "@remotion/captions";

export type Audience = "UK" | "US";
export type Currency = "GBP" | "USD";

export type Fare = {
  from: string;
  to: string;
  price: number;
  currency: Currency;
  trip: "return" | "one-way";
  /** ISO date the site showed this fare (render-day re-check), e.g. 2026-11-09. */
  foundOn: string;
  /** "live" = re-read from walletflights.com on render day; "snapshot" = plan figure, not re-checked. */
  status: "live" | "snapshot";
  route?: string;
};

/** One spoken beat; tts.ts writes its start/end so visuals can follow the voice. */
export type Segment = {
  id: string;
  /** Text as shown in captions. */
  text: string;
  startMs: number;
  endMs: number;
};

export type Broll = { src: string; kind: "video" | "image"; credit?: string };

export type BaseReelProps = {
  day: number;
  audience: Audience;
  hook: string;
  /** Short series tag shown top-left, e.g. "GUESS THE FARE". */
  tag: string;
  cta: string;
  audioSrc: string | null;
  durationMs: number;
  segments: Segment[];
  captions: Caption[];
  broll: Broll[];
  /** Placeholder description shown when b-roll is missing (sample renders only). */
  brollWanted?: string[];
  /** Render the cover still: hook in large type, no captions. */
  cover?: boolean;
  /** Marks internal samples (snapshot fares, missing b-roll) with a small corner label. */
  sampleNote?: string | null;
};

export type GuessTheFareData = { fare: Fare; options: number[]; city: string };
export type CheaperThanData = {
  left: { label: string; price: number; currency: Currency; foundOn?: string };
  right: { label: string; price: number | null; currency: Currency; note?: string };
  verdict: string;
};
export type MapPoint = { name: string; lngLat: [number, number] };
export type MapItData = {
  origin: MapPoint;
  budgetLabel: string;
  stops: (MapPoint & { fare: Fare; chip?: string })[];
  endLine: string;
  mapStyle: "offline" | "openfreemap";
};
export type HackBeat = { label: string; title: string; body?: string; segmentId: string };
export type BookingHackData =
  | { variant: "beats"; beats: HackBeat[] }
  | {
      variant: "leaveCalendar";
      beats: HackBeat[];
      /** ISO dates */
      book: string[];
      bankHolidays: string[];
      offFrom: string;
      offTo: string;
      leaveCount: number;
      daysOff: number;
    };
export type PlaneSecretData = { facts: { segmentId: string; title: string; body?: string }[] };
export type PovData = { line: string; ticker?: { from: number; to: number; currency: Currency } };
export type HotTakeData = { question: string; a: string; b: string };
export type ReceiptLine = { label: string; amount: number | null; note?: string; segmentId: string };
export type WeekendReceiptData = {
  title: string;
  currency: Currency;
  lines: ReceiptLine[];
  foundOn: string;
};

export type ReelProps<D> = BaseReelProps & { data: D };
