import { photos } from "../images";
import type { Guide } from "./types";

// Wave 2, post 3 (docs/SEO-CONTENT-PLAN.md): publish by mid-November for
// February half-term. Primary keyword: "cheap half term flights". Term-date
// and fine rules from GOV.UK (read 16 Oct 2026). No fare figures or
// "cheapest day" claims: advice on timing is reasoned from demand, as in the
// when-to-book guide, and labelled as our advice.
export const halfTermFlights: Guide = {
  slug: "half-term-flights",
  title: "Cheap half-term flights: when to book and how to pay less in school holidays",
  seoTitle: "Cheap half-term flights: when to book",
  excerpt:
    "Half-term fares rise because every family flies the same week. How to check your dates, when to book, where the savings are, and the rules on term-time trips.",
  topic: "booking",
  published: "2026-10-16",
  photo: photos.guideHalfTerm,
  summary: [
    "Half-term dates are set locally and differ across England, Wales, Scotland and Northern Ireland, so check your own school’s dates before you search.",
    "Book as soon as your dates are fixed and the fare looks reasonable: cheaper seats on peak holiday dates rarely come back.",
    "Flying a day earlier or later within the holiday, from a different airport, or to a less obvious destination usually saves more than waiting.",
    "Taking children out of school in term time can lead to a fine of £80 per parent, rising to £160 if it isn’t paid within 21 days.",
    "February half-term trips are best planned from November, while there’s still a choice of flights.",
  ],
  sections: [
    {
      heading: "Why half-term flights cost more",
      paragraphs: [
        "Airline prices follow demand, and half-term concentrates it: families across the country want to travel in the same week, often on the same Saturday. The cheapest seats on those flights sell first, and the price steps up as the plane fills. The same flights a week earlier or later, in term time, can be far cheaper because the demand isn’t there.",
        "That doesn’t mean every half-term fare is expensive. Popular routes from big airports sell out at the cheap end soonest, while less busy routes and departure days can stay reasonable for longer. The trick is knowing where to look.",
      ],
    },
    {
      heading: "Check your exact dates first",
      paragraphs: [
        "School term and holiday dates vary across the UK. In England and Wales, GOV.UK has a postcode tool that shows your local council’s term, half-term and holiday dates; Scotland and Northern Ireland have their own official pages. Check with your child’s school too, in case its dates differ.",
        "Your half-term may not be everyone’s. Where neighbouring areas break up on different weeks, demand is spread out, and the week that’s busiest for one area may be quieter for yours.",
      ],
      tip: "Write down the last school day and the first day back. A Friday evening flight after school or a Sunday return before Monday can widen the dates you can search.",
    },
    {
      heading: "When to book half-term flights",
      paragraphs: [
        "If your dates are fixed by the school calendar, booking early is the safer choice. Cheap seats on peak dates rarely come back, and a last-minute drop is a gamble that seldom pays in the busiest weeks. As a rule of thumb (our advice, not a guarantee):",
      ],
      list: [
        "February half-term: start searching in November and book once you see a fare you’re happy with",
        "May half-term: look from the start of the year, especially for European beach destinations",
        "October half-term: start in the spring or early summer for long-haul, a few months ahead for short-haul",
        "Christmas and the summer holidays: book as early as you can",
      ],
      tip: "If you book directly with an airline on a route to or from the US, the [24-hour rule](/travel-guides/24-hour-flight-cancellation-rule) may let you cancel for a full refund within a day if you find something better.",
    },
    {
      heading: "Seven ways to pay less in the school holidays",
      ordered: true,
      paragraphs: ["Small changes usually save more than waiting for a sale."],
      list: [
        "Shift by a day: fly out on the first Sunday or Monday instead of the Saturday, or return a day earlier",
        "Compare airports: try every London airport, and regional airports such as Manchester, Birmingham or Bristol if you can reach them",
        "Pick a less obvious destination: a short city break can cost far less than the most popular beach resort",
        "Try one-way tickets with different airlines out and back",
        "Count the bags: a family of four adding cabin bags to basic fares can change which flight is cheapest. See our guide to [hand luggage sizes and bag fees](/travel-guides/hand-luggage-sizes-bag-fees)",
        "Look at the month view on our route and destination pages when we have recent fares, to see which days tend to be cheaper",
        "Set a budget per person and book when a fare meets it, instead of waiting for the lowest price",
      ],
    },
    {
      heading: "Where to go for half-term",
      paragraphs: [
        "February is city-break and winter-sun season. Cities such as [Lisbon](/destinations/lisbon), [Rome](/destinations/rome) and [Barcelona](/destinations/barcelona) are mild and less crowded than in summer. Further afield, [Dubai](/destinations/dubai) is in its cooler season, and [Cancún](/destinations/cancun) suits a longer trip.",
        "In late May, southern Europe is warm without the July heat, and October half-term is a good time for [Istanbul](/destinations/istanbul) or [Cairo](/destinations/cairo). Our [shoulder season guide](/travel-guides/europe-shoulder-season) covers the best months for European cities.",
      ],
    },
    {
      heading: "Taking children out of school in term time",
      paragraphs: [
        "Booking a few days either side of half-term can be much cheaper, but it means missing school. In England, GOV.UK says your local council can give each parent a fine of £80, rising to £160 if it isn’t paid within 21 days. A second fine within 3 years is £160. If your child is off school three or more times within three years, you won’t be fined but may be taken to court, where the penalty can be a fine of up to £2,500, a community order or a jail sentence of up to 3 months.",
        "Councils set their own rules on when they fine, so check your council’s policy and talk to the school before booking.",
      ],
    },
    {
      heading: "Before you book",
      paragraphs: [
        "Check everyone’s passport, including children’s, well before the trip: European trips have rules on passport age and validity, explained in our guide to [EES and ETIAS](/travel-guides/ees-etias-uk-us-travellers). If anyone needs an ESTA for the US, apply as soon as you book; see [ESTA and the UK ETA](/travel-guides/esta-and-uk-eta).",
      ],
    },
  ],
  faqs: [
    {
      q: "When should I book February half-term flights?",
      a: "Start looking in November and book once you see a fare you’re happy with. Cheaper seats on peak school-holiday dates rarely come back closer to departure.",
    },
    {
      q: "Why are flights so expensive in half-term?",
      a: "Because demand peaks: families across the country want to fly the same week, so the cheapest seats sell first and prices rise as flights fill.",
    },
    {
      q: "How do I find my child’s half-term dates?",
      a: "In England and Wales, use GOV.UK’s school term dates tool with your postcode or check your council’s website. Scotland and Northern Ireland have their own official pages. Check with the school too.",
    },
    {
      q: "How much is the fine for a term-time holiday?",
      a: "In England, the council can fine each parent £80, rising to £160 if not paid within 21 days. A second fine within 3 years is £160, and repeated absences can lead to court instead.",
    },
    {
      q: "Is it cheaper to fly on the first day of half-term?",
      a: "Often not, because the first weekend is when most families want to fly. A day later, or a weekday within the holiday, is often better value, so compare a few dates.",
    },
  ],
  keywords: ["cheap half term flights", "february half term flights", "half term holiday deals flights", "school holiday flights", "term time holiday fine"],
  sources: [
    { label: "GOV.UK: School term and holiday dates", url: "https://www.gov.uk/school-term-holiday-dates" },
    { label: "GOV.UK: Legal action to enforce school attendance (fines)", url: "https://www.gov.uk/school-attendance-absence/legal-action-to-enforce-school-attendance" },
  ],
};
