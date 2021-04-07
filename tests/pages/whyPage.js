import BasePage from "./basePage";

export class WhyPage extends BasePage {
  get firstNameInput() { return browser.$("#firstName"); }

  get lastNameInput() { return browser.$("#lastName"); }

  get investCheckBox() { return browser.$(`.ui.checkbox`); }

  get saveAndContinueButton() { return browser.$("button.button.next-btn"); }

  get arrowOnTheCEOScreen() { return browser.$("//div[@class='next-btn']"); }

  get arrowOnTheTeamScreen() { return browser.$("//div[@class='next-btn']"); }

  get getStartedButton() { return browser.$(`//button[contains(.,"Get started")]`); }

  get yourCompanyNameInput() { return browser.$("#companyName"); }

  get yourTitleInput() { return browser.$("#companyTitle"); }

  get welcomeScreen() { return browser.$(".welcome-modal"); }

  async openWhyPage() {
    const url = "our-vision";
    await this.openUrl(url);
    console.log(`Go to ${url}`);
  }

  async inputFirstName(text) {
    await this.waitPageLoaded();
    await this.waitForGlobalLoading();
    await this.type(await this.firstNameInput, text);
    console.log("Typed FirstName");
  }

  async inputLastname(text) {
    await this.waitPageLoaded();
    await this.waitForGlobalLoading();
    await this.type(await this.lastNameInput, text);
    console.log("Typed LastName");
  }

  async checkCheckbox() {
    await this.waitForElementClickable(await this.investCheckBox);
    await this.click(await this.investCheckBox);
    console.log("Checked Checkbox");
  }

  async isInvestCheckBoxUnCheck() {
    await this.waitForGlobalLoading();
    await this.waitForElementExisting(await this.investCheckBox);
    const cl = await this.getAttribute(await this.investCheckBox, "class");
    const status = cl.includes("checked");

    console.log("isInvestCheckBoxUnCheck called");
    return !status;
  }

  async clickSaveAndContinueButton() {
    await this.waitForElementEnabled(await this.saveAndContinueButton);
    await this.click(await this.saveAndContinueButton);
    console.log("Clicked SaveAndContinueButton");
  }

  async isSaveAndContinueButtonDisabled() {
    await this.waitForGlobalLoading();
    await this.waitForElementExisting(await this.saveAndContinueButton);
    const cl = await this.getAttribute(await this.saveAndContinueButton, "class");
    const status = cl.includes("disabled");

    console.log("isSaveAndContinueButtonDisabled called");
    return status;
  }

  async clickArrowOnTheCEOScreen() {
    await this.sleep(1); // wait for the animation
    await this.waitForElementClickable(await this.arrowOnTheCEOScreen);
    await this.click(await this.arrowOnTheCEOScreen);
    console.log("Clicked ArrowOnTheCEOScreen");
  }

  async clickArrowOnTheTeamScreen() {
    await this.sleep(1); // wait for the animation
    await this.waitForElementClickable(await this.arrowOnTheTeamScreen);
    await this.click(await this.arrowOnTheTeamScreen);
    console.log("Clicked ArrowOnTheTeamScreen");
  }

  async clickGetStartedButton() {
    await this.sleep(1); // wait for the animation
    await this.waitForElementClickable(await this.getStartedButton);
    await this.click(await this.getStartedButton);
    console.log("Clicked GetStartedButton");
  }

  async inputYourCompanyName(text) {
    await this.waitPageLoaded();
    await this.waitForGlobalLoading();
    await this.type(await this.yourCompanyNameInput, text);
    console.log("Typed YourCompanyName");
  }

  async inputYourTitle(text) {
    await this.waitPageLoaded();
    await this.waitForGlobalLoading();
    await this.type(await this.yourTitleInput, text);
    console.log("Typed YourCompanyTitle");
  }

  async isWelcomeScreenShown() {
    await this.waitForGlobalLoading();
    await this.waitForElementExisting(await this.welcomeScreen);
    const status = await this.isElementDisplayed(await this.welcomeScreen);

    console.log("isWelcomeScreenShown called");
    return status;
  }
}
