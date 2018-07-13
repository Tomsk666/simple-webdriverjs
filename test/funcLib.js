// Function Module
const {By, Key, until} = require('selenium-webdriver');

async function waitForVisible (driver, locator, timeout) {
    try {
        await driver.sleep(500);
        var element = await driver.findElement(locator);
        await driver.wait(until.elementIsVisible(element), timeout);
        } 
    catch (err) {
        throw new Error(`Element ${locator.toString()} still not visible after timeout, Error message: ${err.message.toString()}`);
    }  
}

async function getText (driver, locator){
    try {
        await driver.sleep(500);
        var element = await driver.findElement(locator);
        var text = await element.getText();
        return text;
    } 
    catch (err) {
        throw new Error(`Unable to get ${locator.toString()} text after timeout, error : ${err.message}`);
        }
}

async function sendKeys (driver, locator, thekeys) {
    try {
        await driver.sleep(500);
        var element = await driver.findElement(locator);
        await element.click();
        await element.clear();
        await element.sendKeys(thekeys);
        return;
    } 
    catch (err) {
        throw new Error(`Unable to send keys to ${locator.toString()} after timeout, error : ${err.message}`);
    }
}

module.exports.waitForVisible = waitForVisible;
module.exports.getText = getText;
module.exports.sendKeys = sendKeys;
