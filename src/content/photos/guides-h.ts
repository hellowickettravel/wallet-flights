import type { Photo } from "../images";
import { photo } from "./make";

// Batch H (6 Nov 2026): photos chosen through the Unsplash search API; subject
// confirmed from each photo's description. Free under the Unsplash License.
export const guidesHPhotos = {
  // "Ready for take off. Passport ready": a passport and a boarding pass on a bag.
  guideOnlineCheckIn: photo("photo-1586441133374-ed1cb4007a47", "A passport and a boarding pass resting on a bag, ready for check-in", "#0c2626", "CardMapr.nl", "cardmapr"),
  // "Took this during one of my trips to the Lofoten islands": a wing over white clouds.
  guideFlightTimes: photo("photo-1593182440709-4b7b56482c55", "An aeroplane wing above a layer of white cloud in daylight", "#c0c0c0", "Johny Goerend", "johnygoerend"),
  // "Editorial image of Delta, Etihad, and Singapore Airlines aircraft on the apron at JFK Airport"
  guideAlliancesCodeshare: photo("photo-1746475997690-dc2de4e19f69", "Aircraft from several different airlines parked on the apron at New York JFK", "#0c2640", "Lumin Osity", "lumin_osity"),
  // "Prescription drugs on an orange background with a pill bottle. Orange pills." Loose match: a medicine photo, not a travel scene.
  guideFlyingMedication: photo("photo-1587854692152-cbe660dbde88", "A pill bottle and orange pills on an orange background", "#f3a659", "Christina Victoria Craft", "victoriabcphotographer"),
} satisfies Record<string, Photo>;
