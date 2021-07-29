import BasePage from "./base-page";
import { Page } from "@playwright/test";
import BaseComponent from "../components/baseComponent";

export default class CheckoutCompletePage extends BasePage {
    public orderCompleteLabel: BaseComponent;

    constructor(page: Page) {
        super(page,"/checkout-complete.html");
        this.orderCompleteLabel = new BaseComponent(page, ".complete-header", "Order complete label");
    }
}