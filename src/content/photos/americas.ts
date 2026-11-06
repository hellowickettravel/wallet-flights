import type { Photo } from "../images";
import { photo } from "./make";

// Batch 22 (5 Nov 2026): photos chosen through the Unsplash search API; subject
// confirmed from each photo's description. Free under the Unsplash License.
export const americasPhotos = {
  // Cancún
  cancunHotelZone: photo("photo-1510097467424-192d713fd8b2", "Hotels along the Cancún coast and its turquoise sea from the air", "#0c7373", "Gerson Repreza", "gersonrepreza"),
  cancunIslaMujeres: photo("photo-1612550467658-97cb7b05043a", "Sun loungers on a beach club at Isla Mujeres", "#f3f3f3", "Jose Vazquez", "jess33mx"),
  cancunChichenItza: photo("photo-1568402102990-bc541580b59f", "The El Castillo pyramid at Chichén Itzá under a blue sky", "#a6c0c0", "Alex Azabache", "alexazabache"),
  cancunTulumBeach: photo("photo-1568548634530-38ee433dcc1b", "The Mayan site of Tulum above a Caribbean beach", "#0c8c8c", "Tanja Cotoaga", "tarafuco"),
  cancunTripChichen: photo("photo-1518638150340-f706e86654de", "The stepped pyramid at Chichén Itzá on a sunny day", "#73a6d9", "Marv Watson", "mrvphotography"),
  cancunTripTulum: photo("photo-1617220361167-9d556b850824", "Stone ruins of Tulum on the cliff above the sea", "#a6c0d9", "Kaan Kosemen", "kaankosemen"),
  cancunTripCenote: photo("photo-1613096108760-7cff29fceb15", "A swimmer standing on rocks in Cenote Oxman near Valladolid", "#262626", "The Free Birds", "thefreebirds"),

  // Rio de Janeiro
  rioChrist: photo("photo-1564659907532-6b5f98c8e70f", "Christ the Redeemer on Corcovado in silhouette above glowing clouds", "#f3d9c0", "Andrea Leopardi", "whatyouhide"),
  rioCopacabana: photo("photo-1763110805509-8599c138eeff", "Copacabana Beach curving round a blue bay beside the Rio skyline", "#0c73a6", "Shai Pal", "shaipal"),
  rioSugarloafView: photo("photo-1516834611397-8d633eaec5d0", "Corcovado and the bay at sunset, seen from Sugarloaf Mountain", "#f3f3f3", "Agustin Diaz Gargiulo", "agustindiazg"),
  rioTripPetropolis: photo("photo-1617367140853-95aacc56d56d", "The Gothic cathedral of São Pedro de Alcântara in Petrópolis", "#8ca6c0", "Samuel Nascimento da Silva", "samuelfgt"),
  rioTripNiteroi: photo("photo-1588313568029-5bd7c69cda92", "The saucer-shaped Niterói Contemporary Art Museum under a blue sky", "#c0c0a6", "Estevão Teixeira", "estevaosoberano"),
  rioTripTijuca: photo("photo-1700677866571-43199bcbc593", "Christ the Redeemer on the forested peak of Corcovado above Rio", "#c0c0c0", "gustavo nacht", "gnacht"),

  // Mexico City
  mxcChapultepec: photo("photo-1693925369183-a815a771f7d5", "The flag flying over Chapultepec Castle in Mexico City", "#d9d9d9", "Obed Hernández", "yabbath"),
  mxcTeotihuacan: photo("photo-1632667322110-74fe0302687d", "A hot-air balloon over the Pyramid of the Moon at Teotihuacan", "#73a6d9", "Stefan Meier", "okokstefan"),
  mxcCoyoacan: photo("photo-1699654415035-7dae38ccaee2", "A red colonial building on a street in the centre of Coyoacán", "#d9d9d9", "Chris Luengas", "chrisluengas"),
  mxcTripTeotihuacan: photo("photo-1706536610031-56776c5bb10a", "Visitors in front of a pyramid in the ancient city of Teotihuacan", "#8c8c8c", "Edgar Cavazos", "edgar_cape"),
  mxcTripXochimilco: photo("photo-1756958603478-142b7d74953d", "A trajinera boat on a tree-lined canal at Xochimilco", "#262626", "Brenda Huescas", "huescasb"),
  mxcTripCholula: photo("photo-1473726867722-6b8a5e529d76", "A yellow church on a hilltop with a volcano behind, Cholula", "#73a6d9", "Pedro Lastra", "peterlaster"),

  // Cusco
  cuscoCathedral: photo("photo-1768757980570-3b3d28960bd5", "Cusco’s cathedral and red-tiled rooftops with mountains behind", "#738ca6", "Will Goodman", "carbonmonoxide"),
  cuscoOldTown: photo("photo-1723134090247-753cbeebe3ba", "Cusco’s historic centre and hillside streets at golden hour", "#262626", "Ed Wingate", "ed_wingate"),
  cuscoSacredValley: photo("photo-1725153264822-ab95a6e81428", "A small town in the Sacred Valley ringed by Andean mountains", "#735959", "Meg von Haartman", "traveleroohlala"),
  cuscoTripMaras: photo("photo-1525222529557-b8849ca37860", "Two visitors above the terraced salt pans of Salinas de Maras", "#262626", "Thomas Griggs", "viajeenparacaidas"),
  cuscoTripRainbow: photo("photo-1744295816404-4c73fd69e0f2", "Hikers below the striped slopes of Rainbow Mountain, Vinicunca", "#a6a68c", "Justin Eloo", "justin_eloo"),

  // New York
  nycStatue: photo("photo-1503572327579-b5c6afe5c5c5", "The Statue of Liberty lit by a beam of sunlight on the Hudson", "#a6c0d9", "AussieActive", "aussieactive"),
  nycCentralPark: photo("photo-1568515387631-8b650bbcdb90", "Central Park with the Manhattan skyline rising behind the trees", "#262626", "Jermaine Ee", "eejermaine"),
  nycHighLine: photo("photo-1673296633888-6fa24514d256", "People walking along the High Line between city buildings", "#595959", "Bernd Dittrich", "hdbernd"),
  nycTimesSquare: photo("photo-1582760548598-0bccdf815aa2", "Crowds in Times Square at dusk", "#262626", "James Ting", "jamesting"),
  nycWilliamsburg: photo("photo-1600019280996-2d64c3ad31cd", "The Manhattan skyline seen from Williamsburg, Brooklyn", "#8ca6c0", "Cassandra Liau", "cassliau"),
  nycVillage: photo("photo-1547602044-adc6f6fa3c25", "A quiet street in Greenwich Village", "#d9d9d9", "chloe s.", "chloesimpson"),
  nycTripConey: photo("photo-1623766647719-9972b994e598", "The boardwalk at Coney Island with people walking", "#0c8cd9", "michal dziekonski", "poloska25"),
  nycTripPhiladelphia: photo("photo-1614946403309-cc9d1f9b6164", "Independence Hall in Philadelphia", "#8ca6d9", "Dan Mall", "danmall"),
  nycTripHudson: photo("photo-1642716559031-902161279f40", "Mist rising over the Hudson River valley", "#26260c", "Gerald Berliner", "geraberl"),

  // Miami
  miami: photo("photo-1549881464-3798dcecbe36", "A traffic light and palm tree on Ocean Drive in South Beach under bright sun", "#c0c0c0", "Franck CHARLES", "franckcharles_"),
  miamiSouthBeach: photo("photo-1589066724013-06f34f2cc17c", "Ocean Drive in South Beach lit up at night", "#0c2626", "Andre Tan", "andredantan19"),
  miamiWynwood: photo("photo-1590157867535-b8435e08a93f", "A colourful mural in the Wynwood arts district", "#262626", "Juan Carlos Trujillo", "jctrujillo"),
  miamiLittleHavana: photo("photo-1574167630074-8221b69f8b98", "A pink building on a street in Little Havana", "#c0d9d9", "Kian Lem", "kianlem"),
  miamiVizcaya: photo("photo-1719297203659-b5378112f2da", "The fountain and driveway of Vizcaya Museum and Gardens in Coconut Grove", "#c0c0c0", "Zoshua Colah", "zoshuacolah"),
  miamiTripEverglades: photo("photo-1679092620695-45cac316d657", "An alligator swimming in the water in the Florida Everglades", "#8ca6c0", "Nellie Adamyan", "nellie_adamyan"),
  miamiTripKeyWest: photo("photo-1722480176525-1cefada5037e", "The Southernmost Point buoy in Key West", "#8cc0f3", "Zoshua Colah", "zoshuacolah"),
  miamiTripFortLauderdale: photo("photo-1691423332423-f2132628ff72", "Fort Lauderdale beach and coastline from the air", "#738c8c", "By Carl", "bycarl17"),
} satisfies Record<string, Photo>;
