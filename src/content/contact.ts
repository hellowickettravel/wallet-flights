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
  "If you booked through a deal on our site, the provider you chose manages the booking, so they can change or refund it fastest; their contact details are in your confirmation email. If our team booked it for you on WhatsApp, message us there. Not sure which? Tell us your route and dates and we’ll help.";
