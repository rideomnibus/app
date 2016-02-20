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
        console.log('update position: ', latLng);
        marker.setPosition(latLng);
      }
    });

    this.autorun(() => {
      var buses = Buses.find();
      buses.forEach((bus) => {
        console.log(`create bus! ${bus.name} (${bus.lat}, ${bus.lng})`);
        let busMarker = new google.maps.Marker({
          position: new google.maps.LatLng(bus.lat, bus.lng),
          map: map.instance
        });
        busMarker.setPosition({lat: bus.lat, lng: bus.lng});
      });
    });
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
