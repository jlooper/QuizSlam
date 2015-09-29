define([
  'views/view',
  'text!views/New/New.html'
], function (View, html) {

  var view, navbar, body, page;
  
  var model = kendo.observable({

  quizId: "2154706",

  checkSimulator: function() {
      if (window.navigator.simulator === true) {
          alert('This plugin is not available in the simulator.');
          return true;
      } else if (window.plugins === undefined || window.plugins.AdMob === undefined) {
          alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
          return true;
      } else {
          return false;
      }
  },      
  showBanner: function (bannerPosition, bannerType) {
      
      window.plugins.AdMob.createBannerView(
                // createBannerView params
                {
                  'publisherId': 'ca-app-pub-7082385269825044/8266548011',
                  'adSize': bannerType,
                  'bannerAtTop': bannerPosition == 'top',
                  'overlap': true, // true doesn't push the webcontent away
                  'offsetTopBar': true // set to true if you want it below the iOS >= 7 statusbar
                },
                // createBannerView success callback
                function() {
                  window.plugins.AdMob.requestAd(
                      // requestAd params
                      {
                        'isTesting': false
                      },
                      // requestAd success callback
                      function(){
                        window.plugins.AdMob.showAd(
                            // showAd params
                            true,
                            // showAd success callback
                            function() {console.log('show ok')},
                            // showAd error callback
                            function() { alert('failed to show ad')});
                      },
                      // requestAd error callback
                      function(){ alert('failed to request ad'); }
                  );
                },
                // createBannerView error callback
                function(){ alert('failed to create banner view'); }
          );
  }, 
  getQuiz:function(e){

    //set numAttempts and numCorrect to 0 for new quiz
    localStorage.setItem("numAttempts",0)
    localStorage.setItem("numCorrect",0)
    
    var url = 'https://api.quizlet.com/2.0/sets/'+this.quizId+'?client_id=xxx';
        
        var dataSource = new kendo.data.DataSource({

        transport: {
              read: {
                    url: url,
                    dataType: "jsonp"
                  }
                },
                schema: {
                  data: "terms"
                },
                requestEnd: function( event ) { 


                    var quiz = event.response.terms;
                    
                    var quizArray = []
                    
                    if(quiz){
                      
                      for (var i = quiz.length - 1; i >= 0; i--) {
                          quizArray.push(quiz[i].term + '|' + quiz[i].definition)            
                      };                  
                      var qArr = JSON.stringify(quizArray)
                      localStorage.setItem("quiz",qArr)
                      
                      window.location.href="#spin"
                    }
                    
                    else{
                      
                      alert("Sorry, that quiz id is invalid. Please try again!");
                    
                    }
      
                }

              });
        dataSource.read(); 

        
      },

  

});



var events = {
    dataInit: function (e) {
      if(!model.checkSimulator()){
        model.showBanner('top',window.plugins.AdMob.AD_SIZE.BANNER);
      }
    },
     
    dataShow:function(e){
      
      
    }

  };

  // create a new view
  view = new View('New', html, model, events);



});


