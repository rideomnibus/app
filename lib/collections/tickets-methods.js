/* globals Meteor, Tickets, StripeAPI */

Meteor.methods({
  'Tickets.methods.scan' (ticketId) {
    console.log(`Ticket scanned: ${ticketId}`);
  },
  'Tickets.methods.purchase' (stripeToken) {
    var Stripe = StripeAPI(Meteor.settings.stripe_sk);

    Stripe.charges.create({
      source: stripeToken.id,
      amount: stripeToken.amount,
      currency: 'usd'
    },
    Meteor.bindEnvironment((error, stripeCharge) => {
      if (error) {
        console.log('ERROR: stripe charge failed', error);
        return error;
      }

      console.log(stripeCharge);
      if (!this.userId) {
        throw new Meteor.Error('not-authorized', 'must be logged in to purchase a ticket');
      }

      var newTicket = {
        userId: this.userId,
        purchaseTime: new Date(),
        isUsed: false,
        uses: [ ],
        stripeCharge,
        token: Random.secret(128)
      };

      return Tickets.insert(newTicket);
    }));
  }
});
