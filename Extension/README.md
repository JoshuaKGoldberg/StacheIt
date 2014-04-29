#StacheIt Extension#

##Setup##

The StacheIt Extension for Google Chrome requires minimal configuration.

1. In Google Chrome, go to chrome://extensions

2. Check "Developer mode" in the top/right of the page

3. Click the "Load unpacked extension..." button

4. Select your directory containing the StacheIt Extension, such as
    C:/Repositories/StacheIt/Extension

##Schematics##

There are three components to the extension.

1. Background script (background.js)
    * Creates the context menu option to "Stache Page" (insert content.js)
    
2. Popup (popup.js)
    * Immediately AJAXes user info
        * If anonymous, <iframe> containing login page is shown
        * If registered, button to "Stache Page" is shown (inserts content.js)
    
3. Content script (content.js)
    * POSTs current page to main site's API, then opens the user's
      library view in a new tab