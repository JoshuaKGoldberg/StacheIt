/**
 * background.js
 * -------------
 * Create the context menu option and change webRequest for frame-options
 */
document.addEventListener("DOMContentLoaded", function() {
    // Source: objects/StacheItBackground.js
    (window.StacheIt = new StacheItBackground())
        .createContextOption()
        .killFrameOptions()
        ;
});