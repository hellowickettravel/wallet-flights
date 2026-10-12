// Short travel notes for each destination page. General, well-established
// facts only (seasons, landmarks); no prices or schedules.
export type DestinationGuide = {
  bestTime: string;
  intro: string;
  highlights: string[];
  tip: string;
};

export const destinationGuides: Record<string, DestinationGuide> = {
  london: {
    bestTime: "May to September for long days; December for lights and markets",
    intro: "Royal parks, free national museums and a different neighbourhood for every mood, from Borough Market to Notting Hill.",
    highlights: ["British Museum and Tate Modern (free entry)", "A walk along the South Bank from Westminster to Tower Bridge", "West End theatre, with day seats often much cheaper"],
    tip: "Heathrow, Gatwick, Stansted and Luton all serve London. Compare all of them: a cheaper fare into a smaller airport can outweigh the train fare into town.",
  },
  paris: {
    bestTime: "April to June and September to October",
    intro: "Cafés, boulevards and some of the world's great museums, all within a very walkable city.",
    highlights: ["The Louvre and Musée d’Orsay", "Montmartre and Sacré-Cœur at sunrise", "An evening walk along the Seine"],
    tip: "Most international flights land at Charles de Gaulle; Orly is closer to the city and sometimes cheaper for European routes.",
  },
  rome: {
    bestTime: "April to early June and late September to October",
    intro: "Ancient ruins, Renaissance art and long dinners in Trastevere.",
    highlights: ["The Colosseum and Roman Forum", "Vatican Museums and St Peter’s Basilica", "Piazza Navona and the Pantheon after dark"],
    tip: "Book Colosseum and Vatican entry slots in advance; summer queues are long.",
  },
  barcelona: {
    bestTime: "May to June and September",
    intro: "Gaudí’s architecture, a city beach and late, lively evenings.",
    highlights: ["Sagrada Família and Park Güell", "The Gothic Quarter and El Born", "Barceloneta beach"],
    tip: "Dinner starts late here; restaurants often fill up after 9pm.",
  },
  lisbon: {
    bestTime: "March to June and September to October",
    intro: "Hills, tiled façades and viewpoints over the Tagus, with Sintra and the coast close by.",
    highlights: ["Alfama and the Castelo de São Jorge", "Belém and its famous custard tarts", "A day trip to Sintra"],
    tip: "Wear comfortable shoes; the cobbled hills are steep and can be slippery.",
  },
  tokyo: {
    bestTime: "Late March to April for blossom; October to November for autumn colour",
    intro: "A huge, orderly city of neon districts, quiet shrines and outstanding food at every price.",
    highlights: ["Shibuya Crossing and Harajuku", "Senso-ji temple in Asakusa", "Day trips to Nikko or Hakone"],
    tip: "Haneda is much closer to central Tokyo than Narita, so it can be worth a slightly higher fare.",
  },
  bali: {
    bestTime: "April to October (dry season)",
    intro: "Rice terraces, temples and surf beaches, with Ubud as the cultural heart.",
    highlights: ["Ubud and the Tegallalang rice terraces", "Temples such as Ulun Danu Bratan and Uluwatu", "Sunset on the west-coast beaches"],
    tip: "Traffic around the south can be slow; plan fewer stops per day than you think.",
  },
  singapore: {
    bestTime: "Year-round; February to April is often a little drier",
    intro: "Hawker food, gardens and easy connections across Southeast Asia.",
    highlights: ["Gardens by the Bay", "Hawker centres such as Maxwell and Lau Pa Sat", "Marina Bay at night"],
    tip: "Changi is a popular stopover; a night or two here can break up a long journey to Australia or Asia.",
  },
  bangkok: {
    bestTime: "November to February (cooler and drier)",
    intro: "Golden temples, river boats and some of the best street food anywhere.",
    highlights: ["The Grand Palace and Wat Pho", "Wat Arun from the Chao Phraya river", "Chinatown’s street food at night"],
    tip: "Cover shoulders and knees when visiting temples.",
  },
  sydney: {
    bestTime: "September to November and March to May",
    intro: "Harbour ferries, coastal walks and beaches minutes from the city.",
    highlights: ["Sydney Opera House and the Harbour Bridge", "The Bondi to Coogee coastal walk", "A ferry to Manly"],
    tip: "Flights from the US and UK are long; a stopover in Asia or the Pacific can make the journey easier.",
  },
  dubai: {
    bestTime: "November to March",
    intro: "Skyscrapers, desert landscapes and souks, and a major hub for onward connections.",
    highlights: ["Burj Khalifa and Dubai Mall", "The Gold and Spice Souks in Deira", "A desert evening"],
    tip: "Summer is extremely hot; outdoor plans work best early in the morning or after sunset.",
  },
  istanbul: {
    bestTime: "April to May and September to November",
    intro: "Two continents, one city: mosques, bazaars and ferries across the Bosphorus.",
    highlights: ["Hagia Sophia and the Blue Mosque", "The Grand Bazaar", "A Bosphorus ferry ride"],
    tip: "Istanbul Airport is a major hub, so many one-stop routes to Asia and Africa connect here.",
  },
  cairo: {
    bestTime: "October to April",
    intro: "The pyramids of Giza, the Egyptian Museum and the Nile.",
    highlights: ["The pyramids and Sphinx at Giza", "Islamic Cairo and Khan el-Khalili", "A felucca on the Nile"],
    tip: "Visit Giza early in the day to avoid the heat and the largest crowds.",
  },
  "cape-town": {
    bestTime: "November to March (summer)",
    intro: "Table Mountain, beaches and winelands within an hour’s drive.",
    highlights: ["Table Mountain by cable car or on foot", "Boulders Beach penguins", "Stellenbosch and Franschhoek wine country"],
    tip: "Wind can close the Table Mountain cable car; keep a flexible day in your plan.",
  },
  delhi: {
    bestTime: "October to March",
    intro: "India’s capital and the start of the Golden Triangle with Agra and Jaipur.",
    highlights: ["Old Delhi and the Red Fort", "Humayun’s Tomb", "A trip to the Taj Mahal in Agra"],
    tip: "The Taj Mahal is closed on Fridays.",
  },
  cancun: {
    bestTime: "December to April",
    intro: "Caribbean beaches, cenotes and Mayan sites within a day trip.",
    highlights: ["The beaches of the Hotel Zone", "Swimming in cenotes", "Chichén Itzá or Tulum"],
    tip: "June to November is hurricane season; travel insurance is worth considering.",
  },
  "rio-de-janeiro": {
    bestTime: "December to March for summer; April to June for milder weather",
    intro: "Beaches, mountains and samba, with views from Sugarloaf and Corcovado.",
    highlights: ["Christ the Redeemer", "Sugarloaf Mountain", "Copacabana and Ipanema beaches"],
    tip: "Carnival dates sell out early and fares rise sharply; book well ahead or avoid those weeks.",
  },
  "mexico-city": {
    bestTime: "March to May",
    intro: "Museums, murals and one of the world’s great food cities.",
    highlights: ["Museo Nacional de Antropología", "The historic centre and Palacio de Bellas Artes", "Teotihuacan’s pyramids"],
    tip: "The city sits at over 2,200 metres; take it easy on your first day.",
  },
  cusco: {
    bestTime: "May to September (dry season)",
    intro: "The former Inca capital and the gateway to Machu Picchu and the Sacred Valley.",
    highlights: ["Machu Picchu", "The Sacred Valley", "Cusco’s historic centre"],
    tip: "Most international routes connect through Lima. Allow time to adjust to the altitude.",
  },
  "new-york": {
    bestTime: "April to June and September to November",
    intro: "Five boroughs of museums, parks, food and skyline views.",
    highlights: ["Central Park and the Met", "A walk across the Brooklyn Bridge", "The High Line and Chelsea Market"],
    tip: "JFK, Newark and LaGuardia all serve New York; compare all three for the best fare.",
  },
};
