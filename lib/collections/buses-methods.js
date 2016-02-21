/* global Buses */

Meteor.methods({
  startTrackingDriving (latLng) {
    // throw error if user is not logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to drive.');
    }
    let selectorUser = { userId: this.userId };
    let userBus = Buses.findOne(selectorUser);

    // throw error if user is already driving
    if (userBus) {
      throw new Meteor.Error('already-driving', 'You cannot drive two buses at once...');
    }

    let newBus = {
      name: Meteor.user().username,
      lat: latLng.lat,
      lng: latLng.lng
    };

    Buses.insert(newBus);
  }
});
