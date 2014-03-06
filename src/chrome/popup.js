(function ($) {
  "use strict";
  $(document).ready(function () {
    // Load checkbox state.
    chrome.storage.sync.get('client-js-enabled', function (items) {
      $('#client-js-enabled').prop('checked', items['client-js-enabled']);
    });

    // Save checkbox state.
    $('#client-js-enabled').on('change', function () {
      var client_js_enabled = $(this).is(':checked');
      chrome.storage.sync.set({'client-js-enabled': client_js_enabled});
    });
  });
})(jQuery);