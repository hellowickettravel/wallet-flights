import { expect, test } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.route("https://images.unsplash.com/**", (r) => r.abort());
});

for (const path of ["/about", "/contact"]) {
  test(`${path}: no errors, no overflow, no serious a11y issues`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Breadcrumb" }).getByRole("link", { name: "Home" })).toBeVisible();
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(0);
    }
    await page.waitForTimeout(600);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(", ")}`)).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("about: explains the comparison model and affiliate links", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Every flight price, side by side");
  await expect(page.getByText("We don’t sell tickets on this website.", { exact: false })).toBeVisible();
  await expect(page.getByText("our team can book a flight for you", { exact: false }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "How we make money" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "How Wallet Flights works" })).toBeVisible();
});

test("about: price ladder settles cheapest first", async ({ page }) => {
  await page.goto("/about");
  const ladder = page.getByRole("list", { name: "Example results" });
  await ladder.scrollIntoViewIfNeeded();
  await expect(ladder.getByText("Cheapest")).toBeVisible();
  // No invented prices: rows carry a rank, cheapest first once settled.
  await expect(ladder.locator("li").first()).toContainText("Lowest price");
  await expect(ladder).not.toContainText(/[£$]\d/);
});

test("contact: shows business details from the existing site", async ({ page }) => {
  await page.goto("/contact");
  const aside = page.getByRole("complementary", { name: "Other ways to reach us" });
  await expect(aside.getByRole("link", { name: /info@walletflights\.com/ })).toHaveAttribute("href", "mailto:info@walletflights.com");
  await expect(aside.getByRole("link", { name: /WhatsApp.*\+44 7417 564704/ })).toHaveAttribute("href", "https://wa.me/447417564704");
  await expect(aside.getByRole("link", { name: /Call us.*\+44 7417 564704/ })).toHaveAttribute("href", "tel:+447417564704");
  await expect(aside.getByText("London, United Kingdom")).toBeVisible();
  await expect(page.getByText("We reply within 24 hours").first()).toBeVisible();
});

test("contact: validates, focuses the first error, then sends", async ({ page }) => {
  await page.goto("/contact");
  const form = page.getByRole("form", { name: "Contact form" });
  await form.getByRole("button", { name: "Send message" }).click();
  await expect(form.getByText("Enter your name")).toBeVisible();
  await expect(form.getByText("Choose what your message is about")).toBeVisible();
  await expect(form.getByLabel("Your name")).toBeFocused();

  await form.getByLabel("Your name").fill("Sam Taylor");
  await form.getByLabel("Email address").fill("sam@example.com");
  await form.getByText("A booking I made").click();
  await expect(form.getByText(/the provider you chose manages the booking/)).toBeVisible();
  await form.getByLabel("Message").fill("My flight time changed, who should I contact?");
  await form.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText("Message sent, Sam");
});

test("contact api rejects invalid input and ignores honeypot spam", async ({ request }) => {
  const bad = await request.post("/api/contact", { data: { name: "", email: "nope", topic: "x", message: "hi" } });
  expect(bad.status()).toBe(400);
  const body = await bad.json();
  expect(Object.keys(body.errors).sort()).toEqual(["email", "message", "name", "topic"]);
  const spam = await request.post("/api/contact", { data: { company: "Acme", name: "", email: "" } });
  expect(spam.status()).toBe(202);
  // A line break in the name could add an email header; it's refused.
  const header = await request.post("/api/contact", {
    data: { name: "Sam\r\nBcc: someone@example.com", email: "sam@example.com", topic: "other", message: "A question about my search." },
  });
  expect(header.status()).toBe(400);
  expect(Object.keys((await header.json()).errors)).toEqual(["name"]);
});

test("form APIs refuse non-JSON and cross-site posts (CSRF)", async ({ request, baseURL }) => {
  for (const path of ["/api/contact", "/api/fare-alerts"]) {
    const plain = await request.post(path, { headers: { "content-type": "text/plain" }, data: '{"email":"a@example.com"}' });
    expect(plain.status()).toBe(415);
    const foreign = await request.post(path, { headers: { origin: "https://evil.example" }, data: { email: "a@example.com" } });
    expect(foreign.status()).toBe(403);
  }
  const sameSite = await request.post("/api/contact", { headers: { origin: new URL(baseURL!).origin }, data: { name: "" } });
  expect(sameSite.status()).toBe(400);
});

test("header nav reaches About and Contact", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("dialog", { name: "Menu" }).getByRole("link", { name: /^About us/ }).click();
  } else {
    const nav = page.getByRole("navigation", { name: "Main" });
    await nav.getByRole("button", { name: "About" }).click();
    await nav.getByRole("link", { name: /^About us/ }).click();
  }
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
