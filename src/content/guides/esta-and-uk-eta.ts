import { photos } from "../images";
import type { Guide } from "./types";

// Wave 2, post 2 (docs/SEO-CONTENT-PLAN.md). Primary keywords: "uk eta for
// us citizens", "esta for usa from uk". UK ETA facts from GOV.UK (/eta and
// /eta/apply); ESTA facts from the official ESTA FAQ (read in a browser), CBP
// and GOV.UK's USA entry requirements. All read on 16 Oct 2026. The ESTA fee
// changed that day ($40.62); re-check both fees before updating.
export const estaAndEta: Guide = {
  slug: "esta-and-uk-eta",
  title: "ESTA and the UK ETA: which one you need, what they cost and how long they take",
  seoTitle: "ESTA and UK ETA: who needs which",
  excerpt:
    "Flying UK to US you need an ESTA; flying US to UK you need an ETA. What each costs, how long it lasts, when to apply and how to avoid copycat sites.",
  topic: "documents",
  published: "2026-10-16",
  photo: photos.guideEntryPermits,
  summary: [
    "British visitors to the US need an ESTA (or a visa); American visitors to the UK need a UK ETA. Each traveller needs their own, children included.",
    "The UK ETA costs £20, lasts 2 years or until your passport expires, and usually gets a decision within a day (up to 3 working days).",
    "The ESTA costs $40.62 for applications from 16 October 2026 and lasts 2 years or until your passport expires.",
    "You need one even just to change planes, if you pass through UK border control or transit the US.",
    "Apply only on GOV.UK or the official ESTA website. Other sites charge more for the same thing.",
  ],
  sections: [
    {
      heading: "Which one do you need?",
      paragraphs: [
        "They’re two different permissions that do the same job: they let visitors who don’t need a visa travel to a country. Which one you need depends on where you’re going, not where you’re from.",
      ],
      table: {
        caption: "ESTA and UK ETA compared, from the official websites, checked 16 October 2026",
        head: ["", "UK ETA (to visit the UK)", "ESTA (to visit the US)"],
        rows: [
          ["Who needs it", "Visitors who don’t need a visa, including US, Canadian, Australian and most European citizens", "Citizens of Visa Waiver Program countries, including British citizens, unless they have a US visa"],
          ["Cost", "£20", "$40.62 (for applications from 16 October 2026)"],
          ["How long it lasts", "2 years, or until your passport expires", "2 years, or until your passport expires"],
          ["Decision time", "Usually within a day; up to 3 working days", "Apply as soon as you start planning"],
          ["Needed for transit?", "Yes, if you pass through UK border control", "Yes, for any transit through the US"],
          ["Where to apply", "GOV.UK or the UK ETA app", "The official ESTA website"],
        ],
      },
    },
    {
      heading: "The UK ETA for American travellers",
      paragraphs: [
        "GOV.UK says you usually need an electronic travel authorisation (ETA) rather than a visa if you’re from Europe, the USA, Australia, Canada or certain other countries. British and Irish citizens don’t need one. Every traveller needs their own ETA, including babies and children.",
        "An ETA costs £20 and lets you visit the UK, Jersey, Guernsey or the Isle of Man for up to 6 months at a time. It lasts for 2 years or until your passport expires, whichever comes first, and you can travel as many times as you like while it’s valid.",
        "You can apply online or through the UK ETA app, which scans your passport and your face with your phone’s camera. You’ll need the passport you’re travelling with, an email address and a card, Apple Pay or Google Pay. GOV.UK says you’ll usually get a decision by email within a day, but it can take up to 3 working days, and you must wait for the confirmation email before you travel. The fee isn’t refundable once you’ve applied.",
      ],
      tip: "Apply as soon as your trip is booked, not the night before. Three working days can stretch to five or more calendar days over a weekend.",
    },
    {
      heading: "The ESTA for British travellers",
      paragraphs: [
        "GOV.UK says British visitors to the US must have either an Electronic System for Travel Authorisation (ESTA) or a visa, and that travellers on the Visa Waiver Program need an approved ESTA whether they arrive by air, land or sea. US Customs and Border Protection (CBP) says you need an e-passport to use the Visa Waiver Program, and GOV.UK says your passport must be valid for the length of your planned stay.",
        "The official ESTA website says the fee is $40.62 for applications completed after its system update on 16 October 2026. Unless it’s revoked, an ESTA is valid for two years from the date it’s approved, or until your passport expires, whichever comes first.",
        "The US Department of Homeland Security recommends applying when you make your travel plans, and CBP suggests doing it before you buy your tickets. An approved ESTA lets you board a flight to the US, but it doesn’t guarantee entry: a CBP officer decides that when you arrive.",
      ],
    },
    {
      heading: "Connecting flights: do you need one to change planes?",
      paragraphs: [
        "Yes, in many cases. GOV.UK says you need an ETA if you’re passing through border control at a UK airport before continuing your journey, which is common on separate tickets. The official ESTA website says Visa Waiver Program travellers need an ESTA or a visa even to transit the United States, and should answer yes to the transit question on the application.",
        "This catches people out on trips such as London to Mexico City via a US airport, or a self-transfer through Heathrow. Our guide to [self-transfer flights](/travel-guides/self-transfer-separate-tickets) explains when you go through border control.",
      ],
    },
    {
      heading: "How to apply, step by step",
      ordered: true,
      paragraphs: ["The process is similar for both."],
      list: [
        "Check your passport: the one you’ll travel with, valid for your whole trip (an e-passport for the US)",
        "Go to the official site: GOV.UK or the UK ETA app for the ETA; the official ESTA website for the US",
        "Fill in the application for each traveller separately, children included",
        "Pay the official fee: £20 for the ETA, $40.62 for the ESTA",
        "Wait for the approval email before you travel, and keep a copy of it",
        "Check the name and passport number match your booking exactly",
      ],
    },
    {
      heading: "Avoid copycat websites",
      paragraphs: [
        "Search for either permission and you’ll find websites that look official and charge far more for the same application. GOV.UK warns that other websites may charge more and to avoid websites that imitate government services. Use only these:",
      ],
      list: [
        "UK ETA: [gov.uk/eta](https://www.gov.uk/eta) or the official UK ETA app",
        "US ESTA: [esta.cbp.dhs.gov](https://esta.cbp.dhs.gov/)",
      ],
      tip: "If a site charges much more than £20 for an ETA or $40.62 for an ESTA, or adds a “processing” or “service” fee, it isn’t the official site.",
    },
    {
      heading: "Before you fly",
      paragraphs: [
        "With your ETA or ESTA approved, check the rest of the trip: our guide to [the 24-hour cancellation rule](/travel-guides/24-hour-flight-cancellation-rule) covers changes after booking, and our [London](/destinations/london) and [New York](/destinations/new-york) destination guides cover airports and the best time to go. Flight times and fares are on the [London to New York](/routes/london-to-new-york) and [New York to London](/routes/new-york-to-london) route pages.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do US citizens need an ETA to visit the UK?",
      a: "Yes. GOV.UK says visitors from the USA usually need an electronic travel authorisation rather than a visa. It costs £20 and lasts 2 years or until your passport expires.",
    },
    {
      q: "Do I need an ESTA to travel to the USA from the UK?",
      a: "Yes, unless you have a US visa. British citizens travel under the Visa Waiver Program, which needs an approved ESTA for arrivals by air, land or sea.",
    },
    {
      q: "How long does a UK ETA take?",
      a: "GOV.UK says you’ll usually get a decision within a day, but it can take up to 3 working days. You must wait for the confirmation before you travel.",
    },
    {
      q: "How much does an ESTA cost?",
      a: "$40.62 for applications completed from 16 October 2026, according to the official ESTA website. Sites charging more aren’t official.",
    },
    {
      q: "Do I need an ESTA or ETA for a connecting flight?",
      a: "For the US, yes: Visa Waiver Program travellers need an ESTA or visa even to transit. For the UK, you need an ETA if you pass through UK border control before your onward flight.",
    },
  ],
  keywords: ["uk eta for us citizens", "esta for usa from uk", "how long does uk eta take", "esta cost", "do i need an esta to transit through usa", "uk eta cost"],
  sources: [
    { label: "GOV.UK: Get an electronic travel authorisation (ETA)", url: "https://www.gov.uk/eta" },
    { label: "GOV.UK: Apply for an ETA", url: "https://www.gov.uk/eta/apply" },
    { label: "Official ESTA website: Frequently asked questions", url: "https://esta.cbp.dhs.gov/faq?lang=en" },
    { label: "US Customs and Border Protection: ESTA", url: "https://www.cbp.gov/travel/international-visitors/esta" },
    { label: "GOV.UK: USA entry requirements", url: "https://www.gov.uk/foreign-travel-advice/usa/entry-requirements" },
  ],
};
