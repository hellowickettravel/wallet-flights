import { photos } from "../images";
import type { Destination } from "../destinations";
import type { DestinationGuide } from "../destination-guides";

// Batch 22 (5 Nov 2026): destinations added to bring every region to six.
// Same rules as destination-guides.ts: general, well-established facts only.
export const middleEastAfricaNewDestinations: Destination[] = [
  { slug: "marrakech", city: "Marrakech", country: "Morocco", airport: "RAK", cityCode: "RAK", region: "middle-east-africa", photo: photos.marrakech, blurb: "Souks, riads and the Atlas Mountains on the horizon." },
  { slug: "abu-dhabi", city: "Abu Dhabi", country: "United Arab Emirates", airport: "AUH", cityCode: "AUH", region: "middle-east-africa", photo: photos.abuDhabi, blurb: "A white marble mosque, the Louvre and a quieter Gulf." },
];
const govUk = (country: string, slug: string) => ({
  label: `GOV.UK: ${country} entry requirements`,
  url: `https://www.gov.uk/foreign-travel-advice/${slug}/entry-requirements`,
});

export const middleEastAfricaNewGuides: Record<string, DestinationGuide> = {
  marrakech: {
    bestTime: "March to May and October to November",
    intro: "A walled medina of souks, palaces and riads, with the Atlas Mountains within reach for a day.",
    highlights: ["Jemaa el-Fna at sunset", "The Bahia Palace and Saadian Tombs", "Jardin Majorelle"],
    tip: "Agree the fare before you get into a taxi, or ask your riad to arrange an airport pickup.",
    whenToGo:
      "Spring and autumn are the most comfortable seasons, with warm days and cool evenings. June to August is very hot, and winter days are mild but nights are cold. Hotels are often cheaper in summer, and the High Atlas can have snow in winter.",
    flying:
      "Marrakech Menara (RAK) is the only airport, about 6 km from the medina, with direct flights from several UK airports and connections from the US via Europe or Casablanca. Check which airline you are flying, as some budget carriers use different terminals.",
    entry: govUk("Morocco", "morocco"),
  },
  "abu-dhabi": {
    bestTime: "November to March",
    intro: "The UAE’s capital, with the Sheikh Zayed Grand Mosque, Louvre Abu Dhabi and a calmer pace than Dubai.",
    highlights: ["Sheikh Zayed Grand Mosque", "Louvre Abu Dhabi on Saadiyat Island", "The Corniche waterfront"],
    tip: "The Grand Mosque enforces its dress code at the door, so cover arms and legs fully before you go.",
    whenToGo:
      "Winter is the best time for beaches, the Corniche and outdoor sights. From around May to September the heat is intense, so days are spent indoors and in the shade, though hotels are often cheaper. Ramadan changes the pace of the city, and its dates move each year.",
    flying:
      "Zayed International Airport (AUH) is the main airport, about 30 km from the city centre, with nonstop flights from UK airports and several US cities, mainly on Etihad. Dubai International is about a 1 hour 30 minute drive away, so check which airport your fare uses.",
    entry: govUk("United Arab Emirates", "united-arab-emirates"),
  },
};
