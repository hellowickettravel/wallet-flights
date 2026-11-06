import { guidesGPhotos } from "../photos/guides-g";
import type { Guide } from "./types";

// Batch G (6 Nov 2026). Primary keyword: "is it worth paying for seat
// selection". Sourcing notes: UK CAA pages on airline seating allocations and
// paid-for allocated seating (CAP 1709), US DOT airline family seating
// dashboard and 2024 family seating proposal, British Airways' pages on
// choosing your seat and family seating, and easyJet's choosing-a-seat and
// fees pages, all found through search on 6 Nov 2026 (the sites could not be
// opened directly from the build sandbox, so only statements that the search
// extracts showed are used). No seat prices are quoted: the airlines' pages
// say prices vary and show them only at purchase, and the CAA's survey figures
// are not dated. Our own advice is labelled as such.
export const seatSelectionFeesWorthIt: Guide = {
  slug: "seat-selection-fees-worth-it",
  title: "Is it worth paying for seat selection? What you get free and when to pay",
  seoTitle: "Is it worth paying for seat selection on a flight?",
  excerpt:
    "Is it worth paying for seat selection? What each fare includes, how free seat allocation works, what rules say about families, and when paying makes sense.",
  topic: "booking",
  published: "2026-11-06",
  photo: guidesGPhotos.guideSeatFees,
  summary: [
    "Every airline the CAA surveyed gives you a seat free at check-in, but it may not be next to your travelling companions.",
    "Paying makes most sense when sitting together matters, on a long flight, or when you need a particular seat; for a short solo trip it often does not.",
    "Fare families change the answer: some fares include seat choice, others charge for it, and prices vary by route and flight.",
    "There is no single rule for families. The CAA’s guidance aims to seat young children close to an adult, and the US DOT encourages free adjacent seats, but airlines’ own policies differ.",
  ],
  sections: [
    {
      heading: "The short answer: it depends on who sits with whom",
      paragraphs: [
        "If you are travelling alone on a short flight and do not mind where you sit, paying for a seat is usually unnecessary. You will be given a seat at check-in. If you are travelling with other people and want to sit together, or you are on a long flight where the seat matters, it is worth checking the price before you decide.",
        "The UK Civil Aviation Authority found, in its review of paid-for allocated seating, that all the airlines it surveyed let passengers check in and get a seat for free, but these seats may not be next to those of other members of the group. It also found that charges for choosing a seat varied widely between airlines and flights. That is the core trade-off: the free seat is guaranteed, the free seat next to your family is not.",
      ],
    },
    {
      heading: "What your fare includes",
      paragraphs: [
        "Seat choice is one of the things that separates fare families. Basic fares usually include the least, and we explain how in our guide to [basic economy fares](/travel-guides/basic-economy-explained). The two airlines below show how different the rules can be.",
        "British Airways says that on its Basic (hand baggage only) fare you can pay to choose your seat from booking until check-in opens, or you will be allocated one for free when check-in opens. On fares that include a checked bag, you can choose a seat for free from 24 hours before departure, when online check-in opens. It says passengers travelling with an infant under two who will not have their own seat can choose seats for free from booking, and that seats in its First cabin are free to choose from the time of booking. Members of its Executive Club get free seat selection, with the timing depending on their tier.",
        "easyJet says that if you do not choose a seat, it will assign seats randomly and for free at check-in, and will do all it can to seat everyone on a booking together, although this is not guaranteed, especially if you check in closer to departure. Paid seat prices vary with the route, the flight and when you book, and you see the exact price at the time of purchase. For group bookings, allocated seats must be chosen for every passenger on the booking, or none can be bought.",
      ],
      table: {
        caption: "How free and paid seat selection works at two airlines (6 November 2026)",
        head: ["", "British Airways", "easyJet"],
        rows: [
          ["If you do not pay", "Seat allocated at check-in on Basic; free choice from 24 hours before departure on fares with a checked bag", "Seats assigned randomly for free at check-in; it aims to seat a booking together but does not guarantee it"],
          ["Paying", "Pay to choose from booking; standard seats are a fixed fee per sector (amount shown when you book)", "Price varies by route, flight and booking time, shown at purchase"],
          ["Free choice from booking", "First cabin; infant under two without own seat; Executive Club members", "easyJet Plus cardholders and Inclusive Plus fares, according to its help page"],
        ],
      },
      tip: "Prices change by flight, so check the seat map price on your own booking. Our advice: decide before you pay how much sitting together is worth to you, and compare that with the cost of the next fare up.",
    },
    {
      heading: "Families and sitting together",
      paragraphs: [
        "The UK CAA’s guidance is that airlines’ seat allocation for family groups should aim to seat children close to their parents or guardians. Its planning guidance says airlines should aim to give children under 12 a seat in the same row as their accompanying adult, or no more than one row or aisle away. That is an aim, not a guarantee of adjacent seats at no cost.",
        "In the US, the Department of Transportation encourages airlines to seat children 13 and under next to an accompanying adult at no extra charge, and its Airline Family Seating Dashboard tracks which airlines have made that commitment. DOT proposed in 2024 to require fee-free adjacent seating; we have not confirmed whether the requirement has come into force, so check the dashboard for the airline you are flying.",
        "Airlines’ own policies vary. British Airways says it will do its best to seat your family together by assigning seats a few days before departure, but seats may be split across rows or the aisle, and it will make sure each child under 12 sits next to an adult from the booking. Seats are free for a family travelling with an infant under two who will not have their own seat. easyJet’s approach is the check-in system described above. Our [flying with children](/travel-guides/flying-with-children) guide has the wider checklist.",
      ],
    },
    {
      heading: "When paying makes sense",
      paragraphs: [
        "These are our own rules of thumb, not official guidance. Whether a seat is worth paying for depends on your priorities.",
      ],
      table: {
        caption: "When to pay for a seat (Wallet Flights’ advice)",
        head: ["Situation", "Our view", "Why"],
        rows: [
          ["Solo, short flight, no preference", "Skip it", "You are guaranteed a free seat at check-in"],
          ["Couple or group that wants to sit together", "Usually pay, or check in early", "Free allocation may split you up"],
          ["Family with young children", "Check the airline’s family policy first", "Some airlines commit to seating children with an adult; others do not"],
          ["Long-haul overnight flight", "Worth considering", "Aisle, window or legroom matters more over many hours"],
          ["Tight connection", "Worth considering a seat near the front", "Getting off quickly may be worth a small fee"],
        ],
      },
      tip: "Our advice: look at the seat map first. If the seats you want are already marked as taken, paying may not help, and choosing free seats at check-in may give you the same result.",
    },
    {
      heading: "Ways to avoid paying",
      paragraphs: [
        "If you do not want to pay, you have a few options, depending on the airline. Check in as soon as check-in opens, because easyJet says the system seats groups together best for people who check in early. Add your frequent flyer number if you have one, since British Airways gives members free selection. And consider a fare that includes seat choice if its price difference is smaller than the seat fee.",
        "Our guide to the [best seat on a plane](/travel-guides/best-seat-on-a-plane) explains which seats are worth having, including the exit-row rules, so you know what you are paying for. If you are flying a long route such as [London to Sydney](/routes/london-to-sydney) or [London to Singapore](/routes/london-to-singapore), the seat matters more.",
      ],
    },
    {
      heading: "Check before you pay",
      paragraphs: [
        "Before you add a seat to a booking, check that the fee is per passenger and per flight (BA’s standard seats are priced per sector), that exit-row seats are open to you, and whether the seat stays yours if the airline changes the aircraft. If you booked through a travel site, check whether the site can add seats or whether you must do it on the airline’s website. Our guide to [changing or cancelling a flight booking](/travel-guides/change-or-cancel-a-flight-booking) explains who to contact.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is it worth paying for seat selection?",
      a: "It depends. The CAA found that every airline it surveyed gave a free seat at check-in, but not necessarily next to your group. If sitting together or a specific seat matters, check the price; if not, skip it.",
    },
    {
      q: "What happens if I do not choose a seat?",
      a: "You will be allocated one. easyJet says it assigns seats randomly for free at check-in and tries to keep a booking together; British Airways allocates Basic customers a seat when check-in opens, and tries to seat families together a few days before departure.",
    },
    {
      q: "Do airlines have to seat families together for free?",
      a: "Not as a firm rule that we found. The UK CAA’s guidance says seating children close to their parents should be the aim, and the US DOT encourages airlines to seat children 13 and under next to an adult at no charge. Check your airline’s policy.",
    },
    {
      q: "Why do some fares include seat choice and others not?",
      a: "Airlines package seat choice with fare families, so cheaper fares often leave it out. British Airways, for example, lets Basic passengers pay to choose or take a free seat at check-in, while fares with a checked bag include free choice from 24 hours before departure.",
    },
    {
      q: "Can I choose a seat for free as a frequent flyer?",
      a: "At some airlines, yes. British Airways says Executive Club members can choose seats free, with the timing depending on tier. Check your airline’s programme.",
    },
  ],
  sources: [
    { label: "UK Civil Aviation Authority: Paid-for allocated seating in aviation, an update (CAP 1709)", url: "https://www.caa.co.uk/publication/download/17017" },
    { label: "UK Civil Aviation Authority: Airline seating allocations", url: "https://www.caa.co.uk/passengers-and-public/before-you-fly/making-a-booking/airline-seating-allocations/" },
    { label: "UK Civil Aviation Authority: Planning your trip", url: "https://www.caa.co.uk/air-passengers/about-your-trip/planning-your-trip/" },
    { label: "US Department of Transportation: Airline Family Seating Dashboard", url: "https://www.transportation.gov/airconsumer/airline-family-seating-dashboard" },
    { label: "US Department of Transportation: Proposed ban on family seating fees (2024)", url: "https://www.transportation.gov/briefing-room/biden-harris-administration-proposes-ban-family-seating-junk-fees-charged-airlines" },
    { label: "British Airways: Choosing your seat", url: "https://www.britishairways.com/content/information/seating/reserving-your-seat" },
    { label: "British Airways: Family seating", url: "https://www.britishairways.com/content/information/family-travel/seating" },
    { label: "easyJet: Choosing a seat", url: "https://www.easyjet.com/en/help/booking-and-check-in/choosing-a-seat" },
    { label: "easyJet: Fees and charges", url: "https://www.easyjet.com/en/help-centre/policy-terms-and-conditions/fees-charges" },
  ],
  keywords: [
    "is it worth paying for seat selection",
    "seat selection fees",
    "pay to choose seat on a plane",
    "free seat allocation at check-in",
    "sit together on a plane",
    "family seating on flights",
    "do I have to pay to sit with my family",
  ],
};
