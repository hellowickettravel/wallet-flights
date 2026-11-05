import type { Photo } from "../images";
import { photo } from "./make";

// Batch 22 (5 Nov 2026): photos chosen through the Unsplash search API; subject
// confirmed from each photo's description. Free under the Unsplash License.
export const europePhotos = {
  // London day trips (UI agent)
  londonTripWindsor: photo("photo-1758612102561-7ad1a84d9142", "Windsor Castle’s round tower and walls above green trees", "#8cc0f3", "Just Jus", "onejus"),
  londonTripOxford: photo("photo-1683348902723-9f4e1af775ca", "The domed Radcliffe Camera in the centre of Oxford", "#c0c0d9", "Samuel Isaacs", "sisacreative"),
  londonTripBath: photo("photo-1589806361261-01ee46a61fda", "The green water of the Great Bath at the Roman Baths, Bath", "#262626", "Hulki Okan Tabak", "hulkiokantabak"),
} satisfies Record<string, Photo>;
