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
        
        // API URLs to... 
        api_prefix, // start the other APIs
        api_user,   // GET user info
        api_post,   // POST page information
        
        // Responses to different status codes from API calls
        responses;
    
    self.reset = function(settings) {
        api_prefix = settings.api_prefix || "http://zonejm.com";
        api_user   = settings.api_user   || "/accounts/user_info";
        api_post   = settings.api_post   || "/api/article/?format=json";
        
        body       = settings.body       || document.body;
        html       = settings.html       || body.parentNode;
        
        responses  = settings.responses || {
            
        };
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
        dialog_cancel.onclick = function() { console.log("nope"); };
         
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
        var ajax = new XMLHttpRequest(),
            user_info;
        
        // Get the user account information from the API
        dialog_prog.innerText = "...processing user...";
        ajax.open("GET", api_prefix + api_user);
        ajax.send();
        
        // Stop the body from overflowing (it looks nicer)
        html.className += "staching";
        body.className += "staching";
        
        ajax.onreadystatechange = function() {
            if(ajax.readyState !== 4) {
                return;
            }
            dialog_prog.innerText = "...staching page...";
            
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
                
                dialog_cancel.innerText = "close";
            }
        };
        


        return self;
    }
    
    
    self.reset(settings || {});
}
