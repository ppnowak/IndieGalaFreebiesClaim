const { sleep } = require("./commons");

const isInLibrary = async page => (await page.$$(".fa-download")).length > 0;

const notInLibrary = async page => !(await isInLibrary(page));

const isAddToLibrary = async page => {
    const [ element ] = await page.$$("#loginBeforeAddToLibrary");
    if (!element) {
        return false;
    }
    return await page.$eval("#loginBeforeAddToLibrary", e => e.innerText.trim()) == 'ADD TO LIBRARY';
}; 

const clickAddToLibrary = async page => await page.click("#loginBeforeAddToLibrary");

const claim = async (browser, link) => {
    console.log("##########################################");
    try {
        console.log("Trying to redeem", link);
        const [ page ] = await browser.pages();
        await page.goto(link);
        while (!page.url().includes("indiegala.com")) {
            console.log("Still not on freebies.indiegala.com, waiting...")
            await sleep(1000);
        }

        console.log("Starting claiming on page", page.url());
        if (await isInLibrary(page)) {
            console.log("Game already in library, skipping.");
            return;
        }

        await clickAddToLibrary(page);
        while(await notInLibrary(page)) {
            console.log("Still claiming, waiting...")
            if (await isAddToLibrary(page)) {
                await clickAddToLibrary(page);
            } else {
                await sleep(1000);
            }
        }
        console.log("DONE!");
        
    } catch (error) {
        console.error("Failed to redeem due to error", error);
    } finally {
        console.log("##########################################");
    }
}

module.exports = { claim }