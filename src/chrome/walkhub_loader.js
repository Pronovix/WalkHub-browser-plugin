(function () {
  'use strict';

  function load_walkhub_resources() {
    var script = document.createElement('script');

    script.src = 'http://walkhub.net/resources/compiled.js';
    script.onload = function () {
      this.parentNode.removeChild(this);
    };

    (document.head || document.documentElement).appendChild(script);
  }

  //Only load if loading is enabled in sync.
  chrome.storage.sync.get('client-js-enabled', function (items) {
    if (items['client-js-enabled']) {
      load_walkhub_resources();
    }
  });
}());