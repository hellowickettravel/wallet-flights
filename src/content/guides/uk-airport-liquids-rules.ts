import { photos } from "../images";
import type { Guide } from "./types";

// Wave 1, post 4 (docs/SEO-CONTENT-PLAN.md). Primary keywords: "liquids rules
// uk airports", "100ml liquids rule". The airport table lists only airports
// whose own security page we read on 16 Oct 2026 (Birmingham's in a browser).
// Re-check monthly: airports are changing their rules as new scanners arrive.
export const ukLiquidsRules: Guide = {
  slug: "uk-airport-liquids-rules",
  title: "Liquids in hand luggage: which UK airports allow 2 litres, and which still say 100ml",
  seoTitle: "Liquids rules at UK airports in 2026",
  excerpt:
    "Some UK airports now let you carry liquids up to 2 litres; others still say 100ml. Airport-by-airport rules, the exemptions and the flight home.",
  topic: "baggage",
  published: "2026-10-16",
  photo: photos.guideLiquids,
  summary: [
    "UK liquids rules now depend on the airport you fly from, as GOV.UK says.",
    "Heathrow, Gatwick, Birmingham and Edinburgh let you carry containers of up to 2 litres, and the liquids can stay in your bag.",
    "Manchester and Stansted still allow only containers of 100ml or less, though they no longer need a plastic bag.",
    "Medicines, special dietary needs, and baby food or milk are allowed up to 2 litres at every UK airport.",
    "Pack for the strictest airport on your trip, including the airport you fly home from.",
  ],
  sections: [
    {
      heading: "Why the rules differ from airport to airport",
      paragraphs: [
        "For years, every UK airport used the same rule: liquids in containers of 100ml or less, in one small clear bag, taken out at security. That changed as airports installed new security scanners that can check liquids inside your bag. Airports with the new equipment and approval can allow bigger containers; the rest still use the old limit.",
        "GOV.UK now says liquids rules depend on the airport, and that you should check the rules for the airport you’re leaving from, any airport where you change planes, and the airport you fly home from. That last one is the one people forget.",
      ],
    },
    {
      heading: "UK airport liquids rules: airport by airport",
      paragraphs: [
        "These are the rules each airport publishes on its own security page. We checked every one on 16 October 2026; rules are changing, so check again shortly before you fly.",
      ],
      table: {
        caption: "Liquids rules at UK airports, from each airport’s own security page, checked 16 October 2026",
        head: ["Airport", "Largest container", "Plastic bag needed?", "Liquids stay in your bag?"],
        rows: [
          ["[London Heathrow](https://www.heathrow.com/at-the-airport/security-and-baggage/hand-baggage-and-liquids) (Terminals 2 to 5)", "2 litres", "No", "Yes"],
          ["[London Gatwick](https://www.gatwickairport.com/passenger-guides/security.html)", "Under 2 litres", "No", "Yes"],
          ["[Birmingham](https://www.birminghamairport.co.uk/important-updates-customer-advice-on-liquids-when-travelling-out-of-birmingham-airport/)", "2 litres", "No: leave them loose in your bag", "Yes"],
          ["[Edinburgh](https://www.edinburghairport.com/prepare/airport-security/liquids-food-items-electricals)", "2 litres", "No", "Yes"],
          ["[Manchester](https://www.manchesterairport.co.uk/help/passenger-guides/security)", "Under 100ml", "No", "Yes"],
          ["[London Stansted](https://www.stanstedairport.com/help/passenger-guides/security)", "Under 100ml", "No (except duty free, sealed at purchase)", "Yes"],
        ],
      },
      tip: "Flying from an airport that isn’t listed here? Assume 100ml containers in a clear bag until its own security page says otherwise.",
    },
    {
      heading: "Metal bottles and flasks",
      paragraphs: [
        "Even at airports that allow 2 litres, metal, insulated and double-walled bottles must be empty when you reach security. Heathrow, Gatwick, Birmingham and Edinburgh all say so, because the scanners can’t see through them. Empty yours before the queue and fill it up airside.",
      ],
    },
    {
      heading: "If your airport still uses the 100ml rule",
      paragraphs: [
        "GOV.UK sets out the traditional rule, which still applies at most airports that haven’t changed:",
      ],
      list: [
        "Each container must hold no more than 100ml, even if it’s only part full",
        "Where the airport asks for a bag, liquids go in one transparent, resealable plastic bag that holds no more than a litre and measures about 20cm by 20cm",
        "The bag must close properly, without being tied at the top",
        "One bag per person, shown at security",
        "Larger containers go in your checked luggage",
      ],
    },
    {
      heading: "Exemptions at every UK airport",
      paragraphs: [
        "GOV.UK says you can take containers of up to 2 litres through security at any UK airport if they are for essential medical purposes, for special dietary requirements, or are baby food or baby milk. Security staff may need to open them to screen the contents, so pack them where they’re easy to reach, and bring a copy of any prescription for medicines.",
        "Liquids you buy airside, such as duty free, are allowed if they’re sealed in a security bag with the receipt visible. Don’t open the bag until you reach your final destination, especially if you’re changing planes. Frozen liquids aren’t allowed in hand luggage at all.",
      ],
    },
    {
      heading: "Flying home: US, European and other airports",
      paragraphs: [
        "Your flight home is screened by a different airport with its own rules, so a 2-litre bottle that sailed through at Heathrow may be taken off you on the way back.",
        "At US airports, the TSA’s rule is containers of 3.4 ounces (100 millilitres) or less, in one quart-sized bag, with medicines and food for babies and young children exempt from the limit. Many airports in Europe and elsewhere still use a 100ml limit too, so check your return airport’s own security page before you pack.",
      ],
      tip: "The easy way to avoid surprises: decant toiletries into containers of 100ml or less and keep a clear bag in your hand luggage. That works at every airport on your trip.",
    },
    {
      heading: "What counts as a liquid",
      paragraphs: [
        "More than you’d think. Gels, pastes, creams, lotions, aerosols and liquid-food mixtures all count: toothpaste, mascara, lip gloss, hair gel, contact lens solution, soup and jam included. Solid alternatives, such as shampoo bars and solid deodorant, don’t count, which is one reason they’re popular with people who travel with only a cabin bag.",
        "Our [carry-on only checklist](/travel-guides/carry-on-only-checklist) covers what else to pack, and our guide to [power banks on planes](/travel-guides/power-bank-rules-on-planes) covers the other item security checks most often.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is the 100ml rule still in force at UK airports?",
      a: "At some. Heathrow, Gatwick, Birmingham and Edinburgh now allow containers of up to 2 litres, while Manchester and Stansted still allow only containers of 100ml or less. Check your airport’s own security page before you fly.",
    },
    {
      q: "Which UK airports allow 2 litres of liquid?",
      a: "Of the airports we checked on 16 October 2026: Heathrow (Terminals 2 to 5), Gatwick, Birmingham and Edinburgh. Other airports are changing as they install new scanners, so check yours.",
    },
    {
      q: "Do I still need a clear plastic bag for liquids?",
      a: "Not at the airports we checked: all six let liquids stay loose in your hand luggage. Airports that haven’t changed may still ask for one clear, resealable bag of up to a litre, so keep one with you.",
    },
    {
      q: "Can I bring liquids over 100ml on the flight back from the US?",
      a: "No. US airports use the TSA rule of 3.4 ounces (100ml) per container in one quart-sized bag, apart from medicines and food for babies and young children.",
    },
    {
      q: "Can I take a full water bottle through security?",
      a: "At airports that allow 2 litres, a plastic bottle of up to 2 litres is fine, but metal and insulated bottles must be empty. At 100ml airports, empty it before security and refill it airside.",
    },
  ],
  keywords: ["liquids rules uk airports", "100ml liquids rule", "liquids on plane uk", "100ml liquids heathrow", "100ml liquids manchester airport", "hand luggage rules for liquids"],
  sources: [
    { label: "GOV.UK: Liquids in hand luggage", url: "https://www.gov.uk/hand-luggage-restrictions/liquids" },
    { label: "Heathrow: Hand baggage and liquids", url: "https://www.heathrow.com/at-the-airport/security-and-baggage/hand-baggage-and-liquids" },
    { label: "Gatwick: Security", url: "https://www.gatwickairport.com/passenger-guides/security.html" },
    { label: "Birmingham Airport: Customer advice on liquids", url: "https://www.birminghamairport.co.uk/important-updates-customer-advice-on-liquids-when-travelling-out-of-birmingham-airport/" },
    { label: "Edinburgh Airport: Liquids, food items and electricals", url: "https://www.edinburghairport.com/prepare/airport-security/liquids-food-items-electricals" },
    { label: "Manchester Airport: Security", url: "https://www.manchesterairport.co.uk/help/passenger-guides/security" },
    { label: "London Stansted: Security", url: "https://www.stanstedairport.com/help/passenger-guides/security" },
    { label: "TSA: Liquids, aerosols and gels rule", url: "https://www.tsa.gov/travel/security-screening/liquids-aerosols-gels-rule" },
  ],
};
