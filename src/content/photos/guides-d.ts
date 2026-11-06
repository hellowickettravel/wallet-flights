import type { Photo } from "../images";
import { photo } from "./make";

// Batch 22 (5 Nov 2026): photos chosen through the Unsplash search API; subject
// confirmed from each photo's description. Free under the Unsplash License.
export const guidesDPhotos = {
  // "Flying over the Alps": an airplane wing over snow-capped mountain peaks.
  guideEuropeCheapest: photo("photo-1788013121627-3018ab8779b4", "An aeroplane wing with a red winglet above snow-capped Alpine peaks", "#c0c0c0", "Hasmik Ghazaryan Olson", "find_something_pretty_everyday"),
  // "Playa de las Conchas, Isla de la Graciosa (Lanzarote). Islas Canarias España."
  guideWinterSun: photo("photo-1598352103642-3e539caaecd3", "Waves rolling onto the sandy Playa de las Conchas on La Graciosa in the Canary Islands", "#8ca6c0", "Jorge Fernández Salas", "jorgefdezsalas"),
  // "Sunset in Ha Long Bay, Vietnam"
  guideSoutheastAsia: photo("photo-1668000018482-a02acf02b22a", "Boats on the water at sunset with the limestone islands of Ha Long Bay behind", "#26260c", "Fuu J", "fuuj"),
  // "Doha QATAR": a city skyline by the water, a common long-connection stop.
  guideStopover: photo("photo-1662050196100-6f8afc83d585", "The Doha skyline across the water, a city many travellers stop over in", "#c0c0d9", "Rhiannon Elliott", "rhiannonelliott"),
  // "Emirates Boeing 777 in Park Position at Dubai International Airport"
  guideDubaiRules: photo("photo-1690313758173-729edb720708", "A wide-body jet parked on the apron at Dubai International Airport", "#c0c0c0", "Alireza Akhlaghi", "alirezaakhlaghiofficial"),
} satisfies Record<string, Photo>;
