import type { Photo } from "../images";
import { photo } from "./make";

// Batch 22 (5 Nov 2026): photos chosen through the Unsplash search API; subject
// confirmed from each photo's description. Free under the Unsplash License.
export const middleEastAfricaPhotos = {
  // Dubai
  dubaiAbra: photo("photo-1584674599624-1dc7fb3cdfd3", "Wooden boats moored on Dubai Creek in Old Dubai", "#f3f3f3", "Karthik Thoguluva", "karthikhimself"),
  dubaiFountain: photo("photo-1550686164-6f282d49c63c", "The Dubai Fountain lit up at night below the Downtown towers", "#8c590c", "Anthony Espinosa", "thony_espi"),
  dubaiDesert: photo("photo-1638024510305-c36fcc0bf3b1", "Sand dunes in the Lahbab desert outside Dubai", "#d98c59", "Haris khan", "hariskhan488"),
  dubaiDowntown: photo("photo-1640953036047-5566900ea05d", "The Burj Khalifa above Downtown Dubai at night", "#262626", "Soran Ali", "soooran"),
  dubaiMarina: photo("photo-1624317938116-5050f2b0965c", "Dubai Marina towers across the water", "#0ca6c0", "Kevin JD", "kevinjd123"),
  dubaiAlSeef: photo("photo-1786288610249-251daadada13", "Old-style sand-coloured buildings at Al Seef on Dubai Creek", "#f3f3f3", "Dilip Poddar", "dilip_28"),
  dubaiHatta: photo("photo-1714379270163-8a9832bba0aa", "Hatta Dam among the Hajar Mountains", "#f3f3f3", "sohel yousuf", "thesohelyousuf"),
  dubaiTripAbuDhabi: photo("photo-1612207644086-243779ab1013", "The domes of the Sheikh Zayed Grand Mosque in Abu Dhabi", "#0c598c", "Nick Fewings", "jannerboy62"),
  dubaiSharjah: photo("photo-1601463723526-556bf269db77", "Sharjah's grand mosque under a blue sky", "#598cc0", "Saj Shafique", "saj_shafique"),

  // Abu Dhabi
  abuDhabi: photo("photo-1512632578888-169bbbc64f33", "The Sheikh Zayed Grand Mosque reflected in a pool at low sun, Abu Dhabi", "#262626", "David Rodrigo", "david__r"),
  abuDhabiMosque: photo("photo-1619729239841-d7354ebf9bb3", "White domes of the Sheikh Zayed Grand Mosque reflected in its marble courtyard", "#0c408c", "Nick Fewings", "jannerboy62"),
} satisfies Record<string, Photo>;
