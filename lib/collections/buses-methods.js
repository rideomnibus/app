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
  },
  stopTrackingDriving () {
    // throw error if user is not logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to drive.');
    }
    let selectorUser = { userId: this.userId };
    let userBus = Buses.findOne(selectorUser);

    // throw error if user is already driving
    if (!userBus) {
      throw new Meteor.Error('not-driving', 'You cannot stop driving if you have not started');
    }

    let selector = { _id: userBus._id };

    Buses.remove(selector);
  },
  updateLatLng (latLng) {
    if (!latLng) {
      throw new Meteor.Error('null-data', 'Can not update location to null.');
    }
    // throw error if user is not logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to drive.');
    }
    let selectorUser = { userId: this.userId };
    let userBus = Buses.findOne(selectorUser);

    // throw error if user is already driving
    if (!userBus) {
      throw new Meteor.Error('not-driving', 'You cannot update your location if you have not started');
    }

    let selector = { _id: userBus._id };
    let modifier = {
      $set: {
        lat: latLng.lat,
        lng: latLng.lng
      }
    };

    console.log('update bus location', modifier);
    Buses.update(selector, modifier);
  }
});
