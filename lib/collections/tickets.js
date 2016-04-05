/* globals Mongo, SimpleSchema, ScanSubschema: true, Tickets:true, TicketSchema: true */

ScanSubschema = new SimpleSchema({
  timeScanned: { type: Date },
  busId: { type: String }
});

TicketSchema = new SimpleSchema({
  purchaseTime: { type: Date },
  isUsed: { type: Boolean },
  uses: { type: [ ScanSubschema ] },
  paymentToken: { type: Object, blackbox: true },
  token: { type: String }
});

Tickets = new Mongo.Collection('tickets');
Tickets.attachSchema(TicketSchema);

Tickets.allow({
  insert () {
    return true;
  },
  update () {
    return true;
  },
  remove () {
    return true;
  }
});
