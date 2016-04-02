Meteor.methods({
    'chargeCard': function(stripeToken) {
        var Stripe = StripeAPI('sk_test_dPXcFzmareJ9fYbte1r8ENff');

        Stripe.charges.create({
            source: stripeToken.id,
            amount: stripeToken.amount,
            currency: 'usd'
        }, function(err, charge) {
            console.log(err, charge);
        });
    }
});
