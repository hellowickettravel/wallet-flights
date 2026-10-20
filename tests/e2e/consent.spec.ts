import { expect, test } from "./fixtures";

test.describe("first visit", () => {
  test.use({ consent: "unset" });

  test("banner offers accept and reject with equal weight, and remembers the choice", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("region", { name: "Cookies on Wallet Flights" });
    await expect(banner).toBeVisible();
    const accept = banner.getByRole("button", { name: "Accept all" });
    const reject = banner.getByRole("button", { name: "Reject all" });
    expect(await accept.getAttribute("class")).toBe(await reject.getAttribute("class"));
    await reject.click();
    await expect(banner).toHaveCount(0);
    const cookie = (await page.context().cookies()).find((c) => c.name === "wf_consent");
    expect(cookie?.value).toMatch(/^s0\.a0\.\d+$/);
    await page.reload();
    await expect(page.getByRole("region", { name: "Cookies on Wallet Flights" })).toHaveCount(0);
  });

  test("nothing optional loads before a choice", async ({ page }) => {
    const external: string[] = [];
    page.on("request", (r) => {
      const host = new URL(r.url()).hostname;
      if (/tpwdg\.com|vercel-insights|_vercel|googletagmanager|google-analytics/.test(host + r.url())) external.push(r.url());
    });
    await page.goto("/flights?trip=round&from0=LON&to0=NYC&date0=2030-03-10&return=2030-03-17");
    await expect(page.getByRole("region", { name: "Cookies on Wallet Flights" })).toBeVisible();
    await page.waitForLoadState("networkidle");
    expect(external).toEqual([]);
  });
});

test("footer cookie settings reopen the choices and save per category", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Cookie settings" }).click();
  const banner = page.getByRole("region", { name: "Cookies on Wallet Flights" });
  await expect(banner).toBeVisible();
  await expect(banner.getByRole("switch", { name: "Necessary" })).toBeDisabled();
  const analytics = banner.getByRole("switch", { name: "Analytics" });
  await expect(analytics).toHaveAttribute("aria-checked", "false");
  await analytics.click();
  await banner.getByRole("button", { name: "Save choices" }).click();
  await expect(banner).toHaveCount(0);
  const cookie = (await page.context().cookies()).find((c) => c.name === "wf_consent");
  expect(cookie?.value).toMatch(/^s0\.a1\.\d+$/);
});

test.describe("Google Analytics", () => {
  test.use({ consent: "unset" });

  test("loads with our measurement ID only after analytics is allowed", async ({ page }) => {
    const gtag: string[] = [];
    page.on("request", (r) => {
      if (r.url().includes("googletagmanager.com/gtag/js")) gtag.push(r.url());
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(gtag).toEqual([]);
    await page.getByRole("region", { name: "Cookies on Wallet Flights" }).getByRole("button", { name: "Accept all" }).click();
    await expect.poll(() => gtag.length).toBe(1);
    expect(gtag[0]).toContain("id=G-R2NBBGX7CM");
    const config = await page.evaluate(() =>
      (window as unknown as { dataLayer: IArguments[] }).dataLayer.map((a) => Array.from(a)).find((a) => a[0] === "config"),
    );
    expect(config).toEqual(["config", "G-R2NBBGX7CM", { allow_google_signals: false, allow_ad_personalization_signals: false }]);
  });

  test("an analytics choice made before Google Analytics was added is asked again", async ({ page, baseURL }) => {
    await page.context().addCookies([{ name: "wf_consent", value: "s1.a1.1000", url: baseURL! }]);
    const gtag: string[] = [];
    page.on("request", (r) => {
      if (r.url().includes("googletagmanager.com")) gtag.push(r.url());
    });
    await page.goto("/");
    const banner = page.getByRole("region", { name: "Cookies on Wallet Flights" });
    await expect(banner).toBeVisible();
    await page.waitForLoadState("networkidle");
    expect(gtag).toEqual([]);
    await banner.getByRole("button", { name: "Reject all" }).click();
    await page.reload();
    await expect(banner).toHaveCount(0);
  });
});

test.describe("withdrawing analytics", () => {
  test.use({ consent: "analytics" });

  test("turning analytics off deletes the Google Analytics cookies and reloads", async ({ page, baseURL }) => {
    await page.context().addCookies([
      { name: "_ga", value: "GA1.1.123.456", url: baseURL! },
      { name: "_ga_R2NBBGX7CM", value: "GS1.1.789", url: baseURL! },
    ]);
    await page.goto("/");
    await expect.poll(() => page.evaluate(() => (window as unknown as { __gaStub?: number }).__gaStub ?? 0)).toBe(1);
    await page.getByRole("button", { name: "Cookie settings" }).click();
    const banner = page.getByRole("region", { name: "Cookies on Wallet Flights" });
    await banner.getByRole("switch", { name: "Analytics" }).click();
    await Promise.all([page.waitForEvent("load"), banner.getByRole("button", { name: "Save choices" }).click()]);
    const names = (await page.context().cookies()).map((c) => c.name);
    expect(names).not.toContain("_ga");
    expect(names).not.toContain("_ga_R2NBBGX7CM");
    await page.waitForLoadState("networkidle");
    expect(await page.evaluate(() => (window as unknown as { __gaStub?: number }).__gaStub)).toBeUndefined();
  });
});

test.describe("withdrawing consent", () => {
  test.use({ consent: "search" });

  test("turning live search off removes its cookies and unloads the widget", async ({ page, baseURL }) => {
    await page.context().addCookies([{ name: "tpwl_currency", value: "GBP", url: baseURL! }]);
    await page.goto("/flights");
    await expect(page.locator("#tpwl-search")).toContainText("White Label stub");
    await page.getByRole("button", { name: "Cookie settings" }).click();
    const banner = page.getByRole("region", { name: "Cookies on Wallet Flights" });
    await banner.getByRole("switch", { name: "Live flight search" }).click();
    await banner.getByRole("button", { name: "Save choices" }).click();
    await expect(page.getByRole("region", { name: "Live prices need one cookie choice" })).toBeVisible();
    await expect(page.locator("script[data-tpwl]")).toHaveCount(0);
    const names = (await page.context().cookies()).map((c) => c.name);
    expect(names).not.toContain("tpwl_currency");
  });
});
