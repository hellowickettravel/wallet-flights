import { photos, type Photo } from "./images";

export type Region = "europe" | "asia-pacific" | "middle-east-africa" | "americas";

export type Destination = {
  slug: string;
  city: string;
  country: string;
  airport: string; // main IATA code
  /** IATA city code for the Data API (covers every airport in the city). */
  cityCode: string;
  region: Region;
  photo: Photo;
  blurb: string;
};

export const regions: { id: Region; label: string }[] = [
  { id: "europe", label: "Europe" },
  { id: "asia-pacific", label: "Asia & Pacific" },
  { id: "middle-east-africa", label: "Middle East & Africa" },
  { id: "americas", label: "The Americas" },
];

export const destinations: Destination[] = [
  { slug: "london", city: "London", country: "United Kingdom", airport: "LHR", cityCode: "LON", region: "europe", photo: photos.london, blurb: "Theatre, markets and museums that cost nothing to enter." },
  { slug: "paris", city: "Paris", country: "France", airport: "CDG", cityCode: "PAR", region: "europe", photo: photos.paris, blurb: "Café terraces, long walks along the Seine, late summer light." },
  { slug: "rome", city: "Rome", country: "Italy", airport: "FCO", cityCode: "ROM", region: "europe", photo: photos.rome, blurb: "Two thousand years of history between espresso stops." },
  { slug: "barcelona", city: "Barcelona", country: "Spain", airport: "BCN", cityCode: "BCN", region: "europe", photo: photos.barcelona, blurb: "Gaudí, beaches and dinner that starts at ten." },
  { slug: "lisbon", city: "Lisbon", country: "Portugal", airport: "LIS", cityCode: "LIS", region: "europe", photo: photos.lisbon, blurb: "Hills, trams and pastéis de nata still warm from the oven." },

  { slug: "tokyo", city: "Tokyo", country: "Japan", airport: "HND", cityCode: "TYO", region: "asia-pacific", photo: photos.tokyo, blurb: "Neon nights, quiet shrines and the best convenience-store food anywhere." },
  { slug: "bali", city: "Bali", country: "Indonesia", airport: "DPS", cityCode: "DPS", region: "asia-pacific", photo: photos.bali, blurb: "Rice terraces, surf breaks and temple ceremonies." },
  { slug: "singapore", city: "Singapore", country: "Singapore", airport: "SIN", cityCode: "SIN", region: "asia-pacific", photo: photos.singapore, blurb: "Hawker centres, gardens and an airport worth arriving early for." },
  { slug: "bangkok", city: "Bangkok", country: "Thailand", airport: "BKK", cityCode: "BKK", region: "asia-pacific", photo: photos.bangkok, blurb: "Street food, river boats and gilded temples." },
  { slug: "sydney", city: "Sydney", country: "Australia", airport: "SYD", cityCode: "SYD", region: "asia-pacific", photo: photos.sydney, blurb: "Harbour ferries and coastal walks from Bondi to Coogee." },

  { slug: "dubai", city: "Dubai", country: "United Arab Emirates", airport: "DXB", cityCode: "DXB", region: "middle-east-africa", photo: photos.dubai, blurb: "Desert evenings, souks and a skyline that keeps growing." },
  { slug: "istanbul", city: "Istanbul", country: "Türkiye", airport: "IST", cityCode: "IST", region: "middle-east-africa", photo: photos.istanbul, blurb: "Two continents, one Bosphorus ferry ride apart." },
  { slug: "cairo", city: "Cairo", country: "Egypt", airport: "CAI", cityCode: "CAI", region: "middle-east-africa", photo: photos.cairo, blurb: "The pyramids at sunrise, then the Nile by felucca." },
  { slug: "cape-town", city: "Cape Town", country: "South Africa", airport: "CPT", cityCode: "CPT", region: "middle-east-africa", photo: photos.capeTown, blurb: "Table Mountain, penguins and the winelands nearby." },
  { slug: "delhi", city: "Delhi", country: "India", airport: "DEL", cityCode: "DEL", region: "asia-pacific", photo: photos.delhi, blurb: "Your gateway to Agra, Jaipur and the Golden Triangle." },

  { slug: "cancun", city: "Cancún", country: "Mexico", airport: "CUN", cityCode: "CUN", region: "americas", photo: photos.cancun, blurb: "Caribbean water, cenotes and Mayan ruins within a day trip." },
  { slug: "rio-de-janeiro", city: "Rio de Janeiro", country: "Brazil", airport: "GIG", cityCode: "RIO", region: "americas", photo: photos.rio, blurb: "Beaches, samba and the view from Sugarloaf." },
  { slug: "mexico-city", city: "Mexico City", country: "Mexico", airport: "MEX", cityCode: "MEX", region: "americas", photo: photos.mexicoCity, blurb: "Tacos al pastor, murals and world-class museums." },
  { slug: "cusco", city: "Cusco", country: "Peru", airport: "CUZ", cityCode: "CUZ", region: "americas", photo: photos.cusco, blurb: "The way in to Machu Picchu and the Sacred Valley." },
  { slug: "new-york", city: "New York", country: "United States", airport: "JFK", cityCode: "NYC", region: "americas", photo: photos.newYork, blurb: "Five boroughs, endless neighbourhoods to eat your way through." },
];

export const destinationBySlug = Object.fromEntries(destinations.map((d) => [d.slug, d])) as Record<string, Destination>;
