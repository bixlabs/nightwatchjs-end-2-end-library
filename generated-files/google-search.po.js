class GoogleSearch {
  constructor(browser, constants) {
    this.browser = browser;
    this.browser.useCss();
    this.constans = constants;
  }

  searchBixlabs() {
    return this.configureURL()
      .fillGoogleInput()
      .search();
  }

  fillGoogleInput() {
    this.browser.waitForElementPresent('#lst-ib')
      .setValue('#lst-ib', 'Bixlabs');
    return this;
  }

  search() {
    this.browser.click('input[name="btnK"]');
    return this.browser;
  }
}

module.exports = GoogleSearch;
