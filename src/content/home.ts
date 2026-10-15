// Homepage hero copy. Wallet Flights compares many providers so travellers
// see the cheapest fares without checking each site themselves.
export const heroCopy = {
  // Owner's wording (15 Oct 2026), one line on desktop. "Hundreds", not
  // "thousands", to match the logo strip (owner, 16 Oct 2026; CAP 3.7).
  title: "We compare hundreds of flight providers and show the cheapest fare.",
  intro: "Airlines and travel sites in one search, cheapest first, so you don’t have to check them one by one.",
  // Replaces the unqualified "as little as $18" (owner, 16 Oct 2026): the
  // cheapest real round trip found recently on our featured routes, one per
  // currency, with its route. UK advertising rules (CAP Code section 3) expect a
  // "from" price to be real and its conditions clear. Hidden without fare data.
  lowFares: {
    lead: "Round trips found recently:",
    item: (from: string, to: string, price: string) => `${from} to ${to} from ${price}`,
  },
  /** Disclosed next to the Hotels and Car hire shortcuts, which open the sister company's site. */
  sisterNote: (name: string) => `Hotels and car hire are booked with our sister company, ${name}.`,
  // Manual bookings: the owner's team books flights by hand on WhatsApp;
  // hotels go through the sister company (owner, 16 Oct 2026).
  phoneLead: "Prefer not to book online? Our team can book a flight for you.",
  phoneAction: "Call or WhatsApp",
} as const;

// Fare alerts. No alert emails are sent yet (no sender or schedule exists),
// so the copy promises a launch notice, not weekly fares. Sign-ups are
// double opt-in: the address only counts once its owner confirms it.
export const fareAlertsCopy = {
  title: "Get fare alerts in your inbox",
  intro: "Fare alerts are coming soon. Leave your email and we’ll tell you when they launch. Unsubscribe any time.",
  label: "Email address",
  submit: "Sign up",
  sending: "Signing up…",
  invalid: "Enter an email address like name@example.com",
  failed: "We couldn’t sign you up just now. Please try again in a moment.",
  doneTitle: "Check your inbox.",
  doneText: "Confirm your email address with the link we sent, and we’ll let you know when fare alerts launch.",
  confirm: {
    title: "Confirm your fare alerts",
    text: "One click and you’re on the list. We’ll email you when fare alerts launch.",
    button: "Confirm my email",
    sending: "Confirming…",
    doneTitle: "You’re on the list",
    doneText: "We’ll email you when fare alerts launch. Every email has an unsubscribe link.",
    expiredTitle: "This link has expired",
    expiredText: "Confirmation links last 7 days. Sign up again from the homepage and we’ll send a new one.",
    failed: "We couldn’t confirm you just now. Please try again in a moment.",
  },
} as const;
