/**
* Creates the context menu (right click) action for staching a page
*/
chrome.contextMenus.create({
  "title": "Stache this page!",
  "contexts": ["page", "selection", "link", "editable", "image", "video", "audio"],
  "onclick": function() { 
    // This *should* tell the popup to store the page in localStorage
    //   The reasoning for this is that the popup's localStorage is global in the browser.
    //   That way, upon going to the main site, it can be read from and used.
    chrome.runtime.sendMessage({
      "action": "save"
    });
  }
});