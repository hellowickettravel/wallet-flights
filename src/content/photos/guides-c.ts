import type { Photo } from "../images";
import { photo } from "./make";

// Batch 22 (5 Nov 2026): photos chosen through the Unsplash search API; subject
// confirmed from each photo's description. Free under the Unsplash License.
export const guidesCPhotos = {
  // "A Virgin Atlantic Airbus A350-1000 at John F. Kennedy Airport during sunrise"
  guideNewYorkAirports: photo("photo-1671756251742-32f55cda598f", "A Virgin Atlantic Airbus A350 on the tarmac at JFK Airport, New York, at sunrise", "#404040", "H. Kamran", "hkamran"),
  // "Several suitcases and bags are visible on a conveyor belt" in an airport baggage handling system
  guideCheckedBaggage: photo("photo-1762965119363-af950b523dca", "Suitcases and bags moving along an airport baggage conveyor belt", "#8c8c8c", "Alexander Schimmeck", "alschim"),
  // "Airport baggage claim area with moving conveyor belt and flight information display"
  guideLostLuggage: photo("photo-1702411739431-0b6874405792", "A luggage carousel in an airport baggage claim hall, with a flight information screen", "#262626", "Eric Prouzet", "eprouzet"),
  // "Passengers boarding a Jetstar airplane on the tarmac"
  guideDeniedBoarding: photo("photo-1766216397206-39b277a00522", "Passengers walking across the tarmac to board a plane", "#c0c0d9", "You Le", "le_y0u"),
  // "A hand holding two United States passports with airline boarding passes tucked inside"
  guidePassportValidity: photo("photo-1655722724447-2d2a3071e7f8", "A hand holding two passports with boarding passes tucked inside", "#737373", "Global Residence Index", "globalresidenceindex"),
} satisfies Record<string, Photo>;
