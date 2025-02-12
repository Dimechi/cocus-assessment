const BasePage = require('./basePage');
const logger = require('../config/logger');

class ProductPage extends BasePage {
    async navigateToNewIn() {
        await this.page.locator('.gui-dropdown-toggle').click();
        await this.page.getByRole('link', { name: 'New In', exact: true }).click();
        await this.page.waitForTimeout(2000); 
    }

    async sortByItemOnPageNumber(option) {
        await this.page.selectOption('select#productsPerPage', option);
        await this.page.waitForTimeout(2000); 
    }

    async getProductPrices() {
        return await this.page.$$eval('.product-price__now', elements => 
            elements.map(el => parseFloat(el.textContent.replace(/[^0-9.]/g, ''))));
    }

    async addItemToCart() {
        logger.info('Adding items to cart....');
        await this.page.waitForSelector('.product__items.js-product-list-items');
        await this.page.click('.product__item .product__link');
        await this.page.getByLabel('Select Size').selectOption('12');
        await this.page.waitForTimeout(5000);
        await this.page.getByText('Add To Bag').first().click();
        await this.page.waitForTimeout(2000);
        await this.page.locator('#postAddToBagModal > .modal-html > .modal-header > .block-2 > .modal-close > .gui-btn').click();
        await this.page.getByRole('button', { name: 'My Bag' }).click();
    }

    async saveItem() {
        await this.page.locator('.product__save-for-later').first().click();
        await this.page.locator('.gui-dropdown-toggle').click();
        await this.page.getByRole('link', { name: 'Saved Items' }).click();
        await this.page.getByText('You have 1 Saved Item.').click();
        logger.info('Saving Item....');
    }

    async getTotalBasketItemsText() {
        // This retrieves the text inside the span which includes the number of items in the basket.
        const itemCountSelector = '.bagTotal';
        return await this.page.innerText(itemCountSelector);
    }    
}
module.exports = ProductPage;
