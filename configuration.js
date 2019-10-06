var fs = require('fs');
var BINPATH = '../nightwatchjs-end2end/bin/';
var findInFiles = require('find-in-files');

/**
 * selenium-download does exactly what its name suggests;
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
      require('selenium-download').ensure(BINPATH, function (error) {
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

  requiresAdditionOrManipulationOfPackageJSON().then(function(result) {
    if (result) {
      packageJSON.scripts['test-end2end'] = BROWSER_OR_HEADLESS_TEST_COMMAND;
      packageJSON.scripts['test-end2end-headless'] = HEADLESS_TEST_COMMAND;
      packageJSON.scripts['test-end2end-all'] = 'npm run test-end2end -- -e default,firefox && npm run test-end2end-browserstack-ie11';
      packageJSON.scripts['test-end2end-headless-all'] = 'npm run test-end2end-headless -- -e default,firefox && npm run test-end2end-browserstack-ie11';
      packageJSON.scripts['test-end2end-browserstack'] = 'npm run test-end2end-browserstack-chrome';
      packageJSON.scripts['test-end2end-browserstack-chrome'] = 'node browserstack-local-runner.js -c ./nightwatch-browserstack.conf.js -e chrome';
      packageJSON.scripts['test-end2end-browserstack-firefox'] = 'node browserstack-local-runner.js -c ./nightwatch-browserstack.conf.js -e firefox';
      packageJSON.scripts['test-end2end-browserstack-safari'] = 'node browserstack-local-runner.js -c ./nightwatch-browserstack.conf.js -e safari';
      packageJSON.scripts['test-end2end-browserstack-ieedge'] = 'node browserstack-local-runner.js -c ./nightwatch-browserstack.conf.js -e ieedge';
      packageJSON.scripts['test-end2end-browserstack-ie11'] = 'node browserstack-local-runner.js -c ./nightwatch-browserstack.conf.js -e ie11';
      packageJSON.scripts['test-end2end-browserstack-ie10'] = 'node browserstack-local-runner.js -c ./nightwatch-browserstack.conf.js -e ie10';

      fs.writeFileSync('../../package.json', JSON.stringify(packageJSON), 'utf8');
    }
  });
}

function findWordInFile(word, directory, file) {
  return findInFiles.findSync(word, directory, file)
    .then(function (results) {
      for (var result in results) {
        var res = results[result];
        return res.count > 0;
      }

      return false;
    });
}

function copyDefaultNightwatchConfigurationIntoProjectsRoot() {
  if (!fs.existsSync('../../nightwatch.conf.js'))
  fs.createReadStream('./generated-files/nightwatch-configuration.js').pipe(fs.createWriteStream('../../nightwatch.conf.js'));
}

function copyBrowserStackNightwatchConfigurationIntoProjectsRoot() {
  if (!fs.existsSync('../../nightwatch-browserstack.conf.js'))
    fs.createReadStream('./generated-files/nightwatch-configuration-browserstack.js').pipe(fs.createWriteStream('../../nightwatch-browserstack.conf.js'));


  if (!fs.existsSync('../../browserstack-local-runner.js'))
    fs.createReadStream('./generated-files/browserstack-local-runner.js').pipe(fs.createWriteStream('../../browserstack-local-runner.js'));

}

function gitIgnoreInformativeFoldersIfPossible() {
  isGitIgnoreAlreadyWritten().then(function (isAlreadyWritten) {
    if (fs.existsSync('../../.gitignore') && !isAlreadyWritten) {
      fs.appendFileSync('../../.gitignore', '\ntest_reports\ntest_screenshots\nselenium-debug.log\nbrowserstack.err\nlocal.log\nselenium-server.log');
    }
  })
}

function isGitIgnoreAlreadyWritten() {
  return findWordInFile('test_reports', '../../', '.gitignore');
}

function createFolder(dir) {
  requiresAdditionOrManipulationOfPackageJSON().then(function(result) {
    if (result) {
      fs.mkdirSync(dir);
    }
  });
}

function requiresAdditionOrManipulationOfPackageJSON() {
  return areAllTestsFolderEmpties().then(function(areEmpty) {
    return areEmpty && hasKnownCommandsInPackageJSON().then(function(result) {
      return !result
    });
  })
}

function hasKnownCommandsInPackageJSON() {
  return findWordInFile("test-end2end-browserstack-chrome", '../../', 'package.json').then(function(chromePresent) {
    return chromePresent && findWordInFile("test-end2end-browserstack-firefox", '../../', 'package.json').then(function(firefoxPresent) {
      return firefoxPresent &&  findWordInFile("test-end2end", '../../', 'package.json').then(function(testPresent) {
        return testPresent && findWordInFile("xvfb-maybe", '../../', 'package.json')
      });
    });
  });
}

function copyExampleTestFilesIntoProjectsRoot() {
  requiresAdditionOrManipulationOfPackageJSON().then(function(result) {
    if (result) {
      fs.createReadStream('./generated-files/constants.js').pipe(fs.createWriteStream('../../tests/end2end/util/constants.js'));
      fs.createReadStream('./generated-files/page-factory.js').pipe(fs.createWriteStream('../../tests/end2end/util/page-factory.js'));
      fs.createReadStream('./generated-files/bixlabs.js').pipe(fs.createWriteStream('../../tests/end2end/test-cases/bixlabs.js'));
      fs.createReadStream('./generated-files/initializer.po.js').pipe(fs.createWriteStream('../../tests/end2end/page-objects/initializer.po.js'));
      fs.createReadStream('./generated-files/bixlabs.po.js').pipe(fs.createWriteStream('../../tests/end2end/page-objects/bixlabs.po.js'));
    }
  });
}

function areAllTestsFolderEmpties() {
  return new Promise(function(fulfill, reject) {
    if (isFolderEmpty('../../tests/end2end/test-cases') && isFolderEmpty('../../tests/end2end/page-objects') &&
      isFolderEmpty('../../tests/end2end/util')) {
      fulfill(true);
    }
    fulfill(false);
  });
}

function isFolderEmpty(dir) {
  return fs.readdirSync(dir).length === 0;
}
