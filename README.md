# NightWatch JS Standalone Project for end2end testing.

_**Automate** your **acceptance tests** and run them in **real browsers**_!

![nightwatch-logo-with-slogan](https://cloud.githubusercontent.com/assets/194400/16045809/099207e2-3242-11e6-99d4-99b227d7a38a.png)


## Dependencies
* [xvfb](http://tobyho.com/2015/01/09/headless-browser-testing-xvfb/) (For headless tests only)
* Java 8 (Because we are using the latest Selenium JAR)
* Depending on the latest ChromeDriver you will need your Chrome version to be above a specific number.
We can't put a specific number here sadly.

## How to install

* run ```npm install nightwatchjs-end2end```

## What the installation process does
* It downloads Selenium JAR, chrome and firefox driver for Selenium.
* It install NightwatchJS.
* It creates a ``nightwatch.conf.js`` file in the root of your project.
* It creates some examples in the folder ``./tests/end2end/``.
* It adds some exceptions to ``.gitignore`` file if it exists.
* It adds an entry to the _scripts_ key in your _package.json_:
    * ``test-end2end`` command.
    * ``test-end2end-headless`` command (does exactly the same as ``test-end2end`` but headless for CI environments).
    * ``test-end2end-all`` command (it runs the test in Chrome and Firefox Browsers).
    * ``test-end2end-headless-all`` command (same as ``test-end2end-all`` but headless for CI environments).


## To run tests in real browsers through plugins

Have in mind that this command uses [xvfb-maybe](https://www.npmjs.com/package/xvfb-maybe) internally, which tries to run the test with ``xvfb-run`` if we are in a headless Linux Environment, otherwise it will show the tests in the browser:

* ```$ npm run test-end2end```

To run the test explicitly headless you can use:

* ```$ npm run test-end2end-headless```

Tests will default to run in Chrome but if you want to run them in Firefox:

* ```$ npm run test-end2end -- -e firefox```


## To run tests through BrowserStack

Take into account that you have to BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY correctly set for this to work.

* ``$ npm run test-end2end-browserstack``

To run in headless mode you do:

* ``$ npm run test-end2end-browserstack-headless``

Lastly if you want to run in Chrome, Firefox and IE (IE through BrowserStack):

* ```$ npm run test-end2end-all```

and for the headless version of that:

* ``$ npm run test-end2end-headless-all``

This project is using [ESLint](http://eslint.org/) as part of the tests process, so if you have a linting problem in your test's source code the tests won't run because of it. Always make sure to satisfy linting rules (although you can disable this modifying _test_ script in _package.json_).

Credits to [Learning Nightwatch](https://github.com/dwyl/learn-nightwatch), This project was created on top of that, also if you need more information they put some good documentation on it.

There is also a [standalone project](https://github.com/bixlabs/nightwatchjs-end-2-end-standalone) of this library.
