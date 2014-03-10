/**
 * Helper function to assign a callback to a setting stored in Chrome.
 */
var settingCallback = function (setting, callback) {
    "use strict";
    chrome.storage.sync.get(setting, function (items) {
      callback(items[setting]);
    });
  },

  /**
   * Save a setting to chrome.storage.sync.
   *
   * @param k
   *   Key.
   * @param value
   *   Value to save.
   */
  saveSetting = function (k, value) {
    "use strict";
      var data = {};
      data[k] = value;
      chrome.storage.sync.set(data);
  };

(function ($) {
  "use strict";
  $(document).ready(function () {

    // Load checkbox state.
    settingCallback('client-js-enabled', function (setting) {
      $('#client-js-enabled').prop('checked', setting);
    });

    // Load walkhub origin state
    settingCallback('walkhub-origin', function (setting) {
      if (!setting) {
        setting = 'http://walkhub.net/resources/';
      }
      $('#walkhub-origin').val(setting);
    });

    // Save checkbox state.
    $('#client-js-enabled').on('change', function () {
      var client_js_enabled = $(this).is(':checked');
      saveSetting('client-js-enabled', client_js_enabled);
    });

    // Save walkhub origin state.
    $('#walkhub-origin').on('change keyup paste', function () {
      var walkhub_origin = $(this).val();
      saveSetting('walkhub-origin', walkhub_origin);
    });
  });
})(jQuery);