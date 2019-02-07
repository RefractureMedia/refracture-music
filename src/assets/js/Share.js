export default function () {

  // Increase verbosity if you need more logs
  cordova.openwith.setVerbosity(cordova.openwith.DEBUG);

  // Initialize the plugin
  cordova.openwith.init(initSuccess, initError);

  function initSuccess() {
    // alert('init success!');
  }

  function initError(err) {
    console.error('init failed: ' + err);
  }

  // Define your file handler
  cordova.openwith.addHandler(myHandler);

  function myHandler(intent) {
    console.info('intent received');
    for (var i = 0; i < intent.items.length; ++i) {
      var item = intent.items[i];
      console.log(item)
      alert('  type: ', item.type, item.text, item.name, item.utis, item.path, item.uri); // mime type
      a
      // ...
      // Here, you probably want to do something useful with the data
      // ...
      // An example...

      if (intent.items.length > 0) {
        cordova.openwith.load(intent.items[0], function (data, item) {

          // data is a long base64 string with the content of the file
          alert("the item weights " + data.length + " bytes");
          uploadToServer(item);

          // "exit" when done.
          // Note that there is no need to wait for the upload to finish,
          // the app can continue while in background.
          if (intent.exit) {
            cordova.openwith.exit();
          }
        });
      } else {
        if (intent.exit) {
          cordova.openwith.exit();
        }
      }
    }
  }
}
