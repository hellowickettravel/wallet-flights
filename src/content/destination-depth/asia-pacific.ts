import { photos } from "../images";
import type { DestinationDepth } from "./types";

// Fares and journey times checked 3 Nov 2026 on the pages linked beside them.
// Where an operator's page didn't give a current fare, none is shown.
// Neighbourhoods, day plans and getting around rewritten in more depth (3 Nov 2026).

const limousineHnd = { label: "Airport Limousine Bus: Haneda to Shinjuku", url: "https://www.limousinebus.co.jp/en/line/detail/Haneda-Shinjuku/" };
const limousineNrt = { label: "Airport Limousine Bus: Narita and Tokyo Station", url: "https://www.limousinebus.co.jp/en/timetable/detail/Narita-Tokyo/?dir=2" };
const changiLeaving = { label: "Changi Airport: leaving the airport", url: "https://www.changiairport.com/en/at-changi/transport-and-directions/leaving-the-airport.html" };
const dmkBus = { label: "Don Mueang Airport: BMTA buses", url: "https://donmueang.airportthai.co.th/service/transportation/detail/205" };

export const asiaPacificDepth: Record<string, DestinationDepth> = {
  tokyo: {
    // Batch 22 fields checked 6 Nov 2026: Japan Tourism Agency/JNTO visitor sheet
    // (110 and 119), GOV.UK entry requirements, Odakyu (Romancecar about 80
    // minutes), Tobu (about 2 hours to Nikko).
    checked: "2026-11-06",
    timeZone: "Asia/Tokyo",
    localTips: [
      { icon: "money", title: "Carry some cash", text: "Hotels, chains and stations take cards, but small restaurants, shrines and market stalls may be cash only. ATMs at 7-Eleven and post offices usually accept foreign cards." },
      { icon: "transport", title: "Get a Suica or Pasmo", text: "One IC card, or the version on your phone, pays for trains, the metro, buses and many shops. Top it up at any station machine." },
      { icon: "etiquette", title: "Keep quiet on trains", text: "Phone calls on trains are frowned on, so set your phone to silent. Queue in the marked lines on the platform." },
      { icon: "money", title: "Don’t leave a tip", text: "Tipping isn’t part of the culture, and staff may chase you to hand back money left on the table." },
      { icon: "phone", title: "Sort data before you land", text: "An eSIM bought before you fly is simplest. Airports also sell data SIMs and rent pocket Wi-Fi routers." },
      { icon: "weather", title: "Plan round the summer heat", text: "July and August are hot and humid, and typhoons can disrupt travel in late summer and early autumn. Start sightseeing early." },
    ],
    foods: [
      { name: "Sushi", text: "Raw fish on vinegared rice, from conveyor-belt chains to counters around the Tsukiji Outer Market." },
      { name: "Ramen", text: "Noodles in a rich broth, sold all over the city, with a row of well-known shops on Ramen Street inside Tokyo Station." },
      { name: "Tempura", text: "Seafood and vegetables fried in a light batter, a classic in the old restaurants of Asakusa and Ginza." },
      { name: "Yakitori", text: "Grilled chicken skewers, best in the tiny bars of Omoide Yokocho in Shinjuku or under the tracks at Yurakucho." },
      { name: "Monjayaki", text: "A runny savoury pancake you cook on a hotplate at the table, the speciality of Monja Street in Tsukishima." },
    ],
    dayTrips: [
      { name: "Kamakura", time: "About 1 hour by JR train from Tokyo Station", text: "The bronze Great Buddha, Hase-dera temple and Tsurugaoka Hachimangu shrine, with a beach close to the station.", photo: photos.tokyoTripKamakura },
      { name: "Hakone", time: "About 80 minutes by Odakyu Romancecar from Shinjuku", text: "Hot springs, boats on Lake Ashi and a ropeway over the volcanic valley of Owakudani, with Mount Fuji in view on clear days.", photo: photos.tokyoTripHakone },
      { name: "Nikko", time: "About 2 hours by Tobu limited express from Asakusa", text: "The ornate Toshogu shrine and the red Shinkyo bridge, a World Heritage Site in forested mountains.", photo: photos.tokyoTripNikko },
    ],
    visual: {
      days: [
        { photo: photos.tokyoSensoji, stops: ["Senso-ji", "Ueno Park", "Ameyoko", "Tokyo Skytree"] },
        { photo: photos.tokyoShibuya, stops: ["Meiji Jingu", "Harajuku", "Shibuya Crossing", "Omoide Yokocho"] },
        { photo: photos.tokyoMarket, stops: ["Tsukiji Outer Market", "Ginza", "Hama-rikyu Gardens", "Odaiba"] },
      ],
      stay: [
        { name: "Shinjuku", bestFor: "First visits and nightlife", photo: photos.tokyoShinjuku },
        { name: "Shibuya", bestFor: "Shopping and youth culture", photo: photos.tokyoShibuya },
        { name: "Asakusa", bestFor: "Old Tokyo and value", photo: photos.tokyoSensoji },
      ],
    },
    airports: [
      {
        code: "HND",
        name: "Haneda",
        summary: "About 15 km south of central Tokyo, and the closer of the city’s two airports.",
        transfers: [
          { mode: "train", name: "Tokyo Monorail", to: "Hamamatsucho, for the JR Yamanote line" },
          { mode: "train", name: "Keikyu line", to: "Shinagawa, for JR lines and the Shinkansen" },
          { mode: "bus", name: "Airport Limousine Bus", to: "Shinjuku Station", time: "about 50 minutes, longer in traffic", fare: { text: "¥2,800", source: limousineHnd } },
        ],
        officialPage: { label: "Haneda Airport: trains and monorail", url: "https://tokyo-haneda.com/en/access/train/index.html" },
      },
      {
        code: "NRT",
        name: "Narita",
        summary: "About 60 km east of central Tokyo, used by many airlines including lower-cost ones.",
        transfers: [
          { mode: "train", name: "Narita Express (N’EX)", to: "Tokyo Station, Shinjuku and Shibuya" },
          { mode: "train", name: "Keisei Skyliner", to: "Nippori and Ueno" },
          { mode: "bus", name: "Airport Limousine Bus", to: "Tokyo Station", fare: { text: "¥3,100", source: limousineNrt } },
        ],
        officialPage: { label: "Narita International Airport", url: "https://www.narita-airport.jp/en/" },
      },
    ],
    weather: "GGBBGMMMMBBG",
    neighbourhoods: [
      { name: "Shinjuku", bestFor: "First visits and nightlife", text: "Tokyo’s biggest rail hub, with skyscrapers, department stores and the tiny bars of Golden Gai and Omoide Yokocho. Trains go almost everywhere from here, including to Hakone and Mount Fuji. Busy, bright and safe at all hours." },
      { name: "Shibuya", bestFor: "Shopping and youth culture", text: "The famous crossing, new towers with rooftop views and Harajuku a short walk away. Good for shopping and nightlife, and on the Yamanote line round the city." },
      { name: "Asakusa", bestFor: "Old Tokyo and value", text: "Around Senso-ji temple, with traditional shops, rickshaws and river cruises. Some of Tokyo’s better-value hotels, though it’s further from the west of the city." },
      { name: "Ginza and Tokyo Station", bestFor: "Upscale stays and the Shinkansen", text: "Department stores, galleries and sushi counters, next to the bullet trains for Kyoto and the airport buses. Polished and expensive, and quiet at night." },
      { name: "Ueno", bestFor: "Museums and Narita trains", text: "Ueno Park’s museums and zoo, the Ameyoko market street, and the Skyliner straight to Narita. Good value and well connected." },
    ],
    itinerary: [
      { title: "Asakusa and Ueno", morning: "Visit Senso-ji early, before the crowds, and walk Nakamise shopping street.", afternoon: "Take the metro to Ueno Park for the Tokyo National Museum, then browse the Ameyoko market street.", evening: "Ride up the Tokyo Skytree or eat at a small restaurant in Asakusa as the temple lights up." },
      { title: "Meiji Jingu to Shinjuku", morning: "Walk through the forest to the Meiji Jingu shrine, then into Harajuku’s backstreets.", afternoon: "Cross Shibuya Crossing and see it from above at one of the new observation decks.", evening: "Take the train to Shinjuku for dinner in the small-bar alleys of Omoide Yokocho or Golden Gai." },
      { title: "Markets and the bay", morning: "Have breakfast at the Tsukiji Outer Market’s food stalls.", afternoon: "Stroll Ginza and the gardens of Hama-rikyu, or take a day trip to Kamakura, Hakone or Nikko instead.", evening: "Spend the evening at Odaiba on the bay, or in an izakaya near Tokyo Station." },
    ],
    daysNeeded: "Four to five days for Tokyo itself. Add more for Kyoto, a Shinkansen ride away, or for Hakone and Nikko.",
    gettingAround: "Trains and the metro. A rechargeable IC card such as Suica or Pasmo works on almost every train, metro and bus, and in many shops, so you rarely need tickets; you can also add one to your phone. The JR Yamanote line loops round the main districts.",
    essentials: {
      currency: "Japanese yen (JPY)",
      plugs: "Types A and B, 100V",
      language: "Japanese",
      emergency: "110 for police, 119 for ambulance and fire",
      tipping: "Not expected, and money left behind is often returned",
      water: "Tap water is safe to drink",
    },
    faqs: [
      {
        q: "Narita or Haneda: which is closer to Shinjuku and Shibuya?",
        a: "Haneda. It’s about 15 km from central Tokyo, against about 60 km for Narita, so the trip to Shinjuku or Shibuya is usually much shorter. If a Narita fare is much cheaper, weigh the saving against the longer transfer.",
      },
      {
        q: "When is cherry blossom season in Tokyo?",
        a: "Usually from late March to early April, though the dates move each year with the weather. Flights and hotels fill early, so book well ahead if you want to see it.",
      },
      {
        q: "Do I need cash in Tokyo?",
        a: "Some. Cards and phone payments work in hotels, chains, stations and most shops, but small restaurants, shrines and market stalls may take cash only. ATMs at 7-Eleven and post offices usually accept foreign cards.",
      },
      {
        q: "Do UK citizens need a visa for Japan?",
        a: "Not for a short holiday. UK passport holders get permission to stay for tourism for up to 90 days on arrival, with no application beforehand, according to GOV.UK’s Japan entry requirements. Check the page before you travel, as rules can change.",
      },
      {
        q: "Is Tokyo safe for tourists?",
        a: "Yes, it’s one of the safer big cities to visit, including at night. Take normal care in nightlife districts, and read the earthquake guidance in your hotel room when you arrive.",
      },
    ],
    guides: ["when-to-book-international-flights", "self-transfer-separate-tickets", "power-bank-rules-on-planes"],
  },
  bali: {
    // Batch 22 fields checked 6 Nov 2026: GOV.UK Indonesia entry requirements
    // (visa on arrival), Love Bali (tourist levy). Emergency numbers are
    // Indonesia's national ones.
    checked: "2026-11-06",
    timeZone: "Asia/Makassar",
    localTips: [
      { icon: "money", title: "Keep small notes", text: "Cards work in hotels and most restaurants, but warungs, markets and temple donations need cash. Use ATMs inside banks or shops." },
      { icon: "transport", title: "Book a driver for days out", text: "There’s almost no public transport for visitors. Ride-hailing apps cover the south and Ubud; hire a driver for longer trips." },
      { icon: "dress", title: "Cover up at temples", text: "Wear a sarong and sash to enter temples; most lend or rent one at the gate. Shoulders should be covered." },
      { icon: "safety", title: "Mind the monkeys", text: "Monkeys at Uluwatu and in Ubud snatch sunglasses, phones and food. Keep bags closed and loose items out of reach." },
      { icon: "water", title: "Don’t drink the tap water", text: "Drink bottled or filtered water, and many hotels and cafés offer refills. Watch for ice in very basic places." },
      { icon: "etiquette", title: "Step round offerings", text: "Small palm-leaf offerings (canang sari) are placed on pavements and doorsteps each day. Try not to tread on them." },
    ],
    foods: [
      { name: "Babi guling", text: "Spit-roast suckling pig with spiced stuffing and rice, served at lunchtime in specialist warungs, many of them around Ubud." },
      { name: "Nasi campur", text: "Rice with small portions of meat, vegetables, egg and sambal, the everyday lunch at warungs across the island." },
      { name: "Sate lilit", text: "Minced fish or meat mixed with coconut and spices, wrapped round lemongrass sticks and grilled, found at warungs and night markets." },
      { name: "Bebek betutu", text: "Duck rubbed with spice paste and slow-cooked in banana leaves, a Balinese ceremonial dish now served in Ubud restaurants." },
      { name: "Nasi goreng", text: "Fried rice with sweet soy, shallots and a fried egg on top, sold everywhere from street carts to beach cafés." },
    ],
    dayTrips: [
      { name: "Nusa Penida", time: "About 45 minutes by fast boat from Sanur", text: "Clifftop views over Kelingking Beach, snorkelling with manta rays and rough island roads, best with a booked driver.", photo: photos.baliTripNusaPenida },
      { name: "Mount Batur", time: "About 1 hour by car from Ubud, with a pre-dawn start", text: "A guided sunrise hike up an active volcano, with views over Lake Batur and hot springs below.", photo: photos.baliTripBatur },
      { name: "Bedugul and Ulun Danu Beratan", time: "About 1 hour 30 minutes by car from Ubud", text: "The lakeside water temple in the cool highlands, often paired with the botanic garden and nearby waterfalls.", photo: photos.bali },
    ],
    visual: {
      days: [
        { photo: photos.baliMonkeyForest, stops: ["Campuhan Ridge", "Sacred Monkey Forest", "Ubud Palace", "Ubud market"] },
        { photo: photos.baliTegallalang, stops: ["Tegallalang", "Tirta Empul", "Ubud rice fields"] },
        { photo: photos.baliUluwatu, stops: ["Seminyak beach", "Padang Padang", "Uluwatu Temple", "Kecak dance"] },
      ],
      stay: [
        { name: "Seminyak", bestFor: "Restaurants and beach clubs", photo: photos.baliBeachClub },
        { name: "Ubud", bestFor: "Culture and rice terraces", photo: photos.baliTegallalang },
        { name: "Uluwatu", bestFor: "Cliffs and sunsets", photo: photos.baliUluwatu },
      ],
    },
    airports: [
      {
        code: "DPS",
        name: "I Gusti Ngurah Rai (Denpasar)",
        summary: "In the south of the island near Kuta, the only international airport on Bali.",
        transfers: [
          { mode: "taxi", name: "Official airport taxi", to: "Seminyak, Canggu, Ubud and the rest of the island", note: "Book at the official desk in arrivals." },
          { mode: "taxi", name: "Ride-hailing apps", to: "the south and Ubud", note: "Use the airport’s marked pick-up points. Traffic in the south can be heavy, so allow extra time." },
        ],
        officialPage: { label: "I Gusti Ngurah Rai International Airport", url: "https://ngurahrai.injourneyairports.id/" },
      },
    ],
    weather: "MMMGBBBBBGMM",
    neighbourhoods: [
      { name: "Seminyak", bestFor: "Restaurants and beach clubs", text: "Stylish restaurants, boutiques and beach clubs on a long sandy beach, about half an hour from the airport outside rush hour. Sunsets here are a nightly event. Busy roads, so walking is limited." },
      { name: "Ubud", bestFor: "Culture and rice terraces", text: "The island’s cultural centre in the green hills, with temples, the Sacred Monkey Forest, craft villages, yoga retreats and rice terraces nearby. Cooler at night, but there’s no beach." },
      { name: "Canggu", bestFor: "Surf and cafés", text: "Surf beaches, rice fields and café culture, popular with longer-stay visitors and remote workers. Traffic on its narrow roads can be heavy at busy times." },
      { name: "Uluwatu", bestFor: "Cliffs and sunsets", text: "Clifftop hotels above famous surf breaks on the southern Bukit peninsula, with the Uluwatu temple and small coves below. You’ll need a driver or scooter to get around." },
      { name: "Sanur", bestFor: "Families and calm water", text: "A quieter east-coast town with a reef-sheltered beach, a long seafront path and boats to Nusa Lembongan. Relaxed, and closer to Ubud than the west coast." },
    ],
    itinerary: [
      { title: "Ubud", morning: "Walk the Campuhan Ridge path early, before the heat.", afternoon: "Visit the Sacred Monkey Forest Sanctuary, the royal palace and Ubud market; keep bags closed near the monkeys.", evening: "Watch a traditional dance performance at one of Ubud’s temples or the palace." },
      { title: "Rice terraces and water temples", morning: "See the Tegallalang rice terraces early, before the crowds.", afternoon: "Visit the holy springs at Tirta Empul, wearing a sarong; one is usually provided at the entrance.", evening: "Have dinner overlooking the rice fields around Ubud." },
      { title: "The south coast", morning: "Spend the morning on the beach at Seminyak or Sanur.", afternoon: "Drive to the Bukit peninsula for Padang Padang or another of the small coves below the cliffs.", evening: "Watch the sunset and a Kecak fire dance at Uluwatu Temple." },
    ],
    daysNeeded: "A week lets you split your time between Ubud and the coast. With four or five days, pick one base.",
    gettingAround: "By car with a driver, or with ride-hailing apps, as there is almost no public transport for visitors. Many people hire a driver for the day for longer trips. Scooters are common, but only ride one if you hold the right licence and your insurance covers it.",
    essentials: {
      currency: "Indonesian rupiah (IDR)",
      plugs: "Types C and F, 230V",
      language: "Indonesian and Balinese",
      emergency: "112, or 110 for police and 118 or 119 for an ambulance",
      tipping: "Not expected; many restaurants add a service charge, and rounding up is appreciated",
      water: "Don’t drink tap water; use bottled or filtered water",
    },
    faqs: [
      {
        q: "What is Bali’s airport called?",
        a: "I Gusti Ngurah Rai International Airport, often listed as Denpasar (DPS). It’s in the south of the island, near Kuta.",
      },
      {
        q: "Is there a tourist levy in Bali?",
        a: "Yes. Foreign visitors pay a tourist levy, which you can pay online through Bali’s official Love Bali system before you travel or on arrival. Check the current amount there before you go.",
      },
      {
        q: "Do I need a visa for Bali?",
        a: "Yes. UK visitors need a visa for Indonesia, and a 30-day visa on arrival is available, which you can also apply for online before you fly. Check GOV.UK’s Indonesia entry requirements for the current rules.",
      },
      {
        q: "Can you drink the tap water in Bali?",
        a: "No. Drink bottled or filtered water; many hotels, cafés and refill stations offer it. Use it for brushing your teeth too if your stomach is sensitive.",
      },
      {
        q: "Is it better to stay in Ubud or Seminyak?",
        a: "Split your stay if you can. Ubud suits temples, rice terraces and culture; Seminyak suits beaches, restaurants and sunsets. With only a few days, pick the one that matches your trip, as the drive between them can be slow.",
      },
    ],
    guides: ["when-to-book-international-flights", "carry-on-only-checklist", "self-transfer-separate-tickets"],
  },
  singapore: {
    // Batch 22 fields checked 6 Nov 2026: SPF and SCDF (999 and 995), PUB (tap
    // water), NParks (Pulau Ubin bumboats), ferry timetables (Bintan).
    checked: "2026-11-06",
    timeZone: "Asia/Singapore",
    localTips: [
      { icon: "transport", title: "Tap your bank card", text: "Contactless bank cards and phones work on the MRT and buses, so there’s no need to buy a travel card. Use the same card each time." },
      { icon: "etiquette", title: "No eating on the MRT", text: "Eating and drinking are banned on trains and in stations, and fines apply. Durians aren’t allowed on board either." },
      { icon: "safety", title: "Fines are enforced", text: "Littering, jaywalking and smoking outside marked areas can all bring fines. Selling or importing chewing gum is banned." },
      { icon: "money", title: "Service charge is built in", text: "Most restaurants add a 10% service charge plus GST, shown on the bill. Hawker centres have neither." },
      { icon: "weather", title: "Expect daily showers", text: "It’s hot and humid all year, with short, heavy downpours. Carry an umbrella and use the covered walkways." },
      { icon: "food", title: "Use the tissue packet rule", text: "At hawker centres, a packet of tissues on a seat means it’s taken. Order, then find a table." },
    ],
    foods: [
      { name: "Hainanese chicken rice", text: "Poached chicken on rice cooked in chicken stock, with chilli and ginger sauce, at almost every hawker centre." },
      { name: "Chilli crab", text: "Crab in a sweet, spicy tomato and egg sauce, eaten with fried buns at seafood restaurants on the East Coast and by the river." },
      { name: "Laksa", text: "Rice noodles in a spicy coconut curry broth with prawns and fishcake, best known from the Katong area." },
      { name: "Char kway teow", text: "Flat rice noodles stir-fried with egg, prawns and Chinese sausage in dark soy, a hawker-centre staple." },
      { name: "Kaya toast", text: "Toast spread with coconut jam and butter, with soft-boiled eggs and kopi, the traditional breakfast at coffee shops." },
    ],
    dayTrips: [
      { name: "Pulau Ubin", time: "About 10 to 15 minutes by bumboat from Changi Point", text: "A rural island of village houses, quarry lakes and the Chek Jawa wetlands, best explored by hired bicycle.", photo: photos.singaporeTripUbin },
      { name: "Bintan", time: "About 1 hour by ferry from Tanah Merah", text: "An Indonesian island of beach resorts, mangrove boat trips and the dunes beside a blue lake. Take your passport.", photo: photos.singaporeTripBintan },
      { name: "Johor Bahru", time: "A short bus or train ride from Woodlands, plus border checks", text: "Malaysia’s southern city, with markets, temples and lower prices just across the Causeway. Take your passport and avoid rush hour.", photo: photos.singaporeTripJohor },
    ],
    visual: {
      days: [
        { photo: photos.singaporeMarinaBay, stops: ["Merlion", "Helix Bridge", "Gardens by the Bay", "Supertree light show"] },
        { photo: photos.singaporeChinatown, stops: ["Buddha Tooth Relic Temple", "Sultan Mosque", "Haji Lane", "Little India"] },
        { photo: photos.singaporeBotanic, stops: ["Singapore Botanic Gardens", "Orchard Road", "Sentosa"] },
      ],
      stay: [
        { name: "Marina Bay", bestFor: "The skyline", photo: photos.singaporeMarinaBay },
        { name: "Chinatown", bestFor: "Food and value", photo: photos.singaporeChinatown },
        { name: "Sentosa", bestFor: "Families and resorts", photo: photos.singaporeSentosa },
      ],
    },
    airports: [
      {
        code: "SIN",
        name: "Changi",
        summary: "About 20 km east of the city centre, with the Jewel complex between its terminals.",
        transfers: [
          { mode: "metro", name: "MRT", to: "the city, changing at Tanah Merah or Expo", time: "about 50 minutes to Marina Bay" },
          { mode: "taxi", name: "Taxi", to: "the city centre", time: "about 30 minutes", fare: { text: "S$25 to S$45", source: changiLeaving } },
        ],
        officialPage: changiLeaving,
      },
    ],
    weather: "MGGGGGGGGGMM",
    neighbourhoods: [
      { name: "Marina Bay", bestFor: "The skyline", text: "Gardens by the Bay, the waterfront promenade and the city’s best-known hotels, with skyline views at every turn. Expensive, but every main sight is close by." },
      { name: "Chinatown", bestFor: "Food and value", text: "Hawker centres, temples and restored shophouses, with some of the city’s better-value hotels. Central, and on several MRT lines." },
      { name: "Clarke Quay and the river", bestFor: "Nightlife", text: "Riverside bars and restaurants in old warehouses, a walk along the river from Marina Bay. Lively and loud late at night." },
      { name: "Little India and Kampong Glam", bestFor: "Culture and cheaper rooms", text: "Colourful streets, temples, the Sultan Mosque and the boutiques of Haji Lane. Good food at low prices and some of the cheaper hotels in the city." },
      { name: "Sentosa", bestFor: "Families and resorts", text: "An island of beaches, theme parks and resorts, linked to the city by road, cable car and monorail. Great with children; quieter for exploring the rest of the city." },
    ],
    itinerary: [
      { title: "Marina Bay", morning: "Walk the waterfront from the Merlion to the Helix Bridge before the heat builds.", afternoon: "Explore the Cloud Forest and Flower Dome at Gardens by the Bay, out of the sun.", evening: "Stay for the free evening light show among the Supertrees, then see the skyline from the bay." },
      { title: "Chinatown, Kampong Glam and Little India", morning: "Have breakfast at a Chinatown hawker centre and visit the Buddha Tooth Relic Temple.", afternoon: "See the Sultan Mosque and Haji Lane in Kampong Glam, then the temples and shops of Little India.", evening: "Eat dinner at a hawker centre such as Lau Pa Sat or Newton." },
      { title: "Gardens and Orchard Road", morning: "Start early in the Singapore Botanic Gardens, a UNESCO World Heritage Site.", afternoon: "Shop or escape the heat in the malls of Orchard Road.", evening: "Spend the evening on Sentosa, or at the Night Safari, booked ahead." },
    ],
    daysNeeded: "Three to four days. Singapore also works well as a stopover of one or two nights on the way to Australia or Asia.",
    gettingAround: "The MRT and buses reach almost everywhere, and you can tap a contactless bank card or phone to pay. Taxis and ride-hailing are easy to find, and many sights are linked by covered walkways out of the sun and rain.",
    essentials: {
      currency: "Singapore dollar (SGD)",
      plugs: "Type G, 230V",
      language: "English, Mandarin, Malay and Tamil",
      emergency: "999 for police, 995 for ambulance and fire",
      tipping: "Not expected; restaurants usually add a 10% service charge",
      water: "Tap water is safe to drink",
    },
    faqs: [
      {
        q: "Is Singapore a good stopover?",
        a: "Yes. Changi is connected to the city by MRT and taxi, and the main sights are close together, so one or two nights is enough for a first look. If you’re booking a long-haul trip, compare fares with a stop in Singapore against flying through.",
      },
      {
        q: "What is the best way to get around Singapore?",
        a: "The MRT and buses reach almost everywhere and accept contactless bank cards. Taxis and ride-hailing are easy to find too.",
      },
      {
        q: "Is chewing gum illegal in Singapore?",
        a: "Selling and importing it is banned, apart from some medical gum, so you won’t find it in shops. Leave it at home to be safe, and never drop gum in the street.",
      },
      {
        q: "Can you drink the tap water in Singapore?",
        a: "Yes. Tap water from the national water agency, PUB, is safe to drink straight from the tap, so carry a refillable bottle.",
      },
      {
        q: "Is Singapore expensive?",
        a: "Hotels and alcohol are, but eating out needn’t be. Hawker centres serve full meals for much less than restaurants, and the MRT is good value for getting around.",
      },
    ],
    guides: ["self-transfer-separate-tickets", "power-bank-rules-on-planes", "when-to-book-international-flights"],
  },
  bangkok: {
    // Batch 22 fields checked 6 Nov 2026: thailand.go.th (191, 1669, Tourist
    // Police 1155), Royal Thai Embassy notice (30-day visa exemption from
    // 15 Sept 2026, Digital Arrival Card), Thai Railways (Kanchanaburi line).
    checked: "2026-11-06",
    timeZone: "Asia/Bangkok",
    localTips: [
      { icon: "dress", title: "Dress for the temples", text: "Cover shoulders and knees for the Grand Palace, Wat Pho and Wat Arun. Carry a light scarf or trousers in your bag." },
      { icon: "safety", title: "Ignore ‘it’s closed today’", text: "A friendly stranger saying the palace is shut, then offering a tuk-tuk tour, is a well-known scam. Check opening times yourself." },
      { icon: "transport", title: "Insist on the meter", text: "Ask taxis to use the meter, or book through a ride-hailing app. Agree tuk-tuk fares before you get in." },
      { icon: "etiquette", title: "Respect the monarchy", text: "Criticising the royal family is a serious crime. Stand when the royal anthem plays before cinema films." },
      { icon: "water", title: "Drink bottled water", text: "Don’t drink tap water. Ice in restaurants and cafés is usually made from purified water." },
      { icon: "weather", title: "Expect afternoon storms", text: "From around May to October, heavy showers often arrive in the afternoon. Plan temples for the morning." },
    ],
    foods: [
      { name: "Pad thai", text: "Stir-fried rice noodles with egg, tofu or prawns, peanuts and lime, cooked to order at street stalls across the city." },
      { name: "Tom yum goong", text: "Hot and sour prawn soup with lemongrass, galangal and lime leaf, served in restaurants and riverside canteens." },
      { name: "Som tam", text: "Pounded green papaya salad with chilli, lime and fish sauce, from Isan food stalls, often eaten with sticky rice and grilled chicken." },
      { name: "Khao man gai", text: "Poached chicken on rice cooked in chicken fat, with a ginger and soybean sauce, a cheap lunch at street stalls." },
      { name: "Mango sticky rice", text: "Sweet coconut sticky rice with ripe mango, best in the mango season from around March to May." },
    ],
    dayTrips: [
      { name: "Ayutthaya", time: "About 1 to 2 hours by train or road", text: "Temple ruins and giant Buddhas of the old Siamese capital, a UNESCO World Heritage Site best seen by bicycle or tuk-tuk.", photo: photos.bangkokTripAyutthaya },
      { name: "Damnoen Saduak", time: "About 1 hour 30 minutes to 2 hours by road", text: "Boat vendors selling fruit and noodles on narrow canals. Go early, before the tour coaches arrive.", photo: photos.bangkokTripFloatingMarket },
      { name: "Kanchanaburi", time: "About 2 to 3 hours by train from Thonburi", text: "The Bridge on the River Kwai and the war cemeteries and museums of the Death Railway, with Erawan’s waterfalls further out.", photo: photos.bangkokTripKanchanaburi },
    ],
    visual: {
      days: [
        { photo: photos.bangkokGrandPalace, stops: ["Grand Palace", "Wat Pho", "Wat Arun", "Yaowarat Road"] },
        { photo: photos.bangkokSkytrain, stops: ["Chatuchak market", "Jim Thompson House", "Siam malls", "A rooftop bar"] },
        { photo: photos.bangkokRiver, stops: ["Thonburi canals", "Lumphini Park", "Wat Pho massage school"] },
      ],
      stay: [
        { name: "Rattanakosin (Old Town)", bestFor: "Temples", photo: photos.bangkokGrandPalace },
        { name: "Riverside", bestFor: "Hotels with a view", photo: photos.bangkokRiver },
        { name: "Sukhumvit", bestFor: "Nightlife and malls", photo: photos.bangkokSkytrain },
      ],
    },
    airports: [
      {
        code: "BKK",
        name: "Suvarnabhumi",
        summary: "About 30 km east of central Bangkok, and the airport for most long-haul flights.",
        transfers: [
          { mode: "train", name: "Airport Rail Link", to: "Makkasan (for the MRT) and Phaya Thai (for the BTS Skytrain)" },
          { mode: "taxi", name: "Public taxi", to: "anywhere in the city", note: "Use the official taxi queue in the terminal; traffic can make it slow at rush hour." },
        ],
        officialPage: { label: "Suvarnabhumi Airport: ways to travel", url: "https://suvarnabhumi.airportthai.co.th/service/airport-guide/detail/Transportation_BKK" },
      },
      {
        code: "DMK",
        name: "Don Mueang",
        summary: "About 25 km north of the centre, used by most low-cost airlines.",
        transfers: [
          { mode: "train", name: "SRT Red Line", to: "Krung Thep Aphiwat (Bang Sue) for the MRT" },
          { mode: "bus", name: "Airport buses A1 and A2", to: "Mo Chit (BTS) and Victory Monument", fare: { text: "30 baht", source: dmkBus } },
        ],
        officialPage: dmkBus,
      },
    ],
    weather: "BBGMMMMMMMBB",
    neighbourhoods: [
      { name: "Rattanakosin (Old Town)", bestFor: "Temples", text: "The Grand Palace, Wat Pho and riverside views, with small guesthouses and boutique hotels. Few Skytrain links, so you’ll rely on river boats and taxis." },
      { name: "Banglamphu and Khao San", bestFor: "Budget stays", text: "Backpacker bars, street food and cheap guesthouses around Khao San Road, a walk from the old town’s temples. Noisy at night." },
      { name: "Riverside", bestFor: "Hotels with a view", text: "Grand hotels on the Chao Phraya, many with free shuttle boats, and river boats to the main sights. Calm and scenic." },
      { name: "Sukhumvit", bestFor: "Nightlife and malls", text: "A long, busy road on the Skytrain line, with restaurants from street stalls to rooftop bars, and large malls. Convenient for getting around." },
      { name: "Silom", bestFor: "Night markets and parks", text: "The business district by Lumphini Park, with street food, night markets, the Skytrain and the MRT. Good for a central, well-connected stay." },
    ],
    itinerary: [
      { title: "Palaces and temples", morning: "Arrive at the Grand Palace and Wat Phra Kaew as they open, dressed for the temple dress code.", afternoon: "See the reclining Buddha at Wat Pho, then take the ferry across the river to Wat Arun.", evening: "Eat your way along Yaowarat Road in Chinatown." },
      { title: "Markets and modern Bangkok", morning: "Spend a weekend morning at Chatuchak market, or visit the Jim Thompson House on a weekday.", afternoon: "Explore the Siam malls and their food halls in the heat of the day.", evening: "Watch the sunset from a rooftop bar over the city." },
      { title: "Canals or Ayutthaya", morning: "Take a long-tail boat through the Thonburi canals.", afternoon: "Relax in Lumphini Park, or have a traditional Thai massage at Wat Pho’s school.", evening: "Or go north for the whole day among the temple ruins of Ayutthaya, returning by train or boat." },
    ],
    daysNeeded: "Three to four days. Bangkok is also a common starting point for trips to the islands or the north.",
    gettingAround: "The BTS Skytrain and MRT underground are the fastest way round central Bangkok, and river boats run along the Chao Phraya to the old town. Taxis should use the meter, and ride-hailing apps are widely used. Traffic can be very slow at rush hour.",
    essentials: {
      currency: "Thai baht (THB)",
      plugs: "Types A, B, C and O, 220V",
      language: "Thai",
      emergency: "191 for police, 1669 for ambulance, 1155 for the Tourist Police",
      tipping: "Not expected; round up or leave small change, and check for a service charge",
      water: "Don’t drink tap water; use bottled water",
    },
    faqs: [
      {
        q: "Which Bangkok airport do budget airlines use?",
        a: "Mostly Don Mueang (DMK), north of the city. Most long-haul flights use Suvarnabhumi (BKK). If you connect between the two, allow plenty of time: a shuttle bus links them, and the trip can be slow in traffic.",
      },
      {
        q: "What should I wear to the Grand Palace?",
        a: "Cover your shoulders and knees. The Grand Palace and the main temples have a dress code, and visitors in shorts or sleeveless tops can be turned away.",
      },
      {
        q: "Do I need a visa for Thailand?",
        a: "Not for a short holiday. From 15 September 2026, UK passport holders can stay up to 30 days without a visa, and every visitor must fill in the free Thailand Digital Arrival Card online before arriving. Check GOV.UK’s Thailand entry requirements before you go.",
      },
      {
        q: "Is Bangkok safe for tourists?",
        a: "Generally, yes. The main risks are scams, such as the ‘palace is closed’ tuk-tuk trick and unmetered taxis, plus bag snatching in busy areas. Call the Tourist Police on 1155 for help in English.",
      },
      {
        q: "How do I get from Bangkok to Ayutthaya?",
        a: "By train, minibus or taxi; the trip takes about one to two hours. Trains are the cheapest option, and many visitors hire a bicycle or tuk-tuk at Ayutthaya to get between the ruins.",
      },
    ],
    guides: ["self-transfer-separate-tickets", "when-to-book-international-flights", "carry-on-only-checklist"],
  },
  sydney: {
    // Batch 22 fields checked 6 Nov 2026: Australian Government (000 and 112),
    // Home Affairs (eVisitor for UK citizens, ETA for US), Transport for NSW
    // (Opal, Blue Mountains Line).
    checked: "2026-11-06",
    timeZone: "Australia/Sydney",
    localTips: [
      { icon: "transport", title: "Tap on, tap off", text: "Use the same contactless card or phone on trains, buses, ferries and light rail, tapping on and off. Daily and weekly caps keep costs down." },
      { icon: "safety", title: "Swim between the flags", text: "Beaches can have strong rip currents. Only swim between the red and yellow flags, where lifeguards are watching." },
      { icon: "health", title: "Take the sun seriously", text: "UV levels are high even on cloudy days. Wear sunscreen, a hat and sunglasses, and avoid the midday sun." },
      { icon: "money", title: "Tipping is optional", text: "Wages include service, so tipping isn’t expected. Rounding up or about 10% for good restaurant service is appreciated." },
      { icon: "clock", title: "Book the big tickets", text: "Opera House tours, BridgeClimb and popular restaurants book up in summer and school holidays. Reserve ahead." },
    ],
    foods: [
      { name: "Fish and chips by the water", text: "Battered or grilled fish with chips, best eaten on the sand at Manly, Bondi or Watsons Bay." },
      { name: "Sydney rock oysters", text: "Small, creamy native oysters from New South Wales estuaries, served at the Sydney Fish Market and harbourside restaurants." },
      { name: "Meat pie", text: "A hand-held pie of minced beef and gravy, often with tomato sauce, from bakeries and late-night pie carts." },
      { name: "Flat white", text: "Espresso with steamed milk and a thin layer of foam, the standard order in Sydney’s cafés, especially in Surry Hills." },
      { name: "Barramundi", text: "A mild white fish native to northern Australia, grilled or pan-fried on menus across the city." },
      { name: "Pavlova", text: "A meringue dessert with cream and fresh fruit, crisp outside and soft inside, served in cafés and at Christmas." },
    ],
    dayTrips: [
      { name: "Blue Mountains", time: "About 2 hours by train from Central to Katoomba", text: "Clifftop lookouts over the Three Sisters, bushwalks through eucalyptus forest and the rides at Scenic World.", photo: photos.sydneyTripBlueMountains },
      { name: "Royal National Park", time: "About 1 hour by train from Central", text: "Australia’s oldest national park, with coastal walks, sea cliffs and beaches on Sydney’s southern edge.", photo: photos.sydneyTripRoyalNationalPark },
      { name: "Hunter Valley", time: "About 2 hours by car", text: "Australia’s oldest wine region, known for semillon and shiraz, with cellar-door tastings best done on a tour.", photo: photos.sydneyTripHunterValley },
    ],
    visual: {
      days: [
        { photo: photos.sydneyHarbour, stops: ["Sydney Opera House", "Royal Botanic Garden", "The Rocks", "Harbour Bridge"] },
        { photo: photos.sydneyBondi, stops: ["Bondi Beach", "Bondi to Coogee walk", "Bronte", "Surry Hills"] },
        { photo: photos.sydneyFerry, stops: ["Manly ferry", "Shelly Beach", "Taronga Zoo"] },
      ],
      stay: [
        { name: "The Rocks and Circular Quay", bestFor: "First visits", photo: photos.sydneyHarbour },
        { name: "Bondi", bestFor: "The beach", photo: photos.sydneyBondi },
        { name: "Manly", bestFor: "A relaxed base", photo: photos.sydneyFerry },
      ],
    },
    airports: [
      {
        code: "SYD",
        name: "Kingsford Smith",
        summary: "About 8 km south of the city centre, one of the closest major airports to its city.",
        transfers: [
          { mode: "train", name: "Airport Link train", to: "Central and the city", time: "about 13 minutes", note: "A station access fee is charged on top of the train fare." },
          { mode: "taxi", name: "Taxi", to: "the city centre", time: "about 20 minutes" },
        ],
        officialPage: { label: "Sydney Airport: transport options", url: "https://www.sydneyairport.com.au/info-sheet/transport-options" },
      },
    ],
    weather: "GGBBBGGGBBBG",
    neighbourhoods: [
      { name: "The Rocks and Circular Quay", bestFor: "First visits", text: "The historic quarter beside the Opera House and Harbour Bridge, where ferries leave for the beaches and the zoo. Expensive, but the views are the point." },
      { name: "CBD and Darling Harbour", bestFor: "Convenience", text: "The city centre, with plenty of hotels, restaurants and the main train lines, and the waterfront at Darling Harbour. Busy by day, quieter at night." },
      { name: "Surry Hills", bestFor: "Food and cafés", text: "Terraced streets of excellent restaurants, cafés and bars, a walk from Central station. A local feel close to the centre." },
      { name: "Bondi", bestFor: "The beach", text: "Sydney’s best-known beach, its ocean pool and the start of the coastal walk to Coogee. About half an hour from the city by bus." },
      { name: "Manly", bestFor: "A relaxed base", text: "Beaches, a laid-back seafront and a ferry ride of about half an hour across the harbour to Circular Quay." },
    ],
    itinerary: [
      { title: "The harbour", morning: "Start at Circular Quay and take a tour inside the Opera House.", afternoon: "Walk through the Royal Botanic Garden to Mrs Macquarie’s Chair, then explore The Rocks’ lanes and markets.", evening: "Have dinner with a view of the bridge, or climb it at dusk on a booked climb." },
      { title: "Bondi to Coogee", morning: "Walk the coastal path from Bondi past Tamarama and Bronte to Coogee, about 6 km.", afternoon: "Swim at one of the beaches or ocean pools if it’s warm, between the flags.", evening: "Head back to the city for dinner in Surry Hills." },
      { title: "Ferries, or the Blue Mountains", morning: "Take the ferry to Manly for harbour views on the way.", afternoon: "Walk to Shelly Beach, or take the ferry to Taronga Zoo instead.", evening: "Or spend the whole day walking in the Blue Mountains, by train from Central." },
    ],
    daysNeeded: "Four to five days, plus a day for the Blue Mountains.",
    gettingAround: "Trains, buses, ferries and light rail all take Opal or a contactless bank card or phone, with daily and weekly fare caps. Ferries are the most scenic way to cross the harbour. Ride-hailing and taxis are easy to find.",
    essentials: {
      currency: "Australian dollar (AUD)",
      plugs: "Type I, 230V",
      language: "English",
      emergency: "000, or 112 from a mobile",
      tipping: "Not expected; about 10% for good restaurant service is appreciated",
      water: "Tap water is safe to drink",
    },
    faqs: [
      {
        q: "When can you see whales in Sydney?",
        a: "Humpback whales pass Sydney’s coast on their migration, roughly from May to November. Headlands such as North Head and the coastal walks are good places to look.",
      },
      {
        q: "Can I use contactless on Sydney’s trains and ferries?",
        a: "Yes. Opal readers on trains, buses, ferries and light rail accept contactless bank cards and phones, so you don’t need to buy an Opal card.",
      },
      {
        q: "Do I need a visa to visit Sydney?",
        a: "Yes, everyone except New Zealanders needs a visa or travel authority for Australia. British citizens can apply online for a free eVisitor visa, and US citizens for an Electronic Travel Authority (ETA), through the Department of Home Affairs before travelling.",
      },
      {
        q: "Is the Bondi to Coogee walk hard?",
        a: "No. It’s a paved coastal path of about 6 km with some steps and hills, so most people walk it in two to three hours with stops. Go early in summer to avoid the heat.",
      },
      {
        q: "How do I get to the Blue Mountains from Sydney?",
        a: "Take the Blue Mountains Line train from Central to Katoomba, about two hours, and pay with a contactless card. From Katoomba, walk or take a hop-on bus to Echo Point and Scenic World.",
      },
    ],
    guides: ["self-transfer-separate-tickets", "power-bank-rules-on-planes", "when-to-book-international-flights"],
  },
  delhi: {
    // Batch 22 fields checked 6 Nov 2026: Incredible India (112, 1363 helpline),
    // Delhi Airport metro page already cited, Gatimaan Express press coverage
    // (about 100 minutes), Delhi to Jaipur rail times (about 4 hours).
    checked: "2026-11-06",
    timeZone: "Asia/Kolkata",
    localTips: [
      { icon: "water", title: "Stick to bottled water", text: "Don’t drink tap water, and avoid ice and raw salads from stalls. Choose busy places with hot, freshly cooked food." },
      { icon: "transport", title: "Use the metro", text: "The Delhi Metro is quick, air-conditioned and avoids the traffic. Carriages for women are marked and worth using if you’re travelling alone." },
      { icon: "safety", title: "Agree prices first", text: "Agree auto-rickshaw fares before getting in, or use a ride-hailing app. Be wary of anyone who says a place is closed and offers a different route." },
      { icon: "dress", title: "Dress modestly", text: "Cover shoulders and knees at mosques, gurudwaras and temples. You’ll remove your shoes and cover your head at gurudwaras." },
      { icon: "phone", title: "Get a local SIM or eSIM", text: "Set up an eSIM before you fly, or buy a SIM with ID at the airport. Maps and ride-hailing apps are essential here." },
      { icon: "weather", title: "Mind the heat and smog", text: "Summers are very hot, and winter air quality can be poor. October to March is the more comfortable season to visit." },
    ],
    foods: [
      { name: "Butter chicken", text: "Chicken in a creamy tomato sauce, said to have been created in Delhi, served at restaurants from Old Delhi to Connaught Place." },
      { name: "Chaat", text: "Crisp, tangy street snacks of fried dough, yoghurt, chutneys and spices, best from the busy stalls of Chandni Chowk." },
      { name: "Paratha", text: "Stuffed fried flatbread eaten with pickles and curd, famously sold in the Paranthe Wali Gali lane in Old Delhi." },
      { name: "Kebabs", text: "Spiced grilled meat, soft and smoky, from the old-style kebab shops around Jama Masjid." },
      { name: "Chole bhature", text: "Spiced chickpeas with puffed fried bread, a hearty breakfast or lunch across the city." },
    ],
    dayTrips: [
      { name: "Agra and the Taj Mahal", time: "About 2 to 4 hours each way by train or road", text: "The Taj Mahal and Agra Fort. The fastest trains take about 100 minutes, and the Taj is closed on Fridays.", photo: photos.delhiTripAgra },
      { name: "Jaipur", time: "About 4 hours each way by train", text: "The Pink City, with the Hawa Mahal, City Palace and Amber Fort, usually done as an overnight stay.", photo: photos.delhiTripJaipur },
      { name: "Fatehpur Sikri", time: "A short drive west of Agra, often combined with the Taj", text: "A World Heritage Site of red sandstone palaces and the Buland Darwaza gate, built as an imperial capital in the 16th century.", photo: photos.delhiTripFatehpurSikri },
    ],
    visual: {
      days: [
        { photo: photos.delhiRedFort, stops: ["Red Fort", "Jama Masjid", "Chandni Chowk", "Gurudwara Bangla Sahib"] },
        { photo: photos.delhiQutub, stops: ["Humayun’s Tomb", "Lodhi Garden", "India Gate", "Qutub Minar"] },
        { photo: photos.delhiTripAgra, stops: ["Taj Mahal", "Agra Fort"] },
      ],
      stay: [
        { name: "Connaught Place", bestFor: "First visits", photo: photos.delhiConnaught },
        { name: "Old Delhi", bestFor: "Heritage and food", photo: photos.delhiChandniChowk },
        { name: "Hauz Khas", bestFor: "Cafés and nightlife", photo: photos.delhiHauzKhas },
      ],
    },
    airports: [
      {
        code: "DEL",
        name: "Indira Gandhi International",
        summary: "About 15 km south-west of central Delhi. International flights mostly use Terminal 3.",
        transfers: [
          { mode: "metro", name: "Airport Express Line", to: "New Delhi railway station", time: "about 21 to 25 minutes from Terminal 3" },
          { mode: "taxi", name: "Prepaid taxi or ride-hailing", to: "anywhere in the city", note: "Book at the official counters or app pick-up points in arrivals." },
        ],
        officialPage: { label: "Delhi Airport: metro", url: "https://www.newdelhiairport.in/to-and-from-airport/metro/" },
      },
    ],
    weather: "GBBMMMMMMBBG",
    neighbourhoods: [
      { name: "Connaught Place", bestFor: "First visits", text: "The colonnaded circle at the centre of New Delhi, with restaurants, shops and metro lines in every direction. A good mid-range base." },
      { name: "Paharganj", bestFor: "Budget stays", text: "Cheap hotels in busy, narrow streets by New Delhi railway station. Hectic, but handy for trains and the airport metro." },
      { name: "Old Delhi", bestFor: "Heritage and food", text: "Chandni Chowk’s markets, the Red Fort and Jama Masjid, with a few heritage hotels in old havelis. Crowded and chaotic in the best way." },
      { name: "Hauz Khas", bestFor: "Cafés and nightlife", text: "A lakeside village of bars, cafés and boutiques around medieval ruins in South Delhi. Popular with younger locals." },
      { name: "Aerocity", bestFor: "Early flights", text: "Modern hotels next to the airport, on the Airport Express Line, for a late arrival or an early departure." },
    ],
    itinerary: [
      { title: "Old Delhi", morning: "See the Red Fort as it opens, then the courtyard of Jama Masjid.", afternoon: "Take a cycle rickshaw through Chandni Chowk’s markets and stop for street food.", evening: "Visit the Gurudwara Bangla Sahib in the evening, where visitors are welcome at the community kitchen." },
      { title: "New Delhi", morning: "Start at Humayun’s Tomb in the morning light.", afternoon: "Walk in Lodhi Garden, then pass India Gate on the way to the Qutub Minar in the south of the city.", evening: "Eat in Hauz Khas village, by the lake and ruins." },
      { title: "Agra and the Taj Mahal", morning: "Take an early train or tour to Agra, aiming to reach the Taj Mahal soon after it opens.", afternoon: "See Agra Fort, across the river bend from the Taj.", evening: "Return to Delhi in the evening. The Taj Mahal is closed on Fridays." },
    ],
    daysNeeded: "Two to three days for Delhi. Most visitors add Agra and Jaipur for the Golden Triangle, about a week in all.",
    gettingAround: "The Delhi Metro is clean, cheap and covers most of the city, including the airport; use a token or a travel card. For other journeys, use ride-hailing apps or prepaid taxis, and agree the fare first for auto-rickshaws.",
    essentials: {
      currency: "Indian rupee (INR)",
      plugs: "Types C, D and M, 230V",
      language: "Hindi and English",
      emergency: "112, or the 24-hour tourist helpline on 1363",
      tipping: "Not required, but about 10% in restaurants without a service charge is welcome",
      water: "Don’t drink tap water; use bottled or filtered water",
    },
    faqs: [
      {
        q: "Is the Taj Mahal open every day?",
        a: "No. It’s closed on Fridays, so plan your day trip to Agra for another day of the week.",
      },
      {
        q: "How do I get from Delhi to Agra?",
        a: "By train or by road. Fast trains link Delhi with Agra, and the Yamuna Expressway makes the drive straightforward; many visitors book a day tour that includes both.",
      },
      {
        q: "Do I need a visa for India?",
        a: "Yes. Most visitors, including British and US citizens, apply for an e-visa online through India’s official visa portal before travelling. Fees and stay lengths change, so check GOV.UK’s India entry requirements and avoid agents that add extra charges.",
      },
      {
        q: "Is Delhi safe for tourists?",
        a: "Most visits pass without trouble, but take care. Watch for scams and overcharging, keep valuables out of sight, and use licensed taxis or apps at night. Dial 112 in an emergency or 1363 for the tourist helpline.",
      },
      {
        q: "Can you drink the tap water in Delhi?",
        a: "No. Drink bottled or filtered water, and avoid ice unless you know it’s made from purified water.",
      },
    ],
    guides: ["self-transfer-separate-tickets", "when-to-book-international-flights", "power-bank-rules-on-planes"],
  },
};
