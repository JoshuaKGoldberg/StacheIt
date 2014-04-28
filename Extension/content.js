/**
 * content.js
 * -------------
 * Inserted into a page when the context menu option is clicked
 */

// If the page is already staching, don't do anything
if(document.body.className.indexOf("staching") !== -1) {
    return;
}
 
// Start parsing the page immediately
(window.SIParser = new StacheItParser())
    .parsePage({
        "url":    location.href,
        "title":  document.title,
        "html":   document.children[0].innerHTML,
        "style":  document.styleSheets
    })
    ;

// Once it's done, post it to the server
(window.SICommunicator = new StacheItCommunicator())
    .createDialog()
    .sendPage(
        window.SIParser.getAll()
    )
    ;
