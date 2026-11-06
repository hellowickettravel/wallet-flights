import { photos } from "../images";
import type { Guide } from "./types";

// Batch 22, Agent B, guide 1 (docs/BATCH-22-BRIEF.md). Primary keyword: "long
// haul flight tips". Health points from the UK CAA's passenger health FAQs,
// the CDC Yellow Book and NHS Fit for Travel; ESTA and ETA timing from CBP and
// GOV.UK (found with WebSearch on 5 Nov 2026). The timeline table and packing
// list are our own advice and are labelled so. Not medical advice.
export const firstLongHaulFlightTips: Guide = {
  slug: "first-long-haul-flight-tips",
  title: "First long-haul flight? Practical tips for 8 hours or more in the air",
  seoTitle: "Long-haul flight tips for your first big trip",
  excerpt:
    "Long-haul flight tips for first-timers: picking flight times, what to keep in your cabin bag, cabin air, moving about on board and arriving ready to go.",
  topic: "flying",
  published: "2026-11-05",
  photo: photos.guideLongHaul,
  summary: [
    "Sort the paperwork first: CBP advises applying for an ESTA at least 72 hours before you fly, and GOV.UK says a UK ETA can take up to 3 working days.",
    "Keep everything you need for the flight in one small bag under the seat: medicines, chargers, a layer, something for dry eyes and lips.",
    "Cabin air is dry, but the UK CAA says it doesn’t dehydrate you; water helps with the dryness, and too much tea, coffee or alcohol makes it worse.",
    "Get up and walk, and do simple leg exercises in your seat. If you’ve had a blood clot or recent surgery, speak to a doctor before you book.",
  ],
  sections: [
    {
      heading: "The short answer: plan the hours, not just the flight",
      paragraphs: [
        "A long-haul flight is usually anything over about six to eight hours, such as London to New York, Dubai or Singapore. What makes a first one hard isn’t the plane, it’s the length: hours in one seat, dry air, meals at odd times and arriving in a different time zone. Most of the discomfort can be planned away with a few choices made before you book and before you pack.",
        "This guide covers the practical side. Where we give a rule or a health point, it comes from an official source listed at the end. Where it’s simply what we’d do, we say so. Nothing here is medical advice: if you have a health condition, ask your doctor or pharmacist before a long flight.",
      ],
    },
    {
      heading: "Before you book: choose the flight that suits you",
      paragraphs: [
        "On most long-haul routes you can choose between a direct flight and one with a stop. A direct flight is shorter overall and there’s no connection to miss. A stop breaks the trip in two, which some people find easier, and is often cheaper. If you take a connection, book it on one ticket and leave enough time; our guide to [how long a layover you need](/travel-guides/how-long-a-layover) explains why.",
        "Departure time matters more than people expect. Overnight flights, common from the US to Europe and from Europe to Asia, let you try to sleep through much of the journey. Daytime flights westbound, such as London to New York, keep you awake in daylight and land in the afternoon or evening, which many people find easier to adjust to. Compare the options on a route page such as [London to Tokyo](/routes/london-to-tokyo), [London to Singapore](/routes/london-to-singapore) or [New York to Sydney](/routes/new-york-to-sydney) before you decide.",
        "Then check the paperwork. US Customs and Border Protection advises applying for an ESTA as early as possible and no less than 72 hours before you fly. GOV.UK says most UK ETA decisions come within a day but can take up to 3 working days. Our [ESTA and UK ETA guide](/travel-guides/esta-and-uk-eta) covers both.",
      ],
      tip: "Choose your seat when you book or as soon as seat selection opens. On a long flight, aisle or window is a real choice; our guide to the [best seat on a plane](/travel-guides/best-seat-on-a-plane) helps you pick.",
    },
    {
      heading: "What to keep with you in the cabin",
      paragraphs: [
        "Pack one small bag that fits under the seat in front, with everything you’ll want during the flight, so you’re not reaching into the overhead locker for hours. This is our own list, built from what we’ve found useful.",
      ],
      list: [
        "Passport, boarding pass, and any travel authorisation or visa printed or saved offline",
        "Medicines you take, in their original packaging, plus a copy of any prescription",
        "Phone, charger and a power bank, which must travel in the cabin, not the hold; see our [power bank rules](/travel-guides/power-bank-rules-on-planes)",
        "A warm layer and socks: cabins can feel cool, especially at night",
        "Lip balm, moisturiser and eye drops for the dry air; glasses if you wear contact lenses",
        "An empty water bottle to fill after security",
        "Earplugs or headphones and an eye mask if you want to sleep",
        "A pen for any arrival forms",
      ],
      tip: "Liquids in your hand luggage follow the rules of the airport you leave from. Check our [UK airport liquids guide](/travel-guides/uk-airport-liquids-rules) before you pack toiletries.",
    },
    {
      heading: "Cabin air, ears and staying comfortable",
      paragraphs: [
        "Aircraft cabins are dry. The UK Civil Aviation Authority says cabin humidity is typically 10 to 20%, against 40 to 50% in buildings. It also says this doesn’t dehydrate you: the extra fluid you lose is about 150ml over an 8-hour flight, which your body normally makes up without trouble. What you do feel is dryness in your lips, mouth and eyes.",
        "The CAA suggests moisturiser and lubricating eye drops for that, and says contact lens wearers may find their eyes dry out, so take lenses out before you sleep on board. It notes that drinking a lot of tea, coffee or alcohol can make the symptoms worse, and that water is the simpler choice.",
        "For your ears, the CAA says it helps to swallow, chew or yawn now and then as the plane descends, to avoid ear or sinus pain.",
      ],
    },
    {
      heading: "Moving about and blood clots",
      paragraphs: [
        "Sitting still for a long time slows blood flow in the legs, which is why long flights carry a small risk of a blood clot (deep vein thrombosis, or DVT). The CDC’s travel health guidance says the risk on flights under four hours is negligible and, for longer flights, small for most people. The CAA suggests walking around the cabin when it’s safe and doing simple lower-leg exercises in your seat.",
        "NHS Fit for Travel says the vast majority of passengers don’t need any medicine to prevent DVT on long-haul flights. People with a higher risk, such as those who’ve had a clot before or recent surgery, should get medical advice before they travel. The CAA adds that routine aspirin use can’t be recommended. If you notice pain or swelling in one leg after a flight, get medical help promptly.",
        "These are our own habits on a long flight, in line with the CAA’s advice:",
      ],
      list: [
        "Circle your ankles and press your feet up and down every so often",
        "Walk the aisle when the seat-belt sign is off",
        "Drink water with your meals and between them",
        "Keep your seat belt loosely fastened while seated, so turbulence doesn’t catch you out",
      ],
    },
    {
      heading: "A simple long-haul timeline",
      paragraphs: [
        "This is the order we’d work in for a first long-haul trip. It’s our own checklist, with the official timings marked.",
      ],
      table: {
        caption: "Long-haul preparation timeline (Wallet Flights’ advice, with official timings noted)",
        head: ["When", "What to do"],
        rows: [
          ["When you book", "Check passport validity and entry rules for every country on the trip, including connections"],
          ["At least 3 working days before", "Apply for a UK ETA if you need one (GOV.UK: decisions can take up to 3 working days)"],
          ["At least 72 hours before", "Apply for an ESTA if you’re flying to the US (CBP’s advice)"],
          ["24 to 48 hours before", "Check in online, confirm your seat and download boarding passes"],
          ["The day you fly", "Get to the airport in good time; see [how early to get to the airport](/travel-guides/how-early-to-get-to-the-airport)"],
          ["On board", "Set your watch to destination time, drink water, walk when you can"],
          ["On arrival", "Get daylight and stay up until a sensible local bedtime"],
        ],
      },
    },
    {
      heading: "When you land",
      paragraphs: [
        "Arrival is when a first long-haul trip can feel hardest: immigration queues, a new currency and a body clock that thinks it’s the middle of the night. Keep the first day light. Our [jet lag tips](/travel-guides/jet-lag-tips) explain what the NHS and CDC suggest for adjusting to a new time zone.",
        "Before you go, read the guide to your destination, such as [Tokyo](/destinations/tokyo), [Singapore](/destinations/singapore) or [Sydney](/destinations/sydney), for getting from the airport into the city and what to sort on day one.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do you survive a long-haul flight?",
      a: "Pick a flight time and seat that suit you, keep what you need in a small bag under the seat, drink water, walk the aisle when you can and do simple leg exercises. Set your watch to destination time once you board.",
    },
    {
      q: "Does flying dehydrate you?",
      a: "Not in a meaningful way, according to the UK CAA. Cabin air is dry, but the extra fluid you lose is about 150ml over an 8-hour flight. You may feel dry lips and eyes, which water, moisturiser and eye drops help with.",
    },
    {
      q: "Do I need flight socks on a long-haul flight?",
      a: "NHS Fit for Travel says most passengers don’t need medicine to prevent DVT, and the CAA recommends walking and leg exercises. If you’ve had a clot before, recent surgery or another risk factor, ask your doctor whether stockings or anything else would help.",
    },
    {
      q: "Should I sleep on a long-haul flight?",
      a: "If it’s night at your destination, try to. If it’s daytime there, a short nap is fine but staying awake can make the first night easier. That’s our advice; the NHS and CDC guidance on jet lag is in our jet lag guide.",
    },
    {
      q: "How do I stop my ears hurting on a plane?",
      a: "The UK CAA suggests swallowing, chewing or yawning from time to time as the plane descends, which helps equalise the pressure in your ears and sinuses.",
    },
  ],
  sources: [
    { label: "UK Civil Aviation Authority: The aircraft cabin, your health and comfort", url: "https://www.caa.co.uk/passengers-and-public/passenger-guidance/health-guidance/health-information-for-passengers/passenger-health-faqs-the-aircraft-cabin-your-health-and-comfort/" },
    { label: "UK Civil Aviation Authority: Air travel and your health", url: "https://www.caa.co.uk/air-passengers/about-your-trip/health-and-medical/air-travel-and-your-health/" },
    { label: "CDC Yellow Book: Deep vein thrombosis and pulmonary embolism", url: "https://www.cdc.gov/yellow-book/hcp/travel-air-sea/deep-vein-thrombosis-and-pulmonary-embolism.html" },
    { label: "NHS Fit for Travel: Deep vein thrombosis", url: "https://fitfortravel.nhs.uk/advice/general-travel-health-advice/deep-vein-thrombosis" },
    { label: "US Customs and Border Protection: Allow 72 hours for ESTA", url: "https://www.cbp.gov/newsroom/national-media-release/cbp-reminds-travelers-allow-72-hours-esta" },
    { label: "GOV.UK: Apply for an electronic travel authorisation (ETA)", url: "https://www.gov.uk/eta/apply" },
  ],
  keywords: [
    "long haul flight tips",
    "first long haul flight",
    "how to survive a long haul flight",
    "what to pack for a long flight",
    "long haul flight essentials",
    "dvt on long flights",
    "does flying dehydrate you",
  ],
};
