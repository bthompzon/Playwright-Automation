import BasePage from "./base-page";
import { Page } from "@playwright/test";
import BaseComponent from "../components/baseComponent";

export default class ProductDetailsPage extends BasePage {
    public image: BaseComponent;
    public title: BaseComponent;
    public description: BaseComponent;
    public price: BaseComponent;
    public addToCartButton: BaseComponent;

    constructor(page: Page) {
        super(page, "/inventory-item.html");
        this.image = new BaseComponent(page, ".inventory_details_img", "Product image");
        this.title = new BaseComponent(page, ".inventory_details_name", "Product title");
        this.description = new BaseComponent(page, ".inventory_details_desc", "Product description");
        this.price = new BaseComponent(page, ".inventory_details_price", "Product price");
        this.addToCartButton = new BaseComponent(page, ".btn_inventory", "Add to cart button");
    }
}