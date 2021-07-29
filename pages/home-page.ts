import { Page } from "@playwright/test";
import BasePage from "./base-page";
import Header from "./pageComponents/header";

export default class HomePage extends BasePage { 
    public header: Header;
    
    constructor(page: Page) {
        super(page, "/");
        this.header = new Header(page);
    }
}