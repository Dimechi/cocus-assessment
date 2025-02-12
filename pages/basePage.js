const config = require('../config/config');
const logger = require('../config/logger');

class BasePage {
    constructor(page) {
        this.page = page;
    }

    async acceptCookies() {
        const acceptButtonSelector = 'button:has-text("Accept All Cookies")';
        await this.page.waitForSelector(acceptButtonSelector);
        await this.page.click(acceptButtonSelector);
        const popupSelector = '#mn_email_popup img';
        // Close popup if present
        if (await this.page.waitForSelector(popupSelector, { state: 'attached', timeout: 3000 })) {
            logger.info('Popup detected, attempting to close');
            await this.page.click(popupSelector);
        } else {
            logger.info('No popup appeared');
        }
    }

    async navigateTo() {
        await this.page.goto(config.baseUrl);
    }
}
module.exports = BasePage;
