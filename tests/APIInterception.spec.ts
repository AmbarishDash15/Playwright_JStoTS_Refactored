import {test, expect, request, type Locator} from '@playwright/test';
import {APIUtils} from '../utils/APIUtils';
interface LoginPayload { userEmail: string; userPassword: string;};
const loginPayload: LoginPayload = {userEmail:'dash.ambarish15@gmail.com',userPassword:'Password@123'};
interface EmptyOrderListRespone {data:[];message: string;};
const emptyOrderListRespone: EmptyOrderListRespone = {data:[],message:'No Orders'};
var token: string;
test.describe.configure({mode: 'parallel'});

test.beforeEach( async() => {
    const APIContext: any = await request.newContext();
    const apiUtils: APIUtils = new APIUtils(APIContext, loginPayload);
    token = await apiUtils.getToken();
})

test('Check empty order message @APInUI', async({page}) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },token);
    await page.goto('https://rahulshettyacademy.com/client');
    const homeBtn: Locator = page.locator('i.fa-home');
    const ordersBtn: Locator = page.locator('button[routerlink*="/myorders"]');
    const orderPageEmptyMsgLoc: Locator = page.locator('div.mt-4');
    const yourOrdersLabel: Locator = page.locator('h1:has-text("Your Orders")');
    await ordersBtn.click();
    await expect(yourOrdersLabel).toBeVisible();
    await homeBtn.click();
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*', async route => {
        const response: any = await page.request.fetch(route.request());
        let body: any = JSON.stringify(emptyOrderListRespone);
        route.fulfill ({
            response,
            body
        })
    })
    await ordersBtn.click();
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
    expect(await orderPageEmptyMsgLoc.textContent()).toContain('You have No Orders');
    await expect(yourOrdersLabel).toBeHidden();
})

test('Verify unauthorized error message for incorrect order @APInUI', async({page}) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },token);
    await page.goto('https://rahulshettyacademy.com/client');
    const ordersBtn: Locator = page.locator('button[routerlink*="/myorders"]');
    const unauthErrorLabel: Locator = page.locator('p.blink_me');
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*', route => {
        route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'})
    })
    await ordersBtn.click();
    await page.locator("button:has-text('View')").first().click();
    expect(await unauthErrorLabel.textContent()).toBe('You are not authorize to view this order');
})

test('Verify abort calls @APInUI',async({page})=> {
    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },token);
    await page.goto('https://rahulshettyacademy.com/client');
    const ordersBtn: Locator = page.locator('button[routerlink*="/myorders"]');
    const yourOrdersLabel: Locator = page.locator('h1:has-text("Your Orders")');
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',route => {
        route.abort();
    })
    await ordersBtn.click();
    await page.locator("button:has-text('View')").first().click();
    await expect(yourOrdersLabel).toBeHidden();
})
