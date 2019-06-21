class Initializer {
    constructor(browser, constants) {
      this.browser = browser;
      this.constants = constants;
      this.BODY_SELECTOR = 'body';
    }
  
    initialize() {
      this.browser.maximizeWindow();
      this.configureURL();
      this.waitForBody();
      return this.browser;
    }
  
    configureURL() {
      this.browser.url(this.constants.BIXLABS_URL);
    }
  
    waitForBody() {
      this.browser.waitForElementPresent(this.BODY_SELECTOR);
    }
  }
  
  module.exports = Initializer;
