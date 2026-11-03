import type { DestinationDepth } from "./types";

// Fares and journey times checked 3 Nov 2026 on the pages linked beside them.
// Where an operator's page didn't give a current fare, none is shown.

const adoPlaya = { label: "ADO: Cancún Airport to Playa del Carmen", url: "https://international.ado.com.mx/ado-bus/cancun-airport-to-playa-del-carmen" };
const metrobusAicm = { label: "Mexico City Airport: Metrobús", url: "https://www.aicm.com.mx/transportation/metrobus" };
const mtaJfk = { label: "MTA: JFK Airport to Manhattan", url: "https://www.mta.info/guides/airports/jfk/jfk-airport-to-manhattan" };

export const americasDepth: Record<string, DestinationDepth> = {
  cancun: {
    checked: "2026-11-03",
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
      { name: "Hotel Zone", bestFor: "Beach resorts", text: "A long strip of resorts between the Caribbean and the lagoon." },
      { name: "Downtown Cancún", bestFor: "Value and local food", text: "Cheaper hotels, taco stands and the ADO bus station." },
      { name: "Playa del Carmen", bestFor: "A walkable town", text: "Beach town south of Cancún with a pedestrian main street and ferries to Cozumel." },
      { name: "Tulum", bestFor: "Ruins and cenotes", text: "Clifftop Mayan ruins, boutique hotels and cenotes nearby, further south again." },
      { name: "Isla Mujeres", bestFor: "A slower pace", text: "A small island a short ferry ride from Cancún, with calm beaches." },
    ],
    itinerary: [
      { title: "Beach and the Mayan museum", text: "Spend the morning on a Hotel Zone beach, visit the Museo Maya de Cancún, and eat downtown around Parque de las Palapas." },
      { title: "Isla Mujeres", text: "Take the ferry to Isla Mujeres, hire a golf cart to explore, and swim at Playa Norte." },
      { title: "Chichén Itzá or Tulum", text: "Leave early for Chichén Itzá with a swim in a cenote on the way back, or visit the ruins at Tulum by the sea." },
    ],
    daysNeeded: "A week for beaches and day trips, or three to four days if you stay in one place.",
    essentials: { currency: "Mexican peso (MXN); US dollars are widely accepted in the Hotel Zone", plugs: "Types A and B, 127V", language: "Spanish" },
    faqs: [
      {
        q: "When is hurricane season in Cancún?",
        a: "From June to November, with the highest risk usually from August to October. Storms aren’t constant, but travel insurance and flexible bookings are worth considering then.",
      },
      {
        q: "How do I get from Cancún airport to Playa del Carmen or Tulum?",
        a: "ADO buses leave from the airport terminals: about 1½ to 2 hours to Playa del Carmen and about 3 hours to Tulum. Shuttles and taxis are quicker but cost more.",
      },
    ],
    guides: ["24-hour-flight-cancellation-rule", "carry-on-only-checklist", "when-to-book-international-flights"],
  },
  "rio-de-janeiro": {
    checked: "2026-11-03",
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
      { name: "Copacabana", bestFor: "First visits", text: "The famous beach and promenade, with plenty of hotels and the metro." },
      { name: "Ipanema and Leblon", bestFor: "Upmarket beach stays", text: "Rio’s smartest beaches, restaurants and shops." },
      { name: "Santa Teresa", bestFor: "Bohemian charm", text: "A hilltop neighbourhood of artists’ studios, guesthouses and views." },
      { name: "Botafogo", bestFor: "Bars and Sugarloaf views", text: "A lively, local area between the centre and the beaches." },
      { name: "Centro and Lapa", bestFor: "History and samba", text: "Colonial streets, the Selarón steps and Lapa’s nightlife; quieter at weekends." },
    ],
    itinerary: [
      { title: "Christ the Redeemer and Santa Teresa", text: "Take the train up Corcovado to Christ the Redeemer, explore Santa Teresa’s lanes, and hear live samba in Lapa that night." },
      { title: "Sugarloaf and the beaches", text: "Ride the cable car up Sugarloaf Mountain, spend the afternoon on Copacabana or Ipanema, and watch the sunset from Arpoador." },
      { title: "Gardens and the centre", text: "Walk in the Botanical Garden and around the Lagoa, then visit the Selarón steps and the Theatro Municipal downtown." },
    ],
    daysNeeded: "Four to five days.",
    essentials: { currency: "Brazilian real (BRL)", plugs: "Types C and N; 127V in most of Rio", language: "Portuguese" },
    faqs: [
      {
        q: "When is Carnival in Rio?",
        a: "In February or early March, in the days before Lent, so the dates change every year. Flights and hotels fill months ahead and prices rise.",
      },
      {
        q: "Do Americans need a visa for Brazil?",
        a: "Yes. Brazil requires US citizens to get an e-visa before they travel. Check the current rules on travel.state.gov and Brazil’s official e-visa site before you book.",
      },
    ],
    guides: ["self-transfer-separate-tickets", "when-to-book-international-flights", "power-bank-rules-on-planes"],
  },
  "mexico-city": {
    checked: "2026-11-03",
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
      { name: "Centro Histórico", bestFor: "First visits", text: "The Zócalo, the cathedral and Templo Mayor, with museums and murals all around." },
      { name: "Roma Norte", bestFor: "Food and nightlife", text: "Tree-lined streets of cafés, restaurants and bars." },
      { name: "Condesa", bestFor: "Parks and a relaxed feel", text: "Art Deco buildings around Parque México, next to Roma." },
      { name: "Polanco", bestFor: "Upscale stays and museums", text: "Smart hotels and restaurants by Chapultepec Park." },
      { name: "Coyoacán", bestFor: "A village feel", text: "Colonial plazas, markets and the Frida Kahlo Museum in the south of the city." },
    ],
    itinerary: [
      { title: "The historic centre", text: "Start at the Zócalo with the cathedral and Templo Mayor, see Diego Rivera’s murals in the Palacio Nacional, and end at the Palacio de Bellas Artes." },
      { title: "Chapultepec and Roma", text: "Spend the morning at the National Museum of Anthropology in Chapultepec Park, then eat and drink your way through Roma and Condesa." },
      { title: "Teotihuacan or Coyoacán", text: "Leave early to climb the pyramids at Teotihuacan, or visit the Frida Kahlo Museum in Coyoacán and the boats of Xochimilco." },
    ],
    daysNeeded: "Four to five days, including a day trip to Teotihuacan.",
    essentials: { currency: "Mexican peso (MXN)", plugs: "Types A and B, 127V", language: "Spanish" },
    faqs: [
      {
        q: "Does the altitude affect visitors to Mexico City?",
        a: "It can. The city is about 2,240 metres above sea level, so some visitors feel tired or short of breath at first. Take the first day gently and drink plenty of water.",
      },
      {
        q: "How do I get to Teotihuacan from Mexico City?",
        a: "Buses leave from the Terminal Autobuses del Norte, and many tours run from the city. Go early to beat the heat and the crowds.",
      },
    ],
    guides: ["24-hour-flight-cancellation-rule", "when-to-book-international-flights", "carry-on-only-checklist"],
  },
  cusco: {
    checked: "2026-11-03",
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
      { name: "Historic centre", bestFor: "First visits", text: "Around the Plaza de Armas, with Inca walls and colonial churches on every street." },
      { name: "San Blas", bestFor: "Views and artisans", text: "A steep, whitewashed quarter of workshops and small guesthouses above the centre." },
      { name: "Sacred Valley", bestFor: "Lower altitude and Machu Picchu trains", text: "Towns such as Urubamba and Ollantaytambo sit lower than Cusco and close to the trains." },
    ],
    itinerary: [
      { title: "Settle in slowly", text: "Take it easy at altitude: walk the Plaza de Armas, see the Qorikancha temple, and browse the San Pedro market." },
      { title: "The Sacred Valley", text: "Visit the market and ruins at Pisac and the fortress at Ollantaytambo, and stay the night in the valley." },
      { title: "Machu Picchu", text: "Take the train to Aguas Calientes and enter Machu Picchu on your timed ticket, booked well ahead." },
    ],
    daysNeeded: "Four to five days with Machu Picchu and the Sacred Valley, and more if you hike the Inca Trail.",
    essentials: { currency: "Peruvian sol (PEN)", plugs: "Types A and C, 220V", language: "Spanish and Quechua" },
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
    ],
    guides: ["self-transfer-separate-tickets", "carry-on-only-checklist", "when-to-book-international-flights"],
  },
  "new-york": {
    checked: "2026-11-03",
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
      { name: "Midtown", bestFor: "First visits", text: "Times Square, Broadway and Central Park, with subway lines in every direction." },
      { name: "Lower Manhattan", bestFor: "History and harbour views", text: "The 9/11 Memorial, Wall Street and ferries to the Statue of Liberty." },
      { name: "Greenwich Village and SoHo", bestFor: "Walking and restaurants", text: "Low-rise streets of cafés, shops and live music." },
      { name: "Upper West Side", bestFor: "Families and quieter nights", text: "Between Central Park and the Hudson, near the Natural History Museum." },
      { name: "Williamsburg, Brooklyn", bestFor: "Bars and skyline views", text: "Across the river, with restaurants, nightlife and often lower hotel prices." },
    ],
    itinerary: [
      { title: "Midtown", text: "Walk through the south of Central Park, see MoMA or the view from Top of the Rock, and end with a Broadway show near Times Square." },
      { title: "Lower Manhattan and Brooklyn", text: "Take the ferry to the Statue of Liberty and Ellis Island, visit the 9/11 Memorial, and walk the Brooklyn Bridge to DUMBO at sunset." },
      { title: "Museums and the High Line", text: "Spend the morning at the Met, walk the High Line to Chelsea Market, and have dinner in Greenwich Village." },
    ],
    daysNeeded: "Four to five days for a first visit.",
    essentials: { currency: "US dollar (USD)", plugs: "Types A and B, 120V", language: "English" },
    faqs: [
      {
        q: "JFK or Newark: which is easier for Manhattan?",
        a: "Both work. From JFK, the AirTrain links to the subway and the Long Island Rail Road; from Newark, the AirTrain links to trains into New York Penn Station in Midtown. Compare fares including the transfer, and think about where you’re staying.",
      },
      {
        q: "Do I need an ESTA to visit New York from the UK?",
        a: "Yes, if you travel under the Visa Waiver Program: British citizens need an approved ESTA before boarding. Apply on the official US government site; our ESTA and UK ETA guide explains how.",
      },
    ],
    guides: ["esta-and-uk-eta", "24-hour-flight-cancellation-rule", "hand-luggage-sizes-bag-fees"],
  },
};
