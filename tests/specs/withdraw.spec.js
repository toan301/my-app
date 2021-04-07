import { LoginPage } from "../pages/loginPage";
import { HomePage } from "../pages/homePage";
import { MailinatorPage } from "../pages/mailinatorPage";

const loginPage = new LoginPage();
const homePage = new HomePage();
const mailinatorPage = new MailinatorPage();

const withDrawAccount = "toantest1@mailinator.com";
/*
 * This address is belonged to this email account: "toantest@mailinator.com" which is a manually prepared account
 */
const receivedWalletAddress = "0x8a567cBADC28c0c0fDa0adA9320b73aE927Ac647";
const withDrawAmount = "1";
const invalidWalletAddress = "0x8a567cBADC28c0c0invalidWalletAddress";
const exceededWithDrawAmount = "9999999999";
/*
 * This address is belonged to this email account: "notverifieduser@mailinator.com" which is a manually prepared account
 */
const notVerifiedUserAddress = "0xB8E9E705b8d6DdaA0407cEA3c10338079AB9e0b3";
/*
 * This address is belonged to this email account: "mtest.21a@yopmail.com" which is a manually prepared account
 */
const verifiedFailedUserAddress = "0x32D653999194e9C5bCC13B531E169aeE74F8Ae2b";

describe("Verify that withdraw flow works properly", () => {
  beforeEach(async () => {
    await browser.reloadSession();
  });

  it("TC001-01: User entered a valid recipient ETH address and a valid amount", async () => {
    await loginPage.loginAction(withDrawAccount);
    await homePage.clickUserNameButton();
    await homePage.clickWithdrawOption();
    await homePage.inputRecipientField(receivedWalletAddress);
    await homePage.inputAmountField(withDrawAmount);
    expect(await homePage.isContinueButtonClickable()).toBeTruthy();
    await homePage.clickContinueButton();
    const confirmCode = await mailinatorPage.getWithdrawalCodeConfirmation(withDrawAccount);
    await homePage.inputConfirmCodeField(confirmCode);
    await homePage.clickConfirmButton();
    await homePage.isInvestSucessPopupDisplayed();
  });

  it("TC001-02: User entered an invalid recipient ETH address", async () => {
    await loginPage.loginAction(withDrawAccount);
    await homePage.clickUserNameButton();
    await homePage.clickWithdrawOption();
    await homePage.inputRecipientField(invalidWalletAddress);
    await homePage.inputAmountField(withDrawAmount);
    await homePage.clickContinueButton();
    expect(await homePage.isErrorMessageDisplayed()).toBeTruthy();
  });

  it("TC001-03: User entered a valid recipient ETH address and an amount that is more than the available USDC or funds ", async () => {
    await loginPage.loginAction(withDrawAccount);
    await homePage.clickUserNameButton();
    await homePage.clickWithdrawOption();
    await homePage.inputRecipientField(receivedWalletAddress);
    await homePage.inputAmountField(exceededWithDrawAmount);
    await homePage.clickContinueButton();
    expect(await homePage.isErrorMessageDisplayed()).toBeTruthy();
  });

  it("TC001-04: User entered a valid PIN code", async () => {
    await loginPage.loginAction(withDrawAccount);
    await homePage.clickUserNameButton();
    await homePage.clickWithdrawOption();
    await homePage.inputRecipientField(receivedWalletAddress);
    await homePage.inputAmountField(withDrawAmount);
    expect(await homePage.isContinueButtonClickable()).toBeTruthy();
    await homePage.clickContinueButton();
    const confirmCode = await mailinatorPage.getWithdrawalCodeConfirmation(withDrawAccount);
    await homePage.inputConfirmCodeField(confirmCode);
    await homePage.clickConfirmButton();
    await homePage.isInvestSucessPopupDisplayed();
  });

  it("TC001-05: User entered an invalid PIN code ", async () => {
    await loginPage.loginAction(withDrawAccount);
    await homePage.clickUserNameButton();
    await homePage.clickWithdrawOption();
    await homePage.inputRecipientField(receivedWalletAddress);
    await homePage.inputAmountField(withDrawAmount);
    expect(await homePage.isContinueButtonClickable()).toBeTruthy();
    await homePage.clickContinueButton();
    const confirmCode = await mailinatorPage.getInvalidWithdrawalCodeConfirmation(withDrawAccount);
    await homePage.inputConfirmCodeField(confirmCode);
    await homePage.clickConfirmButton();
    await homePage.isWrongCodePopUpDisplayed();
  });
  it("TC001-06: Amount withdrawn is sent to an investor whose account has not been verified yet", async () => {
    await loginPage.loginAction(withDrawAccount);
    await homePage.clickUserNameButton();
    await homePage.clickWithdrawOption();
    await homePage.inputRecipientField(notVerifiedUserAddress);
    await homePage.inputAmountField(withDrawAmount);
    expect(await homePage.isContinueButtonClickable()).toBeTruthy();
    await homePage.clickContinueButton();
    const confirmCode = await mailinatorPage.getWithdrawalCodeConfirmation(withDrawAccount);
    await homePage.inputConfirmCodeField(confirmCode);
    await homePage.clickConfirmButton();
    await homePage.isInvestSucessPopupDisplayed();
  });

  it("TC001-07: Amount withdrawn is sent to an investor that failed the ID verification process", async () => {
    await loginPage.loginAction(withDrawAccount);
    await homePage.clickUserNameButton();
    await homePage.clickWithdrawOption();
    await homePage.inputRecipientField(verifiedFailedUserAddress);
    await homePage.inputAmountField(withDrawAmount);
    expect(await homePage.isContinueButtonClickable()).toBeTruthy();
    await homePage.clickContinueButton();
    const confirmCode = await mailinatorPage.getWithdrawalCodeConfirmation(withDrawAccount);
    await homePage.inputConfirmCodeField(confirmCode);
    await homePage.clickConfirmButton();
    await homePage.isInvestSucessPopupDisplayed();
  });

  it("TC001-08: Amount withdrawn is sent to an investor that has not been accredited yet", async () => {
    await loginPage.loginAction(withDrawAccount);
    await homePage.clickUserNameButton();
    await homePage.clickWithdrawOption();
    await homePage.inputRecipientField(receivedWalletAddress);
    await homePage.inputAmountField(withDrawAmount);
    expect(await homePage.isContinueButtonClickable()).toBeTruthy();
    await homePage.clickContinueButton();
    const confirmCode = await mailinatorPage.getWithdrawalCodeConfirmation(withDrawAccount);
    await homePage.inputConfirmCodeField(confirmCode);
    await homePage.clickConfirmButton();
    await homePage.isInvestSucessPopupDisplayed();
  });
});
