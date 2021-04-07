import axios from "axios";
import { LoginPage } from "../pages/loginPage";
import { HomePage } from "../pages/homePage";
import { Constants } from "../common/constants";
import { MailinatorPage } from "../pages/mailinatorPage";

const loginPage = new LoginPage();
const homePage = new HomePage();
const mailinatorPage = new MailinatorPage();

const userWith0USD = "toantest24@mailinator.com";
const userIsNonUSInvestor = "toantest25@mailinator.com";
const userIsNonUSInvestorButCheckedFundAgreement = "toantest2@mailinator.com";
const userHadEnoughFunds = "toantest2@mailinator.com";
const userHadNotReachMininvestamt = "toantest22@mailinator.com"; // has 200$
const verified_user = "toantest23@mailinator.com";
const userInACHPendingInvestment = "toantest21@mailinator.com";

const minInvest = Constants.minInvest;
const signName = "Toan Tran";
const eth_address_of_verified_user = "0xe07bea2A3d771383b9767e9F336c31C40368A8D8";
const token_name = "FAIR";
const resetUrl = `${Constants.apiEndpoint}service2/admin/deleteItem`;
const itemType = "investment";

describe("TC003: Verify that offline-investment works properly", () => {
  beforeEach(async () => {
    await browser.reloadSession();
  });

  it("TC003-01: User invests more than available USD and account has not been funded", async () => {
    const amount = Number(800);

    await loginPage.loginAction(userWith0USD);
    await homePage.clickInvestNowButton();
    await homePage.inputAmount(amount);
    expect(await homePage.isPreviewPurchaseButtonEnabled()).toBeTruthy();
    await homePage.clickPreviewPurchaseButton();
    expect(await homePage.isProceedToCAFEAgrementPopUpShown()).toBeTruthy();
    /*
            For safely log out,
        */
    await homePage.clickCrossOnInvestModal();
    await homePage.activeDropdown();
    await homePage.clickLogout();
  });

  it("TC003-02: User invests more than available USD", async () => {
    const amount = Number(400);

    await loginPage.loginAction(userHadNotReachMininvestamt);
    await homePage.clickInvestNowButton();
    await homePage.inputAmount(amount);
    expect(await homePage.isPreviewPurchaseButtonDisabled()).toBeTruthy();
    expect(await homePage.isAmountInRed()).toBeTruthy();
    expect(await homePage.getPriceErrorText()).toContain(`The minimum amount to invest is $${minInvest}.00`);
    /*
            For safely log out,
        */
    await homePage.clickCrossOnInvestModal();
    await homePage.activeDropdown();
    await homePage.clickLogout();
  });

  it("TC003-03: User invests but does not have enough funds and goes through the offline investment flow", async () => {
    const amount = Number(1000);
    const money = new Intl.NumberFormat(`en-US`, {
      style                    : `currency`,
      currency                 : `USD`,
      maximumSignificantDigits : 3
    }).format(amount);
    const space = String.fromCharCode(160);

    await loginPage.loginAction(verified_user);
    await homePage.clickInvestNowButton();
    await homePage.inputAmount(amount);
    await homePage.clickPreviewPurchaseButton();
    await homePage.clickProceedToCAFEAgrementButton();
    await homePage.clickIAccpectButton();
    await homePage.clickIAccpectButton();
    await homePage.clickIAcknowledgeButton();
    await homePage.inputSignName(signName);
    await homePage.clickSignTheCAFEAgreementButton();
    expect(await homePage.isLoadingOverLayShown()).toBeTruthy();
    expect(await homePage.isSendFundsModalShown()).toBeTruthy();
    expect(await homePage.getTextTitleOnSendFundsModal()).toEqual("Send your funds now");
    expect(await homePage.getTextDetailOnSendFundsModal()).toEqual(`Transfer${space}${money}${space}(net of fees) to finalize your investment and receive your ${token_name}. Do it quickly to secure the best price for your investment.`);
    await homePage.clickSendFundsButton();
    expect(await homePage.isFundDialogWithACHShown()).toBeTruthy();
    /*
        For safely log out,
        */
    await homePage.clickCrossOnSendFundDialog();
    await homePage.activeDropdown();
    await homePage.clickLogout();
  });

  it("TC003-04: User clicks \"Invest now\" but still needs to send funds", async () => {
    /*
            run after TC003-03, for saving time running TC
        */
    await loginPage.loginAction(verified_user);
    await homePage.clickInvestNowButton();
    expect(await homePage.isFundDialogWithACHShown()).toBeTruthy();
    /*
        For safely log out,
        */
    await homePage.clickCrossOnSendFundDialog();
    await homePage.activeDropdown();
    await homePage.clickLogout();
  });

  it("TC003-05: User clicks \"Invest now\" but still needs to send more funds", async () => {
    /*
        run after TC003-03,TC003-04 for saving time running TC
    */
    const USDC = Number(500);
    /*
            Using user who have funds transfer money to verified_user
        */
    await loginPage.loginAction(userHadEnoughFunds);
    await homePage.activeDropdown();
    await homePage.clickWithdrawOption();
    await homePage.inputRecipientField(eth_address_of_verified_user);
    await homePage.inputAmountField(USDC);
    await homePage.clickContinueButton();
    const confirmCode = await mailinatorPage.getWithdrawalCodeConfirmation(userHadEnoughFunds);
    await homePage.inputConfirmCodeField(confirmCode);
    await homePage.clickConfirmButton(); // sometimes it can't click confirm button because of ETH wallet
    await homePage.clickBackToDashBoardButton();
    await homePage.activeDropdown();
    await homePage.clickLogout();
    await homePage.sleep(30); // assume the app takes 30 seconds to complete a withdraw

    await browser.reloadSession();
    await loginPage.loginAction(verified_user);
    await homePage.clickInvestNowButton();
    expect(await homePage.isFundDialogShown()).toBeTruthy();
    /*
            For safely log out,
        */
    await homePage.clickCrossOnSendFundDialog();
    await homePage.activeDropdown();
    await homePage.clickLogout();
  });

  it("TC003-06: User clicks \"Invest now\" and has enough funds now to finalize investment", async () => {
    /*
            run after TC003-03,TC003-04,TC003-05 for saving time running TC
        */
    const USDC = Number(500);
    /*
            Using another user to transfer money to verified_user
        */
    await loginPage.loginAction(userHadEnoughFunds);
    await homePage.activeDropdown();
    await homePage.clickWithdrawOption();
    expect(await homePage.isWithdrawModalShown()).toBeTruthy();
    await homePage.inputRecipientField(eth_address_of_verified_user);
    await homePage.inputAmountField(USDC);
    expect(await homePage.isContinueButtonClickable()).toBeTruthy();
    await homePage.clickContinueButton();
    const confirmCode = await mailinatorPage.getWithdrawalCodeConfirmation(userHadEnoughFunds);
    await homePage.inputConfirmCodeField(confirmCode);
    await homePage.clickConfirmButton(); // sometimes it can't click confirm button because of ETH wallet
    await homePage.clickBackToDashBoardButton();
    await homePage.activeDropdown();
    await homePage.clickLogout();
    await homePage.sleep(30); // assume the app takes 30 seconds to complete a withdraw

    await browser.reloadSession();
    await loginPage.loginAction(verified_user);
    await homePage.clickInvestNowButton();
    expect(await homePage.isFinalizeYourInvestmentCardShown()).toBeTruthy();
    /*
            For safely log out,
        */
    await homePage.clickCrossOnFinalizeYourInvestmentCard();
    await homePage.activeDropdown();
    await homePage.clickLogout();
  });

  it("TC003-09: User finalizes pending investment from the banner", async () => {
    /*
            run after TC003-03,TC003-04,TC003-05,TC003-06 for saving time running TC
        */
    await loginPage.loginAction(verified_user);
    const fairQuantities = await homePage.getMyPortfolioFairQuantitiesText();
    const fairToUsd = await homePage.getMyPortfolioFairConvertToUsdText();
    await homePage.clickFinalizeMyInvestmentButtonInFinalizeMyInvestmentBanner();
    await homePage.sleep(30); // assume the app takes 30 seconds to make user ready
    await homePage.clickFinalizeInvestmentButtonOnFinalizeYourInvestmentCard();
    expect(await homePage.isThankYouModalShown()).toBeTruthy();
    expect(await homePage.getHeaderOfThankYouModal()).toEqual("Thank you!");
    expect(await homePage.getPriceOnThankYouModal()).toContain(`${token_name}`);
    expect(await homePage.getDescOfThankYouModal()).toMatch(/Your order is being processed\s+It might take up to a few minutes to be confirmed./);
    await homePage.clickBackToDashBoardButton();
    await homePage.sleep(30); // assume the app takes 60 seconds to process the purchase
    expect(await homePage.isPurchaseSuccessfulShown()).toBeTruthy();
    expect(await homePage.getHeaderOfPurchaseSuccessfulNotification()).toEqual("Purchase successful!");
    expect(await homePage.getContentOfPurchaseSuccessfulNotification()).toMatch(/Congratulations! You successfully purchased\s([\d\\.]+)? FAIR.This will be reflected in your portfolio shortly./);
    await homePage.checkPortfolioUpdated(fairQuantities, fairToUsd);
    await homePage.checkInvested();
    /*
            For safely log out,
        */
    await homePage.activeDropdown();
    await homePage.clickLogout();
  });

  it("TC003-07: User clicks \"Invest now\" but has not received funds from ACH funding", async () => {
    await loginPage.loginAction(userInACHPendingInvestment);
    await homePage.clickInvestNowButton();
    await homePage.inputAmount(minInvest);
    await homePage.clickPreviewPurchaseButton();
    await homePage.clickProceedToCAFEAgrementButton();
    await homePage.clickIAccpectButton();
    await homePage.clickIAccpectButton();
    await homePage.clickIAcknowledgeButton();
    await homePage.inputSignName(signName);
    await homePage.clickSignTheCAFEAgreementButton();
    await homePage.clickSendFundsButton();
    await homePage.clickACHOrWireOption();
    await homePage.clickOkIinitiatedTheTransferButton();
    await homePage.clickInvestNowButton();
    expect(await homePage.isPendingInvestmentModalShown()).toBeTruthy();
    /*
        This action added, to make sure no investment,no ACH or Wire Funding has been started and logout
        */
    await homePage.clickOkButtonOnPendingInvestmentModal();
    await homePage.activeDropdown();
    await homePage.clickLogout();
    await axios.post(resetUrl, { email: userInACHPendingInvestment, itemType });
  });

  it("TC003-08: User clicks \"Invest now\" while finalize invest is in progress", async () => {
    await loginPage.loginAction(userHadEnoughFunds);
    await homePage.clickInvestNowButton();
    await homePage.inputAmount(minInvest);
    await homePage.clickPreviewPurchaseButton();
    await homePage.clickProceedToCAFEAgrementButton();
    await homePage.clickIAccpectButton();
    await homePage.clickIAccpectButton();
    await homePage.inputSignName(signName);
    await homePage.clickSignTheCAFEAgreementButton();
    await homePage.clickBackToDashBoardButton();
    await homePage.clickInvestNowButton();
    expect(await homePage.isPendingInvestmentModalShown()).toBeTruthy();
    /*
            For safely log out,
        */
    await homePage.clickOkButtonOnPendingInvestmentModal();
    await homePage.activeDropdown();
    await homePage.clickLogout();
  });

  it("TC003-10: A nonUS investor (individual) tries to invest", async () => {
    await loginPage.loginAction(userIsNonUSInvestor);
    await homePage.clickInvestNowButton();
    expect(await homePage.isInvestNowCardShown()).toBeTruthy();
    /*
        For safely log out,
    */
    await homePage.clickCrossOnInvestModal();
    await homePage.activeDropdown();
    await homePage.clickLogout();
  });

  it("TC003-11: A nonUS investor (individual) tries to invest and has checked all the checkboxes on \"Fund your account\" modal", async () => {
    await loginPage.loginAction(userIsNonUSInvestorButCheckedFundAgreement);
    await homePage.clickInvestNowButton();
    expect(await homePage.isInvestNowCardShown()).toBeTruthy();
    /*
        For safely log out,
    */
    await homePage.clickCrossOnInvestModal();
    await homePage.activeDropdown();
    await homePage.clickLogout();
  });
});

describe("TC001: Verify different investment amount input scenarios", () => {
  beforeEach(async () => {
    await browser.reloadSession();
  });

  it("TC001-01: User invests an amount that is >=minimum investment amount AND not more than the available USD on the account", async () => {
    const amount = Number(800);

    await loginPage.loginAction(userHadEnoughFunds);
    await homePage.clickInvestNowButton();
    await homePage.inputAmount(amount);
    expect(await homePage.isPreviewPurchaseButtonEnabled()).toBeTruthy();
    await homePage.clickPreviewPurchaseButton();
    expect(await homePage.isProceedToCAFEAgrementPopUpShown()).toBeTruthy();
    /*
        For safely log out,
    */
    await homePage.clickCrossOnInvestModal();
    await homePage.activeDropdown();
    await homePage.clickLogout();
  });

  it("TC001-03: User invests less than the minimum investment amount", async () => {
    const amount = Number(200);
    const mininvestamt = "500.00";

    await loginPage.loginAction(userHadEnoughFunds);
    await homePage.clickInvestNowButton();
    await homePage.inputAmount(amount);
    expect(await homePage.isPreviewPurchaseButtonDisabled()).toBeTruthy();
    expect(await homePage.isAmountInRed()).toBeTruthy();
    expect(await homePage.getPriceErrorText()).toEqual(`The minimum amount to invest is $${mininvestamt}`);
    /*
        For safely log out,
    */
    await homePage.clickCrossOnInvestModal();
    await homePage.activeDropdown();
    await homePage.clickLogout();
  });

  it("TC001-05: User enters non numeric character in the amount except for period", async () => {
    const amount = String("asdvujfwk!@#$%.");

    await loginPage.loginAction(userHadEnoughFunds);
    await homePage.clickInvestNowButton();
    await homePage.inputAmount(amount);
    expect(await homePage.getAmountText()).toEqual("");
    /*
        For safely log out,
    */
    await homePage.clickCrossOnInvestModal();
    await homePage.activeDropdown();
    await homePage.clickLogout();
  });

  it("TC001-07:User adds zero in front of the amount", async () => {
    const amount = String("00000900");

    await loginPage.loginAction(userHadEnoughFunds);
    await homePage.clickInvestNowButton();
    await homePage.inputAmount(amount);
    await homePage.clickPayLabel();
    await homePage.clickPreviewPurchaseButton();
    await homePage.clickBackOnInvestCard();
    expect(await homePage.isAmountInputBeginWithZeroNumber()).toBeFalsy();
    expect(await homePage.isPreviewPurchaseButtonEnabled()).toBeTruthy();
    /*
        For safely log out,
    */
    await homePage.clickCrossOnInvestModal();
    await homePage.activeDropdown();
    await homePage.clickLogout();
  });
});
