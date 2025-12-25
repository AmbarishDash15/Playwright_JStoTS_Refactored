export class APIUtils {
    readonly APIContext: any;
    readonly loginPayload: any;
    constructor(APIContext: any,loginPayload: any){
        this.APIContext = APIContext;
        this.loginPayload = loginPayload;
    }
    async getToken(){
        const APIResponse = await this.APIContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.loginPayload
            });
        const loginResponseJson: any = await APIResponse.json();
        const token: any = loginResponseJson.token;
        return token;
    }
    async createOrder(orderPayLoad: any){
        var utilOrderResponse = {token: String, orderID: String};
        utilOrderResponse.token = await this.getToken();
        const APIOrderResponse = await this.APIContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: orderPayLoad,
                headers: {
                    'Authorization' : utilOrderResponse.token,
                    'Content-Type' : 'application/json'
                }
            }
        )
        const orderResponseJson = await APIOrderResponse.json();
        utilOrderResponse.orderID = orderResponseJson.orders[0];
        return utilOrderResponse;
    }
}