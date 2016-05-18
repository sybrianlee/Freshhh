function loadMusic(selector, url) {
	if (url.hostname.includes("itunes") || url.hostname.includes("itun.es")) {
		loadITPlayer(selector, url);
	} else {
		var iframeURL = getIframeURL(url);
		if (iframeURL !== undefined) {
			$(selector).append("<iframe src='" + iframeURL + "' frameborder='0' scrolling='no' allowfullscreen></iframe>");
		}
	}
}

function getIframeURL(url) {
	var iframeURL;
	if (url.hostname.includes("soundcloud")) {
		iframeURL = getSoundCloudURL(url);
	} else if (url.hostname.includes("youtube") || url.hostname.includes("youtu.be")) {
		iframeURL = getYouTubeURL(url);
	} else if (url.hostname.includes("audiomack")) {
		iframeURL = getAudioMackURL(url);
	} else if (url.hostname.includes("audiojams")) {
		iframeURL = getAudioJamURL(url);
	}
	return iframeURL;
}

function loadITPlayer(selector, url) {
	getItunesURL(url, function(iframeURL) {
		$(selector).append("<iframe src='" + iframeURL + "' frameborder='0' scrolling='no' allowfullscreen></iframe>");
	});
}