define([
  'views/view',
  'text!views/Home/Home.html'
], function (View, html) {

  var view, navbar, body, page;

  var Scores = new kendo.data.DataSource({
    type: "everlive",
    transport: {
        typeName: "Scores"
    }
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


    question: "",
    answer0: "",
    answer1: "",
    answer2: "",
    answer3: "",
    
    spinAgain: function(e){
      window.location.href="#spin"
    },
    answerQuestion: function(e){

      var t = localStorage.getItem("numAttempts")
      localStorage.setItem("numAttempts",parseInt(t)+1)

      $('#card').removeClass('bounceInDown');
      $('#card0,#card1,#card2,#card3').removeClass('bounceIn');
      
      //console.log("card ",e.target.id.split('card')[1]," ans ",localStorage.getItem("correctAnswer"))
      if(e.target.id.split('card')[1]==localStorage.getItem("correctAnswer")){  
        
        var c = localStorage.getItem("numCorrect")
        localStorage.setItem("numCorrect",parseInt(c)+1)

        $('#'+e.target.id+'').addClass('correct');
        $('#card').addClass('animated zoomOut');
        $('#card0,#card1,#card2,#card3').addClass('animated zoomOut');
        $('#continueBtn,#doneBtn').removeClass('hidden');
        $('#msg').removeClass('hidden').addClass('animated bounceInDown');
      }
      else{
        $('#'+e.target.id+'').addClass('incorrect');
      }
    },
    sendScore:function(e){
      var score = Math.round(localStorage.getItem("numCorrect")/localStorage.getItem("numAttempts")*100)
      //todo - ensure there are scores to send
      console.log(score)
      //send to backend
      var data = el.data('Scores');

        data.get()
          .then(function(data){            
                var data = el.data('Scores');
                  data.create({ 'Score': score},
                  function(data){
                      alert("Score saved!")
                      window.location.href="#new"                      
                    },
                function(error){
                    alert(JSON.stringify(error));
                });
        });

    } 
});

var events = {
    dataInit: function (e) {
                    
     },
     dataShow:function(e){
      
      util.testLogin();
      
      $('#card').removeClass('animated zoomOut correct incorrect');
      $('#card0,#card1,#card2,#card3').removeClass('animated zoomOut correct incorrect');
      $('#msg').addClass('hidden').removeClass('animated bounceInDown');
      $('#continueBtn,#doneBtn').addClass('hidden');
        
      var q = localStorage.getItem("question").split('|')[0]
      var a0 = localStorage.getItem("pair1").split('|')[1]
      var a1 = localStorage.getItem("pair2").split('|')[1]
      var a2 = localStorage.getItem("pair3").split('|')[1]
      var a3 = localStorage.getItem("pair4").split('|')[1]

      model.set("question",q)
      model.set("answer1",a0)
      model.set("answer2",a1)
      model.set("answer3",a2)
      model.set("answer4",a3)

      $('#card').addClass('bounceInDown');
      $('#card0,#card1,#card2,#card3').addClass('bounceIn');
     }
  };

  // create a new view
  view = new View('Home', html, model, events);



});


