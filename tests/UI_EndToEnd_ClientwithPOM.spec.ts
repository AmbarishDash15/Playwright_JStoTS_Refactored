import {test} from '@playwright/test';
import {PageObjectManager} from '../pageObjects/PageObjectManager';

test('End to End Client App with POM @UI',async({page}) => {
    const appUrl: string = 'https://rahulshettyacademy.com/client/#/auth/login'; //test data
    const loginEmail: string = 'dash.ambarish15+sixth@gmail.com'; //test data
    const password: string = 'Password@123'; //test data
    const itemToBuy: string = 'ZARA COAT 3'; //testdata
    const ccNo: string = '4242424242424242'; //testdata
    const ccExpMonth: string = '12'; //testdata
    const ccExpYear: string = '30'; //testdata
    const ccCVV: string = '123'; //testdata
    const ccNameOnCard: string = 'Tester'; //testdata
    const couponToApply: string = 'rahulshettyacademy'; //testdata
    const country: string = 'India'; //testdata

    const pageObjectManager: PageObjectManager = new PageObjectManager(page);//Initiate Page Object Manager
    
    //Navigate to Login page and perform valid login
    const loginPage: any = pageObjectManager.getLoginPage();
    await loginPage.openApplicationUrl(appUrl); 
    await loginPage.validLogin(loginEmail,password); 
    
    //Search for item and add to cart
    const dashboardPage: any = pageObjectManager.getDashboardPage();
    await dashboardPage.selectItemAndAddToCart(itemToBuy);
    await dashboardPage.verifyAddedToCartMsg();
    await dashboardPage.goToCart();
    
    //Verify item on Cart page and checkout
    const cartPage: any = pageObjectManager.getCartPage();
    await cartPage.verifyProductAddedToCart(itemToBuy);
    await cartPage.clickCheckOut();
    
    //Enter details on Check out page and Checkout
    const checkOutPage: any = pageObjectManager.getCheckOutPage();
    await checkOutPage.clearAndEnterCCNo(ccNo);
    await checkOutPage.selectExpMonthYear(ccExpMonth,ccExpYear);
    await checkOutPage.enterCVVField(ccCVV);
    await checkOutPage.enterNameonCCField(ccNameOnCard);
    await checkOutPage.verifyEmailIDPopulated(loginEmail);
    await checkOutPage.selectCountry(country); //involves type ahead combobox
    await checkOutPage.applyCoupon(couponToApply); //apply and verify successful coupon
    await checkOutPage.clickPlaceOrderBtn();

    //Verify order confirmation and grab the ORDER ID
    const orderConfirmationPage: any = pageObjectManager.getOrderConfirmationPage();
    await orderConfirmationPage.verifyDetailsOnConfirmationPage(itemToBuy);
    const orderID: string = await orderConfirmationPage.getOrderIDFromConfPage();

    //Go to Orders page
    await dashboardPage.goToOrders();

    //Search for Order Id in Orders page and go to Order details
    const ordersPage: any = pageObjectManager.getOrdersPage();
    await ordersPage.verifyOrdersPageLabel();
    await ordersPage.verifyOrderNumber(orderID);
    await ordersPage.clickViewOrderButton(orderID);
    
    //verify order id and other details on Order details page
    const orderDetailsPage: any = pageObjectManager.getOrderDetailsPage();
    await orderDetailsPage.verifyOrderDetails(orderID, loginEmail, country, itemToBuy);
})