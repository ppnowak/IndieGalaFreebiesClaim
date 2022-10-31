const { sleep } = require('./commons');

const initializeLogin = async (browser) => {
    const [ page ] = await browser.pages();        
    await page.setUserAgent('5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
    await page.goto("https://www.indiegala.com/login");
    console.log("Login manually and wait for script to continue");
    while(page.url().includes("login")) {
        await sleep(1000);
    }
    console.log("Login done");
}   

module.exports = { initializeLogin }