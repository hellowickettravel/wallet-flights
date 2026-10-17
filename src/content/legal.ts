// Policy text written for how the site works today: comparison on the site
// (no accounts, no payments), consent-gated live search (Travelpayouts White
// Label) and analytics, affiliate links to providers via Travelpayouts, and
// flights the team books by hand for travellers who ask on WhatsApp. Company
// details from the owner (16 Oct 2026), checked against Companies House.
// TODO(confirm): a qualified adviser should review these policies, in
// particular whether flights booked by the team need ATOL protection (UK
// businesses selling flights usually need an ATOL unless the airline issues
// the ticket straight away) and which payment methods the team accepts. Until
// then the terms promise no financial protection either way.
import type { LegalSection } from "@/components/legal/legal-page";
import { company, companyLine, site } from "./site";

export const legalUpdated = "16 October 2026";

export const privacy: { intro: string; sections: LegalSection[] } = {
  intro: `This policy explains what personal data ${site.name} collects, why, and the choices you have. ${site.name} is a trading name of ${company.legalName} (company number ${company.number}, registered office ${company.registeredOffice}), which is the controller of the data described here.`,
  sections: [
    {
      heading: "What we collect",
      body: [
        "We only collect the information you choose to send us, and basic technical data needed to run the site:",
        [
          "Contact form: your name, email address, the topic you chose and your message.",
          "Bookings made by our team: if you ask us on WhatsApp to book a flight, the details the airline needs to issue a ticket (usually each traveller’s name as it appears on their passport, date of birth, and contact details), your travel dates and preferences, and our messages with you.",
          "Fare alerts: your email address, once you confirm it from the email we send. Fare alerts haven’t launched yet; until they do, we only use it to tell you when they launch.",
          "Price alerts on the fare calendar: your email address, the route, trip and price you chose, and when we last emailed you about it, once you confirm it from the email we send. We keep the alert until you stop it with the link in any alert email.",
          "Searches: the routes, dates and number of travellers you search for. Live search on our Flights page is run by our flight search partner, which receives your search, IP address and device information to find prices, and measures searches and bookings with its own cookies. It only loads if you allow “Live flight search” cookies.",
          "Fare calendar starting point: when you open the fare calendar without choosing a route, our hosting provider passes our server your approximate location (worked out from your IP address) so we can start from an airport near you. We use it for that page only and don’t store it.",
          "Technical data: if you allow analytics, aggregated usage statistics (pages viewed, device type, country, page speed) from Vercel Analytics, which doesn’t identify you.",
          "Your cookie choice, stored in a cookie on your device.",
        ],
        "We don’t take payment on this website: when you book through a deal, you pay the provider on its own website. If our team books a flight for you, we’ll explain how to pay before booking, and we use payment details only to take that payment.",
      ],
    },
    {
      heading: "How and why we use it",
      body: [
        [
          "To reply to your messages (our legitimate interest in answering enquiries).",
          "To make and manage a booking you ask our team for, including sharing traveller details with the airline or travel provider (to perform our contract with you, or take steps you ask for before it).",
          "To keep booking and accounting records (our legal obligations).",
          "To tell you when fare alerts launch and then send the alerts you asked for (your consent, which you can withdraw at any time).",
          "To check fares for the price alerts you set and email you when a fare drops below your price (your consent, which you can withdraw at any time with the stop link in any alert email).",
          "To keep the site secure and fix problems (our legitimate interests).",
          "Live flight search and analytics (your consent, which you can change at any time under “Cookie settings” in the footer).",
        ],
      ],
    },
    {
      heading: "When you go to a provider",
      body: [
        "When you select a deal, you leave Wallet Flights for the airline or travel site you chose. Their privacy policy applies to anything you share with them, including your booking and payment details.",
        "Our links to providers are affiliate links run by our affiliate network. The link carries our partner ID and the name of the page section you clicked (for example “deals”), so a booking can be credited to us. We don’t add your name, email or other personal details to these links. The network and the provider may set cookies on their own sites to record the referral.",
      ],
    },
    {
      heading: "Who we share data with",
      body: [
        "When our team books a flight for you, we share traveller details with the airline or travel provider that issues the ticket; they use them under their own privacy policy. Messages you send us on WhatsApp are carried by WhatsApp (Meta), under WhatsApp’s terms and privacy policy.",
        "We use trusted service providers to host the site (Vercel), deliver email (Resend), keep price alerts (Upstash, connected through Vercel) and, with your consent, measure site usage (Vercel Analytics). Our flight search and affiliate partner provides our live search and affiliate links and acts as an independent controller for the data its search widget and links collect. Contact us and we’ll tell you who it is and where to find its privacy policy. We don’t sell your personal data.",
        "Photos on the site load from Unsplash’s image servers, and airline logos from our affiliate network’s logo service. As with any image on the web, those servers receive your IP address and browser details when your browser fetches the picture. They don’t set cookies on our site, and we don’t send them anything else about you.",
        "Some of these providers may store data outside the UK, for example in the United States. Where they do, we rely on recognised safeguards such as the UK International Data Transfer Addendum or adequacy regulations.",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        [
          "Contact messages: up to 24 months, then deleted.",
          "Bookings made by our team: for as long as we need them to look after the booking and to meet our legal and accounting obligations, then deleted.",
          "Fare-alert emails: until you unsubscribe. We don’t keep sign-ups that aren’t confirmed: the confirmation link carries the address itself and expires after 7 days.",
          "Analytics: aggregated and anonymous, kept for reporting.",
          "Your cookie choice: 6 months, then we ask again.",
        ],
      ],
    },
    {
      heading: "Your rights",
      body: [
        "Under UK data protection law you can ask to access, correct or delete your personal data, object to or restrict how we use it, and ask for a copy in a portable format. You can withdraw consent for fare alerts at any time.",
        `To make a request, email ${site.email}. If you’re unhappy with how we handle your data, you can complain to the Information Commissioner’s Office (ico.org.uk).`,
      ],
    },
    {
      heading: "Changes and contact",
      body: [`We’ll update this page if anything changes and show the new date at the top. Questions? Email ${site.email}.`],
    },
  ],
};

export const terms: { intro: string; sections: LegalSection[] } = {
  intro: `These terms apply when you use ${site.url.replace("https://", "")} and when you ask our team to book a flight for you. By using the site you agree to them.`,
  sections: [
    {
      heading: "Who we are",
      body: [`${companyLine} “We”, “us” and “our” in these terms mean ${company.legalName}. Contact us at ${site.email} or on WhatsApp at ${site.phone.display}.`],
    },
    {
      heading: "What Wallet Flights does",
      body: [
        `${site.name} is a comparison service. We show flight prices and options from airlines and travel sites (“providers”) so you can compare them. We are not an airline and we don’t sell tickets on this website. When you book through a deal on the site, we are not a party to that booking.`,
        "If you prefer, our team can also book a flight for you by hand (see “Bookings made by our team” below).",
      ],
    },
    {
      heading: "Prices and information",
      body: [
        "Prices, availability, schedules and baggage information come from providers or are examples, and can change at any time. We work to keep information accurate but can’t guarantee it. The provider confirms the final price and conditions before you pay, and their terms apply to your booking.",
        "Fares shown on the homepage, deals, destination and route pages are the cheapest prices found recently by other travellers. They are not offers and may no longer be available; we hide a price rather than estimate one.",
      ],
    },
    {
      heading: "Booking with providers",
      body: [
        "When you select a deal, you are taken to the provider’s website. Your contract is with that provider. Questions about tickets, payments, changes, cancellations, refunds and baggage should go to them first.",
        "Some providers pay us a commission when you book through our links. This doesn’t affect the price you pay the provider.",
      ],
    },
    {
      heading: "Bookings made by our team",
      body: [
        "If you ask us on WhatsApp to book a flight for you, we make the booking with the airline or travel provider on your behalf. Before we book, we confirm the total price, the flights and the main fare rules (baggage, changes and refunds) with you, and we only book once you agree.",
        "Please check that every traveller’s name matches their passport and that you have the passports, visas and other documents your trip needs. The airline’s conditions of carriage and fare rules apply to your flights. If you need to change or cancel, contact us and we’ll ask the airline on your behalf; any change, cancellation or refund follows the fare rules and may carry the airline’s fees.",
      ],
    },
    {
      heading: "Hotels and car hire",
      body: [
        `The Hotels and Car hire links on our site go to our sister company, ${company.sister.name}. Bookings you make there are with ${company.sister.name}, under its own terms.`,
      ],
    },
    {
      heading: "Using the site",
      body: [
        [
          "Use the site for personal, non-commercial purposes.",
          "Don’t scrape, copy or resell our content or results without permission.",
          "Don’t try to disrupt, overload or gain unauthorised access to the site.",
        ],
      ],
    },
    {
      heading: "Our liability",
      body: [
        "We provide the site “as is”. To the extent the law allows, we aren’t liable for losses arising from a provider’s services, from price or availability changes, or from relying on example fares. Nothing in these terms limits liability that can’t be limited by law, or your statutory rights as a consumer.",
      ],
    },
    {
      heading: "Content and trademarks",
      body: [
        "Site design and text belong to Wicket Travel Limited. Photos are used under the Unsplash License and credited on our photo credits page. Airline and provider names belong to their owners and are used only to identify their services.",
      ],
    },
    {
      heading: "Changes, law and contact",
      body: [
        `We may update these terms and will show the date at the top. These terms are governed by the laws of England and Wales. Questions? Email ${site.email}.`,
      ],
    },
  ],
};

export const cookies: { intro: string; sections: LegalSection[] } = {
  intro: "This page explains the cookies and similar technologies used on Wallet Flights, and how to change your choice. Optional cookies are off until you allow them.",
  sections: [
    {
      heading: "Your choice",
      body: [
        "When you first visit, we ask whether you allow optional cookies. You can accept all, reject all, or choose by category, and change your mind at any time with “Cookie settings” at the bottom of every page. Rejecting doesn’t stop you using the site; live search on the Flights page just stays off until you allow it.",
      ],
    },
    {
      heading: "Necessary",
      body: [
        [
          "wf_consent — remembers your cookie choice. Set by Wallet Flights, kept for 6 months.",
          "wf_teaser (stored in your browser for this visit only, not a cookie) — remembers that we’ve shown you the fare calendar suggestion, so it appears at most once per visit. Cleared when you close the tab.",
        ],
        "These are needed for the site to work and don’t require consent.",
      ],
    },
    {
      heading: "Live flight search (optional)",
      body: [
        "Our Flights page shows live prices with a search widget from our flight search partner. It only loads after you allow this category. It sets:",
        [
          "tpwl_currency and tpwl_locale — remember the currency and language you picked in the search (up to 1 year).",
          "hide_hotels — remembers if you hid hotel suggestions.",
          "_sp_id and _sp_ses (Snowplow) — our partner’s measurement of searches and clicks, so bookings made through the search can be credited to us (about 13 months / 30 minutes).",
        ],
        "If you withdraw consent we delete these cookies from our domain and reload the page.",
      ],
    },
    {
      heading: "Analytics (optional)",
      body: [
        "With your consent we use Vercel Analytics and Speed Insights to count page views and measure page speed. They don’t set cookies or identify you, but we still ask first.",
      ],
    },
    {
      heading: "Images from other servers",
      body: [
        "Photos load from Unsplash’s image servers and airline logos from our affiliate network’s logo service. These don’t set cookies, but like any image on the web they receive your IP address and browser details when your browser fetches them. See “Who we share data with” in our privacy policy.",
      ],
    },
    {
      heading: "Affiliate links and provider sites",
      body: [
        "Links to airlines, travel sites, transfers, eSIMs and attractions go through our affiliate network to the provider. The network and the provider set their own cookies on their own sites to record that you came from Wallet Flights; those are covered by their cookie policies. Hotel and car hire links go straight to Wicket Travel Holidays, our owner’s travel site, which has its own cookie policy. We don’t set advertising cookies.",
      ],
    },
    {
      heading: "Managing cookies in your browser",
      body: [
        "You can also block or delete cookies in your browser settings. If you delete wf_consent, we’ll ask for your choice again.",
      ],
    },
    {
      heading: "Changes",
      body: [`If we add cookies, we’ll update this page and ask again where consent is needed. Questions? Email ${site.email}.`],
    },
  ],
};
