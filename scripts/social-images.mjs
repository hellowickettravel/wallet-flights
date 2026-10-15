// Renders brand/social/social.html to one PNG per artboard in brand/social/png/.
// Usage: npm run social
import { mkdir } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";

const dir = fileURLToPath(new URL("../brand/social/", import.meta.url));
const outDir = `${dir}png/`;
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch(process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 2000, height: 1200 } });
await page.goto(pathToFileURL(`${dir}social.html`).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

for (const el of await page.locator("[data-asset]").all()) {
  const id = await el.getAttribute("data-asset");
  await el.screenshot({ path: `${outDir}${id}.png`, animations: "disabled" });
  console.log(`brand/social/png/${id}.png`);
}
await browser.close();
