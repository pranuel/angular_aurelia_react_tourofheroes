import {PageObject_Dashboard} from './dashboard.po';
import {PageObject_Skeleton} from './skeleton.po';
import {browser, element, by, By, $, $$, ExpectedConditions} from 'aurelia-protractor-plugin/protractor';
import {config} from '../protractor.conf';

describe('aurelia skeleton app', function() {
  let poDashboard: PageObject_Dashboard;
  let poSkeleton: PageObject_Skeleton;

  beforeEach(async () => {
    poSkeleton = new PageObject_Skeleton();
    poDashboard = new PageObject_Dashboard();

    await browser.loadAndWaitForAureliaPage(`http://localhost:${config.port}`);
  });

  it('should load the page and display the initial page title', async () => {
    await expect(await poSkeleton.getCurrentPageTitle()).toBe('Welcome | Dashboard | JSM Dashboard');
  });

  it('should display greeting', async () => {
    await expect(await poDashboard.getGreeting()).toBe('Hello Dashboard!');
  });
});
