/* global Tickets */

Meteor.publish('userTickets', function () {
  if (!this.userId) {
    return;
  }

  var selector = {
    userId: this.userId
  };

  return Tickets.find(selector);
});
