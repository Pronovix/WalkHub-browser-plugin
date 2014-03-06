var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var self = require("sdk/self");

var popupPanel = require("sdk/panel").Panel({
  //width: 215,
  //height: 160,
  contentURL: self.data.url("popup.html")
});

var widget = widgets.Widget({
  id: "walkhub",
  label: "WalkhHub player",
  contentURL: self.data.url("logo.png"),
  panel: popupPanel
});