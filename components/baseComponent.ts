import { Page, ElementHandle } from "@playwright/test";
import config from "../playwright.config";

export default class BaseComponent { 
    private page: Page;
    public componentName: string;
    public locator: string;
    public parentLocator: string;
    public parentHandle: ElementHandle;
    private waitTimeout?: number;

    constructor(page: Page, locator: string, componentName?: string, parentLocator?: string, parentHandle?: ElementHandle, waitTimeout: number = config.timeout) {
        this.page = page;
        this.locator = locator;
        this.componentName = componentName || "Unknown please set me";
        this.parentLocator = parentLocator || undefined;
        this.parentHandle = parentHandle || undefined;
        this.waitTimeout = waitTimeout;
    }

    public async findElement(customWaitTimeout?: number) {
        let element: ElementHandle;
        const waitTimeout = customWaitTimeout || this.waitTimeout;
        console.log(`Searching for component [${this.componentName}]`);

        if (this.parentHandle) {
            console.log('Searching from parent handle');
            element = await this.parentHandle.waitForSelector(this.locator, {timeout:waitTimeout});
        } else if (this.parentLocator) {
            console.log('Searching from parent locator');
            element = await this.page.waitForSelector(this.parentLocator + " >> " + this.locator, {timeout:waitTimeout});
        } else {
            console.log('Searching from root');
            element = await this.page.waitForSelector(this.locator, {timeout:waitTimeout});
        } 

        if (element != null) {
            console.log(`Component [${this.componentName}] was found successfully`);
            return element;
        } else {
            throw new Error(`Could not find element using locator: [${this.locator}] after [${waitTimeout}] timeout`);
        }
    }

    public async click() {
        const element = await this.findElement();
        console.log(`Clicking component [${this.componentName}]`);
        await element.click();
    }

    public async hover() {
        await (await this.findElement()).hover();
    }

    public async isVisible() {
        return await (await this.findElement()).isVisible();
    }

    public async getAttribute(attributeName: string) {
        return await (await this.findElement()).getAttribute(attributeName);
    }

    public async getTextContent() {
        const element = await this.findElement();
        console.log(`Getting textContent for [${this.componentName}] component`)
        return await element.textContent();
    }

    public async exists(customTimeout?: number) {
        const timeout = customTimeout || 1000; 
        console.log(`Checking to see if component [${this.componentName}] exists on page`);
        try {
             await this.findElement(timeout);
             console.log(`Component does exist on page`);
            return true;
        } catch {
            console.log(`Component does not exist on page`);
            return false;
        }
    }
}