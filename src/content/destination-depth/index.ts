// Destination guides, phase 2 depth (Growth proposal pillar A, 3 Nov 2026).
// One file per region; the copy for the new page sections is here too.
import { americasDepth } from "./americas";
import { asiaPacificDepth } from "./asia-pacific";
import { europeDepth } from "./europe";
import { middleEastAfricaDepth } from "./middle-east-africa";
import type { DestinationDepth, TransferMode } from "./types";

export type { AirportGuide, ClimateMonth, DestinationDepth, ItineraryDay, Neighbourhood, Transfer, TransferMode } from "./types";

export const destinationDepth: Record<string, DestinationDepth> = { ...europeDepth, ...asiaPacificDepth, ...middleEastAfricaDepth, ...americasDepth };

export const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] as const;

export const weatherLegend = {
  B: { label: "Best weather", short: "Best" },
  G: { label: "Good", short: "Good" },
  M: { label: "Hot, cold, wet or stormy", short: "Mixed" },
} as const;

export const modeLabel: Record<TransferMode, string> = { train: "Train", metro: "Metro", bus: "Bus", taxi: "Taxi" };

/** Headings and fixed lines for the destination page sections. */
export const depthCopy = {
  airports: { title: (city: string) => `Getting from the airport to ${city}`, check: "Times and fares change, so check before you travel:", checked: (date: string) => `Checked ${date}.` },
  months: {
    title: (city: string) => `${city} month by month`,
    intro: "When the weather is at its best, and the cheapest month to fly from recent fares.",
    note: "A guide to the seasons, not a forecast.",
  },
  plan: {
    title: (city: string) => `Things to do in ${city}`,
    dayPlan: (n: number) => `A ${n}-day plan for a first visit`,
    tripName: (n: number, city: string) => `A ${n}-day plan for ${city}`,
    day: (n: number) => `Day ${n}`,
  },
  stay: { title: (city: string) => `Where to stay in ${city}`, bestFor: "Best for" },
  costs: {
    title: (city: string) => `What a trip to ${city} costs`,
    flights: "Return flight",
    flightsFrom: (origin: string) => `Cheapest recent fare from ${origin}`,
    noFlights: "Search your dates for live prices",
    transfer: "Airport to the centre",
    transferNone: "See the operators’ own pages for fares",
    money: "Money",
    note: "We only show prices we’ve seen on the operator’s own page or in recent fare searches. Food, hotels and activities depend on your style of travel.",
  },
  essentials: { currency: "Currency", plugs: "Plugs", language: "Language" },
  faqs: { title: (city: string) => `${city}: questions travellers ask` },
  routes: {
    title: (city: string) => `Flights to ${city} from the UK and US`,
    route: (from: string) => `From ${from}`,
    search: (from: string) => `Search from ${from}`,
  },
  guides: { title: "Before you go" },
} as const;

/** City-wide questions built from the structured content above. */
export const depthQuestions = {
  transfer: (airport: string, city: string) => `How do I get from ${airport} to ${city} city centre?`,
  stay: (city: string) => `Where should I stay in ${city}?`,
  days: (city: string) => `How many days do you need in ${city}?`,
  currency: (country: string) => `What currency is used in ${country}?`,
  plugs: (country: string) => `What plugs and voltage does ${country} use?`,
  language: (city: string) => `What language is spoken in ${city}?`,
} as const;
