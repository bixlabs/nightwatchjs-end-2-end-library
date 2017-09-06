var fs = require('fs');
var BINPATH = '../nightwatch/bin/';
var findInFiles = require('find-in-files');

/**
 * selenium-download does exactly what it's name suggests;
 * downloads (or updates) the version of Selenium (& chromedriver)
 * on your localhost where it will be used by Nightwatch.
 /the following code checks for the existence of `selenium.jar` before trying to run our tests.
 */

DownloadSeleniumAndChromeDriver();
configureTestsCommandInPackageDotJSON();
copyDefaultNightwatchConfigurationIntoProjectsRoot();
copyBrowserStackNightwatchConfigurationIntoProjectsRoot();
gitIgnoreInformativeFoldersIfPossible();
createFolder('../../tests');
createFolder('../../tests/end2end');
createFolder('../../tests/end2end/test-cases');
createFolder('../../tests/end2end/page-objects');
createFolder('../../tests/end2end/util');
copyExampleTestFilesIntoProjectsRoot();


function DownloadSeleniumAndChromeDriver() {
  fs.stat(BINPATH + 'selenium.jar', function (err, stat) { // got it?
    if (err || !stat || stat.size < 1) {
      require('selenium-download').ensure(BINPATH, function(error) {
        if (error) throw new Error(error); // no point continuing so exit!
        console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
      });
    }
  });
}


function configureTestsCommandInPackageDotJSON() {
  var packageJSON = JSON.parse(fs.readFileSync('../../package.json', 'utf8'));
  var BROWSER_OR_HEADLESS_TEST_COMMAND = 'xvfb-maybe ./node_modules/.bin/nightwatch';
  var HEADLESS_TEST_COMMAND = 'xvfb-run --auto-servernum --server-num=1 ./node_modules/.bin/nightwatch';

  if (!packageJSON.scripts) {
    packageJSON.scripts = {};
  }

  packageJSON.scripts['test-end2end'] = BROWSER_OR_HEADLESS_TEST_COMMAND;
  packageJSON.scripts['test-end2end-headless'] = HEADLESS_TEST_COMMAND;
  packageJSON.scripts['test-end2end-browserstack'] = 'node browserstack-local-runner.js -c ./nightwatch-browserstack.conf.js';
  packageJSON.scripts['test-end2end-all'] = 'npm run test-end2end -- -e default,firefox && npm run test-end2end-browserstack';
  packageJSON.scripts['test-end2end-headless-all'] = 'npm run test-end2end-headless -- -e default,firefox && npm run test-end2end-browserstack-headless';

  fs.writeFile('../../package.json', JSON.stringify(packageJSON), 'utf8');
}

function copyDefaultNightwatchConfigurationIntoProjectsRoot() {
  fs.createReadStream('./generated-files/nightwatch-configuration.js').pipe(fs.createWriteStream('../../nightwatch.conf.js'));
}

function copyBrowserStackNightwatchConfigurationIntoProjectsRoot() {
  fs.createReadStream('./generated-files/nightwatch-configuration-browserstack.js').pipe(fs.createWriteStream('../../nightwatch-browserstack.conf.js'));
  fs.createReadStream('./generated-files/browserstack-local-runner.js').pipe(fs.createWriteStream('../../browserstack-local-runner.js'));

}

function gitIgnoreInformativeFoldersIfPossible() {
  isGitIgnoreAlreadyWritten('../../', '.gitignore').then(function(alreadyWritten) {
    if (fs.existsSync('../../.gitignore') && !alreadyWritten) {
      fs.appendFileSync('../../.gitignore', '\ntest_reports\ntest_screenshots\nselenium-debug.log');
    }
  })
}

function isGitIgnoreAlreadyWritten(directory, file) {
  return findInFiles.findSync('test_reports', directory, file)
    .then(function(results) {
      return results.length === 0;
    });
}

function createFolder(dir) {
  if (folderDoesntExist(dir)) {
    fs.mkdirSync(dir);
  }
}

function folderDoesntExist(dir) {
  return !fs.existsSync(dir);
}

function copyExampleTestFilesIntoProjectsRoot() {
  if(folderDoesntExist('../../tests/end2end')) {
    fs.createReadStream('./generated-files/constants.js').pipe(fs.createWriteStream('../../tests/end2end/util/constants.js'));
    fs.createReadStream('./generated-files/nightwatch.js').pipe(fs.createWriteStream('../../tests/end2end/test-cases/nightwatch.js'));
    fs.createReadStream('./generated-files/nightwatch.po.js').pipe(fs.createWriteStream('../../tests/end2end/page-objects/nightwatch.po.js'));
  }
}
