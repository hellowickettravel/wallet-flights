import { expect, test } from "./fixtures";

// Phase 4 of docs/IMPROVEMENT-PLAN.md: booking model, legal entity, claims and
// editorial policy. Facts are the owner's (16 Oct 2026), checked against the
// Companies House register.
const COMPANY = "Wicket Travel Limited";
const NUMBER = "17001759";
const OFFICE = "15 Lampton Avenue, Hounslow, England, TW3 4EW";
const REGISTER = `https://find-and-update.company-information.service.gov.uk/company/${NUMBER}`;

test.beforeEach(async ({ page }) => {
  await page.route("https://images.unsplash.com/**", (r) => r.abort());
});

test("every page footer shows the company name, number and registered office", async ({ page }) => {
  for (const path of ["/", "/about", "/flights", "/travel-guides/carry-on-only-checklist"]) {
    await page.goto(path);
    const details = page.getByRole("contentinfo").locator("#company-details");
    await expect(details, path).toContainText(`Wallet Flights is a trading name of ${COMPANY}`);
    await expect(details, path).toContainText(`company number ${NUMBER}`);
    await expect(details, path).toContainText(OFFICE);
  }
  await expect(page.getByRole("contentinfo").getByRole("link", { name: "Editorial policy" })).toHaveAttribute("href", "/editorial-policy");
});

test("about: who runs Wallet Flights, the sister company and the register link", async ({ page }) => {
  await page.goto("/about");
  const section = page.locator("section", { has: page.getByRole("heading", { name: "Who runs Wallet Flights" }) });
  await expect(section).toContainText(`the trading brand of ${COMPANY}`);
  await expect(section).toContainText("Our sister company, Wicket Travel Holidays, looks after hotel bookings.");
  await expect(section.getByRole("link", { name: /Companies House register/ })).toHaveAttribute("href", REGISTER);
  await expect(section.getByRole("link", { name: /Visit Wicket Travel Holidays/ })).toHaveAttribute("href", "https://www.wickettravelholidays.com/");
});

test("terms and privacy name the company and cover bookings made by the team", async ({ page }) => {
  await page.goto("/terms-and-conditions");
  await expect(page.getByRole("heading", { name: "Who we are" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Bookings made by our team" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Hotels and car hire" })).toBeVisible();
  // The old blanket statement contradicted the WhatsApp bookings.
  await expect(page.locator("main")).not.toContainText("we are not a party to any booking you make");
  await expect(page.locator("main")).not.toContainText("not an airline or a travel agent");

  await page.goto("/privacy-policy");
  await expect(page.locator("main")).toContainText(`${COMPANY} (company number ${NUMBER}`);
  await expect(page.locator("main")).toContainText("Bookings made by our team");
  await expect(page.locator("main")).not.toContainText("We don’t ask for or store payment details.");
});

test("the sister company is named wherever its site is linked", async ({ page }) => {
  await page.goto("/destinations/lisbon");
  const extras = page.locator("section", { has: page.getByRole("heading", { name: /Plan the rest of your trip/ }) });
  await expect(extras.getByRole("link", { name: /Find hotels/ })).toContainText("with our sister company, Wicket Travel Holidays");
});

test("help centre and FAQ explain booking with the team", async ({ page }) => {
  await page.goto("/help");
  await expect(page.locator("main")).toContainText("Can your team book a flight for me?");
  await page.goto("/");
  await expect(page.locator("main")).toContainText("message our team on WhatsApp and we can book a flight for you");
});

test("editorial policy page, and guides credit the team with dates and sources", async ({ page }) => {
  await page.goto("/editorial-policy");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Editorial policy");
  for (const h of ["Who writes our content", "Facts and sources", "Where our prices come from", "How we make money", "Corrections"]) {
    await expect(page.getByRole("heading", { name: h })).toBeVisible();
  }

  await page.goto("/travel-guides/carry-on-only-checklist");
  const byline = page.getByTestId("guide-byline");
  await expect(byline).toContainText("By The Wallet Flights team");
  await expect(byline.getByRole("link", { name: "The Wallet Flights team" })).toHaveAttribute("href", "/editorial-policy");
  await expect(byline.locator("time[datetime='2026-08-12']")).toBeVisible();
  await expect(byline.locator("time[datetime='2026-10-16']")).toBeVisible();
  const sources = page.locator("section", { has: page.getByRole("heading", { name: "Sources" }) });
  await expect(sources.getByRole("link", { name: /GOV\.UK: Hand luggage restrictions/ })).toHaveAttribute("href", "https://www.gov.uk/hand-luggage-restrictions");
});

test("llms.txt names the company and the booking options", async ({ request }) => {
  const txt = await (await request.get("/llms.txt")).text();
  expect(txt).toContain(`trading name of ${COMPANY}`);
  expect(txt).toContain("- Booking by phone: ");
  expect(txt).toContain("/editorial-policy)");
});

test("sitemap lists the editorial policy and guides by their last update", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml).toContain("<loc>https://www.walletflights.com/editorial-policy</loc>");
  expect(xml).toMatch(/carry-on-only-checklist<\/loc>\s*<lastmod>2026-10-16/);
});

// Plan item 4.5: content depth.
test("every guide is about 1,000+ words, lists official sources and shows the update date", async ({ page }) => {
  for (const slug of ["when-to-book-international-flights", "europe-shoulder-season", "carry-on-only-checklist"]) {
    await page.goto(`/travel-guides/${slug}`);
    const minutes = Number((await page.getByText(/\d+ min read/).first().textContent())?.match(/(\d+) min read/)?.[1]);
    expect(minutes, slug).toBeGreaterThanOrEqual(4);
    await expect(page.getByTestId("guide-byline").locator("time[datetime='2026-10-16']"), slug).toBeVisible();
    const sources = page.locator("section", { has: page.getByRole("heading", { name: "Sources" }) }).locator("a[target=_blank]");
    expect(await sources.count(), slug).toBeGreaterThanOrEqual(3);
    for (const href of await sources.evaluateAll((as) => as.map((a) => a.getAttribute("href") ?? ""))) {
      expect(href, slug).toMatch(/^https:\/\/(www\.)?(gov\.uk|caa\.co\.uk|tsa\.gov|faa\.gov|transportation\.gov|home-affairs\.ec\.europa\.eu|travel-europe\.europa\.eu)\//);
    }
  }
});

test("destination pages have a trip-planning section with official entry requirements", async ({ page }) => {
  await page.goto("/destinations/lisbon");
  await expect(page.getByRole("heading", { level: 2, name: "Visiting Lisbon" })).toBeVisible();
  for (const h of ["When is the best time to visit Lisbon?", "Which airport do I fly into for Lisbon?", "How long is the flight to Lisbon from the UK and US?", "Do I need a visa to visit Portugal?"])
    await expect(page.getByRole("heading", { level: 3, name: h })).toBeVisible();
  await expect(page.getByRole("link", { name: /GOV\.UK: Portugal entry requirements/ })).toHaveAttribute("href", "https://www.gov.uk/foreign-travel-advice/portugal/entry-requirements");
  await expect(page.locator("main")).toContainText("Travelling on a US passport?");

  await page.goto("/destinations/new-york");
  await expect(page.getByRole("link", { name: /ESTA/ })).toHaveAttribute("href", "https://www.cbp.gov/travel/international-visitors/esta");
  await expect(page.locator("main")).not.toContainText("Travelling on a US passport?");
});

test("route pages show calculated facts, passenger rights and the right entry link", async ({ page }) => {
  await page.goto("/routes/manchester-to-istanbul");
  const facts = page.locator("section", { has: page.getByRole("heading", { level: 2, name: "Manchester to Istanbul flights: quick answers" }) });
  await expect(facts).toContainText(/About 2,6\d0 km \(1,6\d0 miles\)/);
  await expect(facts).toContainText(/Istanbul is \d hours? ahead of Manchester/);
  await expect(facts).toContainText("1,500km to 3,500km band");
  await expect(facts.getByRole("link", { name: /Civil Aviation Authority/ })).toHaveAttribute("href", /caa\.co\.uk/);
  await expect(facts.getByRole("link", { name: /GOV\.UK: Türkiye entry requirements/ })).toHaveAttribute("href", "https://www.gov.uk/foreign-travel-advice/turkey/entry-requirements");

  // Near a CAA band edge, no band is named.
  await page.goto("/routes/london-to-lisbon");
  await expect(page.locator("main")).not.toContainText(" band.");
  await expect(page.locator("main")).toContainText("Lisbon is on the same time as London.");

  await page.goto("/routes/new-york-to-tokyo");
  const us = page.locator("section", { has: page.getByRole("heading", { level: 2, name: "New York to Tokyo flights: quick answers" }) });
  await expect(us.getByRole("link", { name: /Department of Transportation/ })).toHaveAttribute("href", /transportation\.gov/);
  await expect(us).toContainText("Travelling on a US passport?");
  await expect(us).toContainText("because of daylight saving time");

  await page.goto("/routes/los-angeles-to-london");
  await expect(page.getByRole("link", { name: /Electronic travel authorisation/ })).toHaveAttribute("href", "https://www.gov.uk/eta");
});

test("Hotels in the main menu goes straight to the sister company in a new tab", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: /menu/i }).click();
  const nav = isMobile ? page.getByRole("dialog") : page.getByRole("navigation", { name: "Main" });
  const hotels = nav.getByRole("link", { name: /^Hotels/ });
  await expect(hotels).toHaveAttribute("href", "https://www.wickettravelholidays.com/");
  await expect(hotels).toHaveAttribute("target", "_blank");
  await expect(hotels).toHaveAttribute("rel", "noopener");
  await expect(hotels).toContainText("our sister company");
});
