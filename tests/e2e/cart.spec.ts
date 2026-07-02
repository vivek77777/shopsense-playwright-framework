import { test } from "../fixtures/test";
import { productData } from "../fixtures/products";

test.describe("Cart", () => {
    test("@smoke user can search and add product to cart", async ({
        loggedInProductsPage,
    }) => {
        await loggedInProductsPage.searchProduct(productData.wirelessMouse.name);
        await loggedInProductsPage.expectProductVisible(productData.wirelessMouse.name);
        await loggedInProductsPage.addProductToCart(productData.wirelessMouse.id);

        await loggedInProductsPage.expectCartCount("1 item");
        await loggedInProductsPage.expectCartTotal(productData.wirelessMouse.price);
    });

    test("@regression search with no matching product shows empty result message", async ({
        loggedInProductsPage,
    }) => {
        await loggedInProductsPage.searchProduct("Laptop Stand");

        await loggedInProductsPage.expectNoProductsFound();
    });

    test("@regression empty cart shows empty state and checkout is unavailable", async ({
        loggedInProductsPage,
    }) => {
        await loggedInProductsPage.expectEmptyCart();
        await loggedInProductsPage.expectCheckoutUnavailable();
    });

    test("@regression user can increase and decrease item quantity", async ({
        loggedInProductsPage,
    }) => {
        await loggedInProductsPage.addProductToCart(productData.wirelessMouse.id);
        await loggedInProductsPage.increaseQuantity(productData.wirelessMouse.id);

        await loggedInProductsPage.expectCartItemQuantity(
            productData.wirelessMouse.id,
            "Quantity: 2"
        );
        await loggedInProductsPage.expectCartTotal("$59.98");

        await loggedInProductsPage.decreaseQuantity(productData.wirelessMouse.id);

        await loggedInProductsPage.expectCartItemQuantity(
            productData.wirelessMouse.id,
            "Quantity: 1"
        );
        await loggedInProductsPage.expectCartTotal("$29.99");
    });

    test("@regression user can remove item from cart", async ({
        loggedInProductsPage,
    }) => {
        await loggedInProductsPage.addProductToCart(productData.wirelessMouse.id);
        await loggedInProductsPage.removeItem(productData.wirelessMouse.id);

        await loggedInProductsPage.expectEmptyCart();
    });

    test("@regression cart total updates after adding multiple products", async ({
        loggedInProductsPage,
    }) => {
        await loggedInProductsPage.addProductToCart(productData.wirelessMouse.id);
        await loggedInProductsPage.addProductToCart(productData.mechanicalKeyboard.id);

        await loggedInProductsPage.expectCartCount("2 item");
        await loggedInProductsPage.expectCartTotal("$119.98");
    });

    test("@regression out of stock product cannot be added to cart", async ({
        loggedInProductsPage,
    }) => {
        await loggedInProductsPage.expectOutOfStockProductDisabled(
            productData.usbHub.id
        );
    });
});