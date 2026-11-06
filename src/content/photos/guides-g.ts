import type { Photo } from "../images";
import { photo } from "./make";

// Batch G (6 Nov 2026): photos chosen through the Unsplash search API; subject
// confirmed from each photo's description. Free under the Unsplash License.
export const guidesGPhotos = {
  // "passport with many travel stamps": an open passport with ink stamps on a table.
  guideVisaCheck: photo("photo-1655722725332-9925c96dd627", "An open passport with numerous ink stamps on its pages, lying on a table", "#404040", "Global Residence Index", "globalresidenceindex"),
  // "Ready for take off. Passport ready": a passport and a boarding pass on a bag.
  guideTicketName: photo("photo-1586441133374-ed1cb4007a47", "A passport and a boarding pass resting on a bag", "#0c2626", "CardMapr.nl", "cardmapr"),
  // Photo description (Japanese): Narita Airport Terminal 1. Loose match for "changing a booking": a terminal with departure screens.
  guideChangeCancel: photo("photo-1725111503165-2f9f0db0f55d", "An airport terminal lined with electronic flight information screens at Narita Airport", "#262626", "David", "ludavid"),
  // "Manila-Sydney Flight via Cebu Pacific": empty airplane seats in a row.
  guideSeatFees: photo("photo-1776662326955-837651a27d26", "Rows of empty seats in the cabin of a passenger plane", "#737373", "Brian Kairuz", "briankairuz"),
} satisfies Record<string, Photo>;
