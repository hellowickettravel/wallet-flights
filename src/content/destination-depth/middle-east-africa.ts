import type { DestinationDepth } from "./types";

// Journey times checked 3 Nov 2026 on the pages linked beside them. Where an
// operator's page didn't give a current fare, none is shown.

export const middleEastAfricaDepth: Record<string, DestinationDepth> = {
  dubai: {
    checked: "2026-11-03",
    airports: [
      {
        code: "DXB",
        name: "Dubai International",
        summary: "On the edge of the city, close to Deira and about 15 km from Downtown Dubai.",
        transfers: [
          { mode: "metro", name: "Dubai Metro Red Line", to: "Burj Khalifa/Dubai Mall and Dubai Marina", note: "From Terminals 1 and 3. Terminal 2 isn’t on the metro." },
          { mode: "taxi", name: "Taxi", to: "anywhere in the city", note: "From the official ranks outside arrivals." },
        ],
        officialPage: { label: "Dubai Airports: Dubai Metro at DXB", url: "https://dubaiairports.ae/transport/metro" },
      },
    ],
    weather: "BBBGMMMMMGBB",
    neighbourhoods: [
      { name: "Downtown Dubai", bestFor: "First visits", text: "Burj Khalifa, Dubai Mall and the fountains, on the metro’s Red Line. Smart hotels with skyline views, and the busiest area at night." },
      { name: "Dubai Marina and JBR", bestFor: "The beach", text: "High-rise hotels around a marina, with the JBR beach promenade, restaurants and the tram. Popular with families and for evening walks." },
      { name: "Deira and Bur Dubai", bestFor: "Old Dubai and value", text: "The creek, the gold and spice souks and the Al Fahidi historic district, with cheaper hotels near the airport and metro." },
      { name: "Palm Jumeirah", bestFor: "Resorts", text: "Beach resorts on the man-made island, quieter and further from the metro, so you’ll use taxis." },
      { name: "Jumeirah", bestFor: "Low-rise beach stays", text: "Public beaches with views of the Burj Al Arab, villas and smaller hotels, between Downtown and the Marina." },
    ],
    itinerary: [
      { title: "Old Dubai", morning: "Walk the Al Fahidi historic district while it’s cooler, with its wind towers, galleries and cafés.", afternoon: "Cross the creek by abra, a traditional wooden boat, and browse the gold and spice souks in Deira.", evening: "Have dinner by the creek as the boats light up." },
      { title: "Downtown", morning: "Visit the Dubai Frame or a museum in the morning, out of the heat.", afternoon: "Explore Dubai Mall and its aquarium in the afternoon.", evening: "Go up the Burj Khalifa at sunset on a booked slot, then watch the fountain show below." },
      { title: "Desert or beach", morning: "Spend the morning on JBR or Kite Beach.", afternoon: "Join an afternoon desert trip with dune drives and a camp.", evening: "Dinner under the stars in the desert, or along the water at Dubai Marina." },
    ],
    daysNeeded: "Three to four days, or one to two nights as a stopover on a long-haul trip.",
    gettingAround: "The Dubai Metro’s Red and Green lines cover the airport, the old town, Downtown and the Marina; buy a nol card for the metro, trams and buses. Taxis and ride-hailing are plentiful and fill the gaps, especially in summer heat.",
    essentials: { currency: "UAE dirham (AED)", plugs: "Type G, 230V", language: "Arabic, with English widely spoken" },
    faqs: [
      {
        q: "How far is Dubai Airport from the Burj Khalifa?",
        a: "Not far. Burj Khalifa/Dubai Mall is a station on the Dubai Metro Red Line, which serves Terminals 1 and 3, so you can ride straight there. Terminal 2 isn’t on the metro.",
      },
      {
        q: "Is Dubai too hot to visit in summer?",
        a: "From about May to September, daytime heat is extreme and outdoor sightseeing is hard. Hotels are often cheaper then; November to March is the comfortable season.",
      },
    ],
    guides: ["self-transfer-separate-tickets", "power-bank-rules-on-planes", "when-to-book-international-flights"],
  },
  istanbul: {
    checked: "2026-11-03",
    airports: [
      {
        code: "IST",
        name: "Istanbul Airport",
        summary: "About 40 km north-west of the old town, on the European side, and the airport for most international flights.",
        transfers: [
          { mode: "metro", name: "M11 metro", to: "Gayrettepe, changing to the M2 for Taksim", time: "30 minutes to Gayrettepe" },
          { mode: "bus", name: "Havaist airport buses", to: "Taksim, Sultanahmet and other districts" },
        ],
        officialPage: { label: "Istanbul Airport: transport", url: "https://www.istairport.com/en/airport/airport-transportation" },
      },
      {
        code: "SAW",
        name: "Sabiha Gökçen",
        summary: "On the Asian side, used mainly by budget airlines.",
        transfers: [{ mode: "metro", name: "M4 metro", to: "Kadıköy, for ferries across the Bosphorus" }],
        officialPage: { label: "Sabiha Gökçen Airport", url: "https://www.sabihagokcen.aero/" },
      },
    ],
    weather: "MMGBBGGGBBMM",
    neighbourhoods: [
      { name: "Sultanahmet", bestFor: "First visits", text: "The old city, where Hagia Sophia, the Blue Mosque and Topkapı Palace are a few minutes’ walk apart. Very convenient for sightseeing, quieter in the evenings." },
      { name: "Beyoğlu and Galata", bestFor: "Nightlife", text: "İstiklal Avenue, the Galata Tower, rooftop bars and restaurants, across the Golden Horn from the old city. Lively until late." },
      { name: "Karaköy", bestFor: "Cafés by the water", text: "A waterfront quarter of design hotels, cafés and galleries, with ferries and the tram at the door." },
      { name: "Kadıköy", bestFor: "Food and a local feel", text: "The Asian side’s market streets, cafés and restaurants, a short, scenic ferry ride from Europe. Good value and very local." },
      { name: "Nişantaşı", bestFor: "Shopping", text: "Upmarket boutiques and restaurants north of Taksim, with a polished, residential feel." },
    ],
    itinerary: [
      { title: "The old city", morning: "See Hagia Sophia early, dressed modestly, then the Blue Mosque outside prayer times.", afternoon: "Go down into the Basilica Cistern, then spend the afternoon in Topkapı Palace and its harem.", evening: "Have dinner with a view of the Bosphorus from a rooftop in Sultanahmet." },
      { title: "Bazaars and the Bosphorus", morning: "Browse the Grand Bazaar as it opens, then walk down to the Spice Bazaar.", afternoon: "Take a public ferry along the Bosphorus, which is cheaper than a tour boat.", evening: "Cross the Galata Bridge at sunset and eat in Galata or Karaköy." },
      { title: "Two continents", morning: "Ferry to Kadıköy for breakfast and its food market.", afternoon: "Return to see the Dolmabahçe Palace on the European shore.", evening: "Walk İstiklal Avenue to Taksim Square in the evening." },
    ],
    daysNeeded: "Three to four days for the main sights.",
    gettingAround: "Load an İstanbulkart for the trams, metro, ferries, buses and funiculars; it’s much cheaper than single tickets and can be shared. The T1 tram links Sultanahmet with the bridges, and ferries are the best way to cross between Europe and Asia.",
    essentials: { currency: "Turkish lira (TRY)", plugs: "Types C and F, 230V", language: "Turkish" },
    faqs: [
      {
        q: "Which Istanbul airport should I fly into?",
        a: "Istanbul Airport (IST), on the European side, handles most international flights and is the easier choice for the old town. Sabiha Gökçen (SAW), on the Asian side, is used mainly by budget airlines, so check which one your fare uses.",
      },
      {
        q: "What should I wear to visit Istanbul’s mosques?",
        a: "Cover your shoulders and knees, and women should cover their hair; scarves are often available at the entrance. Visits pause at prayer times.",
      },
    ],
    guides: ["self-transfer-separate-tickets", "hand-luggage-sizes-bag-fees", "europe-shoulder-season"],
  },
  cairo: {
    checked: "2026-11-03",
    airports: [
      {
        code: "CAI",
        name: "Cairo International",
        summary: "About 20 km north-east of downtown Cairo.",
        transfers: [
          { mode: "taxi", name: "Taxi or ride-hailing", to: "downtown, Zamalek and Giza", note: "Agree the fare first if the taxi has no meter, and allow extra time: Cairo’s traffic is heavy." },
        ],
        officialPage: { label: "Cairo International Airport", url: "https://www.cairo-airport.com/" },
      },
    ],
    weather: "BBBBGMMMMBBB",
    neighbourhoods: [
      { name: "Downtown", bestFor: "Central and busy", text: "Around Tahrir Square and the Egyptian Museum, with the metro, cafés and plenty of budget hotels. Noisy and full of life." },
      { name: "Zamalek", bestFor: "A calmer base", text: "A leafy island in the Nile with restaurants, galleries, embassies and riverside hotels, close to downtown." },
      { name: "Giza", bestFor: "Pyramid views", text: "Hotels with views of the pyramids and next to the Grand Egyptian Museum, but an hour or more from the rest of the city in traffic." },
      { name: "Garden City", bestFor: "The Nile", text: "Quiet streets and grand hotels on the river, a walk from downtown and the Egyptian Museum." },
    ],
    itinerary: [
      { title: "The pyramids", morning: "Reach the Giza pyramids and the Sphinx as they open, before the heat and the crowds.", afternoon: "Visit the Grand Egyptian Museum next door, home of the Tutankhamun collection.", evening: "Watch the sound and light show at the pyramids, or have dinner with a view of them." },
      { title: "Old Cairo", morning: "Visit Coptic Cairo’s churches and the Ben Ezra Synagogue.", afternoon: "Climb to the Citadel and the Mosque of Muhammad Ali for the view over the city.", evening: "Wander the Khan el-Khalili bazaar and have tea at a café in its lanes." },
      { title: "The Nile", morning: "See the Egyptian Museum on Tahrir Square.", afternoon: "Walk in Al-Azhar Park, a calm green space above the old city.", evening: "Sail a felucca on the Nile at sunset." },
    ],
    daysNeeded: "Three days for Cairo and Giza. Most visitors then head south to Luxor and Aswan.",
    gettingAround: "Ride-hailing apps are the easiest way round Cairo, with fixed prices and no haggling. The metro is cheap and useful for downtown, Coptic Cairo and some other districts. Traffic is heavy at most times, so allow extra time.",
    essentials: { currency: "Egyptian pound (EGP)", plugs: "Types C and F, 220V", language: "Arabic" },
    faqs: [
      {
        q: "How far are the pyramids from central Cairo?",
        a: "The Giza pyramids are on the western edge of greater Cairo, about 20 km from downtown. Allow an hour or more by car in traffic.",
      },
      {
        q: "What is the Grand Egyptian Museum?",
        a: "A large museum beside the Giza pyramids that houses the Tutankhamun collection. It’s easy to combine with the pyramids on the same day.",
      },
    ],
    guides: ["self-transfer-separate-tickets", "power-bank-rules-on-planes", "when-to-book-international-flights"],
  },
  "cape-town": {
    checked: "2026-11-03",
    airports: [
      {
        code: "CPT",
        name: "Cape Town International",
        summary: "About 20 km east of the city centre.",
        transfers: [
          { mode: "taxi", name: "Taxi or ride-hailing", to: "the city centre and the Atlantic coast", note: "Use the marked pick-up points in arrivals. Many visitors hire a car for the peninsula and the Winelands." },
        ],
        officialPage: { label: "Airports Company South Africa", url: "https://www.airports.co.za/" },
      },
    ],
    weather: "BBBGMMMMGGBB",
    neighbourhoods: [
      { name: "V&A Waterfront", bestFor: "First visits", text: "Harbourside hotels, restaurants, shops and the ferry to Robben Island, with Table Mountain behind. Busy, well kept and convenient." },
      { name: "City Bowl and De Waterkant", bestFor: "Restaurants", text: "Central streets below Table Mountain, near the Bo-Kaap’s colourful houses and Bree Street’s restaurants." },
      { name: "Sea Point", bestFor: "The ocean promenade", text: "A long seafront walk, ocean pools and good-value restaurants, between the city and the beaches." },
      { name: "Camps Bay", bestFor: "The beach", text: "A palm-lined beach under the Twelve Apostles, known for sunsets and beachfront restaurants." },
    ],
    itinerary: [
      { title: "Table Mountain and the city", morning: "Ride the cable car up Table Mountain early if the weather is clear; it closes in strong wind.", afternoon: "Walk through the Bo-Kaap and the Company’s Garden.", evening: "Have dinner at the V&A Waterfront or on Bree Street." },
      { title: "The Cape Peninsula", morning: "Drive Chapman’s Peak towards the Cape of Good Hope.", afternoon: "Walk to the Cape Point lighthouse, then see the penguins at Boulders Beach on the way back.", evening: "Stop in Kalk Bay for seafood by the harbour." },
      { title: "History, gardens or wine", morning: "Take the morning ferry to Robben Island, booked well ahead.", afternoon: "Spend the afternoon in Kirstenbosch’s gardens, or go to Stellenbosch and Franschhoek for the day instead.", evening: "Watch the sunset from Camps Bay or Signal Hill." },
    ],
    daysNeeded: "Four to five days, plus extra for the Winelands or the Garden Route.",
    gettingAround: "Ride-hailing apps are the usual way round the city, and many visitors hire a car for the peninsula and the Winelands. The MyCiTi buses cover the centre and the Atlantic coast. Avoid walking alone after dark away from busy areas.",
    essentials: { currency: "South African rand (ZAR)", plugs: "Types C, D, M and N, 230V", language: "English, Afrikaans and isiXhosa, among others" },
    faqs: [
      {
        q: "When can you see whales near Cape Town?",
        a: "Southern right whales visit the Western Cape coast in winter and spring, roughly June to November. Hermanus, about two hours away, is known for watching from the shore.",
      },
      {
        q: "Can you see penguins near Cape Town?",
        a: "Yes, at Boulders Beach near Simon’s Town, home to a colony of African penguins, about an hour’s drive from the city.",
      },
    ],
    guides: ["self-transfer-separate-tickets", "power-bank-rules-on-planes", "when-to-book-international-flights"],
  },
};
