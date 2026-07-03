# ShopSense Test Cases

## Overview

This document lists the core test cases covered by the ShopSense Playwright E2E automation framework.

The test cases are grouped by feature area and mapped to smoke or regression coverage.

---

## Test Suite Summary

| Area | Coverage Type | Description |
|---|---|---|
| Authentication | Smoke / Regression | Login success and login failure |
| Product Catalog | Regression | Product search, no-results state, out-of-stock behavior |
| Cart | Smoke / Regression | Add, update, remove, empty state, total calculation |
| Checkout | Smoke / Regression | Validation errors and successful order flow |

---

# Authentication Test Cases

## TC-AUTH-001: Valid user can log in successfully

**Priority:** High  
**Suite:** Smoke  
**Type:** Positive  

### Preconditions

- User is on the ShopSense login page.
- Valid login credentials are available.

### Test Data

```text
Email: qa.user@shopsense.com
Password: Password123!
```

### Steps

1. Open the ShopSense application.
2. Enter valid email.
3. Enter valid password.
4. Click Login.

### Expected Result

- User is redirected to the Products page.
- `ShopSense Products` heading is visible.
- User menu shows `QA User`.

---

## TC-AUTH-002: Invalid user sees login error

**Priority:** High  
**Suite:** Regression  
**Type:** Negative  

### Preconditions

- User is on the ShopSense login page.

### Test Data

```text
Email: wrong@email.com
Password: wrongpassword
```

### Steps

1. Open the ShopSense application.
2. Enter invalid email.
3. Enter invalid password.
4. Click Login.

### Expected Result

- User remains on the login page.
- Error message displays: `Invalid email or password`.

---

# Product Catalog Test Cases

## TC-PROD-001: User can search for an existing product

**Priority:** Medium  
**Suite:** Regression  
**Type:** Positive  

### Preconditions

- User is logged in.
- Products page is visible.

### Test Data

```text
Search term: Wireless Mouse
```

### Steps

1. Enter `Wireless Mouse` into the product search field.

### Expected Result

- `Wireless Mouse` product is visible.

---

## TC-PROD-002: Search with no matching product shows empty result message

**Priority:** Medium  
**Suite:** Regression  
**Type:** Negative / Edge Case  

### Preconditions

- User is logged in.
- Products page is visible.

### Test Data

```text
Search term: Laptop Stand
```

### Steps

1. Enter `Laptop Stand` into the product search field.

### Expected Result

- No product cards are shown.
- Message displays: `No products found.`

---

## TC-PROD-003: Out-of-stock product cannot be added to cart

**Priority:** High  
**Suite:** Regression  
**Type:** Negative  

### Preconditions

- User is logged in.
- Products page is visible.
- USB-C Hub is out of stock.

### Steps

1. Locate the USB-C Hub product.
2. Verify the Add to Cart button state.

### Expected Result

- The product button displays `Out of Stock`.
- The button is disabled.
- Product cannot be added to cart.

---

# Cart Test Cases

## TC-CART-001: User can add product to cart

**Priority:** High  
**Suite:** Smoke  
**Type:** Positive  

### Preconditions

- User is logged in.
- Products page is visible.

### Test Data

```text
Product: Wireless Mouse
Price: $29.99
```

### Steps

1. Search for `Wireless Mouse`.
2. Click Add to Cart.

### Expected Result

- Cart count displays `1 item(s)`.
- Cart total displays `$29.99`.

---

## TC-CART-002: Empty cart shows empty state and checkout is unavailable

**Priority:** High  
**Suite:** Regression  
**Type:** Edge Case  

### Preconditions

- User is logged in.
- No products have been added to cart.

### Steps

1. View the cart section.

### Expected Result

- Empty cart message displays: `Your cart is empty.`
- Checkout button is unavailable.

---

## TC-CART-003: User can increase item quantity

**Priority:** Medium  
**Suite:** Regression  
**Type:** Positive  

### Preconditions

- User is logged in.
- Wireless Mouse is added to cart.

### Steps

1. Click the increase quantity button.

### Expected Result

- Quantity updates to `2`.
- Cart total updates to `$59.98`.

---

## TC-CART-004: User can decrease item quantity

**Priority:** Medium  
**Suite:** Regression  
**Type:** Positive  

### Preconditions

- User is logged in.
- Wireless Mouse quantity is `2`.

### Steps

1. Click the decrease quantity button.

### Expected Result

- Quantity updates to `1`.
- Cart total updates to `$29.99`.

---

## TC-CART-005: User can remove item from cart

**Priority:** Medium  
**Suite:** Regression  
**Type:** Positive  

### Preconditions

- User is logged in.
- Wireless Mouse is added to cart.

### Steps

1. Click Remove.

### Expected Result

- Product is removed from cart.
- Empty cart message displays.

---

## TC-CART-006: Cart total updates after adding multiple products

**Priority:** High  
**Suite:** Regression  
**Type:** Positive  

### Preconditions

- User is logged in.

### Test Data

```text
Wireless Mouse: $29.99
Mechanical Keyboard: $89.99
Expected Total: $119.98
```

### Steps

1. Add Wireless Mouse to cart.
2. Add Mechanical Keyboard to cart.

### Expected Result

- Cart count displays `2 item(s)`.
- Cart total displays `$119.98`.

---

# Checkout Test Cases

## TC-CHECKOUT-001: Checkout page shows selected cart count

**Priority:** High  
**Suite:** Smoke  
**Type:** Positive  

### Preconditions

- User is logged in.
- One product is added to cart.

### Steps

1. Click Checkout.

### Expected Result

- Checkout page is displayed.
- Checkout summary shows `1 item(s) in cart`.

---

## TC-CHECKOUT-002: Empty checkout form shows required field errors

**Priority:** High  
**Suite:** Regression  
**Type:** Negative  

### Preconditions

- User is on the checkout page.

### Steps

1. Leave all fields empty.
2. Click Place Order.

### Expected Result

The following errors are displayed:

- `Full name is required`
- `Email is required`
- `Shipping address is required`
- `Postal code is required`

---

## TC-CHECKOUT-003: Invalid email shows validation error

**Priority:** High  
**Suite:** Regression  
**Type:** Negative  

### Preconditions

- User is on the checkout page.

### Test Data

```text
Full Name: Vivek Korukonda
Email: wrongemail
Address: 123 King Street
Postal Code: M5V 2T6
```

### Steps

1. Fill checkout form with invalid email.
2. Click Place Order.

### Expected Result

- Error message displays: `Enter a valid email address`.
- Order is not placed.

---

## TC-CHECKOUT-004: Invalid postal code shows validation error

**Priority:** Medium  
**Suite:** Regression  
**Type:** Negative  

### Preconditions

- User is on the checkout page.

### Test Data

```text
Full Name: Vivek Korukonda
Email: vivek@example.com
Address: 123 King Street
Postal Code: A1
```

### Steps

1. Fill checkout form with invalid postal code.
2. Click Place Order.

### Expected Result

- Error message displays: `Postal code must be at least 5 characters`.
- Order is not placed.

---

## TC-CHECKOUT-005: User can place order with valid checkout details

**Priority:** High  
**Suite:** Smoke  
**Type:** Positive  

### Preconditions

- User is logged in.
- One product is added to cart.
- User is on the checkout page.

### Test Data

```text
Full Name: Vivek Korukonda
Email: vivek@example.com
Address: 123 King Street
Postal Code: M5V 2T6
```

### Steps

1. Fill all checkout fields with valid data.
2. Click Place Order.

### Expected Result

- Order confirmation page is displayed.
- Confirmation message displays: `Order Confirmed`.

---

## Traceability Matrix

| Test Case ID | Automated Spec File | Suite |
|---|---|---|
| TC-AUTH-001 | `auth.spec.ts` | Smoke |
| TC-AUTH-002 | `auth.spec.ts` | Regression |
| TC-PROD-001 | `cart.spec.ts` | Regression |
| TC-PROD-002 | `cart.spec.ts` | Regression |
| TC-PROD-003 | `cart.spec.ts` | Regression |
| TC-CART-001 | `cart.spec.ts` | Smoke |
| TC-CART-002 | `cart.spec.ts` | Regression |
| TC-CART-003 | `cart.spec.ts` | Regression |
| TC-CART-004 | `cart.spec.ts` | Regression |
| TC-CART-005 | `cart.spec.ts` | Regression |
| TC-CART-006 | `cart.spec.ts` | Regression |
| TC-CHECKOUT-001 | `checkout.spec.ts` | Smoke |
| TC-CHECKOUT-002 | `checkout.spec.ts` | Regression |
| TC-CHECKOUT-003 | `checkout.spec.ts` | Regression |
| TC-CHECKOUT-004 | `checkout.spec.ts` | Regression |
| TC-CHECKOUT-005 | `checkout.spec.ts` | Smoke |

---

## Notes

These test cases are designed to validate user-facing behavior rather than implementation details.

The tests prioritize:

- Critical user flows
- High-impact regressions
- Clear expected results
- Maintainable automation coverage
- Stable selectors
- CI-friendly execution