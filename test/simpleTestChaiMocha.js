// This adds the Mocha framework to create a Test Suite & a single Test case
// ensure you used 'npm install mocha' before trying
const {Builder, By, Key, until} = require('selenium-webdriver');
require('chromedriver'); // only added as used npm install chromedriver to install into node_modules
var chai = require('chai');
var assert = chai.assert;

// This describes the test Suite:
describe('Mocha Example Tests', function () {
    //this.timeout(0);  // default for mocha is 2000 for a test to finish, ours take much longer! so 0 turns off, set in mocha.opts
    //this.retries(4);  // you can use this to tell mocha to re-run failed tests, in this case up to 4 times
    let driver;
    const TIMEOUT = 5000;

    // beforeEach & afterEach get called for every test (it) in the suite
    beforeEach(async function () {
        driver = await new Builder()
        .forBrowser('chrome')
        .build();
        //await driver.manage().timeouts().implicitlyWait(5000); // This throws an error for some reason
        await driver.manage().setTimeouts( { implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT } );      
    });

    afterEach(async function () {
        await driver.quit();
    });

    // This is a Test Case
    it('adds item to basket', async function () {
        await driver.get('https://www.edgewordstraining.co.uk/demo-site/');

        await driver.findElement(By.id('woocommerce-product-search-field-0')).click();
        await driver.findElement(By.id('woocommerce-product-search-field-0')).clear();
        await driver.findElement(By.id('woocommerce-product-search-field-0')).sendKeys('cap', Key.RETURN);
        await driver.findElement(By.name('add-to-cart')).click();
        await driver.findElement(By.linkText('Cart')).click();
        // check cap is in the cart
        assert.isTrue(await driver.findElement(By.linkText('Cap')).isDisplayed(), 'Cap was not in cart!');
        await driver.findElement(By.linkText('×')).click();

        // synchronisation
        const element = await driver.wait(until.elementLocated(By.xpath('//*[@id="post-5"]/div/div[2]/p[2]/a')), 15000, 'Element did not appear after waiting for 15s');
        await driver.findElement(By.linkText('Return to shop')).click();
        await driver.findElement(By.linkText('Home')).click();

        const title = await driver.getTitle();
        assert.equal(title, 'Edgewords Shop – e-commerce demo site for Training', 'Title should match expected value!');
    });

});