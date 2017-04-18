# NightWatch JS Standalone Project for end2end testing.

_**Automate** your **acceptance tests** and run them in **real browsers**_!

![nightwatch-logo-with-slogan](https://cloud.githubusercontent.com/assets/194400/16045809/099207e2-3242-11e6-99d4-99b227d7a38a.png)


## Dependencies
* [xvfb](http://tobyho.com/2015/01/09/headless-browser-testing-xvfb/) (For headless tests only)
* Java 8 (Because we are using the latest Selenium JAR)

## How to install

* run ```npm install```

## What the installation process does
* It downloads Selenium JAR, chrome and firefox driver for Selenium.
* It install NightwatchJS.
* It creates a ``nightwatch.conf.js`` file in the root of your project.
* It creates some examples in the folder ``./tests/end2end/``.
* It adds some exceptions to ``.gitignore`` file if it exists.
* It adds an entry to the _scripts_ key in your _package.json_ if it doesn't exists it will add this:
    * ``test`` command.
    * ``test-headless`` command.
    * If it does exist it will add these (to avoid messing up with your existing configuration):
    * ``test-nightwatch`` command (does exactly the same as ``test``)
    * ``test-nightwatch-headless'`` command (does exactly the same as ``test-headless``)


## To run tests (Remember that if you already have a _scripts_ key in your _package.json_ the names will change, see above)

Have in mind that this command uses [xvfb-maybe](https://www.npmjs.com/package/xvfb-maybe) internally, which tries to run the test with ``xvfb-run`` if we are in a headless Linux Environment, otherwise it will show the tests in the browser:

* ```$ npm test```

To run the test explicitly headless you can use:

* ```$ npm run test-headless```

Tests will default to run in Chrome but if you want to run them in Firefox:

* ```$ npm test -- -e firefox```

Lastly if you want to run both Chrome and Firefox simultaneously:

* ```$ npm test -- -e default,firefox```

This project is using [ESLint](http://eslint.org/) as part of the tests process, so if you have a linting problem in your test's source code the tests won't run because of it. Always make sure to satisfy linting rules (although you can disable this modifying _test_ script in _package.json_).

Credits to [Learning Nightwatch](https://github.com/dwyl/learn-nightwatch), This project was created on top of that, also if you need more information they put some good documentation on it.

There is also a [standalone project](https://github.com/bixlabs/nightwatchjs-end-2-end-standalone) of this library.
