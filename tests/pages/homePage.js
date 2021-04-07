import BasePage from "./basePage";

export class HomePage extends BasePage {
  /**
   * define elements
   */
  get verifyButton() { return browser.$(`//button[contains(.,"Verify your identity")]`); }

  get verifyLink() { return browser.$(`a[contains(.,"Verify your identity")]`); }

  get verifyCard() { return browser.$(".verify-identity-card"); }

  get secureCard() { return browser.$(".security-card"); }

  get diagnosticsCard() { return browser.$(".diagnostics-card"); }

  get withdrawCard() { return browser.$(".fund-card"); }

  get investNowButton() { return browser.$(`//a[contains(.,'Invest now')]`); }

  get fundMyAccount() { return browser.$("//div[text()='Fund my account']"); }

  get previewPurchaseButton() { return browser.$(`//button[contains(.,'Preview Purchase')]`); }

  get fundAccountPopup() { return browser.$("div[class='description']"); }

  get proceedToCAFEAgrementButton() { return browser.$(`//button[contains(.,'Proceed to CAFE Agreement')]`); }

  get continueButton() { return browser.$("//button[text()='Continue']"); }

  get amountInput() { return browser.$(`//div[@class='usd-price']//input`); }

  get bankTransferOption() { return browser.$("//div[text()='SEPA, GBP bank transfer']"); }

  get achOption() { return browser.$("//div[text()='ACH or Wire']"); }

  get moonpayWidget() { return browser.$("div[class='moonpay-container']"); }

  get creditOrDebitCardOption() { return browser.$("//div[text()='SEPA, GBP bank transfer']"); }

  get priceErrorText() { return browser.$(".fairmint-price.error"); }

  get availableUsdText() { return browser.$(`//.[@class="available-usd" ]//span[contains(.,"$")]`); }

  get investAllAvailableOption() { return browser.$(`//div[contains(text(),'Invest all available')]`); }

  get payWithLabelInInvest() { return browser.$(`//td[contains(.,'Pay with')]`); }

  get iAccpectButton() { return browser.$(`//button[contains(.,'I accept')]`); }

  get iAcknowledgeButton() { return browser.$(`//button[contains(.,'I acknowledge')]`); }

  get digitalCurrenciesOption() { return browser.$("//div[text()='Digital currencies']"); }

  get usdcOption() { return browser.$("//div[text()='USDC']"); }

  get ethOption() { return browser.$("//div[text()='ETH, Tokens']"); }

  get confirmCancelInvestButton() { return browser.$(`button[class="ui primary right floated button undefined jss19 jss73 jss20 jss74"]`); }

  get signNameElectronicalInput() { return browser.$(`input.sign-name`); }

  get signTheCAFEAgreementButton() { return browser.$(`//button[contains(.,'Sign the CAFE Agreement')]`); }

  get btcOption() { return browser.$("//div[text()='BTC, USDT']"); }

  get fundUsdcPopupTitle() { return browser.$("//div[text()='Fund with USDC']"); }

  get fundEthPopupTitle() { return browser.$("//div[text()='Convert ETH or ERC20 tokens to USDC']"); }

  get fundBtcPopupTitle() { return browser.$("//div[text()='Fund with BTC, USDT, BNB...']"); }

  get sendFundsButton() { return browser.$("//button[text()='Send Funds']"); }

  get cancelInvestmentLink() { return browser.$("//span[text()='Cancel my investment']"); }

  get finalizeYourInvestmentHeader() { return browser.$("//div[text()='Finalize your investment']"); }

  get firstCheckboxFundAccount() { return browser.$("(//div[@class='sell-desc']/div/div)[1]"); }

  get secondCheckboxFundAccount() { return browser.$("(//div[@class='sell-desc']/div/div)[2]"); }

  get thirdCheckboxFundAccount() { return browser.$("(//div[@class='sell-desc']/div/div)[3]"); }

  get initiatedTransferButton() { return browser.$("//button[text()='Ok I initiated the transfer']"); }

  get sendMoreFundsButton() { return browser.$("//button[text()='Send more funds']"); }

  get closeButton() { return browser.$("svg[class='close-icon']"); }

  get yourFundsAreOnTheirWayText() { return browser.$("//span[text()='Your funds are on their way']"); }

  get crossOnSendFundsModal() { return browser.$(`.send-fund-card svg rect`); }

  get thankYouModal() { return browser.$(`.buy-success-card`); }

  get headerOfThankYouModal() { return browser.$(`.buy-success-card h2.header`); }

  get priceInThankYouModal() { return browser.$(`.buy-success-card p.price span`); }

  get descOfThankYouModal() { return browser.$(`.buy-success-card p.desc`); }

  get backToDashBoardButton() { return browser.$(`//button[contains(.,'Back to dashboard')]`); }

  get purchaseSuccessfulNotification() { return browser.$(`//span[contains(text(),'Purchase successful!')]//ancestor::div[contains(@class,'message notify-message-box')]`); }

  get headerOfPurchaseSuccessfulNotification() { return browser.$(`//div[contains(@class,'notification-msg-container')]/div[1]/div[contains(@class,'success message notify-message-box')]//div[contains(@class,'header')]//span`); }

  get contentOfPurchaseSuccessfulNotification() { return browser.$(`//div[contains(@class,'notification-msg-container')]/div[1]/div[contains(@class,'success message notify-message-box')]//div[contains(@class,'content')]`); }

  get myPortfolioFairQuantities() { return browser.$(`//div[contains(@class,'portfolio-chart')]//table//tbody//tr[1]//td[2]//span`); }

  get myPortfolioFairConvertToUsd() { return browser.$(`//div[contains(@class,'portfolio-chart')]//table//tbody//tr[1]//td[4]//span`); }

  get notEnoughFundModal() { return browser.$(`.not-enough-fund`); }

  get notEnoughFundTextTitle() { return browser.$(`.not-enough-fund .title`); }

  get notEnoughFundTextDetail() { return browser.$(`.not-enough-fund .text`); }

  get yesCancelButton() { return browser.$(`//button[contains(.,'Yes, cancel')]`); }

  get noContinueButton() { return browser.$(`//button[contains(.,'No, continue')]`); }

  get fundDialogWithACH() { return browser.$(`//div[contains(@class,'fund-card')]//div[contains(text(),'ACH or Wire')]`); }

  get fundDialog() { return browser.$(`//div[contains(@class,'fund-card')]`); }

  get cancelInvestment() { return browser.$(`//span[contains(text(),'Cancel my investment')]`); }

  get crossOnSendFundsDialog() { return browser.$(`.real-fund svg rect`); }

  get finalizeYourInvestmentModal() { return browser.$(`.real-fund`); }

  get crossOnFinalizeYourInvestmentModal() { return browser.$(`.real-fund svg rect`); }

  get ethAddressInput() { return browser.$(`#toAddress`); }

  get WithdrawUSDCModal() { return browser.$(`.fund-step`); }

  get amountUSDC() { return browser.$(`#amount`); }

  get crossOnInvestNowModal() { return browser.$(`.invest-buy-sell-card svg rect`); }

  get finalizeMyInvestmentButtonInFinalizeMyInvestmentBanner() { return browser.$(`//div[contains(@class,'banner-box')]//button[contains(text(),'Finalize my investment')]`); }

  get finalizeYourInvestmentCard() { return browser.$(`.finalize-invest-card`); }

  get crossOnFinalizeYourInvestmentCard() { return browser.$(`.finalize-invest-card svg rect`); }

  get finalizeInvestmentButtonOnFinalizeYourInvestmentCard() { return browser.$(`//div[contains(@class,'finalize-invest-card')]//button[contains(text(),'Finalize investment')]`); }

  get investmentLoaderOnDashboard() { return browser.$(`//div[contains(@class,'ui tiny active inline loader')]`); }

  get pendingInvestmentModal() { return browser.$(`.pending-investment`); }

  get okButtonOnPendingInvestmentModal() { return browser.$(`//div[contains(@class,'pending-investment')]//button[contains(.,'Ok')]`); }

  get investNowCard() { return browser.$(`.invest-buy-sell-card`); }

  get loadingOverlay() { return browser.$("div.loading-overlay-div"); }

  get ACHOrWireOption() { return browser.$(`//div[contains(text(),'ACH or Wire')]//ancestor::div[contains(@class,'ui large feed')]`); }

  get OkIinitiatedTheTransferButton() { return browser.$(`//button[contains(text(),'Ok I initiated the transfer')]`); }

  get investedStatusInFirstRowOfMyTransactionHistory() { return browser.$(`//div[contains(@class,'transaction-history')]//table//tbody//tr[1]//div[contains(.,'Invested')]`); }

  get backOnInvestCard() { return browser.$(`.invest-buy-sell-card .back-icon-header svg rect`); }

  /**
   * define or overwrite page methods
   */
  async clickVerifyLink() {
    await this.waitForElementClickable(await this.verifyLink);
    await this.click(await this.verifyLink);
  }

  async clickVerifyButton() {
    await this.waitForElementClickable(await this.verifyButton);
    await this.click(await this.verifyButton);
  }

  async clickFundMyAccount() {
    await this.waitForElementClickable(await this.fundMyAccount);
    await this.click(await this.fundMyAccount);
  }

  async isfundAccountPopupDisplayed() {
    await this.waitForElementExisting(await this.fundAccountPopup);
    const flag = await this.isElementDisplayed(await this.fundAccountPopup);
    return flag;
  }

  async isContinueButtonDisplayed() {
    await this.waitForElementExisting(await this.continueButton);
    const flag = await this.isElementDisplayed(await this.continueButton);
    return flag;
  }

  async isContinueButtonEnable() {
    await this.waitForElementExisting(await this.continueButton);
    const flag = await this.isElementEnabled(await this.continueButton);
    return flag;
  }

  async clickAchOption() {
    await this.waitForElementClickable(await this.achOption);
    await this.click(await this.achOption);
  }

  async isAchOptionDisplayed() {
    await this.waitForElementExisting(await this.achOption);
    const flag = await this.isElementDisplayed(await this.achOption);
    return flag;
  }

  async clickBankTransferOption() {
    await this.waitForElementClickable(await this.bankTransferOption);
    await this.click(await this.bankTransferOption);
  }

  async clickCreditOrDebitCardOption() {
    await this.waitForElementClickable(await this.creditOrDebitCardOption);
    await this.click(await this.creditOrDebitCardOption);
  }

  async clickDigitalCurrenciesOption() {
    await this.waitForElementClickable(await this.digitalCurrenciesOption);
    await this.click(await this.digitalCurrenciesOption);
  }

  async isMoonpayWidgetDisplayed() {
    await this.waitForElementExisting(await this.moonpayWidget);
    const flag = await this.isElementDisplayed(await this.moonpayWidget);
    return flag;
  }

  async isUsdcOptionDisplayed() {
    await this.waitForElementExisting(await this.usdcOption);
    const flag = await this.isElementDisplayed(await this.usdcOption);
    return flag;
  }

  async clickUsdcOption() {
    await this.waitForElementClickable(await this.usdcOption);
    await this.click(await this.usdcOption);
  }

  async isUsdcPopupFundDisplayed() {
    await this.waitForElementExisting(await this.fundUsdcPopupTitle);
    const flag = await this.isElementDisplayed(await this.fundUsdcPopupTitle);
    return flag;
  }

  async clickIAcknowledgeButton() {
    await this.waitForElementClickable(await this.iAcknowledgeButton);
    await this.click(await this.iAcknowledgeButton);
    console.log("Clicked I Acknowledge Button");
  }

  async isEthOptionDisplayed() {
    await this.waitForElementExisting(await this.ethOption);
    const flag = await this.isElementDisplayed(await this.ethOption);
    return flag;
  }

  async clickEthOption() {
    await this.waitForElementClickable(await this.ethOption);
    await this.click(await this.ethOption);
  }

  async isEthPopupFundDisplayed() {
    await this.waitForElementExisting(await this.fundEthPopupTitle);
    const flag = await this.isElementDisplayed(await this.fundEthPopupTitle);
    return flag;
  }

  async isBtcOptionDisplayed() {
    await this.waitForElementExisting(await this.btcOption);
    const flag = await this.isElementDisplayed(await this.btcOption);
    return flag;
  }

  async clickBtcOption() {
    await this.waitForElementClickable(await this.btcOption);
    await this.click(await this.btcOption);
  }

  async isBtcPopupFundDisplayed() {
    await this.waitForElementExisting(await this.fundBtcPopupTitle);
    const flag = await this.isElementDisplayed(await this.fundBtcPopupTitle);
    return flag;
  }

  async clickSendFundButton() {
    await this.waitForElementClickable(await this.sendFundsButton);
    await this.click(await this.sendFundsButton);
  }

  async isCancelInvestmentLinkDisplayed() {
    await this.waitForElementExisting(await this.cancelInvestmentLink);
    const flag = await this.isElementDisplayed(await this.cancelInvestmentLink);
    return flag;
  }

  async isFinalizeYourInvestmentHeaderDisplayed() {
    await this.waitForElementExisting(await this.finalizeYourInvestmentHeader);
    const flag = await this.isElementDisplayed(await this.finalizeYourInvestmentHeader);
    return flag;
  }

  async clickFirstCheckboxFundAccount() {
    await this.waitForElementClickable(await this.firstCheckboxFundAccount);
    await this.click(await this.firstCheckboxFundAccount);
  }

  async clickSecondCheckboxFundAccount() {
    await this.waitForElementClickable(await this.secondCheckboxFundAccount);
    await this.click(await this.secondCheckboxFundAccount);
  }

  async clickThirdCheckboxFundAccount() {
    await this.waitForElementClickable(await this.thirdCheckboxFundAccount);
    await this.click(await this.thirdCheckboxFundAccount);
  }

  async clickInitiatedTransferButton() {
    await this.waitForElementClickable(await this.initiatedTransferButton);
    await this.click(await this.initiatedTransferButton);
  }

  async clickSendMoreFundsButton() {
    await this.waitForElementClickable(await this.sendMoreFundsButton);
    await this.click(await this.sendMoreFundsButton);
  }

  async isYourFundsAreOnTheirWayTextDisplayed() {
    await this.waitForElementExisting(await this.yourFundsAreOnTheirWayText);
    const flag = await this.isElementDisplayed(await this.yourFundsAreOnTheirWayText);
    return flag;
  }

  async clickInvestNowButton() {
    await this.waitForElementClickable(await this.investNowButton);
    await this.click(await this.investNowButton);
    console.log("Clicked InvestNowButton");
  }

  async clickACHOrWireOption() {
    await this.waitForElementExisting(await this.ACHOrWireOption);
    await this.click(await this.ACHOrWireOption);
    console.log("Clicked ACH or Wire ");
  }

  async clickOkIinitiatedTheTransferButton() {
    await this.waitForElementExisting(await this.OkIinitiatedTheTransferButton);
    await this.click(await this.OkIinitiatedTheTransferButton);
    console.log("Clicked Ok I initiated The Transfer Button");
  }

  async clickPreviewPurchaseButton() {
    await this.waitForElementClickable(await this.previewPurchaseButton);
    await this.click(await this.previewPurchaseButton);
    console.log("Clicked PreviewPurchaseButton");
  }

  async clickYesCancelButton() {
    await this.waitForElementClickable(await this.yesCancelButton);
    await this.click(await this.yesCancelButton);
    console.log("Clicked Yes Cancel Button");
  }

  async clickCrossOnFinalizeYourInvestmentModal() {
    await this.waitForElementClickable(await this.crossOnFinalizeYourInvestmentModal);
    await this.click(await this.crossOnFinalizeYourInvestmentModal);
    console.log("Clicked Cross On Finalize Your Investment Modal");
  }

  async clickNoContinueButton() {
    await this.waitForElementClickable(await this.noContinueButton);
    await this.click(await this.noContinueButton);
    console.log("Clicked No Continue Button");
  }

  async clickInvestAllAvailableOption() {
    await this.waitForElementClickable(await this.investAllAvailableOption);
    await this.click(await this.investAllAvailableOption);
    console.log("Clicked InvestAllAvailableOption");
  }

  async clickIAccpectButton() {
    await this.waitForElementClickable(await this.iAccpectButton);
    await this.click(await this.iAccpectButton);
    console.log("Clicked IAccpectButton");
  }

  async clickSendFundsButton() {
    await this.waitForElementExisting(await this.sendFundsButton);
    await this.click(await this.sendFundsButton);
    console.log("Clicked SendFundsButton");
  }

  async clickCancelInvestment() {
    await this.waitForElementExisting(await this.cancelInvestment);
    await this.click(await this.cancelInvestment);
  }

  async clickCrossOnSendFundDialog() {
    await this.waitForElementExisting(await this.crossOnSendFundsDialog);
    await this.click(await this.crossOnSendFundsDialog);
    console.log("Clicked Cross on Send Funds Modal");
  }

  async clickBackOnInvestCard() {
    await this.waitForElementExisting(await this.backOnInvestCard);
    await this.click(await this.backOnInvestCard);
    console.log("Clicked Back On Invest Card ");
  }

  async inputAmount(amount) {
    await this.waitForElementExisting(await this.amountInput);
    await this.type(await this.amountInput, amount);
    console.log("Typed AmountInput");
  }

  async inputUSDC(USDC) {
    await this.waitForElementExisting(await this.amountUSDC);
    await this.type(await this.amountUSDC, USDC);
    console.log("Typed USDC");
  }

  async inputEthAddress(address) {
    await this.waitForElementExisting(await this.ethAddressInput);
    await this.type(await this.ethAddressInput, address);
    console.log("typed EthAddress");
  }

  async plus1DollarOnInputAmount() {
    const amount = await this.getText(await this.amountInput);
    let beforeTheDecimal = amount.split(".")[0];
    beforeTheDecimal = Number(beforeTheDecimal.substring(1)) + 1;
    await this.type(await this.amountInput, beforeTheDecimal + amount.split(".")[1]);
  }

  async isPreviewPurchaseButtonEnabled() {
    await this.waitForElementEnabled(await this.previewPurchaseButton);
    const flag = await this.isElementEnabled(await this.previewPurchaseButton);
    return flag;
  }

  async isPreviewPurchaseButtonDisabled() {
    await this.sleep(5);
    await this.waitForElementExisting(await this.previewPurchaseButton);
    const cl = await this.getAttribute(await this.previewPurchaseButton, "class");
    const flag = cl.includes("disabled");
    return flag;
  }

  async isAmountInRed() {
    await this.sleep(2);
    await this.waitForElementExisting(await this.amountInput);
    const cl = await this.getAttribute(await this.amountInput, "class");
    return cl.includes("error");
  }

  async getPriceErrorText() {
    await this.waitForElementExisting(await this.priceErrorText);
    const text = await this.getText(await this.priceErrorText);
    console.log(`GetPriceErrorText called`);
    return text;
  }

  async getAmountText() {
    await this.waitForElementExisting(await this.amountInput);
    const text = await this.getText(await this.amountInput);
    console.log(`GetAmountText called`);
    return text;
  }

  async getMyPortfolioFairQuantitiesText() {
    await this.waitForElementExisting(await this.myPortfolioFairQuantities);
    const text = await this.getText(await this.myPortfolioFairQuantities);
    console.log(`getMyPortfolioFairQuantitiesText called`);
    return text;
  }

  async getMyPortfolioFairConvertToUsdText() {
    await this.waitForElementExisting(await this.myPortfolioFairConvertToUsd);
    const text = await this.getText(await this.myPortfolioFairConvertToUsd);
    console.log(`getMyPortfolioFairConvertToUsdText called`);
    return text;
  }

  async clickPayLabel() {
    await this.waitForElementClickable(await this.payWithLabelInInvest);
    await (await this.payWithLabelInInvest).click({ x: -10 });
    console.log("Clicked PayWithLabel");
  }

  async isAmountInputBeginWithZeroNumber() {
    await this.waitForElementExisting(await this.amountInput);
    const text = await this.getText(await this.amountInput);
    console.log(`TEXT : ${text}`);
    return text[1] === "0";
  }

  async isProceedToCAFEAgrementPopUpShown() {
    await this.waitForElementExisting(await this.proceedToCAFEAgrementButton);
    const status = await this.isElementDisplayed(await this.proceedToCAFEAgrementButton);
    return status;
  }

  async isFundDialogWithACHShown() {
    await this.waitForElementExisting(await this.fundDialogWithACH);
    const visible = await this.isElementDisplayed(await this.fundDialogWithACH);
    return visible;
  }

  async isFundDialogShown() {
    await this.waitForElementExisting(await this.fundDialog);
    const visible = await this.isElementDisplayed(await this.fundDialog);
    return visible;
  }

  async isFinalizeYourInvestmentModalShown() {
    await this.waitForElementExisting(await this.finalizeYourInvestmentModal);
    const visible = await this.isElementDisplayed(await this.finalizeYourInvestmentModal);
    return visible;
  }

  async isWithdrawModalShown() {
    await this.waitForElementExisting(await this.WithdrawUSDCModal);
    const visible = await this.isElementDisplayed(await this.WithdrawUSDCModal);
    return visible;
  }

  async inputSignName(signName) {
    await this.waitForElementExisting(await this.signNameElectronicalInput);
    await this.type(await this.signNameElectronicalInput, signName);
    console.log("Typed SignNameElectronical");
  }

  async clickSignTheCAFEAgreementButton() {
    await this.waitForElementEnabled(await this.signTheCAFEAgreementButton);
    await this.click(await this.signTheCAFEAgreementButton);
    console.log("Clicked Sign The CAFE Agreement Button");
  }

  async clickProceedToCAFEAgrementButton() {
    await this.waitForElementEnabled(await this.proceedToCAFEAgrementButton);
    await this.click(await this.proceedToCAFEAgrementButton);
  }

  async clickCrossOnSendFundModal() {
    await this.waitForElementExisting(await this.crossOnSendFundsModal);
    await this.click(await this.crossOnSendFundsModal);
    console.log("Clicked Cross on Send Funds Modal");
    console.log("Clicked Proceed To CAFE Agrement Button");
  }

  async clickBackToDashBoardButton() {
    await this.waitForElementEnabled(await this.backToDashBoardButton);
    await this.click(await this.backToDashBoardButton);
    console.log("Clicked Back To Dash Board Button");
  }

  async isThankYouModalShown() {
    await this.waitForElementExisting(await this.thankYouModal);
    const status = await this.isElementDisplayed(await this.thankYouModal);

    console.log("isThankYouModalShown called");
    return status;
  }

  async isPurchaseSuccessfulShown() {
    await this.waitForElementExisting(await this.purchaseSuccessfulNotification);
    const status = await this.isElementDisplayed(await this.purchaseSuccessfulNotification);

    console.log("isPurchaseSuccessfulShown called");
    return status;
  }

  async getTextOnPurchaseSuccessfulNotification() {
    await this.waitForElementExisting(await this.purchaseSuccessfulNotification);
    const text = await this.getText(await this.purchaseSuccessfulNotification);
    return text;
  }

  async getPriceOnThankYouModal() {
    await this.waitForElementExisting(await this.priceInThankYouModal);
    const price = await this.getText(await this.priceInThankYouModal);
    return price;
  }

  async checkInvested() {
    expect(await this.isElementDisplayed(await this.investedStatusInFirstRowOfMyTransactionHistory)).toBeTruthy();
  }

  async checkPortfolioUpdated(tokenName, exchangeUsd) {
    expect(await this.getMyPortfolioFairQuantitiesText()).not.toEqual(tokenName);
    expect(await this.getMyPortfolioFairConvertToUsdText()).not.toEqual(exchangeUsd);
  }

  async isSendFundsModalShown() {
    await this.waitForElementExisting(await this.notEnoughFundModal);
    const flag = await this.isElementExisting(await this.notEnoughFundModal);
    return flag;
  }

  async getTextDetailOnSendFundsModal() {
    await this.waitForElementExisting(await this.notEnoughFundTextDetail);
    const textDetail = await this.getText(await this.notEnoughFundTextDetail);
    return textDetail;
  }

  async getTextTitleOnSendFundsModal() {
    await this.waitForElementExisting(await this.notEnoughFundTextTitle);
    const title =  await this.getText(await this.notEnoughFundTextTitle);
    return title;
  }

  async clickCrossOnInvestModal() {
    await this.waitForElementExisting(await this.crossOnInvestNowModal);
    await this.click(await this.crossOnInvestNowModal);
    console.log("clicked Cross on Invest Now Modal");
  }

  async isFinalizeMyInvestmentBannerShown() {
    await this.waitForElementExisting(await this.finalizeMyInvestmentButtonInFinalizeMyInvestmentBanner);
    const flag = await this.isElementExisting(await this.finalizeMyInvestmentButtonInFinalizeMyInvestmentBanner);
    return flag;
  }

  async isFinalizeYourInvestmentCardShown() {
    await this.waitForElementExisting(await this.finalizeYourInvestmentCard);
    const flag = await this.isElementExisting(await this.finalizeYourInvestmentCard);
    return flag;
  }

  async clickCrossOnFinalizeYourInvestmentCard() {
    await this.waitForElementExisting(await this.crossOnFinalizeYourInvestmentCard);
    await this.click(await this.crossOnFinalizeYourInvestmentCard);
    console.log("clicked Cross On FinalizeYourInvestment Card");
  }

  async clickFinalizeInvestmentButtonOnFinalizeYourInvestmentCard() {
    await this.waitForElementEnabled(await this.finalizeInvestmentButtonOnFinalizeYourInvestmentCard);
    await this.click(await this.finalizeInvestmentButtonOnFinalizeYourInvestmentCard);
    console.log("clicked Finalize Investment Button On Finalize Your Investment Card");
  }

  async clickFinalizeMyInvestmentButtonInFinalizeMyInvestmentBanner() {
    await this.waitForElementExisting(await this.finalizeMyInvestmentButtonInFinalizeMyInvestmentBanner);
    await this.click(await this.finalizeMyInvestmentButtonInFinalizeMyInvestmentBanner);
    console.log("clicked Finalize My Investment Button On Finalize Finalize My Investment Banner");
  }

  async isPendingInvestmentModalShown() {
    await this.waitForElementExisting(await this.pendingInvestmentModal);
    const flag = await this.isElementExisting(await this.pendingInvestmentModal);
    return flag;
  }

  async clickOkButtonOnPendingInvestmentModal() {
    await this.waitForElementExisting(await this.okButtonOnPendingInvestmentModal);
    await this.click(await this.okButtonOnPendingInvestmentModal);
    console.log(`clicked Ok Button on Pending Investment modal`);
  }

  async isInvestNowCardShown() {
    await this.waitForElementExisting(await this.investNowCard);
    const flag = await this.isElementExisting(await this.investNowCard);
    return flag;
  }

  async isLoadingOverLayShown() {
    await this.waitForElementExisting(await this.loadingOverlay);
    const flag = await this.isElementExisting(await this.loadingOverlay);
    return flag;
  }

  async getHeaderOfThankYouModal() {
    await this.waitForElementExisting(await this.headerOfThankYouModal);
    const header = await this.getText(await this.headerOfThankYouModal);
    console.log("get text Header Of Thank You Modal");
    return header;
  }

  async getDescOfThankYouModal() {
    await this.waitForElementExisting(await this.descOfThankYouModal);
    const desc = await this.getText(await this.descOfThankYouModal);
    console.log("get text Desc Of Thank You Modal");
    return desc;
  }

  async getContentOfPurchaseSuccessfulNotification() {
    await this.waitForElementExisting(await this.contentOfPurchaseSuccessfulNotification);
    const content = await this.getText(await this.contentOfPurchaseSuccessfulNotification);
    console.log("get content text on Purchase Successful Notification");
    return content;
  }

  async getHeaderOfPurchaseSuccessfulNotification() {
    await this.waitForElementExisting(await this.headerOfPurchaseSuccessfulNotification);
    const header = await this.getText(await this.headerOfPurchaseSuccessfulNotification);
    console.log("get header text on Purchase Successful Notification");
    return header;
  }
}
