import { photos } from "../images";
import type { DestinationDepth } from "./types";

// Fares and journey times checked 3 Nov 2026 on the pages linked beside them.
// Where an operator's page didn't give a current fare, none is shown.
// Neighbourhoods, day plans and getting around rewritten in more depth (3 Nov 2026).

const adoPlaya = { label: "ADO: Cancún Airport to Playa del Carmen", url: "https://international.ado.com.mx/ado-bus/cancun-airport-to-playa-del-carmen" };
const metrobusAicm = { label: "Mexico City Airport: Metrobús", url: "https://www.aicm.com.mx/transportation/metrobus" };
const mtaJfk = { label: "MTA: JFK Airport to Manhattan", url: "https://www.mta.info/guides/airports/jfk/jfk-airport-to-manhattan" };

export const americasDepth: Record<string, DestinationDepth> = {
  cancun: {
    // Batch 22 fields checked 6 Nov 2026: GOV.UK Mexico (911, bottled water),
    // ADO and Ultramar timetables (journey times given as "about").
    checked: "2026-11-06",
    timeZone: "America/Cancun",
    localTips: [
      { icon: "money", title: "Pay in pesos", text: "Dollars are accepted in the Hotel Zone, but prices in pesos usually work out cheaper. Use ATMs inside banks or malls." },
      { icon: "transport", title: "Agree taxi fares first", text: "Cancún taxis don’t use meters. Confirm the price before you get in, or use the R-1 bus along the Hotel Zone." },
      { icon: "water", title: "Don’t drink the tap water", text: "Drink bottled or boiled water, as GOV.UK advises. Hotels usually provide bottles or filtered water." },
      { icon: "weather", title: "Hurricanes and seaweed", text: "Hurricane season runs from June to November. Sargassum seaweed can also wash up on the beaches in the warmer months, so check recent reports." },
      { icon: "safety", title: "Watch the beach flags", text: "Beaches facing the open sea in the Hotel Zone can have strong currents. Don’t swim when the red flag is up." },
      { icon: "etiquette", title: "Rinse off before cenotes", text: "Most cenotes ask you to shower first and skip sunscreen and insect repellent, to protect the water." },
    ],
    foods: [
      { name: "Cochinita pibil", text: "Pork marinated in achiote and bitter orange and slow-cooked in banana leaves, served in tacos or tortas at downtown stalls and markets." },
      { name: "Sopa de lima", text: "A Yucatán chicken broth with lime and crisp tortilla strips, on the menu at most regional restaurants." },
      { name: "Panuchos and salbutes", text: "Small fried tortillas topped with shredded turkey or chicken, onion and avocado, sold at Parque de las Palapas and Mercado 28." },
      { name: "Marquesitas", text: "Crisp rolled crêpes filled with Edam cheese, Nutella or cajeta, made to order at carts in the Parque de las Palapas at night." },
      { name: "Tikin xic", text: "Fish rubbed with achiote paste and grilled in banana leaves, a speciality of beach restaurants on Isla Mujeres." },
    ],
    dayTrips: [
      { name: "Chichén Itzá", time: "About 2½ to 3 hours by road or ADO bus", text: "The great Mayan city with the El Castillo pyramid, a UNESCO World Heritage Site. Arrive at opening to beat the heat and the tour coaches.", photo: photos.cancunTripChichen },
      { name: "Tulum", time: "About 2 hours by road; longer by ADO bus", text: "Mayan ruins on a clifftop above a Caribbean beach, with a town of cafés and cenotes nearby.", photo: photos.cancunTripTulum },
      { name: "Valladolid and its cenotes", time: "About 2 hours by ADO bus", text: "A colonial town of painted streets and a cathedral square, with swimmable cenotes such as Oxman and Zací close by.", photo: photos.cancunTripCenote },
    ],
    visual: {
      days: [
        { photo: photos.cancunHotelZone, stops: ["Hotel Zone beach", "Museo Maya de Cancún", "San Miguelito ruins", "Parque de las Palapas"] },
        { photo: photos.cancunIslaMujeres, stops: ["Ferry to Isla Mujeres", "Golf cart round the island", "Playa Norte", "Sunset on the island"] },
        { photo: photos.cancunChichenItza, stops: ["Chichén Itzá", "A cenote swim", "Or Tulum by the sea"] },
      ],
      stay: [
        { name: "Hotel Zone", bestFor: "Beach resorts", photo: photos.cancun },
        { name: "Tulum", bestFor: "Ruins and cenotes", photo: photos.cancunTulumBeach },
        { name: "Isla Mujeres", bestFor: "A slower pace", photo: photos.cancunIslaMujeres },
      ],
    },
    airports: [
      {
        code: "CUN",
        name: "Cancún International",
        summary: "About 16 km south of the Hotel Zone, with several terminals.",
        transfers: [
          { mode: "bus", name: "ADO bus", to: "downtown Cancún and Playa del Carmen", time: "about 1½ to 2 hours to Playa del Carmen", fare: { text: "About MXN 270 to Playa del Carmen", source: adoPlaya } },
          { mode: "taxi", name: "Authorised taxis and shuttles", to: "the Hotel Zone, Playa del Carmen and Tulum", note: "Book at the official desks inside the terminal." },
        ],
        officialPage: { label: "ASUR (airport operator)", url: "https://www.asur.com.mx/" },
      },
    ],
    weather: "BBBBGMMMMMGB",
    neighbourhoods: [
      { name: "Hotel Zone", bestFor: "Beach resorts", text: "A long strip of resorts between the Caribbean and the lagoon, with beaches, restaurants and nightlife. Buses run its whole length." },
      { name: "Downtown Cancún", bestFor: "Value and local food", text: "Cheaper hotels, taco stands, the Parque de las Palapas and the ADO bus station. Less polished, more local." },
      { name: "Playa del Carmen", bestFor: "A walkable town", text: "A beach town south of Cancún with a pedestrian main street, restaurants and ferries to Cozumel." },
      { name: "Tulum", bestFor: "Ruins and cenotes", text: "Clifftop Mayan ruins, boutique hotels on the beach and cenotes nearby, about two hours south." },
      { name: "Isla Mujeres", bestFor: "A slower pace", text: "A small island a short ferry ride from Cancún, with calm beaches and golf carts instead of cars." },
    ],
    itinerary: [
      { title: "Beach and the Mayan museum", morning: "Spend the morning on a Hotel Zone beach.", afternoon: "Visit the Museo Maya de Cancún and the small San Miguelito ruins beside it.", evening: "Eat downtown around the Parque de las Palapas." },
      { title: "Isla Mujeres", morning: "Take an early ferry to Isla Mujeres.", afternoon: "Hire a golf cart to explore the island and swim at Playa Norte.", evening: "Watch the sunset on the island before the ferry back." },
      { title: "Chichén Itzá or Tulum", morning: "Leave early for Chichén Itzá to arrive before the crowds and heat.", afternoon: "Swim in a cenote on the way back.", evening: "Or visit the ruins at Tulum by the sea and stay for dinner in the town." },
    ],
    daysNeeded: "A week for beaches and day trips, or three to four days if you stay in one place.",
    gettingAround: "R-1 buses run the length of the Hotel Zone and into downtown, and ADO buses connect the coast’s towns. Taxis don’t use meters, so agree the price first. Many visitors book transfers or hire a car for day trips.",
    essentials: {
      currency: "Mexican peso (MXN); US dollars are widely accepted in the Hotel Zone",
      plugs: "Types A and B, 127V",
      language: "Spanish",
      emergency: "911",
      tipping: "10 to 15% in restaurants is usual; check the bill first, as some add service",
      water: "Don’t drink tap water; use bottled or boiled water",
    },
    faqs: [
      {
        q: "When is hurricane season in Cancún?",
        a: "From June to November, with the highest risk usually from August to October. Storms aren’t constant, but travel insurance and flexible bookings are worth considering then.",
      },
      {
        q: "How do I get from Cancún airport to Playa del Carmen or Tulum?",
        a: "ADO buses leave from the airport terminals: about 1½ to 2 hours to Playa del Carmen and about 3 hours to Tulum. Shuttles and taxis are quicker but cost more.",
      },
      {
        q: "Is Cancún safe for tourists?",
        a: "Most visits are trouble-free, but crime does happen in Quintana Roo, including in tourist areas. Use official taxis, keep to busy areas at night and read the latest advice on GOV.UK or travel.state.gov before you go.",
      },
      {
        q: "Can I use US dollars in Cancún?",
        a: "Yes, in most Hotel Zone hotels, restaurants and shops, but you’ll usually get a better deal paying in pesos. Buses, markets and small shops downtown expect pesos.",
      },
      {
        q: "How do I get to Isla Mujeres from Cancún?",
        a: "Take a passenger ferry from Puerto Juárez, north of downtown, or from the Hotel Zone piers. The crossing from Puerto Juárez takes about 20 to 30 minutes.",
      },
    ],
    guides: ["24-hour-flight-cancellation-rule", "carry-on-only-checklist", "when-to-book-international-flights"],
  },
  "rio-de-janeiro": {
    // Batch 22 fields checked 6 Nov 2026: Brazilian government and Rio health
    // pages (190 police, 192 ambulance, 193 fire), operator journey times.
    checked: "2026-11-06",
    timeZone: "America/Sao_Paulo",
    localTips: [
      { icon: "safety", title: "Take little to the beach", text: "Bring only what you need: a little cash, a copy of your passport and no valuables. Keep your phone out of sight on the street, especially at night." },
      { icon: "transport", title: "Use the metro or apps", text: "The metro runs from the centre to Copacabana, Ipanema and Barra. After dark, take a ride-hailing app or official taxi instead of walking." },
      { icon: "money", title: "Service is usually added", text: "Restaurants and bars normally add a 10% service charge to the bill. Cards are accepted almost everywhere, even at many beach kiosks." },
      { icon: "water", title: "Drink filtered water", text: "Most visitors drink bottled or filtered water rather than tap water. Hotels and cafés serve filtered water." },
      { icon: "weather", title: "Hot, wet summers", text: "December to March is hot and humid, with heavy afternoon storms. Carry water and sunscreen on long walks." },
      { icon: "ticket", title: "Book Corcovado ahead", text: "Tickets for the Corcovado train sell out on busy days and in high season. Book a morning slot online for the clearest views." },
    ],
    foods: [
      { name: "Feijoada", text: "Black beans slow-cooked with pork, served with rice, farofa, greens and orange, traditionally on Saturdays in botecos and restaurants." },
      { name: "Pão de queijo", text: "Small, chewy cheese breads made with cassava flour, sold warm at bakeries and juice bars across the city." },
      { name: "Açaí", text: "Frozen açaí berry pulp served in a bowl with banana and granola, from the juice bars on almost every corner of the South Zone." },
      { name: "Biscoito Globo", text: "Light, crunchy rings of manioc starch sold from bags by vendors on Copacabana and Ipanema beaches." },
      { name: "Pastel with caldo de cana", text: "A crisp fried pastry filled with cheese or meat, eaten with fresh sugar-cane juice at street markets (feiras)." },
      { name: "Caipirinha", text: "Brazil’s cocktail of cachaça, lime and sugar, made at every beach kiosk and bar." },
    ],
    dayTrips: [
      { name: "Petrópolis", time: "About 1½ hours by bus from Novo Rio bus station", text: "The emperors’ cool summer retreat in the mountains, with the Imperial Museum, a Gothic cathedral and leafy streets of old mansions.", photo: photos.rioTripPetropolis },
      { name: "Niterói", time: "About 20 minutes by ferry from Praça XV", text: "Cross the bay for Oscar Niemeyer’s Contemporary Art Museum and one of the best views back to Rio and Sugarloaf.", photo: photos.rioTripNiteroi },
      { name: "Tijuca National Park", time: "A short taxi ride from the South Zone", text: "One of the world’s largest urban forests, with trails, waterfalls and viewpoints; Corcovado and Christ the Redeemer sit inside it. Hike with a guide or on the main paths.", photo: photos.rioTripTijuca },
    ],
    visual: {
      days: [
        { photo: photos.rioChrist, stops: ["Christ the Redeemer", "Santa Teresa", "Lapa’s samba bars"] },
        { photo: photos.rioCopacabana, stops: ["Sugarloaf cable car", "Copacabana beach", "Ipanema beach", "Sunset at Arpoador"] },
        { photo: photos.rio, stops: ["Botanical Garden", "Lagoa", "Selarón steps", "Theatro Municipal"] },
      ],
      stay: [
        { name: "Copacabana", bestFor: "First visits", photo: photos.rioCopacabana },
        { name: "Ipanema and Leblon", bestFor: "Upmarket beach stays", photo: photos.rio },
        { name: "Botafogo", bestFor: "Bars and Sugarloaf views", photo: photos.rioSugarloafView },
      ],
    },
    airports: [
      {
        code: "GIG",
        name: "Galeão (Tom Jobim)",
        summary: "About 20 km north of the centre, and the airport for international flights.",
        transfers: [
          { mode: "taxi", name: "Taxi or ride-hailing", to: "Centro, Copacabana and Ipanema", note: "Use the official taxi counters or app pick-up points, and allow extra time in traffic." },
        ],
        officialPage: { label: "RIOgaleão", url: "https://www.riogaleao.com/" },
      },
      {
        code: "SDU",
        name: "Santos Dumont",
        summary: "On the waterfront in the city centre, mainly for flights within Brazil.",
        transfers: [{ mode: "taxi", name: "Taxi or ride-hailing", to: "the beaches and the centre" }],
      },
    ],
    weather: "GGGBBBGGBBGG",
    neighbourhoods: [
      { name: "Copacabana", bestFor: "First visits", text: "The famous beach and promenade, with plenty of hotels in every price range and the metro. Lively day and night." },
      { name: "Ipanema and Leblon", bestFor: "Upmarket beach stays", text: "Rio’s smartest beaches, restaurants and shops, with the Lagoa behind. Safer-feeling and more expensive." },
      { name: "Santa Teresa", bestFor: "Bohemian charm", text: "A hilltop neighbourhood of artists’ studios, guesthouses and views, reached by its old tram." },
      { name: "Botafogo", bestFor: "Bars and Sugarloaf views", text: "A lively, local area between the centre and the beaches, with good bars and the metro." },
      { name: "Centro and Lapa", bestFor: "History and samba", text: "Colonial streets, the Selarón steps and Lapa’s samba nightlife; very quiet at weekends by day." },
    ],
    itinerary: [
      { title: "Christ the Redeemer and Santa Teresa", morning: "Take the train up Corcovado to Christ the Redeemer early, before the clouds and crowds.", afternoon: "Explore Santa Teresa’s lanes, studios and views.", evening: "Hear live samba in Lapa." },
      { title: "Sugarloaf and the beaches", morning: "Ride the cable car up Sugarloaf Mountain in the morning.", afternoon: "Spend the afternoon on Copacabana or Ipanema beach.", evening: "Watch the sunset from the Arpoador rock between them." },
      { title: "Gardens and the centre", morning: "Walk in the Botanical Garden and around the Lagoa.", afternoon: "Visit the Selarón steps and the Theatro Municipal downtown.", evening: "Have dinner in Botafogo or Leblon." },
    ],
    daysNeeded: "Four to five days.",
    gettingAround: "The metro links the centre with Copacabana, Ipanema and Barra, and ride-hailing apps are widely used for other trips. Keep phones and valuables out of sight on the street and on the beach.",
    essentials: {
      currency: "Brazilian real (BRL)",
      plugs: "Types C and N; 127V in most of Rio",
      language: "Portuguese",
      emergency: "190 (police), 192 (ambulance), 193 (fire)",
      tipping: "A 10% service charge is usually added in restaurants; no need to tip more",
      water: "Drink bottled or filtered water",
    },
    faqs: [
      {
        q: "When is Carnival in Rio?",
        a: "In February or early March, in the days before Lent, so the dates change every year. Flights and hotels fill months ahead and prices rise.",
      },
      {
        q: "Do Americans need a visa for Brazil?",
        a: "Yes. Brazil requires US citizens to get an e-visa before they travel. Check the current rules on travel.state.gov and Brazil’s official e-visa site before you book.",
      },
      {
        q: "Is Rio de Janeiro safe for tourists?",
        a: "Most visits pass without trouble, but street crime is common, especially phone and bag theft on beaches and busy streets. Carry little, use apps or official taxis at night, and don’t enter favelas without a reputable guide.",
      },
      {
        q: "How do I get up to Christ the Redeemer?",
        a: "Take the Corcovado train from Cosme Velho, or the official vans from Copacabana and Largo do Machado. Book a timed ticket ahead and go early, before the clouds and queues build.",
      },
    ],
    guides: ["self-transfer-separate-tickets", "when-to-book-international-flights", "power-bank-rules-on-planes"],
  },
  "mexico-city": {
    // Batch 22 fields checked 6 Nov 2026: GOV.UK Mexico (911, bottled water),
    // bus journey times from operator timetables (given as "about").
    checked: "2026-11-06",
    timeZone: "America/Mexico_City",
    localTips: [
      { icon: "health", title: "Take the altitude slowly", text: "The city sits about 2,240 metres up. Go easy on the first day, drink plenty of water and go light on alcohol." },
      { icon: "transport", title: "Get a transit card", text: "One rechargeable card pays for the metro, Metrobús and light rail. Buy and top it up at station machines." },
      { icon: "safety", title: "Use ride-hailing apps", text: "Order a car through an app or use an authorised taxi rank rather than hailing cabs on the street, especially at night." },
      { icon: "water", title: "Don’t drink the tap water", text: "Drink bottled or boiled water, as GOV.UK advises. Restaurants use purified ice and water." },
      { icon: "money", title: "Carry small notes", text: "Cards work in most restaurants and shops, but street stalls, markets and trajineras usually want cash in small notes." },
      { icon: "safety", title: "Know the quake alarm", text: "Loudspeakers across the city sound a seismic alert before a strong earthquake. Follow people out to open space, away from buildings." },
    ],
    foods: [
      { name: "Tacos al pastor", text: "Marinated pork shaved from a vertical spit with pineapple, onion and coriander, at taquerías all over Roma, Condesa and the centre." },
      { name: "Chilaquiles", text: "Fried tortilla pieces simmered in red or green salsa, topped with cream, cheese and often an egg, the city’s favourite breakfast." },
      { name: "Tamales", text: "Steamed corn dough filled with chicken, pork or sweet fillings, sold from street carts in the morning, often with atole." },
      { name: "Pozole", text: "A rich hominy soup with pork or chicken, served with lettuce, radish, oregano and lime at fondas and markets." },
      { name: "Churros with hot chocolate", text: "Fried dough sticks rolled in sugar and dipped in thick chocolate, a speciality of old churrerías such as El Moro." },
      { name: "Mezcal", text: "Agave spirit with a smoky taste, sipped neat with orange and sal de gusano in mezcalerías in Roma and the centre." },
    ],
    dayTrips: [
      { name: "Teotihuacan", time: "About 45 minutes to 1 hour by bus from Terminal Norte", text: "The vast ancient city with the Pyramids of the Sun and Moon and the Avenue of the Dead. Go early to beat the heat and the crowds.", photo: photos.mxcTripTeotihuacan },
      { name: "Xochimilco", time: "Light rail from Tasqueña metro station", text: "Glide along the old canals on a painted trajinera boat, with mariachis and food boats passing by. Best at weekends, when the canals are liveliest.", photo: photos.mxcTripXochimilco },
      { name: "Puebla and Cholula", time: "About 2 to 2½ hours by bus from TAPO", text: "Puebla has a tiled colonial centre and the dish mole poblano; next door, Cholula’s hilltop church sits on top of a huge ancient pyramid.", photo: photos.mxcTripCholula },
    ],
    visual: {
      days: [
        { photo: photos.mexicoCity, stops: ["Zócalo and cathedral", "Templo Mayor", "Palacio Nacional murals", "Palacio de Bellas Artes"] },
        { photo: photos.mxcChapultepec, stops: ["National Museum of Anthropology", "Chapultepec Park", "Condesa", "Roma Norte"] },
        { photo: photos.mxcTeotihuacan, stops: ["Teotihuacan pyramids", "Or the Frida Kahlo Museum", "Xochimilco or Coyoacán"] },
      ],
      stay: [
        { name: "Centro Histórico", bestFor: "First visits", photo: photos.mexicoCity },
        { name: "Polanco", bestFor: "Upscale stays and museums", photo: photos.mxcChapultepec },
        { name: "Coyoacán", bestFor: "A village feel", photo: photos.mxcCoyoacan },
      ],
    },
    airports: [
      {
        code: "MEX",
        name: "Benito Juárez International",
        summary: "About 8 km east of the historic centre, unusually close for a city this size.",
        transfers: [
          { mode: "bus", name: "Metrobús Line 4", to: "the historic centre", fare: { text: "MXN 30, paid with a Metrobús card", source: metrobusAicm } },
          { mode: "metro", name: "Metro Line 5", to: "the city metro network", note: "From Terminal Aérea station, by Terminal 1." },
          { mode: "taxi", name: "Authorised airport taxis", to: "anywhere in the city", note: "Pay at the official desks in arrivals." },
        ],
        officialPage: metrobusAicm,
      },
    ],
    weather: "BBBBGGMMMGBB",
    neighbourhoods: [
      { name: "Centro Histórico", bestFor: "First visits", text: "The Zócalo, the cathedral and Templo Mayor, with museums and Diego Rivera murals all around. Busy by day, quieter at night." },
      { name: "Roma Norte", bestFor: "Food and nightlife", text: "Tree-lined streets of cafés, restaurants and bars, and some of the city’s best food." },
      { name: "Condesa", bestFor: "Parks and a relaxed feel", text: "Art Deco buildings around Parque México, next to Roma, with dog walkers and cafés." },
      { name: "Polanco", bestFor: "Upscale stays and museums", text: "Smart hotels and restaurants by Chapultepec Park and its museums." },
      { name: "Coyoacán", bestFor: "A village feel", text: "Colonial plazas, markets and the Frida Kahlo Museum in the south of the city." },
    ],
    itinerary: [
      { title: "The historic centre", morning: "Start at the Zócalo with the cathedral and Templo Mayor.", afternoon: "See Diego Rivera’s murals in the Palacio Nacional, then walk to the Palacio de Bellas Artes.", evening: "View the centre from the Torre Latinoamericana at dusk." },
      { title: "Chapultepec and Roma", morning: "Spend the morning at the National Museum of Anthropology in Chapultepec Park.", afternoon: "Walk through Chapultepec and on to Condesa’s parks.", evening: "Eat and drink your way through Roma Norte." },
      { title: "Teotihuacan or Coyoacán", morning: "Leave early to climb the pyramids at Teotihuacan before the heat.", afternoon: "Or visit the Frida Kahlo Museum in Coyoacán, booked ahead.", evening: "Ride a trajinera boat at Xochimilco, or have dinner in Coyoacán’s plazas." },
    ],
    daysNeeded: "Four to five days, including a day trip to Teotihuacan.",
    gettingAround: "The metro and Metrobús are cheap and cover much of the city, paid with a rechargeable card. Ride-hailing apps are easy and widely used, especially at night. Traffic can be slow, so allow time.",
    essentials: {
      currency: "Mexican peso (MXN)",
      plugs: "Types A and B, 127V",
      language: "Spanish",
      emergency: "911",
      tipping: "10 to 15% in restaurants is usual; check whether service is already on the bill",
      water: "Don’t drink tap water; use bottled or boiled water",
    },
    faqs: [
      {
        q: "Does the altitude affect visitors to Mexico City?",
        a: "It can. The city is about 2,240 metres above sea level, so some visitors feel tired or short of breath at first. Take the first day gently and drink plenty of water.",
      },
      {
        q: "How do I get to Teotihuacan from Mexico City?",
        a: "Buses leave from the Terminal Autobuses del Norte, and many tours run from the city. Go early to beat the heat and the crowds.",
      },
      {
        q: "Is Mexico City safe for tourists?",
        a: "The main visitor areas, such as the Centro, Roma, Condesa, Polanco and Coyoacán, see millions of trouble-free visits, but pickpocketing and street crime happen. Use ride-hailing apps at night, keep your phone out of sight on the metro and read the latest GOV.UK or travel.state.gov advice.",
      },
      {
        q: "Can you drink the tap water in Mexico City?",
        a: "No. Drink bottled or boiled water, as GOV.UK advises. Restaurants and hotels use purified water and ice.",
      },
    ],
    guides: ["24-hour-flight-cancellation-rule", "when-to-book-international-flights", "carry-on-only-checklist"],
  },
  cusco: {
    // Batch 22 fields checked 6 Nov 2026: GOV.UK Peru (105 police, 106
    // ambulance, 116 fire), PeruRail (about 3½ hours from Poroy).
    checked: "2026-11-06",
    timeZone: "America/Lima",
    localTips: [
      { icon: "health", title: "Respect the altitude", text: "Cusco is about 3,400 metres up. Rest on day one, drink plenty of water, and go easy on alcohol until you adjust." },
      { icon: "ticket", title: "Book Machu Picchu early", text: "Entry tickets are timed with daily limits, and trains fill up in the dry season. Book both together, weeks or months ahead." },
      { icon: "ticket", title: "Buy the tourist ticket", text: "The Boleto Turístico del Cusco covers many sites in and around the city, including Pisac, Ollantaytambo and Moray. Buy it at the first site you visit." },
      { icon: "money", title: "Carry soles in small notes", text: "Markets, taxis and small cafés often take cash only, and change for big notes can be hard to find." },
      { icon: "weather", title: "Pack for four seasons", text: "Days can be warm and sunny with strong UV, but nights are cold, especially in the dry season. The rainy season runs roughly November to March." },
      { icon: "water", title: "Don’t drink the tap water", text: "Drink bottled, boiled or filtered water, and many hotels offer refills." },
    ],
    foods: [
      { name: "Lomo saltado", text: "Strips of beef stir-fried with onion, tomato and soy sauce, served with chips and rice, on almost every menu in town." },
      { name: "Cuy al horno", text: "Roast guinea pig, an Andean festive dish, served whole in traditional restaurants and picanterías around Cusco." },
      { name: "Alpaca", text: "Lean, mild red meat, often grilled as a steak or served in a stew, in restaurants around the Plaza de Armas." },
      { name: "Rocoto relleno", text: "A spicy red pepper stuffed with minced meat and topped with cheese, a southern Andes favourite." },
      { name: "Chicha morada", text: "A sweet, cold drink made from purple corn with pineapple and cinnamon, sold in markets such as San Pedro." },
      { name: "Mate de coca", text: "Tea made from coca leaves, offered in most hotels as a traditional way to ease the altitude." },
    ],
    dayTrips: [
      { name: "Machu Picchu", time: "About 3½ hours by train from Poroy, or 1¾ hours from Ollantaytambo", text: "The Inca citadel on its mountain ridge, reached by train to Aguas Calientes and a short bus ride up. A day trip is possible but long; many people stay a night.", photo: photos.cusco },
      { name: "Maras and Moray", time: "A day trip by road, usually on a tour", text: "Thousands of terraced salt pans still worked by local families, and the circular Inca farming terraces of Moray nearby.", photo: photos.cuscoTripMaras },
      { name: "Rainbow Mountain", time: "About 3 hours by road, then a hike at over 5,000 metres", text: "A ridge of red, gold and green striped rock, reached on a steep hike. Only go once you’ve adjusted to the altitude.", photo: photos.cuscoTripRainbow },
    ],
    visual: {
      days: [
        { photo: photos.cuscoCathedral, stops: ["Plaza de Armas", "Qorikancha", "Cusco Cathedral", "San Pedro market"] },
        { photo: photos.cuscoSacredValley, stops: ["Pisac market and ruins", "Ollantaytambo fortress", "A night in the valley"] },
        { photo: photos.cusco, stops: ["Train to Aguas Calientes", "Machu Picchu", "Train back"] },
      ],
      stay: [
        { name: "Historic centre", bestFor: "First visits", photo: photos.cuscoCathedral },
        { name: "San Blas", bestFor: "Views and artisans", photo: photos.cuscoOldTown },
        { name: "Sacred Valley", bestFor: "Lower altitude and Machu Picchu trains", photo: photos.cuscoSacredValley },
      ],
    },
    airports: [
      {
        code: "CUZ",
        name: "Alejandro Velasco Astete",
        summary: "A few kilometres south-east of the historic centre. Flights from the UK and US connect, usually in Lima.",
        transfers: [{ mode: "taxi", name: "Taxi", to: "the historic centre", note: "A short ride; many hotels arrange pick-ups." }],
      },
    ],
    weather: "MMMGBBBBBGMM",
    neighbourhoods: [
      { name: "Historic centre", bestFor: "First visits", text: "Around the Plaza de Armas, with Inca walls and colonial churches on every street. Everything is within a walk." },
      { name: "San Blas", bestFor: "Views and artisans", text: "A steep, whitewashed quarter of workshops, cafés and small guesthouses above the centre. Charming, but the climb is hard at altitude." },
      { name: "Sacred Valley", bestFor: "Lower altitude and Machu Picchu trains", text: "Towns such as Urubamba and Ollantaytambo sit lower than Cusco and close to the trains for Machu Picchu." },
    ],
    itinerary: [
      { title: "Settle in slowly", morning: "Rest on arrival and walk the Plaza de Armas gently; drink water.", afternoon: "See the Qorikancha temple and the cathedral.", evening: "Browse the San Pedro market area and have an early dinner." },
      { title: "The Sacred Valley", morning: "Visit the market and ruins at Pisac.", afternoon: "Continue to the fortress and old town of Ollantaytambo.", evening: "Stay the night in the valley, close to the train." },
      { title: "Machu Picchu", morning: "Take an early train to Aguas Calientes.", afternoon: "Enter Machu Picchu on your timed ticket, booked well ahead.", evening: "Return by train to the valley or Cusco." },
    ],
    daysNeeded: "Four to five days with Machu Picchu and the Sacred Valley, and more if you hike the Inca Trail.",
    gettingAround: "Walk in the centre, taking it slowly at altitude, and use registered taxis or your hotel’s drivers for longer trips. Trains to Machu Picchu leave from Cusco’s Poroy station and from Ollantaytambo; book them with your entry ticket.",
    essentials: {
      currency: "Peruvian sol (PEN)",
      plugs: "Types A and C, 220V",
      language: "Spanish and Quechua",
      emergency: "105 (police), 106 (ambulance), 116 (fire)",
      tipping: "About 10% in sit-down restaurants; tip guides and porters on tours",
      water: "Don’t drink tap water; use bottled, boiled or filtered water",
    },
    faqs: [
      {
        q: "Can you fly direct to Cusco from London or New York?",
        a: "No. International flights land in Lima, where you change to a flight to Cusco.",
      },
      {
        q: "Do I need to book Machu Picchu in advance?",
        a: "Yes. Entry uses timed tickets with daily limits, and Inca Trail permits sell out months ahead for the dry season. The trail closes every February for maintenance.",
      },
      {
        q: "Will the altitude in Cusco affect me?",
        a: "It can. Cusco is about 3,400 metres above sea level. Rest on your first day, drink plenty of water, and consider starting in the lower Sacred Valley.",
      },
      {
        q: "When is the best time to visit Cusco?",
        a: "May to September, the dry season, brings sunny days and cold nights, and is also the busiest time. November to March is the rainy season, and the Inca Trail closes every February.",
      },
    ],
    guides: ["self-transfer-separate-tickets", "carry-on-only-checklist", "when-to-book-international-flights"],
  },
  "new-york": {
    // Batch 22 fields checked 6 Nov 2026: NYC.gov (911; tap water meets
    // standards per NYC DEP). Day-trip times are not quoted where no operator
    // page confirmed them; check Amtrak and Metro-North before travelling.
    checked: "2026-11-06",
    timeZone: "America/New_York",
    localTips: [
      { icon: "money", title: "Tip 18 to 20%", text: "Tipping is expected in restaurants, bars and taxis; the bill rarely includes service. Check the menu for an added charge first." },
      { icon: "transport", title: "Tap to ride the subway", text: "Use a contactless card or phone on the OMNY reader. Your fares are capped weekly, so there is no need to buy a pass." },
      { icon: "water", title: "Tap water is safe", text: "New York City water meets all federal and state standards, according to the city’s water department. Refill a bottle at hotels and cafés." },
      { icon: "ticket", title: "Book the Statue early", text: "Ferries to the Statue of Liberty and Ellis Island, and crown access, sell out. Buy only from the official ferry operator." },
      { icon: "etiquette", title: "Walk on the right", text: "Pavements move fast. Keep to one side, stay out of bike lanes and wait for the walk signal." },
      { icon: "weather", title: "Pack for the season", text: "Summer is hot and humid and winter is cold, sometimes with snow. Spring and autumn are the easiest for walking." },
    ],
    foods: [
      { name: "New York pizza", text: "Large thin slices with a foldable crust, sold by the slice at counters across the city." },
      { name: "Bagel with lox", text: "A chewy boiled bagel with cream cheese and smoked salmon, from the bagel shops of the Lower East Side and the Upper West Side." },
      { name: "Pastrami on rye", text: "Hot, peppery smoked beef piled into rye bread with mustard, a Jewish deli classic." },
      { name: "Cheesecake", text: "Dense, creamy New York-style cheesecake, served at diners and bakeries." },
      { name: "Halal cart chicken over rice", text: "Chicken and rice with white and hot sauce from street carts in Midtown, an affordable local staple." },
      { name: "Hot dog", text: "A street-cart hot dog with mustard and onions, eaten on a bench in a park." },
    ],
    dayTrips: [
      { name: "Philadelphia", time: "By Amtrak from New York Penn Station; check Amtrak for current times", text: "Independence Hall, the Liberty Bell and the Museum of Art are all within a short ride of 30th Street Station.", photo: photos.nycTripPhiladelphia },
      { name: "Hudson Valley", time: "About 1¼ to 1½ hours by Metro-North from Grand Central", text: "Ride the Hudson Line up the river to riverside towns such as Beacon, with views and galleries.", photo: photos.nycTripHudson },
      { name: "Coney Island", time: "By subway from Manhattan", text: "A seaside boardwalk, beach and amusement rides in south Brooklyn, best on a warm day.", photo: photos.nycTripConey },
    ],
    visual: {
      days: [
        { photo: photos.nycCentralPark, stops: ["Central Park", "MoMA", "Top of the Rock or Empire State Building", "Broadway"] },
        { photo: photos.nycStatue, stops: ["Statue of Liberty and Ellis Island", "9/11 Memorial", "Brooklyn Bridge", "DUMBO"] },
        { photo: photos.nycHighLine, stops: ["The Met", "The High Line", "Chelsea Market", "Greenwich Village jazz"] },
      ],
      stay: [
        { name: "Midtown", bestFor: "First visits", photo: photos.nycTimesSquare },
        { name: "Greenwich Village and SoHo", bestFor: "Walking and restaurants", photo: photos.nycVillage },
        { name: "Williamsburg, Brooklyn", bestFor: "Bars and skyline views", photo: photos.nycWilliamsburg },
      ],
    },
    airports: [
      {
        code: "JFK",
        name: "John F. Kennedy International",
        summary: "In Queens, about 25 km from Midtown Manhattan, and the airport for most international flights.",
        transfers: [
          { mode: "metro", name: "AirTrain and subway", to: "Manhattan", fare: { text: "$11.75: $8.75 AirTrain plus a $3 subway fare", source: mtaJfk } },
          { mode: "train", name: "AirTrain and Long Island Rail Road", to: "Penn Station and Grand Central Madison", time: "under 20 minutes from Jamaica to Penn Station", fare: { text: "$14 off-peak or $16 peak, including the AirTrain", source: mtaJfk } },
        ],
        officialPage: { label: "JFK Airport: AirTrain", url: "https://www.jfkairport.com/transportation/airtrain" },
      },
      {
        code: "EWR",
        name: "Newark Liberty International",
        summary: "In New Jersey, about 25 km south-west of Midtown, with many flights from the UK.",
        transfers: [{ mode: "train", name: "AirTrain Newark and NJ Transit or Amtrak", to: "New York Penn Station" }],
        officialPage: { label: "Newark Liberty International Airport", url: "https://www.newarkairport.com/" },
      },
      {
        code: "LGA",
        name: "LaGuardia",
        summary: "In Queens, mainly for flights within the US and to Canada.",
        transfers: [{ mode: "bus", name: "Q70 LaGuardia Link bus", to: "the subway at Jackson Heights" }],
        officialPage: { label: "LaGuardia Airport", url: "https://www.laguardiaairport.com/" },
      },
    ],
    weather: "MMMGBBGGBBGM",
    neighbourhoods: [
      { name: "Midtown", bestFor: "First visits", text: "Times Square, Broadway theatres, Central Park and the Empire State Building, with subway lines in every direction. Busy and expensive, but convenient." },
      { name: "Lower Manhattan", bestFor: "History and harbour views", text: "The 9/11 Memorial, Wall Street, the Brooklyn Bridge and the ferries to the Statue of Liberty. Quiet at weekends." },
      { name: "Greenwich Village and SoHo", bestFor: "Walking and restaurants", text: "Low-rise streets of cafés, shops, jazz clubs and Washington Square Park." },
      { name: "Upper West Side", bestFor: "Families and quieter nights", text: "Between Central Park and the Hudson, near the Natural History Museum, with a residential feel." },
      { name: "Williamsburg, Brooklyn", bestFor: "Bars and skyline views", text: "Across the river, with restaurants, nightlife, waterfront parks and often lower hotel prices." },
    ],
    itinerary: [
      { title: "Midtown", morning: "Walk through the south of Central Park from Columbus Circle.", afternoon: "See MoMA, then the view from Top of the Rock or the Empire State Building.", evening: "End with a Broadway show near Times Square; same-day tickets are often cheaper." },
      { title: "Lower Manhattan and Brooklyn", morning: "Take an early ferry to the Statue of Liberty and Ellis Island, booked ahead.", afternoon: "Visit the 9/11 Memorial and walk through the Financial District.", evening: "Walk the Brooklyn Bridge to DUMBO at sunset and eat in Brooklyn." },
      { title: "Museums and the High Line", morning: "Spend the morning at the Met on Fifth Avenue.", afternoon: "Walk the High Line to Chelsea Market and the Hudson Yards.", evening: "Have dinner in Greenwich Village and hear live jazz." },
    ],
    daysNeeded: "Four to five days for a first visit.",
    gettingAround: "The subway runs around the clock and reaches most places; tap a contactless bank card or phone with OMNY, and fares are capped after a set number of rides each week. Manhattan is easy to walk, and yellow cabs and ride-hailing fill the gaps.",
    essentials: {
      currency: "US dollar (USD)",
      plugs: "Types A and B, 120V",
      language: "English",
      emergency: "911",
      tipping: "18 to 20% in restaurants and bars, and about the same in taxis",
      water: "Tap water is safe to drink",
    },
    faqs: [
      {
        q: "JFK or Newark: which is easier for Manhattan?",
        a: "Both work. From JFK, the AirTrain links to the subway and the Long Island Rail Road; from Newark, the AirTrain links to trains into New York Penn Station in Midtown. Compare fares including the transfer, and think about where you’re staying.",
      },
      {
        q: "Do I need an ESTA to visit New York from the UK?",
        a: "Yes, if you travel under the Visa Waiver Program: British citizens need an approved ESTA before boarding. Apply on the official US government site; our ESTA and UK ETA guide explains how.",
      },
      {
        q: "Do I need to tip in New York?",
        a: "Yes. Tipping is expected in restaurants, bars and taxis, usually 18 to 20%, because servers rely on tips for their pay. Check your bill first, as a few places add service.",
      },
      {
        q: "Can I use my UK card on the New York subway?",
        a: "Yes. Tap a contactless bank card or phone on the OMNY reader at the turnstile or bus, and your fares are capped each week. Your bank may add a foreign transaction fee.",
      },
      {
        q: "Is the tap water safe to drink in New York?",
        a: "Yes. The city’s water department says New York City water meets all federal and state standards. If the water looks discoloured, don’t drink it.",
      },
    ],
    guides: ["esta-and-uk-eta", "24-hour-flight-cancellation-rule", "hand-luggage-sizes-bag-fees"],
  },
};
