/**
 * StacheIt Javascript Handler - Popup
 * -----------------------------------
 * This object controls the popup.html content.
 *
 *
 * On startup, it:
 *
 * * Sends an AJAX request to the main site for user information.
 *   If the user is anonymous, an iframe with .src pointing to the
 *   login form is printed for the page. If the user is logged in,
 *   a header with their name is displayed with a button to stache
 *   the page.
 * 
 * @param {Object} settings   An object containing any number of arguments
 * @option {String} url   The main URL of the site hosting StacheIt
 * @option {String} url_login_form   The sub-URL to display a login form
 * @option {String} url_login_info   The sub-URL to request login status
 * @classDescription   This returns a new instance of a StacheItPopup.
 * @return {StacheItPopup}   Returns a new StacheItPopup.
 * @constructor
 */

function StacheItPopup(settings) {
    "use strict";
    if(!this || this === window) {
        return new StacheItCommunicator(settings);
    }
    var self = this,

        // External URLs
        url,
        url_login_form, 
        url_login_info,

        // User info, if the user is logged in
        user_info,

        // HTML elements in the popup
        head_username,
        butt_stacher;

    /**
     * On page load, set the popup contents based on the user's login status
     * For anons, an iframe containing the site's login form is be shown
     * For users, the account info and a button to stache the page are shown
     */
    self.adjustPage = function () {
        self.checkLogin(
            function(text) {
                return text && text.trim()[0] == '{';
            }, 
            self.showButtStacher,
            self.showLoginFrame);
        return self;
    }

    /**
     * Sends an AJAX request to check if the user is logged in
     * If the response is "Kanye West", that means the user isn't logged in
     * Otherwise it should be a JSON result of available user data
     *
     * @param {Function} decider   Function that determines whether this is success or failure
     * @param {Function} success   Callback for if the user is logged in
     * @param {Function} failure   Callback for if the user is anonymous
     */
    self.checkLogin = function (decider, success, failure) {
        var ajax = new XMLHttpRequest(),
            requ = url + url_login_info; // "http://zonejm.com/accounts/user_info"
        ajax.open("GET", requ, true);
        ajax.send();
        ajax.onreadystatechange = function () {
            if (ajax.readyState != 4) return;
            
            if (decider(ajax.responseText)) {
                success && success(ajax.responseText);
            } else {
                failure && failure(ajax.responseText);
            }
        }

        return self;
    }

    /**
     * For logged in users, this makes the document display
     * their info and a button to stache the current page
     *
     * @param {String} response   A JSON string of user information
     */
    self.showButtStacher = function (response) {
        console.log("Parsing", response);
        user_info = JSON.parse(response);

        // Start the page off with the username
        head_username = document.createElement("h1");
        head_username.innerHTML = "<small>Hey again, </small>" + user_info.username;

        // Add the stacher button below that
        butt_stacher = document.createElement("div");
        butt_stacher.id = "stacher";
        butt_stacher.innerText = "Stache It!";
        butt_stacher.onclick = self.stachePage;

        // Add both of them (it's ok that this is a little slow)
        document.body.innerHTML = "";
        document.body.appendChild(head_username);
        document.body.appendChild(butt_stacher);

        return self;
    }

    /**
     * For anonymous users, this makes the document display
     * an iframe containing the actual sitee's login form
     */
    self.showLoginFrame = function ( /*response*/ ) {
        document.body.innerHTML = "<iframe src='" + url + url_login_form + "'>";
        return self;
    }

    /**
     * When the "Stache It!" button is clicked, emulate the tab's
     * (background) script's context click, which sends the current
     * page out to the main site for processing
     */
    self.stachePage = function ( /*event*/ ) {
        chrome.extension.getBackgroundPage().StacheIt.stachePage();
        return self;
    }


    var reset = self.reset = function (settings) {
        settings = settings || {};

        url            = settings.url            || "http://zonejm.com";
        url_login_form = settings.url_login_form || "";
        url_login_info = settings.url_login_info || "/accounts/user_info";

        return self;
    }
    return reset();
};

