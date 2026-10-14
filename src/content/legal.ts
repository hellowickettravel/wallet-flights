// Policy text written for how the site works today: comparison only, no
// accounts, no payments, consent-gated live search (Travelpayouts White Label)
// and analytics, affiliate links to providers via Travelpayouts.
// TODO(confirm): add the registered company name and number once supplied,
// and have a qualified adviser review before launch.
import type { LegalSection } from "@/components/legal/legal-page";
import { site } from "./site";

export const legalUpdated = "15 October 2026";

export const privacy: { intro: string; sections: LegalSection[] } = {
  intro: `This policy explains what personal data ${site.name} collects, why, and the choices you have. ${site.name} is based in ${site.location} and is the controller of the data described here.`,
  sections: [
    {
      heading: "What we collect",
      body: [
        "We only collect the information you choose to send us, and basic technical data needed to run the site:",
        [
          "Contact form: your name, email address, the topic you chose and your message.",
          "Fare alerts: your email address.",
          "Searches: the routes, dates and number of travellers you search for. Live search on our Flights page is run by our flight search partner, which receives your search, IP address and device information to find prices, and measures searches and bookings with its own cookies. It only loads if you allow “Live flight search” cookies.",
          "Technical data: if you allow analytics, aggregated usage statistics (pages viewed, device type, country, page speed) from Vercel Analytics, which doesn’t identify you.",
          "Your cookie choice, stored in a cookie on your device.",
        ],
        "We don’t ask for or store payment details. You pay providers directly on their own websites.",
      ],
    },
    {
      heading: "How and why we use it",
      body: [
        [
          "To reply to your messages (our legitimate interest in answering enquiries).",
          "To send fare alerts you asked for (your consent, which you can withdraw at any time).",
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
        "We use trusted service providers to host the site (Vercel), deliver email (Resend) and, with your consent, measure site usage (Vercel Analytics). Our flight search and affiliate partner provides our live search and affiliate links and acts as an independent controller for the data its search widget and links collect. Contact us and we’ll tell you who it is and where to find its privacy policy. We don’t sell your personal data.",
        "Some of these providers may store data outside the UK, for example in the United States. Where they do, we rely on recognised safeguards such as the UK International Data Transfer Addendum or adequacy regulations.",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        [
          "Contact messages: up to 24 months, then deleted.",
          "Fare-alert emails: until you unsubscribe.",
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
  intro: `These terms apply when you use ${site.url.replace("https://", "")}. By using the site you agree to them.`,
  sections: [
    {
      heading: "What Wallet Flights does",
      body: [
        `${site.name} is a comparison service. We show flight prices and options from airlines and travel sites (“providers”) so you can compare them. We are not an airline or a travel agent, we don’t sell tickets, and we are not a party to any booking you make.`,
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
        "Site design and text belong to Wallet Flights. Photos are used under the Unsplash License and credited on our photo credits page. Airline and provider names belong to their owners and are used only to identify their services.",
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
        ["wf_consent — remembers your cookie choice. Set by Wallet Flights, kept for 6 months."],
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
      heading: "Affiliate links and provider sites",
      body: [
        "Links to airlines, travel sites, hotels, car rental, transfers, eSIMs and attractions go through our affiliate network to the provider. The network and the provider set their own cookies on their own sites to record that you came from Wallet Flights; those are covered by their cookie policies. We don’t set advertising cookies.",
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
