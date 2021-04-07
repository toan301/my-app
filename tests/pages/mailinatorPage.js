import BaseAction from "../common/baseAction";

export class MailinatorPage extends BaseAction {
  async getMagicLinkFromEmail(email) {
    /*
      sleep to wait email cominng, will try better solution in other branch
    */
    await this.sleep(5);
    const username = email.split("@")[0];
    await browser.url(`https://www.mailinator.com/v4/public/inboxes.jsp?to=${username}`);
    await this.waitForElementExisting(await browser.$('//tr[@ng-repeat="email in emails"][1]//td[3]'));
    await this.click(await browser.$('//tr[@ng-repeat="email in emails"][1]//td[3]'));
    await this.sleep(2);
    await browser.switchToFrame(1);
    await this.waitForElementExisting(await browser.$("a.login-button"));
    const attr = await this.getAttribute(await browser.$("a.login-button"), "href");
    return attr;
  }

  async getWithdrawalCodeConfirmation(email) {
    /*
      sleep to wait email cominng, will try better solution in other branch
    */
    await this.sleep(5);
    const username = email.split("@")[0];
    await this.openNewWindow();
    await browser.url(`https://www.mailinator.com/v4/public/inboxes.jsp?to=${username}`);
    await this.waitForElementExisting(await browser.$('//tr[@ng-repeat="email in emails"][1]//td[3]'));
    await this.click(await browser.$('//tr[@ng-repeat="email in emails"][1]//td[3]'));
    await this.sleep(2);
    await browser.switchToFrame(1);
    await this.waitForElementExisting(await browser.$("div strong span"));
    const confirmCode = await this.getText(await browser.$("div strong span"));
    await this.switchToPreviousTab();
    return confirmCode;
  }

  async getInvalidWithdrawalCodeConfirmation(email) {
    const code = await this.getWithdrawalCodeConfirmation(email) - 1;
    return code;
  }
}
