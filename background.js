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

function decodeByte(b) {
	var str = "";
	for (var i = 0; i < b.length; i++) {
		str += String.fromCharCode(parseInt(b[i], 16));
	}
	return str;
}

function getUIDFromCookie(cookie) {
	// cut the signature, because there is no need to verify the signature
	var encodedPairs = cookie.substr(64+2);
	var bytes = encodedPairs.match(/.{1,2}/g);
	var chunks = [[]];

	bytes.forEach(function(b) {
		if (b === "00") {
			chunks.push([]);
		} else {
			chunks[chunks.length-1].push(b);
		}
	});

	var data = {};

	for (var i = 0; i < (chunks.length/2); i++) {
		var key = decodeByte(chunks[i*2]);
		var value = decodeByte(chunks[i*2+1]);

		data[key] = value;
	}

	return data.uid || false;
}



var prevUID = null;

chrome.cookies.onChanged.addListener(function (changeInfo) {
	var walkhubCookieDomain = window.getWalkhubDomain();
	if (changeInfo.cookie.domain === walkhubCookieDomain || changeInfo.cookie.domain === "."+walkhubCookieDomain) {
		if (changeInfo.cookie.name.endsWith("_SESSION")) {
			if (prevUID === null) {
				prevUID = getUIDFromCookie(changeInfo.cookie.value);
			}

			var currentUID = getUIDFromCookie(changeInfo.cookie.value);

			if (prevUID !== currentUID) {
				window.location.reload();
			}
		}
	}
});

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
