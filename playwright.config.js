// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:5173',
    headless: false,
    viewport: { width: 1280, height: 720 },
    video: 'on-first-retry',
    trace: 'on-first-retry',
    // More resilient settings
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  // Set a longer global timeout for each test
  timeout: 60000,
  // Add automatic retries for all tests
  retries: 1,
  reporter: 'html',
  // Slow down test execution for stability
  expect: {
    toMatchSnapshot: { timeout: 10000 },
    toHaveScreenshot: { timeout: 10000 },
  },
});