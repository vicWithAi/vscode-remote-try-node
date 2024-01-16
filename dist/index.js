'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const puppeteerExtra = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const chromium = require('chrome-aws-lambda');
const url = 'https://mookh.com/';
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const pupExtra = puppeteerExtra.addExtra(chromium.puppeteer);
    pupExtra.use(pluginStealth());
    console.log('Launching browser...');
    puppeteerExtra.use(pluginStealth());
    const browser = yield puppeteer_core_1.default.launch({
        headless: true,
        executablePath: '/usr/bin/chromium', // replace with your Chromium path
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
    });
    try {
        const page = yield browser.newPage();
        console.log('Navigating to URL:', url);
        yield page.goto(url, { waitUntil: 'domcontentloaded' });
        // You can modify the following code to extract the data you need from the Mookh website.
        const products = yield page.evaluate(() => {
            const products = [];
            const productElements = document.querySelectorAll('.sc-biBrSq dqPpVz');
            productElements.forEach((product) => {
                var _a, _b, _c, _d;
                const title = product.querySelector('.sc-eWvPJL hgQjmC').innerText.trim();
                const price = product.querySelector('.ellipsis').innerText.trim();
                // Additional fields
                const date = (_a = product.querySelector('.showcase-date-day')) === null || _a === void 0 ? void 0 : _a.innerText.trim();
                const eventName = (_b = product.querySelector('.sc-gIRixj beiVbL')) === null || _b === void 0 ? void 0 : _b.innerText.trim();
                const time = (_c = product.querySelector('.flex')) === null || _c === void 0 ? void 0 : _c.innerText.trim();
                const location = (_d = product.querySelector('.ellipsis')) === null || _d === void 0 ? void 0 : _d.innerText.trim();
                products.push({ title, price, date, eventName, time, location });
            });
            return products;
        });
        console.log('Product data:', products);
    }
    catch (error) {
        console.error('Error during scraping:', error);
    }
    finally {
        console.log('Closing the browser...');
        yield browser.close();
        console.log('Browser closed.');
    }
});
main();
