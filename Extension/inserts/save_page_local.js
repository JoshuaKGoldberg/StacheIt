/**
* Sends a message to the extension to save the document's html, under the page's URL
*/
chrome.extension.sendMessage({
    "action": "save",
    "key": location.href,
    "data": document.body.innerHTML
});
