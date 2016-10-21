/**
 * Helper function to assign a callback to a setting stored in Chrome.
 */
function settingCallback(setting, callback) {
	"use strict";
	chrome.storage.sync.get(setting, function (items) {
		callback(items[setting]);
	});
}

/**
 * Save a setting to chrome.storage.sync.
 *
 * @param k
 *	 Key.
 * @param value
 *	 Value to save.
 */
function saveSetting(k, value) {
	"use strict";
	var data = {};
	data[k] = value;
	chrome.storage.sync.set(data);
}

(function ($) {
	"use strict";
	$(document).ready(function () {

		// Load checkbox state.
		settingCallback('client-js-enabled', function (setting) {
			$('#client-js-enabled').prop('checked', setting);
		});

		// Save checkbox state.
		$('#client-js-enabled').on('change', function () {
			var client_js_enabled = $(this).is(':checked');
			saveSetting('client-js-enabled', client_js_enabled);
		});

		$("#start-record").click(function (event) {
			event.preventDefault();
			chrome.extension.getBackgroundPage().clickRecord();
		});

		$("#login").click(function (event) {
			event.preventDefault();
			window.open(window.getWalkhub()+"/connect");
		});

		chrome.extension.getBackgroundPage().getUser(function (user) {
			if (user && Object.keys(user).length > 0) {
				$("#login").hide();
				$("#loginname").text("Hi " + (user.Name || user.Mail) + "!").show();
				$("#start-record").show();
			} else {
				$("#login").show();
				$("#loginname").text("").hide();
				$("#start-record").hide();
			}
		});
	});
})(jQuery);
