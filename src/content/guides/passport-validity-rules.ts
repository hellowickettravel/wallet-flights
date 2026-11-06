import { photos } from "../images";
import type { Guide } from "./types";

// Batch 22, guides agent C. Primary keywords: "passport validity rules",
// "6 month passport rule". Rules from GOV.UK foreign travel advice (France,
// USA, UAE, Thailand, Mexico), the EU's Your Europe page and Schengen Borders
// Code, and the US State Department, found on 5 to 6 Nov 2026. Entry rules
// change: every country-specific rule is tied to its official page.
export const passportValidityRules: Guide = {
  slug: "passport-validity-rules",
  title: "Passport validity rules: the 6-month rule, the EU’s 10-year rule and how to check",
  seoTitle: "Passport validity rules: the 6-month rule explained",
  excerpt:
    "How long your passport must be valid to travel: the EU’s 3-month and 10-year rules, countries that need 6 months, and the US and UK rules, from official pages.",
  topic: "documents",
  published: "2026-11-05",
  photo: photos.guidePassportValidity,
  summary: [
    "There’s no single worldwide rule: each country sets its own, and an in-date passport isn’t always enough.",
    "For the EU and Schengen area, your passport must have been issued less than 10 years before you arrive and be valid for at least 3 months after you plan to leave.",
    "Some countries, including the UAE and Thailand, require at least 6 months’ validity from the day you arrive.",
    "The US and Mexico only require a passport valid for your whole stay, but the State Department says airlines won’t board you without the validity your destination requires.",
    "Check GOV.UK foreign travel advice or travel.state.gov for your destination before you book, and renew early if you’re close.",
  ],
  sections: [
    {
      heading: "Why an in-date passport can still get you turned away",
      paragraphs: [
        "Many countries want your passport to stay valid for some time after you arrive or leave, so that you aren’t left stranded with an expired document if your trip runs late. The US State Department says many countries require at least 6 months’ validity remaining to enter, and that passengers won’t be allowed to board an international flight if they don’t have the validity their destination requires.",
        "That last point matters most: the airline checks your passport at check-in, and if it doesn’t meet the rules, you won’t fly. Under UK passenger rights, an airline can refuse boarding for inadequate travel documents without paying compensation, as our guide to [denied boarding](/travel-guides/denied-boarding-overbooked-flights) explains.",
      ],
    },
    {
      heading: "Passport validity by destination",
      paragraphs: [
        "These are the rules for British and American passport holders on official government pages, checked in November 2026. They’re a starting point, not a substitute for checking your own destination.",
      ],
      table: {
        caption: "Passport validity rules for popular destinations, from GOV.UK, the EU and the US State Department (checked November 2026)",
        head: ["Destination", "Validity needed", "Source"],
        rows: [
          ["EU and Schengen area, e.g. France, Spain, Italy", "Issued less than 10 years before you arrive, and valid for at least 3 months after you plan to leave", "GOV.UK; EU Your Europe; State Department"],
          ["United States (UK passport holders)", "Valid for the length of your planned stay, plus an approved ESTA or visa", "GOV.UK USA travel advice"],
          ["United Arab Emirates, e.g. [Dubai](/destinations/dubai)", "At least 6 months after the date you arrive (3 months if you hold a UAE residence permit)", "GOV.UK UAE travel advice"],
          ["Thailand, e.g. [Bangkok](/destinations/bangkok)", "At least 6 months after the date you arrive, with at least one blank page", "GOV.UK Thailand travel advice; State Department"],
          ["Mexico, e.g. [Cancún](/destinations/cancun)", "Valid for the duration of your stay; the Mexican Embassy in the UK recommends at least 180 days", "GOV.UK Mexico travel advice"],
        ],
      },
      tip: "Count from the right date. For the UAE and Thailand, the 6 months run from the day you arrive; for the Schengen area, the 3 months run from the day you plan to leave.",
    },
    {
      heading: "The EU and Schengen rules for British passports",
      paragraphs: [
        "Since the UK left the EU, British passport holders are treated as non-EU nationals, and the Schengen Borders Code applies. GOV.UK’s travel advice for EU countries such as France says your passport must meet two conditions on the day you travel: it must have been issued less than 10 years before the date you arrive, and its expiry date must be at least 3 months after the day you plan to leave. Both conditions apply; meeting one isn’t enough.",
        "The 10-year rule catches people out. Before October 2018, the UK added up to 9 extra months to a new passport if you renewed before the old one expired. GOV.UK warns that passports renewed before 1 October 2018 may have an issue date more than 10 years ago, so a passport with an expiry date well in the future can still fail the rule. Look at the issue date on the photo page, not only the expiry date.",
        "The same rules apply to US citizens visiting the Schengen area: the State Department says your passport must be valid for at least 3 months beyond your planned departure, and recommends having 6 months. The EU’s new Entry/Exit System registers non-EU travellers at the border but doesn’t change these validity rules; our [EES and ETIAS guide](/travel-guides/ees-etias-uk-us-travellers) has the details.",
      ],
      tip: "Our advice: look at the issue date as well as the expiry date. GOV.UK suggests your passport should be no older than 9 years and 6 months on the day you travel."
    },
    {
      heading: "Travelling to the US and the UK",
      paragraphs: [
        "For British citizens visiting the US, GOV.UK says your passport must be valid for the length of your planned stay. You also need an approved ESTA or a visa before you fly, and a valid ESTA doesn’t guarantee entry. GOV.UK reminds travellers to check the rules for any country they transit too, since many countries require 6 months’ validity. Our guide to the [ESTA and the UK ETA](/travel-guides/esta-and-uk-eta) explains both systems.",
        "For Americans visiting the UK, you need a passport valid for your whole stay and, under the UK’s Electronic Travel Authorisation scheme, an ETA approved before you travel (GOV.UK says US nationals are covered). Flying [New York to London](/routes/new-york-to-london) or [London to New York](/routes/london-to-new-york), check both documents well before departure.",
      ],
    },
    {
      heading: "Countries with a 6-month rule",
      paragraphs: [
        "The 6-month rule isn’t universal, but it’s common, especially in Asia, Africa and the Middle East. GOV.UK says the UAE requires 6 months from the date you arrive, and Thailand requires 6 months from arrival along with a blank page. If you’re only transiting the UAE without passing through immigration, GOV.UK says 3 months from the transit date is enough.",
        "Some countries set 6 months only as a recommendation. The State Department, for example, recommends 6 months for France and Germany while the legal requirement is 3 months after departure. Our advice: if your passport has less than 6 months left, check every country on your route, including transit stops, before you book.",
      ],
    },
    {
      heading: "How to check and renew in time",
      ordered: true,
      paragraphs: ["Do this as soon as you start planning, not the week before you fly."],
      list: [
        "Find your passport’s issue date and expiry date on the photo page",
        "Look up your destination on GOV.UK foreign travel advice (UK passports) or travel.state.gov (US passports), under entry requirements",
        "Check the rules for any country where you change planes, too",
        "Check that you have enough blank pages: Thailand, for example, requires at least one",
        "If you’re close to a limit, renew before you book, and allow for processing times shown on GOV.UK or travel.state.gov",
        "Once you have a new passport, update the number in any ESTA, ETA or airline booking: an ESTA is linked to a specific passport",
      ],
      tip: "Check every traveller’s passport separately, including children’s: it’s easy to remember your own and forget theirs. For family trips, see our [half-term flights guide](/travel-guides/half-term-flights)."
    },
  ],
  faqs: [
    {
      q: "What is the 6-month passport rule?",
      a: "Some countries require your passport to be valid for at least 6 months from the date you arrive. GOV.UK lists the UAE and Thailand among them. It isn’t a worldwide rule: the US and Mexico only require validity for your stay, and the Schengen area requires 3 months after you leave.",
    },
    {
      q: "How long does my passport need to be valid for Europe?",
      a: "For the EU and Schengen area, it must have been issued less than 10 years before you arrive and be valid for at least 3 months after the day you plan to leave. Both conditions must be met.",
    },
    {
      q: "Can I travel to the US if my passport expires in 3 months?",
      a: "If you’re a British citizen, GOV.UK says your passport only needs to be valid for the length of your planned stay in the US. Check the rules for any transit country, and make sure your ESTA is linked to that passport.",
    },
    {
      q: "Do extra months on my UK passport count?",
      a: "Not for the EU’s 10-year rule. GOV.UK warns that passports renewed before 1 October 2018 may have had extra months added, so their issue date can be more than 10 years before your trip even though the expiry date hasn’t passed.",
    },
    {
      q: "Will the airline check my passport validity?",
      a: "Yes. The State Department says passengers won’t be allowed to board an international flight without the validity their destination requires, and under UK rules an airline doesn’t owe compensation when it refuses boarding for inadequate travel documents.",
    },
  ],
  sources: [
    { label: "GOV.UK: Travelling to the EU and Schengen area", url: "https://www.gov.uk/travel-to-eu-schengen-area" },
    { label: "GOV.UK: France entry requirements", url: "https://www.gov.uk/foreign-travel-advice/france/entry-requirements" },
    { label: "GOV.UK: Electronic travel authorisation (ETA) overview", url: "https://www.gov.uk/eta" },
    { label: "GOV.UK: Passport rules for travel to Europe", url: "https://www.gov.uk/guidance/passport-rules-for-travel-to-europe" },
    { label: "GOV.UK: USA entry requirements", url: "https://www.gov.uk/foreign-travel-advice/usa/entry-requirements" },
    { label: "GOV.UK: United Arab Emirates entry requirements", url: "https://www.gov.uk/foreign-travel-advice/united-arab-emirates/entry-requirements" },
    { label: "GOV.UK: Thailand entry requirements", url: "https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements" },
    { label: "GOV.UK: Mexico entry requirements", url: "https://www.gov.uk/foreign-travel-advice/mexico/entry-requirements" },
    { label: "EU Your Europe: Travel documents for non-EU nationals", url: "https://europa.eu/youreurope/citizens/travel/entry-exit/non-eu-nationals/index_en.htm" },
    { label: "US State Department: US travelers in Europe", url: "https://travel.state.gov/en/international-travel/planning/guidance/europe.html" },
    { label: "US State Department: Information for the travel industry", url: "https://travel.state.gov/en/international-travel/planning/guidance/travel-industry.html" },
    { label: "US State Department: Thailand", url: "https://travel.state.gov/en/international-travel/travel-advisories/thailand.html" },
  ],
  keywords: ["passport validity rules", "6 month passport rule", "passport validity for europe", "10 year passport rule eu", "how long does my passport need to be valid", "passport validity usa", "passport validity dubai", "schengen passport rules"],
};
