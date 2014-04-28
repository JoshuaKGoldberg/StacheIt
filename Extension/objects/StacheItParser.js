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
        
        // Barred element tags that can compromise security or look bad
        barred_tags,
        
        // Barred element attributes that can compromise security or look bad
        barred_attrs;
    
    
    /**
     * 
     * 
     * @constructor
     */
    self.reset = function (settings) {
        var temp, i;
        
        barred_tags = settings.barred_tags || [
            "embed", "frame", "iframe", "img", "meta", "noscript", "script"
        ];
        
        barred_attrs = settings.barred_attrs || [
            "class", "style"
        ];
        
        // Convert barred_tags into a hash table for quick access
        temp = {};
        for(i = barred_tags.length - 1; i >= 0; --i) {
            temp[barred_tags[i]] = true;
        }
        barred_tags = temp;
        
    }
    
    /* Simple gets & sets (for standalone usage)
     */
    self.getAll = function() {
        return {
            "url": self.getURL(),
            "title": self.getTitle(),
            "content": self.getHTML(),
            // "style": self.getStyle()
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
        var body, kids, i;
        
        // Create the dummy document for parsing, and give it the page_html
        dummy_doc = document.implementation.createHTMLDocument("");
        dummy_doc.documentElement.innerHTML = page_html;
        
        // Recursively parse each element in the <body> (ignore the <head>)
        body = dummy_doc.body;
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
        
        // If the element is barred or hidden, remove it altogether and stop
        if(barred_tags[tagName] || elementNotDisplayed(element)) {
            element.parentElement.removeChild(element);
            return;
        }
        
        // For each barred attribute, if the element has it, nix that silliness
        for(i = barred_attrs.length - 1; i >= 0; --i) {
            if(element.hasAttribute(barred_attrs[i])) {
                element.removeAttribute(barred_attrs[i]);
            }
        }
        
        // For each remaining attribute, if it begins with "on", clear it
        for(i = 0, arr = element.attributes, len = arr.length; i < len; ++i) {
            if(arr[i] && arr[i].name && arr[i].name.indexOf("on") == 0) {
                element.removeAttribute(arr[i].name);
            }
        }
        
        // Recurse on each of the child elements
        for(i = 0, arr = element.children, len = arr.length; i < len; ++i) {
            arr[i] && cleanElement(arr[i]);
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
    
    /**
     * Determines whether an element isn't really dispayed to the user, such as
     * from having a CSS style saying so, or having a tiny width or height
     * 
     * @param {Node} element
     * @private
     */
    function elementNotDisplayed(element) {
        var styles = getComputedStyle(element),
            sizing = element.getClientRects()[0];
        
        // Explicit styles: display=none, visibility=hidden
        if(styles.display === "none" || styles.visibility == "hidden") {
            return true;
        }
        
        // Implicit style: opacity<3
        if(styles.opacity !== "" && Number(styles.opacity) < 3) {
            return true;
        }
        
        // If no sizing, it may or may not be hiden, so let it be ok...
        if(!sizing) {
            return false;
        }
        
        // Sizing: width<3, height<3
        if(sizing.width < 3 || sizing.height < 3) {
            return true;
        }
        
        return false;
    }
    
    self.reset(settings || {});
}