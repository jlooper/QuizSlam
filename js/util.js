(function ($, undefined) {

    window.util = {
        testLogin:function(){
          if(!localStorage.getItem('token')){
              window.location.href="#login"
          }
        }
    };
})(jQuery);