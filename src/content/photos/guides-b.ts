import type { Photo } from "../images";
import { photo } from "./make";

// Batch 22 (5 Nov 2026): photos chosen through the Unsplash search API; subject
// confirmed from each photo's description. Free under the Unsplash License.
export const guidesBPhotos = {
  // "plane window": a traveller's view on a first trip alone, heading to Japan.
  guideLongHaul: photo("photo-1542776488-a3bbacfcdccd", "View of the sky through an aeroplane window at the start of a long flight", "#260c0c", "Lex Sirikiat", "pundalex"),
  // "Sunrise onboard an airplane."
  guideJetLag: photo("photo-1692796225783-2923440dff19", "Sunrise seen through an aeroplane window during a flight", "#262626", "Stephen Mease", "smeasevt"),
  // "a row of empty seats in an airplane" (Garuda Indonesia Boeing 737-800).
  guideBestSeat: photo("photo-1641447093043-241f064568fb", "A row of empty economy seats inside a passenger plane", "#c0c0c0", "Mohammad Arrahmanur", "arrahmanur"),
  // "Silhouetted mother holding her baby while gazing out an airplane window".
  guideFlyingWithChildren: photo("photo-1772033360039-62e7c77fa0b1", "A mother holding her baby and looking out of an aeroplane window", "#262626", "park ingyeom", "ingyeom_park"),
  // "Modern airport lounge with rows of seats".
  guideLoungeAccess: photo("photo-1769454625177-b031788425da", "Rows of seats in a modern airport lounge", "#262626", "daniel mironov", "cheesy_daniel"),
} satisfies Record<string, Photo>;
