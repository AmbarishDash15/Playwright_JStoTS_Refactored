import {expect, type Locator, type Page} from '@playwright/test';
export class CheckOutPage {
    readonly page: Page;
    readonly creditCardNoField: Locator;
    readonly expDateMonth: Locator;
    readonly expDateYear: Locator;
    readonly cvvField: Locator;
    readonly nameOnCardField: Locator;
    readonly applyCouponField: Locator;
    readonly applyCouponBtn: Locator;
    readonly emailFieldChkOut: Locator;
    readonly countryInputField: Locator;
    readonly countryList: Locator;
    readonly countryListItem: Locator;
    readonly placeOrderBtn: Locator;
    readonly couponSuccessMsg: Locator;
    constructor(page: Page) {
        this.page = page;
        this.creditCardNoField = this.page.locator('div.form__cc input').first();
        this.expDateMonth = this.page.locator('select.input').first();
        this.expDateYear = this.page.locator('select.input').last();
        this.cvvField = this.page.locator('div.form__cc input').nth(1);
        this.nameOnCardField = this.page.locator('div.form__cc input').nth(2);
        this.applyCouponField = this.page.locator('div.form__cc input').last();
        this.applyCouponBtn = this.page.locator('button.btn-primary');
        this.emailFieldChkOut = this.page.locator('input.text-validated.ng-untouched');
        this.countryInputField = this.page.locator('[placeholder*="Country"]');
        this.countryList = this.page.locator('section.ta-results');
        this.countryListItem = this.page.locator('span.ng-star-inserted');
        this.placeOrderBtn = this.page.locator('.action__submit');
        this.couponSuccessMsg = this.page.locator('[style*="green"]');
    }
    async clearAndEnterCCNo(ccNo: string){
        await this.creditCardNoField.clear();
        await this.creditCardNoField.fill(ccNo);
    }
    async selectExpMonthYear(expMonth: string, expYear: string){
        await this.expDateMonth.selectOption(expMonth);
        await this.expDateYear.selectOption(expYear);
    }
    async enterCVVField(cvvNo: string){
        await this.cvvField.fill(cvvNo);
    }
    async enterNameonCCField(nameOnCC: string){
        await this.nameOnCardField.fill(nameOnCC);
    }
    async verifyEmailIDPopulated(loginEmail: string){
        expect(await this.emailFieldChkOut.inputValue()).toBe(loginEmail);
    }
    async selectCountry(countryToSelect: string){
        await this.countryInputField.pressSequentially(countryToSelect,{delay: 100}); 
        await this.countryList.waitFor({state : 'visible'});
        await this.countryListItem.first().waitFor({state : 'visible'});
        const countryCount: number = await this.countryListItem.count();
        for(var i: number = 0;i < countryCount;i++){
            const countryName: any = await this.countryListItem.nth(i).textContent();
            if(countryName.trim() === countryToSelect){
                await this.countryListItem.nth(i).click();
                break;
            }
        }
    }
    async applyCoupon(couponCode: string){
        await this.applyCouponField.fill(couponCode);
        await this.applyCouponBtn.click();
        await expect(this.couponSuccessMsg).toBeVisible();
    }
    async clickPlaceOrderBtn(){
        await this.placeOrderBtn.click();
    }
}