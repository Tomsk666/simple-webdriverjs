// --- Example POM Page --- //

const { By, Key, until } = require('selenium-webdriver');

// Locators
const searchField = By.id ('woocommerce-product-search-field-0');
const homeLink = By.linkText('Home');

// Actions
async function searchProduct (driver, strText) {
    await driver.findElement(searchField).click();
    await driver.findElement(searchField).sendKeys(strText + Key.RETURN);
}

async function clickHome (driver) {
    await driver.findElement(homeLink).click();
}

// Export Methods
module.exports.searchProduct = searchProduct;
module.exports.clickHome = clickHome;
