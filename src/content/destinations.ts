import { photos, type Photo } from "./images";

export type Region = "europe" | "asia-pacific" | "middle-east-africa" | "americas";

export type Destination = {
  slug: string;
  city: string;
  country: string;
  airport: string; // main IATA code
  region: Region;
  photo: Photo;
  fromPrice: number; // example lowest round-trip fare in USD
  blurb: string;
};

export const regions: { id: Region; label: string }[] = [
  { id: "europe", label: "Europe" },
  { id: "asia-pacific", label: "Asia & Pacific" },
  { id: "middle-east-africa", label: "Middle East & Africa" },
  { id: "americas", label: "The Americas" },
];

export const destinations: Destination[] = [
  { slug: "london", city: "London", country: "United Kingdom", airport: "LHR", region: "europe", photo: photos.london, fromPrice: 489, blurb: "Theatre, markets and museums that cost nothing to enter." },
  { slug: "paris", city: "Paris", country: "France", airport: "CDG", region: "europe", photo: photos.paris, fromPrice: 512, blurb: "Café terraces, long walks along the Seine, late summer light." },
  { slug: "rome", city: "Rome", country: "Italy", airport: "FCO", region: "europe", photo: photos.rome, fromPrice: 548, blurb: "Two thousand years of history between espresso stops." },
  { slug: "barcelona", city: "Barcelona", country: "Spain", airport: "BCN", region: "europe", photo: photos.barcelona, fromPrice: 529, blurb: "Gaudí, beaches and dinner that starts at ten." },
  { slug: "lisbon", city: "Lisbon", country: "Portugal", airport: "LIS", region: "europe", photo: photos.lisbon, fromPrice: 467, blurb: "Hills, trams and pastéis de nata still warm from the oven." },

  { slug: "tokyo", city: "Tokyo", country: "Japan", airport: "HND", region: "asia-pacific", photo: photos.tokyo, fromPrice: 798, blurb: "Neon nights, quiet shrines and the best convenience-store food anywhere." },
  { slug: "bali", city: "Bali", country: "Indonesia", airport: "DPS", region: "asia-pacific", photo: photos.bali, fromPrice: 912, blurb: "Rice terraces, surf breaks and temple ceremonies." },
  { slug: "singapore", city: "Singapore", country: "Singapore", airport: "SIN", region: "asia-pacific", photo: photos.singapore, fromPrice: 864, blurb: "Hawker centres, gardens and an airport worth arriving early for." },
  { slug: "bangkok", city: "Bangkok", country: "Thailand", airport: "BKK", region: "asia-pacific", photo: photos.bangkok, fromPrice: 745, blurb: "Street food, river boats and gilded temples." },
  { slug: "sydney", city: "Sydney", country: "Australia", airport: "SYD", region: "asia-pacific", photo: photos.sydney, fromPrice: 1094, blurb: "Harbour ferries and coastal walks from Bondi to Coogee." },

  { slug: "dubai", city: "Dubai", country: "United Arab Emirates", airport: "DXB", region: "middle-east-africa", photo: photos.dubai, fromPrice: 689, blurb: "Desert evenings, souks and a skyline that keeps growing." },
  { slug: "istanbul", city: "Istanbul", country: "Türkiye", airport: "IST", region: "middle-east-africa", photo: photos.istanbul, fromPrice: 618, blurb: "Two continents, one Bosphorus ferry ride apart." },
  { slug: "cairo", city: "Cairo", country: "Egypt", airport: "CAI", region: "middle-east-africa", photo: photos.cairo, fromPrice: 734, blurb: "The pyramids at sunrise, then the Nile by felucca." },
  { slug: "cape-town", city: "Cape Town", country: "South Africa", airport: "CPT", region: "middle-east-africa", photo: photos.capeTown, fromPrice: 956, blurb: "Table Mountain, penguins and the winelands nearby." },
  { slug: "delhi", city: "Delhi", country: "India", airport: "DEL", region: "middle-east-africa", photo: photos.delhi, fromPrice: 812, blurb: "Your gateway to Agra, Jaipur and the Golden Triangle." },

  { slug: "cancun", city: "Cancún", country: "Mexico", airport: "CUN", region: "americas", photo: photos.cancun, fromPrice: 289, blurb: "Caribbean water, cenotes and Mayan ruins within a day trip." },
  { slug: "rio-de-janeiro", city: "Rio de Janeiro", country: "Brazil", airport: "GIG", region: "americas", photo: photos.rio, fromPrice: 712, blurb: "Beaches, samba and the view from Sugarloaf." },
  { slug: "mexico-city", city: "Mexico City", country: "Mexico", airport: "MEX", region: "americas", photo: photos.mexicoCity, fromPrice: 318, blurb: "Tacos al pastor, murals and world-class museums." },
  { slug: "cusco", city: "Cusco", country: "Peru", airport: "CUZ", region: "americas", photo: photos.cusco, fromPrice: 684, blurb: "The way in to Machu Picchu and the Sacred Valley." },
  { slug: "new-york", city: "New York", country: "United States", airport: "JFK", region: "americas", photo: photos.newYork, fromPrice: 198, blurb: "Five boroughs, endless neighbourhoods to eat your way through." },
];

export const destinationBySlug = Object.fromEntries(destinations.map((d) => [d.slug, d])) as Record<string, Destination>;
