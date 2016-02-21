/* global Geolocation, Buses */
Template.driver.onCreated(function () {
  Template.instance().updateLocationInterval = Meteor.setInterval(function () {
    let latLng = Geolocation.latLng();
    Meteor.call('updateLatLng', latLng);
  }, 1000);
});

Template.driver.events({
  'click #start-tracking-driving' (event, template) {
    let latLng = Geolocation.latLng();
    Meteor.call('startTrackingDriving', latLng);
  },
  'click #stop-tracking-driving' (event, template) {
    Meteor.call('stopTrackingDriving');
    Meteor.clearInterval(Template.instance().updateLocationInterval);
  }
});

var isDrivingHelper = function () {
  let buses = Buses.find().fetch();
  return !!_.findWhere(buses, { userId: Meteor.userId() });
};

Template.driver.helpers({
  isDriving () {
    return isDrivingHelper();
  }
});
