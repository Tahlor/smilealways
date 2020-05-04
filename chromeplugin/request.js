/************************ REDIRECT CODE ***********************/
chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return detectRedirect(details);
}, {
    urls : ["<all_urls>"],
    types: ["main_frame","sub_frame"]
}, ["blocking"]);


function detectRedirect(details) {
    var url = details.url;

    if (url == null) {
        return;
    }

    var domain = url_domain(url);
    var amazonurl = "www.amazon.com";
    var country = "com";
    if (domain.includes("amazon.de")) {
    	amazonurl = "www.amazon.de";
    	country = "de";
    } else if (domain.includes("amazon.co.uk")) {
      amazonurl = "www.amazon.co.uk";
      country = "uk";
    }

    var https = "https://";
    // ignore links with these strings in them
    var filter = "(sa-no-redirect=)"
               + "|(redirect=true)"
               + "|(redirect.html)"
               + "|(r.html)"
               + "|(f.html)"
               + "|(/dmusic/cloudplayer)"
               + "|(/photos)"
               + "|(/wishlist)"
               + "|(/clouddrive)"
               + "|(/ap/)"
               + "|(aws.amazon.)"
               + "|(read.amazon.)"
               + "|(login.amazon.)"
               + "|(payments.amazon.)"
               + "|(http://)"
               + "|(2uZjDBo)"
                ; //all Amazon pages now redirect to HTTPS, also fixes conflict with HTTPS Everywhere extension

    // Don't try and redirect pages that are in our filter
    if (url.match(filter) != null) {
        return;
    }
    if (url == "https://www.amazon.com/") {
        return redirectToSmile(https, amazonurl, url, country);
    }
    // else {
    //     window.alert(url);
    // }
}

function redirectToSmile(scheme, amazonurl, url, country) {
    //var smileurl = "smile.amazon.com";
    var redirect_url = "amzn.to/2uZjDBo";
    //var smileurl = "facebook.com";
    //if (country === "de") {
    //	smileurl = "smile.amazon.de";
    //} else if (country === "uk") {
    //  smileurl = "smile.amazon.co.uk";
    //}
    return {
        // redirect to amazon smile append the rest of the url
        //redirectUrl : scheme + smileurl + getRelativeRedirectUrl(amazonurl, url)
        redirectUrl : scheme + redirect_url
    };
}

function getRelativeRedirectUrl(amazonurl, url) {
    var relativeUrl = url.split(amazonurl)[1];
    //var noRedirectIndicator = "sa-no-redirect=1";
    var paramStart = "?";
    var paramStartRegex = "\\" + paramStart;
    var newurl = null;

    // check to see if there are already GET variables in the url
    if (relativeUrl.match(paramStartRegex) != null) {
        newurl = relativeUrl + "&" + noRedirectIndicator;
    } else {
        newurl = relativeUrl + paramStart + noRedirectIndicator;
    }
    return newurl;
}

function url_domain(data) {
  var    a      = document.createElement('a');
         a.href = data;
  return a.hostname;
}
