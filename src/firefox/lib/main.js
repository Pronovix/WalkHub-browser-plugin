var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var self = require("sdk/self");

var popupPanel = require("sdk/panel").Panel({
  //width: 215,
  //height: 160,
  contentURL: self.data.url("popup.html"),
  contentScriptFile: self.data.url("walkhub_loader.js")
});

var widget = widgets.Widget({
  id: "walkhub",
  label: "WalkhHub player",
  contentURL: self.data.url("logo.png"),
  panel: popupPanel
});

function inject_walkhub_loader(tab) {
  "use strict";

  tab.attach({
    contentScriptFile: self.data.url('walkhub_loader.js')
  });
}

tabs.on("ready", inject_walkhub_loader);
