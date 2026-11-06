import type { Destination } from "../destinations";
import type { DestinationGuide } from "../destination-guides";
import { photos } from "../images";

// Batch 22 (5 Nov 2026): destinations added to bring every region to six.
// Same rules as destination-guides.ts: general, well-established facts only.
export const europeNewDestinations: Destination[] = [
  { slug: "amsterdam", city: "Amsterdam", country: "Netherlands", airport: "AMS", cityCode: "AMS", region: "europe", photo: photos.amsterdam, blurb: "Canals, world-class museums and a city made for cycling." },
];

export const europeNewGuides: Record<string, DestinationGuide> = {
  amsterdam: {
    bestTime: "April to May and September",
    intro: "Canal-side walks, the Rijksmuseum and Van Gogh Museum, and easy day trips by train, all in a city small enough to cover on foot.",
    highlights: ["The Rijksmuseum and Van Gogh Museum", "A canal cruise or a walk along the Canal Ring", "Anne Frank House, booked ahead online"],
    tip: "Schiphol sits about 15 minutes by train from Amsterdam Centraal, so you can be in the centre quickly after landing.",
    whenToGo:
      "Spring brings tulip season, with Keukenhof open from March to May, and long, mild days. Summer is warm and busy. Autumn is quieter and still pleasant for walking the canals, while winter is cold and damp but good for museums and cosy cafés. Rain is possible in any month, so pack a light waterproof.",
    flying:
      "Schiphol (AMS) is the main airport and one of Europe’s busiest hubs, with direct flights from many UK airports and from across the US. The train station sits below the terminal, with services to Amsterdam Centraal that take about 14 to 17 minutes. Eindhoven and Rotterdam also take some budget flights but are much further from the city.",
    entry: { label: "GOV.UK: Netherlands entry requirements", url: "https://www.gov.uk/foreign-travel-advice/netherlands/entry-requirements" },
  },
};
