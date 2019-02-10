

// import npm modules here, use them in the below block
var popupS = require('popups');
 

// your custom coe goes here
window.addEventListener('load', function() {

    function yourFunction() {
      popupS.alert({
        content: 'Hello World!'
      });
    }
  
    yourFunction();
  });
  