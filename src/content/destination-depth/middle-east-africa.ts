import { photos } from "../images";
import type { DestinationDepth } from "./types";

// Journey times checked 3 Nov 2026 on the pages linked beside them. Where an
// operator's page didn't give a current fare, none is shown.

export const middleEastAfricaDepth: Record<string, DestinationDepth> = {
  dubai: {
    // Batch 22 fields checked 6 Nov 2026: u.ae (999 police, 998 ambulance),
    // RTA (nol card, metro cabins, no eating or drinking on the metro and tram),
    // DEWA via Gulf News (tap water meets WHO guidelines), Visit Dubai (tipping),
    // RTA (Hatta Express bus), GOV.UK (visa on arrival, travel advice).
    checked: "2026-11-06",
    timeZone: "Asia/Dubai",
    localTips: [
      { icon: "transport", title: "Get a nol card", text: "One nol card pays for the metro, tram, buses and water buses. Top it up at any metro station." },
      { icon: "etiquette", title: "Check the metro cabin", text: "Each train has a Gold Class cabin for Gold card holders and cabins for women and children only. Check the signs on the platform before you board." },
      { icon: "food", title: "No snacks on the metro", text: "Eating and drinking aren’t allowed on the metro or tram, and inspectors fine people for it. Wait until you’re out of the station." },
      { icon: "dress", title: "Cover up in malls and mosques", text: "Swimwear is for the beach and the pool. In malls, souks and the old town, cover your shoulders and knees." },
      { icon: "health", title: "Bring your prescription", text: "Some common medicines are controlled in the UAE. Carry a copy of your prescription and check GOV.UK before you pack." },
      { icon: "weather", title: "Plan around the heat", text: "From about May to September, do outdoor sights early or after sunset. Carry water, even on short walks." },
    ],
    foods: [
      { name: "Machboos", text: "Spiced rice cooked with chicken, lamb or fish, the Emirati home dish, served in Emirati restaurants around Al Fahidi and Al Seef." },
      { name: "Luqaimat", text: "Small fried dumplings drizzled with date syrup, sold hot at Emirati cafés and food stalls, especially in winter." },
      { name: "Shawarma", text: "Spit-roasted chicken or lamb wrapped in flatbread with garlic sauce, from the late-night cafeterias of Deira and Bur Dubai." },
      { name: "Karak chai", text: "Strong tea boiled with milk, sugar and cardamom, poured at roadside cafeterias across the city." },
      { name: "Dates and Arabic coffee", text: "Light, cardamom-scented gahwa poured in small cups with dates, the traditional welcome, offered in hotel lobbies and Emirati cafés." },
    ],
    dayTrips: [
      { name: "Abu Dhabi", time: "About 1 hour 30 minutes by car or intercity bus", text: "The UAE’s capital, for the Sheikh Zayed Grand Mosque, free to visit, and the Louvre Abu Dhabi on Saadiyat Island.", photo: photos.dubaiTripAbuDhabi },
      { name: "Hatta", time: "About 1 hour 30 minutes by car or the Hatta Express bus from Dubai Mall", text: "A mountain town in the Hajar range, for kayaking on Hatta Dam, hiking and mountain-bike trails.", photo: photos.dubaiHatta },
      { name: "Sharjah", time: "About 30 minutes by car, longer in rush hour", text: "Dubai’s neighbour, with a restored Heritage Area, museums on Islamic art and civilisation, and a calmer pace.", photo: photos.dubaiSharjah },
    ],
    visual: {
      days: [
        { photo: photos.dubaiAbra, stops: ["Al Fahidi", "Abra across the creek", "Gold and spice souks", "Dinner by the creek"] },
        { photo: photos.dubaiFountain, stops: ["Dubai Frame", "Dubai Mall", "Burj Khalifa at sunset", "Dubai Fountain"] },
        { photo: photos.dubaiDesert, stops: ["JBR or Kite Beach", "Desert trip", "Dinner at a desert camp"] },
      ],
      stay: [
        { name: "Downtown Dubai", bestFor: "First visits", photo: photos.dubaiDowntown },
        { name: "Dubai Marina and JBR", bestFor: "The beach", photo: photos.dubaiMarina },
        { name: "Deira and Bur Dubai", bestFor: "Old Dubai and value", photo: photos.dubaiAlSeef },
      ],
    },
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
    essentials: {
      currency: "UAE dirham (AED)",
      plugs: "Type G, 230V",
      language: "Arabic, with English widely spoken",
      emergency: "999 police, 998 ambulance, 997 fire",
      tipping: "Check the bill for a service charge; if there isn’t one, 10 to 15% for good service",
      water: "Tap water meets WHO guidelines at the mains, but most visitors drink bottled or filtered water",
    },
    faqs: [
      {
        q: "How far is Dubai Airport from the Burj Khalifa?",
        a: "Not far. Burj Khalifa/Dubai Mall is a station on the Dubai Metro Red Line, which serves Terminals 1 and 3, so you can ride straight there. Terminal 2 isn’t on the metro.",
      },
      {
        q: "Is Dubai too hot to visit in summer?",
        a: "From about May to September, daytime heat is extreme and outdoor sightseeing is hard. Hotels are often cheaper then; November to March is the comfortable season.",
      },
      {
        q: "Do I need a visa for Dubai?",
        a: "British citizens with a full British passport get a free visit visa on arrival. Check GOV.UK’s UAE entry requirements for the length of stay and passport validity before you fly; US citizens should check travel.state.gov.",
      },
      {
        q: "Is Dubai safe to visit?",
        a: "Street crime is low, but the UK Foreign Office changed its UAE advice several times in 2026 because of tensions in the region. Read the current GOV.UK travel advice before you book and again before you fly.",
      },
      {
        q: "Can you drink alcohol in Dubai?",
        a: "Yes, in licensed hotels, bars and restaurants, which check ID. Drinking in the street, on beaches or in parks is illegal, and so is being drunk in public.",
      },
    ],
    guides: ["self-transfer-separate-tickets", "power-bank-rules-on-planes", "when-to-book-international-flights"],
  },
  istanbul: {
    // Batch 22 fields checked 6 Nov 2026: GOV.UK (visa-free stays for British
    // citizens, 112), istanbul.com and Şehir Hatları timetables via search
    // (Princes’ Islands and Bosphorus ferries), İDO via Uludağ University (Bursa ferry).
    checked: "2026-11-06",
    timeZone: "Europe/Istanbul",
    localTips: [
      { icon: "transport", title: "Buy an İstanbulkart", text: "One card for the tram, metro, Marmaray, ferries and buses, and much cheaper than single tickets. Buy and top it up at machines by the stations and piers." },
      { icon: "dress", title: "Dress for the mosques", text: "Cover shoulders and knees, and women cover their hair. Mosques close to visitors during prayers, so plan around them." },
      { icon: "money", title: "Carry some lira", text: "Cards work in most shops and restaurants, but small cafés, kiosks and bazaar stalls often want cash." },
      { icon: "safety", title: "Watch for common scams", text: "Be wary of friendly strangers who suggest a bar, and of shoe-shiners who drop a brush. Agree prices before any service." },
      { icon: "etiquette", title: "Haggle in the bazaars", text: "Bargaining is normal in the Grand Bazaar and other markets. Fixed-price shops and restaurants don’t haggle." },
      { icon: "water", title: "Drink bottled water", text: "Most locals drink bottled or filtered water rather than tap water. It’s sold everywhere." },
    ],
    foods: [
      { name: "Simit", text: "A sesame-crusted bread ring sold from street carts all over the city, eaten for breakfast with tea." },
      { name: "Balık ekmek", text: "Grilled fish in bread with onion and salad, sold by the boats and stalls at Eminönü beside the Galata Bridge." },
      { name: "Turkish breakfast", text: "A spread of cheeses, olives, tomatoes, eggs, honey and bread with endless tea, served in cafés across Kadıköy and Beşiktaş." },
      { name: "Döner and İskender", text: "Spit-roasted meat, sliced into bread or served as İskender over bread with tomato sauce and yoghurt, in kebab houses citywide." },
      { name: "Baklava", text: "Layers of filo, pistachios and syrup, sold by weight in pastry shops, with Karaköy known for its baklava makers." },
      { name: "Turkish tea and coffee", text: "Strong black tea in tulip glasses all day, and thick coffee served with a glass of water, at every café." },
    ],
    dayTrips: [
      { name: "Princes’ Islands", time: "About 1 hour 30 minutes by ferry from Kabataş or Eminönü", text: "Car-free islands in the Sea of Marmara, with wooden mansions, pine woods and swimming spots; Büyükada is the largest.", photo: photos.istanbulTripBuyukada },
      { name: "Bursa", time: "About 1 hour 30 minutes by İDO ferry from Yenikapı, plus the ride into town", text: "The first Ottoman capital, with the Green Mosque, old silk markets and the cable car up Uludağ.", photo: photos.istanbulTripBursa },
      { name: "The Upper Bosphorus", time: "About 1 hour 30 minutes each way by the Bosphorus ferry from Eminönü", text: "Ride the public ferry past the palaces and fortresses to Anadolu Kavağı, then walk up to Yoros Castle for the view of the Black Sea.", photo: photos.istanbulTripBosphorus },
    ],
    visual: {
      days: [
        { photo: photos.istanbulHagiaSophia, stops: ["Hagia Sophia", "Blue Mosque", "Basilica Cistern", "Topkapı Palace"] },
        { photo: photos.istanbulGalataBridge, stops: ["Grand Bazaar", "Spice Bazaar", "Bosphorus ferry", "Galata Bridge"] },
        { photo: photos.istanbulDolmabahce, stops: ["Kadıköy market", "Dolmabahçe Palace", "İstiklal Avenue", "Taksim Square"] },
      ],
      stay: [
        { name: "Sultanahmet", bestFor: "First visits", photo: photos.istanbulBlueMosque },
        { name: "Beyoğlu and Galata", bestFor: "Nightlife", photo: photos.istanbulGalata },
        { name: "Kadıköy", bestFor: "Food and a local feel", photo: photos.istanbulKadikoy },
      ],
    },
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
    essentials: {
      currency: "Turkish lira (TRY)",
      plugs: "Types C and F, 230V",
      language: "Turkish",
      emergency: "112",
      tipping: "About 10% in restaurants if service isn’t included; round up for taxis",
      water: "Drink bottled or filtered water",
    },
    faqs: [
      {
        q: "Which Istanbul airport should I fly into?",
        a: "Istanbul Airport (IST), on the European side, handles most international flights and is the easier choice for the old town. Sabiha Gökçen (SAW), on the Asian side, is used mainly by budget airlines, so check which one your fare uses.",
      },
      {
        q: "What should I wear to visit Istanbul’s mosques?",
        a: "Cover your shoulders and knees, and women should cover their hair; scarves are often available at the entrance. Visits pause at prayer times.",
      },
      {
        q: "Do I need a visa for Istanbul?",
        a: "Not if you’re a British citizen visiting as a tourist: you can stay up to 90 days in any 180-day period without a visa. Check passport validity rules on GOV.UK’s Türkiye entry requirements page; other nationalities should check Türkiye’s e-Visa site.",
      },
      {
        q: "Is the Bosphorus ferry the same as a cruise?",
        a: "No. The city’s Şehir Hatları ferries, both the commuter boats and the scheduled Bosphorus tour, cost much less than private cruises, which add commentary, music or dinner. The views from the water are the same.",
      },
      {
        q: "Is Istanbul safe for tourists?",
        a: "Most visits are trouble-free. The usual risks are pickpockets and scams in crowded areas such as İstiklal Avenue, the bazaars and the trams. Read GOV.UK’s Türkiye travel advice before you go.",
      },
    ],
    guides: ["self-transfer-separate-tickets", "hand-luggage-sizes-bag-fees", "europe-shoulder-season"],
  },
  cairo: {
    // Batch 22 fields checked 6 Nov 2026: GOV.UK (Egypt emergency numbers
    // 122, 123, 126, 180; visa needed for British citizens), train guides for
    // Ramses to Alexandria (about 2.5 hours on faster trains), tour operators’
    // routes for Saqqara and Dahshur.
    checked: "2026-11-06",
    timeZone: "Africa/Cairo",
    localTips: [
      { icon: "transport", title: "Use a ride-hailing app", text: "Apps give a fixed fare up front and save haggling. If you take a street taxi, agree the price first." },
      { icon: "money", title: "Keep small notes", text: "Small tips are expected for many services, from bathroom attendants to guards who open a tomb. Carry low-value Egyptian pound notes." },
      { icon: "safety", title: "Agree prices at the pyramids", text: "Camel, horse and carriage rides at Giza are offered hard. Settle the full price and what it covers before you get on." },
      { icon: "dress", title: "Dress modestly", text: "Cover shoulders and knees in mosques, old Cairo and markets. Women need a headscarf in mosques." },
      { icon: "phone", title: "Tourist police: 126", text: "The tourist police handle scams, harassment and lost documents, and often speak English. Their number is 126." },
      { icon: "water", title: "Don’t drink the tap water", text: "Drink bottled water and avoid ice from unknown sources. Bottles are sold everywhere." },
    ],
    foods: [
      { name: "Koshari", text: "Rice, lentils, pasta and chickpeas under spicy tomato sauce and crispy onions, Egypt’s favourite cheap meal, served in koshari shops downtown." },
      { name: "Ful medames", text: "Slow-cooked fava beans with oil, cumin and lemon, eaten for breakfast with bread from street carts and cafés." },
      { name: "Ta’ameya", text: "Egypt’s falafel, made with fava beans rather than chickpeas, green inside and fried to order at breakfast stalls." },
      { name: "Molokhia", text: "A silky green soup of jute leaves with garlic and coriander, served with rice or bread in Egyptian home-style restaurants." },
      { name: "Feteer meshaltet", text: "Flaky layered pastry, eaten with honey or cheese, from feteer bakeries across the city." },
    ],
    dayTrips: [
      { name: "Saqqara and Memphis", time: "About 45 minutes to an hour by car from Giza", text: "The Step Pyramid of Djoser, the oldest of Egypt’s pyramids, and painted tombs, with the open-air museum at Memphis nearby.", photo: photos.cairoTripSaqqara },
      { name: "Dahshur", time: "Usually combined with Saqqara on a day with a driver", text: "The Bent Pyramid and the Red Pyramid, which you can enter, with far fewer visitors than Giza.", photo: photos.cairoTripDahshur },
      { name: "Alexandria", time: "About 2 hours 30 minutes by train from Ramses Station", text: "Egypt’s Mediterranean city, for the Citadel of Qaitbay, the modern Bibliotheca Alexandrina and fish restaurants on the seafront.", photo: photos.cairoTripAlexandria },
    ],
    visual: {
      days: [
        { photo: photos.cairoSphinx, stops: ["Giza pyramids", "The Sphinx", "Grand Egyptian Museum", "Sound and light show"] },
        { photo: photos.cairoCitadel, stops: ["Coptic Cairo", "Ben Ezra Synagogue", "The Citadel", "Khan el-Khalili"] },
        { photo: photos.cairoMuseumHall, stops: ["Egyptian Museum", "Al-Azhar Park", "Felucca on the Nile"] },
      ],
      stay: [
        { name: "Downtown", bestFor: "Central and busy", photo: photos.cairoMuseum },
        { name: "Zamalek", bestFor: "A calmer base", photo: photos.cairoZamalek },
        { name: "Giza", bestFor: "Pyramid views", photo: photos.cairo },
      ],
    },
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
    essentials: {
      currency: "Egyptian pound (EGP)",
      plugs: "Types C and F, 220V",
      language: "Arabic",
      emergency: "122 police, 123 ambulance, 180 fire, 126 tourist police",
      tipping: "Small tips are expected for most services; about 10% in restaurants, even when a service charge is added",
      water: "Drink bottled water",
    },
    faqs: [
      {
        q: "How far are the pyramids from central Cairo?",
        a: "The Giza pyramids are on the western edge of greater Cairo, about 20 km from downtown. Allow an hour or more by car in traffic.",
      },
      {
        q: "What is the Grand Egyptian Museum?",
        a: "A large museum beside the Giza pyramids that houses the Tutankhamun collection. It’s easy to combine with the pyramids on the same day.",
      },
      {
        q: "Do I need a visa for Egypt?",
        a: "Yes, British passport holders normally need one. You can apply for an e-visa before you travel or buy a visa on arrival at Cairo airport; check GOV.UK’s Egypt entry requirements for the current rules.",
      },
      {
        q: "Do I need cash in Cairo?",
        a: "Yes. Hotels, malls and larger restaurants take cards, but tips, small cafés, markets and street taxis run on Egyptian pounds. Carry small notes.",
      },
      {
        q: "Is Cairo safe for tourists?",
        a: "Most visits are trouble-free, and the main sights have a visible police presence. Expect persistent touts at the big sites, and read GOV.UK’s Egypt travel advice before you book: the Foreign Office advises against travel to some parts of the country.",
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
