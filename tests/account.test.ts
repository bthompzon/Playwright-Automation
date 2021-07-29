import { test } from '../fixtures/baseextend';
import HomePage from '../pages/home-page';
import * as TestData from './../testData.json'
import LogInPage from '../pages/log-in-page';
import { expect } from '@playwright/test';

test.describe('Account Tests', () => {
  let loginPage: LogInPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LogInPage(page);
    homePage = new HomePage(page);
  });

  test('Valid Log In/Log out', async ({ page }) => {
    await loginPage.login(TestData.email, TestData.password);
    await homePage.header.hamburgerIcon.click();
    await homePage.header.sideMenu.logoutMenuOption.click();
    expect(await loginPage.logInButton.isVisible()).toBeTruthy();
  });

  test('Invalid Log In', async({ page }) => {
    loginPage.login("invalidUsername", "invalidPassword");
    expect(await loginPage.errorText.getTextContent()).toContain("do not match");
  });
});