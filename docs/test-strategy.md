# ShopSense Test Strategy

## Overview

This document explains the end-to-end testing strategy for the ShopSense React + TypeScript application.

The goal of the test strategy is to validate the most important user flows, reduce regression risk, and provide fast feedback through automated Playwright tests running locally and in GitHub Actions CI.

---

## Testing Goals

The main goals of this test suite are:

- Validate critical user journeys from login to checkout
- Catch functional regressions before release
- Keep tests readable and maintainable
- Reduce duplicated setup using custom fixtures
- Make failures easy to debug using Playwright reports, screenshots, videos, and traces
- Support both fast smoke testing and broader regression testing

---

## Scope of Testing

The current Playwright test suite covers:

### Authentication

- Valid login
- Invalid login error handling

### Product Catalog

- Product search
- Product visibility
- No-results search state
- Out-of-stock product behavior

### Cart

- Add item to cart
- Increase quantity
- Decrease quantity
- Remove item
- Empty cart state
- Cart total calculation
- Multiple-product total validation

### Checkout

- Checkout summary
- Required field validation
- Invalid email validation
- Invalid postal code validation
- Successful order placement
- Order confirmation

---

## Out of Scope

The current version does not cover:

- Real payment processing
- Backend API validation
- Database validation
- Visual regression testing
- Accessibility testing
- Cross-browser coverage beyond Chromium
- Real user authentication service

These are listed as future improvements.

---

## Test Levels

### Smoke Tests

Smoke tests validate the most critical flows and are designed to run quickly.

Examples:

- User can add a product to cart
- Checkout page loads with selected item count
- User can place an order with valid checkout details

Command:

```bash
npm run test:e2e:smoke
```

### Regression Tests

Regression tests validate broader application behavior and edge cases.

Examples:

- Invalid login
- Empty cart state
- Product search with no results
- Invalid checkout email
- Invalid postal code
- Remove item from cart
- Quantity updates

Command:

```bash
npm run test:e2e:regression
```

### Full E2E Suite

The full suite runs all Playwright tests.

Command:

```bash
npm run test:e2e
```

---

## Framework Design

The framework uses the following design patterns:

### Page Object Model

Page Object Model separates page interactions from test logic.

Benefits:

- Keeps tests readable
- Reduces selector duplication
- Makes maintenance easier when UI changes
- Encourages reusable page actions and assertions

Example page objects:

- `LoginPage`
- `ProductsPage`
- `CheckoutPage`

---

## Fixture Strategy

Custom Playwright fixtures are used to simplify repeated setup.

Examples:

- `loginPage`
- `productsPage`
- `checkoutPage`
- `loggedInProductsPage`
- `checkoutWithOneItem`

This makes test files cleaner and avoids repeating login and setup logic across multiple tests.

---

## Test Data Strategy

Test data is stored in dedicated fixture files.

Examples:

- `users.ts`
- `products.ts`
- `checkoutData.ts`

This keeps test data separate from test logic and makes expected values easier to update.

---

## Selector Strategy

The application uses `data-testid` attributes for important elements.

This improves test stability because tests do not depend on CSS classes, layout structure, or visible text that may change frequently.

Examples:

- `email-input`
- `login-button`
- `product-search`
- `cart-count`
- `checkout-button`
- `place-order-button`

---

## Reporting and Debugging

Playwright is configured to generate:

- HTML reports
- JUnit test results
- Screenshots on failure
- Videos on failure
- Traces on failure

These artifacts make it easier to investigate failures locally and in CI.

Open the HTML report with:

```bash
npm run test:e2e:report
```

---

## CI/CD Strategy

The test suite runs in GitHub Actions on:

- Push to `main`
- Pull request to `main`

The workflow:

1. Checks out the repository
2. Sets up Node.js
3. Installs dependencies
4. Installs Playwright browsers
5. Runs the E2E suite
6. Uploads Playwright reports and test artifacts

This ensures every change is validated automatically.

---

## Risk-Based Testing Approach

The highest-priority flows are:

1. Login
2. Product search
3. Cart updates
4. Checkout validation
5. Successful order confirmation

These flows are prioritized because they represent the core user journey and would create the highest user impact if broken.

---

## Future Improvements

Potential improvements include:

- Add Firefox and WebKit coverage
- Add mobile viewport testing
- Add accessibility testing with axe-core
- Add API mocking for product and checkout data
- Add visual regression testing
- Add order history flow
- Add test metrics dashboard
- Add flaky-test monitoring