import { photos } from "../images";
import type { Guide } from "./types";

// Batch 22, Agent B, guide 2 (docs/BATCH-22-BRIEF.md). Primary keyword: "jet
// lag tips". Health points only from the NHS (nhs.uk and NHS 111 Wales) and
// the CDC Yellow Book's jet lag chapter (found with WebSearch on 5 Nov 2026).
// Time differences are standard time-zone offsets. The day plans are our own
// suggestions and are labelled so. This guide is not medical advice.
export const jetLagTips: Guide = {
  slug: "jet-lag-tips",
  title: "Jet lag tips: how to adjust faster after a long flight",
  seoTitle: "Jet lag tips: what the NHS and CDC suggest",
  excerpt:
    "Jet lag tips based on NHS and CDC guidance: adjusting before you fly, using daylight, short trips, and why flying east usually feels harder than west.",
  topic: "flying",
  published: "2026-11-05",
  photo: photos.guideJetLag,
  summary: [
    "Jet lag can’t be prevented, but the NHS says it usually eases within a few days as your body clock adjusts.",
    "Switch to local time for sleep and meals as soon as you arrive, and limit caffeine and alcohol, as the NHS suggests.",
    "Light resets your body clock: the CDC’s guidance is morning light after flying east and later-day light after flying west.",
    "On a trip of only 2 or 3 days, the NHS suggests you could keep to home time instead of adjusting.",
    "The NHS says medicines aren’t usually needed, and melatonin isn’t recommended on the NHS for jet lag.",
  ],
  sections: [
    {
      heading: "The short answer: shift to local time, and use daylight",
      paragraphs: [
        "Jet lag happens when your body clock is still on the time zone you left. The NHS lists the usual symptoms: trouble sleeping at night and waking early, tiredness and drowsiness in the day, poor concentration and memory, and sometimes indigestion, nausea, changes in appetite or mild anxiety. It says jet lag can’t be prevented, but you can reduce its effects, and it usually gets better on its own within a few days.",
        "The two things that help most, according to the NHS and the CDC, are moving your sleep and meals to local time as quickly as you can, and getting daylight at the right time of day. The rest of this guide explains how. It’s general travel information, not medical advice: if you take regular medicine at set times, or have a condition affected by sleep, ask your doctor or pharmacist before you travel.",
      ],
    },
    {
      heading: "Why flying east feels harder",
      paragraphs: [
        "Your body clock finds it easier to run later than to run earlier. Flying west, from London to New York for example, you need to stay up later, which most people manage. Flying east, from New York to London or London to Tokyo, you need to fall asleep earlier than your body wants to.",
        "The CDC’s Yellow Book puts numbers on this: it cites the body clock adjusting by about 1.5 hours a day after flying west, against about 1 hour a day after flying east. The more time zones you cross, the longer it takes. A short hop of one or two hours, such as London to [Paris](/destinations/paris) or [Rome](/destinations/rome), barely registers for most people.",
      ],
      table: {
        caption: "Time difference and light timing for common long-haul trips (light timing from CDC guidance)",
        head: ["Trip", "Direction", "Time difference", "When to seek daylight on arrival"],
        rows: [
          ["[London to New York](/routes/london-to-new-york)", "West", "Usually 5 hours behind", "Afternoon and early evening"],
          ["[New York to London](/routes/new-york-to-london)", "East", "Usually 5 hours ahead", "Morning"],
          ["[London to Dubai](/destinations/dubai)", "East", "3 or 4 hours ahead, depending on UK clocks", "Morning"],
          ["[London to Tokyo](/routes/london-to-tokyo)", "East", "8 or 9 hours ahead, depending on UK clocks", "Morning"],
          ["[London to Sydney](/routes/london-to-sydney)", "East", "9 to 11 hours ahead, depending on both countries’ clocks", "Morning"],
          ["[Los Angeles to Paris](/routes/los-angeles-to-paris)", "East", "Usually 9 hours ahead", "Morning"],
        ],
      },
    },
    {
      heading: "Before you fly",
      paragraphs: [
        "The CDC suggests shifting your sleep by an hour a day in the 2 to 3 days before you leave: an hour earlier each night if you’re flying east, an hour later if you’re flying west. That gives you a head start of two or three hours without changing much at home.",
        "Choosing the right flight helps too. That part is our own advice, not from the NHS or CDC. Flying west, a daytime departure that lands in the afternoon or evening lets you stay up to a normal local bedtime. Flying east overnight, try to sleep on the plane so you arrive able to stay up through the first day. Compare departure and arrival times on the [fare calendar](/fare-calendar) or a route page before you book, and see our [first long-haul flight tips](/travel-guides/first-long-haul-flight-tips) for the flight itself.",
      ],
      tip: "A long flight split by a stopover gives your body a day to start adjusting. Our guide to [how long a layover you need](/travel-guides/how-long-a-layover) covers when a longer stop is worth it.",
    },
    {
      heading: "On the plane",
      paragraphs: [
        "Set your watch and phone to destination time when you board, and think in that time from then on. The NHS suggests limiting caffeine and alcohol, both of which can disturb sleep. Drink water, eat lightly, and sleep if it’s night at your destination.",
        "If it’s daytime at your destination when you’re in the air, our advice is to keep any nap short and stay awake for most of the flight, so you’re tired by local bedtime. Get up and walk now and then, which is good for long flights anyway.",
      ],
    },
    {
      heading: "When you arrive",
      paragraphs: [
        "The NHS advice is to change to the new time zone for sleeping and eating as quickly as possible after you arrive. Eat meals at local times even if you’re not hungry, and go to bed at a sensible local hour.",
        "Light is the strongest signal to your body clock. The CDC’s guidance is to seek bright light in the morning after flying east, and in the afternoon after flying west, and to get natural daylight at your destination. In practice, that means a morning walk on your first days in [Tokyo](/destinations/tokyo) or [Sydney](/destinations/sydney), and an afternoon outdoors on your first day in [New York](/destinations/new-york).",
      ],
      list: [
        "Get outside in daylight at the right time of day for your direction of travel",
        "Eat at local mealtimes from the first day",
        "Avoid long daytime naps; if you must, keep them short (our advice)",
        "Keep caffeine to the morning and go easy on alcohol",
        "Plan an easy first day without important meetings or long drives (our advice)",
      ],
      tip: "Don’t drive a long way on the day you land after an overnight flight. Tiredness and poor concentration are both listed NHS symptoms of jet lag. That’s our advice; consider a train or transfer instead.",
    },
    {
      heading: "Short trips: stay on home time",
      paragraphs: [
        "If you’re only away for 2 or 3 days, the NHS suggests you could try keeping to your usual eating and sleeping times rather than adjusting to the new time zone. By the time your body clock had shifted, you’d be flying home and starting again.",
        "This works best when the timing of your plans fits your home clock. A short work trip from London to New York, for example, has meetings in the New York morning and afternoon, which is the London afternoon and evening, so staying on UK time can be manageable. On a big time difference, such as London to Tokyo, it’s much harder.",
      ],
    },
    {
      heading: "Melatonin and sleeping tablets",
      paragraphs: [
        "The NHS says medicines aren’t usually needed for jet lag. It says melatonin isn’t recommended on the NHS for jet lag because there isn’t enough evidence that it works. NHS 111 Wales adds that sleeping tablets can be habit-forming and should only be used for a short time when symptoms are severe. If you’re thinking about either, speak to a GP or pharmacist first, and don’t take something new for the first time on a flight."
      ],
    },
  ],
  faqs: [
    {
      q: "How long does jet lag last?",
      a: "The NHS says it usually improves within a few days as your body adjusts. The CDC cites the body clock adjusting by about 1.5 hours a day after flying west and about 1 hour a day after flying east, so bigger time differences take longer.",
    },
    {
      q: "Is jet lag worse flying east or west?",
      a: "Usually east. You have to sleep earlier than your body wants to, and the CDC cites slower adjustment after eastward flights, about 1 hour a day against about 1.5 hours flying west.",
    },
    {
      q: "Should I sleep on the plane to avoid jet lag?",
      a: "Sleep if it’s night at your destination, and stay awake if it’s daytime there. Set your watch to destination time when you board. That’s our advice, built on the NHS suggestion to switch to local time as quickly as you can.",
    },
    {
      q: "Does melatonin help with jet lag?",
      a: "The NHS doesn’t recommend melatonin for jet lag, because there isn’t enough evidence that it works. Ask a GP or pharmacist before taking anything for jet lag.",
    },
    {
      q: "How do I get over jet lag fast?",
      a: "Switch to local time for sleep and meals straight away, get daylight at the right time (morning after flying east, afternoon after flying west, per the CDC), and limit caffeine and alcohol, as the NHS suggests.",
    },
  ],
  sources: [
    { label: "NHS: Jet lag", url: "https://www.nhs.uk/conditions/jet-lag/" },
    { label: "NHS 111 Wales: Jet lag", url: "https://111.wales.nhs.uk/jetlag/" },
    { label: "CDC Yellow Book: Jet lag disorder", url: "https://www.cdc.gov/yellow-book/hcp/travel-air-sea/jet-lag-disorder.html" },
  ],
  keywords: [
    "jet lag tips",
    "how to get over jet lag",
    "how long does jet lag last",
    "jet lag east or west",
    "jet lag melatonin",
    "how to avoid jet lag",
    "jet lag after long haul flight",
  ],
};
