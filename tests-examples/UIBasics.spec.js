const {test, expect} = require('@playwright/test')


test('Browser Context Playwright Test',async ({browser}) => {
    const context = await browser.newContext({ignoreHTTPSErrors: true});
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/');
    await page.locator('[href="/practice"]').first().click();
    const boolDialog = await page.locator('[role="dialog"]').isVisible(1000);
    if(boolDialog){
        await page.locator('input[placeholder="Enter your name"]').fill('Ambarish');
        await page.locator('input[placeholder="Enter your email"]').fill('dash.ambarish15@gmail.com');
        await page.getByRole('button',{name: "Submit"});

    }
    await page.locator('div.text-card-foreground').filter({hasText: 'Login Page Practice'}).locator('button').click();

});

test('Page Playwright Test',async ({page}) => {
    await page.goto('https://www.google.com/');
    //console.log(await page.title());
    await expect(page).toHaveTitle('Google');
});

test('Validate Incorrect Login Error',async ({browser}) => {
    const context = await browser.newContext({ignoreHTTPSErrors: true});
    const page = await context.newPage();
    await page.goto('http://www.rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('rahulshetty');
    await page.locator('[name="password"]').fill('learning');
    await page.locator('#signInBtn').click();
    //console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect username/password.');
});

test('Validate Empty User Name Login Error',async ({browser}) => {
    const context = await browser.newContext({ignoreHTTPSErrors: true});
    const page = await context.newPage();
    await page.goto('http://www.rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('');
    await page.locator('[name="password"]').fill('learning');
    await page.locator('#signInBtn').click();
    //console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText('Empty username/password.');
});

test('Get Login Credentials from page',async ({browser}) => {
    const context = await browser.newContext({ignoreHTTPSErrors: true});
    const page = await context.newPage();
    await page.goto('http://www.rahulshettyacademy.com/loginpagePractise/');
    await page.waitForLoadState('networkidle');
    const loginStringArr = (await page.locator('.text-center.text-white').textContent()).split(' ');
    const userName = await loginStringArr[2];
    const passWord = await loginStringArr[6].split(')')[0];
    await console.log('User Name : '+userName+' and Password : '+passWord)
});

test('Interact Login page UI elements',async ({browser}) => {
    const context = await browser.newContext({ignoreHTTPSErrors: true});
    const page = await context.newPage();
    const userNameField = page.locator('#username');
    const passwordField = page.locator('[name="password"]');
    const signInButton = page.locator('#signInBtn');
    const rdBtnUser = page.locator('input[value="user"]');
    const alertBtnOk = page.locator('#okayBtn');
    const selectBxUserType = page.locator('select.form-control');
    const chkBxTnC = page.locator('#terms');
    const linkDoc = page.locator('[href*="documents-request"]');
    await page.goto('http://www.rahulshettyacademy.com/loginpagePractise/');
    await page.waitForLoadState('networkidle');
    const loginStringArr = (await page.locator('.text-center.text-white').textContent()).split(' ');
    const userNameStr = await loginStringArr[2];
    const passWordStr = await loginStringArr[6].split(')')[0];
    await userNameField.fill(userNameStr);
    await passwordField.fill(passWordStr);
    await rdBtnUser.click();
    await alertBtnOk.click();
    await expect(rdBtnUser).toBeChecked();
    await selectBxUserType.selectOption('teach');
    await chkBxTnC.check();
    await expect(chkBxTnC).toBeChecked();
    await expect(linkDoc).toHaveAttribute('class','blinkingText')
});

test('Get Login Credentials from page and Login',async ({browser}) => {
    const context = await browser.newContext({ignoreHTTPSErrors: true});
    const page = await context.newPage();
    const userNameField = page.locator('#username');
    const passwordField = page.locator('[name="password"]');
    const chkBxTnC = page.locator('#terms');
    const signInButton = page.locator('#signInBtn');
    const cardTitles = page.locator('h4.card-title');
    await page.goto('http://www.rahulshettyacademy.com/loginpagePractise/');
    await page.waitForLoadState('networkidle');
    const loginStringArr = (await page.locator('.text-center.text-white').textContent()).split(' ');
    const userNameStr = await loginStringArr[2];
    const passWordStr = await loginStringArr[6].split(')')[0];
    await userNameField.fill(userNameStr);
    await passwordField.fill(passWordStr);
    await chkBxTnC.check();
    await signInButton.click();
    await cardTitles.first().waitFor();
    await expect(page.locator('div.container > a.navbar-brand')).toBeVisible();
    //await cardTitles.first().waitFor();
    //console.log(await cardTitles.allTextContents());
});

test('Child window interaction',async ({browser}) => {
    const context = await browser.newContext({ignoreHTTPSErrors: true});
    const page = await context.newPage();
    const linkDoc = page.locator('[href*="documents-request"]');
    await page.goto('http://www.rahulshettyacademy.com/loginpagePractise/');
    await page.waitForLoadState('networkidle');
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        linkDoc.click(),
    ])
    const emailText = await newPage.locator('p.red').textContent();
    const username = await (emailText.split('@')[1]).split('.')[0];
    //await page.bringToFront();
    await page.locator('#username').fill(username);
    //console.log(await page.locator('#username').inputValue());

});



