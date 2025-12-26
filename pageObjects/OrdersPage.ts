import { expect, type Page, type Locator } from '@playwright/test';
export class OrdersPage {
    readonly page: Page;
    readonly yourOrdersLabel: Locator;
    readonly orderTable: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.yourOrdersLabel = this.page.locator('h1.ng-star-inserted');
        this.orderTable = this.page.locator('table tbody'); 
    }
    async verifyOrdersPageLabel(){
        await this.page.waitForLoadState('networkidle');
        await this.orderTable.waitFor({state: 'attached'});
        await expect(this.yourOrdersLabel).toContainText('Your Orders');
    }
    async verifyOrderNumber(orderID: string){
        const orderIDCell: Locator = this.page.locator('th',{hasText:orderID});
        await expect(orderIDCell).toBeVisible();
    }
    async clickViewOrderButton(orderID: string){
        const orderIDCell: Locator = this.page.locator('th',{hasText:orderID});
        const rowOrder: Locator = this.page.locator('tr',{has: orderIDCell});
        const viewBtn: Locator = rowOrder.locator('button',{hasText:'View'});
        await viewBtn.click();
    }
}