// Copy about prices shown in the visitor's currency (src/lib/currency.ts).
export const currencyCopy = {
  /** Under lists of fares: they're found in pounds or dollars, then converted. */
  converted:
    "Prices found in pounds or dollars are shown in your currency at the day’s exchange rate, so they’re a guide; the live search shows the exact price.",
  /** The header currency picker. */
  title: "Show prices in",
  note: "Fares are converted at today’s exchange rate. The live search shows the exact price.",
  search: "Search currency or country",
  rowLabel: "Prices in",
  /** The pill's name for screen readers. */
  label: (code: string) => `Prices in ${code}, change currency`,
  choose: "Choose a currency",
  mine: "Your currency",
  all: "All currencies",
  usedIn: (country: string) => `Used in ${country}`,
  none: (q: string) => `No currency matches “${q}”`,
} as const;
