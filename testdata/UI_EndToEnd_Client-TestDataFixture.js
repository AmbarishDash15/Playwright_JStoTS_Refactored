const base = require('@playwright/test');

exports.customTest = base.test.extend(
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