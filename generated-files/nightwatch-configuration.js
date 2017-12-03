var REPORT_PATH = './test_reports';

// we use a nightwatch.conf.js file so we can include comments and helper functions
module.exports = {
  "src_folders": [
    "tests/end2end/test-cases"// Where you are storing your Nightwatch e2e tests
  ],
  "output_folder": REPORT_PATH, // reports (test outcome) output by nightwatch
  "selenium": { // downloaded by selenium-download module (see readme)
    "start_process": true, // tells nightwatch to start/stop the selenium process
    "server_path": "./node_modules/nightwatch/bin/selenium.jar",
    "host": "127.0.0.1",
    "port": 4444, // standard selenium port
    "cli_args": { // chromedriver is downloaded by selenium-download (see readme)
      "webdriver.chrome.driver" : "./node_modules/nightwatch/bin/chromedriver",
      "webdriver.gecko.driver" : "./node_modules/geckodriver/geckodriver"
    }
  },
  "test_settings": {
    "default": {
      "screenshots": {
        "enabled": true, // if you want to keep screenshots
        "path": './test_screenshots' //there is an overwrite for this in the test suite
      },
      "globals": {
        "waitForConditionTimeout": 10000 // sometimes internet is slow so wait.
      },
      "desiredCapabilities": { // use Chrome as the default browser for tests
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    },

    "firefox": {
      "desiredCapabilities": {
        "browserName": "firefox",
        "javascriptEnabled": true, // turn off to test progressive enhancement
        "acceptSslCerts": true,
      }
    },
  }
};
