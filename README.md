Amazon Smile Redirector Chrome Plugin
======================

Chrome Extension to redirect all [www.amazon.com]() URLs to [smile.amazon.com]()

Installation
============

1. Download this repository
1. Open Chrome
1. Go to 'Extensions' (`chrome://extensions/`)
1. Enable 'Developer mode'
1. Click 'Load unpacked extension'
1. Select `chromeplugin` folder from this repository

Happy shopping.

# Convert Chrome to Safari

https://github.com/kritollm/chrome-extension-api-for-safari-and-firefox

# Available in Chrome Extension Web Store
https://chrome.google.com/webstore/detail/amazon-redirect/llagilkchfcclieioaldkekbafjnhcia

## Update store version
https://chrome.google.com/webstore/devconsole/


# Debugging Go to:
    * https://jsfiddle.net/wru0qh1L/33/
    * use the console
    * use console.log("message") to debug/print# History
    * Ctrl+S before running

## Hints
Example of using split, join, match, for, and regex:
      
      if (relativeUrl.match("tag="+affiliate) == null) {
        new_url = relativeUrl.split("&")
        //console.log("SPLIT", new_url)
        for(var i=0; i<new_url.length; i++) {
          if (new_url[i].match("tag=")) {
            //console.log(new_url[i])
            new_url[i]=new_url[i].replace(/tag=.*/,"tag="+affiliate)
          }
        }
      relativeUrl=new_url.join("&")

# Versions
### Version 3 - Redirects all amazon.com to smile.amazon and adds the tag cmf10-20
### Version 2 - Redirects amazon.com to https://smile.amazon.com/ref=as_li_ss_tl?tag=cfm10-20
### Version 1 - Redirects amazon.com to amzn.to/2uZjDBo
