/* globals scanner */

Template.scan.events({
  'click .scan-barcode' (event) {
    scanner.startScanning();
  }
});
