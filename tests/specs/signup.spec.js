import axios from "axios";
import { Constants } from "../common/constants";

import { LoginPage } from "../pages/loginPage";
import { HomePage } from "../pages/homePage";
import { MailinatorPage } from "../pages/mailinatorPage";

const loginPage = new LoginPage();
const homePage = new HomePage();
const mailinatorPage = new MailinatorPage();
const resetUrl = `${Constants.apiEndpoint}service2/admin/deleteItem`;
const itemType = "user";

describe("TSC01: Verify that sign up functionality works", () => {
  beforeEach(async () => {
    await browser.reloadSession();
  });

  it("TC001-01: Signs up with a valid email address", async () => {
    const email = `toantest10@mailinator.com`;
    /* Call API to delete registered user for a pre-condition */
    await axios.post(resetUrl, { email, itemType });
    await loginPage.openLoginPageWithOutCaptcha();
    await loginPage.clickSignUpTab();
    await loginPage.inputEmail(email);
    await loginPage.checkTermsAndConditionsCheckbox();
    await loginPage.clickSignUpButton();
    await loginPage.openNewWindow();
    const url = await mailinatorPage.getMagicLinkFromEmail(email);
    await browser.url(url);
    expect(await homePage.isUsernameButtonDisplayed()).toBeTruthy();
    // Commented out these lines because of Magic random error: Internal error: User denied account access.
    // await loginPage.switchToPreviousTab();
    // expect(await homePage.isUsernameButtonDisplayed()).toBeTruthy();
  });

  it("TC001-02: Signs up with a valid email address that already exists", async () => {
    /* @email has been registered manually */
    const email = `toantest@mailinator.com`;
    await loginPage.openLoginPageWithOutCaptcha();
    await loginPage.clickSignUpTab();
    await loginPage.inputEmail(email);
    await loginPage.checkTermsAndConditionsCheckbox();
    await loginPage.clickSignUpButton();
    await loginPage.openNewWindow();
    const url = await mailinatorPage.getMagicLinkFromEmail(email);
    await browser.url(url);
    expect(await homePage.isUsernameButtonDisplayed()).toBeTruthy();
    // Commented out these lines because of Magic random error: Internal error: User denied account access.
    // await loginPage.switchToPreviousTab();
    // expect(await homePage.isUsernameButtonDisplayed()).toBeTruthy();
  });

  it("TC001-03: Signs up with an invalid email address", async () => {
    const invalidEmail = "toantest@";
    await loginPage.openLoginPageWithOutCaptcha();
    await loginPage.clickSignUpTab();
    await loginPage.inputEmail(invalidEmail);
    await loginPage.checkTermsAndConditionsCheckbox();
    expect(await loginPage.isSignUpButtonDisabled()).toBeTruthy();
    expect(await loginPage.getTheErrorMessage()).toEqual("Invalid email address");
  });

  it("TC001-04: User did not check the checkbox for accepting the Terms of Service and Privacy Policy", async () => {
    const email = `toantest10@mailinator.com`;
    await axios.post(resetUrl, { email, itemType });
    await loginPage.openLoginPageWithOutCaptcha();
    await loginPage.clickSignUpTab();
    await loginPage.inputEmail(email);
    expect(await loginPage.isSignUpButtonDisabled()).toBeTruthy();
  });
});
