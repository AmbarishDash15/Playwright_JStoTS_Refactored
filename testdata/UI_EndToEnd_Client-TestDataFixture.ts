import {test as baseTest} from '@playwright/test';
interface TestDataForOrder {
    appUrl : string;
    loginEmail : string;
    password : string;
    itemToBuy : string;
    ccNo : string;
    ccExpMonth : string;
    ccExpYear : string;
    ccCVV : string;
    ccNameOnCard : string;
    couponToApply : string;
    country : string;
}

export const customTest = baseTest.extend<{testDataForOrder: TestDataForOrder}>(
    {
        testDataForOrder : {
            appUrl : "https://rahulshettyacademy.com/client",
            loginEmail : "dash.ambarish15+seventh@gmail.com",
            password : "Password@123",
            itemToBuy : "ZARA COAT 3",
            ccNo : "4242424242424242",
            ccExpMonth : "12",
            ccExpYear : "30",
            ccCVV : "123",
            ccNameOnCard : "Tester",
            couponToApply : "rahulshettyacademy",
            country : "India"
        }
    }
)