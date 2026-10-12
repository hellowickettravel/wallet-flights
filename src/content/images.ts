// Every photo on the site, chosen through the Unsplash search API (subject
// confirmed from each photo's description) and free to use under the Unsplash
// License. `tone` is Unsplash's dominant colour for the photo: it shows while
// the photo loads, or if it fails, so a slot never renders empty.
// `by` / `user` feed the photo credits page, as Unsplash's API guidelines ask.

export type Photo = { id: string; alt: string; tone: string; by: string; user: string };

const p = (id: string, alt: string, tone: string, by: string, user: string): Photo => ({ id, alt, tone, by, user });

export const photos = {
  hero: p("photo-1631742272329-eeca83cb6886", "The sun setting over the clouds, seen from an airplane", "#3a1f22", "Noorulabdeen Ahmad", "noorulabdeen"),
  about: p("photo-1543797414-a0c3ad076f7c", "Looking out of an airplane window", "#4073a6", "@felirbe", "felirbe"),
  traveller: p("photo-1574202141112-c3a90e1a3ce2", "Traveller walking through an airport with a black suitcase", "#9aa3ad", "Tim Mossholder", "timmossholder"),

  london: p("photo-1681407979872-0a4cbde28391", "Big Ben and the Houses of Parliament on the Thames, London", "#7e95ad", "Jacob Diehl", "jacob_diehl_film"),
  paris: p("photo-1502602898657-3e91760cbb34", "The Eiffel Tower above Paris", "#a99393", "Chris Karidis", "chriskaridis"),
  rome: p("photo-1552832230-c0197dd311b5", "The Colosseum in Rome at blue hour", "#4f8fbf", "David Köhler", "davidkhlr"),
  barcelona: p("photo-1583422409516-2895a77efded", "Aerial view of Barcelona's city blocks", "#735959", "Logan Armstrong", "loganstrongarms"),
  lisbon: p("photo-1599069158346-684fee0e414a", "Yellow tram on the Elevador da Bica in Lisbon", "#b8a46a", "André Lergier", "andrelergier"),

  tokyo: p("photo-1542051841857-5f90071e7989", "Neon-lit Shibuya crossing in Tokyo at night", "#0c5973", "Jezael Melgoza", "jezar"),
  bali: p("photo-1711609110590-5ad5c4599e56", "Pura Ulun Danu Bratan temple on a lake in Bali at golden hour", "#a98f8f", "Katarzyna Zygnerska", "katasha"),
  singapore: p("photo-1620033263019-f2ec2c738a60", "Boat on the water by Singapore's skyline", "#405959", "Danny de Groot", "dannydegroot"),
  bangkok: p("photo-1563492065599-3520f775eeed", "Ornate temple roofs in Bangkok", "#0a8aa0", "Alejandro Cartagena", "cartayen"),
  sydney: p("photo-1523428096881-5bd79d043006", "Sydney Opera House and Harbour Bridge", "#6c87a3", "April Pethybridge", "apriiil"),

  dubai: p("photo-1512453979798-5ea266f8880c", "Burj Khalifa above Downtown Dubai at sunrise", "#3a3a3a", "David Rodrigo", "david__r"),
  istanbul: p("photo-1589561454226-796a8aa89b05", "Ferry crossing the Bosphorus by Eminönü, Istanbul", "#7f9a9a", "Engin Yapici", "yapici"),
  cairo: p("photo-1503177119275-0aa32b3a9368", "The Pyramid of Khafre at Giza", "#c4a97e", "Jeremy Bishop", "jeremybishop"),
  capeTown: p("photo-1588455471455-4b28e9ab3cd5", "Table Mountain above the water in Cape Town at sunset", "#735959", "Jaman Asad", "asadsnapper"),
  delhi: p("photo-1564507592333-c60657eea523", "The Taj Mahal in Agra", "#40a6c0", "Jovyn Chamb", "jovynchamb"),

  newYork: p("photo-1496588152823-86ff7695e68f", "Brooklyn Bridge with Manhattan in the distance", "#3a3a3a", "Luca Bravo", "lucabravo"),
  cancun: p("photo-1602088113235-229c19758e9f", "Beach umbrellas on a white-sand beach by turquoise water", "#6fa3bd", "David Vives", "davidvives"),
  rio: p("photo-1483729558449-99ef09a8c325", "Rio de Janeiro from above at sunset", "#b19a8a", "Agustin Diaz Gargiulo", "agustindiazg"),
  mexicoCity: p("photo-1547686669-9a8cb1a22d91", "Aerial view of the Palacio de Bellas Artes dome, Mexico City", "#0c73a6", "Carlos Aguilar", "carlosaguilar"),
  cusco: p("photo-1526392060635-9d6019884377", "Machu Picchu among misty mountains", "#a98f8f", "Willian Justen de Vasconcellos", "willianjusten"),

  guidePlanning: p("photo-1578894381163-e72c17f2d45f", "Camera and passport laid out before a trip", "#9a9a9a", "Charlotte Noelle", "charlottenoelle_"),
  guideEurope: p("photo-1467269204594-9661b134dd2b", "Spring flowers on a railing in a European old town", "#9ab8b8", "Roman Kraft", "iamromankraft"),
  guideCarryOn: p("photo-1526857240824-92be52581d9b", "Clothes and shoes packed in a suitcase", "#8ca6c0", "Arnel Hasanovic", "arnelhasanovic"),
} satisfies Record<string, Photo>;

export function unsplashUrl(id: string, width: number, quality = 72) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

const UTM = "utm_source=wallet_flights&utm_medium=referral";
export const photographerUrl = (user: string) => `https://unsplash.com/@${user}?${UTM}`;
export const unsplashHomeUrl = `https://unsplash.com/?${UTM}`;
