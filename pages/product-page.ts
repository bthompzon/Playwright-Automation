import { Page } from "@playwright/test";
import BasePage from "./base-page";
import BaseComponent from "../components/baseComponent";
import ProductTile from "./pageComponents/product-tile";

export default class ProductPage extends BasePage {
    public productContainer: BaseComponent;

    constructor(page: Page) {
        super(page, "/inventory.html");
        this.productContainer = new BaseComponent(page, "div.inventory_list", "Product Container");
    }

    private async getAllProducts() {
        return await (await this.productContainer.findElement()).$$(".inventory_item");
    }

    public async getProduct(title: string) {
        const allProducts = await this.getAllProducts();
        for await (const product of allProducts) {
            const productTitle = await (await product.waitForSelector(".inventory_item_name")).innerText();
            if (productTitle == title) {
                return new ProductTile(this.page, product);
            }
        }
        throw new Error(`Could not find product with title [${title}]`);
    }

    public async addProductToCart(title: string) {
        let product = await this.getProduct(title);
        await product.addRemoveCartButton.click();
        return product;
    }
}