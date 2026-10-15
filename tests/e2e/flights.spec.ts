import { expect, test } from "./fixtures";

// /flights = Travelpayouts White Label #23361 (stubbed in tests, see fixtures.ts).
test.skip(process.env.NEXT_PUBLIC_DEMO_RESULTS === "true", "demo build replaces the White Label");

test.describe("with live search allowed", () => {
  test.use({ consent: "search" });

  test("homepage search hands off to the White Label with marker + sub_id", async ({ page }) => {
    await page.goto("/");
    const form = page.getByRole("form", { name: "Search flights" });
    await form.getByRole("combobox", { name: "Going to" }).fill("dub");
    await page.getByRole("option", { name: /Dubai/ }).click();
    await form.getByLabel("Departing").fill("2030-05-01");
    await form.getByLabel("Returning").fill("2030-05-09");
    await form.getByRole("button", { name: "Search flights" }).click();
    // NYC (city) → DXB (airport), 1 May – 9 May, 1 adult.
    await expect(page).toHaveURL(/\/flights\?flightSearch=NYC0105DXB09051&origin_airports=1&destination_airports=0&marker=567389\.home_hero$/);
    await expect(page.locator("#tpwl-search")).toHaveText("White Label stub: NYC0105DXB09051 · marker 567389.home_hero");
    await expect(page.locator("#tpwl-tickets")).toBeAttached();
    await expect(page.locator("script[data-tpwl]")).toHaveAttribute("src", "https://tpwdg.com/wl_web/main.js?wl_id=23361");
  });

  test("a place outside the built-in list reaches the White Label", async ({ page }) => {
    await page.goto("/flights?trip=round&cabin=economy&adults=1&from0=NYC&to0=KHI&to0label=Karachi%7CAll+airports%7CPakistan&date0=2030-05-01&return=2030-05-09&sub=home_hero");
    await expect(page).toHaveURL(/\/flights\?flightSearch=NYC0105KHI09051&marker=567389\.home_hero$/);
  });

  test("UK departures price in pounds and airports are flagged", async ({ page }) => {
    await page.goto("/flights?trip=round&cabin=business&adults=2&children=1&from0=LHR&to0=JFK&date0=2030-03-10&return=2030-03-17&sub=test");
    await expect(page).toHaveURL(/flightSearch=LHR1003JFK1703c21&origin_airports=0%2C1&destination_airports=0%2C1&currency=GBP&marker=567389\.test/);
  });

  test("one-way and multi-city searches encode like the widget's own form", async ({ page }) => {
    await page.goto("/flights?trip=oneway&adults=1&from0=LON&to0=CDG&date0=2030-06-02");
    await expect(page).toHaveURL(/flightSearch=LON0206CDG1&/);
    await page.goto("/flights?trip=multi&adults=1&from0=LON&to0=FCO&date0=2030-06-02&from1=BCN&to1=LON&date1=2030-06-09");
    // Open jaw: in to Rome, home from Barcelona → "-" before the second origin;
    // the widget drops the final destination when it's the first origin.
    await expect(page).toHaveURL(/flightSearch=LON0206FCO-BCN09061&/);
  });

  test("past dates in an old link are replaced with future ones", async ({ page }) => {
    await page.goto("/flights?trip=round&adults=1&from0=LON&to0=NYC&date0=2020-03-10&return=2020-03-17&sub=test");
    await expect(page).toHaveURL(/flightSearch=LON\d{4}NYC\d{4}1&/);
    await expect(page).not.toHaveURL(/LON1003NYC1703/);
  });

  test("fare-board deep links without dates get default dates", async ({ page }) => {
    await page.goto("/flights?trip=round&from0=MAN&to0=DXB&sub=home_board");
    await expect(page).toHaveURL(/flightSearch=MAN\d{4}DXB\d{4}1&/);
    await expect(page.locator("#tpwl-search")).toContainText("marker 567389.home_board");
  });

  test("the widget keeps searches on /flights, without the partner link or hotels box, with a wide currency menu", async ({ page, baseURL }) => {
    await page.goto("/flights");
    await expect(page.locator("#tpwl-search")).toContainText("White Label stub");
    // The real widget wraps this object in a Proxy, so read it as JSON.
    const config = await page.evaluate(() => JSON.parse(JSON.stringify((window as Window & { TPWL_CONFIGURATION?: object }).TPWL_CONFIGURATION ?? null)));
    expect(config).toMatchObject({ resultsURL: `${new URL(baseURL!).origin}/flights`, showReferralLink: false, showHotels: false });
    // More currencies than the dashboard's USD and GBP (owner's request).
    expect(config.availableCurrencies).toEqual(expect.arrayContaining(["USD", "GBP", "EUR", "INR", "CAD", "AUD", "AED"]));
  });

  test("searches sent to the homepage land on /flights with their values", async ({ page }) => {
    await page.goto("/?flightSearch=NYC1510LAX31101&destination_airports=1");
    await expect(page).toHaveURL(/\/flights\?flightSearch=NYC1510LAX31101&destination_airports=1/);
    await expect(page.locator("#tpwl-search")).toContainText("NYC1510LAX31101");
  });

  test("a direct visit still tags the placement", async ({ page }) => {
    await page.goto("/flights");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Compare live flight prices");
    await expect(page.locator("#tpwl-search")).toHaveText("White Label stub: no search · marker 567389.flights_page");
  });
});

test("without consent the widget doesn't load until allowed", async ({ page }) => {
  await page.goto("/flights?trip=round&from0=LON&to0=NYC&date0=2030-03-10&return=2030-03-17");
  const gate = page.getByRole("region", { name: "Live prices need one cookie choice" });
  await expect(gate).toBeVisible();
  await expect(page.locator("script[data-tpwl]")).toHaveCount(0);
  await gate.getByRole("button", { name: /Allow live search/ }).click();
  await expect(page.locator("#tpwl-search")).toContainText("LON1003NYC17031");
  const cookies = await page.context().cookies();
  expect(cookies.find((c) => c.name === "wf_consent")?.value).toMatch(/^s1\.a0\.\d+$/);
});

test("/go builds a real affiliate link and forwards to it", async ({ page }) => {
  const dest = "https://www.aviasales.com/search/LON1503NYC20031";
  await page.goto(`/go?program=aviasales&url=${encodeURIComponent(dest)}&sub=deals_rail`);
  // Exactly the format of the dashboard's link generator for the same inputs.
  await page.waitForURL(
    "https://tp.media/r?campaign_id=100&marker=567389&p=4114&sub_id=deals_rail&trs=344771&u=https%3A%2F%2Fwww.aviasales.com%2Fsearch%2FLON1503NYC20031",
  );
});

test("/go never shows text from the URL", async ({ page }) => {
  const dest = "https://www.aviasales.com/search/LON1503NYC20031";
  await page.goto(`/go?program=aviasales&url=${encodeURIComponent(dest)}&provider=Call+0800+SCAM&airline=Fake+Air`);
  const text = await page.locator("main").innerText();
  expect(text).not.toContain("SCAM");
  expect(text).not.toContain("Fake Air");
});

test("/go refuses destinations outside the program's own site", async ({ page }) => {
  await page.goto(`/go?program=aviasales&url=${encodeURIComponent("https://evil.example.com/")}&sub=x`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This link doesn’t go anywhere");
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL(/\/go\?/);
});
