import { guidesDPhotos } from "../photos/guides-d";
import type { Guide } from "./types";

// Batch 22, Agent D, guide 3 (docs/BATCH-22-BRIEF.md). Primary keyword: "best
// time to visit Southeast Asia". Season definitions from the Thai government
// (Thailand's three seasons) and Singapore's National Environment Agency
// (monsoon periods); entry rules from GOV.UK; all found with WebSearch on 5 Nov
// 2026. The Bali and Vietnam patterns and the region table are our own summary
// of the general pattern, labelled as such, with no temperatures or rainfall
// figures we couldn't source.
export const bestTimeToVisitSoutheastAsia: Guide = {
  slug: "best-time-to-visit-southeast-asia",
  title: "The best time to visit Southeast Asia: a country-by-country guide",
  seoTitle: "Best time to visit Southeast Asia, country by country",
  excerpt:
    "When to go to Thailand, Vietnam, Bali and Singapore: dry seasons, monsoons and the months that suit each region, plus the entry rules for UK visitors.",
  topic: "seasons",
  published: "2026-11-05",
  photo: guidesDPhotos.guideSoutheastAsia,
  summary: [
    "For mainland Southeast Asia, November to February is usually the best time: Thailand’s cool season runs from mid-October to mid-February.",
    "Bali and much of Indonesia work the other way round: the dry season is roughly April to October, the wet season roughly November to March.",
    "Vietnam is long and thin, so the north, the central coast and the south each have a different best season.",
    "Singapore is warm and humid all year, with rain in every season; the monsoons change the pattern rather than stop travel.",
    "Rainy seasons bring short, heavy downpours more often than all-day rain, and lower prices; our advice is not to rule them out.",
  ],
  sections: [
    {
      heading: "The short answer",
      paragraphs: [
        "There isn’t one best month for the whole region, because Southeast Asia sits on both sides of the equator and the monsoons reach each country at different times. As a rule of thumb, November to February suits Thailand, Cambodia, Laos and most of Vietnam, when the air is drier and cooler. April to October suits Bali and the islands south of the equator.",
        "If you want one trip that takes in several countries, the months from December to February are the safest bet for the mainland. Pair it with Singapore, which you can visit at any time of year.",
      ],
    },
    {
      heading: "Region by region",
      paragraphs: [
        "This table is our summary of the general pattern, drawn from the official season definitions below where they exist. Local weather varies from year to year, so check a forecast before you travel.",
      ],
      table: {
        caption: "Usually the best and wettest months across Southeast Asia (Wallet Flights’ summary)",
        head: ["Where", "Usually best", "Wettest period", "Notes"],
        rows: [
          ["Thailand: Bangkok, north and Andaman coast", "Mid-October to mid-February", "Mid-May to mid-October", "Hot season from mid-February to mid-May"],
          ["Thailand: Gulf islands (Koh Samui area)", "Roughly January to August", "Roughly October to December", "Different pattern from the Andaman side"],
          ["Vietnam: north (Hanoi, Ha Long Bay)", "Roughly October to April", "Roughly May to September", "Winters can be cool and grey"],
          ["Vietnam: central coast (Hoi An, Da Nang)", "Roughly February to May", "Roughly September to December", "Autumn storms are possible"],
          ["Vietnam: south (Ho Chi Minh City)", "Roughly December to April", "Roughly May to November", "Hot all year"],
          ["Bali and Indonesia south of the equator", "Roughly April to October", "Roughly November to March", "July and August are busiest"],
          ["Singapore", "Any time", "Northeast monsoon, roughly December to early March", "Warm and humid all year"],
        ],
      },
    },
    {
      heading: "Thailand: the three seasons",
      paragraphs: [
        "The Thai government describes three seasons. Winter, or the cool season, runs from mid-October to mid-February, when the northeast monsoon brings drier, cooler air. Summer, the hot season, runs from mid-February to mid-May. The rainy season runs from mid-May to mid-October. The exact start of the cool season changes from year to year, and the Thai Meteorological Department announces it once conditions are met.",
        "That makes November to February the busiest and often most expensive time in [Bangkok](/destinations/bangkok), Chiang Mai and the Andaman coast around Phuket and Krabi. The hot season suits travellers who don’t mind the heat and want fewer crowds. In the rainy season, mornings are often clear and storms come later in the day, and prices tend to drop.",
      ],
      tip: "Visiting Thailand in the rainy season? Our advice: plan sightseeing for the morning, keep afternoons flexible and choose places to stay near the sights, so a downpour costs you an hour, not a day.",
    },
    {
      heading: "Vietnam: three climates in one country",
      paragraphs: [
        "Vietnam stretches more than a thousand miles from north to south, and its weather does too. In our experience, the north around Hanoi and Ha Long Bay is best from autumn to spring, though winter days can be cool and misty. The central coast around Hoi An and Da Nang is usually driest from early spring into summer, and its wettest months come in autumn. The south, around Ho Chi Minh City and the Mekong Delta, is hot all year, with a dry season over the winter months.",
        "If you’re travelling the length of the country, spring is often the best compromise, and the dates of Tết, the Lunar New Year, are worth checking: transport and hotels fill up and many businesses close for several days.",
      ],
    },
    {
      heading: "Bali, Indonesia and Singapore",
      paragraphs: [
        "[Bali](/destinations/bali) lies south of the equator, so its seasons are the reverse of Thailand’s. The dry season runs roughly from April to October, with clear skies and calmer seas, and July and August are the busiest months. The wet season runs roughly from November to March, with humid days and heavy showers, especially from December to February. It’s quieter and cheaper, and the island is green and lush.",
        "[Singapore](/destinations/singapore) is hot and humid all year. Singapore’s National Environment Agency describes two monsoon seasons: the northeast monsoon from about December to early March and the southwest monsoon from about June to September, separated by inter-monsoon periods in April to May and October to November. Expect showers and thunderstorms in any month; most of the city’s sights are linked by air-conditioned transport.",
      ],
      tip: "Flying from the UK or US to Bali? It’s often a long connection, so a night in Singapore or Bangkok on the way can break up the journey. Our [stopover guide](/travel-guides/stopover-vs-layover) explains how stopovers work.",
    },
    {
      heading: "Entry rules for UK visitors",
      paragraphs: [
        "Rules in the region change often, so check GOV.UK’s foreign travel advice for each country before you book. As of November 2026, GOV.UK says:",
      ],
      list: [
        "Thailand: from 15 September 2026, visa-exempt entry allows stays of up to 30 days for tourism. Everyone must complete the online Thailand Digital Arrival Card before arriving, and you may be asked for proof of funds and an onward ticket",
        "Vietnam: British passport holders can enter without a visa for up to 45 days; longer stays need an e-visa",
        "Indonesia: a 30-day visa on arrival is available, or you can apply online before you travel. Bali charges foreign tourists a separate tourist levy",
        "Singapore: no visa is needed for a visit, but you must complete the electronic SG Arrival Card in the three days before you arrive",
      ],
    },
    {
      heading: "Booking your flights",
      paragraphs: [
        "Fares to Southeast Asia from the UK tend to rise for Christmas, New Year and the February half-term, and the peak winter season fills up early. Our guide to [when to book international flights](/travel-guides/when-to-book-international-flights) explains how far ahead to look, and our [jet lag tips](/travel-guides/jet-lag-tips) help with the time difference.",
        "Our route pages show flight times and, when we have them, recent fares: try [London to Bangkok](/routes/london-to-bangkok), [Manchester to Bangkok](/routes/manchester-to-bangkok), [London to Singapore](/routes/london-to-singapore), [London to Bali](/routes/london-to-bali), [New York to Bangkok](/routes/new-york-to-bangkok) and [Los Angeles to Bali](/routes/los-angeles-to-bali).",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the best month to visit Southeast Asia?",
      a: "For Thailand, Vietnam, Cambodia and Laos, November to February is usually best. For Bali and southern Indonesia, the dry season from roughly April to October is better. Singapore suits any month.",
    },
    {
      q: "When is the rainy season in Thailand?",
      a: "The Thai government describes the rainy season as mid-May to mid-October. The Gulf islands around Koh Samui follow a different pattern, with their wettest weather later in the year.",
    },
    {
      q: "Is it worth visiting Southeast Asia in the rainy season?",
      a: "Often, yes. Rain usually comes in short, heavy storms rather than all day, and prices and crowds are lower. Plan sightseeing for mornings and keep afternoons flexible.",
    },
    {
      q: "When is the best time to visit Bali?",
      a: "The dry season, roughly April to October, has the most reliable weather, with July and August the busiest months. The wet season, roughly November to March, is quieter and cheaper.",
    },
    {
      q: "Do UK citizens need a visa for Thailand?",
      a: "Not for a short holiday. GOV.UK says that from 15 September 2026, visa-exempt entry allows stays of up to 30 days for tourism, and every visitor must complete the Thailand Digital Arrival Card before arriving.",
    },
  ],
  keywords: [
    "best time to visit southeast asia",
    "best time to visit thailand",
    "best time to visit vietnam",
    "best time to visit bali",
    "southeast asia rainy season",
    "thailand cool season",
    "singapore monsoon season",
    "when to go to southeast asia",
  ],
  // Found with WebSearch on 5 Nov 2026.
  sources: [
    { label: "Thai Government: The Seasons of Thailand", url: "https://thailand.go.th/issue-focus-detail/009_142" },
    { label: "National Environment Agency (Singapore): Northeast monsoon advisory", url: "https://www.nea.gov.sg/media/news/advisories/index/onset-of-northeast-monsoon-conditions-around-end-november-2025" },
    { label: "GOV.UK: Thailand entry requirements", url: "https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements" },
    { label: "GOV.UK: Vietnam entry requirements", url: "https://www.gov.uk/foreign-travel-advice/vietnam/entry-requirements" },
    { label: "GOV.UK: Indonesia entry requirements", url: "https://www.gov.uk/foreign-travel-advice/indonesia/entry-requirements" },
    { label: "GOV.UK: Singapore entry requirements", url: "https://www.gov.uk/foreign-travel-advice/singapore/entry-requirements" },
  ],
};
