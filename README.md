# NightWatch JS library Project for end2end testing.

_**Automate** your **acceptance tests** and run them in **real browsers**_!

![nightwatch-logo-with-slogan](https://cloud.githubusercontent.com/assets/194400/16045809/099207e2-3242-11e6-99d4-99b227d7a38a.png)


## Dependencies
* A BrowserStack account if you want to run the tests through their platform.
* [xvfb](http://tobyho.com/2015/01/09/headless-browser-testing-xvfb/) (For headless tests only)
* Java 8 (Because we are using the latest Selenium JAR)
* Depending on the latest ChromeDriver you will need your Chrome version to be above a specific number.
We can't put a specific number here sadly.

## How to install

* run ```npm install nightwatchjs-end2end```

After this command you should be able to run most of the commands explain here, this library is intended to work just after installation. You should not need anything else (apart from configuring some environment variables for BrowserStack).

## What the installation process does
* It downloads Selenium JAR, Chrome and Firefox driver for Selenium.
* It installs NightwatchJS.
* It creates a ``nightwatch.conf.js`` file in the root of your project.
* It creates some examples in the folder ``./tests/end2end/`` so you have something to see this working right away (we are using [PageObject pattern](https://martinfowler.com/bliki/PageObject.html)).
* It adds some exceptions to ``.gitignore`` file if it exists.
* It adds an entry to the _scripts_ key in your _package.json_:
    * ``test-end2end`` command.
    * ``test-end2end-headless`` command (does exactly the same as ``test-end2end`` but headless for CI environments).
    * ``test-end2end-all`` command (it runs the test in Chrome, Firefox and IE10 (ie through BrowserStack though)).
    * ``test-end2end-headless-all`` command (Same as the command above it's just the headless version for CI environments).
    * ``test-end2end-browserstack`` command (It runs the tests through the BrowserStack platform in IE10 and Safari).
    * ``test-end2end-browserstack-ci`` command (Same as the one above, just that this one runs it in 4 different browsers instead of 2, Chrome and Firefox are added).

## To run tests through BrowserStack (Recommended)

Consider that you need a _BROWSERSTACK_USERNAME_ and _BROWSERSTACK_ACCESS_KEY_ environment variables correctly set for this to work.
I recommend this way because it's easier to tests in multiple Browsers without any struggle, plus BrowserStack tests run in parallel.

* ``$ npm run test-end2end-browserstack``

To run in headless mode you do:

* ``$ npm run test-end2end-browserstack-headless``

Lastly if you want to run in Chrome, Firefox (real Browsers) and IE (IE through BrowserStack):

* ```$ npm run test-end2end-all```

and for the headless version of that:

* ``$ npm run test-end2end-headless-all``

## To run tests in real Browsers through plugins

Have in mind that this command uses [xvfb-maybe](https://www.npmjs.com/package/xvfb-maybe) internally, which tries to run the test with ``xvfb-run`` if we are in a headless Linux Environment, otherwise it will show the tests in the browser:

* ```$ npm run test-end2end```

To run the test explicitly headless you can use:

* ```$ npm run test-end2end-headless```

Tests will default to run in Chrome but if you want to run them in Firefox:

* ```$ npm run test-end2end -- -e firefox```

## Misc (BrowserStack environment configuration)

* For providing environment variables for your project I recommend [dotenv](https://www.npmjs.com/package/dotenv), just follow the instruction they have in their README.md.
* The installation of this library will create a file  called ``browserstack-local-runner.js`` on top of it you can put the ``require('dotenv').config();``
* Finally add the 2 environment variables _BROWSERSTACK_USERNAME_ and _BROWSERSTACK_ACCESS_KEY_ to your ``.env`` file. After this, running ``npm run test-end2end-browserstack `` will work as expected and you will see the output in the console and in your BrowserStack's website (with the account of the provided credentials).


Credits to [Learning Nightwatch](https://github.com/dwyl/learn-nightwatch), This project was created on top of that, also if you need more information they put some good documentation on it.

There is also a [standalone project](https://github.com/bixlabs/nightwatchjs-end-2-end-standalone) of this library.
