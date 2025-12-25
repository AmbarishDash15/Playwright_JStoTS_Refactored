const {expect} = require('@playwright/test');
class CartPage {
    constructor(page){
        this.page = page;
        this.checkOutBtn = this.page.locator('text=Checkout');
        this.cartItem = this.page.locator('div li');
        this.cartItemName = this.page.locator('div.cartSection h3');
    }
    async verifyProductAddedToCart(itemToBuy){
        await this.cartItem.first().waitFor();
        await expect(this.cartItemName).toContainText(itemToBuy);
    }
    async clickCheckOut(){
        await this.checkOutBtn.click();
    }
}
module.exports = {CartPage};