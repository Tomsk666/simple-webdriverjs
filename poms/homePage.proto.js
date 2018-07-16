const { By, Key, until } = require('selenium-webdriver');

//homePage = function homePage(driver) {
function homePage (driver) {
    this.driver = driver;
    this.searchField = By.id('woocommerce-product-search-field-0');
    this.homeLink = By.linkText('Home');
}

// The JavaScript prototype property also allows you to add new methods to objects constructors
//prototypes not allowed on an asynchromous function though :(
homePage.prototype.searchProduct =  async function (strText) {
    await this.driver.findElement(this.searchField).click();
    await this.driver.findElement(this.searchField).sendKeys(strText + Key.RETURN);
}

homePage.prototype.clickHome = async function () {
    await this.driver.findElement(this.homeLink).click();
}


module.exports = homePage;