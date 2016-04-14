/* global Geolocation, google, Buses */

import SlidingMarker from 'marker-animate-unobtrusive';

Template.home.onRendered(function () {
  this.autorun(() => { this.subscribe('allBuses'); });
  var instance = Template.instance();

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.961176, lng: -82.998794},
    zoom: 11
  });

  var marker;
  var user = 'assets/img/rider_pin.png';
  // google.maps.event.addListenerOnce(map, 'tilesloaded', fixMyPageOnce);
  this.autorun(() => {
    var latLng = Geolocation.latLng();
    if (!latLng) { return; }
    if (Meteor.user() === null) {
      if (!marker) {
        console.log('create marker');
        marker = new SlidingMarker({
          position: new google.maps.LatLng(latLng.lat, latLng.lng),
          map: map,
          icon: user
        });
      } else {
        marker.setPosition(latLng);
      }
    }
  });

  var busIcon = 'assets/img/favicon.png';
  var buses = Buses.find();
  instance.busMarkers = [];

  buses.observe({
    added (newBus) {
      console.log(`create bus, driving now! ${newBus.name} (${newBus.lat}, ${newBus.lng})`);
      let busMarker = {
        marker: new SlidingMarker({
          position: new google.maps.LatLng(newBus.lat, newBus.lng),
          map: map,
          icon: busIcon
        }),
        bus: newBus,
        _id: newBus._id
      };
      instance.busMarkers.push(busMarker);
    },
    changed (newBus, oldBus) {
      console.log('changed bus');

      let existingBusMarker = _.findWhere(instance.busMarkers, {_id: newBus._id});
      if (existingBusMarker) {
        existingBusMarker.marker.setPosition({lat: newBus.lat, lng: newBus.lng});
      }
    },
    removed (oldBus) {
      console.log('remove bus');
      let existingBusMarker = _.findWhere(instance.busMarkers, {_id: oldBus._id});
      console.log(existingBusMarker);
      if (existingBusMarker) {
        existingBusMarker.marker.setMap(null);
      }
    }
  });
});

Template.home.helpers({
  geolocationError () {
    var error = Geolocation.error();
    return error && error.message;
  }
});
