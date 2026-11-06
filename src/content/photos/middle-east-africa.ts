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
  // Istanbul
  istanbulHagiaSophia: photo("photo-1623621534850-d325a1980c7e", "Hagia Sophia's great dome and minarets in Sultanahmet, Istanbul", "#a6c0c0", "Lewis J Goetz", "lgoetz"),
  istanbulGalataBridge: photo("photo-1613221350942-c0831690fbd0", "People fishing from the Galata Bridge over the Golden Horn, Istanbul", "#d9d9d9", "Andrea Leopardi", "whatyouhide"),
  istanbulDolmabahce: photo("photo-1739524318403-05fe79333d25", "The gate and clock tower of Dolmabahçe Palace, Istanbul", "#c0a68c", "Georgii Eletskikh", "elegeo"),
  istanbulBlueMosque: photo("photo-1586871818843-dbce27eaf410", "The Blue Mosque's domes and minarets in Sultanahmet, Istanbul", "#26260c", "Hans-Jürgen Weinhardt", "hansjuergen"),
  istanbulGalata: photo("photo-1524231757912-21f4fe3a7200", "The Galata Tower above the rooftops of Beyoğlu, Istanbul", "#a6a6a6", "Anna Berdnik", "aberdni"),
  istanbulKadikoy: photo("photo-1792910989995-ac9b83475616", "People on the pier at Moda İskelesi in Kadıköy, Istanbul", "#26260c", "Kiril Peychev", "kpchv"),
  istanbulTripBuyukada: photo("photo-1612044713264-215a17d17b4c", "White wooden houses among trees on Büyükada, the largest of the Princes’ Islands", "#0c260c", "Hulki Okan Tabak", "hulkiokantabak"),
  istanbulTripBursa: photo("photo-1647122290875-da414489148b", "Bursa's rooftops below snow on Uludağ", "#a6c0c0", "Danil Ahmetşah", "ahmetdaar"),
  istanbulTripBosphorus: photo("photo-1789933830619-2cc4bdc37eca", "Boats below Anadoluhisarı fortress on the Bosphorus shore, Istanbul", "#595959", "M K", "mateokartuzzo1"),
  // Cairo
  cairoSphinx: photo("photo-1562679299-266edbefd6d7", "The Great Sphinx at Giza", "#d9d9d9", "Adrian Dascal", "dascal"),
  cairoCitadel: photo("photo-1710659765212-835adf573927", "The domed Mosque of Muhammad Ali in the Cairo Citadel", "#598cc0", "Dilip Poddar", "dilip_28"),
  cairoMuseumHall: photo("photo-1710659077496-56e21148f7fb", "Ancient statues inside the Egyptian Museum, Cairo", "#8c7340", "Dilip Poddar", "dilip_28"),
  cairoMuseum: photo("photo-1707068226685-27a15039f19b", "The front of the Egyptian Museum on Tahrir Square, Cairo", "#d9d9d9", "Dilip Poddar", "dilip_28"),
  cairoZamalek: photo("photo-1719659018185-8a239c35fb4a", "A felucca on the Nile below the Cairo Tower on Zamalek island", "#8ca6c0", "Hatem Ramadan", "canismajoris"),
  cairoTripSaqqara: photo("photo-1636020895075-5e598638375e", "The Step Pyramid of Djoser at Saqqara", "#a68c73", "Dmitrii Zhodzishskii", "dmitrii_zhodzishskii"),
  cairoTripDahshur: photo("photo-1632836471674-28a2d2b132a2", "The Bent Pyramid at Dahshur in the desert", "#738cc0", "Dmitrii Zhodzishskii", "dmitrii_zhodzishskii"),
  cairoTripAlexandria: photo("photo-1610131042652-42d6f3754c51", "The Citadel of Qaitbay on the Mediterranean shore in Alexandria", "#f3d9c0", "Farah Samy", "farahgsamy"),
} satisfies Record<string, Photo>;
