import type { DestinationDepth } from "./types";

// Fares and journey times checked 3 Nov 2026 on the pages linked beside them.
// Where an operator's page didn't give a current fare, none is shown.

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
      { name: "Shinjuku", bestFor: "First visits and nightlife", text: "Tokyo’s biggest rail hub, with skyscraper views, izakaya alleys and trains to almost everywhere." },
      { name: "Shibuya", bestFor: "Shopping and youth culture", text: "The famous crossing, department stores and Harajuku a short walk away." },
      { name: "Asakusa", bestFor: "Old Tokyo and value", text: "Senso-ji temple, traditional shops and some of the city’s better-value hotels." },
      { name: "Ginza and Tokyo Station", bestFor: "Upscale stays and the Shinkansen", text: "Department stores and sushi counters, next to the bullet trains to Kyoto and beyond." },
      { name: "Ueno", bestFor: "Museums and Narita trains", text: "Ueno Park’s museums and zoo, with the Skyliner straight to Narita." },
    ],
    itinerary: [
      { title: "Asakusa and Ueno", text: "See Senso-ji early, before the crowds, walk Nakamise shopping street, then spend the afternoon in Ueno Park and its museums." },
      { title: "Meiji Jingu to Shinjuku", text: "Walk through the Meiji Jingu shrine forest to Harajuku, cross Shibuya Crossing, and end with dinner in Shinjuku’s small-bar alleys." },
      { title: "Markets and the bay", text: "Have breakfast at the Tsukiji Outer Market, stroll Ginza, and spend the evening at Odaiba, or take a day trip to Kamakura, Hakone or Nikko instead." },
    ],
    daysNeeded: "Four to five days for Tokyo itself. Add more for Kyoto, a Shinkansen ride away, or for Hakone and Nikko.",
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
      { name: "Seminyak", bestFor: "Restaurants and beach clubs", text: "Stylish places to eat and drink on a long sandy beach, close to the airport." },
      { name: "Ubud", bestFor: "Culture and rice terraces", text: "The island’s cultural centre, in the hills, with temples, craft villages and yoga retreats." },
      { name: "Canggu", bestFor: "Surf and cafés", text: "Surf beaches, rice fields and café culture popular with longer-stay visitors." },
      { name: "Uluwatu", bestFor: "Cliffs and sunsets", text: "Clifftop hotels above surf breaks on the southern peninsula." },
      { name: "Sanur", bestFor: "Families and calm water", text: "A quieter east-coast town with a reef-sheltered beach and a seafront path." },
    ],
    itinerary: [
      { title: "Ubud", text: "Visit the Sacred Monkey Forest Sanctuary, the royal palace and the market, and walk the Campuhan Ridge path in the late afternoon." },
      { title: "Rice terraces and water temples", text: "See the Tegallalang rice terraces early, then the holy springs at Tirta Empul, dressed for a temple visit." },
      { title: "The south coast", text: "Spend the day on the beach, then watch the sunset and a Kecak dance at Uluwatu Temple on the cliffs." },
    ],
    daysNeeded: "A week lets you split your time between Ubud and the coast. With four or five days, pick one base.",
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
      { name: "Marina Bay", bestFor: "The skyline", text: "Gardens by the Bay and the waterfront, with some of the city’s most expensive hotels." },
      { name: "Chinatown", bestFor: "Food and value", text: "Hawker centres, temples and shophouses, central and well connected by MRT." },
      { name: "Clarke Quay and the river", bestFor: "Nightlife", text: "Riverside bars and restaurants, a walk from Marina Bay." },
      { name: "Little India and Kampong Glam", bestFor: "Culture and cheaper rooms", text: "Colourful streets, the Sultan Mosque and some of Singapore’s better-value hotels." },
      { name: "Sentosa", bestFor: "Families and resorts", text: "An island of beaches, theme parks and resorts, linked to the city by road and monorail." },
    ],
    itinerary: [
      { title: "Marina Bay", text: "Walk the waterfront to the Merlion, explore Gardens by the Bay, and stay for the evening light show among the Supertrees." },
      { title: "Chinatown, Kampong Glam and Little India", text: "Eat your way through a hawker centre, visit the Buddha Tooth Relic Temple, then the Sultan Mosque and the streets of Little India." },
      { title: "Gardens and Orchard Road", text: "Start in the Singapore Botanic Gardens, shop on Orchard Road, and spend the evening on Sentosa or at the Night Safari." },
    ],
    daysNeeded: "Three to four days. Singapore also works well as a stopover of one or two nights on the way to Australia or Asia.",
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
      { name: "Rattanakosin (Old Town)", bestFor: "Temples", text: "The Grand Palace, Wat Pho and riverside views, though fewer hotels and no Skytrain." },
      { name: "Banglamphu and Khao San", bestFor: "Budget stays", text: "Backpacker bars and cheap guesthouses, a walk from the old town’s temples." },
      { name: "Riverside", bestFor: "Hotels with a view", text: "Grand hotels on the Chao Phraya, with river boats to the sights." },
      { name: "Sukhumvit", bestFor: "Nightlife and malls", text: "Long, busy road on the Skytrain line, with restaurants, rooftop bars and shopping." },
      { name: "Silom", bestFor: "Night markets and parks", text: "The business district by Lumphini Park, with street food and the Skytrain and MRT." },
    ],
    itinerary: [
      { title: "Palaces and temples", text: "See the Grand Palace and Wat Phra Kaew early, then Wat Pho’s reclining Buddha, and take the ferry to Wat Arun. Eat dinner in Chinatown’s Yaowarat Road." },
      { title: "Markets and modern Bangkok", text: "Spend a weekend morning at Chatuchak market, or visit the Jim Thompson House, then the Siam malls and a rooftop bar at sunset." },
      { title: "Canals or Ayutthaya", text: "Take a long-tail boat through the Thonburi canals and relax in Lumphini Park, or go north for a day among the ruins of Ayutthaya." },
    ],
    daysNeeded: "Three to four days. Bangkok is also a common starting point for trips to the islands or the north.",
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
      { name: "The Rocks and Circular Quay", bestFor: "First visits", text: "Beside the Opera House and Harbour Bridge, with ferries leaving for the beaches and the zoo." },
      { name: "CBD and Darling Harbour", bestFor: "Convenience", text: "Central, with plenty of hotels, restaurants and the main train lines." },
      { name: "Surry Hills", bestFor: "Food and cafés", text: "Terraced streets of restaurants, cafés and bars, a walk from Central station." },
      { name: "Bondi", bestFor: "The beach", text: "Sydney’s best-known beach and the start of the coastal walk to Coogee." },
      { name: "Manly", bestFor: "A relaxed base", text: "Beaches and a laid-back seafront, half an hour from the city by ferry." },
    ],
    itinerary: [
      { title: "The harbour", text: "Start at Circular Quay, tour the Opera House, walk through the Royal Botanic Garden to Mrs Macquarie’s Chair, and end in The Rocks." },
      { title: "Bondi to Coogee", text: "Walk the coastal path from Bondi past Tamarama and Bronte to Coogee, swim if it’s warm, and have dinner in Surry Hills." },
      { title: "Ferries, or the Blue Mountains", text: "Take the ferry to Manly or Taronga Zoo for harbour views, or spend the day walking in the Blue Mountains instead." },
    ],
    daysNeeded: "Four to five days, plus a day for the Blue Mountains.",
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
      { name: "Connaught Place", bestFor: "First visits", text: "The colonnaded centre of New Delhi, with restaurants, shops and metro lines in every direction." },
      { name: "Paharganj", bestFor: "Budget stays", text: "Cheap hotels by New Delhi railway station. Hectic, but handy for trains and the airport metro." },
      { name: "Old Delhi", bestFor: "Heritage and food", text: "Chandni Chowk’s markets, the Red Fort and Jama Masjid, with a few heritage hotels." },
      { name: "Hauz Khas", bestFor: "Cafés and nightlife", text: "A lakeside village of bars and boutiques around medieval ruins in South Delhi." },
      { name: "Aerocity", bestFor: "Early flights", text: "Modern hotels next to the airport, on the Airport Express Line." },
    ],
    itinerary: [
      { title: "Old Delhi", text: "See the Red Fort and Jama Masjid, then take a cycle rickshaw through Chandni Chowk’s markets and stop for street food." },
      { title: "New Delhi", text: "Visit Humayun’s Tomb, walk in Lodhi Garden, pass India Gate, and end at the Qutub Minar in the south of the city." },
      { title: "Agra and the Taj Mahal", text: "Take an early train or a tour to Agra for the Taj Mahal and Agra Fort. The Taj is closed on Fridays." },
    ],
    daysNeeded: "Two to three days for Delhi. Most visitors add Agra and Jaipur for the Golden Triangle, about a week in all.",
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
