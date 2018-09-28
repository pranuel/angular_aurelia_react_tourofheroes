import {browser, element, by, By, $, $$, ExpectedConditions} from 'aurelia-protractor-plugin/protractor';

export class PageObjectDashboard {
  getGreeting() {
    return element(by.tagName('h1')).getText();
  }
}
