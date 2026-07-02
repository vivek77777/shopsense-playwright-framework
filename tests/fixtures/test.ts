import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { validUser } from "./users";

type ShopSenseFixtures = {
    loginPage: LoginPage;
    productsPage: ProductsPage;
    checkoutPage: CheckoutPage;
    loggedInProductsPage: ProductsPage;
    checkoutWithOneItem: CheckoutPage;
};

export const test = base.extend<ShopSenseFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    loggedInProductsPage: async ({ loginPage, productsPage }, use) => {
        await loginPage.goto();
        await loginPage.login(validUser.email, validUser.password);
        await productsPage.expectLoaded();

        await use(productsPage);
    },

    checkoutWithOneItem: async (
        { loggedInProductsPage, checkoutPage },
        use
    ) => {
        await loggedInProductsPage.addProductToCart(1);
        await loggedInProductsPage.checkout();
        await checkoutPage.expectLoaded("1 item");

        await use(checkoutPage);
    },
});

export { expect };