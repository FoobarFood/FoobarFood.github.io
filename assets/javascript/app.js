var App = (function(){
  function init() {
    FirebaseConfig.init();
  }

  return {
    init: init
  }
})();


$(document).ready(function(){
  App.init();
});