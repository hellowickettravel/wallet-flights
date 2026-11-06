import { guidesGPhotos } from "../photos/guides-g";
import type { Guide } from "./types";

// Batch G (6 Nov 2026). Primary keyword: "do I need a visa". Sourcing notes:
// GOV.UK foreign travel advice pages and travel.state.gov country pages were
// found through search on 6 Nov 2026 (the sites could not be opened directly
// from the build sandbox, so only statements that the search extracts showed
// are used: the page structure, and the passport rules quoted for the UK,
// Thailand and the Schengen area on travel.state.gov). No per-country table:
// destination entry rules live on each destination page, where they were
// sourced separately, so this guide links to those pages and states no
// country rule of its own. Our own advice is labelled as such.
export const doINeedAVisaUkUsPassports: Guide = {
  slug: "do-i-need-a-visa-uk-us-passports",
  title: "Do I need a visa? How to check entry rules with a UK or US passport",
  seoTitle: "Do I need a visa? UK and US passport entry checks",
  excerpt:
    "How UK and US passport holders check whether they need a visa, e-visa or travel authorisation: which official page to use and the order to check.",
  topic: "documents",
  published: "2026-11-06",
  photo: guidesGPhotos.guideVisaCheck,
  summary: [
    "Use your own government’s page for your destination: GOV.UK foreign travel advice if you hold a UK passport, travel.state.gov if you hold a US one.",
    "Read the entry requirements section, not a forum or a booking site. It sets out visas, passport validity and any online authorisation.",
    "Check passport validity first. It is a separate rule from the visa, and it varies by country.",
    "Do the checks before you book, and again before you fly, because entry rules change.",
  ],
  sections: [
    {
      heading: "The short answer: ask the official page for your passport",
      paragraphs: [
        "Whether you need a visa depends on three things: the passport you hold, the country you are entering, and what you are going there to do. A tourist with a UK passport and a tourist with a US passport can get different answers for the same destination, so a general “no visa needed” search result is not good enough.",
        "The reliable route is your own government’s travel pages. If you hold a UK passport, use the entry requirements page for your destination in GOV.UK’s foreign travel advice. If you hold a US passport, use the country page for your destination on travel.state.gov. Both are written for people with your passport, and both are updated when rules change.",
        "GOV.UK’s country pages have a separate section for entry requirements, with sub-sections on passport validity and on visas. For example, its page for St Vincent and the Grenadines has a visa section that states plainly that you do not need a visa to visit. Look for the same sections on the page for your destination.",
      ],
    },
    {
      heading: "Visa, e-visa, visa on arrival or travel authorisation?",
      paragraphs: [
        "Official pages use several different words for permission to enter. They are not interchangeable, and mixing them up is how people end up at a check-in desk without the right document. The table is our own plain-English reading of the wording; the official page for your destination has the definitive rules for your passport.",
      ],
      table: {
        caption: "Common wording on official entry pages and what to do about it (our plain-English reading)",
        head: ["If the page says…", "It usually means…", "What to do"],
        rows: [
          ["No visa required", "You can enter as a visitor without applying for a visa, usually for a stated number of days.", "Note the permitted stay and any other conditions on the page."],
          ["Visa on arrival", "You get the visa at the border rather than in advance.", "Read what the page says about fees, payment and documents, and whether you can apply earlier."],
          ["e-visa", "You apply online before you travel and carry the approval.", "Apply only through the government’s own website named on the official page."],
          ["Electronic travel authorisation (such as ESTA or the UK ETA)", "A short online approval linked to your passport, needed before you board even though it is not a visa.", "Apply on the official government site; see our [ESTA and UK ETA guide](/travel-guides/esta-and-uk-eta)."],
          ["Visa required before you travel", "You must apply to the embassy, consulate or its agent in advance.", "Start early and check processing times on the official page."],
        ],
      },
      tip: "Our advice: if a site you found by searching asks for payment to “check” or “apply for” entry, stop and go back to GOV.UK or travel.state.gov. Applications go through the destination government’s own website, which the official page links to.",
    },
    {
      heading: "The order to check things in",
      paragraphs: [
        "This is the order we would follow, from the cheapest mistake to catch to the most expensive one.",
      ],
      list: [
        "Check your passport. Look at its expiry date and issue date, and whether you hold the right type of passport for your trip (for example, the UAE does not accept 12-page US emergency passports, according to the State Department).",
        "Open the official entry requirements page for your destination and your passport, and read the visa and passport validity sections.",
        "Check any country you only change planes in. A transit stop can have its own entry rules if you leave the airport or have to pass through border control.",
        "Check for an online authorisation or arrival form that must be done before you fly.",
        "Apply through the official site, and keep the approval with your booking details.",
        "Check again a week or so before you fly, because rules can change after you book.",
      ],
      ordered: true,
    },
    {
      heading: "Passport validity is a separate rule",
      paragraphs: [
        "Many travellers focus on the visa and are caught by the passport. Validity rules differ from one country to the next, and they are usually calculated from a particular date, not simply “not expired”.",
        "The State Department’s country pages show how much it varies. Its Thailand page says your passport must be valid for at least six months beyond your date of arrival. Its United Kingdom page says your passport must be valid for the entire length of your stay. For the Schengen area, it says your passport must be valid for at least three months beyond your planned departure from the EU.",
        "Because the rule is different for every destination, the safe approach is to check the passport validity section of the page for each country on your itinerary. Our [passport validity rules guide](/travel-guides/passport-validity-rules) explains the common patterns and how to count the dates.",
      ],
      tip: "Our advice: if your passport has less than a year left, renew it before you book a long trip. Checking validity for every country on a multi-stop itinerary is easier with a fresh passport.",
    },
    {
      heading: "Where our destinations fit",
      paragraphs: [
        "We have deliberately not put every country’s entry rule in one table here: each rule has its own conditions, and they change. Instead, where a destination page has a visa question, it points you to the official page to confirm. Start with the city you are going to:",
      ],
      list: [
        "Europe: [London](/destinations/london), [Paris](/destinations/paris), [Rome](/destinations/rome), [Barcelona](/destinations/barcelona), [Lisbon](/destinations/lisbon) and [Amsterdam](/destinations/amsterdam)",
        "Asia and Australia: [Tokyo](/destinations/tokyo), [Bali](/destinations/bali), [Singapore](/destinations/singapore), [Bangkok](/destinations/bangkok), [Sydney](/destinations/sydney) and [Delhi](/destinations/delhi)",
        "Middle East and Africa: [Dubai](/destinations/dubai), [Abu Dhabi](/destinations/abu-dhabi), [Istanbul](/destinations/istanbul), [Cairo](/destinations/cairo), [Cape Town](/destinations/cape-town) and [Marrakech](/destinations/marrakech)",
        "The Americas: [New York](/destinations/new-york), [Miami](/destinations/miami), [Cancún](/destinations/cancun), [Rio de Janeiro](/destinations/rio-de-janeiro), [Mexico City](/destinations/mexico-city) and [Cusco](/destinations/cusco)",
      ],
      tip: "Going to Dubai? Entry is only one part of what to check; our [Dubai travel rules guide](/travel-guides/dubai-travel-rules) covers visas for UK and US citizens and the local rules to know before you fly.",
    },
    {
      heading: "Europe and the US: the new authorisations and border checks",
      paragraphs: [
        "Two systems catch people out because they are new. British travellers to the US usually need an approved ESTA before boarding if they travel under the Visa Waiver Program, and many travellers to the UK now need a UK Electronic Travel Authorisation. Both are online approvals, not visas, and both are covered in our [ESTA and UK ETA guide](/travel-guides/esta-and-uk-eta).",
        "In Europe, the State Department says the Entry/Exit System now applies to US citizens entering the Schengen area. It registers non-EU travellers at the border. Our guide to [EES and ETIAS for UK and US travellers](/travel-guides/ees-etias-uk-us-travellers) explains what changes, and what has not started yet.",
      ],
    },
    {
      heading: "Before you pay for a ticket",
      paragraphs: [
        "Our advice: check the entry rules before you pay for a ticket, not after. Then book, then apply for any visa or authorisation, leaving enough time for the application to be processed. A ticket does not replace the right documents.",
        "If your plans are not settled, look at a flexible fare, and check our guide to [changing or cancelling a flight booking](/travel-guides/change-or-cancel-a-flight-booking) before you commit.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do I need a visa if I have a UK passport?",
      a: "It depends on where you are going and why. Open GOV.UK’s foreign travel advice for your destination and read the entry requirements, visas and passport validity sections. Do not rely on a general search result.",
    },
    {
      q: "Do I need a visa if I have a US passport?",
      a: "Check the country page for your destination on travel.state.gov, which covers passport validity and other entry requirements for US citizens. Then follow its links to the destination government’s own site for the exact visa or authorisation rules.",
    },
    {
      q: "What is the difference between a visa and an electronic travel authorisation?",
      a: "A visa is a permission to enter issued under a country’s visa rules. An electronic travel authorisation, such as the US ESTA or the UK ETA, is a shorter online approval for people who do not need a full visa.",
    },
    {
      q: "How much validity does my passport need?",
      a: "It differs by country. The State Department’s pages say, for example, six months beyond arrival for Thailand and three months beyond planned departure for the Schengen area. Check the page for each country on your trip, and see our passport validity guide.",
    },
    {
      q: "Do I need a visa for a stopover or layover?",
      a: "Possibly. If you stay airside, the rules can differ from when you leave the airport or have to pass through immigration. Check the entry requirements for the transit country, and see our stopover and layover guides for how to plan it.",
    },
    {
      q: "Where do US citizens check entry rules for Europe?",
      a: "The State Department has a page for US travelers in Europe, plus country pages for each destination. It notes that the Entry/Exit System now applies to US citizens, and our EES and ETIAS guide explains what that means.",
    },
  ],
  sources: [
    { label: "GOV.UK: Foreign travel advice, St Vincent and the Grenadines entry requirements (example of the page structure)", url: "https://www.gov.uk/foreign-travel-advice/st-vincent-and-the-grenadines/entry-requirements" },
    { label: "GOV.UK: USA entry requirements", url: "https://www.gov.uk/foreign-travel-advice/usa/entry-requirements" },
    { label: "GOV.UK: Get an electronic travel authorisation (ETA)", url: "https://www.gov.uk/eta" },
    { label: "US State Department: Thailand", url: "https://travel.state.gov/en/international-travel/travel-advisories/thailand.html" },
    { label: "US State Department: United Kingdom", url: "https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/UnitedKingdom.html" },
    { label: "US State Department: United Arab Emirates", url: "https://travel.state.gov/en/international-travel/travel-advisories/united-arab-emirates.html" },
    { label: "US State Department: US travelers in Europe", url: "https://travel.state.gov/en/international-travel/planning/guidance/europe.html" },
  ],
  keywords: [
    "do I need a visa",
    "do I need a visa for UK passport holders",
    "do I need a visa US citizen",
    "check visa requirements",
    "entry requirements",
    "e-visa vs visa on arrival",
    "electronic travel authorisation",
    "passport validity for travel",
  ],
};
