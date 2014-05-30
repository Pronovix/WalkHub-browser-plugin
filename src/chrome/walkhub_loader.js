(function () {
  'use strict';

  var walkhub_origin = 'http://walkhub.net';

  function attach_to_document(element) {
    (document.head || document.documentElement).appendChild(element);
  }

  /**
   * Load walkhub resources.
   */
  function load_walkhub_resources() {
    // Do not load javascript in the parent iframe.
    if (window.location.pathname === '/walkhub') {
      return;
    }

    var compiled_js = document.createElement('script');
    compiled_js.src = walkhub_origin + '/resources/compiled.js';
    attach_to_document(compiled_js);

    var walkhub_origin_js = document.createElement('script');
    var origin_json = document.createTextNode('window.Walkhub = window.Walkhub || {}; Walkhub.Origin = function () { return "' + walkhub_origin +'";}');
    walkhub_origin_js.appendChild(origin_json);
    attach_to_document(walkhub_origin_js);

    var stylesheet = document.createElement('link');
    stylesheet.href = walkhub_origin + '/resources/walkthrough.css';
    stylesheet.rel = 'stylesheet';
    attach_to_document(stylesheet);
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
