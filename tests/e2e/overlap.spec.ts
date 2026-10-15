import { expect, test } from "./fixtures";

// Regression: the About price-ladder card once covered the facts list on phones.
test("about: price ladder never overlaps the facts list", async ({ page }) => {
  await page.route("https://images.unsplash.com/**", (r) => r.abort());
  await page.goto("/about");
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const facts = await page.locator("dl").first().boundingBox();
    const ladder = await page.getByRole("figure").boundingBox();
    const overlaps =
      facts!.x < ladder!.x + ladder!.width &&
      ladder!.x < facts!.x + facts!.width &&
      facts!.y < ladder!.y + ladder!.height &&
      ladder!.y < facts!.y + facts!.height;
    expect(overlaps, `overlap at ${width}px`).toBe(false);
  }
});
