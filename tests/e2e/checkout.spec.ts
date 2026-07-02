import { test } from "../fixtures/test";
import {
    validCheckoutData,
    invalidEmailCheckoutData,
    invalidPostalCodeCheckoutData,
} from "../fixtures/checkoutData";

test.describe("Checkout", () => {
    test("@smoke checkout page shows selected cart count", async ({
        checkoutWithOneItem,
    }) => {
        await checkoutWithOneItem.expectLoaded("1 item");
    });

    test("@regression empty checkout form shows required field errors", async ({
        checkoutWithOneItem,
    }) => {
        await checkoutWithOneItem.placeOrder();

        await checkoutWithOneItem.expectRequiredFieldErrors();
    });

    test("@regression invalid checkout email shows validation error", async ({
        checkoutWithOneItem,
    }) => {
        await checkoutWithOneItem.fillCheckoutForm(invalidEmailCheckoutData);

        await checkoutWithOneItem.placeOrder();

        await checkoutWithOneItem.expectInvalidEmailError();
    });

    test("@regression invalid postal code shows validation error", async ({
        checkoutWithOneItem,
    }) => {
        await checkoutWithOneItem.fillCheckoutForm(invalidPostalCodeCheckoutData);

        await checkoutWithOneItem.placeOrder();

        await checkoutWithOneItem.expectInvalidPostalCodeError();
    });

    test("@smoke user can place order with valid checkout details", async ({
        checkoutWithOneItem,
    }) => {
        await checkoutWithOneItem.fillCheckoutForm(validCheckoutData);

        await checkoutWithOneItem.placeOrder();

        await checkoutWithOneItem.expectOrderConfirmed();
    });
});