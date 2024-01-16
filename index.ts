const puppeteer = require('puppeteer');
const { Browser } = puppeteer;

const url ='https://books.toscrape.com';
//https://mookh.com/


const main = async () => {
    const browser = await puppeteer.launch({headless:false,args: ["--no-sandbox", "--disable-setuid-sandbox"]})
    
    const page = await browser.newPage()
    await page.goto(url)

    const eventData = await page.evaluate((url:string) => {
        const eventdeets = Array.from(document.querySelectorAll('.product_pod')); //.sc-dkmKpi.lfQrzt class for events
        const data = eventdeets.map((book:any)=>({
            title:book.querySelector('h3 a').getAttribute('title'),
            price: book.querySelector('price_color').innerText,
            imgSrc: url + book.querySelector('img').getAttribute('src')
        }))
        return data;
    }, url)

    console.log(eventData);

    await browser.close();
}

main();
