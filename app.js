define([
  'views/New/New',
  'views/Spin/Spin',
  'views/Home/Home',
  'views/Scores/Scores',
  'views/Auth/Auth'
  
    
], function () {

  // create a global container object
  var app = window.app = window.app || {};
  
  
  var init = function () {

    // intialize the application
    app.instance = new kendo.mobile.Application(

      document.body, 
        { skin: 'flat', loading: "<h1>Please wait...</h1>" }
    );  

    
  };
 
  return {
    init: init
  };

});
