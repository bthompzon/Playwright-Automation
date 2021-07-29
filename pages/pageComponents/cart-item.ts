import { Page, ElementHandle } from "@playwright/test";
import BaseComponent from "../../components/baseComponent";

export default class CartItem {
    public quantity: BaseComponent;
    public title: BaseComponent;
    public description: BaseComponent;
    public price: BaseComponent;
    public removeButton: BaseComponent;

    constructor(page: Page, parentHandle: ElementHandle) {
        this.quantity = new BaseComponent(page, ".cart_quantity", "Quantity label", undefined, parentHandle);
        this.title = new BaseComponent(page, ".inventory_item_name", "Title label", undefined, parentHandle);
        this.description = new BaseComponent(page, ".inventory_item_desc", "Description field", undefined, parentHandle)
        this.price = new BaseComponent(page, ".inventory_item_price", "Price label", undefined, parentHandle);
        this.removeButton = new BaseComponent(page, ".cart_button", "Remove button", undefined, parentHandle);
    }
}