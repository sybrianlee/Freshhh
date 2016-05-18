function load(scope) {
	var redditURL = "http://www.reddit.com/r/hiphopheads/top/.json?t=" + scope + "&limit=100";
	$.getJSON(redditURL, function(result) {
		var posts = result.data.children;
		var count = 0;
		var i = 0;
		while (posts[i] != undefined) {
			var title = posts[i].data.title.toLowerCase();
			if (title.includes("[fresh]") || title.includes("(fresh)")) {
				var post_title = posts[i].data.title;
				var post_url = posts[i].data.url;
				var url = parseURL(post_url);
				var current = "#post_" + count;

				// begin post div
				$(".content").append("<div class='accordion' id='post_" + count + "'>");

				// title div
				var title_div = $("<div class='post_tab'>");
				$(current).append(title_div);
				$(title_div).append("<p class='post_title'>" + post_title + "</p>");
				$(current).append("</div>");

				// begin content div
				var content_div = $("<div class='post_content'>");
				$(current).append(content_div);
				// link
				$(content_div).append("<a href='" + url.href + "' target='_blank'>" + url.href + "</a>");
				// begin music div
				var music_div = $("<div class='" + getIframeClass(url.hostname, url.pathname) + "'>")
				$(content_div).append(music_div);
				loadMusic(music_div, url);

				// end music div
				$(content_div).append("</div>");
				// end content div
				$(current).append("</div>");
				// end post div
				$(".content").append("</div>");
				count++;
			}
			i++;
		}
		if (count === 0) {
			$(".content").append("<p>No [FRESH] Tracks Found</p>");
		}
		accordion();
	});
}

function reload() {
	var filter = document.getElementById("time_filter");
	var newScope = filter.options[filter.selectedIndex].value;
	$(".content").empty();
	load(newScope);
}

function getIframeClass(domain, pathname) {
	if (domain.includes("soundcloud")) {
		if (pathname.includes("/sets/")) {
			return "iframe_soundcloud_sets";
		} else {
			return "iframe_soundcloud";
		}
	} else if (domain.includes("audiomack")) {
		return "iframe_audiomack";
	} else if (domain.includes("youtube") || domain.includes("youtu.be")) {
		return "iframe_youtube";
	} else if (domain.includes("audiojams")) {
		return "iframe_audiojams";
	} else if (domain.includes("itunes") || domain.includes("itun.es")) {
		if (pathname.includes("/post/")) {
			return "iframe_itunes_post";
		} else {
			return "iframe_itunes";
		}
	}
}

function accordion() {
	$(".content").append("<script>" + 
							"jQuery(document).ready(function() {" + 
								"$('.accordion').accordion({" + 
									"active: false," + 
									"collapsible: true," + 
									"heightStyle: 'content'," + 
									"icons: { 'header': 'icon-closed', 'activeHeader': 'icon-opened' }" + 
								"});" + 
							"});" + 
						"</script>");
}

