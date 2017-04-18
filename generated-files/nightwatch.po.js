const constants = require('../util/constants');

class Nightwatch {
  constructor(browser) {
    this.browser = browser;
    this.NIGHTWATCH_SCREENSHOT_PATH = '/nightwatch';
  }

  checkHomepageTitle() {
    return this.configureURL()
      .waitForBody()
      .checkTitle();
  }

  configureURL() {
    this.browser.url(constants.NIGHTWATCH_JS_URL);
    return this;
  }

  waitForBody() {
    this.browser.waitForElementVisible('body');
    return this;
  }

  checkTitle() {
    return this.browser.waitForElementPresent('head title')
      .assert.title('Nightwatch.js | Node.js powered End-to-End testing framework')
      .saveScreenshot(`${constants.SCREENSHOT_PATH}${this.NIGHTWATCH_SCREENSHOT_PATH}/nightwatach-page.png`);
  }
}

module.exports = Nightwatch;
