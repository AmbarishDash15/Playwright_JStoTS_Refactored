class APIUtils {
    constructor(APIContext,loginPayload){
        this.APIContext = APIContext;
        this.loginPayload = loginPayload;
    }
    async getToken(){
        const APIResponse = await this.APIContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.loginPayload
            });
        const loginResponseJson = await APIResponse.json();
        const token = loginResponseJson.token;
        return token;
    }
    async createOrder(orderPayLoad){
        var utilOrderResponse = {};
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
module.exports = {APIUtils}