// Travelpayouts account facts, copied from the dashboard (Tools → Links →
// "Full link" view of generated links). See docs/TRAVELPAYOUTS.md.
export const travelpayouts = {
  marker: "567389",
  /** The "Walletflights" project (source) in the dashboard. */
  trs: "344771",
  /** White Label widget #23361, configured for https://www.walletflights.com */
  whiteLabelId: "23361",
} as const;

/**
 * Currencies offered in the live search's currency menu (owner's request,
 * 16 Oct 2026: add INR, EUR and other widely used ones). The widget keeps
 * only codes its price service supports and always adds the dashboard's
 * default. Ordered by our audience: UK and US first, then the currencies of
 * the countries our visitors and destinations cover most.
 */
export const searchCurrencies = [
  "USD", "GBP", "EUR", "INR", "CAD", "AUD", "AED", "SAR", "PKR", "NGN",
  "ZAR", "SGD", "JPY", "CNY", "MXN", "BRL", "TRY", "CHF", "NZD", "THB",
] as const;

export type ProgramId = "aviasales" | "tripcom" | "kiwitaxi" | "economybookings" | "airalo" | "tiqets";

export type Program = {
  id: ProgramId;
  /** Shown to visitors (e.g. on /go). The owner asked us never to name the flight-search partner on the site. */
  name: string;
  campaignId: number;
  p: number;
  /** Hosts a destination URL may point at (keeps /go from becoming an open redirect). */
  hosts: string[];
};

export const programs: Record<ProgramId, Program> = {
  aviasales: { id: "aviasales", name: "Flight results", campaignId: 100, p: 4114, hosts: ["www.aviasales.com", "aviasales.com"] },
  tripcom: { id: "tripcom", name: "Trip.com", campaignId: 121, p: 8980, hosts: ["www.trip.com", "uk.trip.com", "us.trip.com"] },
  kiwitaxi: { id: "kiwitaxi", name: "Kiwitaxi", campaignId: 1, p: 647, hosts: ["kiwitaxi.com"] },
  economybookings: { id: "economybookings", name: "Economybookings.com", campaignId: 10, p: 2018, hosts: ["www.economybookings.com"] },
  airalo: { id: "airalo", name: "Airalo", campaignId: 541, p: 8310, hosts: ["www.airalo.com"] },
  tiqets: { id: "tiqets", name: "Tiqets", campaignId: 89, p: 2074, hosts: ["www.tiqets.com"] },
};
