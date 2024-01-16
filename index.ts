import puppeteer from 'puppeteer-core';
import chromium from 'chrome-aws-lambda';

const url = 'https://books.toscrape.com';

const main = async () => {
    const browser = await puppeteer.launch({ 
        headless: true, 
        executablePath: await chromium.executablePath, 
      });

    const page = await browser.newPage();
    await page.goto(url);

    const eventData = await page.evaluate((url: string) => {
        const eventdeets = Array.from(document.querySelectorAll('.product_pod'));
        const data = eventdeets.map((book: any) => ({
            title: book.querySelector('h3 a').getAttribute('title'),
            price: (book.querySelector('price_color') as HTMLElement).innerText,
            imgSrc: url + book.querySelector('img').getAttribute('src'),
        }));
        return data;
    }, url);

    console.log(eventData);

    await browser.close();
};

main();
