import { expect, type Page } from "@playwright/test";

export class CheckoutPage {
    constructor(private readonly page: Page) { }

    async expectLoaded(cartCount: string) {
        await expect(this.page.getByText("Checkout")).toBeVisible();
        await expect(this.page.getByTestId("checkout-summary")).toContainText(cartCount);
    }

    async placeOrder() {
        await this.page.getByTestId("place-order-button").click();
    }

    async fillCheckoutForm({
        fullName,
        email,
        address,
        postalCode,
    }: {
        fullName: string;
        email: string;
        address: string;
        postalCode: string;
    }) {
        await this.page.getByTestId("full-name-input").fill(fullName);
        await this.page.getByTestId("checkout-email-input").fill(email);
        await this.page.getByTestId("address-input").fill(address);
        await this.page.getByTestId("postal-code-input").fill(postalCode);
    }

    async expectRequiredFieldErrors() {
        await expect(this.page.getByTestId("full-name-error")).toContainText(
            "Full name is required"
        );
        await expect(this.page.getByTestId("checkout-email-error")).toContainText(
            "Email is required"
        );
        await expect(this.page.getByTestId("address-error")).toContainText(
            "Shipping address is required"
        );
        await expect(this.page.getByTestId("postal-code-error")).toContainText(
            "Postal code is required"
        );
    }

    async expectInvalidEmailError() {
        await expect(this.page.getByTestId("checkout-email-error")).toContainText(
            "Enter a valid email address"
        );
    }

    async expectOrderConfirmed() {
        await expect(this.page.getByTestId("order-confirmation")).toContainText(
            "Order Confirmed"
        );
    }
    async expectInvalidPostalCodeError() {
        await expect(this.page.getByTestId("postal-code-error")).toContainText(
            "Postal code must be at least 5 characters"
        );
    }
}