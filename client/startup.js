/* global GoogleMaps Stripe */

Meteor.startup(function () {
  GoogleMaps.load();
  Stripe.setPublishableKey('pk_test_y1KtMlXAr5mfOBAIndIJ8fcB');
});
