Package.describe({
  name: 'omnibus:mwbscanner',
  version: '1.8.6_1',
  // Brief, one-line summary of the package.
  summary: 'Includes mwbscanner.js on web.cordova build.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.addFiles('mwbscanner.js', 'web.cordova');
});

Package.onTest(function (api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('omnibus:mwbscanner');
  api.addFiles('mwbscanner-tests.js');
});
