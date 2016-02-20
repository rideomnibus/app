/* globals Mongo, SimpleSchema, Buses: true, BusSchema: true */

BusSchema = new SimpleSchema({
  name: { type: String },
  lat: { type: Number, decimal: true },
  lng: { type: Number, decimal: true }
});

Buses = new Mongo.Collection('buses');
Buses.attachSchema(BusSchema);

Buses.allow({

  insert (userId = null) {
    return true;
  },

  update (userId = null, doc, fieldNames, modifier) {
    return true;
  },

  remove (userId = null, doc, fieldNames, modifier) {
    return true;
  }

});
