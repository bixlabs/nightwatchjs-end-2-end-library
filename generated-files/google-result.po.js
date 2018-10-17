class GoogleResult {
  constructor(browser, constants, googleSearch) {
    this.browser = browser;
    this.constants = constants;
    this.googleSearch = googleSearch;

    this.BIXLABS_SEARCH_RESULT_SELECTOR = `a[href="${this.constants.BIXLABS_URL}"]`;
  }

  goToBixlabs() {
    this.googleSearch.searchBixlabs();
    return this.waitForSearchToBeComplete()
      .clickBixlabsURL();
  }

  waitForSearchToBeComplete() {
    this.browser.waitForElementPresent(this.BIXLABS_SEARCH_RESULT_SELECTOR);
    return this;
  }

  clickBixlabsURL() {
    return this.browser.click(this.BIXLABS_SEARCH_RESULT_SELECTOR);
  }
}

module.exports = GoogleResult;
