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
      { name: "Downtown Dubai", bestFor: "First visits", text: "Burj Khalifa, Dubai Mall and the fountains, on the metro’s Red Line." },
      { name: "Dubai Marina and JBR", bestFor: "The beach", text: "High-rise hotels, a beach promenade and waterfront restaurants." },
      { name: "Deira and Bur Dubai", bestFor: "Old Dubai and value", text: "The creek, the souks and the Al Fahidi historic district, with cheaper hotels near the airport." },
      { name: "Palm Jumeirah", bestFor: "Resorts", text: "Beach resorts on the man-made island, quieter and further from the metro." },
      { name: "Jumeirah", bestFor: "Low-rise beach stays", text: "Public beaches with views of the Burj Al Arab, and villas and smaller hotels." },
    ],
    itinerary: [
      { title: "Old Dubai", text: "Walk the Al Fahidi historic district, cross the creek by abra, and browse the gold and spice souks in Deira." },
      { title: "Downtown", text: "Book a sunset slot at the top of the Burj Khalifa, explore Dubai Mall, and stay for the fountain show." },
      { title: "Desert or beach", text: "Take an afternoon desert trip with dinner under the stars, or spend the day at JBR beach and the evening at Dubai Marina." },
    ],
    daysNeeded: "Three to four days, or one to two nights as a stopover on a long-haul trip.",
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
      { name: "Sultanahmet", bestFor: "First visits", text: "The old city’s great sights within a few minutes’ walk: Hagia Sophia, the Blue Mosque and Topkapı Palace." },
      { name: "Beyoğlu and Galata", bestFor: "Nightlife", text: "İstiklal Avenue, rooftop bars and the Galata Tower, across the Golden Horn." },
      { name: "Karaköy", bestFor: "Cafés by the water", text: "A waterfront quarter of design hotels and cafés, with ferries at the door." },
      { name: "Kadıköy", bestFor: "Food and a local feel", text: "The Asian side’s lively market streets, a short ferry ride from Europe." },
      { name: "Nişantaşı", bestFor: "Shopping", text: "Upmarket boutiques and restaurants north of Taksim." },
    ],
    itinerary: [
      { title: "The old city", text: "See Hagia Sophia, the Blue Mosque and the Basilica Cistern, then spend the afternoon in Topkapı Palace." },
      { title: "Bazaars and the Bosphorus", text: "Browse the Grand Bazaar and the Spice Bazaar, take a public ferry along the Bosphorus, and end the evening in Galata." },
      { title: "Two continents", text: "Ferry to Kadıköy for lunch at its market, return to see Dolmabahçe Palace, and walk İstiklal Avenue to Taksim." },
    ],
    daysNeeded: "Three to four days for the main sights.",
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
      { name: "Downtown", bestFor: "Central and busy", text: "Around Tahrir Square and the Egyptian Museum, with the metro and plenty of budget hotels." },
      { name: "Zamalek", bestFor: "A calmer base", text: "A leafy island in the Nile with restaurants, galleries and riverside hotels." },
      { name: "Giza", bestFor: "Pyramid views", text: "Hotels with views of the pyramids and next to the Grand Egyptian Museum, but far from the rest of the city." },
      { name: "Garden City", bestFor: "The Nile", text: "Quiet streets and grand hotels on the river, a walk from downtown." },
    ],
    itinerary: [
      { title: "The pyramids", text: "Reach the Giza pyramids and the Sphinx as they open, before the heat, then visit the Grand Egyptian Museum next door." },
      { title: "Old Cairo", text: "See Coptic Cairo’s churches, then the Citadel and the Mosque of Muhammad Ali, and finish in the Khan el-Khalili bazaar." },
      { title: "The Nile", text: "Visit the Egyptian Museum on Tahrir Square, walk in Al-Azhar Park, and sail a felucca on the Nile at sunset." },
    ],
    daysNeeded: "Three days for Cairo and Giza. Most visitors then head south to Luxor and Aswan.",
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
      { name: "V&A Waterfront", bestFor: "First visits", text: "Harbourside hotels, restaurants and the ferry to Robben Island." },
      { name: "City Bowl and De Waterkant", bestFor: "Restaurants", text: "Central streets below Table Mountain, near the Bo-Kaap’s colourful houses." },
      { name: "Sea Point", bestFor: "The ocean promenade", text: "A long seafront walk, pools and good-value restaurants." },
      { name: "Camps Bay", bestFor: "The beach", text: "A palm-lined beach under the Twelve Apostles, known for sunsets." },
    ],
    itinerary: [
      { title: "Table Mountain and the city", text: "Ride the cable car up Table Mountain if the weather is clear, walk through the Bo-Kaap, and end at the V&A Waterfront." },
      { title: "The Cape Peninsula", text: "Drive Chapman’s Peak to the Cape of Good Hope, and see the penguins at Boulders Beach on the way back." },
      { title: "History, gardens or wine", text: "Take the ferry to Robben Island and visit Kirstenbosch gardens, or spend the day in Stellenbosch and Franschhoek." },
    ],
    daysNeeded: "Four to five days, plus extra for the Winelands or the Garden Route.",
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
