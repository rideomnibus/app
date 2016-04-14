/* global COTA: true, HTTP, Assets, Buses */

import GtfsRealtimeBindings from 'gtfs-realtime-bindings';

COTA = {
  getVehiclePositions: function () {
    const options = {
      npmRequestOptions: {
        encoding: null
      }
    };
    HTTP.get('http://realtime.cota.com/TMGTFSRealTimeWebService/Vehicle/VehiclePositions.pb', options, function (error, result) {
      if (error) {
        // handle it
        console.log(error);
        return;
      }
      var feed = GtfsRealtimeBindings.FeedMessage.decode(result.content);
      feed.entity.forEach(function (entity) {
        let criteria = {
          name: entity.id
        };
        let modifier = { $set: {
          lat: entity.vehicle.position.latitude,
          lng: entity.vehicle.position.longitude
        }};
        Buses.update(criteria, modifier, { upsert: true });
      });
    });
  }
};
