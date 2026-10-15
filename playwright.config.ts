import { defineConfig, devices } from "@playwright/test";

// In the cloud sandbox Chromium is pre-installed at /opt/pw-browsers; locally
// Playwright uses its own download (`npx playwright install chromium`).
const executablePath = process.env.PW_CHROMIUM_PATH;

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:3100",
    launchOptions: executablePath ? { executablePath } : undefined,
  },
  webServer: {
    command: "npm run start -- -p 3100",
    // No real email; no rate limit (every test request comes from localhost).
    env: { EMAIL_DRY_RUN: "1", RATE_LIMIT: "off" },
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
