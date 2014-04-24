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
        dialog_prog;
    
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
        dialog.innerText = "Staching...";
        
        dialog_prog = document.createElement("aside");
        dialog_prog.id = "stacheit_dialog_prog";
        dialog_prog.innerText = "0%";
         
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
    self.sendPage = function (information, onUpdate, onFinish) {
        
        
        return self;
    }
    
    /**
     * 
     */
    self.updateProgress = function () {
        
        
        return self;
    }
    
    /**
     * 
     */
    self.finishDisplay = function () {
        
        
        return self;
    }
}