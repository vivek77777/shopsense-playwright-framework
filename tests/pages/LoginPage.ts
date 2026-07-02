import { expect, type Page } from "@playwright/test";

export class LoginPage {
    constructor(private readonly page: Page) { }

    async goto() {
        await this.page.goto("/");
    }

    async login(email: string, password: string) {
        await this.page.getByTestId("email-input").fill(email);
        await this.page.getByTestId("password-input").fill(password);
        await this.page.getByTestId("login-button").click();
    }

    async expectLoginError(message: string) {
        await expect(this.page.getByTestId("login-error")).toContainText(message);
    }
}