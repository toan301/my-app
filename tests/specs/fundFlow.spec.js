import axios from "axios";
import { LoginPage } from "../pages/loginPage";
import { HomePage } from "../pages/homePage";
import { Constants } from "../common/constants";

const loginPage = new LoginPage();
const homePage = new HomePage();

const deleteInvestmentUrl = `${Constants.apiEndpoint}service2/admin/deleteItem `;
const itemType = "investment";
/*
 * @registeredEmail has been manually registered in dev env
 */
const registeredEmail = "toantest1@mailinator.com";
/*
 * @ Invested User in dev env
 */
const investedUser = "investeduser@mailinator.com";
/*
 * @email has been manually setup in dev env for case TSC02 -TC001-02
 */
const email = "investeduser2@mailinator.com";
/*
 * @investedUser3 has been manually setup in dev env to check Send More Funds
 */
const investedUser3 = "investeduser3@mailinator.com";
/*
 * @checkboxesUser has been manually setup in dev env to check the checkbox
 */
const checkboxesUser = "checkboxesaccount@mailinator.com";
const amount = "500";
const signName = "Toan Tran";

describe("TSC01: Verify that on-chain funding flow works properly (SEPA,GBP bank transfer | Credit or Debit card | Digital currencies)", () => {
  beforeEach(async () => {
    await browser.reloadSession();
  });

  it("TC001-01: User has successfully verified his identity", async () => {
    await loginPage.loginAction(registeredEmail);
    await homePage.clickUserNameButton();
    await homePage.clickFundMyAccount();
    expect(await homePage.isfundAccountPopupDisplayed()).toBeTruthy();
  });

  it("TC001-02: User checked all the checkboxes in 'Fund your account' modal", async () => {
    await loginPage.loginAction(checkboxesUser);
    await homePage.clickUserNameButton();
    await homePage.clickFundMyAccount();
    await homePage.clickFirstCheckboxFundAccount();
    await homePage.clickSecondCheckboxFundAccount();
    await homePage.clickThirdCheckboxFundAccount();
    expect(await homePage.isContinueButtonEnable()).toBeTruthy();
  });

  it("TC001-03: User did not check any of the checkboxes in 'Fund your account' modal", async () => {
    await loginPage.loginAction(checkboxesUser);
    await homePage.clickUserNameButton();
    await homePage.clickFundMyAccount();
    expect(await homePage.isContinueButtonEnable()).not.toBeTruthy();
  });

  it("TC001-06: User wants to fund his account through bank transfer", async () => {
    await loginPage.loginAction(registeredEmail);
    await homePage.clickUserNameButton();
    await homePage.clickFundMyAccount();
    await homePage.clickBankTransferOption();
    expect(await homePage.isMoonpayWidgetDisplayed()).toBeTruthy();
  });

  it("TC001-07: User wants to fund his account using a debit card", async () => {
    await loginPage.loginAction(registeredEmail);
    await homePage.clickUserNameButton();
    await homePage.clickFundMyAccount();
    await homePage.clickCreditOrDebitCardOption();
    expect(await homePage.isMoonpayWidgetDisplayed()).toBeTruthy();
  });

  it("TC001-09: User wants to fund his account through digital currencies method", async () => {
    await loginPage.loginAction(registeredEmail);
    await homePage.clickUserNameButton();
    await homePage.clickFundMyAccount();
    await homePage.clickDigitalCurrenciesOption();
    expect(await homePage.isUsdcOptionDisplayed()).toBeTruthy();
    expect(await homePage.isEthOptionDisplayed()).toBeTruthy();
    expect(await homePage.isBtcOptionDisplayed()).toBeTruthy();
  });

  it("TC001-10: User wants to fund account from his wallet or exchanges like Coinbase, Kraken, Binance", async () => {
    await loginPage.loginAction(registeredEmail);
    await homePage.clickUserNameButton();
    await homePage.clickFundMyAccount();
    await homePage.clickDigitalCurrenciesOption();
    await homePage.clickUsdcOption();
    expect(await homePage.isUsdcPopupFundDisplayed()).toBeTruthy();
  });

  it("TC001-11: User wants to fund his account using ETH or ERC20 Tokens", async () => {
    await loginPage.loginAction(registeredEmail);
    await homePage.clickUserNameButton();
    await homePage.clickFundMyAccount();
    await homePage.clickDigitalCurrenciesOption();
    await homePage.clickEthOption();
    expect(await homePage.isEthPopupFundDisplayed()).toBeTruthy();
  });

  it("TC001-12: User wants to fund his account using BTC, USDT, BNB, etc...", async () => {
    await loginPage.loginAction(registeredEmail);
    await homePage.clickUserNameButton();
    await homePage.clickFundMyAccount();
    await homePage.clickDigitalCurrenciesOption();
    await homePage.clickBtcOption();
    expect(await homePage.isBtcPopupFundDisplayed()).toBeTruthy();
  });

  it("TC001-13: User clicks 'Send funds' button from the banner", async () => {
    await loginPage.loginAction(investedUser);
    await homePage.clickSendFundButton();
    expect(await homePage.isFinalizeYourInvestmentHeaderDisplayed()).toBeTruthy();
    expect(await homePage.isCancelInvestmentLinkDisplayed()).toBeTruthy();
  });

  it("TC001-14: User clicks 'Send more funds' button from the banner", async () => {
    await loginPage.loginAction(investedUser3);
    await homePage.clickSendMoreFundsButton();
    expect(await homePage.isFinalizeYourInvestmentHeaderDisplayed()).toBeTruthy();
    expect(await homePage.isCancelInvestmentLinkDisplayed()).toBeTruthy();
  });

  it.skip("TC001-15: User clicks 'Fund your account' now from the banner", async () => {

  });

  it.skip("TC001-16: User clicks 'Fund Your Account' link from 'My Transaction History' tile", async () => {

  });

  it.skip("TC001-17: Unverified account is funded by withdrawing from another account", async () => {

  });

  it.skip("TC001-18: Non accredited account is funded by withdrawing from another account", async () => {

  });

  it.skip("TC001-19: User claims to be an accredited US investor and has pending accreditation status is funded by withdrawing from another account", async () => {

  });

  it.skip("TC001-20: Non US investor account and has pending accreditation status is funded by withdrawing from another account", async () => {

  });

  it.skip("TC001-21: Business account and has pending accreditation status is funded by withdrawing from another account", async () => {

  });

  it.skip("TC001-22: ID verification failed but funded by withdrawing from another account", async () => {

  });
});

describe("TSC02: Verify that off-chain funding flow works properly", () => {
  beforeEach(async () => {
    await browser.reloadSession();
  });

  it("TC001-01: User chooses ACH or Wire fund method to fund account", async () => {
    await loginPage.loginAction(investedUser);
    await homePage.clickUserNameButton();
    await homePage.clickFundMyAccount();
    expect(await homePage.isAchOptionDisplayed()).toBeTruthy();
  });

  it("TC001-02: User funds account via ACH or Wire fund method", async () => {
    await axios.post(deleteInvestmentUrl, { email, itemType });
    await loginPage.loginAction(email);
    await homePage.clickInvestNowButton();
    await homePage.inputAmount(amount);
    await homePage.clickPreviewPurchaseButton();
    await homePage.clickProceedToCAFEAgrementButton();
    await homePage.clickIAccpectButton();
    await homePage.clickIAccpectButton();
    await homePage.clickIAcknowledgeButton();
    await homePage.inputSignName(signName);
    await homePage.clickSignTheCAFEAgreementButton();
    await homePage.clickCrossOnSendFundModal();

    await homePage.clickUserNameButton();
    await homePage.clickFundMyAccount();
    await homePage.clickAchOption();
    await homePage.clickInitiatedTransferButton();
    expect(await homePage.isYourFundsAreOnTheirWayTextDisplayed()).toBeTruthy();
  });
});
