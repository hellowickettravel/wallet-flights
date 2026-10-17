// Flight delay compensation rules (UK261 and EU261), as a pure function so the
// checker can update on every change. Summarised from the CAA and GOV.UK pages
// behind our rights guide; see src/content/compensation.ts.
// TODO(confirm): legal review of the wording and edge cases before launch.
import type { DelayBand, Notice, Reason, Region, RightsAirline, RightsAirport, What } from "@/content/compensation";

export type Answers = {
  from: RightsAirport;
  to: RightsAirport;
  airline: RightsAirline;
  what: What;
  delay: DelayBand;
  notice: Notice;
  reason: Reason;
  passengers: number;
  /** YYYY-MM-DD */
  date: string;
};

export type Regime = "UK261" | "EU261";
export type CheckState = "ok" | "maybe" | "no";
export type Check = { state: CheckState; title: string; detail: string };
export type Verdict = "owed" | "maybe" | "not";

export type Assessment = {
  regime: Regime | null;
  currency: "GBP" | "EUR";
  distanceKm: number;
  /** 0: up to 1,500 km · 1: 1,500–3,500 km · 2: over 3,500 km (after the intra-EU rule). */
  band: 0 | 1 | 2;
  bandAmounts: [number, number, number];
  perPassenger: number;
  halved: boolean;
  total: number;
  verdict: Verdict;
  checks: Check[];
  limit: { claimBy: string | null; status: "ok" | "scotland" | "expired" | "future" };
};

const AMOUNTS: Record<Regime, [number, number, number]> = { UK261: [220, 350, 520], EU261: [250, 400, 600] };
const place = (r: Region) => (r === "UK" ? "the UK" : "the EU");

/** Great-circle distance in km. */
export function distanceKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const t = Math.PI / 180;
  const h = Math.sin(((b.lat - a.lat) * t) / 2) ** 2 + Math.cos(a.lat * t) * Math.cos(b.lat * t) * Math.sin(((b.lon - a.lon) * t) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

/**
 * Which rules cover the flight. Leaving the UK or the EU: any airline. Arriving
 * in the UK: a UK or EU airline. Arriving in the EU: an EU airline (EU261) or
 * a UK airline (UK261).
 */
export function regimeFor(from: Region, to: Region, airline: Region): Regime | null {
  if (from === "UK") return "UK261";
  if (from === "EU") return "EU261";
  if (to === "UK" && airline !== "X") return "UK261";
  if (to === "EU" && airline === "EU") return "EU261";
  if (to === "EU" && airline === "UK") return "UK261";
  return null;
}

const money = (n: number, c: "GBP" | "EUR") => `${c === "GBP" ? "£" : "€"}${n.toLocaleString("en-GB")}`;
const reasonText: Record<Reason, string> = {
  tech: "Technical problems",
  crew: "Crew or staff shortages",
  strikeAirline: "Strikes by the airline’s own staff",
  weather: "Bad weather",
  atc: "Air traffic control restrictions",
  strikeOther: "Strikes by airport or air traffic staff",
  security: "Security or airport problems",
  none: "",
};
const outsideControl = new Set<Reason>(["weather", "atc", "strikeOther", "security"]);

function addYears(iso: string, years: number) {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCFullYear(d.getUTCFullYear() + years);
  return d.toISOString().slice(0, 10);
}

export function assess(a: Answers, today: string): Assessment {
  const regime = regimeFor(a.from.region, a.to.region, a.airline.region);
  const currency = regime === "EU261" ? "EUR" : "GBP";
  const bandAmounts = AMOUNTS[regime ?? "UK261"];
  const distance = a.from.code === a.to.code ? 0 : distanceKm(a.from, a.to);
  const rawBand: 0 | 1 | 2 = distance <= 1500 ? 0 : distance <= 3500 ? 1 : 2;
  // Flights within the EU (or within the UK) over 1,500 km get the middle amount.
  // TODO(confirm): wording of the UK261 equivalent for flights within the UK.
  const within = a.from.region !== "X" && a.from.region === a.to.region;
  const band: 0 | 1 | 2 = within && rawBand === 2 ? 1 : rawBand;
  const checks: Check[] = [];
  let blocked = false;
  let unsure = false;
  let halved = false;

  if (regime) {
    checks.push({
      state: "ok",
      title: `Covered by ${regime === "UK261" ? "UK" : "EU"} passenger rights (${regime})`,
      detail:
        a.from.region !== "X"
          ? `Your flight left ${place(a.from.region)}, so it’s covered whichever airline flew it.`
          : `${a.airline.name} is ${a.airline.region === "UK" ? "a UK" : "an EU"} airline flying into ${place(a.to.region)}.`,
    });
  } else {
    blocked = true;
    checks.push({
      state: "no",
      title: "Not covered by UK or EU rules",
      detail: `Flights into the UK or EU only count on a UK or EU airline, and ${a.airline.name} is neither. The country you flew from may have its own rules.`,
    });
  }

  checks.push({
    state: "ok",
    title: `${Math.round(distance).toLocaleString("en-GB")} km flight`,
    detail:
      within && rawBand === 2
        ? `Over 3,500 km but within ${place(a.from.region)}, so it’s paid at the middle rate: ${money(bandAmounts[1], currency)} per passenger.`
        : `${["Up to 1,500 km", "1,500 to 3,500 km", "Over 3,500 km"][band]}: ${money(bandAmounts[band], currency)} per passenger.`,
  });

  if (a.what === "delayed" || a.what === "missed") {
    if (a.delay === "lt2" || a.delay === "2to3") {
      blocked = true;
      checks.push({
        state: "no",
        title: "Arrived less than 3 hours late",
        detail: "Compensation starts at 3 hours late at your final destination. You may still claim back reasonable meals and drinks you paid for while you waited.",
      });
    } else {
      checks.push({
        state: "ok",
        title: "Arrived 3 hours or more late",
        detail: a.what === "missed" ? "Counts when all your flights were on one booking: the delay is measured at your final destination." : "Measured when the doors open at your destination.",
      });
      if (a.delay === "3to4" && band === 2) {
        halved = true;
        checks.push({ state: "maybe", title: "Long flight, 3 to 4 hours late", detail: "On flights over 3,500 km the airline can pay half when you arrive between 3 and 4 hours late." });
      }
    }
  } else if (a.what === "cancelled") {
    if (a.notice === "gt14") {
      blocked = true;
      checks.push({ state: "no", title: "Told more than 14 days before", detail: "No compensation, but you can choose a full refund or another flight." });
    } else {
      checks.push({
        state: "ok",
        title: `Told ${a.notice === "lt7" ? "less than 7 days" : "7 to 14 days"} before`,
        detail: "Owed unless the airline moved you to a flight close to your original times. The amount can be halved if the new flight got you there not much later.",
      });
    }
  } else {
    checks.push({ state: "ok", title: "Denied boarding", detail: "If the flight was overbooked and you didn’t volunteer to give up your seat, you’re owed straight away." });
  }

  if (a.what !== "denied") {
    if (outsideControl.has(a.reason)) {
      blocked = true;
      checks.push({
        state: "no",
        title: `${reasonText[a.reason]} are outside the airline’s control`,
        detail: "These count as extraordinary circumstances, so no compensation is due. The airline still has to look after you and get you there.",
      });
    } else if (a.reason === "none") {
      unsure = true;
      checks.push({ state: "maybe", title: "No reason given", detail: "Ask the airline in writing. Unless it shows the cause was outside its control, you’re owed." });
    } else {
      checks.push({ state: "ok", title: `${reasonText[a.reason]} are the airline’s responsibility`, detail: "Courts have ruled these don’t excuse the airline from paying." });
    }
  }

  // Time limit for claims in UK courts: 6 years in England and Wales, 5 in Scotland.
  let limit: Assessment["limit"];
  if (a.date > today) {
    limit = { claimBy: null, status: "future" };
    unsure = true;
  } else {
    const claimBy = addYears(a.date, 6);
    const status = claimBy < today ? "expired" : addYears(a.date, 5) < today ? "scotland" : "ok";
    if (status === "expired") blocked = true;
    limit = { claimBy, status };
  }

  const verdict: Verdict = blocked ? "not" : unsure ? "maybe" : "owed";
  const perPassenger = blocked ? 0 : halved ? bandAmounts[band] / 2 : bandAmounts[band];
  return {
    regime,
    currency,
    distanceKm: distance,
    band,
    bandAmounts,
    perPassenger,
    halved: halved && !blocked,
    total: perPassenger * a.passengers,
    verdict,
    checks,
    limit,
  };
}

export const formatMoney = money;
