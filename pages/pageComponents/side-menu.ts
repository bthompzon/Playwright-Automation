import BaseComponent from "../../components/baseComponent";
import { Page } from "@playwright/test";

export default class SideMenu extends BaseComponent {
    public allItemsMenuOption: BaseComponent;
    public aboutMenuOption: BaseComponent;
    public logoutMenuOption: BaseComponent;
    public closeMenuButton: BaseComponent;
    constructor(page: Page) {
        super(page, undefined);
        this.allItemsMenuOption = new BaseComponent(page, "#inventory_sidebar_link", "All Items menu option");
        this.aboutMenuOption = new BaseComponent(page, "#about_sidebar_link", "About menu option");
        this.logoutMenuOption = new BaseComponent(page, "#logout_sidebar_link", "Logout menu option");
        this.closeMenuButton = new BaseComponent(page, "#react-burger-cross-btn", "Close menu button");
    }
}