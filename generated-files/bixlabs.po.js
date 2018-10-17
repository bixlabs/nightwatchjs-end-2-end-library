class Bixlabs {
  constructor(browser, constants, googleResult) {
    this.browser = browser;
    this.constants = constants;
    this.googleResult = googleResult;

    this.BIXLABS_LOGO_SELECTOR = `img[src="${this.constants.BIXLABS_URL}wp-content/uploads/2017/05/Bixlabs_Logo.png"]`;
    this.BIXLABS_CONTACT_BUTTON_SELECTOR = `a[href="${this.constants.BIXLABS_URL}contact/"]`
  }

  checkWebsite() {
    this.googleResult.goToBixlabs();
    return this.hasBixlabsLogo()
      .hasContactButton()
      .hasClutchReview()
      .hasChatBubble();
  }

  hasBixlabsLogo() {
    this.browser.waitForElementPresent(this.BIXLABS_LOGO_SELECTOR);
    return this;
  }

  hasContactButton() {
    this.browser.waitForElementPresent(this.BIXLABS_CONTACT_BUTTON_SELECTOR);
    return this;
  }

  hasClutchReview() {
    this.browser.waitForElementPresent('.clutch-widget[data-url="https://clutch.co"]');
    return this;
  }

  hasChatBubble() {
    return this.browser.waitForElementPresent('iframe#drift-widget');

  }
}

module.exports = Bixlabs;
