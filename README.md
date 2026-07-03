# ShopSense Playwright E2E Automation Framework

[![Playwright E2E Tests](https://github.com/vivek77777/shopsense-playwright-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/vivek77777/shopsense-playwright-framework/actions/workflows/playwright.yml)

ShopSense is a React + TypeScript sample e-commerce application with a production-style Playwright end-to-end automation framework.

The goal of this project is to demonstrate how to build and maintain a scalable test automation framework using Playwright, TypeScript, Page Object Model, reusable fixtures, test data management, smoke/regression suites, HTML reporting, and GitHub Actions CI/CD.

This project was built to mirror real QA automation responsibilities such as validating critical user flows, reducing test duplication, improving test maintainability, and making test results easy to understand in CI.

---

## Tech Stack

### Application

- React
- TypeScript
- Vite
- CSS

### Test Automation

- Playwright
- TypeScript
- Page Object Model
- Custom Playwright fixtures
- Test data fixtures
- Smoke and regression test tags
- HTML reports
- JUnit test results
- GitHub Actions CI/CD

---

## Application Features

The sample application includes:

- User login
- Invalid login validation
- Product catalog
- Product search
- Add to cart
- Increase item quantity
- Decrease item quantity
- Remove item from cart
- Empty cart state
- Cart total calculation
- Checkout form
- Required field validation
- Invalid email validation
- Invalid postal code validation
- Order confirmation

---

## Test Coverage

The Playwright test suite covers the following areas:

### Authentication

- Valid user can log in successfully
- Invalid user sees login error

### Cart

- User can search and add product to cart
- Search with no matching product shows empty result message
- Empty cart shows empty state
- Checkout is unavailable when cart is empty
- User can increase and decrease item quantity
- User can remove item from cart
- Cart total updates after adding multiple products
- Out-of-stock product cannot be added to cart

### Checkout

- Checkout page shows selected cart count
- Empty checkout form shows required field errors
- Invalid checkout email shows validation error
- Invalid postal code shows validation error
- User can place order with valid checkout details

---

## Framework Architecture

```text
shopsense-playwright-framework
│
├── .github
│   └── workflows
│       └── playwright.yml
│
├── src
│   ├── components
│   │   └── ProductCard.tsx
│   │
│   ├── data
│   │   └── products.ts
│   │
│   ├── pages
│   │   ├── CheckoutPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── ProductsPage.tsx
│   │
│   ├── types
│   │   ├── CartItem.ts
│   │   └── Product.ts
│   │
│   ├── App.tsx
│   └── App.css
│
├── tests
│   ├── e2e
│   │   ├── auth.spec.ts
│   │   ├── cart.spec.ts
│   │   └── checkout.spec.ts
│   │
│   ├── fixtures
│   │   ├── checkoutData.ts
│   │   ├── products.ts
│   │   ├── test.ts
│   │   └── users.ts
│   │
│   └── pages
│       ├── CheckoutPage.ts
│       ├── LoginPage.ts
│       └── ProductsPage.ts
│
├── playwright.config.ts
├── package.json
└── README.md