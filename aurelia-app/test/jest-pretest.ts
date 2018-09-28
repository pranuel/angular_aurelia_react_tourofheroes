import 'aurelia-polyfills';
import { Options, ExtensionHandlers, TextHandler } from 'aurelia-loader-nodejs';
import { globalize } from 'aurelia-pal-nodejs';
import * as path from 'path';

// applications insights fix: https://github.com/Microsoft/ApplicationInsights-JS/issues/476
// tslint:disable-next-line:no-any
(<any>global).define = () => {
    // tslint:disable-next-line:no-empty
};

Options.relativeToDir = path.join(__dirname, '../src');

// Workaround for testing components with sass imports in view
// taken from: https://github.com/aurelia/testing/issues/67#event-1120655676
ExtensionHandlers['.scss'] = TextHandler;

globalize();
