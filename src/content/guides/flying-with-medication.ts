import { guidesHPhotos } from "../photos/guides-h";
import type { Guide } from "./types";

// Batch H, guide 4. Primary keyword: "flying with medication". Not medical or
// legal advice: the guide only restates official pages and says so. Sourcing:
// UK hand-luggage and controlled-drug rules from GOV.UK; NHS advice on
// packaging, prescriptions and letters; US rules from the TSA's medication
// pages; all found with WebSearch on 6 Nov 2026. The UK CAA's packing page was
// found but its wording on medicines was not seen, so it is not cited. Country
// rules are not stated except through the existing Dubai guide (which covers
// the UAE medicine rules from GOV.UK and the UAE Embassy) and a pointer to
// GOV.UK foreign travel advice and embassies. No quantity limits are stated
// beyond those GOV.UK and the NHS give. Advice that is ours is labelled.
export const flyingWithMedication: Guide = {
  slug: "flying-with-medication",
  title: "Flying with medication: hand luggage, prescriptions and controlled drugs",
  seoTitle: "Flying with medication: UK and US hand luggage rules",
  excerpt:
    "What GOV.UK, the NHS and the TSA say about taking medicines in hand luggage, liquids over 100ml, prescriptions, letters and controlled drugs abroad.",
  topic: "flying",
  published: "2026-11-06",
  photo: guidesHPhotos.guideFlyingMedication,
  summary: [
    "This is not medical or legal advice. It restates what GOV.UK, the NHS and the TSA say, so read their pages and ask your doctor or pharmacist about your own medicines.",
    "In the UK, containers of up to 2 litres are allowed through airport security if they are for essential medical purposes, and security staff may need to open them.",
    "In the US, the TSA allows medically necessary liquids over 3.4 ounces in reasonable amounts, but you must tell the officer at the start of screening.",
    "Some medicines that are legal at home are controlled in other countries, so check the destination’s rules with its embassy before you travel.",
    "For medicines containing controlled drugs, GOV.UK says to carry a prescription or a letter from your clinician, and some trips need a licence.",
  ],
  sections: [
    {
      heading: "Read this first",
      paragraphs: [
        "We are a flight-information site, not a medical or legal service. We cannot say whether you may take a particular medicine to a particular country. What follows only restates official pages that we found on 6 November 2026; those pages are listed under Sources and can change.",
        "For your own medicines, ask your doctor, pharmacist or nurse, and check the rules of every country you will enter or change planes in.",
      ],
    },
    {
      heading: "The liquids rule and medicines in the UK",
      paragraphs: [
        "GOV.UK says you can take containers of up to 2 litres through security at any UK airport if they are for essential medical purposes, for special dietary requirements, or are baby food or baby milk. Security staff may need to open them to screen the contents, so pack them where they are easy to reach. Our [UK airport liquids rules guide](/travel-guides/uk-airport-liquids-rules) covers the ordinary 100ml rule.",
        "GOV.UK’s hand luggage pages also say you may be asked to show that liquid medicines are yours, for example with a copy of the prescription or a doctor’s letter. Tablets and capsules are not liquids, but they can still be checked at security.",
      ],
      tip: "Our advice: keep medicines, prescriptions and letters in a separate pouch near the top of your hand luggage, so you can show them without unpacking.",
    },
    {
      heading: "Medicines at US airports",
      paragraphs: [
        "The TSA says you can take medication in pill or solid form in unlimited amounts if it is screened, and that you can pack it in carry-on or checked bags. It strongly recommends carry-on, in case you need immediate access.",
        "For liquids, the TSA allows larger amounts of medically necessary liquids, gels and aerosols in reasonable quantities for your trip, over the usual 3.4 ounces (100ml). You must tell the officer before screening starts, and the TSA says to put them in a bin separate from your other things, along with related items such as freezer packs, pumps and syringes. You do not need to put them in a zip-top bag.",
        "The TSA says medically required liquids are subject to additional screening that may include being asked to open containers, and that the final decision rests with the officer. It does not require medicine to be in its original prescription bottle, but says some state laws on labelling may apply.",
      ],
      table: {
        caption: "Medicines in hand luggage at UK and US airports, as the official pages describe",
        head: ["", "UK (GOV.UK)", "US (TSA)"],
        rows: [
          ["Liquid medicines over 100ml", "Allowed in containers up to 2 litres if essential for medical purposes", "Allowed in reasonable amounts for the trip if medically necessary"],
          ["What you do at security", "Pack where easy to reach; staff may open containers", "Tell the officer first; use a separate bin; no zip-top bag needed"],
          ["Proof", "A prescription copy or doctor’s letter may be asked for", "Original bottle not required; state labelling laws may apply"],
          ["Pills and tablets", "Can still be checked at security", "Unlimited if screened; carry-on recommended"],
        ],
      },
    },
    {
      heading: "Prescriptions, letters and packaging",
      paragraphs: [
        "NHS advice is to keep medicines in their original labelled packaging and to carry a copy of your prescription. For some medicines, and for any going abroad, the NHS and GOV.UK say a letter from your prescriber is the usual way to show a medicine is yours. For controlled drugs, GOV.UK says the letter should include your name, the countries you are going to and when, a list of your medicines with doses, strengths and amounts, and the prescriber’s signature.",
      ],
      list: [
        "Original packaging with the pharmacy label",
        "A copy of your prescription",
        "A letter from your prescriber if the medicine is a controlled drug, or if you are unsure",
      ],
      tip: "Our advice: take a photo of each prescription and letter on your phone, and a printed copy in a different bag, in case one is lost. Our [lost or delayed luggage guide](/travel-guides/lost-or-delayed-luggage) explains why essentials belong in your hand luggage.",
    },
    {
      heading: "Controlled drugs and licences",
      paragraphs: [
        "GOV.UK says that if you leave the UK with a medicine that contains a controlled drug, you should be able to prove it is yours with a prescription or a letter from your clinician. It warns that you could be fined or go to prison if you travel with a medicine that is illegal in another country.",
        "For some controlled drugs, a trip longer than three months or a larger quantity needs a personal licence, and GOV.UK says to apply at least 15 working days before you travel. Which medicines count as controlled is shown on the GOV.UK guidance, not here. The NHS also says its prescriptions cover temporary stays abroad of up to three months, and that for longer trips it can only supply enough to travel safely and arrange supply abroad.",
      ],
    },
    {
      heading: "Country rules vary: check the destination",
      paragraphs: [
        "Countries differ on which medicines they allow in. GOV.UK tells travellers to check the destination’s rules with its embassy before they go, and publishes foreign travel advice for each country. The NHS says the same about every country you visit or pass through, including those where you only change planes.",
        "The United Arab Emirates is a well-known example. GOV.UK says some prescription and over-the-counter medicines that are legal in the UK are controlled there, and that you must get approval in advance for controlled medicines. Our [Dubai travel rules guide](/travel-guides/dubai-travel-rules) sets out what GOV.UK and the UAE Embassy say, and our [Dubai destination page](/destinations/dubai) has the basics for flights.",
      ],
    },
    {
      heading: "A short checklist",
      paragraphs: [
        "These steps are our advice, built from the official pages above.",
      ],
      list: [
        "Check the rules for your destination and any stopover country at least a few weeks ahead",
        "Pack medicines in your hand luggage, in original packaging, with a prescription copy or letter",
        "Bring enough for the whole trip, plus extra for delays",
        "At UK security, have liquid medicines ready to show; at US security, declare them first",
        "Keep a copy of your prescriptions separate from the medicines",
      ],
      tip: "If you are packing for hand luggage only, our [carry-on only checklist](/travel-guides/carry-on-only-checklist) shows how to fit essentials into one small bag.",
    },
  ],
  faqs: [
    {
      q: "Can I take liquid medicine over 100ml in hand luggage?",
      a: "GOV.UK says containers of up to 2 litres are allowed through UK airport security if they are for essential medical purposes. The TSA allows medically necessary liquids over 3.4 ounces in reasonable amounts, if you tell the officer first.",
    },
    {
      q: "Do I need a doctor’s letter to fly with medication?",
      a: "Not for every medicine. GOV.UK says that for medicines containing a controlled drug you should be able to prove they are yours with a prescription or a letter from your clinician. A copy of your prescription may also be asked for with liquids. Ask your doctor or pharmacist what you need.",
    },
    {
      q: "Do I have to keep medication in its original packaging?",
      a: "The NHS advises carrying medicines in their original labelled packaging. The TSA says it does not require original prescription bottles but that state labelling laws may apply.",
    },
    {
      q: "Is it better to put medication in hand luggage or checked luggage?",
      a: "The TSA allows both but strongly recommends carry-on, in case you need immediate access. Our advice is to keep them in hand luggage too, so a delayed bag does not leave you without them.",
    },
    {
      q: "Can I take my UK medicines to any country?",
      a: "No. Some medicines that are legal in the UK are controlled elsewhere, and GOV.UK says to check the destination’s rules with its embassy before you travel.",
    },
  ],
  sources: [
    { label: "GOV.UK: Hand luggage restrictions at UK airports, medicines and medical equipment", url: "https://www.gov.uk/hand-luggage-restrictions/essential-medicines-and-medical-equipment" },
    { label: "GOV.UK: Hand luggage restrictions at UK airports, liquids", url: "https://www.gov.uk/hand-luggage-restrictions/liquids" },
    { label: "GOV.UK: Take medicine in or out of the UK", url: "https://www.gov.uk/take-medicine-in-or-out-uk" },
    { label: "GOV.UK: Travelling with medicine containing controlled drugs", url: "https://www.gov.uk/guidance/controlled-drugs-personal-licences" },
    { label: "GOV.UK: Foreign travel advice", url: "https://www.gov.uk/foreign-travel-advice" },
    { label: "NHS: Can I take my medicine abroad?", url: "https://www.nhs.uk/common-health-questions/medicines/can-i-take-my-medicine-abroad/" },
    { label: "TSA: Liquid medications", url: "https://www.tsa.gov/travel/security-screening/whatcanibring/items/liquid-medications" },
    { label: "TSA: Medications (pills)", url: "https://www.tsa.gov/travel/security-screening/whatcanibring/items/medications-pills" },
    { label: "TSA: Disabilities and medical conditions", url: "https://www.tsa.gov/travel/tsa-cares/disabilities-and-medical-conditions" },
  ],
  keywords: ["flying with medication", "medication in hand luggage", "liquid medicine on plane", "travelling with prescription medicine", "controlled drugs abroad", "tsa medication rules", "uk hand luggage medicines"],
};
