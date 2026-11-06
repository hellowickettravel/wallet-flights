import type { Photo } from "../images";
import { photo } from "./make";

// Batch 22 (5 Nov 2026): photos chosen through the Unsplash search API; subject
// confirmed from each photo's description. Free under the Unsplash License.
export const asiaPacificPhotos = {
  // Bali
  baliMonkeyForest: photo("photo-1652451160926-6d0f2bb16cfe", "Long-tailed macaques on a branch in Ubud’s Sacred Monkey Forest", "#26260c", "Ernests Vaga", "ernests"),
  baliTegallalang: photo("photo-1555400038-63f5ba517a47", "Green rice terraces and palm trees at Tegallalang, north of Ubud", "#0c260c", "Niklas Weiss", "treesoftheplanet"),
  baliUluwatu: photo("photo-1636619306699-2d27a100605e", "Sea cliffs and the ocean seen from Uluwatu Temple", "#c0d9f3", "Alexandra Smielova", "sashasmelova"),
  baliBeachClub: photo("photo-1662950267280-0cdf5f7139b4", "People on loungers at a Bali beach club at sunset", "#260c0c", "Hyukjoon Sohn", "niceday31"),
  baliTripNusaPenida: photo("photo-1515932600702-e7937d80ed22", "The headland above Kelingking Beach on Nusa Penida", "#264026", "Wira Setiawan", "wirasetiawan29"),
  baliTripBatur: photo("photo-1672910512203-9c8d99f7e7cd", "Mount Batur volcano wrapped in cloud above green slopes", "#262626", "Catherine Zaidova", "k_zaidova"),
  // Singapore
  singaporeMarinaBay: photo("photo-1525625293386-3f8f99389edd", "Marina Bay Sands across the water at sunset, Singapore", "#262626", "Hu Chen", "huchenme"),
  singaporeChinatown: photo("photo-1536163713675-42cf53cbd4f5", "Chinatown’s low shophouses in front of Singapore’s high-rise towers", "#8cc0d9", "Adrian Jakob", "aj_photo"),
  singaporeBotanic: photo("photo-1693653932177-905cfc6a2cf2", "A white bandstand among tall trees in the Singapore Botanic Gardens", "#404026", "Hongbin", "hbsun2013"),
  singaporeSentosa: photo("photo-1694763746530-266a68710e05", "Palm trees and umbrellas on a sandy beach on Sentosa", "#d9d9d9", "Sohan Rayguru", "sohan_r"),
  singaporeTripUbin: photo("photo-1617015626700-d5abc4702f98", "Green trees beside a lake on Pulau Ubin", "#a6a68c", "Jeremy Kwok", "jxremy"),
  singaporeTripBintan: photo("photo-1736064901830-be730c1f700b", "A blue lake beside pale sand dunes on Bintan", "#a6a6c0", "Xuedi Liu", "liuxuedi"),
  singaporeTripJohor: photo("photo-1687861717577-8ff74dd61a47", "Towers and traffic at the border crossing into Johor Bahru", "#737373", "Ven Jiun (Greg) Chee", "gregchee"),
  // Bangkok
  bangkokGrandPalace: photo("photo-1586098311577-520120ba3df3", "Gold and red roofs of the Grand Palace in Bangkok under a blue sky", "#408cc0", "Sung Shin", "ironstagram"),
  bangkokSkytrain: photo("photo-1655562877074-7d8acce4e8bb", "A BTS Skytrain on its elevated track in Bangkok", "#d9d9d9", "ThaimaaOpas", "thaimaaopas"),
  bangkokRiver: photo("photo-1652023182652-f06936873eb8", "Boats on the Chao Phraya River at sunset, with riverside hotels behind", "#404040", "Flowdzine Creativity", "flowdzine"),
  bangkokTripAyutthaya: photo("photo-1521858771048-e78c3522b57d", "A monk walking up the steps of a ruined temple in Ayutthaya", "#738ca6", "Aaron Thomas", "aaronphs"),
  bangkokTripFloatingMarket: photo("photo-1590118432058-f2744d6897db", "Boats on a narrow canal at Damnoen Saduak floating market", "#262626", "Marek Okon", "marekokon"),
  bangkokTripKanchanaburi: photo("photo-1624806296367-33e24d6162ef", "A bridge over the river at Kanchanaburi under a blue sky", "#8cc0f3", "Hata Life", "hatalife"),
  // Sydney
  sydneyHarbour: photo("photo-1641339325366-d1e98d952c96", "The Sydney Harbour Bridge and Opera House from above", "#262626", "Janice S", "janxce"),
  sydneyBondi: photo("photo-1644193185101-87c7f490be49", "The ocean pool and clubhouse on the rocks at Bondi, seen from above", "#f3f3f3", "Luke White", "dynamite_luke"),
  sydneyFerry: photo("photo-1721517879172-c63da32ab4bb", "A harbour ferry crossing Sydney Harbour", "#a6c0d9", "Dominic Kurniawan Suryaputra", "d_ks11"),
  sydneyTripBlueMountains: photo("photo-1595797128407-ea746eaccb00", "The Three Sisters rock formation in the Blue Mountains", "#404026", "Nicholas Doherty", "nrdoherty"),
  sydneyTripRoyalNationalPark: photo("photo-1645611182597-4fe713acc446", "Sea cliffs and ocean in the Royal National Park", "#0c4073", "Deeva Sood", "deev_s0"),
  sydneyTripHunterValley: photo("photo-1664970925595-90402bf3fbcb", "Vineyard rows in the Hunter region of New South Wales at golden hour", "#26260c", "Arie Oldman", "arizard"),
  // Tokyo
  tokyoSensoji: photo("photo-1673330245973-6f267657731f", "The five-storey pagoda at Senso-ji temple in Asakusa, Tokyo", "#260c0c", "Matt Ketchum", "mkultraman"),
  tokyoShibuya: photo("photo-1573456373835-579c408de263", "Shibuya Crossing seen from above, with crowds crossing in every direction", "#262626", "Denys Nevozhai", "dnevozhai"),
  tokyoShinjuku: photo("photo-1608874973445-de098faf870f", "Neon signs over a rainy street in Shinjuku at night", "#402626", "Marek Okon", "marekokon"),
  tokyoMarket: photo("photo-1590582917892-a6e11d1b32bc", "People queueing at a food stall in a Tokyo market street", "#262626", "Michael Wu", "michael_w1"),
  tokyoTripKamakura: photo("photo-1703159506204-90a456211c20", "A seaside street in Kamakura with people walking by the ocean", "#c0a68c", "Bo Zhang", "bozh_ntu"),
  tokyoTripHakone: photo("photo-1785486049654-870551e02cb0", "Mount Fuji behind forested hills, a lake and a red torii gate", "#8cc0d9", "Evgeni Gitlits", "egitlits"),
  tokyoTripNikko: photo("photo-1680957009417-2bc4bede47b2", "The red Shinkyo bridge over the river in Nikko", "#f3f3f3", "Deepavali Gaind", "deepavalig"),
} satisfies Record<string, Photo>;
