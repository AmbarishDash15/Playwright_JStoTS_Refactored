const {expect} = require('@playwright/test');
class OrderDetailsPage {
    constructor(page){
        this.page = page;
        this.orderSummaryLabel = this.page.locator('div.email-title');
        this.orderSummOrderID = this.page.locator('div.col-text');
        this.deliveryAddress = this.page.locator('div.address').last();
        this.orderSummItemName = this.page.locator('div.title');
    }
    async verifyOrderDetails(orderID, loginEmail, country, itemToBuy){
        await this.orderSummaryLabel.waitFor({state: 'visible'});
        await expect(this.orderSummaryLabel).toContainText('order summary');
        expect(await this.orderSummOrderID.textContent()).toContain(orderID);
        expect(await this.deliveryAddress.locator('p.text').first().textContent()).toContain(loginEmail);
        expect(await this.deliveryAddress.locator('p.text').last().textContent()).toContain(country);
        await expect(this.orderSummItemName).toContainText(itemToBuy);
    }
}
module.exports = {OrderDetailsPage};