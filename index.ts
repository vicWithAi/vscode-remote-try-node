// Import necessary modules
import puppeteer from 'puppeteer-core';
import pluginStealth from 'puppeteer-extra-plugin-stealth';
import chromium from 'chrome-aws-lambda';

// Add other necessary imports...

// Define the Product interface
interface Product {
  title: string;
  price: string;
  date: string;
  eventName: string;
  time: string;
  location: string;
}

// Define the URL of the website you want to scrape
const url = 'https://mookh.com/';

// Main scraping function
const main = async () => {
  // Launch the browser without puppeteer-extra
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/chromium', // replace with your Chromium path
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
  });

  try {
    const page = await browser.newPage();
    console.log('Navigating to URL:', url);
    await page.goto(url, { waitUntil: 'load' });

    // Modify the following code to extract the data you need from the Mookh website.
    const products: Product[] = await page.evaluate(() => {
      const products: Product[] = [];
      const productElements = document.querySelectorAll('.sc-biBrSq dqPpVz');

      productElements.forEach((product) => {
        const title = (product.querySelector('.sc-eWvPJL hgQjmC') as HTMLElement).innerText.trim();
        const price = (product.querySelector('.ellipsis') as HTMLElement).innerText.trim();
        const date = (product.querySelector('.showcase-date-day') as HTMLElement)?.innerText.trim();
        const eventName = (product.querySelector('.sc-gIRixj beiVbL') as HTMLElement)?.innerText.trim();
        const time = (product.querySelector('.flex') as HTMLElement)?.innerText.trim();
        const location = (product.querySelector('.ellipsis') as HTMLElement)?.innerText.trim();

        products.push({ title, price, date, eventName, time, location });
      });

      return products;
    });

    console.log('Product data:', products);
  } catch (error) {
    console.error('Error during scraping:', error);
  } finally {
    console.log('Closing the browser...');
    await browser.close();
    console.log('Browser closed.');
  }
};

// Call the main function
main();
