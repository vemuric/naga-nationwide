const defineSupportCode = require('cucumber').defineSupportCode;
const expect = require('chai').expect;
const locators = require('../support/locators');

defineSupportCode(function({Given, When, Then}){
    Given(/^I open the url "([^"]+)"$/, function(urlToBeOpened){
        browser.url(urlToBeOpened);
        browser.waitUntil(function() {
            const readyState = browser.execute(function() {
                return document.readyState;
            });
            return readyState.value === 'complete';
        }, 60000, "Unforeseen error while loading the URL", 3000);
    });
    When(/^I hover on Mortgages$/, function(){
        browser.waitForVisible(locators.mortgages_hover);
        browser.moveToObject(locators.mortgages_hover);
    });
    When(/^I select Mortgage rates for new customers$/, function(){
        browser.waitForVisible(locators.new_mortgages);
        browser.click(locators.new_mortgages);
    });
    Then(/^I should land on "([^"]+)" page containing "([^"]+)"$/, function(expectedText,element){
        browser.waitForVisible(locators[element]);
        let actualHeaderText = browser.getText(locators[element]);
        expect(actualHeaderText).to.be.equal(expectedText, "User not landed on '" + expectedText + "' page");
    });
    When(/^I select "([^"]+)"$/, function(element){
        browser.waitForVisible(locators[element]);
        browser.click(locators[element]);
		
    });
    Then(/^I should see "([^"]+)"$/, function(element){
        browser.isVisible(locators[element]);
    });
    When(/^I fill "([^"]+)" with (.*)$/, function(element, value){
        browser.click(locators[element]);
        browser.keys(value);
    });
    Then(/^I should be presented with available mortgages$/, function(){
        browser.pause(5000);
        browser.waitForVisible(locators.available_mortgages);
    });
    Then(/^I wait for the filter to be applied$/, function(){
        browser.pause(5000);
    });

});