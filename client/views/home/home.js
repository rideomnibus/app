/* global Geolocation, GoogleMaps, google, Buses */

Template.home.onCreated(function () {
  this.autorun(() => { this.subscribe('allBuses'); });

  GoogleMaps.ready('map', (map) => {
    var marker;

    this.autorun(() => {
      var latLng = Geolocation.latLng();
      if (!latLng) { return; }

      if (!marker) {
        console.log('create marker');
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(latLng.lat, latLng.lng),
          map: map.instance
        });
      } else {
        marker.setPosition(latLng);
      }
    });

    var busMarkers;
    var buses = Buses.find();
    busMarkers = buses.map((bus) => {
      console.log(`create bus! ${bus.name} (${bus.lat}, ${bus.lng})`);
      let busMarker = {
        marker: new google.maps.Marker({
          position: new google.maps.LatLng(bus.lat, bus.lng),
          map: map.instance
        }),
        bus: bus,
        _id: bus._id
      };
      return busMarker;
    });

    buses.observe({
      changed (newBus, oldBus) {
        let existingBusMarker = _.findWhere(busMarkers, {_id: newBus._id});
        existingBusMarker.marker.setPosition({lat: newBus.lat, lng: newBus.lng});
      },
      removed (oldBus) {
        let existingBusMarker = _.findWhere(busMarkers, {_id: oldBus._id});
        existingBusMarker.marker.setMap(null);
      }
    });
      // } else {
      //   existingBusMarker.marker.setPosition({lat: bus.lat, lng: bus.lng});
      //   existingBusMarker.updated = true;
      //   return existingBusMarker;
      // }
  });
});

Template.home.helpers({
  geolocationError () {
    var error = Geolocation.error();
    return error && error.message;
  },
  mapOptions () {
    var latLng = Geolocation.latLng();
    // Initialize the map once we have the latLng.
    if (GoogleMaps.loaded() && latLng) {
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: 15
      };
    }
  }
});
