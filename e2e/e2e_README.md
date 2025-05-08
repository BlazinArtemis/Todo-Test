# E2E Test Explanation

## Handling Flakiness
- Used `waitForURL` to confirm navigation post-login.
- Leveraged Playwright's auto-waiting for element visibility.
- Selected elements by text for reliability.

## Reporting Test Failures
Failures are reported via Playwright’s HTML reporter and the link can be shared.

## Integration into CI
In CI (e.g., GitHub Actions):
1. Install dependencies and start the server.
2. Run `npx playwright test`.
3. Generate and archive reports for review.

yaml would look like this:

```yaml
name: Playwright E2E Tests

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
  # Allow manual trigger
  workflow_dispatch:

jobs:
  e2e-tests:
    name: E2E Tests
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      
      - name: Build app
        run: npm run build
      
      - name: Start dev server
        run: npm run dev & npx wait-on http://localhost:3000
      
      - name: Run Playwright tests
        run: npx playwright test
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
      
      - name: Upload test screenshots and videos
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-artifacts
          path: test-results/
          retention-days: 7

```