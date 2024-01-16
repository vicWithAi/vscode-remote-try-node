'use strict'
import puppeteer from 'puppeteer-core';
import chromium from 'chrome-aws-lambda';

const url = 'https://mookh.com/';
//https://books.toscrape.com

const main = async () => {
    //console.log('Launching browser...');
    const browser = await puppeteer.launch({ 
        headless: true, 
        executablePath: await chromium.executablePath, 
    });

    console.log('Creating new page...');
    const page = await browser.newPage();

    console.log('Navigating to URL:', url);
    await page.goto(url);

    console.log('Fetching data from the page...');
    const eventData = await page.evaluate((url: string) => {
        const eventdeets = Array.from(document.querySelectorAll('.product_pod'));
        //class="sc-bBrOnJ jpgkRQ"
        //src
        //p
        //a
        //#text
        //div class ...price =  css-cfsqhp-container
        const data = eventdeets.map((event: any) => ({
            title: event.querySelector('h3 a').getAttribute('title'),
            price: (event.querySelector('.css-cfsqhp-container') as HTMLElement).innerText,
            imgSrc: url + event.querySelector('img').getAttribute('src'),
        }));
        return data;
    }, url);

    console.log('Event data:', eventData);

    console.log('Closing the browser...');
    await browser.close();

    console.log('Browser closed.');
};

main();
