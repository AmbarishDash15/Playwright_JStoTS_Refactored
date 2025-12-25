const {expect} = require('@playwright/test');
class OrdersPage {
    constructor(page){
        this.page = page;
        this.yourOrdersLabel = this.page.locator('h1.ng-star-inserted');
        this.orderRows = this.page.locator('tr.ng-star-inserted');
    }
    async verifyOrdersPageLabel(){
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.yourOrdersLabel).toContainText('Your Orders');
    }
    async clickViewOrderButton(orderID){
        await this.orderRows.first().waitFor();
        const orderCount = await this.orderRows.count();
        //Search for orders based on ORDER ID in table and click on Order details
        for (var i = 0;i<=orderCount;i++){
            if(await this.orderRows.nth(i).locator('th').textContent() === orderID){
                this.orderRows.nth(i).locator('button.btn-primary').click();
                break;
            }
        }
    }
}
module.exports = {OrdersPage};