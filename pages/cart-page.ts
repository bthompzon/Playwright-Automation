import BasePage from "./base-page";
import { Page } from "@playwright/test";
import BaseComponent from "../components/baseComponent";
import CartItem from "./pageComponents/cart-item";
import Header from "./pageComponents/header";

export default class CartPage extends BasePage {
    private cartContainer: BaseComponent;
    public checkoutButton: BaseComponent;
    public header: Header;

    constructor(page: Page) {
        super(page, "/cart.html");
        this.cartContainer = new BaseComponent(page, ".cart_list", "Cart container");
        this.checkoutButton = new BaseComponent(page, "#checkout", "Checkout button");
        this.header = new Header(page);
    }

    public async getAllCartItems() {
        return await (await this.cartContainer.findElement()).$$(".cart_item");
    }

    public async getCartItem(title: string) {
        const cartItems = await this.getAllCartItems();

        for await (const item of cartItems) {
            const cartItemTitle = await (await item.waitForSelector(".inventory_item_name")).innerText();
            if (cartItemTitle == title) {
                return new CartItem(this.page, item);
            }
        }
        throw new Error(`Could not find cart item with title [${title}]`);
    }
}