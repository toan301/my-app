import { LoginPage } from "../pages/loginPage";
import { WhyPage } from "../pages/whyPage";

const loginPage = new LoginPage();
const whyPage = new WhyPage();
const email = "toantestwelcomet@mailinator.com";

describe("TSC01: Verify that welcome flow works properly", () => {
  beforeEach(async () => {
    await browser.reloadSession();
    await loginPage.signUp(email);
    await loginPage.waitForGlobalLoading();
  });

  it("TC001-01: Normal flow for individual account", async () => {
    expect(await whyPage.isWelcomeScreenShown()).toBeTruthy();
    await whyPage.inputFirstName("Toan");
    await whyPage.inputLastname("Tran");
    expect(await whyPage.isInvestCheckBoxUnCheck()).toBeTruthy();
    await whyPage.clickSaveAndContinueButton();
    await whyPage.clickArrowOnTheCEOScreen();
    await whyPage.clickArrowOnTheTeamScreen();
    await whyPage.clickGetStartedButton();
    await whyPage.sleep(1);
    const url = await browser.getUrl();
    expect(url).toContain("our-vision");
  });

  it("TC001-02: Normal flow for business account", async () => {
    expect(await whyPage.isWelcomeScreenShown()).toBeTruthy();
    await whyPage.inputFirstName("Toan");
    await whyPage.inputLastname("Tran");
    expect(await whyPage.isInvestCheckBoxUnCheck()).toBeTruthy();
    await whyPage.checkCheckbox();
    await whyPage.inputYourCompanyName("Tesla");
    await whyPage.inputYourTitle("CEO");
    await whyPage.sleep(5);
    await whyPage.clickSaveAndContinueButton();
    await whyPage.clickArrowOnTheCEOScreen();
    await whyPage.clickArrowOnTheTeamScreen();
    await whyPage.clickGetStartedButton();
    const url = await browser.getUrl();
    expect(url).toContain("our-vision");
  });

  it("TC001-03+04: Individual user did not enter his last name or first name", async () => {
    expect(await whyPage.isWelcomeScreenShown()).toBeTruthy();
    await whyPage.inputFirstName("Toan");
    expect(await whyPage.isInvestCheckBoxUnCheck()).toBeTruthy();
    expect(await whyPage.isSaveAndContinueButtonDisabled()).toBeTruthy();
    await whyPage.inputFirstName(".");
    await (await whyPage.firstNameInput).clearValue();
    await whyPage.inputLastname("Tran");
    expect(await whyPage.isInvestCheckBoxUnCheck()).toBeTruthy();
    expect(await whyPage.isSaveAndContinueButtonDisabled()).toBeTruthy();
  });

  it("TC001-05+06+07+08: Missing information in Business account in some situations", async () => {
    expect(await whyPage.isWelcomeScreenShown()).toBeTruthy();
    expect(await whyPage.isInvestCheckBoxUnCheck()).toBeTruthy();
    await whyPage.checkCheckbox();
    await whyPage.inputYourCompanyName("Tesla");
    expect(await whyPage.isSaveAndContinueButtonDisabled()).toBeTruthy();
    await whyPage.checkCheckbox();
    await whyPage.inputFirstName("Toan");
    await whyPage.inputLastname("Tran");
    await whyPage.checkCheckbox();
    await whyPage.inputYourCompanyName("Tesla");
    expect(await whyPage.isSaveAndContinueButtonDisabled()).toBeTruthy();
    await whyPage.checkCheckbox();
    await (await whyPage.firstNameInput).clearValue();
    await (await whyPage.lastNameInput).clearValue();
    await whyPage.checkCheckbox();
    expect(await whyPage.isSaveAndContinueButtonDisabled()).toBeTruthy();
    await whyPage.checkCheckbox();
    await whyPage.inputFirstName("Toan");
    await whyPage.inputLastname("Tran");
    await whyPage.checkCheckbox();
    expect(await whyPage.isSaveAndContinueButtonDisabled()).toBeTruthy();
  });

  it("TC001-09: User clicks outside the welcome screen", async () => {
    expect(await whyPage.isWelcomeScreenShown()).toBeTruthy();
    await whyPage.closePopUp();
    expect(await whyPage.isWelcomeScreenShown()).toBeTruthy();
  });

  it("TC001-10: User closed the browser or tab while on the welcome screen and then re-opens fairmint's site again", async () => {
    expect(await whyPage.isWelcomeScreenShown()).toBeTruthy();
    await whyPage.createNewWindow();
    await browser.closeWindow();
    await whyPage.sleep(1);
    await whyPage.openWhyPage();
    expect(await whyPage.isWelcomeScreenShown()).toBeTruthy();
  });

  it("TC001-11: User reloads while on the welcome screen", async () => {
    expect(await whyPage.isWelcomeScreenShown()).toBeTruthy();
    await browser.refresh();
    await whyPage.sleep(1);
    expect(await whyPage.isWelcomeScreenShown()).toBeTruthy();
  });
});
