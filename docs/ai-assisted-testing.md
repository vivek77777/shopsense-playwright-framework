# AI-Assisted Testing Approach

## Overview

This document explains how AI tools such as ChatGPT, Claude, or similar LLMs can be used to accelerate test design and improve test coverage for the ShopSense Playwright automation framework.

The goal is not to blindly generate test code. The goal is to use AI as a testing assistant for brainstorming scenarios, identifying edge cases, reviewing coverage gaps, and improving maintainability.

---

## Why Use AI in Testing?

AI can help QA engineers and automation developers work faster by supporting:

- Test case brainstorming
- Edge-case discovery
- Negative scenario generation
- Test data ideas
- Validation rule review
- Flaky-test investigation
- Assertion improvement
- Code refactoring suggestions
- Documentation drafting

AI is most useful when paired with human review, domain knowledge, and risk-based testing judgment.

---

## How AI Was Used in This Project

For the ShopSense project, AI-assisted testing was applied in the following ways:

1. Reviewing the application flow
2. Identifying high-risk user journeys
3. Suggesting positive and negative test scenarios
4. Generating edge cases for cart and checkout validation
5. Improving test naming and readability
6. Organizing tests into smoke and regression suites
7. Drafting test strategy documentation

---

## Example Prompt: Test Case Generation

### Prompt

```text
You are a QA Automation Engineer.

Given this user flow:

Login → Search Product → Add to Cart → Update Quantity → Checkout → Place Order

Generate Playwright E2E test scenarios covering:
- Positive cases
- Negative cases
- Boundary cases
- Validation cases
- Edge cases
- High-priority smoke tests
```

### Example Output Reviewed

AI suggested scenarios such as:

- Valid user can log in successfully
- Invalid user sees login error
- User can search and add product to cart
- Search with no matching product shows empty result message
- User can increase and decrease item quantity
- User can remove item from cart
- Empty checkout form shows required field errors
- Invalid email shows validation error
- Invalid postal code shows validation error
- User can place order with valid checkout details

These were reviewed, filtered, and implemented as Playwright tests.

---

## Example Prompt: Edge-Case Discovery

### Prompt

```text
Review this checkout form:

Fields:
- Full Name
- Email
- Shipping Address
- Postal Code

What validation and edge cases should be tested?
```

### Useful AI Suggestions

- Empty full name
- Empty email
- Invalid email format
- Empty address
- Empty postal code
- Postal code too short
- Valid form submission
- Error messages disappear after valid input
- Form should not submit when invalid

Implemented examples include:

- Required field validation
- Invalid email validation
- Invalid postal code validation
- Successful checkout with valid data

---

## Example Prompt: Flaky-Test Prevention

### Prompt

```text
Review this Playwright test and suggest ways to make it less flaky.

Focus on:
- Selectors
- Waiting strategy
- Assertions
- Test data
- Setup duplication
```

### Useful AI Suggestions

AI suggested:

- Avoid hard waits
- Use Playwright auto-waiting assertions
- Prefer `data-testid` selectors
- Keep setup inside reusable fixtures
- Use Page Object Model
- Keep test data separate from test logic
- Use trace, video, and screenshot only on failure

These recommendations influenced the framework design.

---

## Human Review Process

AI-generated suggestions were not accepted automatically.

Each suggestion was reviewed using the following questions:

1. Does this test cover a realistic user risk?
2. Would this failure matter to a user or business?
3. Is this test maintainable?
4. Is the assertion meaningful?
5. Is the test duplicating another scenario?
6. Can this test be stable in CI?
7. Should this be smoke or regression?

Only useful scenarios were implemented.

---

## AI-Assisted Test Categories

### Smoke Candidates

AI helped identify the smallest set of high-value smoke tests:

- Valid login
- Add product to cart
- Checkout page loads
- Place order successfully

These tests validate the critical happy path.

### Regression Candidates

AI also helped identify broader regression coverage:

- Invalid login
- Empty cart behavior
- Search no-results behavior
- Quantity increase/decrease
- Remove item from cart
- Invalid checkout email
- Invalid postal code
- Required checkout fields

These tests validate negative and edge-case behavior.

---

## Benefits Observed

Using AI during the testing process helped with:

- Faster test scenario brainstorming
- Better edge-case coverage
- Clearer test names
- Better documentation
- More maintainable test structure
- Stronger separation between smoke and regression tests

---

## Risks of AI-Generated Tests

AI-generated tests can introduce risks if used without review.

Potential risks include:

- Generating low-value test cases
- Creating duplicate scenarios
- Suggesting brittle selectors
- Missing business context
- Making incorrect assumptions about the application
- Over-testing implementation details instead of user behavior

For this reason, AI should support QA judgment, not replace it.

---

## Best Practices Used

The following best practices were followed:

- Use AI for brainstorming, not blind implementation
- Review every AI-generated scenario manually
- Prioritize user-impacting flows
- Keep tests readable and focused
- Use Page Object Model for maintainability
- Use custom fixtures for reusable setup
- Use stable `data-testid` selectors
- Keep test data in fixture files
- Run tests in CI for validation
- Review reports and artifacts for failures

---

## Example: From AI Suggestion to Playwright Test

### AI Suggestion

```text
Test that a user cannot submit checkout with an invalid email address.
```

### Final Playwright Test

```ts
test("@regression invalid checkout email shows validation error", async ({
  checkoutWithOneItem,
}) => {
  await checkoutWithOneItem.fillCheckoutForm(invalidEmailCheckoutData);

  await checkoutWithOneItem.placeOrder();

  await checkoutWithOneItem.expectInvalidEmailError();
});
```

This final version uses:

- Custom fixture setup
- Test data fixture
- Page Object Model method
- Clear regression tag
- Meaningful assertion

---

## Conclusion

AI tools can accelerate test development when used responsibly.

In this project, AI was used to support test design, edge-case discovery, documentation, and framework improvement. Human review was applied before implementation to ensure that each test added real value, remained maintainable, and aligned with user risk.

The result is a more thoughtful and scalable Playwright automation framework.