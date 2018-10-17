const constants = require('./constants');
const Initializer = require('../page-objects/initializer.po');
const GoogleSearch = require('../page-objects/google-search.po');
const GoogleResult = require('../page-objects/google-result.po');
const Bixlabs = require('../page-objects/bixlabs.po');


class PageFactory {
  static getInitializer(browser) {
    return new Initializer(browser, constants);
  }
  static getGoogleSearch(browser) {
    return new GoogleSearch(browser, constants);
  }

  static getGoogleResult(browser) {
    return new GoogleResult(browser, constants, PageFactory.getGoogleSearch(browser));
  }

  static getBixlabs(browser) {
    return new Bixlabs(browser, constants, PageFactory.getGoogleResult(browser));
  }
}

module.exports = PageFactory;
