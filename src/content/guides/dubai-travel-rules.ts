import { guidesDPhotos } from "../photos/guides-d";
import type { Guide } from "./types";

// Batch 22, Agent D, guide 5 (docs/BATCH-22-BRIEF.md). Primary keyword:
// "Dubai entry and customs rules for UK and US travellers". Entry rules from
// GOV.UK, the US State Department and the UAE Embassy in Washington; customs
// allowances from Dubai Customs' 2025 Passenger Customs Guide and u.ae;
// medicines from GOV.UK and the UAE Embassy; all found with WebSearch on 5 Nov
// 2026. Where official sources disagree (US length of stay, cigarette
// allowance) the guide says so instead of picking one. Advice that is ours is
// labelled.
export const dubaiTravelRules: Guide = {
  slug: "dubai-travel-rules",
  title: "Dubai travel rules for UK and US visitors: visas, customs and medicines",
  seoTitle: "Dubai travel rules: entry and customs for UK and US",
  excerpt:
    "What UK and US travellers need to enter Dubai: visa on arrival, passport validity, duty-free allowances, cash limits, medicines and the local laws to know.",
  topic: "documents",
  published: "2026-11-05",
  photo: guidesDPhotos.guideDubaiRules,
  summary: [
    "British and American citizens with a regular passport get a free visit visa on arrival in the UAE: there’s nothing to apply for in advance.",
    "Your passport must be valid for at least six months from the day you arrive.",
    "Dubai Customs allows up to 4 litres of spirits or 24 cans of beer, and gifts worth up to AED 3,000, duty-free for adults; cash over AED 60,000 must be declared.",
    "Some medicines that are normal in the UK and US are controlled in the UAE and need approval before you travel.",
    "Drinking in public, drugs (even traces) and photographing people without permission can lead to arrest.",
  ],
  sections: [
    {
      heading: "Do you need a visa for Dubai?",
      paragraphs: [
        "No, not in advance. GOV.UK says British citizens are given a free visit visa on arrival in the UAE, stamped in your passport at immigration. It lets you stay up to 90 days in any 180-day period, in one stay or several visits.",
        "US citizens with a regular passport marked M or F can also get a free visa on arrival. The US State Department and the UAE Embassy in Washington describe the length of stay differently: the State Department mentions personal travel of 30 days or less, while the embassy describes up to 90 days in 180. For a normal holiday this makes no difference; if you plan to stay longer than 30 days, check with the embassy before you go.",
        "The State Department also says the UAE doesn’t accept the 12-page US emergency passport or passports with an X marker, and that travellers with these will be refused boarding or entry. A visit visa doesn’t allow you to work.",
      ],
      table: {
        caption: "UAE entry rules for British and American visitors",
        head: ["", "British citizens", "US citizens"],
        rows: [
          ["Visa", "Free visit visa on arrival", "Free visa on arrival"],
          ["Length of stay", "Up to 90 days in any 180", "30 days (State Department) or 90 in 180 (UAE Embassy): check before a long stay"],
          ["Passport validity", "At least 6 months after arrival", "At least 6 months after arrival"],
          ["Not accepted", "Passports reported lost or stolen", "12-page emergency passports, X-marker passports"],
          ["Official page", "GOV.UK UAE entry requirements", "State Department UAE page"],
        ],
      },
    },
    {
      heading: "Passport validity: the six-month rule",
      paragraphs: [
        "Both GOV.UK and the State Department say your passport must be valid for at least six months from the date you arrive in the UAE. Airlines check this at the airport before you fly, so a passport with five months left can stop you boarding even though you’d be home long before it expires.",
        "The State Department also asks US travellers to hold a return or onward ticket. Our own advice: check your passport date the day you book, not the week you travel, because renewing takes time.",
      ],
      tip: "Look at the expiry date, then count six months back from it. If your Dubai trip starts after that point, renew before you go.",
    },
    {
      heading: "Customs: what you can bring in duty-free",
      paragraphs: [
        "Dubai Customs’ 2025 Passenger Customs Guide and the UAE government portal set out the duty-free allowances for arriving passengers. Alcohol and tobacco allowances apply only to travellers aged 18 and over.",
      ],
      list: [
        "Alcohol: up to 4 litres of spirits, or 2 cartons of beer (24 cans of up to 355 ml each)",
        "Tobacco: the Passenger Customs Guide and u.ae list 200 cigarettes, or 50 cigars, or 500 grams of tobacco; some older Dubai Customs pages list a higher figure, so take the lower one",
        "Gifts and personal goods: up to AED 3,000 in value; anything over that, or in commercial quantities, is dutiable",
        "Cash: travellers aged 18 or over must declare cash, cheques, precious metals or stones worth more than AED 60,000, online or in the Afseh app",
      ],
      tip: "Alcohol rules differ by emirate. GOV.UK says drinking or possessing alcohol is illegal in Sharjah, so don’t carry duty-free into Sharjah if you’re staying there.",
    },
    {
      heading: "Medicines: check before you pack",
      paragraphs: [
        "This is the rule that catches out the most visitors. GOV.UK says some prescription and over-the-counter medicines that are legal in the UK are controlled in the UAE, and that you must get approval in advance from the UAE Ministry of Health and Prevention to bring controlled medicines. You apply online, and without approval the medicine can be refused and you could be prosecuted.",
        "The UAE Embassy in Washington says ordinary prescription and over-the-counter medicines that aren’t controlled don’t need prior approval. Either way, carry the prescription, keep medicines in their original packaging, and bring only what you need for your trip.",
      ],
      list: [
        "Check whether each medicine is controlled before you travel, using the Ministry of Health’s list",
        "If it is, apply online for a permit and carry the approval with you",
        "Carry your prescription or a doctor’s letter for every prescription medicine",
        "Declare controlled medicines at customs when you arrive",
      ],
      ordered: true,
    },
    {
      heading: "Local laws visitors should know",
      paragraphs: [
        "GOV.UK’s UAE travel advice lists the laws that most often affect visitors. Drinking alcohol or being drunk in public is against the law everywhere in the UAE, even though licensed hotels and restaurants serve it. The UAE has zero tolerance for drugs: traces in your bloodstream count as possession, and some CBD products are banned.",
        "Taking photos of some government buildings and military sites is illegal, and you shouldn’t photograph people without their permission. Swearing and rude gestures, including online, can lead to a fine, prison or deportation, and public displays of affection can lead to arrest. Dress and behaviour rules are stricter during Ramadan, whose dates change each year.",
        "Check the FCDO’s or the State Department’s current advice for the UAE before you book and again before you fly. Advice for the Gulf can change at short notice, and GOV.UK warns that travelling against FCDO advice can invalidate your travel insurance.",
      ],
    },
    {
      heading: "Flying via Dubai or staying a few days",
      paragraphs: [
        "If you’re only changing planes at Dubai International and stay airside, you don’t pass through UAE immigration. If you leave the airport, the visa-on-arrival rules above apply, and Emirates’ Dubai Connect can include a hotel and visa on some long connections. Our guides to [stopovers and layovers](/travel-guides/stopover-vs-layover) and [how long a layover you need](/travel-guides/how-long-a-layover) explain the options.",
        "For the city itself, our [Dubai destination guide](/destinations/dubai) covers airports, neighbourhoods and the best time to go, and our [Abu Dhabi guide](/destinations/abu-dhabi) covers the UAE capital. Flight times are on the [London to Dubai](/routes/london-to-dubai), [Manchester to Dubai](/routes/manchester-to-dubai) and [New York to Dubai](/routes/new-york-to-dubai) route pages. If you’re heading for winter sun, our [winter sun guide](/travel-guides/winter-sun-destinations) compares Dubai with closer options.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do UK citizens need a visa for Dubai?",
      a: "No. GOV.UK says British citizens get a free visit visa on arrival, allowing up to 90 days in any 180-day period. Your passport must be valid for at least six months from the day you arrive.",
    },
    {
      q: "Do US citizens need a visa for Dubai?",
      a: "No. US citizens with a regular passport marked M or F get a free visa on arrival. The State Department mentions stays of 30 days or less, and the UAE Embassy up to 90 days in 180, so check before a longer trip.",
    },
    {
      q: "How much alcohol can I bring into Dubai?",
      a: "Dubai Customs allows adults up to 4 litres of spirits or 2 cartons of beer (24 cans) duty-free. Drinking in public is illegal across the UAE, and alcohol is banned in Sharjah.",
    },
    {
      q: "Can I take my prescription medicine to Dubai?",
      a: "Usually, but some medicines legal in the UK and US are controlled in the UAE and need approval from the Ministry of Health before you travel. Carry your prescription and keep medicines in their original packaging.",
    },
    {
      q: "How much cash can I take to Dubai?",
      a: "You can carry any amount, but travellers aged 18 or over must declare cash and similar items worth more than AED 60,000 to customs.",
    },
  ],
  keywords: [
    "dubai travel rules",
    "do i need a visa for dubai",
    "dubai visa on arrival uk",
    "dubai visa for us citizens",
    "dubai customs allowance",
    "how much alcohol can i bring into dubai",
    "medicines banned in dubai",
    "uae passport validity",
  ],
  // Found with WebSearch on 5 Nov 2026.
  sources: [
    { label: "GOV.UK: United Arab Emirates entry requirements", url: "https://www.gov.uk/foreign-travel-advice/united-arab-emirates/entry-requirements" },
    { label: "GOV.UK: United Arab Emirates safety and security (local laws)", url: "https://www.gov.uk/foreign-travel-advice/united-arab-emirates/safety-and-security" },
    { label: "US Department of State: United Arab Emirates international travel information", url: "https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/UnitedArabEmirates.html" },
    { label: "UAE Embassy in Washington: Visas for US citizens", url: "https://www.uae-embassy.org/visas-us-citizens" },
    { label: "UAE Embassy in Washington: Bringing medication into the UAE", url: "https://www.uae-embassy.org/permitted-prescriptionsdrugs-while-entering-uae" },
    { label: "Dubai Customs: Passenger Customs Guide (2025)", url: "https://www.dubaicustoms.gov.ae/en/OpenData/Publications/PassengerCustomsGuide.pdf" },
    { label: "UAE government portal: Customs clearance", url: "https://u.ae/en/information-and-services/visiting-and-exploring-the-uae/Tourist-services-and-information/Customs-clearance" },
    { label: "Emirates: Dubai Connect", url: "https://www.emirates.com/english/before-you-fly/dubai-international-airport/dubai-connect/" },
  ],
};
