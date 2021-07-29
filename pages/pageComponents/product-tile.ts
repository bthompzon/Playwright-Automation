import BaseComponent from "../../components/baseComponent";
import { Page, ElementHandle } from "@playwright/test";

export default class ProductTile {
    public image: BaseComponent;
    public title: BaseComponent;
    public price: BaseComponent;
    public addRemoveCartButton: BaseComponent;
    public removeButton: BaseComponent;

    constructor(page: Page, parentHandle: ElementHandle) {
        this.image = new BaseComponent(page, "div#inventory_container>div>div>div", "Product image", undefined, parentHandle);
        this.title = new BaseComponent(page, "a#item_4_title_link>div", "Product title", undefined, parentHandle);
        this.price = new BaseComponent(page, ".inventory_item_price", "Product price", undefined, parentHandle);
        this.addRemoveCartButton = new BaseComponent(page, ".btn_inventory", "Product add/remove cart button", undefined, parentHandle);
    }
}