import { LoginPage } from "../pages/loginPage";
import { HomePage } from "../pages/homePage";

const loginPage = new LoginPage();
const homePage = new HomePage();

const registeredEmail = "toantest@mailinator.com";
const upperLowerCaseEmail = "tOAnTest@maiLInator.COm";
const unregisteredEmail = "toantest02@mailinator.com";
const invalidEmail = "toantest@mailinator";

describe("TSC01: Verify that sign in functionality works", () => {
  beforeEach(async () => {
    await browser.reloadSession();
  });

  it("TC001-01: Signs in with a valid email address that is already registered", async () => {
    /*
     * @registeredEmail has been manually registered in dev env
    */
    await loginPage.loginActionWithDifferentTabs(registeredEmail);
  });

  it("TC001-02: Signs in with an invalid email address", async () => {
    await loginPage.openLoginPage();
    await loginPage.inputEmail(invalidEmail);
    expect(await loginPage.isSignInButtonDisabled()).toBeTruthy();
    expect(await loginPage.getTheErrorMessage()).toEqual("Invalid email address");
  });

  it("TC001-03: Signs in with a valid email address that is not registered yet", async () => {
    await loginPage.openLoginPage();
    await loginPage.inputEmail(unregisteredEmail);
    await loginPage.clickSignInButton();
    await loginPage.waitForGlobalLoading();
    expect(await loginPage.isSignUpTabActive()).toBeTruthy();
    expect(await loginPage.getInputEmailValue()).toEqual(unregisteredEmail);
  });

  it("TC001-04: Signs in with email address all in upper case", async () => {
    await loginPage.loginAction(registeredEmail.toUpperCase());
  });

  it("TC001-05: Signs in with email address both in upper case and lower case", async () => {
    await loginPage.loginAction(upperLowerCaseEmail);
  });
});

describe("TSC02: Verify that sign in URL works", () => {
  beforeEach(async () => {
    await browser.reloadSession();
  });

  it("TSC02-01: Check that sign in page loads", async () => {
    await loginPage.openLoginPage();
    await loginPage.loaded();
  });
});

describe("TSC03: Verify that switching tabs works", () => {
  beforeEach(async () => {
    await browser.reloadSession();
  });

  it('TC003-01: User switched tab from "Sign up" to "Sign in"', async () => {
    await loginPage.openLoginPage();
    await loginPage.clickSignUpTab();
    expect(await loginPage.isSignUpTabActive()).toBeTruthy();
    await loginPage.clickSignInTab();
    expect(await loginPage.isSignInTabActive()).toBeTruthy();
  });
});

describe("TSC04: Verify that sign out functionality works", () => {
  beforeEach(async () => {
    await browser.reloadSession();
  });

  it("TC004-01: User signs out", async () => {
    await loginPage.loginAction(registeredEmail);
    await homePage.activeDropdown();
    await homePage.clickLogout();
    await loginPage.waitForLoginPage();
    expect(await browser.getUrl()).toContain("/signin");
  });
});
