/* globals cordova */

Template.scan.events({
  'click .scan-barcode' (event) {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        console.log(`We got a barcode\nResult: ${result.text}\nFormat: ${result.format}\nCancelled: ${result.cancelled}`);
        Meteor.call('Tickets.methods.scan', result.text);
      },
      function (error) {
        console.log(`Scanning failed: ${error}`);
      }
    );
  }
});
