// Policy text written for how the site works today: comparison only, no
// accounts, no payments, cookieless analytics, affiliate links to providers.
// TODO(confirm): add the registered company name and number once supplied,
// and have a qualified adviser review before launch.
import type { LegalSection } from "@/components/legal/legal-page";
import { site } from "./site";

export const legalUpdated = "12 October 2026";

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
          "Searches: the routes, dates and number of travellers you search for, which are processed to show results and are not linked to your identity.",
          "Technical data: anonymous, aggregated usage statistics (pages viewed, device type, country) from our privacy-friendly analytics, which does not use cookies.",
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
          "To keep the site secure, fix problems and understand which features help travellers (our legitimate interests).",
        ],
      ],
    },
    {
      heading: "When you go to a provider",
      body: [
        "When you select a deal, you leave Wallet Flights for the airline or travel site you chose. Their privacy policy applies to anything you share with them, including your booking and payment details. Some providers pay us a commission when you book; we share only the information needed to attribute that booking, not your personal details.",
      ],
    },
    {
      heading: "Who we share data with",
      body: [
        "We use trusted service providers to host the site, deliver email and measure site usage. They process data only on our instructions. We don’t sell your personal data.",
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
        "Fares shown on the homepage, deals and destination pages are examples for inspiration, not offers.",
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
  intro: "This page explains how cookies and similar technologies are used on Wallet Flights.",
  sections: [
    {
      heading: "Cookies we use",
      body: [
        "Wallet Flights doesn’t set advertising or tracking cookies. The site works without any non-essential cookies, so we don’t show a cookie banner.",
        "Our analytics are cookieless: they count page views in aggregate and don’t identify you or follow you across sites.",
      ],
    },
    {
      heading: "Cookies set by providers",
      body: [
        "When you select a deal, the airline, travel site or affiliate network you’re sent to may set its own cookies, for example to remember your booking or to record that you came from Wallet Flights. Those cookies are covered by the provider’s own cookie policy.",
      ],
    },
    {
      heading: "Managing cookies",
      body: [
        "You can block or delete cookies in your browser settings. Doing so won’t stop Wallet Flights from working, though some provider sites may not work as expected.",
      ],
    },
    {
      heading: "Changes",
      body: [`If we add any non-essential cookies in future, we’ll ask for your consent first and update this page. Questions? Email ${site.email}.`],
    },
  ],
};
