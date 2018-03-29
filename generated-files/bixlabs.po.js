class Bixlabs {
  constructor(browser, googleResult) {
    this.browser = browser;
    this.googleResult = googleResult;
  }

  checkWebsite() {
    this.googleResult.goToBixlabs();
    return this.hasBixlabsLogo()
      .hasContactButton()
      .hasClutchReview()
      .hasChatBubble();
  }

  hasBixlabsLogo() {
    this.browser.waitForElementPresent('img[src="http://www.bixlabs.com/wp-content/uploads/2017/05/Bixlabs_Logo.png"]');
    return this;
  }

  hasContactButton() {
    this.browser.waitForElementPresent('a[href="https://www.bixlabs.com/contact/"]');
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
