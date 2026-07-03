# Flaky Test Debugging Guide

## Overview

This document explains how flaky tests are prevented, detected, and debugged in the ShopSense Playwright automation framework.

A flaky test is a test that sometimes passes and sometimes fails without a meaningful code change. Flaky tests reduce confidence in automation, slow down releases, and make CI feedback less reliable.

The goal of this framework is to keep tests stable, readable, and easy to debug locally and in CI.

---

## What Causes Flaky Tests?

Common causes of flaky tests include:

- Unstable selectors
- Hard-coded waits
- Race conditions
- Slow page rendering
- Network delays
- Shared test state
- Test data dependency
- Animations or delayed UI updates
- Tests depending on execution order
- Environment differences between local and CI runs

---

## Prevention Strategy

### 1. Use Stable Selectors

The application uses `data-testid` attributes for key UI elements.

Examples:

- `email-input`
- `password-input`
- `login-button`
- `product-search`
- `cart-count`
- `checkout-button`
- `place-order-button`

This avoids relying on CSS classes, layout structure, or text that may change frequently.

---

### 2. Avoid Hard Waits

The framework avoids hard waits such as:

```ts
await page.waitForTimeout(3000);
```

Hard waits can make tests slower and still fail when the app takes longer than expected.

Instead, tests use Playwright auto-waiting assertions such as:

```ts
await expect(page.getByTestId("cart-count")).toContainText("1 item");
```

Playwright automatically waits for the condition to become true before timing out.

---

### 3. Use Page Object Model

Page Object Model keeps selectors and page actions in dedicated classes.

Examples:

- `LoginPage`
- `ProductsPage`
- `CheckoutPage`

This makes it easier to update selectors and behavior in one place when the UI changes.

---

### 4. Use Custom Fixtures

Custom fixtures reduce repeated setup and keep test state consistent.

Examples:

- `loggedInProductsPage`
- `checkoutWithOneItem`

This avoids duplicated login and cart setup across multiple tests.

---

### 5. Keep Tests Independent

Each test should create its own required state.

Tests should not depend on:

- Another test running first
- Shared browser state
- Previous cart state
- Previous checkout state
- Test execution order

This improves reliability during parallel execution.

---

## Playwright Debugging Tools

The framework is configured to collect artifacts on failure:

- Screenshot on failure
- Video on failure
- Trace on failure
- HTML report
- JUnit report

These are configured in `playwright.config.ts`.

---

## HTML Report

After running tests, open the HTML report using:

```bash
npm run test:e2e:report
```

The report helps identify:

- Which test failed
- Which step failed
- Error messages
- Screenshots
- Trace attachments
- Execution duration

---

## Trace Viewer

Playwright trace viewer helps debug failures step by step.

A trace can show:

- DOM snapshots
- Console logs
- Network activity
- User actions
- Assertions
- Screenshots before and after actions

This is especially useful when a test passes locally but fails in CI.

---

## Screenshot and Video Review

Screenshots and videos help answer:

- Was the expected element visible?
- Did the page navigate correctly?
- Was the form filled properly?
- Did the cart update?
- Did the app show the correct error message?

These artifacts are useful for fast failure analysis.

---

## Local Debugging Commands

### Run all tests

```bash
npm run test:e2e
```

### Run smoke tests only

```bash
npm run test:e2e:smoke
```

### Run regression tests only

```bash
npm run test:e2e:regression
```

### Run in headed mode

```bash
npm run test:e2e:headed
```

### Open Playwright UI mode

```bash
npm run test:e2e:ui
```

### Open latest report

```bash
npm run test:e2e:report
```

---

## Debugging Workflow

When a test fails, follow this process:

1. Re-run the failed test locally
2. Check the HTML report
3. Review the screenshot
4. Review the video if available
5. Open the trace file
6. Identify whether the failure is product behavior, test logic, or environment-related
7. Fix the root cause
8. Run the related smoke or regression suite
9. Run the full suite before pushing changes

---

## Common Failure Patterns

### Element Not Found

Possible causes:

- Selector changed
- Element no longer exists
- Page did not load correctly
- Test reached the step too early

Fixes:

- Use stable `data-testid`
- Add a meaningful assertion before interaction
- Update the page object method

---

### Assertion Timeout

Possible causes:

- UI update is delayed
- Wrong expected value
- State was not set correctly
- Test data mismatch

Fixes:

- Confirm expected data
- Check previous steps
- Review trace
- Improve assertion location

---

### Test Passes Locally but Fails in CI

Possible causes:

- Timing difference
- Browser dependency difference
- Environment performance difference
- Hidden reliance on local state

Fixes:

- Use Playwright auto-waiting assertions
- Avoid hard waits
- Keep tests isolated
- Review CI artifacts
- Check GitHub Actions logs

---

## CI Failure Analysis

GitHub Actions uploads:

- Playwright HTML report
- Test result artifacts

When CI fails:

1. Open the failed workflow run
2. Open the failed job
3. Review console logs
4. Download Playwright report artifact
5. Download test-results artifact
6. Inspect screenshot, video, and trace
7. Reproduce locally if possible

---

## Best Practices Followed

This framework follows these practices to reduce flakiness:

- Stable `data-testid` selectors
- Page Object Model
- Custom fixtures
- Independent tests
- No hard waits
- Smoke and regression separation
- Failure screenshots
- Failure videos
- Failure traces
- CI artifact upload
- Test data stored separately

---

## Future Improvements

Potential improvements include:

- Add retry trend monitoring
- Track flaky tests over time
- Add test duration metrics
- Add cross-browser execution
- Add mobile viewport runs
- Add visual regression checks
- Add accessibility test reporting
- Add dashboard for test reliability metrics

---

## Conclusion

Flaky-test prevention is a key part of building a trustworthy automation framework.

The ShopSense framework reduces flakiness by using stable selectors, reusable fixtures, Page Object Model, isolated test setup, Playwright auto-waiting, and rich failure artifacts. This makes failures easier to investigate and keeps CI feedback reliable.