import BaseAction from "../common/baseAction";

export default class BasePage extends BaseAction {
  /**
   * define elements
   */
  get header() { return browser.$(".ui.header"); }

  get userDropDown() { return browser.$(".menu.transition"); }

  get usernameButton() { return browser.$(`.avatar`); }

  get fundOption() { return browser.$(`//div[@role="option" and contains(.,"Fund my account")]`); }

  get secureOption() { return browser.$(`//div[@role="option" and contains(.,"Secure my account")]`); }

  get diagnosticsOption() { return browser.$(`//div[@role="option" and contains(.,"Diagnostics")]`); }

  get withdrawOption() { return browser.$(`//div[@role="option" and contains(.,"Withdraw")]`); }

  get logout() { return browser.$(`//div[@role="option" and contains(.,"Sign out")]`); }

  get recipientField() { return browser.$(`#toAddress`); }

  get amountField() { return browser.$(`#amount`); }

  get continueButton() { return browser.$("//button[text()='Continue']"); }

  get confirmCodeField() { return browser.$(".react-code-input"); }

  get confirmButton() { return browser.$("//button[text()='Confirm']"); }

  get investSuccessPopup() { return browser.$(".invest-success-page"); }

  get errorMessage() { return browser.$(".error-msg"); }

  get wrongCodePopUp() { return browser.$("//div[text()='Wrong code']"); }

  /**
   * define or overwrite page methods
   */
  async open() {
    await browser.url("/");
  }

  async openUrl(url) {
    await browser.url(url);
  }

  async isUsernameButtonDisplayed() {
    await this.waitForElementExisting(await this.usernameButton);
    const flag = await this.isElementDisplayed(await this.usernameButton);
    return flag;
  }

  async isUserDropDownDisplayed() {
    await this.waitForElementExisting(await this.userDropDown);
    const flag = await this.isElementDisplayed(await this.userDropDown);
    return flag;
  }

  async isVerifyCardDisplayed() {
    await this.waitForElementExisting(await this.verifyCard);
    const flag = await this.isElementDisplayed(await this.verifyCard);
    return flag;
  }

  async isWithdrawCardDisplayed() {
    await this.waitForElementExisting(await this.withdrawCard);
    const flag = await this.isElementDisplayed(await this.withdrawCard);
    return flag;
  }

  async isSecureCardDisplayed() {
    await this.waitForElementExisting(await this.secureCard);
    const flag = await this.isElementDisplayed(await this.secureCard);
    return flag;
  }

  async isDiagnosticsCardDisplayed() {
    await this.waitForElementExisting(await this.diagnosticsCard);
    const flag = await this.isElementDisplayed(await this.diagnosticsCard);
    return flag;
  }

  async clickUserNameButton() {
    await this.waitForElementClickable(await this.usernameButton);
    await this.click(await this.usernameButton);
    console.log("Clicked Username button");
  }

  async clickSecureOption() {
    await this.waitForElementClickable(await this.secureOption);
    await this.click(await this.secureOption);
    console.log("Clicked Secure Option");
  }

  async clickDiagnosticsOption() {
    await this.waitForElementClickable(await this.diagnosticsOption);
    await this.click(await this.diagnosticsOption);
    console.log("Clicked Diagnostic Option");
  }

  async clickWithdrawOption() {
    await this.waitForElementClickable(await this.withdrawOption);
    await this.click(await this.withdrawOption);
    console.log("Clicked Withdraw Option");
  }

  async clickLogout() {
    await this.waitForElementClickable(await this.logout);
    await this.click(await this.logout);
    console.log("Clicked Log out button");
  }

  async activeDropdown() {
    await this.clickUserNameButton();
    expect(await this.isUserDropDownDisplayed()).toBeTruthy();
  }

  async closePopUp() {
    await browser.pause(2000);
    await (await this.header).click({ x: -30 });
  }

  async inputRecipientField(recipient) {
    await this.waitForElementExisting(await this.recipientField);
    await this.type(await this.recipientField, recipient);
    console.log("Input recipient field");
  }

  async inputAmountField(amount) {
    await this.waitForElementExisting(await this.amountField);
    await this.type(await this.amountField, amount);
    console.log("Input amount field");
  }

  async clickContinueButton() {
    await this.waitForElementClickable(await this.continueButton);
    await this.click(await this.continueButton);
    console.log("Clicked Continue button");
  }

  async inputConfirmCodeField(confirmCode) {
    await this.waitForElementExisting(await this.confirmCodeField);
    await this.type(await this.confirmCodeField, confirmCode);
    console.log("Input Confirm Code field");
  }

  async clickConfirmButton() {
    await this.waitForElementClickable(await this.confirmButton);
    await this.click(await this.confirmButton);
    console.log("Clicked Confirm button");
  }

  async isContinueButtonClickable() {
    await this.waitForElementExisting(await this.continueButton);
    const flag = await this.isElementEnabled(await this.continueButton);
    return flag;
  }

  async isInvestSucessPopupDisplayed() {
    await this.waitForElementExisting(await this.investSuccessPopup);
    const flag = await this.isElementDisplayed(await this.investSuccessPopup);
    return flag;
  }

  async isErrorMessageDisplayed() {
    await this.waitForElementExisting(await this.errorMessage);
    const flag = await this.isElementDisplayed(await this.errorMessage);
    return flag;
  }

  async isWrongCodePopUpDisplayed() {
    await this.waitForElementExisting(await this.wrongCodePopUp);
    const flag = await this.isElementDisplayed(await this.wrongCodePopUp);
    return flag;
  }
}
