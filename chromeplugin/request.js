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
        return url;
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
    } else if (domain.includes("smile")) {
        amazonurl = "smile.amazon.com";
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
               + "|(&tag=cfm10-20)"
               + "|(http://)"; //all Amazon pages now redirect to HTTPS, also fixes conflict with HTTPS Everywhere extension

    // Don't try and redirect pages that are in our filter
    
    if (url.match(filter) != null) {
        return ;
    }

    url = addOrReplaceTag(url);
    return redirectToSmile(https, amazonurl, url, country);
}

function addOrReplaceTag(url) {
    var paramStart = "?";
    var paramStartRegex = "\\" + paramStart;
    var affiliate = "cfm10-20";
    var new_url = url;
    
    if (url.includes("tag="+affiliate)) {
        return url;
    }
    
    // Replace tag if needed
    if (url.match("tag=") != null) {
        split_url = url.split("&")
        for(var i=0; i<split_url.length; i++) {
          if (split_url[i].match("tag=")) {
            //console.log(new_url[i])
            split_url[i]=split_url[i].replace(/tag=.*/,"tag="+affiliate)
          }
        }
        new_url=split_url.join("&")
        //console.log("HERE",relativeUrl)
    }

    // check to see if there are already GET variables in the url
    if (new_url.match("tag="+affiliate) == null) {
      if (new_url.includes(paramStart)) {
          new_url = new_url + "&" + "tag=" + affiliate;
      } else {
          new_url = new_url + paramStart + "tag=" + affiliate;
      }
    }    
    return new_url;
}


function redirectToSmile(scheme, amazonurl, url, country) {
    var smileurl = "smile.amazon.com";
    if (country === "de") {
        smileurl = "smile.amazon.de";
    } else if (country === "uk") {
      smileurl = "smile.amazon.co.uk";
    }
    return {
        // redirect to amazon smile append the rest of the url
        redirectUrl : scheme + smileurl + getRelativeRedirectUrl(amazonurl, url)
    };
}

function getRelativeRedirectUrl(amazonurl, url) {
    var relativeUrl = url.split(amazonurl)[1];
    var noRedirectIndicator = "sa-no-redirect=1";
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

