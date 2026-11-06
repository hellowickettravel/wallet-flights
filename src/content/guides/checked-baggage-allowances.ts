import { photos } from "../images";
import type { Guide } from "./types";

// Batch 22, guides agent C. Primary keyword: "checked baggage allowance".
// Weights and sizes from each airline's own baggage pages and the UK CAA,
// found on 5 to 6 Nov 2026. No bag fees are quoted: they vary by route and
// date, and change often. Readers are told to check their own booking.
export const checkedBaggageAllowances: Guide = {
  slug: "checked-baggage-allowances",
  title: "Checked baggage allowances: weights, sizes and what your fare includes",
  seoTitle: "Checked baggage allowance: weights and sizes",
  excerpt:
    "How much a checked bag can weigh, how big it can be, and which fares include one, with the limits British Airways, Virgin, US and low-cost airlines publish.",
  topic: "baggage",
  published: "2026-11-05",
  photo: photos.guideCheckedBaggage,
  summary: [
    "On most full-service airlines, a standard checked bag in economy can weigh up to 23kg (50lb); premium cabins often allow 32kg (70lb).",
    "Many airlines cap a single bag at 32kg, and British Airways, easyJet and Ryanair all refuse bags heavier than that.",
    "The cheapest fares often include no checked bag at all, including Virgin Atlantic’s Economy Light and most low-cost tickets.",
    "The UK Civil Aviation Authority says allowances can differ between routes on the same airline, so check the allowance shown on your booking.",
    "Adding a bag when you book is usually cheaper than paying at the airport.",
  ],
  sections: [
    {
      heading: "The short version: 23kg is the usual standard",
      paragraphs: [
        "There’s no single law that sets checked baggage allowances; each airline sets its own. But on full-service airlines, the figures cluster around the same numbers. A standard economy bag is usually 23kg, or 50lb on US airlines, and the bag’s length, width and height added together usually can’t exceed 158cm (62 inches). Business and first class often allow heavier bags of 32kg (70lb).",
        "Low-cost airlines work differently: no hold bag is included, and you choose a weight when you pay for one. The table below shows what each airline publishes on its own site.",
      ],
      table: {
        caption: "Standard checked bag limits from each airline’s own baggage page (checked November 2026)",
        head: ["Airline", "Economy bag weight", "Size limit", "Heaviest bag accepted"],
        rows: [
          ["[British Airways](https://www.britishairways.com/content/information/baggage-essentials)", "23kg", "90 x 75 x 43cm", "32kg"],
          ["[Virgin Atlantic](https://help.virginatlantic.com/us/en/baggage/check-in-baggage-allowance.html)", "23kg (Economy Classic and Delight; Economy Light has no free bag)", "90 x 75 x 43cm", "Overweight bags pay a fee"],
          ["[United](https://www.united.com/CMS/en-US/travel/Pages/CheckedBaggage.aspx/a)", "50lb (23kg)", "62 linear inches", "100lb"],
          ["[American](https://www.aa.com/web/i18n/travel-info/baggage/checked-baggage-policy.html)", "50lb (23kg)", "62 linear inches (158cm)", "100lb"],
          ["[Delta](https://www.delta.com/us/en/baggage/overview)", "50lb (23kg)", "62 linear inches", "Under 100lb"],
          ["[easyJet](https://www.easyjet.com/en/help/baggage/hold-luggage)", "15kg or 23kg, paid", "Up to 275cm in total per bag", "32kg"],
          ["[Ryanair](https://help.ryanair.com/hc/en-gb/articles/360017825598-20kg-Check-in-Bag)", "10kg or 20kg, paid", "80 x 120 x 120cm (20kg bag)", "32kg"],
        ],
      },
      tip: "Linear inches means length plus width plus height, including wheels and handles. A suitcase of 30 x 20 x 12 inches is 62 linear inches, right on the limit.",
    },
    {
      heading: "What your fare actually includes",
      paragraphs: [
        "Airlines sell economy in tiers, and the checked bag is usually the first thing removed from the cheapest one. Virgin Atlantic’s Economy Light, for example, doesn’t include a free checked bag; Economy Classic and Economy Delight include one bag of up to 23kg. British Airways also sells economy fares with and without a checked bag, and its premium cabins include more: two 23kg bags in premium economy and two 32kg bags in business.",
        "The UK Civil Aviation Authority (CAA) warns that your fare may not include hold luggage, that the airline won’t add it automatically, and that allowances can vary across destinations on the same airline. Its own example is one airline allowing 15kg on flights to Tenerife but 23kg to Florida.",
        "So before comparing fares, decide how many bags you’re taking, then compare the total price with those bags added.",
      ],
      tip: "Bag fees may be charged per flight, not per trip, the CAA says. A return trip with a connection each way can mean paying for the same bag four times, so add it up before you book.",
    },
    {
      heading: "Weight: per bag, not per passenger",
      paragraphs: [
        "On most airlines the weight limit applies to each bag separately. British Airways says the 23kg limit can’t be split between bags: two bags of 15kg and 31kg isn’t the same as two of 23kg. A bag between 23kg and 32kg pays a heavy bag charge if you’re over your allowance, and no bag may weigh more than 32kg.",
        "easyJet is an exception: passengers on the same booking can pool their hold allowance across bags, as long as no single bag weighs more than 32kg. You can also add extra weight online in 3kg steps.",
        "Treat 32kg as a hard ceiling in Europe. Ryanair says it doesn’t accept any single item heavier than 32kg for safety reasons, and United doesn’t accept checked bags over 100lb (about 45kg) at all.",
      ],
    },
    {
      heading: "Overweight and oversize bags",
      paragraphs: [
        "If your bag goes over the weight or size limit, you’ll usually pay a fee at the airport, and it can be more than the cost of a second bag. The airlines handle it differently:",
      ],
      list: [
        "Delta charges separately for each limit a bag breaks, so a bag that’s both too big and too heavy pays two fees",
        "American charges the higher of the oversize or overweight fee, plus the normal checked bag fee",
        "easyJet charges an excess weight fee per kilogram, and it costs less to add weight online before you fly",
        "British Airways accepts some larger items, up to 190 x 75 x 65cm, as part of your allowance, but they must go to the oversize bag drop at least 90 minutes before the flight",
      ],
      tip: "Our advice: weigh your bag at home with a luggage scale, and pack heavy items such as shoes in your cabin bag if your hand luggage allowance has room.",
    },
    {
      heading: "Status, families and connecting flights",
      paragraphs: [
        "Frequent flyer status can add bags. Virgin Atlantic gives Flying Club Silver and Gold members an extra 23kg bag on flights it operates, and United gives its Premier members free bags on many routes. Infants travelling on a parent’s lap often get their own allowance: British Airways includes a 23kg checked bag for an infant without a seat.",
        "On a journey with more than one airline, check every flight. British Airways says the allowance on connecting journeys is generally set by the airline operating the longest flight, which may not be the airline you booked with. Separate tickets are worse still, as each airline applies its own rules and you may pay for the bag twice. Our guide to [self-transfer flights on separate tickets](/travel-guides/self-transfer-separate-tickets) explains the risks.",
      ],
    },
    {
      heading: "What can’t go in a checked bag",
      paragraphs: [
        "Some things must stay with you in the cabin. Power banks and spare lithium batteries are banned from the hold, so take them in your hand luggage; see our guide to [power bank rules on planes](/travel-guides/power-bank-rules-on-planes). Keep medicines, passports, keys and valuables with you too, in case your bag is delayed.",
        "If you’d rather avoid checked bags altogether, our [hand luggage sizes and bag fees guide](/travel-guides/hand-luggage-sizes-bag-fees) compares cabin allowances, and our [carry-on only checklist](/travel-guides/carry-on-only-checklist) shows how to pack for two weeks in a cabin bag. And if your bag doesn’t arrive, see [what to do about lost or delayed luggage](/travel-guides/lost-or-delayed-luggage).",
        "Flying long-haul, such as [London to New York](/routes/london-to-new-york) or to [Dubai](/destinations/dubai), you’ll usually find a 23kg bag included on standard economy fares; on short European trips like [London to Lisbon](/routes/london-to-lisbon), expect to pay for one.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the standard checked baggage allowance?",
      a: "On most full-service airlines it’s one or two bags of up to 23kg (50lb) each in economy, with a size limit of about 158cm (62 linear inches). Low-cost airlines usually include no hold bag and sell 15kg to 23kg options.",
    },
    {
      q: "What is the maximum weight for a checked bag?",
      a: "British Airways, easyJet and Ryanair don’t accept any single bag over 32kg. US airlines such as United and American accept bags up to 100lb, with overweight fees above 50lb.",
    },
    {
      q: "Can I put 30kg in one bag and 16kg in another?",
      a: "Usually not. British Airways says its 23kg limit applies to each bag and can’t be split. easyJet is an exception: it lets passengers on one booking pool their weight, as long as no bag is over 32kg.",
    },
    {
      q: "Is a checked bag included on transatlantic flights?",
      a: "Often, but not always. Virgin Atlantic’s Economy Classic includes one 23kg bag while Economy Light includes none, and British Airways sells economy fares with and without a bag. Check what your fare includes before you book.",
    },
    {
      q: "Is it cheaper to add a checked bag online?",
      a: "Yes. The CAA says paying for extra baggage at the airport usually costs more, and easyJet says adding extra weight online before you fly is cheaper than paying at the airport.",
    },
  ],
  sources: [
    { label: "UK Civil Aviation Authority: Checking your baggage allowance", url: "https://www.caa.co.uk/air-passengers/about-your-trip/baggage/checking-your-baggage-allowance/" },
    { label: "British Airways: Baggage essentials", url: "https://www.britishairways.com/content/information/baggage-essentials" },
    { label: "British Airways: My bag weighs over 23kg", url: "https://www.britishairways.com/travel/helpcentre/public/en_gb/faq/content/baggage/bag-weighs-over-23kg" },
    { label: "Virgin Atlantic: Check in baggage, additional and overweight", url: "https://help.virginatlantic.com/us/en/baggage/check-in-baggage-allowance.html" },
    { label: "United: Checked baggage", url: "https://www.united.com/CMS/en-US/travel/Pages/CheckedBaggage.aspx/a" },
    { label: "American Airlines: Checked bag policy", url: "https://www.aa.com/web/i18n/travel-info/baggage/checked-baggage-policy.html" },
    { label: "Delta: Excess and overweight baggage", url: "https://www.delta.com/us/en/baggage/checked-baggage/excess-overweight-baggage" },
    { label: "easyJet: Hold luggage", url: "https://www.easyjet.com/en/help/baggage/hold-luggage" },
    { label: "Ryanair: 20kg Check-in Bag", url: "https://help.ryanair.com/hc/en-gb/articles/360017825598-20kg-Check-in-Bag" },
  ],
  keywords: ["checked baggage allowance", "checked bag weight limit", "23kg baggage allowance", "maximum checked bag weight", "checked bag size", "linear inches checked bag", "hold luggage allowance", "overweight baggage"],
};
