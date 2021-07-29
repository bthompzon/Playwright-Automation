import BasePage from "./base-page";
import InputComponent from "../components/inputComponent";
import BaseComponent from "../components/baseComponent";
import { Page } from "@playwright/test";

export default class CheckoutInformationPage extends BasePage {
    public firstNameField: InputComponent;
    public lastNameField: InputComponent;
    public zipcodeField: InputComponent;
    public cancelButton: BaseComponent;
    public continueButton: BaseComponent;

    constructor(page: Page) {
        super(page, "/checkout-step-one.html");
        this.firstNameField = new InputComponent(page, "#first-name", "First name field");
        this.lastNameField = new InputComponent(page, "#last-name", "Last name field");
        this.zipcodeField = new InputComponent(page, "#postal-code", "Zip code field");
        this.cancelButton = new BaseComponent(page, "#cancel", "Cancel button");
        this.continueButton = new BaseComponent(page, "#continue", "Continue button");
    }

    public async fillInformationForm(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameField.type(firstName);
        await this.lastNameField.type(lastName);
        await this.zipcodeField.type(zipCode);
    }
}