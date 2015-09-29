define([
  'views/view',
  'text!views/Scores/Scores.html'
], function (View, html) {

  var view, navbar, body, page;

  var Scores = new kendo.data.DataSource({
    type: "everlive",
    transport: {
        typeName: "Scores"
    },
    sort: { field: 'CreatedAt', dir: 'desc' }
  });

  var apiKey = localStorage.getItem("apiKey");
  var token = localStorage.getItem("token");
  var el = new Everlive({
      apiKey: apiKey,
      url: '//api.everlive.com/v1/',
      scheme: 'https',
      token: token
  });

  
  
  var model = kendo.observable({
    Scores:Scores,  
    refresh: function(e){
      $("#score-list").data("kendoListView").dataSource.read();
    },

    sendScores: function(e){
      window.plugins.socialsharing.shareViaEmail (
                   'I just got a great score on my Quiz!',
                   'Score posted!',
                   [], // TO: must be null or an array
                   [], // CC: must be null or an array
                   null, // BCC: must be null or an array
                   this.onSuccess,
                   this.onError
               );
    }
  });

  
  var events = {
    dataShow: function (e) {

      util.testLogin();

      var data = el.data('Scores');

        data.get()
          .then(function(data){

            $("#score-list").kendoListView({
                dataSource: Scores,
                template: kendo.template($("#score-template").html()),
                
            });
        
      
        });

    }

   
  };

  
  // create a new view
  view = new View('Scores', html, model, events);

  

});


