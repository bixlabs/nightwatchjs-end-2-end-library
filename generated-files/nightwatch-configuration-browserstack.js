var browserstack = require('browserstack-local');

nightwatch_config = {
  src_folders: ["tests/end2end/test-cases"],

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
      desiredCapabilities: {
        'build': 'nightwatch-browserstack',
        'browserstack.user': process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
        'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
        'browserstack.debug': true,
        'browserstack.local': true,
        'browser': 'ie',
        'version': 11
      }
    }
  }
};

// Code to copy seleniumhost/port into test settings
for (var i in nightwatch_config.test_settings) {
  var config = nightwatch_config.test_settings[i];
  config['selenium_host'] = nightwatch_config.selenium.host;
  config['selenium_port'] = nightwatch_config.selenium.port;
}

module.exports = nightwatch_config;
