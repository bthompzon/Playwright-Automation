import { test } from '../fixtures/baseextend';
import { expect } from '@playwright/test';
import * as testData from '../mock-responses/search-response.json'

test.describe("Search Tests", () => {  

    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.bestbuy.ca/");
    });

    test("Basic Search", async ({ page }) => {
        await (await page.waitForSelector("input[type='Search']")).type('Zelda');
        await page.keyboard.press('Enter');
        const resultFor = await page.waitForSelector("div[class*='titleHeader'] >> h1");
        expect(await resultFor.innerText()).toBe('Results for: Zelda');
        expect(await page.waitForSelector("div:has-text('Nintendo Switch Left and Right Joy-Con')")).toBeTruthy();
    });

    test("Mock Search", async ( { page }) => {
        await page.route('**/api/v2/json/search**', route => route.fulfill({
            status: 200,
            body: JSON.stringify(testData),
        }));
        await (await page.waitForSelector("input[type='Search']")).type('Zelda');
        await page.keyboard.press('Enter');
        expect(await page.waitForSelector("div:has-text('Brads Nintendo Switch Left and Right Joy-Con')")).toBeTruthy();
        expect(await (await page.$("div[class*='productItemRow']")).screenshot()).toMatchSnapshot('expectedProductTile.png');
    });
});