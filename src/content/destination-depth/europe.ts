import type { DestinationDepth } from "./types";

// Fares and journey times checked 3 Nov 2026 on the pages linked beside them.
// Where an operator's page didn't give a current fare, none is shown.
// Neighbourhoods, day plans and getting around rewritten in more depth (3 Nov 2026).

const heathrow = { label: "Heathrow: getting to central London", url: "https://www.heathrow.com/transport-and-directions/getting-to-central-london" };
const heathrowExpress = { label: "Heathrow Express: fares", url: "https://www.heathrowexpress.com/journey-planning/heathrow-london" };
const heathrowTube = { label: "Heathrow: London Underground", url: "https://www.heathrow.com/transport-and-directions/by-rail-or-train/london-underground" };
const idfmAirports = { label: "Île-de-France Mobilités: Paris Region <> Airports ticket", url: "https://www.iledefrance-mobilites.fr/en/titres-et-tarifs/detail/ticket-paris-region-aeroports" };
const trenitalia = { label: "Trenitalia: Leonardo Express", url: "https://www.trenitalia.com/en/connections/leonardo-express.html" };
const tmbAirport = { label: "TMB: Airport ticket", url: "https://www.tmb.cat/en/barcelona-fares-metro-bus/aeroport-ticket" };

export const europeDepth: Record<string, DestinationDepth> = {
  london: {
    checked: "2026-11-03",
    airports: [
      {
        code: "LHR",
        name: "Heathrow",
        summary: "About 24 km west of central London, and the airport for most long-haul flights.",
        transfers: [
          { mode: "train", name: "Heathrow Express", to: "London Paddington", time: "15 minutes from Terminals 2 and 3, 21 from Terminal 5", fare: { text: "From £10 booked in advance", source: heathrowExpress } },
          { mode: "train", name: "Elizabeth line", to: "Paddington, Bond Street, Tottenham Court Road and the City", time: "under 40 minutes to central London" },
          { mode: "metro", name: "Piccadilly line (Underground)", to: "South Kensington, Piccadilly Circus and King’s Cross", time: "about 50 minutes", fare: { text: "From £5.90 off-peak with contactless or Oyster", source: heathrowTube } },
        ],
        officialPage: heathrow,
      },
      {
        code: "LGW",
        name: "Gatwick",
        summary: "About 45 km south of London, with long-haul and European flights.",
        transfers: [
          { mode: "train", name: "Gatwick Express", to: "London Victoria", time: "about 30 minutes" },
          { mode: "train", name: "Thameslink", to: "London Bridge, Blackfriars and St Pancras" },
        ],
        officialPage: { label: "Gatwick Airport", url: "https://www.gatwickairport.com/" },
      },
      {
        code: "STN",
        name: "Stansted",
        summary: "About 55 km north-east of London, mainly for budget flights within Europe.",
        transfers: [{ mode: "train", name: "Stansted Express", to: "London Liverpool Street", time: "about 48 minutes" }],
        officialPage: { label: "London Stansted Airport", url: "https://www.stanstedairport.com/" },
      },
    ],
    weather: "MMMGBBBBBGMM",
    neighbourhoods: [
      { name: "South Bank and Bankside", bestFor: "First visits", text: "A riverside strip from the London Eye to Tower Bridge, with Tate Modern, Shakespeare’s Globe and Borough Market along the way. Westminster is one bridge away, and Waterloo and London Bridge stations put most of the city within a short ride. Hotels here cost more at weekends, when the area is busiest." },
      { name: "Covent Garden and Soho", bestFor: "Theatre and nightlife", text: "The heart of the West End: theatres, restaurants and bars on every street, and the British Museum and National Gallery within a walk. It stays lively late, so ask for a room away from the street. Among the most expensive places to stay in London." },
      { name: "South Kensington", bestFor: "Museums and families", text: "Home of the Natural History Museum, the Science Museum and the V&A, all free to enter, with Hyde Park a few minutes away. Elegant, safe and calm after dark, and on the Piccadilly line straight from Heathrow." },
      { name: "Shoreditch", bestFor: "Food and a younger crowd", text: "East London’s street-food markets, independent shops, bars and street art, around Brick Lane and Spitalfields. Prices are often lower than in the West End, and the Elizabeth line and Overground link it quickly to the rest of the city." },
      { name: "King’s Cross", bestFor: "Rail connections", text: "The Eurostar, trains to the north and Scotland, and six Underground lines, around a redeveloped canal-side quarter of restaurants and squares. A practical base if you’re travelling on, with the British Library and Regent’s Canal close by." },
    ],
    itinerary: [
      { title: "Westminster and the South Bank", morning: "Visit Westminster Abbey when it opens, then see the Houses of Parliament and Big Ben from Parliament Square.", afternoon: "Cross Westminster Bridge and walk the South Bank past the London Eye to Tate Modern, stopping at the riverside book market under Waterloo Bridge.", evening: "Eat at Borough Market or along Bankside, then cross the Millennium Bridge for St Paul’s Cathedral lit up at night." },
      { title: "Museums and the West End", morning: "Spend the morning at the British Museum, which is free; arrive early for the Egyptian and Greek galleries.", afternoon: "Walk through Covent Garden to Trafalgar Square and the National Gallery, then on through St James’s Park to Buckingham Palace.", evening: "See a West End show; day seats and same-day booth tickets are often much cheaper than booking ahead." },
      { title: "The Tower and East London", morning: "Be at the Tower of London for opening to see the Crown Jewels before the queues, then walk over Tower Bridge.", afternoon: "Head to Spitalfields Market and Brick Lane, or take a river boat to Greenwich for the Royal Observatory and the Cutty Sark.", evening: "Have dinner in Shoreditch, or in Greenwich if you went by boat, and ride the Elizabeth line or DLR back." },
    ],
    daysNeeded: "Three to four days covers the main sights. With a week you can add Greenwich, Hampton Court, or a day trip to Windsor or Oxford.",
    gettingAround: "The Underground, buses, Overground and the Elizabeth line cover the whole city, and you can tap in with a contactless bank card or phone instead of buying a ticket. Fares are capped each day and week, so you never pay more than a set amount. Buses don’t take cash.",
    essentials: { currency: "Pound sterling (GBP)", plugs: "Type G, 230V", language: "English" },
    faqs: [
      {
        q: "Which Heathrow terminal does my airline use?",
        a: "Your booking and boarding pass show it, and Heathrow’s website lists airlines by terminal. Travel between terminals is free on the trains that link them, but allow extra time if you need to change.",
      },
      {
        q: "Do US citizens need an ETA to visit London?",
        a: "Yes. US citizens need a UK Electronic Travel Authorisation (ETA) for visits, applied for online before you travel. Our ESTA and UK ETA guide explains how it works.",
      },
    ],
    guides: ["london-airports-guide", "esta-and-uk-eta", "uk-airport-liquids-rules"],
  },
  paris: {
    checked: "2026-11-03",
    airports: [
      {
        code: "CDG",
        name: "Charles de Gaulle",
        summary: "About 25 km north-east of Paris, and the airport for most flights from the US and many from the UK.",
        transfers: [
          { mode: "train", name: "RER B", to: "Gare du Nord, Châtelet-Les Halles and the Left Bank", time: "about 25 minutes to Gare du Nord", fare: { text: "€14 with the Paris Region <> Airports ticket", source: idfmAirports } },
        ],
        officialPage: { label: "Paris Aéroport: CDG by RER B", url: "https://www.parisaeroport.fr/en/passengers/access/paris-charles-de-gaulle/public-transport/rer-b" },
      },
      {
        code: "ORY",
        name: "Orly",
        summary: "About 14 km south of Paris, mainly for European and French routes.",
        transfers: [
          { mode: "metro", name: "Metro line 14", to: "Châtelet and central Paris", fare: { text: "€14 with the Paris Region <> Airports ticket", source: idfmAirports } },
          { mode: "train", name: "Orlyval and RER B", to: "Antony, then Denfert-Rochereau and Châtelet-Les Halles", time: "6 minutes to Antony, then about 25 minutes to Châtelet" },
        ],
        officialPage: { label: "Paris Aéroport: Orly by RER B and Orlyval", url: "https://www.parisaeroport.fr/en/passengers/access/paris-orly/public-transport/rer-b-orlyval" },
      },
    ],
    weather: "MMGBBBGGBBMM",
    neighbourhoods: [
      { name: "Le Marais", bestFor: "First visits", text: "Medieval lanes on the Right Bank, full of galleries, boutiques, falafel shops and the arcaded Place des Vosges. You can walk to Notre-Dame, the Louvre and the Pompidou Centre. Lively at weekends, when many shops stay open on Sundays." },
      { name: "Saint-Germain-des-Prés", bestFor: "Classic Left Bank cafés", text: "The Paris of literary cafés, bookshops and the Luxembourg Gardens, a short walk from the Musée d’Orsay and the Seine. Polished, safe and expensive, with small hotels in old buildings." },
      { name: "Latin Quarter", bestFor: "Value near the centre", text: "The student quarter around the Sorbonne and the Panthéon, with cheaper restaurants and hotels than its neighbours. Notre-Dame and the islands are a few minutes away, and RER B runs straight to both airports." },
      { name: "Montmartre", bestFor: "A village feel", text: "Hilltop lanes, the Sacré-Cœur basilica and views over the city, with artists in the Place du Tertre. Hotels can cost less, but it’s further from the main sights and the streets are steep." },
      { name: "Canal Saint-Martin", bestFor: "Local bars and restaurants", text: "Tree-lined canal banks where Parisians picnic, with good bistros and bars at lower prices than the centre. Close to Gare du Nord for the Eurostar and RER B." },
    ],
    itinerary: [
      { title: "The islands and the Left Bank", morning: "See Notre-Dame and the stained glass of Sainte-Chapelle on the Île de la Cité; book Sainte-Chapelle ahead.", afternoon: "Wander the Latin Quarter to the Panthéon and spend an hour in the Luxembourg Gardens.", evening: "Walk along the Seine at sunset, or take an evening river cruise from near the Eiffel Tower." },
      { title: "The Louvre to the Eiffel Tower", morning: "Enter the Louvre on a timed ticket as it opens, and pick two or three wings rather than trying to see everything.", afternoon: "Stroll through the Tuileries, up the Champs-Élysées to the Arc de Triomphe, and climb it for the view.", evening: "Cross to the Eiffel Tower as it lights up; book a lift slot in advance or watch the sparkle from the Trocadéro." },
      { title: "Orsay, the Marais and Montmartre", morning: "See the Impressionists at the Musée d’Orsay, booked ahead for an early slot.", afternoon: "Cross the river for lunch in the Marais and walk to the Place des Vosges.", evening: "Take the metro to Montmartre, climb to Sacré-Cœur for the view, and have dinner on the hill." },
    ],
    daysNeeded: "Three to four days covers the main sights. Add a day for Versailles, which is a short train ride away.",
    gettingAround: "The metro reaches almost everywhere within a few minutes’ walk, with RER trains for the airports and Versailles. Load tickets onto a Navigo Easy pass or buy them in the Île-de-France Mobilités app. Central Paris is also very walkable.",
    essentials: { currency: "Euro (EUR)", plugs: "Types C and E, 230V", language: "French" },
    faqs: [
      {
        q: "Is the Eurostar or a flight better from London to Paris?",
        a: "Compare both. The Eurostar runs from St Pancras to Gare du Nord, city centre to city centre, while a flight adds the journey to and from each airport. Flights can be cheaper, especially from UK airports outside London.",
      },
      {
        q: "Do Americans need a visa for France?",
        a: "Not for short tourist stays: US citizens can visit France and the rest of the Schengen area without a visa for up to 90 days in any 180-day period. The EU’s new border checks register non-EU travellers on arrival; our EES and ETIAS guide explains what changes.",
      },
    ],
    guides: ["ees-etias-uk-us-travellers", "europe-shoulder-season", "carry-on-only-checklist"],
  },
  rome: {
    checked: "2026-11-03",
    airports: [
      {
        code: "FCO",
        name: "Fiumicino (Leonardo da Vinci)",
        summary: "About 30 km south-west of Rome, and the main airport, with flights from the US and across Europe.",
        transfers: [
          { mode: "train", name: "Leonardo Express", to: "Roma Termini", time: "32 minutes nonstop", fare: { text: "€14", source: trenitalia } },
          { mode: "train", name: "FL1 regional train", to: "Trastevere, Ostiense and Tiburtina", note: "Cheaper and slower, and handy if you’re staying near one of its stations." },
        ],
        officialPage: { label: "Aeroporti di Roma: getting to and from Fiumicino", url: "https://www.adr.it/web/aeroporti-di-roma-en/pax-fco-to-and-from" },
      },
      {
        code: "CIA",
        name: "Ciampino",
        summary: "About 15 km south-east of Rome, used mainly by budget airlines on European routes.",
        transfers: [{ mode: "bus", name: "Airport buses", to: "Roma Termini" }],
        officialPage: { label: "Aeroporti di Roma: Ciampino buses", url: "https://www.adr.it/web/aeroporti-di-roma-en/pax-cia-bus" },
      },
    ],
    weather: "MMGBBGMMBBMM",
    neighbourhoods: [
      { name: "Centro Storico", bestFor: "First visits", text: "The historic centre around the Pantheon and Piazza Navona, where most sights are within a walk and the streets are full of cafés. Busy by day and expensive to stay in, but nothing beats stepping out onto a piazza in the morning." },
      { name: "Trastevere", bestFor: "Restaurants and evenings out", text: "Cobbled lanes, ivy-covered houses and trattorias across the Tiber, a short walk from the centre over the river. Very lively at night, so it can be loud; ask for a room off the main squares." },
      { name: "Monti", bestFor: "Near the Colosseum", text: "Rome’s oldest residential quarter, with wine bars, vintage shops and the Roman Forum at the end of the street. Central, characterful and close to Cavour and Colosseo metro stations." },
      { name: "Prati", bestFor: "The Vatican and quieter nights", text: "Wide, elegant streets next to the Vatican, with good-value restaurants and shopping on Via Cola di Rienzo. Calmer than the centre at night, and a pleasant walk across the river to Piazza Navona." },
      { name: "Around Termini", bestFor: "Budget and transport", text: "Cheaper hotels next to the main station, the Leonardo Express to Fiumicino and both metro lines. Less charming and busier at night, but practical for a short stay or an early train." },
    ],
    itinerary: [
      { title: "Ancient Rome", morning: "Start at the Colosseum on a timed ticket as it opens, before the heat and the crowds.", afternoon: "Use the same ticket for the Roman Forum and the Palatine Hill, then climb to the Capitoline Hill for the view over the Forum.", evening: "Walk to Monti for an aperitivo and dinner in its small streets." },
      { title: "The Vatican and Trastevere", morning: "Book an early slot for the Vatican Museums and the Sistine Chapel, and allow three hours.", afternoon: "Visit St Peter’s Basilica, dressed with shoulders and knees covered, and climb the dome if you have the energy.", evening: "Cross the river to Trastevere for dinner in a trattoria and a walk through its lanes." },
      { title: "Piazzas and fountains", morning: "See the Pantheon early, then Piazza Navona before it fills up.", afternoon: "Walk to the Trevi Fountain and the Spanish Steps, and on to the Villa Borghese gardens; the Borghese Gallery needs a booking.", evening: "End with a sunset view from the Pincio terrace over Piazza del Popolo, and dinner nearby." },
    ],
    daysNeeded: "Three days covers the major sights. With four or five you can slow down or add a day trip to Ostia Antica or Tivoli.",
    gettingAround: "Walking is the best way to see the historic centre, where most sights are close together. Rome’s metro has three lines and misses much of the centre, so buses and trams fill the gaps. You can tap a contactless bank card at metro gates and on many buses.",
    essentials: { currency: "Euro (EUR)", plugs: "Types C, F and L, 230V", language: "Italian" },
    faqs: [
      {
        q: "Do I need to book the Colosseum and the Vatican Museums in advance?",
        a: "It’s strongly recommended. Both sell timed-entry tickets online, and queues for walk-up tickets in spring and summer can be long. Buy on the official sites to avoid resellers’ mark-ups.",
      },
      {
        q: "Do Americans need a visa for Italy?",
        a: "Not for short tourist stays: US citizens can visit Italy and the rest of the Schengen area without a visa for up to 90 days in any 180-day period. Our EES and ETIAS guide covers the EU’s new border checks.",
      },
    ],
    guides: ["ees-etias-uk-us-travellers", "europe-shoulder-season", "hand-luggage-sizes-bag-fees"],
  },
  barcelona: {
    checked: "2026-11-03",
    airports: [
      {
        code: "BCN",
        name: "Barcelona–El Prat",
        summary: "About 15 km south-west of the city, with two terminals, T1 and T2.",
        transfers: [
          { mode: "metro", name: "Metro L9 Sud", to: "the city’s metro network", time: "about 30 minutes", fare: { text: "€5.90 Airport ticket", source: tmbAirport } },
          { mode: "bus", name: "Aerobús", to: "Plaça de Catalunya", time: "about 30 to 40 minutes" },
          { mode: "train", name: "Rodalies R2 Nord", to: "Sants and Passeig de Gràcia", note: "From Terminal 2; a free shuttle bus links the terminals." },
        ],
        officialPage: { label: "Aena: Barcelona–El Prat by bus", url: "https://www.aena.es/en/josep-tarradellas-barcelona-el-prat/getting-there/bus.html" },
      },
    ],
    weather: "MMGGBBGGBGMM",
    neighbourhoods: [
      { name: "Gothic Quarter", bestFor: "First visits", text: "The medieval heart of the city around the cathedral, a maze of narrow streets between La Rambla and Via Laietana. You can walk to El Born, the port and the beach. Busy and sometimes noisy, so choose a hotel on a quieter lane." },
      { name: "El Born", bestFor: "Bars and the Picasso Museum", text: "Narrow streets of cocktail bars, tapas and boutiques around the Santa Maria del Mar basilica, next to the Gothic Quarter. Close to the Parc de la Ciutadella and a walk from the beach." },
      { name: "Eixample", bestFor: "Gaudí and quieter nights", text: "The grid of grand avenues with Casa Batlló, La Pedrera and the Sagrada Família. Calmer than the old town, with plenty of hotels, restaurants and metro lines in every direction." },
      { name: "Gràcia", bestFor: "A local feel", text: "A former village of small squares, cafés and independent shops below Park Güell, popular with people who live in Barcelona. Further from the beach, but well connected by metro." },
      { name: "Barceloneta", bestFor: "The beach", text: "The old fishing quarter by the city beach, known for its seafood restaurants. Lovely in spring and autumn, very busy in summer, and a short walk from the old town." },
    ],
    itinerary: [
      { title: "The old town and the sea", morning: "Explore the Gothic Quarter and the cathedral before the tour groups arrive.", afternoon: "Cross into El Born for the Picasso Museum and Santa Maria del Mar, then walk through the Ciutadella park.", evening: "Head to Barceloneta for the beach at sunset and a seafood dinner; Barcelona eats late, often after 9pm." },
      { title: "Gaudí’s Barcelona", morning: "Visit the Sagrada Família on a timed ticket, ideally in the morning light.", afternoon: "Walk down Passeig de Gràcia past Casa Batlló and La Pedrera, and go inside one of them.", evening: "Spend the evening in Gràcia’s squares, moving between small bars for tapas." },
      { title: "Park Güell and Montjuïc", morning: "See Park Güell on a timed ticket, early, for the mosaics and the view.", afternoon: "Ride the cable car or funicular up Montjuïc for its gardens, the castle and the art museum.", evening: "Come down to Poble-sec for tapas on Carrer de Blai." },
    ],
    daysNeeded: "Three to four days. Add a day for Montserrat or the beaches along the coast.",
    gettingAround: "The metro is fast and covers most of the city, with buses and the old-town streets best on foot. Buy a T-casual ten-journey ticket, or a travel card for unlimited rides. The airport metro needs its own Airport ticket.",
    essentials: { currency: "Euro (EUR)", plugs: "Types C and F, 230V", language: "Catalan and Spanish" },
    faqs: [
      {
        q: "Which Barcelona airport do budget airlines use?",
        a: "Most fly to Barcelona–El Prat (BCN), but some use Girona or Reus, which are much further from the city. Check the airport code on your booking before you compare fares.",
      },
      {
        q: "Do I need to book the Sagrada Família in advance?",
        a: "Yes. Buy a timed ticket on the basilica’s official website, as same-day tickets often sell out. Park Güell also uses timed entry.",
      },
    ],
    guides: ["ees-etias-uk-us-travellers", "europe-shoulder-season", "hand-luggage-sizes-bag-fees"],
  },
  lisbon: {
    checked: "2026-11-03",
    airports: [
      {
        code: "LIS",
        name: "Humberto Delgado",
        summary: "About 7 km north of the centre, one of the closest major airports to any European capital.",
        transfers: [
          { mode: "metro", name: "Metro Red line", to: "the city centre, changing lines for Baixa", time: "about 25 minutes" },
          { mode: "bus", name: "Aerobus", to: "Baixa and Cais do Sodré", note: "Has luggage racks, which helps with big bags." },
          { mode: "taxi", name: "Taxi or ride-hailing", to: "anywhere in the centre", note: "A short ride outside rush hour." },
        ],
        officialPage: { label: "Lisbon Airport (ANA)", url: "https://www.aeroportolisboa.pt/" },
      },
    ],
    weather: "MMBBBBGGBBMM",
    neighbourhoods: [
      { name: "Baixa and Chiado", bestFor: "First visits", text: "The flat, central grid between the river and Rossio, with Chiado’s cafés, bookshops and theatres just above it. Everything is within a walk, and trams and the metro start here." },
      { name: "Alfama", bestFor: "Old Lisbon and fado", text: "The oldest quarter, with steep, winding lanes below the castle, fado houses and viewpoints over the river. Atmospheric, but hard going with heavy bags, and few cars can reach the hotels." },
      { name: "Bairro Alto and Príncipe Real", bestFor: "Nightlife and boutiques", text: "Bairro Alto’s bars spill onto the streets late into the night. Príncipe Real, next door, is quieter and greener, with design shops, a garden square and some of the city’s best boutique hotels." },
      { name: "Cais do Sodré", bestFor: "The riverside", text: "A riverside district with the Time Out Market food hall, bars and the train station for Cascais and the beaches. Handy for day trips, and lively at night." },
      { name: "Belém", bestFor: "Monuments and a slower pace", text: "Further west by the river, near the Jerónimos Monastery, the Belém Tower and the custard-tart bakery. Quiet at night, and a tram or train ride from the centre." },
    ],
    itinerary: [
      { title: "Baixa, Chiado and the viewpoints", morning: "Start at Praça do Comércio on the river and walk up through Baixa to Rossio.", afternoon: "Take the Santa Justa lift, or walk, up to Chiado and the Bairro Alto viewpoints.", evening: "Watch the sunset from the Miradouro de São Pedro de Alcântara, then eat in Bairro Alto or Príncipe Real." },
      { title: "Alfama and the castle", morning: "Climb to the Castelo de São Jorge as it opens for the views over the city.", afternoon: "Wander down through Alfama by way of the Miradouro de Santa Luzia, and see the cathedral.", evening: "Book dinner at a fado house, where the music is part of the evening." },
      { title: "Belém, or a day in Sintra", morning: "Take the tram or train to Belém and visit the Jerónimos Monastery.", afternoon: "See the Belém Tower and the Monument to the Discoveries, with custard tarts at the bakery nearby.", evening: "Or spend the whole day in Sintra’s palaces instead, taking the train from Rossio and returning for dinner in Cais do Sodré." },
    ],
    daysNeeded: "Three days for the city. Add one or two for Sintra and the coast at Cascais.",
    gettingAround: "Walking, with help on the hills from the metro, trams and the Santa Justa lift. Load a rechargeable Navegante card for metro, tram and bus trips. Tram 28 is scenic but very crowded; go early.",
    essentials: { currency: "Euro (EUR)", plugs: "Types C and F, 230V", language: "Portuguese" },
    faqs: [
      {
        q: "Is Sintra worth a day trip from Lisbon?",
        a: "For most first visits, yes. Trains run from Rossio station in central Lisbon, and the palaces and gardens fill a full day. Go early or on a weekday, as it gets very busy.",
      },
      {
        q: "Is Lisbon hilly?",
        a: "Very. The old neighbourhoods climb steep, cobbled streets that can be slippery. Trams, the metro and the Santa Justa lift help, and comfortable shoes matter.",
      },
    ],
    guides: ["ees-etias-uk-us-travellers", "europe-shoulder-season", "carry-on-only-checklist"],
  },
};
