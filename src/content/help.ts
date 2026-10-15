import { site } from "./site";

export type HelpTopic = { id: string; title: string; items: { q: string; a: string }[] };

export const helpTopics: HelpTopic[] = [
  {
    id: "using",
    title: "Using Wallet Flights",
    items: [
      { q: "What is Wallet Flights?", a: "A flight comparison site. We show prices from airlines and travel sites in one list, sorted from cheapest to most expensive, so you can choose the best deal and book it with that provider." },
      { q: "Is it free to use?", a: "Yes. Searching and comparing is free and you don’t need an account." },
      { q: "How are results sorted?", a: "By price, cheapest first. You can switch to Fastest, or Best, which balances price and journey time, and filter by stops, airline, departure time and price." },
      { q: "Can I search multi-city trips?", a: "Yes. Choose Multi-city in the search box and add up to five flights." },
    ],
  },
  {
    id: "prices",
    title: "Prices and deals",
    items: [
      { q: "Why did the price change on the provider’s site?", a: "Fares change quickly as seats sell. The provider confirms the final price, including taxes and fees, before you pay. If it’s higher than you expected, go back and compare other deals." },
      { q: "Which currency are prices shown in?", a: "In the currency of the city you’re flying from: pounds for UK departures and US dollars for US departures." },
      { q: "Are the fares on the homepage live?", a: "They’re the cheapest prices other travellers found in the last few days, refreshed about every hour. They can sell out or change, so search your dates to compare current prices. Routes without a recent fare show no price." },
      { q: "Do prices include baggage?", a: "It depends on the fare. Each result shows whether a cabin bag and checked bag are included; the provider confirms the details before you pay." },
    ],
  },
  {
    id: "booking",
    title: "Booking with a provider",
    items: [
      { q: "Who do I pay?", a: "The provider you choose: an airline or a travel site. Wallet Flights doesn’t take payments or issue tickets." },
      { q: "I haven’t received my confirmation email", a: "Check your spam folder first, then contact the provider you booked with; they issue the confirmation and e-ticket." },
      { q: "How do I change or cancel my booking?", a: "Contact the provider you booked with, as they manage your booking and apply the fare rules. If you can’t tell which provider it was, send us your route and dates and we’ll help." },
      { q: "Can I add bags, seats or special assistance?", a: "Usually, through the provider or the airline’s ‘manage booking’ page after you book." },
    ],
  },
  {
    id: "privacy",
    title: "Privacy, alerts and contact",
    items: [
      { q: "How do I unsubscribe from fare alerts?", a: "Fare alerts haven’t launched yet. When they do, every fare-alert email will have an unsubscribe link at the bottom. You can also email us at any time and we’ll remove you." },
      { q: "What do you do with my data?", a: "We only collect what you send us, such as your email for fare alerts or a contact message. See our privacy policy for the details." },
      { q: "How can I contact you?", a: `Email ${site.email} or use the contact form. ${site.responseTime}.` },
    ],
  },
];
