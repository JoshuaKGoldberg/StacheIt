/**
* popup.js
* --------
* When the popup loads, initiate the handler Javascript
*/
document.addEventListener("DOMContentLoaded", function() {
    // Source: objects/StacheItPopup.js
    (window.StacheIt = new StacheItPopup())
        .adjustPage()
        ;
});