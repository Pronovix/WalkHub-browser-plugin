(function ($) {
	"use strict";
	$(document).ready(function () {

		$("#start-record").click(function (event) {
			event.preventDefault();
			chrome.extension.getBackgroundPage().clickRecord();
		});

		$("#login").click(function (event) {
			event.preventDefault();
			window.open(window.getWalkhub()+"/connect");
		});

		$("#profile").click(function (event) {
			event.preventDefault();
			window.open(window.getWalkhub()+"/profile/me");
		});

		$(".control").hide();

		chrome.extension.getBackgroundPage().getUser(function (user) {
			if (user && Object.keys(user).length > 0) {
				$("#login").hide();
				$("#loginname").text("Logged in as: " + (user.Name || user.Mail)).show();
				$("#start-record").show();
				$("#profile").show();
			} else {
				$("#login").show();
				$("#loginname").text("").hide();
				$("#start-record").hide();
				$("#profile").hide();
			}
		});
	});
})(jQuery);
