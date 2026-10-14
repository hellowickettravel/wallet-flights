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
      if (/tpwdg\.com|vercel-insights|_vercel/.test(host + r.url())) external.push(r.url());
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
