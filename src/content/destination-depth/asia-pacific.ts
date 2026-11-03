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
    checked: "2026-11-03",
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
    essentials: { currency: "Japanese yen (JPY)", plugs: "Types A and B, 100V", language: "Japanese" },
    faqs: [
      {
        q: "Narita or Haneda: which is closer to Shinjuku and Shibuya?",
        a: "Haneda. It’s about 15 km from central Tokyo, against about 60 km for Narita, so the trip to Shinjuku or Shibuya is usually much shorter. If a Narita fare is much cheaper, weigh the saving against the longer transfer.",
      },
      {
        q: "When is cherry blossom season in Tokyo?",
        a: "Usually from late March to early April, though the dates move each year with the weather. Flights and hotels fill early, so book well ahead if you want to see it.",
      },
    ],
    guides: ["when-to-book-international-flights", "self-transfer-separate-tickets", "power-bank-rules-on-planes"],
  },
  bali: {
    checked: "2026-11-03",
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
    essentials: { currency: "Indonesian rupiah (IDR)", plugs: "Types C and F, 230V", language: "Indonesian and Balinese" },
    faqs: [
      {
        q: "What is Bali’s airport called?",
        a: "I Gusti Ngurah Rai International Airport, often listed as Denpasar (DPS). It’s in the south of the island, near Kuta.",
      },
      {
        q: "Is there a tourist levy in Bali?",
        a: "Yes. Foreign visitors pay a tourist levy, which you can pay online through Bali’s official Love Bali system before you travel or on arrival. Check the current amount there before you go.",
      },
    ],
    guides: ["when-to-book-international-flights", "carry-on-only-checklist", "self-transfer-separate-tickets"],
  },
  singapore: {
    checked: "2026-11-03",
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
    essentials: { currency: "Singapore dollar (SGD)", plugs: "Type G, 230V", language: "English, Mandarin, Malay and Tamil" },
    faqs: [
      {
        q: "Is Singapore a good stopover?",
        a: "Yes. Changi is connected to the city by MRT and taxi, and the main sights are close together, so one or two nights is enough for a first look. If you’re booking a long-haul trip, compare fares with a stop in Singapore against flying through.",
      },
      {
        q: "What is the best way to get around Singapore?",
        a: "The MRT and buses reach almost everywhere and accept contactless bank cards. Taxis and ride-hailing are easy to find too.",
      },
    ],
    guides: ["self-transfer-separate-tickets", "power-bank-rules-on-planes", "when-to-book-international-flights"],
  },
  bangkok: {
    checked: "2026-11-03",
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
    essentials: { currency: "Thai baht (THB)", plugs: "Types A, B, C and O, 220V", language: "Thai" },
    faqs: [
      {
        q: "Which Bangkok airport do budget airlines use?",
        a: "Mostly Don Mueang (DMK), north of the city. Most long-haul flights use Suvarnabhumi (BKK). If you connect between the two, allow plenty of time: a shuttle bus links them, and the trip can be slow in traffic.",
      },
      {
        q: "What should I wear to the Grand Palace?",
        a: "Cover your shoulders and knees. The Grand Palace and the main temples have a dress code, and visitors in shorts or sleeveless tops can be turned away.",
      },
    ],
    guides: ["self-transfer-separate-tickets", "when-to-book-international-flights", "carry-on-only-checklist"],
  },
  sydney: {
    checked: "2026-11-03",
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
    essentials: { currency: "Australian dollar (AUD)", plugs: "Type I, 230V", language: "English" },
    faqs: [
      {
        q: "When can you see whales in Sydney?",
        a: "Humpback whales pass Sydney’s coast on their migration, roughly from May to November. Headlands such as North Head and the coastal walks are good places to look.",
      },
      {
        q: "Can I use contactless on Sydney’s trains and ferries?",
        a: "Yes. Opal readers on trains, buses, ferries and light rail accept contactless bank cards and phones, so you don’t need to buy an Opal card.",
      },
    ],
    guides: ["self-transfer-separate-tickets", "power-bank-rules-on-planes", "when-to-book-international-flights"],
  },
  delhi: {
    checked: "2026-11-03",
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
    essentials: { currency: "Indian rupee (INR)", plugs: "Types C, D and M, 230V", language: "Hindi and English" },
    faqs: [
      {
        q: "Is the Taj Mahal open every day?",
        a: "No. It’s closed on Fridays, so plan your day trip to Agra for another day of the week.",
      },
      {
        q: "How do I get from Delhi to Agra?",
        a: "By train or by road. Fast trains link Delhi with Agra, and the Yamuna Expressway makes the drive straightforward; many visitors book a day tour that includes both.",
      },
    ],
    guides: ["self-transfer-separate-tickets", "when-to-book-international-flights", "power-bank-rules-on-planes"],
  },
};
