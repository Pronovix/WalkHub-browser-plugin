(function ($) {
  "use strict";

  var settingCallback = function(setting, callback) {
    if (chrome) {
      chrome.storage.sync.get(setting, function (items) {
        callback(items[setting]);
      });
    } else {
      var storage = require("sdk/simple-storage");
      callback(storage[setting]);
    }
  },

    saveSetting = function(key, value) {
      if (chrome) {
        chrome.storage.sync.set({key: value});
      } else {
        var storage = require("sdk/simple-storage");

        storage[key] = value;
      }
    };

  $(document).ready(function () {
    // Load checkbox state.
    settingCallback('client-js-enabled', function (setting) {
      $('#client-js-enabled').prop('checked', setting);
    });

    // @Todo get walkhub origin from the storage.

    // Save checkbox state.
    $('#client-js-enabled').on('change', function () {
      var client_js_enabled = $(this).is(':checked');
      saveSetting('client-js-enabled', client_js_enabled);
    });
  });
})(jQuery);