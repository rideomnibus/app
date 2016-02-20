/* global Geolocation, GoogleMaps, google */

Template.home.onCreated(function () {
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
