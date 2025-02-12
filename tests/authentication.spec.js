const { test, expect } = require('@playwright/test');
const AuthenticationPage = require('../pages/authenticationPage');
const config = require('../config/config');
const logger = require('../config/logger');

test.describe('Authentication Tests', () => {

    test('Verify user cannot log in with empty credentials', async ({ page }) => {
        const authPage = new AuthenticationPage(page);
        logger.info('Test started: successful login');
        await authPage.navigateTo();
        await authPage.acceptCookies();
        await authPage.login('', '');
        const passwordErrorMessage = await page.textContent('.js-validation-error__password .js-input__errorMessage');
        expect(passwordErrorMessage).toBe('Enter a valid password');
        const usernameErrorMessage = await page.textContent('.js-validation-error__username .js-input__errorMessage');
        expect(usernameErrorMessage).toBe('Enter a valid email address or account number');
        logger.info('Test completed');
    });

    test('Verify user cannot log in with invalid email and valid password', async ({ page }) => {
        const authPage = new AuthenticationPage(page);
        await authPage.navigateTo();
        await authPage.acceptCookies();
        // Test with invalid email
        await authPage.login(config.credentials.invalidEmail, config.credentials.validPassword);
        let errorMessage = await authPage.getErrorMessage();
        expect(errorMessage).toBe('It seems your username or password were incorrect, please try again.');

    });

    test('Verify user can log in and log out successfully', async ({ page }) => {
        const authPage = new AuthenticationPage(page);
        await authPage.navigateTo();
        await authPage.acceptCookies();
        await authPage.login(config.credentials.validEmail, config.credentials.validPassword);
    });
});
