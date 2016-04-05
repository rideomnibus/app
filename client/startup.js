/* global GoogleMaps Stripe */

Meteor.startup(function () {
  GoogleMaps.load();
  Stripe.setPublishableKey(Meteor.settings.public.stripe_pk);
});
