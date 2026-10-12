// Every photo on the site is listed here so it can be audited, swapped or
// self-hosted in one place. All are from Unsplash (free to use under the
// Unsplash License). `tone` is the colour shown while the photo loads or if
// it fails, so a tile never renders as an empty box.
// TODO(verify): confirm each photo visually once the build environment can
// reach images.unsplash.com, then download into /public/photos.

export type Photo = { id: string; alt: string; tone: string };

const p = (id: string, alt: string, tone: string): Photo => ({ id, alt, tone });

export const photos = {
  hero: p("photo-1436491865332-7a61a109cc05", "Aircraft wing above the clouds at sunset", "#5a6f96"),
  traveller: p("photo-1530521954074-e64f6810b32d", "Traveller with a suitcase in an airport terminal", "#7d8796"),
  about: p("photo-1500835556837-99ac94a94552", "View of the wing from an aircraft window", "#6f86a6"),

  london: p("photo-1513635269975-59663e0ac1ad", "Big Ben and Westminster Bridge in London", "#5d6c7f"),
  paris: p("photo-1502602898657-3e91760cbb34", "The Eiffel Tower over Paris rooftops", "#8297b5"),
  rome: p("photo-1552832230-c0197dd311b5", "The Colosseum in Rome", "#b38a5e"),
  barcelona: p("photo-1583422409516-2895a77efded", "Sagrada Família in Barcelona", "#8f8070"),
  lisbon: p("photo-1585208798174-6cedd86e019a", "Yellow tram on a Lisbon street", "#c29a54"),

  tokyo: p("photo-1540959733332-eab4deabeeaf", "Tokyo street lit up at night", "#3c3555"),
  bali: p("photo-1537996194471-e657df975ab4", "Temple gate in Bali", "#5d7a55"),
  singapore: p("photo-1525625293386-3f8f99389edd", "Marina Bay skyline in Singapore", "#3d5a80"),
  bangkok: p("photo-1508009603885-50cf7c579365", "Temple roofs in Bangkok", "#a3753d"),
  sydney: p("photo-1506973035872-a4ec16b8e8d9", "Sydney Opera House across the harbour", "#5b88b5"),

  dubai: p("photo-1512453979798-5ea266f8880c", "Dubai skyline with the Burj Khalifa", "#9a8b78"),
  istanbul: p("photo-1524231757912-21f4fe3a7200", "Mosque domes on the Istanbul skyline", "#7d6c86"),
  cairo: p("photo-1572252009286-268acec5ca0a", "Pyramids of Giza near Cairo", "#c09a63"),
  capeTown: p("photo-1580060839134-75a5edca2e99", "Table Mountain above Cape Town", "#5f86a8"),
  delhi: p("photo-1564507592333-c60657eea523", "The Taj Mahal at sunrise", "#c7a487"),

  newYork: p("photo-1496442226666-8d4d0e62e6e9", "Manhattan skyline in New York", "#5a6b80"),
  cancun: p("photo-1507525428034-b723cf961d3e", "Turquoise water on a white-sand beach", "#4aa3b5"),
  rio: p("photo-1483729558449-99ef09a8c325", "Rio de Janeiro from above", "#4c7d6b"),
  mexicoCity: p("photo-1518105779142-d975f22f1b0a", "Palacio de Bellas Artes in Mexico City", "#8e7b6a"),
  cusco: p("photo-1526392060635-9d6019884377", "Machu Picchu above the clouds", "#5f7d5c"),

  guidePlanning: p("photo-1488646953014-85cb44e25828", "Map, camera and passport laid out for trip planning", "#a8907a"),
  guideAlps: p("photo-1476514525535-07fb3b4ae5f1", "Alpine lake below mountains", "#4f7b8a"),
  guideRoad: p("photo-1469854523086-cc02fe5d8800", "Van on an open desert road", "#a0815e"),
} satisfies Record<string, Photo>;

export function unsplashUrl(id: string, width: number, quality = 72) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}
