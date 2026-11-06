import { photos } from "../images";
import type { Destination } from "../destinations";
import type { DestinationGuide } from "../destination-guides";

// Batch 22 (5 Nov 2026): destinations added to bring every region to six.
// Same rules as destination-guides.ts: general, well-established facts only.
export const americasNewDestinations: Destination[] = [
  { slug: "miami", city: "Miami", country: "United States", airport: "MIA", cityCode: "MIA", region: "americas", photo: photos.miami, blurb: "Art Deco beaches, Cuban coffee and the Everglades nearby." },
];

export const americasNewGuides: Record<string, DestinationGuide> = {
  miami: {
    bestTime: "December to April for dry, sunny weather",
    intro: "Art Deco beaches, Cuban coffee, street art in Wynwood and the Everglades within a drive.",
    highlights: ["Ocean Drive and the Art Deco Historic District", "Cuban sandwiches and cafecitos on Calle Ocho", "Wynwood Walls and Vizcaya Museum and Gardens"],
    tip: "MIA and Fort Lauderdale (FLL) both serve Miami; compare fares into each and add the transfer.",
    whenToGo:
      "December to April is the driest and most comfortable season, with sunny days and lower humidity, and it is also the busiest and priciest. Summer is hot and humid with afternoon storms. The Atlantic hurricane season runs from 1 June to 30 November, so book flexible fares and insurance if you travel then.",
    flying:
      "Miami International (MIA) is the main airport, with nonstop flights from London and other UK airports, and many connections from the rest of the US. Fort Lauderdale-Hollywood (FLL), about 45 km north, is the alternative; compare fares into both and add the cost and time of getting into the city.",
    entry: { label: "U.S. Customs and Border Protection: ESTA for Visa Waiver Program travellers", url: "https://www.cbp.gov/travel/international-visitors/esta" },
  },
};
