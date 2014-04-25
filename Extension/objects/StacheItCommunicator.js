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
        dialog,
        dialog_prog,
        
        // API URL to POST page information
        api;
    
    self.reset = function(settings) {
        api = settings.api || "http://zonejm.com/api/article/?format=json";
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
        
        dialog = document.createElement("h1");
        dialog.id = "stacheit_dialog";
        dialog.innerText = "Staching!";
        
        dialog_prog = document.createElement("aside");
        dialog_prog.id = "stacheit_dialog_prog";
        dialog_prog.innerText = "...wait for it...";
         
        // Add them to each other and the document
        dialog_in.appendChild(dialog);
        dialog_in.appendChild(dialog_prog);
        dialog_mid.appendChild(dialog_in);
        dialog_out.appendChild(dialog_mid);
        document.body.appendChild(dialog_out);
        
        return self;
    }
    
    /**
     * 
     */
    self.sendPage = function (information) {
        var ajax = new XMLHttpRequest(),
            key, input;
        
        // Start the AJAX request as a POST to the api
        ajax.open("POST", api, true);
        
        // Send the POST information as JSON
        // http://zonejm.com/api/article/schema/?format=json
        ajax.setRequestHeader("Content-type", "application/json");
        ajax.send(JSON.stringify(information));
        
        ajax.onreadystatechange = function(status) {
            if(ajax.readyState != 4 || ajax.status != 400) {
                return;
            }
            console.log("Got", status, ajax);
            dialog_prog.innerText = ajax.status + ': ' + ajax.statusText;
        }

        return self;
    }
    
    
    self.reset(settings || {});
}