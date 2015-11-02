Package.describe({
  name: 'poetic:meteor-apple-purchasing',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Meteor package for running apple in app purchasing inside of your mobile application.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/poetic/meteor-apple-purchases',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.addFiles('meteor-apple-purchasing.js');
  api.export('IAP');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('poetic:meteor-apple-purchasing');
  api.addFiles('meteor-apple-purchasing-tests.js');
});
