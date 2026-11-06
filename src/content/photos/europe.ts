import type { Photo } from "../images";
import { photo } from "./make";

// Batch 22 (5 Nov 2026): photos chosen through the Unsplash search API; subject
// confirmed from each photo's description. Free under the Unsplash License.
export const europePhotos = {
  // London day trips (UI agent)
  londonTripWindsor: photo("photo-1758612102561-7ad1a84d9142", "Windsor Castle’s round tower and walls above green trees", "#8cc0f3", "Just Jus", "onejus"),
  londonTripOxford: photo("photo-1683348902723-9f4e1af775ca", "The domed Radcliffe Camera in the centre of Oxford", "#c0c0d9", "Samuel Isaacs", "sisacreative"),
  londonTripBath: photo("photo-1589806361261-01ee46a61fda", "The green water of the Great Bath at the Roman Baths, Bath", "#262626", "Hulki Okan Tabak", "hulkiokantabak"),

  // Paris (Europe content agent)
  parisIsland: photo("photo-1504896287989-ff1fbde00199", "A tour boat on the Seine by the tip of the Île de la Cité at night", "#262626", "Joe deSousa", "mustangjoe"),
  parisLouvre: photo("photo-1459455356093-6495cff2a2c4", "The glass pyramid in the courtyard of the Louvre", "#c0d9f3", "Irina Lediaeva", "irinalediaeva"),
  parisMontmartre: photo("photo-1623009070764-45002990256e", "The pink café La Maison Rose on a Montmartre street corner", "#f3f3f3", "Bastien Nvs", "bastien_nvs"),
  parisLatinQuarter: photo("photo-1793299574277-bcfa52eb25c2", "The dome of the Panthéon in the Latin Quarter at sunset", "#738ca6", "Thomas K", "thomasthomask"),
  parisSaintGermain: photo("photo-1544609523-3151c608fda7", "Coffee being poured at breakfast in the Café de Flore, Saint-Germain-des-Prés", "#f3f3f3", "Valentin Kremer", "vbk_media"),
  parisMontmartreStreet: photo("photo-1622026450231-aeea3f64c4d7", "Old houses on the cobbled Rue de l’Abreuvoir in Montmartre", "#d9d9d9", "Nathan Staz", "nathanstaz"),
  parisTripVersailles: photo("photo-1776696123518-d0bca6fd6a81", "The Palace of Versailles and its formal parterre gardens", "#c0c0d9", "Howard Walsh", "hswalsh"),
  parisTripGiverny: photo("photo-1569787811498-32f428436f46", "A flower-lined path to Claude Monet’s house in Giverny", "#c0d9f3", "2sometravel", "2sometravel"),
  parisTripFontainebleau: photo("photo-1615046869299-e49fc2a21e29", "The Château de Fontainebleau across the carp pond in summer", "#8ca6d9", "Stefan K", "stefankst"),

  // Rome (Europe content agent)
  romeForum: photo("photo-1626285220266-e35bd313d05b", "Ancient Roman ruins with the Colosseum behind them under a blue sky", "#26738c", "Mauro Grazzi", "mauro_grazzi"),
  romeStPeters: photo("photo-1610655769765-be8a0dd9627a", "St Peter’s Basilica and the obelisk in St Peter’s Square, Vatican City", "#a6d9f3", "Fabio Fistarol", "fabiofistarol"),
  romeTrevi: photo("photo-1583422095309-55daabc9cc78", "The Trevi Fountain and Piazza di Trevi in the morning", "#8ca6f3", "Andrey Omelyanchuk", "ansharimages"),
  romeNavona: photo("photo-1662398885856-cf2ab6e981b2", "Piazza Navona in Rome’s historic centre", "#262626", "Fernando Mola-Davis", "fmoladavis"),
  romeTrastevere: photo("photo-1539285023874-eb2cc9fd5eea", "A vintage Volkswagen Beetle parked on a street in Trastevere", "#262626", "Faruk Kaymak", "fkaymak"),
  romeImperialForums: photo("photo-1612021148925-466704654aeb", "The Imperial Forums at the edge of the Monti district", "#73a6f3", "Massimo Virgilio", "massimovirgilio"),
  romeTripTivoli: photo("photo-1550683402-b269d8d0304f", "Gardens and trees at Villa d’Este in Tivoli", "#26260c", "Diana Horonceanu", "diana_hrn"),
  romeTripFlorence: photo("photo-1687817997684-c9335cce7c5c", "Florence Cathedral’s dome above the city, seen from the Palazzo Vecchio tower", "#73a6d9", "Joseph Quam", "jquam"),
  romeTripOrvieto: photo("photo-1669046027934-8365cbd825a7", "Orvieto Cathedral in the hilltop town of Orvieto", "#8cd9d9", "Danijel Škabić", "silentphocro"),

  // Barcelona (Europe content agent)
  barcelonaCathedral: photo("photo-1788803713653-906ce775eccc", "The Gothic front of Barcelona Cathedral in the Gothic Quarter", "#404040", "Alexander Kaliberda", "kalibermann"),
  barcelonaSagrada: photo("photo-1581514367970-a3d363281b5a", "Stone figures carved on a façade of the Sagrada Família", "#f3d9c0", "Vlad Hilitanu", "vladhilitanu"),
  barcelonaParkGuell: photo("photo-1593368858664-a7fe556ab936", "The mosaic serpentine bench at Park Güell above Barcelona", "#408cf3", "D Jonez", "cooljonez"),
  barcelonaCasaBatllo: photo("photo-1579282240050-352db0a14c21", "The mosaic-tiled front of Casa Batlló on Passeig de Gràcia", "#a6c0d9", "Theodor Vasile", "theodorrr"),
  barcelonaBarceloneta: photo("photo-1573413534184-6aa47a50d3ec", "The sail-shaped W hotel beside the sea at the end of Barceloneta", "#a6c0d9", "Jorge Salvador", "jsshotz"),
  barcelonaTripMontserrat: photo("photo-1642699792139-400fe3fab6ab", "The jagged peaks of Montserrat mountain", "#262626", "Eder Pozo Pérez", "ederpozo"),
  barcelonaTripSitges: photo("photo-1736185669654-9d913450975f", "Waves on the beach at Sitges below its seaside church", "#404040", "Shai Pal", "shaipal"),
  barcelonaTripGirona: photo("photo-1633737669533-bdd9f9889d7e", "Houses along the river in Girona", "#c0d9f3", "Christian Hess Araya", "chessacr"),

  // Lisbon (Europe content agent)
  lisbonComercio: photo("photo-1583917328190-49b66e91bc67", "Praça do Comércio on the riverfront in Lisbon on a sunny day", "#c0c0a6", "Reiseuhu", "reiseuhu"),
  lisbonAlfama: photo("photo-1501927023255-9063be98970c", "Looking out over the rooftops of Alfama, Lisbon", "#d9d9d9", "Liam McKay", "liammckay"),
  lisbonBelemTower: photo("photo-1580128845204-f1478685fa8b", "The Belém Tower on the Tagus riverbank", "#a6c0d9", "Josè Maria Sava", "jose_maria_sava"),
  lisbonBaixa: photo("photo-1548707309-dcebeab9ea9b", "People in Praça do Comércio at the foot of the Baixa", "#d9d9c0", "Claudio Schwarz", "purzlbaum"),
  lisbonBelemSunset: photo("photo-1702560030824-02cf6c4761ef", "The Belém Tower at sunset in autumn", "#8c7373", "Edoardo Bortoli", "edo_bor"),
  lisbonTripSintra: photo("photo-1565865735988-fd5752a02846", "The grey and yellow Pena Palace on a hilltop in Sintra", "#c0c0d9", "Katia De Juan", "katiadejuan"),
  lisbonTripCascais: photo("photo-1587973878097-ef3aabd5eeaa", "Boats off the waterfront and beach at Cascais", "#265973", "Calin Stan", "calinstan"),
  lisbonTripEvora: photo("photo-1693750034188-0ce3b87b17fb", "The columns of the Roman Temple of Évora", "#a6a6a6", "Filipe Nobre", "filipenobre"),

  // Amsterdam (Europe content agent)
  amsterdam: photo("photo-1584003564911-a7a321c84e1c", "Bicycles parked on a bridge over a canal in Amsterdam", "#73c0f3", "Gaurav Jain", "gj098"),
  amsterdamPalace: photo("photo-1612098606612-e9b63793ca22", "The Royal Palace on Dam Square in Amsterdam, with its dome and statues", "#a6c0d9", "Marcos Pena Jr", "marcospenajr"),
  amsterdamRijksmuseum: photo("photo-1589825743636-cd96373c3319", "A fountain in the park with the Rijksmuseum in the background", "#a6c0c0", "Frans Ruiter", "frns"),
  amsterdamCanals: photo("photo-1534351590666-13e3e96b5017", "Boats moored along a tree-lined canal with historic houses in Amsterdam", "#d9d9f3", "Adrien Olichon", "adrienolichon"),
  amsterdamVondelpark: photo("photo-1690201030167-891e88caee09", "A fountain in a pond in Vondelpark, Amsterdam", "#264026", "Martti Salmi", "marttisalmi"),
  amsterdamTripZaanseSchans: photo("photo-1566450653303-2614cbb292ea", "Green wooden houses beside the water at Zaanse Schans", "#595959", "Aswathy N", "abnair"),
  amsterdamTripKeukenhof: photo("photo-1564085027783-a233e0a38b5f", "Orange and pink tulips at Keukenhof", "#a6c0d9", "Jonne Mäkikyrö", "jonnemakikyro"),
  amsterdamTripHaarlem: photo("photo-1604611266776-49dcc7a2b5e4", "Autumn along the water in Haarlem", "#a6d9f3", "Dee.", "marealacris"),
} satisfies Record<string, Photo>;
