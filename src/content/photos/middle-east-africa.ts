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
  // TODO(confirm): abuDhabiLouvre, abuDhabiCorniche, abuDhabiQasrAlWatan and abuDhabiYas matched their searches but carry no caption naming the place
  abuDhabiLouvre: photo("photo-1587421890935-5fb13a3beccc", "The white domed museum buildings of Louvre Abu Dhabi beside the water", "#d9f3f3", "Nazar Skalatsky", "skltsk"),
  abuDhabiCorniche: photo("photo-1769160853964-402d56a943b3", "Skyscrapers rising above the sea on the Abu Dhabi waterfront", "#0c59a6", "raghul ayyasamy", "raghul_ayyasamy"),
  abuDhabiQasrAlWatan: photo("photo-1720754096019-d4330e022d97", "A palace hall with a domed ceiling and a chandelier in Abu Dhabi", "#c08c59", "Alex", "junypr"),
  abuDhabiYas: photo("photo-1685909201292-d86e15a63a1b", "Sunset over the city and water on the Abu Dhabi coast", "#a6a6c0", "Gamze Teoman", "gamzeteoman"),
  abuDhabiDesert: photo("photo-1510479524860-95998e54a8c6", "A vehicle on the desert sands near Abu Dhabi", "#d9d9d9", "Jakub David", "jadav"),
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
  // Cape Town (TODO(confirm): capeTownCityBowl, capeTownCampsBay, capeTownTripFranschhoek and capeTownTripHermanus matched their search but carry no caption naming the place)
  capeTownCableCar: photo("photo-1751473681036-fa181075d22d", "The Table Mountain Aerial Cableway climbing the cliff face above Cape Town", "#262626", "Asher Pardey", "asherpardey"),
  capeTownBoulders: photo("photo-1496497243327-9dccd845c35f", "African penguins on the shore among boulders at Boulders Beach", "#d9c0c0", "Casey Allen", "westbeach013"),
  capeTownRobbenIsland: photo("photo-1661112483600-bf3485542ec7", "The entrance to the Maximum Security Prison on Robben Island", "#4073a6", "Moheen Reeyad", "moheenreeyad"),
  capeTownCityBowl: photo("photo-1733886870851-82f45e3fad3c", "A city street below the mountain in Cape Town's city centre", "#737373", "Anil Baki Durmus", "anldrms"),
  capeTownCampsBay: photo("photo-1712952825210-e2ea2535c9ae", "A beach below the mountains at Camps Bay, Cape Town", "#0c73c0", "Diana Krotova", "redpuma"),
  capeTownTripStellenbosch: photo("photo-1706700700231-91a762a35531", "Vineyard rows with mountains behind at Stellenbosch", "#a6c0c0", "Ben", "bengerber05"),
  capeTownTripFranschhoek: photo("photo-1730793371246-6b755066e9d8", "A valley town below a mountain range in the Franschhoek area", "#59738c", "Sheila C", "qld_traveller"),
  capeTownTripHermanus: photo("photo-1716899976949-ee2eb4a0d4d1", "Ocean and rocky coastline on the Western Cape near Hermanus", "#73a6d9", "Spekboom", "spekboom"),
  // Marrakech (TODO(confirm): marrakechBahia, marrakechRooftops, marrakechRiad and marrakechTripAtlas matched their searches but carry no caption naming the place)
  marrakech: photo("photo-1597212618440-806262de4f6b", "The Koutoubia Mosque minaret rising above Marrakech with the Atlas Mountains behind", "#8cc0d9", "Paul Macallan", "pemacallan"),
  marrakechBahia: photo("photo-1580814488128-5880a40726be", "A palace building under a blue sky in the Marrakech medina", "#59a6d9", "Abdelhamid Azoui", "abdelhamid_az"),
  marrakechJemaa: photo("photo-1587974928442-77dc3e0dba72", "People walking through the Jemaa el-Fna market square in Marrakech", "#f3d9a6", "CALIN STAN", "calinstan"),
  marrakechMajorelle: photo("photo-1773501934878-104c1e234ba0", "Blue and pink buildings reflected in the lily pond at Jardin Majorelle", "#f3f3f3", "Val Vesa", "adspedia"),
  marrakechRooftops: photo("photo-1675782357250-8329a7677819", "Rooftops and market umbrellas across the Marrakech medina", "#a6c0d9", "Danai Tsoutreli", "danaetsoutreli"),
  marrakechRiad: photo("photo-1624804823268-7d5454caa8c8", "Palm trees by a riad swimming pool in Marrakech", "#595959", "rigel", "rigels"),
  marrakechTripEssaouira: photo("photo-1786973511015-74157f822096", "The old walls of Essaouira above the foggy seafront", "#a68c8c", "Ousseynou Cissé", "frenchouze"),
  marrakechTripOuzoud: photo("photo-1683028094236-7e5655c6607b", "Macaques in front of the Ouzoud waterfalls", "#735940", "Danai Tsoutreli", "danaetsoutreli"),
  marrakechTripAtlas: photo("photo-1624802294472-4dc449c1c127", "Green trees and brown mountains in the High Atlas near Marrakech", "#d9d9d9", "rigel", "rigels"),
} satisfies Record<string, Photo>;
