/* global Geolocation, GoogleMaps, google, Buses */

Template.home.onCreated(function () {
  this.autorun(() => { this.subscribe('allBuses'); });
  var instance = Template.instance();
  GoogleMaps.ready('map', (map) => {
    var marker;

    console.log('google maps ready');

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

    var busIcon = 'assets/img/favicon.png';
    var buses = Buses.find();
    instance.busMarkers = [];

    buses.observe({
      added (newBus) {
        console.log(`create bus, driving now! ${newBus.name} (${newBus.lat}, ${newBus.lng})`);
        let busMarker = {
          marker: new google.maps.Marker({
            position: new google.maps.LatLng(newBus.lat, newBus.lng),
            map: map.instance,
            icon: busIcon
          }),
          bus: newBus,
          _id: newBus._id
        };
        instance.busMarkers.push(busMarker);
      },
      changed (newBus, oldBus) {
        console.log('changed bus');

        let busList = Buses.find().fetch();

        busList.forEach(function(bus){
          if (bus.userId === newBus.userId){
            console.log("found use");
            // call mapOptionsHelper to center Map
            mapOptionsHelper();
          }
        });

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
});

 var mapOptionsHelper = function () {
   var latLng = Geolocation.latLng();
   // Initialize the map once we have the latLng.
   if (GoogleMaps.loaded() && latLng) {
     return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
       zoom: 15
     };
   }
 }


Template.home.helpers({
  geolocationError () {
    var error = Geolocation.error();
    return error && error.message;
  },
  mapOptions: mapOptionsHelper
});
