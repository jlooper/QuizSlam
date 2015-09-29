define([
  'views/view',
  'text!views/Spin/Spin.html'
], function (View, html) {

  var view, navbar, body, page;
  
  var model = kendo.observable({

    spunNum: "",

    pickFour: function(arr,count,spunNum){
    console.log(spunNum)  
    console.log(arr)     
        var out = [], i, clone = arr.slice(0, arr.length);
        //bug, select a more random set
        for (i = 0; i < count; i ++) {
          if (clone[spunNum] !== undefined) {
            out.push(clone[spunNum]);
            clone.splice(spunNum, 1);
          }
        }
        //mark the first one of this array as the right answer
        out[0]=out[0]+"|"+"*"
        return out     
    },

    randomizeFour: function(arr){
      var i = arr.length;
        if ( i == 0 ) return false;
        while ( --i ) {
           var j = Math.floor( Math.random() * ( i + 1 ) );
           var tempi = arr[i];
           var tempj = arr[j];
           arr[i] = tempj;
           arr[j] = tempi;
         } 
         for (k = 0; k < arr.length; k ++) {
          //mark correct answer
            if(arr[k].split('|')[2]){
              localStorage.setItem('correctAnswer',k)
            }
         }
         return arr
    },

    generateRandomNumber: function(e){
      var q = JSON.parse(localStorage.getItem("quiz"))
      return Math.floor(Math.random() * (q.length - 0 + 1)) + 0;
    },
    goHome: function(e){
      window.location.href="#home";
      
    },
    pickNumber: function(e){
      $('.colorWheel').removeClass('animated rotateIn');
      //grab full quiz set from localStorage
      var quiz = localStorage.getItem("quiz")
      //conver it to an array from a string
      var answerArray = JSON.parse(quiz);
      //generate a random number from the set length - this is your question
      var spunNum = model.generateRandomNumber();
      model.set("spunNum",spunNum)
      
      //get four random questions
      var questionSet = model.pickFour(answerArray,4,spunNum)
      //set the first element of this set of four to the question and mark its answer as the correct one
      localStorage.setItem("question",questionSet[0])
      //now randomize those four questions
      var randomizedQuestions = model.randomizeFour(questionSet)
      //set this randomized set to localStorage so it can be displayed
      localStorage.setItem("pair1",randomizedQuestions[0])
      localStorage.setItem("pair2",randomizedQuestions[1])
      localStorage.setItem("pair3",randomizedQuestions[2])
      localStorage.setItem("pair4",randomizedQuestions[3])
      //navigate to home
      //$('.spunNum').addClass('animated pulse');
      //$('.spunNum').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', model.goHome); 
      model.goHome();                     
    },
    spin: function(e){
      //spin the wheel and start the parsing      
      $('.colorWheel').addClass('animated rotateIn');
      $('.colorWheel').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', model.pickNumber);
    },
    new: function(e){      
      window.location.href="#new"
    }

});

var events = {
    dataInit: function (e) {
       
    },
     
    dataShow:function(e){
      
      util.testLogin();
      
      model.set("spunNum","Spin a number!")


    }

  };

  // create a new view
  view = new View('Spin', html, model, events);



});


