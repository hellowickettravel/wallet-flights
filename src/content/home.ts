// Homepage hero copy. Wallet Flights compares many providers so travellers
// see the cheapest fares without checking each site themselves.
export const heroCopy = {
  // Owner's wording (15 Oct 2026), one line on desktop.
  title: "We compare thousands of flight providers and show the cheapest fare.",
  intro: "Airlines and travel sites in one search, cheapest first, so you don’t have to check them one by one.",
  // Owner-supplied claim (client message, 15 Oct 2026). UK advertising rules
  // expect "from" prices to be genuinely available, so keep it in line with
  // what searches actually return.
  lowFares: "Trips within Europe and the US can cost as little as $18.",
  // Manual bookings: the owner's team books flights and hotels by hand. The
  // number opens WhatsApp, where they can also call.
  phoneLead: "Want us to book a flight or hotel for you manually?",
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
