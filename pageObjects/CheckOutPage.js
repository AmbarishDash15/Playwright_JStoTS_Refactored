const {expect} = require('@playwright/test');
class CheckOutPage {
    constructor(page) {
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
    async clearAndEnterCCNo(ccNo){
        await this.creditCardNoField.clear();
        await this.creditCardNoField.fill(ccNo);
    }
    async selectExpMonthYear(expMonth, expYear){
        await this.expDateMonth.selectOption(expMonth);
        await this.expDateYear.selectOption(expYear);
    }
    async enterCVVField(cvvNo){
        await this.cvvField.fill(cvvNo);
    }
    async enterNameonCCField(nameOnCC){
        await this.nameOnCardField.fill(nameOnCC);
    }
    async verifyEmailIDPopulated(loginEmail){
        expect(await this.emailFieldChkOut.inputValue()).toBe(loginEmail);
    }
    async selectCountry(countryToSelect){
        await this.countryInputField.pressSequentially(countryToSelect,{delay: 100}); 
        await this.countryList.waitFor({state : 'visible'});
        await this.countryListItem.first().waitFor({state : 'visible'});
        const countryCount = await this.countryListItem.count();
        for(var i = 0;i < countryCount;i++){
            const countryName = await this.countryListItem.nth(i).textContent();
            if(countryName.trim() === countryToSelect){
                await this.countryListItem.nth(i).click();
                break;
            }
        }
    }
    async applyCoupon(couponCode){
        await this.applyCouponField.fill(couponCode);
        await this.applyCouponBtn.click();
        await expect(this.couponSuccessMsg).toBeVisible();
    }
    async clickPlaceOrderBtn(){
        await this.placeOrderBtn.click();
    }
}
module.exports = {CheckOutPage};