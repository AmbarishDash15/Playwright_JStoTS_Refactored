import { test, expect, request, type Locator } from '@playwright/test';
import { APIUtils } from '../utils/APIUtils';
const loginEmail: string = 'dash.ambarish15+first@gmail.com';
const countryToSelect: string = 'India';
interface LoginPayload {userEmail : string; userPassword: string;};
const loginPayload: LoginPayload = {userEmail:loginEmail,userPassword:'Password@123'};
interface OrderPayload {orders: [{country: string, productOrderedId: string}];};
const orderPayLoad: OrderPayload = {orders:[{country:countryToSelect,productOrderedId:'68a961459320a140fe1ca57a'}]};
var utilsAPIResponse: any;

test.beforeAll(async() => {
    const APIContext: any = await request.newContext();
    const apiUtils:APIUtils = new APIUtils(APIContext, loginPayload);
    utilsAPIResponse = await apiUtils.createOrder(orderPayLoad);
})

test('API and UI validation using util @APInUI',async ({page}) => {
    const itemToBuy: string = 'ZARA COAT 3';
    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },utilsAPIResponse.token);
    const orderID: string = utilsAPIResponse.orderID;
    //Go to application and order page
    await page.goto('https://rahulshettyacademy.com/client');
    const ordersBtn: Locator = page.locator('button[routerlink*="/myorders"]');
    await ordersBtn.click();
    await page.waitForLoadState('networkidle');
    expect(await page.locator('h1.ng-star-inserted').textContent()).toContain('Your Orders');
    const orderRows: Locator = page.locator('tr.ng-star-inserted');
    const orderCount: number = await orderRows.count();
    //Search for orders based on ORDER ID in table and click on Order details
    for (var i: number = 0;i<=orderCount;i++){
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
