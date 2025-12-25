import { type Page, type Locator } from '@playwright/test'
export class LoginPage {
    readonly page: Page;
    readonly eMailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    constructor(page: Page){
        this.page = page;
        this.eMailField = this.page.locator('#userEmail');
        this.passwordField = this.page.locator('#userPassword');
        this.loginButton = this.page.locator('#login');
    }
    async openApplicationUrl(appURL: string){
        await this.page.goto(appURL);
    }
    async validLogin(loginEmail: string,password: string){
        await this.eMailField.fill(loginEmail);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}