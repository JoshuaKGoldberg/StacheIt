/**
* StacheIt Javascript handler - when the extension needs to be interacted with, use this message interface
*/
var StacheIt = new (function() { 
  "use strict";
  var self = this,
      
      // What this extension is known as
      title = "Stache It",
      
      // The text description of the extension
      description = "If you have a question and must Stache It, I ask you to shave it for later.",
      
      // Text for context menu and other interactivityu
      action_blurb = "Stache this page!";
  
  
  /* Message-passing interface
  */
  
  /**
  * Function to be used for *.onMessage.addListener to react to events
  *
  * @alias onMessage
  * @param {String} request.action   What type of message this is ("save", "get", ...)
  * @param {String} request.key   Unique key to be used by the request, for "save" and "get"
  * @param {String} request.data   Extra data associated with the request
  */
  self.onMessage = function(request, sender) {
    switch(request.action) {
      // Insert a script to save the current page into localStorage
      // Required arguments: "action"
      case "save":
      case "store":
      case "stache":
        chrome.tabs.executeScript(null, { file: "inserts/save_page_local.js" });
      break;
      // Retrieve a page on a unique key
      // Required arguments: "action", "key", "data"
      case "get":
      case "load":
      case "retrieve":
        var data = storageGetPage(request.key);
        // The data should be sent somewhere
      break;
    }
  }
  
  
  /* localStorage API
  */
  
  /**
  * Instructs the current tab to save the page under the current URL
  *
  * @alias savePage
  */
  self.savePage = function() {
    chrome.tabs.executeScript(null, { "file": "inserts/popup_save.js" });
  }
  
  /**
  * Retrieves the contents of a page given the URL key
  *
  * @param {String} key   A unique key the data is stored under
  * @return {String}   The sring value retrieved from localStorage
  */
  self.getPage = function(key) {
    return localStorage.getItem(key);
  }
})();

// Add listeners to the StacheIt handler for extension & content scripts
chrome.extension.onMessage.addListener(StacheIt.onMessage);
chrome.runtime.onMessage.addListener(StacheIt.onMessage);