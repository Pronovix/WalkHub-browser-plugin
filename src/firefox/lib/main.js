var tabs = require("sdk/tabs");
var self = require("sdk/self");

function inject_walkhub_loader(tab) {
  "use strict";

  tab.attach({
    contentScriptFile: self.data.url('walkhub_loader.js')
  });
}

tabs.on("ready", inject_walkhub_loader);
