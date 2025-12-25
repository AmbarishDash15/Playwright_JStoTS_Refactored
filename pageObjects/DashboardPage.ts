import { expect, type Locator, type Page} from '@playwright/test';
export class DashboardPage {
    readonly page: Page;
    readonly itemNameList: Locator;
    readonly cartButton: Locator;
    readonly addedToCartMessage: Locator;
    readonly ordersBtn: Locator;
    constructor(page: Page){
        this.page = page;
        this.itemNameList = this.page.locator('div.card-body');
        this.cartButton = this.page.locator('button[routerlink*="cart"]');
        this.addedToCartMessage = this.page.locator('div[role="alert"]');
        this.ordersBtn = page.locator('button[routerlink*="/myorders"]');
    }
    async selectItemAndAddToCart(itemToSelect: string){
        await this.itemNameList.first().waitFor();
        const itemCount: number = await this.itemNameList.count();
        for(var i = 0;i < itemCount;i++){
            if(await this.itemNameList.nth(i).locator('b').textContent() === itemToSelect){
                await this.itemNameList.nth(i).locator('button.w-10').click();
                break;
            }
        }
    }
    async verifyAddedToCartMsg(){
        await expect(this.addedToCartMessage).toContainText('Product Added To Cart'); //verify success message on screen
    }

    async goToCart(){
        await this.cartButton.click();
    }
    async goToOrders(){
        await this.ordersBtn.click()
    }
}