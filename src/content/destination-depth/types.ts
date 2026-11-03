// The deeper destination guide (Growth proposal phase 2, pillar A, 3 Nov 2026).
// Editorial rules, as for every guide: no invented prices or statistics. A
// fare appears only with the official page it came from and the date it was
// checked; anything we couldn't check is left out and the reader is sent to
// the operator's own page instead.

import type { Photo } from "../images";

export type Source = { label: string; url: string };

export type TransferMode = "train" | "metro" | "bus" | "taxi";

export type Transfer = {
  mode: TransferMode;
  /** The service, as signed at the airport ("Heathrow Express", "RER B"). */
  name: string;
  /** Where it takes you ("London Paddington", "the Historic Centre"). */
  to: string;
  /** Journey time as the operator gives it ("15 minutes", "about 30 minutes"). */
  time?: string;
  /** Only when checked on the operator's or transport authority's own page. */
  fare?: { text: string; source: Source };
  note?: string;
};

export type AirportGuide = {
  /** IATA code. */
  code: string;
  name: string;
  /** One line: where it is and what it's mainly used for. */
  summary: string;
  transfers: Transfer[];
  /** The airport's own page on getting into the city, when there is one. */
  officialPage?: Source;
};

/**
 * Month-by-month weather, January first: B = best weather for sightseeing,
 * G = good, M = mixed (very hot, cold, wet or stormy). An editorial reading of
 * the seasons described in `whenToGo`, not a forecast.
 */
export type WeatherMonths = string;

/** Average temperatures and rain per month, January first. Only added with a source. */
export type ClimateMonth = { highC: number; lowC: number; rainMm: number };

export type Neighbourhood = {
  name: string;
  bestFor: string;
  /** Two or three sentences: what it's like, what's close by, and the catch. */
  text: string;
};

/** One day of the first-visit plan, split the way people plan a day. */
export type ItineraryDay = { title: string; morning: string; afternoon: string; evening: string };

/**
 * The photo-led layout (Batch 7): at-a-glance blocks with a picture and a few
 * words each. A city gets the new layout only once it has this; the others
 * keep the approved page.
 */
export type DestinationVisual = {
  /** One per itinerary day, in order: a photo and the stops by name. */
  days: { photo: Photo; stops: string[] }[];
  /** Three neighbourhood tiles; names match `neighbourhoods`. */
  stay: { name: string; bestFor: string; photo: Photo }[];
};

export type DestinationDepth = {
  visual?: DestinationVisual;
  /** ISO date this guide's facts were last checked. */
  checked: string;
  airports: AirportGuide[];
  weather: WeatherMonths;
  climate?: { months: ClimateMonth[]; source: Source };
  neighbourhoods: Neighbourhood[];
  /** A first visit, day by day. */
  itinerary: ItineraryDay[];
  /** "How many days do you need?", answer first. */
  daysNeeded: string;
  /** "What's the best way to get around?", answer first: the systems and the ticket to use. */
  gettingAround: string;
  essentials: {
    currency: string;
    /** Plug types and mains voltage. */
    plugs: string;
    language: string;
  };
  /** City-specific questions people search for, with answers we can stand behind. */
  faqs: { q: string; a: string }[];
  /** Guides that matter most for this trip (slugs in src/content/guides). */
  guides: string[];
};
