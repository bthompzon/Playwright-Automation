import { expect } from '@playwright/test';
import { test} from '../fixtures/baseextend';
import LogInPage from '../pages/log-in-page';
import * as TestData from '../testData.json';
import ProductPage from '../pages/product-page';
import HomePage from '../pages/home-page';
import ProductTile from '../pages/pageComponents/product-tile';
import CartItem from '../pages/pageComponents/cart-item';
import CartPage from '../pages/cart-page';
import CheckoutInformationPage from '../pages/checkout-information';
import CheckoutOverviewPage from '../pages/checkout-overview';
import CheckoutCompletePage from '../pages/checkout-complete';

test.describe("Product Tests", () => {
  let loginPage: LogInPage;
  let productPage: ProductPage;
  let homePage: HomePage;
  let cartPage: CartPage;
  let checkoutInfoPage: CheckoutInformationPage;
  let checkoutOverviewPage: CheckoutOverviewPage;
  let checkoutCompletePage: CheckoutCompletePage;
  let product: ProductTile;
  let cartItem: CartItem;

  test.beforeEach(async ({ page }) => {
    loginPage = new LogInPage(page);
    productPage = new ProductPage(page);
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    checkoutInfoPage = new CheckoutInformationPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
    await loginPage.login(TestData.email, TestData.password);
    product = await productPage.addProductToCart("Sauce Labs Onesie");
  });

  test("Add Product To Cart", async ({ page }) => {
    expect(await product.addRemoveCartButton.getTextContent()).toBe("Remove");
    expect(await homePage.header.cartCount.getTextContent()).toBe("1");
    await homePage.header.cartIcon.click();
    cartItem = await cartPage.getCartItem("Sauce Labs Onesie");
    expect(await cartItem.quantity.getTextContent()).toBe("1");
  });

  test("Remove product from cart", async ({ page }) => {
    await homePage.header.cartIcon.click();
    const cartItem = await cartPage.getCartItem("Sauce Labs Onesie");
    await cartItem.removeButton.click();
    expect(await cartPage.header.cartCount.exists()).toBeFalsy();
  });

  test("Remove product from cart via tile", async ({ page }) => {
    await product.addRemoveCartButton.click();
    expect(await product.addRemoveCartButton.getTextContent()).toBe("Add to cart");
  });

  test("Checkout", async ({ page }) => {
    await homePage.header.cartIcon.click();
    await cartPage.checkoutButton.click();
    await checkoutInfoPage.fillInformationForm(TestData.firstName, TestData.lastName, TestData.zipCode);
    await checkoutInfoPage.continueButton.click();
    await checkoutOverviewPage.finishButton.click();
    expect(await checkoutCompletePage.orderCompleteLabel.getTextContent()).toBe("THANK YOU FOR YOUR ORDER");
    expect(await cartPage.header.cartCount.exists()).toBeFalsy();
  });
})