(function () {
  'use strict';

  var script = document.createElement('script');
  script.src = 'http://walkhub.net/resources/compiled.js';
  script.onload = function () {
    this.parentNode.removeChild(this);
  };

  (document.head || document.documentElement).appendChild(script);
}());