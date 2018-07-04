//Simple WebDriver example which adds an assert using node's built-in asserts
const {Builder, By, Key, until} = require('selenium-webdriver');
var assert = require('assert'); // This uses the node.js assert library which is provided as part of nodejs

async function main() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .build();

    await driver.get('https://www.edgewordstraining.co.uk/demo-site/');
    await driver.findElement(By.id('woocommerce-product-search-field-0')).click();
    await driver.findElement(By.id('woocommerce-product-search-field-0')).clear();
    await driver.findElement(By.id('woocommerce-product-search-field-0')).sendKeys('cap', Key.RETURN);
    await driver.findElement(By.name('add-to-cart')).click();
    await driver.findElement(By.linkText('Cart')).click();
    await driver.findElement(By.linkText('×')).click();

    // synchronisation
    const element = await driver.wait(until.elementLocated(By.xpath('//*[@id="post-5"]/div/div[2]/p[2]/a')), 15000, 'Element did not appear after waiting for 15s');

    await driver.findElement(By.linkText('Return to shop')).click();
    await driver.findElement(By.linkText('Home')).click();

    const title = await driver.getTitle();
    console.log('title is ' + title);
    // node.js assert:
    assert.ok(title=='Edgewords Shop – e-commerce demo site for Training');

    driver.quit();
    }

main();