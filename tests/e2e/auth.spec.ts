import { test } from "../fixtures/test";
import { validUser, invalidUser } from "../fixtures/users";

test.describe("Authentication", () => {
    test("valid user can log in successfully", async ({
        loginPage,
        productsPage,
    }) => {
        await loginPage.goto();
        await loginPage.login(validUser.email, validUser.password);

        await productsPage.expectLoaded();
    });

    test("invalid user sees login error", async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(invalidUser.email, invalidUser.password);

        await loginPage.expectLoginError("Invalid email or password");
    });
});