chrome.runtime.onMessage.addListener(function (data, sender, sendResponse) {
	if (data.command === "makeScreenshot") {
		chrome.tabs.captureVisibleTab(null, {format: "png"}, function(dataUrl) {
			sendResponse(dataUrl);
		});

		return true;
	}

	return false;
});

function addWalkhubCSP(headerValue) {
	var wh = window.getWalkhub();
	var overrides = [
		"default-src",
		"script-src",
		"style-src",
		"img-src",
		"connect-src",
		"font-src",
		"media-src",
		"child-src",
	];

	for (var i = 0; i < overrides.length; i++) {
		headerValue = headerValue.replace(overrides[i], overrides[i]+" "+wh);
	}

	return headerValue;
}

chrome.webRequest.onHeadersReceived.addListener(function (details) {
	console.log(details);
	var headers = details.responseHeaders;
	for (var i = 0; i < headers.length; i++) {
		if (headers[i].name === "Content-Security-Policy") {
			headers[i].value = addWalkhubCSP(headers[i].value);
		}
	}

	return {responseHeaders: headers};
}, {urls: ["<all_urls>"], types: ["main_frame"]}, ["blocking", "responseHeaders"]);

var prevCookieValue = null;

chrome.cookies.onChanged.addListener(function (changeInfo) {
	var walkhubCookieDomain = window.getWalkhubDomain();
	if (changeInfo.cookie.domain === walkhubCookieDomain || changeInfo.cookie.domain === "."+walkhubCookieDomain) {
		if (changeInfo.cookie.name.endsWith("_SESSION")) {
			if (prevCookieValue === null) {
				prevCookieValue = changeInfo.cookie.value;
			}

			if (prevCookieValue !== changeInfo.cookie.value) {
				window.location.reload();
			}
		}
	}
})

function messageFrame(message) {
	document.getElementsByTagName("iframe")[0].contentWindow.postMessage(JSON.stringify(message), "*");
}

function getUser(callback) {
	var listener = function (event) {
		window.removeEventListener("message", listener);
		var data = JSON.parse(event.data);
		if (data.type === "extensionCurrentUser") {
			callback(data.currentUser);
		}
	};

	window.addEventListener("message", listener);
	messageFrame({
		type: "extensionGetCurrentUser",
	});
}

function clickRecord() {
	chrome.tabs.getSelected(function(tab) {
		if (tab.url.startsWith("chrome://")) {
			alert("Can't record walkthroughs on special pages.");
			return;
		}
		messageFrame({
			type: "extensionStartRecord",
			url: tab.url,
		});
	});
}

(function($) {
	$(function() {
		$("a.walkthroughbutton").attr("data-origin", window.getWalkhub()+"/");

		var embedjs = document.createElement("script");
		embedjs.src = window.getWalkhub() + "/assets/embed.js";
		(document.head || document.documentElement).appendChild(embedjs);
	});
})(jQuery);
