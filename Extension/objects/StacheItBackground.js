/**
 * StacheIt Javascript Handler - Background
 * ----------------------------------------
 * This object controls the background.js calls.
 *
 *
 * On startup, it:
 *
 * * Changes the chrome.webRequest.onHeadersReceived to remove frame
 *   options headers (which allows cross-domain requests).
 *
 * * Creates a context menu option to open the main site in a new tab
 *   (see next).
 *
 *
 * On context menu click, it:
 *
 * * Inserts a small script to call a StacheItParser into the page,
 *   which will parse the HTML into a (hopefully) static document
 *   and send that out to the server
 * 
 * @param {Object} settings   An object containing any number of arguments
 * @classDescription   This returns a new instance of a StacheItBackground.
 * @return {StacheItBackground}   Returns a new StacheItBackground.
 * @constructor
 */
function StacheItBackground(settings) {
    "use strict";
    if(!this || this === window) {
        return new StacheItCommunicator(settings);
    }
    var self = this,

        // ID of the context menu item
        context_menu_item;

    /**
     * Creates the context menu (right click) action for staching a page.
     * When this is clicked or triggered, self.stagePage is called.
     * Toggled by self.disableContextOption and self.enableContextOption().
     */
    self.createContextOption = function () {
        context_menu_item = chrome.contextMenus.create({
            "title": "Stache this page!",
            "contexts": ["page"],
            "onclick": self.stachePage
        });

        return self;
    }

    /**
     * Enables the context menu (right click) action for staching a page.
     * It may be disabled by self.createContextOption().
     */
    self.enableContextOption = function () {
        chrome.contextMenus.update(context_menu_item, {
            "enabled": true
        });
        return self;
    }

    /**
     * Disabled the context menu (right click) action for staching a page.
     * It may be re-enabled by self.createContextOption().
     */
    self.disableContextOption = function () {
        chrome.contextMenus.update(context_menu_item, {
            "enabled": false
        });
        return self;
    }

    /**
     * Creates a new tab of the main site's receiver page for staches,
     * waits for the page to communicate, then sends this page's info
     * over using self.sendPageAsMessage. The context menu item is
     * disabled while this is happening.
     */
    self.stachePage = function () {
        // Add the CSS for the staching dialog
        chrome.tabs.insertCSS(null, {"file": "staching.css"});
        
        // Execute the script using the parser (which has to be evaluated first), then send it out
        chrome.tabs.executeScript( null, {"file": "objects/StacheItParser.js"}, function() {
            chrome.tabs.executeScript( null, {"file": "objects/StacheItCommunicator.js"}, function() {
                chrome.tabs.executeScript(null, {"file": "content.js"});
            });
        });

        return self;
    }

    /**
     * Enables having an <iframe> within the extension
     * When a web request's headers are received, this will filter out
     * the "x-frame-options" and "frame-options" security restrictions
     */
    self.killFrameOptions = function () {
        chrome.webRequest.onHeadersReceived.addListener(
            function (response) {
                var headers = response.responseHeaders,
                    header, i;
                // For each header in the response's headers:
                for (i = headers.length - 1; i >= 0; --i) {
                    header = headers[i].name.toLowerCase();
                    // If it would restrict frame.src, remove it
                    if (header == "frame-options" || header == "x-frame-options") {
                        headers.splice(i, 1);
                    }
                }
                return headers;
            }, {
                "types": ["sub_frame"],
                "urls": ["*://*/*"]
            }, ["blocking", "responseHeaders"]
        );

        return self;
    }


    var reset = self.reset = function (settings) {
        settings = settings || {};
        
        return self;
    }
    return reset();
}