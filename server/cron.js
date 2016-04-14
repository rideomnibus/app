/* global SyncedCron, moment, Buses, COTA */

SyncedCron.config({
  // Log job run details to console
  log: false,

  // Use a custom logger function (defaults to Meteor's logging package)
  logger: null,

  // Name of collection to use for synchronisation and logging
  collectionName: 'cronHistory',

  // Default to using localTime
  utc: false,

  /*
    TTL in seconds for history records in collection to expire
    NOTE: Unset to remove expiry but ensure you remove the index from
    mongo by hand

    ALSO: SyncedCron can't use the `_ensureIndex` command to modify
    the TTL index. The best way to modify the default value of
    `collectionTTL` is to remove the index by hand (in the mongo shell
    run `db.cronHistory.dropIndex({startedAt: 1})`) and re-run your
    project. SyncedCron will recreate the index with the updated TTL.
  */
  collectionTTL: 3600
});

SyncedCron.add({
  name: 'Remove inactive buses',
  schedule (parser) {
    // parser is a later.parse object
    return parser.text('every 10 seconds');
  },
  job () {
    let nowLess30Seconds = moment().subtract(30, 'seconds').toDate();
    let selector = { updatedAt: { $lt: nowLess30Seconds } };
    Buses.remove(selector);
  }
});

SyncedCron.add({
  name: 'Update COTA realtime feed',
  schedule (parser) {
    // parser is a later.parse object
    return parser.text('every 5 seconds');
  },
  job () {
    COTA.getVehiclePositions();
  }
});

Meteor.startup(function () {
  SyncedCron.start();
});
