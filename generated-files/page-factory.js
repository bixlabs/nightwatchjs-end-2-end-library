const constants = require('./constants');
const GoogleSearch = require('../page-objects/google-search.po');
const GoogleResult = require('../page-objects/google-result.po');
const Bixlabs = require('../page-objects/bixlabs.po');


class PageFactory {
  static getGoogleSearch(browser) {
    return new GoogleSearch(browser, constants);
  }

  static getGoogleResult(browser) {
    return new GoogleResult(browser, PageFactory.getGoogleSearch(browser));
  }

  static getBixlabs(browser) {
    return new Bixlabs(browser, PageFactory.getGoogleResult(browser));
  }
}

module.exports = PageFactory;
