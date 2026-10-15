// Travel notes for each destination page. General, well-established facts
// only (seasons, landmarks, which airports serve a city); no prices,
// schedules or journey times. Plan item 4.5 (16 Oct 2026) added `whenToGo`,
// `flying` and `entry`. Airport-to-city transport is left out until each
// link can be checked on the airport's own site (several block automated
// checks); only Rome's Leonardo Express was confirmed (adr.it, 16 Oct 2026).
export type DestinationGuide = {
  bestTime: string;
  intro: string;
  highlights: string[];
  tip: string;
  /** A short paragraph on the seasons, beyond the one-line `bestTime`. */
  whenToGo: string;
  /** Which airports serve the city and how people usually fly there from the UK and US. */
  flying: string;
  /** Official entry requirements: GOV.UK for British travellers abroad; the UK ETA and US ESTA pages for visitors to London and New York. Checked 16 Oct 2026. */
  entry: { label: string; url: string };
};

const govUk = (country: string, slug: string) => ({
  label: `GOV.UK: ${country} entry requirements`,
  url: `https://www.gov.uk/foreign-travel-advice/${slug}/entry-requirements`,
});

export const destinationGuides: Record<string, DestinationGuide> = {
  london: {
    bestTime: "May to September for long days; December for lights and markets",
    intro: "Royal parks, free national museums and a different neighbourhood for every mood, from Borough Market to Notting Hill.",
    highlights: ["British Museum and Tate Modern (free entry)", "A walk along the South Bank from Westminster to Tower Bridge", "West End theatre, with day seats often much cheaper"],
    tip: "Heathrow, Gatwick, Stansted and Luton all serve London. Compare all of them: a cheaper fare into a smaller airport can outweigh the train fare into town.",
    whenToGo:
      "London is a year-round city. Late spring and summer bring long evenings, open-air theatre and the parks at their best, but also the most visitors. Autumn is quieter and often mild, and December is busy with Christmas lights and markets. Rain is possible in any month, so pack a light waterproof whatever the season.",
    flying:
      "London has six main airports: Heathrow and Gatwick handle most long-haul flights, while Stansted, Luton, London City and Southend serve mainly European routes. From the US there are nonstop flights to Heathrow and Gatwick from many cities. When you compare fares, add the cost and time of getting into town from each airport.",
    entry: { label: "GOV.UK: Electronic travel authorisation (ETA) for visitors to the UK", url: "https://www.gov.uk/eta" },
  },
  paris: {
    bestTime: "April to June and September to October",
    intro: "Cafés, boulevards and some of the world's great museums, all within a very walkable city.",
    highlights: ["The Louvre and Musée d’Orsay", "Montmartre and Sacré-Cœur at sunrise", "An evening walk along the Seine"],
    tip: "Most international flights land at Charles de Gaulle; Orly is closer to the city and sometimes cheaper for European routes.",
    whenToGo:
      "Spring and early autumn are the classic times for Paris: mild days, gardens in bloom or turning gold, and terraces full in the evening. July and August are warm and busy with visitors, and some smaller restaurants close for a summer break in August. Winter is cold and grey but quieter, with shorter queues at the big museums.",
    flying:
      "Charles de Gaulle is the main airport for flights from the US and long-haul routes, and also has many flights from the UK. Orly, south of the city, mainly serves European and French routes. Beauvais, used by some budget airlines, is much further from Paris, so allow for the longer journey. From London, the Eurostar train is worth comparing with a flight.",
    entry: govUk("France", "france"),
  },
  rome: {
    bestTime: "April to early June and late September to October",
    intro: "Ancient ruins, Renaissance art and long dinners in Trastevere.",
    highlights: ["The Colosseum and Roman Forum", "Vatican Museums and St Peter’s Basilica", "Piazza Navona and the Pantheon after dark"],
    tip: "Book Colosseum and Vatican entry slots in advance; summer queues are long.",
    whenToGo:
      "Rome is at its most comfortable in spring and autumn, when you can walk between the ancient sites without the heat of midsummer. July and August are hot, and many Romans leave the city in August. Easter brings large crowds to the Vatican, so book early if you plan to visit then. Winter is mild compared with northern Europe, and quieter.",
    flying:
      "Fiumicino (Leonardo da Vinci) is Rome’s main airport and handles flights from the US and most of Europe; the Leonardo Express train runs from there to Roma Termini. Ciampino, closer to the city, is used mainly by budget airlines on European routes. From the US, compare a nonstop flight with a one-stop route through another European hub.",
    entry: govUk("Italy", "italy"),
  },
  barcelona: {
    bestTime: "May to June and September",
    intro: "Gaudí’s architecture, a city beach and late, lively evenings.",
    highlights: ["Sagrada Família and Park Güell", "The Gothic Quarter and El Born", "Barceloneta beach"],
    tip: "Dinner starts late here; restaurants often fill up after 9pm.",
    whenToGo:
      "Late spring and September give you beach weather without the peak crowds of July and August, when the city is hot and very busy. The sea is warmest in late summer and early autumn. Winter is mild and sunny on many days, which suits sightseeing, though it’s too cool for the beach for most people.",
    flying:
      "Barcelona–El Prat is the city’s airport, with flights from across Europe and nonstop routes from several US cities. Some budget airlines fly to Girona or Reus instead, which are much further from Barcelona, so check which airport a cheap fare uses and add the cost of getting into the city.",
    entry: govUk("Spain", "spain"),
  },
  lisbon: {
    bestTime: "March to June and September to October",
    intro: "Hills, tiled façades and viewpoints over the Tagus, with Sintra and the coast close by.",
    highlights: ["Alfama and the Castelo de São Jorge", "Belém and its famous custard tarts", "A day trip to Sintra"],
    tip: "Wear comfortable shoes; the cobbled hills are steep and can be slippery.",
    whenToGo:
      "Lisbon has one of the mildest climates of any European capital, so spring and autumn are warm enough for terraces and beach days nearby. Midsummer is hot and busy, and June is festival month, when the city’s saints’ days fill the old neighbourhoods with music and grilled sardines. Winter is mild but can be wet.",
    flying:
      "Lisbon’s airport (Humberto Delgado) is unusually close to the city centre. There are frequent flights from UK airports and nonstop routes from several US cities. Lisbon is also a hub for flights onward to Brazil and Africa, so it can make a good stopover.",
    entry: govUk("Portugal", "portugal"),
  },
  tokyo: {
    bestTime: "Late March to April for blossom; October to November for autumn colour",
    intro: "A huge, orderly city of neon districts, quiet shrines and outstanding food at every price.",
    highlights: ["Shibuya Crossing and Harajuku", "Senso-ji temple in Asakusa", "Day trips to Nikko or Hakone"],
    tip: "Haneda is much closer to central Tokyo than Narita, so it can be worth a slightly higher fare.",
    whenToGo:
      "Spring blossom and autumn colour are the most popular times to visit, and flights and hotels fill early for both. Summer is hot and humid, with a rainy season in early summer and typhoons possible later. Winter is cold but often clear and dry, and a good time for views of Mount Fuji. Japanese holidays such as Golden Week, around the start of May, are very busy.",
    flying:
      "Tokyo has two international airports. Haneda is closer to the centre; Narita is further out and is used by many airlines, including some lower-cost ones. There are nonstop flights from London and from many US cities. If a Narita fare is much cheaper, weigh the saving against the longer trip into town.",
    entry: govUk("Japan", "japan"),
  },
  bali: {
    bestTime: "April to October (dry season)",
    intro: "Rice terraces, temples and surf beaches, with Ubud as the cultural heart.",
    highlights: ["Ubud and the Tegallalang rice terraces", "Temples such as Ulun Danu Bratan and Uluwatu", "Sunset on the west-coast beaches"],
    tip: "Traffic around the south can be slow; plan fewer stops per day than you think.",
    whenToGo:
      "The dry season, roughly April to October, brings the most sunshine and is the busiest time, especially in July and August. The wet season usually means heavy showers rather than all-day rain, and the island is greener and quieter. Balinese ceremonies happen all year; Nyepi, the Day of Silence, closes the island, including the airport, for a day each year, so check the date if you travel in March or April.",
    flying:
      "Bali’s airport, Ngurah Rai (Denpasar), is in the south of the island. There are no nonstop flights from the UK or US, so you’ll connect through a hub such as Singapore, Doha, Dubai, Kuala Lumpur or an Australian city. A night’s stopover can break up the journey.",
    entry: govUk("Indonesia", "indonesia"),
  },
  singapore: {
    bestTime: "Year-round; February to April is often a little drier",
    intro: "Hawker food, gardens and easy connections across Southeast Asia.",
    highlights: ["Gardens by the Bay", "Hawker centres such as Maxwell and Lau Pa Sat", "Marina Bay at night"],
    tip: "Changi is a popular stopover; a night or two here can break up a long journey to Australia or Asia.",
    whenToGo:
      "Singapore is hot and humid all year, with short, heavy showers that pass quickly. The wettest months are usually around the end of the year. Big events such as Chinese New Year and the Formula 1 night race push hotel prices up, so check dates before you book if you want a quieter trip.",
    flying:
      "Changi Airport is Singapore’s only major airport and one of the main hubs in Asia. There are nonstop flights from London and from several US cities, and many more one-stop routes through Europe, the Middle East and East Asia. From Changi, short flights reach most of Southeast Asia.",
    entry: govUk("Singapore", "singapore"),
  },
  bangkok: {
    bestTime: "November to February (cooler and drier)",
    intro: "Golden temples, river boats and some of the best street food anywhere.",
    highlights: ["The Grand Palace and Wat Pho", "Wat Arun from the Chao Phraya river", "Chinatown’s street food at night"],
    tip: "Cover shoulders and knees when visiting temples.",
    whenToGo:
      "The cool, dry season from November to February is the most comfortable and the busiest. March to May is the hottest time of year, and the rainy season follows, usually with heavy afternoon storms rather than all-day rain. Songkran, the Thai New Year in April, is celebrated with city-wide water fights.",
    flying:
      "Bangkok has two airports. Suvarnabhumi handles most long-haul flights; Don Mueang is used mainly by low-cost airlines on routes around Asia. There are nonstop flights from London; from the US, most routes connect in Asia, the Middle East or Europe. If you’re connecting onward on a separate ticket, check which airport each flight uses.",
    entry: govUk("Thailand", "thailand"),
  },
  sydney: {
    bestTime: "September to November and March to May",
    intro: "Harbour ferries, coastal walks and beaches minutes from the city.",
    highlights: ["Sydney Opera House and the Harbour Bridge", "The Bondi to Coogee coastal walk", "A ferry to Manly"],
    tip: "Flights from the US and UK are long; a stopover in Asia or the Pacific can make the journey easier.",
    whenToGo:
      "Seasons are the reverse of the UK and US. Spring and autumn are warm and settled, ideal for the coastal walks. Summer, from December to February, is beach season and the busiest time, with New Year’s Eve fireworks over the harbour. Winter is mild and sunny on many days, and fares from the northern hemisphere can be lower.",
    flying:
      "Sydney Kingsford Smith is the main airport. From the US, there are nonstop flights from the West Coast and some other cities. From the UK, every route has at least one stop, usually in Asia or the Middle East; breaking the journey for a night or two helps with jet lag.",
    entry: govUk("Australia", "australia"),
  },
  dubai: {
    bestTime: "November to March",
    intro: "Skyscrapers, desert landscapes and souks, and a major hub for onward connections.",
    highlights: ["Burj Khalifa and Dubai Mall", "The Gold and Spice Souks in Deira", "A desert evening"],
    tip: "Summer is extremely hot; outdoor plans work best early in the morning or after sunset.",
    whenToGo:
      "Winter is the best time for beaches, desert trips and eating outdoors, and the busiest. From around May to September the heat is intense, so days are spent indoors and in the shade, though hotel prices can drop. During Ramadan, the dates of which change each year, restaurants stay open for visitors but the pace of the city changes.",
    flying:
      "Dubai International is one of the world’s busiest airports for international passengers and the main hub for Emirates. There are many nonstop flights from UK airports and from US cities. Dubai World Central (Al Maktoum) also has some flights, so check which airport your ticket uses.",
    entry: govUk("United Arab Emirates", "united-arab-emirates"),
  },
  istanbul: {
    bestTime: "April to May and September to November",
    intro: "Two continents, one city: mosques, bazaars and ferries across the Bosphorus.",
    highlights: ["Hagia Sophia and the Blue Mosque", "The Grand Bazaar", "A Bosphorus ferry ride"],
    tip: "Istanbul Airport is a major hub, so many one-stop routes to Asia and Africa connect here.",
    whenToGo:
      "Spring and autumn are the best seasons for walking the old city and riding the ferries. Summer is hot and busy, and winter is cool and damp, with occasional snow, but quieter. Tulips fill the parks in April. If you visit a mosque, dress modestly; women should bring a scarf to cover their hair.",
    flying:
      "Istanbul Airport, on the European side, is the main hub for Turkish Airlines, with flights from many UK airports and nonstop routes from several US cities. Sabiha Gökçen, on the Asian side, is used mainly by Pegasus and other lower-cost airlines. The two are a long way apart, so check which one your flight uses before booking a hotel.",
    entry: govUk("Türkiye", "turkey"),
  },
  cairo: {
    bestTime: "October to April",
    intro: "The pyramids of Giza, the Egyptian Museum and the Nile.",
    highlights: ["The pyramids and Sphinx at Giza", "Islamic Cairo and Khan el-Khalili", "A felucca on the Nile"],
    tip: "Visit Giza early in the day to avoid the heat and the largest crowds.",
    whenToGo:
      "The cooler months from October to April are the most comfortable for sightseeing, with warm days and cool evenings. Summer is very hot, so visits to Giza are best in the early morning. During Ramadan, whose dates change each year, opening hours can be shorter.",
    flying:
      "Cairo International is the main airport and the hub for EgyptAir. There are nonstop flights from London and from New York, and many one-stop routes through Europe and the Middle East. Cairo is also the usual starting point for trips to Luxor, Aswan and the Red Sea.",
    entry: govUk("Egypt", "egypt"),
  },
  "cape-town": {
    bestTime: "November to March (summer)",
    intro: "Table Mountain, beaches and winelands within an hour’s drive.",
    highlights: ["Table Mountain by cable car or on foot", "Boulders Beach penguins", "Stellenbosch and Franschhoek wine country"],
    tip: "Wind can close the Table Mountain cable car; keep a flexible day in your plan.",
    whenToGo:
      "Summer, from November to March, is warm and dry, and the busiest season, especially over Christmas and New Year. Winter, from June to August, is cooler and wetter but greener and quieter. Spring brings wild flowers to the West Coast, and whale-watching season along the coast runs through the cooler months.",
    flying:
      "Cape Town International is the city’s airport. There are nonstop flights from London on some airlines; from the US, most routes connect through Johannesburg, Europe or the Middle East. South Africa is only one or two hours ahead of the UK, depending on the time of year, so there’s little jet lag from Europe.",
    entry: govUk("South Africa", "south-africa"),
  },
  delhi: {
    bestTime: "October to March",
    intro: "India’s capital and the start of the Golden Triangle with Agra and Jaipur.",
    highlights: ["Old Delhi and the Red Fort", "Humayun’s Tomb", "A trip to the Taj Mahal in Agra"],
    tip: "The Taj Mahal is closed on Fridays.",
    whenToGo:
      "The cooler, drier months from October to March are the most comfortable, though winter mornings can be foggy and air quality is often poor in late autumn and winter. April to June is very hot, and the monsoon usually arrives in late June or July. Diwali, in October or November, is a beautiful time to visit but flights fill up early.",
    flying:
      "Indira Gandhi International is Delhi’s airport and a hub for Air India. There are nonstop flights from London and from several US cities, plus many one-stop routes through the Middle East and Europe. Delhi is also the easiest starting point for Agra, Jaipur and northern India.",
    entry: govUk("India", "india"),
  },
  cancun: {
    bestTime: "December to April",
    intro: "Caribbean beaches, cenotes and Mayan sites within a day trip.",
    highlights: ["The beaches of the Hotel Zone", "Swimming in cenotes", "Chichén Itzá or Tulum"],
    tip: "June to November is hurricane season; travel insurance is worth considering.",
    whenToGo:
      "Winter and spring are dry and sunny, and the most popular months, with US spring break bringing crowds in March. Summer is hot and humid, with more rain. Hurricane season runs from June to November, with the highest risk usually later in the season. Seaweed on the beaches varies from year to year and can be heavier in the warmer months.",
    flying:
      "Cancún International is one of the busiest airports in Mexico, with nonstop flights from many US cities. From the UK, there are nonstop flights on some airlines, often seasonal, and one-stop routes through the US. Tulum also has its own airport, which may suit trips further down the coast.",
    entry: govUk("Mexico", "mexico"),
  },
  "rio-de-janeiro": {
    bestTime: "December to March for summer; April to June for milder weather",
    intro: "Beaches, mountains and samba, with views from Sugarloaf and Corcovado.",
    highlights: ["Christ the Redeemer", "Sugarloaf Mountain", "Copacabana and Ipanema beaches"],
    tip: "Carnival dates sell out early and fares rise sharply; book well ahead or avoid those weeks.",
    whenToGo:
      "Summer, from December to March, is hot, humid and lively, with Carnival in February or early March and New Year’s Eve on Copacabana. Autumn and winter, from April to September, are milder and drier, good for hiking and clearer views from the mountains. Seasons are the reverse of the UK and US.",
    flying:
      "Rio’s main international airport is Galeão (Antônio Carlos Jobim). Santos Dumont, right by the city centre, handles domestic flights. There are nonstop flights from London and from some US cities, and many routes connect through São Paulo, Lisbon or a US hub.",
    entry: govUk("Brazil", "brazil"),
  },
  "mexico-city": {
    bestTime: "March to May",
    intro: "Museums, murals and one of the world’s great food cities.",
    highlights: ["Museo Nacional de Antropología", "The historic centre and Palacio de Bellas Artes", "Teotihuacan’s pyramids"],
    tip: "The city sits at over 2,200 metres; take it easy on your first day.",
    whenToGo:
      "Spring is warm and dry, the most popular time to visit. The rainy season, from around June to October, usually brings afternoon storms after sunny mornings. Late October and early November are busy around the Day of the Dead. Winter days are mild and sunny, but nights are cold at this altitude.",
    flying:
      "Benito Juárez International is the main airport and the hub for Aeroméxico, with nonstop flights from many US cities and from London. Felipe Ángeles International, north of the city, handles some domestic and international flights, so check which airport your ticket uses.",
    entry: govUk("Mexico", "mexico"),
  },
  cusco: {
    bestTime: "May to September (dry season)",
    intro: "The former Inca capital and the gateway to Machu Picchu and the Sacred Valley.",
    highlights: ["Machu Picchu", "The Sacred Valley", "Cusco’s historic centre"],
    tip: "Most international routes connect through Lima. Allow time to adjust to the altitude.",
    whenToGo:
      "The dry season, from May to September, has clear days and cold nights, and is the busiest time at Machu Picchu. The wet season, from November to March, brings afternoon rain and fewer visitors; the Inca Trail closes every February for maintenance. Inti Raymi, the festival of the sun in late June, fills the city.",
    flying:
      "Cusco’s airport is close to the city centre. There are no nonstop flights from the UK or US; most travellers connect in Lima, which has flights from London, several US cities and the rest of the Americas. Cusco sits at a high altitude, so plan an easy first day before heading to Machu Picchu.",
    entry: govUk("Peru", "peru"),
  },
  "new-york": {
    bestTime: "April to June and September to November",
    intro: "Five boroughs of museums, parks, food and skyline views.",
    highlights: ["Central Park and the Met", "A walk across the Brooklyn Bridge", "The High Line and Chelsea Market"],
    tip: "JFK, Newark and LaGuardia all serve New York; compare all three for the best fare.",
    whenToGo:
      "Spring and autumn are the most comfortable seasons for walking the city, with autumn colour in Central Park in October and November. Summer is hot and humid, and winter is cold, sometimes with snow, but December brings holiday windows and the tree at Rockefeller Center. Thanksgiving and Christmas weeks are busy and expensive.",
    flying:
      "New York has three main airports. JFK and Newark, in New Jersey, handle most international flights, with nonstop routes from London and several other UK airports. LaGuardia mainly serves flights within the US and to Canada. Compare all three, and add the cost of getting into Manhattan from each.",
    entry: { label: "U.S. Customs and Border Protection: ESTA for Visa Waiver Program travellers", url: "https://www.cbp.gov/travel/international-visitors/esta" },
  },
};

/** Shown under each destination's entry link. */
export const entryNote = "Rules change, so check them again shortly before you travel.";
/** Added for destinations outside the UK and US, where the link is GOV.UK's advice for British travellers. */
export const usPassportNote = "Travelling on a US passport? The State Department’s country pages at travel.state.gov list the entry requirements for US citizens.";
