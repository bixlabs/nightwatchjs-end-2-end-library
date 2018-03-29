class GoogleResult {
  constructor(browser, googleSearch) {
    this.browser = browser;
    this.googleSearch = googleSearch;
  }

  goToBixlabs() {
    this.googleSearch.searchBixlabs();
    return this.waitForSearchToBeComplete()
      .clickBixlabsURL();
  }

  waitForSearchToBeComplete() {
    this.browser.waitForElementPresent('a[href="https://www.bixlabs.com/"]');
    return this;
  }

  clickBixlabsURL() {
    return this.browser.click('a[href="https://www.bixlabs.com/"]');
  }
}

module.exports = GoogleResult;
