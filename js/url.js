function getSoundCloudURL(url) {
	if (url.hostname === "m.soundcloud.com") {
		url.hostname = "soundcloud.com";
	}
	return "https://w.soundcloud.com/player/?url=" + url.href;
}

function getYouTubeURL(url) {
	var id;
	if (url.hostname === "youtu.be") {
		id = url.pathname.substring(1);
	} else {
		if (url.pathname === "/watch") {
			id = url.search.split("=")[1].split("&")[0];
		} else if (url.pathname === "/attribution_link") {
			id = url.search.split("%3D")[1].split("%26")[0];
		}
	}
	return "https://www.youtube.com/embed/" + id;
}

function getAudioMackURL(url) {
	return url.href.replace("song", "embed4-large");
}

function getAudioJamURL(url) {
	var id = url.search.split("id=")[1];
	return "http://audiojams.net/embed.php?id=" + id;
}

function getItunesURL(url, callback) {
	var newURL;
	if (url.hostname === "itun.es") {
		getRedirectURL(url.href, function(redirectedURL) {
			var id = redirectedURL.pathname.split("/")[4].substring(2);
			callback("https://widgets.itunes.apple.com/widget.html?c=us&brc=0F2C37&blc=0F2C37&trc=0F2C37&tlc=0F2C37&m=music&e=album&w=325&h=300&ids=" + id + "&wt=discovery");
		});
	} else {
		if (url.pathname.includes("/post/")) {
			newURL = url.href.replace("https://itunes.apple.com/us/post/", "https://embed.itunes.apple.com/us/embedded-player/");
		} else if (url.pathname.includes("/album/")) {
			var id = url.pathname.split("/")[4].substring(2);
			newURL = "https://widgets.itunes.apple.com/widget.html?c=us&brc=0F2C37&blc=0F2C37&trc=0F2C37&tlc=0F2C37&m=music&e=album&w=325&h=300&ids=" + id + "&wt=discovery";
		}
		callback(newURL);
	}
}

function getRedirectURL(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.onload = function () {
		callback(parseURL(xhr.responseURL));
	}
	xhr.send();
}

function parseURL(url) {
	// url.href			http://site.com:81/path/page?a=1&b=2#hash
	// url.protocol		http:
	// url.hostname		site.com
	// url.port			81
	// url.pathname		/path/page
	// url.search		?a=1&b=2
	// url.hash			#hash
	var dummy_url = document.createElement("a");
	dummy_url.href = url;
	return dummy_url;
}