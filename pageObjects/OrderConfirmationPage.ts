import { expect, type Page, type Locator } from '@playwright/test'; 
export class OrderConfirmationPage{
    readonly page: Page;
    readonly orderConfirmationLabel: Locator;
    readonly orderIDField: Locator;
    readonly prodNameConfPage: Locator;
    constructor(page: Page){
        this.page = page;
        this.orderConfirmationLabel = this.page.locator('h1.hero-primary');
        this.orderIDField = this.page.locator('label.ng-star-inserted');
        this.prodNameConfPage = this.page.locator('td.m-3 div.title');
    }
    async verifyDetailsOnConfirmationPage(itemToBuy: string){
        await expect(this.orderConfirmationLabel).toContainText('Thankyou for the order');
        await expect(this.prodNameConfPage).toContainText(itemToBuy);
    }
    async getOrderIDFromConfPage(){
        const orderIDFull: any = await this.orderIDField.textContent();
        const orderID: string = orderIDFull.trim().split(' ')[1];
        return orderID;
    }
}