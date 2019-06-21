const constants = require('./constants');
const Initializer = require('../page-objects/initializer.po');
const Bixlabs = require('../page-objects/bixlabs.po');


class PageFactory {
  static getInitializer(browser) {
    return new Initializer(browser, constants);
  }

  static getBixlabs(browser) {
    return new Bixlabs(browser);
  }
}

module.exports = PageFactory;
