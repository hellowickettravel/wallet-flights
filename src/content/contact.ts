export const contactTopics = [
  { id: "deal", label: "A deal or search result" },
  { id: "booking", label: "A booking I made" },
  { id: "partnership", label: "Partnerships & advertising" },
  { id: "feedback", label: "Feedback on the site" },
  { id: "other", label: "Something else" },
] as const;

export type ContactTopic = (typeof contactTopics)[number]["id"];

export const contactLimits = { name: 100, message: 2000, messageMin: 10 } as const;

// Shown when "A booking I made" is selected and in the side panel.
export const bookingNote =
  "Bookings are made and managed by the provider you chose, so they can change or refund them fastest. Check your confirmation email for their contact details. If you can’t tell which provider it was, tell us your route and dates and we’ll help.";
