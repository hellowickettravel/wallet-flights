import type { ProgramId } from "./affiliates";

// "Plan the rest of your trip" on destination guides and route pages.
// Flights are the product; these are helpful extras from programs we've joined.
// Deep links were checked by hand (Airalo country pages, Tiqets city search).

/**
 * TODO(confirm): the owner will supply their own hotel and car-rental redirect
 * links. Put them here (full https URL; `{city}` is replaced with the city
 * name) and they replace the interim Travelpayouts programs below.
 */
export const ownerLinks: { hotels: string | null; cars: string | null } = {
  hotels: null,
  cars: null,
};

export type CrossSellKind = "hotels" | "cars" | "transfers" | "esim" | "attractions";

export type CrossSellItem = {
  kind: CrossSellKind;
  title: string;
  text: string;
  cta: string;
  /** Interim/partner program used when no owner link is set. */
  program: ProgramId;
  url: (city: string, esimCountry: string) => string;
};

export const crossSell: CrossSellItem[] = [
  {
    kind: "hotels",
    title: "Places to stay",
    text: "Compare hotels and apartments for your dates.",
    cta: "Find hotels",
    program: "tripcom",
    url: () => "https://www.trip.com/hotels/",
  },
  {
    kind: "cars",
    title: "Car rental",
    text: "Compare rental cars from the airport or the city.",
    cta: "Compare cars",
    program: "economybookings",
    url: () => "https://www.economybookings.com/",
  },
  {
    kind: "transfers",
    title: "Airport transfer",
    text: "Book a fixed-price ride from the airport to your hotel.",
    cta: "Book a transfer",
    program: "kiwitaxi",
    url: () => "https://kiwitaxi.com/",
  },
  {
    kind: "esim",
    title: "Mobile data",
    text: "Get an eSIM before you fly and land connected.",
    cta: "Get an eSIM",
    program: "airalo",
    url: (_city, country) => `https://www.airalo.com/${country}-esim`,
  },
  {
    kind: "attractions",
    title: "Tickets & attractions",
    text: "Skip-the-line tickets for museums and sights.",
    cta: "See attractions",
    program: "tiqets",
    url: (city) => `https://www.tiqets.com/en/search?q=${encodeURIComponent(city)}`,
  },
];

/** Airalo country slug per destination (checked: each returns 200). */
export const esimCountry: Record<string, string> = {
  london: "united-kingdom",
  paris: "france",
  rome: "italy",
  barcelona: "spain",
  lisbon: "portugal",
  tokyo: "japan",
  bali: "indonesia",
  singapore: "singapore",
  bangkok: "thailand",
  sydney: "australia",
  dubai: "united-arab-emirates",
  istanbul: "turkey",
  cairo: "egypt",
  "cape-town": "south-africa",
  delhi: "india",
  cancun: "mexico",
  "rio-de-janeiro": "brazil",
  "mexico-city": "mexico",
  cusco: "peru",
  "new-york": "united-states",
};
