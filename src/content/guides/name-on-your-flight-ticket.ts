import { guidesGPhotos } from "../photos/guides-g";
import type { Guide } from "./types";

// Batch G (6 Nov 2026). Primary keyword: "name on flight ticket must match
// passport". Sourcing notes: British Airways' help pages on passport names,
// middle names, maiden names, special characters and name corrections, and
// easyJet's fees, key terms and guest-details pages (two airlines only; the
// guide does not generalise beyond them); TSA's pages on Secure Flight and
// checkpoint identification; GOV.UK's pages on advance passenger information
// for carriers. All found through search on 6 Nov 2026 (the sites could not be
// opened directly from the build sandbox, so only statements that the search
// extracts showed are used). No fee amounts are quoted: easyJet's pages gave
// different figures. Our own advice is labelled as such.
export const nameOnYourFlightTicket: Guide = {
  slug: "name-on-your-flight-ticket",
  title: "Does the name on your flight ticket have to match your passport?",
  seoTitle: "Name on flight ticket must match passport: what to do",
  excerpt:
    "How exactly the name on your flight ticket must match your passport: middle names, hyphens, married names, typos, and what to do if it is wrong.",
  topic: "documents",
  published: "2026-11-06",
  photo: guidesGPhotos.guideTicketName,
  summary: [
    "Book in the name exactly as it appears on the passport or ID you will travel with, not a nickname or the name you use day to day.",
    "British Airways and easyJet both say the ticket name must match your travel document, and both let you correct simple spelling mistakes.",
    "Airlines pass your name and passport details to border authorities before you fly, which is why a mismatch is a problem at check-in, not just a formality.",
    "If you have changed your name, travel in the name on the passport you hold, and book to match it.",
  ],
  sections: [
    {
      heading: "The short answer: use the name in your passport",
      paragraphs: [
        "Yes. The name on your ticket should match the name in the passport you will travel with. British Airways states it simply: the names on your ticket and passport must match for you to travel. easyJet says it is important that your name is spelt correctly on your booking confirmation and boarding pass, and that it matches the name on your travel document, and if it does not, you should correct it as soon as possible.",
        "In practice, that means typing your first and last name exactly as they appear on your passport. Check the passport itself when you book; do not type it from memory.",
      ],
      tip: "Our advice: have the passport open next to the booking form, and tick the “names match” box in your head for every passenger before you pay.",
    },
    {
      heading: "Why airlines are strict about it",
      paragraphs: [
        "Border and security authorities receive passenger details in advance. GOV.UK says carriers operating scheduled services to and from the UK must send Advance Passenger Information to Border Force, including the passenger’s name, nationality, date of birth, gender and travel document details. The United States has its own Secure Flight programme: TSA says the name you give should be the one on the government ID you plan to use when you travel.",
        "At the airport, TSA checks that you, your identification and your boarding pass match and are valid. It says minor differences between the boarding pass and the ID, such as middle initials, should not affect your travel, and that a suffix on one document but not the other is an acceptable variation. If your identity cannot be verified, you will not be allowed into the screening checkpoint. For flights abroad, your passport and any visa or authorisation must also be in the same name as the ticket, as BA points out for visas and ESTAs.",
      ],
    },
    {
      heading: "Middle names, hyphens, titles and nicknames",
      paragraphs: [
        "The two airlines whose pages we read are relaxed about some differences and strict about others. We do not claim that every airline works the same way.",
      ],
      table: {
        caption: "What British Airways and easyJet say about common name questions",
        head: ["Question", "What the airline says", "Airline"],
        rows: [
          ["Do I need to enter my middle name?", "No, as long as your first and last names are correct and match your passport.", "British Airways"],
          ["My middle name shows joined to my first name", "This is not a problem. The systems cannot show the characters or spaces that separate names.", "British Airways"],
          ["Hyphens and apostrophes", "Joined names or missing hyphens and apostrophes are generally not a problem.", "British Airways"],
          ["Wrong title (Mr, Ms and so on)", "Title changes can be made free of charge online or through customer services.", "easyJet"],
          ["Nickname or shortened first name", "We found no airline page that allows it. Use the name in your passport.", "Our advice"],
        ],
      },
      tip: "Our advice: never use a nickname, a married name you have not yet put on your passport, or a name you “go by”. Both airlines’ rules are about the passport; if in doubt, copy it.",
    },
    {
      heading: "If you have changed your name",
      paragraphs: [
        "British Airways says that if you have changed your name for any reason, including marriage, divorce or deed poll, the names on your ticket and passport must match in order to travel. You cannot travel on a ticket in your married name with a passport in your maiden name. All your other travel documents, including visas and ESTAs, must also be in the same name as the ticket.",
        "So the order matters. If your passport has not been updated, book in the name it shows. If you have a new passport, book in the new name, and apply for any visa or travel authorisation in that same name. If you booked before the change, contact the airline about the ticket before you travel. Our [passport validity guide](/travel-guides/passport-validity-rules) covers the other passport checks.",
      ],
    },
    {
      heading: "Typos and corrections",
      paragraphs: [
        "Both airlines let you fix simple mistakes, within limits. BA says most spelling mistakes can be corrected by phone if all the flights on your ticket are operated by BA. It says there is no charge for this kind of change, but you may have to pay the difference if taxes, fees or surcharges have changed since you booked, and that you may be asked for proof of identity. Updating the name in the Advance Passenger Information section of Manage My Booking does not change the e-ticket. If you booked through a travel agent or website, BA says to contact them, as it cannot change tickets they issued.",
        "easyJet’s fees page lists spelling mistakes and title changes (limited to three characters per name) as free to make online, through its website or app. A full name change, in which the ticket goes to a different person, carries a fee per passenger and is a different process from fixing a typo. The fee figures on easyJet’s own pages differ, so we have not quoted one: check the amount in your booking before you pay.",
        "BA’s policy for travel agents adds limits worth knowing: complete name changes are not permitted because tickets are not transferable, only one name correction per customer is allowed, and corrections are not allowed once travel has started. Those limits come from the agent policy page, so they may not apply identically to every ticket.",
      ],
    },
    {
      heading: "What to do before you fly",
      paragraphs: [
        "Check the name on the confirmation the moment it arrives, not at the airport. A mistake spotted the same day is much easier to fix than one spotted at check-in.",
      ],
      list: [
        "Compare each passenger’s confirmation with the passport, letter by letter, as soon as you receive it",
        "Contact the airline, or the travel agent if you booked through one, straight away if something is wrong",
        "Check that your visa or travel authorisation is in the same name; see our [ESTA and UK ETA guide](/travel-guides/esta-and-uk-eta)",
        "Keep the correction confirmation, in case it is asked for at the airport",
        "If you are flying soon, allow extra time at the airport; our guide on [how early to get to the airport](/travel-guides/how-early-to-get-to-the-airport) can help",
      ],
      ordered: true,
    },
    {
      heading: "Higher-stakes trips",
      paragraphs: [
        "These checks matter most on long trips where a missed flight is costly, such as [London to New York](/routes/london-to-new-york) or [London to Tokyo](/routes/london-to-tokyo). Read the fare conditions too: our guide to [changing or cancelling a flight booking](/travel-guides/change-or-cancel-a-flight-booking) explains what a fare allows.",
      ],
    },
  ],
  faqs: [
    {
      q: "Does the name on my ticket have to match my passport exactly?",
      a: "British Airways and easyJet both say it must match your travel document. Minor differences such as joined names or a missing hyphen are generally accepted by BA, but do not rely on that: copy the name from your passport.",
    },
    {
      q: "Do I need to include my middle name when booking a flight?",
      a: "Not with British Airways, which says you do not need to add middle names as long as your first and last names are correct and match your passport. Other airlines may differ, so check the booking form.",
    },
    {
      q: "I got married after booking. Can I fly with my old name?",
      a: "Travel in the name on the passport you hold. British Airways says the ticket and passport names must match, and that you cannot travel on a ticket in a married name with a passport in a maiden name. Contact your airline about the booking before you fly.",
    },
    {
      q: "Can I correct a spelling mistake on my ticket?",
      a: "Usually, yes. BA says most spelling mistakes can be corrected by phone with no charge if all flights are BA-operated, and easyJet lists spelling corrections of up to three characters per name as free to make online. Taxes that have changed since booking may add a cost.",
    },
    {
      q: "Does the boarding pass name have to match the ID in the US?",
      a: "TSA says the name on your boarding pass should match your ID. It also says minor differences, such as middle initials or a suffix, should not affect your travel. If your identity cannot be verified, you will not be allowed into the checkpoint.",
    },
  ],
  sources: [
    { label: "British Airways: My name on my booking is different from my passport", url: "https://www.britishairways.com/content/information/help/faq/booking/passport-name-different" },
    { label: "British Airways: Add a middle name", url: "https://www.britishairways.com/content/information/help/faq/booking/add-middle-name" },
    { label: "British Airways: Using my maiden name after getting married", url: "https://www.britishairways.com/content/information/help/faq/booking/using-maiden-name-after-married" },
    { label: "British Airways: Names with special characters", url: "https://www.britishairways.com/content/en/us/information/help/faq/booking/name-with-special-characters" },
    { label: "British Airways: Name correction (travel partner policy)", url: "https://www.britishairways.com/travel-partner-connect/en/ar/policies/self-service/name-corrections" },
    { label: "easyJet: Fees and charges", url: "https://www.easyjet.com/en/help-centre/policy-terms-and-conditions/fees-charges" },
    { label: "easyJet: Key terms for your booking", url: "https://www.easyjet.com/en/terms-and-conditions/key-terms" },
    { label: "TSA: Acceptable identification at the TSA checkpoint", url: "https://www.tsa.gov/travel/security-screening/identification" },
    { label: "TSA: Secure Flight Q&A II", url: "https://www.tsa.gov/blog/2009/08/12/secure-flight-qa-ii" },
    { label: "TSA: Top six checkpoint dos and don’ts for travelers", url: "https://www.tsa.gov/news/press/releases/2023/08/08/tsa-officers-share-top-six-checkpoint-dos-and-donts-travelers" },
    { label: "GOV.UK: Providing information about scheduled aviation flights", url: "https://www.gov.uk/government/publications/providing-information-about-scheduled-aviation-flights" },
  ],
  keywords: [
    "name on flight ticket must match passport",
    "flight ticket name different from passport",
    "middle name on flight ticket",
    "correct name on flight booking",
    "flight booking name change after marriage",
    "secure flight name",
    "advance passenger information",
  ],
};
