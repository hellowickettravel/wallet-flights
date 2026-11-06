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

/** Headings, intros and fixed lines for the destination page sections, in page order. */
export const depthCopy = {
  menu: { overview: "Overview", airports: "Airports", months: "When to go", plan: "3-day plan", stay: "Where to stay", costs: "Costs", faqs: "Questions", routes: "Flights from" },
  /** Batch 22 page (destination v2): the sticky "On this page" menu, in page order. */
  nav: {
    overview: "Overview",
    flights: "Flight times",
    airports: "Airports",
    plan: "3-day plan",
    stay: "Where to stay",
    months: "When to go",
    tips: "Know before you go",
    food: "What to eat",
    trips: "Day trips",
    faqs: "Questions",
    guides: "Before you go",
  },
  overview: {
    title: (city: string) => `${city} at a glance`,
    intro: "The essentials for planning the trip, with recent fares and the local time.",
    highlights: "Don’t miss",
    tip: "Flight tip",
  },
  tripEssentials: {
    title: "Trip essentials",
    localTime: (city: string) => `Local time in ${city}`,
    sameTime: (city: string) => `Same time as ${city}`,
    ahead: (hours: string, city: string) => `${hours} ahead of ${city}`,
    behind: (hours: string, city: string) => `${hours} behind ${city}`,
    rateNote: "Today’s exchange rate, for guidance.",
    rows: { currency: "Currency", plugs: "Plugs", language: "Language", emergency: "Emergency", tipping: "Tipping", water: "Tap water" },
  },
  flightTimes: {
    title: (city: string) => `Flight times to ${city}`,
    intro: "Approximate nonstop flying time, distance and time difference from each city we cover. Each city links to its route guide or a live search.",
    cols: { from: "From", time: "Flying time", distance: "Distance", diff: "Time difference" },
    from: (city: string) => `From ${city}`,
    /** Completes the link text for screen readers: "Route guide from Boston". */
    linkFrom: (city: string) => `from ${city}`,
    connection: "usually with a connection",
    distance: (km: string, miles: string) => `${km} km (${miles} mi)`,
    route: "Route guide",
    search: "Search flights",
    note: "Flying times are estimates for a nonstop flight between the main airports; distances are straight-line between them.",
  },
  dayPlan: {
    show: "Show the day",
    hide: "Hide the day",
  },
  tips: {
    title: (city: string) => `Know before you go to ${city}`,
    intro: "Money, tickets, safety and manners: the small things that make the first day easier.",
  },
  food: {
    title: (city: string) => `What to eat in ${city}`,
    intro: "Local dishes and drinks worth trying, and where people go for them.",
  },
  dayTrips: {
    title: (city: string) => `Day trips from ${city}`,
    intro: "Three well-known days out, with the usual journey time each way.",
  },
  beforeYouGo: {
    title: "Before you go",
    intro: (city: string) => `Our guides to the rules and choices that matter for a trip to ${city}.`,
  },
  airports: {
    title: (city: string) => `Getting from the airport to ${city}`,
    intro: "Each airport, how far it is from the centre, and the quickest and cheapest ways into town.",
    check: "Times and fares change, so check before you travel:",
    checked: (date: string) => `Checked ${date}.`,
  },
  months: {
    title: (city: string) => `When to go to ${city}`,
    intro: "The months with the best weather, and the cheapest month to fly in recent fares. A guide to the seasons, not a forecast.",
    calendar: (city: string) => `Cheapest month to fly to ${city}`,
  },
  plan: {
    title: (city: string) => `A 3-day plan for ${city}`,
    intro: "A first visit, day by day, with the main sights in an order that saves time on the move.",
    highlights: "Don’t miss",
    dayPlan: (n: number) => `A ${n}-day plan for a first visit`,
    tripName: (n: number, city: string) => `A ${n}-day plan for ${city}`,
    day: (n: number) => `Day ${n}`,
    parts: { morning: "Morning", afternoon: "Afternoon", evening: "Evening" },
    tip: "Flight tip",
  },
  stay: { title: (city: string) => `Where to stay in ${city}`, intro: "The neighbourhoods that suit a first visit, and who each one is best for.", bestFor: "Best for" },
  costs: {
    title: (city: string) => `What a trip to ${city} costs`,
    intro: "The prices we can stand behind: recent fares and the operators’ own transport prices.",
    flights: "Return flight",
    flightsFrom: (origin: string) => `From ${origin}`,
    noFlights: "Search your dates for live prices",
    transfer: "Airport to the centre",
    transferNone: "See the operators’ own pages for fares",
    around: "Getting around",
    note: "Hotels, food and activities depend on how you like to travel, so we don’t guess at them.",
  },
  essentials: { currency: "Currency", plugs: "Plugs", language: "Language" },
  faqs: { title: (city: string) => `${city}: questions travellers ask`, intro: "Short answers first, with the official page where it matters." },
  routes: {
    title: (city: string) => `Flights to ${city} from the UK and US`,
    intro: "Flight times, distances, time differences and fares from each departure city.",
    route: (from: string) => `From ${from}`,
    search: (from: string) => `Search from ${from}`,
  },
  guides: { title: "Before you go", intro: "Our guides to the rules and decisions that matter for this trip." },
} as const;

/** City-wide questions built from the structured content above. */
export const depthQuestions = {
  transfer: (airport: string, city: string) => `How do I get from ${airport} to ${city} city centre?`,
  stay: (city: string) => `Where should I stay in ${city}?`,
  days: (city: string) => `How many days do you need in ${city}?`,
  gettingAround: (city: string) => `What’s the best way to get around ${city}?`,
} as const;
