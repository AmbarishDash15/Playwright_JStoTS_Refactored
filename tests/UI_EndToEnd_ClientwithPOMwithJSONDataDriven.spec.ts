import { test } from '@playwright/test';
import {PageObjectManager} from '../pageObjects/PageObjectManager';

const testData: any = JSON.parse(JSON.stringify(require('../testdata/UI_EndToEnd_Client-TestDataMultipleSet.json')))

for(const data of testData){
    test(`End to End Client App with POM with JSON Test Data for ${data.itemToBuy} @UI`,async({page}) => {
        const pageObjectManager: PageObjectManager = new PageObjectManager(page);//Initiate Page Object Manager
        
        //Navigate to Login page and perform valid login
        const loginPage: any = await pageObjectManager.getLoginPage();
        await loginPage.openApplicationUrl(data.appUrl); 
        await loginPage.validLogin(data.loginEmail,data.password); 
        
        //Search for item and add to cart
        const dashboardPage: any = await pageObjectManager.getDashboardPage();
        await dashboardPage.selectItemAndAddToCart(data.itemToBuy);
        await dashboardPage.verifyAddedToCartMsg();
        await dashboardPage.goToCart();
        
        //Verify item on Cart page and checkout
        const cartPage: any = await pageObjectManager.getCartPage();
        await cartPage.verifyProductAddedToCart(data.itemToBuy);
        await cartPage.clickCheckOut();
        
        //Enter details on Check out page and Checkout
        const checkOutPage: any = await pageObjectManager.getCheckOutPage();
        await checkOutPage.clearAndEnterCCNo(data.ccNo);
        await checkOutPage.selectExpMonthYear(data.ccExpMonth,data.ccExpYear);
        await checkOutPage.enterCVVField(data.ccCVV);
        await checkOutPage.enterNameonCCField(data.ccNameOnCard);
        await checkOutPage.verifyEmailIDPopulated(data.loginEmail);
        await checkOutPage.selectCountry(data.country); //involves type ahead combobox
        await checkOutPage.applyCoupon(data.couponToApply); //apply and verify successful coupon
        await checkOutPage.clickPlaceOrderBtn();

        //Verify order confirmation and grab the ORDER ID
        const orderConfirmationPage: any = await pageObjectManager.getOrderConfirmationPage();
        await orderConfirmationPage.verifyDetailsOnConfirmationPage(data.itemToBuy);
        const orderID: string = await orderConfirmationPage.getOrderIDFromConfPage();

        //Go to Orders page
        await dashboardPage.goToOrders();

        //Search for Order Id in Orders page and go to Order details
        const ordersPage: any = await pageObjectManager.getOrdersPage();
        await ordersPage.verifyOrdersPageLabel();
        await ordersPage.clickViewOrderButton(orderID);
        
        //verify order id and other details on Order details page
        const orderDetailsPage: any = await pageObjectManager.getOrderDetailsPage();
        await orderDetailsPage.verifyOrderDetails(orderID, data.loginEmail, data.country, data.itemToBuy);
    })
}
