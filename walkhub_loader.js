(function () {
	"use strict";

	function attach_to_document(element) {
		(document.head || document.documentElement).appendChild(element);
	}

	// Load walkhub resources.
	function load_walkhub_resources() {
		var compiled_js = document.createElement("script");
		compiled_js.src = window.getWalkhub() + "/assets/client.js";
		compiled_js.defer = true;
		attach_to_document(compiled_js);

		var existence_js = document.createElement("script");
		existence_js.textContent = "window.WALKHUB_EXTENSION = true;";
		attach_to_document(existence_js);
	}

	function listen() {
		window.addEventListener("message", function(event) {
			var data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
			if (data.walkhub_extension_key && data.walkhub_extension_key === chrome.runtime.id) {
				chrome.runtime.sendMessage(data, function(dataUrl) {
					window.postMessage(JSON.stringify({
						img: dataUrl,
						screenshot_key: data.screenshot_key,
						command: "saveScreenshot",
					}), data.origin || "*");
				})
			}
		});
	}

	load_walkhub_resources();
	listen();
}());
