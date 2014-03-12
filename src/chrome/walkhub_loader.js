(function () {
  'use strict';

  /**
   * Load walkhub resources.
   *
   * @todo load css
   */
  function load_walkhub_resources() {
    var script = document.createElement('script');

    script.src = 'http://walkhub.net/resources/compiled.js';
    script.onload = function () {
      this.parentNode.removeChild(this);
    };

    (document.head || document.documentElement).appendChild(script);
  }

  // Chrome has a checkbox to load javascript.
  if (typeof chrome !== 'undefined') {
    chrome.storage.sync.get('client-js-enabled', function (items) {
      if (items['client-js-enabled']) {
        load_walkhub_resources();
      }
    });
  } else {
    load_walkhub_resources();
  }
}());