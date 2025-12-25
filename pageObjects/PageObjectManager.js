const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CartPage} = require('./CartPage');
const {CheckOutPage} = require('./CheckOutPage');
const {OrderConfirmationPage} = require('./OrderConfirmationPage');
const {OrdersPage} = require('./OrdersPage');
const {OrderDetailsPage} = require('./OrderDetailsPage');
class PageObjectManager {
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkOutPage = new CheckOutPage(this.page);
        this.orderConfirmationPage = new OrderConfirmationPage(this.page);
        this.ordersPage = new OrdersPage(this.page);
        this.orderDetailsPage = new OrderDetailsPage(this.page);
    }
    getLoginPage(){
        return this.loginPage;
    }
    getDashboardPage(){
        return this.dashboardPage;
    }
    getCartPage(){
        return this.cartPage;
    }
    getCheckOutPage(){
        return this.checkOutPage;
    }
    getOrderConfirmationPage(){
        return this.orderConfirmationPage;
    }
    getOrdersPage(){
        return this.ordersPage;
    }
    getOrderDetailsPage(){
        return this.orderDetailsPage;
    }
}
module.exports = {PageObjectManager};