/* globals Mongo, SimpleSchema, Buses: true, BusSchema: true */

BusSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    autoValue () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue () {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  userId: {
    type: String,
    autoValue () {
      if (this.isInsert) {
        return this.userId;
      } else {
        this.unset();
      }
    }
  },
  name: { type: String },
  lat: { type: Number, decimal: true },
  lng: { type: Number, decimal: true }
});

Buses = new Mongo.Collection('buses');
Buses.attachSchema(BusSchema);

Buses.allow({

  insert (userId = null) {
    return (!!userId);
  },

  update (userId = null, doc, fieldNames, modifier) {
    return (!!userId && userId === doc.userId);
  },

  remove (userId = null, doc, fieldNames, modifier) {
    return (!!userId && userId === doc.userId);
  }

});
