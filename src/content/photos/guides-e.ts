import type { Photo } from "../images";
import { photo } from "./make";

// Batch E (6 Nov 2026): photos chosen through the Unsplash search API; subject
// confirmed from each photo's description. Free under the Unsplash License.
export const guidesEPhotos = {
  // "Airport terminal departures hall passengers walking blue flight timetable board…"
  guideHiddenCity: photo("photo-1787839137485-da1cc270d970", "Passengers walking through a busy airport terminal beneath flight departure boards", "#404040", "Jakub Żerdzicki", "jakubzerdzicki"),
  // Loose match. "Woman at Gatwick Airport South Terminal arrivals on the phone": a traveller on the phone beside a flight board.
  guideErrorFares: photo("photo-1772466104938-d9e6b6197cdb", "A woman on the phone in front of a flight information board at Gatwick Airport’s South Terminal", "#73d9f3", "Holiday Extras", "holidayextras"),
  // "passenger airplane landing at night with its landing lights illuminated against a dark sky"
  guideRedEye: photo("photo-1792265480285-aa7c553b4a2c", "A passenger aeroplane landing at night with its landing lights on against a dark sky", "#0c2640", "Alexander Gluschenko", "gluschenko"),
  // "A hand holding two United States passports with airline boarding passes tucked inside"
  guideOneWay: photo("photo-1655722724447-2d2a3071e7f8", "A hand holding two passports with airline boarding passes tucked inside", "#737373", "Global Residence Index", "globalresidenceindex"),
} satisfies Record<string, Photo>;
