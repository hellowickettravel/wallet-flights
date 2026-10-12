// Airlines used by the demo results and the Airlines page. Facts (codes, main
// hubs, alliances) are public; logos are not used — the site shows a monogram
// tile in a brand-like colour instead of trademarked artwork.
export type Alliance = "Star Alliance" | "oneworld" | "SkyTeam" | "None";

export type Airline = {
  code: string;
  name: string;
  hub: string; // IATA code of main hub
  hubCity: string;
  alliance: Alliance;
  country: string;
  color: string; // tile background
  lowCost?: boolean;
  longHaul: boolean;
};

export const airlines: Airline[] = [
  { code: "BA", name: "British Airways", hub: "LHR", hubCity: "London Heathrow", alliance: "oneworld", country: "United Kingdom", color: "#075aaa", longHaul: true },
  { code: "VS", name: "Virgin Atlantic", hub: "LHR", hubCity: "London Heathrow", alliance: "SkyTeam", country: "United Kingdom", color: "#b4002d", longHaul: true },
  { code: "AA", name: "American Airlines", hub: "DFW", hubCity: "Dallas/Fort Worth", alliance: "oneworld", country: "United States", color: "#0a5ea8", longHaul: true },
  { code: "DL", name: "Delta Air Lines", hub: "ATL", hubCity: "Atlanta", alliance: "SkyTeam", country: "United States", color: "#0b2a5b", longHaul: true },
  { code: "UA", name: "United Airlines", hub: "ORD", hubCity: "Chicago O'Hare", alliance: "Star Alliance", country: "United States", color: "#1d3c8f", longHaul: true },
  { code: "B6", name: "JetBlue", hub: "JFK", hubCity: "New York JFK", alliance: "None", country: "United States", color: "#0c3a7d", longHaul: false },
  { code: "AC", name: "Air Canada", hub: "YYZ", hubCity: "Toronto Pearson", alliance: "Star Alliance", country: "Canada", color: "#c8102e", longHaul: true },
  { code: "LH", name: "Lufthansa", hub: "FRA", hubCity: "Frankfurt", alliance: "Star Alliance", country: "Germany", color: "#05164d", longHaul: true },
  { code: "AF", name: "Air France", hub: "CDG", hubCity: "Paris Charles de Gaulle", alliance: "SkyTeam", country: "France", color: "#002157", longHaul: true },
  { code: "KL", name: "KLM", hub: "AMS", hubCity: "Amsterdam Schiphol", alliance: "SkyTeam", country: "Netherlands", color: "#00719c", longHaul: true },
  { code: "IB", name: "Iberia", hub: "MAD", hubCity: "Madrid", alliance: "oneworld", country: "Spain", color: "#c8102e", longHaul: true },
  { code: "TP", name: "TAP Air Portugal", hub: "LIS", hubCity: "Lisbon", alliance: "Star Alliance", country: "Portugal", color: "#0f7a3e", longHaul: true },
  { code: "TK", name: "Turkish Airlines", hub: "IST", hubCity: "Istanbul", alliance: "Star Alliance", country: "Türkiye", color: "#c70a0c", longHaul: true },
  { code: "EK", name: "Emirates", hub: "DXB", hubCity: "Dubai", alliance: "None", country: "United Arab Emirates", color: "#b3121b", longHaul: true },
  { code: "QR", name: "Qatar Airways", hub: "DOH", hubCity: "Doha", alliance: "oneworld", country: "Qatar", color: "#5c0632", longHaul: true },
  { code: "SQ", name: "Singapore Airlines", hub: "SIN", hubCity: "Singapore Changi", alliance: "Star Alliance", country: "Singapore", color: "#0b2a6b", longHaul: true },
  { code: "JL", name: "Japan Airlines", hub: "HND", hubCity: "Tokyo Haneda", alliance: "oneworld", country: "Japan", color: "#b0141c", longHaul: true },
  { code: "AI", name: "Air India", hub: "DEL", hubCity: "Delhi", alliance: "Star Alliance", country: "India", color: "#a6192e", longHaul: true },
  { code: "U2", name: "easyJet", hub: "LGW", hubCity: "London Gatwick", alliance: "None", country: "United Kingdom", color: "#bf4600", lowCost: true, longHaul: false },
];

export const airlineByCode = Object.fromEntries(airlines.map((a) => [a.code, a])) as Record<string, Airline>;
