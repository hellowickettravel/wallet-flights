import type { Photo } from "../images";
import { photo } from "./make";

// Batch 22 (5 Nov 2026): photos chosen through the Unsplash search API; subject
// confirmed from each photo's description. Free under the Unsplash License.
export const guidesAPhotos = {
  // "Departure board in airport - Brisbane, Australia."
  guideLastMinute: photo("photo-1664190426381-5f2cf0ea4ef4", "Travellers under an airport departures board listing the next flights", "#c0c0c0", "Joseph Bobadilla", "josephbobadilla"),
  // "Monthly schedule": an open monthly planner.
  guideCheapestDay: photo("photo-1435527173128-983b87201f4d", "An open monthly planner on a wooden desk, ready for choosing travel dates", "#c0c0c0", "Eric Rothermel", "erothermel"),
  // "Modern airport terminal walkway with moving sidewalk and traveller in motion."
  guideDirectConnecting: photo("photo-1563809717488-286f78e5c3e2", "A moving walkway in an airport terminal, the route between gates on a connection", "#404040", "Eric Prouzet", "eprouzet"),
  // "Andante airline-approved carry-on (blue)."
  guideBasicEconomy: photo("photo-1670888664952-efff442ec0d2", "A blue cabin-size suitcase standing on a wooden floor", "#a6a6a6", "American Green Travel", "americangreentravel"),
  // "Person holding smartphone with earth wallpaper on escalator."
  guidePriceAlerts: photo("photo-1755659469467-ddaf0654f2ba", "A traveller holding a smartphone while riding an escalator", "#f3f3f3", "Hongwei FAN", "yokonoito0512"),
} satisfies Record<string, Photo>;
