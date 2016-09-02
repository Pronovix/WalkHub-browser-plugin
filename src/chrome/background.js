(function () {
chrome.runtime.onMessage.addListener(function (data, sender, sendResponse) {
	if (data.command === "makeScreenshot") {
		chrome.tabs.captureVisibleTab(null, {format: "png"}, function(dataUrl) {
			sendResponse(dataUrl);
		});

		return true;
	}

	return false;
});
})();
