import { Constants } from "./constants";

export default class BaseAction {
  timeout = Constants.timeout;

  async type(element, value) {
    await this.sleep(0.5);
    await element.setValue(value);
  }

  async click(element) {
    await this.sleep(0.5);
    await element.click();
  }

  async getAttribute(element, attr) {
    await this.sleep(0.5);
    const attribute =  await element.getAttribute(attr);
    return attribute;
  }

  async getText(element) {
    await this.sleep(0.5);
    const text = await element.getText();
    return text;
  }

  async waitForElementExisting(element) {
    await this.sleep(0.5);
    await element.waitForExist({ timeout: this.timeout.xl });
  }

  async waitForElementClickable(element) {
    await this.sleep(0.5);
    await element.waitForClickable({ timeout: this.timeout.xl });
  }

  async waitForElementEnabled(element) {
    await this.sleep(0.5);
    await element.waitForEnabled({ timeout: this.timeout.xl });
  }

  async waitForElementDisabled(element) {
    await this.sleep(0.5);
    await element.waitForEnabled({ timeout: this.timeout.xl, reverse: true });
  }

  async waitForElementNotExisting(element) {
    await this.sleep(0.5);
    await element.waitForExist({ timeout: this.timeout.xl, reverse: true });
  }

  async waitForTheConditionDisplayed(element, condition, customTimeout = null) {
    const timeout = customTimeout || this.timeout.xl;
    await browser.waitUntil(() => element.getText() === condition, timeout, `Expect ${condition} is not displayed after ${timeout}`, 1000);
  }

  async isElementDisplayed(element) {
    try {
      await this.sleep(1);
      return await element.isDisplayed();
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async isElementEnabled(element) {
    try {
      await this.sleep(1);
      return await element.isEnabled();
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async isElementExisting(element) {
    try {
      await this.sleep(1);
      return await element.isExisting();
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async waitForGlobalLoading() {
    const loadingCursor = await browser.$("div.loading-overlay-div");
    await this.sleep(1);
    await this.waitForElementNotExisting(loadingCursor);
    await this.sleep(2);
    // await this.waitForElementNotExisting('div.loader.tiny');
  }

  async waitForIntroLoading() {
    const loadingCursor = await browser.$(".loading-spinner-overlay-div");
    await this.sleep(1);
    await this.waitForElementNotExisting(loadingCursor);
  }

  async waitPageLoaded() {
    await browser.waitUntil(() => {
      const state = browser.execute(() => document.readyState);
      console.log("state:" + state);
      return state === "complete";
    },
    {
      timeout    : 60000, // 60secs
      timeoutMsg : "Oops! Check your internet connection"
    });
  }

  async sleep(s) {
    await browser.pause(s * 1000);
  }

  async openNewWindow() {
    await browser.createWindow("tab");
    const windowHandles = await browser.getWindowHandles();
    await browser.switchToWindow(windowHandles[windowHandles.length - 1]);
  }

  async createNewWindow() {
    await browser.createWindow("tab");
  }

  async switchToPreviousTab() {
    const currentHandle = await browser.getWindowHandle();
    const windowHandles = await browser.getWindowHandles();
    const callback = async () => {
      let indexOfCurrentHandle = windowHandles.indexOf(currentHandle);
      --indexOfCurrentHandle;

      if (indexOfCurrentHandle < 0) return;

      return indexOfCurrentHandle;
    };

    const index = await callback();
    await browser.switchToWindow(windowHandles[index]);
  }

  async switchToNextTab() {
    const currentHandle = await browser.getWindowHandle();
    const windowHandles = await browser.getWindowHandles();
    const callback = async () => {
      let indexOfCurrentHandle = windowHandles.indexOf(currentHandle);
      indexOfCurrentHandle++;

      if (indexOfCurrentHandle === windowHandles.length) return;

      return indexOfCurrentHandle;
    };

    const index = await callback();
    await browser.switchToWindow(windowHandles[index]);
  }
}
