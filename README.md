# NightWatch JS library Project for end2end testing.

_**Automate** your **acceptance tests** and run them in **real browsers**_!

![nightwatch-logo-with-slogan](https://cloud.githubusercontent.com/assets/194400/16045809/099207e2-3242-11e6-99d4-99b227d7a38a.png)


## Dependencies
* [xvfb](http://tobyho.com/2015/01/09/headless-browser-testing-xvfb/) (For headless tests only)
* Java (The version of Java depends on what Version the [latest Selenium](https://www.seleniumhq.org/download/) needs, Selenium 3.x requires Java 8 which was the latest at the time of writing this).
* Depending on the [latest ChromeDriver](http://chromedriver.chromium.org/downloads) you will need your Chrome version to be above a specific number.
We can't put a specific number here sadly.
* A [BrowserStack](https://www.browserstack.com/) account if you want to run the tests through their platform.

## How to install

* run ```npm install nightwatchjs-end2end```

After this command you should be able to run most of the commands explain here, this library is intended to work just after installation. You should not need anything else (apart from configuring some environment variables for BrowserStack).

## What the installation process does
* It downloads Selenium JAR, Chrome and Firefox driver for Selenium.
* It installs NightwatchJS.
* It creates a ``nightwatch.conf.js`` file in the root of your project.
* It creates some examples in the folder ``./tests/end2end/`` so you have something to see this working right away (we are using [PageObject pattern](https://martinfowler.com/bliki/PageObject.html)).
* It adds some exceptions to ``.gitignore`` file if it exists.
* It adds some entries to the _scripts_ key in your _package.json_:
    * ``test-end2end`` command.
    * ``test-end2end-headless`` command (does exactly the same as ``test-end2end`` but headless for CI environments).
    * ``test-end2end-all`` command (it runs the test in Chrome, Firefox and IE11 (IE through BrowserStack though)).
    * ``test-end2end-headless-all`` command (Same as the command above it's just the headless version for CI environments).
    * ``test-end2end-browserstack`` command (It runs the tests through the BrowserStack platform in Chrome).
    * ``test-end2end-browserstack-chrome`` command (Same as the one above)
    * ``test-end2end-browserstack-firefox`` command (Same but in Firefox)
    * ``test-end2end-browserstack-safari`` command (Same but in Safari)
    * ``test-end2end-browserstack-ieedge`` command (Same but in Edge)
    * ``test-end2end-browserstack-ie11`` command (Same but in IE11)
    * ``test-end2end-browserstack-ie10`` command (Same but in IE10)

## To run tests through BrowserStack (Recommended)

Consider that you need a _BROWSERSTACK_USERNAME_ and _BROWSERSTACK_ACCESS_KEY_ environment variables correctly set for this to work.
I recommend this way because it's easier to tests in multiple Browsers without any struggle.

* ``$ npm run test-end2end-browserstack``

If you want to run in Chrome, Firefox (real Browsers) and IE (IE through BrowserStack):

* ```$ npm run test-end2end-all```

and for the headless version of that:

* ``$ npm run test-end2end-headless-all``

Lastly you can configure whatever browser you want using the existing commands that are created through this library for different browsers, so running:

* ``$ npm run test-end2end-browserstack``

Will run the tests in BrowserStack but only for Chrome browser, if you want to add more browsers just check your _package.json_ and you will see that there are more options to do so.
The idea is that you add those to the same `test-end2end-browserstack` with `&&`. An example of that command for running all the possible configurations that this library provides:

* ``"test-end2end-browserstack": "npm run test-end2end-browserstack-ci-ieedge && npm run test-end2end-browserstack-ci-ie11 && npm run test-end2end-browserstack-ci-ie10 && npm run test-end2end-browserstack-ci-chrome && npm run test-end2end-browserstack-ci-firefox && test-end2end-browserstack-ci-safari"``

Of course you can use those as you wish depending on your needs.


## To run tests in real Browsers through plugins

Have in mind that this command uses [xvfb-maybe](https://www.npmjs.com/package/xvfb-maybe) internally, which tries to run the test with ``xvfb-run`` if we are in a headless Linux Environment, otherwise it will show the tests in the browser:

* ```$ npm run test-end2end```

To run the test explicitly headless you can use:

* ```$ npm run test-end2end-headless```

Tests will default to run in Chrome but if you want to run them in Firefox:

* ```$ npm run test-end2end -- -e firefox```

## Misc (BrowserStack environment configuration)

* For providing environment variables for your project I recommend [dotenv](https://www.npmjs.com/package/dotenv), just follow the instruction they have in their README.md.
* The installation of this library will create a file  called ``browserstack-local-runner.js`` on top of it you can put the ``require('dotenv').config();`` line.
* Finally add the 2 environment variables _BROWSERSTACK_USERNAME_ and _BROWSERSTACK_ACCESS_KEY_ to your ``.env`` file. After this, running ``npm run test-end2end-browserstack `` will work as expected and you will see the output in the console and in your BrowserStack's website (with the account of the provided credentials).

## Explanation of the example generated.

In the example generated we have 3 page objects, a simple test case, a constants module and a page factory module.

* Notice that the 3 page objects form a little dependency tree, Bixlabs Page Object depends on Google Result, Google Result depends on Google search. This approach let us
reuse code in an easy way (and we present the intentions of the code better through the dependencies).
* The test case is where the page objects are used and what actually makes NightwatchJS/Selenium run our code in the browser.
* The constants module... well it's the constans module.
* The page factory module is where we put our initialization of objects. The idea behind this file is that we don't have to deal with dependencies
in the test cases files, instead we just call a function and the object will come correctly constructed with dependencies satisfied.


Credits to [Learning Nightwatch](https://github.com/dwyl/learn-nightwatch), This project was created on top of that, also if you need more information they put some good documentation on it.
