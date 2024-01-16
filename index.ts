const puppeteer = require('puppeteer');
const { Browser } = puppeteer;

const url ='https://books.toscrape.com';
//https://mookh.com/


const main = async () => {
    const browser = await puppeteer.launch({headless:false})
    console.log("123")
    const page = await browser.newPage()
    await page.goto(url)

    const eventData = await page.evaluate(() => {
        const eventdeets = Array.from(document.querySelectorAll('.sc-dkmKpi.lfQrzt'));
        return eventdeets;
    });

    console.log(eventData);

    await browser.close();
}

main();
