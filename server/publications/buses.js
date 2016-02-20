/* global Buses */

Meteor.publish('allBuses', () => Buses.find());
