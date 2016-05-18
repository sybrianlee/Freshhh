function loadMusic(selector, url) {
	if (url.hostname.includes("soundcloud")) {
		loadSCPlayer(selector, url);
	} else if (url.hostname.includes("youtube") || url.hostname.includes("youtu.be")) {
		loadYTPlayer(selector, url);
	} else if (url.hostname.includes("audiomack")) {
		loadAMPlayer(selector, url);
	} else if (url.hostname.includes("audiojams")) {
		loadAJPlayer(selector, url);
	} else if (url.hostname.includes("itunes") || url.hostname.includes("itun.es")) {
		loadITPlayer(selector, url);
	}
}

function loadSCPlayer(selector, url) {
	getSoundCloudURL(url, function(iframeURL) {
		$(selector).append("<iframe src='" + iframeURL + "' frameborder='0' scrolling='no'></iframe>")
	});










	// $.getJSON(getSoundCloudURL(url), function(result) {
	// 	$(selector).append("<iframe scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=" + url.href + "'></iframe>");
	// }).fail(function() {
	// 	$(selector).parent().append("<p>Track Not Found</p>");
	// 	$(selector).remove();
	// });
}

function loadYTPlayer(selector, url) {
	$(selector).append("<iframe src='" + getYouTubeURL(url) + "' frameborder='0' scrolling='no' allowfullscreen></iframe>");
}

function loadAMPlayer(selector, url) {
	$(selector).append("<iframe src='" + getAudioMackURL(url) + "' frameborder='0' scrolling='no' allowfullscreen></iframe>");
}

function loadAJPlayer(selector, url) {
	$(selector).append("<iframe src='" + getAudioJamURL(url) + "' frameborder='0' scrolling='no' allowfullscreen></iframe>");
}

function loadITPlayer(selector, url) {
	getItunesURL(url, function(iframeURL) {
		$(selector).append("<iframe src='" + iframeURL + "' frameborder='0' scrolling='no' allowfullscreen></iframe>");
	});
}