/* globals StripeAPI */

Meteor.methods({
  'chargeCard': function (stripeToken) {
    var Stripe = StripeAPI(Meteor.settings.stripe_sk);

    Stripe.charges.create({
      source: stripeToken.id,
      amount: stripeToken.amount,
      currency: 'usd'
    }, function (err, charge) {
      if (err) {
        console.log('ERROR: stripe charge failed', err);
        return err;
      }

      console.log(charge);
      Meteor.call('Tickets.methods.purchase', charge);
    });
  }
});
