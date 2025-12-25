import { expect, type Locator, type Page } from '@playwright/test';
export class CartPage {
    readonly page: Page;
    readonly checkOutBtn: Locator;
    readonly cartItem: Locator;
    readonly cartItemName: Locator;
    constructor(page: Page){
        this.page = page;
        this.checkOutBtn = this.page.locator('text=Checkout');
        this.cartItem = this.page.locator('div li');
        this.cartItemName = this.page.locator('div.cartSection h3');
    }
    async verifyProductAddedToCart(itemToBuy: string){
        await this.cartItem.first().waitFor();
        await expect(this.cartItemName).toContainText(itemToBuy);
    }
    async clickCheckOut(){
        await this.checkOutBtn.click();
    }
}