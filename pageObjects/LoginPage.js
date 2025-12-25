class LoginPage {
    constructor(page){
        this.page = page;
        this.eMailField = this.page.locator('#userEmail');
        this.passwordField = this.page.locator('#userPassword');
        this.loginButton = this.page.locator('#login');
    }
    async openApplicationUrl(appURL){
        await this.page.goto(appURL);
    }
    async validLogin(loginEmail,password){
        await this.eMailField.fill(loginEmail);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}
module.exports = {LoginPage};