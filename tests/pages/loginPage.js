import axios from "axios";
import { Constants } from "../common/constants";

import BasePage from "./basePage";
import { HomePage } from "./homePage";
import { MailinatorPage } from "./mailinatorPage";

const homePage = new HomePage();
const mailinatorPage = new MailinatorPage();

export class LoginPage extends BasePage {
  /**
   * define elements
   */
  get emailInput() { return browser.$("input[type=email]"); }

  get signInTab() { return browser.$(`//a[contains(.,"Sign In")]`); }

  get signUpTab() { return browser.$(`//a[contains(.,"Sign Up")]`); }

  get signInButton() { return browser.$("button[type=button]"); }

  get signUpButton() { return browser.$(`//button[contains(.,"Sign Up")]`); }

  get emailLabel() { return browser.$(`label[for="email"]`); }

  get errorMessage() { return browser.$(".error-msg"); }

  get pendingModal() { return browser.$("iframe.magic-iframe"); }

  get termsConditionCheckbox() { return browser.$(".terms-and-conditions .ui.checkbox"); }

  get loginPageContainer() { return browser.$(".signin-page"); }

  /**
   * define or overwrite page methods
   */
  async openLoginPage() {
    await this.openUrl("signin");
  }

  async openLoginPageWithOutCaptcha() {
    await this.openUrl("signin?captcha=disable");
  }

  async inputEmail(email) {
    await this.waitPageLoaded();
    await this.waitForGlobalLoading();
    await this.type(await this.emailInput, email);
  }

  async clickSignInButton() {
    await this.waitForElementEnabled(await this.signInButton);
    await this.click(await this.signInButton);
  }

  async isPendingModalDisplayed() {
    await this.waitForGlobalLoading();
    await this.waitForElementExisting(await this.pendingModal);
    const flag = await this.isElementDisplayed(await this.pendingModal);
    return flag;
  }

  async isSignInButtonDisabled() {
    await this.waitForElementExisting(await this.signInButton);
    const flag = await this.isElementEnabled(await this.signInButton);

    return !flag;
  }

  async isSignUpButtonDisabled() {
    await this.waitForElementExisting(await this.signUpButton);
    const flag = await this.isElementEnabled(await this.signUpButton);

    return !flag;
  }

  async clickSignInTab() {
    await this.waitForElementClickable(await this.signInTab);
    await this.click(await this.signInTab);
    console.log("Clicked SignInTab");
  }

  async waitForLoginPage() {
    await this.waitForElementExisting(await this.loginPageContainer);
    console.log("SignInTab Appeared");
  }

  async clickSignUpTab() {
    await this.waitForElementClickable(await this.signUpTab);
    await this.click(await this.signUpTab);
    console.log("Clicked SignUpTab");
  }

  async clickSignUpButton() {
    await this.waitForElementEnabled(await this.signUpButton);
    await this.click(await this.signUpButton);
    console.log("Clicked SignUpButton");
  }

  async checkTermsAndConditionsCheckbox() {
    await this.waitForElementClickable(await this.termsConditionCheckbox);
    await this.click(await this.termsConditionCheckbox);
    console.log("Clicked Terms and Conditions Checkbox");
  }

  // Invalid email address
  async getTheErrorMessage() {
    await this.waitForElementExisting(await this.errorMessage);
    const text = await this.getText(await this.errorMessage);

    return text;
  }

  async getInputEmailValue() {
    await this.waitForElementExisting(await this.emailInput);
    const flag = await this.getAttribute(await this.emailInput, "value");
    return flag;
  }

  async isSignUpTabActive() {
    await this.waitForElementExisting(await this.signUpTab);
    await this.sleep(0.5); // Wait for animation
    const cl = await this.getAttribute(await this.signUpTab, "class");
    const flag = cl.includes("active");
    return flag;
  }

  async isSignInTabActive() {
    await this.waitForElementExisting(await this.signInTab);
    await this.sleep(0.5); // Wait for animation
    const cl = await this.getAttribute(await this.signInTab, "class");
    const flag = cl.includes("active");
    return flag;
  }

  async isSignUpScreenShown() {
    expect(await this.isElementDisplayed(await this.signUpTab)).toBeTruthy();
    expect(await this.isElementDisplayed(await this.termsConditionCheckbox)).toBeTruthy();
    expect(await this.isElementDisplayed(await this.signUpButton)).toBeTruthy();
  }

  async getMagicLinkFromEmail(email) {
    await this.sleep(2);
    await browser.url("https://www.mailinator.com/v3/#/#msgpane");
    await this.sleep(2);
    await this.type(await browser.$("input#inbox_field"), email);
    await this.click(await browser.$("button#go_inbox"));
    await this.sleep(2);
    await this.waitForElementExisting(await browser.$('//tr[@ng-repeat="email in emails"][1]//td[3]'));
    await this.click(await browser.$('//tr[@ng-repeat="email in emails"][1]//td[3]'));
    await this.sleep(5);
    await browser.switchToFrame(1);
    await this.waitForElementExisting(await browser.$("a.login-button"));
    const attr = await this.getAttribute(await browser.$("a.login-button"), "href");
    return attr;
  }

  async loginAction(email) {
    await this.openLoginPage();
    await this.inputEmail(email);
    await this.clickSignInButton();
    await this.waitForElementExisting(await this.pendingModal);
    const url = await mailinatorPage.getMagicLinkFromEmail(email);
    await this.openUrl(url);
    expect(await homePage.isUsernameButtonDisplayed()).toBeTruthy();
  }

  async loginActionWithDifferentTabs(email) {
    await this.openLoginPage();
    await this.inputEmail(email);
    await this.clickSignInButton();
    await this.waitForElementExisting(await this.pendingModal);
    await this.openNewWindow();
    const url = await mailinatorPage.getMagicLinkFromEmail(email);
    await this.openUrl(url);
    expect(await homePage.isUsernameButtonDisplayed()).toBeTruthy();
    // Commented out these lines because of Magic random error: Internal error: User denied account access.
    // await this.switchToPreviousTab();
    // expect(await homePage.isUsernameButtonDisplayed()).toBeTruthy();
  }

  async signUp(email) {
    /* To make sure this email is not existed in database */
    const itemType = "user";
    await axios.post(`${Constants.apiEndpoint}service2/admin/deleteItem`, { email, itemType });
    await this.signUpBeginWith(email);
  }

  async signUpBeginWith(email) {
    /* Disable captchar url */
    await this.openUrl("signin?captcha=disable");
    await this.clickSignUpTab();
    await this.inputEmail(email);
    await this.checkTermsAndConditionsCheckbox();
    await this.clickSignUpButton();
    await this.waitForElementExisting(await this.pendingModal);
    const url = await this.getMagicLinkFromEmail(email);
    await this.openUrl(url);
  }

  async loaded() {
    await this.waitPageLoaded();
    await this.waitForGlobalLoading();
    await this.waitForElementExisting(await this.signInTab);
    expect(await this.isElementDisplayed(await this.signInTab));
    await this.waitForElementExisting(await this.signUpTab);
    expect(await this.isElementDisplayed(await this.signUpTab));
    await this.waitForElementExisting(await this.emailLabel);
    expect(await this.isElementDisplayed(await this.emailLabel));
    await this.waitForElementExisting(await this.emailInput);
    await this.waitForElementClickable(await this.emailInput);
    expect(await this.isElementDisplayed(await this.emailInput));
    await this.waitForElementExisting(await this.signInButton);
    expect(await this.isElementDisplayed(await this.signInButton));
    expect((await $$(".logo")).length).toBeGreaterThan(1);
  }
}
