import {type Page} from '@playwright/test';
import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { CartPage } from './CartPage';
import { CheckOutPage } from './CheckOutPage';
import { OrderConfirmationPage } from './OrderConfirmationPage';
import { OrdersPage } from './OrdersPage';
import { OrderDetailsPage } from './OrderDetailsPage';
export class PageObjectManager {
    readonly page: Page;
    readonly loginPage: LoginPage;
    readonly dashboardPage: DashboardPage;
    readonly cartPage: CartPage;
    readonly checkOutPage: CheckOutPage;
    readonly orderConfirmationPage: OrderConfirmationPage;
    readonly ordersPage: OrdersPage;
    readonly orderDetailsPage: OrderDetailsPage;
    constructor(page: Page){
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