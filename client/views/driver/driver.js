Template.driver.events({
  'click #start-tracking-driving' (event, template) {
    let latLng = Geolocation.latLng();
    Meteor.call('startTrackingDriving', latLng);
  }
});
