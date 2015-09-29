define([
  'views/view',
  'text!views/Auth/Auth.html'
], function (View, html) {

  var view, navbar, body, page;

  var apiKey = localStorage.getItem("apiKey");
  
  var el = new Everlive({
      apiKey: apiKey,
      url: '//api.everlive.com/v1/',
      scheme: 'https',
  });
  
  var model = kendo.observable({
    
    login: function(e){
      if (!this.username) {
          alert("Username is required.");
          return;
        }
      if (!this.password) {
          alert("Password is required.");
          return;
      }
      
      
      el.Users.login(this.username, this.password,
          function(data) {
              localStorage.setItem('token',data.result.access_token);
              window.location.href = "#scores";              
          }, function() {
                alert("Unfortunately we could not find your account.");
        });
    },
    register: function(e){
      if (!this.username) {
          alert("Username is required.");
          return;
        }
      if (!this.password) {
          alert("Password is required.");
          return;
        }
      
      
      el.Users.register(this.username, this.password, { Email: this.email },
          function() {
              alert("Your account was successfully created.");
                window.location.href = "#scores";
          },
          function() {
                alert("Unfortunately we were unable to create your account.");
          });
    },
    resetPassword: function(e){
      if (!this.email) {
          alert("Email is required.");
          return;
        }
    }
  });

   
  var events = {
    
    dataShow: function (e) {

      if(localStorage.getItem('token')){
        window.location.href = "#new";
      }   

    },

  };

  // create a new view
  view = new View('Auth', html, model, events);



});


