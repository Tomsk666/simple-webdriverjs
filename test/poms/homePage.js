// --- Example POM Page just exposing fields & methods as an object--- //

const { By, Key, until } = require('selenium-webdriver');

module.exports = {
    // Locators
    searchField : By.id('woocommerce-product-search-field-0'),
    homeLink : By.linkText('Home'),

    // Actions
    searchProduct: async function (driver, strText) {
        await driver.findElement(this.searchField).click();
        await driver.findElement(this.searchField).sendKeys(strText + Key.RETURN);
    },

    clickHome: async function (driver) {
        await driver.findElement(this.homeLink).click();
    }

};


