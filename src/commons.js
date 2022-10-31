const { launch } = require("puppeteer");

const startBrowser = async () => {
    const browser = await launch({
        headless: false
    });
    const [ page ] = await browser.pages();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36");
    return browser;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

module.exports = { startBrowser, sleep }