const PageFactory = require('../util/page-factory');

module.exports = {
  bixlabs: (browser) => {
    PageFactory.getBixlabs(browser).checkWebsite();
    browser.end();
  }
}
;
