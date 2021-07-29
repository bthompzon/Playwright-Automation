import BaseComponent from "../../components/baseComponent";
import { Page } from "@playwright/test";
import SideMenu from "./side-menu";

export default class Header extends BaseComponent{ 
    public hamburgerIcon: BaseComponent;
    public cartIcon: BaseComponent;
    public sideMenu: SideMenu;
    public cartCount: BaseComponent;
    
    constructor(page: Page) {
        super(page, "div.primary_header"); 
        this.hamburgerIcon = new BaseComponent(page, "#react-burger-menu-btn", "Hamburger menu", this.locator);
        this.cartIcon = new BaseComponent(page, "a.shopping_cart_link", "Cart icon", this.locator);
        this.cartCount = new BaseComponent(page, ".shopping_cart_badge", "Cart count label");
        this.sideMenu = new SideMenu(page);
    }
}