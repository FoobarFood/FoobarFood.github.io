var App = (function(){
  function init() {
    FirebaseConfig.init();
    clickListeners.locator();
    clickListeners.foodBtn();
    clickListeners.addFoodBtn();
    clickListeners.popularRecipesBtn();
    View.createRecipeCard(0);
    View.createRecipeCard(1);
    View.createRecipeCard(2);
  }

  function setupPagination() {
    var nombrePage = $('.content').length;
    console.log(nombrePage)

    function showPage(pagination) {
      var currPage = $('.page-item.active').index();

      if (pagination === 0) { // «
        if (currPage > 1) {
          $('.content').hide().eq(currPage - 2).show();
          $('.page-item').removeClass("active").eq(currPage - 1).addClass('active');
        };
      } else if (pagination > 0 && pagination <= nombrePage) {
        $('.content').hide().eq(pagination - 1).show();
        $('.page-item').removeClass("active").eq(pagination).addClass('active');
      } else { // »
        if (currPage < nombrePage) {
          $('.content').hide().eq(currPage).show();
          $('.page-item').removeClass("active").eq(currPage + 1).addClass('active');
        };
      };
    }

    // 0 « | 1 2 ... n | n » 
    $('.page-item').click(function(e) {
      e.preventDefault();
      showPage($(this).index());
    });
    
    showPage(1);
  }

  return {
    init: init,
    setupPagination: setupPagination
  }
})();

// Runs when all JS files loaded
$(document).ready(function(){
  App.init();
});