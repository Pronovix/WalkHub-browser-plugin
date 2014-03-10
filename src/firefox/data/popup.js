var settingCallback = function (setting, callback) {
    "use strict";
    if (typeof chrome !== "undefined") {
      chrome.storage.sync.get(setting, function (items) {
        callback(items[setting]);
      });
    } else {
      /*
      var storage = require("sdk/simple-storage");
      callback(storage[setting]);
      */
      messageAddon('getSetting', setting);
    }
  },

  saveSetting = function (k, value) {
    "use strict";
    if (typeof chrome !== "undefined") {
      var data = {};
      data[k] = value;
      chrome.storage.sync.set(data);
    } else {
      var storage = require("sdk/simple-storage");

      storage[key] = value;
    }
  },

  /**
   * Send message to firefox addon.
   */
  messageAddon(eventName, data) {
    var event = document.createEvent(eventName);
    event.initCustomEvent(eventName, data);
    document.documentElement.dispatchEvent(eventName);
  }


(function ($) {
  "use strict";
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