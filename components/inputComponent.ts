import { Page, ElementHandle } from "@playwright/test";
import BaseComponent from "./baseComponent";
import config from "../playwright.config";

export default class InputComponent extends BaseComponent { 

    constructor(page: Page, locator: string, componentName?: string, parentLocator?: string, parentHandle?: ElementHandle, waitTimeout: number = config.timeout) {
        super(page, locator, componentName, parentLocator, parentHandle,waitTimeout);
    }

    public async type(input: string) {
        const element = await this.findElement();
        console.log(`Typeing [${input}] into the [${this.componentName}] component`);
        await element.fill(input);
    } 

    public async getText() {
        return await (await this.findElement()).inputValue();
    }
}