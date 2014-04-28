/**
 * StacheIt Javascript handler - Communicator
 * ------------------------------------------
 * This object 
 */
function StacheItCommunicator(settings) {
    "use strict";
    if(!this || this === window) {
        return new StacheItCommunicator(settings);
    }
    var self = this,
        
        // HTML elements containing the upload dialog
        dialog_out,
        dialog_mid,
        dialog_in,
        dialog_main,
        dialog_img,
        dialog_cancel,
        dialog_head,
        dialog_prog,
        
        // Quick references to pre-existing HTML elements
        body,
        html,
        
        // AJAX object for API calls
        ajax,
        
        // API URLs to... 
        api_prefix, // start the other APIs
        api_info,   // GET user info
        api_post,   // POST page information
        api_user;   // Where to redirect new tabs
    
    self.reset = function(settings) {
        api_prefix = settings.api_prefix || "http://zonejm.com";
        api_info   = settings.api_info   || "/accounts/user_info";
        api_post   = settings.api_post   || "/api/article/?format=json";
        api_user   = settings.api_user   || "/accounts/loggedin";
        
        body       = settings.body       || document.body;
        html       = settings.html       || body.parentNode;
    };
    
    /**
     * Creates a visible dialog on top of the page
     */
    self.createDialog = function () {
        dialog_out = document.createElement("div");
        dialog_out.id = "stacheit_dialog_out";
        
        dialog_mid = document.createElement("div");
        dialog_mid.id = "stacheit_dialog_mid";
        
        dialog_in = document.createElement("div");
        dialog_in.id = "stacheit_dialog_in";
        
        dialog_main = document.createElement("div");
        dialog_main.id = "stacheit_dialog_main";
        
        dialog_img = document.createElement("img");
        dialog_img.id = "stacheit_dialog_img";
        dialog_img.src = api_prefix + "/static/images/papier-stache.png";
        
        dialog_head = document.createElement("h1");
        dialog_head.id = "stacheit_dialog_head";
        dialog_head.innerText = "Staching";
        
        dialog_prog = document.createElement("aside");
        dialog_prog.id = "stacheit_dialog_prog";
        dialog_prog.innerText = "...wait for it...";
        
        dialog_cancel = document.createElement("span");
        dialog_cancel.id = "stacheit_dialog_cancel";
        dialog_cancel.innerText = "cancel?";
        dialog_cancel.onclick = self.abort;
         
        // Add them to each other and the document
        dialog_in.appendChild(dialog_img);
        dialog_in.appendChild(dialog_main);
        dialog_in.appendChild(dialog_cancel);
        dialog_main.appendChild(dialog_head);
        dialog_main.appendChild(dialog_prog);
        dialog_mid.appendChild(dialog_in);
        dialog_out.appendChild(dialog_mid);
        document.body.appendChild(dialog_out);
        
        return self;
    }
    
    /**
     * Sends the given page out to the API URL as an AJAX POST request
     * 
     * @param {Object} information   The collection JSON-able object to be sent
     *                               as POST data, including fields such as
     *                               "content" and "title"
     */
    self.sendPage = function (information) {
        var user_info;
        
        // Get the user account information from the API
        dialog_prog.innerText = "...processing user...";
        ajax = new XMLHttpRequest();
        ajax.open("GET", api_prefix + api_info);
        ajax.send();
        
        // Stop the body from overflowing (it looks nicer)
        html.className += "staching";
        body.className += "staching";
        
        ajax.onreadystatechange = function() {
            if(ajax.readyState !== 4) {
                return;
            }
            dialog_prog.innerText = "...staching page...";
            
            // If the response is "Kanye West", you're logged out - don't stache
            if(ajax.responseText.trim() === "Kanye West") {
                dialog_prog.innerHTML = "You should log in first!"
                        + "<br><a href='" + api_prefix + "' target='_blank'>" 
                        + api_prefix + "</a>";
                dialog_cancel.innerText = "close";
                dialog_cancel.onclick = self.close;
                return;
            }
            
            // Add the obtained user info to the request information
            var info_extra = JSON.parse(ajax.responseText);
            information.user = "/api/user/" + info_extra.id + "/";
            
            // Start the AJAX request as a POST to the api
            ajax.open("POST", api_prefix + api_post, true);
            
            // Send the POST information as JSON
            // http://zonejm.com/api/article/schema/?format=json
            ajax.setRequestHeader("Content-type", "application/json");
            ajax.send(JSON.stringify(information));
            
            ajax.onreadystatechange = function(status) {
                if(ajax.readyState != 4) {
                    return;
                }
                
                // Display the results, opening the main site if necessary
                self.displayResults(ajax);
                
                // The process is now done, so let the user close the dialog
                dialog_cancel.innerText = "close";
                dialog_cancel.onclick = self.close;
                html.onclick = self.close;
                html.style.cursor = "pointer";
            }
        };
        
        /**
         * When the main AJAX API call returns, set the displayed text based on
         * whether it was a successful staching.
         * 
         * @param {XMLHttpRequest} ajax
         */
        self.displayResults = function(ajax) {
            // If the status is is 201, that's great - open the main site
            if(ajax.status == 201) {
                dialog_prog.innerText = "Stached!";
                try {
                    window.open(api_prefix + '/' + api_user, "_blank").focus();
                } catch(err) {
                    console.log("Error opening " + api_user + " tab...", err);
                }
                return;
            }
            // Anything else is an error.
            else {
                dialog_prog.innerText = "There was an error... :(";
            }
        };


        return self;
    };
    
    /**
     * Calls the AJAX (XMLHttpRequest) object's .abort function to cancel
     * any ongoing staching calls
     * 
     * @remarks Call this when dialog_cancel.innerText is "close"
     */
    self.abort = function() {
        if(ajax && ajax.abort) {
            ajax.abort();
        }
        
        if(dialog_prog) {
            dialog_prog.innerText = "canceled :(";
        }
        if(dialog_cancel) {
            dialog_cancel.innerText = "close";
        }
        
        html.onclick = self.close;
    };
    
    /**
     * Removes the HTML elements from the body, and returns body and html's
     * classes back to normal
     * 
     * @remarks Call this when dialog_cancel.innerText is "close"
     */
    self.close = function() {
        body.removeChild(dialog_out);
        body.className = body.className.replace("staching", "");
        html.className = html.className.replace("staching", "");
        if(html.onclick === self.close) {
            html.onclick = undefined;
        }
    }
    
    
    self.reset(settings || {});
}
