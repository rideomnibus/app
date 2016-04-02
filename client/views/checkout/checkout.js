if (Meteor.isClient) {
  Template.checkout.events({
    'submit .new-task': function(e) {
      e.preventDefault();

      var total = e.target.amount.value;

      StripeCheckout.open({
        key: 'pk_test_y1KtMlXAr5mfOBAIndIJ8fcB',
        amount: total * 100,
        name: 'Purchase Your Ticket',
        description: 'COTA Store',
        panelLabel: 'Purchase',
        token: function(res) {
          stripeToken = {
            id: res.id,
            amount: total * 100
          };
          Meteor.call('chargeCard', stripeToken, function(err) {
            if (!err) {
              console.log("ticket purchase was successful");
              
            }
          });
        }
      });
    }
  });
}
