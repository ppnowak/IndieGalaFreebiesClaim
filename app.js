const { initializeLogin } = require('./src/login');
const { startBrowser } = require ('./src/commons');

const links = require('./src/links');
const { claim } = require('./src/claim');

(async()=>{

    let browser;
    try {
        browser = await startBrowser();
        await initializeLogin(browser);
        for (const link of links) {
            await claim(browser, link);
        }
    } finally {
        if (browser) {
            await browser.close();
        }
    }

})();
