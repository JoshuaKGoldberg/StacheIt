/**
* content.js
* -------------
* Inserted into a page when the context menu option is clicked
*/
(window.StacheIt = new StacheItParser())
    .parsePage({
        "url":    location.href,
        "title":  document.title,
        "html":   document.children[0].innerHTML,
        "style":  document.styleSheets
    })
    ;