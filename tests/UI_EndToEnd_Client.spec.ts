import {test, expect, type Page, type Locator} from '@playwright/test';

test('End to End Client App @UI',async({browser}) => {
    const itemToBuy: string = 'ZARA COAT 3'; //testdata
    const loginEmail: string = 'dash.ambarish15+second@gmail.com'; //test data
    const context: any = await browser.newContext();
    const page: Page = await context.newPage();
    //opening application url
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.waitForLoadState('networkidle'); //waiting for network to be stable
    const eMailField: Locator = page.locator('#userEmail');
    const passwordField: Locator = page.locator('#userPassword');
    const loginButton: Locator = page.locator('#login');
    const itemNameList: Locator = page.locator('div.card-body');
    const cartButton: Locator = page.locator('button[routerlink*="cart"]');
    const cartItemName: Locator = page.locator('div.cartSection h3');
    const checkOutBtn: Locator = page.locator('text=Checkout');
    const cartItem: Locator = page.locator('div li');
    //entring credentials and logging in
    await eMailField.fill(loginEmail);
    await passwordField.fill('Password@123');
    await loginButton.click();
    //waiting for first element on home page
    await itemNameList.first().waitFor();
    //taking count and looping through elements 
    const itemCount: number = await itemNameList.count();
    for(var i: number = 0;i < itemCount;i++){
        if(await itemNameList.nth(i).locator('b').textContent() === itemToBuy){
            await itemNameList.nth(i).locator('button.w-10').click();
            await expect(page.getByText('Product Added To Cart')).toBeVisible(); //verify success message on screen
            break;
        }
    }
    //verify added item on cart page
    await page.getByText('Product Added To Cart').waitFor({state:'hidden'});
    await cartButton.click();
    await page.waitForLoadState('networkidle');
    await cartItem.first().waitFor();
    await expect(cartItemName).toContainText(itemToBuy);
        
    //go to check out page and fill details
    const creditCardNoField: Locator = page.locator('div.form__cc input').first();
    const expDateMonth: Locator = page.locator('select.input').first();
    const expDateYear: Locator = page.locator('select.input').last();
    const cvvField: Locator = page.locator('div.form__cc input').nth(1);
    const nameOnCardField: Locator = page.locator('div.form__cc input').nth(2);
    const applyCouponField: Locator = page.locator('div.form__cc input').last();
    const applyCouponBtn: Locator = page.locator('button.btn-primary');
    const emailFieldChkOut: Locator = page.locator('input.text-validated.ng-untouched');
    const countryInputField: Locator = page.locator('[placeholder*="Country"]');
    const countryList: Locator = page.locator('section.ta-results');
    const countryListItem: Locator = page.locator('span.ng-star-inserted');
    const placeOrderBtn: Locator = page.locator('.action__submit');
    const ccNo: string = '4242424242424242';
    const ccExpMonth: string = '12';
    const ccExpYear: string = '30';
    const ccCVV: string = '123';
    const ccNameOnCard: string = 'Tester';
    const couponToApply: string = 'rahulshettyacademy';
    const country: string = 'India';

    await checkOutBtn.click();
    await creditCardNoField.clear();
    await creditCardNoField.fill(ccNo);
    await expDateMonth.selectOption(ccExpMonth)
    await expDateYear.selectOption(ccExpYear);
    await cvvField.fill(ccCVV);
    await nameOnCardField.fill(ccNameOnCard);
    expect(await emailFieldChkOut.inputValue()).toBe(loginEmail);

    //interacting with type-ahead combobox
    await countryInputField.pressSequentially(country,{delay: 100}); 
    await countryList.waitFor({state : 'visible'});
    await countryListItem.last().waitFor({state : 'visible'});
    const countryCount: number = await countryListItem.count();
    for(var i: number = 0;i < countryCount;i++){
        const countryName: any = await countryListItem.nth(i).textContent();
        if(countryName.trim() === country){
            await countryListItem.nth(i).click();
            break;
        }
    }
    await applyCouponField.fill(couponToApply);
    await applyCouponBtn.click();
    await expect(page.locator('[style*="green"]')).toBeVisible();

    //Place order, verify confirmation and grab the ORDER ID
    const orderConfirmationLabel: Locator = page.locator('h1.hero-primary');
    const orderIDField: Locator = page.locator('label.ng-star-inserted');
    const prodNameConfPage: Locator = page.locator('td.m-3 div.title');
    await placeOrderBtn.click();
    await page.waitForLoadState('networkidle');
    await expect(orderConfirmationLabel).toContainText('Thankyou for the order');
    const orderIDFull: any = await orderIDField.textContent();
    const orderID: any = orderIDFull.trim().split(' ')[1];
    const ordersBtn: Locator = page.locator('button[routerlink*="/myorders"]');
    expect(await prodNameConfPage.textContent()).toBe(itemToBuy);

    //Go to Orders page and verify order
    await ordersBtn.click();
    await page.waitForLoadState('networkidle');
    const orderTable: Locator = page.locator('table tbody');
    await orderTable.waitFor({state: 'attached'});
    expect(await page.locator('h1.ng-star-inserted').textContent()).toContain('Your Orders');
    //Search for orders based on ORDER ID in table and click on Order details
    
    const orderIDCell: Locator = page.locator('th',{hasText:orderID});
    await expect(orderIDCell).toBeVisible();
    const rowOrder: Locator = page.locator('tr',{has: orderIDCell});
    const viewBtn: Locator = rowOrder.locator('button',{hasText:'View'});
    await viewBtn.click();

    //verify order id on order details page

    const orderSummaryLabel: Locator = page.locator('div.email-title');
    const orderSummOrderID: Locator = page.locator('div.col-text');
    const deliveryAddress: Locator = page.locator('div.address').last();
    const orderSummItemName: Locator = page.locator('div.title');
    await page.waitForLoadState('networkidle');
    await orderSummaryLabel.waitFor({state: 'visible'});
    await expect(orderSummaryLabel).toContainText('order summary');
    expect(await orderSummOrderID.textContent()).toContain(orderID);
    expect(await deliveryAddress.locator('p.text').first().textContent()).toContain(loginEmail);
    expect(await deliveryAddress.locator('p.text').last().textContent()).toContain(country);
    expect(await orderSummItemName.textContent()).toContain(itemToBuy);
})