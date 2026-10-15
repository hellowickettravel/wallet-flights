// Search form copy.
import type { Cabin } from "@/lib/search-query";

// The live search only knows economy and business (src/lib/white-label.ts
// maps premium economy to economy and first to business), so say so.
export const cabinNotes: Partial<Record<Cabin, string>> = {
  premium: "Live results show economy fares for premium economy searches. Pick your seat class with the provider.",
  first: "Live results show business fares for first class searches. Ask the provider about first class.",
};
