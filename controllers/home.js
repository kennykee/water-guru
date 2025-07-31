chrome.app.runtime.onLaunched.addListener(function() {
    
  chrome.app.window.create("views/home.html",
    {  
       id: "home",
       innerBounds: {
         width: 960,
         height: 540,
         left: 100,
         top: 100,
         minWidth: 848,
         minHeight: 480
      }
    }
  );
});

chrome.runtime.onInstalled.addListener(function() {
  //chrome.storage.local.set(object items, function callback);
  //check for api key
});

chrome.runtime.onSuspend.addListener(function() {
  // Do some simple clean-up tasks.
});

