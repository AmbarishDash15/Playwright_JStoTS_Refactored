import {test,expect,request, type Locator} from '@playwright/test';
test.describe.configure({mode: 'serial'});
const loginEmail: string = 'dash.ambarish15+api@gmail.com';
interface LoginPayload { userEmail: string; userPassword: string;}
const loginPayload: LoginPayload = {userEmail:loginEmail,userPassword:'Password@123'};
const countryToSelect = 'India';
interface OrderPayLoad { orders: [{country: string; productOrderedId: string}] }
const orderPayLoad: OrderPayLoad = {orders:[{country:countryToSelect,productOrderedId:'68a961459320a140fe1ca57a'}]};
var token: string;
var orderID: string;

test.beforeEach(async() => {
    const APIContext: any = await request.newContext();
    const APIResponse: any = await APIContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',{data: loginPayload});
    expect(APIResponse.ok()).toBeTruthy();
    const loginResponseJson: any = await APIResponse.json();
    token = loginResponseJson.token;
})

test('End to End using API Login @APInUI', async({page}) => {
    const itemToBuy: string = 'ADIDAS ORIGINAL';
    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },token);
    await page.goto('https://rahulshettyacademy.com/client');
    const itemNameList: Locator = page.locator('div.card-body');
    const cartButton: Locator = page.locator('button[routerlink*="cart"]');
    const checkOutBtn: Locator = page.locator('li.totalRow button');
    const cartItem: Locator = page.locator('div li');
    const cartItemName: Locator = page.locator('div.cartSection h3');
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

    await checkOutBtn.click();
    await creditCardNoField.clear();
    await creditCardNoField.fill(ccNo);
    await expDateMonth.selectOption(ccExpMonth)
    await expDateYear.selectOption(ccExpYear);
    await cvvField.fill(ccCVV);
    await nameOnCardField.fill(ccNameOnCard);
    expect(await emailFieldChkOut.inputValue()).toBe(loginEmail);

    //interacting with type-ahead combobox
    await countryInputField.pressSequentially(countryToSelect,{delay: 100}); 
    await countryList.waitFor({state : 'visible'});
    await countryListItem.last().waitFor({state : 'visible'});
    const countryCount: number = await countryListItem.count();
    for(var i: number = 0;i < countryCount;i++){
        const countryName: any = await countryListItem.nth(i).textContent();
        if(countryName.trim() === countryToSelect){
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
    await orderConfirmationLabel.waitFor({state:'visible'});
    await expect(orderConfirmationLabel).toContainText('Thankyou for the order');
    const orderIDFull: any = await orderIDField.textContent();
    orderID = orderIDFull.trim().split(' ')[1];
    const ordersBtn: Locator = page.locator('button[routerlink*="/myorders"]');
    await expect( prodNameConfPage).toHaveText(itemToBuy);

    //Go to Orders page and verify order
    await ordersBtn.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h1.ng-star-inserted')).toContainText('Your Orders');
    const orderRows: Locator = page.locator('tr.ng-star-inserted');
    const orderCount: number = await orderRows.count();
    //Search for orders based on ORDER ID in table and click on Order details
    for (var i: number = 0;i<orderCount;i++){
        if(await orderRows.nth(i).locator('th').textContent() === orderID){
            orderRows.nth(i).locator('button.btn-primary').click();
            break;
        }
    }

    //verify order id on order details page

    const orderSummaryLabel: Locator = page.locator('div.email-title');
    const orderSummOrderID: Locator = page.locator('div.col-text');
    const deliveryAddress: Locator = page.locator('div.address').last();
    const orderSummItemName: Locator = page.locator('div.title');
    await orderSummaryLabel.waitFor({state: 'visible'});
    await expect(orderSummaryLabel).toContainText('order summary');
    expect(await orderSummOrderID.textContent()).toContain(orderID);
    expect(await deliveryAddress.locator('p.text').first().textContent()).toContain(loginEmail);
    expect(await deliveryAddress.locator('p.text').last().textContent()).toContain(countryToSelect);
    expect(await orderSummItemName.textContent()).toContain(itemToBuy);
})

test('Login and Order with API and order UI Validation @APInUI',async({page}) => {
    const itemToBuy: string = 'ZARA COAT 3';
    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },token);
    const APIContext: any = await request.newContext({ignoreHTTPSErrors: true});
    const APIOrderResponse: any = await APIContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
        {
            data: orderPayLoad,
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        }
    )
    await expect(APIOrderResponse.ok).toBeTruthy();
    const orderResponseJson: any = await APIOrderResponse.json();
    orderID = orderResponseJson.orders[0];
    //Go to application and order page
    await page.goto('https://rahulshettyacademy.com/client');
    const ordersBtn: Locator = page.locator('button[routerlink*="/myorders"]');
    await ordersBtn.click();
    await page.waitForLoadState('networkidle');
    expect(await page.locator('h1.ng-star-inserted').textContent()).toContain('Your Orders');
    const orderRows: Locator = page.locator('tr.ng-star-inserted');
    const orderCount: number = await orderRows.count();
    //Search for orders based on ORDER ID in table and click on Order details
    for (var i: number = 0;i<orderCount;i++){
        if(await orderRows.nth(i).locator('th').textContent() === orderID){
            orderRows.nth(i).locator('button.btn-primary').click();
            break;
        }
    }

    //verify order id on order details page

    const orderSummaryLabel: Locator = page.locator('div.email-title');
    const orderSummOrderID: Locator = page.locator('div.col-text');
    const deliveryAddress: Locator = page.locator('div.address').last();
    const orderSummItemName: Locator = page.locator('div.title');
    await page.waitForLoadState('networkidle');
    expect(await orderSummaryLabel.textContent()).toContain('order summary');
    expect(await orderSummOrderID.textContent()).toContain(orderID);
    expect(await deliveryAddress.locator('p.text').first().textContent()).toContain(loginEmail);
    expect(await deliveryAddress.locator('p.text').last().textContent()).toContain(countryToSelect);
    expect(await orderSummItemName.textContent()).toContain(itemToBuy);
})