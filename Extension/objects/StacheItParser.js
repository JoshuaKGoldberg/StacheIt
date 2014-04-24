/**
 * StacheIt Javascript Handler - Parser
 * ------------------------------------
 * This object controls the parser.html content.
 * 
 * 
 * On parsing HTML:
 * 
 * * Turns the given HTML into a dummy document (to get rid of scripts and the like),
 *   removes all the Javascript it can, and combines page CSS styles into one string.
 * 
 * @param {Object} settings   An object containing any number of arguments
 * @option {String[]} barred_tags   Any number of HTML tags not allowed in parsed HTML
 * @classDescription   This returns a new instance of a StacheItParser.
 * @return {StacheItParser}   Returns a new StacheItParser.
 * @constructor
 */
function StacheItParser(settings) {
    "use strict";
    if(!this || this === window) {
        return new StacheItCommunicator(settings);
    }
    var self = this,
        
        // The StacheIt extension ID
        extension_id = "jioafaggppgenoaccpcdddnlehojklfl",
        
        // Arguments from the current page's URL
        page_args,
        
        // Information on the page being parsed
        page_url,     // "http://www.example.com/page?seven=7"
        page_domain,  // "http://www.example.com"
        page_title,   // "Some Page Title"
        page_html,    // "<html>.......</html>"
        page_style,   // "<style>.......</style>"
        
        // A dummy document used for parsing page_html
        dummy_doc,
        
        // Disallowed element tags that can compromise security
        barred_tags;
    
    
    /* Simple gets & sets (for standalone usage)
     */
    self.getAll   = function() {
        return {
            "url":   self.getURL(),
            "title": self.getTitle(),
            "html":  self.getHTML(),
            "style": self.getStyle()
        };
    };
    self.getURL   = function() { return page_url;   };
    self.getTitle = function() { return page_title; };
    self.getHTML  = function() { return page_html;  };
    self.getStyle = function() { return page_style; };
    self.setURL   = function(url)   { page_url   = String(url);                     return self; };
    self.setTitle = function(title) { page_title = String(title);                   return self; };
    self.setHTML  = function(html)  { page_html  = String(html);  parsePageHTML();  return self; };
    self.setStyle = function(style) { page_style = style;         parsePageStyle(); return self; };
    
    
    /**
     * Given a response sent by the extension containing page information,
     * this collects CSS files and strips Javascript tags
     *
     * @param {Object} message   JSON object containing the following options:
     * @option {String} url   location.href of the page
     * @option {String} title   document.title of the page
     * @option {String} html   document.children[0].innerHTML of the page
     * @option {StyleSheets} styles   document.styleSheets of the page
     */
    self.parsePage = function (message) {
        self.setURL  (message.url   || "");
        self.setTitle(message.title || "Unshaved Stache");
        self.setHTML (message.html  || "");   // calls parsePageHTML
        self.setStyle(message.style || []);   // calls parsePageStyle
        return self;
    }
    
    /**
     * Parses a page's raw HTML
     * Creates a dummy document to remove <script> tags containing Javascript
     * This is the most elegant way to parse for and remove Javascript
     * 
     * @private
     */
    function parsePageHTML () {
        // Create the dummy document for parsing, and give it the page_html
        dummy_doc = document.implementation.createHTMLDocument("");
        dummy_doc.documentElement.innerHTML = page_html;
        
        // Recursively parse each element in the <body> (ignore the <head>)
        var body = dummy_doc.body, kids, i;
        for(kids = body.children, i = kids.length - 1; i >= 0; --i) {
            cleanElement(kids[i]);
        }
        
        // Set page_html to the dummy_doc's new, (hopefully) clean innerHTML
        page_html = body.innerHTML;
    }
    
    /**
     * Given an HTML node, removes unsafe (onsubmit, onclick, etc.)
     * Javascript attributes, then recurses on all the children
     * 
     * @param {Node} element
     * @private
     */
    function cleanElement (element) {
        var tagName = element.tagName.toLowerCase(),
            arr, len, i;
        
        // If the element is barred, remove it altogether and stop
        if(barred_tags[tagName]) {
            element.parentElement.removeChild(element);
            return;
        }
        
        // For each attribute, if it begins with "on", clear it
        for(i = 0, arr = element.attributes, len = arr.length; i < len; ++i) {
            if(arr[i] && arr[i].name && arr[i].name.indexOf("on") == 0) {
                element.setAttribute(arr[i].name, false);
            }
        }
        
        // Recurse on each of the child elements
        for(i = 0, arr = element.children, len = arr.length; i < len; ++i) {
            arr[i] && cleanElement(arr[i], tagName == "body");
        }
    }
    
    /**
     * Given a document.styleSheets listing, this converts each of the contained
     * stylesheets to plaintext inside a wrapping <style>...</style>
     * 
     * @private
     */
    function parsePageStyle () {
        var output = "",
            len, i;
        
        // For each rule in the styles, add it to the output
        for(i = 0, len = page_style.length; i < len; ++i) {
            output += getStyleString(page_style[i]);
        }
        
        // With the full output, <style>-wrap it as a string
        page_style = "<style>\n" + output + "\n</style>"
    }
    
    /**
     * Turns a document.styleSheet's CSSStyleSheetinto a string
     * 
     * @param {CSSStyleSheet} style   A style to be converted to a string
     * @private
     */
    function getStyleString (style) {
        var output = "",
            rules = style.rules || [],
            len, i;
        
        // Each rule should have a .cssText that needs to be added
        for(i = 0, len = rules.length; i < len; ++i) {
            output += (rules[i].cssText || '')+ "\n";
        }
        
        return output;
    }
    

    var reset = self.reset = function (settings) {
        settings = settings || {};
        
        barred_tags = settings.barred_tags || ["embed", "frame", "iframe", "meta", "noscript", "script"];
        
        // Convert barred_tags into a hash table for quick access
        for(var i in barred_tags)
          barred_tags[barred_tags[i]] = true;
        
        return self;
    }
    return reset();
}