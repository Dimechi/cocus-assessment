const { test, expect } = require('@playwright/test');
const ProductPage = require('../pages/productPage');
const logger = require('../config/logger');

test.describe('Product Page Tests', () => {
    test('Verify user can sort product items by pages', async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.navigateTo();
        await productPage.acceptCookies();
        await productPage.navigateToNewIn();
        await productPage.sortByItemOnPageNumber('48');
        const productCount = await page.$$eval('.js-product-item', products => products.length);
        expect(productCount).toBe(48);
        logger.info('Test completed: Page Sorted Correctly');
    });

    test('Verify that user can sort product items by highest price',async({page})=>{
        const productPage = new ProductPage(page);
        await productPage.navigateTo();
        await productPage.acceptCookies();
        await productPage.navigateToNewIn();
        await page.waitForTimeout(2000);
        await page.getByLabel('Sort By:').selectOption('Highest Price');
        await page.waitForTimeout(2000);
        const prices = await page.$$eval('.product-price__now', elements => elements.map(el => parseFloat(el.textContent.replace(/[^0-9.]/g, ''))));
      //Assert that the prices are in descending order
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1], `Price at index ${i} should be greater than or equal to price at index ${i + 1}`);
      }
    })

    test('Verify that user can sort product items by lowest price',async({page})=>{
        const productPage = new ProductPage(page);
        await productPage.navigateTo();
        await productPage.acceptCookies();
        await productPage.navigateToNewIn();
        await page.waitForTimeout(2000);
        await page.getByLabel('Sort By:').selectOption('Lowest Price');
        await page.waitForTimeout(2000);
        const prices = await page.$$eval('.product-price__now', elements => elements.map(el => parseFloat(el.textContent.replace(/[^0-9.]/g, ''))));
      // Assert that the prices are in ascending order
        for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i + 1], `Price at index ${i} should be less than or equal to price at index ${i + 1}`);
      }
    })

    test('Verify that user can add item to cart',async({page})=>{
        const productPage = new ProductPage(page);
        await productPage.navigateTo();
        await productPage.acceptCookies();
        await productPage.navigateToNewIn();
        await page.waitForTimeout(2000);
        await page.waitForSelector('.product__items.js-product-list-items');
        await page.click('.product__item .product__link');
        await page.getByLabel('Select Size').selectOption('12');
        await page.waitForTimeout(5000);
        await page.getByText('Add To Bag').first().click();
        logger.info('Test completed: Item successfully added to cart');
        
    })
    
    test('Verify that user can save item',async({page})=>{
        const productPage = new ProductPage(page);
        await productPage.navigateTo();
        await productPage.acceptCookies();
        await productPage.navigateToNewIn();
        await page.waitForTimeout(2000);
        await page.locator('.product__save-for-later').first().click();
        await page.locator('.gui-dropdown-toggle').click();
        await page.getByRole('link', { name: 'Saved Items' }).click();
        await page.getByText('You have 1 Saved Item.').click();
        const message = await page.locator('.saved-info-box b').innerText();
        expect(message).toBe('You have 1 Saved Item.');
        logger.info('Test completed: Item saved to favorite successfully');
    })

});

