const desiredCapabilitiesDefault = {
  'build': 'NightwatchJS-end2end',
  'browserstack.user': process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
  'browserstack.debug': true,
  'browserstack.local': true,
  'os': '',
  'os_version': '',
  'browser': '',
  'browser_version': '',
  'nativeEvents': true,
  'ignoreZoomSetting': false,
  'ignoreProtectedModeSettings': true,
  'elementScrollBehavior': 1
};

const desiredCapabilitiesIeEdge = Object.assign({}, desiredCapabilitiesDefault);
desiredCapabilitiesIeEdge.os = 'Windows';
desiredCapabilitiesIeEdge.os_version = '10';
desiredCapabilitiesIeEdge.browser = 'Edge';
desiredCapabilitiesIeEdge.nativeEvents = true;
desiredCapabilitiesIeEdge.ignoreZoomSetting = true;
desiredCapabilitiesIeEdge.elementScrollBehavior = 1;

const desiredCapabilitiesIe11 = Object.assign({}, desiredCapabilitiesDefault);
desiredCapabilitiesIe11.os = 'Windows';
desiredCapabilitiesIe11.browser = 'ie';
desiredCapabilitiesIe11.browser_version = '11';
desiredCapabilitiesIe11.nativeEvents = true;
desiredCapabilitiesIe11.ignoreZoomSetting = true;
desiredCapabilitiesIe11.elementScrollBehavior = 1;
desiredCapabilitiesIe11.requireWindowFocus = true;

const desiredCapabilitiesIe10 = Object.assign({}, desiredCapabilitiesDefault);
desiredCapabilitiesIe10.os = 'Windows';
desiredCapabilitiesIe10.browser = 'ie';
desiredCapabilitiesIe10.browser_version = '10';
desiredCapabilitiesIe10.nativeEvents = true;
desiredCapabilitiesIe10.ignoreZoomSetting = true;
desiredCapabilitiesIe10.elementScrollBehavior = 0;
desiredCapabilitiesIe10.requireWindowFocus = true;

const desiredCapabilitiesSafari = Object.assign({}, desiredCapabilitiesDefault);
desiredCapabilitiesSafari.os = 'OS X';
desiredCapabilitiesSafari.os_version = 'High Sierra';
desiredCapabilitiesSafari.browser = 'safari';
desiredCapabilitiesSafari.browser_version = '11';
desiredCapabilitiesSafari.nativeEvents = false;
desiredCapabilitiesSafari.elementScrollBehavior = 0;

const desiredCapabilitiesChrome = Object.assign({}, desiredCapabilitiesDefault);
desiredCapabilitiesChrome.os = 'Windows';
desiredCapabilitiesChrome.browser = 'chrome';
desiredCapabilitiesChrome.nativeEvents = false;
desiredCapabilitiesChrome.elementScrollBehavior = 0;
// Why we need this: https://github.com/nightwatchjs/nightwatch/issues/2118
desiredCapabilitiesChrome.chromeOptions = {w3c: false};

const desiredCapabilitiesFirefox = Object.assign({}, desiredCapabilitiesDefault);
desiredCapabilitiesFirefox.os = 'Windows';
desiredCapabilitiesFirefox.browser = 'firefox';
desiredCapabilitiesFirefox.version = '58';
desiredCapabilitiesFirefox.nativeEvents = true;
desiredCapabilitiesFirefox.elementScrollBehavior = 0;

// we use a nightwatch.conf.js file so we can include comments and helper functions
const nightwatchConfig = {
  src_folders: ['tests/end2end/test-cases'],
  output_folder: './test_reports',

  selenium: {
    'start_process': false,
    'host': 'hub-cloud.browserstack.com',
    'port': 80
  },

  test_settings: {
    default: {
      'screenshots': {
        'enabled': true, // if you want to keep screenshots
        'path': './test_screenshots' // there is an overwrite for this in the test suite
      },
      'globals': {
        'waitForConditionTimeout': 60000 // sometimes internet is slow so wait.
      },
      'end_session_on_fail': false
    },
    ieedge: {
      desiredCapabilities: desiredCapabilitiesIeEdge
    },
    ie11: {
      desiredCapabilities: desiredCapabilitiesIe11
    },
    ie10: {
      desiredCapabilities: desiredCapabilitiesIe10
    },
    safari: {
      desiredCapabilities: desiredCapabilitiesSafari
    },
    firefox: {
      desiredCapabilities: desiredCapabilitiesFirefox
    },
    chrome: {
      desiredCapabilities: desiredCapabilitiesChrome
    }
  }
};

// Code to copy seleniumhost/port into test settings
for (let i in nightwatchConfig.test_settings) {
  const config = nightwatchConfig.test_settings[i];
  config['selenium_host'] = nightwatchConfig.selenium.host;
  config['selenium_port'] = nightwatchConfig.selenium.port;
}

module.exports = nightwatchConfig;
