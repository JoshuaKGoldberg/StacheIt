/**
* StacheIt Javascript handler - when the extension needs to be interacted with, use this message interface
*/
function StacheItHandler(settings) { 
  "use strict";
  var self = (this === window) ? {} : this,
      
      // What this extension is known as
      title = "Stache It",
      
      // The text description of the extension
      description = "If you have a question and must Stache It, I ask you to shave it for later.",
      
      // Text for context menu and other interactivity
      action_blurb = "Stache this page!",
      
      // URLs of the project (in production, this will be something like "http://www.stache-it.com"
      url = "http://127.0.0.1:8000",
      url_login = "/login",
      
      // Page arguments, parsed by self.parseArguments()
      args,
      
      // HTML elements in the popup
      form_login = document.getElementById("form_login"),
      input_email = document.getElementById("email"),
      input_password = document.getElementById("password"),
      butt_stacher = document.getElementById("stacher"),
      
      // Keys for retrieving data from localStorage
      is_logged_in = "is_logged_in",
      
      // Equivalent string keys for localStorage
      ls_true = "true",
      ls_false = "false";
  
  
  /* HTML modifiers
  */
  
  /**
  * On page load, mess with the HTML elements based on the user's status
  */
  self.adjustPage = function() {
    // Fill "email" and "password" into the inputs, if given
    if(args.hasOwnProperty("email")) {
      input_email.value = args.email;
    }
    if(args.hasOwnProperty("password")) {
      input_password.value = args.password;
    }
    
    // If the user is logged in, hide the login form
    if(self.isLoggedIn()) {
      form_login.style.display = "none";
    }
    // Otherwise the user is anonymous; hide the stache button
    else {
      butt_stacher.style.display = "none";
    }
  }
  
  /**
  * 
  */
  self.login = function(event) {
    
  }
  
  /**
  * 
  */
  // self.
  
  
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
  * Is the user logged in?
  *
  * @return {Boolean} Whether the user is logged in (from localStorage)
  */
  self.isLoggedIn = function()  {
    return localStorage.getItem(is_logged_in) == ls_true;
  }
  
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
  
  
  /* Miscellaneous utilities
  */
  
  /**
  * Turns "page.html?arg1=val1&arg2=val2" into { "arg1": "val1", "arg2": val2" }
  *
  * @alias parseArguments
  * @param {String} raw   The raw string URL (if falsy, location.href is used)
  * @param {output} output   An output array to store in (if falsy, a new one is made and returned)
  */
  self.parseArguments = function(raw, output) {
    raw = raw || location.href;
    output = output || {};
    ((raw.slice(raw.indexOf('?') + 1, Infinity) || '').split('&') || '').map(function(str, i) {
      i = str.split('=');
      output[i[0]] = i[1];
    });
    return output;
  }
  
  
  var reset = this.reset = function(settings) {
    settings = settings || {};
    
    title          = settings.title          || "Stache It",
    description    = settings.description    || "If you have a question and must Stache It, I ask you to shave it for later.",
    action_blurb   = settings.action_blurb   || "Stache this page!",
    
    url            = settings.url            || "http://127.0.0.1:8000",
    url_login      = settings.url_login      || "/login",
    
    form_login     = settings.form_login     || document.getElementById("form_login"),
    input_email    = settings.input_email    || document.getElementById("email"),
    input_password = settings.input_password || document.getElementById("password"),
    butt_stacher   = settings.butt_stacher   || document.getElementById("stacher"),
    
    is_logged_in   = settings.is_logged_in   || "is_logged_in",
    ls_true        = settings.ls_true        || "true",
    ls_false       = settings.ls_false       || "false";
    
    args = self.parseArguments();
  }
  reset();
  
  return self;
};

// When the popup loads, initiate the handler Javascript
document.addEventListener('DOMContentLoaded', function() {
  window.StacheIt = new StacheItHandler();
  
  // Add listeners to the StacheIt handler for extension & content scripts
  chrome.extension.onMessage.addListener(StacheIt.onMessage);
  chrome.runtime.onMessage.addListener(StacheIt.onMessage);

  // Adjust the popup HTML as needed
  StacheIt.adjustPage();
});
