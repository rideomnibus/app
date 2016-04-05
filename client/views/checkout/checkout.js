/* globals StripeCheckout, Tickets */

Template.checkout.onCreated(function () {
  this.autorun(() => {
    this.subscribe('userTickets');
  });
});

Template.checkout.helpers({
  tickets: () => Tickets.find()
});

Template.checkout.events({
  'submit .new-task': function (e) {
    e.preventDefault();

    var total = e.target.amount.value;

    StripeCheckout.open({
      key: Meteor.settings.public.stripe_pk,
      amount: total * 100,
      name: 'Ticket Purchase',
      // description: '',
      panelLabel: 'Purchase',
      token: function (res) {
        var stripeToken = {
          id: res.id,
          amount: total * 100
        };
        Meteor.call('Tickets.methods.purchase', stripeToken, function (err) {
          if (!err) {
            console.log('ticket purchase was successful');
          }
        });
      }
    });
  }
});
