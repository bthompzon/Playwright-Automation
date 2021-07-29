import { Page } from "@playwright/test";
import BaseComponent from "../components/baseComponent";
import InputComponent from "../components/inputComponent";
import BasePage from "./base-page";

export default class LogInPage extends BasePage { 
    public usernameField: InputComponent;
    public passwordField: InputComponent;
    public logInButton: BaseComponent;
    public errorText: BaseComponent;

    constructor(page: Page) {
        super(page, "/sign-in");
        this.usernameField = new InputComponent(page, "#user-name", "Username field");
        this.passwordField = new InputComponent(page, "#password", "Password field");
        this.logInButton = new BaseComponent(page, "#login-button", "Login button");
        this.errorText = new BaseComponent(page, "h3[data-test='error']", "Error text");
    }

    public async login(username: string, password: string) {
        await this.usernameField.type(username);
        await this.passwordField.type(password);
        await this.logInButton.click();
    }
}