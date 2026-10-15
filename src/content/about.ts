// About page copy. Facts come from the existing walletflights.com About page
// and the owner: comparison site, no ticket sales, affiliate links, London-based,
// US + UK travellers, results sorted by price, indirect routes considered.
export const aboutIntro = {
  title: "Every flight price, side by side",
  paragraphs: [
    "Wallet Flights is a travel comparison site. We search airlines and travel sites for you and show what they offer in one list, sorted from the cheapest price to the most expensive.",
    "We also look beyond the obvious nonstop. Indirect routes are often cheaper, and a well-timed connection can become a short stopover somewhere new.",
    "We don’t sell tickets. When you find the deal you want, we send you to that provider to book it directly, so your booking, payment and any changes stay with them.",
  ],
  facts: [
    { label: "Based in", value: "London, UK" },
    { label: "For travellers in", value: "the US and UK" },
    { label: "Results sorted by", value: "price, cheapest first" },
    { label: "Cost to search", value: "Free" },
  ],
};

export const aboutEarn = {
  title: "How we make money",
  paragraphs: [
    "Wallet Flights is free to use. Some of the providers we list pay us a commission when you book through our links. That’s how we run the site.",
    "You pay the provider’s own price, and results are sorted by price, not by who pays us.",
  ],
};

// Illustration for the "price ladder": results for one route, listed out of
// order so the animation can sort them. No prices — `rank` (1 = cheapest)
// orders the rows and sets the length of each price bar.
export const ladderExample = {
  route: "London to New York",
  dates: "Illustration, round trip",
  rows: [
    { id: "c", label: "Travel site", detail: "1 stop · 10h 40m", rank: 3 },
    { id: "a", label: "Airline website", detail: "Nonstop · 8h 05m", rank: 1 },
    { id: "e", label: "Travel site", detail: "Nonstop · 7h 55m", rank: 5 },
    { id: "b", label: "Travel site", detail: "Nonstop · 8h 20m", rank: 2 },
    { id: "d", label: "Airline website", detail: "1 stop · 11h 15m", rank: 4 },
  ],
};
