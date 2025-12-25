const {expect} = require('@playwright/test');
class OrderConfirmationPage{
    constructor(page){
        this.page = page;
        this.orderConfirmationLabel = this.page.locator('h1.hero-primary');
        this.orderIDField = this.page.locator('label.ng-star-inserted');
        this.prodNameConfPage = this.page.locator('td.m-3 div.title');
    }
    async verifyDetailsOnConfirmationPage(itemToBuy){
        await expect(this.orderConfirmationLabel).toContainText('Thankyou for the order');
        await expect(this.prodNameConfPage).toContainText(itemToBuy);
    }
    async getOrderIDFromConfPage(){
        const orderIDFull = await this.orderIDField.textContent();
        const orderID = orderIDFull.trim().split(' ')[1];
        return orderID;
    }
}
module.exports = {OrderConfirmationPage}