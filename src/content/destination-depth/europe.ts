import { photos } from "../images";
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
    // Batch 22 fields checked 5 Nov 2026: GOV.UK (999 and 112), Visit London
    // (tipping, Night Tube, free museums), TfL (contactless and capping),
    // Windsor council and GWR (day-trip journey times).
    checked: "2026-11-05",
    timeZone: "Europe/London",
    localTips: [
      { icon: "money", title: "Tap your card everywhere", text: "Contactless cards and phones work in almost every shop, pub and taxi. London buses don’t take cash at all." },
      { icon: "transport", title: "One card for every journey", text: "Touch in with the same card or phone each time, and on the Tube touch out too. Daily and weekly caps only work if you stick to one." },
      { icon: "ticket", title: "The big museums are free", text: "The British Museum, National Gallery, Tate Modern, V&A and Natural History Museum charge nothing to enter. Special exhibitions are paid, so book those ahead." },
      { icon: "safety", title: "Watch your phone", text: "Phone snatching by thieves on bikes is common in busy areas. Step back from the kerb to use your phone, and keep it in a zipped pocket on crowded streets." },
      { icon: "etiquette", title: "Stand on the right", text: "On Tube escalators, stand on the right and leave the left side free for people walking. Let passengers off the train before you board." },
    ],
    foods: [
      { name: "Full English breakfast", text: "Eggs, bacon, sausage, beans, toast and mushrooms, served all morning in cafés across the city." },
      { name: "Fish and chips", text: "Battered cod or haddock with thick chips, best from a traditional chip shop and eaten with salt and vinegar." },
      { name: "Sunday roast", text: "Roast meat with Yorkshire pudding, potatoes, vegetables and gravy, served in pubs on Sundays, when it’s worth booking." },
      { name: "Pie and mash", text: "A minced beef pie with mashed potato and green parsley liquor, the old working lunch of East London pie shops." },
      { name: "Afternoon tea", text: "Sandwiches, scones with clotted cream and jam, and cakes with a pot of tea, served in hotels and tea rooms." },
    ],
    dayTrips: [
      { name: "Windsor", time: "25 to 50 minutes by train from Paddington, changing at Slough", text: "Windsor Castle, the oldest occupied castle in the world, sits a short walk from the station, with Eton and the Thames across the bridge.", photo: photos.londonTripWindsor },
      { name: "Oxford", time: "About 1 hour by train from Paddington", text: "Walk between the colleges, the Radcliffe Camera and the Bodleian Library, then punt on the river or visit the free Ashmolean Museum.", photo: photos.londonTripOxford },
      { name: "Bath", time: "About 1 hour 30 minutes by train from Paddington", text: "The Roman Baths, Bath Abbey and the Georgian terraces of the Royal Crescent, all within walking distance of the station.", photo: photos.londonTripBath },
    ],
    visual: {
      days: [
        { photo: photos.londonAbbey, stops: ["Westminster Abbey", "South Bank walk", "Tate Modern", "Borough Market"] },
        { photo: photos.londonMuseum, stops: ["British Museum", "Covent Garden", "National Gallery", "A West End show"] },
        { photo: photos.londonTowerBridge, stops: ["Tower of London", "Tower Bridge", "Brick Lane", "Shoreditch"] },
      ],
      stay: [
        { name: "South Bank and Bankside", bestFor: "First visits", photo: photos.londonBankside },
        { name: "Covent Garden and Soho", bestFor: "Theatre and nightlife", photo: photos.londonCoventGarden },
        { name: "Shoreditch", bestFor: "Food and a younger crowd", photo: photos.londonBrickLane },
      ],
    },
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
    essentials: {
      currency: "Pound sterling (GBP)",
      plugs: "Type G, 230V",
      language: "English",
      emergency: "999 or 112",
      tipping: "10 to 15% in restaurants if service isn’t already on the bill; not expected in pubs",
      water: "Tap water is safe to drink",
    },
    faqs: [
      {
        q: "Do I need cash in London?",
        a: "Rarely. Cards and phone payments are accepted almost everywhere, and buses don’t take cash. A little cash helps at some market stalls, but you can travel the whole city without it.",
      },
      {
        q: "Can I use my own contactless card on the Tube?",
        a: "Yes. Contactless cards and phones from abroad work on the Tube, buses and trains in London, with the same daily and weekly caps. Your bank may charge a foreign transaction fee on each payment.",
      },
      {
        q: "Does the Tube run all night?",
        a: "Only at weekends. The Night Tube runs through Friday and Saturday nights on the Victoria, Central, Jubilee, Northern and Piccadilly lines; on other nights, night buses take over.",
      },
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
    // Batch 22 fields checked 6 Nov 2026: GOV.UK France (112, 15, 17, 18;
    // pickpockets on the metro and RER), Paris je t'aime (service included,
    // free tap water), Eau de Paris (fountains), Château de Versailles,
    // Fondation Monet and Château de Fontainebleau (getting there).
    checked: "2026-11-06",
    timeZone: "Europe/Paris",
    localTips: [
      { icon: "money", title: "Service is already included", text: "Restaurant bills include service by law. Leave a little extra only if the service was good." },
      { icon: "water", title: "Ask for a carafe d’eau", text: "Restaurants serve a jug of tap water free on request. Paris tap water and the green Wallace fountains are safe to drink." },
      { icon: "transport", title: "Load rides on Navigo Easy", text: "Buy metro and RER rides on a Navigo Easy pass or in the Île-de-France Mobilités app. The airports need the separate Paris Region <> Airports ticket." },
      { icon: "safety", title: "Mind your bag on the metro", text: "Pickpockets work the metro, RER and big stations, often in pairs using a distraction. Carry your bag across your body and split cards and cash." },
      { icon: "etiquette", title: "Say bonjour first", text: "Greet staff with “Bonjour” when you walk into a shop or café, and “Au revoir” as you leave. It changes how you’re served." },
      { icon: "ticket", title: "Book big sights ahead", text: "The Louvre, Sainte-Chapelle, the Eiffel Tower lifts and Versailles all sell timed tickets online. Walk-up queues in spring and summer are long." },
    ],
    foods: [
      { name: "Croissant", text: "A flaky butter pastry, best warm from a neighbourhood boulangerie in the morning." },
      { name: "Jambon-beurre", text: "A baguette with ham and butter, the classic Paris lunch sandwich from any bakery." },
      { name: "Croque-monsieur", text: "A toasted ham and cheese sandwich topped with béchamel, on the menu at most cafés and brasseries." },
      { name: "Steak frites", text: "Steak with chips, the standard order at traditional bistros and brasseries." },
      { name: "Soupe à l’oignon", text: "Onion soup under a lid of bread and melted cheese, a brasserie favourite in winter." },
      { name: "Crêpes", text: "Thin pancakes, sweet or savoury (galettes are the buckwheat kind), from street stands and crêperies around Montparnasse." },
    ],
    dayTrips: [
      { name: "Versailles", time: "RER C to Versailles Château Rive Gauche, then a 10-minute walk", text: "Louis XIV’s palace, with the Hall of Mirrors, the royal apartments and huge formal gardens. Book a timed ticket and allow a full day.", photo: photos.parisTripVersailles },
      { name: "Giverny", time: "About 50 minutes by train from Saint-Lazare to Vernon-Giverny, then a shuttle", text: "Claude Monet’s house and the water-lily garden he painted for decades. The house and gardens open from spring to early November only.", photo: photos.parisTripGiverny },
      { name: "Fontainebleau", time: "About 40 minutes by train from Gare de Lyon, then a short bus ride", text: "A royal château lived in by French kings and Napoleon, with a forest of walking trails and rocks around it.", photo: photos.parisTripFontainebleau },
    ],
    visual: {
      days: [
        { photo: photos.parisIsland, stops: ["Notre-Dame", "Sainte-Chapelle", "The Panthéon", "Luxembourg Gardens"] },
        { photo: photos.parisLouvre, stops: ["The Louvre", "Tuileries Garden", "Arc de Triomphe", "The Eiffel Tower"] },
        { photo: photos.parisMontmartre, stops: ["Musée d’Orsay", "Le Marais", "Place des Vosges", "Sacré-Cœur"] },
      ],
      stay: [
        { name: "Saint-Germain-des-Prés", bestFor: "Classic Left Bank cafés", photo: photos.parisSaintGermain },
        { name: "Latin Quarter", bestFor: "Value near the centre", photo: photos.parisLatinQuarter },
        { name: "Montmartre", bestFor: "A village feel", photo: photos.parisMontmartreStreet },
      ],
    },
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
    essentials: {
      currency: "Euro (EUR)",
      plugs: "Types C and E, 230V",
      language: "French",
      emergency: "112 (or 15 ambulance, 17 police, 18 fire)",
      tipping: "Service is included in the bill; round up or leave a little extra for good service",
      water: "Tap water is safe to drink",
    },
    faqs: [
      {
        q: "Is the Eurostar or a flight better from London to Paris?",
        a: "Compare both. The Eurostar runs from St Pancras to Gare du Nord, city centre to city centre, while a flight adds the journey to and from each airport. Flights can be cheaper, especially from UK airports outside London.",
      },
      {
        q: "Do Americans need a visa for France?",
        a: "Not for short tourist stays: US citizens can visit France and the rest of the Schengen area without a visa for up to 90 days in any 180-day period. The EU’s new border checks register non-EU travellers on arrival; our EES and ETIAS guide explains what changes.",
      },
      {
        q: "Do you tip in Paris?",
        a: "It isn’t expected. Restaurant prices include service, so the Paris tourist office suggests leaving extra only when the welcome and service were good. Rounding up or leaving a few euros is plenty.",
      },
      {
        q: "Is Paris tap water safe to drink?",
        a: "Yes. Eau de Paris supplies the taps and the city’s public fountains, including the green Wallace fountains, with drinking water. Restaurants will bring a free carafe d’eau if you ask.",
      },
      {
        q: "Is Paris safe for tourists?",
        a: "Generally, yes, but pickpocketing is common. GOV.UK warns that thieves work on the metro, RER lines and at mainline stations, often in gangs using distraction, so keep valuables split and your bag in front of you.",
      },
    ],
    guides: ["ees-etias-uk-us-travellers", "europe-shoulder-season", "carry-on-only-checklist"],
  },
  rome: {
    // Batch 22 fields checked 6 Nov 2026: GOV.UK Italy (112 police, 118
    // ambulance, 115 fire; pickpockets; tourist tax), Italia.it (tipping),
    // Acea and Turismo Roma (nasoni drinking fountains), Trenitalia (Florence),
    // Le Villae Tivoli (Villa d'Este access), Orvieto Viva (train and funicular),
    // St Peter's Basilica (dress code).
    checked: "2026-11-06",
    timeZone: "Europe/Rome",
    localTips: [
      { icon: "water", title: "Refill at the nasoni", text: "Rome’s small street fountains run with the same drinking water as household taps. Cover the spout with a finger and water shoots up to drink." },
      { icon: "dress", title: "Cover shoulders and knees", text: "St Peter’s Basilica requires covered shoulders and knees for everyone. Carry a light scarf on church days." },
      { icon: "safety", title: "Watch for bag snatchers", text: "Pickpocketing is highest at the big sights and on crowded metro trains and buses. Keep your bag zipped and in front of you." },
      { icon: "money", title: "City tax at the hotel", text: "Rome charges a tourist tax per night, usually paid at your hotel and not included in the booking. Hotels often ask for cash, so get a receipt." },
      { icon: "ticket", title: "Book timed tickets", text: "The Colosseum, the Vatican Museums and the Borghese Gallery sell timed entry online. Buy on the official sites, not from street touts." },
      { icon: "food", title: "Coffee at the bar", text: "Romans drink espresso standing at the counter, which usually costs less than sitting at a table." },
    ],
    foods: [
      { name: "Cacio e pepe", text: "Pasta with pecorino romano cheese and black pepper, a Roman classic on every trattoria menu." },
      { name: "Carbonara", text: "Pasta with egg, guanciale (cured pork cheek) and pecorino, with no cream in the Roman version." },
      { name: "Supplì", text: "Fried rice balls with tomato and a mozzarella centre, sold hot at pizzerias and takeaway counters." },
      { name: "Carciofi alla giudia", text: "Whole artichokes fried until crisp, a dish of Rome’s Jewish Ghetto and best in spring." },
      { name: "Pizza al taglio", text: "Pizza by the slice, cut and weighed to order at bakeries and pizza counters all over the city." },
      { name: "Maritozzo", text: "A soft sweet bun split and filled with whipped cream, eaten for breakfast at Roman bakeries and cafés." },
    ],
    dayTrips: [
      { name: "Tivoli", time: "Under an hour by train from Termini or Tiburtina, or by Cotral bus from Ponte Mammolo", text: "Villa d’Este’s terraced gardens and hundreds of fountains, with Hadrian’s Villa just outside the town.", photo: photos.romeTripTivoli },
      { name: "Florence", time: "Just over 1 hour 30 minutes by Frecciarossa from Termini", text: "The Duomo, the Uffizi and the Ponte Vecchio make a long but rewarding day; book the Uffizi ahead.", photo: photos.romeTripFlorence },
      { name: "Orvieto", time: "About 1 hour by train from Termini, then the funicular up to town", text: "A hilltop town on a cliff of volcanic rock, with a striking cathedral and streets of small restaurants.", photo: photos.romeTripOrvieto },
    ],
    visual: {
      days: [
        { photo: photos.romeForum, stops: ["The Colosseum", "Roman Forum", "Palatine Hill", "Capitoline Hill"] },
        { photo: photos.romeStPeters, stops: ["Vatican Museums", "Sistine Chapel", "St Peter’s Basilica", "Trastevere"] },
        { photo: photos.romeTrevi, stops: ["The Pantheon", "Piazza Navona", "Trevi Fountain", "Spanish Steps"] },
      ],
      stay: [
        { name: "Centro Storico", bestFor: "First visits", photo: photos.romeNavona },
        { name: "Trastevere", bestFor: "Restaurants and evenings out", photo: photos.romeTrastevere },
        { name: "Monti", bestFor: "Near the Colosseum", photo: photos.romeImperialForums },
      ],
    },
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
    essentials: {
      currency: "Euro (EUR)",
      plugs: "Types C, F and L, 230V",
      language: "Italian",
      emergency: "112 (or 118 ambulance, 115 fire)",
      tipping: "Not compulsory; around 10% or rounding up when you’re happy with the service",
      water: "Tap water and the nasoni street fountains are safe to drink",
    },
    faqs: [
      {
        q: "Do I need to book the Colosseum and the Vatican Museums in advance?",
        a: "It’s strongly recommended. Both sell timed-entry tickets online, and queues for walk-up tickets in spring and summer can be long. Buy on the official sites to avoid resellers’ mark-ups.",
      },
      {
        q: "Do Americans need a visa for Italy?",
        a: "Not for short tourist stays: US citizens can visit Italy and the rest of the Schengen area without a visa for up to 90 days in any 180-day period. Our EES and ETIAS guide covers the EU’s new border checks.",
      },
      {
        q: "Do you tip in Rome?",
        a: "It’s optional. Italy’s official tourism site says there are no fixed rules, but leaving around 10% is customary when you’re happy with the service. Rounding up in a café is plenty.",
      },
      {
        q: "Can you drink the water from Rome’s fountains?",
        a: "Yes. The nasoni, Rome’s small cast-iron street fountains, carry the same drinking water that Acea supplies to homes. Fill a bottle as you walk between sights.",
      },
      {
        q: "Is there a tourist tax in Rome?",
        a: "Yes. Like many Italian cities, Rome charges a nightly tourist tax that you usually pay at your hotel, and it’s rarely included in the booking price. GOV.UK notes that hotels often ask for cash.",
      },
      {
        q: "What should I wear to the Vatican?",
        a: "Cover your shoulders and knees. St Peter’s Basilica asks every visitor to cover their shoulders, with long trousers or a skirt or trousers below the knee, and the same rule applies to the dome. Bring a scarf in summer.",
      },
    ],
    guides: ["ees-etias-uk-us-travellers", "europe-shoulder-season", "hand-luggage-sizes-bag-fees"],
  },
  barcelona: {
    // Batch 22 fields checked 6 Nov 2026: GOV.UK Spain (112), TMB (Airport
    // ticket), Aigües de Barcelona (tap water quality), Montserrat Visita and
    // Cremallera de Montserrat (train and rack railway), Visit Sitges and Renfe
    // (Sitges and Girona trains).
    checked: "2026-11-06",
    timeZone: "Europe/Madrid",
    localTips: [
      { icon: "ticket", title: "The airport needs its own ticket", text: "Metro L9 Sud to and from the airport isn’t covered by the T-casual. Buy the Airport ticket at the station machines." },
      { icon: "transport", title: "Buy a T-casual", text: "The ten-journey T-casual works on the metro, buses and trams in the city, and is cheaper than single tickets." },
      { icon: "safety", title: "Guard your phone and bag", text: "Pickpockets work La Rambla, the metro and the beach. Keep your phone off café tables and your bag closed and in front of you." },
      { icon: "clock", title: "Eat on Barcelona time", text: "Lunch runs from about 2pm and dinner often starts after 9pm. Restaurants that fill at 7pm are usually aimed at visitors." },
      { icon: "water", title: "The tap water is safe", text: "Barcelona’s tap water is treated and tested, though it can taste of chlorine. A filter bottle helps if you don’t like the taste." },
    ],
    foods: [
      { name: "Pa amb tomàquet", text: "Bread rubbed with ripe tomato, olive oil and salt, served with almost every Catalan meal." },
      { name: "Patatas bravas", text: "Fried potatoes with a spicy sauce, a standard order in tapas bars across the city." },
      { name: "Paella and arròs negre", text: "Rice cooked with seafood, or black with squid ink, best at the seafront restaurants of Barceloneta." },
      { name: "Crema catalana", text: "A custard dessert with a crisp burnt-sugar top, on the menu at traditional Catalan restaurants." },
      { name: "Vermut", text: "Sweet vermouth with an olive and a slice of orange, drunk before lunch at weekends in old-style bodegas." },
      { name: "Calçots", text: "Grilled spring onions dipped in romesco sauce, a Catalan winter and spring feast." },
    ],
    dayTrips: [
      { name: "Montserrat", time: "About 1 hour 30 minutes by FGC train from Plaça d’Espanya, then the rack railway or cable car", text: "A Benedictine monastery high among jagged rock peaks, with walking trails and wide views over Catalonia.", photo: photos.barcelonaTripMontserrat },
      { name: "Sitges", time: "About 30 minutes by Rodalies R2 Sud from Sants or Passeig de Gràcia", text: "A seaside town of sandy beaches, a whitewashed old town and a church on the waterfront, easy for an afternoon.", photo: photos.barcelonaTripSitges },
      { name: "Girona", time: "About 40 minutes by train from Sants", text: "A walled medieval city with a cathedral, an old Jewish quarter and coloured houses along the River Onyar.", photo: photos.barcelonaTripGirona },
    ],
    visual: {
      days: [
        { photo: photos.barcelonaCathedral, stops: ["Barcelona Cathedral", "Picasso Museum", "Santa Maria del Mar", "Barceloneta beach"] },
        { photo: photos.barcelonaSagrada, stops: ["Sagrada Família", "Casa Batlló", "La Pedrera", "Gràcia"] },
        { photo: photos.barcelonaParkGuell, stops: ["Park Güell", "Montjuïc cable car", "Montjuïc Castle", "Carrer de Blai"] },
      ],
      stay: [
        { name: "Gothic Quarter", bestFor: "First visits", photo: photos.barcelonaCathedral },
        { name: "Eixample", bestFor: "Gaudí and quieter nights", photo: photos.barcelonaCasaBatllo },
        { name: "Barceloneta", bestFor: "The beach", photo: photos.barcelonaBarceloneta },
      ],
    },
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
    essentials: {
      currency: "Euro (EUR)",
      plugs: "Types C and F, 230V",
      language: "Catalan and Spanish",
      emergency: "112",
      tipping: "Not expected; round up or leave a few euros for good service",
      water: "Tap water is safe to drink, though it can taste of chlorine",
    },
    faqs: [
      {
        q: "Which Barcelona airport do budget airlines use?",
        a: "Most fly to Barcelona–El Prat (BCN), but some use Girona or Reus, which are much further from the city. Check the airport code on your booking before you compare fares.",
      },
      {
        q: "Do I need to book the Sagrada Família in advance?",
        a: "Yes. Buy a timed ticket on the basilica’s official website, as same-day tickets often sell out. Park Güell also uses timed entry.",
      },
      {
        q: "Is Barcelona tap water safe to drink?",
        a: "Yes. Aigües de Barcelona tests the supply against EU drinking-water rules. It can taste of chlorine, which the utility says is a sign it has been disinfected, so some visitors prefer a filter bottle.",
      },
      {
        q: "Does the metro go to Barcelona airport?",
        a: "Yes. Metro line L9 Sud stops at both terminals and takes about 30 minutes to connect with the city’s metro network. It needs the separate Airport ticket rather than a T-casual.",
      },
      {
        q: "What is the emergency number in Spain?",
        a: "Dial 112 for police, ambulance or fire, as GOV.UK’s Spain advice confirms. Report thefts to the Policía Nacional or the Mossos d’Esquadra, Catalonia’s police, for your insurance claim.",
      },
    ],
    guides: ["ees-etias-uk-us-travellers", "europe-shoulder-season", "hand-luggage-sizes-bag-fees"],
  },
  lisbon: {
    // Batch 22 fields checked 6 Nov 2026: GOV.UK Portugal and Visit Portugal
    // (112; tipping), EPAL (tap water quality reports), CP (Sintra and Cascais
    // lines, Cascais line works from 8 Nov 2026, Évora Intercidades).
    checked: "2026-11-06",
    timeZone: "Europe/Lisbon",
    localTips: [
      { icon: "transport", title: "Load a Navegante card", text: "Top up a rechargeable Navegante card for the metro, trams, buses and the Sintra and Cascais trains. Tap in on every trip." },
      { icon: "dress", title: "Wear shoes with grip", text: "The old quarters are steep and paved with polished limestone that gets slippery, especially after rain." },
      { icon: "ticket", title: "Ride tram 28 early", text: "The famous yellow tram fills up fast. Board near the start of the line early in the day, or walk the route instead." },
      { icon: "safety", title: "Mind your pockets on trams", text: "Crowded trams and viewpoints are where pickpockets work. Keep your bag zipped and your phone out of back pockets." },
      { icon: "food", title: "Starters aren’t free", text: "Bread, olives and cheese put on the table before you order are charged if you eat them. Send them back if you don’t want them." },
    ],
    foods: [
      { name: "Pastel de nata", text: "A custard tart in crisp pastry, eaten warm with cinnamon at bakeries across the city and in Belém." },
      { name: "Bacalhau", text: "Salt cod, cooked in hundreds of ways; try bacalhau à Brás, shredded with egg and potato, in any tasca." },
      { name: "Grilled sardines", text: "Whole sardines grilled over charcoal, the street food of summer and of the June festivals in Alfama." },
      { name: "Bifana", text: "A thin pork steak in garlic and white wine, served in a soft roll at counters and cafés." },
      { name: "Ginjinha", text: "A sour-cherry liqueur sold by the shot from tiny bars around Rossio." },
      { name: "Polvo à lagareiro", text: "Roast octopus with potatoes, garlic and plenty of olive oil, a classic in Lisbon restaurants." },
    ],
    dayTrips: [
      { name: "Sintra", time: "About 50 minutes by train from Rossio", text: "Hill palaces and gardens, from the bright Pena Palace to the Moorish Castle, in forest above the town. Go early on a weekday.", photo: photos.lisbonTripSintra },
      { name: "Cascais", time: "About 45 minutes by train from Cais do Sodré; check CP for replacement buses during line works", text: "A seaside town with small beaches, a marina and a coastal path to the Boca do Inferno cliffs.", photo: photos.lisbonTripCascais },
      { name: "Évora", time: "Under 2 hours by Intercidades train from Lisbon", text: "A walled city in the Alentejo with a Roman temple, a cathedral and the Chapel of Bones.", photo: photos.lisbonTripEvora },
    ],
    visual: {
      days: [
        { photo: photos.lisbonComercio, stops: ["Praça do Comércio", "Rossio", "Santa Justa lift", "São Pedro de Alcântara viewpoint"] },
        { photo: photos.lisbonAlfama, stops: ["São Jorge Castle", "Santa Luzia viewpoint", "Lisbon Cathedral", "A fado house"] },
        { photo: photos.lisbonBelemTower, stops: ["Jerónimos Monastery", "Belém Tower", "Monument to the Discoveries", "Cais do Sodré"] },
      ],
      stay: [
        { name: "Baixa and Chiado", bestFor: "First visits", photo: photos.lisbonBaixa },
        { name: "Alfama", bestFor: "Old Lisbon and fado", photo: photos.lisbonAlfama },
        { name: "Belém", bestFor: "Monuments and a slower pace", photo: photos.lisbonBelemSunset },
      ],
    },
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
    essentials: {
      currency: "Euro (EUR)",
      plugs: "Types C and F, 230V",
      language: "Portuguese",
      emergency: "112",
      tipping: "Service is usually included; 5 to 10% extra is customary for good service",
      water: "Tap water is safe to drink",
    },
    faqs: [
      {
        q: "Is Sintra worth a day trip from Lisbon?",
        a: "For most first visits, yes. Trains run from Rossio station in central Lisbon, and the palaces and gardens fill a full day. Go early or on a weekday, as it gets very busy.",
      },
      {
        q: "Is Lisbon hilly?",
        a: "Very. The old neighbourhoods climb steep, cobbled streets that can be slippery. Trams, the metro and the Santa Justa lift help, and comfortable shoes matter.",
      },
      {
        q: "Do you tip in Lisbon?",
        a: "A little. Visit Portugal says service is usually included in restaurant bills, but leaving about 5 to 10% extra is customary. In taxis, round up to the nearest euro.",
      },
      {
        q: "Can you drink the tap water in Lisbon?",
        a: "Yes. EPAL, Lisbon’s water company, publishes regular test results from taps across the city showing the water meets Portugal’s drinking-water standards.",
      },
      {
        q: "Is the Cascais train running normally?",
        a: "Not entirely. CP is modernising the Cascais line, and from 8 November 2026 some trains are cut short and replacement buses cover part of the route. Check CP’s Cascais line page before you go.",
      },
    ],
    guides: ["ees-etias-uk-us-travellers", "europe-shoulder-season", "carry-on-only-checklist"],
  },
  amsterdam: {
    // Written 6 Nov 2026. Sources: Schiphol (train 14 to 17 minutes to Amsterdam
    // Central; Amsterdam Airport Express bus 397), GVB (OVpay contactless on trams,
    // metro and buses), Anne Frank House (timed tickets online only), GOV.UK
    // Netherlands (112), I amsterdam and Holland.com (tap water, tipping, Haarlem
    // and Zaanse Schans journey times, Keukenhof season).
    checked: "2026-11-06",
    timeZone: "Europe/Amsterdam",
    localTips: [
      { icon: "transport", title: "Tap in with your bank card", text: "Trams, metro and buses take a contactless card or phone: check in and check out every journey with the same card or phone. No registration or app is needed." },
      { icon: "ticket", title: "Book Anne Frank House online", text: "Tickets are sold online for a set time slot and not at the door. Buy only from the museum’s own website." },
      { icon: "safety", title: "Watch for cyclists", text: "Bike lanes run beside the pavement and cyclists move fast. Check both ways before you step across one." },
      { icon: "money", title: "Round up, don’t add a fixed tip", text: "Tipping is informal. Rounding up or leaving about 5 to 10% for good service is usual." },
      { icon: "water", title: "Drink from the tap", text: "Tap water is safe everywhere in the Netherlands, so carry a refillable bottle." },
    ],
    foods: [
      { name: "Stroopwafel", text: "Two thin waffles sandwiching caramel syrup, best warm from a market stall." },
      { name: "Bitterballen", text: "Crisp fried balls of meat ragout, served with mustard in brown cafés as a bar snack." },
      { name: "Haring", text: "Raw herring served with onions and pickles from street-side fish stands." },
      { name: "Poffertjes", text: "Small fluffy pancakes dusted with icing sugar and butter, sold at cafés and markets." },
      { name: "Patat", text: "Thick Dutch chips served in a paper cone with mayonnaise from frites shops across the centre." },
    ],
    dayTrips: [
      { name: "Haarlem", time: "About 15 minutes by train from Amsterdam Centraal", text: "A compact old town around the Grote Markt, with museums, canals and small shops.", photo: photos.amsterdamTripHaarlem },
      { name: "Zaanse Schans", time: "About 18 to 20 minutes by train from Amsterdam Centraal to Zaandijk Zaanse Schans", text: "A riverside village of traditional wooden houses and working windmills.", photo: photos.amsterdamTripZaanseSchans },
      { name: "Keukenhof", time: "Spring only, by train and bus; check Keukenhof’s own page for the route", text: "The bulb gardens in Lisse, open from March to May, are full of tulips and other spring flowers.", photo: photos.amsterdamTripKeukenhof },
    ],
    visual: {
      days: [
        { photo: photos.amsterdamPalace, stops: ["Royal Palace", "Dam Square", "Anne Frank House", "Jordaan"] },
        { photo: photos.amsterdamRijksmuseum, stops: ["Rijksmuseum", "Van Gogh Museum", "Museumplein", "Vondelpark"] },
        { photo: photos.amsterdamCanals, stops: ["A canal cruise", "The Nine Streets", "Albert Cuyp Market", "De Pijp"] },
      ],
      stay: [
        { name: "Old Centre", bestFor: "First visits", photo: photos.amsterdamPalace },
        { name: "Canal Ring", bestFor: "Canal views and quiet streets", photo: photos.amsterdamCanals },
        { name: "Museum Quarter", bestFor: "Museums and parks", photo: photos.amsterdamVondelpark },
      ],
    },
    airports: [
      {
        code: "AMS",
        name: "Schiphol",
        summary: "About 15 km south-west of the centre, with Europe’s main KLM hub and flights from across the UK and US.",
        transfers: [
          { mode: "train", name: "NS train", to: "Amsterdam Centraal", time: "14 to 17 minutes", note: "The station is directly below the terminal, with trains several times an hour." },
          { mode: "bus", name: "Amsterdam Airport Express (bus 397)", to: "Museumplein, the Rijksmuseum and Leidseplein", note: "Doesn’t stop at Centraal; the bus is handy if you’re staying near the museums." },
        ],
        officialPage: { label: "Schiphol: by train to Amsterdam", url: "https://www.schiphol.nl/en/from-to-schiphol/by-public-transport/train/" },
      },
    ],
    weather: "MMGBBBGGBGMM",
    neighbourhoods: [
      { name: "Old Centre", bestFor: "First visits", text: "The medieval core around Dam Square, the Royal Palace and Centraal station, with most of the main sights within a short walk. It is busy and noisy, and the Red Light District sits in its eastern part, so choose a hotel on a side street." },
      { name: "Canal Ring", bestFor: "Canal views and quiet streets", text: "The curve of 17th-century canals, with tall narrow houses, small shops and cafés in the Nine Streets. Calmer than the Old Centre at night, and a short walk or tram ride from everything." },
      { name: "Museum Quarter", bestFor: "Museums and parks", text: "Home of the Rijksmuseum, the Van Gogh Museum and Vondelpark, with wide leafy streets. More residential and polished than the centre, and well connected by tram." },
      { name: "Jordaan", bestFor: "Cafés and small streets", text: "A former workers’ district of narrow lanes, canalside bars and small galleries west of the Canal Ring. Close to the Anne Frank House and charming, though few hotels sit here." },
      { name: "De Pijp", bestFor: "Food and a local feel", text: "A lively area south of the centre around the Albert Cuyp Market, with cheaper restaurants and bars. It is on the North/South metro line, which is quick to the centre." },
    ],
    itinerary: [
      { title: "The Old Centre and the Jordaan", morning: "Visit the Royal Palace on Dam Square, then walk the lanes around it before the crowds arrive.", afternoon: "Go to the Anne Frank House on your booked time slot, then wander the Jordaan’s canals and galleries.", evening: "Eat in the Jordaan or at a brown café for bitterballen and a local beer." },
      { title: "Museums and Vondelpark", morning: "Spend the morning in the Rijksmuseum, which holds Rembrandt and Vermeer; book a timed ticket.", afternoon: "Visit the Van Gogh Museum on Museumplein, then relax in Vondelpark.", evening: "Have dinner near Leidseplein, a short walk from the park." },
      { title: "Canals and De Pijp", morning: "Take a canal cruise from near Centraal, or hire a boat to see the canal ring from the water.", afternoon: "Browse the Nine Streets, then take the metro to De Pijp and walk the Albert Cuyp Market.", evening: "Eat in De Pijp, where restaurants and bars cover a wide range of cuisines." },
    ],
    daysNeeded: "Two to three days covers the main sights. Add a day for Haarlem or Zaanse Schans, or for Keukenhof in spring.",
    gettingAround: "Walking and cycling cover the compact centre, with trams, buses and the metro for longer hops. Tap a contactless bank card or phone to check in and out on GVB trams, metro and buses, using the same card each time. From Schiphol, the train to Amsterdam Centraal takes 14 to 17 minutes.",
    essentials: {
      currency: "Euro (EUR)",
      plugs: "Types C and F, 230V",
      language: "Dutch (English widely spoken)",
      emergency: "112",
      tipping: "Not obligatory; round up or leave about 5 to 10% for good service",
      water: "Tap water is safe to drink",
    },
    faqs: [
      {
        q: "How do I get from Schiphol to Amsterdam city centre?",
        a: "Take the train from the station below the terminal. Schiphol says the journey to Amsterdam Centraal takes about 14 to 17 minutes. Bus 397, the Amsterdam Airport Express, runs to Museumplein, the Rijksmuseum and Leidseplein instead.",
      },
      {
        q: "Can I use my contactless bank card on Amsterdam trams and the metro?",
        a: "Yes. GVB accepts contactless debit and credit cards, phones and smartwatches. Check in and out with the same card or phone each time, as switching between them counts as an incomplete journey.",
      },
      {
        q: "Do I need to book the Anne Frank House in advance?",
        a: "Yes. Tickets are sold online for a set time slot and aren’t sold at the door. Buy only on the museum’s own website, as it warns about lookalike sites and third-party sellers.",
      },
      {
        q: "Do you tip in Amsterdam?",
        a: "It’s optional. Holland.com says a tip of about 10% is acceptable in restaurants, while other guidance suggests 5 to 10%. Rounding up is fine in cafés and taxis.",
      },
      {
        q: "Is Amsterdam tap water safe to drink?",
        a: "Yes. I amsterdam says you can drink tap water everywhere in the Netherlands. The water company can issue a boil-water notice in rare cases, so follow any local notice.",
      },
      {
        q: "Do Americans need a visa for the Netherlands?",
        a: "Not for short tourist stays: US citizens can visit the Netherlands and the rest of the Schengen area without a visa for up to 90 days in any 180-day period. Our EES and ETIAS guide explains the EU’s new border checks.",
      },
    ],
    guides: ["ees-etias-uk-us-travellers", "europe-shoulder-season", "carry-on-only-checklist"],
  },
};
