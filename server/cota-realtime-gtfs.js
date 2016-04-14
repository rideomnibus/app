/* global COTA: true, HTTP, Assets */

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
      console.log(feed);
      feed.entity.forEach(function (entity) {
        console.log(`Bus: ${entity.id}`, entity.vehicle);
      });
    });
  }
};
