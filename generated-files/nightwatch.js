const Nightwatch = require('../page-objects/nightwatch.po');

module.exports = {
    nightwatch: (browser) => {
    new Nightwatch(browser).checkHomepageTitle().end();
}
};
