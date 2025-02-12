const BasePage = require('./basePage');
const config = require('../config/config');
const logger = require('../config/logger');

class AuthenticationPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async navigateToSignIn() {
        await this.page.locator('.gui-dropdown-toggle').click();
        await this.page.getByRole('link', { name: 'Sign In' }).click();
    }

    async login(email, password) {
        logger.info('Atempting Logging in');
        await this.navigateToSignIn();
        await this.page.getByRole('textbox', { name: 'Email or account number' }).fill(email);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Sign in' }).click();
        logger.info('Logging in...');
    }

    async getErrorMessage() {
        return this.page.textContent('.alert__text_error');
    }

    async logout() {
        await this.page.locator('.gui-dropdown-toggle').click();
        await this.page.getByRole('link', { name: 'Sign Out' }).click();
    }
}

module.exports = AuthenticationPage;
