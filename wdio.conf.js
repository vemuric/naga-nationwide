exports.config = {
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the
  // directory from which `wdio` was called. Notice that, if you are calling
  // `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script)
  // then the current working directory is where your package.json resides, so
  // `wdio` will be called from there.
  //
  specs: [
    './src/features/**/*.feature',
  ],

  maxInstances: 1,
  //
  // If you have trouble getting all important capabilities together, check
  // out the Sauce Labs platform configurator - a great tool to configure your
  // capabilities: https://docs.saucelabs.com/reference/platforms-configurator
  //
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome',
  }],
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // By default WebdriverIO commands are executed in a synchronous way using
  // the wdio-sync package. If you still want to run your tests in an async
  // way e.g. using promises you can set the sync option to false.
  sync: true,
  logLevel: 'error',
  coloredLogs: true,
  screenshotPath: './errorShots/',

  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  services: ['selenium-standalone'],

  framework: 'cucumber',

  reporters: ['spec', 'allure', 'multiple-cucumber-html'],
  reporterOptions: {
	  htmlReporter: {
      jsonFolder: './tmp',
        reportFolder: `./tmp/report`,

        }, 
	  allure: {
	    outputDir:   './test/reports/allure-results/',
        disableWebdriverStepsReporting: false,
        useCucumberStepReporter: false,
	  },
	  
  },

  cucumberOpts: {
    require: ['./src/steps/step_definitions'], 
    backtrace: false,
    compiler: [
      'js:babel-register',
    ],
    failAmbiguousDefinitions: true,
    failFast: true,
    ignoreUndefinedDefinitions: false,
    strict: true,
    tagExpression: 'not @Pending',
    timeout: 200000,
  },

  before: function before() {
    /**
     * Setup the Chai assertion framework
     */
    const chai = require('chai');

    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();
    browser.windowHandleMaximize();
  }
};
