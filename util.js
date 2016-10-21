window.getWalkhub = function() {
	var manifest = chrome.runtime.getManifest();
	var csp = manifest.content_security_policy;
	var matches = csp.match(/(https:\/\/[^/;\s]+)/);
	return (matches && matches.length > 0) ?
		matches[0] :
		null;
};

window.getWalkhubDomain = function() {
	var url = window.getWalkhub();
	var matches = url.match(/https:\/\/([^/]+)/);
	return (matches && matches.length > 1) ?
		matches[1] :
		null;
}
