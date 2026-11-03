import type { DestinationDepth } from "./types";

// Fares and journey times checked 3 Nov 2026 on the pages linked beside them.
// Where an operator's page didn't give a current fare, none is shown.

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
      { name: "South Bank and Bankside", bestFor: "First visits", text: "On the river between the London Eye and Tower Bridge, a walk from Westminster, Tate Modern and Borough Market." },
      { name: "Covent Garden and Soho", bestFor: "Theatre and nightlife", text: "The West End’s theatres, restaurants and bars on the doorstep. Lively late, and among the most expensive places to stay." },
      { name: "South Kensington", bestFor: "Museums and families", text: "The Natural History, Science and V&A museums, Hyde Park nearby and a quieter feel after dark." },
      { name: "Shoreditch", bestFor: "Food and a younger crowd", text: "Street food, markets, bars and street art in East London, with fast links to the City." },
      { name: "King’s Cross", bestFor: "Rail connections", text: "The Eurostar, trains north and six Underground lines, around a redeveloped canal-side quarter." },
    ],
    itinerary: [
      { title: "Westminster and the South Bank", text: "Start at Westminster Abbey and the Houses of Parliament, cross the river and walk the South Bank past the London Eye to Tate Modern. Finish with food at Borough Market." },
      { title: "Museums and the West End", text: "Spend the morning at the British Museum, then walk through Covent Garden and Trafalgar Square to the National Gallery. Book a West End show for the evening." },
      { title: "The Tower and East London", text: "See the Tower of London and walk over Tower Bridge, then head to Shoreditch and Spitalfields for markets and dinner, or take a river boat to Greenwich." },
    ],
    daysNeeded: "Three to four days covers the main sights. With a week you can add Greenwich, Hampton Court, or a day trip to Windsor or Oxford.",
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
      { name: "Le Marais", bestFor: "First visits", text: "Central and walkable, with medieval streets, galleries, falafel and the Place des Vosges." },
      { name: "Saint-Germain-des-Prés", bestFor: "Classic Left Bank cafés", text: "Literary cafés, bookshops and the Luxembourg Gardens, close to the Musée d’Orsay. Polished and pricey." },
      { name: "Latin Quarter", bestFor: "Value near the centre", text: "Student streets around the Sorbonne and the Panthéon, a short walk from Notre-Dame." },
      { name: "Montmartre", bestFor: "A village feel", text: "Hilltop lanes, Sacré-Cœur and views over the city. Hotels can be cheaper, but it’s further from the main sights." },
      { name: "Canal Saint-Martin", bestFor: "Local bars and restaurants", text: "Tree-lined canal banks where Parisians picnic, with good food at lower prices than the centre." },
    ],
    itinerary: [
      { title: "The islands and the Left Bank", text: "Begin at Notre-Dame and Sainte-Chapelle on the Île de la Cité, wander the Latin Quarter to the Luxembourg Gardens, and walk along the Seine at sunset." },
      { title: "The Louvre to the Eiffel Tower", text: "See the Louvre in the morning, stroll the Tuileries and the Champs-Élysées to the Arc de Triomphe, then cross to the Eiffel Tower as it lights up." },
      { title: "Orsay, the Marais and Montmartre", text: "Visit the Musée d’Orsay, lunch in the Marais, then climb to Montmartre and Sacré-Cœur for the evening view." },
    ],
    daysNeeded: "Three to four days covers the main sights. Add a day for Versailles, which is a short train ride away.",
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
      { name: "Centro Storico", bestFor: "First visits", text: "Around the Pantheon and Piazza Navona, so you can walk to most sights. Busy by day and pricey to stay in." },
      { name: "Trastevere", bestFor: "Restaurants and evenings out", text: "Cobbled lanes and trattorias across the Tiber. Lively, and loud late at night." },
      { name: "Monti", bestFor: "Near the Colosseum", text: "Wine bars, small shops and the Forum at the end of the street." },
      { name: "Prati", bestFor: "The Vatican and quieter nights", text: "Elegant streets by the Vatican, with good value restaurants and a calmer feel." },
      { name: "Around Termini", bestFor: "Budget and transport", text: "Cheaper hotels next to the airport train and the metro. Less charming, and busier at night." },
    ],
    itinerary: [
      { title: "Ancient Rome", text: "See the Colosseum, the Roman Forum and the Palatine Hill on one timed ticket, then spend the evening in Monti." },
      { title: "The Vatican and Trastevere", text: "Book an early slot for the Vatican Museums and the Sistine Chapel, visit St Peter’s Basilica, then cross to Trastevere for dinner." },
      { title: "Piazzas and fountains", text: "Walk from the Pantheon to Piazza Navona, the Trevi Fountain and the Spanish Steps, and end in the Villa Borghese gardens." },
    ],
    daysNeeded: "Three days covers the major sights. With four or five you can slow down or add a day trip to Ostia Antica or Tivoli.",
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
      { name: "Gothic Quarter", bestFor: "First visits", text: "The medieval heart of the city, around the cathedral, within walking distance of the old town and the sea." },
      { name: "El Born", bestFor: "Bars and the Picasso Museum", text: "Narrow streets of cocktail bars and boutiques next to the Gothic Quarter." },
      { name: "Eixample", bestFor: "Gaudí and quieter nights", text: "Grand avenues with Casa Batlló, La Pedrera and the Sagrada Família, and well connected by metro." },
      { name: "Gràcia", bestFor: "A local feel", text: "Small squares, cafés and independent shops, below Park Güell." },
      { name: "Barceloneta", bestFor: "The beach", text: "The old fishing quarter by the city beach, known for seafood. Busy in summer." },
    ],
    itinerary: [
      { title: "The old town and the sea", text: "Explore the Gothic Quarter and the cathedral, cross into El Born, then walk to Barceloneta for the beach and a late seafood dinner." },
      { title: "Gaudí’s Barcelona", text: "Visit the Sagrada Família on a timed ticket, walk Passeig de Gràcia past Casa Batlló and La Pedrera, and spend the evening in Gràcia." },
      { title: "Park Güell and Montjuïc", text: "See Park Güell in the morning, then ride up Montjuïc for gardens, museums and views, and finish with tapas in Poble-sec." },
    ],
    daysNeeded: "Three to four days. Add a day for Montserrat or the beaches along the coast.",
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
      { name: "Baixa and Chiado", bestFor: "First visits", text: "The flat, central grid by the river, with Chiado’s cafés and shops just above it." },
      { name: "Alfama", bestFor: "Old Lisbon and fado", text: "Steep, winding lanes below the castle, with fado houses and viewpoints. Hard going with heavy bags." },
      { name: "Bairro Alto and Príncipe Real", bestFor: "Nightlife and boutiques", text: "Bars spill into the streets in Bairro Alto; Príncipe Real next door is quieter and greener." },
      { name: "Cais do Sodré", bestFor: "The riverside", text: "Food hall, bars and the train to Cascais and the beaches." },
      { name: "Belém", bestFor: "Monuments and a slower pace", text: "Further west by the river, near the monastery and the tower, and quieter at night." },
    ],
    itinerary: [
      { title: "Baixa, Chiado and the viewpoints", text: "Start at Praça do Comércio, walk up through Baixa to Chiado, and ride a tram or funicular to the viewpoints of Bairro Alto." },
      { title: "Alfama and the castle", text: "Climb to the Castelo de São Jorge, wander Alfama via the Miradouro de Santa Luzia, and book a fado dinner." },
      { title: "Belém, or a day in Sintra", text: "See the Jerónimos Monastery and the Belém Tower, with custard tarts in between, or take the train to Sintra’s palaces instead." },
    ],
    daysNeeded: "Three days for the city. Add one or two for Sintra and the coast at Cascais.",
    essentials: { currency: "Euro (EUR)", plugs: "Types C and F, 230V", language: "Portuguese" },
    faqs: [
      {
        q: "Is Sintra worth a day trip from Lisbon?",
        a: "For most first visits, yes. Trains run from Rossio station in central Lisbon, and the palaces and gardens fill a full day. Go early or on a weekday, as it gets very busy.",
      },
      {
        q: "Is Lisbon hilly?",
        a: "Very. The old neighbourhoods climb steep, cobbled streets that can be slippery. Trams, funiculars and the Santa Justa lift help, and comfortable shoes matter.",
      },
    ],
    guides: ["ees-etias-uk-us-travellers", "europe-shoulder-season", "carry-on-only-checklist"],
  },
};
