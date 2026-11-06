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
    // Batch 22 fields checked 6 Nov 2026: GOV.UK (112 from mobiles, 10111 police,
    // 10177 ambulance and fire), City of Cape Town (tap water meets SANS 241 standard),
    // tour operators and winelands guides (drive times, approximate).
    checked: "2026-11-06",
    timeZone: "Africa/Johannesburg",
    localTips: [
      { icon: "transport", title: "Use ride-hailing at night", text: "Order a ride by app after dark rather than walking, even for short distances. Many visitors hire a car for the peninsula and Winelands." },
      { icon: "weather", title: "Check the mountain first", text: "The Table Mountain cable car closes in strong wind or cloud. Check its status on the day, and go up early in clear weather." },
      { icon: "safety", title: "Keep valuables out of sight", text: "Don’t leave bags or phones visible in parked cars, on beaches or at viewpoints. Use paid car guards in busy car parks." },
      { icon: "money", title: "Tip car guards and waiters", text: "About 10% in restaurants is usual, and a small tip for petrol attendants and car guards. Carry small notes in rand." },
      { icon: "health", title: "Sun and sea are strong", text: "The sun is fierce even on cool days, and Atlantic beaches are cold with strong currents. Swim where lifeguards are on duty." },
      { icon: "phone", title: "Buy a local SIM or eSIM", text: "Data helps for ride-hailing apps and maps. Buy one at the airport or install an eSIM before you arrive." },
    ],
    foods: [
      { name: "Braai", text: "South Africa’s barbecue, with boerewors sausage, lamb chops and steak, found at braai restaurants and beach cafés across the city." },
      { name: "Cape Malay curry", text: "A mild, fragrant curry with apricots and spices from the Cape Malay community, served in the Bo-Kaap." },
      { name: "Bobotie", text: "Spiced minced meat baked under an egg custard, with yellow rice, on the menus of Cape restaurants." },
      { name: "Gatsby", text: "A long roll stuffed with chips, meat and sauce, a Cape Town fast-food favourite at takeaways in the suburbs." },
      { name: "Cape wine", text: "Pinotage, chenin blanc and Cape blends from the Stellenbosch and Franschhoek estates, also poured in city wine bars." },
      { name: "Fish and chips", text: "Line-caught fish with chips, eaten at Kalk Bay and Simon’s Town harbours." },
    ],
    dayTrips: [
      { name: "Stellenbosch", time: "About 45 minutes by car from the city centre", text: "A university town of oak-lined streets and Cape Dutch buildings, ringed by wine estates open for tastings.", photo: photos.capeTownTripStellenbosch },
      { name: "Franschhoek", time: "About 1 hour by car from the city centre", text: "A valley of vineyards founded by French Huguenots, known for its restaurants and wine estates.", photo: photos.capeTownTripFranschhoek },
      { name: "Hermanus", time: "About 1 hour 30 minutes to 2 hours by car", text: "A seaside town where southern right whales come close to shore in winter and spring, watched from the cliff path.", photo: photos.capeTownTripHermanus },
    ],
    visual: {
      days: [
        { photo: photos.capeTownCableCar, stops: ["Table Mountain cable car", "Bo-Kaap", "Company’s Garden", "V&A Waterfront"] },
        { photo: photos.capeTownBoulders, stops: ["Chapman’s Peak drive", "Cape Point", "Boulders Beach penguins", "Kalk Bay"] },
        { photo: photos.capeTownRobbenIsland, stops: ["Robben Island ferry", "Kirstenbosch Gardens", "Camps Bay sunset"] },
      ],
      stay: [
        { name: "V&A Waterfront", bestFor: "First visits", photo: photos.capeTown },
        { name: "City Bowl and De Waterkant", bestFor: "Restaurants", photo: photos.capeTownCityBowl },
        { name: "Camps Bay", bestFor: "The beach", photo: photos.capeTownCampsBay },
      ],
    },
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
    essentials: {
      currency: "South African rand (ZAR)",
      plugs: "Types C, D, M and N, 230V",
      language: "English, Afrikaans and isiXhosa, among others",
      emergency: "112 from a mobile, 10111 police, 10177 ambulance and fire",
      tipping: "About 10% in restaurants for good service; small tips for car guards and petrol attendants",
      water: "Tap water is safe to drink",
    },
    faqs: [
      {
        q: "When can you see whales near Cape Town?",
        a: "Southern right whales visit the Western Cape coast in winter and spring, roughly June to November. Hermanus, about two hours away, is known for watching from the shore.",
      },
      {
        q: "Can you see penguins near Cape Town?",
        a: "Yes, at Boulders Beach near Simon’s Town, home to a colony of African penguins, about an hour’s drive from the city.",
      },
      {
        q: "Is Cape Town safe for tourists?",
        a: "Most visits are trouble-free in the main tourist areas, but petty theft and street crime happen. Avoid walking alone after dark and don’t leave valuables in view; read GOV.UK’s South Africa travel advice before you go.",
      },
      {
        q: "Is Cape Town tap water safe to drink?",
        a: "Yes. The City of Cape Town says its tap water meets South Africa’s drinking-water standard (SANS 241). It can taste earthy at times, which the City says is harmless.",
      },
      {
        q: "Do I need a car in Cape Town?",
        a: "Not for the centre, where ride-hailing apps and the MyCiTi buses cover most trips. A car helps for the Cape Peninsula and the Winelands, where public transport is limited.",
      },
    ],
    guides: ["self-transfer-separate-tickets", "power-bank-rules-on-planes", "when-to-book-international-flights"],
  },
  marrakech: {
    // Batch 22 fields checked 6 Nov 2026 from search results (GOV.UK pages were not
    // reachable from the build sandbox): TODO(confirm) emergency numbers against GOV.UK,
    // bus 19 fare and day-trip drive times (tour-operator figures, approximate).
    checked: "2026-11-06",
    timeZone: "Africa/Casablanca",
    localTips: [
      { icon: "money", title: "Carry small notes", text: "Cards work in hotels and bigger restaurants. Taxis, souk stalls and cafés want cash in dirhams, and change is scarce." },
      { icon: "transport", title: "Agree the taxi fare first", text: "Airport and street taxis often have no meter, so settle the price before you get in. Petits taxis are the small ones for trips inside the city." },
      { icon: "safety", title: "Ignore unsolicited guides", text: "Say a firm no to people who offer to lead you through the medina or say a road is closed. Use a map app, or hire a guide through your riad." },
      { icon: "etiquette", title: "Haggle in the souks", text: "Prices on unmarked goods are open to bargaining. Start well below the ask and walk away politely if you don’t agree." },
      { icon: "dress", title: "Dress modestly", text: "Cover shoulders and knees in the medina and away from the pool. Non-Muslims can’t enter most mosques, so view them from outside." },
      { icon: "water", title: "Drink bottled water", text: "Locals may drink tap water, but visitors are advised to stick to bottled water and avoid ice from unknown places." },
    ],
    foods: [
      { name: "Tagine", text: "Meat or vegetables slow-cooked in a conical clay pot, served at riad restaurants and café terraces across the medina." },
      { name: "Couscous", text: "Steamed semolina with vegetables and meat, traditionally served on Fridays in family-run restaurants." },
      { name: "Pastilla", text: "A flaky pie of pigeon or chicken with almonds, cinnamon and sugar, a dish of special occasions that restaurants serve every day." },
      { name: "Mint tea", text: "Sweet green tea poured from a height into small glasses, offered as a welcome in riads, shops and cafés." },
      { name: "Harira", text: "A tomato, lentil and chickpea soup, eaten with dates, sold from stalls and cafés, especially at sunset in Ramadan." },
    ],
    dayTrips: [
      { name: "Ourika Valley", time: "About 1 hour by car from Marrakech", text: "A river valley in the High Atlas, with village markets, walking paths and cafés beside waterfalls. It’s the closest escape to the mountains.", photo: photos.marrakechTripAtlas },
      { name: "Essaouira", time: "About 2 hours 30 minutes by car or coach from Marrakech", text: "A walled Atlantic port with a whitewashed medina, ramparts, fish grills at the harbour and a long, windy beach.", photo: photos.marrakechTripEssaouira },
      { name: "Ouzoud Falls", time: "About 2 hours 30 minutes by car from Marrakech", text: "Waterfalls dropping through olive groves, with walking trails and boats below. Macaques live around the viewpoints.", photo: photos.marrakechTripOuzoud },
    ],
    visual: {
      days: [
        { photo: photos.marrakechBahia, stops: ["Koutoubia Mosque", "Bahia Palace", "Saadian Tombs", "Mint tea on a terrace"] },
        { photo: photos.marrakechJemaa, stops: ["The souks", "Ben Youssef Madrasa", "Jemaa el-Fna at sunset", "Food stalls"] },
        { photo: photos.marrakechMajorelle, stops: ["Jardin Majorelle", "Yves Saint Laurent Museum", "Gueliz", "Hammam"] },
      ],
      stay: [
        { name: "The Medina", bestFor: "First visits", photo: photos.marrakechRooftops },
        { name: "Gueliz", bestFor: "Restaurants and cafés", photo: photos.marrakechMajorelle },
        { name: "Hivernage and the Palmeraie", bestFor: "Pools and resorts", photo: photos.marrakechRiad },
      ],
    },
    airports: [
      {
        code: "RAK",
        name: "Marrakech Menara",
        summary: "About 6 km west of the medina, and the airport for all Marrakech flights.",
        transfers: [
          { mode: "bus", name: "Bus 19 (ALSA)", to: "Jemaa el-Fna and the medina edge", note: "Runs to the centre but not to your riad door. Check the current fare and times with the operator." },
          { mode: "taxi", name: "Airport taxi", to: "the medina and the new town", note: "Taxis from the rank have no meter, so agree the fare before you set off. Riads can arrange a pickup in advance." },
        ],
        officialPage: { label: "ONDA: Marrakech Menara Airport", url: "https://www.onda.ma/" },
      },
    ],
    weather: "GGBBBMMMGBBG",
    neighbourhoods: [
      { name: "The Medina", bestFor: "First visits", text: "The walled old city, with Jemaa el-Fna, the souks and the palaces on foot. Stay in a riad, a house around a courtyard, but expect narrow lanes where taxis can’t reach the door." },
      { name: "Gueliz", bestFor: "Restaurants and cafés", text: "The French-built new town, with wide streets, cafés, galleries and Jardin Majorelle nearby. Quieter and easier for taxis than the medina." },
      { name: "Hivernage", bestFor: "Hotels with pools", text: "A leafy district between the medina and Gueliz, with larger hotels and good restaurants. A short taxi from Jemaa el-Fna." },
      { name: "The Palmeraie", bestFor: "Resorts", text: "A palm grove on the northern edge with large resorts and villas. Peaceful, but you’ll need a taxi for almost everything." },
    ],
    itinerary: [
      { title: "Mosque, palaces and tombs", morning: "Start at the Koutoubia Mosque, then walk to the Bahia Palace before the tour groups arrive.", afternoon: "Visit the Saadian Tombs and the El Badi Palace ruins, then take mint tea on a rooftop terrace.", evening: "Head to Jemaa el-Fna as the food stalls open." },
      { title: "Souks and Jemaa el-Fna", morning: "Wander the souks while they open, with leather, spices and lanterns, then see the Ben Youssef Madrasa.", afternoon: "Rest at your riad or in a hammam in the hottest hours.", evening: "Watch Jemaa el-Fna fill up with storytellers, musicians and food stalls at sunset." },
      { title: "Gardens and the new town", morning: "Go to Jardin Majorelle when it opens, then the Yves Saint Laurent Museum next door.", afternoon: "Have lunch in Gueliz and browse its galleries and shops.", evening: "Eat on a medina rooftop and watch the sun set behind the Atlas Mountains." },
    ],
    daysNeeded: "Three days covers the main sights. Add a day for Ourika Valley, Essaouira or Ouzoud Falls.",
    gettingAround: "Walk inside the medina and use petits taxis to reach the new town and the gardens; agree the fare first or ask for the meter. Bus 19 runs from the airport to the medina edge. Many riads will arrange airport pickups.",
    essentials: {
      currency: "Moroccan dirham (MAD)",
      plugs: "Types C and E, 220V",
      language: "Arabic and Amazigh, with French widely spoken and English in tourist areas",
      emergency: "19 police, 177 gendarmerie, 15 ambulance and fire",
      tipping: "About 10% in restaurants for good service; small change for guides and porters",
      water: "Drink bottled water",
    },
    faqs: [
      { q: "When is the best time to visit Marrakech?", a: "March to May and October to November, when days are warm rather than hot. June to August is very hot, and winter nights are cold." },
      { q: "Do I need a visa for Morocco?", a: "British citizens can visit Morocco as tourists without a visa. Check GOV.UK’s Morocco entry requirements for the length of stay and passport validity before you fly." },
      { q: "How do I get from Marrakech airport to the medina?", a: "Take bus 19 to the medina edge or a taxi from the rank. Taxis have no meter, so agree the fare first, or ask your riad to arrange a pickup." },
      { q: "Is Marrakech safe for tourists?", a: "Most visits are trouble-free. Expect persistent touts, and watch for pickpockets in the souks and on Jemaa el-Fna; read GOV.UK’s Morocco travel advice before you go." },
      { q: "Do I need cash in Marrakech?", a: "Yes. Cards work in hotels and larger restaurants, but taxis, souks and cafés run on dirhams. Carry small notes." },
    ],
    guides: ["self-transfer-separate-tickets", "power-bank-rules-on-planes", "when-to-book-international-flights"],
  },
  "abu-dhabi": {
    // Batch 22 fields checked 6 Nov 2026: u.ae (999 police, 998 ambulance, 997 civil defence),
    // search results for airport buses A1 and A2 (check Abu Dhabi Mobility), Grand Mosque (free,
    // dress code enforced). TODO(confirm): airport page link, day-trip drive times.
    checked: "2026-11-06",
    timeZone: "Asia/Dubai",
    localTips: [
      { icon: "dress", title: "Dress for the Grand Mosque", text: "Entry is free, and the dress code is strictly enforced at the door. Cover arms and legs fully and, for women, hair." },
      { icon: "transport", title: "Taxis and the Darbi app", text: "Use licensed taxis or ride-hailing apps. Buses are run by Abu Dhabi Mobility, which publishes routes on its Darbi app." },
      { icon: "weather", title: "Plan around the heat", text: "From about May to September, do outdoor sights early or after sunset. Most sights, malls and museums are air-conditioned." },
      { icon: "etiquette", title: "Respect local law", text: "Public drunkenness, public displays of affection and photographing people without asking can cause trouble. Check GOV.UK’s UAE page before you go." },
      { icon: "health", title: "Bring your prescription", text: "Some common medicines are controlled in the UAE. Carry a copy of your prescription and check the rules before you pack." },
      { icon: "money", title: "Check the bill", text: "Many restaurants add a service charge. If there isn’t one, 10 to 15% is a normal tip for good service." },
    ],
    foods: [
      { name: "Machboos", text: "Spiced rice with chicken, lamb or fish, the Emirati home dish, served at Emirati restaurants and Qasr Al Hosn events." },
      { name: "Luqaimat", text: "Small fried dumplings drizzled with date syrup, sold hot at heritage cafés and festivals." },
      { name: "Shawarma", text: "Spit-roasted chicken or lamb in flatbread, from the cheap cafeterias off the Corniche." },
      { name: "Arabic coffee and dates", text: "Light, cardamom-scented gahwa poured in small cups with dates, the traditional welcome, offered in hotels and cafés." },
      { name: "Camel milk chocolate", text: "A local souvenir made from camel milk, sold in Emirati chocolate shops and gift stores." },
    ],
    dayTrips: [
      { name: "Dubai", time: "About 1 hour 30 minutes by car, longer in traffic", text: "The Burj Khalifa, Dubai Mall and the old creek, easy to combine in one long day.", photo: photos.dubaiDowntown },
      { name: "Sharjah", time: "About 2 hours by car", text: "A calmer emirate with a restored Heritage Area, museums on Islamic art and civilisation, and a grand mosque.", photo: photos.dubaiSharjah },
      { name: "Liwa Desert", time: "About 2 hours by road", text: "Huge dunes at the edge of the Empty Quarter, reached by road and best with a driver or a local operator.", photo: photos.abuDhabiDesert },
    ],
    visual: {
      days: [
        { photo: photos.abuDhabiMosque, stops: ["Sheikh Zayed Grand Mosque", "Qasr Al Watan", "Emirates Palace", "Dinner on the Corniche"] },
        { photo: photos.abuDhabiLouvre, stops: ["Louvre Abu Dhabi", "Saadiyat Beach", "Manarat Al Saadiyat", "Sunset on the water"] },
        { photo: photos.abuDhabiCorniche, stops: ["The Corniche", "Heritage Village", "Etihad Towers", "Yas Island"] },
      ],
      stay: [
        { name: "The Corniche and city centre", bestFor: "First visits", photo: photos.abuDhabiCorniche },
        { name: "Saadiyat Island", bestFor: "Beaches and museums", photo: photos.abuDhabiLouvre },
        { name: "Yas Island", bestFor: "Theme parks and the Grand Prix", photo: photos.abuDhabiYas },
      ],
    },
    airports: [
      {
        code: "AUH",
        name: "Zayed International (Abu Dhabi)",
        summary: "About 30 km east of the city centre, and the airport for all Abu Dhabi flights.",
        transfers: [
          { mode: "bus", name: "Airport buses A1 and A2", to: "the city centre, Al Zahiyah and Khalifa Street", note: "Pay with a Hafilat card. Check routes and times on the Darbi app or with Abu Dhabi Mobility." },
          { mode: "taxi", name: "Taxi", to: "anywhere in the city", note: "From the official ranks outside arrivals." },
        ],
        officialPage: { label: "Abu Dhabi Airports", url: "https://www.abudhabiairport.ae/" },
      },
    ],
    weather: "BBBGMMMMMGBB",
    neighbourhoods: [
      { name: "The Corniche and city centre", bestFor: "First visits", text: "A waterfront promenade with beaches, cafés and towers, close to the old centre and the Heritage Village. The easiest base for taxis and buses." },
      { name: "Saadiyat Island", bestFor: "Beaches and museums", text: "Home to Louvre Abu Dhabi and a long beach, with resort hotels. Quiet, with little to do on foot beyond the island." },
      { name: "Yas Island", bestFor: "Theme parks and the Grand Prix", text: "Theme parks, a marina and the Yas Marina Circuit, with large family hotels. About 30 minutes from the centre by taxi." },
      { name: "Al Maryah and Al Reem Islands", bestFor: "Business and shopping", text: "Towers, malls and restaurants on islands linked to the centre by bridge. Practical for business trips." },
    ],
    itinerary: [
      { title: "Grand Mosque and palaces", morning: "Visit the Sheikh Zayed Grand Mosque in the morning, dressed to its dress code.", afternoon: "See Qasr Al Watan and Emirates Palace on the waterfront.", evening: "Dine on the Corniche." },
      { title: "Saadiyat Island", morning: "Spend the morning at Louvre Abu Dhabi.", afternoon: "Relax on Saadiyat Beach.", evening: "Watch the sunset from the water, then eat on the island or in the centre." },
      { title: "Corniche and Yas Island", morning: "Walk or cycle the Corniche, then see the Heritage Village.", afternoon: "Go up to the Etihad Towers viewing platform, or head to Yas Island for the theme parks.", evening: "Have dinner at Yas Marina." },
    ],
    daysNeeded: "Two to three days. It also works as a day trip from Dubai.",
    gettingAround: "Taxis and ride-hailing are the simplest way around. Buses run across the city on a Hafilat card, and Abu Dhabi Mobility publishes routes on its Darbi app. The sights are spread out, so plan by area.",
    essentials: {
      currency: "UAE dirham (AED)",
      plugs: "Type G, 230V",
      language: "Arabic, with English widely spoken",
      emergency: "999 police, 998 ambulance, 997 fire",
      tipping: "Check the bill for a service charge; if there isn’t one, 10 to 15% for good service",
      water: "Most visitors drink bottled or filtered water",
    },
    faqs: [
      { q: "Is the Sheikh Zayed Grand Mosque free to visit?", a: "Yes, entry is free. The dress code is strictly enforced, so cover arms and legs fully, and women should cover their hair." },
      { q: "Is Abu Dhabi worth visiting if I’m in Dubai?", a: "Yes, for the Grand Mosque, Louvre Abu Dhabi and a quieter feel. It’s about 1 hour 30 minutes from Dubai by car, so it works as a day trip or a separate stay." },
      { q: "Is Abu Dhabi expensive?", a: "Costs depend on how you travel, so we don’t quote prices. Hotels are often cheaper from about May to September, when the heat is extreme." },
      { q: "Do I need a visa for Abu Dhabi?", a: "British citizens with a full British passport get a free visit visa on arrival in the UAE. Check GOV.UK’s UAE entry requirements for the length of stay and passport validity." },
      { q: "Can you drink alcohol in Abu Dhabi?", a: "Yes, in licensed hotels, bars and restaurants. Drinking in public places is illegal, and being drunk in public is an offence." },
    ],
    guides: ["self-transfer-separate-tickets", "power-bank-rules-on-planes", "when-to-book-international-flights"],
  },
};
