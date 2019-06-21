class Bixlabs {
  constructor(browser) {
    this.browser = browser;
    this.BIXLABS_NAME_IN_TAB_TITLE = `meta[name="title"]`;
  }

  checkWebsite() {
    return this.hasBixlabsInTabTitle()
  }

  hasBixlabsInTabTitle() {
    this.browser.waitForElementPresent(this.BIXLABS_NAME_IN_TAB_TITLE);
    return this;
  }
}

module.exports = Bixlabs;
