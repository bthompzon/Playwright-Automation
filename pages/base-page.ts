import { Page } from "@playwright/test";

export default class BasePage { 
    public page: Page;
    private url: string;

    constructor(page: Page, url: string) {
        this.page = page;
        this.url = url;
    }

    public async navigateTo() {
        await this.page.goto(this.url);
    }

    public async getCurrentTitle() {
        return await this.page.title();
    }

    public async getCurrentUrl() {
        return await this.page.url();
    }
}