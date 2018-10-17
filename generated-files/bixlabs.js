const PageFactory = require('../util/page-factory');

module.exports = {
  bixlabs: (browser) => {
    PageFactory.getInitializer(browser).initialize();
    PageFactory.getBixlabs(browser).checkWebsite();
    browser.end();
  }
}
;
