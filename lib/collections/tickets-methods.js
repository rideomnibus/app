/* globals Meteor */

Meteor.methods({
  'Tickets.methods.scan' (ticketId) {
    console.log(`Ticket scanned: ${ticketId}`);
  }
});
