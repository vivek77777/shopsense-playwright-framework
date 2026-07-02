import { expect, type Page } from "@playwright/test";

export class ProductsPage {
    constructor(private readonly page: Page) { }

    async expectLoaded() {
        await expect(this.page.getByText("ShopSense Products")).toBeVisible();
        await expect(this.page.getByTestId("user-menu")).toContainText("QA User");
    }

    async searchProduct(productName: string) {
        await this.page.getByTestId("product-search").fill(productName);
    }

    async addProductToCart(productId: number) {
        await this.page.getByTestId(`add-to-cart-${productId}`).click();
    }

    async increaseQuantity(productId: number) {
        await this.page.getByTestId(`increase-quantity-${productId}`).click();
    }

    async decreaseQuantity(productId: number) {
        await this.page.getByTestId(`decrease-quantity-${productId}`).click();
    }

    async removeItem(productId: number) {
        await this.page.getByTestId(`remove-item-${productId}`).click();
    }

    async checkout() {
        await this.page.getByTestId("checkout-button").click();
    }

    async expectProductVisible(productName: string) {
        await expect(this.page.getByText(productName)).toBeVisible();
    }

    async expectCartCount(countText: string) {
        await expect(this.page.getByTestId("cart-count")).toContainText(countText);
    }

    async expectCartTotal(totalText: string) {
        await expect(this.page.getByTestId("cart-total")).toContainText(totalText);
    }

    async expectCartItemQuantity(productId: number, quantityText: string) {
        await expect(this.page.getByTestId(`cart-item-quantity-${productId}`))
            .toContainText(quantityText);
    }

    async expectEmptyCart() {
        await expect(this.page.getByTestId("empty-cart-message")).toContainText(
            "Your cart is empty."
        );
    }

    async expectOutOfStockProductDisabled(productId: number) {
        await expect(this.page.getByTestId(`add-to-cart-${productId}`)).toBeDisabled();
    }
    async expectNoProductsFound() {
        await expect(this.page.getByTestId("no-products-message")).toContainText(
            "No products found."
        );
    }

    async expectCheckoutUnavailable() {
        await expect(this.page.getByTestId("checkout-button")).toBeHidden();
    }
}
