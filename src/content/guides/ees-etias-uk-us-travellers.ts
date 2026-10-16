import { photos } from "../images";
import type { Guide } from "./types";

// Wave 1, post 6 (docs/SEO-CONTENT-PLAN.md). Primary keywords: "etias",
// "entry exit system". Status from the official ETIAS site (read in a browser)
// and the European Commission, with the EES details from GOV.UK's Spain entry
// requirements, all read 16 Oct 2026. Time-sensitive: re-check the ETIAS
// status monthly and update `updated` when it changes.
export const eesEtias: Guide = {
  slug: "ees-etias-uk-us-travellers",
  title: "EES and ETIAS: what UK and US travellers need for Europe now",
  seoTitle: "EES and ETIAS for UK and US travellers",
  excerpt:
    "The EU’s Entry/Exit System is running and ETIAS isn’t yet. What UK and US travellers need for Europe today, the 90-day rule and passport dates.",
  topic: "documents",
  published: "2026-10-16",
  photo: photos.guidePassports,
  summary: [
    "Status on 16 October 2026: the Entry/Exit System (EES) has been fully running since 10 April 2026; ETIAS is not in operation and isn’t taking applications.",
    "EES replaces passport stamps. On your first trip you may be asked to give fingerprints and a photo at the border.",
    "ETIAS will cost EUR 20 when it starts, and the EU says it will announce the start date several months in advance.",
    "UK and US passport holders can stay up to 90 days in any 180-day period in the Schengen area without a visa.",
    "British passports must be under 10 years old on arrival and valid for 3 months after you leave.",
  ],
  sections: [
    {
      heading: "EES and ETIAS: the status today",
      paragraphs: [
        "Two EU systems are often mentioned together, but they’re at different stages.",
      ],
      table: {
        caption: "EES and ETIAS status, checked on official EU sources on 16 October 2026",
        head: ["", "Entry/Exit System (EES)", "ETIAS"],
        rows: [
          ["What it is", "A digital record of when non-EU visitors enter and leave, replacing passport stamps", "A travel authorisation that visa-free visitors will need before they travel"],
          ["Status", "Fully operational since 10 April 2026", "Not in operation; no applications are being taken"],
          ["What you do", "Register at the border on your first visit", "Nothing yet. When it starts, apply online before you travel"],
          ["Cost", "Free", "EUR 20 when it starts (free for under-18s and over-70s)"],
        ],
      },
      tip: "Any website asking you to pay for ETIAS today isn’t official, because the EU isn’t taking applications yet.",
    },
    {
      heading: "EES: what happens at the border",
      paragraphs: [
        "The European Commission says EES replaces passport stamping with digital records of entries, exits and refusals of entry, and records travellers’ facial images, fingerprints and details from their passports. It started in stages on 12 October 2025 and became fully operational on 10 April 2026.",
        "GOV.UK says that on your first visit to a Schengen country after EES started, you may be asked to register your details at a special booth: your fingerprints and a photo. Children aged 11 or younger don’t have their fingerprints scanned but may have their photo taken. Your digital EES record is valid for 3 years, so on later trips the check should be quicker.",
        "Allow extra time at the border on your first trip, especially at busy times or when you arrive at a land or sea crossing.",
      ],
    },
    {
      heading: "Who EES applies to",
      paragraphs: [
        "EES covers non-EU nationals coming to the Schengen area for short stays, which includes British and American visitors. It doesn’t replace a visa for people who need one, and it doesn’t apply to EU citizens. If you live in an EU country with a residence permit, your rules are different, so check the official guidance for residents.",
      ],
    },
    {
      heading: "ETIAS: what’s confirmed and what isn’t",
      paragraphs: [
        "ETIAS is the EU’s planned travel authorisation for visa-exempt travellers to 30 European countries, including British and American passport holders. The official ETIAS website says it is currently not in operation, no applications are being collected, and the EU will announce the start date several months before launch.",
        "What is confirmed: the European Commission says the fee will be EUR 20, with people under 18 or over 70 exempt from paying, and the official site says ETIAS will let you stay for up to 90 days. What isn’t confirmed is the start date. Commission news from 2025 expected operations in the last quarter of 2026, but the official site no longer gives a date, and reports of a later start come from unofficial sources. We’ll update this guide when the EU announces the date.",
      ],
    },
    {
      heading: "The 90 days in 180 rule",
      paragraphs: [
        "With or without ETIAS, the length of your stay is limited. GOV.UK says British travellers can visit the Schengen area without a visa for up to 90 days in any 180-day period, and the same Schengen short-stay rule applies to other visa-free visitors, including US citizens. The days are counted across the whole area, not per country, and days from trips in the previous 180 days count too.",
        "If you visit Europe often, use the European Commission’s short-stay calculator before you book, and EES will keep an exact record of your entries and exits.",
      ],
    },
    {
      heading: "Passport dates for British travellers",
      paragraphs: [
        "For the Schengen area, GOV.UK says a British passport must meet two conditions:",
      ],
      list: [
        "Issued less than 10 years before the date you arrive",
        "Valid for at least 3 months after the day you plan to leave",
      ],
      tip: "Check both dates before you book, not just the expiry date. A passport that is close to 10 years old can fail the first rule even if it hasn’t expired.",
    },
    {
      heading: "Before you fly to Europe: a checklist",
      ordered: true,
      paragraphs: ["Run through this before booking a trip to Lisbon, Rome, Paris or Barcelona."],
      list: [
        "Check your passport’s issue and expiry dates against the rules above",
        "Count your days in the Schengen area over the last 180 days if you travel often",
        "Allow extra time at the border for EES registration on your first trip",
        "Don’t pay any website for ETIAS until the EU announces it has started",
        "Check the entry requirements page for each country you visit, linked from our destination guides",
      ],
    },
    {
      heading: "Where to go next",
      paragraphs: [
        "Our destination guides for [Lisbon](/destinations/lisbon), [Rome](/destinations/rome), [Paris](/destinations/paris) and [Barcelona](/destinations/barcelona) link to the official entry requirements for each country, and our guide to [Europe in shoulder season](/travel-guides/europe-shoulder-season) covers the best months to go. Flying from the US? See flights from [New York to Lisbon](/routes/new-york-to-lisbon) and [New York to Rome](/routes/new-york-to-rome).",
      ],
    },
  ],
  faqs: [
    {
      q: "Do I need ETIAS to travel to Europe now?",
      a: "No. On 16 October 2026 the official ETIAS website says ETIAS is not in operation and isn’t taking applications. The EU will announce the start date several months in advance.",
    },
    {
      q: "How much will ETIAS cost?",
      a: "EUR 20, according to the European Commission. People under 18 or over 70 won’t pay the fee.",
    },
    {
      q: "What is EES, and do I have to register?",
      a: "EES is the EU’s Entry/Exit System, which replaces passport stamps with a digital record. On your first visit you may be asked to give your fingerprints and a photo at the border; the record lasts 3 years.",
    },
    {
      q: "Does EES apply to UK citizens?",
      a: "Yes. British passport holders are non-EU nationals, so EES applies when they visit the Schengen area for a short stay.",
    },
    {
      q: "Do US citizens need ETIAS for Italy or Spain?",
      a: "Not yet. When ETIAS starts, US citizens visiting Schengen countries such as Italy and Spain without a visa will need it. Until then, they travel as now, within the 90 days in 180 rule.",
    },
  ],
  keywords: ["etias", "etias start date", "etias uk", "etias for us citizens", "entry exit system", "ees europe", "do americans need a visa for europe"],
  sources: [
    { label: "European Union: Official ETIAS website", url: "https://travel-europe.europa.eu/en/etias" },
    { label: "European Commission: EES will become fully operational on 10 April 2026", url: "https://home-affairs.ec.europa.eu/news/entryexit-system-will-become-fully-operational-10-april-2026-2026-03-30_en" },
    { label: "European Commission: ETIAS will cost EUR 20", url: "https://home-affairs.ec.europa.eu/news/european-travel-authorisation-etias-will-cost-eur-20-2025-07-17_en" },
    { label: "GOV.UK: Spain entry requirements (EES, 90 days in 180, passport validity)", url: "https://www.gov.uk/foreign-travel-advice/spain/entry-requirements" },
    { label: "European Commission: Short-stay calculator", url: "https://home-affairs.ec.europa.eu/policies/schengen/border-crossing/short-stay-calculator_en" },
  ],
};
