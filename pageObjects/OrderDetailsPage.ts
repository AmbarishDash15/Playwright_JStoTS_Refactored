import { expect, type Page, type Locator } from '@playwright/test';
export class OrderDetailsPage {
    readonly page: Page;
    readonly orderSummaryLabel: Locator;
    readonly orderSummOrderID: Locator;
    readonly deliveryAddress: Locator;
    readonly orderSummItemName: Locator;
    constructor(page: Page){
        this.page = page;
        this.orderSummaryLabel = this.page.locator('div.email-title');
        this.orderSummOrderID = this.page.locator('div.col-text');
        this.deliveryAddress = this.page.locator('div.address').last();
        this.orderSummItemName = this.page.locator('div.title');
    }
    async verifyOrderDetails(orderID: string, loginEmail: string, country: string, itemToBuy: string){
        await this.orderSummaryLabel.waitFor({state: 'visible'});
        await expect(this.orderSummaryLabel).toContainText('order summary');
        expect(await this.orderSummOrderID.textContent()).toContain(orderID);
        expect(await this.deliveryAddress.locator('p.text').first().textContent()).toContain(loginEmail);
        expect(await this.deliveryAddress.locator('p.text').last().textContent()).toContain(country);
        await expect(this.orderSummItemName).toContainText(itemToBuy);
    }
}