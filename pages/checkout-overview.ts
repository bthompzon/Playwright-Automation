import { expect, Page } from "@playwright/test";
import BasePage from "./base-page";
import BaseComponent from "../components/baseComponent";

export default class CheckoutOverviewPage extends BasePage {
    public cancelButton: BaseComponent;
    public finishButton: BaseComponent;

    constructor(page: Page) {
        super(page, "/checkout-step-two.html");
        this.cancelButton = new BaseComponent(page, "#cancel", "Cancel button");
        this.finishButton = new BaseComponent(page, "#finish", "Finish button");
    }
}