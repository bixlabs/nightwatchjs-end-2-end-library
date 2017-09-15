const browserstack = require('browserstack-local');

const desiredCapabilitiesIe11 = {
  'build': 'ThetaLake',
  'browserstack.user': process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
  'browserstack.debug': true,
  'browserstack.local': true,
  'browser': 'ie',
  'version': 11
};

const desiredCapabilitiesIe10 = Object.assign({}, desiredCapabilitiesIe11);
desiredCapabilitiesIe10.version = 10;

const desiredCapabilitiesSafari = Object.assign({}, desiredCapabilitiesIe11);
desiredCapabilitiesSafari.browser = 'safari';
desiredCapabilitiesSafari.version = '';

const desiredCapabilitiesChrome = Object.assign({}, desiredCapabilitiesIe11);
desiredCapabilitiesChrome.browser = 'chrome';
desiredCapabilitiesChrome.version = '';

const desiredCapabilitiesFirefox = Object.assign({}, desiredCapabilitiesIe11);
desiredCapabilitiesFirefox.firefox = 'firefox';
desiredCapabilitiesFirefox.version = '';

const nightwatch_config = {
  src_folders: ["tests/end2end/test-cases"],
  output_folder: './test_reports',

  selenium: {
    "start_process": false,
    "host": "hub-cloud.browserstack.com",
    "port": 80
  },

  test_settings: {
    default: {
      "screenshots": {
        "enabled": true, // if you want to keep screenshots
        "path": './test_screenshots' //there is an overwrite for this in the test suite
      },
      "globals": {
        "waitForConditionTimeout": 30000 // sometimes internet is slow so wait.
      },
      desiredCapabilities: desiredCapabilitiesIe11
    },
    ie10: {
      desiredCapabilities: desiredCapabilitiesIe10
    },
    safari: {
      desiredCapabilities: desiredCapabilitiesSafari
    },
    firefox: {
      desiredCapabilities: desiredCapabilitiesFirefox,
    },
    chrome: {
      desiredCapabilities: desiredCapabilitiesChrome,
    }
  }
};



// Code to copy seleniumhost/port into test settings
for (let i in nightwatch_config.test_settings) {
  const config = nightwatch_config.test_settings[i];
  config['selenium_host'] = nightwatch_config.selenium.host;
  config['selenium_port'] = nightwatch_config.selenium.port;
}

module.exports = nightwatch_config;
